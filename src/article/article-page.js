const {app, connection} = require('../database');
const {getAll, getList, getInfoByField, delBatch, delByField, addData, updateData, getByTimeRange} = require('../sql/index');

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
