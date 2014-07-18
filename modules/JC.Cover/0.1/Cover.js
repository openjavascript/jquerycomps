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

        JC.log( Cover.Model._instanceName, 'all inited', new Date().getTime() );
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
                JC.log( 'Cover _beforeInit', new Date().getTime() );
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
                    if( cnt.hasClass( 'cover-cnt' ) ){
                        _view.coverItem( cnt.next() );
                    }
                } );
                _selector.on( 'mouseleave', 'li', function( e ) {
                    var target = $( e.target );
                    !target.is( 'li' ) && ( target = target.parent( '.cover-box' ) );
                    _view.coverBack( target.children( '.cover-cover' ) );
                } );
                _selector.on( 'click', 'li', function( e ) {
                    var target = $( e.target );
                    !target.is( 'li' ) && ( target = target.parent( '.cover-box' ) );
                    _view.link( target );
                } );
            }

        , _inited:
            function(){
                JC.log( 'Cover _inited', new Date().getTime() );
                this.trigger( 'inited' );
            }
    });

    Cover.Model._instanceName = 'JCCover';
    JC.f.extendObject( Cover.Model.prototype, {
        init:
            function() {
                JC.log( 'Cover.Model.init:', new Date().getTime() );
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
        , getCoverTitle:/* 去掉undefind */
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
                JC.log( 'Cover.View.init:', new Date().getTime() );
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
                    var boxClass = ' cover-box cover-mod' + itemMod + ' ';
                    item.addClass( boxClass ).css( 'border-width', border + 'px' );
                    var itemCntStyle = '';
                    itemCntStyle += ( item[0].clientWidth > 0 ? '' : 
                        ' width: ' + ( boxCol * itemwidth - border * 2 ) + 'px; '  
                        ) + ( item[0].clientHeight > 0  ? '' : 
                        ' height: ' + ( boxRow * itemwidth - border * 2 ) + 'px; ' );
                    var itemClass = ' cover-cnt ';
                    var itemContent = '';
                     if( showType == 'title' ) {
                        itemContent = '<button class="' + itemClass + '" style="' + itemCntStyle + '">'
                            + itemCnt + '</button>';
                    } else if( showType == 'img' ){
                        itemCntStyle += ' background: url( ' + itemCnt + ') no-repeat; ';
                        itemContent = '<button class="' + itemClass + '" style="' + itemCntStyle 
                            + '"></button>';
                    }
                    itemContent = $( itemContent )
                        .addClass( ' cover-itembg' + ( ( i&1 ) == 0 ? '1 ' : '2 ' ) );
                    item.append( itemContent );
                    item.append( '<button class="cover-cover">' + 
                        ( coverTitle == '' ? itemCnt : coverTitle ) + '</button>' );
                    _p.putCover( itemContent, coverDir);
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
                var speed = 200;/* 提出去 */
                cover.stop(false, true).animate( { top : '0', left : '0' }, speed);
            }
        , coverBack:
            function( cover ) {
                var speed = 200;/* 提出去 */
                cover.stop(false, true).animate( { top : cover.attr( 'covertop' ) + 'px',
                    left : cover.attr( 'coverleft' ) + 'px' }, speed);
            }
        , link:
            function( target ) {
                var _p = this,
                    _model = _p._model,
                    link = _model.getCntLink( target );
                link != '' && window.open(link);
            }
    });

    _jdoc.ready( function(){
        var _insAr = 0;
        Cover.autoInit
            && ( _insAr = Cover.init() )
            && $( '<h2>Cover total ins: ' 
                + _insAr.length + '<br/>' + new Date().getTime() + '</h2>' ).appendTo( document.body )
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
