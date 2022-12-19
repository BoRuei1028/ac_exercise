const mongoose = require('mongoose')
const Restaurant = require('../restaurant') //從restaurant.js載入 model 物件
const restaurantList = require('../../restaurant.json').results //從這支檔案載入json

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log(error)
})
db.once('open', () => {
  console.log('mongodb connected')
  Restaurant.create(restaurantList) //透過model操作create()，得以將資料新增進資料庫
    .then(() => {
      console.log('create restaurantList')
      db.close() //關閉指令
    })
    .catch((error) => {
      console.log(error)
    })
})

