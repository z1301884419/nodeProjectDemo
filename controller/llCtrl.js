const llConfig = require('../config/dbConfig');
const express = require('express');
const router = express.Router();
const dbDao = require('../Dao/dbDao');
module.exports = {
    getLogin(req, res) {
        let { userName, userPwd } = req.body;
        console.log('requrl' + req.url);
        llConfig.DB(
            'SELECT * FROM usertable WHERE u_account = ? AND u_password = ? ',
            [userName, userPwd],
            (err, data) => {
                if (!err) {
                    if (data.length > 0) {
                        delete data[0].u_password;
                        Object.assign(req.session, { user: data[0] });
                        res.send({
                            code: 200,
                            msg: '查询成功',
                            data: req.session
                        })
                    } else {
                        res.send({
                            code: 401,
                            msg: '查询失败'
                        })
                    }
                } else {
                    console.log('操作数据库失败');
                }
            }
        )
    },
    getUser(req, res) {
        // console.log(req.url);
        if (req.session.user) {
            res.send(req.session);
        } else {
            res.send(req.session);
        }
    },
    loginOut(req, res) {
        console.log(req.session);
        let { url } = req.body;
        delete req.session.user;
        console.log(req.session);
        res.send({
            code: 200,
            msg: '退出登录'
        })
    },
    async modifyName(req, res) {
        let { uid, newName } = req.body;
        let updateObj = await dbDao.updateInfo(
            'UPDATE usertable SET u_name=? WHERE u_id = ?',
            [newName, uid],
        );
        let selectObj2 = await dbDao.updateInfo(
            'select * from usertable WHERE u_id = ?',
            [uid],
        );
        delete selectObj2.data[0].u_password;
        Object.assign(req.session, { user: selectObj2.data[0] });
        res.send({
            code: 200,
            msg: '更改成功',
        })
    }
}