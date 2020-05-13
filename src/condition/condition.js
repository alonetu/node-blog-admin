const {app, connection} = require('../database');
const {
  getAll, 
  getList, 
  getInfoByField, 
  delBatch, 
  delByField, 
  addData, 
  updateData, 
  getByTimeRange
} = require('../sql/index');

/**
 * 搜索条件
 */

const table = 'savesearch';

/**
 * 添加数据
 * @param {string} username 用户名
 * @param {string} saveName 保存名称
 * @param {string} keyword 保存关键字
 * @param {string} dateTime 保存时间段
 */
app.post('/addsavesearch', (req, res) => {
  const data = req.body;
  connection.query(addData(table), data, (err, results) => {
      if (err) {
          return res.json({ message: err })
      }
      res.json({ 
          code: 200, 
          message: '保存信息成功', 
          affectedRows: results.affectedRows 
      })
  })
})


/**
 * 获取所有保存条件
 */
app.get('/getsavesearch', (req, res) => {
  connection.query(getAll(table), (err, results) => {
      if (err) {
          return res.json({ message: err })
      }
      res.json({ 
          code: 200, 
          message: '获取信息成功',
          data: results,
          pageTotal: results.length
      })
  })
})


/**
 * 根据id来删除数据
 * @param {number} id 保存条件的id
 */
app.get('/deletesearchbyid', (req, res) => {
  const field = 'id';
  const id = req.query.id;
  connection.query(delByField(table, field), id, (err, results) => {
      if (err) {
          return res.json({ message: err })
      }
      res.json({ 
          code: 200, 
          message: '删除信息成功', 
          affectedRows: results.affectedRows
      })
  })
})