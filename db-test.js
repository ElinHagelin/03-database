import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'


const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter, {})

await db.read()

let sum = 0
db.data.data.map(number => sum = sum + number)

console.log('data from db is: ', db.data);
console.log('sum of data from db is: ', sum);

