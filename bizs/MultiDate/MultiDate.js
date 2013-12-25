;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC', 'JC.Calendar' ], function(){
    window.Bizs.MultiDate = MultiDate;
    /**
     * MultiDate 复合日历业务逻辑
     * <p><b>require</b>: 
     *      <a href='.jQuery.html'>jQuery</a>
     *      , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
     *      , <a href='JC.Calendar.html'>JC.Calendar</a>
     * </p>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc.openjavascript.org/docs_api/classes/window.Bizs.MultiDate.html' target='_blank'>API docs</a>
     * | <a href='../../bizs/MultiDate/_demo' target='_blank'>demo link</a></p>
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
                _p._initHandlerEvent();

                _p.selector().trigger( 'change', [ true ] );
            }
        , _initDefaultValue:
            function(){
                var _p = this
                    , _qs = _p._model.qstartdate()
                    , _qe = _p._model.qenddate()
                    , _mdcusStart = _p._model.mdCustomStartDate()
                    , _mdcusEnd= _p._model.mdCustomEndDate()
                    ;

                _p._model.selector( _p._model.qtype() );
                _p._model.mdstartdate( _qs );
                _p._model.mdenddate( _qe );

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
                    _p._model.mddate( _p._model.qdate() );
                }

                _mdcusStart && _mdcusStart.length && _mdcusStart.val( _qs ? JC.f.formatISODate( JC.f.parseISODate( _qs ) ) : _qs );
                _mdcusEnd&& _mdcusEnd.length && _mdcusEnd.val( _qe ? JC.f.formatISODate( JC.f.parseISODate( _qe ) ) : _qe );

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
                    JC.log( 'type:', _type );
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
                        if( _noPick ) return;
                        _p._model.settype( _type );
                        setTimeout(function(){
                            JC.Calendar.pickDate( _p._model.mddate()[0] );
                            _p._model.mdstartdate( '' );
                            _p._model.mdenddate( '' );
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

        , mdDefaultBox: function(){ return this.selectorProp( 'mdDefaultBox' ); }
        , mdCustomBox: function(){ return this.selectorProp( 'mdCustomBox' ); }

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

        , mddate: 
            function( _setter ){ 
                var _r = JC.f.parentSelector( this.selector(), this.selector().attr('mddate') );
                typeof _setter != 'undefined' && _r.val( _setter );
                return _r; 
            }
        , mdstartdate: 
            function( _setter ){ 
                var _r = JC.f.parentSelector( this.selector(), this.selector().attr('mdstartdate') );
                typeof _setter != 'undefined' && _r.val( _setter.replace(/[^\d]/g, '') );
                return _r;
            }
        , mdenddate: 
            function( _setter ){ 
                var _r = JC.f.parentSelector( this.selector(), this.selector().attr('mdenddate') );
                typeof _setter != 'undefined' && _r.val( _setter.replace(/[^\d]/g, '') );
                return _r;
            }

        , qtype: function(){
            return this.decodedata( JC.f.getUrlParam( this.selector().attr('name') || '' ) || '' ).toLowerCase();
        }

        , qdate: function(){
            return this.decodedata( JC.f.getUrlParam( this.mddate().attr('name') || '' ) || '' ).toLowerCase();
        }

        , qstartdate: function(){
            return this.decodedata( JC.f.getUrlParam( this.mdstartdate().attr('name') || '' ) || '' ).toLowerCase();
        }

        , qenddate: function(){
            return this.decodedata( JC.f.getUrlParam( this.mdenddate().attr('name') || '' ) || '' ).toLowerCase();
        }

        , hastype:
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
