const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const { mainModule } = require('process')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change.Or use`mongoose.set('strictQuery', true);` to suppress this warning.
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const port = 3000

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected')
})
app.get('/', (req, res) => {
  res.render('index')
})

app.listen(3000)