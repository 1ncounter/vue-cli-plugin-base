const fs = require('fs')
const util = require('util')
const merge = require('deepmerge')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

module.exports = async function writeJson(file, content) {
  try {
    const data = await readFile(file, 'utf8')
    const json = JSON.parse(data)
    const result = merge(json, content)

    await writeFile(file, JSON.stringify(result, "", "\t"))
  } catch (error) {
    console.error(error)
  }
}
