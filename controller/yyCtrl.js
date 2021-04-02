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
},
  async shop_Info(req,resp){
    let {shop_id} = req.query
    let size = await dbDao.selectInfo('SELECT sz_size FROM (producttable JOIN typetable ON p_type = t_id) JOIN sizetable ON t_stid = sz_tid WHERE p_id = ? ',[shop_id])
    let shop_info = await dbDao.selectInfo('select p_name,p_price from producttable where p_id=?',[shop_id])
    let imgs = await dbDao.selectInfo('select i_src from imagetable where i_pid=?',[shop_id])
    resp.send({
      imgs:imgs.data,
      shop_info:shop_info.data,
      size:size.data})
  },
  async addCar(req,resp){
    let {shop_id} = req.query
    let {shop_size} = req.query
    let {shop_price} = req.query
    if(req.session.user) {
      let user = req.session.user
      let u_id = user.u_id
      //查找数据库改用户是否已经购买了此商品
      let obj_s = await dbDao.selectInfo('select * from cart where c_uid=? and c_size=? and c_pid=?', [u_id,shop_size,shop_id])
      if(obj_s.data.length<1){
        //添加至购物车
        let obj = await dbDao.insertInfo('insert into cart value(null,?,?,?,1,?,?)', [shop_id, u_id, shop_size, shop_price,shop_price])
        resp.send(obj)
      }else {
        let obj_c = await dbDao.updateInfo('update cart set c_number=c_number+1,c_total=c_price*c_number where c_pid = ? and c_size=?', [shop_id,shop_size])
        resp.send(obj_c)
      }
    }else {
      resp.send({code:204,msg:"用户未登录"})
    }
  }
}
