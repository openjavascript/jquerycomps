;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
    //发现一个bug但是不想改不能单单用is判断
/**
 *
 * @namespace   Bizs
 * @class       MultiChangeLogic
 * @extends     JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version 2014-12-25
 * @author  zuojing <zuojing1013@gmail.com> | 75 Team
 * @example
        
 */
    var _jdoc = $( document ), _jwin = $( window );

    JC.MultiChangeLogic = MultiChangeLogic;

    function MultiChangeLogic( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, MultiChangeLogic ) ) 
            return JC.BaseMVC.getInstance( _selector, MultiChangeLogic );

        JC.BaseMVC.getInstance( _selector, MultiChangeLogic, this );

        this._model = new MultiChangeLogic.Model( _selector );
        this._view = new MultiChangeLogic.View( this._model );

        this._init();

        //JC.log( MultiChangeLogic.Model._instanceName, 'all inited', new Date().getTime() );
    }
    /**
     * 初始化可识别的 MultiChangeLogic 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of MultiChangeLogicInstance}
     */
    MultiChangeLogic.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector.length ){
                if( _selector.hasClass( 'bizsMultiChangeLogic' )  ){
                    _r.push( new MultiChangeLogic( _selector ) );
                }else{
                    _selector.find( '.bizsMultiChangeLogic' ).each( function(){
                        _r.push( new MultiChangeLogic( this ) );
                    });
                }
            }
            return _r;
        };

    JC.BaseMVC.build( MultiChangeLogic );

    JC.f.extendObject( MultiChangeLogic.prototype, {
        _beforeInit: function () {
            //JC.log( 'MultiChangeLogic _beforeInit', new Date().getTime() );
        }, 

        _initHanlderEvent: function () {
            var p = this;
        
            //trigger Element change event
            p._model.bclTrigger().on('change', function () {
                var $cleanElement = p._model.bclChangeCleanTarget(),
                    $el = $(this);

                if ( $cleanElement.length ) {
                    $.each($cleanElement, function () {
                        var $this = $(this);

                        if ( /(input|textarea|select)/i.test($this.prop('nodeName').toLowerCase()) ) {
                            $this.val('');
                        } else {
                            $this.html('');
                        }

                    });
                }

                if ( /(select)/i.test($el.prop('nodeName').toLowerCase()) ) {
                    p.trigger('selectchange', [$el]);
                } else if ( /(radio)/i.test($el.prop('type').toLowerCase() ) ) {
                    p.trigger('radiochange', [$el]);
                } else {
                    p.trigger('checkboxchange', [$el]);
                }

            });

            p.on('selectchange', function (evt, triggerElement) {
                var $el = triggerElement;

                if ($el.find('option:selected').is('[bcldisabled]')) {
                    p._model.bclDisabledTarget().each(function () {
                        $(this).prop('disabled', true);
                    });
                } else {
                    p._model.bclDisabledTarget().each(function () {
                        $(this).prop('disabled', false);
                    });
                }
                
                if ($el.find('option:selected').is('[bcldisplay]')) {
                    p._model.bclHideTarget().each(function () {
                        $(this).show();
                    });
                } else {
                    p._model.bclHideTarget().each(function () {
                        $(this).hide();
                    });
                } 

            });

            p.on('radiochange', function (evt, triggerElement) {
                var $el = triggerElement,
                    $target,
                    $siblings;

                if ( $el.is('[bcldisabled]') ) {
                    p._model.bclDisabledTarget().each(function () {
                        $(this).prop('disabled', true);
                    });
                    
                } else {
                    p._model.bclDisabledTarget().each(function () {
                        $(this).prop('disabled', false);
                    });
                }

                if ( $el.is('[bcldisplay]') ) {
                    p._model.bclHideTarget().each(function () {
                        $(this).show();
                    });
                   
                } else {
                    p._model.bclHideTarget().each(function () {
                        $(this).hide();
                    });
                }

                if ( $el.is('[bclselfdisplaytarget]') ) {
                    $target = $( JC.f.parentSelector(triggerElement, $el.attr('bclselfdisplaytarget') ) );
                    $target.show();

                    if ( $el.is('[bclselfdisplaytargetsiblings]') ) {
                        $siblings = $( JC.f.parentSelector(triggerElement, $el.attr('bclselfdisplaytargetsiblings')) );
                        if ( $siblings.length ) {
                            $siblings.each(function () {
                                $(this).hide();
                            });
                        }
                    }
                } 
                
            });

            p.on('checkboxchange', function (evt, triggerElement) {

            });


        },

        _inited: function () {
            JC.log("_inited:", new Date().getTime() );
        }
    });

    MultiChangeLogic.Model._instanceName = 'MultiChangeLogic';
    JC.f.extendObject( MultiChangeLogic.Model.prototype, {
        init: function () {

        },

        bclTrigger: function () {
            return $(JC.f.parentSelector(this.selector(), this.attrProp('bclTrigger')));
        },

        bclDisabledTarget: function () {
            return $(JC.f.parentSelector(this.selector(), this.attrProp('bclDisabledTarget')));
        },

        bclHideTarget: function () {
            var r = $(JC.f.parentSelector(this.selector(), this.attrProp('bclHideTarget')));
            return r;
        },

        bclChangeCleanTarget: function () {
            return $(JC.f.parentSelector(this.selector(), this.attrProp('bclChangeCleanTarget')));
        },

        bclTriggerChangeOnInit: function () {
            var r = true;
            this.selector().is('[bclTriggerChangeOnInit]') && (r = this.boolProp('bclTriggerChangeOnInit'));
            return r;
        }
    });

    JC.f.extendObject( MultiChangeLogic.View.prototype, {
        init: function () {

        }
    });

    _jdoc.ready( function () {
        MultiChangeLogic.autoInit && MultiChangeLogic.init();
    });

    return JC.MultiChangeLogic;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
