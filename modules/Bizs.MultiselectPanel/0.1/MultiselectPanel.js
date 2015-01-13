 ;(function(define, _win) { 'use strict'; define( 'Bizs.MultiselectPanel', [ 'JC.BaseMVC', 'JC.Panel' ], function(){
/**
 * 二级分类复选弹框
 *
 *  <p><b>require</b>:
 *      <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 *      , <a href='JC.Panel.html'>JC.Panel</a>
 *  </p>
 *
 *  <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *      | <a href='http://jc2.openjavascript.org/docs_api/classes/Bizs.MultiselectPanel.html' target='_blank'>API docs</a>
 *      | <a href='../../modules/Bizs.MultiselectPanel/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *  <h2>页面只要引用本脚本, 默认会自动处理 [input|button] class="js_bizMultiselectPanel" </h2>
 *
 *  <h2>共用的 HTML attribute</h2>
 *  <dl>
 *    <dt>bmspUrl = url</dt>
 *    <dd>获取一级分类数据的URL<dd>
 *
 *    <dt>bmspChildUrl = url</dt>
 *    <dd>获取子级分类数据的URL, "{0}" 代表父级ID<dd>
 *
 *    <dt>bmspPopupHideButton = bool, default = false</dt>
 *    <dd>显示弹框的时候, 是否遮盖触发源标签</dd>
 *
 *    <dt>bmspPanel = selector</dt>
 *    <dd>显示内容的弹框</dd>
 *
 *    <dt>bmspPanelBoxSelector = selector</dt>
 *    <dd>弹框里显示分类内容的容器</dd>
 *
 *    <dt>bmspTopTpl = script selector</dt>
 *    <dd>一级分类的脚本模板</dd>
 *
 *    <dt>bmspChildTpl = script selector</dt>
 *    <dd>子级分类的脚本模板</dd>
 *
 *    <dt>bmspOpenClass = css class name</dt>
 *    <dd>展开子级分类的样式</dd>
 *
 *    <dt>bmspCloseClass = css class name</dt>
 *    <dd>关闭子级分类的样式</dd>
 *
 *    <dt>bmspNoItemText = string</dt>
 *    <dd>没有选择内容时的提示文本</dd>
 *
 *    <dt>bmspHasItemText = string</dt>
 *    <dd>有选择内容时的提示文本, "{0}" 代表选择的数量</dd>
 *
 *    <dt>bmspSaveTopIdSelector = selector</dt>
 *    <dd>保存一级分类ID的选择器</dd>
 *  </dl> 
 *
 *  <h2>URL 回填的 HTML attribute</h2>
 *  <dl>
 *    <dt>bmspAutoFillTopKey = url arg name</dt>
 *    <dd>回填一级分类的URL识别name</dd>
 *
 *    <dt>bmspAutoFillChildKey = url arg name</dt>
 *    <dd>回填子级分类的URL识别name</dd>
 *  </dl>
 *
 *  <h2>数据 回填的 HTML attribute</h2>
 *  <dl>
 *      <dt>bmspDefaultFillData = json data name, <b>window 变量域</b></dt>
 *      <dd>初始化的数据变量名<pre>
window.testData = { "parents": [ 1, 2, 3 ], "children": [4, 5, 6, 7, 8 ] };
</pre></dd>
 *  </dl>
 *
 * @namespace   window.Bizs
 * @class       MultiselectPanel
 * @extends     JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2014-05-09
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 */
    var _jdoc = $( document ), _jwin = $( window );

    Bizs.MultiselectPanel = MultiselectPanel;

    function MultiselectPanel( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, MultiselectPanel ) ) 
            return JC.BaseMVC.getInstance( _selector, MultiselectPanel );

        JC.BaseMVC.getInstance( _selector, MultiselectPanel, this );

        this._model = new MultiselectPanel.Model( _selector );
        this._view = new MultiselectPanel.View( this._model );

        this._init();

        JC.log( MultiselectPanel.Model._instanceName, 'all inited', new Date().getTime() );
    }
    /**
     * 初始化可识别的 MultiselectPanel 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of MultiselectPanelInstance}
     */
    MultiselectPanel.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector.length ){
                if( _selector.hasClass( 'js_bizMultiselectPanel' )  ){
                    _r.push( new MultiselectPanel( _selector ) );
                }else{
                    _selector.find( 'input.js_bizMultiselectPanel, button.js_bizMultiselectPanel' ).each( function(){
                        _r.push( new MultiselectPanel( this ) );
                    });
                }
            }
            return _r;
        };

    JC.BaseMVC.build( MultiselectPanel );

    JC.f.extendObject( MultiselectPanel.prototype, {
        _beforeInit:
            function(){
                //JC.log( 'MultiselectPanel _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this;

                _p.on( 'inited', function(){
                    _p.trigger( 'init_top' );
                });

                var _panel = new JC.Panel( _p._model.panel() );
                    _p._model.panelIns( _panel );

                    _panel.on( 'close', function( _evt, _panel ){ _panel.hide(); return false; });

                    _panel.on( 'hide', function(){
                        JC.f.safeTimeout( function(){
                            _p.trigger( 'updateStatus' );
                        }, _p.selector(), 'HIDE_PANEL', 50 );
                    });

                    _panel.on( 'beforeshow', function(){
                        JC.hideAllPanel();
                    });

                    _panel.layout().on( 'click', function( _evt ){
                        JC.f.safeTimeout( function(){
                            _p.trigger( 'saveParentId' );
                        }, _p.selector(), 'HIDE_PANEL', 50 );
                    });


                if( _p._model.popupHideButton() ){
                    _panel.offsetTop( -_p.selector().prop( 'offsetHeight' ) - 1 );
                }

                _p.selector().on( 'click', function( _evt ){
                    _panel.show( _p.selector() );
                });

                _p.on( 'init_top', function( _evt ){
                    _p._model.initTop();
                    _p.trigger( 'saveParentId' );
                });

                _p.on( 'updateTop', function( _evt, _data, _d ){
                    _p._view.buildTop( _data );
                    _p.trigger( 'saveParentId' );
                });

                _p.on( 'updateChild', function( _evt, _id, _data, _d ){
                    _p._view.buildChild( _id, _data );
                    var _pCk = _p._model.getCkItem( _id );
                    _p._view.topCk( _id, _pCk.prop( 'checked' ) );
                });

                _panel.layout().delegate( '.' + _p._model.openClass(), 'click', function( _evt ){
                    var _sp = $( this ), _id = _sp.data('id');
                    _sp.addClass( _p._model.closeClass() ).removeClass( _p._model.openClass() );
                    _p._view.showChild( _id );
                    _p.trigger( 'initChildBox', [ _id ] );
                });

                _p.on( 'initChildBox', function( _evt, _id ){
                    if( !_p._model.getChildBox( _id ).data( 'inited' ) ){
                        _p._model.getChildBox( _id ).data( 'inited', true );
                        _p._model.initChild( _id );
                    }
                });

                _panel.layout().delegate( '.' + _p._model.closeClass(), 'click', function( _evt ){
                    var _sp = $( this ), _id = _sp.data('id');
                    _sp.addClass( _p._model.openClass() ).removeClass( _p._model.closeClass() );
                    _p._view.hideChild( _id );
                });

                _panel.layout().delegate( 'input.js_bmspTopCk', 'change', function( _evt ){
                    var _sp = $( this ), _id = _sp.val();
                    _p._view.topCk( _id, _sp.prop( 'checked' ) );

                    _sp.prop( 'checked' ) && _p.trigger( 'initChildBox', [ _id ] );
                });

                _panel.layout().delegate( 'input.js_bmspChildCk', 'change', function( _evt ){
                    var _sp = $( this ), _id = _sp.val(), _parentid = _sp.data( 'parentid' );
                    _p._view.childCk( _parentid, _id );
                });

                _p.on( 'updateStatus', function( _evt ){
                    var _cked = _panel.find( 'input.js_bmspChildCk:checked' );
                    if( _cked.length ){
                        _p.selector().val( JC.f.printf( _p._model.hasItemText(), _cked.length ) );
                    }else{
                        _p.selector().val( _p._model.noItemText() );
                    }

                    _p.trigger( 'saveParentId' );
                });

                _p.on( 'saveParentId', function( _evt ){
                    var _idSelector = _p._model.saveTopIdSelector();
                    if( _idSelector && _idSelector.length ){
                        var _pCk = _p._model.panelIns().find( 'input.js_bmspTopCk:checked' )
                            , _cCk = _p._model.panelIns().find( 'input.js_bmspChildCk:checked' )
                            , _tmp = {}
                            , _r = []
                            ;

                        _pCk.each( function(){
                            var _id = $( this ).val();

                            if( !( _id in _tmp ) ){
                                _r.push( _id );
                            }
                            _tmp[ _id ] = '';
                        });

                        _cCk.each( function(){
                            var _id = $( this ).data( 'parentid' );
                            if( !( _id in _tmp ) ){
                                _r.push( _id );
                            }
                            _tmp[ _id ] = '';
                        });

                        _idSelector.val( _r.join(',') );
                    }
                    
                });

            }

        , _inited:
            function(){
                //JC.log( 'MultiselectPanel _inited', new Date().getTime() );
                this.trigger( 'inited' );
            }
    });

    MultiselectPanel.Model._instanceName = 'JCMultiselectPanel';
    JC.f.extendObject( MultiselectPanel.Model.prototype, {
        init:
            function(){
                //JC.log( 'MultiselectPanel.Model.init:', new Date().getTime() );
            }

        , url: function(){ return this.attrProp( 'bmspUrl' ); }
        , childUrl: function(){ return this.attrProp( 'bmspChildUrl' ); }
        , popupHideButton: function(){ return this.boolProp( 'bmspPopupHideButton'); }
        , noDataFillSelf: function(){ return this.boolProp( 'bmspNoDataFillSelf'); }
        , panel: function(){ return this.selectorProp( 'bmspPanel'); }
        , panelIns: 
            function( _setter ){
                typeof _setter != 'undefined' && ( this._panelIns = _setter );
                return this._panelIns;
            }
        , panelBoxSelector: function(){ return this.panelIns().find( this.attrProp( 'bmspPanelBoxSelector' ) || 'js_bmspPanelBox' ); }
        , topTpl: function(){ return this.scriptTplProp( 'bmspTopTpl' ) }
        , childTpl: function(){ return this.scriptTplProp( 'bmspChildTpl' ) }
        , childBox: function( _selector ){ return _selector.find( '.js_bmspChildBox' ); } 

        , openClass: function(){ return this.attrProp( 'bmspOpenClass' ); } 
        , closeClass: function(){ return this.attrProp( 'bmspCloseClass' ); } 

        , openSelector: function(){ return this.selectorProp( '.' + this.openClass() ); } 
        , closeSelector: function(){ return this.selectorProp( '.' + this.closeClass() ); } 

        , saveTopIdSelector: function(){ return this.selectorProp( 'bmspSaveTopIdSelector'); }

        , initTop:
            function(){
                var _p = this, _data;
                $.get( _p.url() ).done( function( _d ){
                    _data = $.parseJSON( _d );
                    _data 
                        && !_data.errorno 
                        && _data.data 
                        && _p.trigger( 'updateTop', [ _data.data, _d ] );
                });
            }

        , initChild:
            function( _id ){
                var _p = this, _data;
                $.get( JC.f.printf( _p.childUrl(), _id ) ).done( function( _d ){
                   _data = $.parseJSON( _d );
                    _data 
                        && !_data.errorno 
                        && _data.data 
                        && _p.trigger( 'updateChild', [ _id, _data.data, _d ] );
                });
            }

        , getChildBox: function( _id ){
            return this.panelIns().find( JC.f.printf( '.js_bmspChildBox[data-id={0}]', _id ) );
        }

        , getIcon: function( _id ){
            return this.panelIns().find( JC.f.printf( '.js_bmspIcon[data-id={0}]', _id ) );
        }

        , getCkItem: function( _id ){
             return this.panelIns().find( JC.f.printf( 'input.js_bmspCkItem[value={0}]', _id ) );
        }

        , noItemText: function(){ return this.attrProp( 'bmspNoItemText' ); }
        , hasItemText: function(){ return this.attrProp( 'bmspHasItemText' ); }

    });

    JC.f.extendObject( MultiselectPanel.View.prototype, {
        init:
            function(){
                //JC.log( 'MultiselectPanel.View.init:', new Date().getTime() );
            }

        , buildTop:
            function( _data ){
                var _p = this
                    , _box = _p._model.panelBoxSelector()
                    , _tpl = _p._model.topTpl()
                    , _r = []
                    ;
    
                $.each( _data, function( _ix, _item ){
                    _r.push( JC.f.printf( _tpl, _item[0], _item[1] ) );
                });

                _box.html( _r.join('') );
            }

        , buildChild:
            function( _id, _data ){
               var _p = this
                    , _box = _p._model.getChildBox( _id )
                    , _tpl = _p._model.childTpl()
                    , _r = []
                    ;

               if( _p._model.noDataFillSelf() ){
                   if( _data && !_data.length ){
                       var _pCk = _p._model.getCkItem( _id ), _label = _pCk.data( 'label' ) || '';
                       _data.push( [ _id, _label ] );
                   }
               }

                $.each( _data, function( _ix, _item ){
                    _r.push( JC.f.printf( _tpl, _item[0], _item[1], _id ) );
                });

                _box.html( _r.join('') );
            }

        , showChild:
            function( _id ){
                this._model.getChildBox( _id ).show();
            }

        , hideChild:
            function( _id ){
                this._model.getChildBox( _id ).hide();
            }

        , topCk:
            function( _id, _checked ){
                var _childBox = this._model.getChildBox( _id );
                _childBox.find( 'input.js_bmspChildCk' ).prop( 'checked', _checked );
            }

        , childCk:
            function( _parentid, _id ){
                var _p = this
                    , _childBox = this._model.getChildBox( _parentid )
                    , _allCk = _p._model.getCkItem( _parentid )
                    ;
                if( _childBox.find( 'input.js_bmspChildCk:not(:checked)' ).length ){
                    _allCk.prop( 'checked', false );
                }else{
                    _allCk.prop( 'checked', true );
                }
            }
    });

    _jwin.on( 'BMSP_AUTO_FILL_DEFAULT_DATA', function( _evt, _sp ){
        var _topKey, _childKey, _data;
        if( !( _sp && _sp.length 
                && _sp.attr( 'bmspDefaultFillData' ) 
                && ( _data = window[ _sp.attr( 'bmspDefaultFillData' ) ] ) ) 
                && _data.parents
        ){
            return;
        }
        _jwin.trigger( 'BMSP_AUTO_FILL', [ _sp, _data.parents, _data.children ] );
    });

    _jwin.on( 'BMSP_AUTO_FILL_URL_DATA', function( _evt, _sp ){
        var _topKey, _childKey;

        if( !( _sp.attr( 'bmspAutoFillTopKey' ) 
                && ( _topKey = JC.f.getUrlParams( _sp.attr( 'bmspAutoFillTopKey' ) ) ) && _topKey.length ) 
        ){
            return;
        }
        _topKey = decodeURIComponent( _topKey ).split( ',' );
        _childKey = JC.f.getUrlParams( _sp.attr( 'bmspAutoFillChildKey' ) );

        _jwin.trigger( 'BMSP_AUTO_FILL', [ _sp, _topKey, _childKey ] );
    });

    _jwin.on( 'BMSP_AUTO_FILL', function( _evt, _sp, _topKey, _childKey ){
        if( !( _sp && _sp.length && _topKey && _topKey.length ) ) return;
        var _cTopKey, _ins;
        _ins = JC.BaseMVC.getInstance( _sp, Bizs.MultiselectPanel ) || new Bizs.MultiselectPanel( _sp );
        _cTopKey = _topKey.slice();
        _ins.on( 'updateTop', function(){
            if( _topKey.length ){
                var _id = _topKey.shift();
                _ins.trigger( 'initChildBox', [ _id ] )
                _ins._model.getIcon( _id ).trigger( 'click' );

                _ins.on( 'updateChild', function(){
                    if( _topKey.length ){
                        _id = _topKey.shift();
                        _ins.trigger( 'initChildBox', [ _id ] );
                        _ins._model.getIcon( _id ).trigger( 'click' );
                    }else if( _cTopKey.length ){
                        if( _childKey && _childKey.length ){
                            _childKey && _childKey.length 
                                && $.each( _childKey, function( _ix, _item ){
                                    _ins._model.getCkItem( _item ).prop( 'checked', true );
                                });

                            $.each( _cTopKey, function( _ix, _item ){
                                _ins._view.childCk( _item );
                            });

                            _ins.trigger( 'updateStatus' );
                        }
                        _cTopKey = [];
                    }
                });
            }
        });

    });

    _jdoc.ready( function(){

        //Bizs.MultiselectPanel.autoInit && Bizs.MultiselectPanel.init();

        _jdoc.delegate( 'input.js_bizMultiselectPanel', 'click', function( _evt ){
            var _sp = $( this ), _ins;
            if( !JC.BaseMVC.getInstance( _sp, Bizs.MultiselectPanel ) ){
                _ins = new Bizs.MultiselectPanel( _sp );
                _ins._model.panelIns().show( _sp );
            }
        });

        //return;

        $( 'input.js_bizMultiselectPanel' ).each( function(){
            var _sp = $( this )

            if( _sp.attr( 'bmspDefaultFillData' ) && window[ _sp.attr( 'bmspDefaultFillData' ) ] ){
                _jwin.trigger( 'BMSP_AUTO_FILL_DEFAULT_DATA', [ _sp ] );
            }else if( _sp.attr( 'bmspAutoFillTopKey' ) ){
                _jwin.trigger( 'BMSP_AUTO_FILL_URL_DATA', [ _sp ] );
            }
        });

    });


    return Bizs.MultiselectPanel;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
