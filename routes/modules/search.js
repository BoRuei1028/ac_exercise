const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// 搜尋功能
router.get('/', (req, res) => {

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


module.exports = router