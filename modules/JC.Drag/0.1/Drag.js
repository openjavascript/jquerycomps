;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
/**
 * JC.Drag 提供各种拖曳功能
 *
 *<p><b>require</b>:
 *   <a href="widnow.jQuery.html">jQuery</a>
 *   , <a href="JC.common.html">JC.common</a>
 *   , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 *</p>
 *
 *<p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *   | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.Drag.html' target='_blank'>API docs</a>
 *   | <a href='../../modules/JC.Drag/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *<h2>页面只要引用本脚本, 默认会处理 div class="js_compDrag"</h2>
 *
 *<h2>可用的 HTML attribute</h2>
 *
 *<dl>
 *    <dt></dt>
 *    <dd><dd>
 *</dl> 
 *
 * @namespace JC
 * @class Drag
 * @extends JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2013-12-26
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
        <h2>JC.Drag 示例</h2>
 */
    JC.Drag = Drag;

    function Drag( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, Drag ) ) 
            return JC.BaseMVC.getInstance( _selector, Drag );

        JC.BaseMVC.getInstance( _selector, Drag, this );

        this._model = new Drag.Model( _selector );
        this._view = new Drag.View( this._model );

        this._init();

        JC.log( Drag.Model._instanceName, 'all inited', new Date().getTime() );
    }
    /**
     * 初始化可识别的 Drag 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of DragInstance}
     */
    Drag.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector && _selector.length ){
                if( _selector.hasClass( 'js_compDrag' )  ){
                    _r.push( new Drag( _selector ) );
                }else{
                    _selector.find( 'div.js_compDrag, button.js_compDrag' ).each( function(){
                        _r.push( new Drag( this ) );
                    });
                }
            }
            return _r;
        };

    JC.BaseMVC.build( Drag );

    JC.f.extendObject( Drag.prototype, {
        _beforeInit:
            function(){
                JC.log( 'Drag _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this;

                _p.selector().on( 'mousedown', function( _evt ){
                    var _dragTarget = _p._model.dragTarget();
                    JC.log( 'Drag mousedown', new Date().getTime(), _dragTarget.css( 'position' ) );
                });
            }

        , _inited:
            function(){
                var _p = this;
                _p._model.defaultCSSPosition( _p._model.dragTarget().css( 'position' ) );
                
                JC.log( 'Drag _inited', new Date().getTime(), _p._model.defaultCSSPosition() );
            }
    });

    Drag.Model._instanceName = 'JCDrag';
    JC.f.extendObject( Drag.Model.prototype, {
        init:
            function(){
                JC.log( 'Drag.Model.init:', new Date().getTime() );
            }

        , defaultCSSPosition:
            function( _setter ){
                typeof _setter != 'undefined' && ( this._defaultCSSPosition = _setter );
                return this._defaultCSSPosition;
            }

        , dragTarget:
            function(){
                if( !this._dragTarget ){
                    this._dragTarget = this.selectorProp( 'dragTarget' );

                    !( this._dragTarget && this._dragTarget.length ) 
                        && ( this._dragTarget = this.selector() )
                        ;
                }
                return this._dragTarget;
            }
    });

    JC.f.extendObject( Drag.View.prototype, {
        init:
            function(){
                JC.log( 'Drag.View.init:', new Date().getTime() );
            }
    });

    /*
    $(document).ready( function(){
        var _insAr = 0;
        Drag.autoInit
            && ( _insAr = Drag.init() )
            ;
    });
    */
    $( document ).delegate( 'div.js_compDrag, button.js_compDrag', 'mouseover', function( _evt ){
        var _p = $( this ), _ins = JC.BaseMVC.getInstance( _p, Drag );
        !_ins && ( _ins = new Drag( _p ) );
    });

    $( document ).delegate( 'div.js_compDrag, button.js_compDrag', 'mousedown', function( _evt ){
        return false;
    });

    return JC.Drag;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
