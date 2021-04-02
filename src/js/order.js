window.onload=function(){
    xuanran()
}
function xuanran(){
    $.ajax({
        url:'/orderAll',
        type:'get',
        success:data=>{
         for (let i = 0; i < data.data.length; i++) {
             for (let j = i + 1; j < data.data.length; j++) {
                 if (data.data[i].or_pid == data.data[j].or_pid) {         
                     data.data.splice(j, 1);
                     j--;
                 }
             }
         }
        let arr1=[];
        let arr2=[];
        for(let i=0;i<data.data.length;i++){
            if(data.data[i].o_state=='待支付'){
                arr1.push(data.data[i])
            }
            else{
                arr2.push(data.data[i])
            }
        }
        for (let i = 0; i < data.data.length; i++) {
         for (let j = i + 1; j < data.data.length; j++) {
             if (data.data[i].o_state == data.data[j].o_state) {         
                 data.data.splice(j, 1);
                 j--;
             }
         }
     }
     $.each(data.data,(i,item)=>{
         $('.cart_items').append(`<ul class="cart_items_list"
         style="overflow: hidden; border-bottom: 1px solid rgb(189, 187, 187); margin-top: 20px;">
         <div>订单编号：<span>${item.o_code}</span></div>
         </ul>`)
     })
     $.each(arr1,(i,item)=>{
         $('.cart_items_list').eq(0).append(`<li
         class="cart_item item_list d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
         <div
             class="product d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
             <div>
                 <div class="product_image"><img src="..${item.i_src}" alt="">
                 </div>
             </div>
             <div class="product_name"><a href="product.html">${item.p_name}</a></div>
         </div>
         <div class="product_size text-lg-center product_text"><span>Size: </span>${item.or_size}</div>
         <div class="product_price text-lg-center product_text"><span>Price:
             </span>$${item.p_price}</div>
         <div class="product_quantity_container">
             <div class="product_quantity ml-lg-auto mr-lg-auto text-center">
                 <span class="product_text product_num">${item.or_number}</span>
             </div>
         </div>
         <div class="product_total text-lg-center product_text"><span>Total:
             </span>$${item.o_total}</div>
         <div class="product_total text-lg-center product_text"><a href="#">修改地址</a>
         </div>
     </li>`)
     })
     $.each(arr2,(i,item)=>{
         $('.cart_items_list').eq(1).append(`<li
         class="cart_item item_list d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
         <div
             class="product d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
             <div>
                 <div class="product_image"><img src="..${item.i_src}" alt="">
                 </div>
             </div>
             <div class="product_name"><a href="product.html">${item.p_name}</a></div>
         </div>
         <div class="product_size text-lg-center product_text"><span>Size: </span>${item.or_size}</div>
         <div class="product_price text-lg-center product_text"><span>Price:
             </span>$${item.p_price}</div>
         <div class="product_quantity_container">
             <div class="product_quantity ml-lg-auto mr-lg-auto text-center">
                 <span class="product_text product_num">${item.or_number}</span>
             </div>
         </div>
         <div class="product_total text-lg-center product_text"><span>Total:
             </span>$${item.o_total}</div>
         <div class="product_total text-lg-center product_text"><a href="#">退款</a>
         </div>
     </li>`)
     })
 
         $('.cart_items_list').eq(0).append(`<div style="float: right; margin-bottom: 10px;">
         <button type="button" class="btn btn-success">去支付</button></div>`)
         $('.cart_items_list').eq(1).append(`<div style="float: right; margin-bottom: 10px;">
         <button type="button" class="btn btn-secondary shanchuall">删除订单</button></div>`)
         $('.shanchuall').click(function(){
             console.log($(this).parent('div').parent('ul'))
            $(this).parent('div').parent('ul').remove()
        })
        }
    }) 
}
$('.btn-outline-secondary').eq(0).click(function(){
    $('.cart_items').html('')
   $.ajax({
       url:'/orderAll',
       type:'get',
       success:data=>{
        for (let i = 0; i < data.data.length; i++) {
            for (let j = i + 1; j < data.data.length; j++) {
                if (data.data[i].or_pid == data.data[j].or_pid) {         
                    data.data.splice(j, 1);
                    j--;
                }
            }
        }
       let arr1=[];
       let arr2=[];
       for(let i=0;i<data.data.length;i++){
           if(data.data[i].o_state=='待支付'){
               arr1.push(data.data[i])
           }
           else{
               arr2.push(data.data[i])
           }
       }
       for (let i = 0; i < data.data.length; i++) {
        for (let j = i + 1; j < data.data.length; j++) {
            if (data.data[i].o_state == data.data[j].o_state) {         
                data.data.splice(j, 1);
                j--;
            }
        }
    }
    $.each(data.data,(i,item)=>{
        $('.cart_items').append(`<ul class="cart_items_list"
        style="overflow: hidden; border-bottom: 1px solid rgb(189, 187, 187); margin-top: 20px;">
        <div>订单编号：<span>${item.o_code}</span></div>
        </ul>`)
    })
    $.each(arr1,(i,item)=>{
        $('.cart_items_list').eq(0).append(`<li
        class="cart_item item_list d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
        <div
            class="product d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
            <div>
                <div class="product_image"><img src="..${item.i_src}" alt="">
                </div>
            </div>
            <div class="product_name"><a href="product.html">${item.p_name}</a></div>
        </div>
        <div class="product_size text-lg-center product_text"><span>Size: </span>${item.or_size}</div>
        <div class="product_price text-lg-center product_text"><span>Price:
            </span>$${item.p_price}</div>
        <div class="product_quantity_container">
            <div class="product_quantity ml-lg-auto mr-lg-auto text-center">
                <span class="product_text product_num">${item.or_number}</span>
            </div>
        </div>
        <div class="product_total text-lg-center product_text"><span>Total:
            </span>$${item.o_total}</div>
        <div class="product_total text-lg-center product_text"><a href="#">修改地址</a>
        </div>
    </li>`)
    })
    $.each(arr2,(i,item)=>{
        $('.cart_items_list').eq(1).append(`<li
        class="cart_item item_list d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
        <div
            class="product d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
            <div>
                <div class="product_image"><img src="..${item.i_src}" alt="">
                </div>
            </div>
            <div class="product_name"><a href="product.html">${item.p_name}</a></div>
        </div>
        <div class="product_size text-lg-center product_text"><span>Size: </span>${item.or_size}</div>
        <div class="product_price text-lg-center product_text"><span>Price:
            </span>$${item.p_price}</div>
        <div class="product_quantity_container">
            <div class="product_quantity ml-lg-auto mr-lg-auto text-center">
                <span class="product_text product_num">${item.or_number}</span>
            </div>
        </div>
        <div class="product_total text-lg-center product_text"><span>Total:
            </span>$${item.o_total}</div>
        <div class="product_total text-lg-center product_text"><a href="#">退款</a>
        </div>
    </li>`)
    })

        $('.cart_items_list').eq(0).append(`<div style="float: right; margin-bottom: 10px;">
        <button type="button" class="btn btn-success">去支付</button></div>`)
        $('.cart_items_list').eq(1).append(`<div style="float: right; margin-bottom: 10px;">
        <button type="button" class="btn btn-secondary shanchuall">删除订单</button></div>`)
        $('.shanchuall').click(function(){
            console.log($(this).parent('div').parent('ul'))
           $(this).parent('div').parent('ul').remove()
       })
       }
   })
})
$('.btn-outline-secondary').eq(1).click(function(){
    $('.cart_items').html('')
    $.ajax({
        url:'/orderAll',
        type:'get',
        success:data=>{
         for (let i = 0; i < data.data.length; i++) {
             for (let j = i + 1; j < data.data.length; j++) {
                 if (data.data[i].or_pid == data.data[j].or_pid) {         
                     data.data.splice(j, 1);
                     j--;
                 }
             }
         }
        let arr1=[];
        let arr2=[];
        for(let i=0;i<data.data.length;i++){
            if(data.data[i].o_state=='待支付'){
                arr1.push(data.data[i])
            }
        };

        for(var i=0;i<arr1.length;i++){
            arr2.push(arr1[i])
        }
        for (let i = 0; i < data.data.length; i++) {
         for (let j = i + 1; j < data.data.length; j++) {
             if (data.data[i].o_state == data.data[j].o_state) {         
                 data.data.splice(j, 1);
                 j--;
             }
         }
     }
     for (let i = 0; i < arr2.length; i++) {
        for (let j = i + 1; j < arr2.length; j++) {
            if (arr2[i].o_state == arr2[j].o_state) {         
                arr2.splice(j, 1);
                j--;
            }
        }
    }
     $.each(arr2,(i,item)=>{
         $('.cart_items').append(`<ul class="cart_items_list"
         style="overflow: hidden; border-bottom: 1px solid rgb(189, 187, 187); margin-top: 20px;">
         <div>订单编号：<span>${item.o_code}</span></div>
         </ul>`)
     })
     $.each(arr1,(i,item)=>{
         $('.cart_items_list').eq(0).append(`<li
         class="cart_item item_list d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
         <div
             class="product d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
             <div>
                 <div class="product_image"><img src="..${item.i_src}" alt="">
                 </div>
             </div>
             <div class="product_name"><a href="product.html">${item.p_name}</a></div>
         </div>
         <div class="product_size text-lg-center product_text"><span>Size: </span>${item.or_size}</div>
         <div class="product_price text-lg-center product_text"><span>Price:
             </span>$${item.p_price}</div>
         <div class="product_quantity_container">
             <div class="product_quantity ml-lg-auto mr-lg-auto text-center">
                 <span class="product_text product_num">${item.or_number}</span>
             </div>
         </div>
         <div class="product_total text-lg-center product_text"><span>Total:
             </span>$${item.o_total}</div>
         <div class="product_total text-lg-center product_text"><a href="#">修改地址</a>
         </div>
     </li>`)
     })
         $('.cart_items_list').eq(0).append(`<div style="float: right; margin-bottom: 10px;">
         <button type="button" class="btn btn-success">去支付</button></div>`)
        }
    })
})
$('.btn-outline-secondary').eq(2).click(function(){
    $('.cart_items').html('')
    $.ajax({
        url:'/orderAll',
        type:'get',
        success:data=>{
         for (let i = 0; i < data.data.length; i++) {
             for (let j = i + 1; j < data.data.length; j++) {
                 if (data.data[i].or_pid == data.data[j].or_pid) {         
                     data.data.splice(j, 1);
                     j--;
                 }
             }
         }
        let arr1=[];
        let arr2=[];
        for(let i=0;i<data.data.length;i++){
            if(data.data[i].o_state=='已支付'){
                arr1.push(data.data[i])
            }
        };

        for(var i=0;i<arr1.length;i++){
            arr2.push(arr1[i])
        }
        for (let i = 0; i < data.data.length; i++) {
         for (let j = i + 1; j < data.data.length; j++) {
             if (data.data[i].o_state == data.data[j].o_state) {         
                 data.data.splice(j, 1);
                 j--;
             }
         }
     }
     for (let i = 0; i < arr2.length; i++) {
        for (let j = i + 1; j < arr2.length; j++) {
            if (arr2[i].o_state == arr2[j].o_state) {         
                arr2.splice(j, 1);
                j--;
            }
        }
    }
     $.each(arr2,(i,item)=>{
         $('.cart_items').append(`<ul class="cart_items_list"
         style="overflow: hidden; border-bottom: 1px solid rgb(189, 187, 187); margin-top: 20px;">
         <div>订单编号：<span>${item.o_code}</span></div>
         </ul>`)
     })
     $.each(arr1,(i,item)=>{
         $('.cart_items_list').eq(0).append(`<li
         class="cart_item item_list d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
         <div
             class="product d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
             <div>
                 <div class="product_image"><img src="..${item.i_src}" alt="">
                 </div>
             </div>
             <div class="product_name"><a href="product.html">${item.p_name}</a></div>
         </div>
         <div class="product_size text-lg-center product_text"><span>Size: </span>${item.or_size}</div>
         <div class="product_price text-lg-center product_text"><span>Price:
             </span>$${item.p_price}</div>
         <div class="product_quantity_container">
             <div class="product_quantity ml-lg-auto mr-lg-auto text-center">
                 <span class="product_text product_num">${item.or_number}</span>
             </div>
         </div>
         <div class="product_total text-lg-center product_text"><span>Total:
             </span>$${item.o_total}</div>
         <div class="product_total text-lg-center product_text"><a href="#">退款</a>
         </div>
     </li>`)
     })
     $('.cart_items_list').eq(0).append(`<div style="float: right; margin-bottom: 10px;">
     <button type="button" class="btn btn-secondary shanchuall">删除订单</button></div>`)
     $('.shanchuall').click(function(){
        console.log($(this).parent('div').parent('ul'))
       $(this).parent('div').parent('ul').remove()
   })
        }
    })
})






