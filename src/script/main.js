import test from "./test.js";
import handle, { findById } from "./handle.js";
import connect from "./DBHandle/connectToDb.js";
import getPaperData from "./getData/getPaperData.js";
import getReferences from "./getData/getReferences.js";
import getAllPaperIds from "./getData/getAllPaperIds.js";
import getJournalsLinks from "./getData/getJournalsLinks.js";
import haveRef from "./DBHandle/getHaveRef.js";
import writeToDB from "./DBHandle/writeToDb.js";

async function start() {
  const t0 = performance.now();
  await getJournalsLinks.start();
  const t1 = performance.now();
  console.log("Time: ", t1 - t0);

  await getPaperData.start();
  const t2 = performance.now();
  console.log("Time: ", t2 - t1);

  await handle.mergePaperData();
  const t3 = performance.now();
  console.log("Time: ", t3 - t2);

  await getAllPaperIds.start();
  const t4 = performance.now();
  console.log("Time: ", t4 - t3);

  await getReferences.start();
  const t5 = performance.now();
  console.log("Time: ", t5 - t4);

  await handle.mergePaperReferences();
  const t6 = performance.now();
  console.log("Time: ", t6 - t5);

  await haveRef.getIdList();
  await haveRef.papersHavRef();
  await haveRef.detailIdRef();
}

start();
