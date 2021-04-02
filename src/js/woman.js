window.onload = function() {
    console.log(12);
    selectData()
}


function selectData() {
    $.ajax({
        method: 'get',
        url: '/selectWoman',
        // data: {

        // },
        success(data) {
            if (data.code == 200) {
                showData(data.data);

            } else {
                // console.log(data);
            }
        }
    })

}

function selectPage() {
    $.ajax({
        method: 'get',
        url: '/selectPage',

        success(data) {
            // console.log(data);
            if (data.code == 200) {
                console.log(data.data[0]['count(*)']);
                showPage('#pageBox', data.data[0]['count(*)'])
            }
        }
    })
}




function showData(obj) {
    let arr = []
    obj.forEach(item => {
        arr.push(item.p_id)

    });
    selectimg(arr)

}

function selectimg(obj) {
    $.ajax({
        url: '/selectWomanImg',
        method: 'get',
        data: {
            obj
        },
        success(data) {
            if (data.code == 200) {
                console.log(data.data)
                showimg(data.data)
            } else {
                console.log(data)
            }
        }
    })
}

function showimg(obj) {
    $('#bigBox').html('')
    for (let i = 0; i < obj.length; i++) {
        $('#bigBox').append(`
        <div class="product grid-item mybox">
            <div class="product_inner">
                <div class="product_image"><img src="..${obj[i].i_src}" alt=""></div>
                <div class="product_content text-center">
                    <div class="product_title"><a href="product.html">${obj[i].p_name}</a></div>
                    <div class="product_price">$${obj[i].p_price}</div>
                    <div class="product_button ml-auto mr-auto trans_200"><a href="javascript:;">加入购物车</a></div>
                </div>
            </div>
        </div>
        `)
    }
}

$('#remen,.remen').click(function() {
    $(this).css('backgroundColor', '#bbe432').siblings().css('backgroundColor', 'white')
    let num = 3
    $.ajax({
        url: '/selectClass',
        method: 'get',
        data: {
            num
        },
        success(data) {
            if (data.code == 200) {
                console.log(data)
                showshangpin(data.data)
            } else {
                console.log(data)
                alert('无此商品')
            }
        }
    })
})
$('#xinpin,.xinpin').click(function() {
    $(this).css('backgroundColor', '#bbe432').siblings().css('backgroundColor', 'white')
    let num = 2
    $.ajax({
        url: '/selectClass',
        method: 'get',
        data: { num },
        success(data) {
            if (data.code == 200) {
                console.log(data)
                showshangpin(data.data)
            } else {
                console.log(data)
                alert('无此商品')
            }
        }
    })
})
$('#zhekou,.zhekou').click(function() {
    $(this).css('backgroundColor', '#bbe432').siblings().css('backgroundColor', 'white')
    let num = 4
    $.ajax({
        url: '/selectClass',
        method: 'get',
        data: { num },
        success(data) {
            if (data.code == 200) {
                console.log(data)
                showshangpin(data.data)
            } else {
                console.log(data)
                alert('无此商品')
            }
        }
    })
})

function showshangpin(obj) {
    $('#bigBox').html('')
    for (let i = 0; i < obj.length; i++) {
        $('#bigBox').append(`
        <div class="product grid-item mybox">
            <div class="product_inner">
                <div class="product_image"><img src="..${obj[i].i_src}" alt=""></div>
                <div class="product_content text-center">
                    <div class="product_title"><a href="product.html">${obj[i].p_name}</a></div>
                    <div class="product_price">$${obj[i].p_price}</div>
                    <div class="product_button ml-auto mr-auto trans_200"><a href="javascript:;">加入购物车</a></div>
                </div>
            </div>
        </div>
        `)
    }
}