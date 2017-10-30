import './Postgres'
import './Sqlite3'
import './Mysql'

export const Databases = {
	[Postgres.dbName]: Postgres,
	[Sqlite3.dbName]: Sqlite3,
	[Mysql.dbName]: Mysql
}
