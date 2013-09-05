(function($){
    /**
     * 日期选择组件
     * <br />全局访问请使用 JC.Calendar 或 Calendar
     * <br />DOM 加载完毕后
     * , Calendar会自动初始化页面所有日历组件, input[type=text][datatype=date]标签
     * <br />Ajax 加载内容后, 如果有日历组件需求的话, 需要手动使用Calendar.init( _selector )
     * <br />_selector 可以是 新加载的容器, 也可以是新加载的所有input
     * <p><b>require</b>: <a href='window.jQuery.html'>jQuery</a>
     * <br /><b>require</b>: <a href='.window.html#method_cloneDate'>window.cloneDate</a>
     * <br /><b>require</b>: <a href='.window.html#method_parseISODate'>window.parseISODate</a>
     * <br /><b>require</b>: <a href='.window.html#method_formatISODate'>window.formatISODate</a>
     * <br /><b>require</b>: <a href='.window.html#method_maxDayOfMonth'>window.maxDayOfMonth</a>
     * <br /><b>require</b>: <a href='.window.html#method_isSameDay'>window.isSameDay</a>
     * <br /><b>require</b>: <a href='.window.html#method_isSameMonth'>window.isSameMonth</a>
     * </p>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc.openjavascript.org/docs_api/classes/JC.Calendar.html' target='_blank'>API docs</a>
     * | <a href='../../comps/Calendar/_demo/' target='_blank'>demo link</a></p>
     * <h2> 可用的html attribute, (input|button):(datatype|multidate)=(date|week|month|season) </h2> 
     * <dl>
     *      <dt>datatype</dt>
     *      <dd>
     *          声明日历控件的类型:
     *          <p><b>date:</b> 日期日历</p>
     *          <p><b>week:</b> 周日历</p>
     *          <p><b>month:</b> 月日历</p>
     *          <p><b>season:</b> 级日历</p>
     *      </dd>
     *
     *      <dt>multidate</dt>
     *      <dd>
     *          与 datatype 一样, 这个是扩展属性, 避免表单验证带来的逻辑冲突
     *      </dd>
     *
     *      <dt>calendarshow</dt>
     *      <dd>显示日历时的回调</dd>
     *
     *      <dt>calendarhide</dt>
     *      <dd>隐藏日历时的回调</dd>
     *
     *      <dt>calendarlayoutchange</dt>
     *      <dd>用户点击日历控件操作按钮后, 外观产生变化时触发的回调</dd>
     *
     *      <dt>calendarupdate</dt>
     *      <dd>
     *          赋值后触发的回调
     *          <dl>
     *              <dt>参数:</dt>
     *              <dd><b>_startDate:</b> 开始日期</dd>
     *              <dd><b>_endDate:</b> 结束日期</dd>
     *          </dl>
     *      </dd>
     *
     *      <dt>calendarclear</dt>
     *      <dd>清空日期触发的回调</dd>
     *
     *      <dt>minvalue</dt>
     *      <dd>日期的最小时间, YYYY-MM-DD</dd>
     *
     *      <dt>maxvalue</dt>
     *      <dd>日期的最大时间, YYYY-MM-DD</dd>
     *
     *      <dt>currentcanselect</dt>
     *      <dd>当前日期是否能选择, bool, default=true</dd>
     *
     *      <dt>multiselect (目前只对月份日历有效)</dt>
     *      <dd>是否为多选日历, bool, default=false</dd>
     *
     *      <dt>calendarupdatemultiselect</dt>
     *      <dd>
     *          多选日历赋值后触发的回调
     *          <dl>
     *              <dt>参数: _data:</dt>
     *              <dd>
     *                  [{"start": Date,"end": Date}[, {"start": Date,"end": Date}... ] ]
     *              </dd>
     *          </dl>
     *      </dd>
     * </dl>
     * @namespace JC
     * @class Calendar
     * @version dev 0.2, 2013-09-01 过程式转单例模式
     * @version dev 0.1, 2013-06-04
     * @author  qiushaowei   <suches@btbtd.org> | 75 team
     */
    window.Calendar = JC.Calendar = Calendar;
    function Calendar( _selector ){
        if( Calendar.getInstance( _selector ) ) return Calendar.getInstance( _selector );
        Calendar.getInstance( _selector, this );

        var _type = Calendar.type( _selector );

        JC.log( 'Calendar init:', _type, new Date().getTime() );

        switch( _type ){
            case 'week': 
                {
                    this._model = new Calendar.WeekModel( _selector );
                    this._view = new Calendar.WeekView( this._model );
                    break;
                }
            case 'month': 
                {
                    this._model = new Calendar.MonthModel( _selector );
                    this._view = new Calendar.MonthView( this._model );
                    break;
                }
            case 'season': 
                {
                    this._model = new Calendar.SeasonModel( _selector );
                    this._view = new Calendar.SeasonView( this._model );
                    break;
                }
            default:
                {
                    this._model = new Calendar.Model( _selector );
                    this._view = new Calendar.View( this._model );
                    break;
                }
        }

        this._init();
    }
    
    Calendar.prototype = {
        /**
         * 内部初始化函数
         * @method _init
         * @private
         */
        _init:
            function(){
                var _p = this;

                _p._initHanlderEvent();

                $( [ _p._view, _p._model ] ).on('BindEvent', function( _evt, _evtName, _cb ){
                    _p.on( _evtName, _cb );
                });

                $([ _p._view, _p._model ] ).on('TriggerEvent', function( _evt, _evtName ){
                    var _data = sliceArgs( arguments ).slice(2);
                    _p.trigger( _evtName, _data );
                });

                _p._model.init();
                _p._view.init();

                return _p;
            }    
        /**
         * 初始化相关操作事件
         * @method  _initHanlderEvent
         * @private
         */
        , _initHanlderEvent:
            function(){
                var _p = this;

                _p.on( Calendar.Model.INITED, function( _evt ){
                    _p._model.calendarinited()
                        && _p._model.calendarinited().call( _p._model.selector(), _p._model.layout(), _p );
                });

                _p.on( Calendar.Model.SHOW, function( _evt ){
                    _p._model.calendarshow()
                        && _p._model.calendarshow().call( _p._model.selector(), _p._model.selector(), _p );
                });

                _p.on( Calendar.Model.HIDE, function( _evt ){
                    _p._model.calendarhide()
                        && _p._model.calendarhide().call( _p._model.selector(), _p._model.selector(), _p );
                });

                _p.on( Calendar.Model.UPDATE, function( _evt ){
                    if( !_p._model.selector() ) return;

                    _p._model.selector().blur();
                    _p._model.selector().trigger('change');

                    var _data = [], _v = _p._model.selector().val().trim(), _startDate, _endDate, _tmp, _item, _tmpStart, _tmpEnd;

                    if( _v ){
                        _tmp = _v.split( ',' );
                        for( var i = 0, j = _tmp.length; i < j; i++ ){
                            _item = _tmp[i].replace( /[^\d]/g, '' );
                            if( _item.length == 16 ){
                                _tmpStart = parseISODate( _item.slice( 0, 8 ) );
                                _tmpEnd = parseISODate( _item.slice( 8 ) );
                            }else if( _item.length == 8 ){
                                _tmpStart = parseISODate( _item.slice( 0, 8 ) );
                                _tmpEnd = cloneDate( _tmpStart );
                            }
                            if( i === 0 ){
                                _startDate = cloneDate( _tmpStart );
                                _endDate = cloneDate( _tmpEnd );
                            }
                            _data.push( {'start': _tmpStart, 'end': _tmpEnd } );
                        }
                    }

                    _p._model.calendarupdate()
                        && _p._model.calendarupdate().apply( _p._model.selector(), [ _startDate, _endDate ] );

                    _p._model.multiselect()
                        && _p._model.calendarupdatemultiselect()
                        && _p._model.calendarupdatemultiselect().call( _p._model.selector(), _data, _p );
                });

                _p.on( Calendar.Model.CLEAR, function( _evt ){
                    _p._model.calendarclear()
                        && _p._model.calendarclear().call( _p._model.selector(), _p._model.selector(), _p );
                });

                _p.on( Calendar.Model.CANCEL, function( _evt ){
                    _p._model.calendarcancel()
                        && _p._model.calendarcancel().call( _p._model.selector(), _p._model.selector(), _p );
                });

                _p.on( Calendar.Model.LAYOUT_CHANGE, function( _evt ){
                    _p._model.calendarlayoutchange()
                        && _p._model.calendarlayoutchange().call( _p._model.selector(), _p._model.selector(), _p );
                });

                _p.on( Calendar.Model.UPDATE_MULTISELECT, function( _evt ){
                    _p._model.multiselect()
                        && _p._model.calendarupdatemultiselect()
                        && _p._model.calendarupdatemultiselect().call( _p._model.selector(), _p._model.selector(), _p );
                });

                return _p;
            }
        /**
         * 显示 Calendar
         * @method  show
         * @return  CalendarInstance
         */
        , show: 
            function(){ 
                Calendar.hide(); 
                Calendar.lastIpt = this._model.selector();
                this._view.show(); 
                this.trigger( Calendar.Model.SHOW );
                return this; 
            }
        /**
         * 隐藏 Calendar
         * @method  hide
         * @return  CalendarInstance
         */
        , hide: function(){ 
            this._view.hide(); 
            this.trigger( Calendar.Model.HIDE );
            this.selector() && this.selector().blur();
            return this; 
        }
        /**
         * 获取 显示 Calendar 的触发源选择器, 比如 a 标签
         * @method  selector
         * @return  selector
         */ 
        , selector: function(){ return this._model.selector(); }
        /**
         * 获取 Calendar 外观的 选择器
         * @method  layout
         * @return  selector
         */
        , layout: function(){ return this._model.layout(); }
        /**
         * 使用 jquery on 绑定事件
         * @method  {string}    on
         * @param   {string}    _evtName
         * @param   {function}  _cb
         * @return  CalendarInstance
         */
        , on: function( _evtName, _cb ){ $(this).on(_evtName, _cb ); return this;}
        /**
         * 使用 jquery trigger 绑定事件
         * @method  {string}    trigger
         * @param   {string}    _evtName
         * @return  CalendarInstance
         */
        , trigger: function( _evtName, _data ){ $(this).trigger( _evtName, _data ); return this;}
        /**
         * 用户操作日期控件时响应改变
         * @method  updateLayout
         */
        , updateLayout:
            function(){
                this._view.updateLayout();
                return this;
            }
        /**
         * 切换到不同日期控件源时, 更新对应的控件源
         * @method  updateSelector
         * @param   {selector}      _selector
         */
        , updateSelector:
            function( _selector ){
                Calendar.lastIpt = _selector;
                this._model && this._model.selector( _selector );
                return this;
            }
        /**
         * 用户改变年份时, 更新到对应的年份
         * @method  updateYear
         * @param   {int}   _offset
         */
        , updateYear:
            function( _offset ){
                this._view && this._view.updateYear( _offset );
                this.trigger( Calendar.Model.LAYOUT_CHANGE );
                return this;
            }
        /**
         * 用户改变月份时, 更新到对应的月份
         * @method  updateMonth
         * @param   {int}   _offset
         */
        , updateMonth:
            function( _offset ){
                this._view && this._view.updateMonth( _offset );
                this.trigger( Calendar.Model.LAYOUT_CHANGE );
                return this;
            }
        /**
         * 把选中的值赋给控件源
         * <br />用户点击日期/确定按钮
         * @method  updateSelected
         * @param   {selector}  _userSelectedItem
         */
        , updateSelected:
            function( _userSelectedItem ){
                JC.log( 'JC.Calendar: updateSelector', new Date().getTime() );
                this._view && this._view.updateSelected( _userSelectedItem );
                return this;
            }
        /**
         * 显示日历外观到对应的控件源 
         * @method  updatePosition
         */
        , updatePosition:
            function(){
                this._view && this._view.updatePosition();
                return this;
            }
        /**
         * 清除控件源内容
         * @method  clear
         */
        , clear:
            function(){
                var _isEmpty = !this._model.selector().val().trim();
                this._model && this._model.selector().val('');
                !_isEmpty && this.trigger( Calendar.Model.CLEAR );
                return this;
            }
        /**
         * 用户点击取消按钮时隐藏日历外观
         * @method  cancel
         */
        , cancel:
            function(){
                this.trigger( Calendar.Model.CANCEL );
                this._view && this._view.hide();
                return this;
            }
        /***
         * 返回日历外观是否可见
         * @method  visible
         * @return  bool
         */
        , visible:
            function(){
                var _r, _tmp;
                this._model 
                    && ( _tmp = this._model.layout() ) 
                    && ( _r = _tmp.is(':visible') )
                    ;
                return _r;
            }
        /**
         * 获取控件源的初始日期对象
         * @method  defaultDate
         * @param   {selector}  _selector
         */
        , defaultDate:
            function( _selector ){
                return this._model.defaultDate( _selector );
            }
    }
    /**
     * 获取或设置 Calendar 的实例
     * @method getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {Calendar instance}
     */
    Calendar.getInstance =
        function( _selector, _setter ){
            typeof _selector == 'string' && !/</.test( _selector ) && ( _selector = $(_selector) );
            if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
            var _type = Calendar.type( _selector );
            typeof _setter != 'undefined' && ( Calendar._ins[ _type ] = _setter );
            Calendar._ins[ _type ] && Calendar._ins[ _type ].updateSelector( _selector );
            return Calendar._ins[ _type ];
        };
    /**
     * 保存所有类型的 Calendar 日期实例 
     * <br />目前有 date, week, month, season 四种类型的实例
     * <br />每种类型都是单例模式
     * @prototype   _ins
     * @type        object
     * @default     empty
     * @private
     * @static
     */
    Calendar._ins = {};
    /**
     * 获取控件源的实例类型
     * <br />目前有 date, week, month, season 四种类型的实例
     * @method  type
     * @param   {selector}  _selector
     * @return  string
     * @static
     */
    Calendar.type =
        function( _selector ){
            _selector = $(_selector);
            var _r, _type = $.trim(_selector.attr('multidate') || '').toLowerCase() 
                || $.trim(_selector.attr('datatype') || '').toLowerCase();
            switch( _type ){
                case 'week': 
                case 'month': 
                case 'season': 
                    {
                        _r = _type;
                        break;
                    }
                default: _r = 'date'; break;
            }
            return _r;
        };
    /** 
     * 判断选择器是否为日历组件的对象
     * @method  isCalendar
     * @static
     * @param   {selector}  _selector
     * return   bool
     */
    Calendar.isCalendar = 
        function( _selector ){
            _selector = $(_selector);
            var _r = 0;

            if( _selector.length ){
                if( _selector.hasClass('UXCCalendar_btn') ) _r = 1;
                if( _selector.prop('nodeName') 
                        && _selector.attr('datatype')
                        && ( _selector.prop('nodeName').toLowerCase()=='input' || _selector.prop('nodeName').toLowerCase()=='button' )
                        && ( _selector.attr('datatype').toLowerCase()=='date' 
                                || _selector.attr('datatype').toLowerCase()=='week' 
                                || _selector.attr('datatype').toLowerCase()=='month' 
                                || _selector.attr('datatype').toLowerCase()=='season' 
                                || _selector.attr('datatype').toLowerCase()=='year' 
                                || _selector.attr('datatype').toLowerCase()=='daterange' 
                            )) _r = 1;
                if( _selector.prop('nodeName') 
                        && _selector.attr('multidate')
                        && ( _selector.prop('nodeName').toLowerCase()=='input' 
                            || _selector.prop('nodeName').toLowerCase()=='input' )
                        ) _r = 1;
            }

            return _r;
        };
    /**
     * 请使用 isCalendar, 这个方法是为了向后兼容
     */
    Calendar.isCalendarElement = function( _selector ){ return Calendar.isCalendar( _selector ); };
    /**
     * 弹出日期选择框
     * @method pickDate
     * @static
     * @param   {selector}  _selector 需要显示日期选择框的input[text]   
     * @example
            <dl>
                <dd>
                    <input type="text" name="date6" class="manualPickDate" value="20110201" />
                    manual JC.Calendar.pickDate
                </dd>
                <dd>
                    <input type="text" name="date7" class="manualPickDate" />
                    manual JC.Calendar.pickDate
                </dd>
            </dl>
            <script>
                $(document).delegate('input.manualPickDate', 'focus', function($evt){
                JC.Calendar.pickDate( this );
                });
            </script>
     */
    Calendar.pickDate =  
        function( _selector ){ 
            _selector = $( _selector );
            if( !(_selector && _selector.length) ) return;

            var _ins, _isIgnore = _selector.is('[ignoreprocess]');

            _selector.attr('ignoreprocess', true);
            _selector.blur();
            !_isIgnore && _selector.removeAttr('ignoreprocess');

            _ins = Calendar.getInstance( _selector );
            !_ins && ( _ins = new Calendar( _selector ) );
            _ins.show();
            return;
        }; 
    /**
     * 设置是否在 DOM 加载完毕后, 自动初始化所有日期控件
     * @property    autoInit
     * @default true
     * @type    {bool}
     * @static
            <script>JC.Calendar.autoInit = true;</script>
     */
    Calendar.autoInit =  true;
    /**
     * 设置默认显示的年份数, 该数为前后各多少年 默认为前后各10年
     * @property    defaultDateSpan
     * @type        {int}
     * @default     20
     * @static
            <script>JC.Calendar.defaultDateSpan = 20;</script>
     */
    Calendar.defaultDateSpan = 20;
    /**
     * 最后一个显示日历组件的文本框
     * @property  lastIpt
     * @type    selector
     * @static
     */
    Calendar.lastIpt = null;
    /**
     * 自定义日历组件模板
     * <p>默认模板为_logic.tpl</p>
     * <p>如果用户显示定义JC.Calendar.tpl的话, 将采用用户的模板</p>
     * @property    tpl
     * @type    {string}
     * @default empty
     * @static
     */
    Calendar.tpl = '';
    /**
     * 初始化外观后的回调函数
     * @property layoutInitedCallback
     * @type    function
     * @static
     * @default null
     */
    Calendar.layoutInitedCallback = null;
    /**
     * 显示为可见时的回调
     * @property layoutShowCallback
     * @type    function
     * @static
     * @default null
     */
    Calendar.layoutShowCallback = null;
    /**
     * 日历隐藏后的回调函数
     * @property layoutHideCallback
     * @type    function
     * @static
     * @default null
     */
    Calendar.layoutHideCallback = null;
    /**
     * DOM 点击的过滤函数
     * <br />默认 dom 点击时, 判断事件源不为 input[datatype=date|daterange] 会隐藏 Calendar
     * <br /> 通过该回调可自定义过滤, 返回 false 不执行隐藏操作
     * @property domClickFilter
     * @type    function
     * @static
     * @default null
     */
    Calendar.domClickFilter = null;
    /**
     * 隐藏日历组件
     * @method  hide
     * @static
     * @example
            <script>JC.Calendar.hide();</script>
     */
    Calendar.hide =
        function(){

            for( var k in Calendar._ins ){
                Calendar._ins[ k] 
                    && Calendar._ins[ k].visible()
                    && Calendar._ins[ k].hide()
                    ;
            }
        };
    /**
     * 获取初始日期对象
     * <p style="bold">这个方法将要废除, 请使用 instance.defaultDate()</p>
     * @method  getDate
     * @static
     * @param   {selector}  _selector   显示日历组件的input
     * return   { date: date, minvalue: date|null, maxvalue: date|null, enddate: date|null }
     */
    Calendar.getDate =
        function( _selector ){
            return Calendar.getInstance( _selector ).defaultDate();
        };
    /**
     * 每周的中文对应数字
     * @property    cnWeek
     * @type    string
     * @static
     * @default 日一二三四五六 
     */
    Calendar.cnWeek = "日一二三四五六";
    /**
     * 100以内的中文对应数字
     * @property    cnUnit
     * @type    string
     * @static
     * @default 十一二三四五六七八九    
     */
    Calendar.cnUnit = "十一二三四五六七八九";
    /**
     * 转换 100 以内的数字为中文数字
     * @method  getCnNum
     * @static
     * @param   {int}   _num
     * @return  string
     */
    Calendar.getCnNum =
        function ( _num ){
            var _r = Calendar.cnUnit.charAt( _num % 10 );
            _num > 10 && ( _r = (_num % 10 !== 0 ? Calendar.cnUnit.charAt(0) : '') + _r );
            _num > 19 && ( _r = Calendar.cnUnit.charAt( Math.floor( _num / 10 ) ) + _r );
            return _r;
        };
    /**
     * 设置日历组件的显示位置
     * @method  position
     * @static
     * @param   {selector}  _ipt    需要显示日历组件的文本框
     */
    Calendar.position =
        function( _ipt ){
            Calendar.getInstance( _ipt )
                && Calendar.getInstance( _ipt ).updatePosition();
        };
    /**
     * 这个方法后续版本不再使用, 请使用 Calendar.position
     */
    Calendar.setPosition = Calendar.position;
    /**
     * 初始化日历组件的触发按钮
     * @method  _logic.initTrigger
     * @param   {selector}      _selector   
     * @private
     */
    Calendar.initTrigger = 
        function( _selector ){
           _selector.each( function(){
                var _p = $(this), _nodeName = (_p.prop('nodeName')||'').toLowerCase();

                if( _nodeName != 'input' ){ 
                    Calendar.initTrigger( _selector.find( $('input[type=text]') ) ); 
                    return; 
                }

                if( !($.trim( _p.attr('datatype') || '').toLowerCase() == 'date' 
                        || $.trim( _p.attr('multidate') || '')
                        || $.trim( _p.attr('datatype') || '').toLowerCase() == 'daterange') ) return;

                var _btn = _p.find( '+ input.UXCCalendar_btn' );
                if( !_btn.length ){
                    _p.after( _btn = $('<input type="button" class="UXCCalendar_btn"  />') );
                }
                _btn.data( Calendar.Model.INPUT, _p );
            });
        };
    /**
     * 克隆 Calendar 默认 Model, View 的原型属性
     * @method  clone
     * @param   {NewModel}  _model
     * @param   {NewView}   _view
     */
    Calendar.clone =
        function( _model, _view ){
            var _k;
            for( _k in Model.prototype ) _model.prototype[_k] = Model.prototype[_k];
            for( _k in View.prototype ) _view.prototype[_k] = View.prototype[_k];
        };
    
    function Model( _selector ){
        this._selector = _selector;
    }

    Calendar.Model = Model;
    Calendar.Model.INPUT = 'CalendarInput';

    Calendar.Model.INITED = 'CalendarInited';
    Calendar.Model.SHOW = 'CalendarShow';
    Calendar.Model.HIDE = 'CalendarHide';
    Calendar.Model.UPDATE = 'CalendarUpdate';
    Calendar.Model.CLEAR = 'CalendarClear';
    Calendar.Model.CANCEL = 'CalendarCancel';
    Calendar.Model.LAYOUT_CHANGE = 'CalendarLayoutChange';
    Calendar.Model.UPDATE_MULTISELECT = 'CalendarUpdateMultiSelect';
    
    Model.prototype = {
        init:
            function(){
                return this;
            }

        , selector: 
            function( _setter ){ 
                typeof _setter != 'undefined' && ( this._selector = _setter );
                return this._selector; 
            }
        , layout: 
            function(){
                var _r = $('#UXCCalendar');

                if( !_r.length ){
                    _r = $( Calendar.tpl || this.tpl ).hide();
                    _r.attr('id', 'UXCCalendar').hide().appendTo( document.body );
                    var _month = $( [
                                '<option value="0">一月</option>'
                                , '<option value="1">二月</option>'
                                , '<option value="2">三月</option>'
                                , '<option value="3">四月</option>'
                                , '<option value="4">五月</option>'
                                , '<option value="5">六月</option>'
                                , '<option value="6">七月</option>'
                                , '<option value="7">八月</option>'
                                , '<option value="8">九月</option>'
                                , '<option value="9">十月</option>'
                                , '<option value="10">十一月</option>'
                                , '<option value="11">十二月</option>'
                            ].join('') ).appendTo( _r.find('select.UMonth' ) );
                 }
                return _r;
            }
        , startYear:
            function( _dateo ){
                var _span = Calendar.defaultDateSpan, _r = _dateo.date.getFullYear();
                this.selector().is('[calendardatespan]') 
                    && ( _span = parseInt( this.selector().attr('calendardatespan'), 10 ) );
                return _r - _span;
            }
        , endYear:
            function( _dateo ){
                var _span = Calendar.defaultDateSpan, _r = _dateo.date.getFullYear();
                this.selector().is('[calendardatespan]') 
                    && ( _span = parseInt( this.selector().attr('calendardatespan'), 10 ) );
                return _r + _span;
            }
        , currentcanselect:
            function(){
                var _r = true;
                this.selector().is('[currentcanselect]') 
                    && ( currentcanselect = parseBool( this.selector().attr('currentcanselect') ) );
                return _r;
            }
        , year: 
            function(){
                return parseInt( this.layout().find('select.UYear').val(), 10 ) || 1;
            }
        , month:
            function(){
                return parseInt( this.layout().find('select.UMonth').val(), 10 ) || 0;
            }
        , day:
            function(){
                var _tmp, _date = new Date();
                _tmp = this.layout().find('td.cur > a[date], td.cur > a[dstart]');
                if( _tmp.length ){
                    _date.setTime( _tmp.attr('date') || _tmp.attr('dstart') );
                }
                JC.log( 'dddddd', _date.getDate() );
                return _date.getDate();
            }
        , defaultDate:
            function(){
                var _p = this, _r = { 
                        date: null
                        , minvalue: null
                        , maxvalue: null
                        , enddate: null 
                        , multidate: null
                    }
                    ;
                _p.selector() &&
                    (
                        _r = _p.multiselect() 
                            ? _p.defaultMultiselectDate( _r ) 
                            : _p.defaultSingleSelectDate( _r )
                    );

                _r.minvalue = parseISODate( _p.selector().attr('minvalue') );
                _r.maxvalue = parseISODate( _p.selector().attr('maxvalue') );

                return _r;
            }
        , defaultSingleSelectDate:
            function( _r ){
                var _p = this
                    , _selector = _p.selector()
                    , _tmp
                    ;

                if( _tmp = parseISODate( _selector.val() ) ) _r.date = _tmp;
                else{
                    if( _selector.val() && (_tmp = _selector.val().replace( /[^\d]/g, '' ) ).length == 16 ){
                        _r.date = parseISODate( _tmp.slice( 0, 8 ) );
                        _r.enddate = parseISODate( _tmp.slice( 8 ) );
                    }else{
                        _tmp = new Date();
                        _r.date = new Date( _tmp.getFullYear(), _tmp.getMonth(), _tmp.getDate() );
                    }
                }
                return _r;
            }
        , defaultMultiselectDate:
            function( _r ){
                var _p = this;
                return _r;
            }
        , layoutDate:
            function(){
                return this.multiselect() ? this.multiLayoutDate() : this.singleLayoutDate();
            }
        , singleLayoutDate:
            function(){
                var _p = this
                    , _dateo = _p.defaultDate()
                    , _day = this.day()
                    , _max;
                _dateo.date.setDate( 1 );
                _dateo.date.setFullYear( this.year() );
                _dateo.date.setMonth( this.month() );
                _max = maxDayOfMonth( _dateo.date );
                _day > _max && ( _day = _max );
                _dateo.date.setDate( _day );
                return _dateo;
            }
        , multiLayoutDate:
            function(){
                JC.log( 'Calendar.Model multiLayoutDate', new Date().getTime() );
            }
        , selectedDate:
            function(){
                var _r, _tmp, _item;
                _tmp = this.layout().find('td.cur');
                _tmp.length 
                    && !_tmp.hasClass( 'unable' )
                    && ( _item = _tmp.find('a[date]') )
                    && ( _r = new Date(), _r.setTime( _item.attr('date') ) )
                    ;
                return _r;
            }
        , multiselectDate:
            function(){
                var _r = [];
                return _r;
            }
        , calendarinited:
            function(){
                var _ipt = this.selector(), _cb = Calendar.layoutInitedCallback, _tmp;
                _ipt && _ipt.attr('calendarinited') 
                    && ( _tmp = window[ _ipt.attr('calendarinited') ] )
                    && ( _cb = _tmp );
                return _cb;
            }
        , calendarshow:
            function(){
                var _ipt = this.selector(), _cb = Calendar.layoutShowCallback, _tmp;
                _ipt && _ipt.attr('calendarshow') 
                    && ( _tmp = window[ _ipt.attr('calendarshow') ] )
                    && ( _cb = _tmp );
                return _cb;
            }
        , calendarhide:
            function(){
                var _ipt = this.selector(), _cb = Calendar.layoutHideCallback, _tmp;
                _ipt && _ipt.attr('calendarhide') 
                    && ( _tmp = window[ _ipt.attr('calendarhide') ] )
                    && ( _cb = _tmp );
                return _cb;
            }
        , calendarupdate:
            function( _data ){
                var _ipt = this.selector(), _cb, _tmp;
                _ipt && _ipt.attr('calendarupdate') 
                    && ( _tmp = window[ _ipt.attr('calendarupdate') ] )
                    && ( _cb = _tmp );
                return _cb;
            }
        , calendarclear:
            function(){
                var _ipt = this.selector(), _cb, _tmp;
                _ipt && _ipt.attr('calendarclear') 
                    && ( _tmp = window[ _ipt.attr('calendarclear') ] )
                    && ( _cb = _tmp );
                return _cb;
            }
        , calendarcancel:
            function(){
                var _ipt = this.selector(), _cb, _tmp;
                _ipt && _ipt.attr('calendarcancel') 
                    && ( _tmp = window[ _ipt.attr('calendarcancel') ] )
                    && ( _cb = _tmp );
                return _cb;
            }
        , calendarlayoutchange:
            function(){
                var _ipt = this.selector(), _cb, _tmp;
                _ipt && _ipt.attr('calendarlayoutchange') 
                    && ( _tmp = window[ _ipt.attr('calendarlayoutchange') ] )
                    && ( _cb = _tmp );
                return _cb;
            }
        , multiselect:
            function(){
                var _r;
                this.selector().is('[multiselect]')
                    && ( _r = parseBool( this.selector().attr('multiselect') ) );
                return _r;
            }
        , calendarupdatemultiselect:
            function( _data ){
                var _ipt = this.selector(), _cb, _tmp;
                _ipt && _ipt.attr('calendarupdatemultiselect') 
                    && ( _tmp = window[ _ipt.attr('calendarupdatemultiselect') ] )
                    && ( _cb = _tmp );
                return _cb;
            }

        , tpl:
            [
            '<div id="UXCCalendar" class="UXCCalendar">'
            ,'    <div class="UHeader">'
            ,'        <select class="UYear"></select>'
            ,'        <img class="UImg yearctl" align="absMiddle" usemap="#UXCCalendar_Year" />'
            ,'        <map name="UXCCalendar_Year"><area shape="rect" coords="0,0,13,8" href="#" action="up"><area shape="rect" coords="0,10,13,17" href="#" action="down"></map>'
            ,'        <select class="UMonth"></select>'
            ,'        <img class="UImg monthctl" align="absMiddle" usemap="#UXCCalendar_Month"  />'
            ,'        <map name="UXCCalendar_Month"><area shape="rect" coords="0,0,13,8" href="#" action="up"><area shape="rect" coords="0,10,13,17" href="#" action="down"></map>'
            ,'    </div>'
            ,'    <table class="UTable">'
            ,'        <thead>'
            ,'            <tr>'
            ,'                <th>一</th>'
            ,'                <th>二</th>'
            ,'                <th>三</th>'
            ,'                <th>四</th>'
            ,'                <th>五</th>'
            ,'                <th>六</th>'
            ,'                <th>日</th>'
            ,'            </tr>'
            ,'        </thead>'
            ,'   </table>'
            ,'   <table class="UTable UTableBorder">'
            ,'        <tbody>'
            ,'           <!--<tr>'
            ,'                <td class="cur"><a href="#">2</a></td>'
            ,'                <td class="unable"><a href="#">2</a></td>'
            ,'                <td class="weekend cur"><a href="#">6</a></td>'
            ,'                <td class="weekend hover"><a href="#">13</a></td>'
            ,'                <td class="weekend other"><a href="#">41</a></td>'
            ,'                <td class="weekend other"><a href="#">42</a></td>'
            ,'            </tr>-->'
            ,'        </tbody>'
            ,'    </table>'
            ,'    <div class="UFooter">'
            ,'        <button type="button" class="UConfirm">确定</button>'
            ,'        <button type="button" class="UClear">清空</button>'
            ,'        <button type="button" class="UCancel">取消</button>'
            ,'    </div>'
            ,'</div>'
            ].join('')

    };
    
    function View( _model ){
        this._model = _model;
    }
    Calendar.View = View;
    
    View.prototype = {
        init:
            function() {
                return this;
            }

        , hide:
            function(){
                this._model.layout().hide();
            }

        , show:
            function(){
                var _dateo = this._model.defaultDate();
                JC.log( 'Calendar.View: show', new Date().getTime(), formatISODate( _dateo.date ) );

                this._buildLayout( _dateo );
                this._buildDone();
            }
        , updateLayout:
            function( _dateo ){
                typeof _dateo == 'undefined' && ( _dateo = this._model.layoutDate() );
                this._buildLayout( _dateo );
                this._buildDone();
            }
        , updateYear:
            function( _offset ){
                if( typeof _offset == 'undefined' || _offset == 0 ) return;

                this._model.multiselect() 
                    ? this.updateMultiYear( _offset )
                    : this.updateSingleYear( _offset )
                    ;

            }
        , updateSingleYear:
            function( _offset ){
                var _dateo = this._model.layoutDate(), _day = _dateo.date.getDate(), _max;
                _dateo.date.setDate( 1 );
                _dateo.date.setFullYear( _dateo.date.getFullYear() + _offset );
                _max = maxDayOfMonth( _dateo.date );
                _day > _max && ( _day = _max );
                _dateo.date.setDate( _day );
                this._buildLayout( _dateo );
                this._buildDone();
            }
        , updateMultiYear:
            function( _offset ){
            }
        , updateMonth:
            function( _offset ){
                if( typeof _offset == 'undefined' || _offset == 0 ) return;
                var _dateo = this._model.layoutDate(), _day = _dateo.date.getDate(), _max;
                _dateo.date.setDate( 1 );
                _dateo.date.setMonth( _dateo.date.getMonth() + _offset );
                _max = maxDayOfMonth( _dateo.date );
                _day > _max && ( _day = _max );
                _dateo.date.setDate( _day );
                this._buildLayout( _dateo );
                this._buildDone();
                //JC.log( 'updateMonth:', _offset, formatISODate( _dateo.date ) );
            }
        , updateSelected:
            function( _userSelectedItem ){
                var _p = this, _date, _tmp;
                if( !_userSelectedItem ){
                    _date = this._model.selectedDate(); 
                }else{
                    _userSelectedItem = $( _userSelectedItem );
                    _tmp = getJqParent( _userSelectedItem, 'td' );
                    if( _tmp && _tmp.hasClass('unable') ) return;
                    _date = new Date();
                    _date.setTime( _userSelectedItem.attr('date') );
                }
                if( !_date ) return;

                _p._model.selector().val( formatISODate( _date ) );

                $(_p).trigger( 'TriggerEvent', [ JC.Calendar.Model.UPDATE, 'date', _date, _date ] );
                Calendar.hide();
            }
        , updatePosition:
            function(){
                var _p = this, _ipt = _p._model.selector(), _layout = _p._model.layout();
                if( !( _ipt && _layout && _ipt.length && _layout.length ) ) return;
                _layout.css( {'left': '-9999px', 'top': '-9999px', 'z-index': ZINDEX_COUNT++ } ).show();
                var _lw = _layout.width(), _lh = _layout.height()
                    , _iw = _ipt.width(), _ih = _ipt.height(), _ioset = _ipt.offset()
                    , _x, _y, _winw = $(window).width(), _winh = $(window).height()
                    , _scrtop = $(document).scrollTop()
                    ;

                _x = _ioset.left; _y = _ioset.top + _ih + 5;

                if( ( _y + _lh - _scrtop ) > _winh ){
                    JC.log('y overflow');
                    _y = _ioset.top - _lh - 3;

                    if( _y < _scrtop ) _y = _scrtop;
                }

                _layout.css( {left: _x+'px', top: _y+'px'} );

                JC.log( _lw, _lh, _iw, _ih, _ioset.left, _ioset.top, _winw, _winh );
                JC.log( _scrtop, _x, _y );
            }
        , _buildDone:
            function(){
                this.updatePosition();
                //this._model.selector().blur();
                $(this).trigger( 'TriggerEvent', [ Calendar.Model.INITED ] );
            }
        , _buildLayout:
            function( _dateo ){
                this._model.layout();

                if( !( _dateo && _dateo.date ) ) return;
                this._buildHeader( _dateo );
                this._buildBody( _dateo );
                this._buildFooter( _dateo );
            }
        , _buildHeader:
            function( _dateo ){
                var _p = this
                    , _layout = _p._model.layout()
                    , _ls = []
                    , _tmp
                    , _selected = _selected = _dateo.date.getFullYear()
                    , _startYear = _p._model.startYear( _dateo )
                    , _endYear = _p._model.endYear( _dateo )
                    ;
                JC.log( _startYear, _endYear );
                for( var i = _startYear; i <= _endYear; i++ ){
                    _ls.push( printf( '<option value="{0}"{1}>{0}</option>', i, i === _selected ? ' selected' : '' ) );
                }
                $( _ls.join('') ).appendTo( _layout.find('select.UYear').html('') );

                $( _layout.find('select.UMonth').val( _dateo.date.getMonth() ) );
            }
        , _buildBody:
            function( _dateo ){
                var _p = this, _layout = _p._model.layout();
                var _maxday = maxDayOfMonth( _dateo.date ), _weekday = _dateo.date.getDay() || 7
                    , _sumday = _weekday + _maxday, _row = 6, _ls = [], _premaxday, _prebegin
                    , _tmp, i, _class;

                var _beginDate = new Date( _dateo.date.getFullYear(), _dateo.date.getMonth(), 1 );
                var _beginWeekday = _beginDate.getDay() || 7;
                if( _beginWeekday < 2 ){
                    _beginDate.setDate( -( _beginWeekday - 1 + 6 ) );
                }else{
                    _beginDate.setDate( -( _beginWeekday - 2 ) );
                }
                var today = new Date();

                if( _dateo.maxvalue && !_p._model.currentcanselect() ){
                    _dateo.maxvalue.setDate( _dateo.maxvalue.getDate() - 1 );
                }

                _ls.push('<tr>');
                for( i = 1; i <= 42; i++ ){
                    _class = [];
                    if( _beginDate.getDay() === 0 || _beginDate.getDay() == 6 ) _class.push('weekend');
                    if( !isSameMonth( _dateo.date, _beginDate ) ) _class.push( 'other' );
                    if( _dateo.minvalue && _beginDate.getTime() < _dateo.minvalue.getTime() ) 
                        _class.push( 'unable' );
                    if( _dateo.maxvalue && _beginDate.getTime() > _dateo.maxvalue.getTime() ) 
                        _class.push( 'unable' );

                    if( isSameDay( _beginDate, today ) ) _class.push( 'today' );
                    if( isSameDay( _dateo.date, _beginDate ) ) _class.push( 'cur' );

                    _ls.push( '<td class="', _class.join(' '),'">'
                            ,'<a href="javascript:" date="', _beginDate.getTime(),'" title="'+formatISODate(_beginDate)+'" >'
                            , _beginDate.getDate(), '</a></td>' );
                    _beginDate.setDate( _beginDate.getDate() + 1 );
                    if( i % 7 === 0 && i != 42 ) _ls.push( '</tr><tr>' );
                }
                _ls.push('</tr>');
                _layout.find('table.UTableBorder tbody' ).html( $( _ls.join('') ) );
            }
        , _buildFooter:
            function( _dateo ){
            }
    };

    var staticMethod = {
    };
    /**
     * 捕获用户更改年份 
     * <p>监听 年份下拉框</p>
     * @event year change
     * @private
     */
    $(document).delegate( 'body > div.UXCCalendar select.UYear, #UXCCalendar select.UMonth', 'change', function( $evt ){
        Calendar.getInstance( Calendar.lastIpt )
            && Calendar.getInstance( Calendar.lastIpt ).updateLayout();
    });
    /**
     * 捕获用户更改年份 
     * <p>监听 下一年按钮</p>
     * @event next year
     * @private
     */
    $(document).delegate( 'body > div.UXCCalendar button.UNextYear', 'click', function( $evt ){
        Calendar.getInstance( Calendar.lastIpt )
            && Calendar.getInstance( Calendar.lastIpt ).updateYear( 1 );
    });
    /**
     * 捕获用户更改年份 
     * <p>监听 上一年按钮</p>
     * @event previous year
     * @private
     */
    $(document).delegate( 'body > div.UXCCalendar button.UPreYear', 'click', function( $evt ){
        Calendar.getInstance( Calendar.lastIpt )
            && Calendar.getInstance( Calendar.lastIpt ).updateYear( -1 );
    });
    /**
     * 增加或者减少一年
     * <p>监听 年份map</p>
     * @event   year map click
     * @private
     */
    $(document).delegate( "map[name=UXCCalendar_Year] area" , 'click', function( $evt ){
        $evt.preventDefault();
        var _p = $(this), _ins = Calendar.getInstance( Calendar.lastIpt );
        _p.attr("action") && _ins
            && ( _p.attr("action").toLowerCase() == 'up' && _ins.updateYear( 1 )
                , _p.attr("action").toLowerCase() == 'down' && _ins.updateYear( -1 )
               );
    });
    /**
     * 增加或者减少一个月
     * <p>监听 月份map</p>
     * @event   month map click
     * @private
     */
    $(document).delegate( "map[name=UXCCalendar_Month] area" , 'click', function( $evt ){
        $evt.preventDefault();
        var _p = $(this), _ins = Calendar.getInstance( Calendar.lastIpt );
        _p.attr("action") && _ins
            && ( _p.attr("action").toLowerCase() == 'up' && _ins.updateMonth( 1 )
                , _p.attr("action").toLowerCase() == 'down' && _ins.updateMonth( -1 )
               );
    });
    /**
     * 日期点击事件
     * @event date click
     * @private
     */
    $(document).delegate( 'div.UXCCalendar table a[date], div.UXCCalendar table a[dstart]', 'click', function( $evt ){
        $evt.preventDefault();
        Calendar.getInstance( Calendar.lastIpt )
            && Calendar.getInstance( Calendar.lastIpt ).updateSelected( $( this ) );
        /*
        Calendar._triggerUpdate( [ 'date', _d, _d ] );
        */
    });
    /**
     * 选择当前日期
     * <p>监听确定按钮</p>
     * @event   confirm click
     * @private
     */
    $(document).delegate( 'body > div.UXCCalendar button.UConfirm', 'click', function( $evt ){
        Calendar.getInstance( Calendar.lastIpt )
            && Calendar.getInstance( Calendar.lastIpt ).updateSelected();
    });
    /**
     * 清除文本框内容
     * <p>监听 清空按钮</p>
     * @event   clear click
     * @private
     */
    $(document).delegate( 'body > div.UXCCalendar button.UClear', 'click', function( $evt ){
        Calendar.getInstance( Calendar.lastIpt )
            && Calendar.getInstance( Calendar.lastIpt ).clear();
    });
    /**
     * 取消日历组件, 相当于隐藏
     * <p>监听 取消按钮</p>
     * @event cancel click
     * @private
     */
    $(document).delegate( 'body > div.UXCCalendar button.UCancel', 'click', function( $evt ){
        Calendar.getInstance( Calendar.lastIpt )
            && Calendar.getInstance( Calendar.lastIpt ).cancel();
    });
    /**
     * 日历组件按钮点击事件
     * @event calendar button click
     * @private
     */
    $(document).delegate( 'input.UXCCalendar_btn', 'click', function($evt){
        $(this).data( Calendar.Model.INPUT ) && Calendar.pickDate( $(this).data( Calendar.Model.INPUT ) );
    });
    /**
     * 日历组件点击事件, 阻止冒泡, 防止被 document click事件隐藏
     * @event UXCCalendar click
     * @private
     */
    $(document).delegate( 'body > div.UXCCalendar', 'click', function( $evt ){
        $evt.stopPropagation();
    });

    /**
     * DOM 加载完毕后, 初始化日历组件相关事件
     * @event   dom ready
     * @private
     */
    $(document).ready( function($evt){
        /**
         * 延迟200毫秒初始化页面的所有日历控件
         * 之所以要延迟是可以让用户自己设置是否需要自动初始化
         */
        setTimeout( function( $evt ){
            if( !Calendar.autoInit ) return;
            Calendar.initTrigger( $('input[type=text]') );
        }, 200 );
        /**
         * 监听窗口滚动和改变大小, 实时变更日历组件显示位置
         * @event  window scroll, window resize
         * @private
         */
        $(window).on('scroll resize', function($evt){
            var _ins = Calendar.getInstance( Calendar.lastIpt );
                _ins && _ins.visible() && _ins.updatePosition();
        });
        /**
         * dom 点击时, 检查事件源是否为日历组件对象, 如果不是则会隐藏日历组件
         * @event dom click
         * @private
         */
        var CLICK_HIDE_TIMEOUT = null;
        $(document).on('click', function($evt){
            var _src = $evt.target || $evt.srcElement;

            if( Calendar.domClickFilter ) if( Calendar.domClickFilter( $(_src) ) === false ) return;

            if( Calendar.isCalendar($evt.target||$evt.targetElement) ) return;

            if( _src && ( _src.nodeName.toLowerCase() != 'input' && _src.nodeName.toLowerCase() != 'button' ) ){
                Calendar.hide(); return;
            }

            CLICK_HIDE_TIMEOUT && clearTimeout( CLICK_HIDE_TIMEOUT );

            CLICK_HIDE_TIMEOUT =
                setTimeout( function(){
                    if( Calendar.lastIpt && Calendar.lastIpt.length && _src == Calendar.lastIpt[0] ) return;
                    Calendar.hide();
                }, 100);
        });
    });
    /**
     * 日历组件文本框获得焦点
     * @event input focus
     * @private
     */
    $(document).delegate( [ 'input[datatype=season]', 'input[datatype=month]', 'input[datatype=week]'
            , 'input[datatype=date]', 'input[datatype=daterange]', 'input[multidate]' ].join(), 'focus' , function($evt){
            Calendar.pickDate( this );
    });
    $(document).delegate( [ 'button[datatype=season]', 'button[datatype=month]', 'button[datatype=week]'
            , 'button[datatype=date]', 'button[datatype=daterange]', 'button[multidate]' ].join(), 'click' , function($evt){
            Calendar.pickDate( this );
    });
}(jQuery));


