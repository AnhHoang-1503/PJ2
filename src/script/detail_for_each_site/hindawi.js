import { readFile, writeFile, appendFile } from "fs/promises";
import cheerio from "cheerio";

async function getRef(link) {
    const res = await fetch(link);
    const html = await res.text();
    const $ = cheerio.load(html);
    const links = [];
    $("a:contains('Publisher Site')").each((i, el) => {
        const href = $(el).attr("href");
        links.push(href);
    });
    return links;
}

export default getRef;
