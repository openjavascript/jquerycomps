;(function(define, _win) { 'use strict'; define( [ 'JC.common', 'JC.BaseMVC' ], function(){
;(function($){

    Bizs.BizExample = BizExample;

    function BizExample( _selector ){

        if( BizExample.getInstance( _selector ) ) return BizExample.getInstance( _selector );
        BizExample.getInstance( _selector, this );

        this._model = new BizExample.Model( _selector );
        this._view = new BizExample.View( this._model );

        this._init();
    }
    /**
     * 获取或设置 BizExample 的实例
     * @method  getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {BizExampleInstance}
     */
    BizExample.getInstance =
        function( _selector, _setter ){
            if( typeof _selector == 'string' && !/</.test( _selector ) ) 
                    _selector = $(_selector);
            if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
            typeof _setter != 'undefined' && _selector.data( BizExample.Model._instanceName, _setter );

            return _selector.data( BizExample.Model._instanceName );
        };
    /**
     * 初始化可识别的 BizExample 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of BizExampleInstance}
     */
    BizExample.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector && _selector.length ){
                if( _selector.hasClass( '.js_bizBizExample' )  ){
                    _r.push( new BizExample( _selector ) );
                }else{
                    _selector.find( 'div.js_bizBizExample' ).each( function(){
                        _r.push( new BizExample( this ) );
                    });
                }
            }
            return _r;
        };

    BaseMVC.build( BizExample, 'Bizs' );
    BizExample.Model._instanceName = 'BizExample';

    $(document).ready( function(){
        var _insAr = 0;
        BizExample.autoInit
            && ( _insAr = BizExample.init() )
            && $( '<h2>BizExample total ins: ' + _insAr.length + '<br/>' + new Date().getTime() + '</h2>' ).appendTo( document.body )
            ;
    });

}(jQuery));
});}(typeof define === 'function' && define.amd ? define : function (_require, _cb) { _cb && _cb(); }, this));

