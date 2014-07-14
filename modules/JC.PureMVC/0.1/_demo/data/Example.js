;(function(define, _win) { 'use strict'; define( [ 'JC.PureMVC' ], function(){
    var _jdoc = $( document ), _jwin = $( window );

    JC.Example = Example;

    function Example(){

        this._model = new Example.Model();
        this._view = new Example.View( this._model );

        this._init();

        JC.log( Example.Model._instanceName, 'all inited', new Date().getTime() );
    }

    JC.PureMVC.build( Example );
    Example.Model._instanceName = 'JCExample';

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
