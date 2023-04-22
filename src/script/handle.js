import { readFile, writeFile } from "fs/promises";
import { JSDOM } from "jsdom";
import { getPaperIds } from "./getData/getReferences.js";
import { Parser } from "@json2csv/plainjs";

//merge file on ../resources/paperdata
async function mergePaperData() {
  console.log("mergin paper data");
  let output = [];
  for (let i = 1; i <= 274; i++) {
    const read = await readFile(`../resources/paperdata/journal${i}.json`);
    const data = JSON.parse(read);
    console.log(i);
    output = output.concat(data);
  }
  await writeFile(`../resources/papersData.json`, JSON.stringify(output));
}

//merge file on ../resources/references
async function mergePaperReferences() {
  console.log("mergin references data");
  let output = [];
  for (let i = 1; i <= 274; i++) {
    const read = await readFile(
      `../resources/references/journal${i}-references.json`
    );
    const data = JSON.parse(read);
    console.log(i);
    output = output.concat(data);
  }
  await writeFile(`../resources/references.json`, JSON.stringify(output));
}

//return a var like document to select element
async function creatNewPage(url) {
  const res = await fetch(url);
  const html = await res.text();
  const page = new JSDOM(html);
  return page.window.document;
}

// find paper by id
async function findById(id) {
  const read = await readFile(`../resources/papersData.json`);
  const data = JSON.parse(read);
  const idList = await getPaperIds();
  return data[idList.indexOf(id)];
}

// convert arr to csv style
function arrToCSV(arr) {
  const parseObj = new Parser();
  return parseObj.parse(arr);
}

// convert a .json file to .csv file
async function convertToCSV(path) {
  const pathDirName = path.substring(0, path.lastIndexOf("/") + 1);
  const fileName = path.substring(
    path.lastIndexOf("/") + 1,
    path.lastIndexOf(".json")
  );

  const read = await readFile(path);
  const data = JSON.parse(read);

  const csv = arrToCSV(data);
  await writeFile(`${pathDirName}${fileName}.csv`, csv);
}

export {
  mergePaperData,
  mergePaperReferences,
  creatNewPage,
  findById,
  arrToCSV,
  convertToCSV,
};
export default {
  mergePaperData,
  mergePaperReferences,
  creatNewPage,
  findById,
  arrToCSV,
  convertToCSV,
};
