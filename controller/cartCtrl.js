const dbConfig = require('../config/dbConfig');
const dbDao = require('../Dao/dbDao');
const Dao = require("../Dao/dbDao")
module.exports = {
    cartInfo(req, resp) {
        if (req.session.user) {
            let id = req.session.user.u_id; //客户id
            // let id = '2';
            dbConfig.DB(`SELECT c_id,c_pid,c_number,c_total,c_size,i_src,p_name,p_price,p_inventory FROM(producttable JOIN cart ON p_id=c_pid) JOIN imagetable ON p_id=i_pid WHERE c_uid=?`,
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
    async modifyCartNum(req, resp) {
        // console.log(req.query);
        let total_data = req.query.total_data;
        // console.log(total_data);
        let new_Number = parseInt(total_data[0]["num"]);
        // temp_total_data[total_data[0]["id"]] = total_data[0]["num"];
        // 这个是当前的数量 total_data[0]["num"]
        // 这个是当前的购物车id total_data[0]["id"]
        // 这个是购物车点击加号以后看是否勾选的状态 total_data[0]["checkState"]
        // 这个是点击的是加号还是减号  total_data[0]["add_or_sub"]
        // console.log(total_data[0]["add_or_sub"]);
        // 现在的new_Number就是加/减完以后的数量
        // console.log(new_Number);
        let cartSelect = await dbDao.selectInfo(
            `select c.c_id, p.p_price from cart c,productTable p where c.c_pid=p.p_id and c_id=${total_data[0]["id"]}`,
            []
        )
        // console.log(cartSelect);
        let return_data = {};
        let return_data_items = [];
        let return_data_result = 0;
        let return_account = 0;
        let single_total = parseFloat(cartSelect.data[0]["p_price"]) * new_Number; //单个商品的价格
        // console.log(single_total);
        let single_data = { c_id: total_data[0]["num"], num: new_Number, p_price: cartSelect.data[0]["p_price"], single_total: single_total };
        // console.log(single_data);
        return_data_items.push(single_data);
        return_data_result += single_total;
        return_data["items"] = return_data_items;
        return_data["result"] = return_data_result;
        console.log(return_data);
        let modifyCart = await dbDao.updateInfo(
            `update cart set c_number = ?, c_total=? where c_id = ?`,
            [new_Number, single_total, total_data[0]["id"]]
        )
        console.log(return_data);
        resp.send({
            code: modifyCart.code,
            message: modifyCart.msg,
            data: return_data
        })

    },
    searchCart(req, resp) {
        let total_data = req.query.total_data;
        // console.log(req.query.total_data);
        console.log(total_data);
        let total_ids = [];
        let temp_total_data = {}
        let return_data = {}
        let return_data_items = []
        let return_data_result = 0;
        let str = "select c_id, p_price, c_number from cart,productTable where c_pid=p_id and ("
        total_data.forEach(obj => {
            // temp_total_data[obj["id"]] = obj["num"];
            // total_ids.push(obj["id"]);
            // console.log(obj["id"]);
            str += `c_id= ${obj["id"]} or `
        });
        // console.log(total_data);
        str = str.substr(0, str.length - 3);
        str += ")"
        // console.log(str);
        dbConfig.DB(str,
            [],
            (err, data) => {
                // console.log(data);
                if (!err) {
                    if (data.length > 0) {
                        console.log(data);
                        // console.log(temp_total_data);
                        // console.log(data[0]["c_id"])
                        data.forEach((obj, i) => {
                            // console.log(total_data[0].num);
                            let single_total = parseFloat(obj["p_price"]) * parseFloat(total_data[i].num);
                            let single_data = { c_id: obj["c_id"], num: obj["c_number"], p_price: obj["p_price"], single_total: single_total };
                            return_data_items.push(single_data);
                            return_data_result += single_total;
                            // console.log(return_data_result);
                        });

                        return_data["items"] = return_data_items;
                        return_data["result"] = return_data_result;
                        // console.log(return_data);
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
    },
    async checkOutSelect(req, resp) {
        // console.log(req.query);

        let sqlStr = 'SELECT * FROM cart WHERE '
        for (let i = 0; i < req.query.id.length; i++) {
            sqlStr += `c_id=${req.query.id[i]} OR `
        }
        sqlStr = sqlStr.substr(0, sqlStr.length - 3);
        let checkCartInfo = await dbDao.selectInfo(
            sqlStr,
            []
        );
        let newDate = [];
        let newd = + new Date();
        newDate.push(newd);
        // console.log(checkCartInfo);
        let totalAccount = 0;
        checkCartInfo.data.forEach(item => {
            totalAccount += parseInt(item.c_total)
        })
        let sqlStr1 = `INSERT INTO orderTable VALUES (null, ${newDate[0]}, ${checkCartInfo.data[0].c_uid}, '待支付', ${totalAccount} )`
        // // console.log(sqlStr1);
        let addOrderInfo = await dbDao.insertInfo(
            sqlStr1,
            []
        );
        // console.log(addOrderInfo);
        // console.log(totalAccount);

        let sqlStr2 = `Select o_id from orderTable where o_code=${newDate[0]}`
        // console.log(sqlStr2);
        let selectOrderInfo = await dbDao.selectInfo(
            sqlStr2,
            []
        );
        console.log(selectOrderInfo);

        // console.log();
        let sqlStr3 = 'INSERT INTO orderRelationship VALUES'
        // let newDateArr = [];
        checkCartInfo.data.forEach((item, i) => {
            sqlStr3 += `(null, ${item.c_pid}, ${selectOrderInfo.data[0].o_id}, ${item.c_number}, '${item.c_size}'),`
        })
        // // console.log(newDateArr);
        sqlStr3 = sqlStr3.substr(0, sqlStr3.length - 1);
        console.log(sqlStr3);
        let addOrderRelationInfo = await dbDao.insertInfo(
            sqlStr3,
            []
        );
        // console.log(addOrderRelationInfo);
        resp.send({
            code: addOrderRelationInfo.code,
            msg: addOrderRelationInfo.msg,
            data: {
                total: totalAccount,
                code: newDate[0]
            }
        })
    },
    modifyPaymentState(req, resp) {
        console.log(req.body);
        let o_code = req.body.o_code;
        dbConfig.DB(`update ordertable set o_state=? where o_code=${o_code}`,
            ["已支付"],
            (err, data) => {
                if (!err) {
                    if (data != undefined) {
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
    checkAll(req, resp) {
        console.log(req.query.total_data);
        let str = 'select * from cart where '
        req.query.total_data.forEach(item => {
            str += `c_id=${item.id} or `
        })
        str = str.substr(0, str.length - 3);
        console.log(str);
        dbConfig.DB(str,
            [],
            (err, data) => {
                console.log(data);
                return_total = 0;
                data.forEach(item => {
                    return_total += parseFloat(item.c_total);
                })
                console.log(return_total);
                if (!err) {
                    if (data.length > 0) {
                        resp.send({
                            code: 200,
                            message: '查询成功',
                            data: return_total
                        })
                    }
                } else {
                    resp.send({
                        code: 401,
                        message: '查询失败'
                    })
                }
            })
        // console.log(req.query);
        // let return_total = 0;
        // let str = 'select * from cart where '
        // req.query.total_data.forEach(item => {
        //     str += `c_id=${item.id} or `
        //     return_total += parseFloat(item.c_total);
        // })
        // str = str.substr(0, str.length - 3);
        // // console.log(str);

        // dbConfig.DB(str,
        //     [],
        //     (err, data) => {
        //         if (!err) {
        //             if (data.length > 0) {
        //                 resp.send({
        //                     code: 200,
        //                     message: '删除成功',
        //                     data: {
        //                         return_total: return_total,
        //                         list: selectInfo.data,
        //                         queryArr: req.query
        //                     }
        //                 })
        //             }
        //         } else {
        //             resp.send({
        //                 code: 401,
        //                 message: '删除失败'
        //             })
        //         }
        //     })

        // let selectInfo = await dbDao.selectInfo(
        //     str,
        //     []
        // );
        // console.log(selectInfo.data);


        // resp.send({
        //     code: 200,
        //     message: '查询成功',
        //     data: {
        //         return_total: return_total,
        //         list: selectInfo.data,
        //         queryArr: req.query
        //     }
        // })

        // let delInfo = await dbDao.deleteInfo(
        //     str1,
        //     []
        // );
        // console.log(delInfo);


    },
    async delCartInfo(req, resp) {
        console.log(req.body);
        // let str1 = 'DELETE FROM cart WHERE c_id IN(';
        // selectInfo.data.forEach(item => {
        //     return_total += parseFloat(item.c_total);
        //     str1 += `${item.c_id},`
        // })
        // str1 = str1.substr(0, str1.length - 1);
        // str1 += ')'

        // let selectInfo = await dbDao.selectInfo(
        //     str,
        //     []
        // );
    }
}