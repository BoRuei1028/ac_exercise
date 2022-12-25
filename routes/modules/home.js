const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// 瀏覽全部
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name: 'asc' })
    .then(restaurant => res.render('index', { restaurantData: restaurant }))
    .catch(error => console.log(error))
})

router.get('/desc', (req, res) => {

  Restaurant.find()
    .lean()
    .sort({ name: 'desc' }) //排序
    .then(restaurant => res.render('index', { restaurantData: restaurant }))
    .catch(error => console.log(error))
})

router.get('/category', (req, res) => {

  Restaurant.find()
    .lean()
    .sort({ category: 'asc' }) //排序
    .then(restaurant => res.render('index', { restaurantData: restaurant }))
    .catch(error => console.log(error))
})

router.get('/rating', (req, res) => {

  Restaurant.find()
    .lean()
    .sort({ rating: 'asc' }) //排序
    .then(restaurant => res.render('index', { restaurantData: restaurant }))
    .catch(error => console.log(error))
})


module.exports = router