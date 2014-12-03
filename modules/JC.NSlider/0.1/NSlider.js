;(function(define, _win) { 'use strict'; define( [ 'JC.common', 'JC.BaseMVC' ], function(){
    /**
     * Slider 划动菜单类
     * <br />页面加载完毕后, Slider 会查找那些有 class = js_autoSlider 的标签进行自动初始化
     * <p><b>require</b>: 
     *      <a href='window.jQuery.html'>jQuery</a>
     *      , <a href='JC.common.html'>JC.common</a>
     * </p>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.Slider.html' target='_blank'>API docs</a>
     * | <a href='../../modules/JC.Slider/0.1/_demo' target='_blank'>demo link</a></p>
     * <h2> 可用的 html attribute </h2>
     * <dl>
     *      <dt>slidersubitems</dt>
     *      <dd>指定具体子元素是那些, selector ( 子元素默认是 layout的子标签 )</dd>
     *
     *      <dt>sliderleft</dt>
     *      <dd>左移的触发selector</dd>
     *
     *      <dt>sliderright</dt>
     *      <dd>右移的触发selector</dd>
     *
     *      <dt>sliderwidth</dt>
     *      <dd>主容器宽度</dd>
     *
     *      <dt>slideritemwidth</dt>
     *      <dd>子元素的宽度</dd>
     *
     *      <dt>sliderhowmanyitem</dt>
     *      <dd>每次滚动多少个子元素, 默认1</dd>
     *
     *      <dt>sliderdefaultpage</dt>
     *      <dd>默认显示第几页</dd>
     *
     *      <dt>sliderstepms</dt>
     *      <dd>滚动效果运动的间隔时间(毫秒), 默认 5</dd>
     *
     *      <dt>sliderdurationms</dt>
     *      <dd>滚动效果的总时间</dd>
     *
     *      <dt>sliderdirection</dt>
     *      <dd>滚动的方向, 默认 horizontal, { horizontal, vertical }</dd>
     *
     *      <dt>sliderloop</dt>
     *      <dd>是否循环滚动</dd>
     *
     *      <dt>sliderinitedcb</dt>
     *      <dd>初始完毕后的回调函数, 便于进行更详细的声明</dd>
     *
     *      <dt>sliderautomove</dt>
     *      <dd>是否自动滚动</dd>
     *
     *      <dt>sliderautomovems</dt>
     *      <dd>自动滚动的间隔</dd>
     * </dl>
     * @namespace JC
     * @class Slider
     * @constructor
     * @param   {selector|string}   _selector   
     * @version dev 0.1
     * @author  qiushaowei   <suches@btbtd.org> | 75 Team
     * @date    2013-07-20
     * @example
            <style>
                .hslide_list dd{ display: none; }

                .hslide_list dd, .hslide_list dd img{
                    width: 160px;
                    height: 230px;
                }

                .slider_one_item dd, .slider_one_item dd img{
                    width: 820px;
                    height: 230px;
                }
            </style>
            <link href='../../Slider/res/hslider/style.css' rel='stylesheet' />
            <script src="../../../lib.js"></script>
            <script src="../../../config.js"></script>
            <script>
                JC.debug = true;
                requirejs( [ 'JC.Slider' ] );

                function sliderinitedcb(){
                    var _sliderIns = this;

                    JC.log( 'sliderinitedcb', new Date().getTime() );

                    _sliderIns.on('outmin', function(){
                        JC.log( 'slider outmin' );
                    }).on('outmax', function(){
                        JC.log( 'slider outmax' );
                    }).on('movedone', function( _evt, _oldpointer, _newpointer){
                        JC.log( 'slider movedone', _evt, _oldpointer, _newpointer );
                    }).on('beforemove', function( _evt, _oldpointer, _newpointer ){
                        JC.log( 'slider beforemove', _evt, _oldpointer, _newpointer );
                    });
                }
            </script>
            <table class="hslide_wra">
                <tr>
                    <td class="hslide_left">
                        <a href="javascript:" hidefocus="true" style="outline:none;" class="js_slideleft">左边滚动</a>
                    </td>
                    <td class="hslide_mid">
                        <dl 
                            style="width:820px; height: 230px; margin:0 5px;"
                            class="hslide_list clearfix js_slideList js_autoSlider" 
                            slidersubitems="> dd" sliderleft="a.js_slideleft" sliderright="a.js_slideright" 
                            sliderwidth="820" slideritemwidth="160"
                            sliderdirection="horizontal" sliderhowmanyitem="5"
                            sliderloop="false" sliderdurationms="300"
                            sliderinitedcb="sliderinitedcb"
                            >
                            <dd style="display: block; left: 0; " class="tipsItem">content...</dd>
                            <dd style="display: block; left: 0; " class="tipsItem">content...</dd>
                            <dd style="display: block; left: 0; " class="tipsItem">content...</dd>
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
                && _p._model.prevbutton().on( 'click', function( _evt ){

                    if( _model._movelock ){ return; }
                    _model.lockmove();

                    _p.trigger('cleartimeout');
                    _p.trigger('movetoprev');
                    _p._view.move( 1 );
                    
                })
                .on('mouseenter', function(){ _p.trigger('controlover'); } )
                .on('mouseleave', function(){ _p.trigger('controlout'); } )
            ;

            _model.nextbutton() 
                && _p._model.nextbutton().on( 'click', function( _evt ){
                    
                    if( _model._movelock ){ return; }
                    _model.lockmove();

                    _p.trigger('cleartimeout');
                    _p.trigger('movetotnext');
                    _p._view.move();
                })
                .on('mouseenter', function(){ _p.trigger('controlover'); } )
                .on('mouseleave', function(){ _p.trigger('controlout'); } )
            ;
        }

        , _initVerticalControl: function(){

            var _p = this;
            var _model = _p._model;

            _model.prevbutton() 
                && _p._model.prevbutton().on( 'click', function( _evt ){

                    if( _model._movelock ){ return; }
                    _model.lockmove();

                    _p.trigger('cleartimeout');
                    _p.trigger('movetoprev');
                    _p._view.move( 1 );
                })
                .on('mouseenter', function(){ _p.trigger('controlover'); } )
                .on('mouseleave', function(){ _p.trigger('controlout'); } )
            ;

            _model.nextbutton() 
                && _p._model.nextbutton().on( 'click', function( _evt ){
                    
                    if( _model._movelock ){ return; }
                    _model.lockmove();

                    _p.trigger('cleartimeout');
                    _p.trigger('movetotnext');
                    _p._view.move();
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

                _p._view.moveTo( _model.itemRemote( 
                    _model._nowIndex
                    , _index
                ) );

                _model.changeIndex( _index );
                
            } );
        }

        /**
         * 初始化自动滚动
         * <br />如果 layout 的 html属性 sliderautomove=ture, 则会执行本函数
         * @method  _initAutoMove
         * @private
         * @return SliderInstance
         */
        , _initAutoMove: function(){
            var _p = this;
            var _model = _p._model;

            if( !_p._model.automove() ) return;

            _p.on('beforemove', function( _evt ){
                _p.trigger('cleartimeout');
            });

            _p.on('movedone', function( _evt, _oldpointer, _newpointer ){
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

            _p.on('movetotnext', function(){
                _model.moveDirection( true );
            });

            $( _p ).on('automove', function(){
                var _howmany = _model.howmanyitem();

                _p._model.timeout( setTimeout( function(){
                    _p._view.moveTo( _model.page( _model._nowIndex, _howmany ) );
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

    JC.f.extendObject( _Model.prototype, {
        init: function() { 
            this._nowIndex = 0;
            this._moveDirection = true;
        }
        , layout: function() {
            return NSlider.selector;
        }

        /**
         * 获取 左移的 selector
         * @method prevbutton
         * @return selector
         */
        , prevbutton: function(){ return this.selectorProp( 'sliderprev' ); }
        /**
         * 获取 右移的 selector
         * @method nextbutton
         * @return selector
         */
        , nextbutton: function(){ return this.selectorProp( 'slidernext' ); }
        /**
         * 获取移动方向
         * <br />horizontal, vertical
         * @method direction
         * @default horizontal
         * @return string
         */
        , direction: function(){ return this.attrProp( 'sliderdirection' ) || 'horizontal'; }
        /**
         * 获取/设置自动移动的方向
         * <br /> true = 向右|向下, false = 向左|向上
         * @method  moveDirection
         * @param   {string}    _setter
         * @return string
         */
        , moveDirection: function( _setter ){
            typeof _setter != 'undefined' && ( this._moveDirection = _setter );
            return this._moveDirection;
        }
        /**
         * 获取每次移动多少项
         * @method howmanyitem
         * @return int
         */
        , howmanyitem: function(){ return this.intProp('sliderhowmanyitem') || 1; }
        /**
         * 获取每次移动多少项
         * @method howmanyitem
         * @return int
         */
        , viewItemNum: function(){ 
            return Math.floor( 
                this.direction() == 'horizontal' ? ( this.width() / this.itemwidth() ) 
                    : ( this.height() / this.itemheight() ) 
            ); 
        }
        /**
         * 获取宽度
         * @method width
         * @default 800 
         * @return int
         */
        , width: function(){ return this.intProp('sliderwidth') || 800; }
        /**
         * 获取高度
         * @method height
         * @default 230
         * @return int
         */
        , height: function(){ return this.intProp('sliderheight') || 230; }
        /**
         * 获取项宽度
         * @method itemwidth
         * @default 160
         * @return int
         */
        , itemwidth: function(){ return this.intProp('slideritemwidth') || 160; }
        /**
         * 获取项高度
         * @method itemheight
         * @default 230
         * @return int
         */
        , itemheight: function(){ return this.intProp('slideritemheight') || 230; }
        /**
         * 每次移动的总时间, 单位毫秒
         * @method      loop
         * @default false
         * @return bool
         */
        , loop: function(){ return this.boolProp('sliderloop'); }
        /**
         * 获取每次移动间隔的毫秒数
         * @method stepms
         * @default 10
         * @return int
         */
        , stepms: function(){ return this.intProp('sliderstepms') || 10; }
        /**
         * 获取每次移动持续的毫秒数
         * @method durationms
         * @default 300
         * @return int
         */
        , durationms: function(){ return this.intProp('sliderdurationms') || 300; }
        /**
         * 获取自动滚动的间隔
         * @method automovems
         * @default 2000
         * @return int
         */
        , automovems: function(){ return this.intProp('sliderautomovems') || 2000; }
        /**
         * 获取是否自动滚动
         * @method automove
         * @default false
         * @return bool
         */
        , automove: function(){ return this.boolProp('sliderautomove'); }

        , defaultindex: function(){ return this.intProp('sliderdefaultindex') || 0; }
        /**
         * 获取滑动导航的配置
         * @method  slidernav
         * @return  int
         * @default 0
         */
         , slidernav: function(){ return this.attrProp('slidernav'); }
        /**
         * 获取滑动导航的配置
         * @method  slidernavtype
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
         * @method  pointer
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
         * @method  page
         * @param   {int}   _index
         * @return array
         */
        , page: function( _index, _num, _dir ) {

            typeof _num == 'undefined' && ( _num = 0 );

            if( typeof _dir == 'undefined' ){
                _dir = this.moveDirection();
            } else {
                this.moveDirection( _dir );
            }

            var _remoteNum;
            var _remoteItemList = [];
            var _subitems = this.subitems();
            var _viewItemNum = this.viewItemNum();

            _remoteNum = _viewItemNum + _num;
            if( !_dir ) {
                _index -= _num;
                if( _index < 0 ) {
                    _index += _subitems.length;
                }
            }

            for( var _j = 0; _j < _remoteNum; _j++, _index++ ) {
                if( _index == _subitems.length ) {
                    _index = 0;
                }
                _remoteItemList.push( _subitems[ _index ] );
            }

            return _remoteItemList;
        }

        , itemRemote: function( _nowIndex, _targetIdx ){

            if( _targetIdx == _nowIndex ){
                return [];
            }

            var rIndex = _targetIdx - _nowIndex;

            return this.page( _nowIndex, Math.abs( rIndex ) , rIndex >= 0 );
        }

        , getNowIndex: function(  ){
            return this._nowIndex;
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
         * @method  interval
         * @param   {interval}  _setter
         * @return  interval
         */
        , interval: function( _setter ){
            typeof _setter != 'undefined' && ( this._interval = _setter );
            return this._interval;
        }
        /**
         * 清除划动的 interval
         * @method clearInterval
         */
        , 'clearInterval': function(){
            this.interval() && clearInterval( this.interval() );
        }
        /**
         * 获取/设置 自动划动的 timeout
         * @method  timeout
         * @param   {timeout}   _setter
         * @return  timeout
         */
        , timeout: function( _setter ){
            typeof _setter != 'undefined' && ( this._timeout = _setter );
            return this._timeout;
        }
        /**
         * 清除自动划动的 timeout
         * @method clearTimeout
         */
        , 'clearTimeout': function(){
            this.timeout() && clearTimeout( this.timeout() );
        }
        /**
         * 获取/设置当前鼠标是否位于 slider 及其控件上面
         * @method  controlover
         * @param   {bool}  _setter
         * @return  bool
         */
        , controlover: function( _setter ){
            typeof _setter != 'undefined' && ( this._controlover = _setter );
            return this._controlover;
        }

        , lockmove: function(){
            this._movelock = true;
        }

        , unlockmove: function(){
            this._movelock = false;
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
            var _navEl = $( '<div class="hslide_nav"></div>' );
            var _tmpItem = '';
            var _navType = _model.slidernavtype();
            var _viewItemNum = _model.viewItemNum();
            var _navNum = _model.subitems().length;

            _navNum = ( _nav == 'group' ) ? 
                ( _navNum / _viewItemNum ) : _navNum;

            for( var _i = 0; _i < _navNum; _i++ ){
                _tmpItem += '<a href="#" class="slide_navbtn';

                _tmpItem += ( _i == 0 ) ? ' slide_on' : '';

                _tmpItem += ( _navType == 'num' ) ? 
                    ' hslide_navnum' : ' hslide_navicon';

                _tmpItem += '" data-index="' + 
                    ( ( _nav == 'group' ) ? ( _i * _viewItemNum ) : _i ) +
                    '" >'+ ( _i + 1 ) +'</a>';
            }

            _navEl.append( _tmpItem );
            _model._selector.append( _navEl );
        }

        , move: function( _backwrad ){
            var _p = this;
            var _model = this._model;

            _backwrad = !!_backwrad;

            var _nowIndex = _model._nowIndex;
            var _howmany = _model.howmanyitem();
            this.moveTo( _model.page( _nowIndex, _howmany ) );
            _model.changeIndex();
        }

        , moveTo: function( _remoteList ){

            if( !_remoteList || _remoteList.length == 0 ){
                return;
            }

            var _p = this;
            var _model = this._model;

            var _howmany = _model.howmanyitem();
            var _dir = _model.moveDirection();
            var _slidWidth = _howmany * ( _model.itemwidth() + _p._itemspace );
            var _tmpItem;
            var _tmpNum = 0;
            var _begin;
            var _oldItems = [];

            if( _dir ) {/* 向左滑动 */
                _begin = this._model.width();
                $.each( _remoteList, function( _ix, _item ) {
                    _tmpItem = $( _item );
                    if( _remoteList.length - _ix <= _howmany ) {
                        _tmpItem.css( { 'left': _begin + _tmpNum * ( _p._model.itemwidth() 
                            + _p._itemspace ) + 'px' } ).show();
                        _tmpNum++;
                    }
                    if( _ix < _howmany ){
                        _oldItems.push( _tmpItem );
                    }
                    _tmpItem.data( 'TMP_LEFT', $( _item ).prop('offsetLeft') );
                });
            } else {/* 向右滑动 */
                _begin = - (_p._model.itemwidth() + _p._itemspace);
                var _len = _remoteList.length;
                var _item;
                for( var _i = _len - 1; _i >= 0; _i-- ){
                    
                    _tmpItem = $( _remoteList[ _i ] );

                    if( _i < _howmany ) {
                        _tmpItem.css( { 'left': _begin - _tmpNum * ( _p._model.itemwidth() 
                            + _p._itemspace ) + 'px' } ).show();
                        _tmpNum++;
                    }

                    if( _remoteList.length - _i <= _howmany ){
                        _oldItems.push( _tmpItem );
                    }
                    _tmpItem.data('TMP_LEFT', _tmpItem.prop('offsetLeft') );
                }
            }

            $( _p._slider ).trigger( 'beforemove' );

            _p._model.interval( JC.f.easyEffect( function( _step, _done ){
                $( _remoteList ).each(function( _ix, _item ){
                    $( _item ).css( { 'left': $( _item ).data( 'TMP_LEFT' ) +
                        ( _dir ? -_step : _step ) + 'px' } );
                });

                if( _done ) {
                    $.each( _oldItems, function( _i, _item ){ 
                        $( _item ).hide(); 
                    } );
                    _model.unlockmove();
                }
            }, _slidWidth, 0, this._model.durationms(), this._model.stepms() ) );

            $( _p._slider ).trigger( 'movedone' );

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
            if( !_nav ){
                return;
            }

            var _model = this._model;
            var _nav = $( '<div class="vslide_nav"></div>' );
            var _tmpItem = '';
            var _navType = _model.slidernavtype();

            $.each( _model.subitems(), function( _i, _item ) {
                _tmpItem += '<a href="#" class="slide_navbtn';

                _tmpItem += ( _i == 0 ) ? ' slide_on' : '';

                _tmpItem += ( _navType == 'num' ) ? 
                    ' vslide_navnum' : ' vslide_navicon';

                _tmpItem += '" data-index="' + _i + '" >'+ ( _i + 1 ) +'</a>';
            } );

            _nav.append( _tmpItem );
            _model._selector.append( _nav );
        }

        , move: function( _backwrad ){
            var _p = this;
            var _model = this._model;

            _backwrad = !!_backwrad;

            var _nowIndex = _model._nowIndex;
            var _howmany = _model.howmanyitem();
            this.moveTo( _model.page( _nowIndex, _howmany ) );
            _model.changeIndex();
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

            $( _p._slider ).trigger( 'movedone' );

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
