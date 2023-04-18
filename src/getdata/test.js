import { readFile, writeFile } from 'fs/promises'


async function intit() {
  let sum = 0
  for (let i = 1; i <= 1; i++) {
    const read = await readFile(`../resources/paperdata/journal${i}.json`)
    const data = JSON.parse(read)
    // console.log(data.length)
    // if(data.length <= 1) console.log(i)
    // sum += data.length
    console.log(data[2403])
    console.log(data[2404])
    console.log(data[2402])

  }
  // console.log(sum)
}

async function intit2() {
  // for (let i = 1; i <= 274; i++) {
    const read = await readFile(`../resources/papersData.json`)
    const data = JSON.parse(read)
    console.log(data.length)
    // await writeFile(`../resources/paperdata/journal${i}.json`, JSON.stringify(output))
    // }
}

async function findLinkById(id) {
  const read = await readFile(`../resources/papersData.json`)
  const data = JSON.parse(read)
  const result = data.find((value, index) => {
    return value.id == id
  })
  console.log(result)
}

intit()
