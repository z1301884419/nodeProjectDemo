const dbDao = require('../Dao/dbDao')
module.exports = {
  async selectInfo(){
    let obj = await dbDao.selectInfo(`select i_src,p_name,p_price,s_state 
                                    from (ProductTable join ImageTable on p_id = i_pid)
                                    join StatusTable on p_status = s_id`)
    console.log(obj);
  }
}