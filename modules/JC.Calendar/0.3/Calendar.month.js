;(function(define, _win) { 'use strict'; define( 'JC.Calendar.month', [ 'JC.Calendar.date' ], function(){
    //
    /// MONTH CODE
    //
    /**
     * 自定义月份弹框的模板HTML
     * @for         JC.Calendar
     * @property    monthTpl
     * @type        string
     * @default     empty
     * @static
     */
    JC.Calendar.monthTpl = '';

    function MonthModel( _selector ){
        this._selector = _selector;
    }
    JC.Calendar.MonthModel = MonthModel;
    
    function MonthView( _model ){
        this._model = _model;
    }
    JC.Calendar.MonthView = MonthView;

    JC.Calendar.clone( MonthModel, MonthView );

    JC.f.extendObject( MonthModel.prototype, {
        layout:
            function(){
                var _r = $('#UXCCalendar_month');

                if( !_r.length ){
                    _r = $( JC.Calendar.monthTpl || this.tpl ).hide();
                    _r.attr('id', 'UXCCalendar_month').hide().appendTo( document.body );
                 }
                return _r;
            }

        , tpl:
            [
            '<div id="UXCCalendar_month" class="UXCCalendar UXCCalendar_week UXCCalendar_month" >'
            ,'    <div class="UHeader">'
            ,'        <button type="button" class="UButton UNextYear">&nbsp;&gt;&gt;&nbsp;</button>'
            ,'        <button type="button" class="UButton UPreYear">&nbsp;&lt;&lt;&nbsp;</button>'
            ,'        <select class="UYear" style=""></select>'
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

        , month:
            function(){
                var _r = 0, _tmp, _date;
                ( _tmp = this.layout().find('td.cur a[dstart]') ).length
                    && ( _date = new Date() )
                    && (
                            _date.setTime( _tmp.attr('dstart') )
                            , _r = _date.getMonth()
                       )
                    ;
                return _r;
            }

        , selectedDate:
            function(){
                var _r, _tmp, _item;
                _tmp = this.layout().find('td.cur');
                _tmp.length 
                    && !_tmp.hasClass( 'unable' )
                    && ( _item = _tmp.find('a[dstart]') )
                    && ( 
                            _r = { 'start': new Date(), 'end': new Date() }
                            , _r.start.setTime( _item.attr('dstart') ) 
                            , _r.end.setTime( _item.attr('dend') ) 
                        )
                    ;
                return _r;
            }

        , multiselectDate:
            function(){
                var _p = this, _r = [], _sp, _item, _dstart, _dend;
                _p.layout().find('td.cur').each( function(){
                    _sp = $(this); _item = _sp.find( '> a[dstart]' );
                    if( _sp.hasClass( 'unable' ) ) return;
                    _dstart = new Date(); _dend = new Date();
                    _dstart.setTime( _item.attr('dstart') );
                    _dend.setTime( _item.attr('dend') );
                    _r.push( { 'start': _dstart, 'end': _dend } );
                });
                return _r;
            }
    });

    JC.f.extendObject( MonthView.prototype, {
        _buildBody: 
            function( _dateo ){
                var _p = this
                    , _date = _dateo.date
                    , _layout = _p._model.layout()
                    , today = new Date( new Date().getFullYear(), new Date().getMonth(), new Date().getDate() ).getTime()
                    , nextCount = 0
                    , _ls = [], _class, _data, _title, _dstart, _dend, _year = _date.getFullYear()
                    , _rows = 4
                    , ipt = JC.Calendar.lastIpt
                    , currentcanselect = JC.f.parseBool( ipt.attr('currentcanselect') )
                    , _tmpMultidate = _dateo.multidate ? _dateo.multidate.slice() : null
                    , _minvalue = _dateo.minvalue ? JC.f.cloneDate( _dateo.minvalue ) : null
                    , _maxvalue = _dateo.maxvalue ? JC.f.cloneDate( _dateo.maxvalue ) : null
                    ;

                    if( _maxvalue && currentcanselect ){
                        _maxvalue.setDate( JC.f.maxDayOfMonth( _maxvalue ) );
                    }

                    if( _minvalue && currentcanselect ){
                        _minvalue.setDate( 1 );
                    }

                    _ls.push('<tr>');
                    for( var i = 1, j = 12; i <= j; i++ ){
                        _dstart = new Date( _year, i - 1, 1 ); 
                        _dend = new Date( _year, i - 1, JC.f.maxDayOfMonth( _dstart ) );

                        _title = JC.f.printf( "{0}年 {1}月\n开始日期: {2} (周{4})\n结束日期: {3} (周{5})"
                                    , _year
                                    , JC.Calendar.getCnNum( i )
                                    , JC.f.formatISODate( _dstart )
                                    , JC.f.formatISODate( _dend )
                                    , JC.Calendar.cnWeek.charAt( _dstart.getDay() % 7 )
                                    , JC.Calendar.cnWeek.charAt( _dend.getDay() % 7 )
                                    );

                        _class = [];

                        if( _minvalue && _dstart.getTime() < _minvalue.getTime() ) 
                            _class.push( 'unable' );
                        if( _maxvalue && _dend.getTime() > _maxvalue.getTime() ){
                            _class.push( 'unable' );
                        }

                        if( _tmpMultidate ){
                            $.each( _tmpMultidate, function( _ix, _item ){
                                if( _dstart.getTime() >= _item.start.getTime() 
                                  && _dstart.getTime() <= _item.end.getTime() ){
                                    _class.push( 'cur' );
                                    _tmpMultidate.splice( _ix, 1 );
                                    return false;
                                }
                            });
                        }else{
                            if( _date.getTime() >= _dstart.getTime() 
                                    && _date.getTime() <= _dend.getTime() ) _class.push( 'cur' );
                        }
                        if( today >= _dstart.getTime() && today <= _dend.getTime() ) _class.push( 'today' );

                        var _cnUnit = JC.Calendar.cnUnit.charAt( i % 10 );
                        i > 10 && ( _cnUnit = "十" + _cnUnit );

                        _ls.push( JC.f.printf( '<td class="{0}"><a href="javascript:" title="{1}"'+
                                        ' dstart="{3}" dend="{4}" month="{5}" >{2}月</a></td>'
                                    , _class.join(' ')
                                    , _title
                                    , _cnUnit
                                    , _dstart.getTime()
                                    , _dend.getTime()
                                    , i
                                ));
                        if( i % 3 === 0 && i != j ) _ls.push( '</tr><tr>' );
                    }
                    _ls.push('</tr>'); 
     
                    _layout.find('table.UTableBorder tbody' ).html( $( _ls.join('') ) );
            }

        , updateSelected:
            function( _userSelectedItem ){
                var _p = this, _dstart, _dend, _tmp, _text, _ar;
                if( !_userSelectedItem ){
                    if( _p._model.multiselect() ){
                        _tmp = this._model.multiselectDate();
                        if( !_tmp.length ) return;
                        _ar = [];
                        $.each( _tmp, function( _ix, _item ){
                            //_ar.push( JC.f.printf( '{0} 至 {1}', JC.f.formatISODate( _item.start ), JC.f.formatISODate( _item.end ) ) );
                            _ar.push( _text = _p._model.fullFormat( _p._model.dateFormat( _item.start ), _p._model.dateFormat( _item.end ) ) );
                        });
                        _text = _ar.join(',');
                    }else{
                        _tmp = this._model.selectedDate();
                        _tmp && ( _dstart = _tmp.start, _dend = _tmp.end );

                        /*
                        _dstart && _dend 
                            && ( _text = JC.f.printf( '{0} 至 {1}', JC.f.formatISODate( _dstart ), JC.f.formatISODate( _dend ) ) );
                        */
                        _dstart 
                            && _dend 
                            && ( _text = _p._model.fullFormat( _p._model.dateFormat( _dstart ), _p._model.dateFormat( _dend ) ) )
                            ; 
                    }
                }else{
                    _userSelectedItem = $( _userSelectedItem );
                    _tmp = JC.f.getJqParent( _userSelectedItem, 'td' );
                    if( _tmp && _tmp.hasClass('unable') ) return;

                    if( _p._model.multiselect() ){
                        _tmp.toggleClass('cur');
                        return;
                    }
                    _dstart = new Date(); _dend = new Date();
                    _dstart.setTime( _userSelectedItem.attr('dstart') );
                    _dend.setTime( _userSelectedItem.attr('dend') );

                    /*
                    _text = JC.f.printf( '{0} 至 {1}', JC.f.formatISODate( _dstart ), JC.f.formatISODate( _dend ) );
                    */
                    _text = _p._model.fullFormat( _p._model.dateFormat( _dstart ), _p._model.dateFormat( _dend ) )
                }

                if( !_text ) return;

                _p._model.selector().val( _text );
                $(_p).trigger( 'TriggerEvent', [ JC.Calendar.Model.UPDATE, 'month', _dstart, _dend ] );

                JC.Calendar.hide();
            }
    });

    $(document).delegate( [ 'input[datatype=month]', 'input[multidate=month]' ].join(), 'focus' 
    , function($evt){
            Calendar.pickDate( this );
    });
    $(document).delegate( [ 'button[datatype=month]', 'button[multidate=month]' ].join(), 'click' , function($evt){
            Calendar.pickDate( this );
    });
    $(document).delegate( [ 'textarea[datatype=month]', 'textarea[multidate=month]' ].join(), 'click' , function($evt){
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
