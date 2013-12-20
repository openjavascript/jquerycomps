;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
;(function($){
    /**
     * 应用场景
     * <br /><b>ISP 缓存问题 引起的用户串号</b>
     * <br />ajax 或者动态添加的内容, 请显式调用  JC.KillISPCache.getInstance().process( newNodeContainer )
     * <br /><b>这是个单例类</b>
     * <p><b>require</b>: 
     *      <a href='.jQuery.html'>jQuery</a>
     *      , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
     * </p>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc.openjavascript.org/docs_api/classes/window.Bizs.KillISPCache.html' target='_blank'>API docs</a>
     * | <a href='../../bizs/KillISPCache/_demo' target='_blank'>demo link</a></p>
     *
     * <h2>页面只要引用本文件, 默认会自动初始化 KillISPCache 逻辑</h2>
     * <dl>
     *      <dt>影响到的地方: </dt>
     *      <dd>每个 a node 会添加 isp 参数</dd>
     *      <dd>每个 form node 会添加 isp 参数</dd>
     *      <dd>每个 ajax get 请求会添加 isp 参数</dd>
     * </dl>
     * @namespace       window.Bizs
     * @class           KillISPCache
     * @extends         JC.BaseMVC
     * @constructor 
     * @version dev 0.1 2013-09-07
     * @author  qiushaowei   <suches@btbtd.org> | 75 Team
     * @example
     *      <script>
     *      //动态添加的内容需要显式调用 process 方法去处理相关逻辑
     *      $.get( _url, function( _html ){
     *          var _node = $(_html);
     *          _node.appendTo( document.body );
     *          JC.KillISPCache.getInstance().process( _node );
     *      });
     *      </script>
     */
    window.Bizs = window.Bizs || {};
    Bizs.KillISPCache = KillISPCache;

    function KillISPCache( _selector ){
        if( KillISPCache._instance ) return KillISPCache._instance;

        this._model = new KillISPCache.Model( _selector );

        this._init();
    }

    KillISPCache.prototype = {
        _beforeInit:
            function(){
                JC.log( 'KillISPCache._beforeInit', new Date().getTime() );
                this._model.processAjax();
            }
        /**
         * 处理 _selector 的所有 child
         * @method  process
         * @param   {selector}  _selector
         * @param   {bool}      _ignoreSameLinkText
         * @return  {KillISPCacheInstance}
         */
        , process:
            function( _selector, _ignoreSameLinkText ){
                _selector && ( _selector = $( _selector ) );
                if( !( _selector && _selector.length ) ) return;
                var _p = this;
                _p._model.ignoreSameLinkText( _ignoreSameLinkText );
                _p._model.selector( _selector );
                _p._model.processLink();
                _p._model.processForm();
                return this;
            }
        , ignoreUrl:
            function( _url ){
                return this._model.ignoreUrl( _url );
            }
        , ignoreSelector:
            function( _selector ){
                return this._model.ignoreSelector( _selector );
            }
    };
    /**
     * 获取 KillISPCache 实例 ( 单例模式 )
     * @method getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {KillISPCacheInstance}
     */
    KillISPCache.getInstance = 
        function(){
            !KillISPCache._instance && ( KillISPCache._instance = new KillISPCache() );
            return KillISPCache._instance;
        }
    /**
     * 是否忽略 url 跟 文本 相同的节点
     * @property    ignoreSameLinkText
     * @type        bool
     * @default     true
     * @static
     */
    KillISPCache.ignoreSameLinkText = true;
    /**
     * 自定义随机数的参数名
     * @property    randName
     * @type        string
     * @default     empty
     * @static
     */
    KillISPCache.randName = "";
    /**
     * 添加忽略随机数的 ULR
     * @method      ignoreUrl
     * @param       {string|Array}  _url
     * return       Array
     * @static
     */
    KillISPCache.ignoreUrl =
        function( _url ){
            return KillISPCache.getInstance().ignoreUrl( _url );
        };
    /**
     * 添加忽略随机数的 选择器
     * @method      ignoreSelector
     * @param       {selector|Array}  _selector
     * return       Array
     * @static
     */
    KillISPCache.ignoreSelector =
        function( _selector ){
            return KillISPCache.getInstance().ignoreSelector( _selector );
        };

    JC.BaseMVC.buildModel( KillISPCache );

    KillISPCache.Model.prototype = {
        init:
            function(){
                this._postfix = JC.f.printf( '{0}_{1}_'
                                        , new Date().getTime().toString()
                                        , Math.round( Math.random() * 100000 )
                                    );
                this._count = 1;
                this._ignoreSameLinkText = true;
                this._randName = 'isp';

                this._ignoreUrl = [];
                this._ignoreSelector = [];
            }

        , ignoreUrl:
            function( _url ){
                if( typeof _url == 'string' ){
                    _url = _url.split(',');
                }

                _url 
                    && _url.length 
                    && ( this._ignoreUrl = this._ignoreUrl.concat( _url ) )
                    ;

                return this._ignoreUrl;
            }

        , ignoreSelector:
            function( _selector ){
                if( typeof _selector == 'string' ){
                    _selector = _selector.split(',');
                }

                _selector 
                    && _selector.length 
                    && ( this._ignoreSelector = this._ignoreSelector.concat( _selector ) )
                    ;

                return this._ignoreSelector;
            }

        , processLink:
            function(){
                var _p = this;
                this.selector().find('a[href]').each(function(){
                    var _sp = $(this), _url = (_sp.attr('href')||'').trim(), _text = _sp.html().trim();
                    if( /javascript\:/.test( _url ) || /^[\s]*\#/.test( _url ) ) return;
                    
                    if( _p.ignoreSameLinkText() && _url.trim() == _sp.html().trim() ) return;

                    var _selectors = _p.ignoreSelector(), _ignore = false;
                    $.each( _selectors, function( _ix, _selector ){
                        if( _sp.is( _selector ) ){
                            _ignore = true;
                            return false;
                        }
                    });

                    if( _ignore ) return;

                    _url = JC.f.addUrlParams( _url, _p.keyVal() );
                    _sp.attr( 'href', _url );
                    _sp.html( _text );
                });

            }
        , processForm:
            function(){
                var _p = this;
                this.selector().find('form').each(function(){
                    var _sp = $( this ), _method = ( _sp.prop('method') || '' ).toLowerCase();
                    if( _method == 'post' ) return;

                    var _selectors = _p.ignoreSelector(), _ignore = false;
                    $.each( _selectors, function( _ix, _selector ){
                        if( _sp.is( _selector ) ){
                            _ignore = true;
                            return false;
                        }
                    });

                    if( _ignore ) return;

                    if( !_sp.find('input[name=' + _p.randName() + ']').length ){
                        $( '<input type="hidden" name="' + _p.randName() + '" value="'+ _p.postfix() +'" >' ).appendTo( _sp );
                    }
                });
            }
        , processAjax:
            function(){
                var _p = this;
                $(document).ajaxSend(function( _event, _jqxhr, _settings) {
                    if( _settings.type == 'POST' ) return;
                    var _urls = _p.ignoreUrl(), _ignore = false;
                    $.each( _urls, function( _ix, _url ){
                        var _len = _url.length
                            , _compare = _settings.url.slice( 0, _len );
                            ;
                        if( _url.toLowerCase() == _compare.toLowerCase() ){
                            _ignore = true;
                        }
                    });
                    !_ignore && ( _settings.url = JC.f.addUrlParams( _settings.url, _p.keyVal() ) );
                });
            }
        , ignoreSameLinkText:
            function( _setter ){
                typeof _setter != 'undefined' && ( KillISPCache.ignoreSameLinkText = _setter );
                return KillISPCache.ignoreSameLinkText;
            }
        , postfix: function(){ return this._postfix + ( this._count++ ); }
        , randName:
            function(){
                return KillISPCache.randName || this._randName;
            }
        , keyVal:
            function(){
                var _o = {}; _o[ this.randName() ] = this.postfix();
                return _o;
            }

    };

    JC.BaseMVC.build( KillISPCache, 'Bizs' );

    $(document).ready( function(){
        setTimeout( function(){
            KillISPCache.autoInit 
                && KillISPCache.getInstance().process( $(document) );
        }, 100 );
    });

}(jQuery));
    return Bizs.KillISPCache;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
