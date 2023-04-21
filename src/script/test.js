import { readFile, writeFile } from 'fs/promises'
import { JSDOM } from "jsdom"
import { memoryUsage } from 'node:process'

async function read(path) {
  const read = await readFile(path)
  const data = JSON.parse(read)
  return data
}

async function test1() {
  let array = []
  let checked
  for (let i = 1; i < 274; i++) {
    checked = await isNull(i)
    console.log(checked)
    if(!checked) array.push(i)
  }
  console.log(array)
}

async function isNull(index) {
  const read = await readFile(`../resources/detail/journal${index}-references.json`)
  const data = JSON.parse(read)
  // console.log(data.length)
  return data.length > 0
}

async function caculator() {
  const read = await readFile('../resources/references.json')
  const data = JSON.parse(read)
  let sum = 0
  data.forEach(element => {
    sum += element.references.length
  });
  console.log(data.length)
  console.log(sum)
}

async function check() {
  const data = await read('../resources/paperIds.json')
  data.forEach((e) => {
    if(e <= 9999 || e >= 10000000) console.log(e)
  })
}

async function test() {
  const res = await fetch('https://www.hindawi.com/journals/aaa/contents/')
  const html = await res.text()
  // await writeFile('../resources/test.txt', html)
}


export default {caculator, check, test}
