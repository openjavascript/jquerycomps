;(function(define, _win) { 'use strict'; define( [ 'JC.SelectorMVC', 'JC.Calendar' ], function(){
    window.Bizs.DMultiDate = DMultiDate;
    /**
     * DMultiDate 复合日历业务逻辑
     * <br/> Dom 加载后会自动加载页面上所有.js_autoDMultiDate的标签
     * <p><b>require</b>: 
     *      <a href='window.jQuery.html'>jQuery</a>
     *      , <a href='JC.SelectorMVC.html'>JC.SelectorMVC</a>
     *      , <a href='JC.Calendar.html'>JC.Calendar</a>
     * </p>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc2.openjavascript.org/docs_api/classes/window.Bizs.DMultiDate.html' target='_blank'>API docs</a>
     * | <a href='../../modules/Bizs.DMultiDate/0.1/_demo' target='_blank'>demo link</a></p>
     *
     * <h2>可用的html属性</h2>
     * <dl>
     *    <dt>mddate = css selector</dt>
     *    <dd>声明日期input[type=text][datatype=daterange]的标签<br/>
     *        如果缺省则自动查找子元素.js_multidate</dd>
     *
     *    <dt>mdstartdate = css selector</dt>
     *    <dd>声明开始日期的隐藏域标签, 默认查找子元素.js_startdate</dd>
     *
     *    <dt>mdenddate = css selector</dt>
     *    <dd>声明结束日期的隐藏域标签, 默认查找子元素.js_enddate</dd>
     *
     *    <dt>mddayrange = num</dt>
     *    <dd>声明时间粒度为日时，最长可选取多少天，如果不需要则不声明此属性</dd>
     *
     *    <dt>mdweekrange = num</dt>
     *    <dd>声明时间粒度为周时，最长可选取多少周，如果不需要则不声明此属性</dd>
     *
     *    <dt>mdmonthrange = num</dt>
     *    <dd>声明时间粒度为月时，最长可选取多少月，如果不需要则不声明此属性</dd>
     *
     *    <dt>mdseasonrange = num</dt>
     *    <dd>声明时间粒度为季时，最长可选取多少季，如果不需要则不声明此属性</dd>
     *
     *    <dt>mdyearrange = num</dt>
     *    <dd>声明时间粒度为年时，最长可选取多少年，如果不需要则不声明此属性</dd>
     *
     * </dl>
     *
     * @class   DMultiDate
     * @namespace   window.Bizs
     * @constructor
     * @private
     * @version dev 0.1 2014-03-03
     * @author  zuojing   <zuojing1013@gmail.com> | 75 Team
     */
    function DMultiDate( _selector ){
        if( DMultiDate.getInstance( _selector ) ) return DMultiDate.getInstance( _selector );
        DMultiDate.getInstance( _selector, this );

        this._model = new DMultiDate.Model( _selector );
        this._view = new DMultiDate.View( this._model );

        this._init();    
    }
    
    DMultiDate.prototype = {
        _beforeInit: function () {
            DMultiDate.Model._defaultMaxvalue = this._model.mddateEl().eq(0).attr('maxvalue') || '';
            DMultiDate.Model._defaultMinvalue = this._model.mddateEl().eq(1).attr('minvalue') || '';
        },

        _initHanlderEvent: function () {
            var _p = this,
                _count = DMultiDate.Model._inscount++,
                _updatestartcb = 'Bizs.DMultiDate_update_start' + _count,
                _updateendcb = 'Bizs.DMultiDate_update_end' + _count,
                _showstartcb = 'Bizs.DMultiDate_show_start' + _count,
                _showendcb = 'Bizs.DMultiDate_show_end' + _count,
                _hidestartcb = 'Bizs.DMultiDate_hide_start' + _count,
                _hideendcb = 'Bizs.DMultiDate_hide_end' + _count,
                _layoutchangestartcb = 'Bizs.DMultiDate_layoutchange_start' + _count,
                _layoutchangeendcb = 'Bizs.DMultiDate_layoutchange_end' + _count,
                _clearstartcb = 'Bizs.DMultiDate_clear_start' + _count,
                _clearendcb = 'Bizs.DMultiDate_clear_end' + _count,
                _parseweekdate = 'parsedateweek',
                _parsemonthdate = 'parsedatemonth',
                _parseseasondate = 'parsedateseason',
                _parseyeardate = 'parsedateyear';

            //如果url上有参数则回填到html tag的value;
            _p._initDefaultData();

            _p._model.calendarTypeEl().on('change', function (_evt, _flag) {

                var _sp = $(this),
                    _type = _sp.val();

                //日期日历类型crm后端用的是day类型，这里作一下转换
                if (_type === 'day') _type = 'date';

                _p._model.updatemddateElProp(_type);

                /**
                 *更新日历的类型day/week/season/year
                 *日历输入框，及隐藏域的值清空
                 *打开第一个日历输入框的日历面板
                 */

                if (_flag) return; 

                setTimeout( function () {
                    _p._model.setmddate('');
                    _p._model.setHiddenStartdate('');
                    _p._model.setHiddenEnddate('');
                    Calendar.pickDate(_p._model.mddateEl().eq(0)[0]);
                }, 10);

            });

            _p._model.mddateEl().eq(0)
                .attr('calendarupdate', _updatestartcb)
                .attr('calendarshow', _showstartcb)
                .attr('calendarhide', _hidestartcb)
                .attr('calendarlayoutchange', _layoutchangestartcb)
                .attr('calendarclear', _clearstartcb);

            _p._model.mddateEl().eq(1)
                .attr('calendarupdate', _updateendcb)
                .attr('calendarshow', _showendcb)
                .attr('calendarhide', _hideendcb)
                .attr('calendarlayoutchange', _layoutchangeendcb)
                .attr('calendarclear', _clearendcb);

            window[_updatestartcb] = function (_d, _ins) {
                var _mddateEl = _p._model.mddateEl(),
                    _type = _p._model.calendarType(),
                    _newmaxdate = new Date(_d.getFullYear(), _d.getMonth(), _d.getDate()),
                    _curmaxdate = DMultiDate.Model._defaultMaxvalue,
                    _range;

                _d = JC.f.formatISODate(_d);
                _curmaxdate && (_curmaxdate = JC.f.dateDetect(_curmaxdate));

                switch ( _type ) {
                    case 'week':
                        _range = _p._model.weekrange();
                        _range && _newmaxdate.setDate( _newmaxdate.getDate() + (_range - 1) * 7 + 6);
                        break;

                    case 'month':
                        _range = _p._model.monthrange();
                        
                        if (_range) {
                            _newmaxdate.setMonth( _newmaxdate.getMonth() + (_range - 1) );
                            _newmaxdate.setDate(JC.f.maxDayOfMonth(_newmaxdate));
                        }
                       
                        break;

                    case 'season':
                        _range = _p._model.seasonrange();
                        
                        if (_range) {
                            _newmaxdate.setMonth( _newmaxdate.getMonth() + (_range - 1) * 3  + 2 );
                            _newmaxdate.setDate(JC.f.maxDayOfMonth(_newmaxdate));
                        }

                        break;

                    case 'year':
                        _range = _p._model.yearrange();
                        _range && _newmaxdate.setYear( _newmaxdate.getFullYear() + _range - 1 );
                        break;

                    case 'date':
                    default:
                        _range = _p._model.dayrange();
                        _range && _newmaxdate.setDate( _newmaxdate.getDate() + _range - 1 );
                }

                if ( _range ) {

                    if ( _curmaxdate && ( _curmaxdate.getTime() <= _newmaxdate.getTime() ) ) {
                        _newmaxdate = _curmaxdate;
                    }

                    _mddateEl.eq(1)
                        .attr('maxvalue', JC.f.formatISODate(_newmaxdate))
                        .attr('minvalue', _d)
                        .attr('defaultdate', _d);
                }
                _p._model.setHiddenStartdate(_d);
            };

            window[_updateendcb] = function (_d, _ins) {
                var _mddateEl = _p._model.mddateEl(),
                    _type = _p._model.calendarType(),
                    _mindate = new Date(_d.getFullYear(), _d.getMonth(), _d.getDate()),
                    _curmindate = DMultiDate.Model._defaultMinvalue,
                    _range,
                    _temp = new Date(_d.getFullYear(), _d.getMonth(), _d.getDate());

                _curmindate && (_curmindate = JC.f.dateDetect(_curmindate));
                //_d = JC.f.formatISODate(_d);

                switch (_type) {
                    case 'week':
                        _range = _p._model.weekrange();
                        _range && _mindate.setDate( _mindate.getDate() - (_range - 1) * 7 );
                        break;

                    case 'month':
                        _range = _p._model.monthrange();
                        _range && (_mindate.setMonth( _mindate.getMonth() - (_range - 1) ) && _temp.setDate(JC.f.maxDayOfMonth(_d)));
                        break;

                    case 'season':
                        _range = _p._model.seasonrange();
                        _range && (_mindate.setMonth( _mindate.getMonth() - (_range - 1) * 3 ));
                        break;

                    case 'year':
                        _range = _p._model.yearrange();
                        _range && (_mindate.setYear( _mindate.getFullYear() - _range + 1 ));
                        break;

                    case 'date':
                    default:
                        _range = _p._model.dayrange();
                        _range && _mindate.setDate(_mindate.getDate() - _range + 1  );    
                }

                if (_range) {

                    if ( _curmindate && _curmindate.getTime() > _mindate.getTime() ) {
                        _mindate = _curmindate;
                    }

                    _mindate = JC.f.formatISODate(_mindate);
                    _mddateEl.eq(0)
                        .attr('maxvalue', JC.f.formatISODate(_temp))
                        .attr('minvalue', _mindate)
                        .attr('defaultdate', _mindate);
                }

                _p._model.setHiddenEnddate(JC.f.formatISODate(_d));
            };

            window[_showstartcb] = function () {
        
                var _layout = $('body > div.UXCCalendar:visible');
                
                _layout.length && JC.Tips && JC.Tips.init( _layout.find('[title]') );
            };

            window[_showendcb] = function () {
                var _layout = $('body > div.UXCCalendar:visible');
            
                _layout.length && JC.Tips && JC.Tips.init( _layout.find('[title]') );
            };
            
            window[_hidestartcb] = function () {
                JC.Tips && JC.Tips.hide();
                _p._model.updateHiddenStartdate();
            };

            window[_hideendcb] = function () {
                JC.Tips && JC.Tips.hide();
                _p._model.updateHiddenEnddate();
            };

            window[_layoutchangestartcb] = function () {
                JC.Tips && JC.Tips.hide();
                var _layout = $('body > div.UXCCalendar:visible');
                _layout.length && JC.Tips && JC.Tips.init( _layout.find('[title]') );
            };

            window[_layoutchangeendcb] = function () {
                JC.Tips && JC.Tips.hide();
                var _layout = $('body > div.UXCCalendar:visible');
                _layout.length && JC.Tips && JC.Tips.init( _layout.find('[title]') );
            };

            window[_clearstartcb] = function ( _selector, _ins ) {
                var _enddateEl = _p._model.mddateEl().eq(1),
                    _maxdate = DMultiDate.Model._defaultMaxvalue,
                    _mindate = DMultiDate.Model._defaultMinvalue;

                if ( _maxdate ) {
                    _enddateEl.attr('maxvalue', _maxdate)
                        .attr('defaultdate', _maxdate );
                } else {
                    _enddateEl.removeAttr('maxvalue')
                        .removeAttr('defaultdate');
                }

                if ( _mindate ) {
                    _enddateEl.attr('minvalue', _mindate);
                } else {
                    _enddateEl.removeAttr('minvalue');
                }
                    
            };

            window[_clearendcb] = function () {
                var _enddateEl = _p._model.mddateEl().eq(0),
                    _maxdate = DMultiDate.Model._defaultMaxvalue,
                    _mindate = DMultiDate.Model._defaultMinvalue;

                if ( _maxdate ) {
                    _enddateEl.attr('maxvalue', _maxdate);
                } else {
                    _enddateEl.removeAttr('maxvalue');
                }

                if ( _mindate ) {
                    _enddateEl.attr('minvalue', _mindate)
                        .attr('defaultdate', _mindate);
                } else {
                    _enddateEl.removeAttr('minvalue')
                        .removeAttr('defaultdate');
                } 

            };

            window[_parseweekdate] = function (_dateStr) {
                _dateStr = $.trim( _dateStr || '' );
                var _r = { start: null, end: null }, _normalDate;

                if( _dateStr ){
                    _normalDate = _dateStr.replace( /[^\d]+/g, '' );
                    _dateStr = _dateStr.split( 'W' );

                    if ( _normalDate.length === 8 ) {
                        _r.start = JC.f.parseISODate( _normalDate );
                        _r.end = _r.start;
                        return _r;
                    } else if( _normalDate.length === 16 ) {
                        _r.start = JC.f.parseISODate( _normalDate.slice( 0, 8 ) );
                        _r.end = JC.f.parseISODate( _normalDate.slice( 8, 16 ) );
                        return _r;
                    }

                    var _year, _week, _sdate, _edate, _weeks, _date

                    _year = parseInt( _dateStr[0], 10 );
                    _week = parseInt( _dateStr[1], 10 );
                    _sdate = JC.f.pureDate( new Date( _dateStr[0] ), 0, 1 );
                    _edate = JC.f.pureDate( new Date( _dateStr[1] ), 0, 1 );
                    _weeks = _weeks || JC.f.weekOfYear( _dateStr[0], JC.Calendar.weekDayOffset );

                    $( _weeks ).each( function( _ix, _item ){
                        if( _item.week === _week ){
                            _r.start = new Date();
                            _r.end = new Date();

                            _r.start.setTime( _item.start );
                            _r.end.setTime( _item.end );
                            return false;
                        }
                    });
                }
                
                return _r;
            };

            window[_parsemonthdate] = function (_dateStr) {
                
                _dateStr = $.trim( _dateStr || '' );
                
                var _r = { start: null, end: null }, 
                    _normalDate;

                if( _dateStr ){
                    _normalDate = _dateStr.replace( /[^\d]+/g, '' );
                    _dateStr = _dateStr.replace( /[^\d]+/g, '' );

                    if( _normalDate.length === 8 ){
                        _r.start = JC.f.parseISODate( _normalDate );
                        _r.end = _r.start;
                        return _r;
                    }else if( _normalDate.length === 16 ){
                        _r.start = JC.f.parseISODate( _normalDate.slice( 0, 8 ) );
                        _r.end = JC.f.parseISODate( _normalDate.slice( 8, 16 ) );
                        return _r;
                    }

                    var _year = _dateStr.slice( 0, 4 ), _month = parseInt( _dateStr.slice( 4, 6 ), 10 ) - 1;

                    _r.start = new Date( _year, _month, 1 );
                }

                return _r;
            };

            window[_parseseasondate] = function (_dateStr) {
                _dateStr = $.trim( _dateStr || '' );
                var _r = { start: null, end: null }, _normalDate;

                if( _dateStr ){
                    _normalDate = _dateStr.replace( /[^\d]+/g, '' );
                    _dateStr = _dateStr.split( 'Q' );

                    if( _normalDate.length === 8 ){
                        _r.start = JC.f.parseISODate( _normalDate );
                        _r.end = _r.start;
                        return _r;
                    }else if( _normalDate.length === 16 ){
                        _r.start = JC.f.parseISODate( _normalDate.slice( 0, 8 ) );
                        _r.end = JC.f.parseISODate( _normalDate.slice( 8, 16 ) );
                        return _r;
                    }

                    var _year = parseInt( _dateStr[0], 10 ), _season = parseInt( _dateStr[1], 10 )
                        , _sdate = JC.f.pureDate( new Date( _dateStr[0] ), 0, 1 )
                        , _edate = JC.f.pureDate( new Date( _dateStr[1] ), 0, 1 )
                        , _seasons = JC.f.seasonOfYear( _dateStr[0] )
                        ;

                    $( _seasons ).each( function( _ix, _item ){
                        if( _item.season === _season ){
                            _r.start = new Date();
                            _r.end = new Date();

                            _r.start.setTime( _item.start );
                            _r.end.setTime( _item.end );
                            return false;
                        }
                    });
                }

                return _r;
            };

            window[_parseyeardate] = function (_dateStr) {
                _dateStr = $.trim( _dateStr || '' );
                var _r = { start: null, end: null }, _year;

                if( _dateStr ){
                    _dateStr = _dateStr.replace( /[^\d]+/g, '' );
                    _year = _dateStr.slice( 0, 4 );
                    _r.start = new Date( _year, 0, 1 );
                }

                if( !_r.start ){
                    _r.start = new Date();
                    _r.end = new Date();
                }
                return _r;
            };

            _p._model.calendarTypeEl().trigger( 'change', [ true ] );

        },

        _initDefaultData: function () {
            var _p = this,
                _startdate = _p._model.urlStartdate() || _p._model.mddateEl().eq(0).val(),
                _enddate = _p._model.urlEnddate() || _p._model.mddateEl().eq(1).val(),
                _type = _p._model.urlCalendarType() || _p._model.calendarType();

            _p._model.updatemddateElProp(_type);
            _p._model.calendarTypeEl().val(_type);
            
            setTimeout(function () {
                _p._model.setmddate(_startdate, _enddate);
                _p._model.setHiddenStartdate(_startdate);
                _p._model.setHiddenEnddate(_enddate);
            }, 200);
            
        }, 

        _inited:function () {
            //JC.log( 'DMultiDate _inited', new Date().getTime() );
        }
    }

    /**
     * 获取或设置 DMultiDate 的实例
     * @method  getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {DMultiDateInstance}
     */
    DMultiDate.getInstance = function ( _selector, _setter ) {
        if( typeof _selector == 'string' && !/</.test( _selector ) ) 
                _selector = $(_selector);
        if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
        typeof _setter != 'undefined' && _selector.data( DMultiDate.Model._instanceName, _setter );

        return _selector.data( DMultiDate.Model._instanceName );
    };

    /**
     * 判断 selector 是否可以初始化 DMultiDate
     * @method  isDMultiDate
     * @param   {selector}      _selector
     * @static
     * @return  bool
     */
    DMultiDate.isDMultiDate = function( _selector ){
        var _r;
        _selector 
            && ( _selector = $(_selector) ).length 
            && ( _r = _selector.is( '[DMultiDatelayout]' ) );
        return _r;
    };

    SelectorMVC.buildModel( DMultiDate );
    DMultiDate.Model._instanceName = 'DMultiDate';
    DMultiDate.Model._inscount = 1;
    DMultiDate.Model._defaultMaxvalue = '';
    DMultiDate.Model._defaultMinvalue = '';
    
    DMultiDate.Model.prototype = {
        init: function () {
        },

        calendarTypeEl: function () {
            return this.selector().find('>select');
        },

        calendarType: function () {
            return this.calendarTypeEl().val();
        },

        mddateEl: function () {
            var _p = this,
                _el = _p.attrProp('mddateEl') || '.js_multidate';

            return _p.selector().find(_el);
        },

        setmddate: function (_starttime, _endtime) {
            var _el = this.mddateEl();

            _el.eq(0).val(_starttime);
            _el.eq(1).val(_endtime);
        },

        updatemddateElProp: function (_setter) {
            var _p = this,
                _el = _p.mddateEl();

            _el.attr('multidate', _setter);

            if (_setter === 'date') {
                _el.removeAttr('dateparse')
                    .removeAttr('dateformat')
                    .removeAttr('fulldateformat');
            } else {
                _el.eq(0).attr('fulldateformat', '{0}');
                _el.eq(1).attr('fulldateformat', '{1}');

                _el.attr('dateformat', _p.dateformartType(_setter))
                   .attr('dateparse', 'parsedate' + _setter);   
            }

            if ( DMultiDate.Model._defaultMinvalue ) {
                _el.attr('minvalue', DMultiDate.Model._defaultMinvalue)
            } else {
                _el.removeAttr('minvalue');
            }

            if ( DMultiDate.Model._defaultMaxvalue ) {
                _el.attr('maxvalue', DMultiDate.Model._defaultMaxvalue)
                    .attr('defaultdate', DMultiDate.Model._defaultMaxvalue);
            } else {
                _el.removeAttr('maxvalue').removeAttr('defaultdate');
            }
            
        },

        dateformartType: function (_setter) {
            var _r;

            switch (_setter) {
                case 'week':
                    _r = 'YYWWK';
                    break;
                case 'month':
                    _r = 'YY-MM';
                    break;
                case 'season':
                    _r = 'YYQYQ';
                    break;
                case 'year':
                    _r = 'YY';
                    break;
                case 'date':
                default:
                    _r = ''; 
            }

            return _r;
        },

        hiddenStartdateEl: function () {
            var _p = this,
                _el = _p.attrProp('mdstartdate') || '.js_startdate';

            return _p.selector().find(_el);
        },

        hiddenEnddateEl: function () {
            var _p = this,
                _el = _p.attrProp('mdenddate') || '.js_enddate';

            return _p.selector().find(_el);
        },

        setHiddenStartdate: function (_date) {
            this.hiddenStartdateEl().val(_date);
        },

        setHiddenEnddate: function (_date) {
            this.hiddenEnddateEl().val(_date);
        },

        updateHiddenStartdate: function () {
            var _p = this,
                _date = _p.mddateEl().eq(0).val();

            if ( !_date ) {
                _p.setHiddenStartdate('');
                return;
            }

            _p.setHiddenStartdate(_date);
        },

        updateHiddenEnddate: function () {
            var _p = this,
                _date = _p.mddateEl().eq(1).val();

            if ( !_date ) {
                _p.setHiddenEnddate('');
                return;
            }

            _p.setHiddenEnddate(_date);
        },

        urlCalendarType: function () {
            var _p = this;

            //需要转为小写

            return _p.decodedata( JC.f.getUrlParam(_p.calendarTypeEl().attr('name') || '') || '' ).toLowerCase();
        },

        urlStartdate: function () {
            var _p = this;

            //不能转为小写

            return _p.decodedata( JC.f.getUrlParam(_p.hiddenStartdateEl().attr('name') || '') || '');
        },

        urlEnddate: function () {
            var _p = this;

            //不能转为小写

            return _p.decodedata( JC.f.getUrlParam(_p.hiddenEnddateEl().attr('name') || '') || '' );
        },

        decodedata: function ( _d ) {
            _d = _d.replace( /[\+]/g, ' ' );
            
            //这里取url参数需要转码
            try { 
                _d = decodeURIComponent( _d ); 
            } catch (ex) {

            }

            return _d;
        },

        dayrange: function () {
            return this.intProp('mddayrange');
        },

        weekrange: function () {
            return this.intProp('mdweekrange');
        },　

        monthrange: function () {
            return this.intProp('mdmonthrange');
        },

        seasonrange: function () {
            return this.intProp('mdseasonrange');
        },

        yearrange: function () {
            return this.intProp('mdyearrange');
        }

    };

    SelectorMVC.buildView( DMultiDate );
    DMultiDate.View.prototype = {
        init: function () {
            return this;
        }
    };

    SelectorMVC.build( DMultiDate, 'Bizs' );

    $(document).ready( function(){
        $('.js_autoDMultiDate').each( function(){
            new DMultiDate( $(this) );
        });

    });

    return Bizs.DMultiDate;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
