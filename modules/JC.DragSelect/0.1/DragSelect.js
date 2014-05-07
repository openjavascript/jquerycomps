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

                _p.selector().delegate( _p._model.itemsClass(), 'click', function( _evt ){
                    JC.log( 'click', JC.f.ts() );
                });

                _p.selector().delegate( _p._model.itemsClass(), 'mousedown', function( _evt ){
                    _evt.stopPropagation();
                    _evt.preventDefault();
                    JC.log( 'mousedown', JC.f.ts() );
                    _p._model.clearCache();
                    _p._model.selectReady( true );
                    _p._bindActionEvent();
                    _p.trigger( 'item_find', [ this ] );
                });

                _p.selector().delegate( _p._model.itemsClass(), 'mouseover', function( _evt ){
                    if( !_p._model.selectReady() ) return;
                    _p.trigger( 'item_find', [ this ] );
                });

                _p.on( 'item_find', function( _evt, _sp ){
                    //_sp.toggleClass( _p._model.tempSelectClass() );
                    _sp = $( _sp );
                    _sp.toggleClass( _p._model.tempSelectClass() );
                });

                _p.on( 'find_elements', function( _evt, _src, _tar, _evtType ){
                    JC.log( 'find_elements', _src.mouseX, _src.mouseY, _tar.mouseX, _tar.mouseY, JC.f.ts(), _tar.evt.type );
                    var _spoint = new Point( _src.mouseX, _src.mouseY )
                        , _epoint = new Point( _tar.mouseX, _tar.mouseY )
                        , _rects = _p._model.itemsToRect()
                        , _find = []
                        ;
                    $.each( _rects, function( _ix, _item ){
                        if( lineIntersectsRect( _spoint, _epoint, _item ) ){
                            _find.push( _item );
                        }
                    });
                    _evtType && _p.trigger( _evtType, [ _find, _src, _tar ] );
                });

                _p.on( 'finding', function( _evt, _items, _src, _tar ){
                    if( !_items.length ) return;
                    _p._view.setFindingStyle( _items );
                    JC.log( 'finding', JC.f.ts(), _items.length );
                });

                _p.on( 'find_done', function( _evt, _items, _src, _tar ){
                    if( !_items.length ) return;
                    _p._view.cleanFindingStyle();
                });
            }

        , _inited:
            function(){
                JC.log( 'DragSelect _inited', new Date().getTime() );
                this.trigger( 'inited' );
            }

        , _bindActionEvent:
            function(){
                var _p = this;

                _jwin.off( 'mouseup', _upEvent );

                _jwin.on( 'mouseup', _upEvent );

                function _upEvent( _evt ){
                    JC.log( 'upevent', JC.f.ts() );
                    _p._model.selectReady( false );
                    _jwin.off( 'mouseup', _upEvent );
                }
            }
    });

    DragSelect.Model._instanceName = 'JCDragSelect';
    DragSelect.Model.UNI_COUNT = 1;

    JC.f.extendObject( DragSelect.Model.prototype, {
        init:
            function(){
                JC.log( 'DragSelect.Model.init:', new Date().getTime() );
            }

        , selectReady: 
            function( _setter ){
                typeof _setter != 'undefined' && ( this._selectReady = _setter );
                return this._selectReady;
            }

        , items: function(){ return this.selectorProp( 'cdsItems'); }
        , itemsClass: function(){ return this.attrProp( 'cdsItems'); }

        , itemsToRect:
            function(){
                var _p = this;

                if( !_p._rects ){
                    _p._rects = [];

                    _p.items().each( function(){
                        var _sp = $( this ), _rect = selectorToRectangle( _sp );
                        _rect.item = _sp;
                        _p._rects.push( _rect );
                    });

                }
                return _p._rects;
            }

        , selectClass: function(){ return this.attrProp( 'cdsSelectClass'); }
        , unselectClass: function(){ return this.attrProp( 'cdsUnselectClass'); }
        , tempSelectClass: function(){ return this.attrProp( 'cdsTempSelectClass'); }

        , evtData:
            function( _evt ){
                var _p = this
                    , _roffset = _p.relativeParent() ? _p.relativeParent().offset() : { 'left': 0, 'top': 0 }
                    , _r = {
                        evt: _evt
                        , 'mouseX': _evt.pageX
                        , 'mouseY': _evt.pageY
                        , 'maxXFix': -1
                        , 'maxYFix': -1
                        , 'relativeFixX': _roffset.left
                        , 'relativeFixY': _roffset.top

                    };

                return _r;
            }

        , relativeParent:
            function(){
                var _p = this;
                if( !_p._relativeParent == 'undefined' ){
                    _p._relativeParent = null;
                    var _tmp = _p.selector();
                    while( (_tmp = $( _tmp.parent() ) ).length ){
                        if( /body|html/i.test( _tmp.prop( 'nodeName' ) ) ) break;
                        if( ( _tmp.css( 'position' ) || '' ).toLowerCase() == 'relative' ){
                            _p._relativeParent = _tmp;
                            break;
                        }
                    }
                }
                return _p._relativeParent;
            }

        , clearCache:
            function(){
                this._relativeParent = null;
                this.prevFinding( null );
            }

        , prevFinding:
            function( _setter ){
                typeof _setter != 'undefined' && ( this._prevFinding = _setter );
                return this._prevFinding;
            }

    });

    JC.f.extendObject( DragSelect.View.prototype, {
        init:
            function(){
                JC.log( 'DragSelect.View.init:', new Date().getTime() );
            }

        , setFindingStyle:
            function( _items ){
                var _p = this, _tmpClass = _p._model.tempSelectClass();
                _p.cleanFindingStyle();
                $.each( _items, function( _ix, _item ){
                    _item.item.addClass( _tmpClass );
                    JC.log( 'setFindingStyle', JC.f.ts(), _tmpClass );
                });
                _p._model.prevFinding( _items );
            }

        , cleanFindingStyle:
            function(){
                var _p = this, _tmpClass = _p._model.tempSelectClass();
                if( !_p._model.prevFinding() ) return;
                $.each( _p._model.prevFinding(), function( _ix, _item ){
                    _item.item.removeClass( _tmpClass );
                });
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

    /**
     * 判断一个点是否在矩形里面
     */
    function pointInRectangle( _point, _rect ){
        return _point.x >= _rect.x 
                && _point.x <= ( _rect.x + _rect.width )
                && _point.y >= _rect.y
                && _point.y <= ( _rect.y + _rect.height )
                ;
    }
    /**
     * 返回选择器的 矩形 位置
     */
    function selectorToRectangle( _selector ){
        _selector = $( _selector );
        var _offset = _selector.offset()
            , _w = _selector.prop('offsetWidth')
            , _h = _selector.prop('offsetHeight');

        return {
            x: _offset.left
            , y: _offset.top
            , width: _w
            , height: _h
        }
    }

    function Point( _x, _y ){
        return { x: _x, y: _y };
    }
    /**
     * 线条与矩形是否相交
     */
    function lineIntersectsRect( p1, p2, r){
        return lineIntersectsLine(p1, p2, new Point(r.x, r.y), new Point(r.x + r.width, r.y)) ||
               lineIntersectsLine(p1, p2, new Point(r.x + r.width, r.y), new Point(r.x + r.width, r.y + r.height)) ||
               lineIntersectsLine(p1, p2, new Point(r.x + r.width, r.y + r.height), new Point(r.x, r.y + r.height)) ||
               lineIntersectsLine(p1, p2, new Point(r.x, r.y + r.height), new Point(r.x, r.y)) ||
               ( pointInRectangle( p1, r ) &&  pointInRectangle( p2, r ) );
    }
    /**
     * 线条与线条是否相交
     */
    function lineIntersectsLine( l1p1, l1p2, l2p1, l2p2){
        var q = (l1p1.y - l2p1.y) * (l2p2.x - l2p1.x) - (l1p1.x - l2p1.x) * (l2p2.y - l2p1.y);
        var d = (l1p2.x - l1p1.x) * (l2p2.y - l2p1.y) - (l1p2.y - l1p1.y) * (l2p2.x - l2p1.x);

        if( d == 0 ){
            return false;
        }

        var r = q / d;
        q = (l1p1.y - l2p1.y) * (l1p2.x - l1p1.x) - (l1p1.x - l2p1.x) * (l1p2.y - l1p1.y);
        var s = q / d;

        if( r < 0 || r > 1 || s < 0 || s > 1 ){
            return false;
        }

        return true;
    }

