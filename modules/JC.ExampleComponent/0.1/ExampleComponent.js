;(function(define, _win) { 'use strict'; define( 'JC.ExampleComponent', [ 'JC.BaseMVC' ], function(){
/**
 * 组件用途简述
 *
 *  <p><b>require</b>:
 *      <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 *  </p>
 *
 *  <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *      | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.ExampleComponent.html' target='_blank'>API docs</a>
 *      | <a href='../../modules/JC.ExampleComponent/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *  <h2>页面只要引用本脚本, 默认会处理 div class="js_compExampleComponent"</h2>
 *
 *  <h2>可用的 HTML attribute</h2>
 *
 *  <dl>
 *      <dt></dt>
 *      <dd><dd>
 *  </dl> 
 *
 * @namespace   JC
 * @class       ExampleComponent
 * @extends     JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2013-12-13
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
        <h2>JC.ExampleComponent 示例</h2>
 */
    var _jdoc = $( document ), _jwin = $( window );

    JC.ExampleComponent = ExampleComponent;

    function ExampleComponent( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, ExampleComponent ) ) 
            return JC.BaseMVC.getInstance( _selector, ExampleComponent );

        JC.BaseMVC.getInstance( _selector, ExampleComponent, this );

        this._model = new ExampleComponent.Model( _selector );
        this._view = new ExampleComponent.View( this._model );

        this._init();

        JC.log( ExampleComponent.Model._instanceName, 'all inited', new Date().getTime() );
    }
    /**
     * 初始化可识别的 ExampleComponent 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of ExampleComponentInstance}
     */
    ExampleComponent.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector.length ){
                if( _selector.hasClass( 'js_compExampleComponent' )  ){
                    _r.push( new ExampleComponent( _selector ) );
                }else{
                    _selector.find( 'div.js_compExampleComponent' ).each( function(){
                        _r.push( new ExampleComponent( this ) );
                    });
                }
            }
            return _r;
        };

    JC.BaseMVC.build( ExampleComponent );

    JC.f.extendObject( ExampleComponent.prototype, {
        _beforeInit:
            function(){
                JC.log( 'ExampleComponent _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this;

                _p.on( 'inited', function(){
                });
            }

        , _inited:
            function(){
                JC.log( 'ExampleComponent _inited', new Date().getTime() );
                this.trigger( 'inited' );
            }
    });

    ExampleComponent.Model._instanceName = 'JCExampleComponent';
    JC.f.extendObject( ExampleComponent.Model.prototype, {
        init:
            function(){
                JC.log( 'ExampleComponent.Model.init:', new Date().getTime() );
            }
    });

    JC.f.extendObject( ExampleComponent.View.prototype, {
        init:
            function(){
                JC.log( 'ExampleComponent.View.init:', new Date().getTime() );
            }
    });

    _jdoc.ready( function(){
        JC.f.safeTimeout( function(){
            ExampleComponent.autoInit && ExampleComponent.init();
        }, null, 'ExampleComponent23asdfa', 1 );
    });

    return JC.ExampleComponent;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
