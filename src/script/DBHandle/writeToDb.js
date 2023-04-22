import plimit from "p-limit";
import handle from "../handle.js";

const limit = plimit(1);

async function writeToDB(session, paper) {
  // let session = driver.session({database: 'neo4j'})
  try {
    const result = await session.executeWrite(async (tx) => {
      return await tx.run(
        `MERGE (p:Paper {
                id: $id, 
                journal: $journal, 
                volume: $volume, 
                link: $link, 
                title: $title, 
                publishedTime: $publishedTime,
                author: $author
            })`,
        paper
      );
    });
    console.log(
      `Created ${result.summary.counters.updates().nodesCreated} nodes` +
        `in ${result.summary.resultAvailableAfter} ms.`
    );
  } finally {
    //   await session.close()
  }
}

async function importToDb(session, paperIdList) {
  await Promise.all(
    paperIdList.map((id, index) => {
      return limit(async () => {
        console.log(index);
        const paper = await handle.findById(id);
        await writeToDB(session, paper);
      });
    })
  );
}

export { writeToDB, importToDb };
export default { writeToDB, importToDb };
