require('babel-polyfill')

import './Grind'
import { DatabaseProvider } from 'grind-db'
import { OrmProvider } from '../../src'
import { Databases } from './Databases'

export async function makeApp(dbName, boot = () => { }) {
	const app = new Grind

	const db = Databases[dbName]
	await db.ready(app)

	app.providers.add(DatabaseProvider)
	app.providers.add(OrmProvider)

	await app.boot()
	await boot()

	await db.runMigration(app)
	app.on('shutdown', async () => db.shutdown(app))

	return app
}
