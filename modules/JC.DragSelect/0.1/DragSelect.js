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

    DragSelect.AR_IX = 
        function( _ar, _ix, _def ){
            return _ar[ _ix ] || _ar[ 0 ] || _def || '';
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

                $.each( _p._model.itemsClassAr(), function( _IX, _ITEM_CLASS ){

                    var _selectClass = DragSelect.AR_IX( _p._model.selectClassAr(), _IX )
                        , _unselectClass = DragSelect.AR_IX( _p._model.unselectClassAr(), _IX )
                        ;
                    JC.log( _IX, _ITEM_CLASS, _selectClass, _unselectClass );

                    _p.selector().delegate( _ITEM_CLASS, 'click', function( _evt ){
                        JC.log( 'click', JC.f.ts(), _ITEM_CLASS );
                    });

                    _p.selector().delegate( _ITEM_CLASS, 'mousedown', function( _evt ){
                        var _sp = $( this );
                        _p._model.clearCache();
                        _p._model.selectReady( _IX, true );
                        _p._bindActionEvent( _IX );
                        _p._model.prevItem( null );
                        _p._model.countKey( true );
                        _p.trigger( 'item_find', [ _sp, _IX ] );
                        //_p._model.prevItem( _sp );
                        JC.log( 'mousedown', _IX, _ITEM_CLASS, JC.f.ts() );
                    });


                    _p.selector().delegate( _ITEM_CLASS, 'mouseover', function( _evt ){
                        if( !_p._model.selectReady( _IX ) ) return;
                        JC.log( 'mouseover', _IX, _ITEM_CLASS );
                        var _sp = $( this ), _count;
                        if( !_sp.data( _p._model.countKey() ) ){
                            _sp.data( _p._model.countKey(),  DragSelect.Model.UNI_COUNT++ )
                        }else{
                            _count = _sp.data( _p._model.countKey() );
                            if( ( DragSelect.Model.UNI_COUNT - 2 ) == _count && _p._model.prevItem() ){
                                _p._model.prevItem().data( _p._model.countKey(), 0 );
                                _p.trigger( 'unselect_item', [ _p._model.prevItem(), _IX ] );
                            }
                        }
                        _p.trigger( 'item_find', [ _sp, _IX ] );

                        //_p._model.prevItem( _sp );
                        //_p.trigger( 'item_find', [ _sp ] );
                        JC.log( _sp.data( _p._model.countKey() ) );
                    });

                    _p.on( 'item_find', function( _evt, _sp, _ix ){
                        if( _ix !== _IX ) return;
                       
                        if( _sp.hasClass( _selectClass ) ){
                            _p.trigger( 'unselect_item', [ _sp, _ix ] );
                        }else{
                            _p.trigger( 'select_item', [ _sp, _ix ] );
                        }
                    });

                    _p.on( 'select_item', function( _evt, _sp, _ix ){
                        JC.log( _IX, _ix, 'select_item', JC.f.ts() )
                        if( _ix !== _IX ) return;
                        _sp = $( _sp );

                        _selectClass && _sp.addClass( _selectClass );

                        _unselectClass && _sp.removeClass( _unselectClass );
                    });

                    _p.on( 'unselect_item', function( _evt, _sp, _ix ){
                        JC.log( _IX, _ix, 'unselect_item', JC.f.ts() )
                        if( _ix !== _IX ) return;
                        if( _ix !== _IX ) return;
                        _sp = $( _sp );

                        _selectClass && _sp.removeClass( _selectClass );
                        _unselectClass && _sp.addClass( _unselectClass );
                    });

                });

                return;
            }

        , _inited:
            function(){
                JC.log( 'DragSelect _inited', new Date().getTime() );
                this.trigger( 'inited' );
            }

        , _bindActionEvent:
            function( _IX ){
                var _p = this;

                _jwin.off( 'mouseup', _upEvent );

                _jwin.on( 'mouseup', _upEvent );

                function _upEvent( _evt ){
                    JC.log( 'upevent', JC.f.ts() );
                    _p._model.selectReady( _IX, false );
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

        , prevItem:
            function( _setter ){
                typeof _setter != 'undefined' && ( this._prevItem = _setter );
                return this._prevItem;
            }

        , countKey:
            function( _new ){
                var _p = this;
                ( !_p._countKey || _new ) && ( _p._countKey = 'CDS_' + new Date().getTime() );
                return _p._countKey;
            }

        , selectReady: 
            function( _IX, _setter ){
                !this._selectReady && ( this._selectReady = {} );
                typeof _setter != 'undefined' && ( this._selectReady[ _IX ] = _setter );
                return this._selectReady[ _IX ];
            }

        , items: function(){ return this.selectorProp( 'cdsItems'); }
        , itemsClass: function(){ return this.attrProp( 'cdsItems'); }
        , selectClass: function(){ return this.attrProp( 'cdsSelectClass'); }
        , unselectClass: function(){ return this.attrProp( 'cdsUnselectClass'); }

        , itemsAr:
            function(){
                !this._itemsAr && ( this._itemsAr = this.items().split( this.itemDelimiter() ) );
                return this._itemsAr;
            }

        , itemsClassAr:
            function(){
                !this._itemsClassAr && ( this._itemsClassAr = this.itemsClass().split( this.itemDelimiter() ) );
                return this._itemsClassAr;
            }

        , selectClassAr:
            function(){
                !this._selectClassAr && ( this._selectClassAr = this.selectClass().split( this.itemDelimiter() ) );
                return this._selectClassAr;
            }

        , unselectClassAr:
            function(){
                !this._unselectClassAr && ( this._unselectClassAr = this.unselectClass().split( this.itemDelimiter() ) );
                return this._unselectClassAr;
            }

        , itemDelimiter: function(){ return this.attrProp( 'cdsItemDelimiter' ) || '||'; }

        , clearCache:
            function(){
                this._relativeParent = null;
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

