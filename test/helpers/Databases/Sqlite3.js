import './BaseDatabase'

const path = require('path')
const crypto = require('crypto')
const fs = require('fs')

export class Sqlite3 extends BaseDatabase {

	static dbName = 'sqlite'
	static dbPath = path.join(__dirname, `../../fixtures/database/database-${crypto.randomBytes(4).toString('hex')}.sqlite`)

	static ready(app) {
		super.ready(app)
		app.config.set('database.connections.sqlite.filename', this.dbPath)
	}

	static resequence(trx, table, maxId) {
		return trx.raw(`UPDATE sqlite_sequence SET seq = ${maxId} WHERE name = '${table}'`)
	}

	static shutdown(/* app */) {
		try {
			// eslint-disable-next-line no-sync
			fs.unlinkSync(this.dbPath)
		} catch(err) {
			Log.error('Unable to remove test db', err)
		}
	}

}
