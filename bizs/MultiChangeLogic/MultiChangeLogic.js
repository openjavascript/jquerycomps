;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
/**
 *
 * @namespace   window.Bizs
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
                if( _selector.hasClass( 'js_bizsMultiChangeLogic' )  ){
                    _r.push( new MultiChangeLogic( _selector ) );
                }else{
                    _selector.find( '.js_bizsMultiChangeLogic' ).each( function(){
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
            var p = this,
                tmp;
        
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

                p.trigger('itemchange', [$el]);

            });

            p.on('itemchange', function (evt, triggerElement) {

                var $el = triggerElement,
                    $target,
                    $selfthidetarget,
                    isDisable = p._model.isDisable($el),
                    isDisplay = p._model.isDisplay($el);

                p._model.bclHideTarget().each(function () {
                    var $this = $(this);
                   
                    $this[isDisplay? 'show': 'hide']();
                });

                p._model.bclDisabledTarget().each(function () {
                    var $this = $(this);
                    
                    $this.prop('disabled', isDisable);
                });

           
                if ( $el.attr('bclselfdisplaytarget') ) {
                 
                    $target = $( JC.f.parentSelector(triggerElement, $el.attr('bclselfdisplaytarget') ) );
                   
                    $.each($target, function () {
                        $(this).show();
                    });

                    if ( $el.attr('bclselfhidetarget') ) {
                        $selfthidetarget = $( JC.f.parentSelector(triggerElement, $el.attr('bclselfhidetarget')) );
                        if ( $selfthidetarget.length ) {
                            $.each($selfthidetarget, function () {
                                var $this = $(this);
                                $this.hide();
                            });
                        }
                    }
                } 

                if ( $el.attr('bclselfdisplayscript') ) {
                    $target = JC.f.scriptContent($el.attr('bclselfdisplayscript'));
                    p._model.bclHideScriptBox() && $(p._model.bclHideScriptBox()).html($target);
                }
                
            });

            p.on('checkboxchange', function (evt, triggerElement) {

            });

            //这个逻辑是处理onload后选中的项
            if ( p._model.bclTriggerChangeOnInit() ) {
                ( tmp = p._model.bclTrigger(true) )
                    && (!tmp.prop('disabled'))
                    && (tmp.trigger('change'));
            }


        },

        _inited: function () {
            JC.log("_inited:", new Date().getTime() );
        }
    });

    MultiChangeLogic.Model._instanceName = 'MultiChangeLogic';
    JC.f.extendObject( MultiChangeLogic.Model.prototype, {
        init: function () {

        },

        bclTrigger: function (curItem) {
            var r = $(JC.f.parentSelector(this.selector(), this.attrProp('bclTrigger')));
            
            if ( curItem ) {

                $.each(r, function () {
                    var $this = $(this);
                    if ( $this.prop('checked') || $this.prop('selected') ) {
                        r = $this;
                        return false;
                    }
                });
            }

            return r;
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
            var r = true,
                attr = this.selector().attr('bclTriggerChangeOnInit');

            attr && (r = this.boolProp('bclTriggerChangeOnInit'));
            return r;
        },

        bclHideScriptBox: function () {
            return this.attrProp('bclHideScriptBox');
        },

        bclDelimiter: function (triggerElement) {
            var r = '||';
                
            this.selector().is( '[bclDelimiter]' ) 
                && ( r = this.selector().attr( 'bclDelimiter' ) );
            triggerElement 
                && triggerElement.is( '[bclDelimiter]' ) 
                && ( r = triggerElement.attr( 'bclDelimiter' ) );
            
            return r;
        },

        bclDelimeterItem: function (items, triggerElement) {
           
           return items.split(this.bclDelimiter(triggerElement)); 
        },

        isDisplay: function (triggerElement) {
            var p = this,
                $el = triggerElement,
                $selectedItem,
                r = false,
                attr;

            if (!$el.length) return false;

            if (/(select)/i.test($el.prop('nodeName').toLowerCase())) {
                //处理没有option的select
                $selectedItem = $el.find(':selected');
                if (!$selectedItem.length) return false;
                
                if ( $el.attr('bcldisplay') ) {
                    r = p.bclDelimeterItem($el.attr('bcldisplay'), $el).indexOf($el.val()) > - 1;
                }
                
                if ( $selectedItem.attr('bcldisplay') ) {
                    r = JC.f.parseBool($selectedItem.attr('bcldisplay'));
                }

            } else {
                if ( p.attrProp('bcldisplay') ) {
                    r = p.bclDelimeterItem(p.attrProp('bcldisplay'), p.selector()).indexOf($el.val()) > - 1;
                }
                attr = $el.attr('bcldisplay');
                attr && (r = JC.f.parseBool(attr));

            }

            return r;
        },

        isDisable: function (triggerElement) {
            var p = this,
                $el = triggerElement,
                $selectedItem,
                r = false;

            if ( !$el.length ) return false;

            if (/(select)/i.test($el.prop('nodeName').toLowerCase())) {
                //处理没有option的select
                $selectedItem = $el.find(':selected');
                if (!$selectedItem.length) return false;
                
                if ( $el.attr('bcldisabled') ) {
                    r = p.bclDelimeterItem($el.attr('bcldisabled'), $el).indexOf($el.val()) > - 1;
                }
                
                if ( $selectedItem.attr('bcldisabled') ) {
                    r = JC.f.parseBool($selectedItem.attr('bcldisabled'));
                }
               
            } else {
                if ( p.attrProp('bcldisabled') ) {
                    r = p.bclDelimeterItem(p.attrProp('bcldisabled'), p.selector()).indexOf($el.val()) > - 1;
                }
                
                if ( $el.attr('bcldisabled') ) {
                    r = JC.f.parseBool($el.attr('bcldisabled'));
                }
                
            }

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
