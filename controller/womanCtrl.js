const dbDao = require('../Dao/dbDao')
const dbConfig = require('../config/dbConfig');
module.exports = {
    selectWoman(req, resp) {
        letnum = req.query.num
        let sql = 'select * from ProductTable where p_kind = 2 '
        dbConfig.DB(sql, (err, data) => {
            if (!err) {
                resp.send({
                    code: 200,
                    msg: '查询成功',
                    data
                })
            } else {
                resp.send({
                    code: 401,
                    msg: '查询失败',
                    data
                })
            }
        })
    },
    selectPage(req, resp) {
        let sql = 'select * from ProductTable where p_kind = 2 '
        dbConfig.db1(sql, [], resp, function(err, data) {
            if (data.length > 0) {
                console.log(data);
                data[0]['count(*)'] = Math.ceil(data[0]['count(*)'] / 3)
                resp.send({
                    code: 200,
                    msg: '查询成功',
                    data: data
                })
            }
        })
    },
    selectWomanImg(req, resp) {
        let arr = req.query.obj
        let sql = 'select * from (ImageTable join producttable on p_id=i_pid) join kindtable on k_id=p_kind where k_id=2 '
        for (let i = 0; i < arr.length; i++) {
            sql += ' or i_pid = ?'
        }
        console.log(arr)
        console.log(sql)
        dbConfig.DB(sql, arr, (err, data) => {
            if (!err) {
                resp.send({
                    code: 200,
                    msg: '查询成功',
                    data
                })
            } else {
                resp.send({
                    code: 401,
                    msg: '查询失败',
                    data
                })
            }
        })
    },
    selectClass(req, resp) {
        let name = req.query
        let sql
            // 热门
        if (name.num == 3) {
            sql = 'SELECT * FROM ((statusTable JOIN producttable ON s_id=p_status) JOIN ImageTable ON p_id=i_pid) JOIN kindtable ON k_id=p_kind WHERE k_id=2 AND p_status=3'

        }
        // 新品
        else if (name.num == 2) {
            sql = 'SELECT * FROM ((statusTable JOIN producttable ON s_id=p_status) JOIN ImageTable ON p_id=i_pid) JOIN kindtable ON k_id=p_kind WHERE k_id=2 AND p_status=2'
        }
        // 打折
        else if (name.num == 4) {
            sql = 'select * from ((statusTable join producttable on s_id=p_status) join ImageTable on p_id=i_pid) join kindtable on k_id=p_kind where k_id=2 and p_status=4'
        }

        dbConfig.DB(sql, (err, data) => {
            if (!err) {
                if (data.length >= 1) {
                    resp.send({
                        code: 200,
                        msg: '查询成功',
                        data
                    })
                } else {
                    resp.send({
                        code: 401,
                        msg: '查询失败',
                        data: '没有查找到'
                    })
                }
            } else {
                resp.send({
                    code: 500,
                    msg: '服务器错误'
                })
            }
        })
    }
}