/**
 * 支持 多对多 关系( 目前只支持 一对多 和 多对一 )
 */
 ;(function(define, _win) { 'use strict'; define( [ 'Raphael', 'JC.BaseMVC', 'JC.PopTips' ], function(){
/**
 * <dl>
 *      <dt>JC 流程图</dt>
 *      <dd style="">一对多关系</dd>
 *      <dd>多对一关系</dd>
 *      <dd style="color:#ccc;text-decoration: line-through;">多对多关系</dd>
 * </dl>
 *  <p><b>require</b>:
 *      <a href='window.Raphael.html'>RaphaelJS</a>
 *      , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 *      , <a href='JC.PopTips.html'>JC.PopTips</a>
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
 *      <dt>data-FlowChart = script json data</dt>
 *      <dd>流程图数据
 *          <dl>
 *              <dt>数据说明</dt>
 *              <dd>数据按节点关系分为两大类: 一对多, 多对一</dd>
 *              <dd>
 *                  <dl>
 *                      <dt>一对多数据</dt>
 *                      <dd>一对多数据存放于字段: nodes, nodes 数据类型为数组</dd>
 *                      <dd>nodes 字段位于数据节点里</dd>
 *                  </dl>
 *                  <dl>
 *                      <dt>多对一数据</dt>
 *                      <dd>多对一数据存放于字段: targetNodes, targetNodes 数据类型为对象</dd>
 *                      <dd>targetNodes 字段为全局节点</dd>
 *                  </dl>
 *              </dd>
 *          </dl>
 *          <dl>
 *              <dt>数据字段说明</dt>
 *              <dd>
 *                  <dl>
 *                      <dt>chart = object</dt>
 *                      <dd>图表数据</dd>
 *
 *                      <dt>name = string</dt>
 *                      <dd>节点名</dd>
 *
 *                      <dt>id = string</dt>
 *                      <dd>节点唯一标识符</dd>
 *
 *                      <dt>nodes = array</dt>
 *                      <dd>一对多数据的子节点, 该字段位于父节点里面</dd>
 *
 *                      <dt>targetNodes = object</dt>
 *                      <dd>多对一数据的子节点, 该字段为全局字段, 节点位置 chart.targetNodes</dd>
 *
 *                      <dt>status = string, default = 0</dt>
 *                      <dd>
 *                          节点状态
 *                          <br/>根据 status 显示为不同的样式
 *                          <br/>默认有0 ~ 10, 共11 种状态
 *                          <br/>由status 产生的 css class: js_cfcItemStatus_N, js_cfcItemTips_N ( N 代表 status )
 *                      </dd>
 *
 *                      <dt>tipsHtml = string</dt>
 *                      <dd>鼠标划过节点时, 显示的tips内容, 支持html内容</dd>
 *                  </dl>
 *              </dd>
 *          </dl>
 *      <dd>
 *  </dl> 
 *
 * @namespace   JC
 * @class       FlowChart
 * @extends     JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2014-09-03
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
<pre>
    &lt;div class="js_compFlowChart" data-FlowChart="|script">
        &lt;script type="text/template">
            {
                chart: {
                    name: '提交'
                    , id: 1
                    , nodes: [
                            {
                                name: '资质审核'
                                , id: 2
                                , status: 1
                                , tipsHtml: 'username 1'
                                , nodes: [
                                    {
                                        name: '服务审核'
                                        , id: 3
                                        , targetNode: 5
                                        , status: 2
                                        , tipsHtml: 'username 2'
                                    }
                                    , {
                                        name: '渠道管理层'
                                        , id: 4
                                        , status: 3
                                        , tipsHtml: 'username 3'
                                    }
                                ]
                            }
                            , {
                                name: '资质审核1'
                                , id: 6
                                , status: 4
                                , tipsHtml: 'username 4'
                                , nodes: [
                                    {
                                        name: '服务审核1'
                                        , id: 7
                                        , targetNode: 9
                                        , status: 5
                                        , tipsHtml: 'username 5'
                                    }
                                    , {
                                        name: '渠道管理层1'
                                        , id: 8
                                        , targetNode: 9
                                        , status: 6
                                        , tipsHtml: 'username 6'
                                    }
                                ]
                            }
                            , {
                                name: '资质审核2'
                                , id: 10
                                , status: 7
                                , tipsHtml: 'username 7'
                                , nodes: [
                                    {
                                        name: '服务审核2'
                                        , id: 11
                                        , status: 8
                                        , tipsHtml: 'username 8'
                                        , nodes: [
                                            {
                                                name: '管理层2'
                                                , id: 12
                                                , targetNode: 5
                                                , status: 9
                                                , tipsHtml: 'username 9'
                                            }
                                        ]
                                    }
                                ]
                            }
                            , {
                                name: '资质审核3'
                                , id: 15
                                , status: 10
                                , tipsHtml: 'username 10'
                            }
                    ]
                    , targetNodes: {
                        '5': {
                            name: '管理层'
                        }
                        , '9': {
                            name: '管理层1'
                            , targetNode: 5
                        }
                    }
                }
            }
        &lt;/script>
    &lt;/div>
</pre>

 */
    var _jdoc = $( document ), _jwin = $( window );
    var isIE = !!window.ActiveXObject;

    JC.FlowChart = FlowChart;

    if( JC.use ){
        !window.Raphael && ( JC.use( 'plugins.raphael' ) );
        !JC.PopTips && ( JC.use( 'JC.PopTips' ) );
    }

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

                    if( !_p._model.chartData() ) return;
                    _p._view.draw();
                });

                //JC.dir( _p._model.chartData() );
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

        , chartData:
            function(){
                return this.data().chart;
            }

        , initGrid:
            function(){
                var _p = this;
                _p._grid = { 
                    data: []
                    , idColumnIndex: {}
                    , idColumnIndexList: []
                    , row: {}
                    , idMap: {}
                    , columnIndexMap: {}
                    , maxColumn: 0
                    , rowIndexPad: 0
                    , offsetRowIndex: 10000 
                };

                _p.initIdColumnIndex( _p.chartData(), _p.chartData().id, 0, 0, 0 );
                _p.initColumnIndexMap();
                _p.initRowIndex();
                _p.fixRowIndex();
                _p.fixRowIndexOneChild();
                _p.fixRowIndexMultiChild();
                _p.fixRowIndexMultiChild();
                _p.fixFistLastRowIndex();

                JC.log(  'xxxxxxx', _p._minRowY, _p._maxRowY);


                _p.createItems();
                _p.calcRealPosition();

                //JC.dir( _p.gridIdColumnIndex() );
                JC.dir( _p.gridIdColumnIndexMap() );
                //JC.log( _p.gridMaxColumn() );
            }

        , grid: function(){ return this._grid; }

        , gridIdColumnIndex: function(){ return this.grid().idColumnIndex; }
        , gridIdColumnIndexList: function(){ return this.grid().idColumnIndexList; }
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

        , itemHtmlPattern:
            function( _item ){
                var _r = '{0}';
                ( 'tipsHtml' in _item )
                    && _item.tipsHtml
                    && ( _r = this.tipsTpl() );
                return _r;
            }

        , tipsTpl:
            function(){

                if( !this._tipsTpl ){
                    this._tipsTpl = FlowChart.TIPS_TPL;
                    this._tipsTpl = this.scriptTplProp( 'cfcTipsTpl' ) || this._tipsTpl;
                }

                return this._tipsTpl;
            }

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
                        var _itemHtmlPatter = JC.f.printf( _p.itemHtmlPattern( _item ), _item.name, _item.tipsHtml, _p.getStatus( _item ) )
                            , _html = JC.f.printf( 
                                '<div class="js_cfcItem js_cfcItemStatus_{1}" style="position:absolute; left: -1000px;">{0}</div>'
                                , _itemHtmlPatter
                                , _p.getStatus( _item )
                            )  
                            , _node = $( _html )
                            , _tmpWidth
                            ;
                        _node.appendTo( _p.box() );
                        _node.data( 'nodeData', _item );
                        _p._items[ _item.id ] = _node;
                        _tmpWidth = _node.outerWidth();
                        _tmpWidth > _maxWidth && ( _maxWidth = _tmpWidth );

                        //JC.log( _html );
                    });
                    if( i === 0 ){
                        _maxWidth = Math.ceil( _p._items[ _p.chartData().id ].width() + 30 );
                    }
                    _p._columnWidth.push( _maxWidth );
                }
            }

        , getStatus:
            function( _itemData ){
                var _r = 0;
                ( 'status' in _itemData ) && ( _r = _itemData.status );
                return _r;
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
                        //JC.log( i, _item.name, _x, _y, _item.rowIndex );
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
                //JC.log( _p._minY, _p._maxY )

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

        , fixFistLastRowIndex:
            function(){
                var _p = this;
                if( !( _p._maxRowY && _p.gridMaxColumn() > 0 ) ) return;
                var _cY = Math.ceil( _p._maxRowY / 2 );
                var _fcol = _p.gridIdColumnIndexMap()[0]
                    , _lcol = _p.gridIdColumnIndexMap()[ _p.gridMaxColumn() ]
                    ;
                if( !( _fcol.length === 1 && _lcol.length === 1 ) ) return;
                _fcol[0].rowIndex = _cY;
                _lcol[0].rowIndex = _cY;

            }

        , fixRowIndexOneChild:
            function(){
                var _p = this, _sx = 0, _sy = 0;

                for( var i = 1; i < _p.gridMaxColumn(); i++ ){
                    var _rowList = _p.gridIdColumnIndexMap()[ i ]
                        , _rowLen = _rowList.length
                        , _tmp
                        ;
                    $.each( _rowList, function( _k, _item ){
                        if( _item.nodes && _item.nodes && _item.nodes.length === 1 && !_item.isFixOne ){
                            _maxIndex = _item.rowIndex;
                            _item.isFixOne = true;
                            var _tmpNodes = _item.nodes
                                , _maxIndex = _item.rowIndex
                                , _tmpCount = _k + 1
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
                            while( _tmpCount < _rowLen ){
                                _rowList[ _tmpCount ].rowIndex = _maxIndex + ( _tmpCount - _k );
                                _tmpCount++;
                            }
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
                _p._minRowY = 0;
                _p._maxRowY = 1;
                for( var i = 1; i < _p.gridMaxColumn(); i++ ){
                    var _rowList = _p.gridIdColumnIndexMap()[ i ]
                        , _nextList = _p.gridIdColumnIndexMap()[ i + 1 ]
                        ;
                    $.each( _rowList, function( _k, _item ){
                        var _preItem = _rowList[ _k - 1 ], _tmpIx, _tmpSpaceIx, _fix
                            , _nextItem = _rowList[ _k + 1 ];
                            ;
                            var _oldIx = _item.rowIndex, _needFix;

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

                            if( _preItem && _ix <= _preItem.rowIndex ){
                                _needFix = true;
                                _tmpIx = _ix;
                                _ix = _item.rowIndex;
                                _tmpSpaceIx = _ix - _tmpIx;

                                if( _nextList ){
                                    $.each( _nextList, function( _sk, _sitem ){
                                        if( _sitem.id === _first.id ){
                                            _fix = true;
                                        }

                                        if( _fix ){
                                            _sitem.rowIndex += _tmpSpaceIx;
                                        }
                                    });
                                }
                            }

                            if( _tmpSpaceIx ){
                                _needFix = true;
                                for( var j = _k + 1; j < _rowList.length; j++ ){
                                    _rowList[ j ] && ( _rowList[ j ].rowIndex += _tmpSpaceIx  );
                                }
                            }
                            _item.rowIndex = _ix;

                            if( _needFix && _tmpSpaceIx ){
                                _p.plusParent( i - 1, _item.pid, _tmpSpaceIx );
                            }
                        }
                        if( _item.rowIndex > _p._maxRowY ){
                            _p._maxRowY= _item.rowIndex;
                        }
                    });
                }
            }

        , plusParent: 
            function( _colIx, _pid, _offsetIx ){
                var _p = this, _nextPid;
                if( _colIx < 1 ) return;
                if( !( _pid && _pid.length ) ) return;

                var _rowList = _p.gridIdColumnIndexMap()[ _colIx ], _fix;
                if( !( _rowList && _rowList.length ) ) return;
                $.each( _rowList, function( _k, _item ){
                    if( !_fix ){
                        if( _item.id == _pid[0] ){
                            _fix = true;
                            _pid = _item.pid
                        }
                    }
                    if( _fix ){
                        _item.rowIndex += _offsetIx;
                    }
                });

                _p.plusParent( _colIx - 1, _nextPid, _offsetIx );

            }

        , fixRowIndex:
            function(){
                var _p = this, _sx = 0, _sy = 0, _minY = 0;
                for( var i = 0; i <= _p.gridMaxColumn(); i++ ){
                    var _rowList = _p.gridIdColumnIndexMap()[ i ]
                        ;
                    $.each( _rowList, function( _k, _item ){
                        var _rowIx = _item.rowIndex - _p.gridOffsetRowIndex()
                            ;
                        _item.rowIndex = _rowIx;
                        _rowIx < _minY && ( _minY = _rowIx );
                    });
                }
                if( _minY < 0 ){
                    _minY = Math.abs( _minY );
                    for( var i = 0; i <= _p.gridMaxColumn(); i++ ){
                        var _rowList = _p.gridIdColumnIndexMap()[ i ]
                            ;
                        $.each( _rowList, function( _k, _item ){
                            _item.rowIndex += _minY;
                        });
                    }
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
                    //
                    _preList && ( _preList = _preList.slice().reverse() );

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
                   _startIndex += 1;

                    $.each( _rowList, function( _k, _item ){
                        _item.rowIndex = _startIndex + _k * 2;
                        //JC.log( i, _k, _item.rowIndex );
                    });
                    //JC.log( i, _startIndex );
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
                $.each( _p.gridIdColumnIndexList(), function( _k, _item ){
                    if( _item.columnIndex in _p.gridIdColumnIndexMap() ){
                        _p.gridIdColumnIndexMap()[ _item.columnIndex ].push( _item );
                    }else{
                        _p.gridIdColumnIndexMap()[ _item.columnIndex ] = [ _item ];
                    }
                });
            }

        , initIdColumnIndex:
            function( _data, _id, _ix, _processSelf, _count ){
                var _p = this, _childIx = _ix + 1, _targetNodeIx = _childIx + 1;
                //JC.log( _ix, _data.name, _id, JC.f.ts() );
                if( ( 'columnIndex' in _data ) && _ix < _data.columnIndex ){
                    _ix = _data.columnIndex;
                }

                if( !( _id in _p.gridIdMap() ) ){
                    _p.gridIdColumnIndexList().push( _data );
                }

                _data.id = _id;
                _data.pid = _data.pid || [];
                _data.columnIndex = _ix;
                _p.gridIdColumnIndex()[ _id ] = _data;
                _p.gridIdMap()[ _id ] = _data;
                _data.zindex = _count++;


                _ix > _p.gridMaxColumn() && _p.gridMaxColumn( _ix );

                if( _data.nodes && _data.nodes.length ){
                    var _targetNodes = {};
                    $.each( _data.nodes, function( _k, _item ){
                        _item.pid = _item.pid || [];
                        _item.pid.push( _id );

                        if( ( 'targetNode' in _item ) && _item.targetNode in _p.chartData().targetNodes  ){
                            _targetNodes[ _item.targetNode ] = _item.targetNode;

                            _p.chartData().targetNodes[ _item.targetNode ].pid = _p.chartData().targetNodes[ _item.targetNode ].pid || [];
                            _p.chartData().targetNodes[ _item.targetNode ].pid.push( _item.id );
                        }
                        _p.initIdColumnIndex( _item, _item.id, _childIx, false, _count );
                    });

                    $.each( _targetNodes, function( _k, _item ){
                        _p.initIdColumnIndex( _p.chartData().targetNodes[ _k ], _k, _targetNodeIx, true, _count );
                    });
                }              

                if( _processSelf && ( 'targetNode' in _data ) && ( _data.targetNode in _p.chartData().targetNodes ) ){
                    _p.chartData().targetNodes[ _data.targetNode ].pid = _p.chartData().targetNodes[ _data.targetNode ].pid || [];
                    _p.chartData().targetNodes[ _data.targetNode ].pid.push( _id );
                    _p.initIdColumnIndex( _p.chartData().targetNodes[ _data.targetNode ], _data.targetNode, _childIx, true, _count  );
                }
            }

        , buildLayout:
            function(){
                var _p = this;
                _p._container = $( '<div class="js_cfcContainer"></div>' );
                _p._layout = $( '<div class="js_cfcLayout"></div>' );
                _p._raphaelPlaceholder = $( '<div class="js_cfcRaphael" style="position: absolute;"></div>' );
                _p._box = $( '<div class="js_cfcBox" style=""></div>' );
                _p._raphaelPlaceholder.appendTo( _p._layout );
                _p._box.appendTo( _p._layout );
                _p._layout.appendTo( _p._container );
                _p._container.appendTo( _p.selector() );
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
                if( !( _p._model.chartData() && _p._model.chartData().name ) ) return;

                _st = JC.f.ts();

                _p._model.buildLayout();
                _p._model.initGrid();
                _p._model.layout().css( { 
                    'height': Math.abs( _p._model.maxY() ) + 'px'
                } );

                _p.showGrid();
                _p.showLine();

                JC.PopTips.init( _p.selector() );

                _et = JC.f.ts();

                JC.log( 'time span:', _et - _st );
            }

        , showLine:
            function(){
                var _p = this, _rh, _raphael, _y = Math.abs( _p._model.minY() ), _ypad = 0;
                _rh = _raphael = Raphael( _p._model.raphaelPlaceholder()[0], _p._model.width(), _p._model.height() );
                !isIE && ( _ypad = 1 );

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
                        , _preColumnX = _p._model.columnX( i - 1 )
                        , _columnWidth = _p._model.columnWidth( i )
                        , _preColumnWidth = _p._model.columnWidth( i - 1 )
                        , _startX = _columnX + _columnWidth
                        , _realStartX
                        , _lineWidth = _p._model.lineWidth()
                        , _xpad = 0
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
                            , _ex, _sx, _sy, _ey
                            , _tmpX
                            , _midY
                            , _tmpY, _tmpY1, _tmpY2
                            , _endX 
                            , _sdata, _snode
                            , _path
                            ;

                        if( !( _pid || _nodes ) ) return; 

                        if(  _pid && _pid.length  ){
                            _fitem = _p._model.gridIdMap( arrayFirst( _pid ) );
                            _fnode = _p._model.item( _fitem.id );

                            if( _pid.length > 1 ){
                                _realStartX = _preColumnX + _preColumnWidth + _p._model.parentLineWidth();
                                _litem = _p._model.gridIdMap( arrayLast( _pid ) );
                                _lnode = _p._model.item( _litem.id );

                                _midY = _item.y + Math.abs( _p._model.minY() ) + _node.outerHeight() / 2 + _ypad;
                                _tmpY1 = _fitem.y + Math.abs( _p._model.minY() ) +  _fnode.outerHeight() / 2 + _ypad;
                                _tmpY2 = _litem.y + Math.abs( _p._model.minY() ) +  _lnode.outerHeight() / 2 + _ypad;

                                _endX =  _item.x - 18;

                                _rh.path( JC.f.printf( 
                                    '{0}M{1} {2}L{3} {4}M{5} {6}L{7} {8}'
                                    , ''
                                    , _realStartX, _tmpY1
                                    , _realStartX, _tmpY2
                                    , _realStartX, _midY
                                    , _endX, _midY
                                )).attr( _lineStyle );

                                $.each( _pid, function( _sk, _sitem ){
                                    _sdata = _p._model.gridIdMap( _sitem );
                                    _snode = _p._model.item( _sdata.id );
                                    _tmpY = _sdata.y + Math.abs( _p._model.minY() ) +  _snode.outerHeight() / 2 + _ypad;

                                    _rh.path( JC.f.printf( 
                                        '{0}M{1} {2}L{3} {4}'
                                        , ''
                                        , _sdata.x, _tmpY
                                        , _realStartX, _tmpY
                                    )).attr( _lineStyle );
                                });

                                _rh.JCTriangle( 16, _endX, _midY, _iconStyle );
                            }else if( _fitem && _pid.length === 1 && ( 'targetNode' in _fitem ) ){
                                _realStartX = _preColumnX + _fnode.outerWidth();
                                _realY = _fitem.y + _fnode.outerHeight() / 2;
                                _item.y = _fitem.y;

                                _rh.path( JC.f.printf( 
                                    '{0}M{1} {2}L{3} {4}'
                                    , '', _realStartX, _realY + _ypad, _item.x - 18, _realY + _ypad
                                )).attr( _lineStyle );
                                _rh.JCTriangle( 16, _item.x - 18, _realY + _ypad, _iconStyle );
                            }
                        }

                        if( _nodes && _nodes.length ){
                            if( _nodes.length > 1 ){

                                _sx = _item.x + _node.outerWidth();

                                _fitem = arrayFirst( _nodes );
                                _litem = arrayLast( _nodes );
                                _fnode = _p._model.item( _fitem.id );
                                _lnode = _p._model.item( _litem.id );

                                //JC.log( _item.id, _fitem.name, _litem.name );

                                _ex = _fitem.x;
                                _realStartX = _ex - _p._model.childLineWidth();

                                _midY = _item.y + Math.abs( _p._model.minY() ) + _node.outerHeight() / 2 + _ypad;

                                _rh.path( JC.f.printf( 
                                    '{0}M{1} {2}L{3} {4}'
                                    , ''
                                    , _sx, _midY
                                    , _realStartX - 18, _midY
                                )).attr( _lineStyle );

                                _rh.JCTriangle( 16, _realStartX - 18, _midY, _iconStyle );

                                _tmpY1 = _fitem.y + Math.abs( _p._model.minY() ) +  _fnode.outerHeight() / 2 + _ypad;
                                _tmpY2 = _litem.y + Math.abs( _p._model.minY() ) +  _lnode.outerHeight() / 2 + _ypad;

                                _endX =  _item.x - 18;

                                _rh.path( JC.f.printf( 
                                    '{0}M{1} {2}L{3} {4}'
                                    , ''
                                    , _realStartX, _tmpY1
                                    , _realStartX, _tmpY2
                                )).attr( _lineStyle );

                                $.each( _nodes, function( _sk, _sitem ){
                                    _sdata = _sitem;
                                    _snode = _p._model.item( _sdata.id );
                                    _tmpY = _sdata.y + Math.abs( _p._model.minY() ) +  _snode.outerHeight() / 2 + _ypad;

                                    _rh.path( JC.f.printf( 
                                        '{0}M{1} {2}L{3} {4}'
                                        , ''
                                        , _realStartX, _tmpY
                                        , _sdata.x, _tmpY
                                    )).attr( _lineStyle );
                                });

                            }

                            if( _nodes.length === 1 ){
                                _realStartX = _columnX + _node.outerWidth();
                                _realY = _item.y + _node.outerHeight() / 2;

                                _subitem = _nodes[0];
                                _rh.path( JC.f.printf( 
                                    '{0}M{1} {2}L{3} {4}'
                                    , '', _realStartX, _realY + _y + _ypad, _subitem.x - 18, _realY + _y + _ypad
                                )).attr( _lineStyle );
                                _rh.JCTriangle( 16, _subitem.x - 18, _realY + _y + _ypad, _iconStyle );
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

    FlowChart.TIPS_TPL =
        [
            '<span class="js_compPopTips" style="display:inline-block;"'
            ,'htmlContent="|script"'
            ,'theme="white"'
            ,'arrowposition="bottom"'
            ,'triggerType="hover"'
            ,'offsetXY="0,-4"'
            ,'popTipsMinWidth="100"'
            ,'popTipsMinHeight="50"'
            ,'>'
            ,'<span>{0}</span>'
            ,'<script type="text/template"><div class="js_cfcItemTips js_cfcItemTips_{2}">{1}</div><\/script>'
            ,'</span>'
        ].join('');

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

    _jdoc.ready( function(){

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
