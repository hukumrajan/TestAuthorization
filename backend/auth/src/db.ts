import mongoose from 'mongoose'

const log = console.log

const dbErrorHandler = (connection: mongoose.Connection) => {
  connection.on('error', (err) => {
    console.error(err)
    process.exit(0)
  })
}

const init = async ({}) => {
  let connection
  try {
    log('connecting db')
    registerModels()

    await mongoose.connect('mongodb://localhost:27017/publishers' || '')
    connection = mongoose.connection
    log('DB connected successfully')

    // pass to error handler for future connection errors
    dbErrorHandler(connection)
    return connection
  } catch (error) {
    throw error
  }
}

function registerModels() {
  require('./models/user')
}

export default { init }
