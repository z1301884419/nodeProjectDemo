let dataLength = 0;
let totalPrice = 0;
// 渲染页面
$.ajax({
    url: '/cartInfo',
    type: 'GET',
    dataType: 'json',
    success: data => {
        // console.log(data);
        // 去掉id重复的图片
        for (let i = 0; i < data.data.length; i++) {
            for (let j = i + 1; j < data.data.length; j++) {
                if (data.data[i].c_id == data.data[j].c_id) {         //第一个等同于第二个，splice方法删除第二个
                    data.data.splice(j, 1);
                    j--;
                }
            }
        }
        dataLength = data.data.length;
        // console.log(data.data);
        let str = '';
        $.each(data.data, (i, item) => {
            // idArr.push(item.c_id)
            str += `<li data-cid=${item.c_id} class="cart_item item_list d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
            <div class="product d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
                <div>
                    <div class="product_image"><img src="..${item.i_src}"></div>
                </div>
                <div class="product_name"><a href="javascript:;">${item.p_name}</a></div>
            </div>
            <div class="product_size text-lg-center product_text"><span>Size: </span>${item.c_size} </div>
            <div class="product_price text-lg-center product_text"><span>Price: </span>￥${item.p_price}</div>
            <div class="product_quantity_container">
                <div class="product_quantity ml-lg-auto mr-lg-auto text-center">
                    <span class="product_text product_num" data-cid=${item.c_id} data-cprice=${item.p_price}>${item.c_number}</span>
                    <div class="qty_sub qty_button trans_200 text-center" data-cid=${item.c_id}><span>-</span></div>
                    <div class="qty_add qty_button trans_200 text-center" data-cid=${item.c_id}><span>+</span></div>
                </div>
            </div>
            <div style="width: 18%;"  class="product_total text-lg-center product_text"><span></span>￥${item.c_total}</div>
            <div class="product_color text-lg-center product_text"><input type="checkbox" class="checkBox" data-cid=${item.c_id}></div>
        </li>`
        })
        $(".cart_items_list").html(str);
    },
    error: () => {
        console.log('出错啦!!!');
    }
})

// 点击清空购物车
$(".button_clear").click(() => {
    $.ajax({
        url: '/clearAll',
        type: 'POST',
        dataType: 'json',
        success: data => {
            console.log(data);
        },
        error: () => {
            console.log('出错啦!!!');
        }

    })
})

// 点击加按钮的请求
$(".cart_items_list").on("click", ".qty_add", function () {
    let cartCount = parseInt($(this).siblings(".product_num").text());
    cartCount++;
    $(this).siblings(".product_num").text(cartCount);
    let cartId = $(this).attr("data-cid");
    let cartPrice = parseInt($(this).siblings(".product_num").attr("data-cprice"));
    // 小计
    $(this).parents(".product_quantity_container").siblings(".product_total").text("￥" + (cartCount * cartPrice));
    $.ajax({
        url: '/modifyCartNum',
        type: 'POST',
        data: {
            id: cartId,
            c_number: cartCount,
            c_total: cartCount * cartPrice
        },
        dataType: 'json',
        success: data => {
            console.log(data);
        },
        error: () => {
            console.log('出错啦!!!');
        }
    })
})

// 点击减按钮的请求
$(".cart_items_list").on("click", ".qty_sub", function () {
    let cartCount = parseInt($(this).siblings(".product_num").text());
    cartCount--;
    cartCount = cartCount < 1 ? 1 : cartCount
    $(this).siblings(".product_num").text(cartCount);
    let cartId = $(this).attr("data-cid");
    let cartPrice = parseInt($(this).siblings(".product_num").attr("data-cprice"));
    $(this).parents(".product_quantity_container").siblings(".product_total").text("￥" + (cartCount * cartPrice))
    $.ajax({
        url: '/modifyCartNum',
        type: 'POST',
        data: {
            id: cartId,
            c_number: cartCount,
            c_total: cartCount * cartPrice
        },
        dataType: 'json',
        success: data => {
            console.log(data);
        },
        error: () => {
            console.log('出错啦!!!');
        }
    })
})

// 勾选框
$(".cart_items_list").on("change", ".checkBox", function () {
    if ($(".checkBox:checked").length === dataLength) {
        $(".checkboxAll").prop("checked", true);
    } else {
        $(".checkboxAll").prop("checked", false);
    }
    console.log($(this).attr("data-cid"));
    let id = $(this).attr("data-cid");
    $.ajax({
        url: '/searchCart',
        type: 'GET',
        dataType: 'json',
        data: {
            id: id
        },
        success: data => {
            console.log(data.data);
        },
        error: () => {
            console.log('出错啦!!!');
        }
    })
    if($(this).prop("checked")){
        totalPrice += parseFloat($(this).parent().siblings(".product_total").text().replace('￥', ''));
    } else {
        totalPrice -= parseFloat($(this).parent().siblings(".product_total").text().replace('￥', ''));
    }
    $(".totalAccount").text()
    
})

// 全选和全不选
$(".checkboxAll").change(function () {
    $(".checkBox, .checkboxAll").prop("checked", $(this).prop("checked"))
    

})

// 点击去结算生成新订单
$(".checkOut").on("click", () => {
    let cartArr = [];
    for (let i = 0; i < $(".checkBox:checked").length; i++) {
        cartArr.push($(".checkBox:checked").eq(i).attr("data-cid"));
    }
    console.log(cartArr);
    

})
