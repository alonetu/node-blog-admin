module.exports = {
  /**
   * 模糊搜索
   * @param {string} table 查询表
   * @param {string} keyword 搜索关键字
   */
  getAllDataByKeyword(table, keyword) {
    return `select * from ${table} where cname like '%${keyword}%' 
                                      or name  like '%${keyword}%'
                                      or department  like '%${keyword}%'
                                      or role  like '%${keyword}%'
                                      or createTime  like '%${keyword}%'
                                      or updateTime  like '%${keyword}%'`;
  },
  /**
   * 模糊搜索
   * @param {string} table 查询表
   * @param {string} sortField  排序字段
   * @param {string} sort  排序方式
   * @param {number} page  从page条数据开始查询
   * @param {number} pageSize  每页条数 
   * @param {string} keyword  搜索关键字
   */
  getDataByKeyword(table, keyword, sortField, sort, page, pageSize) {
    return `select * from ${table} where cname like '%${keyword}%'
                                      or name  like '%${keyword}%'
                                      or department  like '%${keyword}%'
                                      or role  like '%${keyword}%'
                                      or createTime  like '%${keyword}%'
                                      or updateTime  like '%${keyword}%'
                                      order by ${sortField} ${sort} limit ${page}, ${pageSize}`;
  }
}