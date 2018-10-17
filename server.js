const express = require('express')
const app = express()
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'data-sfs'
});

connection.connect();

app.set('views', __dirname+ '/views')
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)

app.get('/', (req, res) => {
  res.render('index.html')
})

app.listen(3000, (err) => {
  if(err) {
    console.log(err)
  }
  console.log(`App running on http://localhost:${3000}`)
})