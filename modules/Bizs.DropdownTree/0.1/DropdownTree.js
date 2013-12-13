;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC', 'JC.Tree' ], function(){
;(function($){
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
 *   | <a href='http://jc2.openjavascript.org/docs_api/classes/Bizs.DropdownTree.html' target='_blank'>API docs</a>
 *   | <a href='../../modules/Bizs.DropdownTree/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *<h2>页面只要引用本脚本, 默认会自动处理 div class="js_bizDropdownTree" </h2>
 *
 *<h2>可用的 HTML attribute</h2>
 *
 *<dl>
 *    <dt></dt>
 *    <dd><dd>
 *</dl> 
 *
 * @namespace window.Bizs
 * @class DropdownTree
 * @extends JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2013-12-13
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
        <h2>DropdownTree example</h2>
 */
    Bizs.DropdownTree = DropdownTree;
    window.ZINDEX_COUNT = window.ZINDEX_COUNT || 50001;

    function DropdownTree( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, DropdownTree ) ) 
            return JC.BaseMVC.getInstance( _selector, DropdownTree );

        JC.BaseMVC.getInstance( _selector, DropdownTree, this );

        this._model = new DropdownTree.Model( _selector );
        this._view = new DropdownTree.View( this._model );

        this._init();

        JC.log( DropdownTree.Model._instanceName, 'all inited', new Date().getTime() );
    }
    /**
     * 初始化可识别的 DropdownTree 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of DropdownTreeInstance}
     */
    DropdownTree.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector && _selector.length ){
                if( _selector.hasClass( 'js_bizDropdownTree' )  ){
                    _r.push( new DropdownTree( _selector ) );
                }else{
                    _selector.find( 'div.js_bizDropdownTree' ).each( function(){
                        _r.push( new DropdownTree( this ) );
                    });
                }
            }
            return _r;
        };

    BaseMVC.build( DropdownTree );

    JC.f.extendObject( DropdownTree.prototype, {
        _beforeInit:
            function(){
                JC.log( 'DropdownTree _beforeInit', new Date().getTime() );
            }
        , _initHanlderEvent:
            function(){
            }
        , _inited:
            function(){
                JC.log( 'DropdownTree _inited', new Date().getTime() );
            }
    });

    DropdownTree.Model._instanceName = 'DropdownTree';
    JC.f.extendObject( DropdownTree.Model.prototype, {
        init:
            function(){
                JC.log( 'DropdownTree.Model.init:', new Date().getTime() );
            }
    });

    JC.f.extendObject( DropdownTree.View.prototype, {
        init:
            function(){
                JC.log( 'DropdownTree.View.init:', new Date().getTime() );
            }
    });

    $(document).ready( function(){
        var _insAr = 0;
        DropdownTree.autoInit
            && ( _insAr = DropdownTree.init() )
            ;
    });

}(jQuery));
    return Bizs.DropdownTree;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
