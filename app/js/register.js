'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations, no-alert*/
/*global $, app, share */
app.pages.register = function($this){
	// console.log('index initialized');
	var captcha = app.guid().substring(0,6);
	app.captcha = captcha;
	$('.add', $this).on('mousedown', function(){
		if($('.invoice-container', $this).length == 5){
			alert('一次最多5筆');
			return false;
		}
		var invoice = $('.invoice-container', $this).eq(0).clone().addClass('fade');
		$('.add-container, >label', invoice).html('');
		$('input', invoice)
			.val('')
			.attr('id', $('input', invoice)
			.attr('id').replace(/^(.*)[_](.*)$/,'$1') + '_' + $('input', invoice).length );

		$(invoice).insertAfter($('.invoice-container', $this).last());
		if($('.form', $this).data('jsp')){
			$('.form', $this).data('jsp').reinitialise();
		}else{
			$('.form', $this).jScrollPane();
		}
		$('.invoice-container', $this).not($('.invoice-container', $this).last()).addClass('in');
	}).on('mouseup', function(){
		if($('.invoice-container', $this).length == 5){
			return false;
		}
		$('.invoice-container', $this).last().addClass('in');
	});


	$('.form', $this).on('mousewheel scroll',function(){
		return app.ismobile();
	});
	var utm_medium = decodeURIComponent(extractUrlValue('utm_medium'));
	$('[name=utm_medium]').val(utm_medium);

	$('#reset').on('click', function(){
		$('input').val('');
		return false;
	});

	var emailReg 	= /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var mobileReg 	= /^09[0-9]{8}$/;
	var phoneReg 	= /^[0][1-9]{1,2}-([0-9]{7,8})+((#([0-9]){1,5}){0,1})$/;
	var invoiceReg 	= /^[a-zA-Z]{2}-?\d{8}$/g;

	$('form', $this).on('submit',function(){

    	var msg='';
    	if($('input[name=\'invoice[]\']').eq(0).val()=='')
    		msg = '請填寫發票號碼';
    	else{
    		$('input[name=\'invoice[]\']').each(function(){
    			if($(this).val()!='' && !$(this).val().match(invoiceReg)){
    				msg = '請確認發票號碼格式';
    				return false;
    			}
    		});
    	}
    	if(msg!=''){
    		alert(msg);
    		return false;
    	}
    	msg='';
   //  	if($('#g-recaptcha-response').val() == ''){    		
			// msg = '請先完成圖片驗證';
   //  	}
    	if($('#captcha').val() != app.captcha){    		
			msg = '驗證碼錯誤';
    	}
		else if($('input[name=\'username\']').val()==''){
			msg = '請填寫姓名';
		}
		else if($('input[name=\'username\']').val().length>5){
			msg = '姓名字數最多5字';
		}
		else if($('input[name=\'phone\']').val()=='' || !$('input[name=\'phone\']').val().match(mobileReg)){
			msg = '請填寫並確認手機格式';
		}
		else if($('input[name=\'email\']').val()=='' || !$('input[name=\'email\']').val().match(emailReg)){
			msg = '請填寫並確認Email格式';
		}
		else if(!$('input[name=\'term\']').is(':checked')){
			msg = '請勾選同意活動辦法條款';
		}
		if(msg!=''){
			alert(msg);
			return false;
		}

    	// ga('send','event','button','click','send');
    	// console.log('send');
    	var invoice = $('input[name=\'invoice[]\']').map(function(){return $(this).val(); }).get();
    	$.ajax({
            url: './ajax/upload.php',
            type: 'POST',
            data: { 
            	invoice: invoice,
				username: $('input[name=\'username\']').val(),
				phone: $('input[name=\'phone\']').val(),
				email: $('input[name=\'email\']').val(),
				utm_medium: utm_medium
			},
			success: function(r){
				if(r.Success * 1 === 1){
					$('.form', $this).removeClass('in');
					$('.complete', $this).removeClass('hide');
					$('#reset').trigger('click');
					refreshCaptcha();
				}else{
					// console.log(r);
					alert(r.Msg);
				}
            }
        });
		return false;
	});


	$('.share').unbind('click').on('click', function(){share.facebook(); return false; });

	$(document).on('input keyup', 'textarea[maxlength]', function(e) {
		// maxlength attribute does not in IE prior to IE10
		// http://stackoverflow.com/q/4717168/740639
		var $this = $(this);
		var maxlength = $this.attr('maxlength');

		if (+maxlength) {
			var text = $this.val();

			if (text.length > maxlength) {
				// truncate excess text (in the case of a paste)
				$this.val(text.substring(0,maxlength));
				e.preventDefault();
			}

		}

		if($(this).next().hasClass('hint') && text.length > 0){
			$(this).next().addClass('hide');
		}else{
			$(this).next().removeClass('hide');
		}

	});
	$(document).on('compositionstart', 'input[data-maxlength]', function(){
		$(this).attr('data-compositing','1');
	});
	$(document).on('compositionend', 'input[data-maxlength]', function(){
		$(this).attr('data-compositing','0');
		$(this).trigger('input');
	});
	$(document).on('input keyup', 'input[data-maxlength]', function(e) {
		// compositionstart : IME start composite words
		// compositionstart : IME ends composition
		// for IEs
		// if($('html').hasClass('ie')){
			if($(this).attr('data-compositing') * 1){
				e.preventDefault();	
				return false;
			}
		// }
		var $this = $(this);
		var maxlength = $this.attr('data-maxlength');

		if (+maxlength) {
			var text = $this.val();

			if (text.length > maxlength) {
				// truncate excess text (in the case of a paste)
				$this.val(text.substring(0,maxlength));
				e.preventDefault();	
			}

		}


		if($(this).next().hasClass('hint') && text.length > 0){
			$(this).next().addClass('hide');
		}else{
			$(this).next().removeClass('hide');
		}

	});
	var focused = false;
	$('input', $this).on('focus', function(){
		$('.house').addClass('focus');
		$('.house').css('margin-top', $(window).scrollTop() + $(window).height() - $('.house').outerHeight());
		focused = true;

	}).on('blur', function(){
		$('.house').removeClass('focus');
		$('.house').removeAttr('style');
		focused = false;
	});
	$(window).on('scroll', function(){
		if(focused){
			$('.house').css('margin-top', $(window).scrollTop() + $(window).height() - $('.house').outerHeight());
		}
	});
	$('a.refresh', $this).on('click', function(){
		refreshCaptcha();
	}).trigger('click');
	function refreshCaptcha(){
		app.captcha = app.guid().substring(0,6);
		$('.captcha').html($('<img>').attr('src', '//yummy.lays.com.tw.teectest.co.uk/showpic.php?ans_now=' + app.captcha));
	}
};



function extractUrlValue(key, url)
{
    if (typeof url === 'undefined'){
        url = window.location.href;
    }
    var match = url.match('[?&]' + key + '=([^&]+)');
    return match ? match[1] : null;
}

