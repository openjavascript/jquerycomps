;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC', 'JC.Panel', 'Bizs.CRMSchedulePopup' ], function(){
/**
 * CRM 排期日期选择组件
 *
 *<p><b>require</b>:
 *   <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 *   , <a href='JC.Panel.html'>JC.Panel</a>
 *   , <label>Bizs.CRMSchedulePopup</label>
 *</p>
 *
 *<p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *   | <a href='http://jc2.openjavascript.org/docs_api/classes/Bizs.CRMSchedule.html' target='_blank'>API docs</a>
 *   | <a href='../../modules/Bizs.CRMSchedule/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *<h2>页面只要引用本脚本, 默认会自动处理 div class="js_bizCRMSchedule" </h2>

 *<h2><a href="../../modules/Bizs.CRMSchedule/0.1/_demo/data_docs.html" target="_blank">数据格式说明</a></h2>
 *
 *<h2>共用的 HTML attribute</h2>
 *<dl>
 *    <dt>bccInitData = json var name, <b>window 变量域</b></dt>
 *    <dd>初始化的数据<dd>
 *
 *    <dt>bccTpl = script selector</dt>
 *    <dd>主模板</dd>
 *
 *    <dt>bccRowTpl = script selector</dt>
 *    <dd>数据列模板</dd>
 *
 *    <dt>bccDateNavTpl = script selector</dt>
 *    <dd>日期导航的模板</dd>
 *
 *    <dt>bccPopupTpl = script selector</dt>
 *    <dd>日期弹框的主模板</dd>
 *
 *    <dt>bccPopupCalendarTpl = script selector</dt>
 *    <dd>日期弹框的日历模板</dd>
 *
 *    <dt>bccMonthDataUrl = url</dt>
 *    <dd>显示某个月份的数据
 *      <br />?date={1}&id={0}
 *      <br />?date=2014-06&id=1,2,3,4,5
 *    </dd>
 *
 *    <dt>bccDateRangeUrl = url</dt>
 *    <dd>显示日期范围的数据
 *      <br >?id={0}&start_date={1}&end_date={2}
 *      <br >?id=1&start_date=2014-05-01&end_date=2014-08-31
 *    </dd>
 *
 *    <dt>bccActionType = string, default = query</dt>
 *    <dd>
 *          排期表的操作类型: lock(锁定), edit(编辑), query(查询)
 *    </dd>
 *</dl> 
 *
 *<h2>锁定模式(lock) 可用的 HTML attribute</h2>
 *<dl>
 *    <dt>bccLockupDateUrl = url</dt>
 *    <dd>锁定日期的URL
 *      <br />?action=lockup&id={0}&date={1}
 *      <br />?action=lockup&id=3&date=2014-04-08
 *    </dd>
 *
 *    <dt>bccUnlockDateUrl = url</dt>
 *    <dd>解锁日期的URL
 *      <br />?action=unlock&&id={0}&date={1}
 *      <br />?action=unlock&&id=3&date=2014-04-05
 *    </dd>
 *
 *    <dt>bccLockupIdUrl = url</dt>
 *    <dd>锁定ID的URL
 *      <br />?action=lockup&date={1}&id={0}
 *      <br />?action=lockup&date=2014-04-05&id=1,2,4,5
 *    </dd>
 *
 *    <dt>bccUnlockIdUrl = url</dt>
 *    <dd>解锁ID的URL
 *      <br />?action=unlock&date={1}&id={0}
 *      <br />?action=unlock&date=2014-04-07&id=1,2,3,4,5
 *    </dd>
 *</dl>
 *
 *<h2>编辑模式(edit) 可用的 HTML attribute</h2>
 *<dl>
 *    <dt>bccSaveSelectBox = selector</dt>
 *    <dd>保存选中值选择器的父容器</dd>
 *
 *    <dt>bccSaveSelectItemTpl = script selector</dt>
 *    <dd>保存选中值项的模板</dd>
 *
 *    <dt>bccSaveSelectItemClass = string, default = ".js_bccSaveSelectItem"</dt>
 *    <dd>保存选中值项的css class 选择器</dd>
 *
 *    <dt>bccDataLabelItemTpl = script selector</dt>
 *    <dd>日期 Label 的模板</dd>
 *</dl>
 *
 * @namespace   window.Bizs
 * @class       CRMSchedule
 * @extends     JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2014-04-26 
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 */
    var _jdoc = $( document ), _jwin = $( window );

    Bizs.CRMSchedule = CRMSchedule;

    function CRMSchedule( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, CRMSchedule ) ) 
            return JC.BaseMVC.getInstance( _selector, CRMSchedule );

        JC.BaseMVC.getInstance( _selector, CRMSchedule, this );

        this._model = new CRMSchedule.Model( _selector );
        this._view = new CRMSchedule.View( this._model );

        this._init();

        JC.log( CRMSchedule.Model._instanceName, 'all inited', new Date().getTime() );
    }
    /**
     * 初始化可识别的 CRMSchedule 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of CRMScheduleInstance}
     */
    CRMSchedule.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector.length ){
                if( _selector.hasClass( 'js_bizCRMSchedule' )  ){
                    _r.push( new CRMSchedule( _selector ) );
                }else{
                    _selector.find( 'div.js_bizCRMSchedule' ).each( function(){
                        _r.push( new CRMSchedule( this ) );
                    });
                }
            }
            return _r;
        };
    /*
    CSS 样式名对照
            选定的时间  : js_pos_selected
            可预定      : js_pos_canSelect
            已预定      : js_pos_ordered
            待上线      : js_pos_preOnline
            已上线      : js_pos_online
            未上线      : js_pos_notOnline
            已锁定      : js_pos_locked


    类型对照( 默认类型为 0 )
            可预定      : 0
            已预定      : 1
            待上线      : 2
            已上线      : 3
            未上线      : 4
            已锁定      : 5
    */
    CRMSchedule.STATUS_CAN_SELECT   = '0';
    CRMSchedule.STATUS_ORDERED      = '1';
    CRMSchedule.STATUS_PRE_ONLINE   = '2';
    CRMSchedule.STATUS_ONLINE       = '3';
    CRMSchedule.STATUS_NOT_ONLINE   = '4';
    CRMSchedule.STATUS_LOCKED       = '5';
    CRMSchedule.STATUS_SELECTED     = '999';

    CRMSchedule.CLASS_CAN_SELECT    = 'js_pos_canSelect';
    CRMSchedule.CLASS_ORDERED       = 'js_pos_ordered';
    CRMSchedule.CLASS_PRE_ONLINE    = 'js_pos_preOnline';
    CRMSchedule.CLASS_ONLINE        = 'js_pos_online';
    CRMSchedule.CLASS_NOT_ONLINE    = 'js_pos_notOnline';
    CRMSchedule.CLASS_LOCKED        = 'js_pos_locked';
    CRMSchedule.CLASS_SELECTED      = 'js_pos_selected';

    CRMSchedule.STATUS_CODE_MAP = {
        '0'                         : CRMSchedule.CLASS_CAN_SELECT
        , '1'                       : CRMSchedule.CLASS_ORDERED
        , '2'                       : CRMSchedule.CLASS_PRE_ONLINE
        , '3'                       : CRMSchedule.CLASS_ONLINE
        , '4'                       : CRMSchedule.CLASS_NOT_ONLINE
        , '5'                       : CRMSchedule.CLASS_LOCKED
        , '999'                     : CRMSchedule.CLASS_SELECTED
    };

    CRMSchedule.CLASS_MAP = {
        'js_pos_canSelect'          : CRMSchedule.STATUS_CAN_SELECT
        , 'js_pos_ordered'          : CRMSchedule.STATUS_ORDERED
        , 'js_pos_preOnline'        : CRMSchedule.STATUS_PRE_ONLINE
        , 'js_pos_online'           : CRMSchedule.STATUS_ONLINE
        , 'js_pos_notOnline'        : CRMSchedule.STATUS_NOT_ONLINE
        , 'js_pos_locked'           : CRMSchedule.STATUS_LOCKED
        , 'js_pos_selected'         : CRMSchedule.STATUS_SELECTED
    };

    var _tmp = [];
    for( var k in CRMSchedule.CLASS_MAP ){
        _tmp.push( k );
    }
    CRMSchedule.ALL_CLASS = _tmp.join( ' ' );

    JC.BaseMVC.build( CRMSchedule );

    JC.f.extendObject( CRMSchedule.prototype, {
        _beforeInit:
            function(){
                //JC.log( 'CRMSchedule _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this;

                _p.on( 'inited', function(){
                    if( _p._model.initData() ) {
                        _p.trigger( 'update_layout', [ _p._model.initData(), null, true ] );
                    }
                    _p.trigger( 'init_date_nav' );
                });

                _p.on( 'update_layout', function( _evt, _d, _displayDate, _isReady ){
                    if( !_d ) return;

                    _p._view.update( _d, _displayDate, _isReady );
                });

                _p.on( 'show_msg', function( _evt, _msg, _sp, _status ){
                    if( _sp ){
                        JC.msgbox( _msg, _sp, _status || 0 );
                    }else{
                        JC.Dialog.msgbox( _msg, _status || 0 );
                    }
                });

                switch( _p._model.actionType() ){
                    case 'lock': _p._initLockHandler(); break;
                    case 'edit': _p._initEditHandler(); break;
                }

                _p.selector().delegate( 'input.js_bccPopupBtn', 'click', function( _evt ){
                    var _sp = $( this )
                        , _popIns
                        ;

                    _popIns = new Bizs.CRMSchedulePopup( _sp, _p );
                });

                _p.on( 'init_date_nav', function( _evt ){
                    _p._init_date_control();
                    _p._init_date_label();
                });

                _p.on( 'get_data', function( _evt, _date ){
                    //JC.log( 'get_data', CRMSchedule.yearMonthString( _date ) );
                    var _idList = _p._model.idList(), _url = _p._model.monthDataUrl();

                    //JC.log( '_idList:', _idList, _url );

                    if( !( _idList.length && _url )  ) return;

                    JC.f.safeTimeout( function(){
                        _p.trigger( 'clear_data' );

                        _url = JC.f.printf( _url, _idList.join(','), CRMSchedule.yearMonthString( _date ) );

                        $.get( _url ).done( function( _d ){
                            //JC.log( _d );
                            var _data = $.parseJSON( _d ), _initDate = _p._model.initDate();

                            if( _data && !_data.errorno ){
                                _data.data[ 'start_date' ] = JC.f.formatISODate( _initDate.sdate );
                                _data.data[ 'end_date' ] = JC.f.formatISODate( _initDate.edate );
                                _data.data[ 'display_date' ] = CRMSchedule.yearMonthString( _date );

                                //JC.dir( _data );

                                _p.trigger( 'update_layout', [ _data.data, _date ] );
                            }
                        });

                    }, _p, 'GET_DATA', 200 );
                });

                _p.on( 'clear_data', function( _evt ){
                    _p.selector().find( 'tr.js_bccDataRow' ).remove();
                });

                _p.on( 'clear', function( _evt ){
                    _p._model.dataLabelBox().html( '' );
                });

                _p.selector().delegate( 'tr.js_bccDataRow',  'mouseenter', function( _evt ){
                    var _sp = $( this ), _ix = parseInt( _sp.attr( 'data-rowCount' ) );
                    _sp.addClass( 'js_bccDataRowHover' );
                    if( _ix ){
                        _sp.prev().addClass( 'js_bccDataRowHover_prev' );
                    }
                });

                _p.selector().delegate( 'tr.js_bccDataRow',  'mouseleave', function( _evt ){
                    var _sp = $( this ), _ix = parseInt( _sp.attr( 'data-rowCount' ) );
                    _sp.removeClass( 'js_bccDataRowHover' );
                    if( _ix ){
                        _sp.prev().removeClass( 'js_bccDataRowHover_prev' );
                    }
                });

                _p.selector().delegate( 'th.js_bccDateLabel', 'mouseenter', function( _evt ){
                    var _sp = $( this )
                        , _ix = parseInt( _sp.attr( 'data-colCount' ) )
                        , _selector = JC.f.printf( 'th.js_bccDateCol_{0}, td.js_bccDateCol_{0}', _ix ) 
                        , _prevSelector = JC.f.printf( 'th.js_bccDateCol_{0}, td.js_bccDateCol_{0}', _ix - 1 ) 
                        ;
                   
                    _p.selector().find( _selector ).addClass( 'js_bccDateColHover' );
                    _p.selector().find( _prevSelector ).addClass( 'js_bccDateColHover' );

                });

                _p.selector().delegate( 'th.js_bccDateLabel',  'mouseleave', function( _evt ){
                    var _sp = $( this ), _ix = parseInt( _sp.attr( 'data-colCount' ) )
                        , _selector = JC.f.printf( 'th.js_bccDateCol_{0}, td.js_bccDateCol_{0}', _ix ) 
                        , _prevSelector = JC.f.printf( 'th.js_bccDateCol_{0}, td.js_bccDateCol_{0}', _ix - 1 ) 
                        ;
                   
                    _p.selector().find( _selector ).removeClass( 'js_bccDateColHover' );
                    _p.selector().find( _prevSelector ).removeClass( 'js_bccDateColHover' );
                });
            }

        , _init_date_control:
            function(){
                var _p = this
                    , js_bccYearSelect = _p.selector().find( 'select.js_bccYearSelect' )
                    , js_bccMonthSelect = _p.selector().find( 'select.js_bccMonthSelect' )
                    ;

                _p.selector().delegate( 'select.js_bccYearSelect', 'change', function( _evt ){
                    var js_bccYearSelect = _p.selector().find( 'select.js_bccYearSelect' )
                        , js_bccMonthSelect = _p.selector().find( 'select.js_bccMonthSelect' )
                        , _mindate = _p._model.initDate().sdate
                        , _maxdate = _p._model.initDate().edate
                        ;
                    var _sp = $( this ), _newDate = new Date( js_bccYearSelect.val(), js_bccMonthSelect.val(), 1 );

                    if( CRMSchedule.monthCompare( _maxdate, _newDate ) < 0 ) {
                        _newDate = JC.f.cloneDate( _maxdate );
                    }
                    if( CRMSchedule.monthCompare( _mindate, _newDate ) > 0 ) {
                        _newDate = JC.f.cloneDate( _mindate );
                    }

                    if( CRMSchedule.monthCompare( _p._model.currentDate(), _newDate ) === 0 ) return;

                    _p.trigger( 'update_date_control', _newDate );
                    _p.trigger( 'get_data', [ _newDate ] );
                });

                _p.selector().delegate( 'select.js_bccMonthSelect', 'change', function( _evt ){
                    var js_bccYearSelect = _p.selector().find( 'select.js_bccYearSelect' )
                        , js_bccMonthSelect = _p.selector().find( 'select.js_bccMonthSelect' )
                        ;
                    var _sp = $( this ), _newDate = new Date( js_bccYearSelect.val(), js_bccMonthSelect.val(), 1 );
                        _p.trigger( 'update_date_control', _newDate );
                        _p.trigger( 'get_data', [ _newDate ] );
                });

                _p.selector().delegate( 'button.js_bccPrevMonth', 'click', function( _evt ){
                    var js_bccYearSelect = _p.selector().find( 'select.js_bccYearSelect' )
                        , js_bccMonthSelect = _p.selector().find( 'select.js_bccMonthSelect' )
                        ;
                    var _sp = $( this )
                        , _date = new Date( js_bccYearSelect.val(), js_bccMonthSelect.val(), 1 )
                        , _newDate = JC.f.cloneDate( _date )
                        , _mindate = _p._model.initDate().sdate
                        ;
                    _newDate.setMonth( _newDate.getMonth() - 1 );

                    if( CRMSchedule.monthCompare( _p._model.currentDate(), _mindate ) === 0 ) return;

                    if( CRMSchedule.monthCompare( _newDate, _mindate ) > -1 ){
                        _p.trigger( 'update_date_control', _newDate );
                        _p.trigger( 'get_data', [ _newDate ] );
                    }
                });

                _p.selector().delegate( 'button.js_bccNextMonth', 'click', function( _evt ){
                    var js_bccYearSelect = _p.selector().find( 'select.js_bccYearSelect' )
                        , js_bccMonthSelect = _p.selector().find( 'select.js_bccMonthSelect' )
                        ;
                    var _sp = $( this )
                        , _date = new Date( js_bccYearSelect.val(), js_bccMonthSelect.val(), 1 )
                        , _newDate = JC.f.cloneDate( _date )
                        , _maxdate = _p._model.initDate().edate
                        ;
                    _newDate.setMonth( _newDate.getMonth() + 1 );

                    if( CRMSchedule.monthCompare( _p._model.currentDate(), _maxdate ) === 0 ) return;

                    if( CRMSchedule.monthCompare( _newDate, _maxdate ) < 1 ){
                        _p.trigger( 'update_date_control', _newDate );
                        _p.trigger( 'get_data', [ _newDate ] );
                    }
                });

                _p.on( 'update_date_control', function( _evt, _newDate ){
                    var js_bccYearSelect = _p.selector().find( 'select.js_bccYearSelect' )
                        , js_bccMonthSelect = _p.selector().find( 'select.js_bccMonthSelect' )
                        ;
                    js_bccYearSelect.val( _newDate.getFullYear() );

                    var _dateObj = _p._model.initDate() 
                        , _syear = _dateObj.sdate.getFullYear()
                        , _eyear = _dateObj.edate.getFullYear()
                        , _cyear = _newDate.getFullYear()
                        , _cmonth = _newDate.getMonth()
                        , _monthHtml = []
                        , _tmp

                        , _mintime = JC.f.cloneDate( _dateObj.sdate ).setDate( 1 )
                        , _maxtime = JC.f.cloneDate( _dateObj.edate ).setDate( 1 )
                        ;

                    for( var i = 0; i < 12; i++ ){
                        var _nowDate = new Date( _cyear, i, 1 );
                        if( _nowDate.getTime() < _mintime || _nowDate.getTime() > _maxtime ) continue;
                        _tmp = '';
                        i == _cmonth && ( _tmp = 'selected="selected"' );
                        _monthHtml.push( JC.f.printf( '<option value="{0}" {2}>{1}月</option>', i, i + 1, _tmp ) );
                    }

                    js_bccMonthSelect.html( _monthHtml.join('') );

                });
            }

        , _init_date_label:
            function(){
                var _p = this;

                _p.selector().delegate( '.js_bccDataLabelItem', 'click', function( _evt ){
                    var _sp = $( this ), _date;
                   
                    if( _sp.hasClass( 'js_bccCurrentDataLabelItem' ) ) return;
                    _date = CRMSchedule.parseDate( _sp.val() );
                    _p.trigger( 'get_data', [ _date ] );
                });
            }

        , _initLockHandler:
            function(){
                var _p = this;

                _p.selector().delegate( 'td.js_pos_canSelect', 'click', function( _evt ){
                    var _sp = $( this ), _id = _sp.attr( 'data-id' ), _date = _sp.attr( 'data-date' );
                        _p.trigger( 'lockup', [ _id, _date, _p._model.lockupDateUrl(), _sp, function(){
                            _sp.removeClass( CRMSchedule.ALL_CLASS )
                            .addClass( CRMSchedule.CLASS_LOCKED );
                            _p.trigger( 'update_check_item_status', [ JC.f.getJqParent( _sp, 'tr' ).find( 'input.js_bccCkAll' ) ] );
                        }] );

                });

                _p.selector().delegate( 'td.js_pos_locked', 'click', function( _evt ){
                    var _sp = $( this ), _id = _sp.attr( 'data-id' ), _date = _sp.attr( 'data-date' );
                        _p.trigger( 'unlock', [ _id, _date, _p._model.unlockDateUrl(), _sp, function(){
                            _sp.removeClass( CRMSchedule.ALL_CLASS )
                            .addClass( CRMSchedule.CLASS_CAN_SELECT );
                            _p.trigger( 'update_check_item_status', [ JC.f.getJqParent( _sp, 'tr' ).find( 'input.js_bccCkAll' ) ] );
                        }] );

                });

                _p.selector().delegate( 'input.js_bccCkAll', 'change', function( _evt ){
                    var _sp = $( this ), _tr, _date = [], _items;

                    JC.f.safeTimeout( function(){
                        _tr = JC.f.getJqParent( _sp, 'tr' );
                        if( _sp.prop( 'checked' ) ){
                            _items = _tr.find( 'td.js_pos_canSelect' );
                            _items.each( function( _ix, _item ){
                                _item = $( _item );
                                _date.push( _item.attr( 'data-date' ) );
                            });
                            _p.trigger( 'lockup', [ _tr.attr( 'data-id' ), _date.join(','), _p._model.lockupDateUrl(), _sp
                                , function( _data, _id, _date ){
                                    _items.removeClass( CRMSchedule.ALL_CLASS )
                                        .addClass( CRMSchedule.CLASS_LOCKED )
                                        ;
                                }]);
                        }else{
                            _items = _tr.find( 'td.js_pos_locked' );
                            _items.each( function( _ix, _item ){
                                _item = $( _item );
                                _date.push( _item.attr( 'data-date' ) );
                            });
                            _p.trigger( 'unlock', [ _tr.attr( 'data-id' ), _date.join(','), _p._model.unlockDateUrl(), _sp
                                , function( _data, _id, _date ){
                                    _items.removeClass( CRMSchedule.ALL_CLASS )
                                        .addClass( CRMSchedule.CLASS_CAN_SELECT )
                                        ;
                                }] );
                        }
                    }, _sp, 'LOCK_CK_ALL', 200 );
                });

                _p.selector().delegate( 'th.js_bccDateLabel[data-date]', 'click', function( _evt ){
                    var _sp = $( this ), _date = _sp.attr( 'data-date' )
                        , js_pos_canSelect, js_pos_locked
                        ;
                  
                    if( !_date ) return;

                    js_pos_canSelect = _p.selector().find( JC.f.printf( 'td.js_pos_canSelect[data-date={0}]', _date ) );
                    js_pos_locked = _p.selector().find( JC.f.printf( 'td.js_pos_locked[data-date={0}]', _date ) );
                        
                    //JC.log( 'th.js_bccDateLabel', _sp.attr( 'data-date' ), js_pos_canSelect.length, js_pos_locked.length, JC.f.ts() );

                    if( ( js_pos_canSelect.length + js_pos_locked.length ) == 0 ) return;

                    JC.f.safeTimeout( function(){
                        var _id = [];
                        if( js_pos_canSelect.length ){
                            js_pos_canSelect.each( function(){
                                _id.push( $( this ).attr( 'data-id' ) );
                            });
                            _p.trigger( 'lockup', [ _id.join(','), _date, _p._model.lockupIdUrl(), _sp
                                , function( _data, _id, _date ){
                                    js_pos_canSelect.removeClass( CRMSchedule.ALL_CLASS )
                                        .addClass( CRMSchedule.CLASS_LOCKED )
                                        ;
                                    _p.trigger( 'update_check_status' );
                                }]);
                        }else{
                            js_pos_locked.each( function(){
                                _id.push( $( this ).attr( 'data-id' ) );
                            });
                            _p.trigger( 'unlock', [ _id.join(','), _date, _p._model.unlockIdUrl(), _sp
                                , function( _data, _id, _date ){
                                    js_pos_locked.removeClass( CRMSchedule.ALL_CLASS )
                                        .addClass( CRMSchedule.CLASS_CAN_SELECT )
                                        ;
                                    _p.trigger( 'update_check_status' );
                                }] );
                        }
                        //JC.log( '_id:', _id );
                    }, _sp, 'LOCK_CK_ALL', 200 );

                });

                _p.on( 'lockup', function( _evt, _id, _date, _url, _sp, _doneCb ){
                    JC.f.safeTimeout( function(){
                        //JC.log( 'lockup', _id, _date, JC.f.ts() );
                        if( !( _id && _date ) ) return;
                        var _msg, _status;

                        _url = _url || _p._model.lockupDateUrl();
                        if( !_url ) return;
                        _url = JC.f.printf( _url, _id, _date );

                        $.get( _url ).done( function( _d ){
                            var _data = $.parseJSON( _d );
                            if( _data && !_data.errorno ){
                                _msg = '锁定成功!';
                                _data.errmsg && ( _msg = _data.errmsg );
                                _status = 0;

                                _doneCb && _doneCb( _data, _id, _date, _sp );

                            }else{
                                _msg = '锁定失败, 请重试!';
                                _data && _data.errmsg && ( _msg = _data.errmsg );
                                _status = 1;
                            }
                            _p.trigger( 'show_msg', [ _msg, _sp, _status ] );
                        });
                    }, _sp, 'LOCK_ITEM', 200 );
                });

                _p.on( 'unlock', function( _evt, _id, _date, _url, _sp, _doneCb ){
                    JC.f.safeTimeout( function(){
                        //JC.log( 'unlock', _id, _date, JC.f.ts() );
                        if( !( _id && _date ) ) return;
                        var _msg, _status;
                        _url = _url || _p._model.unlockDateUrl();
                        if( !_url ) return;
                        _url = JC.f.printf( _url, _id, _date );

                        $.get( _url ).done( function( _d ){
                            var _data = $.parseJSON( _d );
                            if( _data && !_data.errorno ){
                                _msg = '解锁成功!';
                                _data.errmsg && ( _msg = _data.errmsg );
                                _status = 0;

                                _doneCb && _doneCb( _data, _id, _date, _sp );
                            }else{
                                _msg = '解锁失败, 请重试!';
                                _data && _data.errmsg && ( _msg = _data.errmsg );
                                _status = 1;
                            }
                            _p.trigger( 'show_msg', [ _msg, _sp, _status ] );
                        });

                    }, _sp, 'LOCK_ITEM', 200 );
                });

                _p.on( 'layout_inited', function( _evt ){
                    _p.trigger( 'update_check_status' );
                });

                _p.on( 'update_check_status', function( _evt ){
                    var _ckLs = _p.selector().find( 'input.js_bccCkAll' );
                    if( !_ckLs.length ) return;

                    _ckLs.each( function( _ix, _ckItem ){
                        _p.trigger( 'update_check_item_status', [ _ckItem ] );
                    });
                });

                _p.on( 'update_check_item_status', function( _evt, _ckItem ){
                    _ckItem = $( _ckItem );
                    var _tr = JC.f.getJqParent( _ckItem, 'tr' )
                        , js_pos_canSelect = _tr.find( 'td.js_pos_canSelect' )
                        , js_pos_locked = _tr.find( 'td.js_pos_locked' )
                        ;

                    if( !( js_pos_canSelect.length || js_pos_locked.length ) ){
                        _ckItem.hide();
                        return;
                    }
                    if( js_pos_canSelect.length ){
                        _ckItem.prop( 'checked', false );
                    }else{
                        _ckItem.prop( 'checked', true );
                    }
                    _ckItem.show();
                });

            }

        , _initEditHandler:
            function(){
                var _p = this;

                _p.selector().delegate( 'td.js_pos_canSelect', 'click', function( _evt ){
                    var _sp = $( this ), _id = _sp.attr( 'data-id' ), _date = _sp.attr( 'data-date' );
                        _p.trigger( 'select_item', [ _id, _date, _sp, function(){
                            _sp.removeClass( CRMSchedule.ALL_CLASS )
                            .addClass( CRMSchedule.CLASS_SELECTED );
                            _p.trigger( 'update_check_item_status', [ JC.f.getJqParent( _sp, 'tr' ).find( 'input.js_bccCkAll' ) ] );
                        }] );
                });

                _p.selector().delegate( 'td.js_pos_selected', 'click', function( _evt ){
                    var _sp = $( this ), _id = _sp.attr( 'data-id' ), _date = _sp.attr( 'data-date' );
                        _p.trigger( 'unselect_item', [ _id, _date, _sp, function(){
                            _sp.removeClass( CRMSchedule.ALL_CLASS )
                            .addClass( CRMSchedule.CLASS_CAN_SELECT );
                            _p.trigger( 'update_check_item_status', [ JC.f.getJqParent( _sp, 'tr' ).find( 'input.js_bccCkAll' ) ] );
                        }] );
                });

                _p.on( 'select_item', function( _evt, _id, _date, _sp, _doneCb, _tm ){
                    JC.f.safeTimeout( function(){
                        //JC.log( 'select_item', _id, _date, JC.f.ts() );
                        if( !( _id && _date ) ) return;
                        _p._model.addSelectValue( _id, _date );

                        _doneCb && _doneCb( _id, _date, _sp );

                    }, _sp, 'SELECT_ITEM', _tm || 200 );
                });

                _p.on( 'unselect_item', function( _evt, _id, _date, _sp, _doneCb, _tm ){
                    JC.f.safeTimeout( function(){
                        //JC.log( 'unselect_item', _id, _date, JC.f.ts() );
                        if( !( _id && _date ) ) return;
                        _p._model.removeSelectValue( _id, _date );

                        _doneCb && _doneCb( _id, _date, _sp );

                    }, _sp, 'SELECT_ITEM', _tm || 200 );
                });

                _p.selector().delegate( 'input.js_bccCkAll', 'change', function( _evt ){
                    var _sp = $( this ), _tr, _date = [], _items;

                    JC.f.safeTimeout( function(){
                        _tr = JC.f.getJqParent( _sp, 'tr' );
                        if( _sp.prop( 'checked' ) ){
                            _items = _tr.find( 'td.js_pos_canSelect' );
                            _items.each( function( _ix, _item ){
                                _item = $( _item );
                                _date.push( _item.attr( 'data-date' ) );
                            });
                            _p.trigger( 'select_item', [ _tr.attr( 'data-id' ), _date.join(','), _sp
                                , function( _id, _date ){
                                    _items.removeClass( CRMSchedule.ALL_CLASS )
                                        .addClass( CRMSchedule.CLASS_SELECTED )
                                        ;
                                }, 10 ]);
                        }else{
                            _items = _tr.find( 'td.js_pos_selected' );
                            _items.each( function( _ix, _item ){
                                _item = $( _item );
                                _date.push( _item.attr( 'data-date' ) );
                            });
                            _p.trigger( 'unselect_item', [ _tr.attr( 'data-id' ), _date.join(','), _sp
                                , function( _id, _date ){
                                    _items.removeClass( CRMSchedule.ALL_CLASS )
                                        .addClass( CRMSchedule.CLASS_CAN_SELECT )
                                        ;
                                }, 10 ] );
                        }
                    }, _sp, 'SELECT_CK_ALL', 200 );
                });

                _p.selector().delegate( 'th.js_bccDateLabel[data-date]', 'click', function( _evt ){
                    var _sp = $( this ), _date = _sp.attr( 'data-date' )
                        , js_pos_canSelect, js_pos_selected
                        ;
                  
                    if( !_date ) return;

                    js_pos_canSelect = _p.selector().find( JC.f.printf( 'td.js_pos_canSelect[data-date={0}]', _date ) );
                    js_pos_selected = _p.selector().find( JC.f.printf( 'td.js_pos_selected[data-date={0}]', _date ) );
                        
                    //JC.log( 'th.js_bccDateLabel', _sp.attr( 'data-date' ), js_pos_canSelect.length, js_pos_selected.length, JC.f.ts() );

                    if( ( js_pos_canSelect.length + js_pos_selected.length ) == 0 ) return;

                    JC.f.safeTimeout( function(){
                        var _id = [];
                        if( js_pos_canSelect.length ){
                            js_pos_canSelect.each( function(){
                                _id.push( $( this ).attr( 'data-id' ) );
                            });
                            _p.trigger( 'select_item', [ _id.join(','), _date, _sp
                                , function( _data, _id, _date ){
                                    js_pos_canSelect.removeClass( CRMSchedule.ALL_CLASS )
                                        .addClass( CRMSchedule.CLASS_SELECTED )
                                        ;
                                    _p.trigger( 'update_check_status' );
                                }, 10 ]);
                        }else{
                            js_pos_selected.each( function(){
                                _id.push( $( this ).attr( 'data-id' ) );
                            });
                            _p.trigger( 'unselect_item', [ _id.join(','), _date, _sp
                                , function( _data, _id, _date ){
                                    js_pos_selected.removeClass( CRMSchedule.ALL_CLASS )
                                        .addClass( CRMSchedule.CLASS_CAN_SELECT )
                                        ;
                                    _p.trigger( 'update_check_status' );
                                }, 10 ] );
                        }
                        //JC.log( '_id:', _id );
                    }, _sp, 'SELECT_CK_ALL', 200 );

                });

                _p.on( 'layout_inited', function( _evt ){
                    _p.trigger( 'fill_selected_items' );
                    _p.trigger( 'update_check_status' );
                });

                _p.on( 'update_check_status', function( _evt ){
                    var _ckLs = _p.selector().find( 'input.js_bccCkAll' );
                    if( !_ckLs.length ) return;

                    _ckLs.each( function( _ix, _ckItem ){
                        _p.trigger( 'update_check_item_status', [ _ckItem ] );
                    });
                });

                _p.on( 'update_check_item_status', function( _evt, _ckItem ){
                    _ckItem = $( _ckItem );
                    var _tr = JC.f.getJqParent( _ckItem, 'tr' )
                        , js_pos_canSelect = _tr.find( 'td.js_pos_canSelect' )
                        , js_pos_selected = _tr.find( 'td.js_pos_selected' )
                        ;

                    if( !( js_pos_canSelect.length || js_pos_selected.length ) ){
                        _ckItem.hide();
                        return;
                    }
                    if( js_pos_canSelect.length ){
                        _ckItem.prop( 'checked', false );
                    }else{
                        _ckItem.prop( 'checked', true );
                    }
                    _ckItem.show();
                });

                _p.on( 'fill_selected_items', function( _evt ){
                    var _selectedItems = _p._model.saveSelectItems();
                    JC.log( 'fill_selected_items', _selectedItems.length );

                    _selectedItems.each( function( _ix, _item ){
                        _item = $( _item );
                        var _id = _item.attr( 'data-id' )
                            , _dates = _item.val().replace( /[\s]+/g, '' )
                            , _validDate = []
                            ;

                        _dates = _dates ? _dates.split( ',' ) : [];

                        for( var i = _dates.length - 1; i >= 0; i-- ){

                            var _dateItem = _dates[i]
                                ,_posItem = _p.selector().find( JC.f.printf( 'td.js_bccDateItem[data-id={0}][data-date={1}]'
                                                                            , _id, _dateItem
                                                                            ) )
                                ;

                            if( _posItem.length ){
                                if( !_posItem.hasClass( CRMSchedule.CLASS_CAN_SELECT ) ){
                                    _dates.splice( i, 1 );
                                }else{
                                    _posItem.removeClass( CRMSchedule.ALL_CLASS )
                                        .addClass( CRMSchedule.CLASS_SELECTED )
                                        ;
                                    _validDate.push( _dateItem );
                                }
                            }
                        };

                        _item.val( _dates.join( ',' ) );
                        !_item.val() && _item.remove();
                    });
                });

                _p.on( 'clear_init_data', function( _evt ){
                    _p._model.saveSelectItems().remove();
                });

            }

        , _inited:
            function(){
                //JC.log( 'CRMSchedule _inited', new Date().getTime() );
                this.trigger( 'inited' );
            }
        /**
         * 更新数据
         * @method  update
         * @param   {json}  _data
         */
        , update:
            function( _data ){
                var _p = this;
                _p.trigger( 'clear_init_data' );
                _p.trigger( 'update_layout', [ _data, null, true ] );
                return this;
            }
    });

    CRMSchedule.Model._instanceName = 'JCCRMSchedule';
    JC.f.extendObject( CRMSchedule.Model.prototype, {
        init:
            function(){
                //JC.log( 'CRMSchedule.Model.init:', new Date().getTime() );
            }

        , initData: function(){ return this.windowProp( 'bccInitData' ); }

        , dataLabelBox: function(){ return this.selector().find( 'js_bccDataLabelBox'); }
        , dataLabelItemTpl: function(){ return JC.f.scriptContent( this.selectorProp( 'bccDataLabelItemTpl' ) ); }

        , saveSelectBox: function(){ return this.selectorProp( 'bccSaveSelectBox' ); }
        , saveSelectItems: 
            function(){ 
                return this.saveSelectBox().find( this.saveSelectItemClass() );
            }
        , saveSelectItemTpl: function(){ return JC.f.scriptContent( this.selectorProp( 'bccSaveSelectItemTpl' ) ); }
        , saveSelectItemClass: function(){ return this.attrProp( 'bccSaveSelectItemClass' ); }
        , saveValueSelector:
            function( _id ){
                var _p = this
                    , _r = _p.saveSelectBox().find( JC.f.printf( '{0}[data-id={1}]', _p.saveSelectItemClass(), _id ) )
                    ;

                if( !_r.length ){
                    _r = $( JC.f.printf( _p.saveSelectItemTpl(), _id ) );
                    _r.appendTo( _p.saveSelectBox() );
                }

                return _r;
            }
        , addSelectValue:
            function( _idList, _dateList ){
                var _p = this
                    , _id, _date
                    ;
                _idList = _idList.replace( /[\s]+/g, '' );
                _dateList = _dateList.replace( /[\s]+/g, '' );

                if( !( _idList && _dateList ) ) return;

                _id = _idList.split( ',' );
                _date = _dateList.split( ',' );
                
                $.each( _id, function( _ix, _idItem ){
                    var _selector = _p.saveValueSelector( _idItem )
                        , _items = _selector.val().replace( /[\s]+/g, '' )
                        , _newItemObj = {}
                        ;
                    _items = _items ? _items.split( ',' ) : [];

                    $.each( _date, function( _dateIx, _dateItem ){
                        if( _items.indexOf( _dateItem ) < 0 ){
                            _newItemObj[ _dateItem ] = _dateItem;
                        }
                    });
                    for( var k in _newItemObj ) _items.push( k );

                    _selector.val( _items.join(',') );
                });
            }
        , removeSelectValue:
            function( _idList, _dateList ){
                var _p = this
                    , _id, _date
                    ;
                _idList = _idList.replace( /[\s]+/g, '' );
                _dateList = _dateList.replace( /[\s]+/g, '' );

                if( !( _idList && _dateList ) ) return;

                _id = _idList.split( ',' );
                _date = _dateList.split( ',' );
                
                $.each( _id, function( _ix, _idItem ){
                    var _selector = _p.saveValueSelector( _idItem )
                        , _items = _selector.val().replace( /[\s]+/g, '' )
                        , _newItemObj = {}
                        , _itemIx
                        ;
                    _items = _items ? _items.split( ',' ) : [];

                    $.each( _date, function( _dateIx, _dateItem ){
                        if( ( _itemIx = _items.indexOf( _dateItem ) ) > -1 ){
                            _items.splice( _itemIx, 1 );
                        }
                    });

                    _selector.val( _items.join(',') );
                    !_selector.val() && _selector.remove();
                });
            }


        , tpl: function(){ return JC.f.scriptContent( this.selectorProp( 'bccTpl' ) ); }
        , rowTpl: function(){ return JC.f.scriptContent( this.selectorProp( 'bccRowTpl' ) ); }
        , dateNavTpl: function(){ return JC.f.scriptContent( this.selectorProp( 'bccDateNavTpl' ) ); }
        , popupTpl: function(){ return JC.f.scriptContent( this.selectorProp( 'bccPopupTpl' ) ); }
        , popupCalendarTpl: function(){ return JC.f.scriptContent( this.selectorProp( 'bccPopupCalendarTpl' ) ); }

        , idList:
            function(){
                var _p = this, _r = [];

                _p.selector().find( 'td.js_pos_3' ).each( function( _ix, _item ){
                    _r.push( $( _item ).attr( 'data-id' ) );
                });

                return _r;
            }

        , dateObj:
            function( _d, _displayDate ){
                var _p = this, _r = {}, _sdate, _edate, _cdate = new Date(), _yearSpan = 50;

                if( _p.actionType() == 'edit' ){
                    _sdate = new Date();
                    _sdate.setDate( 1 );

                    _edate = JC.f.cloneDate( _sdate );
                    _edate.setMonth( _edate.getMonth() + 4 );
                    _edate.setDate( 0 );

                    _cdate = JC.f.cloneDate( _sdate );

                }else{
                    if( _d.start_date ){
                        _sdate = CRMSchedule.parseDate( _d.start_date );
                        if( !_displayDate ){ _displayDate = _sdate; }
                    }else{
                        _sdate = new Date();
                        _sdate.setFullYear( _sdate.getFullYear() - _yearSpan );
                    }

                    if( _d.end_date ){
                        _edate = CRMSchedule.parseDate( _d.end_date );
                        if( !_displayDate ){ _displayDate = _edate; }
                    }else{
                        _edate = new Date();
                        _edate.setFullYear( _edate.getFullYear() + _yearSpan );
                    }
                }


                if( !_displayDate ){ _displayDate = _cdate; }
                return { "sdate": _sdate, "edate": _edate, "displayDate": _displayDate };
            }

        , currentDate: 
            function( _setter ){
                typeof _setter != 'undefined' && ( this._currentDate = _setter );
                return this._currentDate;
            }

        , initDate:
            function( _setter ){
                typeof _setter != 'undefined' && ( this._initDate = _setter );
                return this._initDate;
            }

        , actionType: function(){ return this.stringProp( 'bccActionType' ); }

        , lockupDateUrl: function(){ return this.attrProp( 'bccLockupDateUrl' ); }
        , unlockDateUrl: function(){ return this.attrProp( 'bccUnlockDateUrl' ); }

        , lockupIdUrl: function(){ return this.attrProp( 'bccLockupIdUrl' ); }
        , unlockIdUrl: function(){ return this.attrProp( 'bccUnlockIdUrl' ); }

        , monthDataUrl: function(){ return this.attrProp( 'bccMonthDataUrl' ); }

        , dateRangeUrl: function(){ return this.attrProp( 'bccDateRangeUrl' ); }
        
    });

    JC.f.extendObject( CRMSchedule.View.prototype, {
        init:
            function(){
                //JC.log( 'CRMSchedule.View.init:', new Date().getTime() );
            }

        , update: 
            function( _d, _displayDate, _isReady ){
                var _p = this
                    , _tpl = _p._model.tpl()
                    ;

                _d.display_date && ( _displayDate = CRMSchedule.parseDate( _d.display_date ) );

                var _dateObj = _p._model.dateObj( _d, _displayDate )

                _isReady && ( _p._model.initDate( _dateObj ) );

                var _maxDay = JC.f.maxDayOfMonth( _dateObj.displayDate )
                    , _dateHtml = _p.dateHtml( _d, _dateObj )
                    , _headerHtml = _p.headerHtml( _d, _dateObj )
                    , _rowHtml = _p.rowHtml( _d, _dateObj )
                    ;

                _p._model.currentDate( _dateObj.displayDate );

                /*
                JC.log( JC.f.formatISODate( _dateObj.sdate )
                    , JC.f.formatISODate( _dateObj.edate )
                    , JC.f.formatISODate( _dateObj.displayDate )
                    , _maxDay
                    );
                */

                _tpl = JC.f.printf( _tpl, 32, _dateHtml, _headerHtml.week, _headerHtml.date, _rowHtml  );

                _p._model.selector().html( _tpl );
                _p.trigger( 'layout_inited' );
            }

        , dateHtml:
            function( _d, _dateObj ){
                var _p = this, _r = _p._model.dateNavTpl();
                if( /js_bccYearSelect/.test( _r ) ){
                    _r = _p.dateHtmlControl( _d, _dateObj, _r );
                }else{
                    _r = _p.dateHtmlLabel( _d, _dateObj, _r );
                }
                return _r;
            }

        , dateHtmlControl:
            function( _d, _dateObj, _r ){
                var _syear = _dateObj.sdate.getFullYear()
                    , _eyear = _dateObj.edate.getFullYear()
                    , _cyear = _dateObj.displayDate.getFullYear()
                    , _cmonth = _dateObj.displayDate.getMonth()
                    , _yearHtml = []
                    , _monthHtml = []
                    , _tmp

                    , _mintime = JC.f.cloneDate( _dateObj.sdate ).setDate( 1 )
                    , _maxtime = JC.f.cloneDate( _dateObj.edate ).setDate( 1 )
                    ;
                for( ; _syear <= _eyear; _syear++ ){
                    _tmp = '';
                    _syear == _cyear && ( _tmp = 'selected="selected"' );
                    _yearHtml.push( JC.f.printf( '<option value="{0}" {1}>{0}年</option>', _syear, _tmp ) );
                }

                for( var i = 0; i < 12; i++ ){
                    var _nowDate = new Date( _cyear, i, 1 );
                    if( _nowDate.getTime() < _mintime || _nowDate.getTime() > _maxtime ) continue;
                    _tmp = '';
                    i == _cmonth && ( _tmp = 'selected="selected"' );
                    _monthHtml.push( JC.f.printf( '<option value="{0}" {2}>{1}月</option>', i, i + 1, _tmp ) );
                }

                _r = JC.f.printf( _r, _yearHtml.join(''), _monthHtml.join('') );

                return _r;
            }

        , dateHtmlLabel:
            function( _d, _dateObj, _r ){
                var _p = this;
                var _itemTpl = _p._model.dataLabelItemTpl()
                    , _html = []
                    , _initDate = _p._model.initDate()
                    , _currentMonth = _dateObj.displayDate.getMonth()
                    , _tmpDate = JC.f.cloneDate( _initDate.sdate )
                    ;

                for( var i = 0; i < 4; i++ ){
                    var _currentClass = '';
                    if( _tmpDate.getMonth() === _currentMonth ){
                        _currentClass = 'js_bccCurrentDataLabelItem';
                    }
                    _html.push( JC.f.printf( _itemTpl
                            , JC.f.dateFormat( _tmpDate, 'YY-MM' )
                            , JC.f.dateFormat( _tmpDate, 'YY年 MM月' )
                            , _currentClass
                            )
                    );
                    _tmpDate.setMonth( _tmpDate.getMonth() + 1 );
                }

                _r = JC.f.printf( _r, _html.join( '' ) );
               
                return _r;
            }

        , rowHtml:
            function( _d, _dateObj ){
                var _p = this, _r = []
                    , _date = _dateObj.displayDate
                    , _maxDay = JC.f.maxDayOfMonth( _date )
                    , _tpl = _p._model.rowTpl()
                    , _tmpTpl
                    , _ckAll = ''
                    ;


                for( var i = 0, j = _d.list_data.length; i < j; i++ ){
                    var _item = _d.list_data[ i ]
                        , _parent1 = '', _parent2 = ''
                        , _parent1_id = '', _parent2_id = ''
                        , _days = []
                        , _ckAll = ''
                        , _hasCanSelect
                        , _hasLocked
                        ;

                    if( _item.parent ){
                        _item.parent[0] 
                            && ( _parent1 = _item.parent[0].name, _parent1_id = _item.parent[0].id );

                        _item.parent[1] 
                            && ( _parent2 = _item.parent[1].name, _parent2_id = _item.parent[1].id );
                    }

                    for( var k = 1; k <= 31; k++ ){
                        var _posDate = new Date( _date.getFullYear(), _date.getMonth(), k )
                            , _sPosDate = JC.f.formatISODate( _posDate )
                            , _status = 0
                            , _name = ''
                            , _shortName = ''
                            , _class
                            , _styleClass = ''
                            ;

                        k === 31 && ( _styleClass = "js_bccDataRowLastCell" );

                        if( k > _maxDay ){
                            _days.push( JC.f.printf( '<td class="js_bccDateItem xnocursor {0}"><div>&nbsp;</div></td>', _styleClass ) );
                            break;
                        }

                        if( _sPosDate in _item.position_date ){
                            _status = _item.position_date[ _sPosDate ].status;
                            _name = _item.position_date[ _sPosDate ].company || '';
                            _shortName = byteString( _name, 6 );

                            bytelen( _name ) > 6 && ( _shortName += '...' );
                        }

                        _class = CRMSchedule.STATUS_CODE_MAP[ _status ] || 0;

                        _status == CRMSchedule.STATUS_CAN_SELECT && ( _hasCanSelect = true );
                        _status == CRMSchedule.STATUS_LOCKED && ( _hasLocked = true );

                        _days.push( JC.f.printf( '<td class="js_bccDateItem {0} {5} js_bccDateCol_{6}" title="{3}\n{1}" ' 
                                    +' data-id="{2}" data-date="{3}" data-colCount="{6}">' 
                                    +'<div>{4}</div></td>'
                                    , _class, _name, _item.id, _sPosDate, _shortName, _styleClass, k ) );
                    }

                    if( _p._model.actionType() == 'lock' || _p._model.actionType() == 'edit' ){
                        _ckAll = '<div><input type="checkbox" class="js_bccCkAll" data-id="{0}" style="display:none" /></div>';
                    }
                    _ckAll = JC.f.printf( _ckAll, _item.id );

                    _tmpTpl = JC.f.printf( _tpl
                                            , _parent1, _parent2
                                            , _item.name, _days.join('') 
                                            , _parent1_id, _parent2_id
                                            , _item.id
                                            , _ckAll, i
                                        );

                    _r.push( _tmpTpl );
                }

                return _r.join('');
            }

        , headerHtml:
            function( _d, _dateObj ){
                var _p = this, _r = { week: [], date: [] }
                    , _date = _dateObj.displayDate
                    , _maxDay = JC.f.maxDayOfMonth( _date )
                    , _tmp
                    ;

                for( var i = 0; i < 31; i++ ){
                    var _cur = i + 1;
                    if( _cur > _maxDay ){
                        _r.week.push( JC.f.printf( '<th class="js_bccWeekLabel"></th>' ) );
                        _r.date.push( JC.f.printf( '<th class="js_bccDateLabel xnocursor"></th>', i + 1 ) );
                        break;
                    }
                    _date.setDate( _cur );
                    _r.week.push( JC.f.printf( '<th class="js_bccWeekLabel" data-date="{1}" data-day="{2}">{0}</th>'
                                , CRMSchedule.WEEK_SCH[ _date.getDay() ], JC.f.formatISODate( _date ), _date.getDay()  ) );
                    _r.date.push( JC.f.printf( '<th class="js_bccDateLabel js_bccDateCol_{2}" data-date="{1}" data-colCount="{2}">{0}</th>'
                                , _cur, JC.f.formatISODate( _date ), i + 1 ) );
                }

                _r.date = _r.date.join('');
                _r.week = _r.week.join('');

                return _r;
            }

    });

    CRMSchedule.WEEK_SCH = ['日', '一', '二', '三', '四', '五', '六' ];

    CRMSchedule.monthCompare =
        function( _d1, _d2 ){
            var _r;
            if( _d1.getFullYear() == _d2.getFullYear() ){
                if( _d1.getMonth() == _d2.getMonth() ){
                    _r = 0;
                }else if( _d1.getMonth() > _d2.getMonth() ){
                    _r = 1;
                }else if( _d1.getMonth() < _d2.getMonth() ){
                    _r = -1;
                }
            }else if( _d1.getFullYear() > _d2.getFullYear() ){
                _r = 1;
            }else if( _d1.getFullYear() < _d2.getFullYear() ){
                _r = -1;
            }

            return _r;
        };

    CRMSchedule.yearMonthString =
        function( _d ){
            return JC.f.dateFormat( _d, 'YY-MM' );
        };

    CRMSchedule.parseDate =
        function( _s ){
            var _r, _y, _m, _d;

            _s = _s.replace( /[^\d]+/g, '' );

            _y = _s.slice( 0, 4 );
            _m = parseInt( _s.slice( 4, 6 ) ) - 1;
            _d = _s.slice( 6 );

            _d = _d || 1;

            _r = new Date(  _y, _m, _d );

            return _r;
        };

    function byteString( _s, _len ){
        var _r = [], _count = 0, _char;
        for( var i = 0, j = _s.length; i < j; i++ ){
            _char = _s.charAt( i );
            _count += bytelen( _char );
            if( _count > _len ) break;
            _r.push ( _char );
        }
        return _r.join('');
    }

    function bytelen( _s ){
        return _s.replace(/[^\x00-\xff]/g,"11").length;
    }

    _jdoc.ready( function(){
        JC.f.safeTimeout( function(){
            CRMSchedule.autoInit && CRMSchedule.init();
        }, null, 'CRMSchedule_READY_INIT', 1 );
    });

    return Bizs.CRMSchedule;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
