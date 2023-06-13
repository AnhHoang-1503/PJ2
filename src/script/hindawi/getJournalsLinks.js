import { launch } from "puppeteer";
import { writeFile } from "fs/promises";
import { JSDOM } from "jsdom";
import { creatNewPage } from "../handle.js";

async function start() {
  // go to hindawi.com
  // const t0 = performance.now()
  try {
    var page = await creatNewPage("https://www.hindawi.com/journals/");
  } catch (error) {
    var page = await creatNewPage("https://www.hindawi.com/journals/");
  }

  // get journals links
  let id = 0;
  const elements = page.querySelectorAll("a");
  page.close();
  const links = Array.from(elements)
    .filter((e) => {
      const regex = /\/journals\/.+/;
      return regex.test(e.href);
    })
    .map((e) => {
      id += 1;
      return { id: id, link: `https://www.hindawi.com${e.href}` };
    });
  console.log("getting journals links");

  // write to file .json
  await writeFile("../resources/journalsLinks.json", JSON.stringify(links));
  // const t1 = performance.now()
  // console.log(t1-t0)
}

export { start };
export default { start };
