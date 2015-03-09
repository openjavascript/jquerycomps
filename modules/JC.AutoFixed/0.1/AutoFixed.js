//TODO: 兼容 不支持 css position = fixed 的浏览器
;(function(define, _win) { 'use strict'; define( 'JC.AutoFixed', [ 'JC.BaseMVC' ], function(){
/**
 * 自动 Fixed ( JC.AutoFixed )
 *
 *  <p><b>require</b>:
 *      <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 *  </p>
 *
 *  <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *      | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.AutoFixed.html' target='_blank'>API docs</a>
 *      | <a href='../../modules/JC.AutoFixed/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *  <h2>页面只要引用本脚本, 默认会处理 div class="js_compAutoFixed"</h2>
 *
 *  <h2>可用的 HTML attribute</h2>
 *
 *  <dl>
 *      <dt>data-normalClass = css class name</dt>
 *      <dd>正常状态下附加的 css<dd>
 *
 *      <dt>data-fixedClass = css class name</dt>
 *      <dd>fixed 状态下附加的 css<dd>
 *
 *      <dt>data-cloneItemClass = css class name</dt>
 *      <dd>fixed源 克隆对象附加的 css( 仅对 position = static 的克隆源生效 )<dd>
 *
 *      <dt>data-fixedTopPx = number, default = 0</dt>
 *      <dd>
 *          滚动到多少像素式开始执行 fixed
 *      </dd>
 *
 *      <dt>data-fixAnchor = bool</dt>
 *      <dd>
 *          是否修正 html 锚点定位问题( 该问题通常出现在 position fixed top = 0 )
 *      </dd>
 *
 *      <dt>data-highlightTrigger = selector</dt>
 *      <dd>滚动时响应滚动条所在锚点的内容高亮显示</dd>
 *
 *      <dt>data-highlightAnchorLayout = selector, default = data-highlightTrigger</dt>
 *      <dd>指定计算位置为锚点的某个父容器 y + height</dd>
 *
 *      <dt>data-highlightClass = css class name, default = cur</dt>
 *      <dd>当前高亮的css class</dd>
 *  </dl> 
 *
 * @namespace   JC
 * @class       AutoFixed
 * @extends     JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2013-12-13
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
        <h2>JC.AutoFixed 示例</h2>
 */
    var _jdoc = $( document ), _jwin = $( window );

    JC.AutoFixed = AutoFixed;

    function AutoFixed( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, AutoFixed ) ) 
            return JC.BaseMVC.getInstance( _selector, AutoFixed );

        JC.BaseMVC.getInstance( _selector, AutoFixed, this );

        this._model = new AutoFixed.Model( _selector );
        this._view = new AutoFixed.View( this._model );

        this._init();

        //JC.log( AutoFixed.Model._instanceName, 'all inited', new Date().getTime() );
    }
    /**
     * 初始化可识别的 AutoFixed 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of AutoFixedInstance}
     */
    AutoFixed.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector.length ){
                if( _selector.hasClass( 'js_compAutoFixed' )  ){
                    _r.push( new AutoFixed( _selector ) );
                }else{
                    _selector.find( 'div.js_compAutoFixed, ul.js_compAutoFixed, dl.js_compAutoFixed' ).each( function(){
                        _r.push( new AutoFixed( this ) );
                    });
                }
            }
            return _r;
        };
    /**
     * 初始化时是否添加延时
     * @property INIT_DELAY
     * @default  0
     * @type int
     * @static
     */
    AutoFixed.INIT_DELAY = 0;

    JC.BaseMVC.build( AutoFixed );

    JC.f.extendObject( AutoFixed.prototype, {
        _beforeInit:
            function(){
                //JC.log( 'AutoFixed _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this;

                _p.on( 'inited', function(){
                    var _st = JDOC.scrollTop(), _cp = _p._model.defaultStyle().top;

                    //JC.log( _p._model.fixedTopPx() );
                    if( JDOC.scrollTop() > 0 ){
                        //JC.dir( _p._model.defaultStyle() );
                        _p.trigger( 'UPDATE_POSITION', [ _st, _cp ]  );
                    }
                });

                _p._model.saveDefault();

                if( _p._model.fixAnchor() ){
                    JDOC.delegate( 'a[href]', 'click', function( _evt ){
                        var _sp = $( this ), _href = _sp.attr( 'href' ) || '';
                        if( !/^[#]/.test( _href ) ) return;
                        JC.f.safeTimeout( function(){
                            JDOC.scrollTop( JDOC.scrollTop() - _p.selector().height() );
                        }, null, _p._model.gid(), 1 );
                    });
                }

                JWIN.on( 'scroll', function( _evt ){
                    var _st = JDOC.scrollTop(), _cp = _p._model.defaultStyle().gtop;
                    _p.trigger( 'UPDATE_POSITION', [ _st, _cp ]  );
                });

                JWIN.on( 'resize', function( _evt ){
                    var _cloneItem = _p._model.cloneItem(), _realWidth, _height, _ds, _winSize, _x, _css;
                    if( !_cloneItem ) {
                        _p._model.normalClass() 
                            && _p.selector().removeClass( _p._model.normalClass() )
                            && _p.selector().addClass( _p._model.normalClass() )
                            ;
                        _realWidth = _p.selector().width();
                    }else{
                        _ds = _p._model.defaultStyle();
                        _winSize = JC.f.winSize();
                        _height = _ds.height;
                        if( _height + _p._model.fixedTopPx() > _winSize.height ){
                            _height = _winSize.height - _p._model.fixedTopPx();
                        }

                        if( _p._model.defaultStyle().right != 'auto' ) {
                            _p.selector().css( {
                                right: JC.f.winSize().width - ( _cloneItem.offset().left + _cloneItem.width() )
                                , height: _height
                            });
                            return;
                        }
                        _realWidth = _cloneItem.width();
                        _css = { 'width': _realWidth, 'height': _height, left: _cloneItem.offset().left };
                        if( _ds.right != 'auto' ){
                            _css.right = _winSize.width - ( _cloneItem.offset().left + _cloneItem.width() );
                        }else{
                            _css.left = _cloneItem.offset().left;
                        }

                        _p.selector().css( _css );
                    }
                    _p._model.defaultStyle().width = _realWidth;
                });

                _p.on( 'UPDATE_POSITION', function( _evt, _st, _cp ){
                    //JC.log( 'UPDATE_POSITION', _st, _cp );
                    if( ( _st ) > ( _cp - _p._model.fixedTopPx() ) ){
                        _p.trigger( 'FIXED', [ _st, _cp ] );
                    }else{
                        _p.trigger( 'UN_FIXED', [ _st, _cp ] );
                    }
                });

                _p.on( 'FIXED', function( _evt, _st, _cp ){
                    var _ds = _p._model.defaultStyle(), _left = 0, _css, _winSize = JC.f.winSize(), _height, _cloneItem;
                    if( _p._model.cloneItem() ) return;
                    if( _p._model.fixedLock() ) return;
                    _p._model.fixedLock( true );
                    _p._model.unfixedLock( false );

                    //JC.log( 'FIXED', _st, _cp );

                    if( _ds.left != _ds.gleft ){
                        _left = _ds.gleft;
                    }else{
                        _left = _ds.left;
                    }
                    _height = _ds.height;
                    if( _height + _p._model.fixedTopPx() > _winSize.height ){
                        _height = _winSize.height - _p._model.fixedTopPx();
                    }
                    _p.trigger( 'CLONE_ITEM' );
                    _cloneItem = _p._model.cloneItem();
                    _css = {
                        'position': 'fixed'
                        , 'top': _p._model.fixedTopPx()
                        , 'height': _height
                        , 'width': _ds.width
                    };
                    if( _ds.right != 'auto' ){
                        _css.right = _winSize.width - ( _cloneItem.offset().left + _cloneItem.width() );
                    }else{
                        _css.left = _left;
                        _css.left = _cloneItem.offset().left;
                    }
                    _p.selector().css( _css );

                    _p._model.normalClass() && _p.selector().removeClass( _p._model.normalClass() );
                    _p._model.fixedClass() && _p.selector().addClass( _p._model.fixedClass() );
                });

                _p.on( 'UN_FIXED', function( _evt, _st, _cp ){
                    if( _p._model.unfixedLock() ) return;
                    _p._model.unfixedLock( true );
                    _p._model.fixedLock( false );

                    var _ds = _p._model.defaultStyle(), _css;
                    //JC.log( 'UN_FIXED', _st, _cp );
                    _p.trigger( 'UN_CLONE_ITEM' );
                    _css = {
                        'position': _ds.position
                        , 'top': _ds.top
                        , 'height': _ds.height
                    };
                    if( _ds.right != 'auto' ){
                        _css.right = _ds.right;
                    }else{
                        _css.left = _ds.left;
                    }

                    _p.selector().css( _css );
                    _p._model.fixedClass() && _p.selector().removeClass( _p._model.fixedClass() );
                    _p._model.normalClass() && _p.selector().addClass( _p._model.normalClass() );
                });

                _p.on( 'CLONE_ITEM', function(){
                    if( _p._model.cloneItem() ) return;
                    var _cloneItem = $( '<div />' )
                        , _ds = _p._model.defaultStyle()
                        ;
                    _cloneItem.css( { 
                        'visibility': 'hidden' 
                        , 'height': _ds.height
                        , 'overflow': 'hidden'
                        , 'position': _ds.position
                        , 'right': _ds.right
                        , 'width': _ds.width
                    });
                    _p._model.cloneItemClass() && _cloneItem.addClass( _p._model.cloneItemClass() );
                    _cloneItem.html('');
                    _p._model.cloneItem( _cloneItem );
                    _p.selector().after( _cloneItem );

                });

                _p.on( 'UN_CLONE_ITEM', function(){
                    _p._model.cloneItem( null );
                });

                if( _p._model.highlightTrigger() && _p._model.highlightTrigger().length ){
                    var _clickTs = JC.f.ts();
                    _p._model.highlightTrigger().on( 'click', function(){
                        _clickTs = JC.f.ts();
                        var _eles = _p._model.findTargetAnchorAndLayout( $( this )) || {};
                        _p.trigger( 'setCurHighlight', [ this, _eles.layout ] );
                    });

                    _p.on( 'setCurHighlight', function( _evt, _src, _layout ){
                        _src = $( _src );
                        if( !( _src && _src.length ) ) return;
                        _p._model.lastHighlightItem() && _p._model.lastHighlightItem().removeClass( _p._model.highlightClass() );
                        _src.addClass( _p._model.highlightClass() );
                        _p._model.lastHighlightItem( _src );

                        if( _layout && _layout.length ){
                            _p._model.lastHighlightLayout() && _p._model.lastHighlightLayout().removeClass( _p._model.highlightLayoutClass() );
                            _layout.addClass( _p._model.highlightLayoutClass() );
                            _p._model.lastHighlightLayout( _layout );
                        }

                    });

                    JWIN.on( 'scroll', function( _evt ){
                        if( JC.f.ts() - _clickTs < 200 ) return;
                        var _st = JDOC.scrollTop()
                            , _curItem
                            , _anchorOffset
                            ;
                        _p._model.highlightTrigger().each( function(){
                            var _src = $( this )
                                , _anchorName = _src.attr( 'href' ).replace( /^\#/, '' )
                                , _anchor
                                ;
                            if( !_anchorName ) return;
                            _anchor = $( JC.f.printf( 'a[name={0}]', _anchorName ) ).first();
                            if( !_anchor.length ) return;
                            _anchorOffset = _p._model.anchorOffset( _anchor );

                            if( _anchorOffset.top > _st ){
                                _curItem = _src;
                                return false;
                            }
                        });
                        _anchorOffset = _anchorOffset || {};
                        if( _curItem ){
                            //JC.log( '_curItem', _curItem.attr( 'name' ) );
                            _p.trigger( 'setCurHighlight', [ _curItem, _anchorOffset.layout ] );
                        }
                    });

                }
            }

        , _inited:
            function(){
                //JC.log( 'AutoFixed _inited', new Date().getTime() );
                this.trigger( 'inited' );
            }
    });

    AutoFixed.Model._instanceName = 'JCAutoFixed';
    JC.f.extendObject( AutoFixed.Model.prototype, {
        init:
            function(){
                //JC.log( 'AutoFixed.Model.init:', new Date().getTime() );
            }

        , findTargetAnchorAndLayout:
            function( _trigger ){
              var _src = $( _trigger )
                    , _anchorName = _src.attr( 'href' ).replace( /^\#/, '' )
                    , _anchor
                    , _anchorOffset
                    , _r = null
                    ;
                if( !_anchorName ) return _r;
                _anchor = $( JC.f.printf( 'a[name={0}]', _anchorName ) ).first();
                if( !_anchor.length ) return _r;
                _r = { trigger: _src, target: _anchor, layout: this.highlightAnchorLayout( _anchor ) };

                return _r;
            }

        , gid: 
            function(){
                !this._gid && ( this._gid = JC.f.gid() );
                return this._gid;
            }

        , lastHighlightLayout:
            function( _setter ){
                _setter && ( this._lastHighlightLayout = _setter );
                return this._lastHighlightLayout;
            }

        , highlightLayoutClass:
            function(){
                return this.attrProp( 'data-highlightLayoutClass' ) || this.highlightClass() || 'cur';
            }

        , lastHighlightItem:
            function( _setter ){
                _setter && ( this._lastHighlightItem = _setter );
                return this._lastHighlightItem;
            }

        , highlightClass:
            function(){
                return this.attrProp( 'data-highlightClass' ) || 'cur';
            }

        , highlightTrigger: 
            function(){
                return this.selectorProp( 'data-highlightTrigger' );
            }

        , anchorOffset: 
            function( _a ){
                var _r = _a.offset(), _layout = this.highlightAnchorLayout( _a ), _tmp;

                if( _layout && _layout.length ){
                    _r = _layout.offset();
                    _r.top += _layout.height();
                }
                _r.layout = _layout;

                return _r;
            }
        , highlightAnchorLayout:
            function( _a ){
                var _r;
                if( this.is( '[data-highlightAnchorLayout]' ) ){
                     _r = JC.f.parentSelector( _a, this.attrProp( 'data-highlightAnchorLayout' ) );
                }
                return _r;
            }

        , defaultStyle:
            function(){
                var _r = { 
                    position: 'static'
                    , left: 0, top: 0
                    , right: 0, bottom: 0
                    , width: 0, height: 0
                    , gleft: 0, gtop: 0 
                    , winSize: JC.f.winSize()
                };
                return this._defaultStyle || _r;
            }

        , fixedLock:
            function( _setter ){
                typeof _setter != 'undefined' && ( this._fixedLock = _setter );
                return this._fixedLock;
            }

        , unfixedLock:
            function( _setter ){
                typeof _setter != 'undefined' && ( this._unfixedLock= _setter );
                return this._unfixedLock;
            }

        , saveDefault:
            function(){
                var _p = this, _r = _p.defaultStyle()
                    , _offset = _p.selector().position()
                    , _goffset = _p.selector().offset()
                    ;

                _r.owidth = _p.selector().css( 'width' );
                _r.gleft = _goffset.left;
                _r.gtop = _goffset.top;
                _r.position = _p.selector().css( 'position' );
                _r.left = _offset.left;
                _r.top = _offset.top;
                _r.width = _p.selector().width();
                _r.height = _p.selector().height();
                _r.right = _p.selector().css( 'right' );
                _r.bottom = _p.selector().css( 'bottom' );

                _p._defaultStyle = _r;
            }

        , fixedTopPx:
            function(){
                typeof this._fixedTopPx == 'undefined' && ( this._fixedTopPx = this.floatProp( 'data-fixedTopPx' ) );
                return this._fixedTopPx;
            }

        , fixAnchor:
            function(){
                return this.boolProp( 'data-fixAnchor' );
            }

        , fixedClass: function(){ return this.attrProp( 'data-fixedClass' ); }
        , normalClass: function(){ return this.attrProp( 'data-normalClass' ); }
        , cloneItemClass: function(){ return this.attrProp( 'data-cloneItemClass' ); }
       
        , cloneItem:
            function( _setter ){
                if( typeof _setter != 'undefined' ){
                    if( !_setter && this._cloneItem ){
                        this._cloneItem.remove();
                    }
                    this._cloneItem = _setter;
                }
                return this._cloneItem;
            }
    });

    JC.f.extendObject( AutoFixed.View.prototype, {
        init:
            function(){
                //JC.log( 'AutoFixed.View.init:', new Date().getTime() );
            }
    });

    _jdoc.ready( function(){
        JC.f.safeTimeout( function(){
            if( JC.AutoFixed.INIT_DELAY ){
                JC.f.safeTimeout( function(){
                    AutoFixed.autoInit && AutoFixed.init();
                }, null, 'AutoFixedasdfasefasedf', JC.AutoFixed.INIT_DELAY );
            }else{
                AutoFixed.autoInit && AutoFixed.init();
            }
        }, null, 'AutoFixed23asdfa', 1 );
    });

    return JC.AutoFixed;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
