// 抽取独立的路由模块，方便代码的管理
const express = require('express')
const path = require('path')

//拆分路由模块,可以将路由添加到router对象上
// 在index.js文件中通过app.use方法把router中的路由配置到全局
const router = express.Router()

router.get('/data', (req, res) => {
    res.end('data')
})

//导出路由
module.exports = router