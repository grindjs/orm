import './BaseDatabase'

export class Postgres extends BaseDatabase {

	static dbName = 'pg'

	static runMigration(app) {
		return app.db.migrate.currentVersion().then(version => {
			if(version === 'none') {
				return super.runMigration(app)
			}

			return app.db.migrate.rollback().then(() => super.runMigration(app))
		})
	}

	static resequence(trx, table, maxId) {
		return trx.raw(`ALTER SEQUENCE "${table}_id_seq" RESTART WITH ${maxId + 1}`)
	}

	static async shutdown(app) {
		try {
			await app.db.destroy()
		} catch(err) {
			Log.error('Unable to destroy test db', err)
		}
	}

}
