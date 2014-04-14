;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC', 'JC.Panel' ], function(){
/**
 * 组件用途简述
 *
 *<p><b>require</b>:
 *   <a href="widnow.jQuery.html">jQuery</a>
 *   , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 *</p>
 *
 *<p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *   | <a href='http://jc2.openjavascript.org/docs_api/classes/Bizs.CRMSchedule.html' target='_blank'>API docs</a>
 *   | <a href='../../modules/Bizs.CRMSchedule/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *<h2>页面只要引用本脚本, 默认会自动处理 div class="js_bizCRMSchedule" </h2>
 *
 *<h2>可用的 HTML attribute</h2>
 *
 *<dl>
 *    <dt></dt>
 *    <dd><dd>
 *</dl> 
 *
 * @namespace   window.Bizs
 * @class       CRMSchedule
 * @extends     JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2013-12-13
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
        <h2>Bizs.CRMSchedule 示例</h2>
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
    CRMSchedule.STATUS_CODE_MAP = {
        '0'     : 'js_pos_canSelect'
        , '1'   : 'js_pos_ordered'
        , '2'   : 'js_pos_preOnline'
        , '3'   : 'js_pos_online'
        , '4'   : 'js_pos_notOnline'
        , '5'   : 'js_pos_locked'
        , '999' : 'js_pos_selected'
    };

    CRMSchedule.CLASS_CAN_SELECT    = 'js_pos_canSelect';
    CRMSchedule.CLASS_ORDERED       = 'js_pos_ordered';
    CRMSchedule.CLASS_PRE_ONLINE    = 'js_pos_preOnline';
    CRMSchedule.CLASS_ONLINE        = 'js_pos_online';
    CRMSchedule.CLASS_NOT_ONLINE    = 'js_pos_notOnline';
    CRMSchedule.CLASS_LOCKED        = 'js_pos_locked';
    CRMSchedule.CLASS_SELECTED      = 'js_pos_selected';

    CRMSchedule.STATUS_CAN_SELECT   = '0';
    CRMSchedule.STATUS_ORDERED      = '1';
    CRMSchedule.STATUS_PRE_ONLINE   = '2';
    CRMSchedule.STATUS_ONLINE       = '3';
    CRMSchedule.STATUS_NOT_ONLINE   = '4';
    CRMSchedule.STATUS_LOCKED       = '4';
    CRMSchedule.STATUS_SELECTED     = '999';

    CRMSchedule.CLASS_MAP = {
        'js_pos_canSelect'          : '0'
        , 'js_pos_ordered'          : '1'
        , 'js_pos_preOnline'        : '2'
        , 'js_pos_online'           : '3'
        , 'js_pos_notOnline'        : '4'
        , 'js_pos_locked'           : '5'
        , 'js_pos_selected'         : '999'
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
                JC.log( 'CRMSchedule _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this;

                if( !_p._model.initData() ) return;

                _p.on( 'inited', function(){
                    _p.trigger( 'update', [ _p._model.initData(), null, true ] );
                    _p.trigger( 'init_date_nav' );
                });

                _p.on( 'update', function( _evt, _d, _displayDate, _isReady ){
                    JC.dir( _d );
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
                    case 'lock': _p._lockHandler(); break;
                }

                _p.on( 'init_date_nav', function( _evt ){
                    _p._init_date_control();
                    _p._init_date_label();
                });

                _p.on( 'get_data', function( _evt, _date ){
                    JC.log( 'get_data', CRMSchedule.yearMonthString( _date ) );
                    var _idList = _p._model.idList(), _url = _p._model.monthDataUrl();

                    JC.log( '_idList:', _idList, _url );

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

                                _p.trigger( 'update', [ _data.data, _date ] );
                            }
                        });

                    }, _p, 'GET_DATA', 200 );
                });

                _p.on( 'clear_data', function( _evt ){
                    _p.selector().find( 'tr.js_bccDataRow' ).remove();
                });

            }

        , _init_date_control:
            function(){
                var _p = this
                    , js_bccYearSelect = _p.selector().find( 'select.js_bccYearSelect' )
                    , js_bccMonthSelect = _p.selector().find( 'select.js_bccMonthSelect' )
                    ;

                if( !( js_bccYearSelect.length && js_bccYearSelect.length ) ) return;

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

                _p.selector().delegate( 'button.js_bccPrevYear', 'click', function( _evt ){
                    var js_bccYearSelect = _p.selector().find( 'select.js_bccYearSelect' )
                        , js_bccMonthSelect = _p.selector().find( 'select.js_bccMonthSelect' )
                        ;
                    var _sp = $( this )
                        , _date = new Date( js_bccYearSelect.val(), js_bccMonthSelect.val(), 1 )
                        , _newDate = JC.f.cloneDate( _date )
                        , _mindate = _p._model.initDate().sdate
                        ;
                    _newDate.setFullYear( _newDate.getFullYear() - 1 );

                    if( CRMSchedule.monthCompare( _p._model.currentDate(), _mindate ) === 0 ) return;

                    if( CRMSchedule.monthCompare( _newDate, _mindate ) > -1 ){
                        _p.trigger( 'update_date_control', _newDate );
                        _p.trigger( 'get_data', [ _newDate ] );
                    }
                });

                _p.selector().delegate( 'button.js_bccNextYear', 'click', function( _evt ){
                    var js_bccYearSelect = _p.selector().find( 'select.js_bccYearSelect' )
                        , js_bccMonthSelect = _p.selector().find( 'select.js_bccMonthSelect' )
                        ;
                    var _sp = $( this )
                        , _date = new Date( js_bccYearSelect.val(), js_bccMonthSelect.val(), 1 )
                        , _newDate = JC.f.cloneDate( _date )
                        , _maxdate = _p._model.initDate().edate
                        ;
                    _newDate.setFullYear( _newDate.getFullYear() + 1 );

                    if( CRMSchedule.monthCompare( _p._model.currentDate(), _maxdate ) === 0 ) return;

                    if( CRMSchedule.monthCompare( _newDate, _maxdate ) < 1 ){
                        _p.trigger( 'update_date_control', _newDate );
                        _p.trigger( 'get_data', [ _newDate ] );
                    }
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
            }

        , _lockHandler:
            function(){
                var _p = this;

                _p.selector().delegate( 'td.js_pos_canSelect', 'click', function( _evt ){
                    var _sp = $( this ), _id = _sp.attr( 'data-id' ), _date = _sp.attr( 'data-date' );
                        _p.trigger( 'lockup', [ _id, _date, _sp ] );
                });

                _p.selector().delegate( 'td.js_pos_locked', 'click', function( _evt ){
                    var _sp = $( this ), _id = _sp.attr( 'data-id' ), _date = _sp.attr( 'data-date' );
                        _p.trigger( 'unlock', [ _id, _date, _sp ] );
                });

                _p.on( 'lockup', function( _evt, _id, _date, _sp ){
                    JC.f.safeTimeout( function(){
                        JC.log( 'lockup', _id, _date, JC.f.ts() );
                        var _url = JC.f.printf( _p._model.lockupUrl(), _id, _date )
                            , _msg, _status;

                        $.get( _url ).done( function( _d ){
                            var _data = $.parseJSON( _d );
                            if( _data && !_data.errorno ){
                                _msg = '锁定成功!';
                                _data.errmsg && ( _msg = _data.errmsg );
                                _status = 0;

                                _sp 
                                    && _sp.removeClass( CRMSchedule.ALL_CLASS )
                                    && _sp.addClass( CRMSchedule.CLASS_LOCKED )
                                    ;
                            }else{
                                _msg = '锁定失败, 请重试!';
                                _data && _data.errmsg && ( _msg = _data.errmsg );
                                _status = 1;
                            }
                            _p.trigger( 'show_msg', [ _msg, _sp, _status ] );
                        });
                    }, _sp, 'LOCK_ITEM', 200 );
                });

                _p.on( 'unlock', function( _evt, _id, _date, _sp ){
                    JC.f.safeTimeout( function(){
                        JC.log( 'unlock', _id, _date, JC.f.ts() );
                        var _url = JC.f.printf( _p._model.unlockUrl(), _id, _date )
                            , _msg, _status;

                        $.get( _url ).done( function( _d ){
                            var _data = $.parseJSON( _d );
                            if( _data && !_data.errorno ){
                                _msg = '解锁成功!';
                                _data.errmsg && ( _msg = _data.errmsg );
                                _status = 0;

                                _sp 
                                    && _sp.removeClass( CRMSchedule.ALL_CLASS )
                                    && _sp.addClass( CRMSchedule.CLASS_CAN_SELECT )
                                    ;
                            }else{
                                _msg = '解锁失败, 请重试!';
                                _data && _data.errmsg && ( _msg = _data.errmsg );
                                _status = 1;
                            }
                            _p.trigger( 'show_msg', [ _msg, _sp, _status ] );
                        });

                    }, _sp, 'LOCK_ITEM', 200 );
                });
            }

        , _selecteHandler:
            function(){
                var _p = this;
            }

        , _inited:
            function(){
                JC.log( 'CRMSchedule _inited', new Date().getTime() );
                this.trigger( 'inited' );
            }
    });

    CRMSchedule.Model._instanceName = 'JCCRMSchedule';
    JC.f.extendObject( CRMSchedule.Model.prototype, {
        init:
            function(){
                JC.log( 'CRMSchedule.Model.init:', new Date().getTime() );
            }

        , initData: function(){ return this.windowProp( 'bccInitData' ); }

        , tpl: function(){ return JC.f.scriptContent( this.selectorProp( 'bccTpl' ) ); }
        , rowTpl: function(){ return JC.f.scriptContent( this.selectorProp( 'bccRowTpl' ) ); }
        , dateNavTpl: function(){ return JC.f.scriptContent( this.selectorProp( 'bccDateNavTpl' ) ); }

        , idList:
            function(){
                var _p = this, _r = [];

                _p.selector().find( 'input.js_bccItemId' ).each( function( _ix, _item ){
                    _r.push( $( _item ).val() );
                });

                return _r;
            }

        , dateObj:
            function( _d, _displayDate ){
                var _r = {}, _sdate, _edate, _cdate = new Date(), _yearSpan = 50;
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

        , lockupUrl: function(){ return this.attrProp( 'bccLockupUrl' ); }
        , unlockUrl: function(){ return this.attrProp( 'bccUnlockUrl' ); }

        , monthDataUrl: function(){ return this.attrProp( 'bccMonthDataUrl' ); }
        
    });

    JC.f.extendObject( CRMSchedule.View.prototype, {
        init:
            function(){
                JC.log( 'CRMSchedule.View.init:', new Date().getTime() );
            }

        , update: 
            function( _d, _displayDate, _isReady ){
                var _p = this
                    , _tpl = _p._model.tpl()
                    ;

                _d.display_date && ( _displayDate = CRMSchedule.parseDate( _d.display_date ) );

                var _dateObj = _p._model.dateObj( _d, _displayDate )
                    , _maxDay = JC.f.maxDayOfMonth( _dateObj.displayDate )
                    , _dateHtml = _p.dateHtml( _d, _dateObj )
                    , _headerHtml = _p.headerHtml( _d, _dateObj )
                    , _rowHtml = _p.rowHtml( _d, _dateObj )
                    ;

                _isReady && ( _p._model.initDate( _dateObj ) );

                _p._model.currentDate( _dateObj.displayDate );

                JC.log( JC.f.formatISODate( _dateObj.sdate )
                    , JC.f.formatISODate( _dateObj.edate )
                    , JC.f.formatISODate( _dateObj.displayDate )
                    , _maxDay
                    );

                _tpl = JC.f.printf( _tpl, 32, _dateHtml, _headerHtml.week, _headerHtml.date, _rowHtml  );

                _p._model.selector().html( _tpl );
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
                return _r;
            }

        , rowHtml:
            function( _d, _dateObj ){
                var _p = this, _r = []
                    , _date = _dateObj.displayDate
                    , _maxDay = JC.f.maxDayOfMonth( _date )
                    , _tpl = _p._model.rowTpl()
                    , _tmpTpl
                    ;

                for( var i = 0, j = _d.list_data.length; i < j; i++ ){
                    var _item = _d.list_data[ i ]
                        , _parent1 = '', _parent2 = ''
                        , _parent1_id = '', _parent2_id = ''
                        , _days = []
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
                            , _class
                            ;

                        if( k > _maxDay ){
                            _days.push( JC.f.printf( '<td class="js_bccDateItem xnocursor"></td>' ) );
                            break;
                        }

                        if( _sPosDate in _item.position_data ){
                            _status = _item.position_data[ _sPosDate ].status;
                            _name = _item.position_data[ _sPosDate ].company || '';
                        }

                        _class = CRMSchedule.STATUS_CODE_MAP[ _status ] || 0;

                        _days.push( JC.f.printf( '<td class="js_bccDateItem {0}" data-id="{2}" data-date="{3}" title="{1}">' 
                                                    +'<div>{1}</div></td>'
                                    , _class, _name, _item.id, _sPosDate ) );
                    }

                    _tmpTpl = JC.f.printf( _tpl
                                            , _parent1, _parent2
                                            , _item.name, _days.join('') 
                                            , _parent1_id, _parent2_id
                                            , _item.id
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
                        _r.date.push( JC.f.printf( '<th class="js_bccDateLabel xnocursor"></th>' ) );
                        break;
                    }
                    _date.setDate( _cur );
                    _r.week.push( JC.f.printf( '<th class="js_bccWeekLabel">{0}</th>', CRMSchedule.WEEK_SCH[ _date.getDay() ] ) );
                    _r.date.push( JC.f.printf( '<th class="js_bccDateLabel">{0}</th>', _cur ) );
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
