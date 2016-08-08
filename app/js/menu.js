'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global  $, app */
app.modules.menu = function(){
	// console.log('ga initialized');

	$('header a.burger').on('click', function(){
		$('body').addClass('menu');
		$(this).removeClass('in');
		$('header a.close').removeClass('hide');
		$(this).addClass('hide');
		$('header a.close').addClass('in');
	});

	$('header a.close').on('click', function(){
		$('body').removeClass('menu');
		$(this).removeClass('in');
		$('header a.burger').removeClass('hide');
		$(this).addClass('hide');
		$('header a.burger').addClass('in');
	});


	//下錨點的按鈕
	$('a').filter(function(){
		var href = $(this).attr('href');
		return /^[#]/.test(href);
	}).on('click', function(e){

		$('header a.close').trigger('click');

		app.skip = true;

		var href = $(this).attr('href').replace(/[#]/ig, '');

		$(this).addClass('active').siblings().removeClass('active');

		app.gotoAnchor(href);

		$('body').removeClass('overlay');

		$(app.pageSelector + href).addClass('in');

		e.stopPropagation();

		e.preventDefault();

		return false;
	});
};
