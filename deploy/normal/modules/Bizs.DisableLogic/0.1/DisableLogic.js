(function(e,t){e("Bizs.DisableLogic",["JC.BaseMVC"],function(){function e(r){if(e.getInstance(r))return e.getInstance(r);e.getInstance(r,this),JC.log("Bizs.DisableLogic:",(new Date).getTime()),this._model=new t(r),this._view=new n(this._model),this._init()}function t(e){this._selector=e}function n(e){this._model=e}return window.Bizs.DisableLogic=e,JC.f.addAutoInit&&JC.f.addAutoInit(e),e.prototype={_init:function(){var e=this,t;return e._initHandlerEvent(),$([e._view,e._model]).on("BindEvent",function(t,n,r){e.on(n,r)}),$([e._view,e._model]).on("TriggerEvent",function(t,n){var r=JC.f.sliceArgs(arguments).slice(2);e.trigger(n,r)}),e._model.init(),e._view.init(),e._model.dltrigger().on("change",function(t){JC.log("dltrigger change",(new Date).getTime()),e._view.change(this)}),(t=e._model.dltrigger(!0))&&t.trigger("change"),e},_initHandlerEvent:function(){var e=this;e.on("DisableItem",function(t,n){e._model.dldisablecallback()&&e._model.dldisablecallback().call(e,n,e._model.selector())}),e.on("EnableItem",function(t,n){e._model.dlenablecallback()&&e._model.dlenablecallback().call(e,n,e._model.selector())}),e.on("ChangeDone",function(t,n){e._model.dldonecallback()&&e._model.dldonecallback().call(e,n,e._model.selector())})},selector:function(){return this._model.selector()},on:function(e,t){return $(this).on(e,t),this},trigger:function(e,t){return $(this).trigger(e,t),this}},e.getInstance=function(e,t){typeof e=="string"&&!/</.test(e)&&(e=$(e));if(!e||!e.length||typeof e=="string")return;return typeof t!="undefined"&&e.data("DisableLogicIns",t),e.data("DisableLogicIns")},e.doneCallback=null,e.enableCallback=null,e.disableCallback=null,e.init=function(t){t=$(t||document),t.find(["div.js_bizsDisableLogic","dl.js_bizsDisableLogic","table.js_bizsDisableLogic"].join()).each(function(){new e($(this))})},t.prototype={init:function(){return this},selector:function(){return this._selector},dltrigger:function(e){var t=this,n=JC.f.parentSelector(this.selector(),this.selector().attr("dltrigger")),r;return e&&n.each(function(){r=$(this);if(r.prop("checked")||r.prop("selected"))return n=r,!1}),n},dltarget:function(e){var t=this,n,r;return t.selector().attr("dltarget")&&(n=JC.f.parentSelector(t.selector(),t.selector().attr("dltarget"))),e&&(e=$(e)).length&&e.attr("dltrigger")&&(n=JC.f.parentSelector(e,e.attr("dltarget"))),n},dldisable:function(e){var t=!1;return e&&(e=$(e)).length&&e.is("[dldisable]")&&(t=JC.f.parseBool(e.attr("dldisable"))),e.prop("nodeName").toLowerCase()=="input"&&e.attr("type").toLowerCase()=="checkbox"&&(t=!e.prop("checked")),t},dldisplay:function(e){var t=!1;return e.is("[dldisplay]")?(e=$(e)).length&&e.is("[dldisplay]")&&(t=JC.f.parseBool(e.attr("dldisplay"))):(e=$(e)).length&&e.is("[dldisable]")&&(t=!JC.f.parseBool(e.attr("dldisable"))),e.prop("nodeName").toLowerCase()=="input"&&e.attr("type").toLowerCase()=="checkbox"&&(t=e.prop("checked")),t},dlhidetarget:function(e){var t=this,n,r;return t.selector().attr("dlhidetarget")&&(n=JC.f.parentSelector(t.selector(),t.selector().attr("dlhidetarget"))),e&&(e=$(e)).length&&e.attr("dlhidetarget")&&(n=JC.f.parentSelector(e,e.attr("dlhidetarget"))),n},dlhidetoggle:function(e){var t;return e&&e.is("[dlhidetoggle]")&&(t=JC.f.parseBool(e.attr("dlhidetoggle"))),t},dlDisableToggle:function(e){var t;return e&&e.is("[dlDisableToggle]")&&(t=JC.f.parseBool(e.attr("dlDisableToggle"))),t},dldonecallback:function(){var t=e.doneCallback,n;return this.selector()&&(n=this.selector().attr("dldonecallback"))&&(n=window[n])&&(t=n),t},dlenablecallback:function(){var t=e.enableCallback,n;return this.selector()&&(n=this.selector().attr("dlenablecallback"))&&(n=window[n])&&(t=n),t},dldisablecallback:function(){var t=e.disableCallback,n;return this.selector()&&(n=this.selector().attr("dldisablecallback"))&&(n=window[n])&&(t=n),t}},n.prototype={init:function(){return this},change:function(e){e&&(e=$(e));if(!(e&&e.length&&e.is(":visible")))return;var t=this,n=t._model.dldisable(e),r=t._model.dltarget(e),i=t._model.dldisplay(e),s=t._model.dlhidetarget(e);if(e.is("[dlhidetargetsub]")){var o=JC.f.parentSelector(e,e.attr("dlhidetargetsub"));o&&o.length&&(e.prop("checked")?o.show():o.hide())}r&&r.length&&r.each(function(){var e=$(this);t._model.dlDisableToggle(e)?e.attr("disabled",!n):e.attr("disabled",n),JC.Valid&&JC.Valid.setValid(e);if(e.is("[dlhidetargetsub]")){var r=JC.f.parentSelector(e,e.attr("dlhidetargetsub"));if(!r||!r.length)return;n?r.hide():e.prop("checked")?r.show():r.hide()}}),s&&s.length&&s.each(function(){var e=t._model.dlhidetoggle($(this))?!i:i;e?$(this).show():$(this).hide()}),n?$(t).trigger("TriggerEvent",["DisableItem",e]):$(t).trigger("TriggerEvent",["EnableItem",e]),$(t).trigger("TriggerEvent",["ChangeDone",e]),JC.log("DisableLogic view change",(new Date).getTime(),n)}},$(document).ready(function(){setTimeout(function(){e.init()},10)}),Bizs.DisableLogic})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);