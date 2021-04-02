

window.onload = function(){
    xuanranyemian()
}
function xuanranyemian(){
    $.ajax({
        url:'/selectMan',
        method:'get',
        success(data){
            if(data.code == 200){
                showMan(data.data)
            }else{
                console.log(data)
            }
        }
    })
}

function showMan(obj){
    let pidarr = []
    obj.forEach(el => {
        pidarr.push(el.p_id)
    });
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
                showmyimg(data.data)
            }else{
                console.log(data)
            }
        }
    })
}
function showmyimg(obj){
    let big = document.getElementById('bigssss')
    big.innerHTML = ''
    for(let i=0;i<obj.length;i++){
        big.innerHTML += `
        <div class="product grid-item mybox">
            <div class="product_inner">
                <div class="product_image"><img src="..${obj[i].i_src}" alt=""></div>
                <div class="product_content text-center">
                    <div class="product_title"><a href="product.html">${obj[i].p_name}</a></div>
                    <div class="product_price">$${obj[i].p_price}</div>
                    <div class="product_button ml-auto mr-auto trans_200 addmyce"><a href="javascript:;">加入购物车</a></div>
                </div>
            </div>
        </div>
        `
    }
}

$('#remen,.remen').click(function(){
    $(this).css('backgroundColor','#bbe432').siblings().css('backgroundColor','white')
    let num =3
    $.ajax({
        url:'/selectmymy',
        method:'get',
        data:{
            num
        },
        success(data){
            if(data.code==200){
                showshangpin(data.data)
            }else{
                alert('没有查找到，SORRY')
            }
        }
    })
})
$('#xinpin,.xinpin').click(function(){
    $(this).css('backgroundColor','#bbe432').siblings().css('backgroundColor','white')
    let num = 2
    $.ajax({
        url:'/selectmymy',
        method:'get',
        data:{num},
        success(data){
            if(data.code==200){
                showshangpin(data.data)
            }else{
                alert('没有查找到，SORRY')
            }
        }
    })
})
$('#zhekou,.zhekou').click(function(){
    $(this).css('backgroundColor','#bbe432').siblings().css('backgroundColor','white')
    let num = 4
    $.ajax({
        url:'/selectmymy',
        method:'get',
        data:{num},
        success(data){
            if(data.code==200){
                showshangpin(data.data)
            }else{
                alert('没有查找到，SORRY')
            }
        }
    })
})
// $('.product_categories ul li').hover(function(){
//     $(this).css('backgroundColor','#bbe432')
// },function(){
//     $(this).css('backgroundColor','white')
// })
function showshangpin(obj){
    let big = document.getElementById('bigssss')
    big.innerHTML = ''
    for(let i=0;i<obj.length;i++){
        big.innerHTML += `
        <div class="product grid-item mybox">
            <div class="product_inner">
                <div class="product_image"><img src="..${obj[i].i_src}" alt=""></div>
                <div class="product_content text-center">
                    <div class="product_title"><a href="product.html">${obj[i].p_name}</a></div>
                    <div class="product_price">$${obj[i].p_price}</div>
                    <div class="product_button ml-auto mr-auto trans_200 addmyce"><a href="javascript:;">加入购物车</a></div>
                </div>
            </div>
        </div>
        `
    }
}

$('#zhong,#xiao,#da').click(function(){
    console.log(1233)
    $(this).css('backgroundColor','#389B39').siblings().css('backgroundColor','white')
})

$('#addmyce').click(function(){
    console.log(this)
})