const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const app = express()
const Restaurant = require('./models/restaurant') //載入model

const port = 3000

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

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
// 修改特定資料 => 進入該頁面
app.get('/restaurant/:restaurant_id/edit', (req, res) => {
  return Restaurant.findById(req.params.restaurant_id)
    .lean()
    .then((restaurantDataById) => res.render('edit', { item: restaurantDataById }))
    .catch(error => console.log(error))
})
// 搜尋功能
app.get('/search', (req, res) => {

  if (!req.query.keyword) {
    return res.redirect('/')
  }

  const userInputKeyword = req.query.keyword
  const keyword = req.query.keyword.trim().toLowerCase() //搜尋欄name="keyword"
  Restaurant.find({})
    .lean()
    .then((restaurantData) => {
      const filterData = restaurantData.filter(restaurant => restaurant.name.toLowerCase().includes(keyword) || restaurant.category.includes(keyword)
      )
      let searchResult = filterData.length
      if (!filterData.length) {
        searchResult = "0" // 給數字0的話，不會顯示出alert
        return res.render('index', { restaurantData, keyword: userInputKeyword, resultCount: searchResult })
      }
      res.render('index', { restaurantData: filterData, keyword: userInputKeyword, resultCount: searchResult })
    })
    .catch(error => console.log(error))
})

app.post('/restaurant', (req, res) => {
  const restaurantData = req.body
  Restaurant.create(restaurantData)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
app.put('/restaurant/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  const updateRestaurantData = req.body
  return Restaurant.findByIdAndUpdate(req.params.restaurant_id, updateRestaurantData)
    .then(() => res.redirect(`/restaurant/${id}`))
    .catch(error => console.log(error))
})
app.delete('/restaurant/:restaurant_id', (req, res) => {
  return Restaurant.findByIdAndDelete(req.params.restaurant_id, req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port)