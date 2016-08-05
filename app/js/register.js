'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global $, app */
app.pages.register = function($this){
	// console.log('index initialized');
	$('.add', $this).on('mousedown', function(){
		var invoice = $('.invoice-container', $this).eq(0).clone().addClass('fade');
		$('.add-container, >label', invoice).html('');
		$('input', invoice).attr('id', $('input', invoice).attr('id').replace(/^(.*)[_](.*)$/,'$1') + '_' + $('input', invoice).length );

		$(invoice).insertAfter($('.invoice-container', $this).last());
		if($('.form', $this).data('jsp')){
			$('.form', $this).data('jsp').reinitialise();
		}else{
			$('.form', $this).jScrollPane();
		}
	}).on('mouseup', function(){
		$('.invoice-container', $this).last().addClass('in');
	});


	$('.form', $this).on('mousewheel',function(){
		return false;
	});
};
