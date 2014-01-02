 ;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
/**
 *
 *
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
 
    function DCalendar( _selector ){
        _selector && ( _selector = $( _selector ) );
        
        if( DCalendar.getInstance( _selector ) ) return DCalendar.getInstance( _selector );
        DCalendar.getInstance( _selector, this );
 
        this._model = new DCalendar.Model( _selector );
        this._view = new DCalendar.View( this._model );
        
        this._init();
    }
    /**
     * 获取或设置 DCalendar 的实例
     * @method  getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {DCalendarInstance}
     */
    DCalendar.getInstance = function ( _selector, _setter ) {
        if( typeof _selector == 'string' && !/</.test( _selector ) ) 
            _selector = $(_selector);
        if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
        typeof _setter != 'undefined' && _selector.data( DCalendar.Model._instanceName, _setter );

        return _selector.data( DCalendar.Model._instanceName );
    };
    /**
     * 初始化可识别的 DCalendar 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of DCalendarInstance}
     */
    DCalendar.init = function ( _selector ) {
        var _r = [] ;
        
        _selector = $( _selector || document );

        if ( _selector.length ) {

            if ( _selector.hasClass('js_compDCalendar') ) {
                !_selector.is('[' + DCalendar.Model.IGNORE + ']' ) && _r.push( new DCalendar(_selector) );
            } else {
                _selector.find('input[datatype=ddate], button[datatype=ddate]').each( function() {
                    !_selector.is('[' + DCalendar.Model.IGNORE + ']' ) && _r.push( new DCalendar( this ) );
                })
            }

        }

        return _r;
    };

    DCalendar.update = function () {
        var _items = $( JC.f.printf( '#{0}>div', DCalendar.Model._boxId ) );

        if( !_items.length ) return;

        _items.each( function(){
            var _p = $(this), 
                _ins = _p.data( 'CDCalendarIns' );

            if( !_ins ) return;

            if ( _ins._model.layout().is(':visible') ) {
                _ins.update();
            }

        });
    },

    BaseMVC.build( DCalendar );

    JC.f.extendObject( DCalendar.prototype, {
        _beforeInit: function () {
            //this.trigger( DCalendar.Model.CDC_INITED );
        },

        _initHanlderEvent: function () {
            var _p = this;

            _p.on( 'CDCalendarUpdate', function( _evt ){
                

            });

            _p.on( 'CDC_INITED', function () {
                _p._model.selector().addClass('CDCalendar_icon');
            } );
            
            _p._model.selector().on('focus', function ( _evt ) {
                
                if ( _p._model.boolProp( DCalendar.Model.IGNORE ) ) {
                    return;
                }

            });

            _p._model.selector().on('click', function ( _evt ) {
                //_evt.stopPropagation();
                
                //if( _p._model.layout().is(':visible') ) return;
                var _sp = $(this);

                JC.f.safeTimeout( function(){
                    _p.trigger( DCalendar.Model.SHOW );
                }, null, 'DCalendarClick', 120 );


            });

            _p._model.selector().on('keydown', function ( _evt ) {
                _evt.preventDefault();
            });

            _p.on(DCalendar.Model.SHOW, function () {
                _p._view.update();
                _p._model.calendarshow()
                    && _p._model.calendarshow().call( _p, _p.selector() );
            });

            _p.on(DCalendar.Model.HIDDEN, function () {
                _p._view.hide();
                _p._model.calendarhide()
                    && _p._model.calendarhide().call( _p, _p.selector() );
            });

            _p.on(DCalendar.Model.CHANGE, function ( _evt, _srcSelector ) {
                _p._view.change( _srcSelector );
            } );

            _p.on(DCalendar.Model.SETDATE, function ( _evt, _srcSelector ) {
                _p._model.setSelected( _srcSelector );

                _p._model.updatedate()
                    && _p._model.updatedate().call( _p, _p.selector() );

                //if ( _p._model.hideOnSelect() ) {
                //    _p.trigger( DCalendar.Model.HIDDEN );
               // }

            });

            _p.on(DCalendar.Model.CLEAR, function () {
                _p.trigger( DCalendar.Model.CLEAR );
                _p._model.calendarclear()
                    && _p._model.calendarclear().call( _p, _p.selector() );
            });

            _p.on(DCalendar.Model.DATEVIEW, function ( _evt, _srcSelector ) {
                _p._view.dateView( _srcSelector );
                _p._model.updatemonth()
                    && _p._model.updatemonth().call( _p, _p.selector() );
            });

            _p.on(DCalendar.Model.MONTHVIEW, function ( _evt, _srcSelector ) {
                _p._view.monthView( _srcSelector );

                if ( $(_srcSelector).attr('data-year') ) {
                    _p._model.updateyear()
                    && _p._model.updateyear().call( _p, _p.selector() );
                } else {
                    _p._model.beforeupdatemonth()
                        && _p._model.beforeupdatemonth().call( _p, _p.selector() );
                }
                
            });

            _p.on(DCalendar.Model.YEARVIEW, function ( _evt, _srcSelector ) {
                _p._view.yearView( _srcSelector );
                _p._model.beforeupdateyear()
                    && _p._model.beforeupdateyear().call( _p, _p.selector() );
            });

            _p.on( 'CDCCreateLayout', function( _evt, _layout ){
                _layout && DCalendar.getInstance( _layout, _p );
            });

        }, 

        _inited: function () {
            
        },

        /**
         * 更新 DCalendar 状态
         * @method update
         */
        update: function () {

            this._view.update();

            return this;
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
    DCalendar.Model.IGNORE = "CDC_IGNORE"

    JC.f.extendObject( DCalendar.Model.prototype, {
        init: function () {
            var _p = this;
        },

        curSelectedDate: function () {
            var _p = this,
                _r = _p.selector().val().trim();

            _r = ( JC.f.dateDetect( _r ) || new Date() );

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
            
            _r && ( _r = JC.f.dateDetect( _r ) );

            return _r;
        },

        maxValue: function () {
            var _r = this.attrProp('maxValue') || ''; 
            
            _r && ( _r = JC.f.dateDetect( _r ) );

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

        hideOnSelect: function () { //bug 串号
            var _r = this.boolProp('hideOnSelect');

            ( typeof _r === 'undefined' ) && ( _r = true );

            return _r;
        },

        allYearsTpl: function ( _startYear, _endYear ) {
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

        datesOfMonthTpl: function ( _date ) {
           
            var _p = this,
                _r = '<tr>',
                _t,
                _d,
                _today = new Date(),
                _formatDate,
                _day,
                _maxDayOfMonth = JC.f.maxDayOfMonth( _date ),
                _placeholder = '',
                i,
                j;

            for ( i = 1; i <= _maxDayOfMonth; i++ ) {
                _d = new Date( _date.getFullYear(), _date.getMonth(), i );
                _formatDate = JC.f.formatISODate(_d);
                _day = ( _d.getDay() + 6 ) % 7;

                if ( JC.f.isSameDay( _today, _d ) ) {
                    if ( _day === 5 || _day === 6 ) {
                        _t = '<td><a href="javascript:;" class="today weekend" title="' + _formatDate + '" data-date="' + _formatDate + '">' + i + '</a></td>'; 
                    } else {
                        _t = '<td><a href="javascript:;" class="today" title="' + _formatDate + '" data-date="' + _formatDate + '">' + i + '</a></td>'; 
                    }
                } else {
                    if ( _day === 5 || _day === 6 ) {
                        _t = '<td><a href="javascript:;" class="weekend" title="' + _formatDate + '"  data-date="' + _formatDate + '">' + i + '</a></td>'; 
                    } else {
                        _t = '<td><a href="javascript:;" title="' + _formatDate + '" data-date="' + _formatDate + '">' + i + '</a></td>'; 
                    }
                }
               
                if ( i === 1 && _day > 0) {
                  
                    for ( j = 0; j < _day; j++ ) {
                        _placeholder += '<td ><a href="javascript:;" class="disabled"></a></td>';
                    } 

                    _r = _r + _placeholder;
                    _placeholder = '';
                   
                }

                _r += _t;

                if ( i === _maxDayOfMonth && _day < 6) {

                    for ( j = 0; j < 6 - _day; j++ ) {
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
                        + '<h4><a href="javascript:;" data-date="{1}" class="CDC_Year">{0}</a></h4>'
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
                        + '<h4><a href="javascript:;" data-date="{0}" class="CDC_Date">{0}</a><span>{2}</span></h4>'
                    + '</div>'
                    + '<div class="CDC_body">'
                       + '<table class="CDC_year_body">'
                           + '<tbody>'
                           + '{1}'
                           + '</tbody>'
                        + '</table>'
                    + '</div>'
                    + '<div class="CDC_footer"></div>'
                + '</div>',

        dateTpl: '<div class="CDC_inner" style="width: 182px;" >'
                    + '<div class="CDC_header">'
                        + '<h4><a href="javascript:;" data-date="{4}" class="CDC_Month">{0}</a></h4>' 
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
                            +   '{1}'   
                            + '</tbody>'
                        + '</table>'
                    + '</div>'
                    + '<div class="CDC_footer"></div>'
                + '</div>'
                + '<div class="CDC_inner" style="width: 182px;" >'
                    + '<div class="CDC_header">'
                        + '<h4><a href="javascript:;" data-date="{5}" class="CDC_Month">{3}</a></h4>'
                    + '</div>'
                    + '<div class="CDC_body">'
                        + '<table class="CDC_date_body CDC_date_body_right">'
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
                            + '{2}'    
                            + '</tbody>'
                        + '</table>'
                    + '</div>'
                    + '<div class="CDC_footer"></div>'
                + '</div>',

        baseTpl: '<div class="CDCalendar_bounding_box" style="width:466px;position:absolute;display:none;" >'
                    + '<div class="CDC_container" >'
                        + '<div class="CDC_content_box" >'
                            + '<div class="CDC_arrow" >'
                                + '<span class="CDC_close_btn" title="关闭">close</span>'
                                + '<span class="CDC_prev_btn" data-action="prev">prev</span>'
                                + '<span class="CDC_next_btn" data-action="next">next</span>'
                            + '</div>'
                            + '<div class="CDC_date_box" >'
                               + '{0}'
                            + '</div>'
                        + '</div>'
                    + '</div>'
                + '</div>',

        buildYearTpl: function ( _date, _startYear, _endYear ) {
            var _p = this,
                _r = _p.yearTpl;

            _p.layoutBox().find('.CDC_date_box').html(
                JC.f.printf( 
                    _r, 
                    JC.f.formatISODate( _date ), 
                    _p.allYearsTpl( _startYear, _endYear ), 
                    _startYear + ' ~ ' + _endYear  
                )
            )
            .find('.CDC_year_body>tbody>tr>td>a').each( function () {
                var _sp = $(this),
                    _d = new Date( _sp.data('year'), 0, 1 );

                if ( _sp.data('year') === new Date().getFullYear() ){
                    _sp.addClass('today');
                }

                _sp.attr( 'data-date', JC.f.formatISODate( _d ) );

            } );
            _p.layoutBox()
            .find('.CDC_prev_btn')
                .attr('data-type', 'year')
                .attr('data-date', JC.f.formatISODate ( new Date(_startYear - 1, 0, 1) ) )
            .end()
            .find('.CDC_next_btn')
                .attr('data-type', 'year')
                .attr('data-date', JC.f.formatISODate ( new Date(_endYear + 1, 0, 1) ) );

            _p.position();
        },

        buildMonthTpl: function ( _date ) {
            var _p = this,
                _r = _p.monthTpl;

            _p.layoutBox().find('.CDC_date_box').html(
                JC.f.printf( _r, _date.getFullYear() + '年', JC.f.formatISODate( _date ) )
            )
            .find('.CDC_month_body>tbody>tr>td>a').each( function ( _ix ) {
                var _sp = $(this),
                    _d = new Date( _date.getFullYear(), _sp.data('month'), 1 );

                if ( JC.f.isSameMonth( _d, new Date() ) ){
                    _sp.addClass('today');
                }

                _sp.attr('data-date', JC.f.formatISODate( _d ) );

            } )
            .end()
            .end()
            .find('.CDC_prev_btn')
                .attr('data-date', JC.f.formatISODate( new Date(_date.getFullYear() - 1, 0, 1) ) )
                .attr('data-type', 'month')
                // .removeClass('CDC_prev_btn_disabled')
                // .prop('disabled', false)
            .end()
            .find('.CDC_next_btn')
                .attr('data-date', JC.f.formatISODate( new Date(_date.getFullYear() + 1, 0, 1) ))
                .attr('data-type', 'month')
                // .removeClass('CDC_next_btn_disabled')
                // .prop('disabled', false); 

            _p.position();
        },

        buildDateTpl: function ( _curDate, _nextMonthDate ) {
           
            var _p = this,
                _curDate = _curDate || _p.curSelectedDate(),
                _nextMonthDate = _nextMonthDate || new Date(_curDate.getFullYear(), _curDate.getMonth() + 1, 1),
                _prevDate = new Date( _curDate.getFullYear(), _curDate.getMonth(), 1),
                _nextDate = new Date( _nextMonthDate.getFullYear(), _nextMonthDate.getMonth(), JC.f.maxDayOfMonth( _nextMonthDate ) ),
                _prevIsDisable = false,
                _prevDisableClass = '',
                _nextIsDisable = false,
                _nextDisableClass = '';

            // if ( _prevDate.getTime() <= _p.minValue().getTime() ) {
            //     _prevIsDisable = true;
            //     _prevDisableClass = "CDC_prev_btn_disabled";
            // }

            // if ( _nextDate.getTime() >= _p.maxValue().getTime() ) {
            //     _nextIsDisable = true;
            //     _nextDisableClass = "CDC_next_btn_disabled";
            // }

            _p.layoutBox().find('.CDC_date_box').html( 
                JC.f.printf( 
                    _p.dateTpl, 
                    _curDate.getFullYear() + '年' + ( _curDate.getMonth() + 1 ) + '月',
                    _p.datesOfMonthTpl( _curDate ), 
                    _p.datesOfMonthTpl( _nextMonthDate ),
                    _nextMonthDate.getFullYear() + '年' + ( _nextMonthDate.getMonth() + 1 ) + '月',
                    JC.f.formatISODate( _curDate ),
                    JC.f.formatISODate( _nextMonthDate )
                ) 
            )
            .find('.CDC_date_body>tbody>tr>td>a[data-date]').each( function ( _ix ) {
                var _sp = $(this),
                    _d = JC.f.dateDetect( _sp.data('date') );

                if ( JC.f.isSameDay( _d, _p.curSelectedDate() ) ){
                    _sp.parent('td').addClass('selected_date');
                }

                if (_p.minValue() && _d.getTime() < _p.minValue().getTime() ) {
                    _sp.addClass('disabled');
                }

                if ( _p.maxValue() && _d.getTime() > _p.maxValue().getTime() ) {
                    _sp.addClass('disabled');
                }

                if ( !_p.currentCanSelect() && JC.f.isSameDay( _d, new Date() ) ) {
                    _sp.addClass('disabled');
                }

            } )
            .end()
            .end()
                .find('.CDC_next_btn')
                    .attr('data-date', JC.f.formatISODate(_nextDate) )
                    .attr('data-type', 'date')
                    .prop('disabled', _nextIsDisable)
                    .addClass(_nextDisableClass)
            .end()
                .find('.CDC_prev_btn')
                    .attr('data-date', JC.f.formatISODate(_prevDate) )
                    .attr('data-type', 'date')
                    .prop('disabled', _prevIsDisable)
                    .addClass(_prevDisableClass)
            .end();
            
            _p.fixTable();
            _p.position();
        },

        layout: function () {
            var _p = this;

            if ( !this._layout ) {

                //_p.layoutBox().html( _p.baseTpl );
                this._layout = _p.layoutBox().find('div.CDCalendar_bounding_box');

                $(this).trigger( 'TriggerEvent', [ 'CDCCreateLayout', this._layout ] );
               
            }
 
            return this._layout;
        },

        layoutBox: function () {
            var _p = this,
                _r = $('#' + DCalendar.Model._boxId );

            if ( !(_r && _r.length) ) {
                _r = $( JC.f.printf( '<div id="{0}">' + _p.baseTpl + '</div>', DCalendar.Model._boxId ) )
                    .appendTo( document.body );
            }

            return _r;
        },

        position: function () {
            var _p = this,
                _x = _p.selector().offset().left,
                _y = _p.selector().offset().top + _p.selector().prop('offsetHeight'),
                _win = $(window);

            if ( _win.outerHeight() < ( _y + _p.layout().height() ) ) {
                ( _p.selector().offset().top - _p.layout().height() > 0 ) 
                && ( _y = _p.selector().offset().top - _p.layout().height() ) ;
               
            } else {
                _y = _p.selector().offset().top + _p.selector().prop('offsetHeight');
            }

            _p.layout().css({
                left: _x,
                top: _y
            });

        },

        setSelected: function ( _srcSelector ) {
            var _p = this,
                _el = $( _srcSelector ),
                _td = JC.f.getJqParent(_el, 'td'),
                _d = _el.data('date');

            _p.layoutBox().find('.CDC_date_body>tbody>tr>td').removeClass('selected_date');

            _td.addClass('selected_date').data('date');

            //console.log("_selector", _p.selector() );

            _p.selector().val( _d );

        },

        clear: function () {
            var _p = this;

            _p.layoutBox().find('.CDC_date_body>tbody>tr>td').removeClass('selected_date');
            _p.selector().val('');
        },

        fixTable: function () {
            var _p = this,
                _leftTable = _p.layout().find('table.CDC_date_body_left'),
                _rightTable = _p.layout().find('table.CDC_date_body_right'),
                _t = '<tr>'
                        + '<td><a href="javascript:;" class="disabled"></a></td>'
                        + '<td><a href="javascript:;" class="disabled"></a></td>'
                        + '<td><a href="javascript:;" class="disabled"></a></td>'
                        + '<td><a href="javascript:;" class="disabled"></a></td>'
                        + '<td><a href="javascript:;" class="disabled"></a></td>'
                        + '<td><a href="javascript:;" class="disabled"></a></td>'
                        + '<td><a href="javascript:;" class="disabled"></a></td>'
                    + '</tr>';

            if ( _leftTable.find('tbody>tr').length < _rightTable.find('tbody>tr').length ) {
                _leftTable.find('tbody').append(_t);
                return;
            } 

            if ( _leftTable.find('tbody>tr').length > _rightTable.find('tbody>tr').length ) {
                _rightTable.find('tbody').append(_t);
                return;
            }

        },

        /**
         * DCalendar显示时的回调
        */
        calendarshow: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "calendarshow";

            return _p.callbackProp( _selector, _key );
        },

        /**
         * DCalendar隐藏时的回调
        */
        calendarhide: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "calendarhide";

            return _p.callbackProp( _selector, _key );
        },

        /**
         * 清除选中的日期后的回调
        */
        calendarclear: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "calendarclear";

            return _p.callbackProp( _selector, _key );
        },

        /**
         * 选择日期赋值后的回调
        */
        updatedate: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "updatedate";

            return _p.callbackProp( _selector, _key );
        },

        /**
         * 更改月份之前的回调，月历面板显示后
        */
        beforeupdatemonth: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "beforeupdatemonth";

            return _p.callbackProp( _selector, _key );
        },

        /**
         * 更改月份后的回调
        */
        updatemonth: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "updatemonth";

            return _p.callbackProp( _selector, _key );
        },

        /**
         * 更改年份之前的回调，年份面板显示后
        */
        beforeupdateyear: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "beforeupdateyear";

            return _p.callbackProp( _selector, _key );
        },

        /**
         * 更改年份后的回调
        */
        updateyear: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "updateyear";

            return _p.callbackProp( _selector, _key );
        },

        /**
         * 点击下一月的回调
        */
        updatenextmonth: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "updatenextmonth";

            return _p.callbackProp( _selector, _key );
        },

        /**
         * 点击上一月的回调
        */
        updateprevmonth: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "updateprevmonth";

            return _p.callbackProp( _selector, _key );
        },

        /**
         * 点击下一年的回调
        */
        updatenextyear: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "updatenextyear";

            return _p.callbackProp( _selector, _key );
        },

        /**
         * 点击上一年的回调
        */
        updateprevyear: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "updateprevyear";

            return _p.callbackProp( _selector, _key );
        },

        /**
         * 点击下一页年份的回调
        */
        updatenextpageyear: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "updatenextpageyear";

            return _p.callbackProp( _selector, _key );
        },

        /**
         * 点击上一页年份的回调
        */
        updateprevpageyear: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "updateprevpageyear";

            return _p.callbackProp( _selector, _key );
        }
        
    });
 
    JC.f.extendObject( DCalendar.View.prototype, {
        init: function () {
            var _p = this;
        },

        update: function ( _type, _date ) {
            var _p = this;

            var _s = new Date().getTime(),
                _el ;

            _p._model.buildDateTpl();

            _el = new Date().getTime();
            console.log( "_s", "_el", _el - _s );

            
            _p.show();

            _p._model.layout().data('CDCalendarIns', _p);

        },

        yearView: function ( _srcSelector ) {
            var _p = this,
                _el = $( _srcSelector ),
                _date = new Date(),
                _startYear = _date.getFullYear() - 14,
                _endYear = _date.getFullYear() + 13;

            _p._model.buildYearTpl( _date, _startYear, _endYear );

        },

        monthView: function ( _srcSelector ) {
            var _p = this,
                _el = $( _srcSelector ),
                _date = JC.f.dateDetect(  _el.data('date') );

            _p._model.buildMonthTpl( _date );

        },

        dateView: function ( _srcSelector ) {
            var _p = this,
                _el = $( _srcSelector ),
                _curDate = JC.f.dateDetect( _el.data('date') ),
                _nextMonthDate = new Date(_curDate.getFullYear(), _curDate.getMonth() + 1, 1),
                _r = _p._model.dateTpl;

            _p._model.buildDateTpl( _curDate, _nextMonthDate );
            
        },

        change: function  ( _srcSelector ) {
            var _p = this,
                _el = $( _srcSelector ),
                _action = _el.data('action'),
                _type = _el.attr('data-type'),
                _curDate ,
                _nextMonthDate,
                _nextYear,
                _startYear,
                _endYear;

            if ( _type === 'date' ) {
                
                if ( _action === 'prev' ) {
                    _nextMonthDate = JC.f.dateDetect( _el.attr('data-date') );
                    _curDate = new Date( _nextMonthDate.getFullYear(), _nextMonthDate.getMonth() - 1, 1);

                    _p._model.updateprevmonth()
                    && _p._model.updateprevmonth().call( _p, _p.selector() );

                } else {
                    _curDate = JC.f.dateDetect( _el.attr('data-date') );
                    _nextMonthDate = new Date(_curDate.getFullYear(), _curDate.getMonth() + 1, 1);

                    _p._model.updatenextmonth()
                    && _p._model.updatenextmonth().call( _p, _p.selector() );
                }

                _p._model.buildDateTpl( _curDate, _nextMonthDate );

            } else if ( _type === 'month') {
                
                _curDate = JC.f.dateDetect( _el.attr('data-date') );

                if ( _action === 'prev' ) {
                    _p._model.updateprevyear()
                    && _p._model.updateprevyear().call( _p, _p.selector() );
                } else {
                    _p._model.updatenextyear()
                    && _p._model.updatenextyear().call( _p, _p.selector() );
                }

                _p._model.buildMonthTpl( _curDate );

            } else {

                _curDate = JC.f.dateDetect( _el.attr('data-date') );
                
                if ( _action == 'prev' ) {
                    _endYear = _curDate.getFullYear();
                    _startYear = _endYear - 27;

                    _p._model.updateprevpageyear()
                    && _p._model.updateprevpageyear().call( _p, _p.selector() );

                } else {
                    _startYear = _curDate.getFullYear();
                    _endYear = _startYear + 27;

                    _p._model.updatenextpageyear()
                    && _p._model.updatenextpageyear().call( _p, _p.selector() );

                }

                _p._model.buildYearTpl( new Date(), _startYear, _endYear );

            }

        },

        show: function () {
            var _p = this;

            _p._model.layout().show();

            _p._model.layout().data('CDCalendarShow', _p);
            
        },

        hide: function () {
            var _p = this;

            _p._model.layout().hide();

        }

    });




    $(document).ready( function () {
        // var _insAr = 0;
        // DCalendar.autoInit
        //     && ( _insAr = DCalendar.init() );
        $('input[datatype=ddate]').addClass('CDCalendar_icon');
    });    
        

    $('input[datatype=ddate],button[datatype=ddate]').on('focus', function () {
        var _insAr,
            _selector = $(this),
            _isIgnore = _selector.is('[ignoreprocess]');

        _insAr = JC.BaseMVC.getInstance( _selector, JC.DCalendar );

        if( _selector.is( '[' + DCalendar.Model.IGNORE + ']' ) ) return
        !_insAr && ( _insAr = new JC.DCalendar( _selector ) ) && JC.BaseMVC.getInstance( _selector, JC.DCalendar, _insAr );


        _selector.attr('ignoreprocess', true);
        _selector.blur();
        

        // if( _p._model.layout().is(':visible') ) return;

        JC.f.safeTimeout( function(){
            //_p.trigger( DCalendar.Model.SHOW );   
            !_isIgnore && _selector.removeAttr('ignoreprocess');
        }, null, 'DCalendarFocus', 120 );

    } );


    $(document).on('click', function ( _evt ) {
        var _ins = DCalendar.getInstance( JC.f.parentSelector( this, '.CDCalendar_bounding_box') );
        _ins && _ins.trigger( DCalendar.Model.HIDDEN );

    } );

    $(document).delegate( '#CompDCalendar span.CDC_close_btn', 'click', function ( _evt ) {
        var _ins = DCalendar.getInstance( JC.f.parentSelector( this, '.CDCalendar_bounding_box') );
        _ins && _ins.trigger( DCalendar.Model.HIDDEN );
    });

    $(document).delegate( '#CompDCalendar span.CDC_next_btn, #CompDCalendar span.CDC_prev_btn', 'click', function ( _evt ) {
       
        var _ins = DCalendar.getInstance( JC.f.parentSelector( this, '.CDCalendar_bounding_box') );
        _ins && _ins.trigger( DCalendar.Model.CHANGE, [ $(this) ] );
       
    });

    $(document).delegate( '#CompDCalendar a.CDC_Month', 'click', function ( _evt ) {

        var _ins = DCalendar.getInstance( JC.f.parentSelector( this, '.CDCalendar_bounding_box') );
        _ins && _ins.trigger( DCalendar.Model.MONTHVIEW, [ $(this) ] );
       
    });

    $(document).delegate( '#CompDCalendar a.CDC_Year', 'click', function ( _evt ) {
      
        var _ins = DCalendar.getInstance( JC.f.parentSelector( this, '.CDCalendar_bounding_box') );
        _ins && _ins.trigger( DCalendar.Model.YEARVIEW, [ $(this) ] );
       
    });

    $(document).delegate( '#CompDCalendar a.CDC_Date', 'click', function ( _evt ) {
       
        var _ins = DCalendar.getInstance( JC.f.parentSelector( this, '.CDCalendar_bounding_box') );
        _ins && _ins.trigger( DCalendar.Model.DATEVIEW, [ $(this) ] );
    });

    $(document).delegate( '#CompDCalendar', 'click', function ( _evt ) {
        _evt.stopPropagation();
    } );

    $(document).delegate( '#CompDCalendar .CDC_date_body>tbody>tr>td>a:not(".disabled")', 'click', function ( _evt ) {
        var _ins = DCalendar.getInstance( JC.f.parentSelector( this, '.CDCalendar_bounding_box') );
        _ins && _ins.trigger( DCalendar.Model.SETDATE, [ $(this) ] );
        _ins && _ins.trigger( DCalendar.Model.HIDDEN );
    } );

    $(document).delegate( '#CompDCalendar .CDC_month_body>tbody>tr>td>a', 'click', function ( _evt ) {
        
        var _ins = DCalendar.getInstance( JC.f.parentSelector( this, '.CDCalendar_bounding_box') );
        _ins && _ins.trigger( DCalendar.Model.DATEVIEW, [ $(this) ] );
        
    } );

    $(document).delegate( '#CompDCalendar .CDC_year_body>tbody>tr>td>a', 'click', function ( _evt ) {
      
        var _ins = DCalendar.getInstance( JC.f.parentSelector( this, '.CDCalendar_bounding_box') );
        _ins && _ins.trigger( DCalendar.Model.MONTHVIEW, [ $(this) ] );
        
    } );

   

    $(window).on('resize', function () {
        JC.f.safeTimeout( function(){
           DCalendar.update();
        }, null, 'DCalendarResize', 20 );

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
