;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
/**
 * 组件用途简述
 *
 *  <p><b>require</b>:
 *      <a href="widnow.jQuery.html">jQuery</a>
 *      , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 *  </p>
 *
 *  <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *      | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.Cover.html' target='_blank'>API docs</a>
 *      | <a href='../../modules/JC.Cover/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *  <h2>页面只要引用本脚本, 默认会处理 div class="js_compCover"</h2>
 *
 *  <h2>可用的 HTML attribute</h2>
 *
 *  <dl>
 *      <dt></dt>
 *      <dd><dd>
 *  </dl> 
 *
 * @namespace   JC
 * @class       Cover
 * @extends     JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2013-12-13
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
        <h2>JC.Cover 示例</h2>
 */
    var _jdoc = $( document ), _jwin = $( window );

    JC.Cover = Cover;

    function Cover( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, Cover ) ) 
            return JC.BaseMVC.getInstance( _selector, Cover );

        JC.BaseMVC.getInstance( _selector, Cover, this );

        this._model = new Cover.Model( _selector );
        this._view = new Cover.View( this._model );

        this._init();

        //JC.log( Cover.Model._instanceName, 'all inited', new Date().getTime() );
    }
    /**
     * 初始化可识别的 Cover 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of CoverInstance}
     */
    Cover.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector.length ){
                if( _selector.hasClass( 'js_compCover' )  ) {
                    _r.push( new Cover( _selector ) );
                } else {
                    _selector.find( 'div.js_compCover' ).each( function() {
                        _r.push( new Cover( this ) );
                    });
                }
            }
            return _r;
        };

    JC.BaseMVC.build( Cover );

    JC.f.extendObject( Cover.prototype, {
        _beforeInit:
            function() {
            }

        , _initHanlderEvent:
            function() {
                var _p = this,
                    _model = _p._model,
                    _view = _p._view,
                    _selector = _model.selector();

                _p.on( 'inited', function() {
                });
                _selector.on( 'mouseover', function( e ) {
                    var cnt = $( e.target );
                    if( cnt.hasClass( _Model.COVER_CNT ) ){
                        _view.coverItem( cnt.next() );
                        _p.notification( _Model.COVERED, [ cnt.parent( '.' + _Model.COVER_BOX ) ] );
                    }
                } );
                _selector.on( 'mouseleave', 'li', function( e ) {
                    var target = $( e.target );
                    !target.is( 'li' ) && ( target = target.parent( '.' + _Model.COVER_BOX ) );
                    _view.coverBack( target.children( '.' + _Model.COVER_COVER ) );
                } );
                _selector.on( 'click', 'li', function( e ) {
                    var target = $( e.target );
                    !target.is( 'li' ) && ( target = target.parent( '.' + _Model.COVER_BOX ) );
                    _view.link( target );
                    _p.notification( _Model.CLICKED, [target] );
                } );
            }

        , _inited:
            function(){
                this.trigger( 'inited' );
            }
    });
    
    var _Model = Cover.Model;
    /* Static Var */
    _Model.COVER_CNT = 'cover-cnt';
    _Model.COVER_COVER = 'cover-cover';
    _Model.COVER_BOX = 'cover-box';
    _Model.COVER_BG = 'cover-itembg';
    _Model.COVER_MOD = 'cover-mod';
    _Model.ANIMATE_SPEED = 200;
    _Model._instanceName = 'JCCover';

    /* Static Event */
    _Model.COVERED = 'coverCallback';
    _Model.CLICKED = 'clickCallback';
    JC.f.extendObject( _Model.prototype, {
        init:
            function() {
            }
        , getItemCol:
            function() {
                return this.intProp( 'itemcol' ) || 4;
            }
        , getItemWidth:
            function() {
                return this.intProp( 'itemwidth' ) || 70;
            }
        , getItemMod:
            function( item ) {
                var itemCol = item.attr( 'mod' );
                return ( typeof itemCol == 'undefined' ) ? 1 : parseInt( itemCol );
            }
        , getShowType:
            function( item ) {
                var showType = item.attr( 'showtype' );
                return ( typeof showType == 'undefined' ) ? 'title' : showType;
            }
        , getItemCnt:
            function( item ) {
                var itemCnt = item.attr( 'itemcnt' );
                return ( typeof itemCnt == 'undefined' ) ? '' : itemCnt;
            }
        , getCoverTitle:
            function( item ) {
                var coverTitle = item.attr( 'covertitle' );
                return ( typeof coverTitle == 'undefined' ) ? '' : coverTitle;
            }
        , getCoverDir:
            function( item ) {
                var coverDir = item.attr( 'coverdir' );
                return ( typeof coverDir == 'undefined' ) ? 2 : parseInt( coverDir );
            }
        , getCntLink:
            function( item ) {
                var cntLink = item.attr( 'cntlink' );
                return ( typeof cntLink == 'undefined' ) ? '' : cntLink;
            }
        , getItemBorder:
            function() {
                return this.intProp( 'itemborder' ) || 0;
            }
        , getBoxCol:
            function( item ) {
                var boxCol = item.attr( 'boxcol' );
                return ( typeof boxCol == 'undefined' ) ? 1 : parseInt( boxCol ); 
            }
        , getBoxRow:
            function( item ) {
                var boxRow = item.attr( 'boxrow' );
                return ( typeof boxRow == 'undefined' ) ? 1 : parseInt( boxRow ); 
            }
    });

    JC.f.extendObject( Cover.View.prototype, {
        init:
            function() {
                var _p = this, item,
                    _model = _p._model,
                    _selector = _model.selector(),
                    itemwidth = _model.getItemWidth(),
                    itemCol = _model.getItemCol(),
                    border = _model.getItemBorder();
                _selector.css( 'width', itemCol * itemwidth + 'px' );
                $.each( _selector.find( 'li' ), function( i , element ) {
                    item = $( element );
                    var showType = _model.getShowType( item ),
                        itemCnt = _model.getItemCnt( item ),
                        coverDir = _model.getCoverDir( item ),
                        itemMod = _model.getItemMod( item ),
                        boxCol = _model.getBoxCol( item ),
                        boxRow = _model.getBoxRow( item ),
                        coverTitle = _model.getCoverTitle( item );
                    item.addClass( _Model.COVER_BOX + ' ' + _Model.COVER_MOD + itemMod )
                        .css( 'border-width', border + 'px' );
                    
                    var itemContent = '<button class=" {0} " style=" {1} ">{2}</button>',
                        itemCntStyle = JC.f.printf( 'width: {0}px; height: {1}px; ', 
                            boxCol * itemwidth - border * 2, boxRow * itemwidth - border * 2 ),
                        itemCntText = '';
                    if( showType == 'title' ) {
                        itemCntText = itemCnt;
                    } else if( showType == 'img' ) {
                        itemCntStyle += 'background: url( ' + itemCnt + ') no-repeat;';
                    }
                    itemContent = JC.f.printf( itemContent, _Model.COVER_CNT + ' ' + 
                        _Model.COVER_BG + ( ( i & 1 ) == 0 ? '1 ' : '2 ' ), itemCntStyle, itemCntText );
                    item.append( itemContent + '<button class="' + _Model.COVER_COVER + '">' + 
                        ( coverTitle == '' ? itemCnt : coverTitle ) + '</button>' );
                    _p.putCover( item.children( '.' + _Model.COVER_CNT ), coverDir );
                } );
            }
        , putCover: 
            function( target, dir ) {
                var width = target[ 0 ].offsetWidth,
                    height = target[ 0 ].offsetHeight,
                    cover = target.next(),
                    top, left;
                if( ( dir & 1 ) == 0 ) {
                    left = 0;
                    top = ( dir == 0 ) ? parseInt( '-' + height ) : height;
                } else {
                    top = 0;
                    left = ( dir == 1 ) ? width : parseInt( '-' + width );
                }
                cover.attr( 'covertop', top ).attr( 'coverleft', left )
                    .css( { 'top' : top + 'px', 'left' : left + 'px' } );
            }
        , itemInit:
            function() {
                
            }
        , coverItem:
            function( cover ) {
                cover.stop( false, true ).animate( { top : '0', left : '0' }, 
                    _Model.ANIMATE_SPEED );
            }
        , coverBack:
            function( cover ) {
                cover.stop( false, true ).animate( { top : cover.attr( 'covertop' ) + 'px',
                    left : cover.attr( 'coverleft' ) + 'px' }, _Model.ANIMATE_SPEED );
            }
        , link:
            function( target ) {
                var _p = this,
                    _model = _p._model,
                    link = _model.getCntLink( target );
                link != '' && window.open( link );
            }
    });

    _jdoc.ready( function(){
        var _insAr = 0;
        Cover.autoInit
              && ( _insAr = Cover.init() )
        //    && $( '<h2>Cover total ins: ' 
        //        + _insAr.length + '<br/>' + new Date().getTime() + '</h2>' ).appendTo( document.body )
            ;
    });

    return JC.Cover;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
