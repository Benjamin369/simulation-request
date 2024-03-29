const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// 设置跨域
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', '3.2.1')
    res.header('Content-type', 'application/json;charset=utf-8')
    next()
})

// exports.app
module.exports = app