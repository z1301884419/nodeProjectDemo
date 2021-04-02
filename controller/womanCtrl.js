const dbConfig=require('../config/dbConfig');
const express = require('express');
const router = express.Router();
const dbDao = require('../Dao/dbDao');
module.exports = {
    getAllData(req,res){
        dbConfig.DB(
            'SELECT * FROM (ImageTable JOIN producttable ON p_id=i_pid) JOIN kindtable ON k_id=p_kind WHERE k_id=2',[],
            (err,data)=>{
                if(!err){
                    if(data.length>0){
                        res.send({
                            code:200,
                            msg:'查询成功',
                            data:data
                        })
                    }
                }
            }
        )
    }
}