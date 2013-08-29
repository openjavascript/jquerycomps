(function($){
    /**
     * 弹出一年中所有月份的选择框
     * @method  pickMonth
     * @for     JC.Calendar
     * @static
     * @param   {selector}  _selector
     */
    JC.Calendar.pickMonth =
        function( _selector ){
            _logic.lastDateObj = JC.Calendar.getDate( _selector );
            JC.Calendar.lastIpt = _selector;
            JC.Calendar.setPosition( _selector, _logic.update( _logic.lastDateObj ) );
        };
    /**
     * 自定义月份弹框的模板HTML
     * @for         JC.Calendar
     * @property    pickMonth.tpl
     * @type        string
     * @default     empty
     * @static
     */
    JC.Calendar.pickMonth.tpl = '';

    var _logic = {
        getLayout:
            function(){
                var _box
                if( !( _box = $('#UXCCalendar_month') ).length ){
                    _box = $( JC.Calendar.pickMonth.tpl || _logic.tpl ); 
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
                JC.log( 'Calendar.pickMonth, onConfirm' );
                if( JC.Calendar.isMultiSelect() ){
                    JC.log( 'pickMonth multiselect' );
                    _logic.updateMultiSelect();
                    return;
                }
                var _cur = _logic.getLayout().find('td.cur');
                if( !_cur.length ) _logic.getLayout().find('td.today');
                if( _cur.length && _cur.hasClass('unable') ) return 0;
                if( _cur.length ) _cur.find('a').trigger('click');
            }

        , updateMultiSelect:
            function(){
                var _r = [], _text = [], _ls = _logic.getLayout().find('td.cur'), _dstart, _dend, _td, _p;
                _ls.each( function(){
                    _td = $(this), _p = _td.find('> a');
                    if( _p.is( '.unable' ) ) return;
                    _dstart = new Date();
                    _dend = new Date();
                    _dstart.setTime( _p.attr('dstart') );
                    _dend.setTime( _p.attr('dend') );

                    _r.push( {'begin': _dstart, 'end': _dend } );
                    _text.push( printf( '{0} 至 {1}', formatISODate( _dstart ), formatISODate( _dend ) ) );
                });
                JC.Calendar.lastIpt.val( _text.join(', ') );
                JC.Calendar._triggerUpdateMultiSelect( [ 'month', _r ] );
                return _r;
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
                var _ls = [], _class, _data, _title, _sdate, _edate, _cnUnit
                    , _year = _date.getFullYear();

                var ipt = JC.Calendar.lastIpt, currentcanselect = parseBool( ipt.attr('currentcanselect') );

                if( _dateObj.maxvalue && currentcanselect ){
                    _dateObj.maxvalue.setDate( maxDayOfMonth( _dateObj.maxvalue ) );
                }

                _ls.push('<tr>');
                for( i = 1, j = 12; i <= j; i++ ){
                    _sdate = new Date( _year, i - 1, 1 ); 
                    _edate = new Date( _year, i - 1, maxDayOfMonth( _sdate ) );

                    _title = printf( "{0}年 {1}月<br/>开始日期: {2} (周{4})<br />结束日期: {3} (周{5})"
                                , _year
                                , JC.Calendar.getCnNum( i )
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

                    _cnUnit = JC.Calendar.cnUnit.charAt( i % 10 );
                    i > 10 && ( _cnUnit = "十" + _cnUnit );

                    _ls.push( printf( '<td class="{0}"><a href="javascript:" title="{1}"'+
                                    ' dstart="{3}" dend="{4}" month="{5}" >{2}月</a></td>'
                                , _class.join(' ')
                                , _title
                                , _cnUnit
                                , _sdate.getTime()
                                , _edate.getTime()
                                , i
                            ));
                    if( i % 3 === 0 && i != j ) _ls.push( '</tr><tr>' );
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
    };

    $(document).delegate('#UXCCalendar_month table a', 'click', function( _evt ){
        var _p = $(this), dstart = new Date(), dend = new Date()
            , _isMultiselect = JC.Calendar.isMultiSelect()
            , _td = _p.parent('td')
        ;
        if( !JC.Calendar.lastIpt ) return;
        if( _td.hasClass( 'unable' ) ) return;
        dstart.setTime( _p.attr('dstart') );
        dend.setTime( _p.attr('dend') );

        if( _isMultiselect ){
            UXC.log( '_isMultiselect', new Date().getTime() );
            _td.toggleClass( 'cur' );
            return; 
        }

        JC.Calendar.lastIpt.val( printf( '{0} 至 {1}', formatISODate( dstart ), formatISODate( dend ) ) );
        JC.Calendar.hide();
        JC.Calendar._triggerUpdate( [ 'month', dstart, dend] );
    });

}(jQuery));
