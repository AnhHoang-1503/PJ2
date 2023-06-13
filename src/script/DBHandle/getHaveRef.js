import { writeFile, readFile } from "fs/promises";
import { findById } from "../handle.js";
import { getPaperIds } from "../hindawi/getReferences.js";

//get id of paper have ref
async function getIdList() {
    const read = await readFile("../resources/references.json");
    const data = JSON.parse(read);
    // const test = []
    // test.push(data[0])
    // test.push(data[1])
    // test.push(data[2])
    // console.log(test)
    let output = data.reduce((pre, cur, index) => {
        console.log(index);
        pre.push(cur.id);
        pre = pre.concat(cur.references);
        return pre;
    }, []);
    output = [...new Set(output)];
    await writeFile("../resources/paperHavRef_ID.json", JSON.stringify(output));
}

//get all paper have ref
async function papersHavRef() {
    let read = await readFile(`../resources/paperHavRef_ID.json`);
    const idList = JSON.parse(read);

    read = await readFile(`../resources/papersData.json`);
    const data = JSON.parse(read);

    read = await readFile(`../resources/references.json`);
    const refList = JSON.parse(read);
    const refListId = refList.map((val) => val.id);
    const refListRef = refList.map((val) => val.references);

    const paperidList = await getPaperIds();

    let papersList = [];
    idList.forEach((id) => {
        let paper = data[paperidList.indexOf(id)];
        // paper.references = refListRef[refListId.indexOf(id)]
        papersList.push(paper);
    });

    await writeFile(
        "../resources/paperHavRef.json",
        JSON.stringify(papersList)
    );
}

async function detailIdRef() {
    let read = await readFile("../resources/references.json");
    let idList = JSON.parse(read);
    //const test = [];
    //test.push(idList[0]);
    //test.push(idList[1]);
    //test.push(idList[2]);
    //console.log(test);
    let output = idList.reduce((pre, curr) => {
        return pre.concat(
            curr.references.map((e) => {
                return {
                    id: curr.id,
                    reference: e,
                };
            })
        );
    }, []);
    await writeFile(
        "../resources/detailIdRefList.json",
        JSON.stringify(output)
    );
}

export { getIdList, papersHavRef, detailIdRef };
export default { getIdList, papersHavRef, detailIdRef };
