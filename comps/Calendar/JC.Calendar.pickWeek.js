(function($){
    /**
     * 弹出一年中所有周的选择框
     * @method  pickWeek
     * @for     JC.Calendar
     * @static
     * @param   {selector}  _selector
     */
    JC.Calendar.pickWeek =
        function( _selector ){
            _logic.lastDateObj = JC.Calendar.getDate( _selector );
            JC.Calendar.lastIpt = _selector;
            JC.Calendar.setPosition( _selector, _logic.update( _logic.lastDateObj ) );
        };
    /**
     * 自定义周弹框的模板HTML
     * @for         JC.Calendar
     * @property    pickWeek.tpl
     * @type        string
     * @default     empty
     * @static
     */
    JC.Calendar.pickWeek.tpl = '';
    /**
     * 自定义周日历每周的起始日期 
     * <br /> 0 - 6, 0=周日, 1=周一
     * @for         JC.Calendar
     * @property    pickWeek.dayOffset
     * @static
     * @type    int
     * @default 1
     */
    JC.Calendar.pickWeek.dayOffset = 1;

    var _logic = {
        getLayout:
            function(){
                var _box
                if( !( _box = $('#UXCCalendar_week') ).length ){
                    _box = $( JC.Calendar.pickWeek.tpl || _logic.tpl ); 
                    _box.appendTo( document.body );
                    _box.data('confirmMethod', _logic.onConfirm );
                    _box.data('updateYearMethod', _logic.updateYear );
                    _box.data('nextYearMethod', _logic.nextYear );
                    _box.data('preYearMethod', _logic.preYear );
                }
                return _box;
            }

        , onConfirm:
            function(){
                JC.log( 'Calendar.pickWeek, onConfirm' );
                var _cur = _logic.getLayout().find('td.cur');
                if( !_cur.length ) _logic.getLayout().find('td.today');
                if( _cur.length && _cur.hasClass('unable') ) return 0;
                if( _cur.length ) _cur.find('a').trigger('click');
            }
        , updateYear:
            function( _val ){
                if( !_logic.lastDateObj ) return;
                _logic.lastDateObj.date.setFullYear( _val );
                JC.Calendar.updateInitYearList( _logic.lastDateObj );
                _logic.update( _logic.lastDateObj );
            }
        , nextYear:
            function(){
                JC.log( 'nextYearMethod' );
                if( !_logic.lastDateObj ) return;
                _logic.updateYear( _logic.lastDateObj.date.getFullYear() + 1)
            }
        , preYear:
            function(){
                JC.log( 'preYearMethod' );
                if( !_logic.lastDateObj ) return;
                _logic.updateYear( _logic.lastDateObj.date.getFullYear() - 1)
            }
        , update:
            function( _dateObj ){
                _logic.getLayout();
                _logic.updateHead( _dateObj );
                _logic.updateBody( _dateObj );
                return _logic.getLayout();
            }
        , updateHead:
            function( _dateObj ){
                var _layout = _logic.getLayout(), _ls = [], _tmp, _selected
                    , _sYear = _dateObj.initMinvalue.getFullYear()
                    , _eYear = _dateObj.initMaxvalue.getFullYear();


                if( !_selected ) _selected = _dateObj.date.getFullYear();

                for( var i = _sYear; i <= _eYear; i++ ){
                    _tmp = '';
                    if( _selected === i ) _tmp = " selected "
                    _ls.push( '<option value="'+i+'"'+_tmp+'>'+i+'</option>' );
                }

                $( _ls.join('') ).appendTo( _layout.find('select.UYear').html('') );

            }
        , updateBody:
            function( _dateObj ){
                var _date = _dateObj.date;
                var _layout = _logic.getLayout();
                    _layout.find('button.UYearButton').html( _date.getFullYear() );

                var today = new Date( new Date().getFullYear(), new Date().getMonth(), new Date().getDate() ).getTime();
                var weeks = weekOfYear( _date.getFullYear(), JC.Calendar.pickWeek.dayOffset );
                var nextYearWeeks = weekOfYear( _date.getFullYear() + 1, JC.Calendar.pickWeek.dayOffset );
                var nextCount = 0;
                var _ls = [], _class, _data, _title, _sdate, _edate, _year = _date.getFullYear()
                    , _rows = Math.ceil( weeks.length / 8 );

                var ipt = JC.Calendar.lastIpt, currentcanselect = parseBool( ipt.attr('currentcanselect') );

                if( _dateObj.maxvalue && currentcanselect ){
                    var _wd = _dateObj.maxvalue.getDay();
                    if( _wd > 0 ) {
                        _dateObj.maxvalue.setDate( _dateObj.maxvalue.getDate() + ( 7 - _wd ) );
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

                    _title = printf( "{0}年 第{1}周<br/>开始日期: {2} (周{4})<br />结束日期: {3} (周{5})"
                                , _year
                                , JC.Calendar.getCnNum( _data.week )
                                , formatISODate( _sdate )
                                , formatISODate( _edate )
                                , JC.Calendar.cnWeek.charAt( _sdate.getDay() % 7 )
                                , JC.Calendar.cnWeek.charAt( _edate.getDay() % 7 )
                                );

                    _class = [];

                    if( _dateObj.minvalue && _sdate.getTime() < _dateObj.minvalue.getTime() ) 
                        _class.push( 'unable' );
                    if( _dateObj.maxvalue && _edate.getTime() > _dateObj.maxvalue.getTime() ){
                        _class.push( 'unable' );
                    }

                    if( _date.getTime() >= _sdate.getTime() && _date.getTime() <= _edate.getTime() ) _class.push( 'cur' );
                    if( today >= _sdate.getTime() && today <= _edate.getTime() ) _class.push( 'today' );

                    _ls.push( printf( '<td class="{0}"><a href="javascript:" title="{2}"'+
                                    ' dstart="{3}" dend="{4}" week="{1}" >{1}</a></td>'
                                , _class.join(' ')
                                , _data.week 
                                , _title
                                , _sdate.getTime()
                                , _edate.getTime()
                            ));
                    if( i % 8 === 0 && i != j ) _ls.push( '</tr><tr>' );
                }
                _ls.push('</tr>'); 
 
                _layout.find('table.UTableBorder tbody' ).html( $( _ls.join('') ) );

            }
        /**
         * 最后一个显示日历组件的日期对象
         * @property    _logic.lastDateObj
         * @type        Object
         * @private
         */
        , lastDateObj: null
        , tpl:
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
            ].join('')
    };
    /**
     * 取一年中所有的星期, 及其开始结束日期
     * @method  weekOfYear
     * @static
     * @param   {int}   _year
     * @param   {int}   _dayOffset  每周的默认开始为周几, 默认0(周日)
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

    $(document).delegate('#UXCCalendar_week table a', 'click', function( _evt ){
        var _p = $(this), dstart = new Date(), dend = new Date();
        if( !JC.Calendar.lastIpt ) return;
        if( _p.parent('td').hasClass( 'unable' ) ) return;
        dstart.setTime( _p.attr('dstart') );
        dend.setTime( _p.attr('dend') );
        JC.Calendar.lastIpt.val( printf( '{0} 至 {1}', formatISODate( dstart ), formatISODate( dend ) ) );
        JC.Calendar.hide();
        JC.Calendar._triggerUpdate( [ 'season', dstart, dend] );
    });


}(jQuery));
