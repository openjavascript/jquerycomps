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
 * <dt>iptseldataboxheight = int</dt>
 * <dd>指定下拉数据存放的父容器的高度，默然为自适应</dd>
 * <dt>iptseloption = string</dt>
 * <dd>指定下拉数据选项</dd>
 * <dt>iptselipt = string</dt>
 * <dd>指定输入框</dd>
 * <dt>iptselhideipt = string</dt>
 * <dd>指定隐藏域</dd>
 * <dt>iptselprevententer = bool</dt>
 * <dd>回车键阻止表单提交， default = true</dd>
 * <dt>iptselitemselected = function</dt>
 * <dd>选择数据后的回调</dd>
 *
 * <dt>iptseldataurl = string</dt>
 * <dd>指定下拉数据的ajax接口，要求返回json数据格式如下：
 *   { errorno: 0,
 *     data: [{label: 'item1', 'value': 0}]    
 *   }</dd>
 * </dl>
 *
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
    JC.f.addAutoInit( InputSelect );

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

            p._model.selector().addClass('IPTSEL-BOX').append('<span class="IPTSEL-ARROW"></span>');
            if ( p._model.iptselbox().length ) {
                p._model.iptselbox().addClass('IPTSEL-DROPDOWN');
                p._model.iptselboxheight() 
                    && p._model.iptselbox().css({'height': p._model.iptselboxheight() + 'px', 'overflow-y': 'auto'});
            }
            p._model.iptseloption().length && p._model.iptseloption().addClass('IPTSEL-ITEM');
            //JC.log( 'InputSelect _beforeInit', new Date().getTime() );

        },

        _initHanlderEvent: function () {
            var p = this;

            p._model.selector().data('visible', 0);

            p._model.iptselipt().on('keyup', function( _evt, _showPopup ){
                var _sp = $(this)
                    , _val = _sp.val().trim()
                    , _keycode = _evt.keyCode
                    , _ignoreTime = _sp.data('IgnoreTime')
                    ;

                if( _keycode ){
                    switch( _keycode ){
                        case 38://up
                        case 40://down
                            {
                                _evt.preventDefault();
                            }
                        case 37: //left
                        case 39: //right
                            {
                                return;
                            }
                        case 27: //ESC
                            {
                                p._hide();
                                return;
                            }
                    }
                }
 
            });

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

            //键盘事件处理
            p._model.iptselipt().on('keydown', function (e) {

                var keycode = e.keyCode, 
                    $this = $(this), 
                    keyindex, 
                    isBackward, 
                    items = p._model.iptseloption(), 
                    item;

                keycode == 38 && ( isBackward = true );
                //JC.log( 'keyup', new Date().getTime(), keycode );

                switch ( keycode ) {
                    case 38://up
                    case 40://down
                        {   
                            if (p._model.dataurl()) {
                                p._model.iptselarrow().trigger('click');
                            }
                            p._show();
                            keyindex = p._model.nextIndex( isBackward );

                            if( keyindex >= 0 && keyindex < items.length ){
                                e.preventDefault();
                                item = $(items[keyindex]);
                                p._model.selectedIdentifier( item );
                                p._model.iptselipt().val( p._model.getKeyword(item ) );
                                p._model.iptselhideipt().val(item.data('value') || '');
                                return;
                            }
                            break;
                        }
                    case 9://tab
                        {
                            p._hide();
                            return;
                        }
                    case 13://回车
                        {
                            var tmpSelectedItem;

                            if( p._model.iptselbox().is( ':visible' ) 
                                    && ( tmpSelectedItem = p._model.iptselbox().find( 'li.active') ) && tmpSelectedItem.length ){
                                p.trigger('iptselitemselected', [ tmpSelectedItem, p._model.getKeyword( tmpSelectedItem ) ]);
                            }
                            p._hide();
                            p._model.iptselprevententer() && e.preventDefault();
                            break;
                        }
                }
            });

            //容器事件处理阻止冒泡
            p._model.iptselbox().on('mousedown', function (e) {
                e.stopPropagation();
            });

            //选项mouseenter,mouseleave事件处理
            p._model.iptselbox()
                .delegate('.IPTSEL-ITEM', 'mouseenter', function (e) {
                    var $this = $(this);
                    p._model.selectedIdentifier($this, true);
                })
                .delegate('.IPTSEL-ITEM', 'mouseleave', function (e) {
                    var $this = $(this);
                    $this.removeClass('active');
                });

            //选项click事件处理
            p._model.iptselbox().delegate('.IPTSEL-ITEM', 'click', function (e) {
                var $this = $(this),
                    keyword = $this.data('label'),
                    kvalue = $this.data('value') || '';
               
                p._model.iptselipt().val(keyword);
                p._model.iptselhideipt().val(kvalue);
                p._hide();

                p.trigger('iptselitemselected', [$this, keyword, kvalue ]);
                JC.f.safeTimeout( function(){
                    p._model.iptselipt().trigger( 'blur' );
                }, null, 'IptSelItemClick', 200);
            });

            p.on('iptselitemselected', function (e, sp, keyword, kvalue) {
                p._model.iptselitemselectedcallback() 
                && p._model.iptselitemselectedcallback().call(p, keyword, kvalue);
            });

            //空白处点击处理
            $(document).on('mousedown', function () {
                p._hide();
            });

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
            var r = JC.f.parentSelector(this.selector(), this.attrProp('iptselipt'));
            r.length && r.addClass('IPTSEL-INPUT');
            return r;
        },

        //隐藏域
        iptselhideipt: function () {
            var r = JC.f.parentSelector(this.selector(), this.attrProp('iptselhideipt'));
            r.length && r.addClass('IPTSEL-HIDE');
            return r;
        },

        //箭头
        iptselarrow: function () {
            return this.selector().find('.IPTSEL-ARROW');
        },

        //选项
        iptseloption: function () {
            var selector = this.selector();
            return JC.f.parentSelector(selector, this.attrProp('iptseloption'));
        },

        //选项的容器
        iptselbox: function () {
            var p = this,
                r = p.attrProp('iptseldatabox');

            return JC.f.parentSelector(p.selector(), r );
           
        },

        //选项容器的高度
        iptselboxheight: function () {
            return this.intProp('iptselboxheight');
        },

        //是否阻止enter提交表单
        iptselprevententer: function () {
            var r = true,
                selector = this.selector();

            selector.is( '[iptselprevententer]' )
                && ( r = this.boolProp('iptselprevententer')  );

            return r;
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
                    str = '<li data-label="{0}" data-keyindex="{1}" data-value="{2}" class="IPTSEL-ITEM">{0}</li>',
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
                            tpl += JC.f.printf(str, res.data[i].label, i, res.data[i].value || '');
                        }
                    }
                    
                    tpl += '</ul>';
                  
                    p.iptselbox().html(tpl);
                    p.dataready = 1;
                }
            });
        },

        nextIndex: function (isBackward) {
            var p = this,
                items = p.iptseloption(),
                len = items.length;

            if (isBackward) {
                if (p.keyindex <= 0) {
                    p.keyindex = len - 1;
                } else {
                    p.keyindex--;
                }
            } else {
                if( p.keyindex >= len - 1 ) {
                    p.keyindex = 0;
                } else {
                    p.keyindex++;
                }
            }

            return p.keyindex;
        },

        //高亮显示选中项
        selectedIdentifier: function (selector, updateKeyIndex) {
            this.preSelected && this.preSelected.removeClass('active');
            selector.addClass('active');
            updateKeyIndex && (this.keyindex = parseInt(selector.data('keyindex')));
            this.preSelected = selector;
        },

        //获取下拉选项的值
        getKeyword: function (selector) {
            var keyword = selector.data('label');
            try {
                keyword = decodeURIComponent(keyword);
            } catch (ex) {

            }
            return keyword;
        },

        keyindex: -1,

        dataready: 0,

        //下拉选中后的回调
        iptselitemselectedcallback: function () {
            var p = this;

            p.selector().is('[iptselitemselectedcallback]')
                &&  (p._iptselselectedcallback = p.selector().attr('iptselitemselectedcallback'));
            
            return p._iptselselectedcallback ? window[p._iptselselectedcallback]: null;
        }

    });

    JC.f.extendObject( InputSelect.View.prototype, {
        init: function () {

        },

        show: function () {
            var p = this;

            p._model.iptselbox().show().css('z-index', window.ZINDEX_COUNT++);
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
