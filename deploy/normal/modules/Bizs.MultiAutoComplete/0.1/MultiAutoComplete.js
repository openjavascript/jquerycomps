(function(e,t){e("Bizs.MultiAutoComplete",["JC.AutoComplete","JC.AutoChecked","JC.Placeholder","JC.Panel"],function(){function n(e){e&&(e=$(e));if(JC.BaseMVC.getInstance(e,n))return JC.BaseMVC.getInstance(e,n);JC.BaseMVC.getInstance(e,n,this),this._model=new n.Model(e),this._view=new n.View(this._model),this._init(),JC.log(n.Model._instanceName,"all inited",(new Date).getTime())}var e=$(document),t=$(window);return JC.use&&(!JC.AutoComplete&&JC.use("JC.AutoComplete"),!JC.Placeholder&&JC.use("JC.Placeholder"),!JC.Panel&&JC.use("JC.Panel")),Bizs.MultiAutoComplete=n,Bizs.MultiAutoComplete.insCount=1,Bizs.MultiAutoComplete.AJAX_CACHE={},n.init=function(e){var t=[];return e=$(e||document),e.length&&(e.is("[defaultMultiAutomComplete]")?t.push(new n(e)):e.find("input[defaultMultiAutomComplete]").each(function(){t.push(new n(this))})),t},n.ajaxRandom=!0,JC.BaseMVC.build(n),JC.f.extendObject(n.prototype,{_beforeInit:function(){},_initHanlderEvent:function(){var e=this;e.on("inited",function(){e.trigger("init_relationship"),e.trigger("fix_id_callback"),e.trigger("init_autoComplete"),e.trigger("update_selector",[e.selector()]),e.trigger("init_user_input"),e._model.ready(!0),e.trigger("inited_done")}),e.on("init_relationship",function(t){e._model.init_relationship()}),e.on("fix_id_callback",function(t){e._model.fixIdCallback()}),e.on("init_autoComplete",function(t){e._model.each(function(t){var n;t.hasClass("js_compAutoComplete")&&!(n=JC.BaseMVC.getInstance(t,JC.AutoComplete))&&(n=new JC.AutoComplete(t)),n.on("after_inited",function(t){e.trigger("init_checked_status",[n])})})}),e.on("update_selector",function(t,n,r){if(!n||!n.length)return;!r&&e.trigger("clear_selector",[n]),e.trigger("ajax_data",[n])}),e.on("clear_selector",function(t,n){if(!e._model.ready())return;e._model.clearData(n)}),e.on("ajax_data",function(t,n,r){if(!n)return;e._model.ajax_data(n,r)}),e.on("ajax_done",function(t,n,r,i,s){n&&n.errorno==0?e.trigger("update",[n,r,i,s]):e.trigger("ajax_error",[n,r,i])}),e.on("update",function(t,n,r,i,s){var o=JC.BaseMVC.getInstance(r,JC.AutoComplete),u,a;if(!o)return;a=e._model.macDefaultValue(r)||undefined,o.update(n.data,a),u=e._model.nextSelector(r),u&&u.length&&n.data.length?e.trigger("update_selector",[u,!0]):(!s&&e.trigger("all_updated"),s?o._model.layoutPopup().find("span.cacMultiSelectBarTplLabel").hide():o._model.layoutPopup().find("span.cacMultiSelectBarTplLabel").show())}),e.on("all_updated",function(){e._model.checkLast()}),e.on("init_user_input",function(t){e._model.each(function(t){t.on("focus",function(e){t.data("old_value",t.val())}),t.on("blur",function(n){JC.f.safeTimeout(function(){var n=t.data("old_value"),r=t.val(),i;n!=r&&(i=e._model.nextSelector(t),i&&i.length&&e.trigger("update_selector",[i]))},t,"forMultiAutoCompleteSelectorBlur",200)})})}),e.on("inited_done",function(){e._model.each(function(t){e.trigger("init_addtionBox",[t])})}),e.on("init_addtionBox",function(t,n){var r=e._model.macAddtionBox(n),i,s;if(!r||!r.length)return;i=r.find(".js_macAddtionBoxList");if(!i||!i.length)return;s=JC.BaseMVC.getInstance(n,JC.AutoComplete),r.delegate(".js_macClearAddtionList","click",function(e){JC.confirm("是否清空内容",this,2,function(e){i.html(""),r.hide()})}),r.delegate(".js_macAddtionBoxItem","click",function(t){var o=$(this),u=o.attr("data-id"),a=o.attr("data-label");e._model.macAddtionItemRemoveCallback(n)&&e._model.macAddtionItemRemoveCallback(n).call(e,o,u,a,i,r),o.remove(),e.trigger("update_list_box_status",[s,!0])}),e.trigger("update_list_box_status",[s,!0])}),e.on("update_list_box_status",function(t,n,r){var i=n.selector(),s=e._model.macAddtionBox(i),o;if(!s||!s.length)return;o=s.find(".js_macAddtionBoxList");if(!o||!o.length)return;var u=o.find(e._model.macAddtionBoxItemSelector(i));u.length?s.show():s.hide(),!r&&e.trigger("update_checked_status",[n,!0])}),e.on("init_checked_status",function(t,n){var r=n.selector();if(r.is("macAddtionBox"))return;n.on("after_popup_show",function(e){}),n.on("build_data",function(){e.trigger("update_checked_show_status",[n]),e.trigger("fixed_checkAll_status",[n])}),n._model.layoutPopup().delegate("input[schecktype=all]","change",function(t){var r=$(this);n._model.layoutPopup().find("input[schecktype=item]").prop("checked",r.prop("checked")),e.trigger("update_checked_status",[n]),e.trigger("fixed_checkAll_status",[n])}),r.on("cacItemClickHanlder",function(t,n,r){JC.f.safeTimeout(function(){var t=n.find("input[schecktype=item]"),i;if(!t.length)return;i={item:t},e.trigger("update_list_item",[t,r]),e.trigger("item_checked",[i,i.item.prop("checked")]),e.trigger("fixed_checkAll_status",[r])},r,"adfasdfasdf",50)})}),e.on("fixed_checkAll_status",function(e,t){var n=!0;t._model.layoutPopup().find("input[schecktype=item]").each(function(e){var t=$(this);if(!t.prop("checked"))return n=!1,!1}),t._model.layoutPopup().find("input[schecktype=all]").prop("checked",n)}),e.on("update_list_item",function(t,n,r){var i={item:n};if(!i.item.length)return;var s=r.selector(),o=e._model.macAddtionBox(s),u,a,f;if(!o||!o.length)return;u=o.find(".js_macAddtionBoxList");if(!u||!u.length)return;e._model.macAddtionBoxWithId(s)?a=$(JC.f.printf("#macAddtionBoxItemId_{0}_{1}",e._model.insCount(),i.item.val())):(a=[],u.find(e._model.macAddtionBoxItemSelector(r.selector())+"[data-id]").each(function(){$(this).data("id")==i.item.val()&&a.push(this)}),a=jQuery(a)),i.item.prop("checked")?a.length||(e.trigger("add_list_item",[i.item,r,o,u]),f=!0):a.length&&a.remove(),JC.f.safeTimeout(function(){f&&e.trigger("sort_list_item",[u,r])},e,"SORT_LIST_ITEM",1e3)}),e.on("update_checked_status",function(t,n,r){if(!n)return;var i=n.selector(),s=e._model.macAddtionBox(i),o,n;if(!s||!s.length)return;o=s.find(".js_macAddtionBoxList");if(!o||!o.length)return;var u=n._model.layoutPopup().find("input[schecktype=item]"),a=n._model.layoutPopup().find("input[schecktype=all]"),f=o.find(e._model.macAddtionBoxItemSelector(n.selector()));if(!u.length)return;var l={},c={};f.each(function(){var e=$(this);l[e.attr("data-id")]={item:e}}),u.each(function(t){var r=$(this),i;e.trigger("update_list_item",[r,n])}),!r&&e.trigger("update_list_box_status",[n])}),e.on("update_checked_show_status",function(t,n){if(!n)return;var r=n.selector(),i=e._model.macAddtionBox(r),s,n;if(!i||!i.length)return;s=i.find(".js_macAddtionBoxList");if(!s||!s.length)return;var o=n._model.layoutPopup().find("input[schecktype=item]"),u=n._model.layoutPopup().find("input[schecktype=all]"),a=s.find(e._model.macAddtionBoxItemSelector(n.selector()));if(!o.length)return;var f=!0,l={};o.each(function(){var e=$(this);l[e.val()]={item:e}}),a.each(function(){var t=$(this),n;t.attr("data-id")in l&&e.trigger("item_checked",[l[t.attr("data-id")],!0])})}),e.on("sort_list_item",function(t,n,r){var i=n.find(e._model.macAddtionBoxItemSelector(r.selector()));i.each(function(){var e=$(this),t=e.attr("data-id"),n=e.attr("data-label");i.each(function(){var r=$(this),i=r.attr("data-id"),s=r.attr("data-label");if(t==i)return;n.localeCompare(s)>0&&r.after(e)})})}),e.on("add_list_item",function(t,n,r,i,s){var o=JC.f.getJqParent(n,"li"),u=r.selector(),a,f=e._model.macAddtionBoxItemTpl(u),l=o.attr("data-id"),c=o.attr("data-label");a=$(JC.f.printf(f,l,c,e._model.insCount())),a.appendTo(s),a.attr("data-id",l),a.attr("data-label",c),i.show()}),e.on("item_checked",function(e,t,n){n?JC.f.getJqParent(t.item,"li").addClass("macDisable"):JC.f.getJqParent(t.item,"li").removeClass("macDisable"),t.item.prop("checked",n)})},_inited:function(){this.trigger("inited")}}),n.Model._instanceName="JCMultiAutoComplete",JC.f.extendObject(n.Model.prototype,{init:function(){this.insCount(n.insCount++)},insCount:function(e){return typeof e!="undefined"&&(this._insCount=e),this._insCount},macAddtionBoxWithId:function(e){return JC.f.parseBool(e.attr("macAddtionBoxWithId"))},macAddtionItemAddCallback:function(e){return this.callbackProp(e,"macAddtionItemAddCallback")},macAddtionItemRemoveCallback:function(e){return this.callbackProp(e,"macAddtionItemRemoveCallback")},macAddtionBoxItemSelector:function(e){return this.attrProp(e,"macAddtionBoxItemSelector")},macAddtionBoxItemTpl:function(e){return JC.f.scriptContent(this.selectorProp(e,"macAddtionBoxItemTpl"))},macAddtionBox:function(e){return this.selectorProp(e,"macAddtionBox")},ready:function(e){return typeof e!="undefined"&&(this._ready=e),this._ready},clearData:function(e){var t=this,n=t.nextSelector(e),r=JC.BaseMVC.getInstance(e,JC.AutoComplete);r&&r.clearAll(),n&&t.clearData(n)},init_relationship:function(e,t){var n=this,e=e||n.selector(),r;t&&e.data("prevSelector",t),e.is("[macTarget]")?(r=JC.f.parentSelector(e,e.attr("macTarget")),r&&r.length&&(e.data("nextSelector",r),n.init_relationship(r,e))):n.lastSelecotr(e)},fixIdCallback:function(){var e=this;e.each(function(e){!e.is("[macIdCallback]")&&e.attr("macIdCallback","MultiAutoCompleteIdCallback"),!e.is("[cacDataFilter]")&&e.attr("cacDataFilter","MultiAutoCompleteDataFilter")})},firstSelector:function(){return this.selector()},lastSelecotr:function(e){return e&&(this._lastSelecotr=e),this._lastSelecotr},nextSelector:function(e){if(e)return $(e).data("nextSelector")},prevSelector:function(e){if(e)return $(e).data("prevSelector")},macAddtionUrl:function(e){return e.attr("macAddtionUrl")},checkLast:function(){var e=this,t=e.lastSelecotr(),n=e.prevSelector(t),r;while(n&&n.length){n.val()&&(r=!0);if(r)break;n=e.prevSelector(n)}!r&&e.macAddtionUrl(t)&&e.ajax_data(t,!0,e.macAddtionUrl(t))},ajax_data:function(e,t,r){var i=this,s=r||e.attr("macUrl"),o,u;if(!s)return;i.ajax_random(e)&&(s=JC.f.addUrlParams(s,{rnd:0})),o=i.prevSelector(e);if(o&&o.length){u=i.macDefaultValue(o);if(!u){!t&&i.trigger("all_updated");if(!t)return}s=JC.f.printf(s,u)}s in n.AJAX_CACHE?i.trigger("ajax_done",[n.AJAX_CACHE[s],e,"",t]):$.get(s).done(function(r){var o=$.parseJSON(r);n.AJAX_CACHE[s]=o,i.trigger("ajax_done",[o,e,r,t])})},ajax_random:function(e){var t=n.ajaxRandom;return e.is("[macAjaxRandom]")&&(t=JC.f.parseBool(e.attr("macAjaxRandom"))),t},each:function(e,t){var n=this,r;t=t||n.selector(),t&&t.length&&(e.call(n,t),r=n.nextSelector(t),r&&r.length&&n.each(e,r))},macDefaultValue:function(e){var t=e.attr("macDefaultValue"),n;return e.is("[cacIdSelector]")&&(n=JC.f.parentSelector(e,e.attr("cacIdSelector")),n&&n.length&&(t=n.val())),t}}),JC.f.extendObject(n.View.prototype,{init:function(){}}),window.MultiAutoCompleteIdCallback=function(){},window.MultiAutoCompleteDataFilter=function(e){return e.data&&e.data.length&&(e=e.data),$.each(e,function(t,n){n.length&&(e[t]={id:n[0],label:n[1]})}),e},e.ready(function(){JC.f.safeTimeout(function(){n.autoInit&&n.init()},null,"MultiAutoCompleteInit",5)}),Bizs.MultiAutoComplete})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);