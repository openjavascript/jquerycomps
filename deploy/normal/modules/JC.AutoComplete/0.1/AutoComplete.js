(function(e,t){e(["JC.BaseMVC"],function(){function n(e){e&&(e=$(e));if(n.getInstance(e))return n.getInstance(e);n.getInstance(e,this),this._model=new n.Model(e),this._view=new n.View(this._model),this._init(),JC.log("AutoComplete inited",(new Date).getTime())}JC.AutoComplete=n;var e=$(document),t=$(window);return n.getInstance=function(e,t){typeof e=="string"&&!/</.test(e)&&(e=$(e));if(!e||!e.length||typeof e=="string")return;return typeof t!="undefined"&&e.data(n.Model._instanceName,t),e.data(n.Model._instanceName)},n.init=function(e){var t=[];return e=$(e||document),e&&e.length&&(e.hasClass("js_compAutoComplete")?t.push(new n(e)):e.find("input.js_compAutoComplete").each(function(){t.push(new n(this))})),t},n.update=function(e,t,r){var i=n.getInstance(e);return!i&&(i=new n(e)),i&&i.update(t,r),i},n.ajaxUpdate=function(e,t,r){var i=n.getInstance(e);return!i&&(i=new n(e)),i&&i.ajaxUpdate(t,r),i},n.dataFilter,n.fixHtmlEntity=!0,n.hideAllPopup=function(){$("ul.js_compAutoCompleteBox").each(function(){var e=$(this),t=e.parent(),n;t.hasClass("AC_layoutBox")?(t.hide(),n=t):(e.hide(),n=e),n.data("AC_INS")&&n.data("AC_INS").trigger("unbind_event")})},BaseMVC.build(n),JC.f.extendObject(n.prototype,{_beforeInit:function(){},_initHanlderEvent:function(){function r(e){var r=e.keyCode,i=$(this),s=i.val().trim();if(r==38||r==40)n.Model.isScroll=!0;JC.log("keyup",r,(new Date).getTime());if(r)switch(r){case 38:case 40:e.preventDefault();case 37:case 39:return;case 27:t.trigger(n.Model.HIDDEN);return}}function i(e){var r=e.keyCode,i=t._model.selector().val().trim();if(r==38||r==40)n.Model.isScroll=!0;JC.log("keydown",r,(new Date).getTime());if(r){switch(r){case 40:case 38:case 13:if(!t._model.popup().is(":visible"))return}t._model.popup().is(":visible")||t.trigger(n.Model.SHOW);switch(r){case 40:case 38:t.trigger(n.Model.UPDATE_LIST_INDEX,[r,e]);return;case 37:case 39:return;case 13:t.trigger(n.Model.ENTER,[e]);return;case 9:case 27:t.trigger(n.Model.HIDDEN);return}}t._model.keydownTimeout(setTimeout(function(){t.trigger(n.Model.UPDATE_LIST)},200))}var t=this;t._model.selector().on("click",function(e){t.trigger("bind_event"),e.stopPropagation(),JC.f.safeTimeout(function(){},t._model.selector(),"SHOW_AC_POPUP",50),t._model.popup().is(":visible")||t.trigger("show_popup")}),t._model.selector().on("focus",function(){t.trigger("bind_event"),t.trigger("show_popup")}),t.on("show_popup",function(){t.trigger("hide_all_popup"),t._view.updateList(),t.trigger(n.Model.SHOW),t.selector().addClass(n.Model.CLASS_FAKE)}),t._model.selector().on("blur",function(){t._model.preVal=t._model.selector().val().trim(),t.selector().removeClass(n.Model.CLASS_FAKE),t._model.verifyKey()}),e.on("click",function(){t.trigger("unbind_event")}),t.on("bind_event",function(n){t.trigger("unbind_event"),e.on("keyup",r),e.on("keydown",i)}),t.on("unbind_event",function(t){e.off("keyup",r),e.off("keydown",i)}),t._model.layoutPopup().data("AC_INS",t),t._model.layoutPopup().on("click",function(e){e.stopPropagation()}),t._model.layoutPopup().delegate("li","click",function(e,r){var i=$(this);if(!i.is("["+t._model.cacLabelKey()+"]"))return;t.trigger("before_click",[i,t._model.layoutPopup(),t]);if(t._model.clickDisable())return;t.trigger(n.Model.CHANGE,[i]),!t._model.cacMultiSelect()&&t.trigger(n.Model.HIDDEN),t.selector().trigger("cacItemClickHanlder",[i,t]),t._model.cacItemClickHanlder()&&t._model.cacItemClickHanlder().call(t,i),!r&&t._model.blurTimeout(setTimeout(function(){t._model.selector().trigger("blur")},50))}),t._model.layoutPopup().delegate(".AC_closePopup","click",function(e){t.trigger("hide_all_popup")}),t._model.layoutPopup().delegate(".AC_clear","click",function(e){t.selector().val("")}),t.on("hide_all_popup",function(){n.hideAllPopup()}),t.on(n.Model.HIDDEN,function(){t._view.hide()}),t.on(n.Model.SHOW,function(){t._view.show()}),t._model.layoutPopup().delegate("li","mouseenter",function(r){if(n.Model.isScroll)return;t._view.updateIndex($(this).attr("data-index"),!0)}),t.on(n.Model.ENTER,function(e,r){t._model.cacPreventEnter()&&r.preventDefault();var i=t._model.selectedItem();i&&i.length&&i.trigger("click"),!t._model.boolProp("cacMultiSelect")&&t.trigger(n.Model.HIDDEN)}),t.on(n.Model.UPDATE_LIST_INDEX,function(e,r,i){i.preventDefault(),t._view.updateListIndex(r==40?!0:!1);var s=t._model.selectedItem();s&&s.length&&t.trigger(n.Model.CHANGE,[s])}),t.on(n.Model.UPDATE_LIST,function(e){this._view.updateList(this._model.selector())}),t.on(n.Model.CHANGE,function(e,n){t._model.setSelectorData(n)}),t.on(n.Model.UPDATE,function(e,n,r){t._model.initPopupData(n),t._view.build(n),r&&r.call(t,n)}),t.on(n.Model.CLEAR,function(e){t._model.selector().val(""),t._model.setIdSelectorData()}),t._model.selector().on(n.Model.REMOVE,function(){try{t._model.popup().remove()}catch(e){}}),t.on("select_item",function(e,n){if(typeof n=="undefined")return;var r=t._model.popup(),i;if(!r||!r.length)return;i=r.find(JC.f.printf("li[data-id={0}]",n)),i&&i.length&&i.trigger("click",[!0])}),t.on(n.Model.CLEAR_DATA,function(){t.trigger(n.Model.UPDATE,[[]])})},_inited:function(){var e=this;e._model.initData=e._model.dataItems(),e.ajaxUpdate(),e._model.selector().is("[validCheckTimeout]")||e._model.selector().attr("validCheckTimeout",e._model.cacValidCheckTimeout())},idSelector:function(){return this._model.cacIdSelector()},idVal:function(e){return typeof e!="undefined"&&this.trigger("select_item"),this._model.cacIdVal()},ajaxUpdate:function(e,t){return this._model.ajaxData(e,t),this},show:function(){var e=this;return setTimeout(function(){e.trigger("bind_event"),e.trigger(n.Model.SHOW)},1),e},hide:function(){return this.trigger(n.Model.HIDDEN),this},popup:function(){return this._model.popup()},update:function(e,t){var r=this;return JC.log(this.selector().attr("class"),(new Date).getTime()),r._model.clearCache(),!r._model.firstUpdate&&r.clear(),r._model.firstUpdate=!1,e=r._model.cacDataFilter(e),r.trigger(n.Model.UPDATE,[e]),r.trigger(n.Model.UPDATE_LIST),typeof t!="undefined"&&r.trigger("select_item",[t]),r},clear:function(){return this.trigger(n.Model.CLEAR),this},clearAll:function(){return this.trigger(n.Model.CLEAR),this.trigger(n.Model.CLEAR_DATA),this},fixPosition:function(){var e=this._model.popup();return e&&e.length&&e.is(":visible")&&this._view.show(),this}}),n.Model._instanceName="AutoComplete",n.Model.UPDATE="AC_UPDATE",n.Model.CLEAR="AC_CLEAR",n.Model.CLEAR_DATA="AC_CLEAR_DATA",n.Model.ENTER="AC_ENTER",n.Model.CHANGE="AC_CHANGE",n.Model.HIDDEN="AC_HIDDEN",n.Model.SHOW="AC_SHOW",n.Model.UPDATE_LIST="AC_UPDATE_LIST",n.Model.UPDATE_LIST_INDEX="AC_UPDATE_LIST_INDEX",n.Model.REMOVE="AC_AUTOCOMPLETE_REMOVE",n.Model.CLASS_ACTIVE="AC_active",n.Model.CLASS_FAKE="AC_fakebox",n.Model.AJAX_CACHE={},JC.f.extendObject(n.Model.prototype,{init:function(){this.initData,this._cache={},this.firstUpdate=!0},clickDisable:function(e){return typeof e!="undefined"&&(this._clickDisable=e),this._clickDisable},listItemTpl:function(){var e=JC.f.printf("<li "+this.cacIdKey()+'="{0}" '+this.cacLabelKey()+'="{1}"'+' data-index="{2}" class="AC_listItem {3}">{1}</li>');return this.is("[cacListItemTpl]")&&(e=JC.f.scriptContent(this.selectorProp("cacListItemTpl"))),e},cacItemClickHanlder:function(){return this.callbackProp("cacItemClickHanlder")},cacBeforeShowHandler:function(){return this.callbackProp("cacBeforeShowHandler")},popup:function(){var e=this,t=e.selector().data("AC_panel");!t&&(t=this.selectorProp("cacPopup"));if(!t||!t.length)t=$(JC.f.printf('<ul class="AC_box js_compAutoCompleteBox"{0}>{1}</ul>',' style="position:absolute;"','<li class="AC_noData">'+e.cacNoDataText()+"</li>")),e.selector().data("AC_panel",t),e.cacMultiSelect()?t.appendTo(e.layoutPopup()):t.appendTo(document.body);return this._inited||(this._inited=!0,t.css({width:e.cacBoxWidth()+"px"})),t},layoutPopup:function(){return this._layoutPopup||(this.cacMultiSelect()?(this._layoutPopup=$('<div class="AC_layoutBox"></div>'),this._layoutPopup.appendTo(document.body)):this._layoutPopup=this.popup()),this._layoutPopup},initPopupData:function(e){this.initData=e},verifyKey:function(){if(!this.cacStrictData())return;var e=this,t=this.selector().val().trim(),n=[],r=e.selector().is("[cacIdKey]"),i;if(!t){e.selector().val(""),e.setIdSelectorData();return}if(t){var s=e.cacIdVal(),o,u;$.each(e.initData,function(a,f){if(r){var l=f.label.trim();l===t&&(i=!0,!u&&e.setIdSelectorData(f.id),u=!0),l===t&&!s&&e.setIdSelectorData(s=f.id);if(l===t&&f.id===s)return n.push(f),!o&&e.setIdSelectorData(f.id),o=!0,i=!0,!1}else f.label.trim()==t&&(n.push(f),i=!0)})}i||(e.selector().val(""),e.setIdSelectorData())},cache:function(e){return e in this._cache||(this._cache[e]=this.keyData(e)||this.initData),this._cache[e]},clearCache:function(){this._cache={}},dataItems:function(){var e=this,t=e.listItems(),n=[];return t.each(function(t,r){var i=$(this);n.push({id:i.attr(e.cacIdKey())||"",label:i.attr(e.cacLabelKey())})}),n},ajaxData:function(e,t){var r=this,e=e||r.attrProp("cacAjaxDataUrl");if(!e)return;if(e in n.Model.AJAX_CACHE){$(r).trigger("TriggerEvent",[n.Model.UPDATE,n.Model.AJAX_CACHE[e],t]);return}$.get(e).done(function(i){i=$.parseJSON(i),i=r.cacDataFilter(i),n.Model.AJAX_CACHE[e]=i,$(r).trigger("TriggerEvent",[n.Model.UPDATE,n.Model.AJAX_CACHE[e],t])})},keyData:function(e){var t=this,n=t.initData,r=0,i=t.cacCasesensitive(),s=e.toLowerCase(),o=[[],[],[],[]],u=[];for(r=0;r<n.length;r++){var a=n[r].label.toLowerCase();n[r].label.indexOf(e)==0?o[n[r].tag=0].push(n[r]):!i&&a.indexOf(s)==0?o[n[r].tag=1].push(n[r]):n[r].label.indexOf(e)>0?o[n[r].tag=2].push(n[r]):!i&&a.indexOf(s)>0&&o[n[r].tag=3].push(n[r])}return $.each(o,function(e,t){u=u.concat(t)}),u},setSelectorData:function(e){e&&(e=$(e));if(!e||!e.length)return;var t=this,n=e.attr(t.cacLabelKey()).trim(),r=e.attr(t.cacIdKey()).trim();t.selector().val(n),t.selector().attr("cacIdVal",r),t.setIdSelectorData(r)},setIdSelectorData:function(e){var t=this;if(!t.cacIdSelector()||!t.cacIdSelector().length)return;typeof e!="undefined"?(t.cacIdSelector().val(e),t.selector().attr("cacIdVal",e)):(t.cacIdSelector().val(""),t.selector().attr("cacIdVal",""))},listItems:function(){var e;return this.popup()&&this.popup().length&&(e=this.popup().find(this.cacSubItemsSelector())),e},selectedItem:function(){var e;return this.listItems().each(function(){var t=$(this);if(t.hasClass(n.Model.CLASS_ACTIVE))return e=t,!1}),e},keyupTimeout:function(e){this._keyupTimeout&&clearTimeout(this._keyupTimeout),this._keyupTimeout=e},keydownTimeout:function(e){this._keydownTimeout&&clearTimeout(this._keydownTimeout),this._keydownTimeout=e},blurTimeout:function(e){this._blurTimeout&&clearTimeout(this._blurTimeout),this._blurTimeout=e},cacDataFilter:function(e){var t=this,r=t.callbackProp("cacDataFilter")||n.dataFilter;return r&&(e=r(e)),t.cacFixHtmlEntity()&&$.each(e,function(e,t){t.label&&(t.label=$("<p>"+t.label+"</p>").text())}),e},cacNoDataText:function(){var e=this.attrProp("cacNoDataText")||"数据加载中, 请稍候...";return e},cacValidCheckTimeout:function(){var e=this.intProp("cacValidCheckTimeout")||n.validCheckTimeout||1;return e},cacStrictData:function(){var e=this.boolProp("cacStrictData");return e},cacFixHtmlEntity:function(){var e=n.fixHtmlEntity;return this.selector().is("[cacFixHtmlEntity]")&&(e=this.boolProp("cacFixHtmlEntity")),e},cacLabelKey:function(){var e=this.attrProp("cacLabelKey")||"data-label";return e},cacIdKey:function(e){typeof e!="undefined"&&this.selector().attr("cacIdKey",e);var t=this.attrProp("cacIdKey")||this.cacLabelKey();return t},cacIdVal:function(){var e=this,t=e.attrProp("cacIdVal");return e.cacIdSelector()&&e.cacIdSelector().length&&(t=e.cacIdSelector().val()),t=(t||"").trim(),t},cacIdSelector:function(){var e=this.selectorProp("cacIdSelector");return e},cacPreventEnter:function(){var e;return e=this.selector().is("[cacPreventEnter]")&&JC.f.parseBool(this.selector().attr("cacPreventEnter")),e},cacBoxWidth:function(){var e=this.intProp("cacBoxWidth");return!e&&(e=this.selector().width()),e},cacCasesensitive:function(){return this.boolProp("cacCasesensitive")},cacSubItemsSelector:function(){var e=this.attrProp("cacSubItemsSelector")||"li";return e+="["+this.cacLabelKey()+"]",e},cacMultiSelect:function(){return this.boolProp("cacMultiSelect")}}),JC.f.extendObject(n.View.prototype,{init:function(){var e=this;e._model.listItems().each(function(e){$(this).attr("data-index",e)}).removeClass(n.Model.CLASS_ACTIVE).first().addClass(n.Model.CLASS_ACTIVE)},hide:function(){var e=this;e._model.layoutPopup().hide()},show:function(){var e=this,t=e._model.selector().offset(),r=e._model.selector().prop("offsetHeight"),i=e._model.selector().prop("offsetWidth");e._model.layoutPopup().css({top:t.top+r+"px",left:t.left+"px"});var s,o=e._model.selector().val().trim(),u=e._model.cacIdVal(),a=e._model.cacLabelKey()!=e._model.cacIdKey();e._model.listItems().each(function(){var t=$(this),r=t.attr(e._model.cacLabelKey()),i=t.attr(e._model.cacIdKey());t.removeClass(n.Model.CLASS_ACTIVE),o==r&&(a&&u?(u==i&&t.addClass(n.Model.CLASS_ACTIVE),s=t):(t.addClass(n.Model.CLASS_ACTIVE),s=t))}),s||e._model.listItems().first().addClass(n.Model.CLASS_ACTIVE),e._model.layoutPopup().show()},updateList:function(){var e=this,t,n=[],r=e._model.selector().val().trim(),i=e._model.cacIdVal(),s;r?s=e._model.cache(r,i):s=e._model.initData,s&&e.build(s)},build:function(e){var t=this,r=0,i=[];if(e.length==0)t.hide(),t._model.popup().html(JC.f.printf('<li class="AC_noData">{0}</li>',t._model.cacNoDataText()));else{for(;r<e.length;r++)i.push(JC.f.printf(t._model.listItemTpl(),e[r].id,e[r].label,r,r===0?n.Model.CLASS_ACTIVE:""));t._model.popup().html(i.join("")),t._model.trigger("build_data")}t._model.cacMultiSelect()&&!t._model.layoutPopup().find(".AC_addtionItem").length&&$(JC.f.printf('<div class="AC_addtionItem" style="text-align: right; padding-right: 5px;"><div>{0}{1}</div></div>',"",'<a href="javascript:;" class="AC_control AC_closePopup">关闭</a>')).appendTo(t._model.layoutPopup())},currentIndex:function(e){var t=this,r=t._model.popup(),i=t._model.listItems(),s=-1;if(!i.length)return;return i.each(function(e){var t=$(this);if(t.hasClass(n.Model.CLASS_ACTIVE))return s=e,!1}),s<0?s=e?0:i.length-1:(s=e?s+1:s-1,s<0?s=i.length-1:s>=i.length&&(s=0)),s},updateListIndex:function(e){var t=this,n=t.currentIndex(e);t.updateIndex(n)},updateIndex:function(e,t){var r=this,i=r._model.listItems();r.removeActiveClass(),$(i[e]).addClass(n.Model.CLASS_ACTIVE),!t&&r.setScroll(e)},setScroll:function(e){var t=this,r=t._model.listItems().eq(e),i=r.position().top+r.height(),s=t._model.popup().innerHeight(),o=t._model.popup().scrollTop();i+=o,e==-1?(t._model.selector().focus(),t._model.listItems().removeClass(n.Model.CLASS_ACTIVE)):(t._model.listItems().removeClass(n.Model.CLASS_ACTIVE),r.addClass(n.Model.CLASS_ACTIVE),i>s&&t._model.popup().scrollTop(i-s),r.position().top<0&&t._model.popup().scrollTop(0)),n.Model.SCROLL_TIMEOUT&&clearTimeout(n.Model.SCROLL_TIMEOUT),n.Model.SCROLL_TIMEOUT=setTimeout(function(){n.Model.isScroll=!1},500)},removeActiveClass:function(){this._model.listItems().removeClass(n.Model.CLASS_ACTIVE)}}),$.event.special[n.Model.REMOVE]={remove:function(e){e.handler&&e.handler()}},$(window).on("resize",function(e){$("input.js_compAutoComplete").each(function(){var e=n.getInstance($(this));e&&e.fixPosition()})}),$(document).on("click",function(){n.hideAllPopup()}),$(document).delegate("input.js_compAutoComplete","focus",function(e){!n.getInstance(this)&&new n(this)}),JC.AutoComplete})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);