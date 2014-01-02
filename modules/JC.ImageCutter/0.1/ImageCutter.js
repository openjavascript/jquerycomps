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
 *   | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.ImageCutter.html' target='_blank'>API docs</a>
 *   | <a href='../../modules/JC.ImageCutter/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *<h2>页面只要引用本脚本, 默认会处理 div class="js_compImageCutter"</h2>
 *
 *<h2>可用的 HTML attribute</h2>
 *
 *<dl>
 *    <dt></dt>
 *    <dd><dd>
 *</dl> 
 *
 * @namespace   JC
 * @class       ImageCutter
 * @extends     JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2013-12-13
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
        <h2>JC.ImageCutter 示例</h2>
 */
    var _jdoc = $( document ), _jwin = $( window );

    JC.ImageCutter = ImageCutter;

    function ImageCutter( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, ImageCutter ) ) 
            return JC.BaseMVC.getInstance( _selector, ImageCutter );

        JC.BaseMVC.getInstance( _selector, ImageCutter, this );

        this._model = new ImageCutter.Model( _selector );
        this._view = new ImageCutter.View( this._model );

        this._init();

        JC.log( ImageCutter.Model._instanceName, 'all inited', new Date().getTime() );
    }
    /**
     * 初始化可识别的 ImageCutter 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of ImageCutterInstance}
     */
    ImageCutter.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector.length ){
                if( _selector.hasClass( 'js_compImageCutter' )  ){
                    _r.push( new ImageCutter( _selector ) );
                }else{
                    _selector.find( 'div.js_compImageCutter' ).each( function(){
                        _r.push( new ImageCutter( this ) );
                    });
                }
            }
            return _r;
        };

    JC.BaseMVC.build( ImageCutter );

    JC.f.extendObject( ImageCutter.prototype, {
        _beforeInit:
            function(){
                JC.log( 'ImageCutter _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
            }

        , _inited:
            function(){
                JC.log( 'ImageCutter _inited', new Date().getTime() );
            }
    });

    ImageCutter.Model._instanceName = 'JCImageCutter';
    JC.f.extendObject( ImageCutter.Model.prototype, {
        init:
            function(){
                JC.log( 'ImageCutter.Model.init:', new Date().getTime() );
            }
    });

    JC.f.extendObject( ImageCutter.View.prototype, {
        init:
            function(){
                JC.log( 'ImageCutter.View.init:', new Date().getTime() );
            }
    });

    _jdoc.ready( function(){
        var _insAr = 0;
        ImageCutter.autoInit
            && ( _insAr = ImageCutter.init() )
            && $( '<h2>ImageCutter total ins: ' 
                + _insAr.length + '<br/>' + new Date().getTime() + '</h2>' ).appendTo( document.body )
            ;
    });

    return JC.ImageCutter;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
