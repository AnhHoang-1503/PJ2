import { readFile, writeFile, appendFile } from "fs/promises";
import test from "./test.js";
import link_handler from "./detail_for_each_site/link_handler.js";
import springer from "./detail_for_each_site/springer.js";
import hindawi from "./detail_for_each_site/hindawi.js";
import pLimit from "p-limit";

const limit = pLimit(5);

let data_level_1 = [];
let data_level_2 = [];
let data_level_3 = [];

async function getRef(link, level = 1, pre = "") {
    if (level > 2) {
        return;
    }
    const site = await link_handler(link);
    let output = {};
    output.link = link;
    output.pre = pre;
    switch (site) {
        case "springer":
            output.refs = await springer(link);
            break;
        case "hindawi":
            output.refs = await hindawi(link);
            break;
        default:
            output.refs = [];
            break;
    }

    switch (level) {
        case 1:
            data_level_1.push(output);
            break;
        case 2:
            data_level_2.push(output);
            break;
        case 3:
            data_level_3.push(output);
            break;
    }
}

async function main() {
    await getRef("https://www.hindawi.com/journals/aaa/2023/8255686/");
}

main();
