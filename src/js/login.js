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
            console.log(data);
        },
        err:function(err){

        }
    })
})