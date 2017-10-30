export class BaseDatabase {

	static seedTables = [ 'users', 'user_avatars' ]

	static ready(app) {
		app.config.set('database.default', this.dbName)
	}

	static async runMigration(app) {
		await app.db.migrate.latest()
		await app.db.seed.run()

		// Reset autoincrementing, which can break when primary keys are set explicitly in seed files
		return app.db.transaction(trx => {
			return Promise.all(this.seedTables.map(async table => {
				try {
					let maxId = await trx.max('id as max').from(table)
					maxId = maxId[0].max || 10

					return this.resequence(trx, table, maxId)
				} catch(err) {
					throw new Error(err)
				}
			}))
		})
	}

	static async resequence(/* db */) {
		throw new Error('Subclass must implement')
	}

	static shutdown(/* app */) {
		throw new Error('Subclass must implement')
	}


}
