//TODO: 支持 或 忽略 多选下拉框
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
        <form method="get" action="" class="js_compFormFillUrl" charset="utf-8" >
        </form>
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
    JC.Form && ( JC.Form.initAutoFill = FormFillUrl.init );
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

                    if( !_p._model.formtoken() ) return;

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

        , formtoken:
            function(){
                var _p = this, _r = true;
                if( JC.f.hasUrlParam( _p.url(), 'formtoken' ) ){
                    var _item = _p.selector().find( '[name=formtoken]' );
                    if( !_item.length ) return false;

                    if( _item.val() != JC.f.getUrlParam( _p.url(), 'formtoken' ) ){
                        return false;
                    }
                }
                return _r;
            }

        , fillForm:
            function( _selector, _url ){
                this.fillItems( _selector, _url );
            }

        , fillItems:
            function( _selector, _url ){
                _selector = $( _selector || this.selector() );

                var _p = this
                    , _controls = []
                    , _params
                    ;

                _url = _url || _p.url();
                _params = _p.urlParams( _url, _p.decoder() );

                _selector.find( '[name]' ).each( function( _ix, _item ){
                    _item = $( _item );
                    switch( ( _item.prop( 'nodeName' ) || '' ).toLowerCase() ){
                        case 'input':
                        case 'select':
                        case 'textarea':
                            _controls.push( _item );
                            break;
                    }
                });

                $.each( _params, function( _k, _vals ){
                    //alert( [ _k,  _items ] );
                    var _findControls = [], _isCheck;
                    $.each( _controls, function( _ix, _item ){
                        _item.attr( 'name' ) == _k && ( _findControls.push( _item ) );
                    });

                    if( !_findControls.length ) return;

                    $.each( _findControls, function( _ix, _item ){
                        var _nt = ( _item.prop( 'nodeName' ) ).toLowerCase()
                            , _type = ( _item.attr( 'type' ) || 'text' ).toLowerCase()
                            ;

                        JC.log( _nt, _type );

                        if( /input/i.test( _nt ) ){
                            switch( _type ){
                                case 'radio':
                                case 'checkbox':
                                    _isCheck = true;
                                    break;

                                default: 
                                    _p._updateInputVal( _item, _vals, _ix );
                                    break;
                            }
                        }else if( /textarea/i.test( _nt ) ){
                            _p._updateInputVal( _item, _vals, _ix );
                        }else if( /select/i.test( _nt ) ){
                            _p._updateSelect( _item, _vals, _ix );
                        }
                    });

                    if( _isCheck ){
                        _p._updateInputChecked( _findControls, _vals );
                    }
                });

                window.JC.f.jcAutoInitComps && JC.f.jcAutoInitComps( _selector );
            }

        , _updateSelect:
            function( _item, _vals, _ix ){
                var _val = _vals[ _ix ] || '';
                if( FormFillUrl.selectHasVal( _item, _val ) ){
                    _item.removeAttr('selectIgnoreInitRequest');
                    _item.val( _val );
                }else{
                    _item.attr( 'selectvalue', _val );
                }
            }

        , _updateInputVal:
            function( _item, _vals, _ix ){
                _item.val( _vals[ _ix ] || '' );
            }

        , _updateInputChecked:
            function( _controls, _vals ){
                $.each( _controls, function( _ix, _item ){
                    var _type = ( _item.attr( 'type' ) || 'text' ).toLowerCase(), _find;
                    if( !( _type == 'checkbox' || _type == 'radio' ) ) return;
                    $.each( _vals, function( _six, _sitem ){
                        _item.val() == _sitem  && ( _find = true );
                    });
                    _find ? _item.prop( 'checked', true ) : _item.prop( 'checked', false );
                });
            }

        , urlParams: 
            function( _url, _decoder ){
                var _r = {}, _re = /[\+]/g;
                _decoder = _decoder || decodeURIComponent;
                if( _url ){
                    _url = _url.split( /[?]+/ );
                    _url.shift();

                    if( !_url.length ) return _r;
                    _url = _url[ 0 ];

                    _url = _url.split( '&' );
                    $.each( _url, function( _ix, _item ){
                        if( !_item ) return;
                        var _sitem = _item.split( '=' );
                        if( !_sitem[0] ) return;
                        _sitem[ 0 ] = ( _sitem[ 0 ] || '' ).replace( _re, ' ' );
                        try{ _sitem[ 0 ] = _decoder( _sitem[ 0 ] ); }catch( ex ){}
                        !( _sitem[0] in _r ) && ( _r[ _sitem[0] ] = [] );
                        _r[ _sitem[0] ].push( _decoder( ( _sitem[ 1 ] || '' ).replace( _re, ' ' ) ) );
                    });
                }
                return _r;
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
