(function($){
    !window.JC && (window.JC = { log:function(){} });
    window.ZINDEX_COUNT = window.ZINDEX_COUNT || 50001;
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
     * @namespace JC
     * @class Calendar
     * @static
     * @version dev 0.1
     * @author  qiushaowei   <suches@btbtd.org> | 360 75 team Team
     * @date    2013-06-04
     */
    /**
     * //TODO 添加事件响应机制
     */
    var Calendar = JC.Calendar = window.Calendar = 
    {
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
        pickDate: 
            function( _selector ){ 
                _selector = $( _selector );
                if( !(_selector && _selector.length) ) return;
                $('body > div.UXCCalendar').hide();
                Calendar.lastIpt = _selector;
                _selector = $(_selector);
                var _type = $.trim(_selector.attr('multidate') || '').toLowerCase();
                switch( _type ){
                    case 'week': Calendar.pickWeek && Calendar.pickWeek( _selector ); break;
                    case 'month': Calendar.pickMonth && Calendar.pickMonth( _selector ); break;
                    case 'season': Calendar.pickSeason && Calendar.pickSeason( _selector ); break;
                    default: _logic.pickDate( _selector );
                }

                Calendar.layoutInitedCallback && Calendar.layoutInitedCallback( $('body > div.UXCCalendar:visible'), _selector );
            } 
        /**
         * 初始化 _selector 中的所有日历组件
         * @method  init
         * @static
         * @param   {selector}  _selector 需要初始化的日历组件父容器/日期选择input选择器
         * @example
                <script>
                    $.post( url, function( _d ){
                        _d = $(_d);
                        _d.appendTo(body);
                        JC.Calendar.init( _d );
                    });
                </script>
         */
        , init: function( _selector ){ _logic.initTrigger( _selector ); }
        /**
         * 设置是否在 DOM 加载完毕后, 自动初始化所有日期控件
         * @property    autoInit
         * @default true
         * @type    {bool}
         * @static
                <script>JC.Calendar.autoInit = true;</script>
         */
        , autoInit: true
        /**
         * 设置默认显示的年份数, 该数为前后各多少年 默认为前后各10年
         * @property    defaultDateSpan
         * @type        {int}
         * @default     20
         * @static
                <script>JC.Calendar.defaultDateSpan = 20;</script>
         */
        , defaultDateSpan: 20
        /**
         * 最后一个显示日历组件的文本框
         * @property  Calendar.lastIpt
         * @type    selector
         * @static
         */
        , lastIpt: null
        /**
         * 设置日历组件的显示位置
         * @method  Calendar.setPosition
         * @static
         * @param   {selector}  _ipt    需要显示日历组件的文本框
         */
        , setPosition:
            function( _ipt, _layout ){
                if( !( _ipt && _layout ) ) return;
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
        /** 
         * 判断选择器是否为日历组件的对象
         * @method  Calendar.isCalendarElement
         * @static
         * @param   {selector}  _selector
         * return   bool
         */
        , isCalendarElement:
            function( _selector ){
                _selector = $(_selector);
                var _r = 0;

                if( _selector.length ){
                    if( _selector.hasClass('UXCCalendar_btn') ) _r = 1;
                    if( _selector.prop('nodeName') 
                            && _selector.attr('datatype')
                            && _selector.prop('nodeName').toLowerCase()=='input' 
                            && _selector.attr('datatype').toLowerCase()=='date') _r = 1;
                    if( _selector.prop('nodeName') 
                            && _selector.attr('multidate')
                            && _selector.prop('nodeName').toLowerCase()=='input') _r = 1;
                }

                return _r;
            }
        /**
         * 初始化外观后的回调函数
         * @property layoutInitedCallback
         * @type    function
         * @static
         * @default null
         */
        , layoutInitedCallback: null
        /**
         * 日历隐藏后的回调函数
         * @property layoutHideCallback
         * @type    function
         * @static
         * @default null
         */
        , layoutHideCallback: null
        /**
         * DOM 点击的过滤函数
         * <br />默认 dom 点击时, 判断事件源不为 input[datatype=date|daterange] 会隐藏 Calendar
         * <br /> 通过该回调可自定义过滤, 返回 false 不执行隐藏操作
         * @property domClickFilter
         * @type    function
         * @static
         * @default null
         */
        , domClickFilter: null
        /**
         * 隐藏日历组件
         * @method  hide
         * @static
         * @example
                <script>JC.Calendar.hide();</script>
         */
        , hide:
            function(){
                $('body > div.UXCCalendar').hide();
                Calendar.layoutHideCallback && Calendar.layoutHideCallback( Calendar.lastIpt );
            }
        /**
         * 获取初始日期对象
         * @method  Calendar.getDate
         * @static
         * @param   {selector}  _selector   显示日历组件的input
         * return   Object  { date: 0, minvalue: 0, maxvalue: 0, initMinvalue: 0, initMaxvalue: 0 }
         */
        , getDate:
            function( _selector ){
                var _r = { date: 0, minvalue: 0, maxvalue: 0, initMinvalue: 0, initMaxvalue: 0 }, _tmp;

                if( _tmp = parseISODate( _selector.val() ) ) _r.date = _tmp;
                else{
                    if( _selector.val() && (_tmp = _selector.val().replace( /[^\d]/g, '' ) ).length == 16 ){
                        _r.date = parseISODate( _tmp.slice( 0, 8 ) );
                        _r.rangeStart = cloneDate( _r.date );
                        _r.rangeEnd = parseISODate( _tmp.slice( 8 ) );
                    }else{
                        _r.date = new Date();
                    }
                }

                _r.minvalue = parseISODate( _selector.attr('minvalue') );
                _r.maxvalue = parseISODate( _selector.attr('maxvalue') );
                
                //_r.minvalue && ( _r.initMinvalue = cloneDate( _r.minvalue ) );
                //_r.maxvalue && ( _r.initMaxvalue = cloneDate( _r.maxvalue ) );
                Calendar.updateInitYearList( _r );
                return _r;
            }
        , updateInitYearList:
            function( _dateObj ){
                _dateObj.initMinvalue = cloneDate( _dateObj.date );
                _dateObj.initMinvalue.setFullYear( _dateObj.initMinvalue.getFullYear() - Calendar.defaultDateSpan );

                _dateObj.initMaxvalue = cloneDate( _dateObj.date );
                _dateObj.initMaxvalue.setFullYear( _dateObj.initMaxvalue.getFullYear() + Calendar.defaultDateSpan );
            }
        /**
         * 每周的中文对应数字
         * @property    cnWeek
         * @type    string
         * @static
         * @default 日一二三四五六 
         */
        , cnWeek: "日一二三四五六"
        /**
         * 100以内的中文对应数字
         * @property    cnUnit
         * @type    string
         * @static
         * @default 十一二三四五六七八九    
         */
        , cnUnit: "十一二三四五六七八九"
        /**
         * 转换 100 以内的数字为中文数字
         * @method  getCnNum
         * @static
         * @param   {int}   _num
         * @return  string
         */
        , getCnNum:
            function ( _num ){
                var _r = Calendar.cnUnit.charAt( _num % 10 );
                _num > 10 && ( _r = (_num % 10 !== 0 ? Calendar.cnUnit.charAt(0) : '') + _r );
                _num > 19 && ( _r = Calendar.cnUnit.charAt( Math.floor( _num / 10 ) ) + _r );
                return _r;
            }
        /**
         * 自定义日历组件模板
         * <p>默认模板为_logic.tpl</p>
         * <p>如果用户显示定义JC.Calendar.tpl的话, 将采用用户的模板</p>
         * @property    tpl
         * @type    {string}
         * @default empty
         * @static
         */
        , tpl: ''
    };
    /**
     * 私有逻辑处理对象, 基本上所有逻辑方法都存放于此对象
     * @property _logic
     * @type {Object}
     * @static
     * @private
     */
    var _logic =
    {
        /**
         * 初始化日历组件的触发按钮
         * @method  _logic.initTrigger
         * @param   {selector}      _selector   
         * @private
         */
        initTrigger:
            function( _selector ){
               _selector.each( function(){
                    var _p = $(this), _nodeName = (_p.prop('nodeName')||'').toLowerCase();
                    JC.log( '\nCalendar.init: ', _nodeName );

                    if( _nodeName != 'input' ){ 
                        _logic.initTrigger( _selector.find( $('input[type=text]') ) ); 
                        return; 
                    }
                    if( !($.trim( _p.attr('datatype') || '').toLowerCase() == 'date' 
                            || $.trim( _p.attr('multidate') || '')
                            || $.trim( _p.attr('datatype') || '').toLowerCase() == 'daterange') ) return;

                    JC.log( 'find Calendar item:', _p.attr('name'), _p.attr('id'), _p.attr('datatype') );
                    var _btn = _p.find( '+ input.UXCCalendar_btn' );
                    if( !_btn.length ){
                        _p.after( _btn = $('<input type="button" class="UXCCalendar_btn"  />') );
                    }

                    _btn[0].forCalendar = _p;
                });
            }
        /**
         * 最后一个显示日历组件的日期对象
         * @property    _logic.lastDateObj
         * @type        Object
         * @private
         */
        , lastDateObj: null
        /**
         * 显示日历组件
         * @method  _logic.pickDate
         * @param   {selector}  _selector input[type=text][datatype=date]
         * @private
         */
        , pickDate:
            function( _selector ){
                JC.log( 'Calendar.pickDate', new Date().getTime() );

                _selector = $(_selector);

                var _dateObj = _logic.lastDateObj = Calendar.getDate( _selector );

                JC.log( _dateObj.date.getFullYear(), _dateObj.date.getMonth()+1, _dateObj.date.getDate() );

                _logic.initDateLayout( _dateObj );
                Calendar.setPosition( _selector, _logic.getLayout() );

                _selector.blur();
            }
        /**
         * 初始化日历组件的所有日期
         *      _dateObj = { date: date, minvalue: date, maxvalue: date, initMinvalue: date, initMaxvalue: date };
         * @method  _logic.initDateLayout
         * @param   {DateObjects}   _dateObj   保存所有相关日期的对象
         * @private
         */
        , initDateLayout:
            function( _dateObj ){
                Calendar.updateInitYearList( _dateObj );

                _logic.initYear( _dateObj );
                _logic.initMonth( _dateObj );
                _logic.initMonthDate( _dateObj );
            }
        /**
         * 初始化月份的所有日期
         * @method  _logic.initMonthDate
         * @param   {DateObjects}   _dateObj   保存所有相关日期的对象
         * @private
         */
        , initMonthDate:
            function( _dateObj ){
                var _layout = _logic.getLayout();
                var _maxday = maxDayOfMonth( _dateObj.date ), _weekday = _dateObj.date.getDay() || 7
                    , _sumday = _weekday + _maxday, _row = 6, _ls = [], _premaxday, _prebegin
                    , _tmp, i, _class;

                var _beginDate = new Date( _dateObj.date.getFullYear(), _dateObj.date.getMonth(), 1 );
                var _beginWeekday = _beginDate.getDay() || 7;
                if( _beginWeekday < 2 ){
                    _beginDate.setDate( -(_beginWeekday-1+6) );
                }else{
                    _beginDate.setDate( -(_beginWeekday-2) );
                }
                var today = new Date();

                var ipt = JC.Calendar.lastIpt, currentcanselect = true;
                if( ipt.is('[currentcanselect]') ) currentcanselect = parseBool( ipt.attr('currentcanselect') );

                if( _dateObj.maxvalue && !currentcanselect ){
                    _dateObj.maxvalue.setDate( _dateObj.maxvalue.getDate() - 1 );
                }

                _ls.push('<tr>');
                for( i = 1; i <= 42; i++ ){
                    _class = [];
                    if( _beginDate.getDay() === 0 || _beginDate.getDay() == 6 ) _class.push('weekend');
                    if( !isSameMonth( _dateObj.date, _beginDate ) ) _class.push( 'other' );
                    if( _dateObj.minvalue && _beginDate.getTime() < _dateObj.minvalue.getTime() ) 
                        _class.push( 'unable' );
                    if( _dateObj.maxvalue && _beginDate.getTime() > _dateObj.maxvalue.getTime() ) 
                        _class.push( 'unable' );

                    if( isSameDay( _beginDate, today ) ) _class.push( 'today' );
                    if( isSameDay( _dateObj.date, _beginDate ) ) _class.push( 'cur' );

                    _ls.push( '<td class="', _class.join(' '),'">'
                            ,'<a href="javascript:" date="', _beginDate.getTime(),'" title="'+formatISODate(_beginDate)+'" >'
                            , _beginDate.getDate(), '</a></td>' );
                    _beginDate.setDate( _beginDate.getDate() + 1 );
                    if( i % 7 === 0 && i != 42 ) _ls.push( '</tr><tr>' );
                }
                _ls.push('</tr>');

                _layout.find('table.UTableBorder tbody' ).html( $( _ls.join('') ) );

                JC.log( _prebegin, _premaxday, _maxday, _weekday, _sumday, _row );
            }
        /**
         * 初始化月份
         * @method  _logic.initMonth
         * @param   {DateObjects}   _dateObj   保存所有相关日期的对象
         * @private
         */
        , initMonth:
            function( _dateObj ){
                var _layout = _logic.getLayout();
                $( _layout.find('select.UMonth').val( _dateObj.date.getMonth() ) );
            }
        /**
         * 初始化年份
         * @method  _logic.initYear
         * @param   {DateObjects}   _dateObj   保存所有相关日期的对象
         * @private
         */
        , initYear:
            function( _dateObj ){
                var _layout = _logic.getLayout(), _ls = [], _tmp, _selected
                    , _sYear = _dateObj.initMinvalue.getFullYear()
                    , _eYear = _dateObj.initMaxvalue.getFullYear();

                JC.log( _sYear, _eYear );

                if( !_selected ) _selected = _dateObj.date.getFullYear();

                for( var i = _sYear; i <= _eYear; i++ ){
                    _tmp = '';
                    if( _selected === i ) _tmp = " selected "
                    _ls.push( '<option value="'+i+'"'+_tmp+'>'+i+'</option>' );
                }

                $( _ls.join('') ).appendTo( _layout.find('select.UYear').html('') );
            }
        /**
         * 按年份更改日期
         * @method  _logic.updateYear
         * @param   {int}   _year   新的年份, YYYY
         * @private
         */
        , updateYear:
            function( _year ){
                JC.log( _year );
                if ( !_logic.lastDateObj ) return;
                var _premaxday = maxDayOfMonth( _logic.lastDateObj.date )
                    , _d = new Date( _year, _logic.lastDateObj.date.getMonth(), 1 )
                    , _nextmaxday = maxDayOfMonth( _d );
                if( _premaxday > _nextmaxday ) _d.setDate( _nextmaxday );
                else _d.setDate( _logic.lastDateObj.date.getDate() );

                _logic.lastDateObj.date = _d;

                _logic.initDateLayout( _logic.lastDateObj );
            }
        /**
         * 按月份更改日期
         * @method  _logic.setNewMonth
         * @param   {int}   _month  新的月份, mm
         * @private
         */
        , setNewMonth:
            function( _month ){
                JC.log( _month );
                if ( !_logic.lastDateObj ) return;
                var _premaxday = maxDayOfMonth( _logic.lastDateObj.date )
                    , _d = new Date( _logic.lastDateObj.date.getFullYear(), _month, 1 )
                    , _nextmaxday = maxDayOfMonth( _d );
                if( _premaxday > _nextmaxday ) _d.setDate( _nextmaxday );
                else _d.setDate( _logic.lastDateObj.date.getDate() );

                _logic.lastDateObj.date = _d;

                _logic.initMonth( _logic.lastDateObj );
                _logic.initMonthDate( _logic.lastDateObj );
            }
        /**
         * 获取日历组件的外观
         * @method  _logic.getLayout
         * @return  {selector} 日历组件的selector
         * @private
         */
        , getLayout:
            function(){
                var _r = $('#UXCCalendar');

                if( !_r.length ){
                    _r = $( Calendar.tpl || _logic.tpl );
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
                    _r.hide();
                    _r.data('confirmMethod', _logic.onConfirm );
                    _r.data('updateYearMethod', _logic.updateYear );
                 }

                return _r;
            }
        /**
         * 把日期赋值给文本框
         * @method  _logic.setDate
         * @param   {int}   _timestamp  日期对象的时间戳
         * @private
         */
        , setDate:
            function( _timestamp ){
                if( !(_timestamp && Calendar.lastIpt && Calendar.lastIpt.length ) ) return;
                var _d = new Date(), _symbol = '-'; _d.setTime( _timestamp );
                var _df = Calendar.lastIpt.attr('dateFormat');
                if( _df ){
                    _df = _df.replace(/[\da-zA-Z]/g, '');
                    if( _df.length ) _df = _df.slice(0, 1);
                    _symbol = _df;
                }
                var _dStr = formatISODate( _d, _symbol );
                Calendar.lastIpt.val( _dStr ).focus();
            }
        /**
         * 给文本框赋值, 日期为控件的当前日期
         * @method  _logic.onConfirm
         * @return  {int}   0/1
         * @private
         */
        , onConfirm:
            function(){
                var _cur;
                _cur = _logic.getLayout().find('table td.cur a');
                if( _cur.parent('td').hasClass('unable') ) return 0;
                _cur && _cur.length && _cur.attr('date') && _logic.setDate( _cur.attr('date') );
                return 1;
            }
        /**
         * 日历组件模板
         * <p>这是默认模板, 用户可以给 JC.Calendar.tpl 赋值, 更改为自己的模板</p>
         * @property    _logic.tpl
         * @type    string
         * @private
         */
        , tpl: 
        [
        '<div id="UXCCalendar" class="UXCCalendar">\n'
        ,'    <div class="UHeader">\n'
        ,'        <select class="UYear"></select>\n'
        ,'        <img class="UImg yearctl" align="absMiddle" usemap="#UXCCalendar_Year" />\n'
        ,'        <map name="UXCCalendar_Year"><area shape="rect" coords="0,0,13,8" href="#" action="up"><area shape="rect" coords="0,10,13,17" href="#" action="down"></map>\n'
        ,'        <select class="UMonth"></select>\n'
        ,'        <img class="UImg monthctl" align="absMiddle" usemap="#UXCCalendar_Month"  />\n'
        ,'        <map name="UXCCalendar_Month"><area shape="rect" coords="0,0,13,8" href="#" action="up"><area shape="rect" coords="0,10,13,17" href="#" action="down"></map>\n'
        ,'    </div>\n'
        ,'    <table class="UTable">\n'
        ,'        <thead>\n'
        ,'            <tr>\n'
        ,'                <th>一</th>\n'
        ,'                <th>二</th>\n'
        ,'                <th>三</th>\n'
        ,'                <th>四</th>\n'
        ,'                <th>五</th>\n'
        ,'                <th>六</th>\n'
        ,'                <th>日</th>\n'
        ,'            </tr>\n'
        ,'        </thead>\n'
        ,'   </table>\n'
        ,'   <table class="UTable UTableBorder">\n'
        ,'        <tbody>\n'
        ,'           <!--<tr>\n'
        ,'                <td class="cur"><a href="#">2</a></td>\n'
        ,'                <td class="unable"><a href="#">2</a></td>\n'
        ,'                <td class="weekend cur"><a href="#">6</a></td>\n'
        ,'                <td class="weekend hover"><a href="#">13</a></td>\n'
        ,'                <td class="weekend other"><a href="#">41</a></td>\n'
        ,'                <td class="weekend other"><a href="#">42</a></td>\n'
        ,'            </tr>\n-->'
        ,'        </tbody>\n'
        ,'    </table>\n'
        ,'    <div class="UFooter">\n'
        ,'        <button type="button" class="UConfirm">确定</button>\n'
        ,'        <button type="button" class="UClear">清空</button>\n'
        ,'        <button type="button" class="UCancel">取消</button>\n'
        ,'    </div>\n'
        ,'</div>\n'
        ].join('')
    };
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
            Calendar.init( $('input[type=text]') );
        }, 200 );
        /**
         * 捕获用户更改年份 
         * <p>监听 年份下拉框</p>
         * @event year change
         * @private
         */
        $(document).delegate( 'body > div.UXCCalendar select.UYear', 'change', function( $evt ){
            var box = $(this).parents( 'div.UXCCalendar' );
            box.length && box.data('updateYearMethod') && box.data('updateYearMethod')( $(this).val()  );
        });
        /**
         * 捕获用户更改年份 
         * <p>监听 下一年按钮</p>
         * @event next year
         * @private
         */
        $(document).delegate( 'body > div.UXCCalendar button.UNextYear', 'click', function( $evt ){
            var box = $(this).parents( 'div.UXCCalendar' );
            box.length && box.data('nextYearMethod') && box.data('nextYearMethod')();
        });
        /**
         * 捕获用户更改年份 
         * <p>监听 上一年按钮</p>
         * @event previous year
         * @private
         */
        $(document).delegate( 'body > div.UXCCalendar button.UPreYear', 'click', function( $evt ){
            var box = $(this).parents( 'div.UXCCalendar' );
            box.length && box.data('preYearMethod') && box.data('preYearMethod')();
        });
        /**
         * 捕获用户更改月份
         * <p>监听 月份下拉框</p>
         * @event   month change
         * @private
         */
        $(document).delegate( '#UXCCalendar select.UMonth', 'change', function( $evt ){
            _logic.setNewMonth( $(this).val() );
        });
        /**
         * 选择当前日期
         * <p>监听确定按钮</p>
         * @event   confirm click
         * @private
         */
        $(document).delegate( 'body > div.UXCCalendar button.UConfirm', 'click', function( $evt ){
            var box = $(this).parents( 'div.UXCCalendar' ), _tmp;
            if( box.length && ( _tmp = box.find('td.cur') ).length ){
                if( _tmp.hasClass( 'unable' ) ) return;
            }
            box.length && box.data('confirmMethod') && box.data('confirmMethod')( this );
            Calendar.hide();
        });
        /**
         * 增加或者减少一年
         * <p>监听 年份map</p>
         * @event   year map click
         * @private
         */
        $(document).delegate( "map[name=UXCCalendar_Year] area" , 'click', function( $evt ){
            $evt.preventDefault();
            var _p = $(this), _do = _logic.lastDateObj;
            if( !(_do && _p.attr("action") ) ) return;
            if( _p.attr("action").toLowerCase() == 'up' ){
                _do.date.setFullYear( _do.date.getFullYear() + 1 );
            }else if( _p.attr("action").toLowerCase() == 'down' ){
                _do.date.setFullYear( _do.date.getFullYear() - 1 );
            }
            _logic.initDateLayout( _do );
            JC.log( _p.attr("action") );
        });
        /**
         * 增加或者减少一个月
         * <p>监听 月份map</p>
         * @event   month map click
         * @private
         */
        $(document).delegate( "map[name=UXCCalendar_Month] area" , 'click', function( $evt ){
            $evt.preventDefault();
            var _p = $(this), _do = _logic.lastDateObj;
            if( !(_do && _p.attr("action") ) ) return;
            if( _p.attr("action").toLowerCase() == 'up' ){
                _do.date.setMonth( _do.date.getMonth() + 1 );
                _do.initMinvalue.setMonth( _do.initMinvalue.getMonth() + 1 );
                _do.initMaxvalue.setMonth( _do.initMaxvalue.getMonth() + 1 );
            }else if( _p.attr("action").toLowerCase() == 'down' ){
                _do.date.setMonth( _do.date.getMonth() - 1 );
                _do.initMinvalue.setMonth( _do.initMinvalue.getMonth() - 1 );
                _do.initMaxvalue.setMonth( _do.initMaxvalue.getMonth() - 1 );
            }
            _logic.initDateLayout( _do );
            JC.log( _p.attr("action") );
        });
        /**
         * 清除文本框内容
         * <p>监听 清空按钮</p>
         * @event   clear click
         * @private
         */
        $(document).delegate( 'body > div.UXCCalendar button.UClear', 'click', function( $evt ){
            Calendar.lastIpt && Calendar.lastIpt.length && Calendar.lastIpt.val('');
        });
        /**
         * 取消日历组件, 相当于隐藏
         * <p>监听 取消按钮</p>
         * @event cancel click
         * @private
         */
        $(document).delegate( 'body > div.UXCCalendar button.UCancel', 'click', function( $evt ){
            Calendar.hide();
        });
        /**
         * dom 点击时, 检查事件源是否为日历组件对象, 如果不是则会隐藏日历组件
         * @event dom click
         * @private
         */
        $(document).on('click', function($evt){
            var _src = $evt.target || $evt.srcElement;

            if( Calendar.domClickFilter ) if( Calendar.domClickFilter( $(_src) ) === false ) return;

            if( Calendar.isCalendarElement($evt.target||$evt.targetElement) ) return;

            if( _src && _src.nodeName.toLowerCase() != 'input' ){
                Calendar.hide(); return;
            }

            setTimeout( function(){
                if( Calendar.lastIpt && Calendar.lastIpt.length && _src == Calendar.lastIpt[0] ) return;
                Calendar.hide();
            }, 100);
        });
        /**
         * 日历组件按钮点击事件
         * @event calendar button click
         * @private
         */
        $(document).delegate( 'input.UXCCalendar_btn', 'click', function($evt){
            if( this.forCalendar ) Calendar.pickDate( this.forCalendar );
        });
        /**
         * 日历组件文本框获得焦点
         * @event input focus
         * @private
         */
        $(document).delegate( 'input[datatype=date], input[datatype=daterange], input[multidate]', 'focus', function($evt){
            Calendar.pickDate( this );
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
         * 日期点击事件
         * @event date click
         * @private
         */
        $(document).delegate( '#UXCCalendar table a', 'click', function( $evt ){
            $evt.preventDefault();
            var _p = $(this), _tm = _p.attr('date')||'';
            if( !_tm ) return;
            if( _p.parent('td').hasClass('unable') ) return;

            JC.log( _tm );

            _logic.setDate( _tm );
            Calendar.hide();
        });
        /**
         * 监听窗口滚动和改变大小, 实时变更日历组件显示位置
         * @event  window scroll, window resize
         * @private
         */
        $(window).on('scroll resize', function($evt){
            var _layout = $('body > div.UXCCalendar:visible');
            if( !( _layout.length && Calendar.lastIpt ) ) return;
            Calendar.setPosition( Calendar.lastIpt, _layout );
        });
    });
}(jQuery));


