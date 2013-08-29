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


(function($){
    JC.LunarCalendar.getFestivals = getFestivals;
    /**
     * 返回农历和国历的所在日期的所有节日
     * <br /> 假日条目数据样例: { 'name': '春节', 'fullname': '春节', 'priority': 8 }
     * <br /> 返回数据格式: { 'dayName': 农历日期/节日名, 'festivals': 节日数组, 'isHoliday': 是否为假日 }
     * @method getFestivals
     * @static
     * @for JC.LunarCalendar
     * @param   {Object}    _lunarDate      农历日期对象, 由JC.LunarCalendar.gregorianToLunar 获取
     * @param   {Date}      _greDate        日期对象
     * @return  Object    
     */
    function getFestivals( _lunarDate, _greDate ){
        var _r = { 'dayName': '', 'festivals': [], 'isHoliday': false }
            , _lunarDay = [ intPad(_lunarDate.month), intPad(_lunarDate.day) ].join('')
            , _greDay = [ intPad(_greDate.getMonth()+1), intPad(_greDate.getDate()) ].join('')
            , _greToday = _greDate.getFullYear() + _greDay
            ;

        _r.dayName = _lunarDate.ri;
        if( _r.dayName == '初一' ) _r.dayName = _lunarDate.yue;

        if( _greDay in gregorianFes ) _r.festivals.push( gregorianFes[ _greDay ] );
        if( _lunarDay in lunarFes ) {
            _r.festivals.push( lunarFes[ _lunarDay ] );
        }
 
        if( _lunarDate.month == 12 && _lunarDate.day >= 29 ){
            var _tmp = new Date(); _tmp.setTime( _greDate.getTime() ); _tmp.setDate( _tmp.getDate() + 1 );
            var _tmpLunar = JC.LunarCalendar.gregorianToLunar( _tmp );
            if( _tmpLunar.month === 1 && _tmpLunar.day === 1 ){
                var fes = lunarFes['0100'];
                _r.festivals.unshift( fes );
                _r.dayName = fes.name;
            }
        }

        if( JC.LunarCalendar.nationalHolidays ){
            if( _greToday in JC.LunarCalendar.nationalHolidays ){
                _r.festivals.push( JC.LunarCalendar.nationalHolidays[ _greToday ] );
            }
        }
       
        if( _r.festivals.length ){
            for( var i = 0, j = _r.festivals.length - 1; i < j; i++ ){
                for( var k = i + 1; k <= j; k++ ){
                    if(  _r.festivals[k].priority > _r.festivals[i].priority ){
                        var _tmp = _r.festivals[i];
                        _r.festivals[i] = _r.festivals[k];
                        _r.festivals[k] = _tmp;
                    }
                }
            }
            _r.festivals[0].name && (_r.dayName = _r.festivals[0].name);
            for( var i = 0, j = _r.festivals.length; i < j; i++ ){
                if( _r.festivals[i].isHoliday ){ _r.isHoliday = true; break; }
            }
            for( var i = 0, j = _r.festivals.length; i < j; i++ ){
                if( _r.festivals[i].isWorkday ){ _r.isWorkday = true; break; }
            }
       }

        /*JC.log( _lunarDay, _greDay, _r.festivals.length );*/

        return _r;
    }

    var lunarFes = {
        '0101': { 'name': '春节', 'fullname': '春节', 'priority': 8 },  
        '0115': { 'name': '元宵节', 'fullname': '元宵节', 'priority': 8 },  
        '0505': { 'name': '端午节', 'fullname': '端午节', 'priority': 8 },  
        '0707': { 'name': '七夕', 'fullname': '七夕情人节', 'priority': 5 },  
        '0715': { 'name': '中元节', 'fullname': '中元节', 'priority': 5 },  
        '0815': { 'name': '中秋节', 'fullname': '中秋节', 'priority': 8 },  
        '0909': { 'name': '重阳节', 'fullname': '重阳节', 'priority': 5 },  
        '1208': { 'name': '腊八节', 'fullname': '腊八节', 'priority': 5 },  
        '1223': { 'name': '小年', 'fullname': '小年', 'priority': 5 },  
        '0100': { 'name': '除夕', 'fullname': '除夕', 'priority': 8 }
    };

    var gregorianFes = {
        '0101': { 'name': '元旦节', 'fullname': '元旦节', 'priority': 6 },  
        '0202': { 'name': '湿地日', 'fullname': '世界湿地日', 'priority': 1 },  
        '0210': { 'name': '气象节', 'fullname': '国际气象节', 'priority': 1 },  
        '0214': { 'name': '情人节', 'fullname': '情人节', 'priority': 3 },  
        '0301': { 'name': '', 'fullname': '国际海豹日', 'priority': 1 },  
        '0303': { 'name': '', 'fullname': '全国爱耳日', 'priority': 1 },  
        '0305': { 'name': '学雷锋', 'fullname': '学雷锋纪念日', 'priority': 1 },  
        '0308': { 'name': '妇女节', 'fullname': '妇女节', 'priority': 3 },  
        '0312': { 'name': '植树节', 'fullname': '植树节 孙中山逝世纪念日', 'priority': 2 },  
        '0314': { 'name': '', 'fullname': '国际警察日', 'priority': 1 },  
        '0315': { 'name': '消权日', 'fullname': '消费者权益日', 'priority': 1 },  
        '0317': { 'name': '', 'fullname': '中国国医节 国际航海日', 'priority': 1 },  
        '0321': { 'name': '', 'fullname': '世界森林日 消除种族歧视国际日 世界儿歌日', 'priority': 1 },  
        '0322': { 'name': '', 'fullname': '世界水日', 'priority': 1 },  
        '0323': { 'name': '气象日', 'fullname': '世界气象日', 'priority': 1 },  
        '0324': { 'name': '', 'fullname': '世界防治结核病日', 'priority': 1 },  
        '0325': { 'name': '', 'fullname': '全国中小学生安全教育日', 'priority': 1 },  
        '0401': { 'name': '愚人节', 'fullname': '愚人节 全国爱国卫生运动月(四月) 税收宣传月(四月)', 'priority': 2 },  
        '0407': { 'name': '卫生日', 'fullname': '世界卫生日', 'priority': 1 },  
        '0422': { 'name': '地球日', 'fullname': '世界地球日', 'priority': 1 },  
        '0423': { 'name': '', 'fullname': '世界图书和版权日', 'priority': 1 },  
        '0424': { 'name': '', 'fullname': '亚非新闻工作者日', 'priority': 1 },  
        '0501': { 'name': '劳动节', 'fullname': '劳动节', 'priority': 6 },  
        '0504': { 'name': '青年节', 'fullname': '青年节', 'priority': 1 },  
        '0505': { 'name': '', 'fullname': '碘缺乏病防治日', 'priority': 1 },  
        '0508': { 'name': '', 'fullname': '世界红十字日', 'priority': 1 },  
        '0512': { 'name': '护士节', 'fullname': '国际护士节', 'priority': 1 },  
        '0515': { 'name': '家庭日', 'fullname': '国际家庭日', 'priority': 1 },  
        '0517': { 'name': '电信日', 'fullname': '国际电信日', 'priority': 1 },  
        '0518': { 'name': '', 'fullname': '国际博物馆日', 'priority': 1 },  
        '0520': { 'name': '', 'fullname': '全国学生营养日', 'priority': 1 },  
        '0523': { 'name': '', 'fullname': '国际牛奶日', 'priority': 1 },  
        '0531': { 'name': '无烟日', 'fullname': '世界无烟日', 'priority': 1 },   
        '0601': { 'name': '儿童节', 'fullname': '国际儿童节', 'priority': 6 },  
        '0605': { 'name': '', 'fullname': '世界环境保护日', 'priority': 1 },  
        '0606': { 'name': '', 'fullname': '全国爱眼日', 'priority': 1 },  
        '0617': { 'name': '', 'fullname': '防治荒漠化和干旱日', 'priority': 1 },  
        '0623': { 'name': '', 'fullname': '国际奥林匹克日', 'priority': 1 },  
        '0625': { 'name': '土地日', 'fullname': '全国土地日', 'priority': 1 },  
        '0626': { 'name': '禁毒日', 'fullname': '国际禁毒日', 'priority': 1 },  
        '0701': { 'name': '', 'fullname': '香港回归纪念日 中共诞辰 世界建筑日', 'priority': 1 },  
        '0702': { 'name': '', 'fullname': '国际体育记者日', 'priority': 1 },  
        '0707': { 'name': '', 'fullname': '抗日战争纪念日', 'priority': 1 },  
        '0711': { 'name': '人口日', 'fullname': '世界人口日', 'priority': 1 },  
        '0801': { 'name': '建军节', 'fullname': '建军节', 'priority': 1 },  
        '0808': { 'name': '', 'fullname': '中国男子节(爸爸节)', 'priority': 1 },  
        '0815': { 'name': '', 'fullname': '抗日战争胜利纪念', 'priority': 1 },  
        '0908': { 'name': '', 'fullname': '国际扫盲日 国际新闻工作者日', 'priority': 1 },  
        '0909': { 'name': '', 'fullname': '毛逝世纪念', 'priority': 1 },  
        '0910': { 'name': '教师节', 'fullname': '中国教师节', 'priority': 6 },   
        '0914': { 'name': '地球日', 'fullname': '世界清洁地球日', 'priority': 1 },  
        '0916': { 'name': '', 'fullname': '国际臭氧层保护日', 'priority': 1 },  
        '0918': { 'name': '九一八', 'fullname': '九·一八事变纪念日', 'priority': 1 },  
        '0920': { 'name': '爱牙日', 'fullname': '国际爱牙日', 'priority': 1 },  
        '0927': { 'name': '旅游日', 'fullname': '世界旅游日', 'priority': 1 },  
        '0928': { 'name': '', 'fullname': '孔子诞辰', 'priority': 1 },  
        '1001': { 'name': '国庆节', 'fullname': '国庆节 世界音乐日 国际老人节', 'priority': 6 },  
        '1002': { 'name': '', 'fullname': '国际和平与民主自由斗争日', 'priority': 1 },  
        '1004': { 'name': '', 'fullname': '世界动物日', 'priority': 1 },  
        '1006': { 'name': '', 'fullname': '老人节', 'priority': 1 },  
        '1008': { 'name': '', 'fullname': '全国高血压日 世界视觉日', 'priority': 1 },  
        '1009': { 'name': '邮政日', 'fullname': '世界邮政日 万国邮联日', 'priority': 1 },  
        '1010': { 'name': '', 'fullname': '辛亥革命纪念日 世界精神卫生日', 'priority': 1 },  
        '1013': { 'name': '', 'fullname': '世界保健日 国际教师节', 'priority': 1 },  
        '1014': { 'name': '', 'fullname': '世界标准日', 'priority': 1 },  
        '1015': { 'name': '', 'fullname': '国际盲人节(白手杖节)', 'priority': 1 },  
        '1016': { 'name': '粮食日', 'fullname': '世界粮食日', 'priority': 1 },  
        '1017': { 'name': '', 'fullname': '世界消除贫困日', 'priority': 1 },  
        '1022': { 'name': '', 'fullname': '世界传统医药日', 'priority': 1 },  
        '1024': { 'name': '', 'fullname': '联合国日', 'priority': 1 },  
        '1031': { 'name': '勤俭日', 'fullname': '世界勤俭日', 'priority': 1 },  
        '1107': { 'name': '', 'fullname': '十月社会主义革命纪念日', 'priority': 1 },  
        '1108': { 'name': '记者日', 'fullname': '中国记者日', 'priority': 1 },  
        '1109': { 'name': '', 'fullname': '全国消防安全宣传教育日', 'priority': 1 },  
        '1110': { 'name': '青年节', 'fullname': '世界青年节', 'priority': 3 },  
        '1111': { 'name': '', 'fullname': '国际科学与和平周(本日所属的一周)', 'priority': 1 },  
        '1112': { 'name': '', 'fullname': '孙中山诞辰纪念日', 'priority': 1 },  
        '1114': { 'name': '', 'fullname': '世界糖尿病日', 'priority': 1 },  
        '1117': { 'name': '', 'fullname': '国际大学生节 世界学生节', 'priority': 1 },  
        '1120': { 'name': '', 'fullname': '彝族年', 'priority': 1 },  
        '1121': { 'name': '', 'fullname': '彝族年 世界问候日 世界电视日', 'priority': 1 },  
        '1122': { 'name': '', 'fullname': '彝族年', 'priority': 1 },  
        '1129': { 'name': '', 'fullname': '国际声援巴勒斯坦人民国际日', 'priority': 1 },  
        '1201': { 'name': '', 'fullname': '世界艾滋病日', 'priority': 1 },  
        '1203': { 'name': '', 'fullname': '世界残疾人日', 'priority': 1 },  
        '1205': { 'name': '', 'fullname': '国际经济和社会发展志愿人员日', 'priority': 1 },  
        '1208': { 'name': '', 'fullname': '国际儿童电视日', 'priority': 1 },  
        '1209': { 'name': '足球日', 'fullname': '世界足球日', 'priority': 1 },  
        '1210': { 'name': '人权日', 'fullname': '世界人权日', 'priority': 1 },  
        '1212': { 'name': '', 'fullname': '西安事变纪念日', 'priority': 1 },  
        '1213': { 'name': '大屠杀', 'fullname': '南京大屠杀(1937年)纪念日！紧记血泪史！', 'priority': 1 },  
        '1220': { 'name': '', 'fullname': '澳门回归纪念', 'priority': 1 },  
        '1221': { 'name': '篮球日', 'fullname': '国际篮球日', 'priority': 1 },  
        '1224': { 'name': '平安夜', 'fullname': '平安夜', 'priority': 1 },  
        '1225': { 'name': '圣诞节', 'fullname': '圣诞节', 'priority': 1 },  
        '1226': { 'name': '', 'fullname': '毛诞辰纪念', 'priority': 1 }
    };

    var byDayOrWeekFes = {
        '0150': { 'name': '麻风日', 'fullname': '世界麻风日', 'priority': 1 }, //一月的最后一个星期日（月倒数第一个星期日）  
        '0520': { 'name': '母亲节', 'fullname': '国际母亲节', 'priority': 1 },  
        '0530': { 'name': '助残日', 'fullname': '全国助残日', 'priority': 1 },  
        '0630': { 'name': '父亲节', 'fullname': '父亲节', 'priority': 1 },  
        '0730': { 'name': '', 'fullname': '被奴役国家周', 'priority': 1 },  
        '0932': { 'name': '和平日', 'fullname': '国际和平日', 'priority': 1 },  
        '0940': { 'name': '聋人节 世界儿童日', 'fullname': '国际聋人节 世界儿童日', 'priority': 1 },  
        '0950': { 'name': '海事日', 'fullname': '世界海事日', 'priority': 1 },  
        '1011': { 'name': '住房日', 'fullname': '国际住房日', 'priority': 1 },  
        '1013': { 'name': '减灾日', 'fullname': '国际减轻自然灾害日(减灾日)', 'priority': 1 },  
        '1144': { 'name': '感恩节', 'fullname': '感恩节', 'priority': 1 }
    };

    /**
     * 为数字添加前置0
     * @method  JC.LunarCalendar.getFestival.intPad
     * @param   {int}   _n      需要添加前置0的数字
     * @param   {int}   _len    需要添加_len个0, 默认为2
     * @return  {string}
     * @static
     * @private
     */
    function intPad( _n, _len ){
        if( typeof _len == 'undefined' ) _len = 2;
        _n = new Array( _len + 1 ).join('0') + _n;
        return _n.slice( _n.length - _len );
    }

}(jQuery));

