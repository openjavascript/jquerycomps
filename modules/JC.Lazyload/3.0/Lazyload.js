;(function (define, _win) { 'use strict'; define(['JC.SelectorMVC'], function () {
//Todo:  支持tab的click事件加载
//Todo: 替换图片src之前需要回调
/**
 * Lazyload 延时加载
 * <p>
 *      <b>require</b>: 
 *          <a href='window.jQuery.html'>jQuery</a>
 *          , <a href='JC.SelectorMVC.html'>JC.SelectorMVC</a>
 * </p>
 * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 * | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.Lazyload.html' target='_blank'>API docs</a>
 * | <a href='../../modules/JC.Lazyload/3.0/_demo' target='_blank'>demo link</a></p>
 *
 * <p></p>
 *
 * <h2>可用的 HTML attribute</h2>
 * <dl>
 *      <dt>lazydirection = string 取值 horizontal、vertical</dt>
 *      <dd>声明滚动的方向默认为：vertical
 *      <br/><b>horizontal:</b> 水平滚动
 *      <br/><b>vertical:</b> 垂直滚动
 *      </dd>
 *
 *      <dt>lazyThreshold = num</dt>
 *      <dd>声明当前视窗往下多少个px外的img/textarea延迟加载，默认值为0<br>
 *        适当设置此值，可以让用户在拖动时感觉数据已经加载好。
 *      </dd>
 *
 *      <dt>lazyPlaceholder = string</dt>
 *      <dd>声明图片加载前的占位图片，默认为一个1x1像素的空白点</dd>
 *
 *      <dt>lazycontainer = css selector</dt>
 *      <dd>声明可视容器，默认为window</dd>
 *
 *      <dt>lazydatatype = string 取值ajax</dt>
 *      <dd>声明加载的数据类型,</dd>
 *
 *      <dt>lazydataSource = css selector</dt>
 *      <dd>声明要延时加载的内容textarea|img <br/>
 *          如果缺省该参数，表明要延时加载的是ajax数据</dd>
 *
 *      <dt>lazyajaxurl = string</dt>
 *      <dd>声明ajax加载的数据接口
 *          <dl>
 *              <dt>数据格式</dt>
 *              <dd>
 *                  {errorno: 0,
 *                  data: html,
 *                  errormsg: ""}
 *              </dd>
 *          </dl>
 *      </dd>
 *
 *      <dt>lazydatafilter = function</dt>
 *      <dd>针对ajax返回的数据，可以对返回的数据格式作修改过滤</dd>
 *      <dd>针对图片数据，当图片进入可视范围内时，可以在图片加载前对图片地址进行修改，比如webp优化</dd>
 *   
 * </dl>
 * 
 * @namespace JC
 * @class Lazyload
 * @extends JC.SelectorMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2014-02-13
 * @author  zuojing   <zuojing1013@gmail.com> | 75 Team
 *
 */
    JC.Lazyload = Lazyload;

    function Lazyload(_selector) {
        _selector && (_selector = $(_selector));
        if( Lazyload.getInstance(_selector) ) return Lazyload.getInstance(_selector);
        Lazyload.getInstance(_selector, this);
        this._model = new Lazyload.Model(_selector);
        this._view = new Lazyload.View(this._model);
        this._init();
    }

    JC.PureMVC.build( Lazyload, JC.SelectorMVC );

    /**
     * 获取或设置 Lazyload 的实例
     * @method  getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {LazyloadInstance}
     */
    Lazyload.getInstance = function ( _selector, _setter ) {
        if ( typeof _selector == 'string' && !/</.test( _selector ) ) 
            _selector = $(_selector);
        if ( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;

        if ( typeof _setter != 'undefined' ) {
          _selector.data(Lazyload.Model._instanceName, _setter);
        }
        
        return _selector.data(Lazyload.Model._instanceName);
    };

    /**
     * 初始化可识别的 Lazyload 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of LazyloadInstance}
     */
    Lazyload.init = function (_selector) {
        var _r = [];
        
        _selector = $(_selector || document);

        if ( _selector.length ) {
            if ( _selector.hasClass('js_compLazyLoad') ) {
                _r.push(new Lazyload(_selector));
            } else {
                _selector.find('.js_compLazyLoad').each(function() {
                    _r.push(new Lazyload( this ));
                });
            }
        }
        
        return _r;
    };

    Lazyload.update = function () {
        
    };

    Lazyload.DataFilter;

    JC.f.extendObject(Lazyload.prototype, {
        _beforeInit: function () {
           var _p = this;

           _p._model.imgList = _p._model.dataSource().imgs;
           _p._model.textareaList = _p._model.dataSource().textareas;
           _p._model.ajaxList = _p._model.dataSource().ajax;
        },

        _initHanlderEvent: function () {
            var _p = this,
                _timer = null,
                _resizeTimer = null;
            
            _p.on(Lazyload.Model.BEFORELOAD, function (_evt, _data) {
                _p._model.beforeLoad()
                    && _p._model.beforeLoad().call(_p, _p.selector(), _data);
            });

           
                //setTimeout( function () {
                    _p._view.render();
                //}, 100);
           
            
            $(_p._model.container()).on('scroll', function () {
                clearTimeout(_timer);
                _timer = setTimeout( function () {
                    _p._view.render();  
                }, 100);      
            });

            $(window).on('resize', function () {
                clearTimeout(_resizeTimer);
                _resizeTimer = setTimeout( function () {
                    _p._view.render();
                }, 100);
            });

            _p.on(Lazyload.Model.AFTERLOAD, function (_evt, _data) {
                _p._model.afterLoad()
                    && _p._model.afterLoad().call(_p, _p.selector(), _data);
            });
        }, 

        _inited: function () {

        },

        update: function () {

        }

    });
 
    Lazyload.Model._instanceName = "Lazyload";
    Lazyload.Model.RENDER = "RENDER";
    Lazyload.Model.BEFORELOAD = "BEFORELOAD";
    Lazyload.Model.AFTERLOAD = "AFTERLOAD";
   
    JC.f.extendObject(Lazyload.Model.prototype, {
        init: function () {

        },

        imgList: [],

        textareaList: [],

        ajaxList: [],

        /**
         * 滚动的方向，水平，垂直，默认垂直滚动
         */
        direction: function () {
            var _r = this.attrProp('lazyDirection');

            _r = _r === 'horizontal'　? 'horizontal': 'vertical';

            return _r;
        },

        /**
         *加载范围阀值，以达到预加载效果，默认为0
        */
        threshold: function () {
            return this.intProp('lazyThreshold');
        },

        /**
         *占位图，如果图片没有设置src属性，则用该图片替换
        */
        placeholder: function () {
            var _r = this.attrProp('lazyPlaceholder');

            !_r && (_r = 'http://p17.qhimg.com/d/_open360/jc/dot.gif');

            return _r;
        },

        /**
         *可视范围容器，默认为window
        */
        container: function () {
            return  this.attrProp('lazyContainer') || window;
        },

        /**
         *获取需要延时加载的html tag，图片|textarea|ajax
         */
        dataSource: function () {
            var _p = this,
                _els = this.attrProp('lazyDataSource'),
                _datatype = this.attrProp('lazyDataType'),
                _placeholder = _p.placeholder(),
                _r = {},
                _imgs = [],
                _textareas = [],
                _ajax = [];

            _p.selector().find(_els).each( function () {
                var _sp = $(this);
               
                if ( _sp.prop('nodeName').toUpperCase() === 'TEXTAREA' ) {
                    _textareas.push(_sp);
                } else if (_sp.prop('nodeName').toUpperCase() === 'IMG') {
                    if ( _sp.attr('data-original') ) {
                        !_sp.attr('src') && (_sp.attr('src', _placeholder));
                        _imgs.push(_sp);
                    }
                } else {
                    ( _datatype === 'ajax' ) && ( _ajax.push(_sp) );
                }

            } );

            _r.imgs = $.makeArray( _imgs );
            _r.textareas = $.makeArray( _textareas );
            _r.ajax = $.makeArray( _ajax );

            return _r;
        },

        /**
         *计算可视范围
         *垂直滚动 height + scrollTop
         *水平滚动 width + scrollLeft
         */
        visualRange: function () {
            var _p = this,
                _direction = _p.direction(),
                _container = $(_p.container()),
                _isVertical = _direction === 'vertical' ? true : false,
                _size = _isVertical ? _container.height() : _container.width(),
                _scrollSize = _isVertical ? _container.scrollTop() : _container.scrollLeft,
                _r = _size + _scrollSize + _p.threshold();

            return _r;
        },

        isInside: function ( _offset ) {
            var _p = this,
                _visualRange = _p.visualRange(),
                _r = false;

            if ( _offset < _visualRange ) {
                _r = true;
            }

            return _r;
        },

        loadData: function () {
            var _p = this,
                _offset = _p.direction() === 'vertical' ? 'top': 'left';

            _p.loadImgData(_offset);
            _p.loadTextareaData(_offset);
            _p.loadAjaxData(_offset);
        },

        loadImgData: function ( _offset ) {
            var _p = this,
                _els = _p.imgList,
                _filter = _p.callbackProp('lazydatafilter') || Lazyload.DataFilter;;

            if ( _els.length === 0 ) {
                return;
            };

            $.each(_els, function ( _ix ) {
                var _sp = $(this),
                    _src = _sp.attr('data-original'),
                    _pos = _sp.data('offset'),
                    _temp,
                    _newData;

                if ( typeof _pos === 'undefined' ) {
                    _pos = _sp.offset()[_offset];
                    _sp.data('offset', _pos);
                }

                if ( _p.isInside(_pos) ) {
                    _filter && (_src = _filter(_src));
                    _sp.attr('src', _src);
                    _sp.data('loaded', true).removeData('offset');
                    _temp = $.grep(_els, function(_el) {
                            return !$(_el).data('loaded');
                        });
                    _p.imgList = $(_temp);
                }

            });

        },

        loadTextareaData: function ( _offset ) {
            var _p = this,
                _els = _p.textareaList;

            if (_els.length === 0) return;

            $.each(_els, function ( _ix ) {
                var _sp = $(this),
                    _html = '<div>' +  _sp.val() + '</div>',
                    _pos = _sp.data('offset'),
                    _temp;

                if ( typeof _pos === 'undefined' ) {
                    _pos = _sp.offset()[_offset];
                    _sp.data('offset', _pos);
                }

                if ( _p.isInside(_pos) ) {
                    $(_html).insertBefore(_sp);
                    _sp.css('display', 'none').val('').data('loaded', true).removeData('offset');
                    _temp = $.grep(_els, function(_el) {
                            return !$(_el).data('loaded');
                        });
                    _p.textareaList = $(_temp);
                }
            });
        },

        loadAjaxData: function ( _offset ) {
            var _p = this,
                _els = _p.ajaxList;

            if ( _els.length === 0 ) {
                return;
            };

            $.each(_els, function ( _ix ) {
                var _sp = $(this),
                    _url = _sp.attr('lazyajaxurl'),
                    _pos = _sp.data('offset'),
                    _filter,
                    _temp;

                if ( typeof _pos === 'undefined' ) {
                    _pos = _sp.offset()[_offset];
                    _sp.data('offset', _pos);
                }

                if ( _p.isInside(_pos) && _url ) {
                    _filter = _p.callbackProp(_sp, 'lazyDataFilter') || Lazyload.DataFilter;

                    $.ajax({
                        'url': _url,
                        'success': function ( _res ) {
                            _res = $.parseJSON(_res);
                            _filter && (_res = _filter(_res));

                            //_p.trigger(Lazyload.Model.BEFORELOAD, [_res]);

                            if ( _res.errorno === 0 ) {
                                _sp.html( _res.data );
                            } else {
                                _sp.html( _res.errmsg );
                            }

                            _sp.data('loaded', true).removeData('offset').removeAttr('lazyajaxurl');
                            _temp = $.grep(_els, function(_el) {
                                return !$(_el).data('loaded');
                            });
                            
                            _p.imgList = $(_temp);
                        }
                    });
                }

            });
            
        },

        beforeLoad: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "beforeLoad";
 
            return _p.callbackProp(_selector, _key);
        },

        afterLoad: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "afterLoad";
 
            return _p.callbackProp(_selector, _key);
        }

    });
 
    JC.f.extendObject(Lazyload.View.prototype, {
        render: function () {
            var _p = this;
            _p._model.loadData();
        }
    });

    
    $(document).ready( function () {
        var _insAr = 0;
        Lazyload.autoInit
            && ( _insAr = Lazyload.init() );
        
    });


    return JC.Lazyload;

});}( typeof define === 'function' && define.amd ? define : 
        function (_name, _require, _cb) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
