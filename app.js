const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const app = express()
const Restaurant = require('./models/restaurant') //載入model
// const restaurant = require('./models/restaurant')
const port = 3000
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })



const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected')
})

// 瀏覽全部
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => res.render('index', { restaurantData: restaurant }))
    .catch(error => console.log(error))
})
// 新增餐廳
app.get('/restaurant/new', (req, res) => {
  res.render('new')
})

// 瀏覽特定餐廳
app.get('/restaurant/:restaurant_id', (req, res) => {
  return Restaurant.findById(req.params.restaurant_id)
    .lean()
    .then(item => res.render('detail', { item }))
    .catch(error => console.log(error))
})
app.get('/restaurant/:restaurant_id/edit', (req, res) => {
  return Restaurant.findById(req.params.restaurant_id)
    .lean()
    .then((restaurantDataById) => res.render('edit', { item: restaurantDataById }))
    .catch(error => console.log(error))
})
// 新增餐廳to資料庫
app.post('/restaurant', (req, res) => {
  const restaurantData = req.body
  Restaurant.create(restaurantData)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
app.post('/restaurant/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  const updateRestaurantData = req.body
  return Restaurant.findByIdAndUpdate(req.params.restaurant_id, updateRestaurantData)
    .then(() => res.redirect(`/restaurant/${id}`))
    .catch(error => console.log(error))
})
app.listen(3000)