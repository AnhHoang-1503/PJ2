import { readFile, writeFile } from "fs/promises";
import puppeteer from "puppeteer";
import plimit from "p-limit";

const limit = plimit(10)

async function getDetail() {
    //get paper links 
    const read = await readFile('../resources/paperdata/journal1.json')
    const paperList = JSON.parse(read)

    //creat new browser
    const browser = await puppeteer.launch()

    const result = await Promise.all(paperList.map((paper, index) => {
        return limit(async () => {
            console.log(`reading paper ${index}`)
            const page = await browser.newPage()
            await page.goto(paper.link, {timeout: 0})
            const referencesId = await page.evaluate(() => {
                const references = document.querySelectorAll('.ArticleReferences_xmlContent__TZqgx ol li') 
                const papers = Array.from(references).filter((value) => {
                    return value.textContent.includes('Article ID')
                })
                return papers.map((value) => {
                    const stringArray =  value.textContent.split(" ")
                    const referencId = stringArray[stringArray.indexOf("Article")+2]
                    return Number(referencId.match(/\d+/))
                })
            })

            const output = {
                id: paper.id,
                references: referencesId
            }
            console.log(output)
            await page.close()
            return output
        })
    }))
    
    await browser.close() 

    await writeFile(`../resources/detail/journal1.json`, JSON.stringify(result))
}

getDetail()