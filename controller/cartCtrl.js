const dbConfig = require('../config/dbConfig');
module.exports = {
    cartInfo(req, resp) {
        // if (req.session.user) {
        // let id = req.session.user.u_id; //客户id
        let id = '1';
        dbConfig.DB(`SELECT c_id,c_number,c_total,c_size,i_src,p_name,p_price,p_inventory FROM(producttable JOIN cart ON p_id=c_pid) JOIN imagetable ON p_id=i_pid WHERE c_uid=?`,
            [id],
            (err, data) => {
                // console.log(data);
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
        // }


    },
    clearAll(req, resp) {
        dbConfig.DB(`TRUNCATE TABLE cart`,
            [],
            (err, data) => {
                if (!err) {
                    if (data.length > 0) {
                        resp.send({
                            code: 200,
                            message: '删除成功'
                        })
                    }
                } else {
                    resp.send({
                        code: 401,
                        message: '删除失败'
                    })
                }
            })
    },
    modifyCartNum(req, resp) {
        let { id, c_number, c_total } = req.body;
        console.log(req.body);
        dbConfig.DB(`update cart set c_number = ? and c_total = ? where c_id = ?`,
            [c_number, id, c_total],
            (err, data) => {
                console.log(data);
                if (!err) {
                    if (data.length > 0) {
                        resp.send({
                            code: 200,
                            message: '修改成功'
                        })
                    }
                } else {
                    resp.send({
                        code: 401,
                        message: '修改失败'
                    })
                }
            })
    },
    searchCart(req, resp) {
        let id = req.query.id
        dbConfig.DB(`SELECT c_total FROM cart WHERE c_id=?`,
            [id],
            (err, data) => {
                // console.log(data);
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