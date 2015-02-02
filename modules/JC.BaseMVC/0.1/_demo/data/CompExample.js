;(function(define, _win) { 'use strict'; define( [ 'JC.CompExample', 'JC.BaseMVC' ], function(){
    var _jdoc = $( document ), _jwin = $( window );

    JC.CompExample = CompExample;

    function CompExample( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, CompExample ) ) 
            return JC.BaseMVC.getInstance( _selector, CompExample );

        JC.BaseMVC.getInstance( _selector, CompExample, this );

        this._model = new CompExample.Model( _selector );
        this._view = new CompExample.View( this._model );

        this._init();

        JC.log( CompExample.Model._instanceName, 'all inited', new Date().getTime() );
    }
    /**
     * 初始化可识别的 CompExample 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of CompExampleInstance}
     */
    CompExample.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector.length ){
                if( _selector.hasClass( 'js_compCompExample' )  ){
                    _r.push( new CompExample( _selector ) );
                }else{
                    _selector.find( 'div.js_compCompExample' ).each( function(){
                        _r.push( new CompExample( this ) );
                    });
                }
            }
            return _r;
        };

    JC.BaseMVC.build( CompExample );
    CompExample.Model._instanceName = 'JCCompExample';

    _jdoc.ready( function(){
        var _insAr = 0;
        CompExample.autoInit
            && ( _insAr = CompExample.init() )
            && $( '<h2>CompExample total ins: ' 
                + _insAr.length + '<br/>' + new Date().getTime() + '</h2>' ).appendTo( document.body )
            ;
    });

    return JC.CompExample;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
