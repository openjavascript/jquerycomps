;requirejs( [ 
	'data'
    , 'iscroll'
    , 'velocity'
    , 'JC.FrameUtil'
    , 'jquery.cookie'
], function( dataTool, iScroll, velocity ){

	window.dataTool = dataTool;

    JC.FrameUtil.subscribeEvent( 'data', function( _evt, _params ){
        switch( _params.data.type ){
            case 'GO_MAIN_TOP': {
                JC.f.safeTimeout( function(){
                    JWIN.trigger( 'GO_MAIN_TOP' );
                }, null, 'asdfawefasd', 20 );
                break;
            }
            case 'NEXT_COMP': {
                _params.data.url && showNextComp( _params.data.url );
                break;
            }
        }
    });

    JWIN.on( 'GO_MAIN_TOP', function(){
        location.href = "#mainTop";
    });

	pageEventHandler();

    var _hideBar = $( 'button.js_hideHeader' );

    JDOC.delegate( 'div.js_headarBar', 'mouseenter', function(){
        _hideBar.show();
    });
    
    JDOC.delegate( 'div.js_headarBar', 'mouseleave', function(){
        _hideBar.hide();
    });

    JDOC.delegate( 'button.js_hideHeader', 'click', function(){
        $( 'div.js_headarBar' ).remove();
        $.cookie( 'hideheader', 1, { expires: 30 } );
    });


	function detailHandler() {
		var body = $('.body');
		var _childrens = body.children(':not(.body-detail)');
		var detail = $('.body-detail');
		var detailframe= detail.find('#detailframe');
		var _helper = $('.body-helper');
		var _homebtn = _helper.find('.body-homebtn');
		var _backbtn = _helper.find('.body-backbtn');
		var _sideBar = $('#bodynav');
		var _viewTop = body.offset().top;
		var _detailNav = $( '.body-detailnav' );
		var _turnValue;
		var _tmpComp;

        JWIN.on( 'PLOAD_URL', function( _evt, _ele, _demoBtn, _trunEle ){

			_backList = [];
			_backbtn.velocity( { opacity: 0 }, 0 ).hide();

			_turnValue = $( document ).scrollTop();

            _trunEle = _trunEle || body;
            _trunEle = body;


			_childrens.velocity( { 
			    opacity: '0'
			}, function(){
				_trunEle.velocity( { 
				    rotateY: '180deg'
				}, function(){
					mainNavFlag = false;
					body.removeAttr( 'style' );
					_childrens.hide();

					if( _turnValue > _viewTop ){
						$( 'html,body' ).scrollTop( _viewTop );
					}

					_tmpComp = _ele.closest( '.body-comp' );
                    detailframe.off( 'load' ).on( 'load', function(){
						initDetailNav( detailframe );
                    });
					detailframe.attr( 'src', _ele.attr( 'data-url' ) );

					setTimeout( function(){

						detailframe.height( detailframe.contents().find('html').outerHeight() );


						detail.show().velocity( { opacity: '1' } );
						_homebtn.show();
						_helper.show().velocity( { opacity: '1' } );

						if( !_detailNavTop ){
							_detailNavTop = _detailNav.offset().top 
								- _detailNav.css( 'top' ).split( 'px' )[0];
						}

						_demoBtn && setTimeout( function(){
							$( '.navmark-demomk' ).click();
						}, 1000 );

					}, 100);
				} );
			});

        });

		$( document ).on( 'click', '.body-changebtn', function( e ){
			e.preventDefault();

			var _ele = $( e.target );
			var _demoBtn = _ele.hasClass( 'body-demobtn' );
            JWIN.trigger( 'GO_MAIN_TOP' );
            JWIN.trigger( 'PLOAD_URL', [ _ele, _demoBtn ] );
		});

		_homebtn.on( 'click', function( e ){
            JWIN.trigger( 'GO_MAIN_TOP' );
			e.preventDefault();

			_helper.velocity( { opacity: '0' },function(){ _helper.hide(); });

			detail.velocity( {
			    opacity: '0'
			}, function(){
				body.velocity( { 
				    rotateY: '0deg'
				}, function(){
					mainNavFlag = true;
					body.removeAttr( 'style' );
					detail.hide();
					_homebtn.hide();
					_backbtn.hide();

					_detailNav.removeClass( 'body-detailnav-fixed' );

					_childrens.show().velocity( { opacity: '1' } );

					$( 'html,body' ).scrollTop( _turnValue );
					if( !_turnValue > _viewTop ){
						_sideBar.removeClass( 'body-nav-fixed' );
					}
				});
			});
		});

		_backbtn.on( 'click', showPrevComp );

		$( document ).on( 'click', '.body-detailnav a', function( e ){
			e.preventDefault();
            var _sp = $( this );
            if( _sp.is( '.is_link' ) ){
                detailframe.attr( 'src', 'about:blank' );
                //JWIN.trigger( 'PLOAD_URL', [ _sp, _sp.is( '.is_demo' ), detailframe ] );
                showNextComp( _sp.attr( 'data-url' ) );
                return;
            }

			var _height = $('.body-detail').find('#detailframe').contents()
				.find( '#' + $( e.target ).prop( 'class' ) ).offset().top;
			
			$( 'html,body' ).stop().animate( {
				scrollTop: _height + $('.body').offset().top + 20
			} );
		} );
	}

	function pageEventHandler(){
		/* attr hover event */
		$(document).on( 'mouseover', '[hover]', function( e ){
			var _ele = $( e.target );
			_ele.addClass( _ele.attr( 'hover' ) );
		}).on( 'mouseleave', '[hover]', function( e ){ 
			var _ele = $( e.target );
			if( typeof _ele.attr('hover') == 'undefined' ){
				_ele = _ele.closest( '[hover]' );
			}
			_ele.removeClass( _ele.attr('hover') );
		});

		$( '#outlink a' ).hover( function( e ){
			$( e.target ).stop().velocity( {
				color : '#ccc'
				, backgroundColor : '#4d5152'
			} );
		}, function( e ){
			$( e.target ).stop().velocity( {
				color : '#666'
				, backgroundColor : '#e6decb'
			} );
		} );

		navHandler();

		detailHandler();

		simpleDemoHandler();
	}

	function navHandler() {

		var _sideBar = $( '#bodynav' );
		var _minTop = _sideBar.offset().top;
		var _maxTop = _minTop + $( '.body' ).outerHeight() - 50;
		var _bodyScrollTop;
		var _windowHeight;
		var _hiddens;
		var _compsItem = $( '#itemlist li' );
		var _navItem = $( '#bodynav li' );
		var _bodyTop = $('.body').offset().top;
		var _helper = $('.body-helper');
		var _topbtn = _helper.find('.body-topbtn');
		var _detailnav = $( '.body-detailnav' );

		$( '#menulist .header-complink' ).on( 'click', function( e ){

            JWIN.trigger( 'GO_MAIN_TOP' );
			e.preventDefault();

			var _tar = $( e.target );
			if( mainNavFlag ){
				$( JC.f.printf( 'li.body-comp[data-id={0}] a.body-attrbtn', _tar.attr( 'data-id' ) ) ).trigger( 'click' );
			} else {
				showNextComp( _tar.attr( 'data-url' ) );
			}
			
		} );

		_topbtn.on( 'click', function( e ){
			e.preventDefault();
			$( 'html,body' ).stop().animate({
				scrollTop: 0
			},500);
		} );
		
		$( window ).scroll( function(){

			_bodyScrollTop = $( document ).scrollTop();

            //JC.log( _bodyTop, _bodyScrollTop, JC.f.ts() );

			/* 处理回到顶部按钮 */
			if( _bodyScrollTop > _bodyTop && !_helper.hasClass( 'body-helperfix' ) ){
				_helper.addClass('body-helperfix');
				_topbtn.show().velocity( { opacity: 1 } );
                //JC.log( 111, JC.f.ts()  );
			} else if( _bodyScrollTop <= _bodyTop && _helper.hasClass( 'body-helperfix' ) ) {
				_helper.removeClass('body-helperfix');
				_topbtn.velocity( { opacity: 0 }, function(){ _topbtn.hide() } );
                //JC.log( 222, JC.f.ts() );
			}

			/* 处理右部菜单导航 */
			if( !mainNavFlag ){

				/* detail nav */
				

				if( _bodyScrollTop >= _detailNavTop ){
					!_detailnav.hasClass( 'body-detailnav-fixed' ) 
						&& _detailnav.addClass( 'body-detailnav-fixed' );
				} else {
					_detailnav.hasClass( 'body-detailnav-fixed' ) 
						&& _detailnav.removeClass( 'body-detailnav-fixed' );
				}
				return;
			}

			/* main nav */

			_hiddens = [];
			
			_windowHeight = viewport_f().height;

			if( _bodyScrollTop >= _minTop && _bodyScrollTop <= _maxTop - _windowHeight ){
				!_sideBar.hasClass( 'body-nav-fixed' ) 
					&& _sideBar.addClass( 'body-nav-fixed' );
			} else {
                //JC.log( _bodyScrollTop, _maxTop, _windowHeight, _maxTop - _windowHeight, JC.f.winSize().height );
				if( _bodyScrollTop > _maxTop - _windowHeight ){
					_sideBar.css( 'bottom', '0' );
				} else {
					_sideBar.removeAttr( 'style' );
				}
				_sideBar.hasClass( 'body-nav-fixed' ) 
					&& _sideBar.removeClass( 'body-nav-fixed' );
			}

			_compsItem.each( function( i ) {
	            var el = $( this ),
	                bottom = el.offset().top;

	            if( bottom < _bodyScrollTop ) {
	                _hiddens.push( i );
	            }
	        });

			if( _windowHeight + _bodyScrollTop < $( 'body' ).height() ) {
	            var i = _hiddens.length ? Math.max.apply( null, _hiddens ) : 0;
	            if( i >= _compsItem.size() ) {
	                _navItem.removeClass( 'nav-select' ).last().addClass( 'nav-select' );
	            } else {
	                _navItem.removeClass( 'nav-select' ).eq( i ).addClass( 'nav-select' );
	            }
	        } else {
	            _navItem.removeClass( 'nav-select' ).last().addClass( 'nav-select' );
	        }
		});

		$( '#bodynav' ).on( 'click', 'dd a', function( e ){
			e.preventDefault();
			var _ele = $( e.target );
			var _target = $( JC.f.printf( 'li[data-id={0}]', _ele.attr( 'data-id' ) ) );

			$( 'html,body' ).stop().animate({
				scrollTop: _target.offset().top + 1
			}, 500, function(){
				_target.find( '.body-compname' )
					.css( 'color', '#f00' )
					.velocity( { color: '#b75024' }, 1000, function(){
						_target.find( '.body-compname' ).removeAttr( 'style' );
					});
			});
		});
	}

	function simpleDemoHandler(){

		$( '.body-sdemobtn' ).on( 'click', function( e ){
			e.preventDefault();

			var _sdemoBtn = $( e.target );
			var _parent = _sdemoBtn.closest( '.body-comp' );
			var _sdemoView = _parent.find( '.body-compdemo' );

			if( _sdemoView.css( 'display' ) == 'block' ){
				_sdemoView.find( '.body-compclose' ).click();
				return;
			}

			_sdemoView.find( 'iframe' )
				.attr( 'src', _sdemoBtn.attr( 'data-url' ) ).load( function(){
					_sdemoView.velocity( { opacity: '0' }, 0 ).show();
					$( 'html,body' ).stop().animate({
						scrollTop: _sdemoView.offset().top - 20
					}, function(){
						_sdemoView.velocity( { opacity: '1' } );
					});
					
				});
		});

		$( '.body-compclose' ).on( 'click', function( e ){
			e.preventDefault();

			var closeBtn = $( e.target );
			var _parent = closeBtn.closest( '.body-comp' );
			var _sdemoView = _parent.find( '.body-compdemo' );

			_sdemoView.velocity( { opacity: '0' }, function(){
				_sdemoView.hide();
			});
			$( 'html,body' ).stop().animate({
				scrollTop: _parent.offset().top + 1
			});
		});
	}

});

	var mainNavFlag = true;
	var _detailNavTop;
	var _backList = [];

	function initDetailNav( _iframe ){
		
		var _idocuemt = _iframe.contents();
		var _window = _iframe.prop( 'contentWindow' );
		var _nav = $( '.body-detailnav' );
		var _li;
		_nav.html( '' );

        if( _window && ( _window.DOC_PATH || _window.DEMO_PATH ) ){
            if( _window.DOC_PATH ){
                console.log( _window.DOC_PATH );
                $( JC.f.printf( '<li class="nav_ext_link"><a href="javascript:;" class="is_link is_doc" data-url="{0}">查看文档</a></li>', _window.DOC_PATH ) ).appendTo( _nav );
            }

            if( _window.DEMO_PATH ){
                console.log( _window.DEMO_PATH );
                $( JC.f.printf( '<li class="nav_ext_link"><a href="javascript:;" class="is_link is_demo" data-url="{0}">查看演示</a></li>', _window.DEMO_PATH ) ).appendTo( _nav );
            }

            $( '<li class="nav_border"></li>' ).appendTo( _nav );
        }

		_idocuemt.find( '[id^=navmark-]' ).each( function( _i, _ele ){
			_ele = $( _ele );

			_li = $( '<li>' );

			if( _ele.prop( 'tagName' ).toUpperCase() == 'H4' ){
				_li.addClass( 'body-detailnav-sub' );
			} else {
				_li.addClass( 'body-detailnav-main' );
			}

			_li.append(
				$( '<a href="#">' ).html( _ele.text().split(':')[0] )
			  	.addClass( _ele.attr( 'id' ) )
			)
			_nav.append( _li );
		} );
	}

	var _detailframe= $('.body-detail').find('#detailframe');
	function pageTurn( _url ){
		var _nav = $( '.body-detailnav' );
		_nav.velocity( { opacity : 0 } );
		_detailframe.velocity( { opacity : 0 }, function(){
			_detailframe.attr( 'src', _url );
			setTimeout( function(){
				_detailframe.velocity( { opacity : 1 }, function(){
					initDetailNav( _detailframe );
					_nav.velocity( { opacity : 1 } );
				} );
			}, 500 );
		});
	}

	function showNextComp( _url ){
		_backList.push( _detailframe.attr( 'src' ) );
		pageTurn( _url );
		if( _backbtn.css( 'display' ) == 'none' ){
			_backbtn.show().velocity( { opacity: 1 }, 500 );
		}
	}

	var _backbtn = $( '.body-backbtn' );
	function showPrevComp( e ){
		e.preventDefault();

		pageTurn( _backList.pop() );
		if( _backList.length == 0 ){
			_backbtn.velocity( { opacity: 0 }, function(){ _backbtn.hide() } );
		}
	}

function viewport_f() 
{/* shawl.qiu code, return object, func: none */
  var myWidth = 0, myHeight = 0;
  if(typeof(window.innerWidth ) == 'number' ) 
  {/* Non-IE */
    width_i = window.innerWidth; height_i = window.innerHeight;
  } 
  else if 
  (
    document.documentElement &&( document.documentElement.clientWidth || document.documentElement.clientHeight ) 
  ) 
  {/* IE 6 */
    width_i = document.documentElement.clientWidth; height_i = document.documentElement.clientHeight;
  } 
  else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) 
  {/* IE 4 */
    width_i = document.body.clientWidth; height_i = document.body.clientHeight;
  }
  return {
            width:width_i
            , height:height_i
            , max_width: width_i+document.documentElement.scrollLeft
            , max_height: height_i+document.documentElement.scrollTop
          };
}/* function viewport_f() */
