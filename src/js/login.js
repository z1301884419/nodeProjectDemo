let loginStaus=false;
$('.loginTrue').on('click',function(){
    let userName=$('#recipient-name').val();
    let userPwd=$('#message-text').val();
    $.ajax({
        url:'/login',
        data:{
            userName,
            userPwd
        },
        type:'get',
        dataType:'JSON',
        success:function(data){
            if(data.code==200){
                $('.loginBox2').css('display','none');
                $('.userNameInfo').css('display','block');
                $('.userNameInfo').text(data.data.u_name);
                $('.userNode').html(`<div class="userCenter">
                <div class="userHeader">
                    <img src="./upload/6.jpg" alt="">
                </div>
                <div class="userNameBox">
                    <input type="text" value="${data.data.u_name}" disabled='disabled'><span class="iconfont icon-bi shou modifyName"></span>
                </div>
                <div class="caozuo">
                    <div><span class="iconfont icon-shoucang"></span>我的收藏</div>
                    <div><span class="iconfont icon-dingdan1"></span>我的订单</div>
                    <div><span class="iconfont icon-gouwuche"></span>我的购物车</div>
                    <div><span class="iconfont icon-zuji"></span>我浏览的</div>
                </div>
            </div>`)
            }
        },
        err:function(err){

        }
    });
});
$('.userNameInfo').on('mouseover',function(){
    $('.userCenter').css('opacity','1');
});
$('.info').on('mouseleave',function(){
    $('.userCenter').css('opacity','0');
})