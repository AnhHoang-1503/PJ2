import { readFile, writeFile } from 'fs/promises'


async function mergerPaperData() {
    let output = []
    for (let i = 1; i <= 274; i++) {
        const read = await readFile(`../resources/paperdata/journal${i}.json`)
        const data = JSON.parse(read)
        console.log(i)
        output = output.concat(data)
    }
    await writeFile(`../resources/papersData.json`, JSON.stringify(output))
}

async function mergerPaperReferences() {
    let output = []
    for (let i = 1; i <= 274; i++) {
        const read = await readFile(`../resources/references/journal${i}-references.json`)
        const data = JSON.parse(read)
        console.log(i)
        output = output.concat(data)
    }
    await writeFile(`../resources/references.json`, JSON.stringify(output))
}
mergerPaperReferences()
