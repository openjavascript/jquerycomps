 ;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
/**
 * PopTips 带箭头的气泡提示框功能
 * <p>
 *      <b>require</b>: 
 *      <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 * </p>
 * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 * | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.PopTips.html' target='_blank'>API docs</a>
 * | <a href='../../modules/JC.PopTips/0.2/_demo' target='_blank'>demo link</a></p>
 *
 * <h2>页面只要引用本文件, 默认会自动初始化span|em|a|b为class="js_compPoptips"的提示气泡</h2>
 * <p></p>
 *
 *
 * <h2>可用的 HTML attribute</h2>
 *
 * <dl>
 *    <dt>htmlContent</dt>
 *    <dd>
 *       <p>声明气泡提示的内容支持脚本模板<br>
 *        如果有设置该属性那么会优先选用htmlContent提供的内容
 *       </p>
 *    </dd>
 *
 *    <dt>ajaxContent</dt>
 *    <dd>
 *       <p>声明气泡提示的ajax 模板</p>
 *    </dd>
 *
 *    <dt>content = string </dt>
 *    <dd>
 *       <p>声明气泡提示的内容，如果需要提示html内容那么用<b>htmlContent</b>属性<br>
 *       如果没有设置则去查找title属性，如果title也没有设置，<br/>
         则将触发元素的text作为提示内容。</p>
 *    </dd>
 *
 *    <dt>theme = yellow | blue | white | green, <a href="../../modules/JC.PopTips/0.1/res/default/style.html" target="_blank">查看</a> </dt>
 *    <dd>
 *       气泡主题，提供黄色、蓝色、白色、绿色四种样式，默认为 yellow.
 *       <p><b>yellow：</b>黄色<br/>
 *       <b>blue：</b>蓝色<br/>
 *       <b>white：</b>白色<br/>
 *       <b>green：</b>绿色</p>
 *    </dd>
 *
 *    <dt>triggerType = hover | click</dt>
 *    <dd>
 *        触发方式: 支持hover和click
 *        <p>默认为hover</p>
 *    </dd>
 *
 *    <dt>arrowPosition = left | right | top | bottom</dt>
 *    <dd>
 *        声明箭头的方向，默认值为left
 *        <p><b>left:</b>箭头向左（提示框在触发元素的右边）如果右边空间不够，提示框自动显示在左边，如果左边空间不够，提示框显示在上方，如果上方空间，提示框显示到下方<br/>
 *        <b>right:</b>箭头向右（提示框在触发元素的左边）如果左边空间不够，提示框自动显示在右边，如果右边空间不够，提示框显示在上方，如果上方空间，提示框显示到下方<br/>
 *        <b>top:</b>箭头向上（提示框在触发元素的下边）如果下边不够，提示框自动显示到上边<br/>
 *        <b>bottom:</b>箭头向下（提示框在触发元素的上边）如果上边不够，提示框自动显示到下边</p>    
 *    </dd>
 *
 *    <dt>arrowPositionOffset = left | right | top , <a href="../../modules/JC.PopTips/0.1/res/default/style.html#pos" target="_blank">查看</a></dt>
 *    <dd>
 *        声明箭头在提示框的位置，默认居中
 *        <p>如果arrowPosition = left | right, arrowPositionOffset可以设置为top</p>
 *        <p>如果arrowPosition = top | bottom, arrowPositionOffset可以设置为left | right</p>
 *    </dd>
 *
 *    <dt>offsetXY = num,num</dt>
 *    <dd>
 *        声明提示框相对于当前位置的偏移位置(x 坐标，y 坐标)，默认值为0
 *        <p>x < 0，往左偏移，x > 0 往右偏移 <br/>
 *         y < 0, 往上偏移，y > 0 往下偏移 <br/>
 *         两个数值以<b>逗号</b>分隔，如果只写一个值表示 y 坐标为0。</p>
 *    </dd>
 *
 *    <dt>popTipsWidth = num</dt>
 *    <dd>
 *        声明提示框的宽度，默认自适应
 *    </dd>
 *
 *    <dt>popTipsHeight = num</dt>
 *    <dd>
 *        声明提示框的高度，默认自适应
 *    </dd>
 * 
 *    <dt>popTipsMinWidth= num, default = auto</dt>
 *    <dd>
 *        声明提示框的最小宽度，默认自适应
 *    </dd>
 *
 *    <dt>popTipsMinHeight = num, default = auto</dt>
 *    <dd>
 *        声明提示框的最小高度，默认自适应
 *    </dd>
 *
 *    <dt>beforeShowCallback = function</dt>
 *    <dd>
 *        气泡显示前, 触发的回调, <b>window 变量域</b>
<pre>function beforeShowCallback( _selector ){
    var _ins = this;
    JC.log( 'beforeShowCallback', new Date().getTime() );
}</pre>
 *    </dd>
 *
 *    <dt>afterHideCallback = function</dt>
 *    <dd>
 *        气泡隐藏后, 触发的回调, <b>window 变量域</b>
<pre>function afterHideCallback( _selector ){
    var _ins = this;
    JC.log( 'afterHideCallback', new Date().getTime() );
}</pre>
 *    </dd>
 *</dl> 
 *
 * @namespace JC
 * @class PopTips
 * @extends JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.2 2014-09-03
 * @version dev 0.1 2013-12-13
 * @author  zuojing   <zuojing1013@gmail.com>, qiushaowei <qiushaowei@360.cn> | 75 Team
 * @example
	<span class="js_compPopTips" style="margin-top:50px; margin-left:200px; display:inline-block;"  
		content="1.这个tip显示在右边<br>2.古希腊学者亚里士多<br>3.古希腊学者亚里士多<br>4.古希腊学者亚里士多"  
		theme="yellow" 
		arrowposition="left"
		triggerType="click"
		>
		<span>古希腊学者亚里士多德曾编<br>
			写过全面讲述当时学问的讲义，<br>
			被西方奉为“百科全书之父”，<br>
			中国汉朝初年的《尔雅》，<br>
			是中国百科全书性质著作的渊源。</span>
	</span>
  */
    JC.PopTips = PopTips;
 
    function PopTips( _selector ){
        _selector && ( _selector = $( _selector ) );
        
        if( PopTips.getInstance( _selector ) ) return PopTips.getInstance( _selector );
        PopTips.getInstance( _selector, this );
        //JC.log( PopTips.Model._instanceName );
 
        this._model = new PopTips.Model( _selector );
        this._view = new PopTips.View( this._model );
 
        this._init();
 
        //JC.log( 'PopTips:', new Date().getTime() );
    }
    /**
     * 获取或设置 PopTips 的实例
     * @method  getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {PopTipsInstance}
     */
    PopTips.getInstance = function ( _selector, _setter ) {
        if( typeof _selector == 'string' && !/</.test( _selector ) ) 
            _selector = $(_selector);
        if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
        typeof _setter != 'undefined' && _selector.data( PopTips.Model._instanceName, _setter );

        return _selector.data( PopTips.Model._instanceName );
    };
    /**
     * 初始化可识别的 PopTips 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of PopTipsInstance}
     */
    PopTips.init = function ( _selector ) {
        var _r = [];
        
        _selector = $( _selector || document );

        if ( _selector.length ) {
            if ( _selector.hasClass('js_compPopTips') ) {
                _r.push( new PopTips(_selector) );
            } else {
                _selector.find('span.js_compPopTips,a.js_compPopTips,b.js_compPopTips,em.js_compPopTips').each( function() {
                    _r.push( new PopTips( this ) );
                });
            }
        }
        
        return _r;
    };

    PopTips.update = function () {
        var _items = $( JC.f.printf( '#{0}>div', PopTips.Model._boxId ) );

        if( !_items.length ) return;

        _items.each( function(){
            var _p = $(this), 
                _ins = _p.data( 'CPopTipsIns' );

            if( !_ins ) return;

            if ( _ins._model.layout().is(':visible') ) {
                _ins.update();
            }

        });
      
    },

    BaseMVC.build( PopTips );

    JC.f.extendObject( PopTips.prototype, {
        _beforeInit: function () {
            //JC.log( 'PopTips _beforeInit', new Date().getTime() );
        },

        _initHanlderEvent: function () {
            var _p = this;

            _p.on( 'CPopTipsUpdate', function( _evt ){
                _p._model.beforeShowCallback()
                    && _p._model.beforeShowCallback().call( _p, _p.selector() );

            });

            var _timerIn = null,
                _timerOut = null,
                _tipsTimerIn = null,
                _tipsTimerOut = null;

            if ( _p._model.triggerType() == 'hover' ) {
                 _p._model.selector()
                .on('mouseenter', function () {
                    clearTimeout( _tipsTimerIn );
                    clearTimeout( _tipsTimerOut );
                    clearTimeout( _timerIn );
                    clearTimeout( _timerOut );
                    _timerIn = setTimeout( function () {
                        _p._view.update();
                        _p._view.show();
                    }, 50);

                })
                .on('mouseleave', function () {
                    clearTimeout( _tipsTimerIn );
                    clearTimeout( _tipsTimerOut );
                    clearTimeout( _timerIn );
                    clearTimeout( _timerOut );
                    _timerOut = setTimeout( function () {
                         _p._view.hide();    
                    }, 200)
                });

                _p._model.layout()
                .on('mouseenter', function () {
                    clearTimeout( _tipsTimerIn );
                    clearTimeout( _tipsTimerOut );
                    clearTimeout( _timerIn );
                    clearTimeout( _timerOut );
                    _tipsTimerIn = setTimeout( function () {
                        _p._view.update();
                        _p._view.show();
                       
                    }, 50)
                })
                .on('mouseleave', function () {
                    clearTimeout( _tipsTimerIn );
                    clearTimeout( _tipsTimerOut );
                    clearTimeout( _timerIn );
                    clearTimeout( _timerOut );
                    _tipsTimerOut = setTimeout( function () {
                        _p._view.hide();
                    }, 200)
                });

            }

            _p.on( 'update_layout', function( _evt, _html ){
                var _json;
                try{
                    _json = $.parseJSON( _html );
                    if( _json && 'errorno' in _json && !_json.errorno && _json.data ){
                        _html = _json.data;
                    }
                }catch( _ex ){
                }
                _p._model.layout().find( '.js_cpt_ajax_ph' ).html( _html );
            });

            if ( _p._model.triggerType() == 'click' ) {
                _p._model.selector().on('click', function ( _evt ) {
                    if ( _p._model.layout().is(':visible') ) {
                        _p._view.hide();
                    } else {
                        _p._view.update();
                        _p._view.show();
                        
                    }
                });
            }

        }, 

        _inited: function () {
            //JC.log( 'PopTips _inited', new Date().getTime() );
           var _p = $(this);

           _p.trigger('CPopTipsUpdate');

        },

        /**
         * 更新 PopTips 状态
         * @method update
         */
        update: function () {

            this._view.update();

            return this;
        }

    });
 
    PopTips.Model._instanceName = "PopTips";
    PopTips.Model._boxId = 'CPTBox';

    JC.f.extendObject( PopTips.Model.prototype, {
        init: function () {
            var _p = this;
        },

        baseTpl: '<div class="CPT CPT_{0}" style="position:absolute;display:none;">'
            +   '<div class="CPT_shadow">'
            +       '<div class="CPT_container" style="min-width:{4}; min-height: {5}">'
            +           '<div class="CPT_arrow CPT_arrow_{1}">'
            +               '<em></em>'
            +               '<span></span>'
            +           '</div>'
            +           '<div class="CPT_content"  data-role="content" {3}>'
            +               '{2}'
            +           '</div>'
            +       '</div>'
            +   '</div>'
            + '</div>',

        theme: function () {
            var _r = this.stringProp('theme');
            
            !_r && ( _r = 'yellow' );

            return _r;

        },

        contents: function () {
            var _r = this.attrProp('content') || this.attrProp('title');
            
            !_r && ( _r = this.selector().text() );

            return _r;

        },

        htmlContents: function () {
            var _r,
                _s = JC.f.parentSelector( this.selector(), this.attrProp('htmlContent') );

            _r = JC.f.scriptContent( _s );

            return _r;
        },

        ajaxContent: function () {
            var _p = this;
            this.is( '[ajaxContent]' ) &&
                $.get( this.attrProp( 'ajaxContent' ) ).done( 
                    function( _r ){
                        _p.trigger( 'update_layout', [ _r ] );
                    });
        },

        arrowPosition: function () {
            var _r = this.stringProp('arrowPosition');

            !_r && ( _r = 'left' );

            return _r;
        },

        arrowPositionOffset: function () {
            var _r = this.stringProp('arrowPositionOffset'),
                _arrowPosition = this.arrowPosition();

            if ( _arrowPosition === 'left' || _arrowPosition === 'right' ) {
                if ( _r != 'top' ) {
                    _r = '';
                }
            }

            if ( _arrowPosition === 'top' || _arrowPosition === 'bottom' ) {
                if ( _r != 'left' || _r != 'right' ) {
                    _r = '';
                }
            }

            return _r;
        },

        offsetXY: function () {
            var _r = this.attrProp('offsetXY').split(','),
                _x = parseInt( _r[0], 10 ) || 0,
                _y = parseInt( _r[1], 10 ) || 0;

            return {
                x: _x,
                y: _y
            };
        },

        triggerType: function () {
            var _r = this.stringProp('triggerType');

            !_r && ( _r = 'hover');

            return _r;

        },

        layout: function () {
            var _p = this,
                _tpl = _p.baseTpl;
            
            if ( !this._layout ) {
                if ( _p.htmlContents() ) {
                    this._layout = $( JC.f.printf( _tpl
                        , _p.theme()
                        , _p.arrowPosition()
                        , _p.htmlContents()
                        , 'style="width:' + _p.layoutWidth() + ';height:' + _p.layoutHeight() + ';"' 
                        , _p.layoutMinWidth(), _p.layoutMinHeight()
                        ) )
                        .appendTo( this.layoutBox() );
                } else if ( this.is( '[ajaxContent]' ) ) {
                    this._layout = $( JC.f.printf( _tpl
                        , _p.theme()
                        , _p.arrowPosition()
                        , '<div class="js_cpt_ajax_ph">加载中...</div>'
                        , 'style="width:' + _p.layoutWidth() + ';height:' + _p.layoutHeight() + ';"' 
                        , _p.layoutMinWidth(), _p.layoutMinHeight()
                        ) )
                        .appendTo( this.layoutBox() );
                    _p.ajaxContent();
                } else {
                    this._layout = $( JC.f.printf( _tpl
                        , _p.theme()
                        , _p.arrowPosition()
                        , _p.contents()
                        , 'style="width:' + _p.layoutWidth() + ';height:' + _p.layoutHeight() + ';"' 
                        , _p.layoutMinWidth(), _p.layoutMinHeight()
                        ) )
                        .appendTo( this.layoutBox() );
                }
                
            }

            return this._layout;

        },

        layoutWidth: function () {
            var _r = this.intProp('popTipsWidth');

            _r && ( _r = _r + 'px' );
            !_r && ( _r = 'auto' );

            return _r;
        },

        layoutMinWidth: function () {
            var _r = this.intProp('popTipsMinWidth');
            _r && ( _r = _r + 'px' );
            !_r && ( _r = 'auto' );
            return _r;
        },

        layoutHeight: function () {
           var _r = this.intProp('popTipsHeight');

           _r && ( _r = _r + 'px' );
           !_r && ( _r = 'auto' );

           return _r;
        },

        layoutMinHeight: function () {
           var _r = this.intProp('popTipsMinHeight');
           _r && ( _r = _r + 'px' );
           !_r && ( _r = 'auto' );

           return _r;
        },


        layoutBox: function () {
            var _r = $('#' + PopTips.Model._boxId );

            if ( !(_r && _r.length) ) {
                _r = $( JC.f.printf( '<div id="{0}"></div>', PopTips.Model._boxId ) )
                    .appendTo( document.body );
            }

            return _r;
        },

        calcPosOffset: function ( _arrowPosition, _pos, _lw, _lh ) {
            var _r = {},
                _p = this,
                _selector = _p.selector(),
                _pos = {
                    top: _selector.offset().top + _p.offsetXY().y,
                    left: _selector.offset().left + _p.offsetXY().x,
                    width: _selector.prop('offsetWidth'),
                    height: _selector.prop('offsetHeight')
                },
                _lw = _p.layout().outerWidth(),
                _lh = _p.layout().outerHeight();
            
            switch ( _arrowPosition ) {
                case 'top':
                    _r = {
                        top: _pos.top + _pos.height + 5 ,
                        left: _pos.left + _pos.width / 2 - _lw / 2 
                    };
                    break;
                case 'right':
                    _r = {
                        top: _pos.top + _pos.height / 2 - _lh / 2,
                        left: _pos.left - _lw - 5
                    };
                    break;
                case 'bottom':
                    _r = {
                        top: _pos.top - _lh - 5,
                        left: _pos.left + _pos.width / 2 - _lw / 2
                    };

                    break;
                case 'left':
                    _r = {
                        top: _pos.top + _pos.height / 2 - _lh / 2,
                        left: _pos.left + _pos.width + 5
                    };

                    break;
            }

            _r.width = _lw;
            _r.height = _lh;
  
            return _r;
        },

        offSet: function ( _offset ) {
            this.layout().css({
                top: _offset.top,
                left: _offset.left
            });
        },

        changePosition: function ( _newAP, _now ) {
            var _p = this,
                _offset;

            _offset = _p.calcPosOffset( _newAP );
            _p.changeArrow( _now );
            
            if ( ( _now === 'top'  ) 
                || ( _now === 'bottom' ) ) {
                _p.offSet( _offset );
            }
            
            return _offset;
        },

        changeArrow: function ( _className ) {
            var _p = this;
            _p.layout().find('div.CPT_arrow')[0].className = 'CPT_arrow CPT_arrow_' + _className;

        },

        setPosition: function ( _offset, _arrowPosition ) {
            var _p = this,
                _newAP,
                _now,
                _win = $(window),
                _viewportHeight = _win.outerHeight(),
                _viewportWidth = _win.outerWidth(),
                _scrollTop = _win.scrollTop(),
                _scrollLeft = _win.scrollLeft(),
                _viewMaxX = _viewportWidth + _scrollLeft,
                _viewMaxY = _viewportHeight + _scrollTop,
                _tipsMaxPosX = _offset.width + _offset.left,
                _tipsMaxPosY = _offset.top + _offset.height,
                _baseP = _p.arrowPositionOffset(),
                _afterChangePos;

            _p.offSet( _offset );

            _baseP && ( _baseP = '_' + _baseP );

            if ( _arrowPosition === 'bottom'  ) { 
                if ( _offset.top < 0 ) {
                    _newAP = 'top';
                    _now = 'top' + _baseP;
                    _p.changePosition( _newAP, _now );
                } else {
                    _p.changeArrow( "bottom" + _baseP );
                }
            }


            if ( _arrowPosition === 'top'  ) {
                if( _viewMaxY < _tipsMaxPosY ) {
                    _newAP = 'bottom';
                    _now = 'bottom' + _baseP;
                    _afterChangePos = _p.changePosition( _newAP, _now );
                } else  {
                    _p.changeArrow( 'top' + _baseP );
                }
                
            }

            if ( _arrowPosition === 'right' ) {
                if ( _offset.left < 0 ) {
                    _newAP = 'left';
                    _now = 'left' + _baseP;
                    _afterChangePos = _p.changePosition(_newAP, _now);
                    _tipsMaxPosX = _afterChangePos.width + _afterChangePos.left;

                    if ( _viewMaxX < _tipsMaxPosX ) {
                        _newAP = 'bottom';
                        _now = 'bottom';
                        _afterChangePos = _p.changePosition(_newAP, _now);

                        if ( _afterChangePos.top < 0 ) {
                            _newAP = 'top';
                            _now = 'top';
                            _afterChangePos = _p.changePosition(_newAP, _now);
                        }

                    } else {
                        _p.offSet( _afterChangePos );
                    }
                } else {
                    _p.changeArrow('right' + _baseP);
                }

            }

            if ( _arrowPosition === 'left' ) {
                
                if ( _viewMaxX < _tipsMaxPosX ) {
                    _newAP = 'right';
                    _now = 'right' + _baseP;
                    _afterChangePos = _p.changePosition(_newAP, _now);

                    if ( _afterChangePos.left < 0 ) {
                        _newAP = 'bottom';
                        _now = 'bottom';
                        _afterChangePos = _p.changePosition(_newAP, _now);

                        if ( _afterChangePos.top < 0 ) {
                            _newAP = 'top';
                            _now = 'top';
                            _afterChangePos = _p.changePosition(_newAP, _now);
                        }

                    } else {
                        _p.offSet( _afterChangePos );
                    }

                } else {
                    _p.changeArrow('left' + _baseP);
                }
            }
        },

        /**
         * PopTips显示前的回调
         */
        beforeShowCallback: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = 'beforeShowCallback';

            return _p.callbackProp(_selector, _key);
        },

        /**
         * PopTips隐藏后的回调
        */
        afterHideCallback: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = 'afterShowCallback';

            return _p.callbackProp(_selector, _key);
        }
    });
 
    JC.f.extendObject( PopTips.View.prototype, {
        init: function () {
            var _p = this;
        },

        update: function () {
            var _p = this,
                _selector = _p._model.selector(),
                _pos = {
                    top: _selector.offset().top,
                    left: _selector.offset().left,
                    width: _selector.prop('offsetWidth'),
                    height: _selector.prop('offsetHeight')
                },
                _arrowPosition = _p._model.arrowPosition(),
                _cal;

            _cal = _p._model.calcPosOffset(_arrowPosition, _pos );
            _p._model.setPosition( _cal, _arrowPosition );

            _p._model.layout().data('CPopTipsIns', _p);
        },

        show: function () {
            var _p = this;

            _p._model.layout().show();
            
        },

        hide: function () {
            var _p = this;

            _p._model.layout().hide();
            

            _p._model.afterHideCallback() && _p._model.afterHideCallback().call( _p, _p.selector() );

        }

    });

    $(document).ready( function () {
        var _insAr = 0;
        PopTips.autoInit
            && ( _insAr = PopTips.init() );

    });

    $(window).on('resize', function () {
        JC.f.safeTimeout( function(){
            PopTips.update();
        }, null, 'PopTipsResize', 20 );
        //JC.log('resize');
    });
 
    return JC.PopTips;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
