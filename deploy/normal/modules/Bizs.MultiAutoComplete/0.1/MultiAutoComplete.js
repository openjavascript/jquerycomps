(function(e,t){e(["JC.AutoComplete","JC.Placeholder","JC.Panel"],function(){function n(e){e&&(e=$(e));if(JC.BaseMVC.getInstance(e,n))return JC.BaseMVC.getInstance(e,n);JC.BaseMVC.getInstance(e,n,this),this._model=new n.Model(e),this._view=new n.View(this._model),this._init(),JC.log(n.Model._instanceName,"all inited",(new Date).getTime())}var e=$(document),t=$(window);return Bizs.MultiAutoComplete=n,n.init=function(e){var t=[];return e=$(e||document),e.length&&(e.is("[defaultMultiAutomComplete]")?t.push(new n(e)):e.find("input[defaultMultiAutomComplete]").each(function(){t.push(new n(this))})),t},n.ajaxRandom=!0,JC.BaseMVC.build(n),JC.f.extendObject(n.prototype,{_beforeInit:function(){},_initHanlderEvent:function(){var e=this;e.on("inited",function(){e.trigger("init_relationship"),e.trigger("fix_id_callback"),e.trigger("init_autoComplete"),e.trigger("update_selector",[e.selector()]),e.trigger("init_user_input"),e._model.ready(!0),e.trigger("inited_done")}),e.on("init_relationship",function(t){e._model.init_relationship()}),e.on("fix_id_callback",function(t){e._model.fixIdCallback()}),e.on("init_autoComplete",function(t){e._model.each(function(e){e.hasClass("js_compAutoComplete")&&!JC.BaseMVC.getInstance(e,JC.AutoComplete)&&new JC.AutoComplete(e)})}),e.on("update_selector",function(t,n,r){if(!n||!n.length)return;!r&&e.trigger("clear_selector",[n]),e.trigger("ajax_data",[n])}),e.on("clear_selector",function(t,n){if(!e._model.ready())return;e._model.clearData(n)}),e.on("ajax_data",function(t,n,r){if(!n)return;e._model.ajax_data(n,r)}),e.on("ajax_done",function(t,n,r,i,s){n&&n.errorno==0?e.trigger("update",[n,r,i,s]):e.trigger("ajax_error",[n,r,i])}),e.on("update",function(t,n,r,i,s){var o=JC.BaseMVC.getInstance(r,JC.AutoComplete),u,a;if(!o)return;a=e._model.macDefaultValue(r)||undefined,o.update(n.data,a),JC.log("_macDefaultValue:",a,i),u=e._model.nextSelector(r),u&&u.length?e.trigger("update_selector",[u,!0]):!s&&e.trigger("all_updated")}),e.on("all_updated",function(){e._model.checkLast()}),e.on("init_user_input",function(t){e._model.each(function(t){t.on("focus",function(e){t.data("old_value",t.val())}),t.on("blur",function(n){JC.f.safeTimeout(function(){var n=t.data("old_value"),r=t.val(),i;JC.log(JC.f.printf("oldValue: {0}, newValue: {1}",n,r)),n!=r&&(i=e._model.nextSelector(t),i&&i.length&&e.trigger("update_selector",[i]))},t,"forMultiAutoCompleteSelectorBlur",200)})})}),e.on("inited_done",function(){e._model.each(function(t){e.trigger("init_addtionBox",[t])})}),e.on("init_addtionBox",function(t,n){function s(){var t=i.find(e._model.macAddtionBoxItemSelector(n));t.length?r.show():r.hide()}var r=e._model.macAddtionBox(n),i;if(!r||!r.length)return;i=r.find(".js_macAddtionBoxList");if(!i||!i.length)return;r.delegate(".js_macClearAddtionList","click",function(e){JC.confirm("是否清空内容",this,2,function(e){i.html(""),r.hide()})}),r.delegate(".js_macAddtionBoxItem","click",function(t){var o=$(this),u=o.attr("data-id"),a=o.attr("data-label");e._model.macAddtionItemRemoveCallback(n)&&e._model.macAddtionItemRemoveCallback(n).call(e,o,u,a,i,r),o.remove(),s()}),n.on("cacItemClickHanlder",function(t,s,o){if(!n.is("[macAddtionBox]"))return;var u=s.attr("data-id"),a=s.attr("data-label"),f=i.find(e._model.macAddtionBoxItemSelector(n)),l=e._model.macAddtionBoxItemTpl(n),c,h;JC.log(u,a,(new Date).getTime()),f.each(function(e,t){t=$(t),t.attr("data-id")==u&&(h=!0)});if(h)return;c=$(JC.f.printf(l,u,a)),c.appendTo(i),c.attr("data-id",u),c.attr("data-label",a),r.show(),e._model.macAddtionItemAddCallback(n)&&e._model.macAddtionItemAddCallback(n).call(e,c,u,a,i,r)}),s()})},_inited:function(){this.trigger("inited")}}),n.Model._instanceName="JCMultiAutoComplete",JC.f.extendObject(n.Model.prototype,{init:function(){},macAddtionItemAddCallback:function(e){return this.callbackProp(e,"macAddtionItemAddCallback")},macAddtionItemRemoveCallback:function(e){return this.callbackProp(e,"macAddtionItemRemoveCallback")},macAddtionBoxItemSelector:function(e){return this.attrProp(e,"macAddtionBoxItemSelector")},macAddtionBoxItemTpl:function(e){return JC.f.scriptContent(this.selectorProp(e,"macAddtionBoxItemTpl"))},macAddtionBox:function(e){return this.selectorProp(e,"macAddtionBox")},ready:function(e){return typeof e!="undefined"&&(this._ready=e),this._ready},clearData:function(e){var t=this,n=t.nextSelector(e),r=JC.BaseMVC.getInstance(e,JC.AutoComplete);r&&r.clearAll(),n&&t.clearData(n)},init_relationship:function(e,t){var n=this,e=e||n.selector(),r;t&&e.data("prevSelector",t),e.is("[macTarget]")?(r=JC.f.parentSelector(e,e.attr("macTarget")),r&&r.length&&(e.data("nextSelector",r),n.init_relationship(r,e))):n.lastSelecotr(e)},fixIdCallback:function(){var e=this;e.each(function(e){!e.is("[macIdCallback]")&&e.attr("macIdCallback","MultiAutoCompleteIdCallback"),!e.is("[cacDataFilter]")&&e.attr("cacDataFilter","MultiAutoCompleteDataFilter")})},firstSelector:function(){return this.selector()},lastSelecotr:function(e){return e&&(this._lastSelecotr=e),this._lastSelecotr},nextSelector:function(e){if(e)return $(e).data("nextSelector")},prevSelector:function(e){if(e)return $(e).data("prevSelector")},macAddtionUrl:function(e){return e.attr("macAddtionUrl")},checkLast:function(){var e=this,t=e.lastSelecotr(),n=e.prevSelector(t),r;while(n&&n.length){n.val()&&(r=!0);if(r)break;n=e.prevSelector(n)}!r&&e.macAddtionUrl(t)&&e.ajax_data(t,!0,e.macAddtionUrl(t))},ajax_data:function(e,t,n){var r=this,i=n||e.attr("macUrl"),s,o;if(!i)return;r.ajax_random(e)&&(i=JC.f.addUrlParams(i,{rnd:(new Date).getTime()})),s=r.prevSelector(e),s&&s.length&&(o=r.macDefaultValue(s),o&&(i=JC.f.printf(i,o))),$.get(i).done(function(n){var i=$.parseJSON(n);r.trigger("ajax_done",[i,e,n,t])})},ajax_random:function(e){var t=n.ajaxRandom;return e.is("[macAjaxRandom]")&&(t=JC.f.parseBool(e.attr("macAjaxRandom"))),t},each:function(e,t){var n=this,r;t=t||n.selector(),t&&t.length&&(e.call(n,t),r=n.nextSelector(t),r&&r.length&&n.each(e,r))},macDefaultValue:function(e){var t=e.attr("macDefaultValue"),n;return e.is("[cacIdSelector]")&&(n=JC.f.parentSelector(e,e.attr("cacIdSelector")),n&&n.length&&(t=n.val())),t}}),JC.f.extendObject(n.View.prototype,{init:function(){}}),window.MultiAutoCompleteIdCallback=function(){},window.MultiAutoCompleteDataFilter=function(e){return e.data&&e.data.length&&(e=e.data),$.each(e,function(t,n){n.length&&(e[t]={id:n[0],label:n[1]})}),e},e.ready(function(){JC.f.safeTimeout(function(){n.autoInit&&n.init()},null,"MultiAutoCompleteInit",5)}),Bizs.MultiAutoComplete})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);