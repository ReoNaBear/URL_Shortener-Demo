const express = require('express')
const router = express.Router()
const createShortURL = require('../../ShortURL')
const URL = require('../../models/URL_transfer')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/result', (req, res) => {
  URL.findOne({ originURL: req.body.URL })
    .lean()
    .select('shortURL')
    .then((newURL) => {
      // 輸出新的網址
      let shortURL = ''
      //確認是否為資料庫內沒有的網址
      if (!newURL) {
        shortURL = createShortURL()
        URL.create({
          originURL: req.body.URL,
          shortURL: shortURL,
        })
        //已經有短網址的URL
      } else {
        shortURL = newURL.shortURL
      }
      return res.render('result', { shortURL: `http://localhost:3000/${shortURL}` })
    })
    .catch(error => console.log(error))
})

router.get('/:shortURL', (req, res) => {
  URL.findOne({ shortURL: req.params.shortURL })
    .select('originURL')
    .lean()
    .then((URL) => {
      if (URL) return res.redirect(`${URL.originURL}`)
      return res.redirect('/error')
    })
    .catch(error => console.log(error))
})

module.exports = router