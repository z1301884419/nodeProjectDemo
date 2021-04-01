

window.onload = function(){
    console.log(111)
    xuanranyemian()
}
function xuanranyemian(){
    $.ajax({
        url:'/selectMan',
        method:'get',
        
        // data:{

        // },
        success(data){
            if(data.code == 200){
                showMan(data.data)
            }else{
                console.log(data)
            }
        }
    })
    // console.log(123)
}

function showMan(obj){
    console.log(obj)
    let pidarr = []
    obj.forEach(el => {
        pidarr.push(el.p_id)
    });
    console.log(pidarr)
    selectimg(pidarr)
}
function selectimg(obj){
    $.ajax({
        url:'/selectManImg',
        method:'get',
        data:{
            obj
        },
        success(data){
            if(data.code == 200){
                console.log(data)
            }else{
                console.log(data)
            }
        }
    })
}