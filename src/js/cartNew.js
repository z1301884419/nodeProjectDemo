let dataLength = 0;
let totalPrice = 0;
// 渲染页面
$.ajax({
    url: '/cartInfo',
    type: 'GET',
    dataType: 'json',
    success: data => {
        // 去掉id重复的图片
        for (let i = 0; i < data.data.length; i++) {
            for (let j = i + 1; j < data.data.length; j++) {
                if (data.data[i].c_id == data.data[j].c_id) {
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
                    <span class="product_text product_num" data-cid=${item.c_id} data-cprice=${item.p_price} >${item.c_number}</span>
                    <div class="qty_sub qty_button trans_200 text-center" data-cid=${item.c_id} data-num=${item.c_number}><span>-</span></div>
                    <div class="qty_add qty_button trans_200 text-center" data-cid=${item.c_id} data-num=${item.c_number}><span>+</span></div>
                </div>
            </div>
            <div style="width: 18%;"  class="product_total text-lg-center product_text"><span></span>￥${item.c_total}</div>
            <div class="product_color text-lg-center product_text"><input type="checkbox" class="checkBox" data-num=${item.c_number} data-cid=${item.c_id}></div>
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
            // console.log(data);
            location.reload()
        },
        error: () => {
            console.log('出错啦!!!');
        }

    })
})

//选
$(".cart_items_list").on("change", ".checkBox", function () {
    $(".checkboxAll").prop("checked", $(".checkBox:checked").length === dataLength);
    // calTotal(self, self.data("cid"))
    let total_data = [];
    console.log();
    for (let i = 0; i < $(".checkBox").length; i++) {
        if ($(".checkBox").eq(i).prop("checked")) {
            total_data.push({ "id": $(".checkBox").eq(i).attr("data-cid"), "num": $(".checkBox").eq(i).parent().siblings(".product_quantity_container").find(".product_num").text() });
        }
    }
    // console.log(total_data);
    $.ajax({
        url: '/searchCart',
        type: 'GET',
        dataType: 'json',
        data: {
            total_data: total_data
        },
        success: data => {
            // console.log(data);
            $(".totalAccount").html(data.data["result"]);
        },
        error: () => {
            console.log('出错啦!!!');
        }
    })
})

let total = 0;

//加
$(".cart_items_list").on("click", ".qty_add", function () {
    let total_data = [];
    // console.log($(this).siblings(".product_num").text());
    let add_or_sub = true;
    // console.log(add_or_sub);
    let numCount = parseInt($(this).siblings(".product_num").text());
    numCount++;
    $(this).siblings(".product_num").text(numCount);
    total_data.push({
        "id": $(this).attr("data-cid") + '',
        "num": numCount,
        "checkState": $(this).parents(".product_quantity_container").siblings(".product_color").children(".checkBox").prop("checked"),
        // 如果是加就用true
        add_or_sub: add_or_sub
    })
    $.ajax({
        url: '/modifyCartNum',
        type: 'GET',
        dataType: 'json',
        data: {
            total_data: total_data
        },
        success: data => {
            // console.log(data);
            $(this).siblings(".product_num").text(data.data.items[0].num);
            total = parseFloat($(".totalAccount").text());
            $(this).parents(".product_quantity_container").siblings(".product_total").text(data.data.result);
            if ($(this).parents(".product_quantity_container").siblings(".product_color").children(".checkBox").prop("checked")) {
                total += parseFloat(data.data.items[0].p_price);
                $(".totalAccount").text(total);
            }
        },
        error: () => {
            console.log('出错啦!!!');
        }
    })
    // 计算后价格，当前总价-计算前的价格 + 计算后的价格
    // 安全
    // 计算，改了，100 4 5 500 ，100
    //前端的计算 主要是为了和后端进行数据对比，以后端为主，如果结果不一致，非法操作。
    // 加 减操作，点了之后，不要直接修改页面，后端计算过后再根据结果修改页面
    // 加 修改单件完物品的价格。判断首付勾选，计算合计价格
    //合计价格  { 1:10， 2:2 }，价格后端通过 ID查询，根据数量进行计算
})

// 点击减按钮的请求
$(".cart_items_list").on("click", ".qty_sub", function () {
    let total_data = [];
    let add_or_sub = false
    console.log(add_or_sub);
    let numCount = parseInt($(this).siblings(".product_num").text());
    // console.log(numCount);
    numCount--;
    numCount = numCount < 1 ? 1 : numCount
    $(this).siblings(".product_num").text(numCount)
    total_data.push({
        "id": $(this).attr("data-cid") + '',
        "num": numCount,
        "checkState": $(this).parents(".product_quantity_container").siblings(".product_color").children(".checkBox").prop("checked"),
        // 如果是加就用true
        "add_or_sub": add_or_sub
    })
    $.ajax({
        url: '/modifyCartNum',
        type: 'GET',
        dataType: 'json',
        data: {
            total_data: total_data
        },
        success: data => {
            // console.log(data);
            $(this).siblings(".product_num").text(data.data.items[0].num);
            total = parseFloat($(".totalAccount").text());
            $(this).parents(".product_quantity_container").siblings(".product_total").text(data.data.result)
            if ($(this).parents(".product_quantity_container").siblings(".product_color").children(".checkBox").prop("checked")) {
                if (numCount > 1) {
                    total -= parseFloat(data.data.items[0].p_price)
                }
                $(".totalAccount").text(total)
            }
        },
        error: () => {
            console.log('出错啦!!!');
        }
    })
})


// 全选和全不选
$(".checkboxAll").change(function () {
    $(".checkBox, .checkboxAll").prop("checked", $(this).prop("checked"));
    let total_data = [];
    for (let i = 0; i < $(".checkBox").length; i++) {
        total_data.push({ "id": $(".checkBox").eq(i).data("cid") })
    }
    // console.log(total_data);
    if ($(".checkboxAll").prop("checked")) {
        $.ajax({
            url: '/checkAll',
            type: 'GET',
            dataType: 'json',
            data: {
                total_data: total_data
            },
            success: data => {
                // console.log(data);
                $(".totalAccount").text(data.data)
            },
            error: () => {
                console.log('出错啦!!!');
            }
        })
    } else{
        $(".totalAccount").text(0)
    }
})

// 点击去结算生成新订单
$(".checkOut").on("click", () => {
    let cartArr = [];
    for (let i = 0; i < $(".checkBox:checked").length; i++) {
        cartArr.push($(".checkBox:checked").eq(i).attr("data-cid"));
    }
    // console.log(cartArr);
    $.ajax({
        url: '/checkOutSelect',
        type: 'GET',
        dataType: 'json',
        data: {
            id: cartArr
        },
        success: data => {
            console.log(data);
            $(".total_amount").text(data.data.total);
            let code = data.data.code
            // 点击支付修改状态
            $(".cartPayment").on('click', () => {
                $.ajax({
                    url: '/modifyPaymentState',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        o_code: code
                    },
                    success: data => {
                        console.log(data);
                    },
                    error: () => {
                        console.log('出错啦!!!');
                    }
                })
            })
        },
        error: () => {
            console.log('出错啦!!!');
        }
    })
})


