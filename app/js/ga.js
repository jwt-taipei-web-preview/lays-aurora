'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global  $, app, ga */
app.modules.ga = function(){
	// console.log('ga initialized');


	if($('html').hasClass('mobile')){

		$('a').filter(function(){
			return $(this).hasAttr('data-ga-mobile');
		}).on('click', function(){
			ga('send', 'event', {
				eventCategory: 'event',
				eventAction: 'click',
				eventLabel: $(this).attr('data-ga-mobile')
			});
		});
	}else{
		$('a').filter(function(){
			return $(this).hasAttr('data-ga');
		}).on('click', function(){
			ga('send', 'event', {
				eventCategory: 'event',
				eventAction: 'click',
				eventLabel: $(this).attr('data-ga')
			});
		});
	}
};
