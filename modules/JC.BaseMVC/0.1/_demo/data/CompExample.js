;(function(define, _win) { 'use strict'; define( [ 'JC.common', 'JC.BaseMVC' ], function(){
;(function($){
    window.JC = window.JC || {log:function(){}};
    JC.CompExample = CompExample;

    function CompExample( _selector ){
        _selector && ( _selector = $( _selector ) );
        if( CompExample.getInstance( _selector ) ) return CompExample.getInstance( _selector );
        CompExample.getInstance( _selector, this );
        //JC.log( CompExample.Model._instanceName );

        this._model = new CompExample.Model( _selector );
        this._view = new CompExample.View( this._model );

        this._init();
    }
    /**
     * 获取或设置 CompExample 的实例
     * @method  getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {CompExampleInstance}
     */
    CompExample.getInstance =
        function( _selector, _setter ){
            if( typeof _selector == 'string' && !/</.test( _selector ) ) 
                    _selector = $(_selector);
            if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
            typeof _setter != 'undefined' && _selector.data( CompExample.Model._instanceName, _setter );

            return _selector.data( CompExample.Model._instanceName );
        };
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

            if( _selector && _selector.length ){
                if( _selector.hasClass( '.js_compCompExample' )  ){
                    _r.push( new CompExample( _selector ) );
                }else{
                    _selector.find( 'div.js_compCompExample' ).each( function(){
                        _r.push( new CompExample( this ) );
                    });
                }
            }
            return _r;
        };

    BaseMVC.build( CompExample );
    CompExample.Model._instanceName = 'CompExample';

    $(document).ready( function(){
        var _insAr = 0;
        CompExample.autoInit
            && ( _insAr = CompExample.init() )
            && $( '<h2>CompExample total ins: ' + _insAr.length + '<br/>' + new Date().getTime() + '</h2>' ).appendTo( document.body )
            ;
    });

}(jQuery));
    return JC.CompExample;
});}(typeof define === 'function' && define.amd ? define : function (_require, _cb) { _cb && _cb(); }, this));
