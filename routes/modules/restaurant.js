const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// 新增餐廳
router.get('/restaurant/new', (req, res) => {
  res.render('new')
})

// 瀏覽特定餐廳
router.get('/:restaurant_id', (req, res) => {
  return Restaurant.findById(req.params.restaurant_id)
    .lean()
    .then(item => res.render('detail', { item }))
    .catch(error => console.log(error))
})
// 修改特定資料 => 進入該頁面
router.get('/:restaurant_id/edit', (req, res) => {
  return Restaurant.findById(req.params.restaurant_id)
    .lean()
    .then((restaurantDataById) => res.render('edit', { item: restaurantDataById }))
    .catch(error => console.log(error))
})
//新增餐廳
router.post('/', (req, res) => {
  const restaurantData = req.body
  Restaurant.create(restaurantData)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
//修改特定餐廳
router.put('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  const updateRestaurantData = req.body
  return Restaurant.findByIdAndUpdate(req.params.restaurant_id, updateRestaurantData)
    .then(() => res.redirect(`/restaurant/${id}`))
    .catch(error => console.log(error))
})
//刪除餐廳
router.delete('/:restaurant_id', (req, res) => {
  return Restaurant.findByIdAndDelete(req.params.restaurant_id, req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router