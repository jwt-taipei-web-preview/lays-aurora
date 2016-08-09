'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/

/*global app, $ */
app.pages.award = function($this){

	$('.center', $this).on('mousewheel scroll',function(){
		return app.ismobile();
	});
	$(window).on('resize', function(){
		if($('.pane', $this).data('jsp')){
			$('.pane', $this).data('jsp').reinitialise();
		}else{
			$('.pane', $this).jScrollPane();
		}
	});
};
