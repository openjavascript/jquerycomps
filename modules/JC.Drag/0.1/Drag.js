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
    var _jdoc = $( document ), _jwin = $( window );

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

    JC.BaseMVC.build( Drag );

    JC.f.extendObject( Drag.prototype, {
        _beforeInit:
            function(){
                JC.log( 'Drag _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this;

                _p.selector().on( 'mousedown', function( _evt, _srcEvt ){
                    _evt = _srcEvt || _evt;

                    JC.log( 
                        'Drag mousedown', new Date().getTime()
                        //, _evt.clientX, _evt.clientY
                        //, _evt.pageX, _evt.pageY
                    );

                    Drag.dragInfo( _p, _evt );
                    _p.trigger( Drag.Model.DRAG_START, [ _evt, Drag.dragInfo() ] );

                    _jdoc.off( 'mousemove', Drag.defaultMouseMove );
                    _jdoc.off( 'mouseup', Drag.defaultMouseUp );
                    _jwin.off( 'scroll', Drag.defaultScroll );

                    _jdoc.on( 'mouseup', Drag.defaultMouseUp );
                    _jdoc.on( 'mousemove', Drag.defaultMouseMove );
                    _jwin.on( 'scroll', Drag.defaultScroll );

                    return false;
                });

                //低版本 IE 拖曳时不选中文字
                _p.selector()[0].onselectstart = function(){ return false; }

                _p.on( Drag.Model.DRAG_START, function( _evt, _dragInfo ){
                    JC.log( 'drag start', new Date().getTime() );
                    _p._model.dragTarget().css( 'z-index', window.ZINDEX_COUNT++ );
                });

                _p.on( Drag.Model.DRAG_END, function( _evt, _dragInfo ){
                    JC.log( 'drag end', new Date().getTime() );
                });

                _p.on( Drag.Model.FIRE_DRAG, function( _evt, _srcEvt ){
                    _p.selector().trigger( 'mousedown', [ _srcEvt || _evt ] );
                });
            }

        , _inited:
            function(){
                var _p = this;
                _p._model.defaultCSSPosition( _p._model.dragTarget().css( 'position' ) );
                _p._model.defaultCSSZIndex( _p._model.dragTarget().css( 'z-index' ) );
                
                JC.log( 'Drag _inited', new Date().getTime()
                        , _p._model.defaultCSSPosition() 
                        , _p._model.defaultCSSZIndex() 
                        );
            }

        , dragTarget: function(){ return this._model.dragTarget(); }
        , dragIn: function(){ return this._model.dragIn(); }
        , updatePosition: function(){ this._view.updatePosition.apply( this._view, JC.f.sliceArgs( arguments ) ); }
    });
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

    Drag.dragInfo =
        function( _ins, _evt ){
            if( _ins && _evt ){
                Drag._dragInfo = {
                    'ins': _ins
                    , 'evt': _evt
                    , 'offset': _ins._model.offset( _evt )
                };
            }
            return Drag._dragInfo;
        };

    Drag._dragInfo;

    Drag.cleanDragInfo = function(){ Drag._dragInfo = null; };

    Drag.defaultMouseMove =
        function( _evt ){
            if( !Drag.dragInfo() ) return;
            //JC.log( 'JC.Drag mousemove', new Date().getTime() );
            var _di = Drag.dragInfo()
                , _p = _di.ins
                , _offset = _di.offset
                , _newX, _newY
                ;
            if( !_p ) return;
            _newX = _evt.pageX - _offset.x;
            _newY = _evt.pageY - _offset.y;

            _newX <= _offset.minX && ( _newX = _offset.minX );
            _newY <= _offset.minY && ( _newY = _offset.minY );

            _newX >= _offset.maxX && ( _newX = _offset.maxX );
            _newY >= _offset.maxY && ( _newY = _offset.maxY );

            //JC.log( _offset.x, _offset.y, _newX, _newY, _evt.pageX, _evt.clientX );
            _p.updatePosition( _newX, _newY );
        };

    Drag.defaultMouseUp =
        function( _evt ){
            var _di = Drag.dragInfo();

            if( _di && _di.ins ){
                _di.ins.trigger( Drag.Model.DRAG_END, _di );
            }

            Drag.cleanDragInfo();
            _jdoc.off( 'mousemove', Drag.defaultMousemove );
        };

    Drag.defaultScroll =
        function( _evt ){
            var _di = Drag.dragInfo();
            if( !( _di && _di.ins ) ) return;
            var _scrollX = _di.ins.dragIn().scrollLeft()
                , _scrollY = _di.ins.dragIn().scrollTop()
                , _offset = _di.ins.dragTarget().offset()
                , _newX, _newY
                , _fixScrollX = _scrollX - _di.offset.scrollX
                , _fixScrollY = _scrollY - _di.offset.scrollY
                ;

            _newX = _offset.left + _fixScrollX;
            _newY = _offset.top + _fixScrollY;

            //JC.log( _di.offset.scrollY, _scrollY, _offset.left, _newX, _offset.top, _newY );
            _di.ins.dragTarget().css({
                'left': _newX + 'px'
                , 'top': _newY + 'px'
            });

            _di.offset.scrollX = _scrollX;
            _di.offset.scrollY = _scrollY;
            _di.offset.maxX += _fixScrollX;
            _di.offset.maxY += _fixScrollY;
        };


    Drag.Model._instanceName = 'JCDrag';
    Drag.Model.DRAG_START = 'JCDragStart';
    Drag.Model.DRAG_END = 'JCDragEnd';
    Drag.Model.FIRE_DRAG = 'JCFireDrag';

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

        , defaultCSSZIndex:
            function( _setter ){
                typeof _setter != 'undefined' && ( this._defaultCSSZIndex = _setter );
                return this._defaultCSSZIndex;
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

        , dragIn:
            function(){
                if( ! ( this._dragIn && this._dragIn.length ) ){
                    this._dragIn = this.selectorProp( 'dragIn' );
                    !( this._dragIn && this._dragIn.length )
                        && ( this._dragIn = $( window ) )
                        ;
                }
                return this._dragIn;
            }

        , offset:
            function( _evt ){
                var _p = this
                    , _toffset = _p.dragTarget().offset()
                    , _inoffset = _p.dragIn().offset()
                    , _r = {
                        'mouseX': _evt.pageX
                        , 'mouseY': _evt.pageY
                        , 'targetX': _toffset.left
                        , 'targetY': _toffset.top
                        , 'scrollX': _p.dragIn().scrollLeft()
                        , 'scrollY': _p.dragIn().scrollTop() 
                        , 'maxXFix': 0
                        , 'maxYFix': 0
                    }
                    ;

                    _r.x = _r.mouseX - _r.targetX;
                    _r.y = _r.mouseY - _r.targetY;

                    !_inoffset && ( _inoffset = { 'left': 0, 'top': 0 } , _r.maxXFix = 2, _r.maxYFix = 2 );
                    _r.minX = _inoffset.left;
                    _r.minY = _inoffset.top;
                    _r.maxX = _r.minX + _p.dragIn().scrollLeft() + _p.dragIn().width() - _p.dragTarget().width() - _r.maxXFix;
                    _r.maxY = _r.minY + _p.dragIn().scrollTop() +_p.dragIn().height() - _p.dragTarget().height() - _r.maxYFix;

                    //JC.log( [ _r.mouseX, _r.targetX, _r.x, '---', _r.mouseY, _r.targetY, _r.y ] );

                return _r;
            }
    });

    JC.f.extendObject( Drag.View.prototype, {
        init:
            function(){
                JC.log( 'Drag.View.init:', new Date().getTime() );
            }

        , updatePosition: 
            function( _x, _y ){
                var _p = this, _dt = _p._model.dragTarget();

                _dt.css({
                    'left': _x + 'px'
                    , 'top': _y + 'px'
                });
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

    _jdoc.delegate( 'div.js_compDrag, button.js_compDrag', 'mouseover', function( _evt ){
        var _p = $( this ), _ins = JC.BaseMVC.getInstance( _p, Drag );
        !_ins && ( _ins = new Drag( _p ) );
    });

    _jdoc.delegate( 'div.js_compDrag, button.js_compDrag', 'mousedown', function( _evt ){
        var _p = $( this ), _ins = JC.BaseMVC.getInstance( _p, Drag );
        !_ins && ( _ins = new Drag( _p ) ) && _ins.trigger( Drag.Model.FIRE_DRAG, [ _evt ] );
        return false;
    });

    _jwin.on( 'resize', function( _evt ){
        _jdoc.off( 'mousemove', Drag.defaultMouseMove );
        _jdoc.off( 'mouseup', Drag.defaultMouseUp );
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
