const mysql=require('mysql');
module.exports={
    DB(sql,arr,fn){
        let db=mysql.createConnection({
            host:"172.16.10.60",
            port:3306,
            user:'root',
            password:'1234',
            database:'pro3data'
        });
        db.connect();
        db.query(sql,arr,fn);
        db.end();
    }
}