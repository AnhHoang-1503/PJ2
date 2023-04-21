import { readFile, writeFile } from 'fs/promises'
import { JSDOM } from "jsdom"


async function mergePaperData() {
    console.log('mergin paper data')
    let output = []
    for (let i = 1; i <= 274; i++) {
        const read = await readFile(`../resources/paperdata/journal${i}.json`)
        const data = JSON.parse(read)
        console.log(i)
        output = output.concat(data)
    }
    await writeFile(`../resources/papersData.json`, JSON.stringify(output))
}

async function mergePaperReferences() {
    console.log('mergin references data')
    let output = []
    for (let i = 1; i <= 274; i++) {
        const read = await readFile(`../resources/references/journal${i}-references.json`)
        const data = JSON.parse(read)
        console.log(i)
        output = output.concat(data)
    }
    await writeFile(`../resources/references.json`, JSON.stringify(output))
}

async function creatNewPage(url) {
    const res = await fetch(url)
    const html = await res.text()
    const page = new JSDOM(html)
    return page.window.document
}

export {mergePaperData, mergePaperReferences, creatNewPage}
export default {mergePaperData, mergePaperReferences, creatNewPage}
