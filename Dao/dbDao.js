const mysql = require('mysql')
const dbdao = require('../config/dbConfig');

module.exports = {
  //查询数据库
  selectInfo(sql,arr){
    return new Promise(((resolve, reject) => {
      dbdao.DB(sql,arr,(err,data)=>{
        err?resolve({code:500,msg:"数据库语句错误",err}):resolve({code:200,msg:"查询成功",data})
      })
    }))
  },
  //添加数据至数据库
  insertInfo(sql,arr){
    return new Promise(((resolve, reject) => {
      dbdao.DB(sql,arr,(err,data)=>{
        err?resolve({code:500,msg:"数据库语句错误",err}):resolve({code:200,msg:"添加成功",data})
      })
    }))
  },
  //删除数据库数据
  deleteInfo(sql,arr){
    return new Promise(((resolve, reject) => {
      dbdao.DB(sql,arr,(err,data)=>{
        err?resolve({code:500,msg:"数据库语句错误",err}):resolve({code:200,msg:"删除成功",data})
      })
    }))
  },
  //修改数据库数据
  updateInfo(sql,arr){
    return new Promise(((resolve, reject) => {
      dbdao.DB(sql,arr,(err,data)=>{
        err?resolve({code:500,msg:"数据库语句错误",err}):resolve({code:200,msg:"修改成功",data})
      })
    }))
  }
}