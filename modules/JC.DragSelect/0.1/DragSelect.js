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
 * @version dev 0.1 2014-05-09
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

    DragSelect.RECT =
        function(){
            if( !( DragSelect._RECT && DragSelect._RECT.length ) ){
                DragSelect._RECT = $( DragSelect.RECT_TPL );
                DragSelect._RECT.appendTo( document.body );
            }
            return DragSelect._RECT;
        }
    DragSelect.RECT_TPL = '<div class="js_compDragSelect_rect" style="display:none;"></div>' ;

    DragSelect.DEFAULT_MOUSEUP =
        function( _evt ){
        };

    DragSelect.DEFAULT_MOUSEMOVE = 
        function( _evt ){
        };

    JC.BaseMVC.build( DragSelect );

    JC.f.extendObject( DragSelect.prototype, {
        _beforeInit:
            function(){
                //JC.log( 'DragSelect _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this, _ditems;

                _p.on( 'inited', function(){
                    _ditems = _p._model.delegateItems();
                    if( !_ditems.length ) return;

                    JC.log( _ditems );

                    _p.selector().delegate( 'encodeURIComponent', 'mousedown', function( _evt ){
                        var _sp = $( this );
                        JC.log( _sp.html(), JC.f.ts() );

                        _p.trigger( 'SELECT_START', [ _sp, _evt ] );
                    });
                });

                _p.on( 'SELECT_START', function( _evt, _sp, _srcEvt ){
                    _p.trigger( 'CLEAR_EVENT' );
                    _p.trigger( 'BIND_EVENT' );
                });

                _p.on( 'SELECT_END', function( _evt, _sp, _srcEvt ){
                    _p.trigger( 'CLEAR_EVENT' );
                });

                _p.on( 'BIND_EVENT', function( _evt ){
                    _jwin.on( 'mousemove', DragSelect.DEFAULT_MOUSEMOVE );
                    _jwin.on( 'mouseup', DragSelect.DEFAULT_MOUSEUP );
                });

                _p.on( 'CLEAR_EVENT', function( _evt ){
                    _jwin.off( 'mousemove', DragSelect.DEFAULT_MOUSEMOVE );
                    _jwin.off( 'mouseup', DragSelect.DEFAULT_MOUSEUP );
                });
            }

        , _inited:
            function(){
                //JC.log( 'DragSelect _inited', new Date().getTime() );
                this.trigger( 'inited' );
            }
    });

    DragSelect.Model._instanceName = 'JCDragSelect';
    DragSelect.Model.UNI_COUNT = 1;
    DragSelect.Model.BEFORE_FIND_PREFIX = 'beforeSelected';

    JC.f.extendObject( DragSelect.Model.prototype, {
        init:
            function(){
                //JC.log( 'DragSelect.Model.init:', new Date().getTime() );
            }

        , config:
            function(){
                if( !this._config ){
                    this._config = $.parseJSON( JC.f.scriptContent( this.selectorProp( 'cdsConfig' ) ) );
                }
                return this._config;
            }

        , delegateItems:
            function(){
                var _r = [];
                $.each( this.config(), function( _k, _item ){
                    _r.push ( _k );
                });
                return _r;
            }

        , offset:
            function( _evt ){
                var _r = {
                        'x': _evt.pageX
                        , 'y': _evt.pageY
                };
                return _r;
            }

        , downPoint:
            function( _setter ){
                typeof _setter != 'undefined' && ( this._downPoint = _setter );
                return this._downPoint;
            }
    });

    JC.f.extendObject( DragSelect.View.prototype, {
        init:
            function(){
                //JC.log( 'DragSelect.View.init:', new Date().getTime() );
            }

        , showRect:
            function( _evt ){
                var _p = this;
                _p._model.downPoint( _p._model.offset( _evt ) );
                DragSelect.RECT().css( { 'left': '-9999px' } ).show();
            }

        , updateRect:
            function( _evt ){
                var _p = this
                    , _downPoint = _p._model.downPoint()
                    , _newPoint = _p._model.offset( _evt )
                    , _rect = DragSelect.RECT()
                    , _size
                    ;
                if( !_downPoint ) return;
                _size = pointToRect( _downPoint, _newPoint );
                _rect.css( _size );
            }

        , hideRect:
            function( _evt ){
                var _p = this
                    , _downPoint = _p._model.downPoint()
                    , _newPoint = _p._model.offset( _evt )
                    , _rect = DragSelect.RECT()
                    , _size
                    ;
                DragSelect.RECT().hide();

                if( !_downPoint ) return;
                _size = pointToRect( _downPoint, _newPoint );
                _rect.css( _size );
            }
    });

    function pointToRect( _p1, _p2 ){
        var _r = { 'x': 0, 'y': 0, 'width': 0, 'height': 0 };

        if( _p1 && _p2 ){
            if( _p1.x < _p2.x ){
                _r.x = _p1.x;
                _r.width = _p2.x - _p1.x;
            }else{
                _r.x = _p2.x;
                _r.width = _p1.x - _p2.x;
            }

            if( _p1.y < _p2.y ){
                _r.y = _p1.y;
                _r.height = _p2.y - _p1.y;
            }else{
                _r.y = _p2.y;
                _r.height = _p1.y - _p2.y;
            }
            _r.left = _r.x;
            _r.top = _r.y;
        }

        return _r;
    }

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

