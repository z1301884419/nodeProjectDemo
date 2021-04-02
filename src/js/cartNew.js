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
            console.log(data);
            location.reload()
        },
        error: () => {
            console.log('出错啦!!!');
        }

    })
})

// 点击加按钮的请求
// $(".cart_items_list").on("click", ".qty_add", function () {
//     let cartCount = parseInt($(this).siblings(".product_num").text());
//     cartCount++;
//     $(this).siblings(".product_num").html(cartCount);
//     let cartId = $(this).attr("data-cid");
//     let cartPrice = parseInt($(this).siblings(".product_num").attr("data-cprice"));
//     // 小计
//     $(this).parents(".product_quantity_container").siblings(".product_total").html("￥" + (cartCount * cartPrice));
//     $.ajax({
//         url: '/modifyCartNum',
//         type: 'POST',
//         data: {
//             id: cartId,
//             c_number: cartCount,
//             c_total: cartCount * cartPrice
//         },
//         dataType: 'json',
//         success: data => {
//             console.log(data);
//         },
//         error: () => {
//             console.log('出错啦!!!');
//         }
//     })
// })

// // 点击减按钮的请求
// $(".cart_items_list").on("click", ".qty_sub", function () {
//     let cartCount = parseInt($(this).siblings(".product_num").text());
//     cartCount--;
//     cartCount = cartCount < 1 ? 1 : cartCount
//     $(this).siblings(".product_num").text(cartCount);
//     let cartId = $(this).attr("data-cid");
//     let cartPrice = parseInt($(this).siblings(".product_num").attr("data-cprice"));
//     $(this).parents(".product_quantity_container").siblings(".product_total").text("￥" + (cartCount * cartPrice));
//     $.ajax({
//         url: '/modifyCartNum',
//         type: 'POST',
//         data: {
//             id: cartId,
//             c_number: cartCount,
//             c_total: cartCount * cartPrice
//         },
//         dataType: 'json',
//         success: data => {
//             console.log(data.data);
//         },
//         error: () => {
//             console.log('出错啦!!!');
//         }
//     })
// })

// 计算总计
// function calTotal (checked_box, id){
//     $.ajax({
//         url: '/searchCart',
//         type: 'GET',
//         dataType: 'json',
//         data: {
//             id: id
//         },
//         success: data => {
//             let temp_total = parseFloat(data.data[0].c_total);
//             temp_total = checked_box.prop("checked") ? temp_total : -1 * temp_total
//             $(".totalAccount").html(totalPrice += temp_total);
//         },
//         error: () => {
//             console.log('出错啦!!!');
//         }
//     })
// }
//选
$(".cart_items_list").on("change", ".checkBox", function () {
    let self = $(this);
    $(".checkboxAll").prop("checked", $(".checkBox:checked").length === dataLength);
    // calTotal(self, self.data("cid"));
    cal_total_func('/searchCart');
})

//加
$(".cart_items_list").on("click", ".qty_add", function () {
    let total_data = [];
    console.log();
    total_data.push({
        "id:":$(this).attr("data-cid"), 
        "num": $(this).attr("data-num"), 
        "checkState": $(this).parents(".product_quantity_container").siblings(".product_color").children(".checkBox").prop("checked")
    })
    $.ajax({
        url: '/modifyCartNum',
        type: 'GET',
        dataType: 'json',
        data: {
            total_data: total_data
        },
        success: data => {
            $(".totalAccount").html(data.data["result"]);
        },
        error: () => {
            console.log('出错啦!!!');
        }
    })
    // let cartCount = parseInt($(this).siblings(".product_num").text());
    // cartCount++;
    // $(this).siblings(".product_num").html(cartCount);
    // let cartId = $(this).attr("data-cid");
    // let cartPrice = parseInt($(this).siblings(".product_num").attr("data-cprice"));
    // // 小计
    // $(this).parents(".product_quantity_container").siblings(".product_total").html("￥" + (cartCount * cartPrice));
    // cal_total_func('/modifyCartNum');
    // $.ajax({
    //     url: '/modifyCartNum',
    //     type: 'POST',
    //     data: {
    //         id: cartId,
    //         c_number: cartCount,
    //         c_total: cartCount * cartPrice
    //     },
    //     dataType: 'json',
    //     success: data => {
    //         // 计算后价格，当前总价-计算前的价格 + 计算后的价格
    //         // 安全
    //         // 计算，改了，100 4 5 500 ，100
    //         //前端的计算 主要是为了和后端进行数据对比，以后端为主，如果结果不一致，非法操作。
    //         // 加 减操作，点了之后，不要直接修改页面，后端计算过后再根据结果修改页面
    //         // 加 修改单件完物品的价格。判断首付勾选，计算合计价格
    //         //合计价格  { 1:10， 2:2 }，价格后端通过 ID查询，根据数量进行计算
    //         cal_total_func($(this))
    //         console.log(data);
    //         // { code : 200, message: 返回成功, 
    //         // }
    //     },
    //     error: () => {
    //         console.log('出错啦!!!');
    //     }
    // })
})

// 点击减按钮的请求
// $(".cart_items_list").on("click", ".qty_sub", function () {
//     let cartCount = parseInt($(this).siblings(".product_num").text());
//     cartCount--;
//     cartCount = cartCount < 1 ? 1 : cartCount
//     $(this).siblings(".product_num").text(cartCount);
//     let cartId = $(this).attr("data-cid");
//     let cartPrice = parseInt($(this).siblings(".product_num").attr("data-cprice"));
//     $(this).parents(".product_quantity_container").siblings(".product_total").text("￥" + (cartCount * cartPrice));
//     $.ajax({
//         url: '/modifyCartNum',
//         type: 'POST',
//         data: {
//             id: cartId,
//             c_number: cartCount,
//             c_total: cartCount * cartPrice
//         },
//         dataType: 'json',
//         success: data => {
//             console.log(data.data);
//         },
//         error: () => {
//             console.log('出错啦!!!');
//         }
//     })
// })

