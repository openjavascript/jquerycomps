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
    DragSelect.RECT_TPL = '<div class="js_compDragSelect_rect" style="display:none;position:absolute;left: -9999px;"></div>' ;

    DragSelect.DEFAULT_MOUSEUP =
        function( _evt ){
            var _d = DragSelect.DRAG_DATA();
            if( !_d ) return;
            var _p = _d.ins;
            //JC.log( 'up', JC.f.ts() );
            _p.trigger( 'SELECT_DONE', [ _p._model.offset( _evt ) ] );
        };

    DragSelect.DEFAULT_MOUSEMOVE = 
        function( _evt ){
            var _d = DragSelect.DRAG_DATA();
            if( !_d ) return;
            var _p = _d.ins
                , _newPoint = _p._model.offset( _evt )
                ;
            //JC.log( 'move', JC.f.ts() );
            _p._view.updateRect( _newPoint );
        };

    DragSelect.DEFAULT_SELECT_EVENT = 
        function(){
            return false;
        };

    DragSelect.DRAG_DATA =
        function( _setter ){
            typeof _setter != 'undefined' && ( DragSelect._DRAG_DATA = _setter );
            return DragSelect._DRAG_DATA;
        };

    DragSelect.MIN_RECT = { width: 20, height: 20 };

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

                    _p.selector().delegate( _ditems.join(','), 'click', function( _evt ){
                        JC.log( 'click', JC.f.ts() );
                    });

                    $.each( _ditems, function( _k, _item ){
                        _p.selector().delegate( _item, 'mousedown', function( _evt ){
                            var _sp = $( this );
                            _p.trigger( 'SELECT_START', [ _sp, _evt, _item ] );
                        });
                    });
                });

                _p.on( 'SELECT_START', function( _evt, _sp, _srcEvt, _type ){
                    var _d;
                    _p.trigger( 'CLEAR_EVENT' );
                    _d = _p._model.initDragData( _sp, _type );
                    if( !_d ) return;
                    _d.ins = _p;
                    _d.downPoint = _p._model.offset( _srcEvt );
                    _p._view.showRect();
                    _p.trigger( 'BIND_EVENT' );
                });

                _p.on( 'BIND_EVENT', function( _evt ){
                    _jdoc.on( 'mousemove', DragSelect.DEFAULT_MOUSEMOVE );
                    _jdoc.on( 'mouseup', DragSelect.DEFAULT_MOUSEUP );

                    !_p._model.disableUnselectable() 
                        && _jdoc.on( 'selectstart', DragSelect.DEFAULT_SELECT_EVENT );
                });

                _p.on( 'CLEAR_EVENT', function( _evt ){
                    _jdoc.off( 'mousemove', DragSelect.DEFAULT_MOUSEMOVE );
                    _jdoc.off( 'mouseup', DragSelect.DEFAULT_MOUSEUP );
                    _jdoc.off( 'selectstart', DragSelect.DEFAULT_SELECT_EVENT );
                    _p.trigger( 'CLEAR_DATA' );
                });

                _p.on( 'SELECT_DONE', function( _evt, _newPoint ){
                    _p._view.updateRect( _newPoint );
                    var _rectSize = selectorToRectangle( DragSelect.RECT() );

                    if( _p._model.rectIsOutsize( _rectSize ) ){
                    }else{
                        _p.trigger( 'PROCESSS_SELECT', [ _rectSize, DragSelect.DRAG_DATA() ] );
                    }
                    _p._view.hideRect();
                    _p.trigger( 'CLEAR_EVENT' );
                });

                _p.on( 'PROCESSS_SELECT', function( _evt,_rectSize, _params ){
                    if( !DragSelect.RECT().is( ':visible' ) ) return;
                    var _selectedItems = _p._model.getSelectItems( _rectSize, _p._model.items( _params.type ) );
                    if( !_selectedItems.length ) return;
                    if( _params.data ){
                        $.each( _selectedItems, function( _k, _item ){
                            _params.data.addClass && _item.addClass( _params.data.addClass );
                            _params.data.removeClass && _item.removeClass( _params.data.removeClass );
                        });
                        _params.data.callback && _params.data.callback.call( _p, _selectedItems, _params.type );
                    }
                    _p._model.commonCallback() && _p._model.commonCallback().call( _p, _selectedItems, _params.type );
                    //JC.log( 'PROCESSS_SELECT', _selectedItems.length );
                });

                _p.on( 'CLEAR_DATA', function( _evt ){
                    DragSelect.DRAG_DATA( null );
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

        , disableUnselectable: function(){ return this.boolProp( 'cdsDisableUnselectable' ); }

        , items:
            function( _type ){
                return this.selector().find( _type );
            }

        , getSelectItems:
            function( _rect, _items ){
                var _r = [];

                //JC.dir( _rect );

                $.each( _items, function( _k, _item ){
                    _item = $( _item );
                    var _itemRect = selectorToRectangle( _item );
                    if( intersectRect( _rect, _itemRect ) ){
                        //JC.dir( _itemRect )
                        _r.push( _item );
                    }
                });

                return _r;
            }

        , commonCallback:
            function(){
                var _r = this.config().commonCallback || this.callbackProp( 'cdsCommonCallback' );
                return _r;
            }

        , initDragData:
            function( _selector, _k ){
                var _p = this
                    , _itemData = _p.config()[ _k ]
                    ;
                if( !_itemData ) return;
                return DragSelect.DRAG_DATA( { type: _k, data: _itemData } );
            }

        , config:
            function(){
                if( !this._config ){
                    this._config = eval( '(' + ( JC.f.scriptContent( this.selectorProp( 'cdsConfig' ) ) ) + ')' );
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

        , checkMinRect:
            function(){
            }

        , rectMinWidth: function(){ return this.intProp( 'cdsRectMinWidth' ); }
        , rectMinHeight: function(){ return this.intProp( 'cdsRectMinHeight' ); }

        , rectMinSize:
            function(){
                var _p = this;
                return {
                    width: _p.rectMinWidth() || DragSelect.MIN_RECT.width
                    , height: _p.rectMinHeight() || DragSelect.MIN_RECT.height
                };
            }

        , rectIsOutsize:
            function( _rectSize ){
                var _p = this, _r, _minSize = _p.rectMinSize();
                _minSize.width > _rectSize.width 
                    && _minSize.height > _rectSize.height
                    && ( _r = true ) 
                    ;
                return _r;
            }
    });

    JC.f.extendObject( DragSelect.View.prototype, {
        init:
            function(){
                //JC.log( 'DragSelect.View.init:', new Date().getTime() );
            }

        , showRect:
            function(){
                DragSelect.RECT().css( { 'left': '-9999px' } ).show();
            }

        , updateRect:
            function( _newPoint ){
                if( !( DragSelect.DRAG_DATA() && DragSelect.RECT().is( ':visible' ) ) ) return;
                var _p = this
                    , _downPoint = DragSelect.DRAG_DATA().downPoint
                    , _rect = DragSelect.RECT()
                    , _size
                    ;
                if( !_downPoint ) return;
                _size = pointToRect( _downPoint, _newPoint );
                _rect.css( _size );
            }

        , hideRect:
            function(){
                var _p = this
                    ;
                DragSelect.RECT().hide();
            }
    });
    /**
     * 判断两个矩形是否有交集
     */
    function intersectRect( r1, r2 ) {
        return !(
                    r2.x > ( r1.x + r1.width ) || 
                    ( r2.x + r2.width ) < r1.x || 
                    r2.y > ( r1.y + r1.height ) ||
                    ( r2.y + r2.height ) < r1.y
                );
    }

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
    /**
     * 返回选择器的 矩形 位置
     */
    function selectorToRectangle( _selector ){
        _selector = $( _selector );
        var _offset = _selector.offset()
            , _w = _selector.prop('offsetWidth')
            , _h = _selector.prop('offsetHeight');

        return {
            x: _offset.left
            , y: _offset.top
            , width: _w
            , height: _h
        }
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

