;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
/**
 * 组件用途简述
 *
 *<p><b>require</b>:
 *   <a href="widnow.jQuery.html">jQuery</a>
 *   , <a href="JC.common.html">JC.common</a>
 *   , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 *</p>
 *
 *<p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *   | <a href='http://jc2.openjavascript.org/docs_api/classes/Bizs.BizExampleMoreAdvance.html' target='_blank'>API docs</a>
 *   | <a href='../../modules/Bizs.BizExampleMoreAdvance/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *<h2>页面只要引用本脚本, 默认会自动处理 div class="js_bizBizExampleMoreAdvance" </h2>
 *
 *<h2>可用的 HTML attribute</h2>
 *
 *<dl>
 *    <dt></dt>
 *    <dd><dd>
 *</dl> 
 *
 * @namespace window.Bizs
 * @class BizExampleMoreAdvance
 * @extends JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2013-12-13
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
        <h2>Bizs.BizExampleMoreAdvance 示例</h2>
 */
    Bizs.BizExampleMoreAdvance = BizExampleMoreAdvance;

    function BizExampleMoreAdvance( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, BizExampleMoreAdvance ) ) 
            return JC.BaseMVC.getInstance( _selector, BizExampleMoreAdvance );

        JC.BaseMVC.getInstance( _selector, BizExampleMoreAdvance, this );

        this._model = new BizExampleMoreAdvance.Model( _selector );
        this._view = new BizExampleMoreAdvance.View( this._model );

        this._init();

        JC.log( BizExampleMoreAdvance.Model._instanceName, 'all inited', new Date().getTime() );
    }
    /**
     * 初始化可识别的 BizExampleMoreAdvance 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of BizExampleMoreAdvanceInstance}
     */
    BizExampleMoreAdvance.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector && _selector.length ){
                if( _selector.hasClass( 'js_bizBizExampleMoreAdvance' )  ){
                    _r.push( new BizExampleMoreAdvance( _selector ) );
                }else{
                    _selector.find( 'div.js_bizBizExampleMoreAdvance' ).each( function(){
                        _r.push( new BizExampleMoreAdvance( this ) );
                    });
                }
            }
            return _r;
        };

    JC.BaseMVC.build( BizExampleMoreAdvance );

    JC.f.extendObject( BizExampleMoreAdvance.prototype, {
        _beforeInit:
            function(){
                JC.log( 'BizExampleMoreAdvance _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
            }

        , _inited:
            function(){
                JC.log( 'BizExampleMoreAdvance _inited', new Date().getTime() );
            }
    });

    BizExampleMoreAdvance.Model._instanceName = 'JCBizExampleMoreAdvance';
    JC.f.extendObject( BizExampleMoreAdvance.Model.prototype, {
        init:
            function(){
                JC.log( 'BizExampleMoreAdvance.Model.init:', new Date().getTime() );
            }
    });

    JC.f.extendObject( BizExampleMoreAdvance.View.prototype, {
        init:
            function(){
                JC.log( 'BizExampleMoreAdvance.View.init:', new Date().getTime() );
            }
    });

    $(document).ready( function(){
        var _insAr = 0;
        BizExampleMoreAdvance.autoInit
            && ( _insAr = BizExampleMoreAdvance.init() )
            && $( '<h2>BizExampleMoreAdvance total ins: ' 
                + _insAr.length + '<br/>' + new Date().getTime() + '</h2>' ).appendTo( document.body )
            ;
    });

    return Bizs.BizExampleMoreAdvance;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
