import Sequelize from 'sequelize'
import config from '../config/PORT.js'
import { Umzug, SequelizeStorage } from 'umzug'

const sequelize = new Sequelize(config.DATABASE_URL, {
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
})

const migrationConfig = {
    migrations: {
        glob: 'migrations/*.js'
      },
      storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
      context: sequelize.getQueryInterface(),
      logger: console,
}

const runMigrations = async () => {
    const migrator = new Umzug(migrationConfig)
  
    const migrations = await migrator.up()
    console.log('Migrations up to date', {
      files: migrations.map((mig) => mig.name)
    })
}

const rollbackMigration = async () => {
    await sequelize.authenticate()
    const migrator = new Umzug(migrationConfig)
    await migrator.down()
  }
  
  const connectToDatabase = async () => {
    try {
      await sequelize.authenticate()
      await runMigrations()
      console.log('connected to the database')
    } catch (err) {
      console.log(err)
      return process.exit(1)
    }
  
    return null
  }
  
export default { connectToDatabase, sequelize, rollbackMigration }

