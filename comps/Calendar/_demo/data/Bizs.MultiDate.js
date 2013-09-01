;(function($){
    window.Bizs = window.Bizs || {};
    window.Bizs.MultiDate = MultiDate;

    /**
     * 复合日历业务逻辑
     * @class   MultiDate
     * @namespace   Bizs
     * @constructor
     * @private
     */
    function MultiDate( _selector ){
        if( MultiDate.getInstance( _selector ) ) return MultiDate.getInstance( _selector );
        MultiDate.getInstance( _selector, this );

        this._model = new Model( _selector );
        this._view = new View( this._model );

        this._init();
    }
    
    MultiDate.prototype = {
        _init:
            function(){
                var _p = this;

                $( [ _p._view, _p._model ] ).on('BindEvent', function( _evt, _evtName, _cb ){
                    _p.on( _evtName, _cb );
                });

                $([ _p._view, _p._model ] ).on('TriggerEvent', function( _evt, _evtName ){
                    var _data = sliceArgs( arguments ); _data.shift(); _data.shift();
                    _p.trigger( _evtName, _data );
                });

                _p._model.init();
                _p._view.init();

                _p._initDefaultValue();
                _p._initHandlerEvent();

                return _p;
            }    
        , _initDefaultValue:
            function(){
                var _p = this, _qs = _p._model.qstartdate(), _qe = _p._model.qenddate();

                _p._model.selector( _p._model.qtype() );
                _p._model.mdstartdate( _qs );
                _p._model.mdenddate( _qe );

                if( !_p._model.mddate().attr('name') ){
                    if( _qs && _qe ){
                        if( _qs == _qe ){
                            _p._model.mddate( formatISODate(parseISODate(_qs)) );
                        }else{
                            _p._model.mddate( printf( '{0} 至 {1}'
                                        , formatISODate(parseISODate(_qs))
                                        , formatISODate(parseISODate(_qe))
                                        ) );
                        }
                    }
                }else{
                    _p._model.mddate( _p._model.qdate() );
                }
            }
        , _initHandlerEvent:
            function(){
                var _p = this;
                _p._model.selector().on('change', function(_evt){
                    var _sp = $(this);
                    JC.log( 'type:', _sp.val() );
                    _p._model.settype( _sp.val() );
                    setTimeout(function(){
                        JC.Calendar.pickDate( _p._model.mddate()[0] );
                        _p._model.mdstartdate( '' );
                        _p._model.mdenddate( '' );
                    }, 10);
                });
            }
        /**
         * 获取 显示 MultiDate 的触发源选择器, 比如 a 标签
         * @method  selector
         * @return  selector
         */ 
        , selector: function(){ return this._model.selector(); }
        /**
         * 使用 jquery on 绑定事件
         * @method  {string}    on
         * @param   {string}    _evtName
         * @param   {function}  _cb
         * @return  MultiDateInstance
         */
        , on: function( _evtName, _cb ){ $(this).on(_evtName, _cb ); return this;}
        /**
         * 使用 jquery trigger 绑定事件
         * @method  {string}    trigger
         * @param   {string}    _evtName
         * @return  MultiDateInstance
         */
        , trigger: function( _evtName, _data ){ $(this).trigger( _evtName, _data ); return this;}
    }
    /**
     * 获取或设置 MultiDate 的实例
     * @method getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {MultiDate instance}
     */
    MultiDate.getInstance =
        function( _selector, _setter ){
            if( typeof _selector == 'string' && !/</.test( _selector ) ) 
                    _selector = $(_selector);
            if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
            typeof _setter != 'undefined' && _selector.data( 'MultiDateIns', _setter );

            return _selector.data('MultiDateIns');
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
    
    function Model( _selector ){
        this._selector = _selector;
    }

    Model._inscount = 1;
    
    Model.prototype = {
        init:
            function(){
                var _p = this
                    , _updatecb = 'Bizs.MultiDate_' + ( Model._inscount)
                    , _showcb = 'Bizs.MultiDate_show_' + ( Model._inscount)
                    , _hidecb = 'Bizs.MultiDate_hide_' + ( Model._inscount)
                    , _layoutchangecb = 'Bizs.MultiDate_layoutchange_' + ( Model._inscount)
                    ;
                Model._inscount++;

                window[ _updatecb ] = 
                    function( _type, _startDate, _endDate ){
                        _p.mdstartdate( formatISODate( _startDate, '' ) );
                        _p.mdenddate( formatISODate( _endDate, '' ) );
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
                var _r = parentSelector( this.selector(), this.selector().attr('mddate') );
                typeof _setter != 'undefined' && _r.val( _setter );
                return _r; 
            }
        , mdstartdate: 
            function( _setter ){ 
                var _r = parentSelector( this.selector(), this.selector().attr('mdstartdate') );
                typeof _setter != 'undefined' && _r.val( _setter.replace(/[^\d]/g, '') );
                return _r;
            }
        , mdenddate: 
            function( _setter ){ 
                var _r = parentSelector( this.selector(), this.selector().attr('mdenddate') );
                typeof _setter != 'undefined' && _r.val( _setter.replace(/[^\d]/g, '') );
                return _r;
            }

        , qtype: function(){
            return this.decodedata( get_url_param( this.selector().attr('name') || '' ) || '' ).toLowerCase();
        }

        , qdate: function(){
            return this.decodedata( get_url_param( this.mddate().attr('name') || '' ) || '' ).toLowerCase();
        }

        , qstartdate: function(){
            return this.decodedata( get_url_param( this.mdstartdate().attr('name') || '' ) || '' ).toLowerCase();
        }

        , qenddate: function(){
            return this.decodedata( get_url_param( this.mdenddate().attr('name') || '' ) || '' ).toLowerCase();
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
    
    function View( _model ){
        this._model = _model;
    }
    
    View.prototype = {
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

    $(document).ready( function(){
        $('select.js_autoMultidate').each( function(){
            new MultiDate( $(this) );
        });
    });

}(jQuery));
