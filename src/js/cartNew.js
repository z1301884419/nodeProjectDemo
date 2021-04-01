let idArr = [];
// 渲染页面
$.ajax({
    url: '/cartInfo',
    type: 'GET',
    dataType: 'json',
    success: data => {
        console.log(data);
        // 去掉id重复的图片
        for (let i = 0; i < data.data.length; i++) {
            for (let j = i + 1; j < data.data.length; j++) {
                if (data.data[i].c_id == data.data[j].c_id) {         //第一个等同于第二个，splice方法删除第二个
                    data.data.splice(j, 1);
                    j--;
                }
            }
        }
        console.log(data.data);
        let str = '';
        $.each(data.data, (i, item) => {
            idArr.push(item.c_id)
            str += `<li data-cid=${item.c_id} class="cart_item item_list d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
            <div class="product d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
                <div>
                    <div class="product_image"><img src="..${item.i_src}"></div>
                </div>
                <div class="product_name"><a href="javascript:;">${item.p_name}</a></div>
            </div>
            <div class="product_size text-lg-center product_text"><span>Size: </span>${item.c_size} </div>
            <div class="product_price text-lg-center product_text"><span>Price:
                </span>￥2600</div>
            <div class="product_quantity_container">
                <div class="product_quantity ml-lg-auto mr-lg-auto text-center">
                    <span class="product_text product_num">1</span>
                    <div class="qty_sub qty_button trans_200 text-center"><span>-</span>
                    </div>
                    <div class="qty_add qty_button trans_200 text-center"><span>+</span>
                    </div>
                </div>
            </div>
            <div class="product_total text-lg-center product_text"><span>Total: </span>￥${item.p_price}</div>
            <div class="product_color text-lg-center product_text"><input type="checkbox"></div>
        </li>`
        })
        $(".cart_items_list").html(str);
    },
    error: () => {
        console.log('出错啦!!!');
    }
})

// $(() => {
//     console.log(123);
//     // console.log($("..cart_items_list > .cart_item").attr("data-cid"));
//     console.log(idArr);
// })

// 点击清空购物车
$(".button_clear").click(() => {
    console.log(idArr);
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
