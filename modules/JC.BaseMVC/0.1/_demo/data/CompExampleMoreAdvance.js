;(function(define, _win) { 'use strict'; define( [ 'JC.common', 'JC.BaseMVC' ], function(){
;(function($){
    window.JC = window.JC || {log:function(){}};
    JC.CompExampleMoreAdvance = CompExampleMoreAdvance;

    function CompExampleMoreAdvance( _selector ){
        _selector && ( _selector = $( _selector ) );
        if( CompExampleMoreAdvance.getInstance( _selector ) ) return CompExampleMoreAdvance.getInstance( _selector );
        CompExampleMoreAdvance.getInstance( _selector, this );
        //JC.log( CompExampleMoreAdvance.Model._instanceName );

        this._model = new CompExampleMoreAdvance.Model( _selector );
        this._view = new CompExampleMoreAdvance.View( this._model );

        this._init();
    }
    /**
     * 获取或设置 CompExampleMoreAdvance 的实例
     * @method  getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {CompExampleMoreAdvanceInstance}
     */
    CompExampleMoreAdvance.getInstance =
        function( _selector, _setter ){
            if( typeof _selector == 'string' && !/</.test( _selector ) ) 
                    _selector = $(_selector);
            if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
            typeof _setter != 'undefined' && _selector.data( CompExampleMoreAdvance.Model._instanceName, _setter );

            return _selector.data( CompExampleMoreAdvance.Model._instanceName );
        };
    /**
     * 初始化可识别的 CompExampleMoreAdvance 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of CompExampleMoreAdvanceInstance}
     */
    CompExampleMoreAdvance.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector && _selector.length ){
                if( _selector.hasClass( 'js_compCompExampleMoreAdvance' )  ){
                    _r.push( new CompExampleMoreAdvance( _selector ) );
                }else{
                    _selector.find( 'div.js_compCompExampleMoreAdvance' ).each( function(){
                        _r.push( new CompExampleMoreAdvance( this ) );
                    });
                }
            }
            return _r;
        };

    BaseMVC.build( CompExampleMoreAdvance );

    JC.f.extendObject( CompExampleMoreAdvance.prototype, {
        _beforeInit:
            function(){
                JC.log( 'CompExampleMoreAdvance _beforeInit', new Date().getTime() );
            }
        , _initHanlderEvent:
            function(){
            }
        , _inited:
            function(){
                JC.log( 'CompExampleMoreAdvance _inited', new Date().getTime() );
            }
    });

    CompExampleMoreAdvance.Model._instanceName = 'CompExampleMoreAdvance';
    JC.f.extendObject( CompExampleMoreAdvance.Model.prototype, {
        init:
            function(){
                JC.log( 'CompExampleMoreAdvance.Model.init:', new Date().getTime() );
            }
    });

    JC.f.extendObject( CompExampleMoreAdvance.View.prototype, {
        init:
            function(){
                JC.log( 'CompExampleMoreAdvance.View.init:', new Date().getTime() );
            }
    });

    $(document).ready( function(){
        var _insAr = 0;
        CompExampleMoreAdvance.autoInit
            && ( _insAr = CompExampleMoreAdvance.init() )
            && $( '<h2>CompExampleMoreAdvance total ins: ' 
                + _insAr.length + '<br/>' + new Date().getTime() + '</h2>' ).appendTo( document.body )
            ;
    });

}(jQuery));
    return JC.CompExampleMoreAdvance;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
