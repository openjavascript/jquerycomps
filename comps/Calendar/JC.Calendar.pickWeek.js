;(function($){
    /**
     * 自定义周弹框的模板HTML
     * @for         JC.Calendar
     * @property    weekTpl
     * @type        string
     * @default     empty
     * @static
     */
    JC.Calendar.weekTpl = '';
    /**
     * 自定义周日历每周的起始日期 
     * <br /> 0 - 6, 0=周日, 1=周一
     * @for         JC.Calendar
     * @property    weekDayOffset
     * @static
     * @type    int
     * @default 1
     */
    JC.Calendar.weekDayOffset = 0;

    function WeekModel( _selector ){
        this._selector = _selector;
    }
    JC.Calendar.WeekModel = WeekModel;
    
    function WeekView( _model ){
        this._model = _model;
    }
    JC.Calendar.WeekView = WeekView;

    JC.Calendar.clone( WeekModel, WeekView );

    WeekModel.prototype.layout = 
        function(){
            var _r = $('#UXCCalendar_week');

            if( !_r.length ){
                _r = $( JC.Calendar.weekTpl || this.tpl ).hide();
                _r.attr('id', 'UXCCalendar_week').hide().appendTo( document.body );
              }
            return _r;
        };

    WeekModel.prototype.tpl =
        [
        '<div id="UXCCalendar_week" class="UXCCalendar UXCCalendar_week" >'
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
        ].join('');

    WeekModel.prototype.month = 
        function(){
            var _r = 0, _tmp, _date = new Date();
            ( _tmp = this.layout().find('td.cur a[dstart]') ).length
                && ( _date = new Date() )
                && (
                        _date.setTime( _tmp.attr('dstart') )
                   )
                ;
            _r = _date.getMonth();
            return _r;
        };

    WeekModel.prototype.selectedDate =
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
        };

    WeekModel.prototype.singleLayoutDate = 
        function(){
            var _p = this
                , _dateo = _p.defaultDate()
                , _day = this.day()
                , _max
                , _curWeek = _p.layout().find('td.cur > a[week]')
                ;
            _dateo.date.setDate( 1 );
            _dateo.date.setFullYear( this.year() );
            _dateo.date.setMonth( this.month() );
            _max = maxDayOfMonth( _dateo.date );
            _day > _max && ( _day = _max );
            _dateo.date.setDate( _day );

            _curWeek.length && ( _dateo.curweek = parseInt( _curWeek.attr('week'), 10 ) );
            JC.log( 'WeekModel.singleLayoutDate:', _curWeek.length, _dateo.curweek );

            return _dateo;
        };

    WeekView.prototype._buildBody =
        function( _dateo ){
            var _p = this
                , _date = _dateo.date
                , _layout = _p._model.layout()
                , today = new Date( new Date().getFullYear(), new Date().getMonth(), new Date().getDate() ).getTime()
                , weeks = weekOfYear( _date.getFullYear(), JC.Calendar.weekDayOffset )
                , nextYearWeeks = weekOfYear( _date.getFullYear() + 1, JC.Calendar.weekDayOffset )
                , nextCount = 0
                , _ls = [], _class, _data, _title, _sdate, _edate, _year = _date.getFullYear()
                , _rows = Math.ceil( weeks.length / 8 )
                , ipt = JC.Calendar.lastIpt
                , currentcanselect = parseBool( ipt.attr('currentcanselect') )
                ;

            if( _dateo.maxvalue && currentcanselect ){
                var _wd = _dateo.maxvalue.getDay();
                if( _wd > 0 ) {
                    _dateo.maxvalue.setDate( _dateo.maxvalue.getDate() + ( 7 - _wd ) );
                }
            }

            _ls.push('<tr>');
            for( i = 1, j = _rows * 8; i <= j; i++ ){
                _data = weeks[ i - 1];
                if( !_data ) {
                    _data = nextYearWeeks[ nextCount++ ];
                    _year = _date.getFullYear() + 1;
                }
                _sdate = new Date(); _edate = new Date();
                _sdate.setTime( _data.start ); _edate.setTime( _data.end );

                _title = printf( "{0}年 第{1}周\n开始日期: {2} (周{4})\n结束日期: {3} (周{5})"
                            , _year
                            , JC.Calendar.getCnNum( _data.week )
                            , formatISODate( _sdate )
                            , formatISODate( _edate )
                            , JC.Calendar.cnWeek.charAt( _sdate.getDay() % 7 )
                            , JC.Calendar.cnWeek.charAt( _edate.getDay() % 7 )
                            );

                _class = [];

                if( _dateo.minvalue && _sdate.getTime() < _dateo.minvalue.getTime() ) 
                    _class.push( 'unable' );
                if( _dateo.maxvalue && _edate.getTime() > _dateo.maxvalue.getTime() ){
                    _class.push( 'unable' );
                }

                if( _dateo.curweek ){
                    if( _data.week == _dateo.curweek 
                        && _date.getFullYear() == _sdate.getFullYear() 
                        ) _class.push( 'cur' );
                }else{
                    if( _date.getTime() >= _sdate.getTime() && _date.getTime() <= _edate.getTime() ) _class.push( 'cur' );
                }

                if( today >= _sdate.getTime() && today <= _edate.getTime() ) _class.push( 'today' );

                _ls.push( printf( '<td class="{0}"><a href="javascript:" title="{2}"'+
                                ' dstart="{3}" dend="{4}" week="{1}" date="{5}" >{1}</a></td>'
                            , _class.join(' ')
                            , _data.week 
                            , _title
                            , _sdate.getTime()
                            , _edate.getTime()
                            , _dateo.date.getTime()
                        ));
                if( i % 8 === 0 && i != j ) _ls.push( '</tr><tr>' );
            }
            _ls.push('</tr>'); 

            _layout.find('table.UTableBorder tbody' ).html( $( _ls.join('') ) );
        };

    WeekView.prototype.updateSelected = 
        function( _userSelectedItem ){
            var _p = this, _dstart, _dend, _tmp;
            if( !_userSelectedItem ){
                _tmp = this._model.selectedDate();
                _tmp && ( _dstart = _tmp.start, _dend = _tmp.end );
            }else{
                _userSelectedItem = $( _userSelectedItem );
                _tmp = getJqParent( _userSelectedItem, 'td' );
                if( _tmp && _tmp.hasClass('unable') ) return;
                _dstart = new Date(); _dend = new Date();
                _dstart.setTime( _userSelectedItem.attr('dstart') );
                _dend.setTime( _userSelectedItem.attr('dend') );
            }
            if( !( _dstart && _dend ) ) return;

            _p._model.selector().val( printf( '{0} 至 {1}', formatISODate( _dstart ), formatISODate( _dend ) ) );
            $(_p).trigger( 'TriggerEvent', [ JC.Calendar.Model.UPDATE, 'week', _dstart, _dend ] );

            JC.Calendar.hide();
        };
    /**
     * 取一年中所有的星期, 及其开始结束日期
     * @method  weekOfYear
     * @static
     * @param   {int}   _year
     * @param   {int}   _dayOffset  每周的默认开始为周几, 默认0(周一)
     * @return  Array
     */
    function weekOfYear( _year, _dayOffset ){
        var _r = [], _tmp, _count = 1, _dayOffset = _dayOffset || 0
            , _year = parseInt( _year, 10 )
            , _d = new Date( _year, 0, 1 );
        /**
         * 元旦开始的第一个星期一开始的一周为政治经济上的第一周
         */
         _d.getDay() > 1 && _d.setDate( _d.getDate() - _d.getDay() + 7 );

         _d.getDay() === 0 && _d.setDate( _d.getDate() + 1 );

         _dayOffset > 0 && ( _dayOffset = (new Date( 2000, 1, 2 ) - new Date( 2000, 1, 1 )) * _dayOffset );

        while( _d.getFullYear() <= _year ){
            _tmp = { 'week': _count++, 'start': null, 'end': null };
            _tmp.start = _d.getTime() + _dayOffset;
            _d.setDate( _d.getDate() + 6 );
            _tmp.end = _d.getTime() + _dayOffset;
            _d.setDate( _d.getDate() + 1 );
            if( _d.getFullYear() > _year ) {
                _d = new Date( _d.getFullYear(), 0, 1 );
                if( _d.getDay() < 2 ) break;
             }
            _r.push( _tmp );
        }
        return _r;
    }
}(jQuery));
