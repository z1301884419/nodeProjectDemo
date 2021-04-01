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
                console.log(data.data.u_name);
                $('.loginBtn').css('display','none');
                $('.userNameInfo').css('display','block');
                $('.userNameInfo').text(data.data.u_name);
            }
        },
        err:function(err){

        }
    });
});
$('.userNameInfo').on('mouseover',function(){
    
})