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

    DragSelect.AR_IX = 
        function( _ar, _ix, _def ){
            return _ar[ _ix ] || _ar[ 0 ] || _def || '';
        };

    JC.BaseMVC.build( DragSelect );

    JC.f.extendObject( DragSelect.prototype, {
        _beforeInit:
            function(){
                //JC.log( 'DragSelect _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this;

                _p.on( 'inited', function(){
                });

                $.each( _p._model.itemsClassAr(), function( _IX, _TYPE ){

                    var _selectClass = DragSelect.AR_IX( _p._model.selectClassAr(), _IX )
                        , _unselectClass = DragSelect.AR_IX( _p._model.unselectClassAr(), _IX )
                        ;
                    //JC.log( _IX, _TYPE, _selectClass, _unselectClass );

                    _p.selector().delegate( _TYPE, 'click', function( _evt ){
                        //JC.log( 'click', JC.f.ts(), _TYPE );
                    });

                    _p.selector().delegate( _TYPE, 'mousedown', function( _evt ){
                        var _sp = $( this );
                        _jwin.off( 'mouseup', _upEvent );
                        _p._model.clearCache();
                        _p._model.selectReady( _IX, true );
                        _p.trigger( 'item_find', [ _sp, _IX, _TYPE, _selectClass, _unselectClass ] );
                        _jwin.on( 'mouseup', _upEvent );
                        JC.log( 'mousedown', _IX, _TYPE, JC.f.ts() );
                    });

                    _p.selector().delegate( _TYPE, 'mouseover', function( _evt ){
                        if( !_p._model.selectReady( _IX ) ) return;
                        var _sp = $( this );
                        _p.trigger( 'item_find', [ _sp, _IX, _TYPE, _selectClass, _unselectClass ] );
                    });

                    function _upEvent( _evt ){
                        //JC.log( 'upevent', JC.f.ts() );
                        _p._model.selectReady( _IX, false );
                        _jwin.off( 'mouseup', _upEvent );
                        _p.trigger( 'select_done', [ _IX, _TYPE, _selectClass, _unselectClass ] );
                    }
                });

                _p.on( 'init_count', function( _evt, _sp, _ix, _TYPE, _selectClass, _unselectClass ){
                    _sp = $( _sp );
                    var _count;
                    if( !_sp.data( _p._model.countKey() ) ){
                        _sp.data( _p._model.countKey(),  DragSelect.Model.UNI_COUNT++ )
                    }else{
                        _count = _sp.data( _p._model.countKey() );
                        if( ( DragSelect.Model.UNI_COUNT - 2 ) == _count && _p._model.prevItem() ){
                            _p._model.prevItem().data( _p._model.countKey(), 0 );
                            _p.trigger( 'unselect_item', [ _p._model.prevItem(), _ix, _TYPE, _selectClass, _unselectClass ] );
                        }
                    }
                });

                _p.on( 'item_find', function( _evt, _sp, _ix, _TYPE, _selectClass, _unselectClass ){
                    _sp = $( _sp );
                    _p.trigger( 'init_count', [ _sp, _ix ] );
                   
                    if( _sp.hasClass( _selectClass ) ){
                        _p.trigger( 'unselect_item', [ _sp, _ix, _TYPE, _selectClass, _unselectClass ] );
                    }else{
                        _p.trigger( 'select_item', [ _sp, _ix, _TYPE, _selectClass, _unselectClass ] );
                    }
                });

                _p.on( 'select_item', function( _evt, _sp, _ix, _TYPE, _selectClass, _unselectClass ){
                    //JC.log( _IX, _ix, 'select_item', JC.f.ts() )
                    _sp = $( _sp );

                    _selectClass && _sp.addClass( _selectClass );

                    _unselectClass && _sp.removeClass( _unselectClass );
                    _p._model.findedItems( _sp, _TYPE );
                });

                _p.on( 'unselect_item', function( _evt, _sp, _ix, _TYPE, _selectClass, _unselectClass ){
                    //JC.log( _IX, _ix, 'unselect_item', JC.f.ts() )
                    _sp = $( _sp );

                    _selectClass && _sp.removeClass( _selectClass );
                    _unselectClass && _sp.addClass( _unselectClass );

                    _p._model.findedItems( _sp, _TYPE );
                });

                _p.on( 'select_done', function( _evt, _ix, _TYPE, _selectClass, _unselectClass ){
                    JC.log( 'select_done', JC.f.ts() );
                    var _findedItems = _p._model.fixFindedItems( _TYPE, _selectClass, _unselectClass );
                    _p.trigger( 'process_select', [ _findedItems, _ix, _TYPE, _selectClass, _unselectClass ] );
                });

                _p.on( 'process_select', function( _evt, _items, _ix, _TYPE, _selectClass, _unselectClass ){
                    JC.log( 'process_select', JC.f.ts() );
                    JC.dir( _items );
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
    
        , findedItems:
            function( _item, _type, _returnAll ){
                var _p = this;

                if( _item && _type ){
                    !_p._findedItems && ( _p._findedItems = {}, _p._findedItems[ _type ] = {} );
                    !_p._findedItems[ _type ] && ( _p._findedItems[ _type ] = {  } );
                    var _key = _item.data( _p.countKey() );

                    _p._findedItems[ _type ][ _key ] = _item;
                }
                if( !_returnAll && _type ){
                    return _p._findedItems[ _type ];
                }else{
                    return _p._findedItems;
                }
            }

        , fixFindedItems:
            function( _type, _selectClass, _unselectClass ){
                var _p = this, _items = _p.findedItems( null, _type );

                $.each( _items, function( _ix, _item ){
                    if( !_item.hasClass( _selectClass ) ){
                        delete _items.select[ _ix ];
                    }
                });
                return _items;
            }

        , clearFindedItems: function(){ this._findedItems = {}; }

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

        , processAr: 
            function( _key, _ar ){
                var _p = this;
                !_p[ _key ]
                    && ( 
                        _p[ _key ] = _ar.split( _p.itemDelimiter() ) 
                        , $.each( _p[ _key ], function( _ix, _item ){ _p[_key][ _ix ] = $.trim( _item ); } )
                    );
                return _p[ _key ];
            }

        , itemsAr: function(){ return this.processAr( '_itemsAr', this.items() ); }
        , itemsClassAr: function(){ return this.processAr( '_itemsClassAr', this.itemsClass() ); }
        , selectClassAr: function(){ return this.processAr( '_selectClassAr', this.selectClass() ); }
        , unselectClassAr: function(){ return this.processAr( '_unselectClassAr', this.unselectClass() ); }

        , itemDelimiter: function(){ return this.attrProp( 'cdsItemDelimiter' ) || '||'; }

        , clearCache:
            function(){
                var _p = this;
                _p.prevItem( null );
                _p._relativeParent = null;
                _p.clearFindedItems();
                _p.countKey( true );
            }
    });

    JC.f.extendObject( DragSelect.View.prototype, {
        init:
            function(){
                //JC.log( 'DragSelect.View.init:', new Date().getTime() );
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

