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
                loginStaus=true;
            }
        },
        err:function(err){

        }
    });
});