(function($){
    /**
     * 弹出一年中所有周的选择框
     * @method  pickWeek
     * @for     JC.Calendar
     * @static
     * @param   {selector}  _selector
     */
    JC.Calendar.pickWeek =
        function( _selector ){
            _logic.lastDateObj = JC.Calendar.getDate( _selector );
            JC.Calendar.lastIpt = _selector;
            JC.Calendar.setPosition( _selector, _logic.update( _logic.lastDateObj ) );
        };
    /**
     * 自定义周弹框的模板HTML
     * @for         JC.Calendar
     * @property    pickWeek.tpl
     * @type        string
     * @default     empty
     * @static
     */
    JC.Calendar.pickWeek.tpl = '';
    /**
     * 自定义周日历每周的起始日期 
     * <br /> 0 - 6, 0=周日, 1=周一
     * @for         JC.Calendar
     * @property    pickWeek.dayOffset
     * @static
     * @type    int
     * @default 1
     */
    JC.Calendar.pickWeek.dayOffset = 1;

    var _logic = {
        getLayout:
            function(){
                var _box
                if( !( _box = $('#UXCCalendar_week') ).length ){
                    _box = $( JC.Calendar.pickWeek.tpl || _logic.tpl ); 
                    _box.appendTo( document.body );
                    _box.data('confirmMethod', _logic.onConfirm );
                    _box.data('updateYearMethod', _logic.updateYear );
                    _box.data('nextYearMethod', _logic.nextYear );
                    _box.data('preYearMethod', _logic.preYear );
                }
                return _box;
            }

        , onConfirm:
            function(){
                JC.log( 'Calendar.pickWeek, onConfirm' );
                var _cur = _logic.getLayout().find('td.cur');
                if( !_cur.length ) _logic.getLayout().find('td.today');
                if( _cur.length ) _cur.find('a').trigger('click');
            }
        , updateYear:
            function( _val ){
                if( !_logic.lastDateObj ) return;
                _logic.lastDateObj.date.setFullYear( _val );
                JC.Calendar.updateInitYearList( _logic.lastDateObj );
                _logic.update( _logic.lastDateObj );
            }
        , nextYear:
            function(){
                JC.log( 'nextYearMethod' );
                if( !_logic.lastDateObj ) return;
                _logic.updateYear( _logic.lastDateObj.date.getFullYear() + 1)
            }
        , preYear:
            function(){
                JC.log( 'preYearMethod' );
                if( !_logic.lastDateObj ) return;
                _logic.updateYear( _logic.lastDateObj.date.getFullYear() - 1)
            }
        , update:
            function( _dateObj ){
                _logic.getLayout();
                _logic.updateHead( _dateObj );
                _logic.updateBody( _dateObj );
                return _logic.getLayout();
            }
        , updateHead:
            function( _dateObj ){
                var _layout = _logic.getLayout(), _ls = [], _tmp, _selected
                    , _sYear = _dateObj.initMinvalue.getFullYear()
                    , _eYear = _dateObj.initMaxvalue.getFullYear();


                if( !_selected ) _selected = _dateObj.date.getFullYear();

                for( var i = _sYear; i <= _eYear; i++ ){
                    _tmp = '';
                    if( _selected === i ) _tmp = " selected "
                    _ls.push( '<option value="'+i+'"'+_tmp+'>'+i+'</option>' );
                }

                $( _ls.join('') ).appendTo( _layout.find('select.UYear').html('') );

            }
        , updateBody:
            function( _dateObj ){
                var _date = _dateObj.date;
                var _layout = _logic.getLayout();
                    _layout.find('button.UYearButton').html( _date.getFullYear() );

                var today = new Date( new Date().getFullYear(), new Date().getMonth(), new Date().getDate() ).getTime();
                var weeks = weekOfYear( _date.getFullYear(), JC.Calendar.pickWeek.dayOffset );
                var nextYearWeeks = weekOfYear( _date.getFullYear() + 1, JC.Calendar.pickWeek.dayOffset );
                var nextCount = 0;
                var _ls = [], _class, _data, _title, _sdate, _edate, _year = _date.getFullYear()
                    , _rows = Math.ceil( weeks.length / 8 );

                var ipt = JC.Calendar.lastIpt, currentcanselect = parseBool( ipt.attr('currentcanselect') );

                if( _dateObj.maxvalue && currentcanselect ){
                    var _wd = _dateObj.maxvalue.getDay();
                    if( _wd > 0 ) {
                        _dateObj.maxvalue.setDate( _dateObj.maxvalue.getDate() + ( 7 - _wd ) );
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

                    _title = printf( "{0}年 第{1}周<br/>开始日期: {2} (周{4})<br />结束日期: {3} (周{5})"
                                , _year
                                , JC.Calendar.getCnNum( _data.week )
                                , formatISODate( _sdate )
                                , formatISODate( _edate )
                                , JC.Calendar.cnWeek.charAt( _sdate.getDay() % 7 )
                                , JC.Calendar.cnWeek.charAt( _edate.getDay() % 7 )
                                );

                    _class = [];

                    if( _dateObj.minvalue && _sdate.getTime() < _dateObj.minvalue.getTime() ) 
                        _class.push( 'unable' );
                    if( _dateObj.maxvalue && _edate.getTime() > _dateObj.maxvalue.getTime() ){
                        _class.push( 'unable' );
                    }

                    if( _date.getTime() >= _sdate.getTime() && _date.getTime() <= _edate.getTime() ) _class.push( 'cur' );
                    if( today >= _sdate.getTime() && today <= _edate.getTime() ) _class.push( 'today' );

                    _ls.push( printf( '<td class="{0}"><a href="javascript:" title="{2}"'+
                                    ' dstart="{3}" dend="{4}" week="{1}" >{1}</a></td>'
                                , _class.join(' ')
                                , _data.week 
                                , _title
                                , _sdate.getTime()
                                , _edate.getTime()
                            ));
                    if( i % 8 === 0 && i != j ) _ls.push( '</tr><tr>' );
                }
                _ls.push('</tr>'); 
 
                _layout.find('table.UTableBorder tbody' ).html( $( _ls.join('') ) );

            }
        /**
         * 最后一个显示日历组件的日期对象
         * @property    _logic.lastDateObj
         * @type        Object
         * @private
         */
        , lastDateObj: null
        , tpl:
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
            ].join('')
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

    $(document).delegate('#UXCCalendar_week table a', 'click', function( _evt ){
        var p = $(this), dstart = new Date(), dend = new Date();
        if( !JC.Calendar.lastIpt ) return;
        if( p.parent('td').hasClass( 'unable' ) ) return;
        dstart.setTime( p.attr('dstart') );
        dend.setTime( p.attr('dend') );
        JC.Calendar.lastIpt.val( printf( '{0} 至 {1}', formatISODate( dstart ), formatISODate( dend ) ) );
        JC.Calendar.hide();
    });

}(jQuery));

(function($){
    /**
     * 弹出一年中所有月份的选择框
     * @method  pickMonth
     * @for     JC.Calendar
     * @static
     * @param   {selector}  _selector
     */
    JC.Calendar.pickMonth =
        function( _selector ){
            _logic.lastDateObj = JC.Calendar.getDate( _selector );
            JC.Calendar.lastIpt = _selector;
            JC.Calendar.setPosition( _selector, _logic.update( _logic.lastDateObj ) );
        };
    /**
     * 自定义月份弹框的模板HTML
     * @for         JC.Calendar
     * @property    pickMonth.tpl
     * @type        string
     * @default     empty
     * @static
     */
    JC.Calendar.pickMonth.tpl = '';

    var _logic = {
        getLayout:
            function(){
                var _box
                if( !( _box = $('#UXCCalendar_month') ).length ){
                    _box = $( JC.Calendar.pickMonth.tpl || _logic.tpl ); 
                    _box.appendTo( document.body );
                    _box.data('confirmMethod', _logic.onConfirm );
                    _box.data('updateYearMethod', _logic.updateYear );
                    _box.data('nextYearMethod', _logic.nextYear );
                    _box.data('preYearMethod', _logic.preYear );
                }
                return _box;
            }

        , onConfirm:
            function(){
                JC.log( 'Calendar.pickMonth, onConfirm' );
                var _cur = _logic.getLayout().find('td.cur');
                if( !_cur.length ) _logic.getLayout().find('td.today');
                if( _cur.length ) _cur.find('a').trigger('click');
            }
        , updateYear:
            function( _val ){
                if( !_logic.lastDateObj ) return;
                _logic.lastDateObj.date.setFullYear( _val );
                JC.Calendar.updateInitYearList( _logic.lastDateObj );
                _logic.update( _logic.lastDateObj );
            }
        , nextYear:
            function(){
                JC.log( 'nextYearMethod' );
                if( !_logic.lastDateObj ) return;
                _logic.updateYear( _logic.lastDateObj.date.getFullYear() + 1)
            }
        , preYear:
            function(){
                JC.log( 'preYearMethod' );
                if( !_logic.lastDateObj ) return;
                _logic.updateYear( _logic.lastDateObj.date.getFullYear() - 1)
            }
        , update:
            function( _dateObj ){
                _logic.getLayout();
                _logic.updateHead( _dateObj );
                _logic.updateBody( _dateObj );
                return _logic.getLayout();
            }
        , updateHead:
            function( _dateObj ){
                var _layout = _logic.getLayout(), _ls = [], _tmp, _selected
                    , _sYear = _dateObj.initMinvalue.getFullYear()
                    , _eYear = _dateObj.initMaxvalue.getFullYear();


                if( !_selected ) _selected = _dateObj.date.getFullYear();

                for( var i = _sYear; i <= _eYear; i++ ){
                    _tmp = '';
                    if( _selected === i ) _tmp = " selected "
                    _ls.push( '<option value="'+i+'"'+_tmp+'>'+i+'</option>' );
                }

                $( _ls.join('') ).appendTo( _layout.find('select.UYear').html('') );

            }
        , updateBody:
            function( _dateObj ){
                var _date = _dateObj.date;
                var _layout = _logic.getLayout();
                    _layout.find('button.UYearButton').html( _date.getFullYear() );

                var today = new Date( new Date().getFullYear(), new Date().getMonth(), new Date().getDate() ).getTime();
                var _ls = [], _class, _data, _title, _sdate, _edate, _cnUnit
                    , _year = _date.getFullYear();

                var ipt = JC.Calendar.lastIpt, currentcanselect = parseBool( ipt.attr('currentcanselect') );

                if( _dateObj.maxvalue && currentcanselect ){
                    _dateObj.maxvalue.setDate( maxDayOfMonth( _dateObj.maxvalue ) );
                }

                _ls.push('<tr>');
                for( i = 1, j = 12; i <= j; i++ ){
                    _sdate = new Date( _year, i - 1, 1 ); 
                    _edate = new Date( _year, i - 1, maxDayOfMonth( _sdate ) );

                    _title = printf( "{0}年 {1}月<br/>开始日期: {2} (周{4})<br />结束日期: {3} (周{5})"
                                , _year
                                , JC.Calendar.getCnNum( i )
                                , formatISODate( _sdate )
                                , formatISODate( _edate )
                                , JC.Calendar.cnWeek.charAt( _sdate.getDay() % 7 )
                                , JC.Calendar.cnWeek.charAt( _edate.getDay() % 7 )
                                );

                    _class = [];

                    if( _dateObj.minvalue && _sdate.getTime() < _dateObj.minvalue.getTime() ) 
                        _class.push( 'unable' );
                    if( _dateObj.maxvalue && _edate.getTime() > _dateObj.maxvalue.getTime() ){
                        _class.push( 'unable' );
                    }

                    if( _date.getTime() >= _sdate.getTime() && _date.getTime() <= _edate.getTime() ) _class.push( 'cur' );
                    if( today >= _sdate.getTime() && today <= _edate.getTime() ) _class.push( 'today' );

                    _cnUnit = JC.Calendar.cnUnit.charAt( i % 10 );
                    i > 10 && ( _cnUnit = "十" + _cnUnit );

                    _ls.push( printf( '<td class="{0}"><a href="javascript:" title="{1}"'+
                                    ' dstart="{3}" dend="{4}" month="{5}" >{2}月</a></td>'
                                , _class.join(' ')
                                , _title
                                , _cnUnit
                                , _sdate.getTime()
                                , _edate.getTime()
                                , i
                            ));
                    if( i % 3 === 0 && i != j ) _ls.push( '</tr><tr>' );
                }
                _ls.push('</tr>'); 
 
                _layout.find('table.UTableBorder tbody' ).html( $( _ls.join('') ) );

            }
        /**
         * 最后一个显示日历组件的日期对象
         * @property    _logic.lastDateObj
         * @type        Object
         * @private
         */
        , lastDateObj: null
        , tpl:
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
            ].join('')
    };

    $(document).delegate('#UXCCalendar_month table a', 'click', function( _evt ){
        var p = $(this), dstart = new Date(), dend = new Date();
        if( !JC.Calendar.lastIpt ) return;
        if( p.parent('td').hasClass( 'unable' ) ) return;
        dstart.setTime( p.attr('dstart') );
        dend.setTime( p.attr('dend') );
        JC.Calendar.lastIpt.val( printf( '{0} 至 {1}', formatISODate( dstart ), formatISODate( dend ) ) );
        JC.Calendar.hide();
    });

}(jQuery));

