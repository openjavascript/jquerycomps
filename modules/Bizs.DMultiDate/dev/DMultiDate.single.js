;
(function(define, _win) {
    'use strict';
    define(['DEV.Bizs.DMultiDate.default'], function() {

        /**
         * DMultiDate 复合日历业务逻辑
         * <br/> Dom 加载后会自动加载页面上所有.js_autoDMultiDate的标签
         * <p><b>require</b>:
         *      <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
         *      , <a href='JC.Calendar.html'>JC.Calendar</a>
         * </p>
         * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
         * | <a href='http://jc2.openjavascript.org/docs_api/classes/window.Bizs.DMultiDate.html' target='_blank'>API docs</a>
         * | <a href='../../modules/Bizs.DMultiDate/0.1/_demo' target='_blank'>demo link</a></p>
         *
         * <h2>可用的html属性</h2>
         * <dl>
         *    <dt>mddate = css selector</dt>
         *    <dd>声明日期input[type=text][datatype=daterange]的标签<br/>
         *        如果缺省则自动查找子元素.js_multidate</dd>
         *
         *    <dt>mdstartdate = css selector</dt>
         *    <dd>声明开始日期的隐藏域标签, 默认查找子元素.js_startdate</dd>
         *
         *    <dt>mdenddate = css selector</dt>
         *    <dd>声明结束日期的隐藏域标签, 默认查找子元素.js_enddate</dd>
         *
         *    <dt>mddayrange = num</dt>
         *    <dd>声明时间粒度为日时，最长可选取多少天，如果不需要则不声明此属性</dd>
         *
         *    <dt>mdweekrange = num</dt>
         *    <dd>声明时间粒度为周时，最长可选取多少周，如果不需要则不声明此属性</dd>
         *
         *    <dt>mdmonthrange = num</dt>
         *    <dd>声明时间粒度为月时，最长可选取多少月，如果不需要则不声明此属性</dd>
         *
         *    <dt>mdseasonrange = num</dt>
         *    <dd>声明时间粒度为季时，最长可选取多少季，如果不需要则不声明此属性</dd>
         *
         *    <dt>mdyearrange = num</dt>
         *    <dd>声明时间粒度为年时，最长可选取多少年，如果不需要则不声明此属性</dd>
         *
         *    <dt>mdIgnoreUrlFill = bool, default = false</dt>
         *    <dd>是否忽略 URL 自动填充</dd>
         *
         * </dl>
         *
         * @class   DMultiDate
         * @namespace   window.Bizs
         * @constructor
         * @private
         * @version dev 0.1 2014-03-03
         * @author  zuojing   <zuojing1013@gmail.com> | 75 Team
         */

        function SingleModel (selector) {
            this._selector = selector;
        }

        Bizs.DMultiDate.SingleModel = SingleModel;

        function SingleView (model) {
            this._model = model;
        }

        Bizs.DMultiDate.SingleView = SingleView;

        Bizs.DMultiDate.clone(SingleModel, SingleView);
        

        JC.f.extendObject(SingleModel.prototype,  {
            init: function () {
                console.log("SingleModel");
            }
        } );

        JC.f.extendObject(SingleView.prototype, {
            init: function () {}
        });

        

    });
}(typeof define === 'function' && define.amd ? define :
    function(_name, _require, _cb) {
        typeof _name == 'function' && (_cb = _name);
        typeof _require == 'function' && (_cb = _require);
        _cb && _cb();
    }, window
));