(function($){
    /**
     * 自定义周弹框的模板HTML
     * @for         JC.Calendar
     * @property    weekTpl
     * @type        string
     * @default     empty
     * @static
     */
    JC.Calendar.weekTpl = '';
    /**
     * 自定义周日历每周的起始日期 
     * <br /> 0 - 6, 0=周日, 1=周一
     * @for         JC.Calendar
     * @property    weekDayOffset
     * @static
     * @type    int
     * @default 1
     */
    JC.Calendar.weekDayOffset = 1;

    function WeekModel( _selector ){
        this._selector = _selector;
    }
    JC.Calendar.WeekModel = WeekModel;
    
    function WeekView( _model ){
        this._model = _model;
    }
    JC.Calendar.WeekView = WeekView;

    JC.Calendar.clone( WeekModel, WeekView );

    WeekModel.prototype.layout = 
        function(){
            var _r = $('#UXCCalendar_week');

            if( !_r.length ){
                _r = $( JC.Calendar.weekTpl || this.tpl ).hide();
                _r.attr('id', 'UXCCalendar_week').hide().appendTo( document.body );
              }
            return _r;
        };

    WeekModel.prototype.tpl =
        [
        '<div id="UXCCalendar_week" class="UXCCalendar UXCCalendar_week" >'
        ,'    <div class="UHeader">'
        ,'        <button type="button" class="UButton UNextYear">&nbsp;&gt;&gt;&nbsp;</button>'
        ,'        <button type="button" class="UButton UPreYear">&nbsp;&lt;&lt;&nbsp;</button>'
        ,'        <select class="UYear" style=""></select>'
        ,'    </div>'
        ,'    <table class="UTable UTableBorder">'
        ,'        <tbody></tbody>'
        ,'    </table>'
        ,'    <div class="UFooter">'
        ,'        <button type="button" class="UConfirm">确定</button>'
        ,'        <button type="button" class="UClear">清空</button>'
        ,'        <button type="button" class="UCancel">取消</button>'
        ,'    </div>'
        ,'</div>'
        ].join('');

    WeekModel.prototype.month = 
        function(){
            var _r = 0, _tmp, _date = new Date();
            ( _tmp = this.layout().find('td.cur a[dstart]') ).length
                && ( _date = new Date() )
                && (
                        _date.setTime( _tmp.attr('dstart') )
                   )
                ;
            _r = _date.getMonth();
            return _r;
        };

    WeekModel.prototype.selectedDate =
        function(){
            var _r, _tmp, _item;
            _tmp = this.layout().find('td.cur');
            _tmp.length 
                && !_tmp.hasClass( 'unable' )
                && ( _item = _tmp.find('a[dstart]') )
                && ( 
                        _r = { 'start': new Date(), 'end': new Date() }
                        , _r.start.setTime( _item.attr('dstart') ) 
                        , _r.end.setTime( _item.attr('dend') ) 
                    )
                ;
            return _r;
        };

    WeekModel.prototype.singleLayoutDate = 
        function(){
            var _p = this
                , _dateo = _p.defaultDate()
                , _day = this.day()
                , _max
                , _curWeek = _p.layout().find('td.cur > a[week]')
                ;
            _dateo.date.setDate( 1 );
            _dateo.date.setFullYear( this.year() );
            _dateo.date.setMonth( this.month() );
            _max = maxDayOfMonth( _dateo.date );
            _day > _max && ( _day = _max );
            _dateo.date.setDate( _day );

            _curWeek.length && ( _dateo.curweek = parseInt( _curWeek.attr('week'), 10 ) );
            JC.log( 'WeekModel.singleLayoutDate:', _curWeek.length, _dateo.curweek );

            return _dateo;
        };

    WeekView.prototype._buildBody =
        function( _dateo ){
            var _p = this
                , _date = _dateo.date
                , _layout = _p._model.layout()
                , today = new Date( new Date().getFullYear(), new Date().getMonth(), new Date().getDate() ).getTime()
                , weeks = weekOfYear( _date.getFullYear(), JC.Calendar.weekDayOffset )
                , nextYearWeeks = weekOfYear( _date.getFullYear() + 1, JC.Calendar.weekDayOffset )
                , nextCount = 0
                , _ls = [], _class, _data, _title, _sdate, _edate, _year = _date.getFullYear()
                , _rows = Math.ceil( weeks.length / 8 )
                , ipt = JC.Calendar.lastIpt
                , currentcanselect = parseBool( ipt.attr('currentcanselect') )
                ;

            if( _dateo.maxvalue && currentcanselect ){
                var _wd = _dateo.maxvalue.getDay();
                if( _wd > 0 ) {
                    _dateo.maxvalue.setDate( _dateo.maxvalue.getDate() + ( 7 - _wd ) );
                }
            }

            _ls.push('<tr>');
            for( i = 1, j = _rows * 8; i <= j; i++ ){
                _data = weeks[ i - 1];
                if( !_data ) {
                    _data = nextYearWeeks[ nextCount++ ];
                    _year = _date.getFullYear() + 1;
                }
                _sdate = new Date(); _edate = new Date();
                _sdate.setTime( _data.start ); _edate.setTime( _data.end );

                _title = printf( "{0}年 第{1}周\n开始日期: {2} (周{4})\n结束日期: {3} (周{5})"
                            , _year
                            , JC.Calendar.getCnNum( _data.week )
                            , formatISODate( _sdate )
                            , formatISODate( _edate )
                            , JC.Calendar.cnWeek.charAt( _sdate.getDay() % 7 )
                            , JC.Calendar.cnWeek.charAt( _edate.getDay() % 7 )
                            );

                _class = [];

                if( _dateo.minvalue && _sdate.getTime() < _dateo.minvalue.getTime() ) 
                    _class.push( 'unable' );
                if( _dateo.maxvalue && _edate.getTime() > _dateo.maxvalue.getTime() ){
                    _class.push( 'unable' );
                }

                if( _dateo.curweek ){
                    if( _data.week == _dateo.curweek 
                        && _date.getFullYear() == _sdate.getFullYear() 
                        ) _class.push( 'cur' );
                }else{
                    if( _date.getTime() >= _sdate.getTime() && _date.getTime() <= _edate.getTime() ) _class.push( 'cur' );
                }

                if( today >= _sdate.getTime() && today <= _edate.getTime() ) _class.push( 'today' );

                _ls.push( printf( '<td class="{0}"><a href="javascript:" title="{2}"'+
                                ' dstart="{3}" dend="{4}" week="{1}" date="{5}" >{1}</a></td>'
                            , _class.join(' ')
                            , _data.week 
                            , _title
                            , _sdate.getTime()
                            , _edate.getTime()
                            , _dateo.date.getTime()
                        ));
                if( i % 8 === 0 && i != j ) _ls.push( '</tr><tr>' );
            }
            _ls.push('</tr>'); 

            _layout.find('table.UTableBorder tbody' ).html( $( _ls.join('') ) );
        };

    WeekView.prototype.updateSelected = 
        function( _userSelectedItem ){
            var _p = this, _dstart, _dend, _tmp;
            if( !_userSelectedItem ){
                _tmp = this._model.selectedDate();
                _tmp && ( _dstart = _tmp.start, _dend = _tmp.end );
            }else{
                _userSelectedItem = $( _userSelectedItem );
                _tmp = getJqParent( _userSelectedItem, 'td' );
                if( _tmp && _tmp.hasClass('unable') ) return;
                _dstart = new Date(); _dend = new Date();
                _dstart.setTime( _userSelectedItem.attr('dstart') );
                _dend.setTime( _userSelectedItem.attr('dend') );
            }
            if( !( _dstart && _dend ) ) return;

            _p._model.selector().val( printf( '{0} 至 {1}', formatISODate( _dstart ), formatISODate( _dend ) ) );
            $(_p).trigger( 'TriggerEvent', [ JC.Calendar.Model.UPDATE, 'week', _dstart, _dend ] );

            JC.Calendar.hide();
        };
    /**
     * 取一年中所有的星期, 及其开始结束日期
     * @method  weekOfYear
     * @static
     * @param   {int}   _year
     * @param   {int}   _dayOffset  每周的默认开始为周几, 默认0(周日)
     * @return  Array
     */
    function weekOfYear( _year, _dayOffset ){
        var _r = [], _tmp, _count = 1, _dayOffset = _dayOffset || 0
            , _year = parseInt( _year, 10 )
            , _d = new Date( _year, 0, 1 );
        /**
         * 元旦开始的第一个星期一开始的一周为政治经济上的第一周
         */
         _d.getDay() > 1 && _d.setDate( _d.getDate() - _d.getDay() + 7 );

         _dayOffset > 0 && ( _dayOffset = (new Date( 2000, 1, 2 ) - new Date( 2000, 1, 1 )) * _dayOffset );

        while( _d.getFullYear() <= _year ){
            _tmp = { 'week': _count++, 'start': null, 'end': null };
            _tmp.start = _d.getTime() + _dayOffset;
            _d.setDate( _d.getDate() + 6 );
            _tmp.end = _d.getTime() + _dayOffset;
            _d.setDate( _d.getDate() + 1 );
            if( _d.getFullYear() > _year ) {
                _d = new Date( _d.getFullYear(), 0, 1 );
                if( _d.getDay() < 2 ) break;
             }
            _r.push( _tmp );
        }
        return _r;
    }
}(jQuery));

