import { readFile, writeFile, appendFile } from "fs/promises";
import plimit from "p-limit";
import { memoryUsage } from "node:process";

const limit = plimit(100);

// get all paper id
async function getPaperIds() {
  const read = await readFile("../resources/paperIds.json");
  return JSON.parse(read);
}

// get paper list of journal index
async function getPaperList(index) {
  const read = await readFile(`../resources/paperdata/journal${index}.json`);
  return JSON.parse(read);
}

// get papers of journal index which have references in paper id list
async function getReferences(idList, paperList, jindex) {
  let result = await Promise.all(
    paperList.map((paper, index) => {
      //lmit promise
      return limit(async function get() {
        try {
          // console.log(`reading paper ${index}`)
          const res = await fetch(paper.link);
          const html = await res.text();
          const regex = /Article ID (\d{5,7})/g;
          let result = html.matchAll(regex);
          let referenceIds = [...result].map((e) => {
            if (idList.includes(Number(e[1]))) return Number(e[1]);
          });

          //remove duplicate elements
          referenceIds = [...new Set(referenceIds)];
          //remove undefined elements
          referenceIds = referenceIds.filter((e) => e !== undefined);
          if (referenceIds.length == 0) return;
          const output = {
            id: paper.id,
            references: referenceIds,
          };
          console.log(`Journal: ${jindex} Paper: ${index}`, output);
          return output;
        } catch (error) {
          console.log(error);
          get();
        }
      });
    })
  );

  //remove undefined elements
  result = result.filter((e) => e !== undefined);

  // write data to a file
  await writeFile(
    `../resources/references/journal${jindex}-references.json`,
    JSON.stringify(result)
  );
}

async function start() {
  const idList = await getPaperIds();
  for (let index = 1; index <= 274; index++) {
    const paperList = await getPaperList(index);
    await getReferences(idList, paperList, index);
  }
}

export { start, getPaperIds, getPaperList, getReferences };
export default { start, getPaperIds, getPaperList, getReferences };
