;(function($){
    window.Slider = JC.Slider = Slider;
    /**
     * Slider 划动菜单类
     * <br />页面加载完毕后, Slider 会查找那些有 class = js_autoSlider 的标签进行自动初始化
     * <p><b>requires</b>: <a href='window.jQuery.html'>jQuery</a></p>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc.openjavascript.org/docs_api/classes/JC.Slider.html' target='_blank'>API docs</a>
     * | <a href='../../comps/Slider/_demo' target='_blank'>demo link</a></p>
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
            <script>
                JC.debug = true;
                JC.use( 'Slider' );

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
    function Slider( _layout ){
        _layout && ( _layout = $( _layout ) );
        if( Slider.getInstance( _layout ) ) return Slider.getInstance( _layout );
        Slider.getInstance( _layout, this );

        JC.log( 'Slider constructor', new Date().getTime() );

        /**
         * 初始化数据模型
         */
        this._model = new Model( _layout );
        /**
         * 初始化视图模型( 根据不同的滚动方向, 初始化不同的视图类 )
         */
        switch( this._model.direction() ){
            case 'vertical': this._view = new VerticalView( this._model, this ); break;
            default: this._view = new HorizontalView( this._model, this ); break;
        }

        this._init();
    }
    
    Slider.prototype = {
        /**
         * 内部初始化方法
         * @method  _init
         * @private
         * @return bool
         */
        _init:
            function(){
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

                _p._model.initedcb() && _p.on('inited', _p._model.initedcb() );
                _p.trigger( 'inited' );

                return this;
            }    
        /**
         * 自定义事件绑定函数
         * <br />使用 jquery on 方法绑定 为 Slider 实例绑定事件
         * @method on
         * @param   {string}    _evtName
         * @param   {function}  _cb
         * @return SliderInstance
         */
        , on: 
            function( _evtName, _cb ){
                $(this).on( _evtName, _cb );
                return this;
            }
        /**
         * 自定义事件触发函数
         * <br />使用 jquery trigger 方法绑定 为 Slider 实例函数自定义事件
         * @method  trigger
         * @param   {string}    _evtName
         * @return SliderInstance
         */
        , trigger: 
            function( _evtName ){
                $(this).trigger(_evtName);
                return this;
            }
        /**
         * 控制 Slider 向左或向右划动
         * @method  move
         * @param   {bool}    _backwrad     _backwrad = ture(向左), false(向右), 默认false
         * @return SliderInstance
         */
        , move: function( _backwrad ){ this._view.move( _backwrad ); return this; }
        /**
         * 控制 Slider 划动到指定索引
         * @method  moveTo
         * @param   {int}    _newpointer
         * @return SliderInstance
         */
        , moveTo: function( _newpointer ){ this._view.moveTo( _newpointer ); return this; }
        /**
         * 获取 Slider 的总索引数
         * @method  totalpage
         * @return int
         */
        , totalpage: function(){ return this._model.totalpage(); }
        /**
         * 获取 Slider 的当前索引数
         * @method  pointer
         * @return int
         */
        , pointer: function(){ return this._model.pointer(); }
        /**
         * 获取指定索引页的 selector 对象
         * @method  page
         * @param   {int}    _ix
         * @return array
         */
        , page: function( _ix ){ return this._model.page( _ix ); }
        /**
         * 获取 Slider 的主外观容器
         * @method  layout
         * @return selector
         */
        , layout: function(){ return this._model.layout(); }
        /**
         * 查找 layout 的内容
         * @method  find
         * @param   {selector}  _selector
         * @return selector
         */
        , find: function( _selector ){ return this._model.layout().find( _selector ) }
        , _initControl:
            function(){
                switch( this._model.direction() ){
                    case 'vertical': this._initVerticalControl(); break;
                    default: this._initHorizontalControl(); break;
                }
            }
        , _initHorizontalControl:
            function(){
                var _p = this;
                _p._model.leftbutton() 
                    && _p._model.leftbutton().on( 'click', function( _evt ){
                        _p.trigger('cleartimeout');
                        _p.trigger('movetoleft');
                        _p._view.move( 1 );
                    })
                    .on('mouseenter', function(){ _p.trigger('controlover'); } )
                    .on('mouseleave', function(){ _p.trigger('controlout'); } )
                ;

                _p._model.rightbutton() 
                    && _p._model.rightbutton().on( 'click', function( _evt ){
                        _p.trigger('cleartimeout');
                        _p.trigger('movetoright');
                        _p._view.move();
                    })
                    .on('mouseenter', function(){ _p.trigger('controlover'); } )
                    .on('mouseleave', function(){ _p.trigger('controlout'); } )
                ;
            }
        , _initVerticalControl:
            function(){
                var _p = this;
            }
        /**
         * 初始化自动滚动
         * <br />如果 layout 的 html属性 sliderautomove=ture, 则会执行本函数
         * @method  _initAutoMove
         * @private
         * @return SliderInstance
         */
        , _initAutoMove:
            function(){
                var _p = this;
                if( !_p._model.automove() ) return;

                _p.on('beforemove', function( _evt, _oldpointer, _newpointer ){
                    _p.trigger('cleartimeout');
                });

                _p.on('movedone', function( _evt, _oldpointer, _newpointer ){
                    if( _p._model.controlover() ) return;
                    _p.trigger('automove');
                });

                _p._model.layout().on( 'mouseenter', function( _evt ){
                    _p.trigger('cleartimeout');
                    _p.trigger('mouseenter');
                });

                _p._model.layout().on( 'mouseleave', function( _evt ){
                    _p.trigger('cleartimeout');
                    _p.trigger('mouseleave');
                    _p._view.setPagePosition();
                    _p.trigger('automove');
                });

                _p.on('controlover', function(){
                    _p.trigger('cleartimeout');
                    _p._model.controlover( true );
                });

                _p.on('controlout', function(){
                    _p.trigger('automove');
                    _p._model.controlover( false );
                });

                _p.on('movetoleft', function(){
                    _p._model.moveDirection( false );
                });

                _p.on('movetoright', function(){
                    _p._model.moveDirection( true );
                });

                $( _p ).on('automove', function(){
                    _p._model.timeout( setTimeout( function(){
                        _p._view.moveTo( _p._model.automoveNewPointer() );
                    }, _p._model.automovems() ));
                });

                _p.trigger('automove');
                return this;
            }
    }
    /**
     * @event inited
     */
    /**
     * @event beforemove
     */
    /**
     * @event movedone
     */
    /**
     * @event outmin
     */
    /**
     * @event outmax
     */
    /**
     * 页面加载完毕后, 是否自动初始化 带有 class=js_autoSlider 的应用
     * @property   autoInit
     * @type    bool
     * @default true
     * @static
     */
    Slider.autoInit = true;
    /**
     * 批量初始化 Slider
     * @method init
     * @param   {selector}  _selector
     * @return array
     * @static
     */
    Slider.init =
        function( _selector ){
            var _insls = [];
            _selector && ( _selector = $(_selector) );

            if( _selector && _selector.length ){
                if( Slider.isSlider( _selector ) ){
                    if( Slider.getInstance( _selector ) ){
                        return [ Slider.getInstance( _selector ) ];
                    }
                    _insls.push( new Slider( _selector ) );
                }else{
                    _selector.find( 'div.js_autoSlider, dl.js_autoSlider'
                                    +', ul.js_autoSlider, ol.js_autoSlider' ).each(function(){
                        if( Slider.isSlider( this ) ){
                            if( Slider.getInstance( $(this) ) ){
                                _insls.push( Slider.getInstance( $(this) ) );
                                return;
                            }
                            _insls.push( new Slider( $(this) ) );
                        }
                    });
                }
            }
            return _insls;
        };
    /**
     * 从 selector 获得 或 设置 Slider 的实例
     * @method getInstance
     * @param   {selector}  _selector
     * @param   {SliderInstance}   _ins
     * @return SliderInstance
     * @static
     */
    Slider.getInstance =
        function( _selector, _ins ){
            _ins && _selector && $(_selector).data( 'SliderIns', _ins );
            return _selector ? $(_selector).data('SliderIns') : null;
        };
    /**
     * 判断 selector 是否具备 实例化 Slider 的条件
     * @method  isSlider
     * @param   {selector}  _selector
     * @return bool
     * @static
     */
    Slider.isSlider =
        function( _selector ){
            _selector && ( _selector = $(_selector) );
            return _selector && ( _selector.is( '[sliderwidth]' ) || _selector.is( '[sliderheight]' ) );
        };

    /**
     * Slider 的通用模型类
     * @namespace JC.Slider
     * @class   Model
     * @constructor
     * @param   {selector}  _layout
     */
    function Model( _layout ){
        /**
         * 保存 layout 的引用 
         * @property    _layout
         * @type    selector
         * @private
         */
        this._layout = _layout;
        /**
         * 自动移动的方向
         * <br /> true = 向右|向下, false = 向左|向上
         * @property    _moveDirection
         * @type    bool
         * @default true
         * @private
         */
        this._moveDirection = true;
        /**
         * 滚动时的 interval 引用
         * @property    _interval
         * @type    interval
         * @private
         */
        this._interval;
        /**
         * 自动滚动时的 timeout 引用
         * @property    _timeout
         * @type    timeout
         * @private
         */
        this._timeout;
        
        this._init();
    }
    
    Model.prototype = {
        /**
         * 内部初始化方法
         * @method _init
         * @private
         * @return Slider.Model
         */
        _init:
            function(){
                this.subitems();
                this.totalpage();

                JC.log( printf('w:{0}, h:{1}, iw:{2}, ih:{3}, dr:{4}, si:{6}, hi:{5}, totalpage:{7}'
                            , this.width(), this.height()
                            , this.itemwidth(), this.itemheight()
                            , this.direction(), this.howmanyitem()
                            , this.subitems().length
                            , this.totalpage()
                ));

                return this;
            }
        /**
         * 获取 slider 外观的 selector
         * @method layout
         * @return selector
         */
        , layout: function(){ return this._layout; }
        /**
         * 获取 左移的 selector
         * @method leftbutton
         * @return selector
         */
        , leftbutton: function(){ return this._layout.is( '[sliderleft]' ) ? $( this._layout.attr('sliderleft') ) : null; }
        /**
         * 获取 右移的 selector
         * @method rightbutton
         * @return selector
         */
        , rightbutton: function(){ return this._layout.is( '[sliderright]' ) ? $( this._layout.attr('sliderright') ) : null; }
        /**
         * 获取移动方向
         * <br />horizontal, vertical
         * @method direction
         * @default horizontal
         * @return string
         */
        , direction: function(){ return this._layout.attr('sliderdirection').toLowerCase() || 'horizontal'; }
        /**
         * 获取/设置自动移动的方向
         * <br /> true = 向右|向下, false = 向左|向上
         * @method  moveDirection
         * @param   {string}    _setter
         * @return string
         */
        , moveDirection:
            function( _setter ){
                typeof _setter != 'undefined' && ( this._moveDirection = _setter );
                JC.log( 'moveDirection', this._moveDirection );
                return this._moveDirection;
            }
        /**
         * 获取每次移动多少项
         * @method howmanyitem
         * @return int
         */
        , howmanyitem: function(){ return parseInt( this._layout.attr('sliderhowmanyitem'), 10 ) || 1; }
        /**
         * 获取宽度
         * @method width
         * @default 800 
         * @return int
         */
        , width: function(){ return parseInt( this._layout.attr('sliderwidth'), 10 ) || 800; }
        /**
         * 获取高度
         * @method height
         * @default 230
         * @return int
         */
        , height: function(){ return parseInt( this._layout.attr('sliderheight'), 10 ) || 230; }
        /**
         * 获取项宽度
         * @method itemwidth
         * @default 160
         * @return int
         */
        , itemwidth: function(){ return parseInt( this._layout.attr('slideritemwidth'), 10 ) || 160; }
        /**
         * 获取项高度
         * @method itemheight
         * @default 230
         * @return int
         */
        , itemheight: function(){ return parseInt( this._layout.attr('slideritemheight'), 10 ) || 230; }
        /**
         * 每次移动的总时间, 单位毫秒
         * @method      loop
         * @default false
         * @return bool
         */
        , loop: function(){ return parseBool( this._layout.attr('sliderloop') ); }
        /**
         * 获取每次移动间隔的毫秒数
         * @method stepms
         * @default 10
         * @return int
         */
        , stepms: function(){ return parseInt( this._layout.attr('sliderstepms'), 10 ) || 10; }
        /**
         * 获取每次移动持续的毫秒数
         * @method durationms
         * @default 300
         * @return int
         */
        , durationms: function(){ return parseInt( this._layout.attr('sliderdurationms'), 10 ) || 300; }
        /**
         * 获取自动滚动的间隔
         * @method automovems
         * @default 2000
         * @return int
         */
        , automovems: function(){ return parseInt( this._layout.attr('sliderautomovems'), 10 ) || 2000; }
        /**
         * 获取是否自动滚动
         * @method automove
         * @default false
         * @return bool
         */
        , automove: function(){ return parseBool( this._layout.attr('sliderautomove') ); }
        /**
         * 获取默认显示的索引
         * @method  defaultpage
         * @return  int
         * @default 0
         */
        , defaultpage: function(){ return parseInt( this._layout.attr('sliderdefaultpage'), 10 ) || 0; }
        /**
         * 获取划动的所有项
         * @method  subitems
         * @return  selector
         */
        , subitems:
            function(){
                if( this._layout.is( '[slidersubitems]' ) ){
                    this._subitems = this._layout.find( this._layout.attr('slidersubitems') );
                }else{
                    this._subitems = this._layout.children();
                }
                return this._subitems;
            }
        /**
         * 获取分页总数
         * <br /> Math.ceil( subitems / howmanyitem )
         * @method  totalpage
         * @return  int
         */
        , totalpage:
            function(){
                this.subitems();
                if( this.howmanyitem() > 1 ){
                    this._totalpage = Math.ceil( this._subitems.length / this.howmanyitem() );
                }else{
                    this._totalpage = this._subitems.length;
                }
                return this._totalpage;
            }
        /**
         * 获取指定页的所有划动项
         * @method  page
         * @param   {int}   _index
         * @return array
         */
        , page:
            function( _index ){
                this.subitems();
                !_index && ( _index = 0 );
                _index < 0 && ( _index = 0 );
                _index >= this.totalpage() && ( _index = this.totalpage() - 1 );
                _index *= this.howmanyitem();
                var _r = [];
                for( var i = _index, count = 0; count < this.howmanyitem() && i < this._subitems.length; i++, count++ ){
                    _r.push( $(this._subitems[i]) );
                }
                return _r;
            }
        /**
         * 获取/设置当前索引位置
         * @method  pointer
         * @param   {int}   _setter
         * @return int
         */
        , pointer: 
            function( _setter ){ 
                if( typeof this._pointer == 'undefined' ) this._pointer = this.defaultpage();
                if( typeof _setter != 'undefined' ) this._pointer = this.fixpointer( _setter );
                return this._pointer;
            }
        /**
         * 获取新的划动位置
         * <br />根据划向的方向 和 是否循环 
         * @method  newpointer
         * @param   {bool}  _isbackward
         * @return int
         */
        , newpointer:
            function( _isbackward ){
                var _r = this.pointer();
                _isbackward && _r--;
                !_isbackward && _r++;

                _r = this.fixpointer( _r );
                return _r;
            }
        /**
         * 修正指针的索引位置, 防止范围溢出
         * @method  fixpointer
         * @param   {int}   _pointer
         * @return int
         */
        , fixpointer:
            function( _pointer ){
                var _r = _pointer;
                if( this.loop() ){
                    _r < 0 && ( _r = this.totalpage() - 1 );
                    _r >= this.totalpage() && ( _r = 0 );
                }else{
                    _r < 0 && ( _r = 0 );
                    _r >= this.totalpage() && ( _r = this.totalpage() - 1 );
                }
                return _r;
            }
        /**
         * 获取自动萌动的新索引
         * @method  automoveNewPointer
         * @return int
         */
        , automoveNewPointer:
            function(){
                var _r = this.pointer();
                if( this.moveDirection() ){
                    _r++;
                }else{
                    _r--;
                }

                if( this.loop() ){
                    if( _r >= this.totalpage() ){
                        _r = 0;
                    }else if( _r < 0 ){
                        _r = this.totalpage() - 1;
                    }
                }else{
                    if( _r >= this.totalpage() ){
                        _r = this.totalpage() - 2;
                        this.moveDirection( false );
                    }else if( _r < 0 ){
                        _r = 1
                        this.moveDirection( true );
                    }
                }
                return _r;
            }
        /**
         * 获取/设置 划动的 interval 对象
         * @method  interval
         * @param   {interval}  _setter
         * @return  interval
         */
        , interval:
            function( _setter ){
                typeof _setter != 'undefined' && ( this._interval = _setter );
                return this._interval;
            }
        /**
         * 清除划动的 interval
         * @method clearInterval
         */
        , 'clearInterval':
            function(){
                this.interval() && clearInterval( this.interval() );
            }
        /**
         * 获取/设置 自动划动的 timeout
         * @method  timeout
         * @param   {timeout}   _setter
         * @return  timeout
         */
        , timeout:
            function( _setter ){
                typeof _setter != 'undefined' && ( this._timeout = _setter );
                return this._timeout;
            }
        /**
         * 清除自动划动的 timeout
         * @method clearTimeout
         */
        , 'clearTimeout':
            function(){
                this.timeout() && clearTimeout( this.timeout() );
            }
        /**
         * 获取/设置当前鼠标是否位于 slider 及其控件上面
         * @method  controlover
         * @param   {bool}  _setter
         * @return  bool
         */
        , controlover:
            function( _setter ){
                typeof _setter != 'undefined' && ( this._controlover = _setter );
                return this._controlover;
            }
        /**
         * 获取初始化后的回调函数
         * @method initedcb
         * @return function|undefined
         */
        , initedcb: 
            function(){ 
                this._layout.is('[sliderinitedcb]') 
                    && window[ this._layout.attr('sliderinitedcb') ]
                    && ( this._initedcb = window[ this._layout.attr('sliderinitedcb') ] );
                return this._initedcb; 
            }

    };
    
    function HorizontalView( _model, _slider ){
        this._model = _model;
        this._slider = _slider;

        this._itemspace = 
                        ( 
                            this._model.width() - 
                            Math.floor( this._model.width() / this._model.itemwidth() ) * this._model.itemwidth()
                        )
                        / ( this._model.totalpage() - 1 );
        this._itemspace = parseInt( this._itemspace );

        this._init();
    }

    HorizontalView.prototype = {
        _init:
            function() {
                this.setPagePosition( this._model.pointer() );

                return this;
            }

        , move:
            function( _backwrad ){
                var _p = this;
                _backwrad = !!_backwrad;
                JC.log( 'HorizontalView move, is backwrad', _backwrad, this._model.pointer() );

                var _newpointer = this._model.newpointer( _backwrad );
                JC.log( printf( 'is backwrad: {0}, pointer:{1}, new pointer:{2}'
                            , _backwrad, this._model.pointer(), _newpointer
                            ));

                this.moveTo( _newpointer );
            }

        , moveTo:
            function( _newpointer ){
                var _p = this;

                if( !this._model.loop() ){
                    if( _newpointer <= this._model.pointer() && this._model.pointer() === 0 ){
                        $(this._slider).trigger( 'outmin' );
                        return;
                    }
                    if( _newpointer >= this._model.pointer() && this._model.pointer() >= this._model.totalpage() - 1 ){
                        $(this._slider).trigger( 'outmax' );
                        return;
                    }
                }

                _newpointer = this._model.fixpointer( _newpointer );
                var _oldpointer = this._model.pointer();
                if( _newpointer === _oldpointer ) return;


                var _opage = this._model.page( _oldpointer )
                    , _npage = this._model.page( _newpointer );
                ;
                var _concat = _opage.concat( _npage );

                this._setNewPagePosition( _opage, _npage, _oldpointer, _newpointer );
                _p._model.pointer( _newpointer );
            }

        , _setNewPagePosition:
            function( _opage, _npage, _oldpointer, _newpointer ){
                var _p = this, _begin, _concat = _opage.concat( _npage ), _isPlus;

                $( this._slider ).trigger( 'cleartinterval' );

                if( _oldpointer < _newpointer ){
                    _begin = this._model.width() + this._itemspace;
                }else{
                    _begin = -( this._model.width() + this._itemspace );
                    _isPlus = true;
                }

                _oldpointer === (_p._model.totalpage() - 1 ) 
                    && _newpointer === 0 
                    && ( _begin = this._model.width() + this._itemspace, _isPlus = false );

                _oldpointer === 0 
                    && _newpointer === (_p._model.totalpage() - 1 ) 
                    && ( _begin = -( this._model.width() + this._itemspace ), _isPlus = true );

                $.each( _npage, function( _ix, _item ){
                    var _sp = $(_item);
                        _sp.css( { 'left': _begin + _p._model.itemwidth() * _ix + _p._itemspace * _ix + 'px' } );
                        _sp.show();
                });
                $( _p._slider ).trigger( 'beforemove', [_oldpointer, _newpointer] );

                $.each( _concat, function(_ix, _item){
                    _item.data('TMP_LEFT', _item.prop('offsetLeft') );
                });

                JC.log( 'zzzzzzzzzz', _begin, this._itemspace, this._model.moveDirection() );
                _p._model.interval( easyEffect( function( _step, _done ){
                    //JC.log( _step );
                    $( _concat ).each(function( _ix, _item ){
                        _item.css( {'left': _item.data('TMP_LEFT') +  (_isPlus? _step : -_step ) + 'px' } );
                    });

                    if( _done ){
                        $( _opage ).each( function( _ix, _item ){ _item.hide(); } );
                        $( _p._slider ).trigger( 'movedone', [_oldpointer, _newpointer] );
                        _p._model.pointer( _newpointer );
                        _p.setPagePosition();
                    }

                   }, this._model.width(), 0, this._model.durationms(), this._model.stepms() )
               );
            }

        , setPagePosition:
            function( _ix ){
                JC.log( 'view setPagePosition', new Date().getTime() );
                typeof _ix == 'undefined' && ( _ix = this._model.pointer() );
                this._model.subitems().hide();
                var _page = this._model.page( _ix );
                for( var i = 0, j = _page.length; i < j; i++ ){
                    _page[i]
                        .css( { 'left': i * this._model.itemwidth() + i * this._itemspace  + 'px' } )
                        .show()
                        ;
                }
                JC.log( _page.length );
            }
    };

    function VerticalView( _model, _slider ){
        this._model = _model;
        this._slider = _slider;
        this._itemspace = 0;
        this._init();
    }

    VerticalView.prototype = {
        _init:
            function() {
                this.setPagePosition( this._model.pointer() );
                return this;
            }

        , move:
            function( _backwrad ){
                var _p = this;
                return this;
            }

        , moveTo:
            function( _newpointer ){
                var _p = this;
                return this;
            }

        , _setNewPagePosition:
            function( _opage, _npage, _oldpointer, _newpointer ){
                var _p = this, _begin, _concat = _opage.concat( _npage ), _isPlus;
                return this;
              }

        , setPagePosition:
            function( _ix ){
                var _p = this;
                JC.log( 'view setPagePosition', new Date().getTime() );
                return this;
            }

    };
    /** 
     * 页面加载后, 自动初始化符合 Slider 规则的 Slider
     */
    $(document).ready(function(){
        if( !Slider.autoInit ) return;
        Slider.init( document.body );
    });

}(jQuery));
