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
                _p._grid = { data: [], idColumnIndex: {}, row: {}, idMap: {}, columnIndexMap: {}, maxColumn: 0 };

                _p.initIdColumnIndex( _p.data(), _p.data().id, 0 );
                _p.initColumnIndexMap();

                //JC.dir( _p.gridColumn() );
                //JC.dir( _p.gridIdMap() );
                //JC.dir( _p.gridIdColumnIndexMap() );
                //JC.log( _p.gridMaxColumn() );
            }

        , grid: function(){ return this._grid; }

        , gridIdColumnIndex: function(){ return this.grid().idColumnIndex; }
        , gridIdColumnIndexMap: function(){ return this.grid().columnIndexMap; }
        , gridRow: function(){ return this.grid().row; }
        , gridIdMap: function(){ return this.grid().idMap; }

        , gridMaxColumn:
            function( _setter ){
                typeof _setter != 'undefined' && ( this.grid().maxColumn = _setter );
                return this.grid().maxColumn;
            }

        , initColumnIndexMap:
            function(){
                var _p = this;
                $.each( _p.gridIdColumnIndex(), function( _k, _item ){
                    if( _item.index in _p.gridIdColumnIndexMap() ){
                        _p.gridIdColumnIndexMap()[ _item.index ].push( _item );
                    }else{
                        _p.gridIdColumnIndexMap()[ _item.index ] = [ _item ];
                    }
                });
            }

        , initIdColumnIndex:
            function( _data, _id, _ix, _processSelf ){
                var _p = this, _childIx = _ix + 1, _targetNodeIx = _childIx + 1;
                //JC.log( _ix, _data.name, _id, JC.f.ts() );
                _data.id = _id;

                _p.gridIdColumnIndex()[ _id ] = {
                    index: _ix
                    , data: _data
                };
                _p.gridIdMap()[ _id ] = _data;

                _ix > _p.gridMaxColumn() && _p.gridMaxColumn( _ix );

                if( _data.nodes && _data.nodes.data && _data.nodes.data.length ){
                    var _targetNodes = {};
                    $.each( _data.nodes.data, function( _k, _item ){
                        _p.initIdColumnIndex( _item, _item.id, _childIx );
                        if( ( 'targetNode' in _item ) && _item.targetNode in _p.data().targetNodes  ){
                            _targetNodes[ _item.targetNode ] = _item.targetNode;
                        }
                    });

                    $.each( _targetNodes, function( _k, _item ){
                        _p.initIdColumnIndex( _p.data().targetNodes[ _k ], _k, _targetNodeIx, true );
                    });
                }
                if( _processSelf && ( 'targetNode' in _data ) && ( _data.targetNode in _p.data().targetNodes ) ){
                    _p.initIdColumnIndex( _p.data().targetNodes[ _data.targetNode ], _data.targetNode, _childIx, true );
                }
            }
    });

    JC.f.extendObject( FlowChart.View.prototype, {
        init:
            function(){
                //JC.log( 'FlowChart.View.init:', new Date().getTime() );
            }

        , draw:
            function(){
                var _p = this;
                if( !( _p._model.data() && _p._model.data().name ) ) return;

                _p._model.initGrid();

                _p.buildLayout();
                _p.buildRoot();
            }

        , buildLayout:
            function(){
                var _p = this;
                _p._layout = $( '<div class="js_compFlowChartLayout"></div>' );
                _p._box = $( '<div class="js_compFlowChartBox"></div>' );
                _p._box.appendTo( _p._layout );
                _p._layout.appendTo( _p.selector() );
            }
        , layout: function(){ return this._layout; }
        , box: function(){ return this._box; }

        , buildRoot:
            function(){
                var _p = this, _w, _h, _offset, _radius, _diameter;

                _p._root = $( JC.f.printf( '<span style="cursor:default;">{0}</span>', _p._model.data().name ) );
                _p._root.appendTo( _p.box() );
                _w = _p._root.width();
                _h = _p._root.height();
                _offset = _p._root.position();
                _radius = Math.max( _w, _h ) / 2 + 4;
                _diameter = _radius * 2;

                //JC.log( _w, _h, _offset.left, _offset.top );

                _p._rootBg = new Raphael( _p.box()[0], _diameter + 2, _diameter + 2 );
                _p._rootBg.circle( _radius, _radius, _radius ).attr( { 'stroke-width': 0, 'fill': '#ccc' } );
                _p._root.css( { 'position': 'absolute', top: ( _diameter - _radius ) / 2 , left: ( _diameter - _w ) / 2 } );
            }
    });

    function distanceAngleToPoint( _distance, _angle){
        var _radian = _angle * Math.PI / 180;					
        return {
            x: ( Math.cos( _radian  ) * _distance )
            , y: ( Math.sin( _radian ) * _distance )
        }
    }

    Raphael.fn.JCTriangle =
        function( _sideLength, _params, _x, _y ){
            !_x && ( _x = 0 );
            !_y && ( _y = _sideLength / 2 );
            _y += 1;

            var _p1 = distanceAngleToPoint( _sideLength, 330 )
                , _p2 = distanceAngleToPoint( _sideLength, 30 )
                , _p3 = distanceAngleToPoint( _sideLength, 120 )
                ;

                _p1.x = parseInt( _p1.x +  _x );
                _p1.y = parseInt( _p1.y + _y );

                _p2.x = parseInt( _p2.x + _x );
                _p2.y = parseInt( _p2.y + _y );

                document.title = [ _p1.x, _p1.y, _p2.x, _p2.y ];
                JC.log( document.title );

            var _r = this.path(
                JC.f.printf( 
                    '{0}M{1} {2}L{3} {4}L{5} {6}L{1} {2}Z'
                    , ''
                    , _x, _y 
                    , _p1.x, _p1.y
                    , _p2.x, _p2.y
                )
            );
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
