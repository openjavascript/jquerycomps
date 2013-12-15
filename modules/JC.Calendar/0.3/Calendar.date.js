;(function(define, _win) { 'use strict'; define( [ 'JC.common' ], function(){
//TODO: minvalue, maxvalue 添加默认日期属性识别属性
;(function($){
    /**
     * 日期选择组件
     * <br />全局访问请使用 JC.Calendar 或 Calendar
     * <br />DOM 加载完毕后
     * , Calendar会自动初始化页面所有日历组件, input[type=text][datatype=date]标签
     * <br />Ajax 加载内容后, 如果有日历组件需求的话, 需要手动使用Calendar.init( _selector )
     * <br />_selector 可以是 新加载的容器, 也可以是新加载的所有input
     * <p><b>require</b>: 
     *      <a href='window.jQuery.html'>jQuery</a>
     *      , <a href='JC.common.html'>JC.common</a>
     * </p>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.Calendar.html' target='_blank'>API docs</a>
     * | <a href='../../modules/JC.Calendar/0.3/_demo/' target='_blank'>demo link</a></p>
     * <h2> 可用的html attribute, (input|button):(datatype|multidate)=(date|week|month|season) </h2> 
     * <dl>
     *      <dt>defaultdate = ISO Date</dt>
     *      <dd>默认显示日期, 如果 value 为空, 则尝试读取 defaultdate 属性</dd>
     *
     *      <dt>datatype = string</dt>
     *      <dd>
     *          声明日历控件的类型:
     *          <br /><b>date:</b> 日期日历
     *          <br /><b>week:</b> 周日历
     *          <br /><b>month:</b> 月日历
     *          <br /><b>season:</b> 季日历
     *          <br /><b>year:</b> 年日历
     *          <br /><b>monthday:</b> 多选日期日历
     *      </dd>
     *
     *      <dt>multidate = string</dt>
     *      <dd>
     *          与 datatype 一样, 这个是扩展属性, 避免表单验证带来的逻辑冲突
     *      </dd>
     *
     *      <dt>calendarshow = function</dt>
     *      <dd>显示日历时的回调
<pre>function calendarshow( _selector, _ins ){
    var _selector = $(this);
    UXC.log( 'calendarshow', _selector.val() );
}
</pre></dd>
     *
     *      <dt>calendarhide = function</dt>
     *      <dd>隐藏日历时的回调
<pre>function calendarhide( _selector, _ins ){
    var _selector = $(this);
    UXC.log( 'calendarhide', _selector.val() );
}</pre></dd>
     *
     *      <dt>calendarlayoutchange = function</dt>
     *      <dd>用户点击日历控件操作按钮后, 外观产生变化时触发的回调
<pre>function calendarlayoutchange( _selector, _ins ){
    var _selector = $(this);
    JC.log( 'calendarlayoutchange', _selector.val() );
}
</pre></dd>
     *
     *      <dt>calendarupdate = function</dt>
     *      <dd>
     *          赋值后触发的回调
<pre>function calendarupdate( _startDate, _endDate, _ins ){
    var _selector = $(this);
    JC.log( 'calendarupdate', _selector.val(), _startDate, _endDate );
}
</pre></dd>
     *
     *      <dt>calendarclear = function</dt>
     *      <dd>清空日期触发的回调
<pre>function calendarclear( _selector, _ins ){
    var _selector = $(this);
}</pre></dd>
     *
     *      <dt>minvalue = ISO Date</dt>
     *      <dd>日期的最小时间, YYYY-MM-DD</dd>
     *
     *      <dt>maxvalue = ISO Date</dt>
     *      <dd>日期的最大时间, YYYY-MM-DD</dd>
     *
     *      <dt>currentcanselect = bool, default = true</dt>
     *      <dd>当前日期是否能选择</dd>
     *
     *      <dt>multiselect = bool (目前支持 month: default=false, monthday: default = treu)</dt>
     *      <dd>是否为多选日历</dd>
     *
     *      <dt>calendarupdatemultiselect = function</dt>
     *      <dd>
     *          多选日历赋值后触发的回调
     *          <dl>
     *              <dt>参数: _data:</dt>
     *              <dd>
     *                  [{"start": Date,"end": Date}[, {"start": Date,"end": Date}... ] ]
     *              </dd>
     *          </dl>
<pre>function calendarupdatemultiselect( _data, _ins ){
    var _selector = $(this);
    window.JSON && ( _data = JSON.stringify( _data ) );
    JC.log( 'calendarupdatemultiselect:'
        , JC.f.printf( 'val:{0}, data:{1}', _selector.val(), _data ) );
}</pre></dd>
     *
     *      <dt>dateFormat = string</dt>
     *      <dd>
     *          自定义日期格式化显示, 使用 JC.f.dateFormat 函数进行格式化
     *          <br />如果日期去除非数字后不是 8/16 位数字的话, 需要 显式声明 dateParse 属性, 自定义日期解析函数
     *      </dd>
     *
     *      <dt>fullDateFormat = string</dt>
     *      <dd>
     *          针对 日期类型: 月/季/年 定义显示格式, default: "{0} 至 {1}"
     *          <br />{0}代表开始日期, {1}代表结束日期
     *      </dd>
     *
     *      <dt>dateParse = function </dt>
     *      <dd>
     *          自定义日期格式函数, 针对日期不能解析为 8 位数字的特殊日期
     *          <br />例子:
<pre>//
/// 针对月份日期格式化 YY-MM
//
function parseYearMonthDate( _dateStr ){
    _dateStr = $.trim( _dateStr || '' );
    var _r = { start: null, end: null };
    if( !_dateStr ) return _r;

    _dateStr = _dateStr.replace( /[^\d]+/g, '' );
    var _year = _dateStr.slice( 0, 4 ), _month = parseInt( _dateStr.slice( 4 ), 10 ) - 1;

    _r.start = new Date( _year, _month, 1 );
    return _r;
}
//
/// 针对季度日期格式化 YY-MM ~ YY-MM
//
function parseSeasonDate( _dateStr ){
    _dateStr = $.trim( _dateStr || '' );
    var _r = { start: null, end: null };
    if( !_dateStr ) return _r;

    _dateStr = _dateStr.replace( /[^\d]+/g, '' );

    _r.start = JC.f.parseISODate( _dateStr.slice( 0, 6 ) + '01' );
    _r.end = JC.f.parseISODate( _dateStr.slice( 6 ) + '01' );

    return _r;
}
//
/// 针对年份日期格式化 YY
//
function parseYearDate( _dateStr ){
    _dateStr = $.trim( _dateStr || '' );
    var _r = { start: null, end: null };
    if( !_dateStr ) return _r;

    _dateStr = _dateStr.replace( /[^\d]+/g, '' );
    var _year = _dateStr.slice( 0, 4 );

    _r.start = new Date( _year, 0, 1 );
    return _r;
}</pre>
     *      </dd>
     * </dl>
     * @namespace JC
     * @class Calendar
     * @version dev 0.3, 2013-12-09 添加 年日历, 优化继承代码块
     * @version dev 0.2, 2013-09-01 过程式转单例模式
     * @version dev 0.1, 2013-06-04
     * @author  qiushaowei   <suches@btbtd.org> | 75 team
     */
    window.JC = window.JC || {log:function(){}};
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
            case 'year': 
                {
                    this._model = new Calendar.YearModel( _selector );
                    this._view = new Calendar.YearView( this._model );
                    break;
                }
            case 'monthday':
                {   
                   
                    this._model = new Calendar.MonthDayModel( _selector );
                    this._view = new Calendar.MonthDayView( this._model );
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
                    var _data = JC.f.sliceArgs( arguments ).slice(2);
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

                    var _data = []
                        , _v = _p._model.selector().val().trim()
                        , _startDate, _endDate
                        , _tmp, _item
                        , _tmpStart, _tmpEnd
                        ;

                    if( _v ){
                        _tmp = _v.split( ',' );
                        for( var i = 0, j = _tmp.length; i < j; i++ ){

                            if( _p._model.dateParse( _p._model.selector() ) ){
                                var _tmpDataObj = _p._model.dateParse( _p._model.selector() )( _tmp[i] );
                                    _startDate = _tmpDataObj.start;
                                    _endDate = _tmpDataObj.end;
                                    !_endDate && ( _endDate = _startDate );
                            }else{
                                _item = _tmp[i].replace( /[^\d]/g, '' );
                                if( _item.length == 16 ){
                                    _tmpStart = JC.f.parseISODate( _item.slice( 0, 8 ) );
                                    _tmpEnd = JC.f.parseISODate( _item.slice( 8 ) );
                                }else if( _item.length == 8 ){
                                    _tmpStart = JC.f.parseISODate( _item.slice( 0, 8 ) );
                                    _tmpEnd = JC.f.cloneDate( _tmpStart );
                                }
                                if( i === 0 ){
                                    _startDate = JC.f.cloneDate( _tmpStart );
                                    _endDate = JC.f.cloneDate( _tmpEnd );
                                }
                            }
                            _data.push( {'start': _tmpStart, 'end': _tmpEnd } );
                        }
                    }

                    _p._model.calendarupdate()
                        && _p._model.calendarupdate().apply( _p._model.selector(), [ _startDate, _endDate, _p ] );

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

        , updateFormat: function( _selector ){ this._model.updateFormat( _selector ); }
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
                case 'year': 
                case 'monthday': 
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
                                || _selector.attr('datatype').toLowerCase() == 'monthday'
                            )) _r = 1;
                if( _selector.prop('nodeName') 
                        && _selector.attr('multidate')
                        && ( _selector.prop('nodeName').toLowerCase()=='input' 
                            || _selector.prop('nodeName').toLowerCase()=='button' )
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
                var _p = $(this)
                    , _nodeName = (_p.prop('nodeName')||'').toLowerCase()
                    , _tmp, _dt
                    ;

                if( _nodeName != 'input' && _nodeName != 'textarea' ){ 
                    Calendar.initTrigger( _selector.find( 'input[type=text], textarea' ) ); 
                    return; 
                }
                _dt = $.trim( _p.attr('datatype') || '').toLowerCase()

                if( !(  
                        _dt == 'date' 
                        || _dt == 'week' 
                        || _dt == 'month' 
                        || _dt == 'season' 
                        || _dt == 'year' 
                        || _dt == 'daterange'
                        || _dt == 'monthday' 
                        || $.trim( _p.attr('multidate') || '')
                        ) ) return;

                var _btn = _p.find( '+ input.UXCCalendar_btn' );
                if( !_btn.length ){
                    _p.after( _btn = $('<input type="button" class="UXCCalendar_btn"  />') );
                }

                //!_p.is( '[dateFormat]' )
                ( _tmp = _p.val().trim() )
                    && ( _tmp = JC.f.dateDetect( _tmp ) )
                    && _p.val( JC.f.formatISODate( _tmp ) )
                    ; 

                ( _tmp = ( _p.attr('minvalue') || '' ) )
                    && ( _tmp = JC.f.dateDetect( _tmp ) )
                    && _p.attr( 'minvalue', JC.f.formatISODate( _tmp ) )
                    ; 

                ( _tmp = ( _p.attr('maxvalue') || '' ) )
                    && ( _tmp = JC.f.dateDetect( _tmp ) )
                    && _p.attr( 'maxvalue', JC.f.formatISODate( _tmp ) )
                    ; 

                if( _p.is( '[dateFormat]' ) || _p.is( '[fullDateFormat]' ) ){
                    var _ins = Calendar.getInstance( _selector );
                    !_ins && ( _ins = new Calendar( _selector ) );
                    _ins.updateSelector( _selector );
                    _ins.updateFormat( _p );
                }

                if( ( _p.attr('datatype') || '' ).toLowerCase() == 'monthday'
                    || ( _p.attr('multidate') || '' ).toLowerCase() == 'monthday' ){
                    if( !_p.is('[placeholder]') ){
                        var _tmpDate = new Date();
                        _p.attr('defaultdate') && ( _tmpDate = JC.f.parseISODate( _p.attr('defaultdate') ) || _tmpDate );
                        _p.val().trim() && ( _tmpDate = JC.f.parseISODate( _p.val().replace( /[^d]/g, '').slice( 0, 8 ) ) || _tmpDate );
                        _tmpDate && _p.attr( 'placeholder', JC.f.printf( '{0}年 {1}月', _tmpDate.getFullYear(), _tmpDate.getMonth() + 1 ) );
                    }
                }

                _btn.data( Calendar.Model.INPUT, _p );
            });
        };

    Calendar.updateMultiYear =
        function ( _date, _offset ){
            var _day, _max;
            _day = _date.getDate();
            _date.setDate( 1 );
            _date.setFullYear( _date.getFullYear() + _offset );
            _max = JC.f.maxDayOfMonth( _date );
            _day > _max && ( _day = _max );
            _date.setDate( _day );
            return _date;
        };

    Calendar.updateMultiMonth =
        function ( _date, _offset ){
            var _day, _max;
            _day = _date.getDate();
            _date.setDate( 1 );
            _date.setMonth( _date.getMonth() + _offset );
            _max = JC.f.maxDayOfMonth( _date );
            _day > _max && ( _day = _max );
            _date.setDate( _day );
            return _date;
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
            if( _model )
                for( _k in Model.prototype ) _model.prototype[_k] = Model.prototype[_k];
            if( _view )
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
                    && ( _r = JC.f.parseBool( this.selector().attr('currentcanselect') ) );
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


                if(  _p.dateParse( _p.selector() ) ){
                    //var _d = _p.dateParse();
                    _p.selector().is('[minvalue]')
                        && ( _r.minvalue = ( _p.dateParse( _p.selector() )( _p.selector().attr('minvalue') ) ).start );

                    _p.selector().is('[maxvalue]')
                        && ( _r.maxvalue = ( _p.dateParse( _p.selector() )( _p.selector().attr('maxvalue') ) ).start );
                }else{
                    _p.selector().is('[minvalue]')
                        && ( _r.minvalue = JC.f.parseISODate( _p.selector().attr('minvalue') ) );

                    _p.selector().is('[maxvalue]')
                        && ( _r.maxvalue = JC.f.parseISODate( _p.selector().attr('maxvalue') ) );
                }

                return _r;
            }
        , defaultSingleSelectDate:
            function( _r ){
                var _p = this
                    , _selector = _p.selector()
                    , _tmp
                    , _v = _selector.val().trim()
                    ;

                if( !_v ){
                    _r.date = new Date();
                    _r.enddate = JC.f.cloneDate( _r.date );
                    return _r;
                }

                if( _p.dateParse( _p.selector() ) ){
                    var _tmpDataObj = _p.dateParse( _p.selector() )( _p.selector().val().trim() );
                        _r.date = _tmpDataObj.start;
                        _r.enddate = _tmpDataObj.end;
                        !_r.enddate && ( _r.enddate = _r.date );
                }else{
                    if( _tmp = JC.f.parseISODate( _selector.val() ) ) _r.date = _tmp;
                    else{
                        if( _selector.val() && (_tmp = _selector.val().replace( /[^\d]/g, '' ) ).length == 16 ){
                            _r.date = JC.f.parseISODate( _tmp.slice( 0, 8 ) );
                            _r.enddate = JC.f.parseISODate( _tmp.slice( 8 ) );
                        }else{
                            _tmp = new Date();
                            if( Calendar.lastIpt && Calendar.lastIpt.is('[defaultdate]') ){
                                _tmp = JC.f.parseISODate( Calendar.lastIpt.attr('defaultdate') ) || _tmp;
                            }
                            _r.date = new Date( _tmp.getFullYear(), _tmp.getMonth(), _tmp.getDate() );
                        }
                    }

                }


                return _r;
            }
        , defaultMultiselectDate:
            function( _r ){
                var _p = this
                    , _selector = Calendar.lastIpt
                    , _tmp
                    , _multidatear
                    , _dstart, _dend
                    ;

                    if( _selector.val() ){
                        //JC.log( 'defaultMultiselectDate:', _p.selector().val(), ', ', _tmp );
                        _tmp = _selector.val().trim().replace(/[^\d,]/g, '').split(',');
                        _multidatear = [];


                        $.each( _tmp, function( _ix, _item ){

                            if( _p.dateParse( _selector ) ){
                                var _tmpDataObj = _p.dateParse( _selector )( _item );
                                    _dstart = _tmpDataObj.start;
                                    _dend = _tmpDataObj.end;
                                    !_dend && ( _dend = _dstart );
                                    _multidatear.push( { 'start': _dstart, 'end': _dend } );
                            }else{

                                if( _item.length == 16 ){
                                    _dstart = JC.f.parseISODate( _item.slice( 0, 8 ) );
                                    _dend = JC.f.parseISODate( _item.slice( 8 ) );

                                    if( !_ix ){
                                        _r.date = JC.f.cloneDate( _dstart );
                                        _r.enddate = JC.f.cloneDate( _dend );
                                    }
                                    _multidatear.push( { 'start': _dstart, 'end': _dend } );
                                }else if( _item.length == 8 ){
                                    _dstart = JC.f.parseISODate( _item.slice( 0, 8 ) );
                                    _dend = JC.f.cloneDate( _dstart );

                                    if( !_ix ){
                                        _r.date = JC.f.cloneDate( _dstart );
                                        _r.enddate = JC.f.cloneDate( _dend );
                                    }
                                    _multidatear.push( { 'start': _dstart, 'end': _dend } );
                                }
                            }
                        });
                        //alert( _multidatear + ', ' + _selector.val() );

                        _r.multidate = _multidatear;

                    }else{
                        _tmp = new Date();
                        if( Calendar.lastIpt && Calendar.lastIpt.is('[defaultdate]') ){
                            _tmp = JC.f.parseISODate( Calendar.lastIpt.attr('defaultdate') ) || _tmp;
                        }
                        _r.date = new Date( _tmp.getFullYear(), _tmp.getMonth(), _tmp.getDate() );
                        _r.enddate = JC.f.cloneDate( _r.date );
                        _r.enddate.setDate( JC.f.maxDayOfMonth( _r.enddate ) );
                        _r.multidate = [];
                        _r.multidate.push( {'start': JC.f.cloneDate( _r.date ), 'end': JC.f.cloneDate( _r.enddate ) } );
                    }
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
                _max = JC.f.maxDayOfMonth( _dateo.date );
                _day > _max && ( _day = _max );
                _dateo.date.setDate( _day );
                return _dateo;
            }
        , multiLayoutDate:
            function(){
                JC.log( 'Calendar.Model multiLayoutDate', new Date().getTime() );
                var _p = this
                    , _dateo = _p.defaultDate()
                    , _year = _p.year()
                    , _month = _p.month()
                    , _monthSel = _p.layout().find('select.UMonth')
                    ;

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

                if( _monthSel.length ){
                    _dateo.date.setMonth( _month );
                    _dateo.enddate.setMonth( _month );
                }


                $.each( _dateo.multidate, function( _ix, _item ){
                    _item.start.setFullYear( _year );
                    _item.end.setFullYear( _year );
                    if( _monthSel.length ){
                        _item.start.setMonth( _month );
                        _item.end.setMonth( _month );
                    }
                });

                return _dateo;

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
                    && ( _r = JC.f.parseBool( this.selector().attr('multiselect') ) );
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
        
        , updateFormat:
            function( _selector ){
                _selector && ( _selector = $( _selector ) );
                if( !( _selector && _selector.length ) ) return;
                var _p = this
                    , _type = ( _selector.attr('datetype') || _selector.attr('multidate') || '' ).toLowerCase().trim() 
                    , _v = _selector.val().trim()
                    , _dp = _p.dateParse( _selector )
                    , _dstart, _dend
                    , _do
                    ;
                if( !_v ) return;

                if( _type == 'date' && !_selector.attr( 'fullDateFormat' ) ){
                    _selector.attr( 'fullDateFormat', '{0}' );
                }

                if( _dp ){
                    switch( _type ){
                        case 'date': 
                            {
                                break;
                            }
                        case 'week':
                        case 'month':
                        case 'season':
                        case 'year':
                            {
                                _do = _dp( _v );
                                _selector.val( _p.fullFormat( _p.dateFormat( _do.start, _selector )
                                                                , _p.dateFormat( _do.end, _selector )
                                                                , _selector 
                                            ) );

                                break;
                            }
                    }
                }else{
                    switch( _type ){
                        case 'date': 
                            {
                                _dstart = JC.f.parseISODate( _v );
                                _selector.val( _p.dateFormat( _dstart, _selector ) || _v );
                                break;
                            }
                    }
                }
            }

        , dateFormat:
            function( _date, _selector ){
                _selector = _selector || this.selector();
                var _r = '', _format = _selector.attr( 'dateFormat' ) || 'YY-MM-DD';
                _date && ( _r = JC.f.dateFormat( _date, _format ) );
                return _r;
            }

        , fullFormat:
            function( _date, _endDate, _selector ){
                _selector = _selector || this.selector();
                var _r = '', _fullFormat = _selector.attr( 'fullDateFormat' ) || '{0} 至 {1}';
                if( _date && _endDate ){
                    _r = JC.f.printf( _fullFormat, this.dateFormat( _date, _selector ), this.dateFormat( _endDate, _selector ) );
                }else if( _date ){
                    _r = JC.f.printf( _fullFormat, this.dateFormat( _date, _selector ) );
                }else if( _endDate ){
                    _r = JC.f.printf( _fullFormat, this.dateFormat( _endDate, _selector ) );
                }
                return _r;
            }

        , dateParse:
            function( _selector ){
                var _r;

                _selector
                    && _selector.attr( 'dateParse' )
                    && ( _r = window[ _selector.attr( 'dateParse' ) ] )
                    ;

                return _r;
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
                JC.log( 'Calendar.View: show', new Date().getTime(), JC.f.formatISODate( _dateo.date ) );

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
                _max = JC.f.maxDayOfMonth( _dateo.date );
                _day > _max && ( _day = _max );
                _dateo.date.setDate( _day );
                this._buildLayout( _dateo );
                this._buildDone();
            }
        , updateMultiYear:
            function( _offset ){
                var _dateo = this._model.layoutDate(), _day, _max;

                JC.Calendar.updateMultiYear( _dateo.date, _offset );
                JC.Calendar.updateMultiYear( _dateo.enddate, _offset );

                if( _dateo.multidate ){
                    $.each( _dateo.multidate, function( _ix, _item ){
                        JC.Calendar.updateMultiYear( _item.start, _offset );
                        JC.Calendar.updateMultiYear( _item.end, _offset );
                    });
                }
                this._buildLayout( _dateo );
                this._buildDone();
            }
        , updateMonth:
            function( _offset ){
                if( typeof _offset == 'undefined' || _offset == 0 ) return;

                this._model.multiselect() 
                    ? this.updateMultiMonth( _offset )
                    : this.updateSingleMonth( _offset )
                    ;
            }
        , updateMultiMonth:
            function( _offset ){
                var _dateo = this._model.layoutDate(), _day, _max;

                JC.Calendar.updateMultiMonth( _dateo.date, _offset );
                JC.Calendar.updateMultiMonth( _dateo.enddate, _offset );

                if( _dateo.multidate ){
                    $.each( _dateo.multidate, function( _ix, _item ){
                        JC.Calendar.updateMultiMonth( _item.start, _offset );
                        JC.Calendar.updateMultiMonth( _item.end, _offset );
                    });
                }
                this._buildLayout( _dateo );
                this._buildDone();
            }
        , updateSingleMonth:
            function( _offset ){
                var _dateo = this._model.layoutDate(), _day = _dateo.date.getDate(), _max;
                _dateo.date.setDate( 1 );
                _dateo.date.setMonth( _dateo.date.getMonth() + _offset );
                _max = JC.f.maxDayOfMonth( _dateo.date );
                _day > _max && ( _day = _max );
                _dateo.date.setDate( _day );
                this._buildLayout( _dateo );
                this._buildDone();
            }
        , updateSelected:
            function( _userSelectedItem ){
                var _p = this, _date, _tmp;
                if( !_userSelectedItem ){
                    _date = this._model.selectedDate(); 
                }else{
                    _userSelectedItem = $( _userSelectedItem );
                    _tmp = JC.f.getJqParent( _userSelectedItem, 'td' );
                    if( _tmp && _tmp.hasClass('unable') ) return;
                    _date = new Date();
                    _date.setTime( _userSelectedItem.attr('date') );
                }
                if( !_date ) return;

                _p._model.selector().val( _p._model.dateFormat( _date ) );

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
                    , _scrleft = $(document).scrollLeft()
                    , _scrtop = $(document).scrollTop()
                    ;

                _x = _ioset.left; _y = _ioset.top + _ih + 5;

                if( ( _y + _lh - _scrtop ) > _winh ){
                    JC.log('y overflow');
                    _y = _ioset.top - _lh - 3;
                    _y < _scrtop && ( _y = _scrtop );
                }

                if( ( _x + _lw -_scrleft ) > _winw ){
                    _x = _winw - _lw + _scrleft - 5;
                }
                _x < _scrleft && ( _x = _scrleft + 0 );

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
                

                //JC.log( '_buildBody: \n', JSON.stringify( _dateo ) );

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
                    _ls.push( JC.f.printf( '<option value="{0}"{1}>{0}</option>', i, i === _selected ? ' selected' : '' ) );
                }
                $( _ls.join('') ).appendTo( _layout.find('select.UYear').html('') );

                $( _layout.find('select.UMonth').val( _dateo.date.getMonth() ) );
            }
        , _buildBody:
            function( _dateo ){
                var _p = this, _layout = _p._model.layout();
                var _maxday = JC.f.maxDayOfMonth( _dateo.date ), _weekday = _dateo.date.getDay() || 7
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
                    if( !JC.f.isSameMonth( _dateo.date, _beginDate ) ) _class.push( 'other' );
                    if( _dateo.minvalue && _beginDate.getTime() < _dateo.minvalue.getTime() ) 
                        _class.push( 'unable' );
                    if( _dateo.maxvalue && _beginDate.getTime() > _dateo.maxvalue.getTime() ) 
                        _class.push( 'unable' );

                    if( JC.f.isSameDay( _beginDate, today ) ) _class.push( 'today' );
                    if( JC.f.isSameDay( _dateo.date, _beginDate ) ) _class.push( 'cur' );

                    _ls.push( '<td class="', _class.join(' '),'">'
                            ,'<a href="javascript:" date="', _beginDate.getTime(),'" title="'+JC.f.formatISODate(_beginDate)+'" >'
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
    /**
     * 捕获用户更改年份 
     * <p>监听 年份下拉框</p>
     * @event year change
     * @private
     */
    $(document).delegate( 'body > div.UXCCalendar select.UYear, body > div.UXCCalendar select.UMonth', 'change', function( $evt ){
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
     * 捕获用户更改月份 
     * <p>监听 下一月按钮</p>
     * @event next year
     * @private
     */
    $(document).delegate( 'body > div.UXCCalendar button.UNextMonth', 'click', function( $evt ){
        Calendar.getInstance( Calendar.lastIpt )
            && Calendar.getInstance( Calendar.lastIpt ).updateMonth( 1 );
    });
    /**
     * 捕获用户更改月份
     * <p>监听 上一月按钮</p>
     * @event previous year
     * @private
     */
    $(document).delegate( 'body > div.UXCCalendar button.UPreMonth', 'click', function( $evt ){
        Calendar.getInstance( Calendar.lastIpt )
            && Calendar.getInstance( Calendar.lastIpt ).updateMonth( -1 );
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
        var _p = $(this), _tmp;
        if( !_p.data( Calendar.Model.INPUT ) ){
            _tmp = _p.prev( 'input[type=text], textarea' );
            _tmp.length && _p.data( Calendar.Model.INPUT, _tmp );
        }
        _p.data( Calendar.Model.INPUT ) 
            && !_p.data( Calendar.Model.INPUT ).is('[disabled]')
            && Calendar.pickDate( _p.data( Calendar.Model.INPUT ) );
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
        JC.f.safeTimeout( function( $evt ){
            if( !Calendar.autoInit ) return;
            Calendar.initTrigger( $(document) );
        }, null, 'CalendarInitTrigger', 200 );
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
        $(document).on('click', function($evt){
            var _src = $evt.target || $evt.srcElement;

            if( Calendar.domClickFilter ) if( Calendar.domClickFilter( $(_src) ) === false ) return;

            if( Calendar.isCalendar($evt.target||$evt.targetElement) ) return;

            if( _src && ( _src.nodeName.toLowerCase() != 'input'
                    && _src.nodeName.toLowerCase() != 'button' 
                    && _src.nodeName.toLowerCase() != 'textarea' 
                    ) ){
                Calendar.hide(); return;
            }

            JC.f.safeTimeout( function(){
                if( Calendar.lastIpt && Calendar.lastIpt.length && _src == Calendar.lastIpt[0] ) return;
                Calendar.hide();
            }, null, 'CalendarClickHide', 100 );
        });
    });
    $(document).delegate( [ 'input[datatype=date]', 'input[datatype=daterange]'
                            , 'input[multidate=date]', 'input[multidate=daterange]' ].join(), 'focus' 
    , function($evt){
            Calendar.pickDate( this );
    });
    $(document).delegate( [ 'button[datatype=date]', 'button[datatype=daterange]'
                            , 'button[multidate=date]', 'button[multidate=daterange]' ].join(), 'click' , function($evt){
            Calendar.pickDate( this );
    });
    $(document).delegate( [ 'textarea[datatype=date]', 'textarea[datatype=daterange]'
                            , 'textarea[multidate=date]', 'textarea[multidate=daterange]' ].join(), 'click' , function($evt){
            Calendar.pickDate( this );
    });

}(jQuery));
    return JC.Calendar;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
