
let h_nowpage =1
let s_nowpage =1
let n_nowpage =1

let h_maxpage =1
let s_maxpage =1
let n_maxpage =1
function shops (shop_data,renderNode,statu){
  $(`${renderNode}`).find('.shop-box').html("")
  for(let i=0;i<=3;i++){
    if(i<shop_data.length){
      $(`${renderNode}`).find('.shop-box').append(`
                  <div class="product grid-item ${statu}">
                    <div class="product_inner">
                      <div class="product_image">
                        <img src=${shop_data[i].i_src} alt="">
                        <div class="product_tag">${statu}</div>
                      </div>
                      <div class="product_content text-center">
                        <div class="product_title"><a href="product.html">${shop_data[i].p_name}</a></div>
                        <div class="product_price">$${shop_data[i].p_price}</div>
                        <div class="product_button ml-auto mr-auto trans_200" data-toggle="modal" data-target="#exampleModal"><span class="to_more" style="display: none">${shop_data[i].p_id}</span><a href="javascript:;">加入购物车</a></div>
                      </div>
                  </div>
      `)
    }
  }
}
//请求热卖商品
function hotshop(nowpage){
  $.ajax({
    url:'/shopInfo_hot',
    type:'get',
    dataType:'json',
    data:{
      nowpage
    },
    success(data){
      console.log(data);
      h_maxpage=data.maxpage
      shops(data.data,'.hot_shop','hot')
    }
  })
}
//请求打折商品
function saleshop(nowpage){
  $.ajax({
    url:'/shopInfo_sale',
    type:'get',
    dataType:'json',
    data:{
      nowpage
    },
    success(data){
      console.log(data);
      s_maxpage=data.maxpage
      shops(data.data,'.sale_shop','sale')
    }
  })
}
//请求新商品
function newshop(nowpage){
  $.ajax({
    url:'/shopInfo_new',
    type:'get',
    dataType:'json',
    data:{
      nowpage
    },
    success(data){
      console.log(data);
      n_maxpage=data.maxpage
      shops(data.data,'.new_shop','new')
    }
  })
}
hotshop(h_nowpage)
saleshop(s_nowpage)
newshop(n_nowpage)

let isClick = false

//下一页
$('.toRight').click(next)
function next() {
  if(!isClick){
    isClick = true
    if($(this).parent().attr('class')=="product-box hot_shop"){
      h_nowpage>=h_maxpage?h_nowpage=h_maxpage:h_nowpage++;
      hotshop(h_nowpage)
    }
    if($(this).parent().attr('class')=="product-box sale_shop"){
      s_nowpage>=s_maxpage?s_nowpage=s_maxpage:s_nowpage++;
      saleshop(s_nowpage)
    }
    if($(this).parent().attr('class')=="product-box new_shop"){
      n_nowpage>=n_maxpage?n_nowpage=n_maxpage:n_nowpage++;
      newshop(n_nowpage)
    }
    setTimeout(()=>{
      isClick = false
    },500)
  }

}
//上一页
$('.toLeft').click(prev)
function prev() {
  if(!isClick){
    isClick = true
    if($(this).parent().attr('class')=="product-box hot_shop"){
      h_nowpage<=1?h_nowpage=1:h_nowpage--;
      hotshop(h_nowpage)
    }
    if($(this).parent().attr('class')=="product-box sale_shop"){
      s_nowpage<=1?s_nowpage=1:s_nowpage--;
      saleshop(s_nowpage)
    }
    if($(this).parent().attr('class')=="product-box new_shop"){
      n_nowpage<=1?n_nowpage=1:n_nowpage--;
      newshop(n_nowpage)
    }
    setTimeout(()=>{
      isClick = false
    },500)
  }
}

//添加至购物车
$('.products').on('click','.grid-item',function () {
  let shop_id = $(this).find('.to_more').html();
  location.href = `../pages/product.html?shop_id=${shop_id}`
})
