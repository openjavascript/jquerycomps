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
 *   | <a href='http://jc2.openjavascript.org/docs_api/classes/Bizs.CRMSchedulePopup.html' target='_blank'>API docs</a>
 *   | <a href='../../modules/Bizs.CRMSchedule/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *<h2>页面只要引用本脚本, 默认会自动处理 div class="js_bizCRMSchedulePopup" </h2>
 *
 *<h2>可用的 HTML attribute</h2>
 *
 *<dl>
 *    <dt></dt>
 *    <dd><dd>
 *</dl> 
 *
 * @namespace   window.Bizs
 * @class       CRMSchedulePopup
 * @extends     JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2013-12-13
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
        <h2>Bizs.CRMSchedulePopup 示例</h2>
 */
    var _jdoc = $( document ), _jwin = $( window );

    Bizs.CRMSchedulePopup = CRMSchedulePopup;

    function CRMSchedulePopup( _selector, _schIns ){

        CRMSchedulePopup.dispose( this );

        _selector && ( _selector = $( _selector ) );

        JC.BaseMVC.getInstance( _selector, CRMSchedulePopup, this );

        this._model = new CRMSchedulePopup.Model( _selector );
        this._model.schIns( _schIns );

        switch( this._model.schIns()._model.actionType() ){
            case 'lock': this._view = new CRMSchedulePopup.View( this._model ); break;
            case 'edit': this._view = new CRMSchedulePopup.EditView( this._model ); break;
        }

        this._init();

        JC.log( CRMSchedulePopup.Model._instanceName, 'all inited', new Date().getTime() );
    }

    CRMSchedulePopup.dispose =
        function( _setter ){
            if( CRMSchedulePopup.INS ){
                CRMSchedulePopup.INS.dispose();
                CRMSchedulePopup.INS = null;
            }
            _setter && ( CRMSchedulePopup.INS = _setter );
        };

    JC.BaseMVC.build( CRMSchedulePopup );

    JC.f.extendObject( CRMSchedulePopup.prototype, {
        _beforeInit:
            function(){
                //JC.log( 'CRMSchedulePopup _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this;

                _p.on( 'inited', function(){
                    _p._view.show();

                    _p.trigger( 'ready' );
                });

                _p.on( 'ready', function(){
                    _p._model.prevBtn().on( 'click', function( _evt ){
                        JC.log( 'prev', JC.f.ts() );
                        _p._model.currentDate().setMonth( _p._model.currentDate().getMonth() - 4 );
                        _p._view.updateDate( _p._model.currentDate() );
                    });

                    _p._model.nextBtn().on( 'click', function( _evt ){
                        JC.log( 'next', JC.f.ts() );
                        _p._model.currentDate().setMonth( _p._model.currentDate().getMonth() + 4 );
                        _p._view.updateDate( _p._model.currentDate() );
                    });

                    _p.on( 'clear_data', function(){
                        _p._model.panelIns().find( 'div.js_bccPopupDateItem' ).remove();
                    });
                });

                _p.on( 'update_status', function( _evt ){
                    _p.trigger( 'update_nav_status', _p._model.currentDate() );
                });

                _p.on( 'update_nav_status', function( _evt, _startDate ){

                    if( _p._model.schIns()._model.actionType() == 'edit' ) return;

                    var _endDate = JC.f.cloneDate( _startDate )
                        ;
                    _endDate.setMonth( _endDate.getMonth() + 3 );
                    _endDate.setDate( JC.f.maxDayOfMonth( _endDate ) );

                    if( _startDate.getTime() < _p._model.mindate().getTime() ){
                        _p._model.prevBtn().hide();
                    }else{
                        _p._model.prevBtn().show();
                    }

                    if( _endDate.getTime() > _p._model.maxdate().getTime() ){
                        _p._model.nextBtn().hide();
                    }else{
                        _p._model.nextBtn().show();
                    }

                    JC.log( 
                        JC.f.dateFormat( _startDate )
                        , JC.f.dateFormat( _endDate )
                        , JC.f.dateFormat( _p._model.mindate() )
                        , JC.f.dateFormat( _p._model.maxdate() )
                    );

                });

            }

        , _inited:
            function(){
                //JC.log( 'CRMSchedulePopup _inited', new Date().getTime() );
                this.trigger( 'inited' );
            }

        , dispose:
            function(){
                this._view && this._view.dispose();
            }
    });

    CRMSchedulePopup.Model._instanceName = 'JCCRMSchedulePopup';
    JC.f.extendObject( CRMSchedulePopup.Model.prototype, {
        init:
            function(){
                //JC.log( 'CRMSchedulePopup.Model.init:', new Date().getTime() );
                this.row( JC.f.getJqParent( this.selector(), 'tr' ) );
            }

        , schIns: function( _setter ){ typeof _setter != 'undefined' && ( this._schIns = _setter ); return this._schIns; }

        , panelIns: function( _setter ){ typeof _setter != 'undefined' && ( this._panelIns = _setter ); return this._panelIns; }

        , row: function( _setter ){ typeof _setter != 'undefined' && ( this._row = _setter ); return this._row; }

        , currentDate: 
            function( _setter ){ 
                typeof _setter != 'undefined' && ( this._currentDate= _setter, this._currentDate.setDate( 1 ) ); 
                return this._currentDate; 
            }

        , mindate: function(){ return this.schIns()._model.initDate().sdate; }
        , maxdate: function(){ return this.schIns()._model.initDate().edate; }

        , prevBtn: function(){ return this.panelIns().find( '.js_bccPopupPrev' ); }
        , nextBtn: function(){ return this.panelIns().find( '.js_bccPopupNext' ); }

        , dateBox: function(){ return this.panelIns().find( 'div.js_bccPopupDateBox' ); }

        , pos1Data:
            function(){
                var _p = this
                    , _td = _p.row().find( 'td.js_pos_1' )
                    , _id = _td.attr( 'data-id' )
                    , _label = _td.attr( 'data-label' )
                    ;

                return { id: _id, label: _label };
            }

        , pos2Data:
            function(){
                var _p = this
                    , _td = _p.row().find( 'td.js_pos_2' )
                    , _id = _td.attr( 'data-id' )
                    , _label = _td.attr( 'data-label' )
                    ;

                return { id: _id, label: _label };
            }

        , pos3Data:
            function(){
                var _p = this
                    , _td = _p.row().find( 'td.js_pos_3' )
                    , _id = _td.attr( 'data-id' )
                    , _label = _td.attr( 'data-label' )
                    ;

                return { id: _id, label: _label };
            }

    });

    JC.f.extendObject( CRMSchedulePopup.View.prototype, {
        init:
            function(){
                JC.log( 'CRMSchedulePopup.View.init:', new Date().getTime() );
            }

        , show:
            function(){
                var _p = this
                    , _tpl = _p._model.schIns()._model.popupTpl()
                    , _ctpl = _p._model.schIns()._model.popupCalendarTpl()
                    , _selector
                    , _schIns = _p._model.schIns(), _panelIns
                    , _currentDate = _p._model.currentDate( JC.f.cloneDate( _schIns._model.currentDate() ) )
                    //, _currentDate = _p._model.currentDate( new Date( 2011, 1, 1 ) )
                    , _calendarHtml = _p.calendarHtml( _ctpl, _currentDate )
                    ;

                _tpl = JC.f.printf( _tpl 
                    , _p._model.pos1Data().label
                    , _p._model.pos2Data().label
                    , _p._model.pos3Data().label
                    , _calendarHtml
                );

                _selector = $( _tpl );
                _panelIns = _p._model.panelIns( JC.Dialog( _selector ) );

                _p.trigger( 'update_status' );
            }

        , calendarHtml:
            function( _ctpl, _date ){
                var _r = [];
                _date = JC.f.cloneDate( _date );

                for( var i = 0, j = 4, _tpl, _dates; i < j; i++ ){
                    _dates = JC.f.dateFormat( _date, 'YY年 MM月' );

                    _tpl = JC.f.printf( _ctpl, _dates, this.calendarRowHtml( _date ) );
                    _r.push( _tpl );
                    _date.setMonth( _date.getMonth() + 1 );
                }

                return _r.join('');
            }

        , calendarRowHtml:
            function( _date ){
                _date = JC.f.cloneDate( _date );

                var _r = []
                    , _count = 1
                    , _dayCount = 1
                    , _rowLen = 4
                    , _startDay = new Date( _date.getFullYear(), _date.getMonth(), 1 ).getDay()
                    , _maxDay = JC.f.maxDayOfMonth( _date )
                    ;

                !_startDay && ( _startDay = 7 );
                _startDay--;

                for( var i = 0; i <= _rowLen; i++ ){
                    _r.push( '<tr>');
                    for( var j = 0; j < 7; j++ ){
                        _r.push( '<td>' );

                        if( _count > _startDay ){
                            if( _dayCount <= _maxDay ){
                                _r.push( _dayCount++ );
                            }else{
                            }
                        }else{
                        }

                        _r.push( '</td>' );

                        _count++;
                    }

                    if( i == _rowLen && _dayCount <= _maxDay ){
                        _rowLen++;
                    }
                    _r.push( '</tr>' );
                }

                return _r.join('');
            }

        , dispose:
            function(){
                this._model.panelIns() && this._model.panelIns().layout().remove();
            }

        , updateDate:
            function( _currentDate ){
                var _p = this
                    , _ctpl = _p._model.schIns()._model.popupCalendarTpl()
                    , _calendarHtml = _p.calendarHtml( _ctpl, _currentDate )
                    ;

                _p.trigger( 'clear_data' );
                $( _calendarHtml ).appendTo( _p._model.dateBox() );

                _p.trigger( 'update_nav_status', [ _currentDate ] );
            }
    });

    CRMSchedulePopup.EditView = 
        function( _model ){
            this._model = _model;
        };

    JC.f.extendObject( CRMSchedulePopup.EditView.prototype, {
        init:
            function(){
                JC.log( 'CRMSchedulePopup.EditView.init:', new Date().getTime() );
            }
    });


    return Bizs.CRMSchedulePopup;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
