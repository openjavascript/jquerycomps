;
(function(define, _win) {
    'use strict';
    define(['JC.BaseMVC', 'JC.Calendar'], function() {
        window.Bizs.DMultiDate = DMultiDate;

        function DMultiDate(_selector) {
            var type;

            if (DMultiDate.getInstance(_selector)) return DMultiDate.getInstance(_selector);

            DMultiDate.getInstance(_selector, this);
            type = DMultiDate.getType(_selector);

            switch (type) {
                case 'custom':
                    this._model = new DMultiDate.CustomModel(_selector);
                    this._view = new DMultiDate.CustomView(this._model);
                    break;
                case 'double':
                    this._model = new DMultiDate.DoubleModel(_selector);
                    this._view = new DMultiDate.DoubleView(this._model);
                    break;
                case 'single':
                default:
                    this._model = new DMultiDate.Model(_selector);
                    this._view = new DMultiDate.View(this._model);
            }

            this._init();
        }

        DMultiDate.prototype = {
            _beforeInit: function() {

            },

            _initHanlderEvent: function() {
                var _p = this;

                _p._model.updateEventProp();
                !_p._model.mdIgnoreUrlFill() && _p._model.initDefaultData();

                _p._model.calendarTypeEl().on('change', function () {
                    var _sp = $(this),
                        _type = _sp.val();

                    //crm中小用了day，转换一下
                    (_type === 'day') && (_type = 'date');
                    _p._model.mddateEl().attr('multidate', _type);
                    _p._model.updateProp();

                    setTimeout(function () {
                        Calendar.pickDate(_p._model.mddateEl()[0]);
                        _p._model.setHideStartEl('');
                        _p._model.setHideEndEl('');
                        _p._model.setmddate('');
                    }, 20);
                });
            },

           
            _inited: function() {
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
        DMultiDate.getInstance = function(_selector, _setter) {
            if (typeof _selector == 'string' && !/</.test(_selector))
                _selector = $(_selector);
            if (!(_selector && _selector.length) || (typeof _selector == 'string')) return;
            typeof _setter != 'undefined' && _selector.data(DMultiDate.Model._instanceName, _setter);

            return _selector.data(DMultiDate.Model._instanceName);
        };

        /**
         * 判断 selector 是否可以初始化 DMultiDate
         * @method  isDMultiDate
         * @param   {selector}      _selector
         * @static
         * @return  bool
         */
        DMultiDate.isDMultiDate = function(_selector) {
            var _r;
            _selector && (_selector = $(_selector)).length && (_r = _selector.is('[DMultiDatelayout]'));
            return _r;
        };


        DMultiDate.getType = function(_selector) {

            var r = 'default',
                type,
                $selector = $(_selector);;

            $selector.length && (type = $selector.find('>select').val());
            if (/(custom|customized)/i.test(type.toLowerCase())) {
                r = 'custom';
            } else {
                if ($selector.find('input[multidate]').length === 1) {
                    r = 'default';
                } else {
                    r = 'double';
                }
            }

            return r;

        };

        BaseMVC.buildModel(DMultiDate);
        DMultiDate.Model._instanceName = 'DMultiDate';
        DMultiDate.Model.COUNT = 1;
        DMultiDate.Model.UPDATESTART = 'Bizs.DMultiDate_update_start';
        DMultiDate.Model.UPDATEEND = 'Bizs.DMultiDate_update_end';
        DMultiDate.Model.SHOWSTART = 'Bizs.DMultiDate_show_star';
        DMultiDate.Model.SHOWEND = 'Bizs.DMultiDate_show_end';
        DMultiDate.Model.HIDESTART = 'Bizs.DMultiDate_hide_start';
        DMultiDate.Model.HIDEEND = 'Bizs.DMultiDate_hide_end';
        DMultiDate.Model.LAYOUTCHANGESTART= 'Bizs.DMultiDate_layoutchange_start';
        DMultiDate.Model.LAYOUTCHANGEEND = 'Bizs.DMultiDate_layoutchange_end';
        DMultiDate.Model.CLEARSTART = 'Bizs.DMultiDate_clear_start';
        DMultiDate.Model.CLEAREND = 'Bizs.DMultiDate_clear_end';

        DMultiDate.Model.prototype = {
            init: function() {},

            initDefaultData: function () {
                //select的值
                //input的值
                var _p = this,
                    _startdate = _p.urlStartdate(),
                    _enddate = _p.urlEnddate();

                _p.updateProp();
                _p.calendarTypeEl().val(_p.urlCalendarType() || '');
                _p.setHideStartEl(_startdate);
                _p.setHideEndEl(_enddate);

            },

            type: function () {
                return this.urlCalendarType() || this.calendarTypeEl().val();
            },

            mdIgnoreUrlFill: function() {
                return this.boolProp( 'mdIgnoreUrlFill' );
            },

            calendarTypeEl: function () {DMultiDate.Model.COUNT
                return this.selector().find('>select');
            }, 

            mddateEl: function () {
                var _p = this,
                    _el = _p.attrProp('mddateEl') || '.js_multidate';
 
                return _p.selector().find(_el);
            },

            setmddate: function (_d) {
                this.mddateEl().val(_d);
            },

            hiddenStartdateEl: function() {
                var _p = this,
                    _el = _p.attrProp('mdstartdate') || '.js_startdate';

                return _p.selector().find(_el);
            },

            hiddenEnddateEl: function() {
                var _p = this,
                    _el = _p.attrProp('mdenddate') || '.js_enddate';

                return _p.selector().find(_el);
            },

            setHideStartEl: function (_d) {
               
                this.hiddenStartdateEl().val(_d);
            },

            setHideEndEl: function (_d) {
               
                this.hiddenEnddateEl().val(_d);
            },

            urlCalendarType: function () {
                var _p = this;
 
                //需要转为小写
 
                return _p.decodedata( JC.f.getUrlParam(_p.calendarTypeEl().attr('name') || '') || '' ).toLowerCase();
            },
 

            urlStartdate: function() {
                var _p = this;

                //不能转为小写

                return _p.decodedata(JC.f.getUrlParam(_p.hiddenStartdateEl().attr('name') || '') || '');
            },

            urlEnddate: function() {
                var _p = this;

                //不能转为小写

                return _p.decodedata(JC.f.getUrlParam(_p.hiddenEnddateEl().attr('name') || '') || '');
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
            },

            hiddendateiso: function () {
                return this.boolProp('hiddendateiso');
            },

            decodedata: function(_d) {
                _d = _d.replace(/[\+]/g, ' ');

                //这里取url参数需要转码
                try {
                    _d = decodeURIComponent(_d);
                } catch (ex) {

                }

                return _d;
            },

            updateProp: function () {
                var _p = this, 
                    _type = _p.type();

                _p.mddateEl().attr('fulldateformat', '{0}');

                switch (_type) {
                    case 'week':
                        _p.mddateEl().attr('dateformat', 'YYWWK')
                            .attr('dateparse', 'parseWeekDateSpecial');
                        break;
                    case 'month':
                        _p.mddateEl().attr('dateformat', 'YY-MM')
                            .attr('dateparse', 'parseMonthDateSpecial');
                        break;
                    case 'season':
                        _p.mddateEl().attr('dateformat', 'YYQYQ')
                            .attr('dateparse', 'parseSeasonDateSpecial');
                        break;
                    case 'date':
                    default:
                        _p.mddateEl().removeAttr('dateformat').removeAttr('fulldateformat');
                };

            },

            updateEventProp: function () {
                var _p = this,
                    _count = DMultiDate.Model.COUNT++,
                    calendarupdate = DMultiDate.Model.UPDATESTART + _count;
                
                _p.mddateEl().attr('calendarupdate', calendarupdate);

                window[calendarupdate] = function (_dstart, _dend) {
                    _p.calendarupdate(JC.f.formatISODate(_dstart), JC.f.formatISODate(_dend));
                };
             
            },

            calendarupdate: function (_dstart, _dend) {
                var _p = this;

                if (!_p.hiddendateiso()) {
                   _dend = _dstart = _p.mddateEl().val();
                }

                _p.setHideStartEl(_dstart);
                _p.setHideEndEl(_dend);
                
            }

        };

        BaseMVC.buildView(DMultiDate);
        DMultiDate.View.prototype = {
            init: function() {
                return this;
            }
        };


        DMultiDate.clone = function(_model, _view) {
            var _k;
            if (_model)
                for (_k in DMultiDate.Model.prototype) _model.prototype[_k] = DMultiDate.Model.prototype[_k];
            if (_view)
                for (_k in DMultiDate.View.prototype) _view.prototype[_k] = DMultiDate.View.prototype[_k];

        };

        BaseMVC.build(DMultiDate, 'Bizs');

        $(document).ready(function() {

            JC.f.safeTimeout(function() {
                $('.js_autoDMultiDate').each(function() {
                    new DMultiDate($(this));
                });
            }, null, 'DMultiDatesdfasd', 50);

        });

    
    //
    /// 针对周的日期格式化
    //
    window.parseWeekDateSpecial = function ( _dateStr ){
        _dateStr = $.trim( _dateStr || '' );
        var _r = { start: null, end: null }, _normalDate;

        if( _dateStr ){
            _normalDate = _dateStr.replace( /[^\d]+/g, '' );
            _dateStr = _dateStr.split( 'W' );

            if( _normalDate.length === 8 ){
                _r.start = JC.f.parseISODate( _normalDate );
                _r.end = _r.start;
                return _r;
            }else if( _normalDate.length === 16 ){
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
    }
    //
    /// 针对月份日期格式化 YY-MM
    //
    window.parseMonthDateSpecial = function ( _dateStr ){
        _dateStr = $.trim( _dateStr || '' );
        var _r = { start: null, end: null }, _normalDate;

        if( _dateStr ){
            _normalDate = _dateStr.replace( /[^\d]+/g, '' );
            _dateStr = _dateStr.replace( /[^\d]+/g, '' );

            if( _normalDate.length === 8 ){
                _r.start = JC.f.parseISODate( _normalDate );
                _r.end = JC.f.cloneDate(_r.start);
                _r.end.setDate(JC.f.maxDayOfMonth(_r.start));
                return _r;
            }else if( _normalDate.length === 16 ){
                _r.start = JC.f.parseISODate( _normalDate.slice( 0, 8 ) );
                _r.end = JC.f.parseISODate( _normalDate.slice( 8, 16 ) );
                return _r;
            }

            var _year = _dateStr.slice( 0, 4 ), _month = parseInt( _dateStr.slice( 4, 6 ), 10 ) - 1;

            _r.start = new Date( _year, _month, 1 );
            _r.end = JC.f.cloneDate(_r.start);
            _r.end.setDate(JC.f.maxDayOfMonth(_r.start));
        }

         return _r;
    }
    //
    /// 针对季度日期格式化 YY-MM ~ YY-MM
    //
    window.parseSeasonDateSpecial = function ( _dateStr ){
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
    }
    //
    /// 针对月份日期格式化 YY-MM
    //
    window.parseYearDateSpecial = function ( _dateStr ){
        _dateStr = $.trim( _dateStr || '' );
        var _r = { start: null, end: null }, _year;

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

            _year = _dateStr.slice( 0, 4 );
            _r.start = new Date( _year, 0, 1 );
        }

        return _r;
    }



        return Bizs.DMultiDate;
    });
}(typeof define === 'function' && define.amd ? define :
    function(_name, _require, _cb) {
        typeof _name == 'function' && (_cb = _name);
        typeof _require == 'function' && (_cb = _require);
        _cb && _cb();
    }, window
));
