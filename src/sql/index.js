/**
 * 定义sql语句
 */
module.exports = {
  /**
   * 获取表中所有数据
   * @param {string} table 查询表
   */
  getAll(table) {
    return `select * from ${table}`;
  },
  /**
   * 分页获取数据
   * @param {string} table 查询表
   * @param {string} sortField  排序字段
   * @param {string} sort  排序方式
   * @param {number} page  从page条数据开始查询
   * @param {number} pageSize  每页条数
   */
  getList(table, sortField, sort, page, pageSize) {
    return `select * from ${table} order by ${sortField} ${sort} limit ${page}, ${pageSize}`;
  },
  /**
   * 根据字段获取数据
   * @param {string} table  查询表
   * @param {string} field  查询字段
   */
  getInfoByField(table, field) {
    return `select * from ${table} where ${field} = ?`;
  },
  /**
   * 根据字段删除数据
   * @param {string} table  查询表
   * @param {string} field  查询字段
   */
  delByField(table, field) {
    return `delete from ${table} where ${field} = ?`;
  },
  /**
   * 批量删除
   * @param {string} table  查询表
   * @param {string} field  查询字段
   * @param {string} fieldValue  查询字段值
   */
  delBatch(table, field, fieldValue) {
    return `delete from ${table} where ${field} in (${fieldValue})`;
  },
  /**
   * 添加数据
   * @param {string} table 插入表
   */
  addData(table) {
    return `insert into ${table} set ?`;
  },
  /**
   * 修改数据
   * @param {string} table 更新表
   * @param {string} field 查询字段
   */
  updateData(table, field) {
    return `update ${table} set ? where ${field} = ?`;
  },
  /**
   * 根据时间范围查询数据
   * @param {string} table 查询表
   * @param {string} field 查询字段 
   * @param {string} startTime 开始时间
   * @param {string} endTime 结束时间
   */
  getByTimeRange(table, field, startTime, endTime) {
    return `select * from ${table} where ${field} > "${startTime}" and ${field} < "${endTime}"`;
  }
}