(function($){
    /**
     * 自定义月份弹框的模板HTML
     * @for         JC.Calendar
     * @property    monthTpl
     * @type        string
     * @default     empty
     * @static
     */
    JC.Calendar.monthTpl = '';

    function MonthModel( _selector ){
        this._selector = _selector;
    }
    JC.Calendar.MonthModel = MonthModel;
    
    function MonthView( _model ){
        this._model = _model;
    }
    JC.Calendar.MonthView = MonthView;

    JC.Calendar.clone( MonthModel, MonthView );

    MonthModel.prototype.layout = 
        function(){
            var _r = $('#UXCCalendar_month');

            if( !_r.length ){
                _r = $( JC.Calendar.monthTpl || this.tpl ).hide();
                _r.attr('id', 'UXCCalendar_month').hide().appendTo( document.body );
             }
            return _r;
        };

    MonthModel.prototype.tpl =
        [
        '<div id="UXCCalendar_month" class="UXCCalendar UXCCalendar_week UXCCalendar_month" >'
        ,'    <div class="UHeader">'
        ,'        <button type="button" class="UButton UNextYear">&nbsp;&gt;&gt;&nbsp;</button>'
        ,'        <button type="button" class="UButton UPreYear">&nbsp;&lt;&lt;&nbsp;</button>'
        ,'        <select class="UYear" style=""></select>'
        ,'    </div>'
        ,'    <table class="UTable UTableBorder">'
        ,'        <tbody></tbody>'
        ,'    </table>'
        ,'    <div class="UFooter">'
        ,'        <button type="button" class="UConfirm">确定</button>'
        ,'        <button type="button" class="UClear">清空</button>'
        ,'        <button type="button" class="UCancel">取消</button>'
        ,'    </div>'
        ,'</div>'
        ].join('');

    MonthModel.prototype.month = 
        function(){
            var _r = 0, _tmp, _date;
            ( _tmp = this.layout().find('td.cur a[dstart]') ).length
                && ( _date = new Date() )
                && (
                        _date.setTime( _tmp.attr('dstart') )
                        , _r = _date.getMonth()
                   )
                ;
            return _r;
        };

    MonthModel.prototype.selectedDate =
        function(){
            var _r, _tmp, _item;
            _tmp = this.layout().find('td.cur');
            _tmp.length 
                && !_tmp.hasClass( 'unable' )
                && ( _item = _tmp.find('a[dstart]') )
                && ( 
                        _r = { 'start': new Date(), 'end': new Date() }
                        , _r.start.setTime( _item.attr('dstart') ) 
                        , _r.end.setTime( _item.attr('dend') ) 
                    )
                ;
            return _r;
        };

    MonthModel.prototype.defaultMultiselectDate =
        function( _r ){
            var _p = this
                , _selector = _p.selector()
                , _tmp
                , _multidatear
                , _dstart, _dend
                ;

            if( _tmp = parseISODate( _selector.val() ) ) _r.date = _tmp;
            else{
                if( _selector.val() && (_tmp = _selector.val().replace( /[^\d,]/g, '' ) ).length ){
                    _tmp = _tmp.split(',');
                    _multidatear = [];

                    $.each( _tmp, function( _ix, _item ){
                        if( _item.length != 16 ) return;
                        _dstart = parseISODate( _item.slice( 0, 8 ) );
                        _dend = parseISODate( _item.slice( 8 ) );

                        if( !_ix ){
                            _r.date = cloneDate( _dstart );
                            _r.enddate = cloneDate( _dend );
                        }
                        _multidatear.push( { 'start': _dstart, 'end': _dend } );
                    });

                    _r.multidate = _multidatear;

                }else{
                    _tmp = new Date();
                    _r.date = new Date( _tmp.getFullYear(), _tmp.getMonth(), _tmp.getDate() );
                    _r.enddate = cloneDate( _r.date );
                    _r.enddate.setDate( maxDayOfMonth( _r.enddate ) );
                    _r.multidate = [];
                    _r.multidate.push( {'start': cloneDate( _r.date ), 'end': cloneDate( _r.enddate ) } );
                }
            }
            return _r;
        };

    MonthModel.prototype.multiLayoutDate = 
        function(){
            var _p = this
                , _dateo = _p.defaultDate()
                , _year = _p.year()
                ;

            JC.log( 'MonthModel.multiLayoutDate:', new Date().getTime() );
            _dateo.multidate = [];

            _p.layout().find('td.cur').each(function(){
                var _sp = $(this);
                var _item = _sp.find('> a[dstart]'), _dstart = new Date(), _dend = new Date();
                _dstart.setTime( _item.attr('dstart') );
                _dend.setTime( _item.attr('dend') );
                _dateo.multidate.push( { 'start': _dstart, 'end': _dend } );
            });

            _dateo.date.setFullYear( _year );
            _dateo.enddate.setFullYear( _year );

            $.each( _dateo.multidate, function( _ix, _item ){
                _item.start.setFullYear( _year );
                _item.end.setFullYear( _year );
            });

            return _dateo;
        };

    MonthView.prototype.updateMultiYear =
        function( _offset ){
            var _dateo = this._model.layoutDate(), _day, _max;

            //JC.log( 'xdfsadfasefasf', _dateo.multidate == null );
            JC.log( 'MonthView.updateMultiYear:', new Date().getTime() );

            tmpUpdateMultiYear( _dateo.date, _offset );
            tmpUpdateMultiYear( _dateo.enddate, _offset );

            if( _dateo.multidate ){
                //JC.log( _dateo.multidate.length );
                $.each( _dateo.multidate, function( _ix, _item ){
                    tmpUpdateMultiYear( _item.start, _offset );
                    tmpUpdateMultiYear( _item.end, _offset );
                    JC.log('xxxxxxxxxxxxxxxxxxxxxxx', _item.start, _item.end, _offset );
                });
            }

            this._buildLayout( _dateo );
            this._buildDone();
        };
    function tmpUpdateMultiYear( _date, _offset ){
        var _day, _max;
        _day = _date.getDate();
        _date.setDate( 1 );
        _date.setFullYear( _date.getFullYear() + _offset );
        _max = maxDayOfMonth( _date );
        _day > _max && ( _day = _max );
        _date.setDate( _day );
    }

    MonthView.prototype._buildBody =
        function( _dateo ){
            var _p = this
                , _date = _dateo.date
                , _layout = _p._model.layout()
                , today = new Date( new Date().getFullYear(), new Date().getMonth(), new Date().getDate() ).getTime()
                , nextCount = 0
                , _ls = [], _class, _data, _title, _dstart, _dend, _year = _date.getFullYear()
                , _rows = 4
                , ipt = JC.Calendar.lastIpt
                , currentcanselect = parseBool( ipt.attr('currentcanselect') )
                , _tmpMultidate = _dateo.multidate ? _dateo.multidate.slice() : null
                ;

                if( _dateo.maxvalue && currentcanselect ){
                    _dateo.maxvalue.setDate( maxDayOfMonth( _dateo.maxvalue ) );
                }

                _ls.push('<tr>');
                for( i = 1, j = 12; i <= j; i++ ){
                    _dstart = new Date( _year, i - 1, 1 ); 
                    _dend = new Date( _year, i - 1, maxDayOfMonth( _dstart ) );

                    _title = printf( "{0}年 {1}月<br/>开始日期: {2} (周{4})<br />结束日期: {3} (周{5})"
                                , _year
                                , JC.Calendar.getCnNum( i )
                                , formatISODate( _dstart )
                                , formatISODate( _dend )
                                , JC.Calendar.cnWeek.charAt( _dstart.getDay() % 7 )
                                , JC.Calendar.cnWeek.charAt( _dend.getDay() % 7 )
                                );

                    _class = [];

                    if( _dateo.minvalue && _dstart.getTime() < _dateo.minvalue.getTime() ) 
                        _class.push( 'unable' );
                    if( _dateo.maxvalue && _dend.getTime() > _dateo.maxvalue.getTime() ){
                        _class.push( 'unable' );
                    }

                    if( _tmpMultidate ){
                        //JC.log( '_tmpMultidate.length:', _tmpMultidate.length );
                        $.each( _tmpMultidate, function( _ix, _item ){
                            //JC.log( _dstart.getTime(), _item.start.getTime(), _item.end.getTime() );
                            if( _dstart.getTime() >= _item.start.getTime() 
                              && _dstart.getTime() <= _item.end.getTime() ){
                                _class.push( 'cur' );
                                _tmpMultidate.splice( _ix, 1 );
                                //JC.log( _tmpMultidate.length );
                                return false;
                            }
                        });
                    }else{
                        if( _date.getTime() >= _dstart.getTime() 
                                && _date.getTime() <= _dend.getTime() ) _class.push( 'cur' );
                    }
                    if( today >= _dstart.getTime() && today <= _dend.getTime() ) _class.push( 'today' );

                    _cnUnit = JC.Calendar.cnUnit.charAt( i % 10 );
                    i > 10 && ( _cnUnit = "十" + _cnUnit );

                    _ls.push( printf( '<td class="{0}"><a href="javascript:" title="{1}"'+
                                    ' dstart="{3}" dend="{4}" month="{5}" >{2}月</a></td>'
                                , _class.join(' ')
                                , _title
                                , _cnUnit
                                , _dstart.getTime()
                                , _dend.getTime()
                                , i
                            ));
                    if( i % 3 === 0 && i != j ) _ls.push( '</tr><tr>' );
                }
                _ls.push('</tr>'); 
 
                _layout.find('table.UTableBorder tbody' ).html( $( _ls.join('') ) );
        };

    MonthModel.prototype.multiselectDate =
        function(){
            var _p = this, _r = [], _sp, _item, _dstart, _dend;
            _p.layout().find('td.cur').each( function(){
                _sp = $(this); _item = _sp.find( '> a[dstart]' );
                if( _sp.hasClass( 'unable' ) ) return;
                _dstart = new Date(); _dend = new Date();
                _dstart.setTime( _item.attr('dstart') );
                _dend.setTime( _item.attr('dend') );
                _r.push( { 'start': _dstart, 'end': _dend } );
            });
            return _r;
        };

    MonthView.prototype.updateSelected = 
        function( _userSelectedItem ){
            var _p = this, _dstart, _dend, _tmp, _text, _ar;
            if( !_userSelectedItem ){
                if( _p._model.multiselect() ){
                    _tmp = this._model.multiselectDate();
                    if( !_tmp.length ) return;
                    _ar = [];
                    $.each( _tmp, function( _ix, _item ){
                        _ar.push( printf( '{0} 至 {1}', formatISODate( _item.start ), formatISODate( _item.end ) ) );
                    });
                    _text = _ar.join(',');
                }else{
                    _tmp = this._model.selectedDate();
                    _tmp && ( _dstart = _tmp.start, _dend = _tmp.end );

                    _dstart && _dend 
                        && ( _text = printf( '{0} 至 {1}', formatISODate( _dstart ), formatISODate( _dend ) ) );
                }
            }else{
                _userSelectedItem = $( _userSelectedItem );
                _tmp = getJqParent( _userSelectedItem, 'td' );
                if( _tmp && _tmp.hasClass('unable') ) return;

                if( _p._model.multiselect() ){
                    _tmp.toggleClass('cur');
                    return;
                }
                _dstart = new Date(); _dend = new Date();
                _dstart.setTime( _userSelectedItem.attr('dstart') );
                _dend.setTime( _userSelectedItem.attr('dend') );

                _text = printf( '{0} 至 {1}', formatISODate( _dstart ), formatISODate( _dend ) );
            }

            if( !_text ) return;

            _p._model.selector().val( _text );
            $(_p).trigger( 'TriggerEvent', [ JC.Calendar.Model.UPDATE, 'month', _dstart, _dend ] );

            JC.Calendar.hide();
        };

}(jQuery));

