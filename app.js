const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const router = require('./routes')

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
app.use(router)

// // 搜尋功能
// app.get('/search', (req, res) => {

//   if (!req.query.keyword) {
//     return res.redirect('/')
//   }

//   const userInputKeyword = req.query.keyword
//   const keyword = req.query.keyword.trim().toLowerCase() //搜尋欄name="keyword"
//   Restaurant.find({})
//     .lean()
//     .then((restaurantData) => {
//       const filterData = restaurantData.filter(restaurant => restaurant.name.toLowerCase().includes(keyword) || restaurant.category.includes(keyword)
//       )
//       let searchResult = filterData.length
//       if (!filterData.length) {
//         searchResult = "0" // 給數字0的話，不會顯示出alert
//         return res.render('index', { restaurantData, keyword: userInputKeyword, resultCount: searchResult })
//       }
//       res.render('index', { restaurantData: filterData, keyword: userInputKeyword, resultCount: searchResult })
//     })
//     .catch(error => console.log(error))
// })

app.listen(port)