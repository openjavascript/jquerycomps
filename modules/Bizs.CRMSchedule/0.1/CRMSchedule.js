;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
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
        '0': 'js_pos_canSelect'
        , '1': 'js_pos_ordered'
        , '2': 'js_pos_preOnline'
        , '3': 'js_pos_online'
        , '4': 'js_pos_notOnline'
        , '5': 'js_pos_locked'
        , '999': 'js_pos_selected'
    };

    JC.BaseMVC.build( CRMSchedule );

    JC.f.extendObject( CRMSchedule.prototype, {
        _beforeInit:
            function(){
                JC.log( 'CRMSchedule _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this;

                _p.on( 'inited', function(){

                    _p.trigger( 'update', _p._model.initData() );
                });

                _p.on( 'update', function( _evt, _d ){
                    JC.dir( _d );
                    if( !_d ) return;

                    _p._view.update( _d );
                });

                _p.on( 'lockup', function( _evt, _id, _date ){
                    JC.log( 'lockup', _id, _date, JC.f.ts() );
                });

                _p.on( 'unlock', function( _evt, _id, _date ){
                    JC.log( 'unlock', _id, _date, JC.f.ts() );
                });

                switch( _p._model.actionType() ){
                    default: 
                        {
                            _p.selector().delegate( 'td.js_pos_canSelect', 'click', function( _evt ){
                                var _sp = $( this ), _id = _sp.attr( 'data-id' ), _date = _sp.attr( 'data-date' );
                                JC.f.safeTimeout( function(){
                                    _p.trigger( 'lockup', [ _id, _date ] );
                                }, _sp, 'LOCK_ITEM', 200 );
                            });

                            _p.selector().delegate( 'td.js_pos_locked', 'click', function( _evt ){
                                var _sp = $( this ), _id = _sp.attr( 'data-id' ), _date = _sp.attr( 'data-date' );
                                JC.f.safeTimeout( function(){
                                    _p.trigger( 'unlock', [ _id, _date ] );
                                }, _sp, 'LOCK_ITEM', 200 );
                            });
                            break;
                        }
                }
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

        , actionType: function(){ return this.stringProp( 'bccActionType' ); }

        , lockupUrl: function(){ return this.attrProp( 'bccLockupUrl' ); }
        , unlockUrl: function(){ return this.attrProp( 'bccUnlockUrl' ); }
        
    });

    JC.f.extendObject( CRMSchedule.View.prototype, {
        init:
            function(){
                JC.log( 'CRMSchedule.View.init:', new Date().getTime() );
            }

        , update: 
            function( _d, _displayDate ){
                var _p = this
                    , _tpl = _p._model.tpl()
                    , _dateObj = _p._model.dateObj( _d, _displayDate )
                    , _maxDay = JC.f.maxDayOfMonth( _dateObj.displayDate )
                    , _dateHtml = _p.dateHtml( _d, _dateObj )
                    , _headerHtml = _p.headerHtml( _d, _dateObj )
                    , _rowHtml = _p.rowHtml( _d, _dateObj )
                    ;

                JC.log( JC.f.formatISODate( _dateObj.sdate )
                    , JC.f.formatISODate( _dateObj.edate )
                    , JC.f.formatISODate( _dateObj.displayDate )
                    , _maxDay
                    );

                _tpl = JC.f.printf( _tpl, _maxDay + 1, _dateHtml, _headerHtml.week, _headerHtml.date, _rowHtml  );

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

                    , _mintime = _dateObj.sdate.getTime()
                    , _maxtime = _dateObj.edate.getTime()
                    ;
                for( ; _syear <= _eyear; _syear++ ){
                    _tmp = '';
                    _syear == _cyear && ( _tmp = 'selected="selected"' );
                    _yearHtml.push( JC.f.printf( '<option value="{0}" {1}>{0}年</option>', _syear, _tmp ) );
                }

                for( var i = 0; i < 12; i++ ){
                    var _nowDate = new Date( _cyear, _cmonth, 1 );
                    if( _nowDate.getTime() < _nowDate || _nowDate.getTime() > _maxtime ) continue;
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

                for( var i = 0, j = _d.pos_data.length; i < j; i++ ){
                    var _item = _d.pos_data[ i ]
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

                    for( var k = 1; k <= _maxDay; k++ ){
                        var _posDate = new Date( _date.getFullYear(), _date.getMonth(), k )
                            , _sPosDate = JC.f.formatISODate( _posDate )
                            , _status = 0
                            , _name = ''
                            , _class
                            ;

                        if( _sPosDate in _item.pos_data ){
                            _status = _item.pos_data[ _sPosDate ].status;
                            _name = _item.pos_data[ _sPosDate ].company || '';
                        }

                        _class = CRMSchedule.STATUS_CODE_MAP[ _status ] || 0;

                        _days.push( JC.f.printf( '<td class="js_bccDateItem {0}" data-id="{2}" data-date="{3}">{1}</td>'
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

                for( var i = 0; i < _maxDay; i++ ){
                    var _cur = i + 1;
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
