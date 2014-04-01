;(function(define, _win) { 'use strict'; define( [ 'JC.AutoComplete' ], function(){
/**
 * 组件用途简述
 *
 *<p><b>require</b>:
 *   <a href="widnow.jQuery.html">jQuery</a>
 *   , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 *</p>
 *
 *<p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *   | <a href='http://jc2.openjavascript.org/docs_api/classes/Bizs.MultiAutoComplete.html' target='_blank'>API docs</a>
 *   | <a href='../../modules/Bizs.MultiAutoComplete/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *<h2>页面只要引用本脚本, 默认会自动处理 div class="js_bizMultiAutoComplete" </h2>
 *
 *<h2>可用的 HTML attribute</h2>
 *
 *<dl>
 *    <dt></dt>
 *    <dd><dd>
 *</dl> 
 *
 * @namespace   window.Bizs
 * @class       MultiAutoComplete
 * @extends     JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2013-12-13
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
        <h2>Bizs.MultiAutoComplete 示例</h2>
 */
    var _jdoc = $( document ), _jwin = $( window );

    Bizs.MultiAutoComplete = MultiAutoComplete;

    function MultiAutoComplete( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, MultiAutoComplete ) ) 
            return JC.BaseMVC.getInstance( _selector, MultiAutoComplete );

        JC.BaseMVC.getInstance( _selector, MultiAutoComplete, this );

        this._model = new MultiAutoComplete.Model( _selector );
        this._view = new MultiAutoComplete.View( this._model );

        this._init();

        JC.log( MultiAutoComplete.Model._instanceName, 'all inited', new Date().getTime() );
    }
    /**
     * 初始化可识别的 MultiAutoComplete 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of MultiAutoCompleteInstance}
     */
    MultiAutoComplete.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector.length ){
                if( _selector.hasClass( 'js_bizMultiAutoComplete' )  ){
                    _r.push( new MultiAutoComplete( _selector ) );
                }else{
                    _selector.find( 'div.js_bizMultiAutoComplete' ).each( function(){
                        _r.push( new MultiAutoComplete( this ) );
                    });
                }
            }
            return _r;
        };

    JC.BaseMVC.build( MultiAutoComplete );

    JC.f.extendObject( MultiAutoComplete.prototype, {
        _beforeInit:
            function(){
                //JC.log( 'MultiAutoComplete _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this;

                _p.on( 'inited' , function(){
                });
            }

        , _inited:
            function(){
                //JC.log( 'MultiAutoComplete _inited', new Date().getTime() );
                this.trigger( 'inited' );
            }
    });

    MultiAutoComplete.Model._instanceName = 'JCMultiAutoComplete';
    JC.f.extendObject( MultiAutoComplete.Model.prototype, {
        init:
            function(){
                //JC.log( 'MultiAutoComplete.Model.init:', new Date().getTime() );
            }
    });

    JC.f.extendObject( MultiAutoComplete.View.prototype, {
        init:
            function(){
                //JC.log( 'MultiAutoComplete.View.init:', new Date().getTime() );
            }
    });

    _jdoc.ready( function(){
        MultiAutoComplete.autoInit && MultiAutoComplete.init();
    });

    return Bizs.MultiAutoComplete;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
