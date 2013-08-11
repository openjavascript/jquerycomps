;(function($){
    !window.JC && (window.JC = { log:function(){} });
    window.ZINDEX_COUNT = window.ZINDEX_COUNT || 50001;

    window.Tips = JC.Tips = Tips;
    /**
     * Tips 提示信息类
     * <br />显示标签的 title/tipsData 属性 为 Tips 样式
     * <p>导入该类后, 页面加载完毕后, 会自己初始化所有带 title/tipsData 属性的标签为 Tips效果的标签
     * <br />如果要禁用自动初始化, 请把静态属性  Tips.autoInit 置为 false</p>
     * <p><b>注意:</b> Tips 默认构造函数只处理单一标签
     * <br />, 如果需要处理多个标签, 请使用静态方法 Tips.init( _selector )</p>
     * <p><b>requires</b>: <a href='window.jQuery.html'>jQuery</a></p>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc.openjavascript.org/docs_api/classes/JC.Tips.html' target='_blank'>API docs</a>
     * | <a href='../../comps/Tips/_demo' target='_blank'>demo link</a></p>
     * <h2>可用的 html attribute</h2>
     * <dl>
     *      <dt>tipsinitedcallback: function</dt>
     *      <dd>初始完毕时的回调</dd>
     *
     *      <dt>tipsshowcallback: function</dt>
     *      <dd>显示后的回调</dd>
     *
     *      <dt>tipshidecallback: function</dt>
     *      <dd>隐藏后的回调</dd>
     *
     *      <dt>tipstemplatebox: selector</dt>
     *      <dd>指定tips的显示模板</dd>
     * </dl>
     * @namespace JC
     * @class Tips
     * @constructor
     * @param   {selector|string}   _selector   要显示 Tips 效果的标签, 这是单一标签, 需要显示多个请显示 Tips.init 方法
     * @version dev 0.1
     * @author  qiushaowei   <suches@btbtd.org> | 75 team
     * @date    2013-06-23
     * @example
            <script src="../../../lib.js"></script>
            <script>
                JC.use( 'Tips' );
                $(document).ready( function(_evt){
                    //默认是自动初始化, 也就是只要导入 JC.Tips 就会自己初始化 带 title/tipsData 属性的标签
                    //下面示例是手动初始化
                    JC.Tips.autoInit = false;
                    JC.Tips.init( $( 'a[title]' ) ); 
                });
            </script>
     */
    function Tips( _selector ){
        _selector = $(_selector);
        if( !(_selector && _selector.length ) ) return this;
        if( _selector.length > 1 ){
            return Tips.init( _selector );
        }
        if( Tips.getInstance( _selector ) ) return Tips.getInstance( _selector );
        Tips.getInstance( _selector, this );
        /**
         * 数据模型类实例引用 
         * @property    _model
         * @type        JC.Tips.Model 
         * @private
         */
        this._model = new Model( _selector );
        /**
         * 视图类实例引用 
         * @property    _view
         * @type        JC.Tips.View
         * @private
         */
        this._view = new View( this._model );

        this._init();
    }

    Tips.prototype = {
        /**
         * 初始化 Tips 内部属性
         * @method  _init
         * @private
         */
        _init:
            function(){
                var _p = this;

                $(this._view).on('BindEvent', function( _evt, _evtName, _cb ){
                    _p.on( _evtName, _cb );
                });

                $(this._view).on('TriggerEvent', function( _evt, _evtName, _data ){
                    _p.trigger( _evtName, _data );
                });

                this._view.init();

                this._model.selector().on( 'mouseenter', tipMouseenter );
                return this;
            }    
        /**
         * 显示 Tips
         * @method  show
         * @param   {event|object}  _evt    _evt 可以是事件/或者带 pageX && pageY 属性的 Object
         *                                  <br />pageX 和 pageY 是显示位于整个文档的绝对 x/y 轴位置
         * @return  TipsInstance
         */
        , show:
            function( _evt ){
                this._view.show( _evt );
                return this;
            }
        /**
         * 隐藏 Tips
         * @method  hide
         * @return  TipsInstance
         */
        , hide: function(){ this._view.hide(); return this; }
        /**
         * 获取 显示 tips 的触发源选择器, 比如 a 标签
         * @method  selector
         * @return  selector
         */ 
        , selector: function(){ return this._model.selector(); }
        /**
         * 获取 tips 外观的 选择器
         * @method  layout
         * @param   {bool}  _update     是否更新 Tips 数据
         * @return  selector
         */
        , layout: function( _update ){ return this._view.layout( _update ); }
        /**
         * 获取 tips 显示的内容
         * @method  data
         * @return  string
         */
        , data: function(){ return this._model.data() }
        /**
         * 使用 jquery on 绑定事件
         * @method  {string}    on
         * @param   {string}    _evtName
         * @param   {function}  _cb
         * @return  TipsInstance
         */
        , on: function( _evtName, _cb ){ $(this).on(_evtName, _cb ); return this;}
        /**
         * 使用 jquery trigger 绑定事件
         * @method  {string}    trigger
         * @param   {string}    _evtName
         * @return  TipsInstance
         */
        , trigger: function( _evtName, _data ){ $(this).trigger( _evtName, _data ); return this;}
    };
    /**
     * tips 初始化实例后的触发的事件
     * <br />在HTML属性定义回调 tipsinitedcallback ="function name"
     * @event   TipsInited
     */
    /**
     * tips 显示后的回调
     * <br />在HTML属性定义回调 tipsshowcallback="function name"
     * @event   TipsShow
     */
    /**
     * tips 显示前的回调
     * <br />在HTML属性定义回调 tipsbeforeshowcallback="function name"
     * @event   TipsBeforeShow
     */
    /**
     * tips 隐藏后的回调
     * <br />在HTML属性定义回调 tipshidecallback="function name"
     * @event   TipsHide
     */
    /**
     * 批量初始化 Tips 效果
     * @method  init
     * @param   {selector}  _selector   选择器列表对象, 如果带 title/tipsData 属性则会初始化 Tips 效果
     * @static
     * @example
            <script src="../../../lib.js"></script>
            <script>
                JC.use( 'Tips' );
                $(document).ready( function(_evt){
                    JC.Tips.autoInit = false;
                    JC.Tips.init( $( 'a' ) ); 
                });
            </script>
     */
    Tips.init = 
        function( _selector ){
            if( !_selector ) return;
            _selector = $(_selector);
            if( !_selector.length ) return;
            var _r = [];
            _selector.each( function(){
                var _p = $(this);
                if( Tips.getInstance( _p ) ) return;
                _r.push( new Tips( _p ) );
            });
            return _r;
        };
    /**
     * 隐藏 Tips 
     * @method  hide
     * @static
     */
    Tips.hide =
        function(){
            $('body > div.UTips').hide();
        }
    /**
     * 页面加载完毕后, 是否自动初始化
     * @property    autoInit
     * @type        bool
     * @default     true
     * @static
     */
    Tips.autoInit = true;
    /**
     * 用户自定义模板
     * <br /> 如果用户显式覆盖此属性, Tips 会使用用户定义的模板
     * @property    tpl
     * @type        string
     * @default     null
     * @static
     */
    Tips.tpl = null;
    /**
     * 设置 Tips 超过边界的默认偏移像素
     * <p>
     * bottom: 边界超过屏幕底部的偏移
     * <br />left: 边界低于屏幕左侧的偏移
     * <br />top: 边界低于屏幕顶部的偏移
     * </p>
     * @property    offset  
     * @type        {point object}
     * @default     { 'bottom': { 'x': 15, 'y': 15 }, 'left': { 'x': -28, 'y': 5 }, 'top': { 'x': -2, 'y': -22 } };
     * @static
     */
    Tips.offset = {
        'bottom': { 'x': 15, 'y': 15 }
        , 'left': { 'x': -28, 'y': 5 }
        , 'top': { 'x': -2, 'y': -22 }
    };
    /**
     * Tips 的最小宽度
     * @property    minWidth
     * @type        int 
     * @default     200
     * @static
     */
    Tips.minWidth = 200;
    /**
     * Tips 的最大宽度
     * @property    maxWidth
     * @type        int 
     * @default     400
     * @static
     */
    Tips.maxWidth = 400;
    /**
     * 把 tag 的 title 属性 转为 tipsData 
     * <p><b>注意:</b> 这个方法只有当 Tips.autoInit 为假时, 或者浏览器会 IE时才会生效
     * <br />Tips.autoInit 为真时, 非IE浏览器无需转换
     * <br />如果为IE浏览器, 无论 Tips.autoInit 为真假, 都会进行转换
     * <br />方法内部已经做了判断, 可以直接调用, 对IE会生效
     * , 这个方法的存在是因为 IE 的 title为延时显示, 所以tips显示后, 默认title会盖在tips上面
     * </p>
     * @method titleToTipsdata
     * @param   {selector}  _selector   要转title 为 tipsData的选择器列表
     */
    Tips.titleToTipsdata =
        function( _selector ){
            _selector = $(_selector);
            if( !JC.Tips.autoInit || ( typeof window.event == 'object' && document.attachEvent ) ){
                _selector.each( function(){
                    $(this).attr( 'tipsData', $(this).attr('title') ).removeAttr( 'title' );
                });
            }
        };
    /**
     * 从 selector 获得 或 设置 Tips 的实例
     * @method getInstance
     * @param   {selector}  _selector
     * @param   {TipsInstance}   _ins
     * @return TipsInstance
     * @static
     */
    Tips.getInstance =
        function( _selector, _ins ){
            _ins && _selector && $(_selector).data( 'TipsIns', _ins );
            return _selector ? $(_selector).data('TipsIns') : null;
        };

    /**
     * Tips 数据模型类
     * @namespace JC.Tips
     * @class   Model
     * @constructor
     * @param   {selector}  _selector
     */
    function Model( _selector ){
        /**
         * tips 默认模板
         * @property    tpl
         * @type        string
         * @default     <div class="UTips"></div>
         */ 
        this.tpl = _defTpl;
        /**
         * 保存 tips 的触发源选择器
         * @property    _selector
         * @type        selector
         * @private
         */
        this._selector = _selector;
        /**
         * tips 的显示内容
         * <br />标签的 title/tipsData 会保存在这个属性, 然后 title/tipsData 会被清除掉
         * @property    _data
         * @type        string
         * @private
         */
        this._data;
        this._init();
    }
    
    Model.prototype = {
        /**
         * 初始化 tips 模型类
         * @method  _init
         * @private
         * @static
         */
        _init:
            function(){
                this.update();
                return this;

            }
        /**
         * 获取/更新 tips 显示内容
         * @method  data
         * @param   {bool}  _update     是否更新 tips 数据
         * @return  string
         */
        , data:
            function( _update ){
                _update && this.update();
                return this._data;
            }
        /**
         * 更新 tips 数据
         * @method  update
         */
        , update: 
            function(){
                if( !(this._selector.attr('title') || this._selector.attr('tipsData') ) ) return;
                this._data = $.trim( this._selector.attr('title') || this._selector.attr('tipsData') )
                             .replace( /(?:\r\n|\n\r|\r|\n)/g, '<br />');
                this._selector.removeAttr('title').removeAttr( 'tipsData' );
                if( this.isInited() ) return;
                this.isInited(true);
            }
        /**
         * 判断 selector 是否初始化过 Tips 功能
         * @method  isInited
         * @param   {bool}  _setter
         * @return  bool
         */
        , isInited:
            function( _setter ){
                typeof _setter != 'undefined' && ( this._selector.data( 'initedTips', _setter ) );
                return this._selector.data( 'initedTips' );
            }
        /**
         * 获取 tips 触发源选择器
         * @method  selector
         * @return  selector
         */
        , selector: function(){ return this._selector; }
        , tipsinitedcallback:
            function(){
                var _r;
                this._selector.attr('tipsinitedcallback') 
                    && ( _r = window[ this._selector.attr('tipsinitedcallback') ] );
                return _r;
            }
        , tipsshowcallback: 
            function(){
                var _r;
                this._selector.attr('tipsshowcallback') && ( _r = window[ this._selector.attr('tipsshowcallback') ] );
                return _r;
            }
        , tipshidecallback: 
            function(){
                var _r;
                this._selector.attr('tipshidecallback') 
                    && ( _r = window[ this._selector.attr('tipshidecallback') ] );
                return _r;
            }
        , tipstemplatebox:
            function(){
                var _r;
                this._selector.is('[tipstemplatesbox]') 
                    && ( _r = $(this._selector.attr('tipstemplatesbox')).html().trim().replace(/[\r\n]+/g, '') )
                    ;
                return _r;
            }
        , tipstemplatesbox: function(){ return this.tipstemplatebox(); }
        , layout:
            function(){
                if( !this._layout ){
                    if( this.tipstemplatesbox() ){
                        this._layout = $( this.tipstemplatesbox() );
                        this._layout.appendTo(document.body);
                    }else{
                        this._layout = $('#JCTipsLayout');
                        if( !(this._layout && this._layout.length) ){
                            this._layout = $( this.tipstemplatesbox() || JC.Tips.tpl || this.tpl);
                            this._layout.attr('id', 'JCTipsLayout').css('position', 'absolute');
                            this._layout.appendTo(document.body);
                        }
                    }
                }
                return this._layout;
           }
    };
    /**
     * Tips 视图类
     * @namespace   JC.Tips
     * @class       View
     * @constructor
     * @param       {JC.Tips.Model}    _model
     */
    function View( _model ){
        /**
         * 保存 Tips 数据模型类的实例引用
         * @property    _model
         * @type    JC.Tips.Model
         * @private
         */
        this._model = _model;
        /**
         * 保存 Tips 的显示外观选择器
         * @property    _layout
         * @type        selector
         * @private
         */
        this._layout;
    }
    
    View.prototype = {
        /**
         * 初始化 Tips 视图类
         * @method  _init
         * @private
         */
        init:
            function() {
                $(this).trigger( 'BindEvent', [ 'TipsShow', this._model.tipsshowcallback() ] );
                $(this).trigger( 'BindEvent', [ 'TipsHide', this._model.tipshidecallback() ] );
                $(this).trigger( 'BindEvent', [ 'TipsInited', this._model.tipsinitedcallback() ] );
                return this;
            }
        /**
         * 显示 Tips
         * @method  show
         * @param   {event|object}  _evt    _evt 可以是事件/或者带 pageX && pageY 属性的 Object
         *                                  <br />pageX 和 pageY 是显示位于整个文档的绝对 x/y 轴位置
         */
        , show:
            function( _evt ){
                //JC.log( 'tips view show' );
                var _x = _evt.pageX, _y = _evt.pageY;

                _x += JC.Tips.offset.bottom.x;
                _y += JC.Tips.offset.bottom.y;

                var _stop = $(document).scrollTop(), _sleft = $(document).scrollLeft();
                var _wwidth = $(window).width(), _wheight = $(window).height();
                var _lwidth = this.layout().width(), _lheight = this.layout().height();
                var _maxX = _sleft + _wwidth - _lwidth, _minX = _sleft;
                var _maxY = _stop + _wheight - _lheight, _minY = _stop;
                var _outright = false, _outbottom = false;

                _x > _maxX && ( _x = _x - _lwidth + JC.Tips.offset.left.x
                                    , _y += JC.Tips.offset.left.y
                                    , _outright = true );
                _x < _minX && ( _x = _minX );
                _y > _maxY && ( _y = _y - _lheight + JC.Tips.offset.top.y
                                , _x += JC.Tips.offset.top.x
                                , _outbottom = true);
                _y < _minY && ( _y = _minY );

                _outright && _outbottom && ( _y -= 5 );

                this.layout().css( { 'left': _x + 'px', 'top': _y + 'px' } );
                this.layout().show();

                $(this).trigger( 'TriggerEvent', [ 'TipsShow', this._model.tipsshowcallback() ] );
            }
        /**
         * 隐藏 Tips
         * @method  hide
         */
        , hide: function(){ 
            this.layout().hide(); 
            $(this).trigger( 'TriggerEvent', 'TipsHide' );
        }
        /**
         * 获取 Tips 外观的 选择器
         * @method  layout
         * @param   {bool}  _update     是否更新 Tips 数据
         * @return  selector
         */
        , layout: 
            function( _update ){ 
                this._layout = this._model.layout();
                if( _update ){
                    var _data = this._model.data( _update );
                    this._layout.html( _data ).css( {'width': 'auto'
                                                            , 'left': '-9999px'
                                                            , 'top': '-9999px'
                                                            , 'display': 'block' });  
                    var _w = this._layout.width(), _h = this._layout.height();

                    _w < JC.Tips.minWidth && this._layout.css('width', JC.Tips.minWidth + 'px');
                    _w > JC.Tips.maxWidth && this._layout.css('width', JC.Tips.maxWidth + 'px');
                }
                return this._layout; 
            }
    };
    /**
     * 鼠标移动到 Tips 触发源的触发事件
     * @namespace   JC.Tips
     * @method  tipMouseenter
     * @param   {event}     _evt
     * @private
     * @static
     */
    function tipMouseenter( _evt ){
        var _sp = $(this), _p = Tips.getInstance( _sp );
        _p.layout( 1 ).css( 'z-index', ZINDEX_COUNT++ );
        if( !_p.data() ) return;
        _p.show( _evt );

        $(document).on('mousemove', tipMousemove );
        _sp.on('mouseleave', tipMouseleave );

        function tipMousemove( _wevt ){
            if( !_p.layout().is(':visible') ){
                $(document).unbind( 'mousemove', tipMousemove );
                $(_sp).unbind( 'mouseleave', tipMouseleave );
                return;
            }
            _p.show( _wevt );
        }

        function tipMouseleave( _wevt ){
            $(document).unbind( 'mousemove', tipMousemove );
            $(_sp).unbind( 'mouseleave', tipMouseleave );
            _p.hide();
        }
    }
    /**
     * Tips 的默认模板
     * @namespace   JC.Tips
     * @property    _defTpl
     * @type        string  
     * @private
     */
    var _defTpl = '<div class="UTips"></div>';
    /**
     * 页面加载完毕后, 是否自动初始化 Tips
     */
    $(document).ready( function( _devt ){
        setTimeout( function(){
            if( !JC.Tips.autoInit ) return;

            Tips.titleToTipsdata( $('[title]') );

            $(document).delegate('*', 'mouseover', function( _evt ){
                var _p = $(this);
                if( Tips.getInstance( _p ) ) return;
                if( !( _p.attr('title') || _p.attr('tipsData') ) ) return;
                JC.Tips.init( _p );
                tipMouseenter.call( this, _evt );
            });
        }, 10);
    });

}(jQuery));
