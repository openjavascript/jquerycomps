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
        var _r = [];
        
        _selector = $( _selector || document );

        if ( _selector && _selector.length ) {
            // if ( _selector.prop('nodeName') && _selector.attr('datatype') && ( _selector.prop('nodeName').toLowerCase()=='input' || _selector.prop('nodeName').toLowerCase()=='button' ) && ( _selector.attr('datatype').toLowerCase()=='ddate') ) {
            //     _r.push( new DCalendar(_selector) );
            // }

            if ( _selector.hasClass('js_compDCalendar') ) {
                _r.push( new DCalendar(_selector) );
            } else {
                _selector.find('input[datatype=ddate], button[datatype=ddate]').each( function() {
                    _r.push( new DCalendar( this ) );
                });
            }
        }
        //JC.log( 'DCalendar:', new Date().getTime(), _r );
      
        return _r;
    };

    DCalendar.update = function () {
    },

    BaseMVC.build( DCalendar );

    JC.f.extendObject( DCalendar.prototype, {
        _beforeInit: function () {

        },

        _initHanlderEvent: function () {
            var _p = this;

            _p._model.selector().on('focus', function ( _evt ) {
                JC.f.safeTimeout( function(){
                    _p.trigger( DCalendar.Model.SHOW );
                    
                }, null, 'DCalendarClick', 150 ); });
            
            _p._model.selector().on('click', function ( _evt ) {
                
                JC.f.safeTimeout( function(){
                    _p.trigger( DCalendar.Model.SHOW );
                   
                }, null, 'DCalendarClick', 150 );

            });

            _p._model.selector().on('keydown', function ( _evt ) {
                _evt.preventDefault();
            });

            _p.on(DCalendar.Model.SHOW, function () {
                _p._view.show();
            });

            _p.on(DCalendar.Model.HIDDEN, function () {
                _p._view.hide();
            });

            _p.on(DCalendar.Model.CHANGE, function ( _evt, _srcSelector ) {
                _p._view.change( _srcSelector );
            } );

            _p.on(DCalendar.Model.SETDATE, function ( _evt, _srcSelector ) {
                _p._model.setSelected( _srcSelector );
            });

            _p.on(DCalendar.Model.DATEVIEW, function ( _evt, _srcSelector ) {
                _p._view.dateView( _srcSelector );
            });

            _p.on(DCalendar.Model.MONTHVIEW, function ( _evt, _srcSelector ) {
                _p._view.monthView( _srcSelector );
            });

            _p.on(DCalendar.Model.YEARVIEW, function ( _evt, _srcSelector ) {
                _p._view.yearView( _srcSelector );
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
    DCalendar.Model._boxId = "CompDCalendar";
    DCalendar.Model.SHOW = "CDC_SHOW";
    DCalendar.Model.HIDDEN = "CDC_HIDDEN";
    DCalendar.Model.CHANGE = "CDC_CHANGE";
    DCalendar.Model.SETDATE = "CDC_SETDATE";
    DCalendar.Model.DATEVIEW = "CDC_DATEVIEW";
    DCalendar.Model.MONTHVIEW = "CDC_MONTHVIEW";
    DCalendar.Model.YEARVIEW = "CDC_YEARVIEW";

    JC.f.extendObject( DCalendar.Model.prototype, {
        init: function () {
            var _p = this;
        },

        // dateSpan: function () {
        //     var _r = this.intProp('dateSpan');

        //     !_r && ( _r = 50 );

        //     return _r;
        // },

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

        // startYear: function ( ) {
        //     var _curY = this.curSelectedDate().getFullYear(),
        //         _r;

        //     _r = _curY - this.dateSpan();

        //     return _r;

        // },

        // endYear: function ( ) {
        //     var _curY = this.curSelectedDate().getFullYear(),
        //         _r;

        //     _r = _curY + this.dateSpan();

        //     return _r;

        // },

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

        allYearsTpl: function ( _startYear, _endYear ) {
            //前14年后13年
            var _p = this,
                // _s = _p.startYear( _date ),
                // _e = _p.endYear( _date ),
                _s = _startYear,
                _e = _endYear,
                _r = '<tr>',
                i,
                j;

            for ( i = _s, j = 1; i <= _e; i++ ) {
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
                _day,
                _maxDayOfMonth = JC.f.maxDayOfMonth( _date ),
                _placeholder = '',
                i,
                j;

            for ( i = 1; i <= _maxDayOfMonth; i++ ) {
                _d = new Date( _date.getFullYear(), _date.getMonth(), i );
                _day = _d.getDay();
                _day = ( _day + 6 ) % 7;

                if ( JC.f.isSameDay( new Date(), _d ) ) {
                    if ( _day === 5 || _day === 6 ) {
                        _t = '<td class="weekend"><a href="javascript:;" class="today" data-date="' + JC.f.formatISODate(_d) + '">' + i + '</a></td>'; 
                    } else {
                        _t = '<td><a href="javascript:;" class="today" data-date="' + JC.f.formatISODate(_d) + '">' + i + '</a></td>'; 
                    }
                } else {
                    if ( _day === 5 || _day === 6 ) {
                        _t = '<td class="weekend"><a href="javascript:;" data-date="' + JC.f.formatISODate(_d) + '">' + i + '</a></td>'; 
                    } else {
                        _t = '<td><a href="javascript:;" data-date="' + JC.f.formatISODate(_d) + '">' + i + '</a></td>'; 
                    }
                }
               
                if ( i === 1 && _day > 0) {
                  
                    for ( j = 0; j < _day; j++ ) {
                        _placeholder += '<td class="disabled"><a href="javascript:;"></a></td>';
                    } 

                    _r = _r + _placeholder;
                    _placeholder = '';

                }

                _r += _t;

                if ( i === _maxDayOfMonth && _day < 6) {

                    for ( j = 0; j < 6 - _day; j++ ) {
                        _placeholder += '<td class="disabled"><a href="javascript:;"></a></td>';
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

        baseTpl: '<div class="CDCalendar_bounding_box" style="width:466px;position:absolute;" >'
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

        compTpl: function ( _tpl ) {
            var _p = this,
                _r;

            _r = JC.f.printf( _p.baseTpl, _tpl );

            return _r;
        },

        buildDateTpl: function ( _curDate, _nextMonthDate ) {
            var _p = this,
                _curDate = _curDate || _p.curSelectedDate(),
                _nextMonthDate = _nextMonthDate || new Date(_curDate.getFullYear(), _curDate.getMonth() + 1, 1);

            _p.layout().find('div.CDC_date_box').html( 
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
            .find('table.CDC_date_body>tbody>tr>td>a[data-date]').each( function () {
                var _sp = $(this),
                    _d = new Date( _sp.data('date') );

                if ( JC.f.isSameDay( _d, _p.curSelectedDate() ) ){
                    _sp.parent('td').addClass('selected_date');
                }

                if (_p.minValue() && _d.getTime() < _p.minValue().getTime() ) {
                    _sp.parent('td').addClass('disabled');
                }

                if ( _p.maxValue() && _d.getTime() > _p.maxValue().getTime() ) {
                    _sp.parent('td').addClass('disabled');
                }

            } )
                .end()
                .end()
                    .find('span.CDC_next_btn')
                        .attr('data-date', JC.f.formatISODate(_nextMonthDate))
                        .attr('data-type', 'date')
                .end()
                    .find('span.CDC_prev_btn')
                        .attr('data-date', JC.f.formatISODate(_curDate) )
                        .attr('data-type', 'date')
                .end();
                 
                _p.fixTable();

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

        // layout: function () {

        //     var _p = this,
        //         _r,
        //         _curDate = _p.curSelectedDate(),
        //         _nextMonthDate = new Date(_curDate.getFullYear(), _curDate.getMonth() + 1, 1);

        //     if ( !this._layout ) {
        //         _r = _p.compTpl( _p.dateTpl );

        //         this._layout = $( 
        //             JC.f.printf( 
        //                 _r, 
        //                 _curDate.getFullYear() + '年' + ( _curDate.getMonth() + 1 ) + '月',
        //                 _p.datesOfMonthTpl( _curDate ), 
        //                 _p.datesOfMonthTpl( _nextMonthDate ),
        //                 _nextMonthDate.getFullYear() + '年' + ( _nextMonthDate.getMonth() + 1 ) + '月',
        //                 JC.f.formatISODate( _curDate ),
        //                 JC.f.formatISODate( _nextMonthDate )
        //             ) 
        //         )
        //         .appendTo( _p.layoutBox() )
        //             .find('table.CDC_date_body>tbody>tr>td>a[data-date]').each( function () {
        //                 var _sp = $(this),
        //                     _d = new Date( _sp.data('date') );

        //                 if ( JC.f.isSameDay( _d, _p.curSelectedDate() ) ){
        //                     _sp.parent('td').addClass('selected_date');
        //                 }

        //                 if (_p.minValue() && _d.getTime() < _p.minValue().getTime() ) {
        //                     _sp.parent('td').addClass('disabled');
        //                 }

        //                 if ( _p.maxValue() && _d.getTime() > _p.maxValue().getTime() ) {
        //                     _sp.parent('td').addClass('disabled');
        //                 }

        //             } )
        //         .end()
        //         .end()
        //             .find('span.CDC_next_btn')
        //                 .attr('data-date', JC.f.formatISODate(_nextMonthDate))
        //                 .attr('data-type', 'date')
        //         .end()
        //             .find('span.CDC_prev_btn')
        //                 .attr('data-date', JC.f.formatISODate(_curDate) )
        //                 .attr('data-type', 'date')
        //         .end();
                 
        //         _p.fixTable();

        //         $(this).trigger( 'TriggerEvent', [ 'CDCCreateLayout', this._layout ] );
               
        //     }
 
        //     return this._layout;
        // },

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

            if ( ( _win.outerHeight + _win.scrollTop() ) < ( _y + _p.layout().outerHeight ) ) {
                _y = _p.selector().offset().top;
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

            JC.f.getJqParent(_td, 'div.CDCalendar_bounding_box')
            .find('table.CDC_date_body>tbody>tr>td').removeClass('selected_date');

            _td.addClass('selected_date').data('date');

            _p.selector().val( _d );

        },

        fixTable: function () {
            var _p = this,
                _leftTable = _p.layout().find('table.CDC_date_body_left'),
                _rightTable = _p.layout().find('table.CDC_date_body_right'),
                _t = '<tr>'
                        + '<td class="disabled"><a href="javascript:;"></a></td>'
                        + '<td class="disabled"><a href="javascript:;"></a></td>'
                        + '<td class="disabled"><a href="javascript:;"></a></td>'
                        + '<td class="disabled"><a href="javascript:;"></a></td>'
                        + '<td class="disabled"><a href="javascript:;"></a></td>'
                        + '<td class="disabled"><a href="javascript:;"></a></td>'
                        + '<td class="disabled"><a href="javascript:;"></a></td>'
                    + '</tr>';

            if ( _leftTable.find('tbody>tr').length < _rightTable.find('tbody>tr').length ) {
                _leftTable.find('tbody').append(_t);
                return;
            } 

            if ( _leftTable.find('tbody>tr').length > _rightTable.find('tbody>tr').length ) {
                _rightTable.find('tbody').append(_t);
                return;
            }

        }
        
    });
 
    JC.f.extendObject( DCalendar.View.prototype, {
        init: function () {
            var _p = this;
        },

        update: function ( _type, _date ) {
            var _p = this;
        },

        yearView: function ( _srcSelector ) {
            var _p = this,
                _el = $( _srcSelector ),
                _r = _p._model.yearTpl,
                _date = new Date(),
                _startYear = _date.getFullYear() - 14,
                _endYear = _date.getFullYear() + 13;

            _p._model.layout().find('div.CDC_date_box').html(
                JC.f.printf( _r, JC.f.formatISODate( _date ), _p._model.allYearsTpl( _startYear, _endYear ), _startYear + ' ~ ' + _endYear  )
            )
            .find('table.CDC_year_body>tbody>tr>td>a').each( function () {
                var _sp = $(this),
                    _d = new Date( _sp.data('year'), 0, 1 );

                if ( _sp.data('year') === new Date().getFullYear() ){
                    _sp.addClass('today');
                }

                _sp.attr( 'data-date', JC.f.formatISODate( _d ) );

            } )
            .end()
            .end()
            .find('span.CDC_prev_btn')
                // .addClass('CDC_prev_btn_disabled')
                // .prop('disabled', true)
                .attr('data-type', 'year')
                .attr('data-date', JC.f.formatISODate ( new Date(_startYear - 1, 0, 1) ) )
            .end()
            .find('span.CDC_next_btn')
                // .addClass('CDC_next_btn_disabled')
                // .prop('disabled', true)
                .attr('data-type', 'year')
                .attr('data-date', JC.f.formatISODate ( new Date(_endYear + 1, 0, 1) ) );

        },

        monthView: function ( _srcSelector ) {
            var _p = this,
                _el = $( _srcSelector ),
                _date = new Date( _el.data('date') ),
                _r = _p._model.monthTpl;

            _p._model.layout().find('div.CDC_date_box').html(
                JC.f.printf( _r, _date.getFullYear() + '年', JC.f.formatISODate( _date ) )
            )
            .find('table.CDC_month_body>tbody>tr>td>a').each( function () {
                var _sp = $(this),
                    _d = new Date( _date.getFullYear(), _sp.data('month'), 1 );

                if ( JC.f.isSameMonth( _d, new Date() ) ){
                    _sp.addClass('today');
                }

                _sp.attr('data-date', JC.f.formatISODate( _d ) );

            } )
            .end()
            .end()
            .find('span.CDC_prev_btn')
                .attr('data-date', JC.f.formatISODate( new Date(_date.getFullYear() - 1, 0, 1) ) )
                .attr('data-type', 'month')
                .removeClass('CDC_prev_btn_disabled')
                .prop('disabled', false)
            .end()
            .find('span.CDC_next_btn')
                .attr('data-date', JC.f.formatISODate( new Date(_date.getFullYear() + 1, 0, 1) ))
                .attr('data-type', 'month')
                .removeClass('CDC_next_btn_disabled')
                .prop('disabled', false); 
        },

        dateView: function ( _srcSelector ) {
            var _p = this,
                _el = $( _srcSelector ),
                _curDate = new Date( _el.data('date') ),
                _nextMonthDate = new Date(_curDate.getFullYear(), _curDate.getMonth() + 1, 1),
                _r = _p._model.dateTpl;

            _p._model.buildDateTpl( _curDate, _nextMonthDate );

            // _p._model.layout().find('div.CDC_date_box').html( 
            //     JC.f.printf( 
            //         _r, 
            //         _curDate.getFullYear() + '年' + ( _curDate.getMonth() + 1 ) + '月',
            //         _p._model.datesOfMonthTpl( _curDate ), 
            //         _p._model.datesOfMonthTpl( _nextMonthDate ),
            //         _nextMonthDate.getFullYear() + '年' + ( _nextMonthDate.getMonth() + 1 ) + '月',
            //         JC.f.formatISODate( _curDate ),
            //         JC.f.formatISODate( _nextMonthDate )
            //     ) 
            // )
            // .find('table.CDC_date_body>tbody>tr>td>a').each( function () {
            //     var _sp = $(this),
            //         _d = new Date( _sp.data('date') );

            //     if ( JC.f.isSameDay( _d, _p._model.curSelectedDate() ) ){
            //         _sp.parent('td').addClass('selected_date');
            //     }

            //     if (_p._model.minValue() && _d.getTime() < _p._model.minValue().getTime() ) {
            //         _sp.parent('td').addClass('disabled');
            //     }

            //     if ( _p._model.maxValue() && _d.getTime() > _p._model.maxValue().getTime() ) {
            //         _sp.parent('td').addClass('disabled');
            //     }

            // } )
            // .end()
            // .end()
            // .find('span.CDC_next_btn')
            //     .attr('data-date', JC.f.formatISODate(_nextMonthDate))
            //     .attr('data-type', 'date')
            //     .removeClass('CDC_next_btn_disabled')
            //     .prop('disabled', false)
            // .end()
            // .find('span.CDC_prev_btn')
            //     .attr('data-date', JC.f.formatISODate(_curDate) )
            //     .attr('data-type', 'date')
            //     .removeClass('CDC_prev_btn_disabled')
            //     .prop('disabled', false)
            // .end();

            // _p._model.fixTable();
            
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
                _endYear,
                _r;

            if ( _type === 'date' ) {
                
                if ( _action === 'prev' ) {
                    _nextMonthDate = new Date( _el.attr('data-date') );
                    _curDate = new Date( _nextMonthDate.getFullYear(), _nextMonthDate.getMonth() - 1, 1);
                } else {
                    _curDate = new Date( _el.attr('data-date') );
                    _nextMonthDate = new Date(_curDate.getFullYear(), _curDate.getMonth() + 1, 1);
                }

                _p._model.buildDateTpl( _curDate, _nextMonthDate );

                //_r = _p._model.dateTpl;

                // _p._model.layout().find('div.CDC_date_box').html( 
                //     JC.f.printf( 
                //         _r, 
                //         _curDate.getFullYear() + '年' + ( _curDate.getMonth() + 1 ) + '月',
                //         _p._model.datesOfMonthTpl( _curDate ), 
                //         _p._model.datesOfMonthTpl( _nextMonthDate ),
                //         _nextMonthDate.getFullYear() + '年' + ( _nextMonthDate.getMonth() + 1 ) + '月',
                //         JC.f.formatISODate( _curDate ),
                //         JC.f.formatISODate( _nextMonthDate )
                //     ) 
                // )
                // .find('table.CDC_date_body>tbody>tr>td>a').each( function () {
                //     var _sp = $(this),
                //         _d = new Date( _sp.data('date') );

                //     if ( JC.f.isSameDay( _d, _p._model.curSelectedDate() ) ){
                //         _sp.parent('td').addClass('selected_date');
                //     }

                //     if (_p._model.minValue() && _d.getTime() < _p._model.minValue().getTime() ) {
                //         _sp.parent('td').addClass('disabled');
                //     }

                //     if ( _p._model.maxValue() && _d.getTime() > _p._model.maxValue().getTime() ) {
                //         _sp.parent('td').addClass('disabled');
                //     }

                // } )
                // .end()
                // .end()
                // .find('span.CDC_next_btn')
                //     .attr('data-date', JC.f.formatISODate(_nextMonthDate))
                // .end()
                // .find('span.CDC_prev_btn')
                //     .attr('data-date', JC.f.formatISODate(_curDate) )
                // .end();

                // _p._model.fixTable();

            } else if ( _type === 'month') {

                _r = _p._model.monthTpl;
                
                _curDate = new Date( _el.attr('data-date') );

                _p._model.layout().find('div.CDC_date_box').html(
                    JC.f.printf( _r, _curDate.getFullYear() + '年', JC.f.formatISODate( _curDate ) )
                )
                .find('table.CDC_month_body>tbody>tr>td>a').each( function () {
                    var _sp = $(this),
                        _d = new Date( _curDate.getFullYear(), _sp.data('month'), 1 );

                    if ( JC.f.isSameMonth( _d, new Date() ) ){
                        _sp.addClass('today')
                    }

                    _sp.attr('data-date', JC.f.formatISODate( _d ) );

                } )
                .end()
                .end()
                .find('span.CDC_next_btn')
                    .attr('data-date', JC.f.formatISODate( new Date( _curDate.getFullYear() + 1, 0, 1 ) ) )
                .end()
                .find('span.CDC_prev_btn')
                    .attr('data-date', JC.f.formatISODate( new Date( _curDate.getFullYear() - 1, 0, 1 ) ) )
                .end();

            } else {
                _r = _p._model.yearTpl;
                _curDate = new Date( _el.attr('data-date') );
                
                if ( _action == 'prev' ) {
                    _endYear = _curDate.getFullYear();
                    _startYear = _endYear - 27;
                } else {
                    _startYear = _curDate.getFullYear();
                    _endYear = _startYear + 27;
                }

                _p._model.layout().find('div.CDC_date_box').html(
                    JC.f.printf( _r, JC.f.formatISODate( new Date() ), _p._model.allYearsTpl( _startYear, _endYear ),  _startYear + '~' + _endYear )
                )
                .find('table.CDC_year_body>tbody>tr>td>a').each( function () {
                    var _sp = $(this),
                        _d = new Date( _sp.data('year'), 0, 1 );

                    if ( _sp.data('year') === new Date().getFullYear() ){
                        _sp.addClass('today');
                    }

                    _sp.attr( 'data-date', JC.f.formatISODate( _d ) );

                } )
                .end()
                .end()
                .find('span.CDC_prev_btn')
                    .attr('data-date', JC.f.formatISODate( new Date( _startYear - 1, 0, 1 ) ) )
                .end()
                .find('span.CDC_next_btn')
                    .attr('data-date', JC.f.formatISODate( new Date( _endYear + 1, 0, 1 ) ) )
                .end();
            }

        },

        show: function () {
           var _p = this;

           _p._model.buildDateTpl();
           _p._model.position();
           _p._model.layout().show();
            
        },

        hide: function () {
            var _p = this;

            _p._model.layout().hide();

        }

    });

    $(document).on('click', function ( _evt ) {
        var _ins = DCalendar.getInstance( JC.f.parentSelector( this, '.CDCalendar_bounding_box') );
        _ins && _ins.trigger( DCalendar.Model.HIDDEN );

    } );

    $(document).delegate( 'div.CDCalendar_bounding_box span.CDC_close_btn', 'click', function ( _evt ) {
        var _ins = DCalendar.getInstance( JC.f.parentSelector( this, '.CDCalendar_bounding_box') );
        _ins && _ins.trigger( DCalendar.Model.HIDDEN );
    });

    $(document).delegate( 'div.CDCalendar_bounding_box span.CDC_next_btn, div.CDCalendar_bounding_box span.CDC_prev_btn', 'click', function ( _evt ) {
       
        var _ins = DCalendar.getInstance( JC.f.parentSelector( this, '.CDCalendar_bounding_box') );
        _ins && _ins.trigger( DCalendar.Model.CHANGE, [ $(this) ] );
       
    });

    $(document).delegate( 'div.CDCalendar_bounding_box a.CDC_Month', 'click', function ( _evt ) {
       
        var _ins = DCalendar.getInstance( JC.f.parentSelector( this, '.CDCalendar_bounding_box') );
        _ins && _ins.trigger( DCalendar.Model.MONTHVIEW, [ $(this) ] );
       
    });

    $(document).delegate( 'div.CDCalendar_bounding_box a.CDC_Year', 'click', function ( _evt ) {
      
        var _ins = DCalendar.getInstance( JC.f.parentSelector( this, '.CDCalendar_bounding_box') );
        _ins && _ins.trigger( DCalendar.Model.YEARVIEW, [ $(this) ] );
       
    });

    $(document).delegate( 'div.CDCalendar_bounding_box a.CDC_Date', 'click', function ( _evt ) {
       
        var _ins = DCalendar.getInstance( JC.f.parentSelector( this, '.CDCalendar_bounding_box') );
        _ins && _ins.trigger( DCalendar.Model.DATEVIEW, [ $(this) ] );
    });

    $(document).delegate( 'div.CDCalendar_bounding_box', 'click', function ( _evt ) {
        _evt.stopPropagation();
    } );

    $(document).delegate( 'div.CDCalendar_bounding_box table.CDC_date_body>tbody>tr>td:not(".disabled")>a', 'click', function ( _evt ) {
        var _ins = DCalendar.getInstance( JC.f.parentSelector( this, '.CDCalendar_bounding_box') );
        _ins && _ins.trigger( DCalendar.Model.SETDATE, [ $(this) ] );
        _ins && _ins.trigger( DCalendar.Model.HIDDEN );
    } );

    $(document).delegate( 'div.CDCalendar_bounding_box table.CDC_month_body>tbody>tr>td>a', 'click', function ( _evt ) {
        
        var _ins = DCalendar.getInstance( JC.f.parentSelector( this, '.CDCalendar_bounding_box') );
        _ins && _ins.trigger( DCalendar.Model.DATEVIEW, [ $(this) ] );
        
    } );

    $(document).delegate( 'div.CDCalendar_bounding_box table.CDC_year_body>tbody>tr>td>a', 'click', function ( _evt ) {
      
        var _ins = DCalendar.getInstance( JC.f.parentSelector( this, '.CDCalendar_bounding_box') );
        _ins && _ins.trigger( DCalendar.Model.MONTHVIEW, [ $(this) ] );
        
    } );

    $(document).ready( function () {
        var _insAr = 0;
        DCalendar.autoInit
            && ( _insAr = DCalendar.init() );

    });

    $(window).on('resize', function () {
        JC.f.safeTimeout( function(){
           JC.log('resize');
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
