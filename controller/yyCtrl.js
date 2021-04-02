const dbDao = require('../Dao/dbDao')
module.exports = {
  async hot_Info(req,resp){
    let nowpage = req.query.nowpage
    let start = (nowpage-1)*4
    let obj = await dbDao.selectInfo(`select p_id,p_name,p_price,s_state from ProductTable
                                    join StatusTable on p_status = s_id where p_status = 3 limit ?,4`,[start])
    for(let i=0;i<obj.data.length;i++){
      let imgsrc = await dbDao.selectInfo(`select i_src from ImageTable where i_pid= ?`,[obj.data[i].p_id])
      obj.data[i]['i_src'] = imgsrc.data[0].i_src
    }
    let maxpage = await dbDao.selectInfo(`select count(*) as maxpage from ProductTable where p_status = 3 `)
    obj['maxpage'] = Math.ceil(maxpage.data[0].maxpage/4)
    resp.send(obj)
  },
  async sale_Info(req,resp){
    let nowpage = req.query.nowpage
    let start = (nowpage-1)*4
    let end = start+4
    let obj = await dbDao.selectInfo(`select p_id,p_name,p_price,s_state from ProductTable
                                    join StatusTable on p_status = s_id where p_status = 4 limit ?,4`,[start])
    for(let i=0;i<obj.data.length;i++){
      let imgsrc = await dbDao.selectInfo(`select i_src from ImageTable where i_pid= ?`,[obj.data[i].p_id])
      obj.data[i]['i_src'] = imgsrc.data[0].i_src
    }
    let maxpage = await dbDao.selectInfo(`select count(*) as maxpage from ProductTable where p_status = 4 `)
    obj['maxpage'] = Math.ceil(maxpage.data[0].maxpage/4)
    resp.send(obj)
  },
async new_Info(req,resp){
  let nowpage = req.query.nowpage
  let start = (nowpage-1)*4
  let obj = await dbDao.selectInfo(`select p_id,p_name,p_price,s_state from ProductTable
                                    join StatusTable on p_status = s_id where p_status = 2 limit ?,4`,[start])
  for(let i=0;i<obj.data.length;i++){
    let imgsrc = await dbDao.selectInfo(`select i_src from ImageTable where i_pid= ?`,[obj.data[i].p_id])
    obj.data[i]['i_src'] = imgsrc.data[0].i_src
  }
  let maxpage = await dbDao.selectInfo(`select count(*) as maxpage from ProductTable where p_status = 2 `)
  obj['maxpage'] = Math.ceil(maxpage.data[0].maxpage/4)
  resp.send(obj)
}
}