//总计
function cal_total(){
    // 检索所有被勾选的商品
    $(".cart_items_list").on("change", ".checkBox", function () {
        let self = $(this);
        $(".checkboxAll").prop("checked", $(".checkBox:checked").length === dataLength);
        calTotal(self, self.data("cid"));
    });
}
//总计函数
function cal_total_func (url, checked_box, id){
    let total_data = []
    for(let i = 0; i < $(".checkBox").length; i++){
        if($(".checkBox").eq(i).prop("checked")){
            total_data.push({"id":$(".checkBox").eq(i).attr("data-cid"), "num" : $(".checkBox").eq(i).attr("data-num")});
        }
    }
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        data: {
            total_data: total_data
        },
        success: data => {
            $(".totalAccount").html(data.data["result"]);
        },
        error: () => {
            console.log('出错啦!!!');
        }
    })
}

// 加
// 减
// 选 加
// 选 减


// 勾选框
// $(".cart_items_list").on("change", ".checkBox", function () {
//     if ($(".checkBox:checked").length === dataLength) {
//         $(".checkboxAll").prop("checked", true);
//     } else {
//         $(".checkboxAll").prop("checked", false);
//     }
//     console.log($(this).attr("data-cid"));
//     let cartId = $(this).attr("data-cid");
//     $.ajax({
//         url: '/searchCart',
//         type: 'GET',
//         dataType: 'json',
//         data: {
//             id: cartId
//         },
//         success: data => {
//             console.log(data);
//             if ($(this).prop("checked")) {
//                 totalPrice += parseFloat(data.data[0].c_total);
//             } else {
//                 totalPrice -= parseFloat(data.data[0].c_total);
//             }
//             $(".totalAccount").html(totalPrice);
//         },
//         error: () => {
//             console.log('出错啦!!!');
//         }
//     })


// })



// $(".cart_items_list").on("click", ".qty_sub", function (){
//     let cartCount = parseInt($(this).siblings(".product_num").text());
//     cartCount--;
//     // cartCount = cartCount < 1 ? 1 : cartCount
//     $(this).siblings(".product_num").text(cartCount);
//     let cartId = $(this).attr("data-cid");
//     let cartPrice = parseInt($(this).siblings(".product_num").attr("data-cprice"));
//     $(this).parents(".product_quantity_container").siblings(".product_total").text("￥" + (cartCount * cartPrice));
//     $.ajax({
//         url: '/modifyCartNum',
//         type: 'POST',
//         data: {
//             id: cartId,
//             c_number: cartCount,
//             c_total: cartCount * cartPrice
//         },
//         dataType: 'json',
//         success: data => {
//             console.log(data.data);
//             calTotal($(this), cartId)
//         },
//         error: () => {
//             console.log('出错啦!!!');
//         }
//     })
// })




// 全选和全不选
$(".checkboxAll").change(function () {
    $(".checkBox, .checkboxAll").prop("checked", $(this).prop("checked"));
    let temp = $(".product_total").text();
    temp = temp.split('￥')
    console.log(temp);
    // let idArr = [];
    // for (let i = 0; i < $(".checkBox:checked").length; i++) {
    //     idArr.push($(".checkBox:checked").eq(i).attr("data-cid"));
    // }
    // console.log(idArr);
    // $.ajax({
    //     url: '/searchAll',
    //     type: 'GET',
    //     dataType: 'json',
    //     data: {
    //         id: idArr
    //     },
    //     success: data => {
    //         if ($(this).prop("checked")) {
    //             totalPrice += parseFloat(data.data[0].c_total);
    //         } else {
    //             totalPrice -= parseFloat(data.data[0].c_total);
    //         }
    //         $(".totalAccount").text(totalPrice);
    //     },
    //     error: () => {
    //         console.log('出错啦!!!');
    //     }
    // })
})

// 点击去结算生成新订单
$(".checkOut").on("click", () => {
    let cartArr = [];
    for (let i = 0; i < $(".checkBox:checked").length; i++) {
        cartArr.push($(".checkBox:checked").eq(i).attr("data-cid"));
    }
    console.log(cartArr);
    $.ajax({
        url: '/checkOutSelect',
        type: 'GET',
        dataType: 'json',
        data: {
            id: cartArr
        },
        success: data => {
            console.log(data);
            let item = data.data;
            let c_codeArr = [];
            let c_uidArr = [];
            let c_stareArr = [];
            let c_pidArr = [];
            let c_numArr = [];
            let c_sizeArr = [];
            for(let i = 0; i < item.length; i++){
                c_codeArr.push(+ new Date());
                c_uidArr.push(item.c_uid);
                c_stareArr.push('待支付');
                c_pidArr.push(c_pid);
                c_numArr.push(c_number);
                c_sizeArr.push(c_size)
            }
            // $.ajax({
            //     url: '/checkOut',
            //     type: 'POST',
            //     dataType: 'json',
            //     data: {
            //         c_codeArr: c_codeArr,
            //         c_uidArr: c_uidArr,
            //         c_stareArr: c_stareArr,
            //         c_pidArr: c_pidArr,
            //         c_numArr: c_numArr,
            //         c_sizeArr: c_sizeArr
            //     },
            //     success: data => {
            //         console.log(data);
            //     },
            //     error: () => {
            //         console.log('出错啦!!!');
            //     }
            // })
        },
        error: () => {
            console.log('出错啦!!!');
        }
    })
})
