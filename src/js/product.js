/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Init Menu


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var menu = $('.menu');
	var burger = $('.hamburger');
	var menuActive = false;

	$(window).on('resize', function()
	{
		setTimeout(function()
		{
			$(window).trigger('resize.px.parallax');
		}, 375);
	});

	initMenu();

	/* 

	2. Init Menu

	*/

	function initMenu()
	{
		if(menu.length)
		{
			if($('.hamburger').length)
			{
				burger.on('click', function()
				{
					if(menuActive)
					{
						closeMenu();
					}
					else
					{
						openMenu();

						$(document).one('click', function cls(e)
						{
							if($(e.target).hasClass('menu_mm'))
							{
								$(document).one('click', cls);
							}
							else
							{
								closeMenu();
							}
						});
					}
				});
			}
		}
	}

	function openMenu()
	{
		menu.addClass('active');
		menuActive = true;
	}

	function closeMenu()
	{
		menu.removeClass('active');
		menuActive = false;
	}

});


//通过传过来的商品id渲染数据
let shop_id = location.search.replace('?&shop_id=',"")
console.log(shop_id);
$.ajax({
	url:'/yy_shopInfo',
	type:'get',
	dataType:'json',
	data:{
		shop_id
	},
	success(data) {
		console.log(data);
		//渲染
		data.imgs.forEach((value,index)=>{
			$('.product_content_inner').append(`
               <div class="shop_img"><img src="${value.i_src}"></div>
			`)
			$('.product_name').html(`${data.shop_info[0].p_name}`)
			$('.product_price').html(`￥${data.shop_info[0].p_price}`)
		})
		//渲染尺码
		data.size.forEach((value)=>{
			$('.product_size_').append(`
				      <li class="size_available">
                 <div class="regular_radio radio_1"></div>
                 <label>${value.sz_size}</label>
              </li>
				`)
		})

		//选择尺码
		let shop_size_
		$('.product_size_').on('click','.size_available',function(){
			shop_size_ = $(this).find('label').html();
			$(this).find('label').addClass('clicked')
			$(this).siblings().find('label').removeClass('clicked')
			$('.tishi_size').css("display","none")
		})

		//确认添加
		$('.cart_button').click(function (e) {
			e.preventDefault()
			console.log(shop_size_);
			if(shop_size_){
				$.ajax({
					url: '/addCar',
					type: 'json',
					dataType: 'json',
					data:{
						shop_id
					},
					success(data) {
						console.log(data);
					}
				})
			}else {
				$('.tishi_size').css("display","block")
			}
		})
	}
})
