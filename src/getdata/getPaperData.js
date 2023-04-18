import puppeteer from "puppeteer";
import fs from "fs/promises";
import plimit from "p-limit";

//set limit for number of page run at one time
const limit = plimit(10)

async function getData() {
    const browser = await puppeteer.launch()
    const firstPage = await browser.newPage()
    //get journals links
    const read = await fs.readFile('../resources/journalsLinks.json')
    const journalLinks = JSON.parse(read)
    for (let index = 1; index <= 274; index += 1) {
        const journalLink = journalLinks[index - 1].link + "contents"
        await firstPage.goto(journalLink)
        console.log('counting pages')
        // counting pages
        const pageCount = await firstPage.evaluate(() => {
            try {
                const element = document.querySelector('[aria-label="Last"]')
                pageCount = parseInt(element.href.match(/(\d+)/g))
                return pageCount
            } catch (error) {
                console.log(error)
                return 1
            }
        })
        // creat newpage for each page
        const pages = []
        for (let page = 1; page <= pageCount; page++) {
            pages.push(await browser.newPage())
        }
        //get all paper of this journal
        const results = await Promise.all(pages.map(async (page, i) => {
            // limit reading 10 pages at one time
            return limit(async () => {
                console.log(`reading page ${i+1}/${pageCount} of journal ${index}/274`)
                await page.goto(`${journalLink}/page/${i+1}/`,{timeout: 0})
                let data = []
                data = data.concat(await page.evaluate(() => {
                    const elements = document.querySelectorAll('.toc_article')
                    return Array.from(elements).map((value) => {
                        return {
                            id: parseInt(value.querySelector('ul.toc_article__header li:nth-child(4)').textContent.match(/(\d+)/g)),
                            journal: value.querySelector('ul.toc_article__header li').innerText.replace(' -','').trim(),
                            volume: parseInt(value.querySelector('ul li:nth-child(3)').textContent.match(/(\d+)/g)),
                            link: value.querySelector('a').href,
                            title: value.querySelector('h2').textContent,
                            publishedTime: value.querySelector('ul.toc_article__footer li').textContent,
                            author: value.querySelector('.toc_article__item__authors').textContent
                        }
                    })
                }))
                page.close()
                return data
            })
        }))
        // results is [[...],[...],[...]] have to handle
        let output = [].concat(...results);
        // write to json file
        await fs.writeFile(`../resources/paperdata/journal${index}.json`, JSON.stringify(output))
    }
    await browser.close()
}

getData()



