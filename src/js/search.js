// let searchVal = sessionStorage.getItem('val');
let searchVal = decodeURI(getUrlParam('searchVal'));
console.log(searchVal);

//获取地址栏参数为中文的方法
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    } else {
        return null;
    }
}
//查询数据库
$.ajax({
    url: '/searchPro',
    type: 'get',
    dataType: 'json',
    data: {
        searchVal
    },
    success(data) {
        console.log(data);
        if (data.code == 200) {
            for (let i = 0; i < data.data.length; i++) {
                for (let j = i + 1; j < data.data.length; j++) {
                    if (data.data[i].p_id == data.data[j].p_id) {
                        data.data.splice(j, 1);
                        j--;
                    }
                }
            };
            let newarr = [...data.data];//所有去重商品;
            $('.searchPNode').html('');
            $.each(newarr, (i, item) => {
                //2新品，3热门，4打折，5正常
                if (item.p_status == 2) {
                    $('.searchPNode').append(`
                    <div class="product grid-item new searchItem" data-id="${item.i_pid}">
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
                } else if (item.p_status == 3) {
                    $('.searchPNode').append(`
                    <div class="product grid-item hot searchItem" data-id="${item.i_pid}">
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
                } else if (item.p_status == 4) {
                    $('.searchPNode').append(`
                    <div class="product grid-item sale searchItem" data-id="${item.i_pid}">
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
                } else if (item.p_status == 5) {
                    $('.searchPNode').append(`
                    <div class="product grid-item searchItem" data-id="${item.i_pid}">
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
            });
        }
    }
})
// 查看详情
$('.searchPNode').on('click', '.searchItem', function () {
    let id = $(this).attr('data-id');
    location.href = `../pages/product.html?shop_id=${id}`
});