const mongoose = require('mongoose')
const Restaurant = require('../restaurant') //從restaurant.js載入 model 物件
const restaurantList = require('../../restaurant.json').results //從這支檔案載入json

const db = require('../../config/mongoose')

db.once('open', () => {
  Restaurant.create(restaurantList) //透過model操作create()，得以將資料新增進資料庫
    .then(() => {
      db.close() //關閉指令
    })
    .catch((error) => {
      console.log(error)
    })
  console.log('done')
})

