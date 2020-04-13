module.exports = {
  /**
   * 模糊搜索
   * @param {string} table 查询表
   * @param {string} keyword 搜索关键字
   */
  getAllDataByKeyword(table,keyword) {
    return `select * from ${table} where user_cname like '%${keyword}%' 
                                      or user_name  like '%${keyword}%'
                                      or user_department  like '%${keyword}%'
                                      or user_role  like '%${keyword}%'
                                      or create_time  like '%${keyword}%'
                                      or update_time  like '%${keyword}%'`;
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
    return `select * from ${table} where user_cname like '%${keyword}%'
                                      or user_name  like '%${keyword}%'
                                      or user_department  like '%${keyword}%'
                                      or user_role  like '%${keyword}%'
                                      or create_time  like '%${keyword}%'
                                      or update_time  like '%${keyword}%'
                                      order by ${sortField} ${sort} limit ${page}, ${pageSize}`;
  }
}