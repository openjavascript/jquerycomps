;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
/**
 * 组件用途简述
 *
 *  <p><b>require</b>:
 *      <a href="widnow.jQuery.html">jQuery</a>
 *      , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 *  </p>
 *
 *  <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *      | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.DragSelect.html' target='_blank'>API docs</a>
 *      | <a href='../../modules/JC.DragSelect/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *  <h2>页面只要引用本脚本, 默认会处理 div class="js_compDragSelect"</h2>
 *
 *  <h2>可用的 HTML attribute</h2>
 *
 *  <dl>
 *      <dt></dt>
 *      <dd><dd>
 *  </dl> 
 *
 * @namespace   JC
 * @class       DragSelect
 * @extends     JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2013-12-13
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
        <h2>JC.DragSelect 示例</h2>
 */
    var _jdoc = $( document ), _jwin = $( window );

    JC.DragSelect = DragSelect;

    function DragSelect( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, DragSelect ) ) 
            return JC.BaseMVC.getInstance( _selector, DragSelect );

        JC.BaseMVC.getInstance( _selector, DragSelect, this );

        this._model = new DragSelect.Model( _selector );
        this._view = new DragSelect.View( this._model );

        this._init();

        JC.log( DragSelect.Model._instanceName, 'all inited', new Date().getTime() );
    }
    /**
     * 初始化可识别的 DragSelect 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of DragSelectInstance}
     */
    DragSelect.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector.length ){
                if( _selector.hasClass( 'js_compDragSelect' )  ){
                    _r.push( new DragSelect( _selector ) );
                }else{
                    _selector.find( 'div.js_compDragSelect' ).each( function(){
                        _r.push( new DragSelect( this ) );
                    });
                }
            }
            return _r;
        };

    JC.BaseMVC.build( DragSelect );

    JC.f.extendObject( DragSelect.prototype, {
        _beforeInit:
            function(){
                JC.log( 'DragSelect _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this;

                _p.on( 'inited', function(){
                });
            }

        , _inited:
            function(){
                JC.log( 'DragSelect _inited', new Date().getTime() );
                this.trigger( 'inited' );
            }
    });

    DragSelect.Model._instanceName = 'JCDragSelect';
    JC.f.extendObject( DragSelect.Model.prototype, {
        init:
            function(){
                JC.log( 'DragSelect.Model.init:', new Date().getTime() );
            }
    });

    JC.f.extendObject( DragSelect.View.prototype, {
        init:
            function(){
                JC.log( 'DragSelect.View.init:', new Date().getTime() );
            }
    });

    _jdoc.ready( function(){
        DragSelect.autoInit && DragSelect.init();
    });

    return JC.DragSelect;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
