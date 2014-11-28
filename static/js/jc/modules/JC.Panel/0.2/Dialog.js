;(function(define, _win) { 'use strict'; define( [ 'JC.Panel.default' ], function(){
    var isIE6 = !!window.ActiveXObject && !window.XMLHttpRequest;
    /**
     * 带蒙板的会话弹框
     * <br /><b>注意, 这是个方法, 写 @class 属性是为了生成文档</b>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.Dialog.html' target='_blank'>API docs</a>
     * | <a href='../../modules/JC.Panel/0.2/_demo' target='_blank'>demo link</a></p>
     * <p><b>see also</b>: <a href='JC.Panel.html'>JC.Panel</a></p>
     * @namespace JC
     * @class   Dialog
     * @extends JC.Panel
     * @static
     * @constructor
     * @param   {selector|string}   _selector   自定义弹框模板, 如果 _selector不能解析为 HTML, 将视为@param _headers 
     * @param   {string}            _headers    定义模板的 header 文字, 如果 _selector 不能解析为HTML, 视视为@param _bodys
     * @param   {string}            _bodys      定义模板的 body 文字, 如果 _selector 不能解析为HTML, 视视为@param _footers
     * @param   {string}            _footers    定义模板的 footer 文字
     * @return  <a href='JC.Panel.html'>JC.Panel</a>
     */
    var Dialog = window.Dialog = JC.Dialog = 
        function( _selector, _headers, _bodys, _footers ){
            if( _logic.timeout ) clearTimeout( _logic.timeout );

            if( JC.Panel.getInstance( _selector ) ){
                _logic.timeout = setTimeout( function(){
                    JC.Panel.getInstance( _selector ).show(0);
                }, _logic.showMs );

                return JC.Panel.getInstance( _selector );
            }

            _logic.dialogIdentifier();

            var _ins = new JC.Panel( _selector, _headers, _bodys, _footers );
            _logic.dialogIdentifier( _ins );

            _logic.showMask();
            _ins.selector().css( 'z-index', window.ZINDEX_COUNT++ );
            !_ins.selector().is( '[panelclickclose]' ) && _ins.selector().attr( 'panelclickclose', false );

            _ins.on('close_default', function( _evt, _panel){
                _logic.hideMask();
            });

            _ins.on('hide_default', function( _evt, _panel){
                _logic.hideMask();
            });

            _ins.on('show_default', function( _evt, _panel){
                _logic.showMask(); 

                setTimeout( function(){  
                    _logic.showMask(); 
                    _ins.selector().css( { 'z-index': window.ZINDEX_COUNT++, 'display': 'block' } );
                }, 1 );
            });
            
            _logic.timeout = setTimeout( function(){
                _ins.show( 0 );
            }, _logic.showMs );

            return _ins;
        };

    /**
     * 显示或隐藏 蒙板
     * <br /><b>注意, 这是个方法, 写 @class 属性是为了生成文档</b>
     * @namespace   JC.Dialog
     * @class   mask
     * @static
     * @constructor
     * @param   {bool}  _isHide     空/假 显示蒙板, 为真 隐藏蒙板
     */
    JC.Dialog.mask =
        function( _isHide ){
            !_isHide && _logic.showMask();
            _isHide && _logic.hideMask();
        };
    /**
     * 会话弹框逻辑处理方法集
     * @property    _logic
     * @for JC.Dialog
     * @private
     */
    var _logic = {
        /**
         * 延时处理的指针属性
         * @property    _logic.timeout
         * @type    setTimeout
         * @private
         * @for JC.Dialog
         */
        timeout: null
        /**
         * 延时显示弹框
         * <br />延时是为了使用户绑定的 show 事件能够被执行
         * @property    _logic.showMs
         * @type    int     millisecond
         * @private
         * @for JC.Dialog
         */
        , showMs: 10
        /**
         * 设置会话弹框的唯一性
         * @method  _logic.dialogIdentifier
         * @for JC.Dialog
         * @private
         * @param   {JC.Panel} _panel  
         */
        , dialogIdentifier:
            function( _panel ){
                if( !_panel ){
                    _logic.hideMask();
                    $('body > div.UPanelDialog_identifer').each( function(){
                        var _p = $(this), _ins = Panel.getInstance( _p );
                        if( !_ins ) return;
                        _ins.hide();
                        _ins.close();
                    });
                    $('body > div.UPanel_TMP').remove();
                }else{
                    _panel.selector().addClass('UPanelDialog_identifer');
                    _panel.selector().data('DialogInstance', _panel);
                }
            }
        /**
         * 显示蒙板
         * @method  _logic.showMask
         * @private
         * @for JC.Dialog
         */
        , showMask:
            function(){
                var _mask = $('#UPanelMask'), _iframemask = $('#UPanelMaskIfrmae');
                if( !_mask.length ){
                    $( _logic.tpls.mask ).appendTo('body');
                    _mask = $('#UPanelMask'), _iframemask = $('#UPanelMaskIfrmae');
                }
                _iframemask.show(); _mask.show();

                _logic.setMaskSizeForIe6();

                _iframemask.css('z-index', window.ZINDEX_COUNT++ );
                _mask.css('z-index', window.ZINDEX_COUNT++ );
            }
        /**
         * 隐藏蒙板
         * @method  _logic.hideMask
         * @private
         * @for JC.Dialog
         */
        , hideMask:
            function(){
                var _mask = $('#UPanelMask'), _iframemask = $('#UPanelMaskIfrmae');
                if( _mask.length ) _mask.hide();
                if( _iframemask.length ) _iframemask.hide();
            }
        /**
         * 窗口改变大小时, 改变蒙板的大小,
         * <br />这个方法主要为了兼容 IE6
         * @method  _logic.setMaskSizeForIe6
         * @private
         * @for JC.Dialog
         */
        , setMaskSizeForIe6:
            function(){
                var _mask = $('#UPanelMask'), _iframemask = $('#UPanelMaskIfrmae');
                if( !( _mask.length && _iframemask.length ) ) return;

                var _css = {
                    'position': 'absolute'
                    , 'top': '0px'
                    , 'left': $(document).scrollLeft() + 'px'
                    , 'height': $(document).height() + 'px'
                    , 'width': $(window).width()  + 'px'
                };

                _mask.css( _css );
                _iframemask.css( _css );
            }
        /**
         * 保存会话弹框的所有默认模板
         * @property    _logic.tpls
         * @type        Object
         * @for         JC.Dialog
         * @private
         */
        , tpls: {
            /**
             *  会话弹框的蒙板模板
             *  @property   _logic.tpls.mask
             *  @type       string
             *  @private
             */
            mask:
                [
                    '<div id="UPanelMask" class="UPanelMask"></div>'
                    , '<iframe src="about:blank" id="UPanelMaskIfrmae"'
                    , ' frameborder="0" class="UPanelMaskIframe"></iframe>'
                ].join('')
        }
    };
    /**
     * 响应窗口改变大小和滚动 
     */
    $(window).on('resize scroll', function( _evt ){
        $('body > div.UPanelDialog_identifer').each( function(){
            var _p = $(this);
            if( _p.data('DialogInstance') ){
                if(  !_p.data('DialogInstance').selector().is(':visible') ) return;
                if( _evt.type.toLowerCase() == 'resize' ) _p.data('DialogInstance').center(); 
                _logic.setMaskSizeForIe6();
            }
        });
    });

    return JC.Dialog;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
