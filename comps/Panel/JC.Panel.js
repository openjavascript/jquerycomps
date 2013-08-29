;(function($){
    window.Panel = JC.Panel = Panel;
    /**
     * 弹出层基础类 JC.Panel
     * <p><b>requires</b>: <a href='window.jQuery.html'>jQuery</a></p>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc.openjavascript.org/docs_api/classes/JC.Panel.html' target='_blank'>API docs</a>
     * | <a href='../../comps/Panel/_demo' target='_blank'>demo link</a></p>
     * <h2>可用的 html attribute</h2>
     * <dl>
     *      <dt>panelfocusbutton = bool, default = true</dt>
     *      <dd>显示 Panel 时, 是否自动 foucs 到按钮上</dd>
     *
     *      <dt>panelclickclose = bool</dt>
     *      <dd>点击 Panel 外时, 是否关闭 panel</dd>
     *
     *      <dt>panelautoclose = bool</dt>
     *      <dd>Panel 是否自动关闭, 默认关闭时间间隔 = 2000 ms</dd>
     *
     *      <dt>panelautoclosems = int, default = 2000 ms</dt>
     *      <dd>自动关闭 Panel 的时间间隔</dd>
     * </dl>
     * @namespace JC
     * @class Panel
     * @constructor
     * @param   {selector|string}   _selector   自定义弹框模板, 如果 _selector不能解析为 HTML, 将视为@param _headers 
     * @param   {string}            _headers    定义模板的 header 文字, 如果 _selector 不能解析为HTML, 视视为@param _bodys
     * @param   {string}            _bodys      定义模板的 body 文字, 如果 _selector 不能解析为HTML, 视视为@param _footers
     * @param   {string}            _footers    定义模板的 footer 文字
     * @version dev 0.1
     * @author  qiushaowei   <suches@btbtd.org> | 75 team
     * @date    2013-06-04
     * @example
            <script src="../../../lib.js"></script>
            <script>JC.use( 'Panel' ); </script>
            <script>
                var btnstr = [
                    '<div style="text-align:center" class="UButton">'
                    , '<button type="button" eventtype="confirm">确定</button>'
                    , '<button type="button" eventtype="cancel">取消</button>\n'
                    , '</div>'
                ].join('');
                $(document).ready( function(_evt){
                    tmpPanel = new JC.Panel( '默认panel', '<h2>test content</h2>' + btnstr, 'test footer');
                    tmpPanel.on('close', function(_evt, _panel){
                        JC.log('user close evnet');
                    });
                    tmpPanel.show( 0 );
                });
            </script>
     */
    function Panel( _selector, _headers, _bodys, _footers ){
        typeof _selector == 'string' && ( _selector = _selector.trim().replace( /[\r\n]+/g, '') ); 
        typeof _headers == 'string' && ( _headers = _headers.trim().replace( /[\r\n]+/g, '') ); 
        typeof _bodys == 'string' && ( _bodys = _bodys.trim().replace( /[\r\n]+/g, '') ); 

        if( Panel.getInstance( _selector ) ) return Panel.getInstance( _selector );
        /**
         * 存放数据的model层, see <a href='JC.Panel.Model.html'>Panel.Model</a>
         * @property _model 
         * @private
         */
        this._model = new Model( _selector, _headers, _bodys, _footers );
        /**
         * 控制视图的view层, see <a href='JC.Panel.View.html'>Panel.View</a>
         * @property    _view 
         * @private
         */
        this._view = new View( this._model );

        this._init();
    }
    /**
     * 从 selector 获取 Panel 的实例
     * <br /><b>如果从DOM初始化, 不进行判断的话, 会重复初始化多次</b>
     * @method getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {Panel instance}
     */
    Panel.getInstance =
        function( _selector ){
            if( typeof _selector == 'string' && !/</.test( _selector ) ) 
                    _selector = $(_selector);
            if( _selector && typeof _selector == 'string' ) return;
            return $(_selector).data('PanelInstace');
        };
    /**
     * 显示Panel时, 是否 focus 到 按钮上
     * focusButton
     * @property    focusButton
     * @type        bool
     * @default     true
     * @static
     */
    Panel.focusButton = true;
    /**
     * 页面点击时, 是否自动关闭 Panel
     * @property    clickClose
     * @type        bool
     * @default     true
     * @static
     */
    Panel.clickClose = true;
    /**
     * 自动关闭的时间间隔, 单位毫秒
     * <br />调用 ins.autoClose() 时生效
     * @property    autoCloseMs
     * @type        int
     * @default     2000
     * @static
     */
    Panel.autoCloseMs = 2000;
    
    Panel.prototype = {
        /**
         * 初始化Panel
         * @method  _init
         * @private
         */
        _init:
            function(){
                var _p = this;
                _p._view.getPanel().data('PanelInstace', _p);

                /**
                 * 初始化Panel 默认事件
                 * @private
                 */
                _p._model.addEvent( 'close_default'
                                    , function( _evt, _panel ){ _panel._view.close(); } );

                _p._model.addEvent( 'show_default'
                                    , function( _evt, _panel ){ _panel._view.show(); } );

                _p._model.addEvent( 'hide_default'
                                    , function( _evt, _panel ){ _panel._view.hide(); } );

                _p._model.addEvent( 'confirm_default'
                                    , function( _evt, _panel ){ _panel.trigger('close'); } );

                _p._model.addEvent( 'cancel_default'
                                    , function( _evt, _panel ){ _panel.trigger('close'); } );

                _p._model.panelautoclose() && _p.autoClose();

               return _p;
            }    
        /**
         * 为Panel绑定事件
         * <br /> 内置事件类型有 show, hide, close, center, confirm, cancel
         * , beforeshow, beforehide, beforeclose, beforecenter
         * <br /> 用户可通过 HTML eventtype 属性自定义事件类型
         * @method on
         * @param   {string}    _evtName    要绑定的事件名
         * @param   {function}  _cb         要绑定的事件回调函数
         * @example
                //绑定内置事件
                <button type="button" eventtype="close">text</button>
                <script>
                panelInstace.on( 'close', function( _evt, _panel ){ do something } );
                </script>

                //绑定自定义事件
                <button type="button" eventtype="userevent">text</button>
                <script>
                panelInstace.on( 'userevent', function( _evt, _pan:el ){ do something } );
                </script>
         */
        , on:
            function( _evtName, _cb ){
                _evtName && _cb && this._model.addEvent( _evtName, _cb );
                return this;
            }
        /**
         * 显示 Panel
         * <br /> Panel初始后, 默认是隐藏状态, 显示 Panel 需要显式调用 show 方法
         * @method  show
         * @param   {int|selector}   _position   指定 panel 要显示的位置, 
         *  <br />如果 _position 为 int:  0, 表示屏幕居中显示
         *  <br />如果 _position 为 selector:  Paenl 的显示位置将基于 _position 的上下左右
         * @example
         *      panelInstace.show();            //默认显示
         *      panelInstace.show( 0 );         //居中显示
         *      panelInstace.show( _selector ); //位于 _selector 的上下左右
         */
        , show:
            function( _position ){
                var _p = this;
                setTimeout(
                    function(){
                        switch( typeof _position ){
                            case 'number': 
                                {
                                    switch( _position ){
                                        case 0: _p.center(); break;
                                    }
                                    break;
                                }
                            case 'object':
                                {
                                    _position = $(_position);
                                    _position.length && _p._view.positionWith( _position );

                                    if( !_p._model.bindedPositionWithEvent ){
                                        _p._model.bindedPositionWithEvent = true;

                                        $(window).on('resize', changePosition );
                                        _p.on('close', function(){
                                            _p._model.bindedPositionWithEvent = false;
                                            $(window).unbind('resize', changePosition);
                                        });

                                        function changePosition(){
                                            _p.positionWith( _position );
                                        }
                                    }

                                    break;
                                }
                        }
                    }, 10);
                this.trigger('beforeshow', this._view.getPanel() );
                this.trigger('show', this._view.getPanel() );

                return this;
            }
        /**
         * 设置Panel的显示位置基于 _src 的左右上下
         * @method  positionWith
         * @param   {selector}      _src 
         */
        , positionWith: 
            function( _src ){ 
                _src = $(_src ); 
                _src && _src.length && this._view.positionWith( _src ); 
                return this;
            }
        /**
         * 隐藏 Panel
         * <br /> 隐藏 Panel 设置 css display:none, 不会从DOM 删除 Panel
         * @method  hide
         */
        , hide:
            function(){
                this.trigger('beforehide', this._view.getPanel() );
                this.trigger('hide', this._view.getPanel() );
                return this;
            }
        /**
         * 关闭 Panel
         * <br /> <b>关闭 Panel 是直接从 DOM 中删除 Panel</b>
         * @method  close
         */
        , close:
            function(){
                JC.log('Panel.close');
                this.trigger('beforeclose', this._view.getPanel() );
                this.trigger('close', this._view.getPanel() );
                return this;
            }
        /**
         * 判断点击页面时, 是否自动关闭 Panel
         * @method  isClickClose
         * @return bool
         */
        , isClickClose:
            function(){
                return this._model.panelclickclose();
            }
        /**
         * 点击页面时, 添加自动隐藏功能
         * @method  clickClose
         * @param   {bool}          _removeAutoClose
         */
        , clickClose:
            function( _removeAutoClose ){
                _removeAutoClose && this.layout() && this.layout().removeAttr('panelclickclose');
                !_removeAutoClose && this.layout() && this.layout().attr('panelclickclose', true);
                return this;
            }
        /**
         * clickClose 的别名
         * <br />这个方法的存在是为了向后兼容, 请使用 clickClose
         */
        , addAutoClose:
            function(){
                this.clickClose.apply( this, sliceArgs( arguments ) );
                return this;
            }
        /**
         * 添加自动关闭功能
         * @method  autoClose
         * @param   {bool}          _removeAutoClose
         */
        , autoClose:
            function( _callback, _ms ){
                var _p = this, _tm;
                _ms = _p._model.panelautoclosems( _ms );

                Panel._autoCloseTimeout && clearTimeout( Panel._autoCloseTimeout );
                _p.on('close', function(){
                    Panel._autoCloseTimeout && clearTimeout( Panel._autoCloseTimeout );
                });
                Panel._autoCloseTimeout = 
                    setTimeout( function(){
                        _callback && _p.on( 'close', _callback );
                        _p.close();
                    }, _ms );

                return this;
            }
         /**
         * focus 到 button
         * <br />优先查找 input[eventtype=confirm], input[type=submit], button[eventtype=confirm], button[type=submit]
         * <br />input[eventtype=cancel], input[type=buton], button[eventtype=cancel], button[type=button]
         * @method  focusButton
         */
        , focusButton: function(){ this._view.focusButton(); return this; }
        /**
         * 从DOM清除Panel
         * <br /> <b>close 方法清除 Panel可以被用户阻止, 该方法不会被用户阻止</b>
         * @method  dispose
         */
        , dispose:
            function(){
                JC.log('Panel.dispose');
                this._view.close();
                return this;
            }
        /**
         * 把 Panel 位置设为屏幕居中
         * @method  center
         */
        , center:
            function(){
                this.trigger('beforecenter', this._view.getPanel() );
                this._view.center();
                this.trigger('center', this._view.getPanel() );
                return this;
            }
        /**
         * 返回 Panel 的 jquery dom选择器对象
         * <br />这个方法以后将会清除, 请使用 layout 方法
         * @method  selector
         * @return  {selector}
         */
        , selector: function(){ return this._view.getPanel(); }
        /**
         * 返回 Panel 的 jquery dom选择器对象
         * @method  layout
         * @return  {selector}
         */
        , layout: function(){ return this._view.getPanel(); }
        /**
         * 从 Panel 选择器中查找内容
         * <br />添加这个方法是为了方便jquery 使用者的习惯
         * @method  find
         * @param   {selector}  _selector
         * @return  selector
         */
        , find: function( _selector ){ return this.layout().find( _selector ); }
        /**
         * 触发 Panel 已绑定的事件
         * <br />用户可以使用该方法主动触发绑定的事件
         * @method trigger
         * @param   {string}    _evtName    要触发的事件名, 必填参数
         * @param   {selector}  _srcElement 触发事件的源对象, 可选参数
         * @example
         *      panelInstace.trigger('close');
         *      panelInstace.trigger('userevent', sourceElement);
         */
        , trigger:
            function( _evtName, _srcElement ){
                JC.log( 'Panel.trigger', _evtName );

                var _p = this, _evts = this._model.getEvent( _evtName ), _processDefEvt = true;
                if( _evts && _evts.length ){
                    _srcElement && (_srcElement = $(_srcElement) ) 
                        && _srcElement.length && (_srcElement = _srcElement[0]);

                    $.each( _evts, function( _ix, _cb ){
                        if( _cb.call( _srcElement, _evtName, _p ) === false ) 
                            return _processDefEvt = false; 
                    });
                }

                if( _processDefEvt ){
                    var _defEvts = this._model.getEvent( _evtName + '_default' );
                    if( _defEvts && _defEvts.length ){
                        $.each( _defEvts, function( _ix, _cb ){
                            if( _cb.call( _srcElement, _evtName, _p ) === false ) 
                                return false; 
                        });
                    }
                }
                return this;
            }
        /**
         * 获取或者设置 Panel Header 的HTML内容
         * <br />如果 Panel默认没有 Header的话, 使用该方法 _html 非空可动态创建一个Header
         * @method  header
         * @param   {string}    _html   
         * @return  {string}    header 的HTML内容
         */
        , header:
            function( _html ){
                if( typeof _html != 'undefined' ) this._view.getHeader( _html );
                var _selector = this._view.getHeader();
                if( _selector && _selector.length ) _html = _selector.html();
                return _html || '';
            }
        /**
         * 获取或者设置 Panel body 的HTML内容
         * @method  body
         * @param   {string}    _html   
         * @return  {string}    body 的HTML内容
         */
        , body:
            function( _html ){
                if( typeof _html != 'undefined' ) this._view.getBody( _html );
                var _selector = this._view.getBody();
                if( _selector && _selector.length ) _html = _selector.html();
                return _html || '';
            }
        /**
         * 获取或者设置 Panel footer 的HTML内容
         * <br />如果 Panel默认没有 footer的话, 使用该方法 _html 非空可动态创建一个footer
         * @method  footer
         * @param   {string}    _html   
         * @return  {string}    footer 的HTML内容
         */
        , footer:
            function( _html ){
                if( typeof _html != 'undefined' ) this._view.getFooter( _html );
                var _selector = this._view.getFooter();
                if( _selector && _selector.length ) _html = _selector.html();
                return _html || '';
            }
        /**
         * 获取或者设置 Panel 的HTML内容
         * @method  panel
         * @param   {string}    _html   
         * @return  {string}    panel 的HTML内容
         */
        , panel:
            function( _html ){
                if( typeof _html != 'undefined' ) this._view.getPanel( _html );
                var _selector = this._view.getPanel();
                if( _selector && _selector.length ) _html = _selector.html();
                return _html || '';
            }
    }
    /**
     * Panel 显示前会触发的事件<br/>
     * 这个事件在用户调用 _panelInstance.show() 时触发
     * @event   beforeshow
     * @type    function
     * @example     
     *      panelInstace.on( 'beforeshow', function( _evt, _panelInstance ){ do something });
     */
    /**
     * 显示Panel时会触发的事件
     * @event   show
     * @type    function
     * @example     
     *      panelInstace.on( 'show', function( _evt, _panelInstance ){ do something });
     */
    /**
     * Panel 隐藏前会触发的事件<br/>
     * <br />这个事件在用户调用 _panelInstance.hide() 时触发
     * @event   beforehide
     * @type    function
     * @example     
     *      panelInstace.on( 'beforehide', function( _evt, _panelInstance ){ do something });
     */
    /**
     * Panel 隐藏时会触发的事件<br/>
     * <br />这个事件在用户调用 _panelInstance.hide() 时触发
     * @event   hide
     * @type    function
     * @example     
     *      panelInstace.on( 'hide', function( _evt, _panelInstance ){ do something });
     */
    /**
     * Panel 关闭前会触发的事件<br/>
     * 这个事件在用户调用 _panelInstance.close() 时触发
     * @event   beforeclose
     * @type    function
     * @example     
     *      <button type="button" eventtype="close">text</button>
     *      <script>
     *      panelInstace.on( 'beforeclose', function( _evt, _panelInstance ){ do something });
     *      </script>
     */
    /**
     * 关闭事件
     * @event   close
     * @type    function
     * @example     
     *      <button type="button" eventtype="close">text</button>
     *      <script>
     *      panelInstace.on( 'close', function( _evt, _panelInstance ){ do something });
     *      </script>
     */
    /**
     * Panel 居中显示前会触发的事件<br/>
     * 这个事件在用户调用 _panelInstance.center() 时触发
     * @event   beforecenter
     * @type    function
     * @example     
     *      panelInstace.on( 'beforecenter', function( _evt, _panelInstance ){ do something });
     */
    /**
     * Panel 居中后会触发的事件
     * @event   center
     * @type    function
     * @example     
     *      panelInstace.on( 'center', function( _evt, _panelInstance ){ do something });
     */
    /**
     * Panel 点击确认按钮触发的事件
     * @event   confirm
     * @type    function
     * @example     
     *      <button type="button" eventtype="confirm">text</button>
     *      <script>
     *      panelInstace.on( 'confirm', function( _evt, _panelInstance ){ do something });
     *      </script>
     */
    /**
     * Panel 点击确取消按钮触发的事件
     * @event   cancel
     * @type    function
     * @example     
     *      <button type="button" eventtype="cancel">text</button>
     *      <script>
     *      panelInstace.on( 'cancel', function( _evt, _panelInstance ){ do something });
     *      </script>
     */

    /**
     * 存储 Panel 的基础数据类
     * <br /><b>这个类为 Panel 的私有类</b>
     * @class   Model
     * @namespace   JC.Panel
     * @constructor
     * @param   {selector|string}   _selector   自定义弹框模板, 如果 _selector不能解析为 HTML, 将视为@param _headers 
     * @param   {string}            _headers    定义模板的 header 文字, 如果 _selector 不能解析为HTML, 视视为@param _bodys
     * @param   {string}            _bodys      定义模板的 body 文字, 如果 _selector 不能解析为HTML, 视视为@param _footers
     * @param   {string}            _footers    定义模板的 footer 文字
     */
    function Model( _selector, _headers, _bodys, _footers ){
        /**
         * panel 的 HTML 对象或者字符串
         * <br /> 这是初始化时的原始数据
         * @property    selector
         * @type    selector|string   
         */
        this.selector = _selector;
        /**
         * header 内容 
         * <br /> 这是初始化时的原始数据
         * @property    headers
         * @type    string
         */
        this.headers = _headers;
        /**
         * body 内容
         * <br /> 这是初始化时的原始数据
         * @property bodys
         * @type    string
         */
        this.bodys = _bodys;
        /**
         * footers 内容
         * <br /> 这是初始化时的原始数据
         * @property footers
         * @type    string
         */
        this.footers = _footers;
        /**
         * panel 初始化后的 selector 对象
         * @property    panel
         * @type    selector
         */
        this.panel;
        /**
         * 存储用户事件和默认事件的对象
         * @property    _events
         * @type    Object
         * @private
         */
        this._events = {};
        this._init();
    }
    
    Model.prototype = {
        /**
         * Model 初始化方法
         * @method  _init
         * @private
         * @return  {Model instance}
         */
        _init:
            function(){
                var _p = this, _selector = typeof this.selector != 'undefined' ? $(this.selector) : undefined;
                Panel.ignoreClick = true;
                if( _selector && _selector.length ){
                    this.selector = _selector;
                    JC.log( 'user tpl', this.selector.parent().length );
                    if( !this.selector.parent().length ){
                        _p.selector.appendTo( $(document.body ) );
                    }
                }else if( !_selector || _selector.length === 0 ){
                    this.footers = this.bodys;
                    this.bodys = this.headers;
                    this.headers = this.selector;
                    this.selector = undefined;
                }
                setTimeout( function(){ Panel.ignoreClick = false; }, 1 );
                return this;
            }
        /**
         * 添加事件方法
         * @method  addEvent
         * @param   {string}    _evtName    事件名
         * @param   {function}  _cb         事件的回调函数
         */
        , addEvent:
            function( _evtName, _cb ){
                if( !(_evtName && _cb ) ) return;
                _evtName && ( _evtName = _evtName.toLowerCase() );
                if( !(_evtName in this._events ) ){
                    this._events[ _evtName ] = []
                }
                if( /\_default/i.test( _evtName ) ) this._events[ _evtName ].unshift( _cb );
                else this._events[ _evtName ].push( _cb );
            }
        /**
         * 获取事件方法
         * @method  getEvent
         * @param   {string}    _evtName    事件名
         * @return  {array}     某类事件类型的所有回调
         */
        , getEvent:
            function( _evtName ){
                return this._events[ _evtName ];
            }
        , panelfocusbutton:
            function(){
                var _r = Panel.focusButton;
                if( this.panel.is( '[panelfocusbutton]' ) ){
                    _r = parseBool( this.panel.attr('panelfocusbutton') );
                }
                return _r;
            }
        , panelclickclose:
            function(){
                var _r = Panel.clickClose;
                if( this.panel.is( '[panelclickclose]' ) ){
                    _r = parseBool( this.panel.attr('panelclickclose') );
                }
                return _r;
            }
        , panelautoclose:
            function(){
                var _r;
                if( this.panel.is( '[panelautoclose]' ) ){
                    _r = parseBool( this.panel.attr('panelautoclose') );
                }
                return _r;
            }
        , panelautoclosems:
            function( _ms ){
                var _r = Panel.autoCloseMs;
                if( this.panel.is( '[panelautoclosems]' ) ){
                    _r = parseInt( this.panel.attr('panelautoclosems'), 10 );
                }
                typeof _ms == 'number' && ( _r = _ms );
                return _r;
            }
    };
     /**
     * 存储 Panel 的基础视图类
     * <br /><b>这个类为 Panel 的私有类</b>
     * @class   View
     * @namespace   JC.Panel
     * @constructor
     * @param   {Panel.Model}   _model  Panel的基础数据类, see <a href='JC.Panel.Model.html'>Panel.Model</a>
     */
    function View( _model ){
        /**
         * Panel的基础数据类, see <a href='JC.Panel.Model.html'>Panel.Model</a>
         * @property _model
         * @type Panel.Model
         * @private
         */
        this._model = _model;
        /**
         * 默认模板
         * @prototype   _tpl
         * @type        string
         * @private
         */
        this._tpl = _deftpl;

        this._init();
    }
    
    View.prototype = {
        /**
         * View 的初始方法
         * @method  _init
         * @private
         * @for View
         */
        _init:
            function(){
                if( !this._model.panel ){
                    if( this._model.selector ){
                        this._model.panel = this._model.selector;
                    }else{
                        this._model.panel = $(this._tpl);
                        this._model.panel.appendTo(document.body);
                    }
                }

                this.getHeader();
                this.getBody();
                this.getFooter();

                return this;
            }
        /**
         * 设置Panel的显示位置基于 _src 的左右上下
         * @method  positionWith
         * @param   {selector}      _src 
         */
        , positionWith:
            function( _src ){
                if( !( _src && _src.length ) ) return;
                this.getPanel().css( { 'left': '-9999px', 'top': '-9999px', 'display': 'block', 'position': 'absolute' } );
                var _soffset = _src.offset(), _swidth = _src.prop('offsetWidth'), _sheight = _src.prop('offsetHeight');
                var _lwidth = this.getPanel().prop('offsetWidth'), _lheight = this.getPanel().prop('offsetHeight');
                var _wwidth = $(window).width(), _wheight = $(window).height();
                var _stop = $(document).scrollTop(), _sleft = $(document).scrollLeft();
                var _x = _soffset.left + _sleft
                    , _y = _soffset.top + _sheight + 1;

                var _maxY = _stop + _wheight - _lheight, _minY = _stop;
                if( _y > _maxY ) _y = _soffset.top - _lheight - 1;
                if( _y < _minY ) _y = _stop;

                var _maxX = _sleft + _wwidth - _lwidth, _minX = _sleft;
                if( _x > _maxX ) _x = _sleft + _wwidth - _lwidth - 1;
                if( _x < _minX ) _x = _sleft;

                this.getPanel().css( { 'left': _x + 'px', 'top': _y + 'px' } );
            }
        /**
         * 显示 Panel
         * @method  show
         */
        , show:
            function(){
                this.getPanel().css( { 'z-index': ZINDEX_COUNT++ } ).show();
                this.focusButton();
            }
        /**
         * focus button
         * @method  focus button
         */
        , focusButton:
            function(){
                if( !this._model.panelfocusbutton() ) return;
                var _control = this.getPanel().find( 'input[eventtype=confirm], input[type=submit], button[eventtype=confirm], button[type=submit]' );
                !_control.length && ( _control = this.getPanel().find( 'input[eventtype=cancel], input[type=buton], button[eventtype=cancel], button[type=button]' ) )
                _control.length && $( _control[0] ).focus();
            }
        /**
         * 隐藏 Panel
         * @method hide
         */
        , hide:
            function(){
                this.getPanel().hide();
            }
        /**
         * 关闭 Panel
         * @method  close
         */
        , close:
            function(){
                JC.log( 'Panel._view.close()');
                this.getPanel().remove();
            }
        /**
         * 获取 Panel 的 selector 对象
         * @method  getPanel
         * @return  selector
         */
        , getPanel:
            function( _udata ){
                if( typeof _udata != 'undefined' ){
                    this.getPanel().html( _udata );
                }
                return this._model.panel;
            }
        /**
         * 获取或设置Panel的 header 内容, see <a href='JC.Panel.html#method_header'>Panel.header</a>
         * @method  getHeader
         * @param   {string}    _udata  
         * @return  string
         */
        , getHeader:
            function( _udata ){
                var _selector = this.getPanel().find('div.UPContent > div.hd');
                if( typeof _udata != 'undefined' ) this._model.headers = _udata;
                if( typeof this._model.headers != 'undefined' ){
                    if( !_selector.length ){
                        this.getPanel().find('div.UPContent > div.bd')
                            .before( _selector = $('<div class="hd">弹出框</div>') );
                    }
                    _selector.html( this._model.headers );
                    this._model.headers = undefined;
                }
                return _selector;
            }
        /**
         * 获取或设置Panel的 body 内容, see <a href='JC.Panel.html#method_body'>Panel.body</a>
         * @method  getBody
         * @param   {string}    _udata  
         * @return  string
         */
        , getBody:
            function( _udata ){
                var _selector = this.getPanel().find('div.UPContent > div.bd');
                if( typeof _udata != 'undefined' ) this._model.bodys = _udata;
                if( typeof this._model.bodys!= 'undefined' ){
                    _selector.html( this._model.bodys);
                    this._model.bodys = undefined;
                }
                return _selector;
            }
        /**
         * 获取或设置Panel的 footer 内容, see <a href='JC.Panel.html#method_footer'>Panel.footer</a>
         * @method  getFooter
         * @param   {string}    _udata  
         * @return  string
         */
        , getFooter:
            function( _udata ){
                var _selector = this.getPanel().find('div.UPContent > div.ft');
                if( typeof _udata != 'undefined' ) this._model.footers = _udata;
                if( typeof this._model.footers != 'undefined' ){
                    if( !_selector.length ){
                        this.getPanel().find('div.UPContent > div.bd')
                            .after( _selector = $('<div class="ft" ></div>'));
                    }
                    _selector.html( this._model.footers );
                    this._model.footers = undefined;
                }
                return _selector;
            }
        /**
         * 居中显示 Panel
         * @method  center
         */
        , center:
            function(){
                var _layout = this.getPanel(), _lw = _layout.width(), _lh = _layout.height()
                    , _x, _y, _winw = $(window).width(), _winh = $(window).height()
                    , _scrleft = $(document).scrollLeft(), _scrtop = $(document).scrollTop()
                    ;

                _layout.css( {'left': '-9999px', 'top': '-9999px'} ).show();
                _x = (_winw - _lw) / 2 + _scrleft; 
                _y = (_winh - _lh) / 2 + _scrtop;
                if( (_winh - _lh  - 100) > 300 ){
                    _y -= 100;
                }
                JC.log( (_winh - _lh / 2 - 100) )

                if( ( _y + _lh - _scrtop ) > _winh ){
                    JC.log('y overflow');
                    _y = _scrtop + _winh - _lh;

                }

                if( _y < _scrtop || _y < 0 ) _y = _scrtop;

                _layout.css( {left: _x+'px', top: _y+'px'} );

                JC.log( _lw, _lh, _winw, _winh );
            }
    };
    /**
     * Panel 的默认模板
     * @private
     */
    var _deftpl =
        [
        '<div class="UPanel" style="width: 600px;">'
        ,'    <div class="UPContent">'
        ,'        <div class="bd"></div>'
        ,'        <span class="close" eventtype="close"></span>'
        ,'    </div><!--end UPContent-->'
        ,'</div>'
        ].join('')
     /**
      * 隐藏或者清除所有 Panel
      * <h2>使用这个方法应当谨慎, 容易为DOM造成垃圾Panel</h2>
      * <br /><b>注意</b>: 这是个方法, 写成class是为了方便生成文档
      * @namespace  JC
      * @class      hideAllPanel
      * @constructor
      * @static
      * @param      {bool}      _isClose    从DOM清除/隐藏所有Panel(包刮 JC.alert, JC.confirm, JC.Panel, JC.Dialog)
      *                                     <br />, true = 从DOM 清除, false = 隐藏, 默认 = false( 隐藏 )
      * @example
      *     JC.hideAllPanel();         //隐藏所有Panel
      *     JC.hideAllPanel( true );   //从DOM 清除所有Panel
      */
     JC.hideAllPanel = 
         function( _isClose ){
            $('div.UPanel').each( function(){
                var _p = $(this), _ins = Panel.getInstance( _p );
                if( !_ins ) return;
                _ins.hide();
                _isClose && _ins.close();
            });
         };
    /**
     * 隐藏 或 从DOM清除所有 JC.alert/JC.confirm
     * <br /><b>注意, 这是个方法, 写 @class 属性是为了生成文档</b>
     * @namespace JC
     * @class hideAllPopup
     * @static
     * @constructor
     * @param   {bool}  _isClose    为真从DOM清除JC.alert/JC.confirm, 为假隐藏, 默认为false
     * @example
     *      JC.hideAllPopup();         //隐藏所有JC.alert, JC.confirm
     *      JC.hideAllPopup( true );   //从 DOM 清除所有 JC.alert, JC.confirm
     */
    JC.hideAllPopup =
        function( _isClose ){
            $('body > div.UPanelPopup_identifer').each( function(){
                var _p = $(this), _ins = Panel.getInstance( _p );
                if( !_ins ) return;
                _ins.hide();
                _isClose && _ins.close();
            });
        };

    /**
     * 监听Panel的所有点击事件
     * <br />如果事件源有 eventtype 属性, 则会触发eventtype的事件类型
     * @event   Panel click
     * @private
     */
    $(document).delegate( 'div.UPanel', 'click', function( _evt ){
        var _panel = $(this), _src = $(_evt.target || _evt.srcElement), _evtName;
        if( _src && _src.length && _src.is("[eventtype]") ){
            _evtName = _src.attr('eventtype');
            JC.log( _evtName, _panel.data('PanelInstace') );
            _evtName && _panel.data('PanelInstace') && _panel.data('PanelInstace').trigger( _evtName, _src, _evt );
        }
    });

    $(document).delegate('div.UPanel', 'click', function( _evt ){
        var _p = $(this), _ins = Panel.getInstance( _p );
        if( _ins && _ins.isClickClose() ){
            _evt.stopPropagation();
        }
    });

    $(document).on('click', function( _evt ){
        if( Panel.ignoreClick ) return;
        $('div.UPanel').each( function(){
            var _p = $(this), _ins = Panel.getInstance( _p );
            if( _ins && _ins.isClickClose() && _ins.layout() && _ins.layout().is(':visible') ){
                _ins.hide();
                _ins.close();
            }
        });
    });

    $(document).on('keyup', function( _evt ){
        var _kc = _evt.keyCode;
        switch( _kc ){
            case 27:
                {
                    JC.hideAllPanel( 1 );
                    break;
                }
        }
    });


}(jQuery));