(function($){
    /**
     * 弹出一年中所有季度的选择框
     * @method  pickSeason
     * @for     JC.Calendar
     * @static
     * @param   {selector}  _selector
     */
    JC.Calendar.pickSeason =
        function( _selector ){
            _logic.lastDateObj = JC.Calendar.getDate( _selector );
            JC.Calendar.lastIpt = _selector;
            JC.Calendar.setPosition( _selector, _logic.update( _logic.lastDateObj ) );
        };
    /**
     * 自定义周弹框的模板HTML
     * @for         JC.Calendar
     * @property    pickSeason.tpl
     * @type        string
     * @default     empty
     * @static
     */
    JC.Calendar.pickSeason.tpl = '';

    var _logic = {
        getLayout:
            function(){
                var _box
                if( !( _box = $('#UXCCalendar_season') ).length ){
                    _box = $( JC.Calendar.pickSeason.tpl || _logic.tpl ); 
                    _box.appendTo( document.body );
                    _box.data('confirmMethod', _logic.onConfirm );
                    _box.data('updateYearMethod', _logic.updateYear );
                    _box.data('nextYearMethod', _logic.nextYear );
                    _box.data('preYearMethod', _logic.preYear );
                }
                return _box;
            }

        , onConfirm:
            function(){
                JC.log( 'Calendar.pickSeason, onConfirm' );
                var _cur = _logic.getLayout().find('td.cur');
                if( !_cur.length ) _logic.getLayout().find('td.today');
                if( _cur.length ) _cur.find('a').trigger('click');
            }
        , updateYear:
            function( _val ){
                if( !_logic.lastDateObj ) return;
                _logic.lastDateObj.date.setFullYear( _val );
                JC.Calendar.updateInitYearList( _logic.lastDateObj );
                _logic.update( _logic.lastDateObj );
            }
        , nextYear:
            function(){
                JC.log( 'nextYearMethod' );
                if( !_logic.lastDateObj ) return;
                _logic.updateYear( _logic.lastDateObj.date.getFullYear() + 1)
            }
        , preYear:
            function(){
                JC.log( 'preYearMethod' );
                if( !_logic.lastDateObj ) return;
                _logic.updateYear( _logic.lastDateObj.date.getFullYear() - 1)
            }
        , update:
            function( _dateObj ){
                _logic.getLayout();
                _logic.updateHead( _dateObj );
                _logic.updateBody( _dateObj );
                return _logic.getLayout();
            }
        , updateHead:
            function( _dateObj ){
                var _layout = _logic.getLayout(), _ls = [], _tmp, _selected
                    , _sYear = _dateObj.initMinvalue.getFullYear()
                    , _eYear = _dateObj.initMaxvalue.getFullYear();


                if( !_selected ) _selected = _dateObj.date.getFullYear();

                for( var i = _sYear; i <= _eYear; i++ ){
                    _tmp = '';
                    if( _selected === i ) _tmp = " selected "
                    _ls.push( '<option value="'+i+'"'+_tmp+'>'+i+'</option>' );
                }

                $( _ls.join('') ).appendTo( _layout.find('select.UYear').html('') );

            }
        , updateBody:
            function( _dateObj ){
                var _date = _dateObj.date;
                var _layout = _logic.getLayout();
                    _layout.find('button.UYearButton').html( _date.getFullYear() );

                var today = new Date( new Date().getFullYear(), new Date().getMonth(), new Date().getDate() ).getTime();
                var _ls = [], _class, _data, _title, _sdate, _edate, _cnUnit
                    , _year = _date.getFullYear();

                var ipt = JC.Calendar.lastIpt, currentcanselect = parseBool( ipt.attr('currentcanselect') );

                if( _dateObj.maxvalue && currentcanselect ){
                    var _m = _dateObj.maxvalue.getMonth() + 1, _md;

                    if( _m % 3 !== 0 ){
                        _dateObj.maxvalue.setDate( 1 );
                        _dateObj.maxvalue.setMonth( _m + ( 3 - ( _m % 3 ) - 1 ) );
                    }
                    _dateObj.maxvalue.setDate( maxDayOfMonth( _dateObj.maxvalue ) );
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

                    if( _dateObj.minvalue && _sdate.getTime() < _dateObj.minvalue.getTime() ) 
                        _class.push( 'unable' );
                    if( _dateObj.maxvalue && _edate.getTime() > _dateObj.maxvalue.getTime() ){
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

            }
        /**
         * 最后一个显示日历组件的日期对象
         * @property    _logic.lastDateObj
         * @type        Object
         * @private
         */
        , lastDateObj: null
        , tpl:
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
            ].join('')
    };

    $(document).delegate('#UXCCalendar_season table a', 'click', function( _evt ){
        var p = $(this), dstart = new Date(), dend = new Date();
        if( !JC.Calendar.lastIpt ) return;
        if( p.parent('td').hasClass( 'unable' ) ) return;
        dstart.setTime( p.attr('dstart') );
        dend.setTime( p.attr('dend') );
        JC.Calendar.lastIpt.val( printf( '{0} 至 {1}', formatISODate( dstart ), formatISODate( dend ) ) );
        JC.Calendar.hide();
    });

}(jQuery));
