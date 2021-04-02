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
                    if (data != undefined) {
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
        console.log(req.query);
        let total_data = req.query.total_data;
    },
    searchCart(req, resp) {
        let total_data = req.query.total_data;
        // console.log(total_data);
        let total_ids = [];
        let temp_total_data = {}
        let return_data = {}
        let return_data_items = []
        let return_data_result = 0;
        let str = "select c.c_id, p.p_price from cart c,productTable p where c.c_pid=p.p_id and (" 
        total_data.forEach(obj => {
            temp_total_data[obj["id"]] = obj["num"];
            total_ids.push(obj["id"]);
            str += `c_id= ${obj["id"]} or `
        });
        // order by c_price desc
        str = str.substr(0, str.length - 3);
        str += " ) "
        console.log(str);
        dbConfig.DB(str,
            [],
            (err, data) => {
                console.log(data);
                if (!err) {
                    if (data.length > 0) {
                        console.log(temp_total_data);
                        console.log(data[0]["c_id"])
                        data.forEach(obj => {
                            let single_total = parseFloat(obj["p_price"]) * parseFloat(temp_total_data[obj["c_id"]]);
                            let single_data = {c_id: obj["c_id"], num: temp_total_data[obj["c_id"]], p_price: obj["p_price"], single_total: single_total};
                            return_data_items.push(single_data);
                            return_data_result += single_total;
                        });

                        return_data["items"] = return_data_items;
                        return_data["result"] = return_data_result;
                        resp.send({
                            code: 200,
                            message: '查询成功',
                            data: return_data
                        })
                    }
                } else {
                    resp.send({
                        code: 401,
                        message: '查询失败'
                    })
                }
            })

        // 计算
        // "select c_price from cart where c_id=?"
        // dbConfig.DB(
        //     "select c_price from cart where c_id in "
        // )

        // dbConfig.DB(`SELECT c_total FROM cart WHERE c_id=?`,
        //     [id],
        //     (err, data) => {
        //         // console.log(data);
        //         if (!err) {
        //             if (data.length > 0) {
        //                 resp.send({
        //                     code: 200,
        //                     message: '查询成功',
        //                     data: data
        //                 })
        //             }
        //         } else {
        //             resp.send({
        //                 code: 401,
        //                 message: '查询失败'
        //             })
        //         }
        //     })
    },
    checkOutSelect(req, resp) {
        console.log(req.query);
        let sqlStr = 'SELECT * FROM cart WHERE '
        for(let i = 0; i < req.query.id.length; i++){
            sqlStr += `c_id=${req.query.id[i]} OR `
        }
        sqlStr = sqlStr.substr(0, sqlStr.length - 3);
        console.log(sqlStr);
        dbConfig.DB(sqlStr,
            [],
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
        
    },
    checkOut(req,resp){
        console.log(req.body);
    }
}