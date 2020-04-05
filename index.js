const express = require('express')
const mysql = require('mysql')

const app = express()

// 开启 http://127.0.0.1:3000 的服务
app.listen(3000, () => {
    console.log('服务器启动地址: http://127.0.0.1:3000')
})

// 连接mysql数据库
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'corporateblog'
})

// 使用内置中间件用于获取post请求体参数
app.use(express.urlencoded({extended: true}))

// user
// 获取所有的数据
app.get('/getusers', (req, res) => {
    // cors 解决跨域问题	'*': 即允许所有客户端进行跨域
    res.set('Access-Control-Allow-Origin', '*');
    // 定义SQL语句
    const sqlStr = 'select * from user'
    connection.query(sqlStr, (err, results) => {
        if(err) {
            return res.json({ message: '获取失败' })
        } 
        res.json({ code:200, message: results })
    })
})

// 根据id来获取数据
// select count(*) from corporateblog.article where article_author = 'luban' 查询对应的记录
app.get('/getuserbyid', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const id = req.query.id
    const sqlStr = 'select * from user where id=?'
    connection.query(sqlStr, id, (err, results) => {
        if (err) {
            return res.json({ message: '获取数据失败' })
        }
        if (results.length !== 1) {
            return res.json({ message: '数据不存在' })
        }
        res.json({ code:200, message: results })
    })
})

// 根据user_name来获取数据
app.get('/getuserbyusername', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const user_name = req.query.user_name
    const sqlStr = 'select * from user where user_name=?'
    connection.query(sqlStr, user_name, (err, results) => {
        if (err) {
            return res.json({ message: '获取数据失败' })
        }
        if (results.length !== 1) {
            return res.json({ message: '数据不存在' })
        }
        res.json({ code:200, message: results })
    })
})

// 根据id来删除数据
app.get('/deleteuserbyid', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const id = req.query.id
    const sqlStr = 'delete from user where id=?'
    connection.query(sqlStr, id, (err, results) => {
        if (err) {
            return res.json({ message: '删除数据失败' })
        }
        if (results.affectedRows !== 1) {
            return res.json({ message: '删除数据失败' })
        }
        res.json({code:200, message: '删除成功', affectedRows: results.affectedRows })
    })
})

// 添加数据
app.post('/adduser', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const user = req.body
    console.log(user)
    const sqlStr = 'insert into user set ?'
    connection.query(sqlStr, user, (err, results) => {
        if (err) {
            return res.json({ message: '添加失败' })
        }
        if (results.affectedRows !== 1) {
            return res.json({ message: '添加失败' })
        }
        res.json({ code:200, message: '添加成功', affectedRows: results.affectedRows })
    })
})

// 修改数据
app.post('/updateuser', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    const sqlStr = 'update user set ? where id = ?'
    connection.query(sqlStr, [req.body, req.body.id], (err, results) => {
        if (err) {
            return res.json({ message: '更新数据失败' })
        }
        if (results.affectedRows !== 1) {
            return res.json({ message: '数据不存在' })
        }
        res.json({ code:200, message: '更新成功', affectedRows: results.affectedRows })
    })
})

// article
// 获取所有的数据
app.get('/getarticles', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    // 定义SQL语句
    const sqlStr = 'select * from article'
    connection.query(sqlStr, (err, results) => {
        if (err) {
            return res.json({ message: '获取失败' })
        }
        res.json({ code:200, message: results })
    })
})

// 根据id来获取数据
app.get('/getarticlebyid', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const id = req.query.id
    const sqlStr = 'select * from article where id=?'
    connection.query(sqlStr, id, (err, results) => {
        if (err) {
            return res.json({ message: '获取数据失败' })
        }
        if (results.length !== 1) {
            return res.json({ message: '数据不存在' })
        }
        res.json({ code:200, message: results[0] })
    })
})

// 根据作者来获取数据
app.get('/getarticlebyauthor', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const article_author = req.query.article_author
    const sqlStr = 'select * from article where article_author=?'
    connection.query(sqlStr, article_author, (err, results) => {
		// console.log(results)
        if (err) {
            return res.json({ message: '获取数据失败' })
        }
        res.json({ code:200, message: results })
    })
})

// 根据id来删除数据 Q
app.get('/deletearticlebyid', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const id = req.query.id
    const sqlStr = 'delete from article where id=?'
    connection.query(sqlStr, id, (err, results) => {
        if (err) {
            return res.json({ message: '删除数据失败' })
        }
        if (results.affectedRows !== 1) {
            return res.json({ message: '删除数据成功' })
        }
        res.json({ code:200, message: '删除成功', affectedRow: results.affectedRows })
    })
})

// 添加数据
app.post('/addarticle', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const article = req.body
    console.log(article)
    const sqlStr = 'insert into article set ?'
    connection.query(sqlStr, article, (err, results) => {
        if (err) {
            return res.json({ message: '添加失败' })
        }
        if (results.affectedRows !== 1) {
            return res.json({ message: '添加失败' })
        }
        res.json({ code:200, message: '添加成功', affectedRows: results.affectedRows })
    })
})

// 修改数据
app.post('/updatearticle', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    const sqlStr = 'update article set ? where id = ?'
    connection.query(sqlStr, [req.body, req.body.id], (err, results) => {
        if (err) {
            return res.json({ message: '更新数据失败' })
        }
        if (results.affectedRows !== 1) {
            return res.json({ message: '数据不存在' })
        }
        res.json({ code:200, message: '更新成功', affectedRows: results.affectedRows })
    })
})
