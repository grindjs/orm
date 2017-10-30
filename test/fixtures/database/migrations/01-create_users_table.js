export function up(db) {
	return db.schema.createTable('users', table => {
		table.increments('id').unsigned().primary()
		table.string('name', 128).notNullable().index()
		table.timestamps()
	})
}

export function down(db) {
	return db.schema.dropTable('users')
}
