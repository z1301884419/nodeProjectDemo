const llConfig=require('../config/dbConfig');
module.exports={
    getLogin(req,res){
        let {userName,userPwd}=req.query;
        llConfig.DB(
            'SELECT * FROM usertable WHERE u_account = ? AND u_password = ? ',
            [userName,userPwd],
            (err,data)=>{
                if(!err){
                    if(data.length>0){
                        delete data[0].u_password;
                        Object.assign(req.session,data[0]);
                        res.redirect('/pages/cart.html')
                    }else{
                        res.send({
                            code:401,
                            msg:'查询失败'
                        })
                    }
                }else{
                    console.log('操作数据库失败');
                }
            }
        )
    },
    getUser(req,res){
        console.log(req.session);
    }
}