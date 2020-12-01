// 抽取独立的路由模块，方便代码的管理
const express = require('express')
const path = require('path')

// 导入数据库通用模块
const db = require(path.join(__dirname, '../common.js'))


//拆分路由模块,可以将路由添加到router对象上
// 在index.js文件中通过app.use方法把router中的路由配置到全局
const router = express.Router()

// 测试数据库接口
router.get('/test', async (req, res) => {
    //查询表单数据
    let sql = 'select * from myuser'
    //返回的是promise实例对象,sql,上一句查询条件,null是占位符,查询条件
    let ret = await db.operateDb(sql, null)
    if (ret && ret.length > 0) {
      res.json({
        status: 0,
        message: '查询数据成功',
        data: ret
      })
    } else {
      res.json({
        status: 1,
        message: '查询数据失败'
      })
    }
  })
//导出路由
module.exports = router