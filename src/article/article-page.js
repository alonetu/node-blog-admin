const net = require('../database');

/**
 * 博客页面接口调用
 */

/**
 * 获取所有的数据
 */
net.app.get('/getarticles', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  // 定义SQL语句
  const sqlStr = 'select * from article'
  net.connection.query(sqlStr, (err, results) => {
      if (err) {
          return res.json({ message: '获取失败' })
      }
      res.json({ code:200, message: results })
  })
})

/**
 * 根据id来获取数据
 */
net.app.get('/getarticlebyid', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const id = req.query.id
  const sqlStr = 'select * from article where id=?'
  net.connection.query(sqlStr, id, (err, results) => {
      if (err) {
          return res.json({ message: '获取数据失败' })
      }
      if (results.length !== 1) {
          return res.json({ message: '数据不存在' })
      }
      res.json({ code:200, message: results[0] })
  })
})

/**
 * 根据作者来获取数据
 */
net.app.get('/getarticlebyauthor', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const article_author = req.query.article_author
  const sqlStr = 'select * from article where article_author=?'
  net.connection.query(sqlStr, article_author, (err, results) => {
  // console.log(results)
      if (err) {
          return res.json({ message: '获取数据失败' })
      }
      res.json({ code:200, message: results })
  })
})

/**
 * 根据id来删除数据
 */
net.app.get('/deletearticlebyid', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const id = req.query.id
  const sqlStr = 'delete from article where id=?'
  net.connection.query(sqlStr, id, (err, results) => {
      if (err) {
          return res.json({ message: '删除数据失败' })
      }
      if (results.affectedRows !== 1) {
          return res.json({ message: '删除数据成功' })
      }
      res.json({ code:200, message: '删除成功', affectedRow: results.affectedRows })
  })
})

/**
 * 添加数据
 */
net.app.post('/addarticle', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const article = req.body
  console.log(article)
  const sqlStr = 'insert into article set ?'
  net.connection.query(sqlStr, article, (err, results) => {
      if (err) {
          return res.json({ message: '添加失败' })
      }
      if (results.affectedRows !== 1) {
          return res.json({ message: '添加失败' })
      }
      res.json({ code:200, message: '添加成功', affectedRows: results.affectedRows })
  })
})

/**
 * 修改数据
 */
net.app.post('/updatearticle', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  const sqlStr = 'update article set ? where id = ?'
  net.connection.query(sqlStr, [req.body, req.body.id], (err, results) => {
      if (err) {
          return res.json({ message: '更新数据失败' })
      }
      if (results.affectedRows !== 1) {
          return res.json({ message: '数据不存在' })
      }
      res.json({ code:200, message: '更新成功', affectedRows: results.affectedRows })
  })
})