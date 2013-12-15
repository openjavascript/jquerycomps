 ;(function(define, _win) { 'use strict'; define( [ 'JC.common', 'JC.BaseMVC' ], function(){
/**
 * @namespace JC
 * @class PopTips
 * @extends JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2013-11-25
 * @author  zuojing   <zuojing1013@gmail.com> | 75 Team
 */
;(function($){
    window.JC = window.JC || {log:function(){}};
    JC.PopTips = PopTips;
 
    function PopTips( _selector ){
        _selector && ( _selector = $( _selector ) );
        
        if( PopTips.getInstance( _selector ) ) return PopTips.getInstance( _selector );
        PopTips.getInstance( _selector, this );
        //JC.log( PopTips.Model._instanceName );
 
        this._model = new PopTips.Model( _selector );
        this._view = new PopTips.View( this._model );
 
        this._init();
 
        //JC.log( 'PopTips:', new Date().getTime() );
    }
    /**
     * 获取或设置 PopTips 的实例
     * @method  getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {PopTipsInstance}
     */
    PopTips.getInstance = function ( _selector, _setter ) {
        if( typeof _selector == 'string' && !/</.test( _selector ) ) 
            _selector = $(_selector);
        if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
        typeof _setter != 'undefined' && _selector.data( PopTips.Model._instanceName, _setter );

        return _selector.data( PopTips.Model._instanceName );
    };
    /**
     * 初始化可识别的 PopTips 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of PopTipsInstance}
     */
    PopTips.init = function ( _selector ) {
        var _r = [];
        
        _selector = $( _selector || document );

        if ( _selector && _selector.length ) {
            if ( _selector.hasClass('js_compPopTips') ) {
                _r.push( new PopTips(_selector) );
            } else {
                _selector.find('.js_compPopTips').each( function() {
                    _r.push( new PopTips( this ) );
                });
            }
        }
        
        return _r;
    };

    PopTips.update = function () {
        var _items = $( JC.f.printf( '#{0}>div', PopTips.Model._boxId ) );

        if( !_items.length ) return;

        _items.each( function(){
            var _p = $(this), 
                _ins = _p.data( 'CPopTipsIns' );

            if( !_ins ) return;

            _ins.update();
        });
      
    },

    BaseMVC.build( PopTips );

    JC.f.extendObject( PopTips.prototype, {
        _beforeInit: function () {
            //JC.log( 'PopTips _beforeInit', new Date().getTime() );
        },

        _initHanlderEvent: function () {
            var _p = this;

            _p.on( 'CPopTipsUpdate', function( _evt ){
                _p._model.beforeShowCallback()
                    && _p._model.beforeShowCallback().call( _p, _p.selector() );
                
                _p._view.update();
                _p._model.layout().data('CPopTipsIns', _p);

            });


            if ( _p._model.triggerType() == 'hover' ) {
                _p._model.selector().on('mouseenter', function () {
                    setTimeout( function () {
                        _p._view.show();
                    }, 20)
                });

                _p._model.selector().on('mouseleave', function () {
                    setTimeout( function () {
                        _p._view.hide();
                    }, 20)
                });

            }

            if ( _p._model.triggerType() == 'click' ) {
                _p._model.selector().on('click', function ( _evt ) {
                    if ( _p._model.layout().is(':visible') ) {
                        _p._view.hide();
                    } else {
                        _p._view.show();
                    }
                });
            }

        }, 

        _inited: function () {
            //JC.log( 'PopTips _inited', new Date().getTime() );
           var _p = $(this);

           _p.trigger('CPopTipsUpdate');

        },

        /**
         * 更新 PopTips 状态
         * @method update
         */
        update: function () {

            this._view.update();

            return this;
        }

    });
 
    PopTips.Model._instanceName = "PopTips";
    PopTips.Model._boxId = 'CPTBox';

    JC.f.extendObject( PopTips.Model.prototype, {
        init: function () {
            var _p = this;
        },

        baseTpl: '<div class="CPT CPT_{0}" style="position:absolute;display:none;">'
            +   '<div class="CPT_shadow">'
            +       '<div class="CPT_container">'
            +           '<div class="CPT_arrow CPT_arrow_{1}">'
            +               '<em></em>'
            +               '<span></span>'
            +           '</div>'
            +           '<div class="CPT_content"  data-role="content" {3}>'
            +               '{2}'
            +           '</div>'
            +       '</div>'
            +   '</div>'
            + '</div>',

        theme: function () {
            var _r = this.stringProp('theme');
            
            !_r && ( _r = 'yellow' );

            return _r;

        },

        contents: function () {
            var _r = this.attrProp('content') || this.attrProp('title');
            
            !_r && ( _r = this.selector().text() );

            return _r;

        },

        arrowPosition: function () {
            var _r = this.stringProp('arrowPosition');

            !_r && ( _r = 'left' );

            return _r;
        },

        offset: function () {
            var _r = this.stringProp('arrowPositionOffset');

            return _r;
        },

        triggerType: function () {
            var _r = this.stringProp('triggerType');

            !_r && ( _r = 'hover');

            return _r;

        },

        layout: function () {
            var _p = this,
                _tpl = _p.baseTpl;
            
            if ( !this._layout ) {
                this._layout = $( JC.f.printf( _tpl
                    , _p.theme()
                    , _p.arrowPosition()
                    , _p.contents()
                    , 'style="width:' + _p.layoutWidth() + ';height:' + _p.layoutHeight() + ';"' ) )
                    .appendTo( this.layoutBox() );
            }

            return this._layout;

        },

        layoutWidth: function () {
            var _r = this.intProp('popTipsWidth');

            !_r && ( _r = 'auto' );

            return _r;
        },

        layoutHeight: function () {
           var _r = this.intProp('popTipsHeight');

           _r && ( _r = _r + 'px' );
           !_r && ( _r = 'auto' );

           return _r;
        },

        layoutBox: function () {
            var _r = $('#' + PopTips.Model._boxId );

            if ( !(_r && _r.length) ) {
                _r = $( JC.f.printf( '<div id="{0}"></div>', PopTips.Model._boxId ) )
                    .appendTo( document.body );
            }

            return _r;
        },

        changeArrow: function ( _removeClass, _addClass ) {
            var _p = this;

            _p.layout().find('div.CPT_arrow')
                .removeClass('CPT_arrow_' + _removeClass)
                .addClass('CPT_arrow_' + _addClass);

        },

        calcPosOffset: function ( _arrowPosition, _pos, _lw, _lh ) {
            var _r = {};

            switch ( _arrowPosition ) {
                case 'top':
                    _r = {
                        top: _pos.top + _pos.height,
                        left: _pos.left + _pos.width / 2 - _lw / 2
                    };
                    break;
                case 'right':
                    _r = {
                        top: _pos.top + _pos.height / 2 - _lh / 2,
                        left: _pos.left - _lw
                    };
                    break;
                case 'bottom':
                    _r = {
                        top: _pos.top - _lh,
                        left: _pos.left + _pos.width / 2 - _lw / 2
                    };
                    break;
                case 'left':
                    _r = {
                        top: _pos.top + _pos.height / 2 - _lh / 2,
                        left: _pos.left + _pos.width
                    };
                    break;
            }

            return _r;
        },

        setPosition: function ( _offset, _arrowPosition ) {
            var _p = this,
                _tips = _p.layout();

            _tips.offset( _offset );

            if ( _arrowPosition == 'bottom' && _offset.top < 0 ) { 

            }
        },

        /**
         * PopTips显示前的回调
         */
        beforeShowCallback: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = 'beforeShowCallback';

            return _p.callbackProp(_selector, _key);
        },

        /**
         * PopTips隐藏后的回调
        */
        afterHideCallback: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = 'afterShowCallback';

            return _p.callbackProp(_selector, _key);
        }
    });
 
    JC.f.extendObject( PopTips.View.prototype, {
        init: function () {
            var _p = this;
        },

        update: function () {
            //JC.log("View update here");
            var _p = this,
                _selector = _p._model.selector(),
                _pos = {
                    top: _selector.offset().top,
                    left: _selector.offset().left,
                    width: _selector.prop('offsetWidth'),
                    height: _selector.prop('offsetHeight')
                },
                _layout = _p._model.layout(),
                _layoutWidth = _layout.outerWidth(),
                _layoutHeight = _layout.outerHeight(),
                _clientWidth = document.body.clientWidth || document.documentElement.clientWidth,
                _viewPointerHeight = $(window).outerHeight(),
                _scrollTop = $(window).scrollTop(),
                _left,
                _top,
                _offset = _p._model.offset(),
                _newClassName,
                _arrowPosition = _p._model.arrowPosition();


            var _cal = _p._model.calcPosOffset(_arrowPosition, _pos, _layoutWidth, _layoutHeight );

            _p._model.setPosition( _cal, _arrowPosition );

            // switch( _p._model.arrowPosition() ) {
            //     case 'top':
            //         _top = _pos.top + _pos.height + 5;
            //         _newClassName = 'top';

            //         if ( _offset == 'left' ) {
            //            _left = _pos.left;
            //            _newClassName = '1';
            //            _p._model.changeArrow('top', '1');
            //         } else if ( _offset == 'right' ) {
            //             _left = _pos.left + _pos.width - _layoutWidth;
            //             _p._model.changeArrow('top', '11');
            //             _newClassName = '11'
            //         } else {
            //             _left = ( _pos.left +  _pos.width - _layoutWidth ) / 2 ;
            //         }
                    
            //         if ( _viewPointerHeight + _scrollTop <= _top + _layoutHeight ) {
            //             _top = _pos.top - (_layoutHeight + 5);
            //             _p._model.changeArrow(_newClassName, 'bottom');
            //         }

            //         break;
            //     case 'right':
            //         _left = _pos.left - (_layoutWidth + 5);
            //         _newClassName = 'right';

            //         if ( _offset == 'mid' ) {
            //             _top =  _pos.top + ( _pos.height - _layoutHeight ) / 2 ;
            //             _p._model.changeArrow('right', '2');
            //             _newClassName = '2';
            //         } else {
            //             _top = _pos.top;
            //         }
                    
            //         if ( _left < 0 ) {
            //             _left = _pos.left + _pos.width + 5;
            //             _p._model.changeArrow(_newClassName, 'left');
            //         }

            //         break;
            //     case 'bottom':
            //         _top = _pos.top - (_layoutHeight + 5);
            //         _newClassName = 'bottom';
                    
            //         if ( _offset == 'left' ) {
            //            _left = _pos.left;
            //            _p._model.changeArrow('bottom', '5');
            //            _newClassName = '5';
            //         } else if ( _offset == 'right' ) {
            //             _p._model.changeArrow('bottom', '7');
            //             _newClassName = '7';
            //             _left = _pos.left + _pos.width - _layoutWidth;
            //         } else {
            //             _left = ( _pos.left +  _pos.width - _layoutWidth ) / 2 ;
            //         }

            //         if ( _top < 0 ) {
            //             _top = _pos.top + _pos.height + 5;
            //             _p._model.changeArrow(_newClassName, 'top');
                        
            //         }

            //         break;
            //     case 'left':
            //         _left = _pos.width + _pos.left + 5;
            //         _newClassName = 'left';
                    
            //         if ( _offset == 'mid' ) {
            //             _top = _pos.top + ( _pos.height - _layoutHeight ) / 2 ;
            //             _p._model.changeArrow('left', '10');
            //             _newClassName = '10';
            //         } else {
            //             _top = _pos.top;
            //         }

            //         //JC.log(_left + _layoutWidth, _clientWidth );
            //         if ( (_left + _layoutWidth ) >= _clientWidth ) {
                        
            //             if ( _pos.left >= _layoutWidth ) {
            //                 _left = _pos.left - (_layoutWidth + 5);
            //                 _p._model.changeArrow(_newClassName, 'right');
            //                 _newClassName = 'right';
            //             } else if ( _pos.top >= _layoutHeight ) {
            //                 _left = (_pos.top + _pos.width - _layoutWidth) / 2 ;
            //                 _top = _pos.top - (_layoutHeight + 5);
            //                 _p._model.changeArrow(_newClassName, 'bottom');
            //                 _newClassName = 'bottom';
            //             }
                        
            //         } 

            //         break;
            // }

            // _p._model.layout().css({
            //     'left': _left,
            //     'top': _top
            // });

        },

        show: function () {
            var _p = this;

            _p._model.layout().show();
            
        },

        hide: function () {
            var _p = this;

            _p._model.layout().hide();

            _p._model.afterHideCallback() && _p._model.afterHideCallback().call( _p, _p.selector() );

        }

    });

    $(document).ready( function () {
        var _insAr = 0;
        PopTips.autoInit
            && ( _insAr = PopTips.init() )
            ;
    });

    $(window).on('resize', function () {
        PopTips.update();
    });
 
}(jQuery));
    return JC.PopTips;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
