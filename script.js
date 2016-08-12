var emailReg 	= /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var mobileReg 	= /^09[0-9]{8}$/;
var phoneReg 	= /^[0][1-9]{1,2}-([0-9]{7,8})+((#([0-9]){1,5}){0,1})$/;
var invoiceReg 	= /^[a-zA-Z]{2}-?\d{8}$/g;

//var source = location.search.substr(location.search.indexOf('utm_source'));
var s = location.search;
var si = s.indexOf('utm_source');
if(si == -1) s = '';
else s = s.substr(si);
var source = s;
var j=false;

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-55162423-3', 'auto');
	  ga('send', 'pageview');

function gaPage(p){
	console.log(p);
	//ga('send','pageview',{'page':p});
	ga('send','pageview',p);
}

//gaPage('index');

$(function () {
	
	gaPage('intro');
	
	
	$('._ga').click(function(){
		console.log($(this).attr('ga-btn'));
		ga('send','event','button','click',$(this).attr('ga-btn'));
		if($(this).is('[ga-page]')) 
		    gaPage($(this).attr('ga-page'));
	});
	
	window.fbAsyncInit = function() {
	    FB.init({
	        appId      : '973998399349727',                 
	        xfbml      : true,
	        version    : 'v2.5'
	    });
	};
	(function(d, s, id){
	    var js, fjs = d.getElementsByTagName(s)[0];
	    if (d.getElementById(id)) {return;}
	    js = d.createElement(s); js.id = id;
	    //js.src = "//connect.facebook.net/zh_TW/sdk.js";
	    js.src = "./js/sdk.js";
	    fjs.parentNode.insertBefore(js, fjs);
	  }(document, 'script', 'facebook-jssdk'));
	
    var winWidth = $(window).width();
    var winH = $(window).height();
    
    var _sec1 = $('#sec1').offset().top;
    var _sec2 = $('#sec2').offset().top;
    var _sec3 = $('#sec3').offset().top;
    var _sec4 = $('#sec4').offset().top;
    var scroll_sec1 = winH/2;
    ////var scroll_sec2 = _sec2 - winH/2 + 500;
    var scroll_sec2 = _sec2 - winH/2;
    var scroll_sec3 = _sec3 - winH/2;
    var scroll_sec4 = _sec4 - winH/2;
    var _body = $('html, body');
    var _sec2H = $(window).height();
     

    var str_i = 0;
    var str_n = 0;
    var str_p = 0;
    var award='';
    var msg = '';
    var ckword = '';
    var ckimg = $('.ckimg');
    ckimg.load(function(){
      /* 	
      $.ajax({
    	//dataType: 'jsonp',
        url: './ajax/get_session.php',
    	//url: 'https://yummy.lays.com.tw.teectest.co.uk/ajax/get_session.php',
        success: function(data){
        	ckword=data.substr(data.lastIndexOf("_")+1);
        	//console.log('a='+ckword);
        }
      });
      */
    });
    ckimg.attr('src','./showpic.php?ans_now='+ans_now);


    // 隱藏捲軸
    document.body.style.overflow = "hidden";



    /*  各單元獨立網址
    -----------------------------------------------------------------------------*/
        var page = 0;
        var thisPage = 0;
        var subpage = 0;
        if(location.search!=''){
            var _tmp = location.search.replace('?','').split('&');
            $.each(_tmp,function(i,v){
                var _t = v.split('=');
                if(_t[0]=='page'){
                    page = parseInt(_t[1]);
                }
                if(_t[0]=='sub'){
                    subpage = parseInt(_t[1]);
                }
            })
        }

        if( page == 1 ){ 
            thisPage = 1;
            _resise();
        };
        if( page == 2 ){ 
            thisPage = 2;
            _resise();
        };
        if( page == 3 ){ 
            thisPage = 3;
            _resise();
        };
        if( page == 4 ){ 
           thisPage = 4;
            _resise();
        };




    /*   紙張動畫
    -----------------------------------------------------------------------------*/
    var isOpen = false;
    function paperAni(imgInd){
        if(imgInd>8) isOpen=true;
        if(imgInd>8 || isOpen) return;
        $('.paperA').attr('src','images/paper0'+imgInd+'.png');
        setTimeout(function(){paperAni(imgInd+1);},100);
    }







    /*  scroll執行動畫 (增加class)
    -----------------------------------------------------------------------------*/
        //func_scroll();
        $(window).scroll(function(){
            func_scroll();
        });
        function func_scroll(){  
            var _scroll = $(window).scrollTop();
            
            if( _scroll == 0 ){
                $('#sec1').addClass('playAni')
            };
            if( _scroll >= scroll_sec2&& _scroll < _sec3 ){
                $('#sec2').addClass('playAni')
            }
            if( _scroll >= scroll_sec3 && _scroll < _sec4 ){//console.log('sec2='+);
                !$('#sec3').hasClass('playAni') && paperAni(1);
                $('#sec3').addClass('playAni')
            };
            if( _scroll >= scroll_sec4){
                $('#sec4').addClass('playAni')
            };

            // if( _scroll >= scroll_sec1){
            //     $('#sec1').removeClass('playAni')
            // };
            if( _scroll >= scroll_sec3){
                $('#sec2').removeClass('playAni')
            }
            if( _scroll >= scroll_sec4){
                // $('#sec3').removeClass('playAni')
            }
            if( _scroll <= scroll_sec4){
                // $('#sec4').removeClass('playAni')
            }
            if( _scroll <= scroll_sec1){
                // $('#sec1').removeClass('playAni')
                $('#sec2').removeClass('playAni')
                // $('#sec3').removeClass('playAni')
                // $('#sec4').removeClass('playAni')
            }
        };
        /*function func_scroll(){  
            var _scroll = $(window).scrollTop();
            
            if( _scroll == 0 ){
            	$('#sec1').addClass('playAni')
            };

            if( _scroll == _sec2 && _scroll < _sec3 ){
                $('#sec2').addClass('playAni')
            };
            if( _scroll >= scroll_sec3 && _scroll < _sec4 ){
                $('#sec3').addClass('playAni')
            };
            if( _scroll >= scroll_sec4){
                $('#sec4').addClass('playAni')
            };

            // if( _scroll >= scroll_sec1){
            //     $('#sec1').removeClass('playAni')
            // };
            if( _scroll >= scroll_sec3){
                $('#sec2').removeClass('playAni')
            }
            if( _scroll >= scroll_sec4){
                $('#sec3').removeClass('playAni')
            }
            if( _scroll <= scroll_sec4){
                $('#sec4').removeClass('playAni')
            }
            if( _scroll <= scroll_sec1){
                // $('#sec1').removeClass('playAni')
                $('#sec2').removeClass('playAni')
                $('#sec3').removeClass('playAni')
                $('#sec4').removeClass('playAni')
            }
        };*/
        /*function func_scroll(){ 
            var _scroll = $(window).scrollTop();
            
            if( _scroll == 0 ){
                $('#sec1').addClass('playAni')
            };

            //console.log( _scroll,scroll_sec1)

            if( _scroll <= scroll_sec2 && _scroll < _sec3 ){
                $('#sec2').addClass('playAni')
            };
            if( _scroll >= scroll_sec3 && _scroll < _sec4 ){
                $('#sec3').addClass('playAni')
            };
            if( _scroll >= scroll_sec4){
                $('#sec4').addClass('playAni')
            };

            // if( _scroll >= scroll_sec1){
            //     $('#sec1').removeClass('playAni')
            // };
            if( _scroll >= scroll_sec3){
                $('#sec2').removeClass('playAni')
            }
            if( _scroll >= scroll_sec4){
                $('#sec3').removeClass('playAni')
            }
            if( _scroll <= scroll_sec4){
                $('#sec4').removeClass('playAni')
            }
            if( _scroll <= scroll_sec1){
                // $('#sec1').removeClass('playAni')
                $('#sec2').removeClass('playAni')
                $('#sec3').removeClass('playAni')
                $('#sec4').removeClass('playAni')
            }
        };*/
        /*function func_scroll(){ 
            var _scroll = $(window).scrollTop();
            if( _scroll <= scroll_sec2 && _scroll < _sec3 ){
                $('#sec2').addClass('playAni')
            };
            if( _scroll >= scroll_sec3 && _scroll < _sec4 ){
                $('#sec3').addClass('playAni')
            };
            if( _scroll >= scroll_sec4){
                $('#sec4').addClass('playAni')
            };

            if( _scroll >= scroll_sec3){
                $('#sec2').removeClass('playAni')
            }
            if( _scroll >= scroll_sec4){
                $('#sec3').removeClass('playAni')
            }
            if( _scroll <= scroll_sec4){
                $('#sec4').removeClass('playAni')
            }
            if( _scroll <= scroll_sec1){
                $('#sec1').removeClass('playAni')
                $('#sec2').removeClass('playAni')
                $('#sec3').removeClass('playAni')
                $('#sec4').removeClass('playAni')
            }
        };*/







    /*  滾動section
    ---------------------------------------------------------------------------------*/
        var allSection = new Array($('#sec1'), $('#sec2'), $('#sec3'), $('#sec4'));
        // var thisPage = 0;
        var prevPage = -1;
        var allPage = allSection.length - 1;
        var allPo = new Array(_sec1,_sec2,_sec3,_sec4);


        // 滑鼠滾輪上下移動section
        var scrollMoveing = false;
        var j=false;
        var sec2ht;
        var sec2st;
        var sec2sh;
        if (!IE7 && !IE8) {
            $(window).mousewheel(function(e, d) {
                // if (scrollMoveing) return;
                
                //console.log($('#sec2').height());console.log($('#sec2').scrollTop());console.log(document.getElementById('sec2').scrollHeight);
                sec2ht = $('#sec2').height();
                sec2st = $('#sec2').scrollTop();
                sec2sh = document.getElementById('sec2').scrollHeight;
                if (d < 0) {
                    if (thisPage < allPage) {
                    	if(thisPage==1){
                    		//console.log('sec2ht = '+sec2st);
                    		//console.log('sec2st = '+sec2ht);
                    		//console.log('sec2sh = '+sec2sh);
                    		if(sec2st+sec2ht==sec2sh){
                    			e.preventDefault();
                    			thisPage += 1;
                                scrollMove();
                    		}else{
                    			if(sec2sh>sec2ht){
                    				//console.log('a');
                    				//console.log('mb='+$('.sec_2_inner').css('margin-bottom'));
                    				if($('.sec_2_inner').css('margin-bottom')=='0px')
                    					$('.sec_2_inner').css('margin-bottom','200px')
                    			}
                    		}
                    		
                    	}
                    	else{	
                    		e.preventDefault();
                            thisPage += 1;
                            scrollMove();
                    	}    
                    }

                } else {
                    if (thisPage > 0) {
                    	if(thisPage==1){
                    	  if(sec2st==0){
                    		  e.preventDefault();
                              thisPage -= 1;
                              scrollMove();
                    	  }  	
                    	}
                    	else{
                    	e.preventDefault();
                        thisPage -= 1;
                        scrollMove();
                    	}
                    };
                }
            });
        }

        function scrollMove() {
            TweenMax.to($('html,body'), 0.8, {
                scrollTop: allPo[thisPage],
                ease: Quint.easeOut,
                onComplete:moveOk
            });
        }


        // hastag
        // var state = { 'page' : thisPage};
        // var title = '';
        // var url = 'index.html?page='+thisPage;

         //history.pushState(state, title, url);

        function moveOk(){
//        	func_scroll();
        	
        	window.location.hash = 'page'+thisPage;
        	
            //state = { 'page' : thisPage};
            //title = '';
            //url = 'index.php?page='+thisPage+(source==''?'':'&'+source);
            
            //if(!IE8 && !IE9)history.pushState(state, title, url);
            //else $(location).attr('pathname',url);  
        }


        // 鍵盤上下移動section
        function jumpPage() { 
            if (event.keyCode==37)//左 
            fun_a(); 
            if (event.keyCode==38)//上
            fun_b();
            if (event.keyCode==39)//右 
            fun_c(); 
            if (event.keyCode==40)//下 
            fun_d();
        } 

        function fun_b(){ 
            // window.alert('你按下了上')
            thisPage -= 1;
            scrollMove(); 
        }
        function fun_d(){
            // window.alert('你按下了下')
            thisPage += 1;
            scrollMove(); 
        } 
        document.onkeydown=jumpPage;



        // 主選單換頁
        $('.nav_home a').click(function(e) {
            e.preventDefault();
            thisPage = 0;
            scrollMove();
        })

        $('.nav_1 a').click(function(e) {
            e.preventDefault();
            thisPage = 1;
            alert('活動已截止，中獎名單已公告，謝謝您的參與');
            //scrollMove();
        })

        
          $('.nav_2 a').click(function(e) {
            e.preventDefault();
            thisPage = 2;
            scrollMove();
        })

        $('.rule_link').click(function(e) {
            e.preventDefault();
            thisPage = 2;
            scrollMove();
        })
        
        $('.nav_3 a').click(function(e) {
            e.preventDefault();
            thisPage = 3;
            scrollMove();
        })
        
        /*$('.nav_4 a').click(function(e) {
            e.preventDefault();
            thisPage = 4;
            scrollMove();
        })*/

        $('.btn_login').click(function(e) {
        	alert('活動已截止，中獎名單已公告，謝謝您的參與');
            return false;
            /*
            e.preventDefault();
            thisPage = 1;
            scrollMove();
            */
        })




    

    /*  RESIZE
    -----------------------------------------------------------------------------*/
        function _resise() {

            winWidth = $(window).width();
            winH = $(window).height();
            
            _sec1 = $('#sec1').offset().top;
            _sec2 = $('#sec2').offset().top;
            _sec3 = $('#sec3').offset().top;
            _sec4 = $('#sec4').offset().top;
            scroll_sec1 = winH/2;
            ////scroll_sec2 = _sec2 - winH/2 + 500;
            scroll_sec2 = _sec2 - winH/2;
            scroll_sec3 = _sec3 - winH/2;
            scroll_sec4 = _sec4 - winH/2;

            allPo = new Array(_sec1,_sec2,_sec3,_sec4);

            
            _sec2H = $(window).height();
            _sec2W = $(window).width(); 
            // SEC2捲軸
            // $('#sec2').css({
            //     'height': _sec2H,
            //     'overflow-y':'scroll',
            //     'overflow-x':'hidden'
            // })
            // $('.sec_2_inner').css({
            //     'width': _sec2W
            // })

            
            // 解析度調整
            if(winWidth<=1024){

            }else{

                }

             if(winWidth<=1400){ 
             }else{    
                
             
             }

            

            scrollMove();


        }
        // _resise();    
        $(window).resize(_resise);





    /*  表單增加欄位
    -----------------------------------------------------------------------------*/
        var inputId = 2;
        
        var _sec2W = $(window).width(); 

        //  判斷欄位增加出現捲軸
        // $('#sec2').css({
        //     'height': _sec2H,
        //     'overflow-y':'scroll',
        //     'overflow-x':'hidden'
        // })
        // $('.sec_2_inner').css({
        //     'width': _sec2W
        // })


        $(".btn_plus").click(function(e){
            e.preventDefault();  
            if($('input[name="invoice[]"]').length >= 10){
        		alert('最多只能一次輸入10組發票號碼');
        		return false;
        	}
            $(".item.t1").append('<input id="loginNum'+ inputId +'" class="input_w1" type="text" name="invoice[]" maxlength=10 placeholder="" />');
            inputId++;


            //  判斷欄位增加出現捲軸
            var _sec2Inputnum = $(".item.t1 .input_w1").length;
            // var _sec2InnerH = $('.sec_2_inner').height();

            if( _sec2Inputnum >= 3 ){
                $('#sec2').css({
                    'height': _sec2H,
                    'overflow-y':'scroll',
                    'overflow-x':'hidden'
                })
            }
        });


        

        




        



    /*   背景X軸移動
    -----------------------------------------------------------------------------*/
        var _moveSky = 0;
        var $bgSky = $('.all_bg_sky')

        var moveSkyBg = function() {
            TweenMax.to( $bgSky , .1 ,{backgroundPosition:-(_moveSky++) +'px top' ,ease:Quart.easeOut,onComplete:moveSkyBg});
        }
        moveSkyBg();







    /*   lightbox
    -----------------------------------------------------------------------------*/
        function aa(){alert('aa');};
        function lightbox(){

        	//var layout = '<div class="lb_box"><img src="images/loading.gif" alt="" /></div><div class="lb_box hide">';
        	var layout = '<div class="lb_box">';
            layout += '<div class="btn_x"><a href="#"></a></div>';
            layout += '<img src="images/lb.png" alt="" />';
            layout += '<a class="share_fb" style="cursor:pointer;"><img src="images/lb_fb.png" height="72" width="72" alt="" /></a>';
            layout += '</div>';

          $.myBlock({content:layout,cancelBtn:false,scrollTop:false});

          //setTimeout(function(){
        //	  $('.lb_box:visible').hide().next('div').show();
        	//}, 2500);

         $('.btn_x a').click(function(e){
            e.preventDefault();
            //window.location = WEBSITE_URL+'index.php'+(source==''?'':'?'+source);
            window.location = 'https://yummy.lays.com.tw/index.php'+(source==''?'':'?'+source);
        });
         $('.share_fb').click(function(e){
             e.preventDefault();
             ga('send','event','button','click','share');
         	 console.log('share');
             var obj = {
                     method  : 'feed',
                     //link    : WEBSITE_URL+'index.php?utm_source=facebook&utm_medium=fbsharePC&utm_campaign=lays2016selectedsp'
                     link    : 'https://yummy.lays.com.tw/index.php?utm_source=facebook&utm_medium=fbsharePC&utm_campaign=lays2016selectedsp'
                 };   
             FB.ui(obj, function(response){          
             });
         });
    }
        
       




    /* 20160222修改 ↓ */
    /*   loading
    -----------------------------------------------------------------------------*/
        $('#loadingObj').imagesLoaded(function() {
            TweenMax.to('.loadBg', .8, {
                alpha: 0,
                ease: Quint.easeOut,
                onComplete: killLoad
            });
            func_scroll();
        });

        function killLoad() {
        	gaPage('index');
            $('.loadBg').hide();
        }
    /* 20160222修改 ↑ */




    /*20160304修改 ↓*/
    /*   資料送出中
    -----------------------------------------------------------------------------*/
    var $dot01 = $('.sender .dot._1'),
        $dot02 = $('.sender .dot._2'),
        $dot03 = $('.sender .dot._3')

    TweenMax.from($dot01, .5 ,{top:"-=10px", yoyo:true , repeat:-1 , ease:Quad.easeInOut,})
    TweenMax.from($dot02, .5 ,{top:"-=10px", yoyo:true , delay:.5 , repeat:-1 , ease:Quad.easeInOut})
    TweenMax.from($dot03, .5 ,{top:"-=10px", yoyo:true , delay:1, repeat:-1 , ease:Quad.easeInOut})
    /*20160304修改 ↑*/

    



    



    
    //Initialization
    // var slideCount = $('.paper_box').children().length;
    // var currentID = 1;
    // $('.paper').css('display','none');
    // $('#pAni' + currentID).show();
    // //Processing
    // setInterval(function(){
    //     var nextID = currentID + 1;
    //     if (nextID > slideCount) {
    //         nextID = 1;
    //     }
    //     $('#pAni' + currentID).hide();
    //     $('#pAni' + nextID).show();
    //     currentID = nextID;
    // },100);
   

   //進場動態
    
//   var indexKv = new TimelineMax();
//   indexKv.from('.page1_product',1,{opacity:0,left:"+=100px",ease:Back.easeOut})
//          .from('.page1_txt',.8,{opacity:0,left:"-=50px",ease:Back.easeOut},"-=1")
//          .from('.page1_txt1',.4,{opacity:0,top:"-=20px",ease:Quad.easeOut},"-=0.7")
//          .from('.page1_bar',.2,{opacity:0,top:"-=10px",ease:Quad.easeOut},"-=0.4")
//          .from('.page1_txt2',.4,{opacity:0,top:"-=20px",ease:Quad.easeOut},"-=0.2")
//          .from('.btn_more a',.3,{opacity:0,left:"-=10px",ease:Quad.easeOut})
//          .from('.btn_vedio a,.btn_sp a',.5,{opacity:0,ease:Quad.easeOut},"-=0.15")
//          .from('.scroll',.6,{opacity:0,top:"-=15px",ease:Quad.easeOut});

       
    
    
        //ie8 png -------------------------------------------------*/
        if (navigator.userAgent.indexOf("MSIE") != -1) {
            $('img').each(function () {
                if ($(this).attr('src').indexOf('.png') != -1) {
                    $(this).css({

                        'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' +
                            $(this).attr('src') +
                            '", sizingMethod="scale");'
                    });
                }
            });
        }

        $('.btn_again').click(function(e){
        	e.preventDefault();
            $("#form1")[0].reset();
        });
        
        $('.btn_send').click(function(){
            alert('活動已截止，中獎名單已公告，謝謝您的參與');
            return false;
        	/*msg='';
        	if($('input[name="invoice[]"]').eq(0).val()=='')
        		msg = '請填寫發票號碼';
        	else{
        		$("input[name='invoice[]']").each(function(){
        			if($(this).val()!='' && !$(this).val().match(invoiceReg)){
        				msg = '請確認發票號碼格式';
        				return false
        			}
        		});
        	}
        	if(msg!=''){
        		alert(msg);
        		return false;
        	}
        	msg='';
        	if($('input[name="username"]').val()=='')
    			msg = '請填寫姓名';
        	else if($('input[name="username"]').val().length>5)
    			msg = '姓名字數最多5字';
    		else if($('input[name="phone"]').val()=='' || !$('input[name="phone"]').val().match(mobileReg))
                msg = '請填寫並確認手機格式';
    		else if($('input[name="email"]').val()=='' || !$('input[name="email"]').val().match(emailReg))
                msg = '請填寫並確認Email格式';
    		//else if($('input[name="check"]').val()!=ckword)
    		else if($('input[name="check"]').val()!=ans_now)
                msg = '驗證碼填寫錯誤';
    		else if(!$('input[name="c1"]').is(':checked'))
    			msg = '請勾選同意活動辦法條款';
        	if(msg!=''){
        		alert(msg);
        		return false;
        	}
        	ga('send','event','button','click','send');
        	console.log('send');
        	var invoice = $("input[name='invoice[]']").map(function(){return $(this).val();}).get();
        	$.ajax({
                url: './ajax/upload.php',
                type: 'POST',
                data: { invoice: invoice,
                	    username: $('input[name="username"]').val(),
                	    phone: $('input[name="phone"]').val(),
                	    email: $('input[name="email"]').val(),
                	    utm_medium: utm_medium,
                	    ip: ip
                      },
                success: function(){
                	$('.sending_box').show();
                	setTimeout(function(){
                		$('.sending_box').hide();
                		lightbox();
                  	}, 2500);
                	
                }
            });*/
        });   
        
        $('.btn_search').click(function(e){
        	e.preventDefault();
        	$.ajax({
                url: './ajax/get_award.php',
                type: 'POST',
                data: { phone: $('.search_text').val() },
                success: function(data){
                	$('.award_inner').html(data);
                	$(".award_inner").mCustomScrollbar({autoDraggerLength: false});
                }
            });
        }).click();
        $(".award_inner").mCustomScrollbar({autoDraggerLength: false});
        
        $('.nav_fb').click(function(e){
            e.preventDefault();
            var obj = {
                    method  : 'feed',
                    //link    : WEBSITE_URL+'index.php?utm_source=facebook&utm_medium=fbsharePC&utm_campaign=lays2016selectedsp'
                    link    : 'https://yummy.lays.com.tw/index.php?utm_source=facebook&utm_medium=fbsharePC&utm_campaign=lays2016selectedsp'
                };   
            FB.ui(obj, function(response){          
            });
        });
        
        //if(getpage=='0' || getpage=='') gaPage('index');
        if(getpage=='0' || getpage=='') {}
        else if(getpage=='1') gaPage('register');
        else if(getpage=='2') gaPage('rule');
        else if(getpage=='3') gaPage('win');
        
        /*$("input[name='invoice[]']").keydown(function(){
            str_i = $(this).val().length;
            if(str_i>10){
            	$(this).val($(this).val().substr(0,10));
            	return false;
            }
        	n = $("#INtext").val().length+1;
            $('#nowtxt').html('<b>目前:'+n+'字</b>');
        });*/
        //console.log('new_page');
        
        if(IE8){
        	$('.all_bg').hide();
        	$('.bg_ie8').show();
        	var _picWidth = 1700,
            _picHeigtht = 850;

          $(window).resize(function(){
             var $win = $(window),
                _winWidth = $win.width(),
                _winHeight = $win.height(),
                _l1 = _winWidth / _picWidth,
                _l2 = _winHeight / _picHeigtht,
                _r = _l1 > _l2 ? _l1 : _l2;

            $('.fix_img').css({
                position :'absolute',
                left : '50%',
                marginLeft : -( _picWidth * _r)/2,
                width : _picWidth * _r,
                height : _picHeigtht * _r
            });
            
          }).resize();
        }
        var vv=window.location.hash;
        if(vv == '#page0'){
        $('#sec1').addClass('playAni');
        }
});

