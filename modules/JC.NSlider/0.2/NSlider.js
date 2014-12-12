;(function(define, _win) { 'use strict'; define( [ 'JC.common', 'JC.BaseMVC' ], function(){
    /**
     * 组件用途简述
     *
     * <p><b>require</b>:
     *      <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
     * </p>
     * 
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     *      | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.NSlider.html' target='_blank'>API docs</a>
     *      | <a href='../../modules/JC.NSlider/0.1/_demo/' target='_blank'>demo link</a></p>
     * 
     * <h2> 可用的 html attribute </h2>
     * 
     * <dl>
     *      <dt>slidersubitems = selector</dt>
     *      <dd>指定具体子元素是那些，支持JC的选择器扩展</dd>
     *
     *      <dt>sliderdirection = String default = 'horizontal'</dt>
     *      <dd>滚动的方向, 默认 horizontal, { horizontal, vertical }</dd>
     *
     *      <dt>sliderloop = boolean default = false</dt>
     *      <dd>是否循环滚动</dd>
     *
     *      <dt>sliderautomove = boolean default = false</dt>
     *      <dd>是否自动滚动</dd>
     *
     *      <dt>sliderprev = selector</dt>
     *      <dd>后( 左 | 上 )移的触发元素selector, 控制slider向后( 左 | 上 )滚动</dd>
     *
     *      <dt>slidernext = selector</dt>
     *      <dd>前( 右 | 下 )移的触发元素selector, 控制slider向前( 右 | 下 )滚动</dd>
     *
     *      <dt>sliderhowmanyitem = int default = 1</dt>
     *      <dd>每次滚动多少个子元素, 默认1</dd>
     *
     *      <dt>sliderstepms = int default = 10</dt>
     *      <dd>滚动效果运动的间隔时间(毫秒), 默认 10ms</dd>
     *
     *      <dt>sliderdurationms = int default = 300</dt>
     *      <dd>滚动效果的总时间(毫秒), 默认 300ms</dd>
     *
     *      <dt>sliderautomovems = int default = 2000</dt>
     *      <dd>自动滚动的间隔(毫秒), 默认 2000ms</dd>
     * </dl>
     * 
     * @namespace   JC
     * @class       NSlider
     * @extends     JC.BaseMVC
     * @constructor
     * @param   {selector|string}   _selector   
     * @version dev 0.1 2014-12-04
     * @author  pengjunkai <pengjunkai@360.cn> | 75 Team
     * @date    2014-12-04
     * @example
        <link href='../../Slider/res/hslider/style.css' rel='stylesheet' />
        <script src="../../../lib.js"></script>
        <script src="../../../config.js"></script>
        <script>
            JC.debug = true;
            requirejs( [ 'JC.NSlider' ] );
        </script>
        <table class="hslide_wra" style="margin: 0 auto;">
            <tr>
                <td class="hslide_left">
                    <a href="javascript:" hidefocus="true" style="outline:none;" class="js_slideleft">左边滚动</a>
                </td>
                <td class="hslide_mid">
                    <dl 
                        style="width:360px; height: 230px; margin:0 5px;"
                        class="hslide_list hslide_list2 clearfix js_slideList js_NSlider" 
                        slidersubitems="/dd"
                        slidernav="single" slidernavtype="icon"
                        sliderprev="(table a.js_slideleft" 
                        slidernext="(table a.js_slideright" 
                        sliderdirection="horizontal" sliderhowmanyitem="1" 
                        sliderinitedcb="sliderinitedcb"
                        sliderloop="true" sliderdurationms="300"
                        sliderautomove="true" sliderautomovems="2500"
                        >
                        <dd class="tipsItem">
                        <a href="http://v.ku6.com/film/index_106123.html?from=my" target="_blank"> 
                            <span class="pc">
                                <img alt="minions" src="data/images/minions.jpg" title="minions0"> 
                            </span>
                        </a>
                        </dd>
                        <dd class="tipsItem">
                        <a href="http://v.ku6.com/film/index_106123.html?from=my" target="_blank"> 
                            <span class="pc">
                                <img alt="minions" src="data/images/minions.jpg" title="minions1"> 
                            </span>
                        </a>
                        </dd>
                        <dd class="tipsItem">
                        <a href="http://v.ku6.com/film/index_106123.html?from=my" target="_blank"> 
                            <span class="pc">
                                <img alt="minions" src="data/images/minions.jpg" title="minions2"> 
                            </span>
                        </a>
                        </dd>
                        <dd class="tipsItem">
                        <a href="http://v.ku6.com/film/index_106123.html?from=my" target="_blank"> 
                            <span class="pc">
                                <img alt="minions" src="data/images/minions.jpg" title="minions3"> 
                            </span>
                        </a>
                        </dd>
                        <dd class="tipsItem">
                        <a href="http://v.ku6.com/film/index_106123.html?from=my" target="_blank"> 
                           <span class="pc">
                                <img alt="minions" src="data/images/minions.jpg" title="minions4"> 
                            </span>
                        </a>
                        </dd>
                        <dd class="tipsItem">
                        <a href="http://v.ku6.com/film/index_106123.html?from=my" target="_blank"> 
                            <span class="pc">
                                <img alt="minions" src="data/images/minions.jpg" title="minions5"> 
                            </span>
                        </a>
                        </dd>
                        <dd class="tipsItem">
                        <a href="http://v.ku6.com/film/index_106123.html?from=my" target="_blank"> 
                            <span class="pc">
                                <img alt="minions" src="data/images/minions.jpg" title="minions6"> 
                            </span>
                        </a>
                        </dd>
                        <dd class="tipsItem">
                        <a href="http://v.ku6.com/film/index_106123.html?from=my" target="_blank"> 
                            <span class="pc">
                                <img alt="minions" src="data/images/minions.jpg" title="minions7"> 
                            </span>
                        </a>
                        </dd>
                    </dl>
                </td>
                <td class="hslide_right">
                    <a href="javascript:" hidefocus="true" style="outline:none;" class="js_slideright">右边滚动</a>
                </td>
            </tr>
        </table>
     */

    var _jdoc = $( document ), _jwin = $( window );

    JC.NSlider = NSlider;

    function NSlider( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, NSlider ) ) 
            return JC.BaseMVC.getInstance( _selector, NSlider );

        JC.BaseMVC.getInstance( _selector, NSlider, this );

        /**
         * 初始化数据模型
         */
        this._model = new NSlider.Model( _selector );
        /**
         * 初始化视图模型( 根据不同的滚动方向, 初始化不同的视图类 )
         */
        switch( this._model.direction() ){
            case 'vertical': this._view = new VerticalView( this._model, this ); break;
            default: this._view = new HorizontalView( this._model, this ); break;
        }

        this._init();
    }

    NSlider.init = function( _selector ){
        var _r = [];
        _selector = $( _selector || document );
        if( _selector.length ){
            if( _selector.hasClass( 'js_NSlider' )  ) {
                _r.push( new NSlider( _selector ) );
            } else {
                _selector.find( 'div.js_NSlider' ).each( function() {
                    _r.push( new NSlider( this ) );
                });
            }
        }
        return _r;
    }

    JC.BaseMVC.build( NSlider );

    JC.f.extendObject( NSlider.prototype, {
        _beforeInit: function() { }

        , _initHanlderEvent: function() {
                var _p = this,
                    _model = _p._model,
                    _view = _p._view,
                    _selector = _model.selector();

                _p.on( 'inited', function() {
                    var _p = this;

                    _p._initControl();

                    _p.on('cleartinterval', function(){
                        _p._model.clearInterval();
                        _p._view.setPagePosition();
                    });

                    _p.on('cleartimeout', function(){
                        _p._model.clearTimeout();
                    });

                    _p._initAutoMove();

                });
                
            }

        , _initControl: function(){
                this._initSliderNav();
                switch( this._model.direction() ){
                    case 'vertical': this._initVerticalControl(); break;
                    default: this._initHorizontalControl(); break;
                }
            }

        , _initHorizontalControl: function(){
            var _p = this;
            var _model = _p._model;
            _model.prevbutton() 
                && _model.prevbutton().on( 'click', function( _evt ){

                    _p.notification( _Model.PREVCLICK, [ $( _evt ), _p ] );
                    _p.trigger('cleartimeout');
                    _p.trigger('movetoprev');

                    if( _model._movelock ){ 
                        _p._view.jpMove( 
                            _model.jpPage( _model.combClickNum( ++_model._combClickNum ) )
                            , _model.durationms() - _model._passTime 
                        );
                    } else {
                        _model.lockmove();
                        _p._view.jpMove( _model.jpPage( 
                            _model._nowIndex
                            , _model.howmanyitem() 
                        ) );
                    }
                    _model.changeIndex();
                })
                .on('mouseenter', function(){ _p.trigger('controlover'); } )
                .on('mouseleave', function(){ _p.trigger('controlout'); } )
            ;

            _model.nextbutton() 
                && _model.nextbutton().on( 'click', function( _evt ){

                    _p.notification( _Model.PREVCLICK, [ $( _evt ), _p ] );
                    _p.trigger('cleartimeout');
                    _p.trigger('movetonext');

                    if( _model._movelock ){ 
                        _p._view.jpMove( 
                            _model.jpPage( _model.combClickNum( ++_model._combClickNum ) )
                            , _model.durationms() - _model._passTime 
                        );
                    } else {
                        _model.lockmove();
                        _p._view.jpMove( _model.jpPage( 
                            _model._nowIndex
                            , _model.howmanyitem() 
                        ) );
                    }
                    _model.changeIndex();

                } )
                .on('mouseenter', function(){ _p.trigger('controlover'); } )
                .on('mouseleave', function(){ _p.trigger('controlout'); } )
            ;
        }

        , _initVerticalControl: function(){

            var _p = this;
            var _model = _p._model;

            _model.prevbutton() 
                && _model.prevbutton().on( 'click', function( _evt ){

                    if( _model._movelock ){ return; }
                    _model.lockmove();

                    _p.notification( _Model.PREVCLICK, [ $( _evt ), _p ] );

                    _p.trigger('cleartimeout');
                    _p.trigger('movetoprev');
                    
                    _p._view.jpMove( _model.jpPage( 
                        _model._nowIndex
                        , _model.howmanyitem() 
                    ) );

                    _model.changeIndex();
                })
                .on('mouseenter', function(){ _p.trigger('controlover'); } )
                .on('mouseleave', function(){ _p.trigger('controlout'); } )
            ;

            _model.nextbutton() 
                && _p._model.nextbutton().on( 'click', function( _evt ){
                    
                    if( _model._movelock ){ return; }
                    _model.lockmove();

                    _p.notification( _Model.NEXTCLICK, [ $( _evt ), _p ] );

                    _p.trigger('cleartimeout');
                    _p.trigger('movetonext');
                    
                    _p._view.jpMove( _model.jpPage( 
                        _model._nowIndex
                        , _model.howmanyitem() 
                    ) );

                    _model.changeIndex();
                })
                .on('mouseenter', function(){ _p.trigger('controlover'); } )
                .on('mouseleave', function(){ _p.trigger('controlout'); } )
            ;
        }

        , _initSliderNav: function(){
            var _p = this;
            var _model = _p._model;

            _model._selector.on( 'click', '.slide_navbtn', function( e ) {
                e.preventDefault();

                var _tar = $( e.target );
                var _index = parseInt(_tar.attr( 'data-index' ) );

                _p._view.jpMove( _model.itemRemote( 
                    _model._nowIndex
                    , _index
                ), undefined, true );

                _model.changeIndex( _index );
                
            } );
        }

        , _initAutoMove: function(){
            var _p = this;
            var _model = _p._model;

            if( !_p._model.automove() ) return;

            _p.on('beforemove', function( _evt ){
                _p.trigger('cleartimeout');

                _p.notification( _Model.BEFOREMOVE, [ $( _evt ), _p ] );
            });

            _p.on('aftermove', function( _evt, _oldpointer, _newpointer ){

                _p.notification( _Model.AFTERMOVE, [ $( _evt ), _p ] );

                if( _model.controlover() ) return;
                _p.trigger('automove');
            });

            _model._selector.on( 'mouseenter', function( _evt ){
                _p.trigger('cleartimeout');
                _p.trigger('mouseenter');
            });

            _model._selector.on( 'mouseleave', function( _evt ){
                _p.trigger('cleartimeout');
                _p.trigger('mouseleave');
                _p.trigger('automove');
            });

            _p.on('controlover', function(){
                _p.trigger('cleartimeout');
                _p._model.controlover( true );
            });

            _p.on('controlout', function(){
                _p.trigger('automove');
                _model.controlover( false );
            });

            _p.on('movetoprev', function(){
                _model.moveDirection( false );
            });

            _p.on('movetonext', function(){
                _model.moveDirection( true );
            });

            _model.automove && $( _p ).on('automove', function(){
                var _howmany = _model.howmanyitem();

                _p._model.timeout( setTimeout( function(){
                    _p._view.jpMove( _model.jpPage( _model._nowIndex, _howmany ) );
                    _model.changeIndex();
                }, _p._model.automovems() ));
            });

            _p.trigger('automove');
            return this;
        }

        , _inited: function(){
            this.trigger( 'inited' );
        }
    });
    
    var _Model = NSlider.Model;

    /**
     * JC.NSlider 在滚动前 selector 触发的事件
     * @event  beforeMove
     * @param   {Event}         _evt
     * @param   {Target}         _target
     * @param   {coverInstance}  _coverIns
     * @example
    <pre>
    $( document ).delegate( ".nslider_callback", "beforeMove", function( _evt, _target, _coverIns ) {
        JC.log( 'slider beforeMove' );
    } );
    </pre>
     */
    _Model.PREVCLICK = 'slidPrev';

    /**
     * JC.NSlider 在滚动后 selector 触发的事件
     * @event  afterMove
     * @param   {Event}         _evt
     * @param   {Target}         _target
     * @param   {coverInstance}  _coverIns
     * @example
    <pre>
    $( document ).delegate( ".nslider_callback", "afterMove", function( _evt, _target, _coverIns ) {
        JC.log( 'slider afterMove' );
    } );
    </pre>
     */
    _Model.NEXTCLICK = 'slidNext';

    /**
     * JC.NSlider 点击向前滚动按钮后 selector 触发的事件
     * @event  slidPrev
     * @param   {Event}         _evt
     * @param   {Target}         _target
     * @param   {coverInstance}  _coverIns
     * @example
    <pre>
    $( document ).delegate( ".nslider_callback", "slidPrev", function( _evt, _target, _coverIns ) {
        JC.log( 'slider slidPrev' );
    } );
    </pre>
     */
    _Model.BEFOREMOVE = 'beforeMove';

    /**
     * JC.NSlider 点击向后滚动按钮后 selector 触发的事件
     * @event  slidNext
     * @param   {Event}         _evt
     * @param   {Target}         _target
     * @param   {coverInstance}  _coverIns
     * @example
    <pre>
    $( document ).delegate( ".nslider_callback", "slidNext", function( _evt, _target, _coverIns ) {
        JC.log( 'slider slidNext' );
    } );
    </pre>
     */
    _Model.AFTERMOVE = 'afterMove';


    JC.f.extendObject( _Model.prototype, {
        init: function() { 
            this._nowIndex = 0;
            this._moveDirection = true;
        }

        , prevbutton: function(){ return this.selectorProp( 'sliderprev' ); }

        , nextbutton: function(){ return this.selectorProp( 'slidernext' ); }

        , direction: function(){ return this.attrProp( 'sliderdirection' ) || 'horizontal'; }
        /**
         * 获取/设置自动移动的方向
         * <br /> true = 向右|向下, false = 向左|向上
         * @param   {string}    _setter
         * @return string
         */
        , moveDirection: function( _setter ){
            typeof _setter != 'undefined' && ( this._moveDirection = _setter );
            return this._moveDirection;
        }
        /**
         * 获取每次移动多少项
         * @return int
         */
        , howmanyitem: function(){ return this.intProp('sliderhowmanyitem') || 1; }
        /**
         * 获取一次可展示的个数
         * @return int
         */
        , viewItemNum: function(){
            var _itemNum = Math.floor( 
                this.direction() == 'horizontal' ? ( this.width() / this.itemwidth() ) 
                    : ( this.height() / this.itemheight() ) 
            );

            return ( this.viewItemNum = function(){
                return _itemNum;
            } )();
        }

        , width: function(){ 
            var _width = this.selector().width() || 800;
            return ( this.width = function(){
                return _width;
            } )();
        }
        

        , height: function(){ 
            var _height = this.selector().height() || 230;
            return ( this.height = function(){
                return _height;
            } )();
        }

        , itemwidth: function(){
            var _itemWidth = this.subitems().eq( 0 ).width() || 160;
            return ( this.itemwidth = function(){
                return _itemWidth;
            } )();
        }

        , itemheight: function(){
            var _itemHeight = this.subitems().eq( 0 ).height() || 230;
            return ( this.itemheight = function(){
                return _itemHeight;
            } )();
        }

        , loop: function(){ return this.boolProp('sliderloop'); }
        /**
         * 获取每次移动间隔的毫秒数
         * @default 10
         * @return int
         */
        , stepms: function(){ return this.intProp('sliderstepms') || 10; }
        /**
         * 获取每次移动持续的毫秒数
         * @default 300
         * @return int
         */
        , durationms: function(){ return this.intProp('sliderdurationms') || 300; }
        /**
         * 获取自动滚动的间隔
         * @default 2000
         * @return int
         */
        , automovems: function(){ return this.intProp('sliderautomovems') || 2000; }

        , automove: function(){ return this.boolProp('sliderautomove'); }

        , defaultindex: function(){ return this.intProp('sliderdefaultindex') || 0; }
        /**
         * 获取滑动导航的配置
         * @return  int
         * @default 0
         */
         , slidernav: function(){ return this.attrProp('slidernav'); }
        /**
         * 获取滑动导航的配置
         * @return  int
         * @default 0
         */
        , slidernavtype: function(){ return this.attrProp('slidernavtype') || 'icon'; }
        /**
         * 获取划动的所有项
         * @method  subitems
         * @return  selector
         */
        , subitems: function(){
            return this.selectorProp( 'slidersubitems' );
        }
        /**
         * 获取/设置当前索引位置
         * @param   {int}   _setter
         * @return int
         */
        , pointer: function( _setter ){ 
            if( typeof this._pointer == 'undefined' ) this._pointer = this.defaultindex();
            if( typeof _setter != 'undefined' ) this._pointer = 0;
            return this._pointer;
        }

        /**
         * 获取指定页的所有划动项
         * @param   {int}   _index
         * @return array
         */
        , page: function( _index, _num, _dir ) {

            this.clearInterval();

            typeof _num == 'undefined' && ( _num = 0 );

            if( typeof _dir == 'undefined' ){
                _dir = this.moveDirection();
            } else {
                this.moveDirection( _dir );
            }

            var _remoteItemList = [];
            var _subitems = this.subitems();
            var _viewItemNum = this.viewItemNum();

            if( !_dir ) {
                _index -= _num;
                if( _index < 0 ) {
                    _index += _subitems.length;
                }
            }

            for( var _j = 0; _j < _viewItemNum + _num; _j++, _index++ ) {
                if( _index == _subitems.length ) {
                    _index = 0;
                }
                _remoteItemList.push( _subitems[ _index ] );
            }

            return this._remoteItemList = _remoteItemList;
        }

        , jpPage: function( _targetIdx, _num, _dir ) {

            this.clearInterval();

            var _subitems = this.subitems();
            var _index = this._nowIndex;

            typeof _num == 'undefined' && ( _num = this.howmanyitem() );
            
            if( typeof _dir == 'undefined' ){
                _dir = this.moveDirection();
            } else {
                this.moveDirection( _dir );
            }

            if( _dir ) {/* 把_index调整至需要push的位置 */
                _index += this.viewItemNum();
            } else {
                _index -= _num;
                if( _index < 0 ) {
                    _index += _subitems.length;
                }
            }

            for( var _i = 0, _j = _index; _i < _num; _i++,_j++ ) {
                if( _j == _subitems.length ){
                    _j = 0;
                }

                if( _dir ){
                    this._remoteItemList[ this._remoteItemList.length - 1 ] != _subitems[ _j ] &&
                    this._remoteItemList.push( _subitems[ _j ] );
                } else {
                    this._remoteItemList[ 0 ] != _subitems[ _j ] &&
                    this._remoteItemList.unshift( _subitems[ _j ] );
                }
            }

            console.log( this._remoteItemList );

            return this._remoteItemList;
        }

        , remoteIndex: function( _index ){
            if( typeof _index == 'undefined' ){
                return this._remoteIndex || 0;
            } else {
                return this._remoteIndex = _index;
            }
        }

        , itemRemote: function( _nowIndex, _targetIdx ){

            if( _targetIdx == _nowIndex ){
                return;
            }

            var rIndex = _targetIdx - _nowIndex;

            return this.jpPage( _nowIndex, Math.abs( rIndex ) , rIndex >= 0 );
        }

        , changeIndex: function( _idx ){

            var _oldIndex = ( typeof _idx == 'undefined' )
                 ? this._nowIndex : _idx;
            var _index = _oldIndex;
            var _howmany;
            var _subitems;

            if( typeof _idx == 'undefined' ) {
                _howmany = this.howmanyitem();
                _subitems = this.subitems();

                if( this.moveDirection() ) {
                    _index += _howmany;
                    if( _index >= _subitems.length ) {
                        _index -= _subitems.length;
                    }
                } else {
                    _index -= _howmany;
                    if( _index < 0 ) {
                        _index += _subitems.length;
                    }
                }
            }
            
            this._nowIndex = _index;
            this.changeRemoteNav( _index );
            return _oldIndex;
        }

        , changeRemoteNav : function( _index ){

            var _slider = this._selector;
            var _nowNav = _slider.find( '.slide_on' );

            if( this.slidernav() == 'group' ){
                var _viewItemNum = this.viewItemNum();
                var _nowNavNum = parseInt( _nowNav.attr( 'data-index' ) );
                
                if( _nowNavNum + _viewItemNum - 1 > _index && _index > _nowNavNum ){
                    return;
                }
                _nowNav.removeClass( 'slide_on' );

                _slider.find( '.slide_navbtn[data-index=' + 
                    ( _index - ( _index % _viewItemNum ) ) + ']' ).addClass( 'slide_on' );
            } else {
                _nowNav.removeClass( 'slide_on' );
                _slider.find( '.slide_navbtn[data-index=' + _index + ']' )
                    .addClass( 'slide_on' );
            }
        }
        /**
         * 获取/设置 划动的 interval 对象
         * @param   {interval}  _setter
         * @return  interval
         */
        , interval: function( _setter ){
            typeof _setter != 'undefined' && ( this._interval = _setter );
            return this._interval;
        }
        /**
         * 清除划动的 interval
         */
        , 'clearInterval': function(){
            this.interval() && clearInterval( this.interval() );
        }
        /**
         * 获取/设置 自动划动的 timeout
         * @param   {timeout}   _setter
         * @return  timeout
         */
        , timeout: function( _setter ){
            typeof _setter != 'undefined' && ( this._timeout = _setter );
            return this._timeout;
        }
        /**
         * 清除自动划动的 timeout
         */
        , clearTimeout: function(){
            this.timeout() && clearTimeout( this.timeout() );
        }
        /**
         * 获取/设置当前鼠标是否位于 slider 及其控件上面
         * @param   {bool}  _setter
         * @return  bool
         */
        , controlover: function( _setter ){
            typeof _setter != 'undefined' && ( this._controlover = _setter );
            return this._controlover;
        }

        , lockmove: function(){
            this._movelock = true;
            this.combClickNum( 0 );
        }

        , unlockmove: function(){
            this._movelock = false;
        }

        , combClickNum: function( _num ){
            if( typeof _num == 'undefined' ){
                return this._combClickNum;
            } else {
                return this._combClickNum = _num;
            }
        }

    });

    function HorizontalView( _model, _slider ){
        this._model = _model;
        this._slider = _slider;

        var _viewItemNum = _model.viewItemNum();

        this._itemspace = parseInt( ( _model.width() - _viewItemNum
             * _model.itemwidth() ) / _viewItemNum );
    }

    HorizontalView.prototype = {
        init: function() {
            this.setPagePosition( this._model.pointer() );
            this._initSliderNav( this._model.slidernav() );
            return this;
        }

        , _initSliderNav: function( _nav ){

            if( !_nav ){
                return;
            }

            var _model = this._model;
            var _tmpItem = '';
            var _navType = _model.slidernavtype();
            var _viewItemNum = _model.viewItemNum();
            var _navNum = _model.subitems().length;

            _navNum = ( _nav == 'group' ) ? 
                ( _navNum / _viewItemNum ) : _navNum;

            _tmpItem += '<div class="hslide_nav">';
            for( var _i = 0; _i < _navNum; _i++ ){
                _tmpItem += JC.f.printf( 
                    '<a href="#" class="slide_navbtn {0} {1}" data-index="{2}">{3}</a>'
                    , ( _i == 0 ) ? 'slide_on' : ''
                    , ( _navType == 'num' ) ? 'hslide_navnum' : 'hslide_navicon'
                    , ( _nav == 'group' ) ? _i * _viewItemNum : _i
                    , _i + 1 
                );
            }
            _tmpItem += '</div>';

            _model._selector.append( _tmpItem );
        }

        /*
        *  _remoteItems : 需要被滑动的元素集合
        *  _durTime     : 滑动的执行时间
        *  _navclick    : 是否是nav点击
        */
        , jpMove: function( _remoteItems, _durTime, _navclick ){

            if( !_remoteItems || _remoteItems.length == 0 ) {
                return;
            }

            if( typeof _durTime == 'undefined' ) {
                _durTime = this._model.durationms();
            }

            var _p = this;
            var _model = this._model;

            var _dir = _model.moveDirection();
            var _howmany = _model.howmanyitem();
            var _itemTotalWidth = _model.itemwidth() + _p._itemspace;
            var _remoteLen = _remoteItems.length;
            var _slidWidth;
            var _baseWidth;/* 增加的元素的基础位置 */
            var _tmpItem;
            var _tmpWidth;
            var _tmpNum = 0;

            if( _dir ) {/* 向左滑动 */
                _baseWidth = $( _remoteItems[ 0 ] ).prop( 'offsetLeft' );

                $.each( _remoteItems, function( _ix, _item ) {
                    _tmpItem = $( _item );

                    if( _remoteLen - _ix <= _howmany ) {
                        _tmpItem.css( {
                            'left': ( _baseWidth + ( _navclick ? ++_tmpNum : _ix ) * _itemTotalWidth ) + 'px' 
                        } ).show();
                    } else {
                        _tmpItem.show();
                    }
                    _tmpItem.data( 'TMP_LEFT', _tmpItem.prop( 'offsetLeft' ) );
                } );

                _slidWidth = $( _remoteItems[ _remoteLen - 1 ] ).prop( 'offsetLeft' )
                     - _model.width() + _itemTotalWidth;
            } else {/* 向右滑动 */
                _baseWidth = $( _remoteItems[ _remoteLen - 1 ] ).prop( 'offsetLeft' );

                for( var _n = _remoteLen - 1; _n >= 0; _n-- ) {
                    _tmpItem = $( _remoteItems[ _n ] );

                    if( _n < _howmany ) {
                        _tmpItem.css( { 'left': ( 
                            _baseWidth - ( _navclick ? ( _howmany - _tmpNum++ ) 
                                : ( _remoteLen - _n - 1 ) ) * _itemTotalWidth 
                        ) + 'px' } ).show();
                    } else {
                        _tmpItem.show();
                    }
                    _tmpItem.data( 'TMP_LEFT', _tmpItem.prop( 'offsetLeft' ) );
                }

                _slidWidth = Math.abs( $( _remoteItems[ 0 ] ).prop( 'offsetLeft' ) );
            }

            $( _p._slider ).trigger( 'beforemove' );

            var basePassTime = _model._passTime || 0;

            _model.interval( JC.f.easyEffect( function( _step, _done, _passTime ) {

                _model._passTime = basePassTime + _passTime ;

                $( _remoteItems ).each( function( _ix, _item ) {
                    if( !_item ){ return; }

                    _tmpItem = $( _item )
                    
                    _tmpWidth = _tmpItem.data( 'TMP_LEFT' );
                    if( _dir ) {
                        _tmpWidth -= _step;

                        _tmpItem.css( { 'left': _tmpWidth + 'px' } );
                        if( _tmpWidth <= -_itemTotalWidth ) {
                            _tmpItem.hide();
                            _item = {};
                            _model._remoteItemList.shift();
                        }
                    } else {
                        _tmpWidth += _step;

                        _tmpItem.css( { 'left': _tmpWidth + 'px' } );
                        if( _tmpWidth >= _model.width() ) {
                            _tmpItem.hide();
                            _item = {};
                            _model._remoteItemList.pop();
                        }
                    }
                } );

                if( _done ) {
                    _model.unlockmove();
                    _model._passTime = 0;
                }
            }, _slidWidth, 0, _durTime, this._model.stepms() ) );

            $( _p._slider ).trigger( 'aftermove' );
        }

        , setPagePosition: function( _ix ){
            typeof _ix == 'undefined' && ( _ix = this._model.initIndex() );
            this._model.subitems().hide();
            var _page = this._model.page( _ix );

            for( var i = 0, j = _page.length; i < j; i++ ){
                $( _page[ i ] ).css( {
                    'left': i * ( this._model.itemwidth() + 
                        this._itemspace ) + 'px' 
                } ).show();
            }
        }
    };

    function VerticalView( _model, _slider ){
        this._model = _model;
        this._slider = _slider;

        var _viewItemNum = _model.viewItemNum();

        this._itemspace = parseInt( ( _model.height() - _viewItemNum
             * _model.itemheight() ) / _viewItemNum );
    }

    VerticalView.prototype = {
        init: function() {
            this.setPagePosition( this._model.pointer() );
            this._initSliderNav( this._model.slidernav() );
            return this;
        }

        , _initSliderNav: function( _nav ){
            if( _nav == '' ){
                return;
            }

            var _model = this._model;
            var _tmpItem = '';
            var _navType = _model.slidernavtype();
            var _navNum = _model.subitems().length;

            _navNum = ( _nav == 'group' ) ? 
                ( _navNum / _viewItemNum ) : _navNum;

            _tmpItem += '<div class="vslide_nav">';
            for( var _i = 0; _i < _navNum; _i++ ){
                _tmpItem += JC.f.printf( 
                    '<a href="#" class="slide_navbtn {0} {1}" data-index="{2}">{3}</a>'
                    , ( _i == 0 ) ? 'slide_on' : ''
                    , ( _navType == 'num' ) ? 'vslide_navnum' : 'vslide_navicon'
                    , ( _nav == 'group' ) ? _i * _viewItemNum : _i
                    , _i + 1 
                );
            }
            _tmpItem += '</div>';

            _model._selector.append( _tmpItem );
        }

        , moveTo: function( _remoteList ){
            if( !_remoteList || _remoteList.length == 0 ){
                return;
            }

            var _p = this;
            var _model = this._model;

            var _howmany = _model.howmanyitem();
            var _dir = _model.moveDirection();
            var _slidWidth = _howmany * ( _model.itemheight() + _p._itemspace );
            var _tmpItem;
            var _tmpNum = 0;
            var _begin;
            var _oldItems = [];

            if( _dir ) {/* 向上滑动 */
                _begin = this._model.height();
                $.each( _remoteList, function( _ix, _item ) {
                    _tmpItem = $( _item );
                    if( _remoteList.length - _ix <= _howmany ) {
                        _tmpItem.css( { 'top': _begin + _tmpNum * ( _p._model.itemheight() 
                            + _p._itemspace ) + 'px' } ).show();
                        _tmpNum++;
                    }
                    if( _ix < _howmany ){
                        _oldItems.push( _tmpItem );
                    }
                    _tmpItem.data( 'TMP_TOP', $( _item ).prop('offsetTop') );
                });
            } else {/* 向下滑动 */
                _begin = - (_p._model.itemheight() + _p._itemspace);
                var _len = _remoteList.length;
                var _item;
                for( var _i = _len - 1; _i >= 0; _i-- ){
                    
                    _tmpItem = $( _remoteList[ _i ] );

                    if( _i < _howmany ) {
                        _tmpItem.css( { 'top': _begin - _tmpNum * ( _p._model.itemheight() 
                            + _p._itemspace ) + 'px' } ).show();
                        _tmpNum++;
                    }

                    if( _remoteList.length - _i <= _howmany ){
                        _oldItems.push( _tmpItem );
                    }
                    _tmpItem.data('TMP_TOP', _tmpItem.prop('offsetTop') );
                }
            }

            $( _p._slider ).trigger( 'beforemove' );

            _p._model.interval( JC.f.easyEffect( function( _step, _done ){
                $( _remoteList ).each(function( _ix, _item ){
                    $( _item ).css( { 'top': $( _item ).data( 'TMP_TOP' ) +
                        ( _dir ? -_step : _step ) + 'px' } );
                });

                if( _done ) {
                    $.each( _oldItems, function( _i, _item ){ 
                        $( _item ).hide(); 
                    } );
                    _model.unlockmove();
                }
            }, _slidWidth, 0, this._model.durationms(), this._model.stepms() ) );

            $( _p._slider ).trigger( 'aftermove' );

        }

        , setPagePosition: function( _ix ){
            typeof _ix == 'undefined' && ( _ix = this._model.initIndex() );
            this._model.subitems().hide();
            var _page = this._model.page( _ix );

            for( var i = 0, j = _page.length; i < j; i++ ){
                $( _page[ i ] ).css( {
                    'top': i * ( this._model.itemheight() + 
                        this._itemspace ) + 'px' 
                } ).show();
            }
        }

    };

    _jdoc.ready( function(){
        $('.js_NSlider').each( function( _i, _item ){
            new NSlider( _item );
        });
    });

    return JC.NSlider;

});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