(function($){
    /**
     * 自定义周弹框的模板HTML
     * @for         JC.Calendar
     * @property    seasonTpl
     * @type        string
     * @default     empty
     * @static
     */
    JC.Calendar.seasonTpl = '';

    function SeasonModel( _selector ){
        this._selector = _selector;
    }
    JC.Calendar.SeasonModel = SeasonModel;
    
    function SeasonView( _model ){
        this._model = _model;
    }
    JC.Calendar.SeasonView = SeasonView;

    JC.Calendar.clone( SeasonModel, SeasonView );

    SeasonModel.prototype.layout = 
        function(){
            var _r = $('#UXCCalendar_season');

            if( !_r.length ){
                _r = $( JC.Calendar.seasonTpl || this.tpl ).hide();
                _r.attr('id', 'UXCCalendar_season').hide().appendTo( document.body );
             }
            return _r;
        };

    SeasonModel.prototype.tpl =
        [
        '<div id="UXCCalendar_season" class="UXCCalendar UXCCalendar_week UXCCalendar_season" >'
        ,'    <div class="UHeader">'
        ,'        <button type="button" class="UButton UNextYear">&nbsp;&gt;&gt;&nbsp;</button>'
        ,'        <button type="button" class="UButton UPreYear">&nbsp;&lt;&lt;&nbsp;</button>'
        ,'        <select class="UYear" style=""></select>'
        ,'    </div>'
        ,'    <table class="UTable UTableBorder">'
        ,'        <tbody></tbody>'
        ,'    </table>'
        ,'    <div class="UFooter">'
        ,'        <button type="button" class="UConfirm">确定</button>'
        ,'        <button type="button" class="UClear">清空</button>'
        ,'        <button type="button" class="UCancel">取消</button>'
        ,'    </div>'
        ,'</div>'
        ].join('');

    SeasonModel.prototype.month = 
        function(){
            var _r = 0, _tmp, _date;
            ( _tmp = this.layout().find('td.cur a[dstart]') ).length
                && ( _date = new Date() )
                && (
                        _date.setTime( _tmp.attr('dstart') )
                        , _r = _date.getMonth()
                   )
                ;
            return _r;
        };

    SeasonModel.prototype.selectedDate =
        function(){
            var _r, _tmp, _item;
            _tmp = this.layout().find('td.cur');
            _tmp.length 
                && !_tmp.hasClass( 'unable' )
                && ( _item = _tmp.find('a[dstart]') )
                && ( 
                        _r = { 'start': new Date(), 'end': new Date() }
                        , _r.start.setTime( _item.attr('dstart') ) 
                        , _r.end.setTime( _item.attr('dend') ) 
                    )
                ;
            return _r;
        };

    SeasonView.prototype._buildBody =
        function( _dateo ){
            var _p = this
                , _date = _dateo.date
                , _layout = _p._model.layout()
                , today = new Date( new Date().getFullYear(), new Date().getMonth(), new Date().getDate() ).getTime()
                , nextCount = 0
                , _ls = [], _class, _data, _title, _sdate, _edate, _year = _date.getFullYear()
                , _rows = 4
                , ipt = JC.Calendar.lastIpt
                , currentcanselect = parseBool( ipt.attr('currentcanselect') )
                ;

                if( _dateo.maxvalue && currentcanselect ){
                    var _m = _dateo.maxvalue.getMonth() + 1, _md;

                    if( _m % 3 !== 0 ){
                        _dateo.maxvalue.setDate( 1 );
                        _dateo.maxvalue.setMonth( _m + ( 3 - ( _m % 3 ) - 1 ) );
                    }
                    _dateo.maxvalue.setDate( maxDayOfMonth( _dateo.maxvalue ) );
                }

                _ls.push('<tr>');
                for( i = 1, j = 4; i <= j; i++ ){
                    _sdate = new Date( _year, i * 3 - 3, 1 ); 
                    _edate = new Date( _year, i * 3 - 1, 1 );
                    _edate.setDate( maxDayOfMonth( _edate ) );

                    _cnUnit = JC.Calendar.cnUnit.charAt( i % 10 );
                    i > 10 && ( _cnUnit = "十" + _cnUnit );

                    _title = printf( "{0}年 第{1}季度<br/>开始日期: {2} (周{4})<br />结束日期: {3} (周{5})"
                                , _year
                                , JC.Calendar.getCnNum( i )
                                , formatISODate( _sdate )
                                , formatISODate( _edate )
                                , JC.Calendar.cnWeek.charAt( _sdate.getDay() % 7 )
                                , JC.Calendar.cnWeek.charAt( _edate.getDay() % 7 )
                                );

                    _class = [];

                    if( _dateo.minvalue && _sdate.getTime() < _dateo.minvalue.getTime() ) 
                        _class.push( 'unable' );
                    if( _dateo.maxvalue && _edate.getTime() > _dateo.maxvalue.getTime() ){
                        _class.push( 'unable' );
                    }

                    if( _date.getTime() >= _sdate.getTime() && _date.getTime() <= _edate.getTime() ) _class.push( 'cur' );
                    if( today >= _sdate.getTime() && today <= _edate.getTime() ) _class.push( 'today' );


                    _ls.push( printf( '<td class="{0}"><a href="javascript:" title="{1}"'+
                                    ' dstart="{3}" dend="{4}" month="{5}" >{2}季度</a></td>'
                                , _class.join(' ')
                                , _title
                                , _cnUnit
                                , _sdate.getTime()
                                , _edate.getTime()
                                , i
                            ));
                    if( i % 2 === 0 && i != j ) _ls.push( '</tr><tr>' );
                }
                _ls.push('</tr>'); 
 
                _layout.find('table.UTableBorder tbody' ).html( $( _ls.join('') ) );
        };

    SeasonView.prototype.updateSelected = 
        function( _userSelectedItem ){
            var _p = this, _dstart, _dend, _tmp;
            if( !_userSelectedItem ){
                _tmp = this._model.selectedDate();
                _tmp && ( _dstart = _tmp.start, _dend = _tmp.end );
            }else{
                _userSelectedItem = $( _userSelectedItem );
                _tmp = getJqParent( _userSelectedItem, 'td' );
                if( _tmp && _tmp.hasClass('unable') ) return;
                _dstart = new Date(); _dend = new Date();
                _dstart.setTime( _userSelectedItem.attr('dstart') );
                _dend.setTime( _userSelectedItem.attr('dend') );
            }
            if( !( _dstart && _dend ) ) return;

            _p._model.selector().val( printf( '{0} 至 {1}', formatISODate( _dstart ), formatISODate( _dend ) ) );
            $(_p).trigger( 'TriggerEvent', [ JC.Calendar.Model.UPDATE, 'season', _dstart, _dend ] );

            JC.Calendar.hide();
        };

}(jQuery));
