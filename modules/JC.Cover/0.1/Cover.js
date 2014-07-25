;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
/**
 * 组件用途简述
 *
 *  <p><b>require</b>:
 *      <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
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
 *      <dt>covercnt = string, default = ""</dt>
 *      <dd>遮罩显示的文本内容<dd>
 *
 *      <dt>coverselectorcnt = string, default = ""</dt>
 *      <dd>遮罩显示的内容，显示由select指向的html</dd>
 *      
 *      <dt>coverlink = string, default = ""</dt>
 *      <dd>点击cover时，跳转的地址URL<dd>
 *      
 *      <dt>coverpointer = boolean default = false</dt>
 *      <dd>遮罩是否显示手型</dd>
 *
 *      <dt>coverdir = int default = 2</dt>
 *      <dd>遮罩遮盖方向，0-上、1-右、2-下、9-左</dd>
 *  </dl> 
 *
 * @namespace   JC
 * @class       Cover
 * @extends     JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2014-07-21
 * @author  pengjunkai <pengjunkai@360.cn> | 75 Team
 * @example
        <h2>Default:</h2>
        <div class="js_compCover" covercnt="test" coverpointer="true" 
            coverlink="http://www.so.com" style="height: 200px; width: 200px; background: red;">
        </div>
        <h2>Some Text:</h2>
        <div class="js_compCover" covercnt="Cover Text" coverdir="1" coverpointer="true" 
            coverlink="http://www.so.com" style="height: 200px; width: 200px; background: red;">Some Text</div>
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
                _selector.trigger( 'mouseenter' );
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
                _selector.on( 'mouseenter', function( e ) {
                    var _t = $( e.target );
                    _view.coverItem( _selector.children( '.' + _Model.COVER_COVER ) );
                    _p.notification( _Model.COVERED, [ _t, _p ] );
                } );
                _selector.on( 'mouseleave', function( e ) {
                    var _t = $( e.target );
                    _view.coverBack( _selector.children( '.' + _Model.COVER_COVER ) );
                    _p.notification( _Model.LEAVED, [ _t, _p ] );
                } );
                _selector.on( 'click', function( e ) {
                    var _t = $( e.target );
                    _view.link( _selector.children( '.' + _Model.COVER_COVER ) );
                    _p.notification( _Model.CLICKED, [ _t, _p ] );
                } );
            }

        , _inited:
            function(){
                this.trigger( 'inited' );
            }
    });
    
    var _Model = Cover.Model;
    /* Var */
    _Model.COVER_COVER = 'cover-cover';
    _Model.ANIMATE_SPEED = 200;
    _Model._instanceName = 'JCCover';

    /* Event */

    /**
     * JC.Cover hover后遮罩遮挡后 selector 触发的事件
     * @event  coverCovered
     * @param   {Event}          _evt
     * @param   {Target}         _target
     * @param   {CoverInstance}  _coverIns
     * @example
    <pre>
    $( document ).delegate( "div.js_coverCoveredEvent", 
        "coverCovered", function( _evt, _target, _coverIns ) {
            JC.log( 'item covered' );
    } );
    </pre>
     */
    _Model.COVERED = 'coverCovered';

    /**
     * JC.Cover 点击后 selector 触发的事件
     * @event  coverClicked
     * @param   {Event}         _evt
     * @param   {Target}         _target
     * @param   {coverInstance}  _coverIns
     * @example
    <pre>
    $( document ).delegate( "div.js_coverClickedEvent", 
        "coverClicked", function( _evt, _target, _coverIns ) {
            JC.log( 'item clicked' );
    } );
    </pre>
     */
    _Model.CLICKED = 'coverClicked';

    /**
     * JC.Cover 鼠标离开后 selector 触发的事件
     * @event  coverLeaved
     * @param   {Event}         _evt
     * @param   {Target}         _target
     * @param   {coverInstance}  _coverIns
     * @example
    <pre>
    $( document ).delegate( "div.js_coverLeavedEvent",
        "coverLeaved", function( _evt, _target, _coverIns ) {
            JC.log( 'item leaved' );
    } );
    </pre>
     */
    _Model.LEAVED = 'coverLeaved';

    JC.f.extendObject( _Model.prototype, {
        init:
            function() {
            }
        , getCoverDir :
            function() {
                var _dir = this.attrProp( 'coverdir' );
                ( _dir == '' || _dir > 3 || _dir < 0 ) && ( _dir = 2 );
                return parseInt( _dir );
            }
        , getCoverCnt :
            function() {
                return this.attrProp( 'covercnt' );
                var _ele = JC.f.parentSelector( this._selector, coverCnt );
                if( _ele.length > 0 ) {
                    return _ele.html();
                } else {
                    return coverCnt;
                }
            }
        , getCoverSelectorCnt : 
            function() {
                var coverSelectorCnt = this.attrProp( 'coverselectorcnt' );
                var _ele = JC.f.parentSelector( this._selector, coverSelectorCnt );
                if( _ele.length > 0 ) {
                    return _ele.html();
                }
                return '';
            }
        , getCoverLink :
            function() {
                return this.attrProp( 'coverlink' );
            }
        , getCoverPointer :
            function() {
                return this.boolProp( 'coverpointer' );
            }
    });

    JC.f.extendObject( Cover.View.prototype, {
        init:
            function() {
                var _p = this, 
                    _model = _p._model, cover = '',
                    coverLink = _model.getCoverLink(),
                    item = $( _model.selector() ), 
                    cover = '<button class="{0}" style="{1}" {2}>{3}</button>',
                    coverCnt = _model.getCoverCnt() || _model.getCoverSelectorCnt(),
                    cntStyle = _model.getCoverPointer() ? ' cursor : pointer; ' : '',
                    itemStyle = { 'overflow' : 'hidden' };
                coverLink = coverLink ? ' linkurl="' + coverLink + '" ' : '';
                item.css( 'position' ) == 'static' && ( itemStyle['position'] = 'relative' );
                item.css( itemStyle );
                item.append( JC.f.printf( cover, 
                    _Model.COVER_COVER, cntStyle, coverLink, coverCnt ) );
                _p.putCover( item, _model.getCoverDir() );
            }
        /**
        * 初始化遮罩
        * @param   {number}    target
        *          {number}    dir
        * @return  
        */
        , putCover: 
            function( target, dir ) {
                var width = target[ 0 ].offsetWidth,
                    height = target[ 0 ].offsetHeight,
                    cover = target.find( '.' + _Model.COVER_COVER ),
                    top, left;
                if( ( dir & 1 ) == 0 ) {
                    left = 0;
                    top = ( dir == 0 ) ? parseInt( '-' + height ) : height;
                } else {
                    top = 0;
                    left = ( dir == 1 ) ? width : parseInt( '-' + width );
                }
                cover.data( { 'covertop' : top, 'coverleft' : left } )
                    .css( {
                        'top' : top + 'px',
                        'left' : left + 'px',
                        'height' : height + 'px',
                        'width' : width + 'px'
                    } );
            }
        , coverItem:
            function( cover ) {
                cover.stop( false, true ).animate( { top : '0', left : '0' }, 
                    _Model.ANIMATE_SPEED );
            }
        , coverBack:
            function( cover ) {
                cover.stop( false, true ).animate( { top : cover.data( 'covertop' ) + 'px',
                    left : cover.data( 'coverleft' ) + 'px' }, _Model.ANIMATE_SPEED );
            }
        , link:
            function( target ) {
                var linkurl = target.attr( 'linkurl' );
                ( typeof linkurl != 'undefined' ) && window.open( linkurl );
            }
    });

    _jdoc.ready( function(){
        $( document ).delegate( '.js_compCover', 'mouseenter', function( _e ) {
            var _t = $( _e.target ),
                _selector = _t.hasClass( 'js_compCover' ) ? 
                    _t : _t.parent( '.js_compCover' );
            if( !JC.BaseMVC.getInstance( _selector, Cover ) ){
                Cover.init( _selector );
            }
        } );
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
/*
   review qiushaowei 
        
        2014-07-21
                covertitle 属性可以去掉
                    默认的展现内容写在 li 标签里面

                添加一个获取 脚本模板 内容的属性, 比如 itemScriptCnt="/script"( 使用 JC.f.parentSelector 获取脚本选择器 )
                    如果模板内容含有 html tag 的时候, 会比较方便

                初始化 Cover 功能应该最小粒度
                        一个Cover示例只处理一个 li
                        Cover 功能不要涉及布局逻辑, 布局逻辑应该由用户自己处理
                
 */
