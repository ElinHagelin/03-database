import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

async function getData(filename, defaultData) {
	const __dirname = dirname(fileURLToPath(import.meta.url))
	const file = join(__dirname, filename)
	const adapter = new JSONFile(file)
	return new Low(adapter, defaultData)
}

export default getData