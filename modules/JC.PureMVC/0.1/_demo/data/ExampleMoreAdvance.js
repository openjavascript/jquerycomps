;(function(define, _win) { 'use strict'; define( [ 'JC.PureMVC' ], function(){
/**
 * 组件用途简述
 *
 *  <p><b>require</b>:
 *      <a href='JC.PureMVC.html'>JC.PureMVC</a>
 *  </p>
 *
 *  <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *      | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.Example.html' target='_blank'>API docs</a>
 *      | <a href='../../modules/JC.Example/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 * @namespace   JC
 * @class       Example
 * @extends     JC.PureMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2013-12-13
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
        <h2>JC.Example 示例</h2>
 */
    var _jdoc = $( document ), _jwin = $( window );

    JC.Example = Example;

    function Example( _arg1, _arg2 ){

        this._model = new Example.Model( _arg1, _arg2 );
        this._view = new Example.View( this._model );

        this._init();

        JC.log( Example.Model._instanceName, 'all inited', new Date().getTime() );
    }

    Example.Model = 
        function( _arg1, _arg2 ){
            this._arg1 = _arg1;
            this._arg2 = _arg2;
        };

    JC.PureMVC.build( Example );

    JC.f.extendObject( Example.prototype, {
        _beforeInit:
            function(){
                JC.log( 'Example _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this;

                _p.on( 'inited', function(){
                });
            }

        , _inited:
            function(){
                JC.log( 'Example _inited', new Date().getTime() );
                this.trigger( 'inited' );
            }
    });

    Example.Model._instanceName = 'JCExample';
    JC.f.extendObject( Example.Model.prototype, {
        init:
            function(){
                JC.log( 'Example.Model.init:', new Date().getTime() );
            }
    });

    JC.f.extendObject( Example.View.prototype, {
        init:
            function(){
                JC.log( 'Example.View.init:', new Date().getTime() );
            }
    });

    return JC.Example;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
