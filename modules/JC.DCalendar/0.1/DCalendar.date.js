;(function(define, _win) { 'use strict'; define( ['JC.BaseMVC'], function () {
/**
 * 双日历日期选择组件
 * <p>
 *      <b>require</b>: 
 *          <a href='window.jQuery.html'>jQuery</a>
 *          , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 * </p>
 * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 * | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.DCalendar.html' target='_blank'>API docs</a>
 * | <a href='../../modules/JC.DCalendar/0.1/_demo' target='_blank'>demo link</a></p>
 *
 * <p></p>
 *
 * <h2>可用的 HTML attribute</h2>
 *
 * <dl>
 *      <dt>datatype = string 必填项</dt>
 *      <dd>声明日历控件的类型：
 *      <br/><b>ddate:</b> 日期日历
 *      <br/><b>drange:</b> 日期范围日历( 成对出现 )
 *      </dd>
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
 *      <dt>monthmum = int</dt>
 *      <dd>
 *          声明显示月份日历面板的个数（一次性可显示2到12个月份），默认为2（双日历）
 *      </dd>
 *
 *      <dt>showtype = block || float </dt>
 *      <dd>
 *          声明月份日历面板的显示方式，默认为float<br/>
 *          float（比如两个月份并排显示） <a href="../../modules/JC.DCalendar/0.1/res/default/style.html#float" target="_blank">查看</a><br/>
 *          block （月份日历面板竖排显示）<a href="../../modules/JC.DCalendar/0.1/res/default/style.html#block" target="_blank">查看</a><br/>
 *      </dd>
 *
 *      <dt>calendarshow = function</dt>
 *      <dd>显示日历显示后的回调
<pre>function calendarShow( selector ) {
    var ins = this;
    JC.log( "calendarshow", new Date().getTime(), selector.val() );
}</pre></dd>
 *
 *      <dt>calendarhide = function</dt>
 *      <dd>隐藏日历后的回调
<pre>function calendarhide( selector ) {
    JC.log( "calendarhide", $(selector).val(), new Date().getTime() );
}</pre></dd>
 *
 *      <dt>calendarclear = function</dt>
 *      <dd>清空选中日期后的回调
<pre>function calendarclear( selector ) {
    JC.log( "calendarclear", $(selector).val(), new Date().getTime() );
}</pre></dd>
 *
 *     <dt>updatedate = function</dt>
 *     <dd>选中日期后回调
<pre>function updatedate( selector ) {
    JC.log( "updatedate", $(selector).val(), new Date().getTime() );
}</pre></dd>
 *
 *     <dt>updatemonth = function</dt>
 *     <dd>选中月份后回调
<pre>function updatemonth( selector ) {
    JC.log( "updatedatemonth", $(selector).val(), new Date().getTime() );
}</pre></dd>
 *
 *     <dt>updateyear = function</dt>
 *     <dd>选中年份后回调
<pre>function updateyear( selector ) {
    JC.log( "updatedateyear", $(selector).val(), new Date().getTime() );
}</pre></dd>
 *
 *     <dt>beforeupdateyear = function</dt>
 *     <dd>更新年份前的回调，即年份日历面板出来时
<pre>function beforeupdateyear( selector ) {
    JC.log( "beforeupdateyear", $(selector).val(), new Date().getTime() );
}</pre></dd>
 *
 *     <dt>beforeupdatemonth = function</dt>
 *     <dd>更新月份前的回调，即月份日历面板出来时
<pre>function beforeupdateymonth( selector ) {
    JC.log( "beforeupdateymonth", $(selector).val(), new Date().getTime() );
}</pre></dd>
 *
 *     <dt>beforeupdatemont = function</dt>
 *     <dd>更新月份前的回调，即月份日历面板出来时
<pre>function beforeupdateymonth( selector ) {
    JC.log( "beforeupdateymonth", $(selector).val(), new Date().getTime() );
}</pre></dd>
 *
 *     <dt>updateprevpageyear = function</dt>
 *     <dd>点击上一页年份时的回调
<pre>function updatprevtpageyear( selector ) {
    JC.log( "updateprevpageyear", $(selector).val(), new Date().getTime() );
}</pre></dd>
 *
 *     <dt>updatenextpageyear = function</dt>
 *     <dd>点击下一页年份时的回调
<pre>function updatenextpageyear( selector ) {
    JC.log( "updatenextpageyear", $(selector).val(), new Date().getTime() );
}</pre></dd>
 *
 *     <dt>updateprevyear = function</dt>
 *     <dd>点击上一年时的回调，月份日历面板点击上一页
<pre>function updatprevyear( selector ) {
    JC.log( "updateprevyear", $(selector).val(), new Date().getTime() );
}</pre></dd>
 *
 *     <dt>updatenextyear = function</dt>
 *     <dd>点击下一年时的回调，月份日历面板点击下一页
<pre>function updatenextyear( selector ) {
    JC.log( "updatenextyear", $(selector).val(), new Date().getTime() );
}</pre></dd>
 *
 *     <dt>updateprevmonth = function</dt>
 *     <dd>点击上一月时的回调，日期日历面板点击上一页
<pre>function updatprevmonth( selector ) {
    JC.log( "updateprevmonth", $(selector).val(), new Date().getTime() );
}</pre></dd>
 *
 *     <dt>updatenextmonth = function</dt>
 *     <dd>点击下一月时的回调，日期日历面板点击下一页
<pre>function updatenextmonth( selector ) {
    JC.log( "updatenextmonth", $(selector).val(), new Date().getTime() );
}</pre></dd>
 *
 * </dl> 
 *
 * @namespace JC
 * @class DCalendar
 * @extends JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2013-12-20
 * @author  zuojing   <zuojing1013@gmail.com> | 75 Team
*/
    JC.DCalendar = DCalendar;

    function DCalendar(_selector) {
        _selector && (_selector = $(_selector));
        if ( DCalendar.getInstance(_selector) ) return DCalendar.getInstance(_selector);
        DCalendar.getInstance(_selector, this);
        this._model = new DCalendar.Model(_selector);
        this._view = new DCalendar.View(this._model);
        this._init();

        //JC.log( 'DCalendar inited', new Date().getTime() );
    }

    /**
     * 获取或设置 DCalendar 的实例
     * @method  getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {DCalendarInstance}
     */
    DCalendar.getInstance = function (_selector, _setter) {
        var _type = DCalendar._type( _selector );

        if ( typeof _selector === 'string' && !/</.test( _selector ) ) 
            _selector = $(_selector);
        
        if ( !(_selector && _selector.length ) || ( typeof _selector === 'string' ) ) return;
        
        if ( typeof _setter !== 'undefined' ) {
            DCalendar.ins[_type] = _setter;
        }
        
        return DCalendar.ins[_type];
    };

    DCalendar.ins = {};
    /**
     * 初始化可识别的 DCalendar 实例
     * @method  init
     * @param   {selector}      _selector
     * @param   {bool}          _onlyStatus     default = false
     * @static
     * @return  {Array of DCalendarInstance}
     */
    DCalendar.init = function (_selector, _onlyStatus) {
        var _r = [] ;

        typeof _selector === 'boolean' && ( _onlyStatus = _selector, _selector = document );
        
        _selector = $(_selector || document);

        if ( _selector.length ) {
            var _nodeName = _selector.length === 1 ? _selector.prop('nodeName').toLowerCase() : '';

            if ( _nodeName && (_nodeName === 'input' || _nodeName === 'button') ) {
                DCalendar._initStatus( _selector );
                
            } else {
                _selector.find([ 
                                    'input[datatype=ddate]'
                                    , 'input[datatype=drange]'
                                    , 'button[datatype=ddate]' 
                                    , 'input[multidate=ddate]' 
                                    , 'button[multidate=ddate]' 
                                ].join()).each( function() {
                    DCalendar._initStatus( $(this) );
                    
                })
            }
        }

        return _r;
    };

    /**
     * 初始化可识别的 DCalendar 的状态
     * @method  _initStatus
     * @param   {selector}      _selector
     * @static
     * @protected
     */
    DCalendar._initStatus = function (_selector) {
        var _tmp;

        _selector && ( _selector = $(_selector) );
        if( !( _selector && _selector.length ) ) return;
        
        _selector.val() 
            && ( _tmp = JC.f.dateDetect( _selector.val() ) )
            && _selector.val( JC.f.formatISODate( _tmp )  )

        _selector.attr('minValue')
            && ( _tmp = JC.f.dateDetect( _selector.attr('minValue') ) )
            && _selector.attr('minValue', JC.f.formatISODate( _tmp ))


        _selector.attr( 'maxValue' )
            && ( _tmp = JC.f.dateDetect( _selector.attr('maxValue') ) )
            && _selector.attr('maxValue', JC.f.formatISODate( _tmp )  )

        _selector.addClass('CDCalendar_icon');
    };

    DCalendar._type = function (_selector) {
        // var _r, 
        //     _type = ( ($.trim(_selector.attr('multidate')) || '').toLowerCase()  )
        //         || ( ($.trim(_selector.attr('datatype')) || '') .toLowerCase() );

        // _selector　&& ( _selector = $(_selector) );
            
        // switch ( _type ) {
        //     case 'week': 
        //     case 'month': 
        //     case 'season': 
        //     case 'year': 
        //     case 'monthday': 
        //         {
        //             _r = _type;
        //             break;
        //         }
        //     default: 
        //         _r = 'ddate'; 
        //         break;
        // }

        return '_ddate';
    },

    DCalendar.update = function () {
        var _items = $(JC.f.printf( '#{0}>div', DCalendar.Model._boxId ));

        if( !_items.length ) return;

        _items.each( function() {
            var _p = $(this), 
                _ins = _p.data( 'CDCalendarIns' );

            if( !_ins ) return;

            if ( _ins._model.layout().is(':visible') ) {
                _ins.update();
            }

        });
    },

    /**
     * 弹出日期选择框
     * @method pickDate
     * @static
     * @param   {selector}  _selector 需要显示日期选择框的标签 
     * @example
            <dl>
                <dd>
                    <input type="text" name="date6" class="manualPickDate" value="20110201" />
                    manual JC.DCalendar.pickDate
                </dd>
                <dd>
                    <input type="text" name="date7" class="manualPickDate" />
                    manual JC.DCalendar.pickDate
                </dd>
            </dl>
            <script>
                $(document).delegate('input.manualPickDate', 'focus', function($evt){
                    JC.DCalendar.pickDate( this );
                });
            </script>
     */  
    DCalendar.pickDate = function (_selector) {
        var _selector = $(_selector),
            _ins, 
            _isIgnore = _selector.is('[ignoreprocess]');

        if ( !(_selector && _selector.length) ) return;
        
        if ( ( $(DCalendar.lastSrc)[0] === _selector[0]) && DCalendar.visible ) {
            _selector.attr('cdc_ignore', true);
        } else {
            _selector.attr('cdc_ignore', false);
        }

        if ( JC.f.parseBool( _selector.attr('cdc_ignore') ) ) {
            return;
        }

        DCalendar.lastSrc = _selector;
        DCalendar.visible = false;

        _selector.attr('ignoreprocess', true)
            .addClass('js_compDCalendar')
            .blur();

        !_isIgnore && _selector.removeAttr('ignoreprocess');

        _ins = DCalendar.getInstance( _selector );
        !_ins && ( _ins = new DCalendar( _selector ) );

        _ins.trigger(DCalendar.Model.SHOW);

        return this;
    },

    DCalendar.lastSrc = null,

    BaseMVC.build(DCalendar);

    JC.f.extendObject(DCalendar.prototype, {
        _beforeInit: function () {
            //this.trigger(DCalendar.Model.CDC_INITED );
        },

        _initHanlderEvent: function () {
            var _p = this;

            _p.on('CDC_INITED', function () {
                _p._model.selector().addClass('CDCalendar_icon');
            });

            _p._model.selector().on('keydown', function ( _evt ) {
                _evt.preventDefault();
            });

            _p.on(DCalendar.Model.SHOW, function () {
                _p._model.selector(DCalendar.lastSrc);
                _p._view.show();
                DCalendar.visible = true;
                _p._model.calendarshow()
                    && _p._model.calendarshow().call(_p, _p.selector());
            });

            _p.on(DCalendar.Model.HIDDEN, function () {
                _p._model.selector().addClass('cdc_ignore', false);
                _p._view.hide();
                DCalendar.visible = false;
                _p.selector().blur();
                _p._model.calendarhide()
                    && _p._model.calendarhide().call(_p, _p.selector());
            });

            _p.on(DCalendar.Model.CHANGE, function (_evt, _srcSelector) {
                _p._view.change(_srcSelector);
            });

            _p.on(DCalendar.Model.SETDATE, function (_evt, _srcSelector) {
                _p._model.setSelected(_srcSelector);
                _p._model.updatedate()
                    && _p._model.updatedate().call(_p, _p.selector());

            });

            // _p.on(DCalendar.Model.UPDATESELECTOR, function (_evt, _srcSelector) {

            // });

            _p.on(DCalendar.Model.CLEAR, function () {
                _p._model.clear();
                _p._model.calendarclear()
                    && _p._model.calendarclear().call(_p, _p.selector());
            });

            _p.on(DCalendar.Model.DATEVIEW, function (_evt, _srcSelector) {
                _p._view.dateView(_srcSelector);
                _p._model.updatemonth()
                    && _p._model.updatemonth().call(_p, _p.selector());
            });

            _p.on(DCalendar.Model.MONTHVIEW, function (_evt, _srcSelector) {
                _p._view.monthView(_srcSelector);

                if ( $(_srcSelector).attr('data-year') ) {
                    _p._model.updateyear()
                    && _p._model.updateyear().call(_p, _p.selector());
                } else {
                    _p._model.beforeupdatemonth()
                        && _p._model.beforeupdatemonth().call(_p, _p.selector());
                }
                
            });

            _p.on(DCalendar.Model.YEARVIEW, function (_evt, _srcSelector) {
                _p._view.yearView(_srcSelector);
                _p._model.beforeupdateyear()
                    && _p._model.beforeupdateyear().call(_p, _p.selector());
            });

            _p.on(DCalendar.Model.UPDATENEXTPAGEYEAR, function () {
                _p._model.updatenextpageyear()
                    && _p._model.updatenextpageyear().call(_p, _p.selector());
            });

            _p.on(DCalendar.Model.UPDATEPREVPAGEYEAR, function () {
                _p._model.updateprevpageyear()
                    && _p._model.updateprevpageyear().call(_p, _p.selector());
            });

            _p.on(DCalendar.Model.UPDATEPREVMONTH, function () {
                _p._model.updateprevmonth()
                    && _p._model.updateprevmonth().call(_p, _p.selector());
            });

            _p.on(DCalendar.Model.UPDATENEXTMONTH, function () {
                _p._model.updatenextmonth()
                    && _p._model.updatenextmonth().call(_p, _p.selector());
            });

            _p.on(DCalendar.Model.UPDATEPREVYEAR, function () {
                _p._model.updateprevyear()
                    && _p._model.updateprevyear().call(_p, _p.selector());
            });

            _p.on(DCalendar.Model.UPDATENEXTYEAR, function () {
                _p._model.updatenextyear()
                    && _p._model.updatenextyear().call(_p, _p.selector());
            });

        }, 

        _inited: function () {
            
        }

    });
    
    DCalendar.Model._instanceName = "DCalendar";
    DCalendar.Model.CDC_INITED = "CDC_INITED";
    DCalendar.Model._boxId = "CompDCalendar";
    DCalendar.Model.SHOW = "CDC_SHOW";
    DCalendar.Model.HIDDEN = "CDC_HIDDEN";
    DCalendar.Model.CHANGE = "CDC_CHANGE";
    DCalendar.Model.SETDATE = "CDC_SETDATE";
    DCalendar.Model.DATEVIEW = "CDC_DATEVIEW";
    DCalendar.Model.MONTHVIEW = "CDC_MONTHVIEW";
    DCalendar.Model.YEARVIEW = "CDC_YEARVIEW";
    DCalendar.Model.CLEAR = "CDC_CLEAR";
    //DCalendar.Model.UPDATESELECTOR = "CDC_UPDATESELECTOR";
    DCalendar.Model.UPDATENEXTPAGEYEAR = "CDC_UPDATENEXTPAGEYEAR";
    DCalendar.Model.UPDATEPREVPAGEYEAR = "CDC_UPDATEPREVPAGEYEAR";
    DCalendar.Model.UPDATEPREVMONTH = "CDC_UPDATEPREVMONTH";
    DCalendar.Model.UPDATENEXTMONTH = "CDC_UPDATENEXTMONTH";
    DCalendar.Model.UPDATEPREVYEAR = "CDC_UPDATEPREVYEAR";
    DCalendar.Model.UPDATENEXTYEAR = "CDC_UPDATENEXTYEAR";

    JC.f.extendObject(DCalendar.Model.prototype, {
        init: function () {
            var _p = this;
        },

        isDCalendar: function ( _selector ) {
            var _selector = $(_selector),
                _r = 0;
            
            if ( _selector.length ) {
                
                if ( _selector.prop('nodeName') 
                    && _selector.attr('datatype')
                    && ( _selector.prop('nodeName').toLowerCase() === 'input' 
                        || _selector.prop('nodeName').toLowerCase() === 'button' )
                    && ( (_selector.attr('datatype') || '').toLowerCase() === 'ddate' 
                        || ( _selector.attr('multidate') || '' ).toLowerCase() === 'ddate' )
                ) {
                    _r = 1;
                }

                _selector.hasClass('js_compDCalendar') && ( _r = 1 );
            }

            return _r;

        },

        curSelectedDate: function () {
            var _p = this,
                _r = _p.selector().val().trim();

            _r = ( JC.f.dateDetect(_r) || new Date() );

            return _r;

        },

        curYear: function () {
            return this.curSelectedDate().getFullYear();
        },
        
        curMonth: function () {
            return this.curSelectedDate().getMonth();
        },

        minValue: function () {
            var _r =  this.attrProp('minValue') || '';            
            
            _r && ( _r = JC.f.dateDetect(_r) );

            return _r;
        },

        maxValue: function () {
            var _r = this.attrProp('maxValue') || ''; 
            
            _r && ( _r = JC.f.dateDetect(_r) );

            return _r;
        },

        minYear: function () {
            var _p = this,
                _r;

            _p.minValue() && ( _r = _p.minValue().getFullYear() );

            return _r;
        },

        maxYear: function () {
            var _p = this,
                _r;

            _p.maxValue() && ( _r = _p.maxValue().getFullYear() );

            return _r;
        },

        currentCanSelect: function () {
            var  _r = this.boolProp('currentCanSelect');

            ( typeof _r === 'undefined' ) && ( _r = true );

            return _r;
        },

        weekendCanSelect: function () {
            var  _r = this.boolProp('weekendCanSelect');

            ( typeof _r === 'undefined' ) && ( _r = true );

            return _r;
        },

        /**
         * 显示的月份面板为2到12个
        */
        monthNum: function () {
            var _r = this.intProp('monthNum');

            (!_r || _r < 2 || _r > 12) && ( _r = 2 );

            return _r;
        },

        showtype: function () {
            var _r = this.attrProp('showtype');

            if ( _r === 'block' ) {
                _r = 'block';
            } else {
                _r = "float";
            }

            return _r;
        },

        // multiselect: function () {
        //     var _r = this.boolProp('multiselect');

        //     ( typeof _r === 'undefined' ) && ( _r = false );

        //     return _r;
        // },

        allYearsTpl: function (_startYear, _endYear) {
            //前14年后13年
            var _p = this,
                _r = '<tr>',
                i,
                j;

            for ( i = _startYear, j = 1; i <= _endYear; i++ ) {
                _r += '<td><a href="javascript:;" class="js_compDCYear" data-year="' + i + '">' + i + '</a></td>'

                if ( j % 7 === 0 ) {
                    if ( j === 28 ) {
                        _r += '</tr><tr>'
                        return _r;
                    } else {
                        _r += '</tr>'
                    }
                }

                j++
            }

            return _r;

        },

        datesOfMonthTpl: function (_date) {
           
            var _p = this,
                _r = '<tr>',
                _t,
                _d,
                _today = new Date(),
                _formatDate,
                _day,
                _maxDayOfMonth = JC.f.maxDayOfMonth(_date),
                _placeholder = '',
                i,
                j,
                _todayClass,
                _weekendClass;

            for ( i = 1; i <= _maxDayOfMonth; i++ ) {
                _d = new Date(_date.getFullYear(), _date.getMonth(), i);
                _formatDate = JC.f.formatISODate(_d);
                _day = (_d.getDay() + 6) % 7;
                _todayClass = '';
                _weekendClass = '';

                ( JC.f.isSameDay(_today, _d) ) && ( _todayClass = "today" );
                ( _day === 5 || _day === 6 ) && ( _weekendClass = "weekend" ); 
                
                _t = '<td>' 
                    + '<a href="javascript:;" title="' + _formatDate 
                    + '" data-date="' + _formatDate 
                    + '" class="' + _todayClass + _weekendClass
                    + '" >' + i 
                    + '</a></td>'; 
               
                if ( i === 1 && _day > 0) {
                    
                    j = _day;

                    while ( j-- ) {
                        _placeholder += '<td ><a href="javascript:;" class="disabled"></a></td>';
                    }

                    _r = _r + _placeholder;
                    _placeholder = '';
                   
                }

                _r += _t;

                if ( i === _maxDayOfMonth && _day < 6) {

                    j = 6 - _day;

                    while ( j-- ) {
                        _placeholder += '<td><a href="javascript:;" class="disabled"></a></td>';
                    }

                    _r = _r + _placeholder;
                    _placeholder = '';

                }

                if ( _day === 6 ) {
                    if ( i === _maxDayOfMonth ) {
                        _r = _r + '</tr>';
                    } else {
                        _r = _r + '</tr><tr>';
                    }
                }

            }
  
            return _r;

        },

        monthTpl: '<div class="CDC_inner">'
                    + '<div class="CDC_header">'
                        + '<div class="CDC_header_tools">'
                            + '<a href="javascript:;" data-date="{2}" class="CDC_Date">返回今天</a>'
                            + '<a href="javascript:;" data-date="{3}" class="CDC_Date">返回选中日期</a>'
                        + '</div>'
                        + '<h4>'
                            + '<a href="javascript:;" data-date="{1}" class="CDC_Year">{0}</a>'
                        + '</h4>'
                    + '</div>'
                    + '<div class="CDC_body">'  
                        + '<table class="CDC_month_body">'
                            + '<tbody>'
                                + '<tr>'
                                    + '<td><a href="javascript:;" class="js_compDCMonth" data-month="0">一月</a></td>'
                                    + '<td><a href="javascript:;" class="js_compDCMonth" data-month="1">二月</a></td>'
                                    + '<td><a href="javascript:;" class="js_compDCMonth" data-month="2">三月</a></td>'
                                    + '<td><a href="javascript:;" class="js_compDCMonth" data-month="3">四月</a></td>'
                                    + '<td><a href="javascript:;" class="js_compDCMonth" data-month="4">五月</a></td>'
                                    + '<td><a href="javascript:;" class="js_compDCMonth" data-month="5">六月</a></td>'
                                + '</tr>'
                                + '<tr>'
                                    + '<td><a href="javascript:;" class="js_compDCMonth" data-month="6">七月</a></td>'
                                    + '<td><a href="javascript:;" class="js_compDCMonth" data-month="7">八月</a></td>'
                                    + '<td><a href="javascript:;" class="js_compDCMonth" data-month="8">九月</a></td>'
                                    + '<td><a href="javascript:;" class="js_compDCMonth" data-month="9">十月</a></td>'
                                    + '<td><a href="javascript:;" class="js_compDCMonth" data-month="10">十一月</a></td>'
                                    + '<td><a href="javascript:;" class="js_compDCMonth" data-month="11">十二月</a></td>'
                                + '</tr>'
                            + '</tbody>'
                        + '</table>'
                    + '</div>'
                +'</div>',

        yearTpl: '<div class="CDC_inner">'
                    + '<div class="CDC_header">'
                        + '<div class="CDC_header_tools">'
                            + '<a href="javascript:;" data-date="{0}" class="CDC_Date">返回今天</a>'
                            + '<a href="javascript:;" data-date="{3}" class="CDC_Date">返回选中日期</a>'
                        + '</div>'
                        + '<h4><span>{2}</span></h4>'
                    + '</div>'
                    + '<div class="CDC_body">'
                       + '<table class="CDC_year_body">'
                           + '<tbody>'
                           + '{1}'
                           + '</tbody>'
                        + '</table>'
                    + '</div>'
                + '</div>',

        dateTpl: '<div class="CDC_inner" style="width: 182px;" >'
                    + '<div class="CDC_header">'
                        + '<h4>'
                        + '<a href="javascript:;" title="更改年份" data-date="{0}" class="CDC_Year">{1}</a>'
                        + '<a href="javascript:;" title="更改月份" data-date="{0}" class="CDC_Month">{2}</a>'
                        + '</h4>' 
                    + '</div>'
                    + '<div class="CDC_body">'
                        + '<table class="CDC_date_body CDC_date_body_left">'
                            + '<thead >'
                                + '<tr>'
                                    + '<th>一</th>'
                                    + '<th>二</th>'
                                    + '<th>三</th>'
                                    + '<th>四</th>'
                                    + '<th>五</th>'
                                    + '<th>六</th>'
                                    + '<th>日</th>'
                                + '</tr>'
                            + '</thead>'
                            + '<tbody>'
                            +   '{3}'   
                            + '</tbody>'
                        + '</table>'
                    + '</div>'
                + '</div>',

        baseTpl: '<div class="CDCalendar_bounding_box" style="display:none;">'
                    + '<div class="CDC_container" >'
                        + '<div class="CDC_content_box" >'
                            + '<div class="CDC_arrow" >'
                                + '<a  href="javascript:;" class="CDC_close_btn" title="关闭">close</a>'
                                + '<a  href="javascript:;" class="CDC_prev_btn" data-action="prev">prev</a>'
                                + '<a  href="javascript:;" class="CDC_next_btn" data-action="next">next</a>'
                                + '<a  href="javascript:;" class="CDC_clear" title="清除">clear</a>'
                            + '</div>'
                            + '<div class="CDC_date_box" >'
                               + '{0}'
                            + '</div>'
                        + '</div>'
                    + '</div>'
                + '</div>',

        buildYearTpl: function (_date, _startYear, _endYear) {
            var _p = this,
                _r = _p.yearTpl;

            _p.layoutBox().find('.CDC_date_box').html(
                JC.f.printf( 
                    _r, 
                    JC.f.formatISODate(_date), 
                    _p.allYearsTpl(_startYear, _endYear), 
                    _startYear + ' ~ ' + _endYear,
                    JC.f.formatISODate(_p.curSelectedDate())  
                )
            )
            .find('.CDC_year_body>tbody>tr>td>a').each( function () {
                var _sp = $(this),
                    _year = _sp.data('year'),
                    _d = new Date(_year, 0, 1);

                ( _year === new Date().getFullYear() ) && ( _sp.addClass('today') );

                ( _year === _p.curYear() ) && ( _sp.parent('td').addClass('selected_date') );

                ( ( _p.maxYear() && ( _year > _p.maxYear() ) ) 
                    || ( _p.minYear() && ( _year < _p.minYear() ) ) 
                ) && ( _sp.addClass('disabled') );

                _sp.attr('data-date', JC.f.formatISODate( _d ));

            } );
            _p.layoutBox()
            .find('.CDC_prev_btn')
                .attr('data-type', 'year')
                .attr('data-date', JC.f.formatISODate (new Date(_startYear - 1, 0, 1) ))
            .end()
            .find('.CDC_next_btn')
                .attr('data-type', 'year')
                .attr('data-date', JC.f.formatISODate (new Date(_endYear + 1, 0, 1) ));

            _p.layoutBox().css('width', 466);
            _p.disablePageBtn();
            _p.position();
        },

        buildMonthTpl: function ( _date ) {
            var _p = this,
                _r = _p.monthTpl,
                _prevT = new Date(_date.getFullYear() - 1, 11, 1);

            _p.layoutBox().find('.CDC_date_box').html(
                JC.f.printf( 
                    _r, 
                    _date.getFullYear() + '年', 
                    JC.f.formatISODate(_date),
                    JC.f.formatISODate(new Date()),
                    JC.f.formatISODate(_p.curSelectedDate()) 
                )
            )
            .find('.CDC_month_body>tbody>tr>td>a').each( function ( _ix ) {
                var _sp = $(this),
                    _month = _sp.data('month'),
                    _d = new Date(_date.getFullYear(), _month , 1),
                    _tempD = new Date(_d.getFullYear(), _month, JC.f.maxDayOfMonth(_d));

                ( JC.f.isSameMonth(_d, new Date()) ) && ( _sp.addClass('today') );

                ( JC.f.isSameMonth(_p.curSelectedDate(), _d )) && ( _sp.parent('td').addClass('selected_date') );

                ( ( _p.minValue() && ( _p.minValue().getTime() > _tempD.getTime() ) )
                    || ( _p.maxValue() && ( _p.maxValue().getTime() < _d.getTime() ) )
                 ) && ( _sp.addClass('disabled') );

                _sp.attr('data-date', JC.f.formatISODate( _d ));

            } )
            .end()
            .end()
            .find('.CDC_prev_btn')
                .attr('data-date', JC.f.formatISODate(new Date(_date.getFullYear() - 1, 11, JC.f.maxDayOfMonth(_prevT))))
                .attr('data-type', 'month')
            .end()
            .find('.CDC_next_btn')
                .attr('data-date', JC.f.formatISODate(new Date(_date.getFullYear() + 1, 0, 1)))
                .attr('data-type', 'month')

            _p.disablePageBtn();
            _p.position();
            _p.layoutBox().css('width', 466);

        },

        buildDateTpl: function (_date) {
            
            var _p = this,
                _tpl = '',
                _curDate = _date || _p.curSelectedDate(),
                _curYear = _curDate.getFullYear(),
                _curMonth = _curDate.getMonth(),
                _monthNum = _p.monthNum(),
                _prevDate = new Date(_curYear, _curMonth, 1),
                _nextDate,
                _tempDate;

            while ( _monthNum-- ) {
                
                _tpl += JC.f.printf( 
                    _p.dateTpl, 
                    JC.f.formatISODate(_curDate),
                    _curYear + '年', 
                    (_curMonth + 1) + '月',
                    _p.datesOfMonthTpl(_curDate)
                );

                _curDate = new Date(_curYear, _curMonth + 1, 1);                
                _curYear = _curDate.getFullYear();
                _curMonth = _curDate.getMonth();

            }

            _tempDate = new Date(_curYear, _curMonth - 1, 1);
            _nextDate = new Date(_curYear, _curMonth - 1, JC.f.maxDayOfMonth(_tempDate));

            _p.layoutBox().find('.CDC_date_box')
                .html( _tpl )
                .find('.CDC_date_body>tbody>tr>td>a[data-date]').each( function ( _ix ) {
                    var _sp = $(this),
                        _d = JC.f.dateDetect(_sp.data('date'));

                    ( JC.f.isSameDay(_d, _p.curSelectedDate()) ) 
                        && ( _sp.parent('td').addClass('selected_date') );
                    

                    (_p.minValue() && _d.getTime() < _p.minValue().getTime() ) 
                        && ( _sp.addClass('disabled') );
                      

                    ( _p.maxValue() && _d.getTime() > _p.maxValue().getTime() ) 
                        && ( _sp.addClass('disabled') );

                    ( !_p.currentCanSelect() && JC.f.isSameDay( _d, new Date() ) )
                        && ( _sp.addClass('disabled') );
                
                } )
                .end()
                .end()
                    .find('.CDC_next_btn')
                        .attr('data-date', JC.f.formatISODate(_nextDate))
                        .attr('data-type', 'date')
                .end()
                    .find('.CDC_prev_btn')
                        .attr('data-date', JC.f.formatISODate(_prevDate))
                        .attr('data-type', 'date');

            _p.disablePageBtn();
            _p.fixTable();

        },

        disablePageBtn: function () {
            var _p = this,
                _prevBtn = _p.layoutBox().find('.CDC_prev_btn'),
                _nextBtn = _p.layoutBox().find('.CDC_next_btn'),
                _prevDate = JC.f.dateDetect(_prevBtn.attr('data-date')),
                _nextDate = JC.f.dateDetect(_nextBtn.attr('data-date'));

            if ( _p.minValue() && ( _p.minValue().getTime() > _prevDate.getTime() ) ) {
                _prevBtn.addClass('CDC_prev_btn_disabled')
                    .prop('disabled', true);
            } else {
                _prevBtn.removeClass('CDC_prev_btn_disabled')
                    .prop('disabled', false);
            }

            if ( _p.maxValue() && ( _p.maxValue().getTime() < _nextDate.getTime() ) ) {
                _nextBtn.addClass('CDC_next_btn_disabled')
                    .prop('disabled', true);
            } else {
                _nextBtn.removeClass('CDC_next_btn_disabled')
                    .prop('disabled', false);
            }

        },

        layout: function () {
            var _p = this;

            !this._layout && ( this._layout = _p.layoutBox().find('div.CDCalendar_bounding_box') ) ;
 
            return this._layout;
        },

        layoutBox: function () {
            var _p = this,
                _r = $('#' + DCalendar.Model._boxId );

            if ( !(_r && _r.length) ) {
                _r = $(JC.f.printf( '<div id="{0}" style="width:466px;position:absolute;">' + _p.baseTpl + '</div>', DCalendar.Model._boxId ))
                    .appendTo( document.body );
            }

            return _r;
        },

        position: function () {
            var _p = this,
                _x = _p.selector().offset().left,
                _y = _p.selector().offset().top + _p.selector().prop('offsetHeight'),
                _tempX,
                _tempY,
                _win = $(window);

            //上下溢出
            if ( ( _win.outerHeight() + _win.scrollTop() ) < ( _y + _p.layout().height() ) ) {
                _tempY = _p.selector().offset().top  - _p.layout().height();
                ( _tempY >= 0 ) && ( _y = _tempY );
            } else {
                _y = _p.selector().offset().top + _p.selector().prop('offsetHeight');
            }

            //左右溢出

            if ( ( _win.outerWidth() + _win.scrollLeft() ) < ( _x + _p.layoutBox().outerWidth(true) ) ) {
                _tempX = _p.selector().offset().left + _p.selector().outerWidth() - _p.layoutBox().outerWidth(true);
                ( _tempX >= 0 ) && ( _x = _tempX );
            } else {
                _x = _p.selector().offset().left;
            }

            _p.layoutBox().css({
                left: _x,
                top: _y
            });

        },

        setSelected: function (_srcSelector) {
            var _p = this,
                _el = $(_srcSelector),
                _td = JC.f.getJqParent(_el, 'td'),
                _d = _el.data('date');

            _p.layoutBox().find('.CDC_date_body>tbody>tr>td').removeClass('selected_date');

            _td.addClass('selected_date').data('date');

            _p.selector().val(_d);

        },

        clear: function () {
            var _p = this;

            _p.layoutBox().find('.CDC_date_body>tbody>tr>td').removeClass('selected_date');
            _p.selector().val('');
        },

        fixTable: function () {
            var _p = this,
                _tables = _p.layoutBox().find('.CDC_date_body'),
                _t = '<tr>'
                        + '<td><a href="javascript:;" class="disabled">&nbsp;</a></td>'
                        + '<td><a href="javascript:;" class="disabled">&nbsp;</a></td>'
                        + '<td><a href="javascript:;" class="disabled">&nbsp;</a></td>'
                        + '<td><a href="javascript:;" class="disabled">&nbsp;</a></td>'
                        + '<td><a href="javascript:;" class="disabled">&nbsp;</a></td>'
                        + '<td><a href="javascript:;" class="disabled">&nbsp;</a></td>'
                        + '<td><a href="javascript:;" class="disabled">&nbsp;</a></td>'
                    + '</tr>',
                _max = 0;

            _tables.each( function ( _ix ) {
                var _sp = $(this),
                    _len = _sp.find('tbody>tr').length;

                ( _len > _max ) && ( _max = _len );
       
            } );

            _tables.each( function () {
                var _sp = $(this),
                    _len = _sp.find('tbody>tr').length;

                ( _len < _max ) && ( _sp.find('tbody').append(_t) );

            });

            if ( _p.showtype() === 'float' ) {
                if ( _p.monthNum() === 2 || _p.monthNum() === 4 ) {
                    _p.layoutBox().css('width', 466);
                } else {
                    _p.layoutBox().css('width', 678);
                }
            } else {
                _p.layoutBox().css('width', 267);
            }

        },

        /**
         * DCalendar显示时的回调
        */
        calendarshow: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "calendarshow";

            return _p.callbackProp(_selector, _key);
        },

        /**
         * DCalendar隐藏时的回调
        */
        calendarhide: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "calendarhide";

            return _p.callbackProp(_selector, _key);
        },

        /**
         * 清除选中的日期后的回调
        */
        calendarclear: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "calendarclear";

            return _p.callbackProp(_selector, _key);
        },

        /**
         * 选择日期赋值后的回调
        */
        updatedate: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "updatedate";

            return _p.callbackProp(_selector, _key);
        },

        /**
         * 更改月份之前的回调，月历面板显示后
        */
        beforeupdatemonth: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "beforeupdatemonth";

            return _p.callbackProp(_selector, _key);
        },

        /**
         * 更改月份后的回调
        */
        updatemonth: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "updatemonth";

            return _p.callbackProp(_selector, _key);
        },

        /**
         * 更改年份之前的回调，年份面板显示后
        */
        beforeupdateyear: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "beforeupdateyear";

            return _p.callbackProp(_selector, _key);
        },

        /**
         * 更改年份后的回调
        */
        updateyear: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "updateyear";

            return _p.callbackProp(_selector, _key);
        },

        /**
         * 点击下一月的回调
        */
        updatenextmonth: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "updatenextmonth";

            return _p.callbackProp(_selector, _key);
        },

        /**
         * 点击上一月的回调
        */
        updateprevmonth: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "updateprevmonth";

            return _p.callbackProp(_selector, _key);
        },

        /**
         * 点击下一年的回调
        */
        updatenextyear: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "updatenextyear";

            return _p.callbackProp(_selector, _key);
        },

        /**
         * 点击上一年的回调
        */
        updateprevyear: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "updateprevyear";

            return _p.callbackProp(_selector, _key);
        },

        /**
         * 点击下一页年份的回调
        */
        updatenextpageyear: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "updatenextpageyear";

            return _p.callbackProp(_selector, _key);
        },

        /**
         * 点击上一页年份的回调
        */
        updateprevpageyear: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "updateprevpageyear";

            return _p.callbackProp(_selector, _key);
        }
        
    });
 
    JC.f.extendObject(DCalendar.View.prototype, {
        init: function () {
            var _p = this;
        },

        update: function () {
            var _p = this;

            _p._model.position();

            _p._model.layout().data('CDCalendarIns', _p);

        },

        yearView: function (_srcSelector) {
            var _p = this,
                _el = $( _srcSelector ),
                _date = new Date(),
                _startYear = _date.getFullYear() - 14,
                _endYear = _date.getFullYear() + 13;

            _p._model.buildYearTpl(_date, _startYear, _endYear);

        },

        monthView: function (_srcSelector) {
            var _p = this,
                _el = $(_srcSelector),
                _date = JC.f.dateDetect(_el.data('date'));

            _p._model.buildMonthTpl(_date);

        },

        dateView: function (_srcSelector) {
            var _p = this,
                _el = $( _srcSelector ),
                _curDate = JC.f.dateDetect(_el.data('date'));

            _p._model.buildDateTpl(_curDate);
            
        },

        change: function  (_srcSelector) {
            var _p = this,
                _el = $(_srcSelector),
                _action = _el.data('action'),
                _type = _el.attr('data-type'),
                _curDate ,
                _nextMonthDate,
                _nextYear,
                _startYear,
                _endYear;

            switch ( _type ) {
                case 'year':
                    {   
                        _curDate = JC.f.dateDetect(_el.attr('data-date'));
                
                        if ( _action == 'prev' ) {
                            _endYear = _curDate.getFullYear();
                            _startYear = _endYear - 27;

                            _p.trigger(DCalendar.Model.UPDATEPREVPAGEYEAR);

                        } else {
                            _startYear = _curDate.getFullYear();
                            _endYear = _startYear + 27;

                            _p.trigger(DCalendar.Model.UPDATENEXTPAGEYEAR);

                        }

                        _p._model.buildYearTpl(new Date(), _startYear, _endYear);

                        break;
                    }

                case 'month': 
                    {   
                        _curDate = JC.f.dateDetect(_el.attr('data-date'));

                        if ( _action === 'prev' ) { 
                            _p.trigger(DCalendar.Model.UPDATEPREVYEAR);
                        } else {
                            _p.trigger(DCalendar.Model.UPDATENEXTYEAR);
                        }

                        _p._model.buildMonthTpl(_curDate);

                        break;
                    }

                case 'date':
                default:
                    if ( _action === 'prev' ) {
                        _nextMonthDate = JC.f.dateDetect(_el.attr('data-date'));
                        _curDate = new Date(_nextMonthDate.getFullYear(), _nextMonthDate.getMonth() - _p._model.monthNum() + 1, 1);
                       _p.trigger(DCalendar.Model.UPDATEPREVMONTH);

                    } else {
                        _curDate = JC.f.dateDetect(_el.attr('data-date'));
                        _p.trigger(DCalendar.Model.UPDATENEXTMONTH);
                        
                    }
                    _p._model.buildDateTpl(_curDate);
                    _p._model.position();

            }

        },

        show: function () {
            var _p = this;

            //var _s = new Date().getTime(),
            //    _e ;

            _p._model.buildDateTpl();
            //_e = new Date().getTime();
            //console.log( "_s", "_e", _e - _s );
            _p.update();
            _p._model.layout().show();

            _p._model.layout().data('CDCalendarShow', _p);
            
        },

        hide: function () {
            var _p = this;

            _p._model.layout().hide();

        }

    });

    var _doc = $(document)
        , _selector = 'input[datatype=ddate], button[datatype=ddate], input[datatype=drange]'
        ;

    _doc.delegate(_selector, 'focus', function (_evt) {

        $(this).addClass('cdc_ignore', true);
        JC.f.safeTimeout( function(){
            DCalendar.pickDate( _evt.target || _evt.srcElement);
        }, null, 'DCalendarClick', 50 );
  
    });

    _doc.delegate(_selector, 'click', function (_evt) {

        $(this).addClass('cdc_ignore', true);
        JC.f.safeTimeout( function(){
            DCalendar.pickDate(_evt.target || _evt.srcElement);
        }, null, 'DCalendarClick', 50 );

    });

    _doc.on('click', function (_evt) {
        
        var _ins = DCalendar.getInstance(DCalendar.lastSrc),
            _srcSelector = _evt.target || _evt.srcElement;

        if ( _ins &&  _ins._model.isDCalendar(_srcSelector) ) return;

        _ins && _ins.trigger(DCalendar.Model.HIDDEN);

    });

    _doc.delegate('#CompDCalendar .CDC_close_btn', 'click', function (_evt) {
        
        var _ins = DCalendar.getInstance(DCalendar.lastSrc);
        _ins && _ins.trigger(DCalendar.Model.HIDDEN);

    });

    _doc.delegate('#CompDCalendar .CDC_next_btn, #CompDCalendar .CDC_prev_btn', 'click', function (_evt) {
       
        var _ins = DCalendar.getInstance(DCalendar.lastSrc);
        _ins && _ins.trigger(DCalendar.Model.CHANGE, [$(this)]);
       
    });

    _doc.delegate('#CompDCalendar .CDC_Month', 'click', function (_evt) {

        var _ins = DCalendar.getInstance(DCalendar.lastSrc);
        _ins && _ins.trigger(DCalendar.Model.MONTHVIEW, [$(this)]);
       
    });

    _doc.delegate('#CompDCalendar .CDC_Year', 'click', function (_evt) {
      
        var _ins = DCalendar.getInstance(DCalendar.lastSrc);
        _ins && _ins.trigger(DCalendar.Model.YEARVIEW, [$(this)]);
       
    });

    _doc.delegate('#CompDCalendar .CDC_Date', 'click', function (_evt) {

        var _ins = DCalendar.getInstance(DCalendar.lastSrc);
        _ins && _ins.trigger(DCalendar.Model.DATEVIEW, [$(this)]);

    });

    _doc.delegate('#CompDCalendar', 'click', function (_evt) {
        _evt.stopPropagation();
    });

    _doc.delegate('#CompDCalendar .CDC_date_body>tbody>tr>td>a:not(".disabled")', 'click', function (_evt) {
        
        var _ins = DCalendar.getInstance(DCalendar.lastSrc);
        _ins && _ins.trigger(DCalendar.Model.SETDATE, [$(this)]);
        _ins && _ins.trigger(DCalendar.Model.HIDDEN );

    });

    _doc.delegate('#CompDCalendar .CDC_month_body>tbody>tr>td>a:not(".disabled")', 'click', function (_evt) {
        
        var _ins = DCalendar.getInstance(DCalendar.lastSrc);
        _ins && _ins.trigger(DCalendar.Model.DATEVIEW, [$(this)]);
        
    } );

    _doc.delegate('#CompDCalendar .CDC_year_body>tbody>tr>td>a:not(".disabled")', 'click', function (_evt) {
      
        var _ins = DCalendar.getInstance(DCalendar.lastSrc);
        _ins && _ins.trigger(DCalendar.Model.MONTHVIEW, [$(this)]);
        
    });

    _doc.delegate('#CompDCalendar .CDC_clear', 'click', function (_evt) {
       
        var _ins = DCalendar.getInstance(DCalendar.lastSrc);
        _ins && _ins.trigger(DCalendar.Model.CLEAR, [$(this)]);

    });

    $(window).on('resize scroll', function () {

        JC.f.safeTimeout( function(){
           DCalendar.update(); 
        }, null, 'DCalendarResize', 20 );

    });

    _doc.ready(function () {
        DCalendar.init(true);
    });    
    
    return JC.DCalendar;

});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
