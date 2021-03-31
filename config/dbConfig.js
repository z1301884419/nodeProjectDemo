const mysql=require('mysql');
module.exports={
    DB(sql,arr,fn){
        let db=mysql.createConnection({
            // host:"localhost",
            // port:3306,
            // user:'root',
            // password:'1234',
            // database:'dadasql'
        });
        db.connect();
        db.query(sql,arr,fn);
        db.end();
    }
}