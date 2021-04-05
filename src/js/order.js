window.onload = function () {
    xuanran()
}
function xuanran() {
    $('.cart_items').html('')
    $.ajax({
        url: '/orderAll',
        type: 'get',
        success: data => {
            for (let i = 0; i < data.data.length; i++) {
                for (let j = i + 1; j < data.data.length; j++) {
                    if (data.data[i].o_id == data.data[j].o_id) {
                        if (data.data[i].or_pid == data.data[j].or_pid) {
                            data.data.splice(j, 1);
                            j--;
                        }
                    }
                }
            }
            let ulArr = [...data.data];
            for (let i = 0; i < ulArr.length; i++) {
                for (let j = i + 1; j < ulArr.length; j++) {
                    if (ulArr[i].o_id == ulArr[j].o_id) {
                        ulArr.splice(j, 1);
                        j--;
                    }
                }
            }
            //渲染全部订单UL
            for (let i = 0; i < ulArr.length; i++) {
                if (ulArr[i].o_state == '待支付') {
                    $('.cart_items').append(`
                    <ul class="cart_items_list" style="overflow: hidden; margin-top: 20px;">
                    <div>订单编号：<span>${ulArr[i].o_code}</span></div>
                    <div class="itemNode" data-id=${ulArr[i].o_id}></div>
                    <div style="float: right; margin-bottom: 10px;">
                        <button type="button" class="btn btn-success orderPayBtn" data-toggle="modal" data-target="#exampleModal2" data-payId="${ulArr[i].o_id}">去支付</button>
                    </div>
                </ul>
                <hr/>`)
                } else {
                    $('.cart_items').append(`
                    <ul class="cart_items_list" style="overflow: hidden; margin-top: 20px;">
                    <div>订单编号：<span>${ulArr[i].o_code}</span></div>
                    <div class="itemNode" data-id=${ulArr[i].o_id}></div>
                    <div style="float: right; margin-bottom: 10px;">
                        <button type="button" class="btn btn-secondary orderDelBtn" data-delId="${ulArr[i].o_id}">删除订单</button>
                    </div>
                </ul>
                <hr/>`)
                }
            }
            //渲染全部订单ul里面的LI
            for (let i = 0; i < $('.itemNode').length; i++) {
                for (let j = 0; j < data.data.length; j++) {
                    if ($('.itemNode').eq(i).attr('data-id') == data.data[j].o_id) {
                        $('.itemNode').eq(i).append(`
                        <li class="cart_item item_list d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start" data-state="${data.data[j].o_state}">
							<div class="product d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
								<div>
									<div class="product_image"><img src="..${data.data[j].i_src}" alt=""></div>
								</div>
								<div class="product_name"><a href="product.html">${data.data[j].p_name}</a></div>
							</div>
							<div class="product_size text-lg-center product_text"><span>Size: </span>${data.data[j].or_size}</div>
							<div class="product_price text-lg-center product_text"><span>Price: </span>$${data.data[j].p_price}</div>
							<div class="product_quantity_container">
								<div class="product_quantity ml-lg-auto mr-lg-auto text-center">
									<span class="product_text product_num">${data.data[j].or_number}</span>
								</div>
							</div>
							<div class="product_total text-lg-center product_text"><span>Total: </span>$${parseFloat(data.data[j].p_price) * parseInt(data.data[j].or_number)}</div>
							<div class="product_total text-lg-center product_text"><a href="JavaScript:;" class="cartCaozuo">修改地址</a></div>
						</li>
                        `)
                    }
                }
            };
            //渲染操作
            for (let i = 0; i < $('.cart_item').length; i++) {
                if ($('.cart_item').eq(i).attr('data-state') == '待支付') {
                    $('.cartCaozuo').eq(i).html('修改地址')
                } else {
                    $('.cartCaozuo').eq(i).html('退款')
                }
            }

        }
    })
}
//删除订单
$('.cart_items').on('click', '.orderDelBtn', function () {
    console.log($(this).attr('data-delId'));
    let delId = $(this).attr('data-delId');
    $.ajax({
        url: '/delOrder',
        type: 'post',
        data: {
            delId
        },
        dataType: 'JSON',
        success: data => {
            if (data.code == 200) {
                $(".tipText").text("删除成功!")
                $(".tooltip").show()
                setTimeout(() => {
                    $(".tooltip").hide()
                }, 1000)
                xuanran()
            }
        }
    })
})
//待付款订单
function fukuan() {
    $('.cart_items').html('')
    $.ajax({
        url: '/orderAll',
        type: 'get',
        success: data => {
            for (let i = 0; i < data.data.length; i++) {
                for (let j = i + 1; j < data.data.length; j++) {
                    if (data.data[i].o_id == data.data[j].o_id) {
                        if (data.data[i].or_pid == data.data[j].or_pid) {
                            data.data.splice(j, 1);
                            j--;
                        }
                    }
                }
            }
            let ulArr = [...data.data];
            for (let i = 0; i < ulArr.length; i++) {
                for (let j = i + 1; j < ulArr.length; j++) {
                    if (ulArr[i].o_id == ulArr[j].o_id) {
                        ulArr.splice(j, 1);
                        j--;
                    }
                }
            }
            //渲染全部订单UL
            for (let i = 0; i < ulArr.length; i++) {
                if (ulArr[i].o_state == '待支付') {
                    $('.cart_items').append(`
                    <ul class="cart_items_list" style="overflow: hidden; margin-top: 20px;">
                    <div>订单编号：<span>${ulArr[i].o_code}</span></div>
                    <div class="itemNode" data-id=${ulArr[i].o_id}></div>
                    <div style="float: right; margin-bottom: 10px;">
                        <button type="button" class="btn btn-success orderPayBtn" data-toggle="modal" data-target="#exampleModal2" data-payId="${ulArr[i].o_id}">去支付</button>
                    </div>
                </ul>
                <hr/>`)
                }
            }
            //渲染全部订单ul里面的LI
            for (let i = 0; i < $('.itemNode').length; i++) {
                for (let j = 0; j < data.data.length; j++) {
                    if ($('.itemNode').eq(i).attr('data-id') == data.data[j].o_id) {
                        $('.itemNode').eq(i).append(`
                        <li class="cart_item item_list d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start" data-state="${data.data[j].o_state}">
							<div class="product d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
								<div>
									<div class="product_image"><img src="..${data.data[j].i_src}" alt=""></div>
								</div>
								<div class="product_name"><a href="product.html">${data.data[j].p_name}</a></div>
							</div>
							<div class="product_size text-lg-center product_text"><span>Size: </span>${data.data[j].or_size}</div>
							<div class="product_price text-lg-center product_text"><span>Price: </span>$${data.data[j].p_price}</div>
							<div class="product_quantity_container">
								<div class="product_quantity ml-lg-auto mr-lg-auto text-center">
									<span class="product_text product_num">${data.data[j].or_number}</span>
								</div>
							</div>
							<div class="product_total text-lg-center product_text"><span>Total: </span>$${parseFloat(data.data[j].p_price) * parseInt(data.data[j].or_number)}</div>
							<div class="product_total text-lg-center product_text"><a href="javascript:;" class="cartCaozuo">修改地址</a></div>
						</li>
                        `)
                    }
                }
            };
            //渲染操作
            for (let i = 0; i < $('.cart_item').length; i++) {
                if ($('.cart_item').eq(i).attr('data-state') == '待支付') {
                    $('.cartCaozuo').eq(i).html('修改地址')
                } else {
                    $('.cartCaozuo').eq(i).html('退款')
                }
            }
        }
    })
}
//带收收货订单
function shouhuo() {
    $('.cart_items').html('')
    $.ajax({
        url: '/orderAll',
        type: 'get',
        success: data => {
            for (let i = 0; i < data.data.length; i++) {
                for (let j = i + 1; j < data.data.length; j++) {
                    if (data.data[i].o_id == data.data[j].o_id) {
                        if (data.data[i].or_pid == data.data[j].or_pid) {
                            data.data.splice(j, 1);
                            j--;
                        }
                    }
                }
            }
            let ulArr = [...data.data];
            for (let i = 0; i < ulArr.length; i++) {
                for (let j = i + 1; j < ulArr.length; j++) {
                    if (ulArr[i].o_id == ulArr[j].o_id) {
                        ulArr.splice(j, 1);
                        j--;
                    }
                }
            }
            //渲染全部订单UL
            for (let i = 0; i < ulArr.length; i++) {
                if (ulArr[i].o_state == '已支付') {
                    $('.cart_items').append(`
                    <ul class="cart_items_list" style="overflow: hidden; margin-top: 20px;">
                    <div>订单编号：<span>${ulArr[i].o_code}</span></div>
                    <div class="itemNode" data-id=${ulArr[i].o_id}></div>
                    <div style="float: right; margin-bottom: 10px;">
                        <button type="button" class="btn btn-secondary orderDelBtn" data-delId="${ulArr[i].o_id}">删除订单</button>
                    </div>
                </ul>
                <hr/>`)
                }
            }
            //渲染全部订单ul里面的LI
            for (let i = 0; i < $('.itemNode').length; i++) {
                for (let j = 0; j < data.data.length; j++) {
                    if ($('.itemNode').eq(i).attr('data-id') == data.data[j].o_id) {
                        $('.itemNode').eq(i).append(`
                        <li class="cart_item item_list d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start" data-state="${data.data[j].o_state}">
							<div class="product d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
								<div>
									<div class="product_image"><img src="..${data.data[j].i_src}" alt=""></div>
								</div>
								<div class="product_name"><a href="product.html">${data.data[j].p_name}</a></div>
							</div>
							<div class="product_size text-lg-center product_text"><span>Size: </span>${data.data[j].or_size}</div>
							<div class="product_price text-lg-center product_text"><span>Price: </span>$${data.data[j].p_price}</div>
							<div class="product_quantity_container">
								<div class="product_quantity ml-lg-auto mr-lg-auto text-center">
									<span class="product_text product_num">${data.data[j].or_number}</span>
								</div>
							</div>
							<div class="product_total text-lg-center product_text"><span>Total: </span>$${parseFloat(data.data[j].p_price) * parseInt(data.data[j].or_number)}</div>
							<div class="product_total text-lg-center product_text"><a href="javascript:;" class="cartCaozuo">修改地址</a></div>
						</li>
                        `)
                    }
                }
            };
            //渲染操作
            for (let i = 0; i < $('.cart_item').length; i++) {
                if ($('.cart_item').eq(i).attr('data-state') == '待支付') {
                    $('.cartCaozuo').eq(i).html('修改地址')
                } else {
                    $('.cartCaozuo').eq(i).html('退款')
                }
            }
        }
    })
}

$('.cart_items').on('click', '.orderPayBtn', function () {
    let payId = $(this).attr('data-payId');
    $.ajax({
        url: '/payOrder',
        type: 'get',
        data: {
            payId
        },
        dataType: 'JSON',
        success: data => {
            if (data.code == 200) {
                $('.orderTotal').text(data.data[0].o_total);
                $('.orderuName').text(data.data[0].u_name);
                let oid = data.data[0].o_id;

                $('.orderPayTrue').on('click', function () {
                    $.ajax({
                        url: '/modifyState',
                        type: 'post',
                        data: {
                            oid
                        },
                        dataType: 'JSON',
                        success: data => {
                            if (data.code == 200) {
                                $(".tipText").text("支付成功!")
                                $(".tooltip").show()
                                setTimeout(() => {
                                    $(".tooltip").hide()
                                }, 1000)
                                xuanran();
                            }
                        }
                    })
                })
            }
        }
    })
})
$('.cart_items').on('click', '.cartCaozuo', function () {
    let text = $(this).text();
    console.log(text)
    if (text == '退款') {
        $(this).text('退款中  取消退款')
    }
    else if (text == '退款中  取消退款') {
        $(this).text('退款')
    }
})







