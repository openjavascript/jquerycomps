;(function (define, _win) { 'use strict'; define(['JC.BaseMVC'], function () {
/**
 * 
 *
 * @namespace JC
 * @class Scrollbar
 * @extends JC.BaseMVC
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

    BaseMVC.build(Scrollbar);

    JC.f.extendObject(Scrollbar.prototype, {
        _beforeInit: function () {
            //JC.log( 'Scrollbar _beforeInit', new Date().getTime() );
            var _p = this,
                _selector = _p._model.selector();

            Scrollbar.Model.containerHeight = _selector.prop('offsetHeight');
            Scrollbar.Model.contentHeight = _selector.prop('scrollHeight');
            Scrollbar.Model.containerWidth = _selector.prop('offsetWidth');
            Scrollbar.Model.contentWidth = _selector.prop('scrollWidth');
        },

        _initHanlderEvent: function () {
            var _p = this,
                _isDrag = false;

            this._defaultSetting();

            _p._model.selector().on('scroll', function () {
                _p._model.updateScrollBar();
            });

            _p._model.slider().on('mousedown', function ( _e ) {
                _isDrag = true;
                Scrollbar.Model.curPageY = _e.pageY;
                Scrollbar.Model.curTop = _p._model.slider().position().top;
                _e.stopPropagation();
                _e.preventDefault(); 
            });

            $(document).on('mousemove', function ( _e ) {
                if ( _isDrag ) {
                    _p._model.updateContentScrollTop( _e.pageY );
                    _e.stopPropagation();
                    _e.preventDefault();
                }
                
            });

            $(document).on('mouseup', function ( _e ) {
                _isDrag = false;
                _e.stopPropagation();
                _e.preventDefault();
            });

            if ( window.addEventListener ) {
                _p._model.selector()[0].addEventListener('mousewheel', function (_e) {
                    _p._model.wheel(_e);
                }, false);
                _p._model.selector()[0].addEventListener('DOMMouseScroll', function (_e) {
                    _p._model.wheel(_e);
                }, false);
            } else {
                _p._model.selector()[0].onmousewheel = function (_e) {
                    _p._model.wheel(_e);
                };
            }

        }, 

        _defaultSetting: function () {
            var _p = this,
                _containerHeight = Scrollbar.Model.containerHeight,
                _contentHeight = Scrollbar.Model.contentHeight;

            $('<div class="COMP_scrollbar"><div class="COMP_slider"></div></div>').appendTo(_p._model.selector());
            _p._model.scrollbar().css('height', _containerHeight );
            _p._model.slider().css('height', parseInt(_containerHeight * _containerHeight / _contentHeight, 10));
            _p._model.updateScrollBar();

        },

        _inited: function () {

        },

        update: function () {

        }

    });
 
    Scrollbar.Model._instanceName = "Scrollbar";
    Scrollbar.Model.containerHeight = 0;
    Scrollbar.Model.contentHeight = 0;
    Scrollbar.Model.containerWidth = 0;
    Scrollbar.Model.contentWidth = 0;
    Scrollbar.Model.curPageY = 0;
    Scrollbar.Model.curTop = 0;
    
    JC.f.extendObject(Scrollbar.Model.prototype, {
        init: function () {
           Scrollbar.initViewportPosition = this.viewport().prop('offsetTop');
        },

        axis: function () {
            return this.stringProp('scrollbaraxis') || 'y';
        },

        viewport: function () {
            var _p = this,
                _r;

            _r = _p.selector().find(_p.attrProp('scrollbarviewport'));

            return _r;
        },

        scrollbar: function () {
            return this.selector().find('.COMP_scrollbar');
        },

        slider: function () {
            return this.selector().find('.COMP_slider');
        },

        silderSize: function () {
            return this.intProp('scrollbarsilderSize') || 'auto';
        },

        wheelSpeed: function () {
            return this.intProp('scrollbarwheelspeed') || 40;
        },

        wheel: function ( _e ) {
            var _p = this,
                _wheelSpeed = _p.wheelSpeed(),
                _speed = 0;

            //这里不考虑opera9.5以前的版本,Firefox的正负值相反
            _speed = _e.wheelDelta? _e.wheelDelta / 120 * _wheelSpeed: -_e.detail / 3 * _wheelSpeed;
            _p.selector().scrollTop(_p.selector().scrollTop() - _speed);
            _p.updateScrollBar();
            
        },

        updateScrollBar: function () {
            var _p = this,
                _selector = _p.selector(),
                _slider = _p.slider(),
                _sliderYHeight =_slider.prop('offsetHeight'),
                _scrollTop = _selector.scrollTop(),
                _containerHeight = Scrollbar.Model.containerHeight,
                _contentHeight = Scrollbar.Model.contentHeight,
                _sliderScrollYHeight = parseInt(_scrollTop * (_containerHeight - _sliderYHeight ) / (_contentHeight - _containerHeight), 10);

            _p.scrollbar().css({
                'top': _scrollTop
            } );

            _slider.css({
                'top': _sliderScrollYHeight
            });  
        },

        updateContentScrollTop: function ( _pageY ) {
            var _p = this,
                _deltaY = _pageY - Scrollbar.Model.curPageY,
                _newTop = Scrollbar.Model.curTop + _deltaY,
                _containerHeight = Scrollbar.Model.containerHeight,
                _contentHeight = Scrollbar.Model.contentHeight,
                _maxTop = Scrollbar.Model.containerHeight - _p.slider().prop('offsetHeight'),
                _sliderScrollYHeight,
                _scrollTop;

            if (_newTop < 0) {
              _sliderScrollYHeight = 0;
            }
            else if (_newTop > _maxTop) {
              _sliderScrollYHeight = _maxTop;
            }
            else {
              _sliderScrollYHeight = _newTop;
            }

        _scrollTop = parseInt(_sliderScrollYHeight * (_contentHeight - _containerHeight) / (_containerHeight - _sliderScrollYHeight), 10);
        _p.selector().scrollTop(_scrollTop);

        
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
