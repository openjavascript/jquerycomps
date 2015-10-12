;(function(define, _win) { 
    'use strict';

    define( 'JC.EchartWrap', [ 'modules/JC.EchartWrap/0.1/echarts/echarts', 'JC.BaseMVC' ], function(  ) {

/**
 * 组件用途简述
 *
 *  <p><b>require</b>:
 *      <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 *  </p>
 *
 *  <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *      | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.EchartWrap.html' target='_blank'>API docs</a>
 *      | <a href='../../modules/JC.EchartWrap/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *  <h2>页面只要引用本脚本, 默认会处理 div class="js_echartWrap"</h2>
 *
 *  <h2>可用的 HTML attribute</h2>
 *
 *  <dl>
 *      <dt></dt>
 *      <dd><dd>
 *  </dl> 
 *
 * @namespace   JC
 * @class       EchartWrap
 * @extends     JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2013-12-13
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
        <h2>JC.EchartWrap 示例</h2>
 */
    var _jdoc = $( document ), _jwin = $( window );

    var ec = echarts;

    JC.EchartWrap = EchartWrap;

    function EchartWrap( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, EchartWrap ) ) 
            return JC.BaseMVC.getInstance( _selector, EchartWrap );

        JC.BaseMVC.getInstance( _selector, EchartWrap, this );

        this._model = new EchartWrap.Model( _selector );
        this._view = new EchartWrap.View( this._model );

        this._init();

        JC.log( EchartWrap.Model._instanceName, 'all inited', new Date().getTime() );
    }

    EchartWrap.getInstance = function ( _selector, _setter ) {
        if( typeof _selector == 'string' && !/</.test( _selector ) ) 
            _selector = $(_selector);
        if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
        typeof _setter != 'undefined' && _selector.data( EchartWrap.Model._instanceName, _setter );

        return _selector.data( EchartWrap.Model._instanceName );
    };

    EchartWrap.update = function( _selector, _data ){
        var _ins = EchartWrap.getInstance( _selector );
            !_ins && ( _ins = new EchartWrap( _selector ) );
            _ins && _ins.update( _data );
        return _ins;
    };

    EchartWrap.updateByIndex = function( _selector, _data, index ){
        var _ins = EchartWrap.getInstance( _selector );
            !_ins && ( _ins = new EchartWrap( _selector ) );
            _ins && _ins.updateByIndex( _data, index );
        return _ins;
    };

    /**
     * 初始化可识别的 EchartWrap 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of EchartWrapInstance}
     */
    EchartWrap.init = function( _selector ) {
        var _r = [];
        _selector = $( _selector || document );

        if( _selector.length ){
            if( _selector.hasClass( 'js_echartWrap' )  ){
                _r.push( new EchartWrap( _selector ) );
            }else{
                _selector.find( 'div.js_echartWrap' ).each( function(){
                    _r.push( new EchartWrap( this ) );
                });
            }
        }
        return _r;
    };

    JC.BaseMVC.build( EchartWrap );

    JC.f.extendObject( EchartWrap.prototype, {
        _beforeInit: function() {
            JC.log( 'EchartWrap _beforeInit', new Date().getTime() );
        }

        , _initHanlderEvent: function() {
            var _p = this;

            _p.on( 'inited', function(){
            });
        }

        , _inited: function() {
            JC.log( 'EchartWrap _inited', new Date().getTime() );
            this.trigger( 'inited' );
        }

        , update: function ( data ) {
            var _p = this;

            _p._view.update( data );
        }

        , updateByIndex: function ( data, index ) {
            var _p = this;

            _p._view.updateByIndex( data, index );
        }
    } );

    EchartWrap.Model._instanceName = 'JCEchartWrap';
    JC.f.extendObject( EchartWrap.Model.prototype, {
        init: function(){},

        getEchart: function() {
            if( !this.echart ) {
                this.echart = ec.init( this.selector()[ 0 ] );
                // window.onresize = this.echart.resize;
            }
            return this.echart;
        },

        reInit: function() {
            this.echart = null;
            return this.getEchart();
        },

        getData: function(){
            if( !this.chartData ) {
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

                this.chartData = _data;
            }

            return this.chartData;
        },

        setData: function( data ) {
            return this.chartData = data;
        }
    } );

    JC.f.extendObject( EchartWrap.View.prototype, {
        init: function(){
            JC.log( 'EchartWrap.View.init:', new Date().getTime() );

            this.render();
        },

        render: function() {
            var model = this._model,
                option = model.getData(),
                echart = model.getEchart();

            echart.setOption( option );
        },

        update: function( data ) {
            var model = this._model,
                echart = model.reInit();

            echart.setOption( data );
        },

        updateByIndex: function( data, index ) {
            var model = this._model,
                oldData = model.getData(),
                newData = $.extend({}, oldData),
                echart = model.reInit();

            if( data.legend ) {
                newData.legend.data[ index ] = data.legend;
            }

            if( data.series ) {
                newData.series[ index ] = data.series;
            }

            echart.setOption( newData );
            model.setData( newData );
        }
    } );

    _jdoc.ready( function(){
        JC.f.safeTimeout( function(){
            EchartWrap.autoInit && EchartWrap.init();
        }, null, 'EchartWrap23asdfa', 1 );
    });

    return JC.EchartWrap;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
