const net = require('./database');

/**
 * 用户管理界面接口调用
 */

/**
 * 获取所有的数据
 */
net.app.get('/getusers', (req, res) => {
  // cors 解决跨域问题	'*': 即允许所有客户端进行跨域
  res.set('Access-Control-Allow-Origin', '*');
  // 定义SQL语句
  const sqlStr = 'select * from user'
  net.connection.query(sqlStr, (err, results) => {
      if(err) {
          return res.json({ message: '获取失败' })
      } 
      res.json({ code:200, message: results })
  })
})

/**
 * 根据id来获取数据
 */
net.app.get('/getuserbyid', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  console.log(req.query);
  const id = req.query.id
  const sqlStr = 'select * from user where id=?'
  net.connection.query(sqlStr, id, (err, results) => {
      if (err) {
          return res.json({ message: '获取数据失败' })
      }
      if (results.length !== 1) {
          return res.json({ message: '数据不存在' })
      }
      res.json({ code:200, message: results })
  })
})

/**
 * 根据user_name来获取数据
 */
net.app.get('/getuserbyusername', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const user_name = req.query.user_name
  const sqlStr = 'select * from user where user_name=?'
  net.connection.query(sqlStr, user_name, (err, results) => {
      if (err) {
          return res.json({ message: '获取数据失败' })
      }
      if (results.length !== 1) {
          return res.json({ message: '数据不存在' })
      }
      res.json({ code:200, message: results })
  })
})

/**
 * 根据id来删除数据
 */
net.app.get('/deleteuserbyid', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const id = req.query.id
  const sqlStr = 'delete from user where id=?'
  net.connection.query(sqlStr, id, (err, results) => {
      if (err) {
          return res.json({ message: '删除数据失败' })
      }
      if (results.affectedRows !== 1) {
          return res.json({ message: '删除数据失败' })
      }
      res.json({code:200, message: '删除成功', affectedRows: results.affectedRows })
  })
})

/**
 * 添加数据
 */
net.app.post('/adduser', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const user = req.body
  console.log(user)
  const sqlStr = 'insert into user set ?'
  net.connection.query(sqlStr, user, (err, results) => {
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
net.app.post('/updateuser', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  const sqlStr = 'update user set ? where id = ?'
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