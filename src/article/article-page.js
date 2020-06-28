const { app, connection } = require('../database');
const { getAll, getList, getInfoByField, delBatch, delByField, addData, updateData, getByTimeRange } = require('../sql/index');

/**
 * 博客页面接口调用
 */

const table = 'article';

/**
 * 根据时间范围搜索博客
 */
app.get('/getarticlebytimerange', (req, res) => {
  const field = 'createTime';
  const startTime = '2020-04-08 00:21:07';
  const endTime = '2020-04-29 17:28:26';
  connection.query(getByTimeRange(table, field, startTime, endTime), (err, results) => {
    if (err) {
      return res.json({ message: err })
    }
    res.json({
      code: 200,
      message: '获取博客信息成功',
      data: results
    })
  })
})

/**
 * 根据id获取博客
 */
app.get('/getarticledetail', (req, res) => {
  const field = 'id';
  const id = req.query.id;
  connection.query(getInfoByField(table, field), id, (err, results) => {
    if (err) {
      return res.json({ message: err })
    }
    res.json({
      code: 200,
      message: '获取博客信息成功',
      data: JSON.stringify(results)
    })
  })
})

/**
 * 添加数据
 * @param {string} name 用户账号
 * @param {string} title 博客名称
 * @param {string} intro 博客简介
 * @param {string} content 博客内容
 * @param {string} createTime 创建时间
 * @param {string} updateTime 更新时间
 */
app.post('/addblog', (req, res) => {
  const data = req.body;
  connection.query(addData(table), data, (err, results) => {
    if (err) {
      return res.json({ message: err })
    }
    res.json({
      code: 200,
      message: '添加博客信息成功',
      affectedRows: results.affectedRows
    })
  })
})