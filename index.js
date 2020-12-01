// 基于express实现接口基本结构
// 处理请求参数
// 处理跨域问题
// index.js文件相当于在本地创建一个服务器
// express相当于是构建服务器

const express = require('express')
// 构建一个express实例对象,把express的方法挂载在实例对象上
const app = express()
const cors = require('cors')
const path = require('path')

//导入路由文件
const loginRouter = require(path.join(__dirname, 'router/login-router.js'))

// 处理客户端请求post参数
// 用于解析 application/json 格式参数
app.use(express.json()) 

// 用于解析 application/x-www-form-urlencoded 格式参数
app.use(express.urlencoded({ extended: true })) 

// 设置跨域
app.use(cors())

//监听端口
app.listen(8888, () => {
    console.log('running...');
})

//监听客户端请求
// 配置路由模块 /api/abc
// app.use函数的参数一表示在路由的前面统一添加一层路径
// app.use函数的参数二表示独立的路由模块
app.use('/api', loginRouter) //这里的loginRouter 是一个路由地址,所以要导入路由的文件

//错误.如果使用拆解路由的话就要使用中间件app.use
//自己写的话就是使用app.get