(function($){
    /**
     * 从公历日期获得农历日期
     * <br /> 返回的数据格式
     * <pre>
        {
            shengxiao: ''   //生肖
            , ganzhi: ''    //干支
            , yue: ''       //月份
            , ri: ''        //日
            , shi: ''       //时
            , year: ''      //农历数字年
            , month: ''     //农历数字月
            , day: ''       //农历数字天
            , hour: ''      //农历数字时
        };
     * </pre>
     * @method  gregorianToLunar
     * @static
     * @for     JC.LunarCalendar
     * @param   {date}  _date      要获取农历日期的时间对象
     * @return  Object
     */
    JC.LunarCalendar.gregorianToLunar = gregorianToLunar;

    function gregorianToLunar( _date ){
        var _r = {
            shengxiao: ''   //生肖
            , ganzhi: ''    //干支
            , yue: ''       //月份
            , ri: ''        //日
            , shi: ''       //时
            , year: ''      //农历数字年
            , month: ''     //农历数字月
            , day: ''       //农历数字天
            , hour: ''      //农历数字时
        };

        var _lunar = toLunarDate( _date );
        _r.year = _lunar.y;
        _r.month = _lunar.m + 1;
        _r.day = _lunar.d;

        //JC.log( _r.year, _r.month, _r.day, ' ', _date.getFullYear(), _date.getMonth()+1, _date.getDate() );

        _r.shengxiao = shengxiao.charAt((_r.year - 4) % 12);
        _r.ganzhi = tiangan.charAt((_r.year - 4) % 10) + dizhi.charAt((_r.year - 4) % 12);

        if(_lunar.isleep) {
            _r.yue = "闰" + yuefan.charAt(_r.month - 1);
        }
        else{
            _r.yue = yuefan.charAt(_r.month - 1);
        }
        _r.yue += '月';

        _r.ri = (_r.day < 11) ? "初" : ((_r.day < 20) ? "十" : ((_r.day < 30) ? "廿" : "卅"));
        if (_r.day % 10 != 0 || _r.day == 10) {
            _r.ri += shuzi.charAt((_r.day - 1) % 10);
        }
        _r.ri == "廿" && ( _r.ri = "二十" );
        _r.ri == "卅" && ( _r.ri = "三十" );
        /*JC.log( 'month:', _r.month, 2 );*/

        _r.shi = dizhi.charAt((_r.hour - 1) % 12);
        return _r;
    };

    function getBit(m, n) { return (m >> n) & 1; }

    var tiangan =  "甲乙丙丁戊己庚辛壬癸";
    var dizhi =  "子丑寅卯辰巳午未申酉戌亥";
    var shengxiao =  "鼠牛虎兔龙蛇马羊猴鸡狗猪";
    var yuefan =  "正二三四五六七八九十冬腊";
    var xingqi =  "日一二三四五六";
    var shuzi =  "一二三四五六七八九十";
    var lunarDays = [0x41A95,0xD4A,0xDA5,0x20B55,0x56A,0x7155B,0x25D,0x92D,0x5192B,0xA95,0xB4A,0x416AA,0xAD5,0x90AB5,0x4BA,0xA5B,0x60A57,0x52B,0xA93,0x40E95];
    var lunarMonth = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

    ;void function(){
    var lunarDate=function(r){function l(a){for(var c=348,b=32768;b>8;b>>=1)c+=h[a-1900]&b?1:0;return c+(i(a)?(h[a-1899]&15)==15?30:29:0)}function i(a){a=h[a-1900]&15;return a==15?0:a}function o(a){if(!a||!a.getFullYear)return!1;var c=a.getFullYear(),b=a.getMonth(),a=a.getDate();return Date.UTC(c,b,a)>Date.UTC(2101,0,28)||Date.UTC(c,b,a)<Date.UTC(1900,0,31)?!0:!1}var h=[19416,19168,42352,21717,53856,55632,21844,22191,39632,21970,19168,42422,42192,53840,53845,46415,54944,44450,38320,18807,18815,42160,
    46261,27216,27968,43860,11119,38256,21234,18800,25958,54432,59984,27285,23263,11104,34531,37615,51415,51551,54432,55462,46431,22176,42420,9695,37584,53938,43344,46423,27808,46416,21333,19887,42416,17779,21183,43432,59728,27296,44710,43856,19296,43748,42352,21088,62051,55632,23383,22176,38608,19925,19152,42192,54484,53840,54616,46400,46752,38310,38335,18864,43380,42160,45690,27216,27968,44870,43872,38256,19189,18800,25776,29859,59984,27480,23232,43872,38613,37600,51552,55636,54432,55888,30034,22176,
    43959,9680,37584,51893,43344,46240,47780,44368,21977,19360,42416,20854,21183,43312,31060,27296,44368,23378,19296,42726,42208,53856,60005,54576,23200,30371,38608,19195,19152,42192,53430,53855,54560,56645,46496,22224,21938,18864,42359,42160,43600,45653,27951,44448,19299,37759,18936,18800,25776,26790,59999,27424,42692,43759,37600,53987,51552,54615,54432,55888,23893,22176,42704,21972,21200,43448,43344,46240,46758,44368,21920,43940,42416,21168,45683,26928,29495,27296,44368,19285,19311,42352,21732,53856,
    59752,54560,55968,27302,22239,19168,43476,42192,53584,62034,54560],g="\u96f6,\u4e00,\u4e8c,\u4e09,\u56db,\u4e94,\u516d,\u4e03,\u516b,\u4e5d,\u5341".split(","),p=["\u521d","\u5341","\u5eff","\u5345","\u25a1"],s="\u7532,\u4e59,\u4e19,\u4e01,\u620a,\u5df1,\u5e9a,\u8f9b,\u58ec,\u7678".split(","),t="\u5b50,\u4e11,\u5bc5,\u536f,\u8fb0,\u5df3,\u5348,\u672a,\u7533,\u9149,\u620c,\u4ea5".split(","),u="\u9f20,\u725b,\u864e,\u5154,\u9f99,\u86c7,\u9a6c,\u7f8a,\u7334,\u9e21,\u72d7,\u732a".split(","),q="\u5c0f\u5bd2,\u5927\u5bd2,\u7acb\u6625,\u96e8\u6c34,\u60ca\u86f0,\u6625\u5206,\u6e05\u660e,\u8c37\u96e8,\u7acb\u590f,\u5c0f\u6ee1,\u8292\u79cd,\u590f\u81f3,\u5c0f\u6691,\u5927\u6691,\u7acb\u79cb,\u5904\u6691,\u767d\u9732,\u79cb\u5206,\u5bd2\u9732,\u971c\u964d,\u7acb\u51ac,\u5c0f\u96ea,\u5927\u96ea,\u51ac\u81f3".split(","),
    v=[0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758],m=r||new Date;this.date=m;this.toLunarDate=function(a){a=a||m;if(o(a)){return"the function[toLunarDate()]range[1900/0/31-2101/0/28]";throw"dateRangeError";}for(var c=a.getFullYear(),b=a.getMonth(),a=a.getDate(),c=(Date.UTC(c,b,a)-Date.UTC(1900,0,31))/864E5,d,b=1900;b<2100&&c>0;b++)d=l(b),c-=d;c<0&&(c+=d,b--);lunarYear=b;_isLeap=!1;leap=
    i(lunarYear);for(b=1;b<13&&c>0;b++)leap>0&&b==leap+1&&_isLeap==!1?(b--,_isLeap=!0,d=i(lunarYear)?(h[lunarYear-1899]&15)==15?30:29:0):d=h[lunarYear-1900]&65536>>b?30:29,_isLeap==!0&&b==leap+1&&(_isLeap=!1),c-=d;c==0&&leap>0&&b==leap+1&&(_isLeap?_isLeap=!1:(_isLeap=!0,b--));c<0&&(c+=d,b--);lunarMonth=b-1;lunarDay=c+1;return{y:lunarYear,m:lunarMonth,d:lunarDay,leap:leap,isleep:_isLeap,toString:function(){var a=_isLeap?"(\u95f0)":"",b=g[parseInt(lunarYear/1E3)]+g[parseInt(lunarYear%1E3/100)]+g[parseInt(lunarYear%
    100/10)]+g[parseInt(lunarYear%10)],c=parseInt((lunarMonth+1)/10)==0?"":p[1];c+=g[parseInt((lunarMonth+1)%10)];var d=p[parseInt(lunarDay/10)];d+=parseInt(lunarDay%10)==0?"":g[parseInt(lunarDay%10)];return""+b+"\u5e74"+c+"\u6708"+a+d+"\u65e5"}}};this.toSolar=function(){if(arguments.length==0)return m;else{var a,c,b;arguments[0]&&(a=arguments[0]);c=arguments[1]?arguments[1]:0;b=arguments[2]?arguments[2]:1;for(var d=0,e=1900;e<a;e++){var f=l(e);d+=f}for(e=0;e<c;e++)f=h[a-1900]&65536>>e?30:29,d+=f;d+=
    b-1;return new Date(Date.UTC(1900,0,31)+d*864E5)}};this.ganzhi=function(a){function c(a,b){return(new Date(3.15569259747E10*(a-1900)+v[b]*6E4+Date.UTC(1900,0,6,2,5))).getUTCDate()}function b(a){return s[a%10]+t[a%12]}var d=a||m;if(o(d)){return"the function[ganzhi()] date'range[1900/0/31-2101/0/28]";throw"dateRangeError";}var e=d.getFullYear(),f=d.getMonth(),a=d.getDate(),d=d.getHours(),h,g,k,j,n;g=f<2?e-1900+36-1:e-1900+36;k=(e-1900)*12+f+12;h=c(e,f*2);var i=c(e,f*2+1);h=a==h?q[f*2]:a==i?q[f*2+1]:
    "";var i=c(e,2),l=c(e,f*2);f==1&&a>=i&&(g=e-1900+36);a+1>=l&&(k=(e-1900)*12+f+13);j=Date.UTC(e,f,1,0,0,0,0)/864E5+25577+a-1;n=j%10%5*12+parseInt(d/2)%12;d==23&&j++;g%=60;k%=60;j%=60;n%=60;return{y:g,m:k,d:j,h:n,jie:h,animal:u[g%12],toString:function(a){var c=b(g)+b(k)+b(j)+b(n);return a?c.substring(0,a):c}}}};
        lunarDate();
    }.call( window );
}(jQuery));

