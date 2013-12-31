;(function(define, _win) { 'use strict'; define( [ 'JC.Calendar.date' ], function(){
    //
    /// SEASON CODE
    //
    /**
     * 自定义周弹框的模板HTML
     * @for         JC.Calendar
     * @property    seasonTpl
     * @type        string
     * @default     empty
     * @static
     */
    JC.Calendar.seasonTpl = '';

    function SeasonModel( _selector ){
        this._selector = _selector;
    }
    JC.Calendar.SeasonModel = SeasonModel;
    
    function SeasonView( _model ){
        this._model = _model;
    }
    JC.Calendar.SeasonView = SeasonView;

    JC.Calendar.clone( SeasonModel, SeasonView );


    JC.f.extendObject( SeasonModel.prototype, {
        layout: 
            function(){
                var _r = $('#UXCCalendar_season');

                if( !_r.length ){
                    _r = $( JC.Calendar.seasonTpl || this.tpl ).hide();
                    _r.attr('id', 'UXCCalendar_season').hide().appendTo( document.body );
                 }
                return _r;
            }

        , tpl:
            [
            '<div id="UXCCalendar_season" class="UXCCalendar UXCCalendar_week UXCCalendar_season" >'
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
    });

    JC.f.extendObject( SeasonView.prototype, {

        _buildBody:
            function( _dateo ){
                var _p = this
                    , _date = _dateo.date
                    , _layout = _p._model.layout()
                    , today = new Date( new Date().getFullYear(), new Date().getMonth(), new Date().getDate() ).getTime()
                    , nextCount = 0
                    , _ls = [], _class, _data, _title, _sdate, _edate, _year = _date.getFullYear()
                    , _rows = 4
                    , ipt = JC.Calendar.lastIpt
                    , currentcanselect = JC.f.parseBool( ipt.attr('currentcanselect') )
                    , _minvalue = _dateo.minvalue ? JC.f.cloneDate( _dateo.minvalue ) : null
                    , _maxvalue = _dateo.maxvalue ? JC.f.cloneDate( _dateo.maxvalue ) : null
                    ;

                    if( _maxvalue && currentcanselect ){
                        var _m = _maxvalue.getMonth() + 1, _md;

                        if( _m % 3 !== 0 ){
                            _maxvalue.setDate( 1 );
                            _maxvalue.setMonth( _m + ( 3 - ( _m % 3 ) - 1 ) );
                        }
                        _maxvalue.setDate( JC.f.maxDayOfMonth( _maxvalue ) );
                    }

                    _ls.push('<tr>');
                    for( var i = 1, j = 4; i <= j; i++ ){
                        _sdate = new Date( _year, i * 3 - 3, 1 ); 
                        _edate = new Date( _year, i * 3 - 1, 1 );
                        _edate.setDate( JC.f.maxDayOfMonth( _edate ) );

                        var _cnUnit = JC.Calendar.cnUnit.charAt( i % 10 );
                        i > 10 && ( _cnUnit = "十" + _cnUnit );

                        _title = JC.f.printf( "{0}年 第{1}季度\n开始日期: {2} (周{4})\n结束日期: {3} (周{5})"
                                    , _year
                                    , JC.Calendar.getCnNum( i )
                                    , JC.f.formatISODate( _sdate )
                                    , JC.f.formatISODate( _edate )
                                    , JC.Calendar.cnWeek.charAt( _sdate.getDay() % 7 )
                                    , JC.Calendar.cnWeek.charAt( _edate.getDay() % 7 )
                                    );

                        _class = [];

                        if( _minvalue && _sdate.getTime() < _minvalue.getTime() ) 
                            _class.push( 'unable' );
                        if( _maxvalue && _edate.getTime() > _maxvalue.getTime() ){
                            _class.push( 'unable' );
                        }

                        if( _date.getTime() >= _sdate.getTime() && _date.getTime() <= _edate.getTime() ) _class.push( 'cur' );
                        if( today >= _sdate.getTime() && today <= _edate.getTime() ) _class.push( 'today' );

                        _ls.push( JC.f.printf( '<td class="{0}"><a href="javascript:" title="{1}"'+
                                        ' dstart="{3}" dend="{4}" month="{5}" >{2}季度</a></td>'
                                    , _class.join(' ')
                                    , _title
                                    , _cnUnit
                                    , _sdate.getTime()
                                    , _edate.getTime()
                                    , i
                                ));
                        if( i % 2 === 0 && i != j ) _ls.push( '</tr><tr>' );
                    }
                    _ls.push('</tr>'); 
     
                    _layout.find('table.UTableBorder tbody' ).html( $( _ls.join('') ) );
            }

        , updateSelected: 
            function( _userSelectedItem ){
                var _p = this, _dstart, _dend, _tmp;
                if( !_userSelectedItem ){
                    _tmp = this._model.selectedDate();
                    _tmp && ( _dstart = _tmp.start, _dend = _tmp.end );
                }else{
                    _userSelectedItem = $( _userSelectedItem );
                    _tmp = JC.f.getJqParent( _userSelectedItem, 'td' );
                    if( _tmp && _tmp.hasClass('unable') ) return;
                    _dstart = new Date(); _dend = new Date();
                    _dstart.setTime( _userSelectedItem.attr('dstart') );
                    _dend.setTime( _userSelectedItem.attr('dend') );
                }
                if( !( _dstart && _dend ) ) return;

                /*
                _p._model.selector().val( JC.f.printf( '{0} 至 {1}', JC.f.formatISODate( _dstart ), JC.f.formatISODate( _dend ) ) );
                */
                _p._model.selector().val( _p._model.fullFormat( _p._model.dateFormat( _dstart ), _p._model.dateFormat( _dend ) ) );
                $(_p).trigger( 'TriggerEvent', [ JC.Calendar.Model.UPDATE, 'season', _dstart, _dend ] );

                JC.Calendar.hide();
            }
    });

    $(document).delegate( [ 'input[datatype=season]', 'input[multidate=season]' ].join(), 'focus' 
    , function($evt){
            Calendar.pickDate( this );
    });
    $(document).delegate( [ 'button[datatype=season]', 'button[multidate=season]' ].join(), 'click' , function($evt){
            Calendar.pickDate( this );
    });
    $(document).delegate( [ 'textarea[datatype=season]', 'textarea[multidate=season]' ].join(), 'click' , function($evt){
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
