;(function(define, _win) { 'use strict'; define( [ 'JC.common' ], function(){
    /**
     * 表单常用功能类 JC.Form
     * <p>
     *      <b>require</b>: 
     *      <a href='window.jQuery.html'>jQuery</a>
     * </p>
     * <p>
     *      <b>optional</b>: 
     *      <a href='JC.AutoSelect.html'>JC.AutoSelect</a>
     *      , <a href='JC.AutoChecked.html'>JC.AutoChecked</a>
     * </p>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.Form.html' target='_blank'>API docs</a>
     * | <a href='../../modules/JC.Form/0.1/_demo' target='_blank'>demo link</a></p>
     * @namespace JC
     * @class Form
     * @static
     * @version dev 0.1
     * @author  qiushaowei   <suches@btbtd.org> | 75 team
     * @date    2013-06-11
     */
    window.JCForm = JC.Form = {
        /**
         * 禁用按钮一定时间, 默认为1秒
         * @method  disableButton
         * @static
         * @param   {selector}  _selector   要禁用button的选择器
         * @param   {int}       _durationMs 禁用多少时间, 单位毫秒, 默认1秒
         */
        'disableButton':
            function( _selector, _durationMs ){
                if( !_selector ) return;
                _selector = $(_selector);
                _durationMs = _durationMs || 1000;
                _selector.attr('disabled', true);
                setTimeout( function(){
                    _selector.attr('disabled', false);
                }, _durationMs);
            }
    };
    /**
     * select 级联下拉框无限联动
     * <br />这个方法已经摘取出来, 单独成为一个类.
     * <br />详情请见: <a href="../../docs_api/classes/JC.AutoSelect.html">JC.AutoSelect.html</a>
     * <br />目前摘出去的类与之前的逻辑保持向后兼容, 但在不久的将来将会清除这个方法
     * @method  initAutoSelect
     * @static
     */
    JC.AutoSelect && ( JC.Form.initAutoSelect = JC.AutoSelect );
    /**
     * 全选/反选
     * <br />这个方法已经摘取出来, 单独成为一个类.
     * <br />详情请见: <a href="../../docs_api/classes/JC.AutoChecked.html">JC.AutoChecked.html</a>
     * <br />目前摘出去的类与之前的逻辑保持向后兼容, 但在不久的将来将会清除这个方法
     * @method  initCheckAll
     * @static
     */
    JC.AutoChecked && ( JC.Form.initCheckAll = JC.AutoChecked );

    return JC.Form;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
