 ;(function(define, _win) { 'use strict'; define( [ 'JC.AjaxUpload' ], function(){
/**
 * 组件用途简述
 *
 *<p><b>require</b>:
 *   <a href="widnow..jQuery.html">jQuery</a>
 *   , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 *</p>
 *
 *<p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *   | <a href='http://jc2.openjavascript.org/docs_api/classes/Bizs.MultiUpload.html' target='_blank'>API docs</a>
 *   | <a href='../../modules/Bizs.MultiUpload/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *<h2>页面只要引用本脚本, 默认会自动处理 div class="js_bizMultiUpload" </h2>
 *
 *<h2>可用的 HTML attribute</h2>
 *
 *<dl>
 *    <dt></dt>
 *    <dd><dd>
 *</dl> 
 *
 * @namespace window.Bizs
 * @class MultiUpload
 * @extends JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2013-12-13
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
        <h2>Bizs.MultiUpload 示例</h2>
 */
    Bizs.MultiUpload = MultiUpload;

    function MultiUpload( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, MultiUpload ) ) 
            return JC.BaseMVC.getInstance( _selector, MultiUpload );

        JC.BaseMVC.getInstance( _selector, MultiUpload, this );

        this._model = new MultiUpload.Model( _selector );
        this._view = new MultiUpload.View( this._model );

        this._init();

        JC.log( MultiUpload.Model._instanceName, 'all inited', new Date().getTime() );
    }
    /**
     * 初始化可识别的 MultiUpload 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of MultiUploadInstance}
     */
    MultiUpload.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector && _selector.length ){
                if( _selector.hasClass( 'js_bizMultiUpload' )  ){
                    _r.push( new MultiUpload( _selector ) );
                }else{
                    _selector.find( 'div.js_bizMultiUpload' ).each( function(){
                        _r.push( new MultiUpload( this ) );
                    });
                }
            }
            return _r;
        };

    BaseMVC.build( MultiUpload );

    JC.f.extendObject( MultiUpload.prototype, {
        _beforeInit:
            function(){
                JC.log( 'MultiUpload _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
            }

        , _inited:
            function(){
                JC.log( 'MultiUpload _inited', new Date().getTime() );
            }
    });

    MultiUpload.Model._instanceName = 'MultiUpload';
    JC.f.extendObject( MultiUpload.Model.prototype, {
        init:
            function(){
                JC.log( 'MultiUpload.Model.init:', new Date().getTime() );
            }
    });

    JC.f.extendObject( MultiUpload.View.prototype, {
        init:
            function(){
                JC.log( 'MultiUpload.View.init:', new Date().getTime() );
            }
    });

    $(document).ready( function(){
        var _insAr = 0;
        MultiUpload.autoInit
            && ( _insAr = MultiUpload.init() )
            ;
    });

    return Bizs.MultiUpload;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
