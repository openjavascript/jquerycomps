;(function(define, _win) { 'use strict'; define( [ 'JC.Calendar.date' ], function(){
    //
    /// YEAR CODE
    //
    /**
     * 自定义周弹框的模板HTML
     * @for         JC.Calendar
     * @property    yearTpl
     * @type        string
     * @default     empty
     * @static
     */
    JC.Calendar.yearTpl = '';

    function YearModel( _selector ){
        this._selector = _selector;
    }
    JC.Calendar.YearModel = YearModel;
    
    function YearView( _model ){
        this._model = _model;
    }
    JC.Calendar.YearView = YearView;

    JC.Calendar.clone( YearModel, YearView );

    JC.f.extendObject( YearModel.prototype, {
        layout: 
            function(){
                var _r = $('#UXCCalendar_year');

                if( !_r.length ){
                    _r = $( JC.Calendar.yearTpl || this.tpl ).hide();
                    _r.attr('id', 'UXCCalendar_year').hide().appendTo( document.body );
                 }
                return _r;
            }

        , tpl:
            [
            '<div id="UXCCalendar_year" class="UXCCalendar UXCCalendar_week UXCCalendar_year">\n'
            ,'    <table class="UTable UTableBorder">\n'
            ,'        <tbody>\n'
            ,'            <tr>\n'
            ,'                <td class="UYearBox">\n'
            ,'                    <button type="button" class="UButton UPreYear">&nbsp;&lt;&lt;&nbsp;</button>\n'
            ,'                </td>\n'
            ,'                <td></td><td></td><td></td><td></td>\n'
            ,'            </tr>\n'
            ,'            <tr><td></td><td></td><td></td><td></td><td></td></tr>\n'
            ,'            <tr><td></td><td></td><td></td><td></td><td></td></tr>\n'
            ,'            <tr><td></td><td></td><td></td><td></td><td></td></tr>\n'
            ,'            <tr><td></td><td></td><td></td><td></td><td></td></tr>\n'
            ,'            <tr><td></td><td></td><td></td><td></td><td></td></tr>\n'
            ,'            <tr>\n'
            ,'                <td></td><td></td><td></td><td></td>\n'
            ,'                <td class="UYearBox">\n'
            ,'                    <button type="button" class="UButton UNextYear">&nbsp;&gt;&gt;&nbsp;</button>\n'
            ,'                </td>\n'
            ,'            </tr>\n'
            ,'        </tbody>\n'
            ,'    </table>\n'
            ,'    <div class="UFooter">\n'
            ,'        <button type="button" class="UConfirm">确定</button>\n'
            ,'        <button type="button" class="UClear">清空</button>\n'
            ,'        <button type="button" class="UCancel">取消</button>\n'
            ,'    </div>\n'
            ,'</div>\n'
            ].join('')

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

    JC.f.extendObject( YearView.prototype, {

        _buildBody:
            function( _dateo ){
                var _p = this
                    , _selector = _p._model.selector()
                    , _v = _selector.val().trim()
                    , _selectedYear = _v.replace( /[^\d]+/g, '' )
                    , _d = _dateo.date
                    , today = new Date().getFullYear()
                    , _layout = _p._model.layout()
                    , _tds = _layout.find( 'tbody > tr > td' )
                    , _len = _tds.length - 1
                    , _yearCount 
                    , _yearEnd
                    , _year
                    , currentcanselect = JC.f.parseBool( _selector.attr('currentcanselect') )
                    , _title, _class, _dstart, _dend
                    ;

                _selectedYear && ( _selectedYear = _selectedYear.slice( 0, 4 ) );
                !_selectedYear && ( _selectedYear = today );

                _year = _d.getFullYear();
                _yearCount = _year - Math.floor( _len / 2 );
                
                if( _dateo.minvalue && currentcanselect ){
                    _dateo.minvalue.setFullYear( _dateo.minvalue.getFullYear() - 1 );
                }

                if( _dateo.maxvalue && currentcanselect ){
                    _dateo.maxvalue.setFullYear( _dateo.maxvalue.getFullYear() + 1 );
                }
                
                _tds.each( function( _ix, _item ){
                    _item = $( _item );
                    if( _ix == 0 || _ix == _len ){
                    }else{
                        //_item.html( JC.f.printf( '<a href="javascript:">{0}</a>', _yearCount ) );

                        _title = JC.f.printf( "{0}年", _yearCount );
                        _class = [];

                        _dstart = new Date( _yearCount, 0, 1 );
                        _dend = new Date( _yearCount, 11, 31 );

                        if( _dateo.minvalue && _dstart.getFullYear() <= _dateo.minvalue.getFullYear() ){ 
                            _class.push( 'unable' );
                        }
                        if( _dateo.maxvalue && _dend.getFullYear() >= _dateo.maxvalue.getFullYear() ){
                            _class.push( 'unable' );
                        }

                        _selectedYear && _selectedYear == _yearCount && _class.push( 'cur' );

                        today == _yearCount && _class.push( 'today' );

                        _item.html( JC.f.printf( '<a href="javascript:" title="{0}"'+
                                        ' dstart="{1}" dend="{2}" " >{3}</a></td>'
                                    , _title
                                    , _dstart.getTime()
                                    , _dend.getTime()
                                    , _yearCount
                                ));
                        _item.prop( 'className', _class.join( ' ' ) );
                    }
                    _yearCount++;
                });
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

                _p._model.selector().val( _p._model.fullFormat( _p._model.dateFormat( _dstart ), _p._model.dateFormat( _dend ) ) );
                $(_p).trigger( 'TriggerEvent', [ JC.Calendar.Model.UPDATE, 'year', _dstart, _dend ] );

                JC.Calendar.hide();
            }

        , updateYear:
            function( _offset ){
                if( typeof _offset == 'undefined' || _offset == 0 ) return;

                var _dateo = this._model.layoutDate(), _date;

                this._model.multiselect() 
                    ? this.updateMultiYear( _offset )
                    : this.updateSingleYear( _offset )
                    ;
            }

        , updateSingleYear:
            function( _offset ){
                if( !_offset ) return;
                var _dateo = this._model.layoutDate()
                    , _a = this._model.layout().find( 'a[dstart]' )
                    , _firstA = _a.first()
                    , _lastA = _a.last()
                    , _dstart = new Date(), _dend = new Date()
                    , _offsetYear = 17
                    , _tmpYear
                    ;

                if( _offset > 0 ){
                    _dstart.setTime( _lastA.attr( 'dstart' ) );
                    _dend.setTime( _lastA.attr( 'dend' ) );
                    _dateo.date = _dstart;
                    _dateo.enddate = _dend;

                    _dateo.date.setFullYear( _dateo.date.getFullYear() + _offsetYear );
                    _dateo.enddate.setFullYear( _dateo.enddate.getFullYear() + _offsetYear );
                }else{
                    _dstart.setTime( _firstA.attr( 'dstart' ) );
                    _dend.setTime( _firstA.attr( 'dend' ) );
                    _dateo.date = _dstart;
                    _dateo.enddate = _dend;

                    _dateo.date.setFullYear( _dateo.date.getFullYear() - _offsetYear );
                    _dateo.enddate.setFullYear( _dateo.enddate.getFullYear() - _offsetYear );
                }
                var _min = _dateo.date.getFullYear() - _offsetYear + 1
                    , _max = _dateo.date.getFullYear() + _offsetYear - 1
                    ; 
                //JC.log( JC.f.formatISODate( _dateo.date ), JC.f.formatISODate( _dateo.minvalue ), _min, _max );
                if( _dateo.minvalue && _dateo.minvalue.getFullYear() > _max ) return;
                if( _dateo.maxvalue && _dateo.maxvalue.getFullYear() < _min ) return;

                this._buildLayout( _dateo );
                this._buildDone();
            }
    });

    $(document).delegate( [ 'input[datatype=year]', 'input[multidate=year]' ].join(), 'focus' 
    , function($evt){
            Calendar.pickDate( this );
    });
    $(document).delegate( [ 'button[datatype=year]', 'button[multidate=year]' ].join(), 'click' , function($evt){
            Calendar.pickDate( this );
    });
    $(document).delegate( [ 'textarea[datatype=year]', 'textarea[multidate=year]' ].join(), 'click' , function($evt){
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
