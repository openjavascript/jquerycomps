;(function($){
    window.Tab = JC.Tab = Tab;
    /**
     * Tab 菜单类
     * <br />DOM 加载完毕后
     * , 只要鼠标移动到具有识别符的Tab上面, Tab就会自动初始化, 目前可识别: <b>.js_autoTab</b>( CSS class )
     * <br />需要手动初始化, 请使用: var ins = new JC.Tab( _tabSelector );
     * <h2>Tab 容器的HTML属性</h2>
     * <dl>
     *      <dt>tablabels</dt>
     *      <dd>声明 tab 标签的选择器语法</dd>
     *
     *      <dt>tabcontainers</dt>
     *      <dd>声明 tab 容器的选择器语法</dd>
     *
     *      <dt>tabactiveclass</dt>
     *      <dd>声明 tab当前标签的显示样式名, 默认为 cur</dd>
     *
     *      <dt>tablabelparent</dt>
     *      <dd>声明 tab的当前显示样式是在父节点, 默认为 tab label 节点</dd>
     *
     *      <dt>tabactivecallback</dt>
     *      <dd>当 tab label 被触发时的回调</dd>
     *
     *      <dt>tabchangecallback</dt>
     *      <dd>当 tab label 变更时的回调</dd>
     * </dl>
     * <h2>Label(标签) 容器的HTML属性(AJAX)</h2>
     * <dl>
     *      <dt>tabajaxurl</dt>
     *      <dd>ajax 请求的 URL 地址</dd>
     *
     *      <dt>tabajaxmethod</dt>
     *      <dd>ajax 请求的方法( get|post ), 默认 get</dd>
     *
     *      <dt>tabajaxdata</dt>
     *      <dd>ajax 请求的 数据, json</dd>
     *
     *      <dt>tabajaxcallback</dt>
     *      <dd>ajax 请求的回调</dd>
     * </dl>
     * <p><b>require</b>: <a href='window.jQuery.html'>jQuery</a></p>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc.openjavascript.org/docs_api/classes/JC.Tab.html' target='_blank'>API docs</a>
     * | <a href='../../comps/Tab/_demo/' target='_blank'>demo link</a></p>
     * @namespace JC
     * @class Tab
     * @constructor
     * @param   {selector|string}   _selector       要初始化的 Tab 选择器
     * @param   {selector|string}   _triggerTarget  初始完毕后要触发的 label
     * @version dev 0.1
     * @author  qiushaowei   <suches@btbtd.org> | 360 75 Team
     * @date    2013-07-04
     * @example
            <link href='../../../comps/Tab/res/default/style.css' rel='stylesheet' />
            <script src="../../../lib.js"></script>
            <script>
                JC.debug = 1;
                JC.use( 'Tab' );

                httpRequire();

                function tabactive( _evt, _container, _tabIns ){
                    var _label = $(this);
                    JC.log( 'tab ', _evt.type, _label.html(), new Date().getTime() );
                    if( JC.Tab.isAjax( _label ) && ! JC.Tab.isAjaxInited( _label ) ){
                        _container.html( '<h2>内容加载中...</h2>' );
                    }
                }

                function tabchange( _container, _tabIns ){
                    var _label = $(this);
                    JC.log( 'tab change: ', _label.html(), new Date().getTime() );
                }

                $(document).ready( function(){
                    JC.Tab.ajaxCallback =
                        function( _data, _label, _container ){
                            _data && ( _data = $.parseJSON( _data ) );
                            if( _data && _data.errorno === 0 ){
                                _container.html( printf( '<h2>JC.Tab.ajaxCallback</h2>{0}', _data.data ) );
                            }else{
                                Tab.isAjaxInited( _label, 0 );
                                _container.html( '<h2>内容加载失败!</h2>' );
                            }
                        };
                });

                function ajaxcallback( _data, _label, _container ){
                    _data && ( _data = $.parseJSON( _data ) );
                    if( _data && _data.errorno === 0 ){
                        _container.html( printf( '<h2>label attr ajaxcallback</h2>{0}', _data.data ) );
                    }else{
                        Tab.isAjaxInited( _label, 0 );
                        _container.html( '<h2>内容加载失败!</h2>' );
                    }
                };
            </script>

            <dl class="def">
                <dt>JC.Tab 示例 - 静态内容</dt>
                <dd>
                <div class="le-tabview js_autoTab" tablabels="ul.js_tabLabel > li > a" tabcontainers="div.js_tabContent > div" 
                                                    tabactiveclass="active" tablabelparent="li" 
                                                    tabactivecallback="tabactive" tabchangecallback="tabchange"
                                                    >
                        <ul class="le-tabs js_tabLabel">
                            <li class="active"><a href="javascript:">电视剧</a></li>
                            <li><a href="javascript:">电影</a></li>
                            <li><a href="javascript:">综艺</a></li>
                            <li><a href="javascript:">热点</a></li>
                        </ul>
                        <div class="views js_tabContent">
                            <div class="view-item active">1. 集地议送能拿距还杨雷火，永鲜提只风超洋轻绿动视落清各只江执口。</div>
                            <div class="view-item">2. 相送黄血富打万念却烟会华它表本雷烟形烟消卷效难标否标滑固小实。</div>
                            <div class="view-item">3. 理往局背剧养认被站推简沉形括於穿短，精白自没路绿往优八益是入。</div>
                            <div class="view-item">4. 鲁杆格滑那双来班五材实死听顶脱本续克修先课丝另乡型茶父报孔图。</div>
                        </div>
                    </div>
                </dd>
            </dl>

            <dl class="def">
                <dt>JC.Tab 示例 - 动态内容 - AJAX</dt>
                <dd>
                <div class="le-tabview js_autoTab" tablabels="ul.js_tabLabel2 > li > a" tabcontainers="div.js_tabContent2 > div" 
                                                    tabactiveclass="active" tablabelparent="li" 
                                                    tabactivecallback="tabactive" tabchangecallback="tabchange"
                                                    >
                        <ul class="le-tabs js_tabLabel2">
                            <li class="active"><a href="javascript:">电视剧</a></li>
                            <li><a href="javascript:" tabajaxurl="data/test.php" tabajaxmethod="post" 
                                                      tabajaxdata="{a:1,b:2}" tabajaxcallback="ajaxcallback" >电影</a></li>
                            <li><a href="javascript:" tabajaxurl="data/test.php" tabajaxcallback="ajaxcallback" >综艺</a></li>
                            <li><a href="javascript:" tabajaxurl="data/test.php" >热点</a></li>
                        </ul>
                        <div class="views js_tabContent2">
                            <div class="view-item active">1. 集地议送能拿距还杨雷火，永鲜提只风超洋轻绿动视落清各只江执口。</div>
                            <div class="view-item"></div>
                            <div class="view-item"></div>
                            <div class="view-item"></div>
                        </div>
                    </div>
                </dd>
            </dl>
     */
    function Tab( _selector, _triggerTarget ){
        _selector && ( _selector = $( _selector ) );
        _triggerTarget && ( _triggerTarget = $( _triggerTarget) );
        if( Tab.getInstance( _selector ) ) return Tab.getInstance( _selector );
        /**
         * Tab 模型类的实例
         * @property    _model
         * @type    JC.Tab.Model
         * @private
         */
        this._model = new Model( _selector, _triggerTarget );
        /**
         * Tab 视图类的实例
         */
        this._view = new View( this._model );

        JC.log( 'initing tab' );
        this._init();
    }
    /**
     * 页面加载完毕后, 是否要添加自动初始化事件
     * <br /> 自动初始化是 鼠标移动到 Tab 容器时去执行的, 不是页面加载完毕后就开始自动初始化
     * @property    autoInit
     * @type        bool
     * @default     true
     * @static
     */
    Tab.autoInit = true;
    /**
     * label 当前状态的样式
     * @property    activeClass
     * @type        string
     * @default     cur
     * @static      
     */
    Tab.activeClass = 'cur';
    /**
     * label 的触发事件
     * @property    activeEvent
     * @type        string
     * @default     click
     * @static
     */
    Tab.activeEvent = 'click';
    /**
     * 获取或设置 Tab 容器的 Tab 实例属性
     * @method  getInstance
     * @param   {selector}  _selector
     * @param   {JC.Tab}   _setter     _setter 不为空是设置
     * @static
     */
    Tab.getInstance = 
        function( _selector, _setter ){
            var _r;
            _selector && ( _selector = $(_selector) ).length && (
                typeof _setter != 'undefined' && _selector.data('TabInstance', _setter)
                , _r =  _selector.data('TabInstance')
            );
            return _r;
        };
    /**
     * 全局的 ajax 处理回调
     * @property    ajaxCallback
     * @type    function
     * @default null
     * @static
     * @example
            $(document).ready( function(){
                JC.Tab.ajaxCallback =
                    function( _data, _label, _container, _textStatus, _jqXHR ){
                        _data && ( _data = $.parseJSON( _data ) );
                        if( _data && _data.errorno === 0 ){
                            _container.html( printf( '<h2>JC.Tab.ajaxCallback</h2>{0}', _data.data ) );
                        }else{
                            Tab.isAjaxInited( _label, 0 );
                            _container.html( '<h2>内容加载失败!</h2>' );
                        }
                    };
            });
     */
    Tab.ajaxCallback = null;
    /**
     * ajax 请求是否添加随机参数 rnd, 以防止页面缓存的结果差异
     * @property    ajaxRandom
     * @type    bool
     * @default true
     * @static
     */
    Tab.ajaxRandom = true;
    /**
     * 判断一个 label 是否为 ajax
     * @method  isAjax
     * @static
     * @param   {selector}  _label
     * @return  {string|undefined}
     */
    Tab.isAjax =
        function( _label ){
            return $(_label).attr('tabajaxurl');
        };
    /**
     * 判断一个 ajax label 是否已经初始化过
     * <br /> 这个方法需要跟 Tab.isAjax 结合判断才更为准确
     * @method  isAjaxInited
     * @static
     * @param   {selector}  _label
     * @param   {bool}      _setter     如果 _setter 不为空, 则进行赋值
     * @example
        function tabactive( _evt, _container, _tabIns ){
            var _label = $(this);
            JC.log( 'tab ', _evt.type, _label.html(), new Date().getTime() );
            if( JC.Tab.isAjax( _label ) && ! JC.Tab.isAjaxInited( _label ) ){
                _container.html( '<h2>内容加载中...</h2>' );
            }
        }
     */
    Tab.isAjaxInited =
        function( _label, _setter ){
            _setter != 'undefined' && ( $(_label).data('TabAjaxInited', _setter ) );
            return $(_label).data('TabAjaxInited');
        }

    Tab.prototype = {
        /**
         * Tab 内部初始化方法
         * @method  _init
         * @private
         */
        _init:
            function(){
                if( !this._model.layoutIsTab() ) return this;
                Tab.getInstance( this._model.layout(), this );
                this._view.init();

                var _triggerTarget = $(this._model.triggerTarget());
                _triggerTarget && _triggerTarget.length 
                && this._model.tablabel( _triggerTarget ) && _triggerTarget.trigger('click');

                return this;
            }    
        /**
         * 把 _label 设置为活动状态
         * @method active
         * @param   {selector}  _label
         */
        , active:
            function( _label ){
                var _ix;
                if( typeof _label == 'number' ) _ix = _label;
                else{
                    _label && $(_label).length && ( _ix = this._model.tabindex( _label ) );
                }

                typeof _ix != 'undefined' && ( this._view.active( _ix ) );
                return this;
            }
    }
    /**
     * Tab 数据模型类
     * @namespace JC.Tab
     * @class Model
     * @constructor
     * @param   {selector|string}   _selector       要初始化的 Tab 选择器
     * @param   {selector|string}   _triggerTarget  初始完毕后要触发的 label
     */
    function Model( _selector, _triggerTarget ){
        /**
         * Tab 的主容器
         * @property    _layout
         * @type    selector
         * @private
         */
        this._layout = _selector;
        /**
         * Tab 初始完毕后要触发的label, 可选
         * @property    _triggerTarget
         * @type    selector
         * @private
         */
        this._triggerTarget = _triggerTarget;
        /**
         * Tab 的标签列表选择器
         * @property    _tablabels
         * @type    selector
         * @private
         */
        this._tablabels;
        /**
         * Tab 的内容列表选择器
         * @property    _tabcontainers
         * @type    selector
         * @private
         */
        this._tabcontainers;
        /**
         * 当前标签的所在索引位置
         * @property    currentIndex
         * @type    int
         */
        this.currentIndex;
        
        this._init();
    }
    
    Model.prototype = {
        /**
         * Tab Model 内部初始化方法
         * @method  _init
         * @private
         */
        _init:
            function(){
                if( !this.layoutIsTab() ) return;
                var _p = this, _re = /^\~[\s]+/g;

                if( _p.isFromChild( _p.layout().attr('tablabels') ) ){
                    this._tablabels = _p.layout().find( _p.layout().attr('tablabels').replace( _re, '' ) );
                }else{
                    this._tablabels = parentSelector( _p.layout(), _p.layout().attr('tablabels') );
                }

                if( _p.isFromChild( _p.layout().attr('tabcontainers') ) ){
                    this._tabcontainers = _p.layout().find( _p.layout().attr('tabcontainers').replace( _re, '' ) );
                }else{
                    this._tabcontainers = parentSelector( _p.layout(), _p.layout().attr('tabcontainers') );
                }

                this._tablabels.each( function(){ _p.tablabel( this, 1 ); } );
                this._tabcontainers.each( function(){ _p.tabcontent( this, 1 ); } );
                this._tablabels.each( function( _ix ){ _p.tabindex( this, _ix ); });

                return this;
            }
        /**
         * 判断是否从 layout 下查找内容
         */
        , isFromChild:
            function( _selector ){
                return /^\~/.test( $.trim( _selector ) );
            }
        /**
         * 获取 Tab 的主容器
         * @method  layout
         * @return  selector
         */
        , layout: function(){ return this._layout; }
        /**
         * 获取 Tab 所有 label 或 特定索引的 label
         * @method  tablabels
         * @param   {int}   _ix
         * @return  selector
         */
        , tablabels: function( _ix ){ 
            if( typeof _ix != 'undefined' ) return $( this._tablabels[_ix] );
            return this._tablabels; 
        }
        /**
         * 获取 Tab 所有内容container 或 特定索引的 container
         * @method  tabcontainers
         * @param   {int}   _ix
         * @return  selector
         */
        , tabcontainers: function( _ix ){ 
            if( typeof _ix != 'undefined' ) return $( this._tabcontainers[_ix] );
            return this._tabcontainers; 
        }
        /**
         * 获取初始化要触发的 label
         * @method  triggerTarget
         * @return  selector
         */
        , triggerTarget: function(){ return this._triggerTarget; }
        /**
         * 判断一个容器是否 符合 Tab 数据要求
         * @method  layoutIsTab
         * @return  bool
         */
        , layoutIsTab: function(){ return this.layout().attr('tablabels') && this.layout().attr('tabcontainers'); }
        /**
         * 获取 Tab 活动状态的 class
         * @method  activeClass
         * @return  string
         */
        , activeClass: function(){ return this.layout().attr('tabactiveclass') || Tab.activeClass; }
        /**
         * 获取 Tab label 的触发事件名称
         * @method  activeEvent
         * @return  string
         */
        , activeEvent: function(){ return this.layout().attr('tabactiveevent') || Tab.activeEvent; }
        /**
         * 判断 label 是否符合要求, 或者设置一个 label为符合要求
         * @method  tablabel
         * @param   {bool}  _setter
         * @return  bool
         */
        , tablabel: 
            function( _label, _setter ){
                _label && ( _label = $( _label ) );
                if( !( _label && _label.length ) ) return;
                typeof _setter != 'undefined' && _label.data( 'TabLabel', _setter );
                return _label.data( 'TabLabel' );
            }
        /**
         * 判断 container 是否符合要求, 或者设置一个 container为符合要求
         * @method  tabcontent
         * @param   {selector}  _content
         * @param   {bool}      _setter
         * @return  bool
         */
        , tabcontent: 
            function( _content, _setter ){
                _content && ( _content = $( _content ) );
                if( !( _content && _content.length ) ) return;
                typeof _setter != 'undefined' && _content.data( 'TabContent', _setter );
                return _content.data( 'TabContent' );
            }
        /**
         * 获取或设置 label 的索引位置
         * @method  tabindex
         * @param   {selector}  _label
         * @param   {int}       _setter
         * @return  int
         */
        , tabindex: 
            function( _label, _setter ){
                _label && ( _label = $( _label ) );
                if( !( _label && _label.length ) ) return;
                typeof _setter != 'undefined' && _label.data( 'TabIndex', _setter );
                return _label.data( 'TabIndex' );
            }
        /**
         * 获取Tab label 触发事件后的回调
         * @method  tabactivecallback
         * @return  function
         */
        , tabactivecallback:
            function(){
                var _r;
                this.layout().attr('tabactivecallback') && ( _r = window[ this.layout().attr('tabactivecallback') ] );
                return _r;
            }
        /**
         * 获取 Tab label 变更后的回调
         * @method  tabchangecallback
         * @return  function
         */
        , tabchangecallback:
            function(){
                var _r;
                this.layout().attr('tabchangecallback') && ( _r = window[ this.layout().attr('tabchangecallback') ] );
                return _r;
            }
        /**
         * 获取 Tab label 活动状态显示样式的标签
         * @method  tablabelparent
         * @param   {selector}  _label
         * @return  selector
         */
        , tablabelparent:
            function( _label ){
                var _tmp;
                this.layout().attr('tablabelparent') 
                    && ( _tmp = _label.parent( this.layout().attr('tablabelparent') ) ) 
                    && _tmp.length && ( _label = _tmp );
                return _label;
            }
        /**
         * 获取 ajax label 的 URL
         * @method  tabajaxurl
         * @param   {selector}  _label
         * @return  string
         */
        , tabajaxurl: function( _label ){ return _label.attr('tabajaxurl'); }
        /**
         * 获取 ajax label 的请求方法 get/post
         * @method  tabajaxmethod
         * @param   {selector}  _label
         * @return  string
         */
        , tabajaxmethod: function( _label ){ return (_label.attr('tabajaxmethod') || 'get').toLowerCase(); }
        /**
         * 获取 ajax label 的请求数据
         * @method  tabajaxdata
         * @param   {selector}  _label
         * @return  object
         */
        , tabajaxdata: 
            function( _label ){ 
                var _r;
                _label.attr('tabajaxdata') && ( eval( '(_r = ' + _label.attr('tabajaxdata') + ')' ) );
                _r = _r || {};
                Tab.ajaxRandom && ( _r.rnd = new Date().getTime() );
                return _r;
            }
        /**
         * 获取 ajax label 请求URL后的回调
         * @method  tabajaxcallback
         * @param   {selector}  _label
         * @return  function
         */
        , tabajaxcallback: 
            function( _label ){ 
                var _r = Tab.ajaxCallback, _tmp;
                _label.attr('tabajaxcallback') && ( _tmp = window[ _label.attr('tabajaxcallback') ] ) && ( _r = _tmp );
                return _r;
            }
    };
    /**
     * Tab 视图模型类
     * @namespace JC.Tab
     * @class View
     * @constructor
     * @param   {JC.Tab.Model}   _model   
     */
    function View( _model ){
        /**
         * Tab 数据模型类实例引用 
         * @property    _model
         * @type {JC.Tab.Model} 
         * @private
         */
        this._model = _model;
    }
    
    View.prototype = {
        /**
         * Tab 视图类初始化方法
         * @method  init
         */
        init:
            function() {
                JC.log( 'Tab.View:', new Date().getTime() );
                var _p = this;
                this._model.tablabels().on( this._model.activeEvent(), function( _evt ){
                    var _sp = $(this), _r;
                    if( typeof _p._model.currentIndex !== 'undefined' 
                        && _p._model.currentIndex === _p._model.tabindex( _sp ) ) return;
                    _p._model.currentIndex = _p._model.tabindex( _sp );

                    _p._model.tabactivecallback() 
                        && ( _r = _p._model.tabactivecallback().call( this, _evt, _p._model.tabcontainers( _p._model.currentIndex ), _p ) );
                    if( _r === false ) return;
                    _p.active( _p._model.tabindex( _sp ) );
                });

                return this;
            }
        /**
         * 设置特定索引位置的 label 为活动状态
         * @method  active
         * @param   {int}   _ix
         */
        , active:
            function( _ix ){
                if( typeof _ix == 'undefined' ) return;
                var _p = this, _r, _activeClass = _p._model.activeClass(), _activeItem = _p._model.tablabels( _ix );
                _p._model.tablabels().each( function(){
                    _p._model.tablabelparent( $(this) ).removeClass( _activeClass );
                });
                _activeItem = _p._model.tablabelparent( _activeItem );
                _activeItem.addClass( _activeClass );

                _p._model.tabcontainers().hide();
                _p._model.tabcontainers( _ix ).show();

                _p._model.tabchangecallback() 
                    && ( _r = _p._model.tabchangecallback().call( _p._model.tablabels( _ix ), _p._model.tabcontainers( _ix ), _p ) );
                if( _r === false ) return;

                _p.activeAjax( _ix );
            }
        /**
         * 请求特定索引位置的 ajax tab 数据
         * @method  activeAjax
         * @param   {int}   _ix
         */
        , activeAjax:
            function( _ix ){
                var _p = this, _label = _p._model.tablabels( _ix );
                if( !Tab.isAjax( _label ) ) return;
                if( Tab.isAjaxInited( _label ) ) return;
                var _url = _p._model.tabajaxurl( _label );
                if( !_url ) return;

                JC.log( _p._model.tabajaxmethod( _label )
                        , _p._model.tabajaxdata( _label )
                        , _p._model.tabajaxcallback( _label )
                        );

                Tab.isAjaxInited( _label, 1 );
                $[ _p._model.tabajaxmethod( _label ) ]( _url, _p._model.tabajaxdata( _label ), function( _r, _textStatus, _jqXHR ){

                     _p._model.tabajaxcallback( _label ) 
                        && _p._model.tabajaxcallback( _label )( _r, _label, _p._model.tabcontainers( _ix ), _p, _textStatus, _jqXHR );

                    !_p._model.tabajaxcallback( _label ) && _p._model.tabcontainers( _ix ).html( _r );
                });
            }
    };
    /**
     * 自动化初始 Tab 实例
     * 如果 Tab.autoInit = true, 鼠标移至 Tab 后会自动初始化 Tab
     */
    $(document).delegate( '.js_autoTab', 'mouseover', function( _evt ){
        if( !Tab.autoInit ) return;
        var _p = $(this), _tab, _src = _evt.target || _evt.srcElement;
        if( Tab.getInstance( _p ) ) return;
        _src && ( _src = $(_src) );
        JC.log( new Date().getTime(), _src.prop('nodeName') );
        _tab = new Tab( _p, _src );
    });

}(jQuery));
