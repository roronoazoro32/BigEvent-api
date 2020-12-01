// 抽取独立的路由模块，方便代码的管理
const express = require('express')
const path = require('path')
// 导入加密模块
const utility = require('utility')

//导入token验证机制
const jwt = require('jsonwebtoken')

// 导入数据库通用模块
const db = require(path.join(__dirname, '../common.js'))


//拆分路由模块,可以将路由添加到router对象上
// 在index.js文件中通过app.use方法把router中的路由配置到全局
const router = express.Router()

// 测试数据库接口
// router.get('/test', async (req, res) => {
//     //查询表单数据
//     let sql = 'select * from myuser'
//     //返回的是promise实例对象,sql,上一句查询条件,null是占位符,查询条件
//     let ret = await db.operateDb(sql, null)
//     if (ret && ret.length > 0) {
//       res.json({
//         status: 0,
//         message: '查询数据成功',
//         data: ret
//       })
//     } else {
//       res.json({
//         status: 1,
//         message: '查询数据失败'
//       })
//     }
//   })


// //注册接口
router.post('/reguser', async (req,res) => {
  // 1.获取表单数据
  let params = req.body
  
  // 1.1对密码进行加密
  params.password = utility.md5(params.password)


 // 在插入数据库之前,进性添加用户名重复判断
  let csql = 'select id from myuser where username = ?' //根据id在表里面查询有没有重复的用户名
  let flag = await db.operateDb(csql, params.username)
  if (flag && flag.length > 0) { //假如flag为true且flag的长度大于0表示已经有这个用户名了
    // 用户名已经存在
    res.json({
      status: 1,
      message:'用户名已经存在'
    })
    return //停止接下来的代码操作
  }
  
  // 2.把数据插入数据库
  var sql = 'insert into myuser set ?'  //insert into 表名 (字段名称, 字段名称1,...) values (字段值，字段值1,...) (插入的数据要跟名称一一对应)
  let ret = await db.operateDb(sql,params) //把得到的表单信息插入数据库中
  
  // 3.返回一个操作结果状态
  if (ret && ret.affectedRows > 0) {
    res.json({
      status: 0,
      message:'注册成功'
    })
  }
  //
  else {
    res.json({
      status: 1,
      message:'注册失败'
    })
  }
})


//导出路由
module.exports = router





  