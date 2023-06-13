import { readFile, writeFile, appendFile } from "fs/promises";
import cheerio from "cheerio";

async function getRef(link) {
    const res = await fetch(link);
    const html = await res.text();
    const $ = cheerio.load(html);
    const links = [];
    $(".c-article-references__links").each((i, el) => {
        const href = $(el).find("a").attr("href");
        links.push(href);
    });
    return links;
}

export default getRef;
