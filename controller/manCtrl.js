const dbDao = require('../Dao/dbDao')
const dbConfig=require('../config/dbConfig');
module.exports = {  
    // async selectMan(){
    //     console.log(111)
    //     let obj = await dbDao.selectInfo(`select * from ProductTable where p_kind = 1`)
    //     console.log(obj);
    // }
    selectMan(req,resp){      
        let sql = 'select * from ProductTable where p_kind = 1'
        dbConfig.DB(sql,(err,data)=>{
            if(!err){
                resp.send({
                    code:200,
                    msg:'查询成功',
                    data
                })
            }else{
                resp.send({
                    code:401,
                    msg:'查询失败',
                    data:'查询失败'
                })
            }
        })
    },
    selectManImg(req,resp){
        let arr = req.query.obj
        let sql ='select i_src from (ImageTable join producttable on p_id=i_pid) join kindtable on k_id=p_kind where k_id=1 '
        for(let i=0;i<arr.length;i++){
            sql += ' or i_pid = ?'      
        }
        console.log(arr)
        console.log(sql)
        dbConfig.DB(sql,arr,(err,data)=>{
                    if(!err){
                        resp.send({
                            code:200,
                            msg:'查询成功',
                            data
                        })
                    }else{
                        resp.send({
                            code:401,
                            msg:'查询失败',
                            data
                        })
                    }  
        })  
    }
}