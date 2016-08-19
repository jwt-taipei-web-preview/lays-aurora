'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/

/*global  $, TweenMax, fontSpy, ga, TimelineMax */
var app = {};

var scrollTop = 0;

var activeSection = '';

var pageSelector = '.page#';


app.ranges = {};
app.pages = {};
app.modules = {};
app.scrollTop = scrollTop;
app.activeSection = activeSection;
app.pageSelector = pageSelector;
app.skip = false;

app.videoTimeEnd = 0.8;
// console.log(new Date);

// var dayOfMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// 網址為 gulp 或者 github 時 設定成debug 模式
var debug = /localhost[:]9000|nelson119.github.io/.test(location.href);


var share = {
	facebook: function(href, title){
		href = encodeURIComponent(href || location.href.replace(location.hash, '') + '?utm_source=fbshare&utm_medium=fb&utm_campaign=yummycampaign');
		title = encodeURIComponent(title || document.title);
		window.open('https://www.facebook.com/sharer.php?u='+href+'&amp;t='+title);
	},
	googleplus: function(href){
		href = encodeURIComponent(href || location.href.replace(location.hash, '') + '?utm_source=fbshare&utm_medium=fb&utm_campaign=yummycampaign');
		window.open('https://plus.google.com/share?url=' + href,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
	},
	email: function(href, title){
		href = encodeURIComponent(href || location.href.replace(location.hash, '') + '?utm_source=fbshare&utm_medium=fb&utm_campaign=yummycampaign');
		title = encodeURIComponent(title || document.title);
		var body = encodeURIComponent(''+href+' #' +title+'');
		window.open('https://mail.google.com/mail/?view=cm&fs=1&to=&su=與你分享:'+title+'&body='+body+'&bcc=');
	}
};

//判斷是否具有屬性
$.fn.hasAttr = function(attributeName){
	var attr = $(this).attr(attributeName);
	if (typeof attr !== typeof undefined && attr !== false) {
		return true;
	}else{
		return false;
	}
};

var global = {};


if (location.hash) {
  setTimeout(function() {

    window.scrollTo(0, 0);
  }, 1);
}

$(function(){
    // 定義每個section
	$.each(app.modules, function(name, init){
		init();
	});
	$.each(app.pages, function(name, init){
		if($(pageSelector + name).length) {
			try{
				init($(pageSelector + name));
			}catch(e){
				console.error(pageSelector+ name +'initailize failed, because of :' + e);
			}
		}
		var id = $(pageSelector + name).attr('id');

		app.ranges[id] = {};
		app.ranges[id].top = function(){
			return $(pageSelector + name).length ? $(pageSelector + name).offset().top : -1;
		};
		app.ranges[id].butt = function(){
			return $(pageSelector + name).length ? ($(pageSelector + name).offset().top + $(pageSelector + name).outerHeight()) : -1;
		};

    });


	//resize
	$(window).on('resize',	function(){
		if(!app.ismobile()){
			gotoAnchor();
		}
	});

	//捲動到錨點處
	function gotoAnchor(anchor){
		anchor = anchor || location.hash.replace('#','');

		if(!anchor) return;

		if($(pageSelector + anchor).length){
			TweenMax.to('html, body', 0.5, {
				scrollTop: $(pageSelector + anchor).offset().top,
				onComplete: function(){
					app.skip = false;
				}
			});
		}else if(anchor === 'term'){
			TweenMax.to('html, body', 0.5, {
				scrollTop: $(pageSelector + 'rule').offset().top,
				onComplete: function(){
					app.skip = false;
				}
			});
			TweenMax.to($(pageSelector + 'rule .jspPane'), 0.5, {
				top: $(pageSelector + 'rule .jspPane').offset().top - $('#term').offset().top,
				onComplete: function(){
					app.skip = false;
				}
			});
		}
	}

	app.gotoAnchor = gotoAnchor;


	//觸發第一次調整頁面尺寸
	$(window).trigger('resize');


	//分享按鈕

	$('.share .facebook, .nav-fb').on('click', function(e){
		share.facebook();

		e.stopPropagation();

		e.preventDefault();

		return false;
	});

	$('.share .googleplus').on('click', function(e){
		share.googleplus();

		e.stopPropagation();

		e.preventDefault();

		return false;
	});

	$('.share .email').on('click', function(e){
		share.email();

		e.stopPropagation();

		e.preventDefault();

		return false;
	});

	// 捲動至錨點時網址轉換
	$(window).on('scroll', function(){

		if(app.skip || app.ismobile()){
			return;
		}
		var currentTop = $(window).scrollTop();
		var currentButt = $(window).scrollTop() + $(window).height();
		$.each(app.pages, function(name, init){

			var id = $(pageSelector + name).attr('id'),


			range = app.ranges[id],
			space = $(window).height();


			if(scrollTop < currentTop){
				if(range.butt() >= currentButt && range.top() >= currentTop && range.top() < currentButt){

					if(activeSection != id){
						activeSection = id;
						pushState(name);
					}
				} 
			}else{
				if(range.top() <= currentTop && range.butt() > currentTop && range.butt() <= currentButt){

					if(activeSection != id){
						activeSection = id;
						pushState(name);
					}
				} 
			}
		});
		scrollTop = currentTop;
	});

	gotoAnchor();


	app.scrollTop = scrollTop;


	// 檢查字形
	var checkFont = setInterval(function(){
		fontSpy('Noto Sans TC', {
			glyphs: '\u5803',
			success: function() {
				//alert("My Icons loaded successfully");
				var video = $('.kvideo');
				video.attr('onloadstart', function() {

				});
				video.attr('oncanplaythrough', function() {
					setTimeout(function(){
						pushState('index');
						$('html').removeClass('loading');
						// tlStack.push(l($('.container .light1'), 1, 0) );
						// tlStack.push(l($('.container .light2'), 2, 1.5) );
						// tlStack.push(bg($('.container .light-container'), 10, 1) );
					}, 50);
				});
				clearInterval(checkFont);
			},
			failure: function() {
				//alert("My Icons failed to load");
				console.log('failed to load font');
			}
		});
	}, 100);

	function pushState(name){

		// if(app.ismobile()){
		// 	return false;
		// }

		history.pushState('#' + activeSection, document.title, '#' + activeSection);
		$('header nav a').filter(function(){
			return $(this).attr('href') === '#' + activeSection;
		}).addClass('active').siblings().removeClass('active');
		// var pagename = activeSection + ($('html').hasClass('mobile') ? '_m' : '_p'); 
		// ga('send', 'pageview', pagename);
		if($('html').hasClass('mobile')){
			ga('send', 'pageview', 'pv_m_' + activeSection);
		}else{
			ga('send', 'pageview', 'pv_' + activeSection);
		}
		if(name === 'index'){
			$('.poster').removeClass('in');
			var tl = new TimelineMax({
				pause: true,
				onComplete: function(){
					// console.log(new Date);
					//$(pageSelector + name).addClass('in');
				}
			});
			tl.add(function(){
				if( Math.round($('.kvideo video')[0].currentTime - app.videoTimeEnd) >= 9){
					$('.kvideo video').attr('data-play', 0);
				}else{
					$('.kvideo video').attr('data-play', 1);
				}
				if($('.kvideo video').attr('data-loaded')){
					$('.kvideo video')[0].play();
				}
			});
			tl.addPause(2);
			tl.add(function(){
				$(pageSelector + name).addClass('in');
			});
			tl.play();

		}else {
			$(pageSelector + name).addClass('in');
		}

		$.each(app.pages, function(p){
			$(pageSelector + p). not($(pageSelector + name)).removeClass('in');
		});
		if(!app.skip){
			gotoAnchor(name);
		}
	}



});


app.ismobile = function(){

	if($(window).width() <= 768 || !$('html').hasClass('desktop')){
		return true;
	}
	return false;
};

app.guid = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      // .toString(16)
      .toString()
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
};




