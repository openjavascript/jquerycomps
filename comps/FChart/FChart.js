;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC', 'swfobject', 'json2', 'jquery.mousewheel'  ], function(){

JC.use && !window.swfobject && JC.use( 'plugins.swfobject' );
JC.use && !window.JSON && JC.use( 'plugins.jsons' );
JC.use && !jQuery.event.special.mousewheel && JC.use( 'plugins.jquery.mousewheel' );

/**
 * JC.FChart - flash 图表组件
 *
 *  <p><b>require</b>:
 *      <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 *      , <a href='window.swfobject.html'>SWFObject</a>
 *      , <a href='window.JSON.html'>JSON2</a>
 *      , <a href='window.jQuery.mousewheel.html'>jQuery.mousewheel</a>
 *  </p>
 *
 *  <p><a href='https://github.com/openjavascript/fchart' target='_blank'>JC Project Site</a>
 *      | <a href='http://fchart.openjavascript.org/docs_api/classes/JC.FChart.html' target='_blank'>API docs</a>
 *      | <a href='../../comps/FChart/_demo?target=_blank' target='_blank'>demo link</a></p>
 *  
 *  <h2>页面只要引用本脚本, 默认会处理 div class="js_compFChart"</h2>
 *
 *  <h2>可用的 HTML attribute</h2>
 *
 *  <dl>
 *      <dt>chartScriptData = script tpl selector</dt>
 *      <dd>图表的脚本模板数据<dd>
 *
 *      <dt>chartDataVar = json object name</dt>
 *      <dd>图表的json数据名, <b>window变量域</b><dd>
 *
 *      <dt>chartWidth = number, default = 100%</dt>
 *      <dd>图表的宽度</dd>
 *
 *      <dt>chartHeight = number, default = 400</dt>
 *      <dd>图表的高度</dd>
 *
 *      <dt>chartScroll = bool, default = true</dt>
 *      <dd>图表是否响应鼠标滚动</dd>
 *  </dl> 
 *
 * @namespace   JC
 * @class       FChart
 * @extends     JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2014-09-09
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
<pre>
    &lt;div class="js_compFChart"
        chartScriptData="|script"
        chartWidth="600"
        chartHeight="400"
        >
        &lt;script type="text/template">
            {
                chart: {
                    type: 'bar' 
                }, 
                title: {
                    text:'Chart Title'
                },
                subtitle: {
                    text: 'sub title'
                }, 
                xAxis: {
                    categories: [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12' ]
                }, 
                yAxis: {
                    title: {
                        text: '(Vertical Title - 中文)'
                    }
                },
                series:[{
                    name: 'Temperature'
                    , data: [-50, 0, 3, -20, -20, 27, 28, 32, 30, 25, 15, -58]
                    , style: { 'stroke': '#ff7100' } 
                    , pointStyle: {}
                }, {
                    name: 'Rainfall',
                    data: [20, 21, 20, 100, 200, 210, 220, 100, 20, 10, 20, 10]
                }],
                credits: {
                    enabled: true
                    , text: 'fchart.openjavascript.org'
                    , href: 'http://fchart.openjavascript.org/'
                },
                displayAllLabel: true,
                legend: {
                    enabled: false
                }
            }
        &lt;/script>
    &lt;/div>
</pre>
 */
    var _jdoc = $( document ), _jwin = $( window );

    JC.FChart = FChart;

    function FChart( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, FChart ) ) 
            return JC.BaseMVC.getInstance( _selector, FChart );

        JC.BaseMVC.getInstance( _selector, FChart, this );

        this._model = new FChart.Model( _selector );
        this._view = new FChart.View( this._model );

        this._init();

        //JC.log( FChart.Model._instanceName, 'all inited', new Date().getTime() );
    }
    /**
     * 初始化可识别的 FChart 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of FChartInstance}
     */
    FChart.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector.length ){
                if( _selector.hasClass( 'js_compFChart' )  ){
                    _r.push( new FChart( _selector ) );
                }else{
                    _selector.find( 'div.js_compFChart' ).each( function(){
                        _r.push( new FChart( this ) );
                    });
                }
            }
            return _r;
        };

    JC.BaseMVC.build( FChart );

    JC.f.extendObject( FChart.prototype, {
        _beforeInit:
            function(){
                //JC.log( 'FChart _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this;

                _p.on( 'inited', function(){
                   var _data = _p._model.parseInitData();

                    if( _data ){
                        _p.trigger( FChart.Model.UPDATE_CHART_DATA, [ _data ] );
                    }
                    _p._model.height() && _p.selector().css( { 'height': _p._model.height() } );
                    JC.log( _p._model.type() );

                    if( !_p._model.chartScroll() || _p._model.type().toLowerCase() == 'map' ){
                        _p.selector().on( 'mousewheel', function( _evt ){
                            var _swf = $( '#' + _p.gid() );
                            if( _evt.deltaY && _swf &&  _swf.prop( 'apiReady' ) && _swf.prop( 'updateMouseWheel' ) ){
                                _swf[0].updateMouseWheel( _evt.deltaY );
                            }
                            return false;
                        });
                    }

                });

                _p.on( FChart.Model.UPDATE_CHART_DATA, function( _evt, _data ){
                    _p.trigger( FChart.Model.CLEAR );
                    _p._view.update( _data );
                    _p._model.chartSize( { width: _p._model.width(), height: _p._model.height() } );
                });

                _p.on( FChart.Model.CLEAR, function( _evt ){
                    _p.trigger( FChart.Model.CLEAR_STATUS );
                    _p._view && _p._view.clear();
                    //_p._model.clear && _p._model.clear();
                });


                _p._model.chartSize( { width: _p._model.width(), height: _p._model.height() } );

            }

        , _inited:
            function(){
                //JC.log( 'FChart _inited', new Date().getTime() );
                this.trigger( 'inited' );
            }
        /**
         * 更新数据
         * @method update
         * @param   object  _data
         */
        , update:
            function( _data ){
                this.trigger( FChart.Model.UPDATE_CHART_DATA, _data );
                return this;
            }
        /**
         *
         */
        , gid: function(){ return this._model.gid(); }

    });

    FChart.Model._instanceName = 'JCFChart';

    FChart.Model.INS_COUNT = 1;
    FChart.Model.CLEAR = 'clear';
    FChart.Model.CLEAR_STATUS = 'clear_status';
    FChart.Model.UPDATE_CHART_DATA = 'update_data';

    /**
     * flash swf 路径
     * <br />{0} = JC.PATH
     * <br />{1} = chart file name
     * @property    Model.FLASH_PATH
     * @type        {string}
     * @default     {0}/flash/pub/charts/{1}.swf
     * @static
     */
    FChart.Model.FLASH_PATH = '{0}/flash/pub/charts/{1}.swf?{2}';

    /**
     * flash swf 缓存版本控制
     * @property    Model.VERSION
     * @type        {string}
     * @default     requirejs.s.contexts._.config.urlArgs || 'v=' + JC.pathPostfix || 'v=fchart'
     * @static
     */
    FChart.Model.VERSION = 'fchart';
    JC.pathPostfix && ( FChart.Model.VERSION = 'v=' + JC.pathPostfix );
    window.requirejs 
        && window.requirejs.s
        && window.requirejs.s.contexts
        && window.requirejs.s.contexts._
        && window.requirejs.s.contexts._.config
        && window.requirejs.s.contexts._.config.urlArgs
        && ( FChart.Model.VERSION = window.requirejs.s.contexts._.config.urlArgs );

    /**
     * 图表类型映射
     * <br />曲线图: line, CurveGram, curvegram
     * <br />柱状图: bar, Histogram, histogram
     * <br />垂直柱状图: var, VHistogram, Vhistogram
     * <br />饼状图: pie, PieGraph, piegraph
     * @property    Model.TYPE_MAP
     * @type        {object}
     * @static
     */
    FChart.Model.TYPE_MAP = {
        'line': 'CurveGram'
        , 'CurveGram': 'CurveGram'
        , 'curvegram': 'CurveGram'

        , 'bar': 'Histogram'
        , 'Histogram': 'Histogram'
        , 'histogram': 'Histogram'

        , 'vbar': 'VHistogram'
        , 'VHistogram': 'VHistogram'
        , 'Vhistogram': 'VHistogram'

        , 'map': 'Map'
        , 'Map': 'Map'

        , 'pie': 'PieGraph'
        , 'PieGraph': 'PieGraph'
        , 'piegraph': 'PieGraph'
    };


    JC.f.extendObject( FChart.Model.prototype, {
        init:
            function(){
                //JC.log( 'FChart.Model.init:', new Date().getTime() );
                this._gid = 'jchart_gid_' + ( FChart.Model.INS_COUNT++ );
                this.afterInit && this.afterInit();
            }
        , chartScroll:
            function(){
                var _r = true;
                this.is( '[chartScroll]' ) && ( _r = this.boolProp( 'chartScroll' ) );
                return _r;
            }
        /**
         * 解析图表默认数据
         */
        , parseInitData:
            function(){
                var _p = this, _data;
                if( _p.selector().attr( 'chartScriptData' ) ){
                    _data = _p.selectorProp( 'chartScriptData' ).html();
                }else if( _p.selector().is( '[chartDataVar]' ) ){
                    _data = _p.windowProp( 'chartDataVar' );
                    _data && ( _data = JSON.stringify( _data ) );
                }

                if( _data ){
                    _data = _data.replace( /^[\s]*?\/\/[\s\S]*?[\r\n]/gm, '' );
                    _data = _data.replace( /[\r\n]/g, '' );
                    _data = _data.replace( /\}[\s]*?,[\s]*?\}$/g, '}}');
                    _data = eval( '(' + _data + ')' );
                }

                return _data;
            }
        /**
         * 保存图表数据
         */
        , data:
            function( _data ){
                typeof _data != 'undefined' && ( this._data = _data );
                return this._data;
            }

        , gid: function(){ return this._gid; }

        /**
         * 图表宽度
         */
        , width:
            function(){
                if( typeof this._width == 'undefined' ){
                    this._width = this.selector().prop( 'offsetWidth' );
                    this.is( '[chartWidth]' ) && ( this._width = this.intProp( 'chartWidth' ) || this._width );
                }
                return this._width
            }
        /**
         * 图表高度
         */
        , height:
            function(){
                if( typeof this._height == 'undefined' ){
                    this._height = this.selector().prop( 'offsetHeight' ) || 400;
                    this.is( '[chartHeight]' ) && ( this._height = this.intProp( 'chartHeight' ) || this._height );
                }
                return this._height;
            }
        /**
         * 图表宽度
         */
        , sourceWidth:
            function(){
                if( typeof this._sourceWidth== 'undefined' ){
                    this.is( '[chartWidth]' ) && ( this._sourceWidth = this.intProp( 'chartWidth' ) || this._sourceWidth );
                }
                return this._sourceWidth || '100%';
            }

        /**
         * 设置或保存图表的宽高
         */
        , chartSize:
            function( _setter ){
                typeof _setter != 'undefined' && ( this._chartSize = _setter );
                return this._chartSize;
            }
        /**
         * 图表画布
         */
        , stage:
            function(){
            }
        /**
         * 画布圆角弧度 
         */
        , stageCorner: function(){ return 18; }
        /**
         * 清除图表数据
         */
        , clear: 
            function(){
                var _p = this, _k;
                for( _k in _p ){
                    //JC.log( _k, JC.f.ts() );
                    if( /^\_/.test( _k ) ){
                        if( _k == '_selector' ) continue;
                        if( _k == '_gid' ) continue;
                        _p[ _k ] = undefined;
                    }
                }
                //JC.log( 'JChart.Base clear', JC.f.ts() );
                _p.afterClear && _p.afterClear();
            }
        /**
         * 清除图表状态
         */
        , clearStatus:
            function(){
            }

        , chartType:
            function(){
                var _r = '';
                this.data() 
                    && this.data().chart
                    && this.data().chart.type
                    && ( _r = this.data().chart.type )
                return (_r||'').toString().toLowerCase();
            }
        , typeMap: function( _type ){ return FChart.Model.TYPE_MAP[ _type ]; }
        , type: function(){ return this.typeMap( this.chartType() ); }
        , path:
            function(){
                var _p = this
                    , _r = JC.f.printf( _p.attrProp( 'chartPath' ) || FChart.Model.FLASH_PATH
                        , JC.PATH
                        , _p.type() 
                        , FChart.Model.VERSION 
                    );
                return _r;
            }
    });

    JC.f.extendObject( FChart.View.prototype, {
        init:
            function(){
                //JC.log( 'FChart.View.init:', new Date().getTime() );
                var _p = this;
            }
        /**
         * 图表高度
         */
        , width: function(){ return this._model.width(); }
        /**
         * 图表高度
         */
        , height: function(){ return this._model.height(); }
        /**
         * 图表画布
         */
        , stage: function(){ return this._model.stage(); }
        /**
         * 初始化的选择器
         */
        , selector:
            function(){
                return this._model.selector();
            }
        /**
         * 清除图表数据
         */
        , clear: 
            function(){
                var _p = this;
                if( !_p._model._stage ) return;
                $( _p._model._stage.canvas ).remove();
                _p._model._stage = undefined;
            }
        /**
         * 清除图表状态
         */
        , clearStatus:
            function(){
            }
        /**
         * 更新图表数据
         */
        , update: 
            function( _data ){
                var _p = this;
                _p.clear();
                _p._model.clear();
                _p._model.data( _data );
                _p.draw( _data );
            }
        /**
         * 渲染图表外观
         */
        , draw: 
            function( _data ){
                if( !this._model.type() ) return;
                var _p = this
                    , _path =  _p._model.path()
                    , _fpath =  _path.replace( /[\/]+/g, '/' )
                    , _element = $( '#' + _p._model.gid() )
                    , _dataStr = JSON.stringify( _data ) 
                    ; 

                if( !$( '#' +  _p._model.gid() ).length ){
                    _element = $( JC.f.printf( '<span id="{0}"></span>', _p._model.gid() ) );
                    _element.appendTo( _p.selector() );
                }

                swfobject.embedSWF( 
                    _fpath
                    , _p._model.gid()
                    , _p._model.sourceWidth()
                    , _p._model.height()
                    , '10' 
                    , ''
                    , { 'testparams': 2, 'chart': encodeURIComponent( _dataStr ) }
                    , { 'wmode': 'transparent' }
                    , { 'id': _p._model.gid(), 'name': _p._model.gid() }
                );

            }
    });

    _jdoc.ready( function(){
        JC.f.safeTimeout( function(){
            FChart.autoInit && FChart.init();
        }, null, 'winFCHARTInit', 1 );
    });

    return JC.FChart;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);

