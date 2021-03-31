const dbConfig = require('../config/dbConfig');
module.exports = {
    cartInfo(req, resp) {
        // if(req.session.user){

        // }
        let id = '1'; //客户id
        dbConfig.DB(`SELECT c_id,c_size,i_src,p_name,p_price,p_inventory FROM(producttable JOIN cart ON p_id=c_pid) JOIN imagetable ON p_id=i_pid WHERE c_id=?`,
            [id],
            (err, data) => {
                console.log(data);
                if (!err) {
                    if (data.length > 0) {
                        resp.send({
                            code: 200,
                            message: '查询成功',
                            data: data
                        })
                    }
                } else {
                    resp.send({
                        code: 401,
                        message: '查询失败'
                    })
                }
            })

    }
}