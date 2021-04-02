let hotGoods = [];
let newGoods = [];
let saleGoods = [];
let allGoods = [];
$(function(){
    getData();
});
function getData(){
    $.ajax({
        url: '/getAllData',
        type: 'get',
        dataType: 'JSON',
        success: function (data) {
            for (let i = 0; i < data.data.length; i++) {
                for (let j = i + 1; j < data.data.length; j++) {
                    if (data.data[i].p_id == data.data[j].p_id) {
                        data.data.splice(j, 1);
                        j--;
                    }
                }
            };
            let allArr = [...data.data];//所有去重商品
            $('.parentNode').html('');
            $.each(allArr, (i, item) => {
                //2新品，3热门，4打折，5正常
                if (item.p_status == 2) {
                    $('.parentNode').append(`
                    <div class="product grid-item new itemBox" data-id="${item.i_pid}">
                        <div class="product_inner">
                            <div class="product_image">
                                <img src="..${item.i_src}" alt="">
                            <div class="product_tag">new</div>
                        </div>
                        <div class="product_content text-center">
                        <div class="product_title"><a href="product.html">${item.p_name}</a></div>
                        <div class="product_price">$${item.p_price}</div>
                            <div class="product_button ml-auto mr-auto trans_200">
                                <a href="javascript:;">add to cart</a>
                            </div>
                        </div>
                        </div>
                    </div>
                    `);
                    newGoods.push(item);
                } else if (item.p_status == 3) {
                    $('.parentNode').append(`
                    <div class="product grid-item hot itemBox" data-id="${item.i_pid}">
                        <div class="product_inner">
                            <div class="product_image">
                                <img src="..${item.i_src}" alt="">
                            <div class="product_tag">hot</div>
                        </div>
                        <div class="product_content text-center">
                        <div class="product_title"><a href="product.html">${item.p_name}</a></div>
                        <div class="product_price">$${item.p_price}</div>
                            <div class="product_button ml-auto mr-auto trans_200">
                                <a href="javascript:;">add to cart</a>
                            </div>
                        </div>
                        </div>
                    </div>
                    `);
                    hotGoods.push(item);
                } else if (item.p_status == 4) {
                    $('.parentNode').append(`
                    <div class="product grid-item sale itemBox" data-id="${item.i_pid}">
                        <div class="product_inner">
                            <div class="product_image">
                                <img src="..${item.i_src}" alt="">
                            <div class="product_tag">sale</div>
                        </div>
                        <div class="product_content text-center">
                        <div class="product_title"><a href="product.html">${item.p_name}</a></div>
                        <div class="product_price">$${item.p_price}</div>
                            <div class="product_button ml-auto mr-auto trans_200">
                                <a href="javascript:;">add to cart</a>
                            </div>
                        </div>
                        </div>
                    </div>
                    `);
                    saleGoods.push(item);
                } else if (item.p_status == 5) {
                    $('.parentNode').append(`
                    <div class="product grid-item itemBox" data-id="${item.i_pid}">
                        <div class="product_inner">
                            <div class="product_image">
                                <img src="..${item.i_src}" alt="">
                            </div>
                        </div>
                        <div class="product_content text-center">
                            <div class="product_title"><a href="product.html">${item.p_name}</a></div>
                            <div class="product_price">$${item.p_price}</div>
                                <div class="product_button ml-auto mr-auto trans_200">
                                    <a href="javascript:;">add to cart</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    `);
                };
                allGoods.push(item);
            });
        }
    });
};
// 查看详情
$('.parentNode').on('click', '.itemBox', function () {
    let id = $(this).attr('data-id');
    location.href = `../pages/product.html?shop_id=${id}`
});
//封装的筛选函数
function shaixuan(eventnode, arr, parentNode,state) {
    eventnode.on('click', function () {
        parentNode.html('');
        $.each(arr, (i, item) => {
            parentNode.append(`
                    <div class="product grid-item ${state} itemBox" data-id="${item.i_pid}">
                        <div class="product_inner">
                            <div class="product_image">
                                <img src="..${item.i_src}" alt="">
                            <div class="product_tag">${state}</div>
                        </div>
                        <div class="product_content text-center">
                        <div class="product_title"><a href="product.html">${item.p_name}</a></div>
                        <div class="product_price">$${item.p_price}</div>
                            <div class="product_button ml-auto mr-auto trans_200">
                                <a href="javascript:;">add to cart</a>
                            </div>
                        </div>
                        </div>
                    </div>
                    `);
        })
    })
};
//筛选热门
shaixuan($('.hotWomanBtn'),hotGoods,$('.parentNode'),'hot');
//筛选新品
shaixuan($('.newWomanBtn'),newGoods,$('.parentNode'),'new');
//筛选打折
shaixuan($('.saleWomanBtn'),saleGoods,$('.parentNode'),'sale');
//展示所有
$('.allWomanBtn').on('click',getData);