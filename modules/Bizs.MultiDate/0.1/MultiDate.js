;(function(define, _win) { 'use strict'; define( 'Bizs.MultiDate', [ 'JC.BaseMVC', 'JC.Calendar' ], function(){
    window.Bizs.MultiDate = MultiDate;
    /**
     * MultiDate 复合日历业务逻辑
     * 根据select选项弹出日、周、月、季日历，并计算出起始日期和结束日期
     * <p><b>require</b>: v
     *      <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
     *      , <a href='JC.Calendar.html'>JC.Calendar</a>
     * </p>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc2.openjavascript.org/docs_api/classes/window.Bizs.MultiDate.html' target='_blank'>API docs</a>
     * | <a href='../../modules/Bizs.MultiDate/0.1/_demo' target='_blank'>demo link</a></p>
     * @class   MultiDate
     * @namespace   window.Bizs
     * @constructor
     * @private
     * @version dev 0.1 2013-09-03
     * @author  qiushaowei   <suches@btbtd.org> | 75 Team
     */
    function MultiDate( _selector ){
        if( MultiDate.getInstance( _selector ) ) return MultiDate.getInstance( _selector );
        MultiDate.getInstance( _selector, this );

        this._model = new MultiDate.Model( _selector );
        this._view = new MultiDate.View( this._model );

        this._init();    
    }
    
    MultiDate.prototype = {
        _beforeInit:
            function(){
                this._model.mdstartdate().attr( 'ignoreInitCalendarDate', true ).data( 'ignoreInitCalendarDate', true );
                this._model.mdenddate().attr( 'ignoreInitCalendarDate', true ).data( 'ignoreInitCalendarDate', true );
                JC.log( 'MultiDate _beforeInit', new Date().getTime() );
            }
        , _initHanlderEvent:
            function(){
                var _p = this;


                $( [ _p._view, _p._model ] ).on('BindEvent', function( _evt, _evtName, _cb ){
                    _p.on( _evtName, _cb );
                });

                $([ _p._view, _p._model ] ).on('TriggerEvent', function( _evt, _evtName ){
                    var _data = JC.f.sliceArgs( arguments ); _data.shift(); _data.shift();
                    _p.trigger( _evtName, _data );

                });
                _p._initDefaultValue();
                JC.f.safeTimeout( function(){
                    _p._initDefaultValue();
                }, _p.selector(), 'as3asdfasew3asdf', 201 );
                _p._initHandlerEvent();

                _p.selector().trigger( 'change', [ true ] );
            }
        , _initDefaultValue:
            function(){
                //将url上带入的参数赋给各标签
                var _p = this
                    , _qs = _p._model.qstartdate()
                    , _qe = _p._model.qenddate()
                    , _mdcusStart = _p._model.mdCustomStartDate()
                    , _mdcusEnd= _p._model.mdCustomEndDate()
                    , _type = _p._model.qtype() || _p._model.selector().val()
                    , _defaultBox = _p._model.mdDefaultBox()
                    , _customBox = _p._model.mdCustomBox()
                    ;

                _p._model.selector( _p._model.qtype() );
                _p._model.mdstartdate( _qs );
                _p._model.mdenddate( _qe );

                //如果日期没有name属性，那么赋值
                if( !_p._model.mddate().attr('name') ){
                    
                    if( _qs && _qe ){
                        if( _qs == _qe ){
                            _p._model.mddate( JC.f.formatISODate(JC.f.parseISODate(_qs)) );
                        }else{
                            _p._model.mddate( JC.f.printf( '{0} 至 {1}'
                                        , JC.f.formatISODate(JC.f.parseISODate(_qs))
                                        , JC.f.formatISODate(JC.f.parseISODate(_qe))
                                        ) );
                        }
                    }
                }else{
                    //将url上的日期赋给日期控件
                    _p._model.mddate( _p._model.qdate() );
                }

                if (_type !== 'custom' && _p._model.mdlastdate() ) {
                    _p._model.setmaxdate(_type);
                }

                //如果是daterange类型，那么将url上的起止时间赋值给他们。
                _mdcusStart && _mdcusStart.length && _mdcusStart.val( _qs ? JC.f.formatISODate( JC.f.parseISODate( _qs ) ) : _qs );
                _mdcusEnd && _mdcusEnd.length && _mdcusEnd.val( _qe ? JC.f.formatISODate( JC.f.parseISODate( _qe ) ) : _qe );

            }
        , _initHandlerEvent:
            function(){
                var _p = this;
                _p._model.selector().on('change', function( _evt, _noPick ){
                    var _sp = $(this)
                        , _type = _sp.val().trim().toLowerCase()
                        , _defaultBox = _p._model.mdDefaultBox()
                        , _customBox = _p._model.mdCustomBox()
                        ;
    
                    if( _type == 'custom' ){
                        if( _defaultBox && _customBox && _defaultBox.length && _customBox.length ){
                            _defaultBox.hide();
                            _defaultBox.find('input').prop( 'disabled', true );

                            _customBox.find('input').prop( 'disabled', false );
                            _customBox.show();
                        }
                    }else{
                        if( _defaultBox && _customBox && _defaultBox.length && _customBox.length ){
                           
                            _customBox.hide();
                            _customBox.find('input').prop( 'disabled', true);

                            _defaultBox.find('input').prop( 'disabled', false);
                            _defaultBox.show();
                        }

                        if ( _p._model.mdlastdate() ) {
                            _p._model.setmaxdate(_type);
                        }

                        //页面load，不需要显示日期面板，直接return;
                        if( _noPick ) return;
                        _p._model.settype( _type );

                        setTimeout(function(){
                            JC.Calendar.pickDate( _p._model.mddate()[0] );
                            if (!_p._model.setdefaulthiddendate()) {
                                _p._model.mdstartdate( '' );
                                _p._model.mdenddate( '' );
                            }
                        }, 10);
                    }
                });
            }
        , _inited:
            function(){
                JC.log( 'MultiDate _inited', new Date().getTime() );
            }
    }
    /**
     * 获取或设置 MultiDate 的实例
     * @method  getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {MultiDateInstance}
     */
    MultiDate.getInstance =
        function( _selector, _setter ){
            if( typeof _selector == 'string' && !/</.test( _selector ) ) 
                    _selector = $(_selector);
            if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
            typeof _setter != 'undefined' && _selector.data( MultiDate.Model._instanceName, _setter );

            return _selector.data( MultiDate.Model._instanceName );
        };
    /**
     * 判断 selector 是否可以初始化 MultiDate
     * @method  isMultiDate
     * @param   {selector}      _selector
     * @static
     * @return  bool
     */
    MultiDate.isMultiDate =
        function( _selector ){
            var _r;
            _selector 
                && ( _selector = $(_selector) ).length 
                && ( _r = _selector.is( '[MultiDatelayout]' ) );
            return _r;
        };


    BaseMVC.buildModel( MultiDate );
    MultiDate.Model._instanceName = 'MultiDate';

    MultiDate.Model._inscount = 1;
    
    MultiDate.Model.prototype = {
        init:
            function(){
                var _p = this
                    , _updatecb = 'Bizs.MultiDate_' + ( MultiDate.Model._inscount)
                    , _showcb = 'Bizs.MultiDate_show_' + ( MultiDate.Model._inscount)
                    , _hidecb = 'Bizs.MultiDate_hide_' + ( MultiDate.Model._inscount)
                    , _layoutchangecb = 'Bizs.MultiDate_layoutchange_' + ( MultiDate.Model._inscount)
                    ;
                MultiDate.Model._inscount++;

                window[ _updatecb ] = 
                    function( _startDate, _endDate, _calendarIns ){
                        _p.mdstartdate( JC.f.formatISODate( _startDate, '' ) );
                        _p.mdenddate( JC.f.formatISODate( _endDate, '' ) );
                    };
                _p.mddate().attr('calendarupdate', _updatecb);

                window[ _showcb ] = 
                    function(){
                        var _layout = $('body > div.UXCCalendar:visible');
                            _layout.length && JC.Tips && JC.Tips.init( _layout.find('[title]') );
                    };
                _p.mddate().attr('calendarshow', _showcb );

                window[ _hidecb ] = 
                    function(){
                        JC.Tips && JC.Tips.hide();
                        _p.updateHiddenDate();
                    };
                _p.mddate().attr('calendarhide', _hidecb );

                window[ _layoutchangecb ] = 
                    function(){
                        JC.Tips && JC.Tips.hide();
                        var _layout = $('body > div.UXCCalendar:visible');
                        _layout.length && JC.Tips && JC.Tips.init( _layout.find('[title]') );
                    };
                _p.mddate().attr('calendarlayoutchange', _layoutchangecb );

                return _p;
            }

        , mdDefaultBox: function(){ 
            return this.selectorProp( 'mdDefaultBox' ); 
        }
        , mdCustomBox: function(){ 
            //datatype = datarange
            return this.selectorProp( 'mdCustomBox' ); 
         }

        , mdCustomStartDate: function(){ return this.selectorProp( 'mdCustomStartDate' ); }
        , mdCustomEndDate: function(){ return this.selectorProp( 'mdCustomEndDate' ); }

        , selector: 
            function( _setter ){ 

                typeof _setter != 'undefined' 
                    && this.hastype( this.qtype() ) 
                    && this._selector.val( _setter )
                    && this.settype( _setter )
                    ;
                return this._selector; 
            }

        , mdlastdate:
            function () {
                var r = this.selector().attr('mdlastdate');
                r = JC.f.parseBool(r);
                return r ;
            }

        , mddate: 
            //返回日期控件，如果有日期赋值
            function( _setter ){ 
                var _r = JC.f.parentSelector( this.selector(), this.selector().attr('mddate') );
                typeof _setter != 'undefined' && _r.val( _setter );

                return _r; 
            }
        , mdstartdate: 
            //隐藏域开始日期
            function( _setter ){ 
                var _r = JC.f.parentSelector( this.selector(), this.selector().attr('mdstartdate') );
                typeof _setter != 'undefined' && _r.val( _setter.replace(/[^\d]/g, '') );
                return _r;
            }
        , mdenddate: 
            //隐藏域结束日期
            function( _setter ){ 
                var _r = JC.f.parentSelector( this.selector(), this.selector().attr('mdenddate') );
                typeof _setter != 'undefined' && _r.val( _setter.replace(/[^\d]/g, '') );
                return _r;
            }

        , setdefaulthiddendate: function () {
            return JC.f.parseBool(this.selector().attr('setdefaulthiddendate'));
        }

        , qtype: function(){
            //获取url上的日期类型参数
            return this.decodedata( JC.f.getUrlParam( this.selector().attr('name') || '' ) || '' ).toLowerCase();
        }

        , qdate: function(){
            //获取url上的日期值
            return this.decodedata( JC.f.getUrlParam( this.mddate().attr('name') || '' ) || '' ).toLowerCase();
        }

        , qstartdate: function(){
            //获取url上的开始日期
            return this.decodedata( JC.f.getUrlParam( this.mdstartdate().attr('name') || '' ) || '' ).toLowerCase();
        }

        , qenddate: function(){
            //获取url上的结束日期
            return this.decodedata( JC.f.getUrlParam( this.mdenddate().attr('name') || '' ) || '' ).toLowerCase();
        }

        , hastype:
            //是否为可处理的日期类型
            function( _type ){
                var _r = false;
                this.selector().find('> option').each( function(){
                    if( $(this).val().trim() == _type ){
                        _r = true;
                        return false;
                    }
                });
                return _r;
            }

        , settype:
            //修改日期控件的日期类型日、周、月、季
            function( _type ){
                this.mddate().val('').attr( 'multidate', _type );
            }
        , decodedata:
            function( _d ){
                _d = _d.replace( /[\+]/g, ' ' );
                try{ _d = decodeURIComponent( _d ); }catch(ex){}
                return _d;
            }
        , updateHiddenDate: 
            //更新隐藏域开始结束日期的值，如果日期为空那么隐藏域的值为空，否则8位日期
            function (){
                var _date = $.trim( this.mddate().val() );
                if( !_date ){
                    this.mdstartdate('');
                    this.mdenddate('');
                    return;
                }
                _date = _date.replace( /[^\d]+/g, '' );
                if( _date.length == 8 ){
                    this.mdstartdate( _date );
                    this.mdenddate( _date );
                }
                if( _date.length == 16 ){
                    this.mdstartdate( _date.slice(0, 8) );
                    this.mdenddate( _date.slice(8) );
                }
            }

        , setmaxdate: function (_type) {
            var _p = this,
                _tmpDate,
                _maxDate,
                _startDate,
                _strDate;

            switch( _type ) {
                case 'week':
                    _tmpDate = JC.f.dateDetect('now -1w');
                    _maxDate = JC.f.formatISODate(JC.f.dayOfWeek(_tmpDate).end);
                    _strDate = JC.f.formatISODate(JC.f.dayOfWeek(_tmpDate).start) + '至' + _maxDate;
                    break;
                case 'month':
                    _tmpDate = JC.f.dateDetect('now -1m');
                    _maxDate = JC.f.cloneDate(_tmpDate);
                    _maxDate.setDate(JC.f.maxDayOfMonth(_tmpDate));
                    _maxDate = JC.f.formatISODate(_maxDate);
                    _startDate = JC.f.cloneDate(_tmpDate);
                    _startDate.setDate(1);
                    _strDate = JC.f.formatISODate(_startDate) + '至' + _maxDate;
                    break;
                case 'season':
                    _tmpDate = JC.f.dayOfSeason(new Date()).q - 2;
                    _tmpDate > 0? _tmpDate: 0;
                    _maxDate = JC.f.seasonOfYear(new Date().getFullYear())[_tmpDate].end;
                    _maxDate = JC.f.formatISODate(_maxDate);
                    _startDate = JC.f.formatISODate(JC.f.seasonOfYear(new Date().getFullYear())[_tmpDate].start);
                    _strDate = _startDate + '至' + _maxDate;
                    break;
                case 'date':
                    _maxDate = new Date();
                    _maxDate.setDate(_maxDate.getDate() - 1);
                    _maxDate = JC.f.formatISODate(_maxDate);
                    _strDate = _maxDate 
                    break;
            }

            _p.mddate().attr('maxValue', _maxDate);
            if (_p.setdefaulthiddendate()) {
                setTimeout(function () {
                    _p.mddate().val(_strDate);
                }, 30);
            }
        }

    };

    BaseMVC.buildView( MultiDate );
    MultiDate.View.prototype = {
        init:
            function() {
                return this;
            }

        , hide:
            function(){
            }

        , show:
            function(){
            }
    };

    BaseMVC.build( MultiDate, 'Bizs' );    

    $(document).ready( function(){
        $('select.js_autoMultidate').each( function(){
            new MultiDate( $(this) );
        });
    });

    return Bizs.MultiDate;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
