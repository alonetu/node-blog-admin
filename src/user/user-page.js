const { app, connection } = require('../database');
const { getAll, getList, getInfoByField, delBatch, delByField, addData, updateData } = require('../sql/index');
const { getAllDataByKeyword, getDataByKeyword } = require('../sql/user');

/**
 * 用户管理界面接口调用
 */

// 对user表进行增删改查
const table = 'user';

/**
 * 分页获取用户列表, 模糊搜索
 * @param {string} sortField  排序字段
 * @param {string} sort  排序方式
 * @param {number} page  从page条数据开始查询
 * @param {number} pageSize  每页条数
 * @param {string} keyword 搜索关键字
 */
app.get('/getuserlist', (req, res) => {
  const pageNo = req.query.pageNo;
  const pageSize = req.query.pageSize;
  const page = (pageNo - 1) * pageSize;
  const sortField = req.query.sortField === '' ? 'id' : req.query.sortField;
  const sort = req.query.sort;
  const keyword = req.query.keyword;
  let AllInfo = '';
  let ListInfo = '';
  if (!keyword) {
    AllInfo = getAll(table);
    ListInfo = getList(table, sortField, sort, page, pageSize);
  } else {
    AllInfo = getAllDataByKeyword(table, keyword);
    ListInfo = getDataByKeyword(table, keyword, sortField, sort, page, pageSize);
  }
  let pageTotal = 0;
  connection.query(AllInfo, (err, results) => {
    if (err) {
      return res.json({ message: err })
    }
    pageTotal = results.length;
  })
  connection.query(ListInfo, (err, results) => {
    if (err) {
      return res.json({
        message: err
      })
    }
    res.json({
      code: 200,
      message: '获取用户信息成功',
      data: results,
      pageTotal,
      pageNo,
      pageSize
    })
  })
})

/**
 * 根据id来获取数据
 * @param {number} id 用户id
 */
app.get('/getuserbyid', (req, res) => {
  const field = 'id';
  const id = req.query.id;
  connection.query(getInfoByField(table, field), id, (err, results) => {
    if (err) {
      return res.json({ message: err })
    }
    res.json({
      code: 200,
      message: '获取用户信息成功',
      data: results,
      pageTotal: results.length
    })
  })
})

/**
 * 根据name来获取数据
 * @param {string} name name
 */
app.get('/getuserbyusername', (req, res) => {
  const field = 'name';
  const name = req.query.name;
  connection.query(getInfoByField(table, field), name, (err, results) => {
    if (err) {
      return res.json({ message: err })
    }
    if (!results.length) {
      return res.json({
        code: 400,
        message: '用户不存在'
      })
    }
    res.json({
      code: 200,
      message: '获取用户信息成功',
      data: results
    })
  })
})

/**
 * 根据id来删除数据
 * @param {number} id 用户id
 */
app.get('/deleteuserbyid', (req, res) => {
  const field = 'id';
  const id = req.query.id;
  connection.query(delByField(table, field), id, (err, results) => {
    if (err) {
      return res.json({ message: err })
    }
    res.json({
      code: 200,
      message: '删除用户信息成功',
      affectedRows: results.affectedRows
    })
  })
})

/**
 * 批量删除
 * @param {Array} ids 用户id数组
 */
app.post('/delbatch', (req, res) => {
  const field = 'id';
  const arr = JSON.parse(req.body);
  // const arr = JSON.parse(req.query.ids);
  console.log(arr instanceof Array);
  arr = arr.join().replace(new RegExp('"', "gm"), '');
  connection.query(delBatch(table, field, arr), (err, results) => {
    if (err) {
      return res.json({ message: err })
    }
    res.json({
      code: 200,
      message: '删除用户信息成功',
      affectedRows: results.affectedRows
    })
  })
})

/**
 * 添加数据
 * @param {string} cname 中文用户名
 * @param {string} name 用户账号
 * @param {string} password 用户密码
 * @param {string} department 用户部门
 * @param {string} role 用户角色
 */
app.post('/adduser', (req, res) => {
  const data = req.body;
  connection.query(addData(table), data, (err, results) => {
    if (err) {
      return res.json({ message: err })
    }
    res.json({
      code: 200,
      message: '添加用户信息成功',
      affectedRows: results.affectedRows
    })
  })
})

/**
 * 修改数据
 * @param {number} id 用户id
 * @param {string} cname 中文用户名
 * @param {string} name 用户账号
 * @param {string} password 用户密码
 * @param {string} department 用户部门
 * @param {string} role 用户角色
 */
app.post('/updateuser', (req, res) => {
  const field = 'id';
  const data = req.body;
  const id = req.body.id;
  connection.query(updateData(table, field), [data, id], (err, results) => {
    if (err) {
      return res.json({ message: err })
    }
    res.json({
      code: 200,
      message: '修改用户信息成功',
      affectedRows: results.affectedRows
    })
  })
})