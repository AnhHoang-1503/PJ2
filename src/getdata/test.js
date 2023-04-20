import { readFile, writeFile } from 'fs/promises'
import { JSDOM } from "jsdom";
import { memoryUsage } from 'node:process';

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
    let length = element.references.length
    if(length >= 2) sum += 1
  });
  console.log(data.length)
  console.log(sum)
}

caculator()