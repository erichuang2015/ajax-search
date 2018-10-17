const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')

let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'ajax-live-search'
});

connection.connect();

app.set('views', __dirname+ '/views')
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.render('index.html')
})

app.get('/search', (req, res) => {
  name = req.query.key;
  connection.query('SELECT * from tbl_customer where CustomerName LIKE "%'+name+'%"', (err, result, field) => {
    if(err) throw err;
    var data = [];
    for(i=0; i< result.length; i++) {
      data.push(result[i].CustomerName)
    }
    res.end(JSON.stringify(data))
  })
})

app.listen(3000, (err) => {
  if(err) {
    console.log(err)
  }
  console.log(`App running on http://localhost:${3000}`)
})