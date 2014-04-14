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
                        //JC.log( 'prev', JC.f.ts() );
                        _p._model.currentDate().setMonth( _p._model.currentDate().getMonth() - 4 );
                        _p._view.updateDate( _p._model.currentDate() );
                    });

                    _p._model.nextBtn().on( 'click', function( _evt ){
                        //JC.log( 'next', JC.f.ts() );
                        _p._model.currentDate().setMonth( _p._model.currentDate().getMonth() + 4 );
                        _p._view.updateDate( _p._model.currentDate() );
                    });

                    _p.on( 'clear_data', function(){
                        _p._model.panelIns().find( 'div.js_bccPopupDateItem' ).remove();
                    });
                });

                _p.on( 'update_status', function( _evt, _currentDate ){
                    _p.trigger( 'update_nav_status', _currentDate );
                    _p.trigger( 'get_data', _currentDate );
                });

                _p.on( 'get_data', function( _evt, _currentDate ){
                    var _startDate = _p._model.startDate( _currentDate ) 
                        , _endDate = _p._model.endDate( _currentDate ) 
                        , _url = JC.f.printf( 
                                _p._model.schIns()._model.dateRangeUrl()
                                , _p._model.id()
                                , JC.f.formatISODate( _startDate )
                                , JC.f.formatISODate( _endDate )
                            )
                        ;

                    //JC.log( JC.f.formatISODate( _startDate ), JC.f.formatISODate( _endDate ), _url );
                    JC.f.safeTimeout( function(){
                        $.get( _url ).done( function( _d ){
                            var _data = $.parseJSON( _d );
                            //JC.dir( _data );
                            _p.trigger( 'update_data', [ _data, _startDate, _endDate ] );
                        });
                    }, null, 'UPDATE_CRMSCHDULE_POPUP', 200 );
                });

                _p.on( 'update_data', function( _evt, _data, _startDate, _endDate ){
                    if( !( _startDate && _endDate ) ) return;
                    _startDate = JC.f.cloneDate( _startDate );
                    if( _data && !_data.errorno ){
                        var _item, _dates;
                        _data 
                            && _data.data 
                            && _data.data.list_data
                            && _data.data.list_data[0]
                            && ( _item = _data.data.list_data[0] );

                        if( !_item ) return;

                        while( _startDate.getTime() < _endDate ){
                            _dates = JC.f.formatISODate( _startDate );
                            var _status = 0
                                , _name = ''
                                , _selector = JC.f.printf( 'td.js_bccDateItem[data-id={0}][data-date={1}]'
                                                , _item.id
                                                , _dates
                                            )
                                ;
                            //JC.log( _selector );

                            _selector = _p._model.panelIns().find( _selector );
                            if( _selector.length ){
                                if( _dates in _item.position_date ){
                                    _status = _item.position_date[ _dates ].status;
                                    _name = _item.position_date[ _dates ].company;
                                }
                                _selector.attr( 'title', _name );
                                _selector.addClass( Bizs.CRMSchedule.STATUS_CODE_MAP[ _status ] );
                            }

                            _startDate.setDate( _startDate.getDate() + 1 );
                        }
                    }
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

                    /*
                    JC.log( 
                        JC.f.dateFormat( _startDate )
                        , JC.f.dateFormat( _endDate )
                        , JC.f.dateFormat( _p._model.mindate() )
                        , JC.f.dateFormat( _p._model.maxdate() )
                    );
                    */

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
                this.id( this.selector().attr( 'data-id' ) );
            }

        , row: function( _setter ){ typeof _setter != 'undefined' && ( this._row = _setter ); return this._row; }
        , id: function( _setter ){ typeof _setter != 'undefined' && ( this._id = _setter ); return this._id; }

        , startDate:
            function( _date ){
                _date = JC.f.cloneDate( _date );

                if( _date.getTime() < this.mindate().getTime() ){
                    _date = JC.f.cloneDate( this.mindate() );
                }

                return _date;
            }

        , endDate:
            function( _date ){
                _date = JC.f.cloneDate( _date );
                _date.setDate( 1 );
                _date.setMonth( _date.getMonth() + 4 );
                _date.setDate( 0 );

                if( _date.getTime() > this.maxdate().getTime() ){
                    _date = JC.f.cloneDate( this.maxdate() );
                }

                return _date;
            }


        , mindate: function(){ return this.schIns()._model.initDate().sdate; }
        , maxdate: function(){ return this.schIns()._model.initDate().edate; }

        , schIns: function( _setter ){ typeof _setter != 'undefined' && ( this._schIns = _setter ); return this._schIns; }

        , panelIns: function( _setter ){ typeof _setter != 'undefined' && ( this._panelIns = _setter ); return this._panelIns; }

        , currentDate: 
            function( _setter ){ 
                typeof _setter != 'undefined' && ( this._currentDate= _setter, this._currentDate.setDate( 1 ) ); 
                return this._currentDate; 
            }

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
                //JC.log( 'CRMSchedulePopup.View.init:', new Date().getTime() );
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

                _p.trigger( 'update_status', [ JC.f.cloneDate( _currentDate ) ] );
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

                var _p = this
                    , _r = []
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
                        _r.push( JC.f.printf( '<td class="js_bccDateItem" data-id="{0}" data-date="{1}">'
                                    , _p._model.id(), JC.f.formatISODate( _date ) ) );

                        if( _count > _startDay ){
                            if( _dayCount <= _maxDay ){
                                _r.push( _dayCount++ );
                            }else{
                            }
                        }else{
                        }

                        _r.push( '</td>' );

                        _count++;
                        _date.setDate( _date.getDate() + 1 );
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

                _p.trigger( 'update_status', [ _currentDate ] );
            }
    });

    CRMSchedulePopup.EditView = 
        function( _model ){
            this._model = _model;
        };

    JC.f.extendObject( CRMSchedulePopup.EditView.prototype, {
        init:
            function(){
                //JC.log( 'CRMSchedulePopup.EditView.init:', new Date().getTime() );
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
