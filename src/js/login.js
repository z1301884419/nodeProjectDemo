let flag = false;
$.ajax({
    url: '/userInfo',
    type: 'get',
    dataType: 'JSON',
    success: function (data) {
        console.log(data.user);
        if (data.user!=undefined) {
            $('.loginBox2').css('display', 'none');
            $('.userNameInfo').css('display', 'block');
            $('.userNameInfo').text(data.user.u_name);
            $('.userNode').html(`<div class="userCenter">
                <div class="userHeader">
                    <img src="${data.user.u_header}" alt="">
                </div>
                <div class="userNameBox">
                    <input type="text" value="${data.user.u_name}" disabled='disabled'>
                    <span class="iconfont icon-bi shou modifyName" data-id="${data.user.u_id}"></span>
                    <span class="iconfont icon-dui shou modifyNameTrue" style="display: none;" data-id="${data.user.u_id}"></span>
                </div>
                <div class="caozuo">
                    <div><span class="iconfont icon-shoucang"></span>我的收藏</div>
                    <div class="userOrder"><span class="iconfont icon-dingdan1"></span>我的订单</div>
                    <div class="userCar"><span class="iconfont icon-gouwuche"></span>我的购物车</div>
                    <div><span class="iconfont icon-zuji"></span>我浏览的</div>
                    <div class="exitLogin"><span class="iconfont icon-0tuichudenglu-05"></span>退出登录</div>
                </div>
            </div>`)
        }else{
        console.log('未登录');
    }
},
    err: function () {

    }
})
//确定登录
$('.loginTrue').on('click', function () {
    let userName = $('#recipient-name').val();
    let userPwd = $('#message-text').val();
    $.ajax({
        url: '/login',
        data: {
            userName,
            userPwd
        },
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
            if (data.code == 200) {
                $('.loginBox2').css('display', 'none');
                $('.userNameInfo').css('display', 'block');
                $('.userNameInfo').text(data.data.user.u_name);
                $('.userNode').html(`<div class="userCenter">
                <div class="userHeader">
                    <img src="${data.data.user.u_header}" alt="">
                </div>
                <div class="userNameBox">
                    <input type="text" value="${data.data.user.u_name}" disabled='disabled'>
                    <span class="iconfont icon-bi shou modifyName" data-id="${data.data.user.u_id}"></span>
                    <span class="iconfont icon-dui shou modifyNameTrue" style="display: none;" data-id="${data.data.user.u_id}"></span>
                    </div>
                <div class="caozuo">
                    <div><span class="iconfont icon-shoucang"></span>我的收藏</div>
                    <div class="userOrder"><span class="iconfont icon-dingdan1"></span>我的订单</div>
                    <div class="userCar"><span class="iconfont icon-gouwuche"></span>我的购物车</div>
                    <div><span class="iconfont icon-zuji"></span>我浏览的</div>
                    <div class="exitLogin"><span class="iconfont icon-0tuichudenglu-05"></span>退出登录</div>
                </div>
            </div>`)
            }
        },
        err: function (err) {

        }
    });
});
//移入移出显示个人中心
$('.userNameInfo').on('mouseover', function () {
    $('.userCenter').css('display', 'block');
});
$('.info').on('mouseleave', function () {
    $('.userCenter').css('display', 'none');
});
//退出登录
$('.info').on('click','.exitLogin',function(){
    $.ajax({
        url:'/loginOut',
        type:'GET',
        dataType:'JSON',
        success:data=>{
            console.log(data);
            if(data.code==200){
                window.location.reload()
            }
        }
    })
});
//点击修改名称
$('.info').on('click','.modifyName',function(){
    $(this).prev().removeAttr('disabled').focus();
    let uid=$(this).attr('data-id');
    $(this).css('display','none')
    $('.modifyNameTrue').css('display','block');
});
$('.info').on('click','.modifyNameTrue',function(){
                let newName=$(this).prev().prev().val();
                console.log(newName);
                $.ajax({
                    url:'/modifyName',
                    type:'POST',
                    dataType:'JSON',
                    data:{uid,newName},
                    success:data=>{
                        console.log(data);
                        if(data.code==200){
                            window.location.reload()
                        }
                    },
                    err:err=>{
                        console.log('err');
                    }
                })

});
//跳转订单页面
$('.info').on('click','.userOrder',function(){
    location.href='../pages/order.html';
});
$('.info').on('click','.userCar',function(){
    location.href='../pages/cart.html';
});
