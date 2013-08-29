(function($){
    ///
    /// TODO: 添加事件响应机制
    ///
    JC.LunarCalendar = window.LunarCalendar = LunarCalendar;
    /**
     * 农历日历组件
     * <br />全局访问请使用 JC.LunarCalendar 或 LunarCalendar
     * <br />DOM 加载完毕后
     * , LunarCalendar会自动初始化页面所有具备识别符的日历, 目前可识别: div.js_LunarCalendar, td.js_LunarCalendar, li.js_LunarCalendar
     * <br />Ajax 加载内容后, 如果有日历组件需求的话, 需要手动初始化 var ins = new JC.LunarCalendar( _selector );
     * <p>
     *      初始化时, 如果日历是添加到某个selector里, 那么selector可以指定一些设置属性
     *      <br /><b>hidecontrol</b>: 如果设置该属性, 那么日历将隐藏操作控件
     *      <br /><b>minvalue</b>: 设置日历的有效最小选择范围, 格式YYYY-mm-dd
     *      <br /><b>maxvalue</b>: 设置日历的有效最大选择范围, 格式YYYY-mm-dd
     *      <br /><b>nopreviousfestivals</b>: 不显示上个月的节日
     *      <br /><b>nonextfestivals</b>: 不显示下个月的节日
     * </p>
     * <p><b>require</b>: <a href='window.jQuery.html'>jQuery</a>
     * <br /><b>require</b>: <a href='.window.html#method_cloneDate'>window.cloneDate</a>
     * <br /><b>require</b>: <a href='.window.html#method_parseISODate'>window.parseISODate</a>
     * <br /><b>require</b>: <a href='.window.html#method_maxDayOfMonth'>window.maxDayOfMonth</a>
     * <br /><b>require</b>: <a href='.window.html#method_isSameDay'>window.isSameDay</a>
     * <br /><b>require</b>: <a href='.window.html#method_isSameMonth'>window.isSameMonth</a>
     * </p>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc.openjavascript.org/docs_api/classes/JC.LunarCalendar.html' target='_blank'>API docs</a>
     * | <a href='../../comps/LunarCalendar/_demo/' target='_blank'>demo link</a></p>
     * @namespace JC
     * @class LunarCalendar
     * @constructor
     * @param   {selector}  _container  指定要显示日历的选择器, 如果不显示指定该值, 默认为 document.body
     * @param   {date}      _date       日历的当前日期, 如果不显示指定该值, 默认为当天
     * @version dev 0.1
     * @author  qiushaowei   <suches@btbtd.org> | 75 team
     * @date    2013-06-13
     */
    function LunarCalendar( _container, _date ){
        _container && ( _container = $(_container) );
        !(_container && _container.length) && ( _container = $(document.body) );
        !_date && ( _date = new Date() );
        _container.data('LunarCalendar', this);

        JC.log( 'LunarCalendar.constructor' );
        /**
         * LunarCalendar 的数据模型对象
         * @property    _model
         * @type    JC.LunarCalendar.Model
         * @private
         */
        this._model = new Model( _container, _date );
        /**
         * LunarCalendar 的视图对像
         * @property    _view
         * @type    JC.LunarCalendar.View
         * @private
         */
        this._view = new View( this._model );
        
        this._init();
    }
    /**
     * 自定义日历组件模板
     * <p>默认模板为JC.LunarCalendar.Model#tpl</p>
     * <p>如果用户显示定义JC.LunarCalendar.tpl的话, 将采用用户的模板</p>
     * @property    tpl
     * @type    {string}
     * @default empty
     * @static
     */
    LunarCalendar.tpl;
    /**
     * 设置是否在 dom 加载完毕后, 自动初始化所有日期控件
     * @property    autoinit
     * @default true
     * @type    {bool}
     * @static
            <script>JC.LunarCalendar.autoInit = true;</script>
     */
     LunarCalendar.autoInit = true
    /**
     * 设置默认显示的年份数, 该数为前后各多少年 默认为前后各10年
     * @property    defaultYearSpan
     * @type        {int}
     * @default     20
     * @static
            <script>JC.LunarCalendar.defaultYearSpan = 20;</script>
     */
    LunarCalendar.defaultYearSpan = 20
    /**
     * 从所有的LunarCalendar取得当前选中的日期
     * <br /> 如果用户没有显式选中某个日期, 将尝试获取当前日期, 如果两者都没有返回undefined
     * @method  getSelectedItemGlobal
     * @static
     * @return  {Object|undefined}  如果能获取到选中的日期将返回 { date: 当天日期, item: 选中的a, td: 选中的td }
     */
    LunarCalendar.getSelectedItemGlobal = 
        function(){
            var _r;
            $('div.UXCLunarCalendar table.UTableBorder td.cur a').each( function(){
                var _tm = $(this).attr('date'), _tmp = new Date(); _tmp.setTime( _tm );
                _r = { 'date': _tmp, 'item': $(this), 'td': $(this).parent('td') };
                return false;
            });
            if( !_r ){
                $('div.UXCLunarCalendar table.UTableBorder td.today a').each( function(){
                var _tm = $(this).attr('date'), _tmp = new Date(); _tmp.setTime( _tm );
                    _r = { 'date': _tmp, 'item': $(this), 'td': $(this).parent('td') };
                    return false;
                });
            }
            return _r;
        };
    /**
     * 从所有的LunarCalendar取得当前选中日期的日期对象
     * <br /> 如果用户没有显式选中某个日期, 将尝试获取当前日期, 如果两者都没有返回undefined
     * @method  getSelectedDateGlobal
     * @static
     * @return  {date|undefined}    
     */
    LunarCalendar.getSelectedDateGlobal = 
        function(){
            var _r, _tmp = LunarCalendar.getSelectedItemGlobal();
            if( _tmp && _tmp.date ) _r = _tmp.date;
            return _r;
        };
    /**
     * 从时间截获取选择器对象
     * @method  getItemByTimestamp
     * @static
     * @param   {int}                   _tm     时间截, 如果时间截少于13位, 将自动补0到13位, ps: php时间截为10位
     * @return  {selector|undefined}    td selector, 如果 td class unable 不可选, 将忽略
     */
    LunarCalendar.getItemByTimestamp =
        function( _tm ){
            var _r, _tmp;
            if( _tm ){
                _tm += '';
                (_tm.length < 13) && (_tm += new Array( 13 - _tm.length + 1 ).join('0'));
                $('div.UXCLunarCalendar table.UTableBorder td a[date='+_tm+']').each( function(){
                    _tmp = $(this).parent('td');
                    if( !_tmp.hasClass('unable') ){
                        _r = _tmp;
                        return false;
                    }
                });
            }
            return _r;
        };
    /**
     * 添加或者清除工作日样式
     * @method  workday
     * @static
     * @param   {selector}      _td         要设置为工作日状态的 td 
     * @param   {any}           _customSet  如果 _customSet 为 undefined, 将设为工作日. 
     *                                      如果 _customSet 非 undefined, 那么根据真假值判断清除工作日/添加工作日
     */
    LunarCalendar.workday =
        function( _td, _customSet ){
            _td = $( _td );
            if( typeof _customSet != 'undefined' ){
                _customSet && _td.removeClass( 'xiuxi' ).addClass( 'shangban' );
                !_customSet && _td.removeClass( 'shangban' );
            }else _td.removeClass( 'xiuxi' ).addClass( 'shangban' );
        };
    /**
     * 判断 td 是否为工作日状态
     * @method  isWorkday
     * @static
     * @param   {selector}  _td 
     * @return  {bool}
     */
    LunarCalendar.isWorkday =
        function( _td ){
            _td = $( _td );
            return _td.hasClass( 'shangban' );
        };
    /**
     * 添加或者清除假日样式
     * @method  holiday
     * @static
     * @param   {selector}      _td         要设置为假日状态的 td 
     * @param   {any}           _customSet  如果 _customSet 为 undefined, 将设为假日. 
     *                                      如果 _customSet 非 undefined, 那么根据真假值判断清除假日/添加假日
     */
    LunarCalendar.holiday =
        function( _td, _customSet ){
            _td = $( _td );
            if( typeof _customSet != 'undefined' ){
                _customSet && _td.addClass( 'xiuxi' ).removeClass( 'shangban' );
                !_customSet && _td.removeClass( 'xiuxi' );
            }else _td.addClass( 'xiuxi' ).removeClass( 'shangban' );
        };
    /**
     * 判断 td 是否为假日状态
     * @method  isHoliday
     * @static
     * @param   {selector}  _td 
     * @return  {bool}
     */
    LunarCalendar.isHoliday =
        function( _td ){
            _td = $( _td );
            return _td.hasClass( 'xiuxi' );
        };
    /**
     * 添加或者清除注释
     * @method  comment
     * @static
     * @param   {selector}      _td         要设置注释的 td 
     * @param   {string|bool}   _customSet  如果 _customSet 为 undefined, 将清除注释. 
     *                                      如果 _customSet 为 string, 将添加注释
     */
    LunarCalendar.comment =
        function( _td, _customSet ){
            var _comment;
            _td = $( _td );

            if( typeof _customSet == 'string' ){
                _comment = _customSet;
            }

            if( typeof _comment != 'undefined' ){
                _td.addClass( 'zhushi' );
                LunarCalendar.commentTitle( _td, _comment );
                _td.find('a').attr('comment', _comment);
            }else{
                _td.removeClass( 'zhushi' );
                _td.find('a').removeAttr('comment');
                LunarCalendar.commentTitle( _td );
            }
        };
    /**
     * 判断 td 是否为注释状态
     * @method  isComment
     * @static
     * @param   {selector}  _td 
     * @return  {bool}
     */
    LunarCalendar.isComment =
        function( _td ){
            _td = $( _td );
            return _td.hasClass( 'zhushi' );
        };
    /**
     * 返回 td 的注释
     * @method  getComment
     * @static
     * @param   {selector}  _td 
     * @return  {string}
     */
    LunarCalendar.getComment =
        function( _td ){
            var _r = '';
            if( _td && _td.length ){
                _r = _td.find('a').attr('comment') || '';
            }
            return _r;
        };
    /**
     * 用于分隔默认title和注释的分隔符
     * @property    commentSeparator
     * @type    string
     * @default ==========comment==========
     * @static
     */
    LunarCalendar.commentSeparator = '==========comment==========';
    /**
     * 把注释添加到 a title 里
     * @method  commentTitle
     * @static
     * @param   {selector}          _td     要设置注释的 a 父容器 td 
     * @param   {string|undefined}  _title  如果 _title 为真, 将把注释添加到a title里. 
     *                                      如果 _title 为假, 将从 a title 里删除注释
     */
    LunarCalendar.commentTitle =
        function( _td, _title ){
            var _a = _td.find( 'a' ), _hasDataTitle = _a.is( '[datatitle]' );

            if( _title ){
                _title = LunarCalendar.commentSeparator + '\n'+_title;
                if( _hasDataTitle ){
                    _title = _a.attr('datatitle') + '\n' + _title;
                }
                _a.attr('title', _title);
            }else{
                if( _hasDataTitle ){
                    _a.attr('title', _a.attr('datatitle') );
                }else{
                    _a.removeAttr('title');
                }
            }
        };
    /**
     * 从JSON数据更新日历状态( 工作日, 休息日, 注释 )
     * <br /> 注意, 该方法更新页面上所有的 LunarCalendar 
     * @method  updateStatus
     * @static
     * @param   {Object}    _data   { phpTimestamp:{ dayaction: 0|1|2, comment: string}, ... }
     *<pre>      
     *          dayaction: 
     *          0: delete workday/holiday
     *          1: workday
     *          2: holiday
     *</pre>
     * @example
     *      LunarCalendar.updateStatus(  {
                                            "1369843200": {
                                                "dayaction": 2,
                                                "comment": "dfdfgdsfgsdfgsdg<b></b>'\"'asdf\"\"'sdf"
                                            },
                                            "1370966400": {
                                                "dayaction": 0,
                                                "comment": "asdfasdfsa"
                                            },
                                            "1371139200": {
                                                "dayaction": 1
                                            },
                                            "1371225600": {
                                                "dayaction": 0,
                                                "comment": "dddd"
                                            }
                                        });
     */
    LunarCalendar.updateStatus =
        function( _data ){
            if( !_data ) return;
            $('div.UXCLunarCalendar').each( function(){
                var _p = $(this), _ins = _p.data('LunarCalendar'), _tmp;
                var _min = 0, _max = 3000000000000;
                if( _ins.getContainer().is('[nopreviousfestivals]') ){
                    _min = new Date( _ins.getDate().getFullYear(), _ins.getDate().getMonth(), 1 ).getTime();
                }
                if( _ins.getContainer().is('[nonextfestivals]') ){
                    _max = new Date( _ins.getDate().getFullYear(), _ins.getDate().getMonth() + 1, 1 ).getTime();
                }
                //JC.log( _ins, _min, _max );

                var _k, _item, _finalk, _itema, _itemtd;
                for( var _k in _data ){
                    _item = _data[_k];
                    _finalk = _k + '';
                    _finalk.length < 13 && (_finalk += new Array( 13 - _finalk.length + 1 ).join('0'));
                    if( !(_finalk >= _min &&  _finalk < _max) ) continue;

                    _itema = _p.find('table.UTableBorder td > a[date='+_finalk+']');
                    if( !_itema.length ) continue;
                    _itemtd = _itema.parent( 'td' );

                    if( 'dayaction' in _item ){
                        switch( _item.dayaction ){
                            case 1:
                                {
                                    LunarCalendar.workday( _itemtd );
                                    break;
                                }

                            case 2:
                                {
                                    LunarCalendar.holiday( _itemtd );
                                    break;
                                }

                            default:
                                {
                                    LunarCalendar.workday(_itemtd, 0);
                                    LunarCalendar.holiday(_itemtd, 0);
                                    break;
                                }
                        }
                    }

                    if( 'comment' in _item ){
                        LunarCalendar.comment( _itemtd, _item['comment'] );
                    }
                }
            });
        };

    LunarCalendar.prototype = {
        /**
         * LunarCalendar 内部初始化
         * @method  _init
         * @private
         */
        _init:
            function(){
                this._view.layout.data('LunarCalendar', this);
                
                return this;
            }    
        /**
         * 更新日历视图为自定义的日期
         * @method  update
         * @param   {date}  _date   更新日历视图为 _date 所在日期的月份
         */
        , update:
            function( _date ){
                if( !_date ) return;
                this._view.initLayout( _date );
            }
        /**
         * 显示下一个月的日期
         * @method  nextMonth
         */
        , nextMonth: 
            function(){
                var _date = this._model.getDate().date;
                _date.setMonth( _date.getMonth() + 1 );
                this._view.initLayout( _date );
            }
        /**
         * 显示上一个月的日期
         * @method  preMonth
         */
        , preMonth:
            function(){
                var _date = this._model.getDate().date;
                _date.setMonth( _date.getMonth() - 1 );
                this._view.initLayout( _date );
            }
        /**
         * 显示下一年的日期
         * @method  nextYear
         */
        , nextYear: 
            function(){
                var _date = this._model.getDate().date;
                _date.setFullYear( _date.getFullYear() + 1 );
                this._view.initLayout( _date );
            }
        /**
         * 显示上一年的日期
         * @method  preYear
         */
        , preYear: 
            function(){
                var _date = this._model.getDate().date;
                _date.setFullYear( _date.getFullYear() - 1 );
                this._view.initLayout( _date );
            }
        /**
         * 获取默认时间对象
         * @method  getDate
         * @return  {date}  
         */
        , getDate: function(){ return this._model.getDate().date;  }
        /**
         * 获取所有的默认时间对象
         * @method getAllDate
         * @return  {object}    { date: 默认时间, minvalue: 有效最小时间
         *                        , maxvalue: 有效最大时间, beginDate: 日历的起始时间, endDate: 日历的结束时间 }
         */
        , getAllDate: function(){ return this._model.getDate();  }
        /**
         * 获取当前选中的日期, 如果用户没有显式选择, 将查找当前日期, 如果两者都没有的话返回undefined
         * @method  getSelectedDate
         * @return  {date}
         */
        , getSelectedDate: function(){
            var _r;
            this._view.layout.find( 'td.cur a').each( function(){
                var _tm = $(this).attr('date');
                _r = new Date();
                _r.setTime( _tm );
                return false;
            });
            if( !_r ){
               this._view.layout.find( 'td.today a').each( function(){
                    var _tm = $(this).attr('date');
                    _r = new Date();
                    _r.setTime( _tm );
                    return false;
                });
            }
            return _r;
        }
        /**
         * 获取初始化日历的选择器对象
         * @method  getContainer
         * @return  selector
         */
        , getContainer: function(){ return this._model.container; }
        /**
         * 获取日历的主选择器对象
         * @method  getLayout
         * @return  selector
         */
        , getLayout: function(){ return this._view.layout; }
        /**
         * 判断日历是否隐藏操作控件
         * @method  isHideControl
         * @return  bool
         */
        , isHideControl: function(){ return this._model.hideControl; }
    }
    /**
     * LunarCalendar 视图类
     * @namespace   JC.LunarCalendar
     * @class   View
     * @constructor
     * @param   {JC.LunarCalendar.Model}   _model
     */
    function View( _model ){
        /**
         * LunarCalendar model 对象
         * @property    _model
         * @type    JC.LunarCalendar.Model
         * @private
         */
        this._model = _model;
        /**
         * LunarCalendar 的主容器
         * @property    layout
         * @type    selector
         */
        this.layout;

        this._init();
    }
    
    View.prototype = {
        /**
         * 初始化 View
         * @method  _init
         * @private
         */
        _init:
            function()
            {
                this.layout = $( this._model.tpl ).appendTo( this._model.container );
                this.initLayout();
                return this;
            }
        /**
         * 初始化日历外观
         * @method  initLayout
         * @param   {date}  _date
         */
        , initLayout:
            function( _date ){
                var _dateObj = this._model.getDate();
                if( _date ) _dateObj.date = _date;
                this.layout.find('table.UTableBorder tbody').html('');

                this.initYear( _dateObj );
                this.initMonth( _dateObj );
                this.initMonthDate( _dateObj );
            }
        /**
         * 初始化年份
         * @method  initYear
         * @param   {DateObject}    _dateObj
         */
        , initYear:
            function( _dateObj ){
                this.layout.find('button.UYear').html(  _dateObj.date.getFullYear() );
            }
        /**
         * 初始化月份
         * @method  initMonth
         * @param   {DateObject}    _dateObj
         */
        , initMonth:
            function( _dateObj ){
                this.layout.find('button.UMonth').html(  _dateObj.date.getMonth() + 1 + '月' );
            }
        /**
         * 初始化月份的所有日期
         * @method  _logic.initMonthDate
         * @param   {DateObjects}   _dateObj   保存所有相关日期的对象
         */
        , initMonthDate:
            function( _dateObj ){
                var _p = this, _layout = this.layout;
                var _maxday = maxDayOfMonth( _dateObj.date ), _weekday = _dateObj.date.getDay() || 7
                    , _sumday = _weekday + _maxday, _row = 6, _ls = [], _premaxday, _prebegin
                    , _tmp, i, _class;

                var _beginDate = cloneDate( _dateObj.date );
                    _beginDate.setDate( 1 );
                var _beginWeekday = _beginDate.getDay() || 7;
                if( _beginWeekday < 2 ){
                    _beginDate.setDate( -(_beginWeekday-1+6) );
                }else{
                    _beginDate.setDate( -(_beginWeekday-2) );
                }

                _dateObj.beginDate = cloneDate( _beginDate );

                var today = new Date();

                //this._model.title();

                _ls.push('<tr>');
                for( i = 1; i <= 42; i++ ){
                    _class = [];
                    if( _beginDate.getDay() === 0 || _beginDate.getDay() == 6 ) _class.push('weekend');
                    if( !isSameMonth( _dateObj.date, _beginDate ) ) _class.push( 'other' );
                    if( _dateObj.minvalue && _beginDate.getTime() < _dateObj.minvalue.getTime() ) 
                        _class.push( 'unable' );
                    if( _dateObj.maxvalue && _beginDate.getTime() > _dateObj.maxvalue.getTime() ) 
                        _class.push( 'unable' );

                    var lunarDate = LunarCalendar.gregorianToLunar( _beginDate );
                    var festivals = LunarCalendar.getFestivals( lunarDate, _beginDate );

                    var _min = 0, _max = 3000000000000, _curtime = _beginDate.getTime();
                    var _title = [ _beginDate.getFullYear(), '年 '
                                    , _beginDate.getMonth() + 1, '月 '
                                    , _beginDate.getDate(), '日', '\n' ];
                    _title.push( '农历 ', lunarDate.yue, lunarDate.ri );
                    _title.push( ' ', lunarDate.ganzhi, '【', lunarDate.shengxiao, '】年' );

                    if( festivals && festivals.festivals.length ){
                        var _festivalsAr = [];
                        $.each( festivals.festivals, function( _ix, _item ){
                            //JC.log( _item );
                            if( _item.fullname ){
                                _festivalsAr = _festivalsAr.concat( _item.fullname.split(/[\s]+/) );
                            }
                        });

                        if( _festivalsAr.length ){
                            _title.push( '\n节日: ' );
                            _title.push( _festivalsAr.join( ', ' ) );
                        }
                    }

                    if( this._model.container.is('[nopreviousfestivals]') ){
                        _min = new Date( _dateObj.date.getFullYear(), _dateObj.date.getMonth(), 1 ).getTime();
                    }
                    if( this._model.container.is('[nonextfestivals]') ){
                        _max = new Date( _dateObj.date.getFullYear(), _dateObj.date.getMonth() + 1, 1 ).getTime();
                    }

                    if( _curtime >= _min && _curtime < _max ){
                        if( festivals.isHoliday ){ _class.push( 'festival' ); _class.push('xiuxi'); }
                        if( festivals.isWorkday ) _class.push( 'shangban' );
                    }else{
                        _class.push('nopointer');
                        _class.push('unable');
                    }


                    this._model.title( _beginDate.getTime(), _title.join('') );

                    if( isSameDay( today, _beginDate ) ) _class.push( 'today' );
                    _ls.push( '<td class="', _class.join(' '),'">'
                            ,'<a href="javascript:" date="', _beginDate.getTime(),'">'
                            ,'<b>', _beginDate.getDate(), '</b>'
                            ,'<label>', festivals.dayName,  '</label><div></div></a></td>' );
                    _beginDate.setDate( _beginDate.getDate() + 1 );
                    if( i % 7 === 0 && i != 42 ) _ls.push( '</tr><tr>' );
                }
                _ls.push('</tr>');
                _beginDate.setDate( _beginDate.getDate() - 1 );
                _dateObj.endDate = cloneDate( _beginDate );

                _layout.find('table.UTableBorder tbody' ).html( $( _ls.join('') ) )
                    .find('td').each( function(){
                        _p.addTitle( $(this) );
                    });

                this.hideControl();

                JC.log( _prebegin, _premaxday, _maxday, _weekday, _sumday, _row );
            }
        /**
         * 把具体的公历和农历日期写进a标签的title里
         * @method  addTitle
         * @param   {selector}  _td
         */
        , addTitle:
            function( _td ){
                var _a = _td.find('a'), _tm = _a.attr( 'date' ), _title = this._model.title( _tm );
                _a.attr('title', _title ).attr('datatitle', _title);
            }
        /**
         * 检查是否要隐藏操作控件
         * @method  hideControl
         */
        , hideControl: 
            function(){
                if( this._model.hideControl ){
                    this.layout.find('select, button.UPreYear, button.UPreMonth, button.UNextMonth, button.UNextYear').hide();
                    this.layout.find('table.UHeader').addClass('nopointer');
                }
            }
    };
    /**
     * LunarCalendar 数据模型类
     * @namespace JC.LunarCalendar
     * @class   Model
     * @constructor
     * @param   {selector}      _container
     * @param   {date}          _date
     */
    function Model( _container, _date ){
        /**
         * LunarCalendar 所要显示的selector
         * @property    {selector}  container
         * @type    selector
         * @default document.body
         */
        this.container = _container;
        /**
         * 初始化时的时期
         * @property    date
         * @type    date    
         * @default new Date()
         */
        this.date = _date;
        /**
         * 日历默认模板
         * @property    tpl
         * @type    string
         * @default JC.LunarCalendar._deftpl
         */
        this.tpl;
        /**
         * 显示日历时所需要的所有日期对象
         * @property    dateObj
         * @type    Object
         */
        this.dateObj;
        /**
         * a 标签 title 的临时存储对象
         * @property    _titleObj
         * @type    Object
         * @default {}
         * @private
         */
        this._titleObj = {};
        this.hideControl;

        this._init();
    }
    
    Model.prototype = {
        _init:
            function(){
                this.tpl = JC.LunarCalendar.tpl || _deftpl;
                this.container.is( '[hidecontrol]' ) && ( this.hideControl = true );
                return this;
            }
        , title: 
            function( _key, _title )
            {
                if( !(_key || _title ) ){
                    this._titleObj = {};
                    return;
                }
                _title && ( this._titleObj[_key ] = _title );
                return this._titleObj[_key];
            }
        /**
         * 获取初始日期对象
         * @method  getDate
         * @param   {selector}  _selector   显示日历组件的input
         * @private
         */
        , getDate:
            function(){
                if( this.dateObj ) return this.dateObj;
                var _selector = this.container;
                var _r = { date: 0, minvalue: 0, maxvalue: 0 }, _tmp;

                if( _tmp = parseISODate( _selector.attr('defaultdate') )) _r.date = _tmp;
                else _r.date = new Date();


                _r.minvalue = parseISODate( _selector.attr('minvalue') );
                _r.maxvalue = parseISODate( _selector.attr('maxvalue') );
                
                return this.dateObj = _r;
            }
        /**
         * 把日期赋值给文本框
         * @method  setDate
         * @param   {int}   _timestamp  日期对象的时间戳
         * @private
         */
        , setDate:
            function( _timestamp ){
                var _d = new Date(), _symbol = '-'; _d.setTime( _timestamp );
            }
        /**
         * 给文本框赋值, 日期为控件的当前日期
         * @method  setSelectedDate
         * @return  {int}   0/1
         * @private
         */
        , setSelectedDate:
            function(){
                var _cur;
                _cur = this.getLayout().find('table td.cur a');
                if( _cur.parent('td').hasClass('unable') ) return 0;
                _cur && _cur.length && _cur.attr('date') && this.setDate( _cur.attr('date') );
                return 1;
            }

    };
    /**
     * 监听上一年按钮
     */
    $(document).delegate( 'div.UXCLunarCalendar button.UPreYear', 'click', function(){
        var _p = $(this), _selector = _p.parents( 'div.UXCLunarCalendar' );
        if( !_selector.length ) return;
        var _ins = _selector.data('LunarCalendar');
        _ins.preYear();
    });
    /**
     * 监听上一月按钮
     */
    $(document).delegate( 'div.UXCLunarCalendar button.UPreMonth', 'click', function(){
        var _p = $(this), _selector = _p.parents( 'div.UXCLunarCalendar' );
        if( !_selector.length ) return;
        var _ins = _selector.data('LunarCalendar');
        _ins.preMonth();
    });
    /**
     * 监听下一月按钮
     */
    $(document).delegate( 'div.UXCLunarCalendar button.UNextMonth', 'click', function(){
        var _p = $(this), _selector = _p.parents( 'div.UXCLunarCalendar' );
        if( !_selector.length ) return;
        var _ins = _selector.data('LunarCalendar');
        _ins.nextMonth();
    });
    /**
     * 监听下一年按钮
     */
    $(document).delegate( 'div.UXCLunarCalendar button.UNextYear', 'click', function(){
        var _p = $(this), _selector = _p.parents( 'div.UXCLunarCalendar' );
        if( !_selector.length ) return;
        var _ins = _selector.data('LunarCalendar');
        _ins.nextYear();
    });
    /**
     * 监听年份按钮, 是否要显示年份列表 
     */
    $(document).delegate( 'div.UXCLunarCalendar button.UYear', 'click', function( _evt ){
        _evt.stopPropagation();
        var _p = $(this), _selector = _p.parents( 'div.UXCLunarCalendar' );
        if( !_selector.length ) return;
        var _ins = _selector.data('LunarCalendar');
        if( _ins.isHideControl() ) return;
        var _date = _ins.getDate(), _year = _date.getFullYear();
        var _start = _date.getFullYear() - LunarCalendar.defaultYearSpan
            , _over = _date.getFullYear() + LunarCalendar.defaultYearSpan;
        var _r = [], _selected = '';
        $('div.UXCLunarCalendar select').hide();

        for( ; _start < _over; _start++ ){
            if( _start === _year ) _selected = ' selected '; else _selected = ''
            _r.push( '<option value="', _start, '"', _selected ,'>', _start, '</option>' );
        }
        var _scrollTop = LunarCalendar.defaultYearSpan / 2 * 18;
        _ins.getLayout().find('select.UYearList').html(_r.join('')).show().prop('size', 20).scrollTop( _scrollTop );
    });
    /**
     * 监听月份按钮, 是否要显示月份列表 
     */
    $(document).delegate( 'div.UXCLunarCalendar button.UMonth', 'click', function( _evt ){
        _evt.stopPropagation();
        var _p = $(this), _selector = _p.parents( 'div.UXCLunarCalendar' );
        if( !_selector.length ) return;
        var _ins = _selector.data('LunarCalendar');
        if( _ins.isHideControl() ) return;
        var _date = _ins.getDate(), _year = _date.getFullYear();
        $('div.UXCLunarCalendar select').hide();

        _ins.getLayout().find('select.UMonthList').val( _date.getMonth() ).prop('size', 12).show();
    });
    /**
     * 监听年份列表选择状态
     */
    $(document).delegate( 'div.UXCLunarCalendar select.UYearList', 'change', function(){
        var _p = $(this), _layout = _p.parents( 'div.UXCLunarCalendar' )
            , _ins = _layout.data('LunarCalendar'), _date = _ins.getDate();

        _date.setFullYear( _p.val() );
        _ins.update( _date );
    });
    /**
     * 监听月份列表选择状态
     */
    $(document).delegate( 'div.UXCLunarCalendar select.UMonthList', 'change', function(){
        var _p = $(this), _layout = _p.parents( 'div.UXCLunarCalendar' )
            , _ins = _layout.data('LunarCalendar'), _date = _ins.getDate();

        _date.setMonth( _p.val() );
        _ins.update( _date );
    });
    /**
     * 监听日期单元格点击事件
     */
    $(document).delegate( 'div.UXCLunarCalendar table.UTableBorder td', 'click', function(){
        var _p = $(this), _selector = _p.parents( 'div.UXCLunarCalendar' );
        if( !_selector.length ) return;
        if( _p.hasClass('unable') ) return;
        var _itema = _p.find('> a'), _curtime = _itema.attr('date'), _ins = _selector.data('LunarCalendar');

        var _min = 0, _max = 3000000000000;
        if( _ins.getContainer().is('[nopreviousfestivals]') ){
            _min = new Date( _ins.getDate().getFullYear(), _ins.getDate().getMonth(), 1 ).getTime();
        }
        if( _ins.getContainer().is('[nonextfestivals]') ){
            _max = new Date( _ins.getDate().getFullYear(), _ins.getDate().getMonth() + 1, 1 ).getTime();
        }

        if( _curtime >= _min && _curtime < _max ){
            $('div.UXCLunarCalendar table.UTableBorder td.cur').removeClass('cur');
            _p.addClass('cur');
        }
    });
    /**
     * 监听body点击事件, 点击时隐藏日历控件的年份和月份列表
     */
    $(document).on('click', function(){
        $('div.UXCLunarCalendar select').hide();
    });
    /**
     * DOM 加载完毕后, 初始化日历组件
     * @event   dom ready
     * @private
     */
    $(document).ready( function($evt){
        if( LunarCalendar.autoInit ){
            setTimeout( function(){
                $('div.js_LunarCalendar, td.js_LunarCalendar, li.js_LunarCalendar').each( function(){
                    new LunarCalendar( $(this) );
                });
            }, 100);
        }
    });
    /**
     * LunarCalendar 日历默认模板
     * @property    _deftpl
     * @type string
     * @static
     * @private
     */
    var _deftpl = 
        [
        '<div id="UXCLunarCalendar" class="UXCLunarCalendar">\n'
        ,'    <div class="UXCLunarCalendar_wrapper">\n'
        ,'<table class="UHeader">\n'
        ,'    <tbody>\n'
        ,'        <tr>\n'
        ,'            <td class="ULeftControl">\n'
        ,'                <button type="button" class="UButton UPreYear">&nbsp;&lt;&lt;&nbsp;</button>\n'
        ,'                <button type="button" class="UButton UPreMonth">&nbsp;&lt;&nbsp;</button>\n'
        ,'            </td>\n'
        ,'            <td class="UMidControl">\n'
        ,'                <button type="button" class="UButton UYear">2013</button>\n'
        ,'                <select class="UYearList">\n'
        ,'                </select>\n'
        ,'                <button type="button" class="UButton UMonth">1月</button>\n'
        ,'                <select class="UMonthList">\n'
        ,'                    <option value=\'0\'>一月</option>\n'
        ,'                    <option value=\'1\'>二月</option>\n'
        ,'                    <option value=\'2\'>三月</option>\n'
        ,'                    <option value=\'3\'>四月</option>\n'
        ,'                    <option value=\'4\'>五月</option>\n'
        ,'                    <option value=\'5\'>六月</option>\n'
        ,'                    <option value=\'6\'>七月</option>\n'
        ,'                    <option value=\'7\'>八月</option>\n'
        ,'                    <option value=\'8\'>九月</option>\n'
        ,'                    <option value=\'9\'>十月</option>\n'
        ,'                    <option value=\'10\'>十一月</option>\n'
        ,'                    <option value=\'11\'>十二月</option>\n'
        ,'                </select>\n'
        ,'            </td>\n'
        ,'            <td class="URightControl">\n'
        ,'                <button type="button" class="UButton UNextMonth">&nbsp;&gt;&nbsp;</button>\n'
        ,'                <button type="button" class="UButton UNextYear">&nbsp;&gt;&gt;&nbsp;</button>\n'
        ,'            </td>\n'
        ,'        </tr>\n'
        ,'    </tbody>\n'
        ,'</table>\n'
        ,'        <table class="UTable UTableThead">\n'
        ,'            <thead>\n'
        ,'                <tr>\n'
        ,'                    <th>一</th>\n'
        ,'                    <th>二</th>\n'
        ,'                    <th>三</th>\n'
        ,'                    <th>四</th>\n'
        ,'                    <th>五</th>\n'
        ,'                    <th class="weekend">六</th>\n'
        ,'                    <th class="weekend">日</th>\n'
        ,'                </tr>\n'
        ,'            </thead>\n'
        ,'       </table>\n'
        ,'       <table class="UTable UTableBorder">\n'
        ,'            <tbody>\n'
        ,'                <!--<tr>\n'
        ,'                    <td class="unable"><a href="#"><b>1</b><label>两字</label></a></td>\n'
        ,'                    <td class="unable cur"><a href="#"><b>2</b><label>两字</label></a></td>\n'
        ,'                    <td class="unable"><a href="#"><b>33</b><label>两字</label></a></td>\n'
        ,'                    <td class="unable"><a href="#"><b>44</b><label>两字</label></a></td>\n'
        ,'                    <td class="unable"><a href="#"><b>5</b><label>两字</label></a></td>\n'
        ,'                    <td class="weekend shangban cur"><a href="#"><b>6</b><label>两字</label></a></td>\n'
        ,'                    <td class="weekend"><a href="#"><b>7</b><label>两字</label></a></td>\n'
        ,'                </tr>-->\n'
        ,'            </tbody>\n'
        ,'        </table>\n'
        ,'    </div>\n'
        ,'</div>\n'
        ].join('');    

}(jQuery));

