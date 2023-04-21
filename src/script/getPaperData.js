import plimit from "p-limit";
import { readFile, writeFile } from "fs/promises"
import { creatNewPage } from "./handle.js"

async function getJournalList() {
    const read = await readFile('../resources/journalsLinks.json')
    const journalList = JSON.parse(read)
    return journalList
}

async function getTotalPage(journalLink) {
    const page = await creatNewPage(journalLink + "contents")
    try {
        const element = page.querySelector('[aria-label="Last"]')
        page.close()
        return parseInt(element.href.match(/(\d+)/g))
    } catch (error) {
        page.close()
        return 1
    }
}

async function getPaperData(url) {
    const page = await creatNewPage(url)
    const elements = page.querySelectorAll('.toc_article')
    page.close()
    return Array.from(elements).map((value) => {
        return {
            id: parseInt(value.querySelector('ul.toc_article__header li:nth-child(4)').textContent.match(/(\d+)/g)),
            journal: value.querySelector('ul.toc_article__header li').textContent.replace(' -','').trim(),
            volume: parseInt(value.querySelector('ul li:nth-child(3)').textContent.match(/(\d+)/g)),
            link: 'https://www.hindawi.com' + value.querySelector('a').href,
            title: value.querySelector('h2').textContent,
            publishedTime: value.querySelector('ul.toc_article__footer li').textContent,
            author: value.querySelector('.toc_article__item__authors').textContent
        }
    })
}

async function start() {
    const journalList = await getJournalList()

    // set limit for journal
    const limitJournal = plimit(3)
    await Promise.all(journalList.map((journal, jindex) => {
        return limitJournal(async() => {
            let output = []
            const totalPage = await getTotalPage(journal.link)

            // set limit for page
            const limitPage = plimit(100)
            let queue = []

            //reading page
            for (let index = 1; index <= totalPage; index++) {
                queue.push(limitPage(async () => {
                    console.log(`Page: ${index}/${totalPage} Journal: ${jindex+1}`)
                    let result = await getPaperData(`${journal.link}contents/page/${index}/`)
                    output = output.concat(result)
                }))
            }
            await Promise.all(queue)

            await writeFile(`../resources/paperdata/journal${jindex+1}.json`, JSON.stringify(output))         
        })
    }))
}

export {getPaperData, getJournalList, getTotalPage, start}
export default {getPaperData, getJournalList, getTotalPage, start}
