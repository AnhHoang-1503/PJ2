import { readFile, writeFile } from "fs/promises";

async function start() {
    const read = await readFile('../resources/papersData.json')
    const data = JSON.parse(read)
    const Ids = data.map((value, index) => {
        return value.id
    })
    await writeFile('../resources/paperIds.json', JSON.stringify(Ids))
}

start()
