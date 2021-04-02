const dbConfig=require('../config/dbConfig');
module.exports={
    orderAll(req,resp){
        let id=1;
        dbConfig.DB('SELECT o_state,or_pid,i_src,p_name,p_price,or_size,o_id,o_code,or_number,o_total FROM((ordertable JOIN orderrelationship ON o_id=or_oid)JOIN imagetable ON or_pid=i_pid)JOIN producttable ON i_pid=p_id WHERE o_uid=?',[id],function(err,data){
            console.log(err)
            if (!err) {
                console.log(1111)
                if (data.length > 0) {
                    resp.send({
                        code: 200,
                        message: '查询成功',
                        data: data
                    })
                }
            } else {
                console.log(111)
                resp.send({
                    code: 401,
                    message: '查询失败'
                })
            }
        })
    }
}