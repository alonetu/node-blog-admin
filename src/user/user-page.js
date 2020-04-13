const net = require('../database');
const sql = require('../sql/index');
const {getAllDataByKeyword, getDataByKeyword} = require('../sql/user');

/**
 * 用户管理界面接口调用
 * cors 解决跨域问题	'*': 即允许所有客户端进行跨域
 * res.set('Access-Control-Allow-Origin', '*');
 */

// 对user表进行增删改查
const table = 'user';

/**
 * 分页获取用户列表, 模糊搜索
 * @param {string} sortField  排序字段
 * @param {string} sort  排序方式
 * @param {number} page  从page条数据开始查询
 * @param {number} pageSize  每页条数
 * @param (string) keyword 搜索关键字
 */
net.app.get('/getuserlist', (req, res) => {
    const pageNo = req.query.pageNo;
    const pageSize = req.query.pageSize;
    const page = (pageNo - 1) * pageSize;
    const sortField = req.query.sortField === '' ? 'id' : req.query.sortField;
    const sort = req.query.sort;
    const keyword = req.query.keyword;
    let AllInfo = '';
    let ListInfo = '';
    if(!keyword) {
        AllInfo = sql.getAll(table);
        ListInfo = sql.getList(table, sortField, sort, page, pageSize);
    }else {
        AllInfo = getAllDataByKeyword(table, keyword);
        ListInfo = getDataByKeyword(table, keyword, sortField, sort, page, pageSize);
    }
    let pageTotal = 0;
    net.connection.query(AllInfo, (err, results) => {
        if (err) {
            return res.json({ message: err })
        }
        pageTotal = results.length;
    })
    net.connection.query(ListInfo, (err, results) => {
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
 * @param (number) id 用户id
 */
net.app.get('/getuserbyid', (req, res) => {
    const field = 'id';
    const id = req.query.id;
    net.connection.query(sql.getInfoByField(table, field), id, (err, results) => {
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
 * 根据id来删除数据
 * @param (number) id 用户id
 */
net.app.get('/deleteuserbyid', (req, res) => {
    const field = 'id';
    const id = req.query.id;
    net.connection.query(sql.delByField(table, field), id, (err, results) => {
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
 * @param (string) user_cname 中文用户名
 * @param (string) user_name 用户账号
 * @param (string) user_password 用户密码
 * @param (string) user_department 用户部门
 * @param (string) user_role 用户角色
 */
net.app.post('/adduser', (req, res) => {
    const data = req.body;
    net.connection.query(sql.addData(table), data, (err, results) => {
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
 * @param (number) id 用户id
 * @param (string) user_cname 中文用户名
 * @param (string) user_name 用户账号
 * @param (string) user_password 用户密码
 * @param (string) user_department 用户部门
 * @param (string) user_role 用户角色
 */
net.app.post('/updateuser', (req, res) => {
    const field = 'id';
    const data = req.body;
    const id = req.body.id;
    net.connection.query(sql.updateData(table, field), [data, id], (err, results) => {
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