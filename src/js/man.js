window.onload = function(){//页面加载完毕就查询男士
    xuanranyemian()
}
function xuanranyemian(){//操作数据库
    $.ajax({
        url:'/selectMan',
        method:'get',
        success(data){
            if(data.code == 200){
                showMan(data.data)//渲染页面
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
    selectimg(pidarr)//查询图片
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
                showmyimg(data.data)//渲染图片
            }else{
                console.log(data)
            }
        }
    })
}
function showmyimg(obj){
    let big = document.getElementsByClassName('bigssss')[0]
    big.innerHTML = ''//清空
    console.log(obj)
    for(let i=0;i<obj.length;i++){//查重
        for(let j =i+1;j<obj.length;j++){
            if(obj[i].p_id==obj[j].p_id){
                obj.splice(j,1)
                j--;
            }
        }
    }
    let str='';
    obj.forEach(item=>{//渲染产品
        str+= `
        <div class="mybox product grid-item">
			<div class="product_inner">
				<div class="product_image">
					<img src="..${item.i_src}" alt="">
				</div>
				<div class="product_content text-center">
				    <div class="product_title"><a href="product.html">${item.p_name}</a></div>
				    <div class="product_price">${item.p_price}</div>
				    <div class="product_button ml-auto mr-auto trans_200"><a href="/pages/product.html?&shop_id=${item.p_id}">加入购物车</a></div>
				</div>
			</div>
		</div>
        `
    })
    big.innerHTML=str;
}

$('#remen,.remen').click(function(){//条件查询绑定事件
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
                showshangpin(data.data)//渲染商品
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
function showshangpin(obj){//渲染符合条件的商品
    let big = document.getElementById('bigssss')
    big.innerHTML = ''
    for(let i=0;i<obj.length;i++){
        big.innerHTML += `
        <div class="product grid-item mybox">
            <div class="product_inner">
                <div class="product_image"><img src="..${obj[i].i_src}" alt=""></div>
                <div class="product_content text-center">
                    <div class="product_title"><a href="product.html" class="myprice">${obj[i].p_name}</a></div>
                    <div class="product_price">$${obj[i].p_price}</div>
                    <div class="product_button ml-auto mr-auto trans_200 addmyce"><a href="/pages/product.html?&shop_id=${item.p_id}" class="adds">加入购物车</a></div>
                </div>
            </div>
        </div>
        `
    }
}

$('#zhong,#xiao,#da').click(function(){//点击特效
    $(this).css('backgroundColor','#389B39').siblings().css('backgroundColor','white')
})

$('body').on('click','.adds',function(){//获取商品id用户id
    let shangpinname = $(this).parent().prev().prev()[0].firstChild.text
    let username = $('#myuser').text()
    console.log(shangpinname)
    console.log(username)
    $.ajax({
        url:'/selectcar',
        method:'get',
        data:{
            shangpinname,
            username
        },
        success(data){
            if(data.code == 200){
                let mydata = {
                    sid:data.s_id,
                    uid:data.u_id
                }
                jiarugouwuce(mydata)
                console.log(data)
            }else{
                console.log(data)
            }
        }
    })
})

function jiarugouwuce(obj){
    console.log(obj)
    // $.ajax({
    //     url:'/selectManImg',
    //     method:'get',
    //     data:{
    //         obj
    //     },
    //     success(data){
    //         if(data.code == 200){
    //             showmyimg(data.data)
    //         }else{
    //             console.log(data)
    //         }
    //     }
    // })
}
