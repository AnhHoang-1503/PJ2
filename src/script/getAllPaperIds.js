import { readFile, writeFile } from "fs/promises"

async function start() {
    console.log('getting all paper ids')
    const read = await readFile('../resources/papersData.json')
    const data = JSON.parse(read)
    const Ids = data.map((value, index) => {
        return value.id
    })
    await writeFile('../resources/paperIds.json', JSON.stringify(Ids))
}

export { start }
export default {start}
