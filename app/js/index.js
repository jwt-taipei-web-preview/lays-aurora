'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global  $, TimelineMax, TweenMax, app */
app.pages.index = function($this){
	// console.log('index initialized');
	lighten($this);
	// $this.on('mousemove', function(e){
	// 	var x = (e.clientX - $(window).width() * 0.5) / $(window).width() * -1;
	// 	var y = (e.clientY - $(window).height() * 0.5) / $(window).height() * -1;
	// 	TweenMax.set($this,{
	// 		'background-position': (x * 5 -10) + 'vw calc(100% + ' + (y * 2 ) + 'vw + 1vw)'
	// 	});
	// });
	// $this.addClass('in');



};

function lighten( page ){

	// var tl1,tl2,tl3,tl4,tl5;

	var tlStack = [];

	$(window).on('resize', function(){
		// $('html').hasClass('desktop')
		// if(1080 / 1920 > $(window).height() / $(window).width()){
		// 	var margin =  ($(window).width() / 1920 * 1080 -$(window).height()) * -1;
		// 	TweenMax.set($('.light, .house, .light-container'),{
		// 		'background-position': 'center ' + margin + 'px'
		// 	});
		// }
		$('.container .light-container', page).removeClass('in active');
		$('.container .gliter', page).removeClass('in fade');
		while ( tlStack.length ){
			tlStack.pop().stop();
		}
		if($(window).width() < 768){
			TweenMax.set($('.light, .house, .light-container', page),{
				'background-position': 'center bottom'
			});
		}else{
			tlStack.push(l($('.container .light1', page), 1, 0) );
			tlStack.push(l($('.container .light2', page), 2, 1.5) );
			tlStack.push(bg($('.container .light-container', page), 10, 1) );
			tlStack.push(glitter($('.glitter', page), 2, 2) );
			tlStack.push(spot($('.group-2 figure:eq(1)', page), 3, 2) );
			tlStack.push(spot($('.group-3 figure:eq(1)', page), 3.2, 3) );
			tlStack.push(spot($('.group-4 figure:eq(1)', page), 3.6, 4) );
		}
	}).trigger('resize');


	$(window).on('scroll', function(){
		if(page.hasClass('in')){
			while ( tlStack.length ){
				tlStack.pop().pause();
			}	
		}else{
			while ( tlStack.length ){
				tlStack.pop().resume();
			}	
		}
	});

	function l(fig, duration, delay){
		var tl = new TimelineMax({
			paused: true,
			onComplete: function(){
				setTimeout(function(){
					fig.removeClass('active');
					tl.seek(0);
					tl.play();
				}, (delay + duration) * 1000 + 1000 * Math.random());
			}
		});
		function next(){
			fig.addClass('active');
		}
		tl.addPause(duration + 0.5 * Math.random(), next);
		tl.play();

		return tl;
	}

	function bg(fig, duration, delay){
		var tl = new TimelineMax({
			paused: true,
			onComplete: function(){
				setTimeout(function(){
					fig.removeClass('in');
					tl.seek(0);
					tl.play();
				}, (delay + duration) * 1000);
			}
		});
		function next(){
			fig.addClass('in active');
		}
		fig.addClass('active');
		tl.addPause(duration, next);
		tl.play();
		return tl;
	}

	function glitter(fig, duration, delay){
		var tl = new TimelineMax({
			paused: true,
			onComplete: function(){
				setTimeout(function(){
					fig.addClass('in');
					tl.seek(0);
					tl.play();
				}, (delay + duration) * 1000);
			}
		});
		function next(){
			fig.addClass('fade').removeClass('in');
		}
		tl.addPause(duration, next);
		tl.play();
		return tl;
	}

	function spot(fig, duration, delay){
		var tl = new TimelineMax({
			// paused: true,
			onComplete: function(){
				setTimeout(function(){
					
					tl.add([
						TweenMax.to(fig, 5 * duration, {
							rotationZ: -40
						}),
						TweenMax.to(fig.next(), 5 * duration, {
							rotationZ: -20,
							x: '5%'
						})
					]);

					tl.add([
						TweenMax.to(fig, 5 * duration, {
							rotationZ: 50,
							x: '-6%'
						}),
						TweenMax.to(fig.next(), 5 * duration, {
							rotationZ: 25
						})
					]);

					tl.add([
						TweenMax.to(fig, 2 * duration, {
							rotationZ: 0,
							x: 0
						}),
						TweenMax.to(fig.next(), 3 * duration, {
							rotationZ: 0
						})
					]);
				}, (delay + duration) * 1000);
			}
		});

		TweenMax.set(fig.next(), {
			transformOrigin: '100% -50% 0'
		});

		tl.play();
		return tl;
	}
}


