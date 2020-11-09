const express = require('express');
const mysql = require('mysql');

const app = express();

/**
 * 开启 http://127.0.0.1:3000 的服务
 */
app.listen(5000, () => {
  console.log('服务器启动地址: http://127.0.0.1:5000');
})

/**
 * 使用内置中间件用于获取post请求体参数
 */
app.use(express.urlencoded({ extended: true }));

/**
 * 连接mysql数据库
 */
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'vue_blog'
})

/**
 * 导出模块
 */
module.exports = {
  app,
  connection
}