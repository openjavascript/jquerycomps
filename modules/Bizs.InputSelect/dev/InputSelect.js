;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
/**
 * 模拟多选下拉框
 * 框的click将列表拉出来。
 * close和document的click将面板关闭，返回数据，并把数据铺到指定的面板里
 *
 *<p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *   | <a href='http://jc2.openjavascript.org/docs_api/classes/Bizs.InputSelect.html' target='_blank'>API docs</a>
 *   | <a href='../../modules/Bizs.InputSelect/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *<h2>页面只要引用本脚本, 默认会自动处理 div class="js_bizInputSelect" </h2>
 *
 *<h2>可用的 HTML attribute</h2>
 *
 *
 * @namespace window.Bizs
 * @class InputSelect
 * @extends JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2014-12-02
 * @author  zuojing <suches@btbtd.org> | 75 Team

 */
    Bizs.InputSelect = InputSelect;

    function InputSelect( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, InputSelect ) ) 
            return JC.BaseMVC.getInstance( _selector, InputSelect );

        JC.BaseMVC.getInstance( _selector, InputSelect, this );

        this._model = new InputSelect.Model( _selector );
        this._view = new InputSelect.View( this._model );

        this._init();

        //JC.log( InputSelect.Model._instanceName, 'all inited', new Date().getTime() );
    }
    /**
     * 初始化可识别的 InputSelect 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of InputSelectInstance}
     */
    InputSelect.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector && _selector.length ){
                if( _selector.hasClass( 'js_bizInputSelect' )  ){
                    _r.push( new InputSelect( _selector ) );
                }else{
                    _selector.find( 'div.js_bizInputSelect' ).each( function(){
                        _r.push( new InputSelect( this ) );
                    });
                }
            }
            return _r;
        };


    BaseMVC.build( InputSelect );

    JC.f.extendObject( InputSelect.prototype, {
        _beforeInit: function () {
           var p = this;

           p._model.selector().addClass('IPTSEL-BOX').html('<input type="text" class="IPTSEL-INPUT"><span class="IPTSEL-ARROW"></span>');
            //JC.log( 'InputSelect _beforeInit', new Date().getTime() );
        },

        _initHanlderEvent: function () {
            var p = this;

            p._model.selector().data('visible', 0);

            //输入框事件处理
            p._model.iptselipt().on('click', function () {
                if ( p.selector().data('visible') ) {
                    p._hide();
                } else {
                    return;
                };
            });

            //箭头事件处理
            p._model.iptselarrow().on('click', function (e) {
                e.stopPropagation();
                p[p._model.selector().data('visible') ? '_hide': '_show']();
            });

            //选项事件处理
            p._model.iptseloption().on('click', function (e) {
                var $this = $(this);

                e.stopPropagation();
                p._model.iptselipt().val($this.data('label'));
                p._hide();
            });

            //容器事件处理
            p._model.iptselbox().on('mousedown', function (e) {
                e.stopPropagation();
            });

            //空白处点击处理
            $(document).on('mousedown', function () {
                p._hide();
            })

        },

        _inited: function () {

        },

        _show: function () {
            var p = this;

            p._view.show();
            p._model.selector().data('visible', 1);

            return this;
        },

        _hide: function () {
            var p = this;

            p._view.hide();
            p._model.selector().data('visible', 0);


            return this;
        }


           
    });

    InputSelect.Model._instanceName = 'InputSelectIns';

    JC.f.extendObject( InputSelect.Model.prototype, {
        init: function () {

        },

        //输入框
        iptselipt: function () {
            return this.selector().find('.IPTSEL-INPUT');
        },

        //箭头
        iptselarrow: function () {
            return this.selector().find('.IPTSEL-ARROW');
        },

        //选项
        iptseloption: function () {
            var selector = this.selector();
            return JC.f.parentSelector(selector, this.attrProp('iptseloption')).addClass('IPTSEL-ITEM');
        },

        //选项的容器
        iptselbox: function () {
            var p = this,
                r = p.attrProp('iptseldatabox');

            return JC.f.parentSelector(p.selector(), r ).addClass('IPTSEL-DROPDOWN');
           
        },

        //ajax数据url
        dataurl: function () {
            return this.selector().attrProp('iptseldataurl');
        },

        //获取ajax数据
        ajaxdata: function () {
            var url = this.dataurl();

            if (url) {
                $.get(url).done(function (res) {
                    res = $.parseJSON(res);

                    if (res.errorno) {
                        JC.f.alert('操作失败', 2);
                    } else {
                        return res.data;
                    }
                });
            }
        }


        

    });

    JC.f.extendObject( InputSelect.View.prototype, {
        init: function () {

        },

        show: function () {
            var p = this;

            p._model.iptselbox().show();
        },

        hide: function () {
            var p = this;
            p._model.iptselbox().hide();
        }
        
    });
    
    var $doc = $(document);

    $doc.ready( function(){
        var _insAr = 0;
        InputSelect.autoInit
            && ( _insAr = InputSelect.init() );
    });

    // $doc.delegate(, 'click', function () {
    //     var _p = $(this), 
    //         _ins;
 
    //     JC.f.safeTimeout( function(){
    //         _ins = JC.BaseMVC.getInstance( _p, InputSelect );
    //         !_ins && ( _ins = new InputSelect( _p ) );
    //         _ins.trigger('SHOW');
    //     }, _p, 'bizInputSelectClick', 50 );

    // });

    // $doc.on('mousedown', function () {
    //     JC.f.safeTimeout( function(){
    //         $('.js_bizInputSelect').each( function(){
    //             var _ins = JC.BaseMVC.getInstance( $(this), InputSelect );
                
    //             if (_ins) {
    //                 _ins.trigger('HIDE');
    //             }
    //             //_ins && _ins.hide();
    //         });
    //     }, null, 'CLOSE_MULTI_SELECT')

    // } );

    // doc.delegate('.SELECTCloseBtn', 'mousedown', function () {
    //     var _ins = JC.BaseMVC.getInstance( JC.f.getJqParent($(this), '.js_bizInputSelect'), InputSelect );
    //     _ins && _ins.hide();
    // });

    // $doc.delegate('.js_bizInputSelect>.IPTSEL-DROPDOWN', 'mousedown', function( _evt ){
    //     _evt.stopPropagation();
    // });

    return Bizs.InputSelect;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
