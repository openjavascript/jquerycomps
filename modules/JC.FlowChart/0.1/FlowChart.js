/**
 * 支持 多对多 关系( 目前只支持 一对多 和 多对一 )
 */
 ;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC', 'Raphael' ], function(){
/**
 * 组件用途简述
 *
 *  <p><b>require</b>:
 *      <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 *      , <a href='Raphael.html'>RaphaelJS</a>
 *  </p>
 *
 *  <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *      | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.FlowChart.html' target='_blank'>API docs</a>
 *      | <a href='../../modules/JC.FlowChart/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *  <h2>页面只要引用本脚本, 默认会处理 div class="js_compFlowChart"</h2>
 *
 *  <h2>可用的 HTML attribute</h2>
 *
 *  <dl>
 *      <dt></dt>
 *      <dd><dd>
 *  </dl> 
 *
 * @namespace   JC
 * @class       FlowChart
 * @extends     JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2013-12-13
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
        <h2>JC.FlowChart 示例</h2>
 */
    var _jdoc = $( document ), _jwin = $( window );

    JC.FlowChart = FlowChart;

    function FlowChart( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, FlowChart ) ) 
            return JC.BaseMVC.getInstance( _selector, FlowChart );

        JC.BaseMVC.getInstance( _selector, FlowChart, this );

        this._model = new FlowChart.Model( _selector );
        this._view = new FlowChart.View( this._model );

        this._init();

        //JC.log( FlowChart.Model._instanceName, 'all inited', new Date().getTime() );
    }
    /**
     * 初始化可识别的 FlowChart 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of FlowChartInstance}
     */
    FlowChart.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector.length ){
                if( _selector.hasClass( 'js_compFlowChart' )  ){
                    _r.push( new FlowChart( _selector ) );
                }else{
                    _selector.find( 'div.js_compFlowChart' ).each( function(){
                        _r.push( new FlowChart( this ) );
                    });
                }
            }
            return _r;
        };

    JC.BaseMVC.build( FlowChart );

    JC.f.extendObject( FlowChart.prototype, {
        _beforeInit:
            function(){
                //JC.log( 'FlowChart _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this;

                _p.on( 'inited', function(){

                    if( !_p._model.data() ) return;
                    _p._view.draw();
                });

                //JC.dir( _p._model.data() );
            }

        , _inited:
            function(){
                //JC.log( 'FlowChart _inited', new Date().getTime() );
                this.trigger( 'inited' );
            }
    });

    FlowChart.Model._instanceName = 'JCFlowChart';
    JC.f.extendObject( FlowChart.Model.prototype, {
        init:
            function(){
                //JC.log( 'FlowChart.Model.init:', new Date().getTime() );
            }

        , data:
            function(){
                if( typeof this._data == 'undefined' && this.is( '[data-FlowChart]' ) ){
                    //JC.log( this.scriptTplProp( 'data-FlowChart' ) );
                    this._data = eval( '(' + this.scriptTplProp( 'data-FlowChart' ) + ')' );
                }
                return this._data;
            }

        , initGrid:
            function(){
                var _p = this;
                _p._grid = { 
                    data: []
                    , idColumnIndex: {}
                    , row: {}
                    , idMap: {}
                    , columnIndexMap: {}
                    , maxColumn: 0
                    , rowIndexPad: 0
                    , offsetRowIndex: 10000 
                };

                _p.initIdColumnIndex( _p.data(), _p.data().id, 0 );
                _p.initColumnIndexMap();
                _p.initRowIndex();
                _p.fixRowIndex();
                _p.fixRowIndexMultiChild();
                _p.fixRowIndexOneChild();

                _p.createItems();
                _p.calcRealPosition();

                //JC.dir( _p.gridIdColumnIndex() );
                JC.dir( _p.gridIdColumnIndexMap() );
                //JC.log( _p.gridMaxColumn() );
            }

        , grid: function(){ return this._grid; }

        , gridIdColumnIndex: function(){ return this.grid().idColumnIndex; }
        , gridIdColumnIndexMap: function(){ return this.grid().columnIndexMap; }
        , gridRow: function(){ return this.grid().row; }
        , gridIdMap: 
            function( _id ){ 
                if( typeof _id != 'undefined' ){
                    return this.grid().idMap[ _id ];
                }
                return this.grid().idMap; 
            }
        , gridOffsetRowIndex: function(){ return this.grid().offsetRowIndex; }
        , gridHeight: function(){ return 40; }
        , gridWidth: function(){ return 120; }
        , lineWidth: function(){ return 75; }
        , childLineWidth: function(){ return 40; }
        , parentLineWidth: function(){ return 25; }

        , createItems:
            function(){
                var _p = this, _sx = 0, _sy = 0;
                _p._items = {};
                _p._columnWidth = [];
                for( var i = 0; i <= _p.gridMaxColumn(); i++ ){
                    var _rowList = _p.gridIdColumnIndexMap()[ i ]
                        , _maxWidth = _p.gridWidth()
                        ;
                    $.each( _rowList, function( _k, _item ){
                        var _html = JC.f.printf( 
                                '<div class="js_fcItem" style="position:absolute; left: -1000px;">{0}</div>'
                                , _item.name 
                            )  
                            , _node = $( _html )
                            , _tmpWidth
                            ;
                        _node.appendTo( _p.box() );
                        _p._items[ _item.id ] = _node;
                        _tmpWidth = _node.outerWidth();
                        _tmpWidth > _maxWidth && ( _maxWidth = _tmpWidth );
                        //JC.log( _html );
                    });
                    if( i === 0 ){
                        _maxWidth = Math.ceil( _p._items[ _p.data().id ].width() + 30 );
                    }
                    _p._columnWidth.push( _maxWidth );
                }
            }

        , calcRealPosition:
            function(){
                var _p = this, _sx = 0, _sy = 0, _countX = 0;
                _p._columnX = [];
                _p._minX = _sx;
                _p._maxX = 0;
                _p._minY = 0;
                _p._maxY = 0;

                for( var i = 0; i <= _p.gridMaxColumn(); i++ ){
                    var _rowList = _p.gridIdColumnIndexMap()[ i ]
                        ;

                    $.each( _rowList, function( _k, _item ){
                        var _x = _sx, _y = _sy
                            ;
                        _x += _countX;
                        _y += _item.rowIndex * _p.gridHeight();

                        _y < _p._minY && ( _p._minY = _y );
                        ( _y + _p.gridHeight() / 2 ) > _p._maxY && ( _p._maxY = Math.ceil( _y + _p.gridHeight() / 2 ) );

                        _item.x = _x;
                        _item.y = _y;
                    });

                    _p._maxX = _sx + _countX + _p.columnWidth( i );

                    _p._columnX.push( _sx + _countX );
                    _countX += Math.max( _p.gridWidth(), _p.columnWidth( i ) ) + _p.lineWidth();
                    if( _p.listHasChildline( _rowList ) ){
                        _countX += _p.childLineWidth();
                    }

                    if( _p.listHasParentline( _rowList ) ){
                        _countX += _p.parentLineWidth();
                    }
                }

                //JC.log( _p._minX, _p._maxX, _p._minY, _p._maxY );

            }

        , minX: function(){ return this._minX; }
        , minY: function(){ return this._minY; }
        , maxX: function(){ return this._maxX; }
        , maxY: function(){ return this._maxY; }

        , items: function(){ return this._items; }
        , item: 
            function( _id ){ 
                return this._items[ _id ]; 
            }
        , columnWidth: 
            function( _ix ){
                if( typeof _ix != undefined ){
                    return this._columnWidth[ _ix ] || 0;
                }
                return this._columnWidth;
            }
        , columnX: 
            function( _ix ){
                if( typeof _ix != undefined ){
                    return this._columnX[ _ix ] || 0;
                }
                return this._columnX;
            }


        , fixRowIndexOneChild:
            function(){
                var _p = this, _sx = 0, _sy = 0;

                for( var i = 1; i < _p.gridMaxColumn(); i++ ){
                    var _rowList = _p.gridIdColumnIndexMap()[ i ]
                        , _tmp
                        ;
                    $.each( _rowList, function( _k, _item ){
                        if( _item.nodes && _item.nodes && _item.nodes.length === 1 && !_item.isFixOne ){
                            _maxIndex = _item.rowIndex;
                            _item.isFixOne = true;
                            var _tmpNodes = _item.nodes
                                , _maxIndex = _item.rowIndex
                                ;
                            while( _tmpNodes && _tmpNodes.length ){
                                _tmpNodes[0].rowIndex > _maxIndex && ( _maxIndex = _tmpNodes[0].rowIndex );
                                _tmpNodes[0].isFixOne = true;
                                if( _tmpNodes[0].nodes && _tmpNodes[0].nodes.length === 1 ){
                                    _tmpNodes = _tmpNodes[0].nodes[0];
                                }else{
                                    break;
                                }
                            }

                            _item.rowIndex = _maxIndex;
                        } else if( _item.isFixOne && _item.pid && _item.pid.length === 1 ){
                            _item.rowIndex = _p.gridIdMap( _item.pid[0]).rowIndex;
                        } else if( _item.pid && _item.pid.length === 1 && _p.gridIdMap( _item.pid[0] ).nodes.length === 1 ){
                            _item.rowIndex = _p.gridIdMap( _item.pid[0]).rowIndex;
                        } else if( _item.targetNode 
                            && ( _tmp = _p.gridIdMap()[ _item.targetNode ] )
                            && _tmp.pid
                            && _tmp.pid.length === 1
                            ){
                            _tmp.rowIndex = _item.rowIndex;
                            _tmp.isFixOne = true;
                        }
                    });
                }
            }

        , fixRowIndexMultiChild:
            function(){
                var _p = this, _sx = 0, _sy = 0, _first, _last, _spaceIx, _ix;
                for( var i = 1; i < _p.gridMaxColumn(); i++ ){
                    var _rowList = _p.gridIdColumnIndexMap()[ i ]
                        ;
                    $.each( _rowList, function( _k, _item ){

                        if( _item.pid && _item.pid.length > 1 ){
                            _first = _p.gridIdMap(  )[ arrayFirst( _item.pid ) ];
                            _last = _p.gridIdMap(  )[ arrayLast( _item.pid ) ];
                            _spaceIx = _last.rowIndex - _first.rowIndex;
                            _ix = _first.rowIndex + Math.ceil( Math.abs( _spaceIx ) / 2 );
                            //JC.log( _item.name, arrayFirst( _item.pid ), arrayLast( _item.pid ), _first.rowIndex, _last.rowIndex, _spaceIx, _ix );
                            _item.rowIndex = _ix;
                        }

                        if( _item.nodes && _item.nodes.length > 1 ){
                            _first = arrayFirst( _item.nodes );
                            _last = arrayLast( _item.nodes );
                            _spaceIx = _last.rowIndex - _first.rowIndex;
                            _ix = _first.rowIndex + Math.ceil( Math.abs( _spaceIx ) / 2 );
                            //JC.log( _item.name, _first.rowIndex, _last.rowIndex, _spaceIx, _ix );
                            _item.rowIndex = _ix;
                        }
                    });
                }
            }

        , fixRowIndex:
            function(){
                var _p = this, _sx = 0, _sy = 0;
                for( var i = 0; i <= _p.gridMaxColumn(); i++ ){
                    var _rowList = _p.gridIdColumnIndexMap()[ i ]
                        ;
                    $.each( _rowList, function( _k, _item ){
                        var _rowIx = _p.gridOffsetRowIndex() - _item.rowIndex
                            ;
                        _item.rowIndex = _rowIx;
                    });
                }
            }

        , initRowIndex:
            function(){
                var _p = this;

                for( var i = 0; i <= _p.gridMaxColumn(); i++ ){
                    //JC.log( i, JC.f.ts() );
                    var _rowList = _p.gridIdColumnIndexMap()[ i ]
                        , _preList = _p.gridIdColumnIndexMap()[ i - 1 ]
                        , _len = _rowList.length
                        , _preLen = _preList ? _preList.length : 0
                        ;
                    //JC.dir( _rowList );

                   /**
                    * 这里的逻辑认为 起始节点 和 结束节点都只有一个
                    */
                   if( i === 0 || i === _p.gridMaxColumn() ){
                        $.each( _rowList, function( _k, _item ){
                            _item.rowIndex = _p.gridOffsetRowIndex();
                        });
                        continue;
                    }

                   var _minRowIndex = _p.gridOffsetRowIndex()
                       , _maxRowIndex = _p.gridOffsetRowIndex()
                       , _itemIndexLen = 1
                       , _startIndex = _p.gridOffsetRowIndex()
                       ;
                   if( _rowList.length > 1 ){
                       _itemIndexLen = _rowList.length * 2;
                   }
                   _startIndex = _startIndex - Math.floor( _itemIndexLen / 2 );
                   /*
                   if( _rowList.length % 2 === 0 ){
                       _startIndex += 1;
                   }else{
                   }*/
                   _startIndex += 1;

                    $.each( _rowList, function( _k, _item ){
                        $.each( _item.pid, function( _sk, _sitem ){
                            var _tmpItem = _p.gridIdMap()[ _sitem ];
                            //JC.log( _k, _sk, _tmpItem.rowIndex, JC.f.ts() );
                            _tmpItem.rowIndex < _minRowIndex && ( _minRowIndex = _tmpItem.rowIndex );
                            _tmpItem.rowIndex > _maxRowIndex && ( _maxRowIndex = _tmpItem.rowIndex );
                        });
                        _item.rowIndex = _startIndex + _k * 2;
                    });
                    //JC.log( _minRowIndex, _maxRowIndex, JC.f.ts() );

                    //JC.log( JC.f.printf( 'i: {0}, len: {1}, preLen: {2}', i, _len, _preLen ), JC.f.ts() );
                }
            }

        , gridMaxColumn:
            function( _setter ){
                typeof _setter != 'undefined' && ( this.grid().maxColumn = _setter );
                return this.grid().maxColumn;
            }

        , gridRowIndexPad:
            function( _setter ){
                typeof _setter != 'undefined' && ( this.grid().rowIndexPad = _setter );
                return this.grid().rowIndexPad;
            }

        , initColumnIndexMap:
            function(){
                var _p = this;
                $.each( _p.gridIdColumnIndex(), function( _k, _item ){
                    if( _item.columnIndex in _p.gridIdColumnIndexMap() ){
                        _p.gridIdColumnIndexMap()[ _item.columnIndex ].unshift( _item );
                    }else{
                        _p.gridIdColumnIndexMap()[ _item.columnIndex ] = [ _item ];
                    }
                });
            }

        , initIdColumnIndex:
            function( _data, _id, _ix, _processSelf ){
                var _p = this, _childIx = _ix + 1, _targetNodeIx = _childIx + 1;
                //JC.log( _ix, _data.name, _id, JC.f.ts() );
                _data.id = _id;
                _data.pid = _data.pid || [];
                _data.columnIndex = _ix;
                _p.gridIdColumnIndex()[ _id ] = _data;
                _p.gridIdMap()[ _id ] = _data;

                _ix > _p.gridMaxColumn() && _p.gridMaxColumn( _ix );

                if( _data.nodes && _data.nodes.length ){
                    var _targetNodes = {};
                    $.each( _data.nodes, function( _k, _item ){
                        _item.pid = _item.pid || [];
                        _item.pid.push( _id );

                        _p.initIdColumnIndex( _item, _item.id, _childIx, false, _id );
                        if( ( 'targetNode' in _item ) && _item.targetNode in _p.data().targetNodes  ){
                            _targetNodes[ _item.targetNode ] = _item.targetNode;

                            _p.data().targetNodes[ _item.targetNode ].pid = _p.data().targetNodes[ _item.targetNode ].pid || [];
                            _p.data().targetNodes[ _item.targetNode ].pid.push( _item.id );
                        }
                    });

                    $.each( _targetNodes, function( _k, _item ){
                        _p.initIdColumnIndex( _p.data().targetNodes[ _k ], _k, _targetNodeIx, true );
                    });
                }
                if( _processSelf && ( 'targetNode' in _data ) && ( _data.targetNode in _p.data().targetNodes ) ){
                    _p.data().targetNodes[ _data.targetNode ].pid = _p.data().targetNodes[ _data.targetNode ].pid || [];
                    _p.data().targetNodes[ _data.targetNode ].pid.push( _id );
                    _p.initIdColumnIndex( _p.data().targetNodes[ _data.targetNode ], _data.targetNode, _childIx, true );
                }
            }

        , buildLayout:
            function(){
                var _p = this;
                _p._layout = $( '<div class="js_compFlowChartLayout"></div>' );
                _p._raphaelPlaceholder = $( '<div class="js_compFlowChartRaphael" style="position: absolute;"></div>' );
                _p._box = $( '<div class="js_compFlowChartBox" style=""></div>' );
                _p._raphaelPlaceholder.appendTo( _p.selector() );
                _p._box.appendTo( _p._layout );
                _p._layout.appendTo( _p.selector() );
            }
        , layout: function(){ return this._layout; }
        , box: function(){ return this._box; }
        , raphaelPlaceholder: function(){ return this._raphaelPlaceholder; }
        , width: function(){ return Math.abs( this._maxX - this._minX ); }
        , height: function(){ return Math.abs( this._maxY - this._minY + 5 ); }

        , listHasChildline:
            function( _list ){
                var _r = false;
                $.each( _list, function( _k, _item ){
                    if( ( _item.nodes && _item.nodes.length > 1 ) ){
                        _r = true;
                        return false;
                    }
                });
                return _r;
            }

        , listHasParentline:
            function( _list ){
                var _r = false, _tmp = {};
                $.each( _list, function( _k, _item ){
                    if( _item.targetNode in _tmp ){
                        _r = true;
                        return false;
                    }
                    if( _item.targetNode && !( _item.targetNode in _tmp ) ){
                        _tmp[ _item.targetNode ] = 1;
                    }
                });
                return _r;
            }

    });

    JC.f.extendObject( FlowChart.View.prototype, {
        init:
            function(){
                //JC.log( 'FlowChart.View.init:', new Date().getTime() );
            }

        , draw:
            function(){
                var _p = this, _st, _et;
                if( !( _p._model.data() && _p._model.data().name ) ) return;

                _st = JC.f.ts();

                _p._model.buildLayout();
                _p._model.initGrid();
                _p._model.layout().css( { 
                    'margin-top': Math.abs( _p._model.minY() ) + 'px' 
                    , 'height': Math.abs( _p._model.maxY() - _p._model.minY() ) / 2 + _p._model.gridHeight() / 2 + 'px'
                } );
                _p._model.raphaelPlaceholder().css( { 
                    'margin-top': -Math.abs( _p._model.minY() ) + 'px' 
                } );

                _p.showGrid();
                _p.showLine();

                _et = JC.f.ts();

                JC.log( 'time span:', _et - _st );
            }

        , showLine:
            function(){
                var _p = this, _rh, _raphael, _y = Math.abs( _p._model.minY() );
                _rh = _raphael = Raphael( _p._model.raphaelPlaceholder()[0], _p._model.width(), _p._model.height() );

                var _lineStyle = {
                        'stroke': '#E1E1E1', 'stroke-width': 2
                    }
                    , _iconStyle = {
                        'stroke': '#E1E1E1', 'stroke-width': 2, 'fill': '#F2F2F2'
                    }
                    ;

                for( var i = 0; i <= _p._model.gridMaxColumn(); i++ ){
                    var _rowList = _p._model.gridIdColumnIndexMap()[ i ]
                        , _hasChildline = _p._model.listHasChildline( _rowList )
                        , _hasParentline = _p._model.listHasParentline( _rowList )
                        , _columnX = _p._model.columnX( i )
                        , _columnWidth = _p._model.columnWidth( i )
                        , _startX = _columnX + _columnWidth
                        , _realStartX
                        , _lineWidth = _p._model.lineWidth()
                        ;

                    if( _hasParentline ){
                        _lineWidth += _p._model.childLineWidth();
                    }

                    if( _hasChildline ){
                        _lineWidth += _p._model.parentLineWidth();
                    }

                    //JC.log( i, _columnX, _columnWidth, _startX );

                    $.each( _rowList, function( _k, _item ){
                        var _node = _p._model.item( _item.id )
                            , _pid = _item.pid
                            , _nodes = _item.nodes
                            , _subitem
                            , _realStartX
                            , _realY
                            , _fitem, _litem
                            , _fnode, _lnode
                            , _xpad = 0
                            , _sx, _sy
                            ;

                        if( !( _pid || _nodes ) ) return; 

                        if(  _pid && _pid.length > 1 ){

                            _realStartX = _columnX + _columnWidth + _p._model.parentLineWidth();

                            _fitem = _p._model.gridIdMap( arrayFirst( _pid ) );
                            _litem = _p._model.gridIdMap( arrayLast( _pid ) );
                            _fnode = _p._model.item( _fitem.id );
                            _lnode = _p._model.item( _litem.id );

                            _rh.path( JC.f.printf( 
                                '{0}M{1} {2}L{3} {4}'
                                , ''
                                , _fitem.x + _fnode.outerWidth(), _fitem.y + Math.abs( _p._model.minY() ) +  _fnode.outerHeight() / 2 + 1
                                , _item.x, _item.y + Math.abs( _p._model.minY() ) + _node.outerHeight() / 2 + 1
                            )).attr( _lineStyle );

                            _rh.path( JC.f.printf( 
                                '{0}M{1} {2}L{3} {4}'
                                , ''
                                , _litem.x + _fnode.outerWidth(), _litem.y + Math.abs( _p._model.minY() ) +  _lnode.outerHeight() / 2 + 1
                                , _item.x, _item.y + Math.abs( _p._model.minY() ) + _node.outerHeight() / 2 + 1
                            )).attr( _lineStyle );

                        }

                        if( _nodes && _nodes.length ){
                            if( _nodes.length > 1 ){
                                _realStartX = _columnX + _columnWidth + _p._model.childLineWidth();

                                _fitem = arrayFirst( _nodes );
                                _litem = arrayLast( _nodes );
                                _fnode = _p._model.item( _fitem.id );
                                _lnode = _p._model.item( _litem.id );

                                _rh.path( JC.f.printf( 
                                    '{0}M{1} {2}L{3} {4}'
                                    , ''
                                    , _fitem.x, _fitem.y + Math.abs( _p._model.minY() ) +  _fnode.outerHeight() / 2 + 1
                                    , _item.x + _node.outerWidth(), _item.y + Math.abs( _p._model.minY() ) + _node.outerHeight() / 2 + 1
                                )).attr( _lineStyle );

                                _rh.path( JC.f.printf( 
                                    '{0}M{1} {2}L{3} {4}'
                                    , ''
                                    , _litem.x, _litem.y + Math.abs( _p._model.minY() ) +  _lnode.outerHeight() / 2 + 1
                                    , _item.x + _node.outerWidth(), _item.y + Math.abs( _p._model.minY() ) + _node.outerHeight() / 2 + 1
                                )).attr( _lineStyle );

                            }

                            if( _nodes.length === 1 ){
                                _realStartX = _columnX + _node.outerWidth();
                                _realY = _item.y + _node.outerHeight() / 2 + 1;

                                _subitem = _nodes[0];
                                _rh.path( JC.f.printf( 
                                    '{0}M{1} {2}L{3} {4}'
                                    , '', _realStartX, _realY + _y, _subitem.x - 20, _realY + _y
                                )).attr( _lineStyle );
                                _rh.JCTriangle( 16, _subitem.x - 20, _realY + _y, _iconStyle );
                            }
                        }
                    });
                }

            }

        , showGrid:
            function(){
                var _p = this;
                for( var i = 0; i <= _p._model.gridMaxColumn(); i++ ){
                    var _rowList = _p._model.gridIdColumnIndexMap()[ i ]
                        ;
                    $.each( _rowList, function( _k, _item ){
                        var _node = _p._model.item( _item.id )
                            ;
                        _node.css({
                            'left': _item.x + 'px', 'top': _item.y + 'px'
                        });
                    });
                }
            }
    });

    function arrayFirst( _a ){
        var _r;
        _a && _a.length && ( _r = _a[0] );
        return _r;
    }

    function arrayLast( _a ){
        var _r;
        _a && _a.length && ( _r = _a[ _a.length - 1] );
        return _r;
    }

    function distanceAngleToPoint( _distance, _angle){
        var _radian = _angle * Math.PI / 180;					
        return {
            x: ( Math.cos( _radian  ) * _distance )
            , y: ( Math.sin( _radian ) * _distance )
        }
    }

    Raphael.fn.JCTriangle =
        function( _sideLength, _x, _y, _params, _offsetAngle ){
            !_sideLength && ( _sideLength = 16 );
            !_x && ( _x = 0 );
            !_y && ( _y = _sideLength / 2 );
            _y += 1;
            typeof _offsetAngle == 'undefined' && ( _offsetAngle = 180 );

            var _p1 = distanceAngleToPoint( _sideLength, 330 )
                , _p2 = distanceAngleToPoint( _sideLength, 30 )
                , _p3 = distanceAngleToPoint( _sideLength, 120 )
                ;

                _p1.x = parseInt( _p1.x +  _x );
                _p1.y = parseInt( _p1.y + _y );

                _p2.x = parseInt( _p2.x + _x );
                _p2.y = parseInt( _p2.y + _y );

                //document.title = [ _p1.x, _p1.y, _p2.x, _p2.y ];
                //JC.log( document.title );

            var _r = this.path(
                JC.f.printf( 
                    '{0}M{1} {2}L{3} {4}L{5} {6}L{1} {2}Z'
                    , ''
                    , _x, _y 
                    , _p1.x, _p1.y
                    , _p2.x, _p2.y
                )
            );
            _r.rotate( _offsetAngle );
            _params && _r.attr( _params );
            return _r;
        };

    _jdoc.ready( function(){
        FlowChart.autoInit && FlowChart.init();
    });

    return JC.FlowChart;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
