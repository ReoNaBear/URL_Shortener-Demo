const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const routes = require('./routes')


app.engine('handlebars', exphbs({ defaultLayout: 'main', extname: '.handlebars' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))

require('./config/mongoose')
app.use(routes)

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})