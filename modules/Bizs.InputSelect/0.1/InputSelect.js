;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
/**
 * 输入下拉框
 * 可以输入数据也可以通过点下拉箭头选择数据。
 * 下拉的数据支持Ajax接口和php前段铺数据。
 *
 * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *   | <a href='http://jc2.openjavascript.org/docs_api/classes/Bizs.InputSelect.html' target='_blank'>API docs</a>
 *   | <a href='../../modules/Bizs.InputSelect/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 * <h2>页面只要引用本脚本, 默认会自动处理 div class="js_bizInputSelect" </h2>
 *
 * <h2>可用的 HTML attribute</h2>
 *
 * <dl>
 * <dt>iptseldatabox = string</dt>
 * <dd>指定下拉数据存放的父容器</dd>
 * <dt>iptseloption = string</dt>
 * <dd>指定下拉数据选项</dd>
 * <dt>iptseldataurl = string</dt>
 * <dd>指定下拉数据的ajax接口，要求返回json数据格式如下：
 *   { errorno: 0,
 *     data: [{label: 'item1'}]    
 *   }</dd>
 * </dl>
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

            if( _selector.length ){
                if( _selector.hasClass( 'js_bizInputSelect' )  ){
                    _r.push( new InputSelect( _selector ) );
                }else{
                    _selector.find( '.js_bizInputSelect' ).each( function(){
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
                if (p._model.dataurl() && !p._model.dataready) {
                    p._model.ajaxdata();
                }

                p[p._model.selector().data('visible') ? '_hide': '_show']();
            });

            //选项事件处理
            p._model.iptselbox().delegate(p._model.iptseloption()[0], 'click', function (e) {
                var $this = $(e.target || e.srcElement);
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
            return this.attrProp('iptseldataurl');
        },

        //获取ajax数据
        ajaxdata: function () {
            var p = this,
                url = this.dataurl();

            $.get(url).done(function (res) {
                res = $.parseJSON(res);
                var tpl = '<ul>',
                    i = 0,
                    l;

                if (res.errorno) {
                    JC.f.alert('操作失败', 2);
                } else {
                    l = res.data.length;
                    if (l === 0) {
                        tpl = '<li>暂无数据</li>';
                    } else {
                        for (i = 0; i < l; i++) {
                            tpl += '<li data-label="' + res.data[i].label + '" class="IPTSEL-ITEM">' + res.data[i].label + '</li>';
                        }
                    }
                    
                    tpl += '</ul>';
                  
                    p.iptselbox().html(tpl);
                    p.dataready = 1;
                }
            });
        },

        dataready: 0

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