(function($){
    var o = JC.LunarCalendar.nationalHolidays = JC.LunarCalendar.nationalHolidays || {};
    //2013 元旦
    o['20130101'] = { 'isHoliday': true };
    o['20130102'] = { 'isHoliday': true };
    o['20130103'] = { 'isHoliday': true };
    o['20130104'] = { 'isWorkday': true };
    o['20130105'] = { 'isWorkday': true };
    //除夕 春节
    o['20130209'] = { 'isHoliday': true };
    o['20130210'] = { 'isHoliday': true };
    o['20130211'] = { 'isHoliday': true };
    o['20130212'] = { 'isHoliday': true };
    o['20130213'] = { 'isHoliday': true };
    o['20130214'] = { 'isHoliday': true };
    o['20130215'] = { 'isHoliday': true };
    o['20130216'] = { 'isWorkday': true };
    o['20130217'] = { 'isWorkday': true };
    //清明
    o['20130404'] = { 'name': '清明节', 'fullname': '清明节', 'priority': 8, 'isHoliday': true };
    o['20130405'] = { 'isHoliday': true };
    o['20130406'] = { 'isHoliday': true };
    o['20130407'] = { 'isWorkday': true };
    //劳动节
    o['20130427'] = { 'isWorkday': true };
    o['20130428'] = { 'isWorkday': true };
    o['20130429'] = { 'isHoliday': true };
    o['20130430'] = { 'isHoliday': true };
    o['20130501'] = { 'isHoliday': true };
    //端午节
    o['20130608'] = { 'isWorkday': true };
    o['20130609'] = { 'isWorkday': true };
    o['20130610'] = { 'isHoliday': true };
    o['20130611'] = { 'isHoliday': true };
    o['20130612'] = { 'isHoliday': true };
    //中秋节
    o['20130919'] = { 'isHoliday': true };
    o['20130920'] = { 'isHoliday': true };
    o['20130921'] = { 'isHoliday': true };
    o['20130922'] = { 'isWorkday': true };
    //国庆节
    o['20130929'] = { 'isWorkday': true };
    o['20131001'] = { 'isHoliday': true };
    o['20131002'] = { 'isHoliday': true };
    o['20131003'] = { 'isHoliday': true };
    o['20131004'] = { 'isHoliday': true };
    o['20131005'] = { 'isHoliday': true };
    o['20131006'] = { 'isHoliday': true };
    o['20131007'] = { 'isHoliday': true };
    o['20131012'] = { 'isWorkday': true };
    //2014 元旦
    o['20131228'] = { 'isWorkday': true };
    o['20131229'] = { 'isWorkday': true };
    o['20131230'] = { 'isHoliday': true };
    o['20131231'] = { 'isHoliday': true };
    o['20140101'] = { 'isHoliday': true };
    //除夕 春节
    o['20140126'] = { 'isWorkday': true };
    o['20140130'] = { 'isHoliday': true };
    o['20140131'] = { 'isHoliday': true };
    o['20140201'] = { 'isHoliday': true };
    o['20140202'] = { 'isHoliday': true };
    o['20140203'] = { 'isHoliday': true };
    o['20140204'] = { 'isHoliday': true };
    o['20140205'] = { 'isHoliday': true };
    o['20140208'] = { 'isWorkday': true };
    //清明节
    o['20140405'] = { 'name': '清明节', 'fullname': '清明节', 'priority': 8, 'isHoliday': true };
    o['20140406'] = { 'isHoliday': true };
    o['20140407'] = { 'isHoliday': true };
    //劳动节
    o['20140501'] = { 'isHoliday': true };
    o['20140502'] = { 'isHoliday': true };
    o['20140503'] = { 'isHoliday': true };
    o['20140504'] = { 'isWorkday': true };
    //端午节
    o['20140531'] = { 'isHoliday': true };
    o['20140601'] = { 'isHoliday': true };
    o['20140602'] = { 'isHoliday': true };
    //中秋节
    o['20140906'] = { 'isHoliday': true };
    o['20140907'] = { 'isHoliday': true };
    o['20140908'] = { 'isHoliday': true };
    //国庆节
    o['20140928'] = { 'isWorkday': true };
    o['20141001'] = { 'isHoliday': true };
    o['20141002'] = { 'isHoliday': true };
    o['20141003'] = { 'isHoliday': true };
    o['20141004'] = { 'isHoliday': true };
    o['20141005'] = { 'isHoliday': true };
    o['20141006'] = { 'isHoliday': true };
    o['20141007'] = { 'isHoliday': true };
    o['20141011'] = { 'isWorkday': true };
}(jQuery));
