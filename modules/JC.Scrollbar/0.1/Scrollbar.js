;(function (define, _win) { 'use strict'; define(['JC.SelectorMVC'], function () {
/** 模拟滚动条组件，组件会自动初始化带有class为js_compScrollbar的标签
 * <p>
 *      <b>require:</b>
 *      <a href='window.jQuery.html'>jQuery</a>
 *          , <a href='JC.SelectorMVC.html'>JC.SelectorMVC</a>
 * </p>
 * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 * | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.Scrollbar.html' target='_blank'>API docs</a>
 * | <a href='../../modules/JC.Scrollbar/0.1/_demo' target='_blank'>demo link</a></p>
 *
 * <p></p>
 *
 * <h2>可用的 HTML attribute</h2>
 * 
 * <dl>
 *     <dt>scrollbarwheelevent = true | false</dt>
 *     <dd>声明是否支持鼠标滚轮事件，默认值为true</dd>
 *
 *     <dt>scrollbarwheelspeed = num </dt>
 *     <dd>声明滚轮一次滚动多少像素，默认值为40px</dd>
 *
 *     <dt>disabledxscrollbar = true | false</dt>
 *     <dd>声明是否禁止水平滚动条，如果设置为true，则不管水平方向的内容是否溢出，
 *         都不会出现水平滚动条。默认值为 false</dd>
 *
 *     <dt>disabledyscrollbar = true | false</dt>
 *     <dd>声明是否禁止垂直滚动条，如果设置为true，则不管垂直方向的内容是否溢出，
 *         都不会出现垂直滚动条。默认值为 false</dd>
 *
 *     <dt>scrollbarbothwheel = true | false</dt>
 *     <dd>声明是否启用双向滚轮，当水平滚动条和垂直滚动条同时出现时，滚轮只滚动垂直滚动条。
 *     <dd>如果值为true即滚动滚轮时同时滚动水平滚动条和垂直滚动条，默认值为false</dd>
 *     
 * </dl>
 *
 * @namespace JC
 * @class Scrollbar
 * @extends JC.SelectorMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2014-03-17
 * @author  zuojing   <zuojing1013@gmail.com> | 75 Team
 *
 */
    JC.Scrollbar = Scrollbar;

    function Scrollbar(_selector) {
        _selector && (_selector = $(_selector));
        if( Scrollbar.getInstance(_selector) ) return Scrollbar.getInstance(_selector);
        Scrollbar.getInstance(_selector, this);
        this._model = new Scrollbar.Model(_selector);
        this._view = new Scrollbar.View(this._model);
        this._init();
        //JC.log( 'Scrollbar:', new Date().getTime() );
    }

    /**
     * 获取或设置 Scrollbar 的实例
     * @method  getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {ScrollbarInstance}
     */
    Scrollbar.getInstance = function ( _selector, _setter ) {
        if ( typeof _selector == 'string' && !/</.test( _selector ) ) 
            _selector = $(_selector);
        if ( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;

        typeof _setter != 'undefined' && _selector.data( Scrollbar.Model._instanceName, _setter );
        
        return _selector.data(Scrollbar.Model._instanceName);
    };

    /**
     * 初始化可识别的 Scrollbar 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of ScrollbarInstance}
     */
    Scrollbar.init = function (_selector) {
        var _r = [];
        
        _selector = $(_selector || document);

        if ( _selector.length ) {
            if ( _selector.hasClass('js_compScrollbar') ) {
                _r.push(new Scrollbar(_selector));
            } else {
                _selector.find('.js_compScrollbar').each(function() {
                    _r.push(new Scrollbar( this ));
                });
            }
        }
        
        return _r;
    };

    SelectorMVC.build(Scrollbar);

    JC.f.extendObject(Scrollbar.prototype, {
        _beforeInit: function () {
            //JC.log( 'Scrollbar _beforeInit', new Date().getTime() );
            var _p = this,
                _selector = _p._model.selector();

            _p._model.containerHeight = _selector.prop('offsetHeight');
            _p._model.contentHeight = _selector.prop('scrollHeight');
            _p._model.containerWidth = _selector.prop('offsetWidth');
            _p._model.contentWidth = _selector.prop('scrollWidth');
            _p._model.contentXRatio = _p._model.containerWidth / _p._model.contentWidth;
            _p._model.contentYRatio = _p._model.containerHeight / _p._model.contentHeight;
            _p._model.trackXRatio = _p._model.contentWidth / _p._model.containerWidth;
            _p._model.trackYRatio = _p._model.contentHeight / _p._model.containerHeight;
            _p._model.trackXWidth = _p._model.containerWidth;
            _p._model.trackYHeight = _p._model.containerHeight;
            _p._model.thumbXWidth = _p._model.containerWidth * _p._model.contentXRatio; 
            _p._model.thumbYHeight = _p._model.containerHeight * _p._model.contentYRatio;
            _p._model.maxTop = _p._model.containerHeight - _p._model.thumbYHeight;
            _p._model.maxLeft = _p._model.containerWidth - _p._model.thumbXWidth;
            
        },

        _initHanlderEvent: function () {
            var _p = this,
                _selector = _p._model.selector();

            _p.on('COMPScrollbarUpdate', function () {
               
                $('<div class="COMP_trackX"><div class="COMP_thumbX"></div></div><div class="COMP_trackY"><div class="COMP_thumbY"></div></div>').appendTo(_p._model.selector());
                _p._model.setSize();

                ( _p._model.contentXRatio < 1 ) && _p._scrollXHanlderEvent();
                ( _p._model.contentYRatio < 1 ) && _p._scrollYHanlderEvent();
            
                if ( _p._model.wheelEvent() ) {
                    if (window.addEventListener ) {
                        _p._model.selector()[0].addEventListener('mousewheel', function (_e) {
                            _p._model.wheel(_e); 
                        }, false);
                        _p._model.selector()[0].addEventListener('DOMMouseScroll', function (_e) {
                            _p._model.wheel(_e);
                        }, false);
                    } else {
                        _p._model.selector()[0].onmousewheel =  function (_e) {
                            _p._model.wheel( _e || window.event );
                        };
                    }
                }
            });

        }, 

        _scrollXHanlderEvent: function () {
            var _p = this,
                _isDrag = false;
            
            _p._model.thumbX().on('mousedown', function (_e) {

                _isDrag = true;
                _p._model.curPageX = _e.pageX;
                _p._model.curLeft = _p._model.thumbX().position().left;
                _e.stopPropagation();
                _e.preventDefault(); 
            });

            $(document).on('mousemove', function (_e) {
                if ( _isDrag ) {
                    _p._model.updateContentScrollLeft( _e.pageX ) ;
                    _e.stopPropagation();
                    _e.preventDefault();
                }
            });
           
            $(document).on('mouseup', function (_e) {
                _isDrag = false;
                _e.stopPropagation();
                _e.preventDefault();
            });
        },

        _scrollYHanlderEvent: function () {
            var _p = this,
                _isDrag = false;

            _p._model.thumbY().on('mousedown', function ( _e ) {
                _isDrag = true;
                _p._model.curPageY = _e.pageY;
                _p._model.curTop = _p._model.thumbY().position().top;
                _e.stopPropagation();
                _e.preventDefault(); 
            });

            $(document).on('mousemove', function (_e) {
                if ( _isDrag ) {
                    _p._model.updateContentScrollTop( _e.pageY ) ;
                    _e.stopPropagation();
                    _e.preventDefault();
                }
            });
           
            $(document).on('mouseup', function (_e) {
                _isDrag = false;
                _e.stopPropagation();
                _e.preventDefault();
            });
        },

       

        _inited: function () {
            var _p = $(this);
            _p.trigger('COMPScrollbarUpdate');
        },

        update: function () {

        }

    });
 
    Scrollbar.Model._instanceName = "Scrollbar";
   
    
    JC.f.extendObject(Scrollbar.Model.prototype, {
        init: function () {
          
        },

        containerWidth: 0,

        containerHeight: 0,

        contentWidth: 0,

        contentHeight: 0,

        contentXRatio: 0,

        contentYRatio: 0,

        trackXWidth: 0,

        trackYHeight: 0,

        trackXRatio: 0,

        trackYRatio: 0,

        thumbXWidth: 0,

        thumbYHeight: 0,

        maxTop: 0,

        maxLeft: 0,

        curPageX: 0,

        curPageY: 0,

        contentXPosition: 0,

        contentYPosition: 0,

        xRailActive: function () {
            var _p = this,
                _r = false;

            ( !_p.disabledXrail() && _p.contentXRatio < 1 ) && ( _r = true);

            return _r;
        },

        yRailActive: function () {
            var _p = this,
                _r = false;

            (!_p.disabledYrail() && _p.contentYRatio < 1 ) && ( _r = true);
            
            return _r;
        },

        trackX: function () {
            return this.selector().find('.COMP_trackX');
        },

        trackY: function () {
            return this.selector().find('.COMP_trackY');
        },

        thumbX: function () {
            return this.selector().find('.COMP_thumbX');
        },

        thumbY: function () {
            return this.selector().find('.COMP_thumbY');
        },

        bothWheel: function () {
            return this.boolProp('scrollbarbothwheel');
        },

        wheelEvent: function () {
            var _attr = this.is('[scrollbarwheelevent]'),
                _r ;
            
            if ( !_attr ) {
                return true;
            } else {
                return this.boolProp('scrollbarwheelevent');
            }

        },

        wheelSpeed: function () {
            return this.intProp('scrollbarwheelspeed') || 40;
        },

        disabledXrail: function () {
            return this.boolProp('disabledxscrollbar');
        },

        disabledYrail: function () {
            return this.boolProp('disabledyscrollbar');
        },

        setSize: function () {
            var _p = this;

            _p.trackX().css({
                width: _p.trackXWidth,
                display: _p.xRailActive()? 'block': 'none'
            });

            _p.thumbX().css({
                width: _p.thumbXWidth
            });

            _p.trackY().css({
                height: _p.trackYHeight,
                display: _p.yRailActive()? 'block': 'none'
            });

            _p.thumbY().css({
                height: _p.thumbYHeight
            });
        },

        wheel: function ( _e ) {
            var _p = this,
                _wheelSpeed = _p.wheelSpeed(),
                _speed = 0;

            //这里不考虑opera9.5以前的版本,Firefox的正负值相反
            _speed = _e.wheelDelta? _e.wheelDelta / 120 * _wheelSpeed: -_e.detail / 3 * _wheelSpeed;

            if ( !_p.bothWheel() ) {
                if ( _p.contentYRatio < 1 &&  !_p.disabledYrail() ) {
                    _p.contentYPosition -=  _speed;
                    //处理滚到底部和滚到顶部
                    _p.contentYPosition = Math.min((_p.contentHeight - _p.containerHeight), Math.max(0, _p.contentYPosition));
                    _p.contentXPosition = 0;
                } else if ( _p.contentXRatio < 1 && !_p.disabledXrail() ) {
                    _p.contentXPosition -= _speed;
                    //处理滚到底部和滚到顶部
                    _p.contentXPosition = Math.min((_p.contentWidth - _p.containerWidth), Math.max(0, _p.contentXPosition));
                    _p.contentYPosition = 0;
                }
            } else {
                _p.contentYPosition -=  _speed;
                _p.contentXPosition -= _speed;
                //处理滚到底部和滚到顶部
                _p.contentYPosition = Math.min((_p.contentHeight - _p.containerHeight), Math.max(0, _p.contentYPosition));
                _p.contentXPosition = Math.min((_p.contentWidth - _p.containerWidth), Math.max(0, _p.contentXPosition));        
            }
            
            _p.selector().scrollTop(_p.contentYPosition);
            _p.selector().scrollLeft(_p.contentXPosition);    
            _p.updateScrollBar();
            
            //阻止浏览器的滚动
            _e = $.event.fix(_e);
            _e.preventDefault();

        },

        updateScrollBar: function () {
            var _p = this;
            
            _p.trackY().css({
                top: _p.contentYPosition,
                right: _p.contentXRatio < 1? -_p.contentXPosition: 0
            });

            _p.thumbY().css({
                top: _p.contentYPosition / _p.trackYRatio 
            });
           
            _p.trackX().css({
                left: _p.contentXPosition,
                bottom: _p.contentYRatio < 1? -_p.contentYPosition: 0
            });
            
            _p.thumbX().css({
                left: _p.contentXPosition / _p.trackXRatio 
            });
        },

        updateContentScrollTop: function ( _pageY ) {
            var _p = this,
                _delta = _pageY - _p.curPageY,
                _thumbYPosition;
           
            _thumbYPosition = Math.min(_p.maxTop, Math.max(0, _p.curTop + _delta));
            _p.contentYPosition = _thumbYPosition * _p.trackYRatio;
            _p.selector().scrollTop(_p.contentYPosition);

            _p.updateScrollBar();

        },

        updateContentScrollLeft: function ( _pageX ) {
            var _p = this,
                _delta = _pageX - _p.curPageX,
                _thumbXPosition; 
            
            _thumbXPosition = Math.min(_p.maxLeft, Math.max(0, _p.curLeft + _delta));
            _p.contentXPosition = _thumbXPosition * _p.trackXRatio;
            _p.selector().scrollLeft(_p.contentXPosition);
            _p.updateScrollBar();
        }
       
    });
 
    JC.f.extendObject(Scrollbar.View.prototype, {
        
        update: function () {
          
        }

    });

    
    $(document).ready( function () {
        var _insAr = 0;
        Scrollbar.autoInit
            && ( _insAr = Scrollbar.init() );
    });
 
    return JC.Scrollbar;

});}( typeof define === 'function' && define.amd ? define : 
        function (_name, _require, _cb) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
