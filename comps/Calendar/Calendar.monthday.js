;(function(define, _win) { 'use strict'; define( [ 'JC.Calendar.date' ], function(){
    //
    /// MONTHDAY CODE
    //
    /**
     * 多选日期弹框的模板HTML
     * @for         JC.Calendar
     * @property    monthdayTpl
     * @type        string
     * @default     empty
     * @static
     */
    JC.Calendar.monthdayTpl = '';
    /**
     * 多先日期弹框标题末尾的附加字样
     * @for         JC.Calendar
     * @property    monthdayHeadAppendText
     * @type        string
     * @default     empty
     * @static
     */
    JC.Calendar.monthdayHeadAppendText = '';

    function MonthDayModel( _selector ){
        this._selector = _selector;
        
    }
    JC.Calendar.MonthDayModel = MonthDayModel;
    
    function MonthDayView( _model ){
        this._model = _model;
		
    }
    JC.Calendar.MonthDayView = MonthDayView;

    JC.Calendar.clone( MonthDayModel, MonthDayView );

    JC.f.extendObject( MonthDayModel.prototype, {
        fixCheckall: 
            function(){
                var _p = this, _cks, _ckAll, _isAll = true, _sp;
                _p._fixCheckAllTm && clearTimeout( _p._fixCheckAllTm );
                _p._fixCheckAllTm =
                    setTimeout( function(){
                        _ckAll = _p.layout().find('input.js_JCCalendarCheckbox[action=all]');
                        _cks = _p.layout().find('input.js_JCCalendarCheckbox[dstart]');

                        _cks.each( function(){
                            _sp = $(this);
                            var _data = _p.findItemByTimestamp( _sp.attr('dstart')  );
                            if( _data.atd.hasClass( 'unable' ) ) return;
                            if( !_sp.prop('checked') ) return _isAll = false;
                        });
                        _ckAll.prop('checked', _isAll );
                    }, 100);
            }

        , findItemByTimestamp:
            function( _tm ){
                var _p = this, _r = { 
                                        'a': null
                                        , 'atd': null
                                        , 'atr': null
                                        , 'input': null
                                        , 'inputtr': null
                                        , 'tm': _tm 
                                    };

                if( _tm ){
                    _r.a = _p.layout().find( JC.f.printf( 'a[dstart={0}]', _tm ) );
                    _r.atd = JC.f.getJqParent( _r.a, 'td' );
                    _r.atr = JC.f.getJqParent( _r.a, 'tr' );

                    _r.input = _p.layout().find( JC.f.printf( 'input[dstart={0}]', _tm ) );
                    _r.inputtr = JC.f.getJqParent( _r.input, 'tr' );
                }

                return _r;
            }
        
        , layout: 
            function(){
                var _r = $('#UXCCalendar_monthday');

                if( !_r.length ){
                    _r = $( JC.f.printf( JC.Calendar.monthdayTpl || this.tpl, JC.Calendar.monthdayHeadAppendText ) ).hide();
                    _r.attr('id', 'UXCCalendar_monthday').hide().appendTo( document.body );

                    var _month = $( [
                                '<option value="0">一月</option>'
                                , '<option value="1">二月</option>'
                                , '<option value="2">三月</option>'
                                , '<option value="3">四月</option>'
                                , '<option value="4">五月</option>'
                                , '<option value="5">六月</option>'
                                , '<option value="6">七月</option>'
                                , '<option value="7">八月</option>'
                                , '<option value="8">九月</option>'
                                , '<option value="9">十月</option>'
                                , '<option value="10">十一月</option>'
                                , '<option value="11">十二月</option>'
                            ].join('') ).appendTo( _r.find('select.UMonth' ) );

                 }
                return _r;
            }
            
        , tpl:
            [
            '<div id="UXCCalendar_monthday" class="UXCCalendar UXCCalendar_week UXCCalendar_monthday" >'
            ,'    <div class="UHeader">'
            ,'        <button type="button" class="UButton UPreYear">&nbsp;&lt;&lt;&nbsp;</button>'
            ,'        <button type="button" class="UButton UPreMonth">&nbsp;&nbsp;&lt;&nbsp;&nbsp;</button>'
            ,'        <select class="UYear" style=""></select>'
            ,'        <select class="UMonth"></select>'
            ,'        {0}'
            ,'        <button type="button" class="UButton UNextYear">&nbsp;&gt;&gt;&nbsp;</button>'
            ,'        <button type="button" class="UButton UNextMonth">&nbsp;&nbsp;&gt;&nbsp;&nbsp;</button>'
            ,'    </div>'
            ,'    <table class="UTable UTableBorder">'
            ,'        <tbody></tbody>'
            ,'    </table>'
            ,'    <div class="UFooter">'
            ,'        <button type="button" class="UConfirm">确定</button>'
            ,'        <button type="button" class="UClear">清空</button>'
            ,'        <button type="button" class="UCancel">取消</button>'
            ,'    </div>'
            ,'</div>'
            ].join('')

        , multiselect: function(){ return true; }

        , multiselectDate:
            function(){
                var _p = this
                    , _r = []
                    , _sp
                    , _item
                    , _date
                    ;

                _p.layout().find('input.js_JCCalendarCheckbox[dstart]').each( function () {
                    _sp = $(this);
                    if( !_sp.prop('checked') ) return;
                    _date = new Date();
                    _date.setTime( _sp.attr("dstart") );
                    _r.push( _date );
                });
               
                return _r;
            }

        , ccPreserveDisabled:
            function(){
                var _r = true;
                this.selector().is( '[ccPreserveDisabled]' )
                    && ( _r = JC.f.parseBool( this.selector().attr( 'ccPreserveDisabled' ) ) );
                return _r;
            }

        , calendarclear: 
            function(){
                var _p = this, _ipt = this.selector(), _cb, _tmp;
                _ipt && _ipt.attr('calendarclear') 
                    && ( _tmp = window[ _ipt.attr('calendarclear') ] )
                    && ( _cb = _tmp );

                if( _p.ccPreserveDisabled() ){
                    var _items = _p.layout().find( 'input[date]' ), _disabled = [];
                        _items.each( function(){
                            var _sp = $(this), _d;
                            if( !( _sp.is( ':disabled' ) && _sp.is( ':checked' ) ) ) return;
                            _d = new Date();
                            _d.setTime( _sp.attr( 'date' ) );
                            _disabled.push( JC.f.formatISODate( _d ) );
                        });
                    _ipt.val( _disabled.join(',') );
                }

                return _cb;
            }

        , fixedDate:
            function( _dateo ){
                var _p = this, _lastIpt = JC.Calendar.lastIpt, _tmpDate;
                _lastIpt
                    && !_lastIpt.is('[defaultdate]')
                    && (
                            _tmpDate = JC.f.cloneDate( _dateo.multidate[0].start )
                            //, _tmpDate.setDate( 1 )
                            , _lastIpt.attr('defaultdate', JC.f.formatISODate( _tmpDate ) )
                            /*
                            , !_lastIpt.is( '[placeholder]' ) 
                                && _lastIpt.attr('placeholder', JC.f.printf( '{0}年 {1}月', _tmpDate.getFullYear(), _tmpDate.getMonth() + 1 ) )
                           */
                        )
                    ;
            }
    });

    JC.f.extendObject( MonthDayView.prototype, {
        init:
            function(){
                var _p = this;

                $(_p).on('MonthDayToggle', function( _evt, _item ){
                    var _data = _p._model.findItemByTimestamp( _item.attr('dstart')  );
                    if( _data.atd.hasClass('unable') ) return;
                    _data.input.prop( 'checked', _data.atd.hasClass( 'cur' )  );
                    _p._model.fixCheckall();
                });

                $(_p).on('MonthDayInputToggle', function( _evt, _item ){
                    var _data = _p._model.findItemByTimestamp( _item.attr('dstart')  );
                    /**
                     * 如果 atd 为空, 那么是 全选按钮触发的事件
                     */
                    if( !_data.atd ){
                        $(_p).trigger( 'MonthDayToggleAll', [ _item ] );
                        return;
                    }

                    if( _data.atd.hasClass('unable') ) return;
                    _data.atd[ _data.input.prop('checked') ? 'addClass' : 'removeClass' ]( 'cur' );
                    _p._model.fixCheckall();
                });

                $(_p).on('MonthDayToggleAll', function( _evt, _input ){
                    var _all = _p._model.layout().find( 'a[dstart]' ), _checked = _input.prop('checked');
                    if( !_all.length ) return;
                    _all.each( function(){
                        var _sp = $(this), _td = JC.f.getJqParent( _sp, 'td' );
                        if( _td.hasClass('unable') ) return;
                        _td[ _checked ? 'addClass' : 'removeClass' ]( 'cur' );
                        $( _p ).trigger( 'MonthDayToggle', [ _sp ] );
                    });
                });

                return this;
            }

        , updateSelected: 
            function( _userSelectedItem ){
                var _p = this
                    , _dstart
                    , _dend
                    , _tmp
                    , _text
                    , _ar
                    ;

                if( !_userSelectedItem ) {
                    _tmp = this._model.multiselectDate();
                    if( !_tmp.length ) return;
                    _ar = [];
                    
                    for (var i = 0; i < _tmp.length; i++) {
                        _ar.push(JC.f.formatISODate(_tmp[i]));
                    }
                    _text = _ar.join(',');
                } else {
                    _userSelectedItem = $( _userSelectedItem );
                    _tmp = JC.f.getJqParent( _userSelectedItem, 'td' );
                    if( _tmp && _tmp.hasClass('unable') ) return;

                    if( _p._model.multiselect() ){
                        _tmp.toggleClass('cur');
                        //$(_p).trigger( 'MonthDayToggle', [ _tmp ] );
                        return;
                    }
                    _date = new Date(); 
                    _date.setTime( _userSelectedItem.attr('date') );
                    _text = _userSelectedItem.attr("date");
                    _text = JC.f.printf( '{0}', JC.f.formatISODate( _date ) );
                }

                if( !_text ) return;
                if( _tmp.length ){
                    _p._model.selector().attr('placeholder', JC.f.printf( '{0}年 {1}', _tmp[0].getFullYear(), _tmp[0].getMonth() + 1 ) );
                    _p._model.selector().attr('defaultdate', JC.f.formatISODate( _tmp[0] ) );
                }

                _p._model.selector().val( _text );
                $(_p).trigger( 'TriggerEvent', [ JC.Calendar.Model.UPDATE, 'monthday', _tmp ] );

                JC.Calendar.hide();
            }
        
        , _buildBody:
            function( _dateo ){
                    var _p = this, _layout = _p._model.layout();
                    var _maxday = JC.f.maxDayOfMonth( _dateo.date ), 
                        _ls = [],
                        i, 
                        _class, 
                        _tempDate, 
                        _tempDay,
                        _today = new Date();

                    _p._model.fixedDate( _dateo );

                    var _headLs = [], _dayLs = [], _ckLs = [];
                    var _headClass = [], _dayClass = [];

                    _headLs.push('<tr><td><span class="bold">星期</span></td>');
                    _dayLs.push('<tr><td><span class="bold">日期</span></td>'); 
                    _ckLs.push('<tr class="Uchkdate"><td><label><span class="bold">全选</span>&nbsp;'
                                + '<input type="checkbox" class="js_JCCalendarCheckbox" action="all"  /></lable></td>');

                    for ( i = 0; i < _maxday; i++ ) {
                        
                        _tempDate = new Date(_dateo.date.getFullYear(), _dateo.date.getMonth(), i+1);
                        _tempDay = _tempDate.getDay();

                        _headClass  = [];
                        _dayClass = getClass(_dateo, _tempDate, _today).join(' ');
                        
                        if (_tempDay == 0 || _tempDay == 6) _headClass.push("red");
                        _headLs.push( JC.f.printf( 
                                    '<td class="{0}">{1}</td>'
                                    , _headClass.join(" ") 
                                    , Calendar.cnWeek.charAt( _tempDay )
                                ));

                        _dayLs.push( JC.f.printf(
                            '<td class="{0}"><a href="javascript:;" dstart="{1}" dend="{1}" title="{3}" >{2}</a></td>'
                            , _dayClass
                            , _tempDate.getTime()
                            , i + 1
                            , JC.f.formatISODate(_tempDate)
                         ));

                       _ckLs.push( JC.f.printf(
                            '<td><input type="checkbox" date="{1}" dstart="{1}" dend="{1}" class="js_JCCalendarCheckbox" action="item" {3} {4} title="{2}" /></td>'
                            , ''
                            , _tempDate.getTime()
                            , JC.f.formatISODate(_tempDate)
                            , ( !/\bunable\b/.test( _dayClass ) && ( /\bcur\b/.test( _dayClass ) ) ) ? 'checked' : ''
                            , /\bunable\b/.test( _dayClass ) ? 'disabled' : ''
                         ));

                        _tempDate.setDate(_tempDate.getDate() + 1);
                        _tempDay = _tempDate.getDay();
                        
                    }

                    _headLs.push('</tr>');
                    _dayLs.push('</tr>');
                    _ckLs.push('</tr>');

                    _ls = _ls.concat( _headLs, _dayLs, _ckLs );
                    
                    _layout.find('table.UTableBorder tbody' ).html( $( _ls.join('') ) );

                    _p._model.fixCheckall();
            }
    });
	
	function getClass(_dateo, _tempDate, _today) {
		var _class = [];

		if( _dateo.minvalue) {
			if( _tempDate.getTime() < _dateo.minvalue.getTime() ) {
				_class.push( 'unable' );
			}
		} 
            
        if( _dateo.maxvalue ) {
			if ( _tempDate.getTime() > _dateo.maxvalue.getTime() ) {
				_class.push( 'unable' );
			}
		} 
           
		if( JC.f.isSameDay( _tempDate, _today ) ) {
			_class.push( 'today' );
		}

        for( var i = 0, j = _dateo.multidate.length; i < j; i++ ){
            if( JC.f.isSameDay( _dateo.multidate[i].start, _tempDate ) ){ 
                _class.push( 'cur' );
                break;
            }
        }

		return _class;
	}

    $(document).delegate( '#UXCCalendar_monthday a[dstart]', 'click', function( _evt ){
        var _lastIpt = JC.Calendar.lastIpt, _type, _ins, _p = $(this);
        if( !_lastIpt ) return;
        _type = JC.Calendar.type( _lastIpt );
        _ins = JC.Calendar.getInstance( _lastIpt );
        if( !_ins )  return;

        $( _ins._view ).trigger( 'MonthDayToggle', [ _p ] );
    });

    $(document).delegate( '#UXCCalendar_monthday input.js_JCCalendarCheckbox', 'click', function( _evt ){
        var _lastIpt = JC.Calendar.lastIpt, _type, _ins, _p = $(this);
        if( !_lastIpt ) return;
        _type = JC.Calendar.type( _lastIpt );
        _ins = JC.Calendar.getInstance( _lastIpt );
        if( !_ins )  return;
        $( _ins._view ).trigger( 'MonthDayInputToggle', [ _p ] );
    });


    $(document).delegate( [ 'input[datatype=monthday]', 'input[multidate=monthday]' ].join(), 'focus' 
    , function($evt){
            Calendar.pickDate( this );
    });

    $(document).delegate( [ 'button[datatype=monthday]', 'button[multidate=monthday]' ].join(), 'click' , function($evt){
            Calendar.pickDate( this );
    });

    $(document).delegate( [ 'textarea[datatype=monthday]', 'textarea[multidate=monthday]' ].join(), 'click' , function($evt){
            Calendar.pickDate( this );
    });

    return JC.Calendar;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
