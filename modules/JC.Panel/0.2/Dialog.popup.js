;(function(define, _win) { 'use strict'; define( 'JC.Dialog.popup', [ 'JC.Dialog' ], function(){
    /**
     * 会话框 msgbox 提示 (不带按钮)
     * <br /><b>注意, 这是个方法, 写 @class 属性是为了生成文档</b>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.Dialog.msgbox.html' target='_blank'>API docs</a>
     * | <a href='../../modules/JC.Panel/0.2/_demo' target='_blank'>demo link</a></p>
     * <p><b>see also</b>: <a href='JC.Dialog.html'>JC.Dialog</a></p>
     * @namespace JC.Dialog
     * @class   msgbox
     * @extends JC.Dialog
     * @static
     * @constructor
     * @param   {string}    _msg        提示内容
     * @param   {int}       _status     显示弹框的状态, 0: 成功, 1: 错误, 2: 警告
     * @param   {function}  _cb         弹框自动关闭后的的回调, <b>如果 _cb 为 int 值, 将视为 _closeMs</b>
<pre>function( _evtName, _panelIns ){
    var _btn = $(this);
}</pre>
     * @param   {int}       _closeMs    自动关闭的间隔, 单位毫秒, 默认 2000
     * @return  <a href='JC.Panel.html'>JC.Panel</a>
     */
    JC.Dialog.msgbox = 
        function(_msg, _status, _cb, _closeMs ){
            if( !_msg ) return;
            var _tpl = ( JC.Dialog.msgbox.tpl || _logic.tpls.msgbox )
                        .replace(/\{msg\}/g, _msg)
                        .replace(/\{status\}/g, _logic.getStatusClass(_status||'') );
            var _ins = JC.Dialog(_tpl);

            _logic.fixWidth( _msg, _ins );
            _cb && _ins.on('close', _cb);
            setTimeout( function(){ _ins.autoClose( _closeMs ); }, 1 );

            return _ins;
        };
    /**
     * 自定义 JC.Dialog.alert 的显示模板
     * @property    tpl
     * @type    string
     * @default undefined
     * @static
     */
    JC.Dialog.msgbox.tpl;
    /**
     * 会话框 alert 提示
     * <br /><b>注意, 这是个方法, 写 @class 属性是为了生成文档</b>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.Dialog.alert.html' target='_blank'>API docs</a>
     * | <a href='../../modules/JC.Panel/0.2/_demo' target='_blank'>demo link</a></p>
     * <p><b>see also</b>: <a href='JC.Dialog.html'>JC.Dialog</a></p>
     * @namespace JC.Dialog
     * @class   alert
     * @extends JC.Dialog
     * @static
     * @constructor
     * @param   {string}    _msg        提示内容
     * @param   {int}       _status     显示弹框的状态, 0: 成功, 1: 错误, 2: 警告
     * @param   {function}  _cb         点击弹框确定按钮的回调
<pre>function( _evtName, _panelIns ){
    var _btn = $(this);
}</pre>
     * @return  <a href='JC.Panel.html'>JC.Panel</a>
     */
    JC.Dialog.alert = 
        function(_msg, _status, _cb){
            if( !_msg ) return;
            var _tpl = ( JC.Dialog.alert.tpl || _logic.tpls.alert )
                        .replace(/\{msg\}/g, _msg)
                        .replace(/\{status\}/g, _logic.getStatusClass(_status||'') );
            var _ins = JC.Dialog(_tpl);
            _logic.fixWidth( _msg, _ins );
            _cb && _ins.on('confirm', _cb);

            return _ins;
        };
    /**
     * 自定义 JC.Dialog.alert 的显示模板
     * @property    tpl
     * @type    string
     * @default undefined
     * @static
     */
    JC.Dialog.alert.tpl;
    /**
     * 会话框 confirm 提示
     * <br /><b>注意, 这是个方法, 写 @class 属性是为了生成文档</b>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.Dialog.confirm.html' target='_blank'>API docs</a>
     * | <a href='../../modules/JC.Panel/0.2/_demo' target='_blank'>demo link</a></p>
     * <p><b>see also</b>: <a href='JC.Dialog.html'>JC.Dialog</a></p>
     * @namespace JC.Dialog
     * @class   confirm
     * @extends JC.Dialog
     * @static
     * @constructor
     * @param   {string}    _msg        提示内容
     * @param   {int}       _status     显示弹框的状态, 0: 成功, 1: 错误, 2: 警告
     * @param   {function}  _cb         点击弹框确定按钮的回调
<pre>function( _evtName, _panelIns ){
    var _btn = $(this);
}</pre>
     * @param   {function}  _cancelCb   点击弹框取消按钮的回调
<pre>function( _evtName, _panelIns ){
    var _btn = $(this);
}</pre>
     * @return  <a href='JC.Panel.html'>JC.Panel</a>
     */
    JC.Dialog.confirm = 
        function(_msg, _status, _cb, _cancelCb ){
            if( !_msg ) return;
            var _tpl = ( JC.Dialog.confirm.tpl || _logic.tpls.confirm )
                        .replace(/\{msg\}/g, _msg)
                        .replace(/\{status\}/g, _logic.getStatusClass(_status||'') );
            var _ins = JC.Dialog(_tpl);
            _logic.fixWidth( _msg, _ins );
            _cb && _ins.on('confirm', _cb);
            _cancelCb && _ins.on( 'cancel', _cancelCb );

            return _ins;
        };
    /**
     * 自定义 JC.Dialog.confirm 的显示模板
     * @property    tpl
     * @type    string
     * @default undefined
     * @static
     */
    JC.Dialog.confirm.tpl;

    var _logic = {
        /**
         * 弹框最小宽度
         * @property    _logic.minWidth
         * @for JC.Dialog
         * @type        int
         * @default     180
         * @private
         */
        minWidth: 180
        /**
         * 弹框最大宽度
         * @property    _logic.maxWidth
         * @for JC.Dialog
         * @type        int
         * @default     500
         * @private
         */
        , maxWidth: 500
        /**
         * 获取弹框的显示状态, 默认为0(成功)
         * @method  _logic.fixWidth
         * @for     JC.Dialog
         * @private
         * @param   {int}   _status     弹框状态: 0:成功, 1:失败, 2:警告
         * @return  {int}
         */
        , getStatusClass:
            function ( _status ){
                var _r = 'UPanelSuccess';
                switch( _status ){
                    case 0: _r = 'UPanelSuccess'; break;
                    case 1: _r = 'UPanelError'; break;
                    case 2: _r = 'UPanelAlert'; break;
                }
                return _r;
            }
        /**
         * 修正弹框的默认显示宽度
         * @method  _logic.fixWidth
         * @for     JC.Dialog
         * @private
         * @param   {string}    _msg    查显示的文本
         * @param   {JC.Panel} _panel
         */
        , fixWidth:
            function( _msg, _panel ){
                var _tmp = $('<div class="UPanel_TMP" style="position:absolute; left:-9999px;top:-9999px;">' + _msg + '</div>').appendTo('body'), _w = _tmp.width() + 80;
                _w > _logic.maxWidth && ( _w = _logic.maxWidth );
                _w < _logic.minWidth && ( _w = _logic.minWidth );

                _panel.selector().css('width', _w);
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
             *  msgbox 会话弹框的默认模板
             *  @property   _logic.tpls.msgbox
             *  @type       string
             *  @private
             */
            msgbox:
                [
                '<div class="UPanel UPanelPopup {status}" panelclickclose="true" >'
                ,'    <div class="UPContent">'
                ,'        <div class="bd">'
                ,'            <dl>'
                ,'                <dd class="UPopupContent">'
                ,'                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>'
                ,'                </dd>'
                ,'            </dl>'
                ,'        </div>'
                ,'    </div><!--end UPContent-->'
                ,'</div>'
                ].join('')
            /**
             *  alert 会话弹框的默认模板
             *  @property   _logic.tpls.alert
             *  @type       string
             *  @private
             */
            , alert:
                [
                '<div class="UPanel UPanelPopup {status}" panelclickclose="true" >'
                ,'    <div class="UPContent">'
                ,'        <div class="bd">'
                ,'            <dl>'
                ,'                <dd class="UPopupContent">'
                ,'                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>'
                ,'                </dd>'
                ,'                <dd class="UButton">'
                ,'                    <button type="button" class="UPanel_confirm" eventtype="confirm">确定</button>'
                ,'                </dd>'
                ,'            </dl>'
                ,'        </div>'
                ,'    </div><!--end UPContent-->'
                ,'</div>'
                ].join('')
            /**
             *  confirm 会话弹框的默认模板
             *  @property   _logic.tpls.confirm
             *  @type       string
             *  @private
             */
            , confirm:
                [
                '<div class="UPanel UPanelPopup {status}" panelclickclose="true" >'
                ,'    <div class="UPContent">'
                ,'        <div class="bd">'
                ,'            <dl>'
                ,'                <dd class="UPopupContent">'
                ,'                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>'
                ,'                </dd>'
                ,'                <dd class="UButton">'
                ,'                    <button type="button" class="UPanel_confirm" eventtype="confirm">确定</button>'
                ,'                    <button type="button" class="UPanel_cancel" eventtype="cancel">取消</button>'
                ,'                </dd>'
                ,'            </dl>'
                ,'        </div>'
                ,'    </div><!--end UPContent-->'
                ,'</div>'
                ].join('')
        }
    };

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
