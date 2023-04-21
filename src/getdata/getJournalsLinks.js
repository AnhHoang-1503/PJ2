import { launch } from 'puppeteer'
import { writeFile } from 'fs/promises'

async function getLinks() {
    // go to hindawi.com
    const browser = await launch()
    const page = await browser.newPage()
    await page.goto("https://www.hindawi.com/journals/")

    // get link
    const links = await page.evaluate(() => {
        let id = 0;
        const elements = document.querySelectorAll('a')
        // get journals links 
        const output = Array.from(elements).filter((e) => {
            const regex = /https:\/\/www\.hindawi\.com\/journals\/.+/
            return regex.test(e.href)
        }).map((e) => {
            id += 1
            return {id: id, link: e.href}
        })
        return output
    })

    // write to file .json    
    await writeFile('../resources/journalsLinks.json', JSON.stringify(links))
    await browser.close()
}

getLinks()


