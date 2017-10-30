import test from 'ava'
import './makeApp'
import '../helpers/Models/UserModel'
import '../helpers/Models/UserAvatarModel'

test.beforeEach(async t => {
	t.context.app = await makeApp(t.title.match(/\*(sqlite|mysql|pg)\*/)[1])
	UserModel.app(t.context.app)
	UserModel.knex(t.context.app.db)
	t.context.UserModel = UserModel

	UserAvatarModel.app(t.context.app)
	UserAvatarModel.knex(t.context.app.db)
	t.context.UserAvatarModel = UserAvatarModel
})

test.afterEach.always(t => t.context.app.shutdown())

export function testDBs(name, cb, dbs = [ 'sqlite', 'mysql', 'pg' ]) {
	for(const db of dbs) {
		test.serial(`*${db}*: ${name}`, cb)
	}
}

module.exports = {
	test: testDBs
}
