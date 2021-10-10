const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
//const routes = require('./routes')
//require('./config/mongoose')
const app = express()
const createShortURL = require('./shortURL')
const URL = require('./models/URL_transfer')


app.engine('handlebars', exphbs({ defaultLayout: 'main', extname: '.handlebars' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


require('./config/mongoose')

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/result', (req, res) => {
  URL.findOne({ originURL: req.body.URL })
    .lean()
    .select('shortURL')
    .then((newURL) => {
      let shortURL = ''
      if (!newURL) {
        shortURL = createShortURL()
        URL.create({
          originURL: req.body.URL,
          shortURL: shortURL,
        })
      } else {
        shortURL = newURL.shortURL
      }
      return res.render('result', { shortURL: `http://localhost:3000/${shortURL}` })
    })
    .catch(error => console.log(error))
})

app.get('/:shortURL', (req, res) => {
  URL.findOne({ shortURL: req.params.shortURL })
    .select('originURL')
    .lean()
    .then((URL) => {
      if (URL) return res.redirect(`${URL.originURL}`)
      return res.redirect('/error')
    })
    .catch(error => console.log(error))
})


app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})