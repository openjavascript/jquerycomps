;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
/**
 * FormFillUrl 表单自动填充 URL 参数
 *
 *<p><b>require</b>:
 *   <a href="widnow.jQuery.html">jQuery</a>
 *   , <a href="JC.common.html">JC.common</a>
 *   , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 *</p>
 *
 *<p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *   | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.FormFillUrl.html' target='_blank'>API docs</a>
 *   | <a href='../../modules/JC.FormFillUrl/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *<h2>页面只要引用本脚本, 默认会处理 form class="js_compFormFillUrl"</h2>
 *
 *<h2>Form 可用的 HTML attribute</h2>
 *
 *<dl>
 *    <dt>decoder = function, default = decodeURIComponent</dt>
 *    <dd>URL 的解码函数<dd>
 *
 *    <dt>encoder = function, default = encodeURIComponent</dt>
 *    <dd>URL 的编码码函数<dd>
 *</dl> 
 *
 * @namespace   JC
 * @class       FormFillUrl
 * @extends     JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2014-01-19
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
        <h2>JC.FormFillUrl 示例</h2>
 */
    var _jdoc = $( document );

    JC.FormFillUrl = FormFillUrl;

    function FormFillUrl( _selector, _url ){
        _selector && ( _selector = $( _selector ) );
        _url = _url || location.href;

        if( JC.BaseMVC.getInstance( _selector, FormFillUrl ) ) 
            return JC.BaseMVC.getInstance( _selector, FormFillUrl );

        JC.BaseMVC.getInstance( _selector, FormFillUrl, this );

        this._model = new FormFillUrl.Model( _selector );
        this._model.url( _url );

        this._init();

        JC.log( FormFillUrl.Model._instanceName, 'all inited', new Date().getTime() );
    }
    /**
     * 初始化可识别的 FormFillUrl 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of FormFillUrlInstance}
     */
    FormFillUrl.init =
        function( _selector, _url ){
            var _r = [];
            _selector = $( _selector || document );
            _url = _url || location.href;

            if( _selector.length ){
                if( _selector.prop( 'nodeName' ).toLowerCase() == 'form' ){
                    _r.push( new FormFillUrl( _selector, _url ) );
                }else{
                    var _frms = _selector.find( 'form.js_compFormFillUrl, form.js_autoFillUrlForm' );

                    _frms.each( function(){
                        _r.push( new FormFillUrl( this, _url ) );
                    });

                    if( !_frms.length ){
                        _r.push( new FormFillUrl( _selector, _url ) );
                    }
                }
            }
            return _r;
        };

    /**
     * 自定义 URI decode 函数
     * @property    decoder
     * @type        function
     * @default     decodeURIComponent
     * @static
     */
    FormFillUrl.decoder = decodeURIComponent;

    /**
     * 自定义 URI encode 函数
     * @property    encoder
     * @type        function
     * @default     encodeURIComponent
     * @static
     */
    FormFillUrl.encoder = encodeURIComponent;

    /**
     * 判断下拉框的option里是否有给定的值
     * @method  selectHasVal
     * @param   {selector}  _select
     * @param   {string}    _val    要查找的值
     * @static
     */
    FormFillUrl.selectHasVal =
        function( _select, _val ){
            _select = $( _select );
            var _r = false, _val = _val.toString();
            _select.find('option').each( function(){
                var _tmp = $(this);
                if( _tmp.val() == _val ){
                    _r = true;
                    return false;
                }
            });
            return _r;
        };

    JC.BaseMVC.build( FormFillUrl );

    JC.f.extendObject( FormFillUrl.prototype, {
        _beforeInit:
            function(){
                //JC.log( 'FormFillUrl _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this;

                _p.on( FormFillUrl.Model.INITED, function( _evt ){
                    _p.trigger( FormFillUrl.Model.PROCESS );
                });

                _p.on( FormFillUrl.Model.PROCESS, function( _evt, _selector, _url ){
                    _selector && _p._model.selector( _selector );
                    _url && _p._model.url( _url );

                    _p._model.selector().prop( 'nodeName' ).toLowerCase() == 'form'
                        ? _p._model.fillForm()
                        : _p._model.fillItems()
                        ;
                });
            }

        , _inited:
            function(){
                //JC.log( 'FormFillUrl _inited', new Date().getTime() );
                this.trigger( FormFillUrl.Model.INITED );
            }
        /**
         * 手动填充 URL 值
         * @method fill
         * @param   {selector}  _selector
         * @param   {string}    _url
         * @return  FormFillUrlInstance
         */
        , fill:
            function( _selector, _url ){
                _selector && ( _selector = $( _selector ) );
                if( !( _selector && _selector.length && _url ) ) return this;
                _p.trigger( FormFillUrl.Model.PROCESS, [ _selector, _url ] );
                return this;
            }

    });

    FormFillUrl.Model._instanceName = 'JCFormFillUrl';
    FormFillUrl.Model.INITED = 'inited';
    FormFillUrl.Model.PROCESS = 'process';

    JC.f.extendObject( FormFillUrl.Model.prototype, {
        init:
            function(){
                //JC.log( 'FormFillUrl.Model.init:', new Date().getTime() );
            }

        , url:
            function( _url ){
                typeof _url != 'undefined' && ( this._url = _url );
                return this._url;
            }

        , fillForm:
            function( _selector, _url ){
                this.fillItems( _selector, _url );
            }

        , fillItems:
            function( _selector, _url ){
                var _p = this;

                _selector = $(_selector || _p.selector() );
                _url = _url || _p.url();

                _p._fillInput( _selector, _url );
                _p._fillSpecialInput( _selector, _url );
                _p._fillSelect( _selector, _url );

                window.JC.f.jcAutoInitComps && JC.f.jcAutoInitComps( _selector );
            }
        
        , _fillInput:
            function( _selector, _url ){
                var _p = this
                    , _keyObj = {}
                    , _selectors = _selector.find( 'input[type=text][name],input[type=password][name],textarea[name]' )
                    ;

                _selectors.each( function(){
                    var _sp = $(this)
                        , _key = _sp.attr('name').trim()
                        , _encodeKey = _p.encoder()( _key )
                        , _items
                        ;

                    if( !( _key in _keyObj ) && ( JC.f.hasUrlParam( _url, _key ) || JC.f.hasUrlParam( _url, _encodeKey ) ) ){
                        _items = JC.f.getUrlParams( _url, _key );
                        !( _items && _items.length ) && ( _items = JC.f.getUrlParams( _url, _encodeKey ) );

                        if( !( _items && _items.length ) ) return;

                        _keyObj[ _key ] = {
                            'items': _items
                        };
                    }
                });

                for( var k in _keyObj ){
                    var _item = _keyObj[ k ], _items = [];

                    _selectors.each( function(_ix, _item){
                        _item = $( _item );
                        _item.attr( 'name' ) == k && _items.push( _item );
                    });

                    $.each( _items, function( _ix, _sitem ){
                        _sitem.val( _p.decoder()( _p.fixSpace( _item.items[ _ix ] ) ) );
                    });
                }
            }

        , fixSpace: function( _v ){ return ( _v || '' ).replace(/[\+]/g, ' ' ); }

        , _fillSpecialInput:
            function( _selector, _url ){
                var _p = this, _keyObj = {};

                _selector.find( 'input[type=checkbox][name], input[type=radio][name]' ).each( function(){
                    var _sp = $(this)
                        , _key = _sp.attr('name').trim()
                        , _encodeKey = _p.encoder()( _key )
                        , _keys
                        , _v = _sp.val();

                    if( !( _key in _keyObj ) ){
                        _keys = JC.f.getUrlParams( _url, _key );
                        !( _keys && _keys.length ) && ( _keys = JC.f.getUrlParams( _encodeKey ) );

                        _keyObj[ _key ] = _keys;
                    }else{
                        _keys = _keyObj[ _key ];
                    }

                    if( _keys && _keys.length ){
                        $.each( _keys, function( _ix, _item ){
                            if( _item == _v ){
                                _sp.prop('checked', true);
                                _sp.trigger('change');
                            }
                        });
                    }
                });
            }

        , _fillSelect:
            function( _selector, _url ){
                var _p = this
                    , _keyObj = {}
                    , _selectors = _selector.find( 'select[name]' )
                    ;

                _selectors.each( function(){
                    var _sp = $(this)
                        , _key = _sp.attr('name').trim()
                        , _encodeKey = _p.encoder()( _key )
                        , _items
                        ;

                    if( !( _key in _keyObj ) && ( JC.f.hasUrlParam( _url, _key ) || JC.f.hasUrlParam( _url, _encodeKey ) ) ){
                        _items = JC.f.getUrlParams( _url, _key );
                        !( _items && _items.length ) && ( _items = JC.f.getUrlParams( _url, _encodeKey ) );

                        if( !( _items && _items.length ) ) return;

                        _keyObj[ _key ] = {
                            'items': _items
                        };
                    }
                });

                for( var k in _keyObj ){
                    var _item = _keyObj[ k ], _items = [];

                    _selectors.each( function(_ix, _item){
                        _item = $( _item );
                        _item.attr( 'name' ) == k && _items.push( _item );
                    });

                    $.each( _items, function( _ix, _sitem ){
                        //_sitem.val( _p.decoder()( _p.fixSpace( _item.items[ _ix ] ) ) );
                        var _val = _p.decoder()( _p.fixSpace( _item.items[ _ix ] ) );

                        if( FormFillUrl.selectHasVal( _sitem, _val ) ){
                            _sitem.removeAttr('selectIgnoreInitRequest');
                            _sitem.val( _val );
                        }else{
                            _sitem.attr( 'selectvalue', _val );
                        }
                    });
                }
            }

        , decoder: function(){ return this.callbackProp( 'decoder' ) || FormFillUrl.decoder; }
        , encoder: function(){ return this.callbackProp( 'encoder' ) || FormFillUrl.encoder; }
    });

    _jdoc.ready( function(){
        FormFillUrl.autoInit 
            && JC.f.safeTimeout( function(){ FormFillUrl.init(); }, null, 'JCFormFillUrl', 50 );
    });

    return JC.FormFillUrl;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
