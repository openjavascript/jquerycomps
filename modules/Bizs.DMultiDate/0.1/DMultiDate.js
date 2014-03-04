;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC', 'JC.Calendar' ], function(){
    window.Bizs.DMultiDate = DMultiDate;
    /**
     * DMultiDate 复合日历业务逻辑
     * <p><b>require</b>: 
     *      <a href='window.jQuery.html'>jQuery</a>
     *      , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
     *      , <a href='JC.Calendar.html'>JC.Calendar</a>
     * </p>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc2.openjavascript.org/docs_api/classes/window.Bizs.DMultiDate.html' target='_blank'>API docs</a>
     * | <a href='../../modules/Bizs.DMultiDate/0.1/_demo' target='_blank'>demo link</a></p>
     * @class   DMultiDate
     * @namespace   window.Bizs
     * @constructor
     * @private
     * @version dev 0.1 2014-03-03
     * @author  zuojing   <zuojing1013@gmail.com> | 75 Team
     */
    function DMultiDate( _selector ){
        if( DMultiDate.getInstance( _selector ) ) return DMultiDate.getInstance( _selector );
        DMultiDate.getInstance( _selector, this );

        this._model = new DMultiDate.Model( _selector );
        this._view = new DMultiDate.View( this._model );

        this._init();    
    }
    
    DMultiDate.prototype = {
        _beforeInit: function () {
            //JC.log( 'DMultiDate _beforeInit', new Date().getTime() );
        },

        _initHanlderEvent: function () {
            var _p = this;

            $( [ _p._view, _p._model ] ).on('BindEvent', function( _evt, _evtName, _cb ){
                _p.on( _evtName, _cb );

            });

            $([ _p._view, _p._model ] ).on('TriggerEvent', function( _evt, _evtName ){
                var _data = JC.f.sliceArgs( arguments ); 

                _data.shift(); 
                _data.shift();
                _p.trigger( _evtName, _data );
               
            });

            _p._initDefaultValue();
            _p._initHandlerEvent();

            _p.selector().trigger( 'change', [ true ] );
        }, 

        _initDefaultValue: function () {
            var _p = this, 
                _qs = _p._model.qstartdate(), //url上的开始日期 
                _qe = _p._model.qenddate(), //url上的结束日期
                _mdcusStart = _p._model.mdCustomStartDate(), //开始日期的html tag
                _mdcusEnd= _p._model.mdCustomEndDate(); //结束日期的html tag

            _p._model.selector( _p._model.qtype() ); //通过select的name从url上取下拉日期的类型（天，周，月）
            _p._model.mdstartdate( _qs ); //格式化开始日期
            _p._model.mdenddate( _qe ); //格式化结束日期


            if ( !_p._model.mddate().attr('name') ) { //input的name不存在执行的格式化，之前默认是不存在的
            
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
                _p._model.mddate( _p._model.qdate() ); //_p._model.qdate()取的是input的name的值
            }

            _mdcusStart && _mdcusStart.length && _mdcusStart.val( _qs ? JC.f.formatISODate( JC.f.parseISODate( _qs ) ) : _qs );
            _mdcusEnd && _mdcusEnd.length && _mdcusEnd.val( _qe ? JC.f.formatISODate( JC.f.parseISODate( _qe ) ) : _qe );

        }, 

        _initHandlerEvent: function () {
            
            var _p = this;
            _p._model.selector().on('change', function( _evt, _noPick ){
                var _sp = $(this), 
                    _type = _sp.val().trim().toLowerCase(),  //_type的值date,week,month,season
                    _defaultBox = _p._model.mdDefaultBox(), 
                    _customBox = _p._model.mdCustomBox(); //defaultBox, customBox不知道是什么

                if( _type == 'custom' ){ //这里_type怎么会等 custom呢
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
                    if( _noPick ) return;
                    _p._model.settype( _type ); //根据option设置input的日期类型（日，周，月，季）
                    setTimeout(function(){ //自动打开日期选择面板
                        JC.Calendar.pickDate( _p._model.mddate()[0] );
                        _p._model.mdstartdate( '' );
                        _p._model.mdenddate( '' );
                    }, 10);
                }
            });
        }, 
        _inited:function () {
            //JC.log( 'DMultiDate _inited', new Date().getTime() );
        }
    }
    /**
     * 获取或设置 DMultiDate 的实例
     * @method  getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {DMultiDateInstance}
     */
    DMultiDate.getInstance = function ( _selector, _setter ) {
        if( typeof _selector == 'string' && !/</.test( _selector ) ) 
                _selector = $(_selector);
        if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
        typeof _setter != 'undefined' && _selector.data( DMultiDate.Model._instanceName, _setter );

        return _selector.data( DMultiDate.Model._instanceName );
    };

    /**
     * 判断 selector 是否可以初始化 DMultiDate
     * @method  isDMultiDate
     * @param   {selector}      _selector
     * @static
     * @return  bool
     */
    DMultiDate.isDMultiDate = function( _selector ){
        var _r;
        _selector 
            && ( _selector = $(_selector) ).length 
            && ( _r = _selector.is( '[DMultiDatelayout]' ) );
        return _r;
    };


    BaseMVC.buildModel( DMultiDate );
    DMultiDate.Model._instanceName = 'DMultiDate';

    DMultiDate.Model._inscount = 1;
    
    DMultiDate.Model.prototype = {
        init: function () {
            var _p = this
                //, _updatecb = 'Bizs.DMultiDate_' + ( DMultiDate.Model._inscount)
                , _updatestartcb = 'Bizs.DMultiDate_Start' + ( DMultiDate.Model._inscount )
                , _updateendcb = 'Bizs.DMultiDate_End' + ( DMultiDate.Model._inscount)
                , _showcb = 'Bizs.DMultiDate_show_' + ( DMultiDate.Model._inscount)
                , _hidecb = 'Bizs.DMultiDate_hide_' + ( DMultiDate.Model._inscount)
                , _hidestartcb = 'Bizs.DMultiDate_hide_start_' + ( DMultiDate.Model._inscount)
                , _hideendcb = 'Bizs.DMultiDate_hide_end_' + ( DMultiDate.Model._inscount)
                , _layoutchangecb = 'Bizs.DMultiDate_layoutchange_' + ( DMultiDate.Model._inscount)
                ;

            DMultiDate.Model._inscount++;

            // window[ _updatecb ] = 
            //     function( _startDate, _endDate, _calendarIns ){
            //         _p.mdstartdate( JC.f.formatISODate( _startDate, '' ) );
            //         _p.mdenddate( JC.f.formatISODate( _endDate, '' ) );
            //     };

            window[ _updatestartcb ] = 
                function( _startDate, _endDate, _calendarIns ){
                    _p.mdstartdate( JC.f.formatISODate( _startDate, '' ) );
                    //_p.mdenddate( JC.f.formatISODate( _endDate, '' ) );
                    console.log("_startDate", _startDate);
                };

            window[ _updateendcb ] = 
                function( _startDate, _endDate, _calendarIns ){
                    //_p.mdstartdate( JC.f.formatISODate( _startDate, '' ) );
                    _p.mdenddate( JC.f.formatISODate( _endDate, '' ) );
                    console.log("_endDate", _endDate);
                };

            _p.mddate().eq(0).attr('calendarupdate', _updatestartcb);
            _p.mddate().eq(1).attr('calendarupdate', _updateendcb);
console.log("xxx");
            window[ _showcb ] = 
                function(){
                    var _layout = $('body > div.UXCCalendar:visible');
                    _layout.length && JC.Tips && JC.Tips.init( _layout.find('[title]') );
                };
            _p.mddate().attr('calendarshow', _showcb );

            // window[ _hidecb ] = 
            //     function(){
            //         JC.Tips && JC.Tips.hide();
            //         _p.updateHiddenDate();
            //     };

            window[ _hidestartcb ] = 
                function(){
                    JC.Tips && JC.Tips.hide();
                    _p.updateHiddenDate();
                };

            window[ _hideendcb ] = 
                function(){
                    JC.Tips && JC.Tips.hide();
                    _p.updateHiddenDate();
                };

            _p.mddate().eq(0).attr('calendarhide', _hidestartcb );
            _p.mddate().eq(1).attr('calendarhide', _hideendcb );

            window[ _layoutchangecb ] = 
                function(){
                    JC.Tips && JC.Tips.hide();
                    var _layout = $('body > div.UXCCalendar:visible');
                    _layout.length && JC.Tips && JC.Tips.init( _layout.find('[title]') );
                };
            _p.mddate().attr('calendarlayoutchange', _layoutchangecb );

            return _p;
        }, 

        mdDefaultBox: function () { 
            return this.selectorProp( 'mdDefaultBox' ); 
        },

        mdCustomBox: function() { 
            return this.selectorProp( 'mdCustomBox' ); 
        },

        mdCustomStartDate: function () { 
            return this.selectorProp( 'mdCustomStartDate' ); 
        },

        mdCustomEndDate: function () { 
            return this.selectorProp( 'mdCustomEndDate' ); 
        },
        
        selector: function ( _setter ) { 
            typeof _setter != 'undefined' 
                && this.hastype( this.qtype() ) 
                && this._selector.val( _setter )
                && this.settype( _setter )
                ;
            return this._selector; 
        }, 

        mddateBox: function ( _setter ) {
            var _r = JC.f.parentSelector( this.selector(), 
                this.selector().attr('mddatebox') );

            
            return _r; 
        },

        mddate: function ( _setter ) {

            var _r = this.mddateBox().find(this.selector().attr('mddate'));

            typeof _setter != 'undefined' && _r.val( _setter );
            return _r; 
        }, 

        mdstartdate: function ( _setter ) { 
            var _r = JC.f.parentSelector( this.selector(), this.selector().attr('mdstartdate') );
            typeof _setter != 'undefined' && _r.val( _setter.replace(/[^\d]/g, '') );
            return _r;
        }, 

        mdenddate: function( _setter ) { 
            var _r = JC.f.parentSelector( this.selector(), this.selector().attr('mdenddate') );
            typeof _setter != 'undefined' && _r.val( _setter.replace(/[^\d]/g, '') );
            return _r;
        }, 

        qtype: function () {
            return this.decodedata( JC.f.getUrlParam( this.selector().attr('name') || '' ) || '' ).toLowerCase();
        }, 

        qdate: function () {

            return this.decodedata( JC.f.getUrlParam( this.mddate().attr('name') || '' ) || '' ).toLowerCase();
        }, 

        qstartdate: function () {
            return this.decodedata( JC.f.getUrlParam( this.mdstartdate().attr('name') || '' ) || '' ).toLowerCase();
        }, 

        qenddate: function () {
            return this.decodedata( JC.f.getUrlParam( this.mdenddate().attr('name') || '' ) || '' ).toLowerCase();
        }, 

        hastype: function ( _type ) {
            var _r = false;
            this.selector().find('> option').each( function(){
                if( $(this).val().trim() == _type ){
                    _r = true;
                    return false;
                }
            });
            return _r;
        }, 

        settype: function( _type ) {
            //this.mddate().val('').attr( 'MultiDate', _type );
            var _mddateEl = this.mddate();
            
            switch( _type ) {
                case 'date':
                    this.selector().attr('mddatebox', '/.js_multidateDateBox');
                    //JC.f.parentSelector(_mddateEl, '.js_multidateDateBox').css('display', 'inline-block').siblings('.js_multidateBox').hide();
                    break;
                case 'week':
                    this.selector().attr('mddatebox', '/.js_multidateWeekBox');
                    //JC.f.parentSelector(_mddateEl, '.js_multidateWeekBox').css('display', 'inline-block').siblings('.js_multidateBox').hide();
                    break;
                case 'season':
                    this.selector().attr('mddatebox', '/.js_multidateSeasonBox');
                    //JC.f.parentSelector(_mddateEl, '.js_multidateSeasonBox').css('display', 'inline-block').siblings('.js_multidateBox').hide();
                    break;
                case 'month':
                    this.selector().attr('mddatebox', '/.js_multidateMonthBox');
                    //JC.f.parentSelector(_mddateEl, '.js_multidateMonthBox').css('display', 'inline-block').siblings('.js_multidateBox').hide();
                    break;
            }

            this.mddateBox().css('display', 'inline-block').siblings('.js_multidateBox').hide();
            _mddateEl.val('');
        }, 

        decodedata: function( _d ){
            _d = _d.replace( /[\+]/g, ' ' );
            try{ _d = decodeURIComponent( _d ); }catch(ex){}
            return _d;
        },

        updateHiddenDate: function (  ) {
            var _p = this;

            _p.mddate().each( function ( _ix ) {
                var _sp = $(this),
                    _date = $.trim( _sp.val() );
                
                if ( !_date ) {
                    _ix === 0 && _p.mdstartdate('');
                    _ix === 1 && _p.mdenddate('');
                    return;
                }

                _date = _date.replace( /[^\d]+/g, '' );
                
                if ( _ix === 0 ) {
                    _p.mdstartdate( _date );
                }

                if ( _ix === 2 ) {
                    _p.mdenddate( _date );
                }

                // if( _date.length == 8 ){
                //     this.mdstartdate( _date );
                //     this.mdenddate( _date );
                // }

                // if( _date.length == 16 ){
                //     this.mdstartdate( _date.slice(0, 8) );
                //     this.mdenddate( _date.slice(8) );
                // }

            });
            
        }

    };

    BaseMVC.buildView( DMultiDate );
    DMultiDate.View.prototype = {
        init: function () {
            return this;
        }
    };

    BaseMVC.build( DMultiDate, 'Bizs' );

    $(document).ready( function(){
        $('select.js_autoDMultiDate').each( function(){
            new DMultiDate( $(this) );
        });

    });

    return Bizs.DMultiDate;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
