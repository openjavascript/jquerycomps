 ;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
/**
 *
 *
 *
 * @namespace JC
 * @class DCalendar
 * @extends JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2013-12-20
 * @author  zuojing   <zuojing1013@gmail.com> | 75 Team
*/
    JC.DCalendar = DCalendar;
 
    function DCalendar( _selector ){
        _selector && ( _selector = $( _selector ) );
        
        if( DCalendar.getInstance( _selector ) ) return DCalendar.getInstance( _selector );
        DCalendar.getInstance( _selector, this );
 
        this._model = new DCalendar.Model( _selector );
        this._view = new DCalendar.View( this._model );
        
        this._init();
    }
    /**
     * 获取或设置 DCalendar 的实例
     * @method  getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {DCalendarInstance}
     */
    DCalendar.getInstance = function ( _selector, _setter ) {
        if( typeof _selector == 'string' && !/</.test( _selector ) ) 
            _selector = $(_selector);
        if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
        typeof _setter != 'undefined' && _selector.data( DCalendar.Model._instanceName, _setter );

        return _selector.data( DCalendar.Model._instanceName );
    };
    /**
     * 初始化可识别的 DCalendar 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of DCalendarInstance}
     */
    DCalendar.init = function ( _selector ) {
        var _r = [];
        
        _selector = $( _selector || document );

        if ( _selector && _selector.length ) {
            if ( _selector.prop('nodeName') && _selector.attr('datatype') && ( _selector.prop('nodeName').toLowerCase()=='input' || _selector.prop('nodeName').toLowerCase()=='button' ) && ( _selector.attr('datatype').toLowerCase()=='ddate') ) {
                _r.push( new DCalendar(_selector) );
            }

            if ( _selector.hasClass('js_compDCalendar') ) {
                _r.push( new DCalendar(_selector) );
            } 
        }
        JC.log( 'DCalendar:', new Date().getTime() );
        return _r;
    };

    DCalendar.update = function () {
    },

    BaseMVC.build( DCalendar );

    JC.f.extendObject( DCalendar.prototype, {
        _beforeInit: function () {

        },

        _initHanlderEvent: function () {
            var _p = this;

        }, 

        _inited: function () {

        },

        /**
         * 更新 DCalendar 状态
         * @method update
         */
        update: function () {

            this._view.update();

            return this;
        }

    });
 
    DCalendar.Model._instanceName = "DCalendar";

    JC.f.extendObject( DCalendar.Model.prototype, {
        init: function () {
            var _p = this;
        },

        baseTpl: '<div class="CDCalendar_bounding_box CDCalendar_bounding_box_style" >'
                    + '<div class="CDC_container" >'
                        + '<div class="CDC_content_box" >'
                            + '<div class="CDC_arrow" >'
                                + '<span class="CDC_CDC_close_btn" title="关闭">close</span>'
                                + '<span class="CDC_CDC_prev_btn" title="上月" >prev</span>'
                                + '<span class="CDC_CDC_next_btn" title="下月" >next</span>'
                            + '</div>'
                            + '<div class="CDC_date_box" >'
                                + '<div class="CDC_inner" style="width: 182px;" >'
                                +  {0}
                                + '</div>'
                                + '<div class="CDC_inner" style="width: 182px;">'
                                +  {0}
                                + '</div>'
                            + '</div>'
                        + '</div>'
                    + '</div>'
                + '</div>'

        
    });
 
    JC.f.extendObject( DCalendar.View.prototype, {
        init: function () {
            var _p = this;
        },

        update: function () {
          
        },

        show: function () {
           
            
        },

        hide: function () {
           

        }

    });

    $(document).ready( function () {
        var _insAr = 0;
        DCalendar.autoInit
            && ( _insAr = DCalendar.init() );

    });

    $(window).on('resize', function () {
        JC.f.safeTimeout( function(){
           JC.log('resize');
        }, null, 'DCalendarResize', 20 );

    });
    return JC.DCalendar;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
