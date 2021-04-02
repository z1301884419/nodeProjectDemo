const dbConfig = require('../config/dbConfig');
const dbdao = require('../Dao/dbDao');
module.exports = {
    orderAll(req, resp) {
        let id = req.session.user.u_id;
        dbConfig.DB('SELECT o_state,or_pid,i_src,p_name,p_price,or_size,o_id,o_code,or_number,o_total FROM((ordertable JOIN orderrelationship ON o_id=or_oid)JOIN imagetable ON or_pid=i_pid)JOIN producttable ON i_pid=p_id WHERE o_uid=?', [id], function (err, data) {
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
    async delOrder(req, resp) {
        let { delId } = req.body;

        let del1 = await dbdao.deleteInfo(
            'DELETE FROM orderrelationship WHERE or_oid = ?',
            [delId],
        );
        let del2 = await dbdao.deleteInfo(
            'DELETE FROM ordertable WHERE o_id = ?',
            [delId],
        );
        resp.send({
            code: 200,
            msg: '删除成功'
        })
    },
    payOrder(req, res) {
        let { payId } = req.query;
        dbConfig.DB(
            'SELECT u_name,o_total,o_id FROM ordertable JOIN usertable ON o_uid=u_id WHERE o_id=?',
            [payId],
            (err, data) => {
                if (!err) {
                    if (data.length > 0) {
                        console.log(data);
                        res.send({
                            code: 200,
                            mag: '查询成功',
                            data: data
                        })
                    }
                }
            }
        )
    },
    modifyState(req, res) {
        let { oid } = req.body;
        dbConfig.DB(
            'UPDATE ordertable SET o_state =  "已支付"  WHERE o_id = ?',
            [oid],
            (err, data) => {
                console.log(data);
                if (!err) {
                    if(data!=undefined){
                        res.send({
                            code:200,
                            msg:'支付成功'
                        });
                    }
                }
            }
        )
    }
}