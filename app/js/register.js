'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations, no-alert*/
/*global $, app */
app.pages.register = function($this){
	// console.log('index initialized');
	$('.add', $this).on('mousedown', function(){
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
	}).on('mouseup', function(){
		$('.invoice-container', $this).last().addClass('in');
	});


	$('.form', $this).on('mousewheel scroll',function(){
		return app.ismobile();
	});
	var utm_medium = decodeURIComponent(extractUrlValue('utm_medium'));
	$('[name=utm_medium]').val(utm_medium);

	$('#reset').on('click', function(){
		$('input').val('');
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
    	if($('#g-recaptcha-response').val() == ''){    		
			msg = '請先完成圖片驗證';
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
            success: function(){
            	$('.form', $this).removeClass('in');
            	$('.complete', $this).removeClass('hide');
            	$('#reset').trigger('click');
            }
        });
		return false;
	});



	//表單驗證

	// function valid(form){
	// 	var result = true;
	// 	// console.log($('input, select, textarea', form))
	// 	try{
	// 		$('input, select, textarea', form).each(function(index, input){
	// 			var field = {};
	// 			input = $(input);
	// 			field.name = input.attr('data-name') || input.attr('name');
	// 			field.required = input.hasAttr('required');
	// 			field.patern = input.attr('pattern');
	// 			field.value = input.val();
	// 			if(field.required && !field.value){
	// 				// alert('請填寫' + field.name);
	// 				result = false;
	// 			}
	// 			if(!(new RegExp(field.pattern)).test(field.value)){
	// 				// alert(field.name +' 格式錯誤');
	// 				result = false;
	// 			}
	//       		return result;
				
	// 		});
	// 	}catch(e){
	// 		console.error(e);
	// 	}

	// 	return result;
	// }

	// app.valid = valid;
};



function extractUrlValue(key, url)
{
    if (typeof url === 'undefined'){
        url = window.location.href;
    }
    var match = url.match('[?&]' + key + '=([^&]+)');
    return match ? match[1] : null;
}

