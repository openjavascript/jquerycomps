(function(e,t){e(["JC.AjaxUpload"],function(){function e(t){t&&(t=$(t));if(JC.BaseMVC.getInstance(t,e))return JC.BaseMVC.getInstance(t,e);JC.BaseMVC.getInstance(t,e,this),this._model=new e.Model(t),this._view=new e.View(this._model),this._init(),JC.log(e.Model._instanceName,"all inited",(new Date).getTime())}return Bizs.MultiUpload=e,JC.use&&!JC.AjaxUpload&&JC.use("JC.AjaxUpload"),e.init=function(t){var n=[];return t=$(t||document),t&&t.length&&(t.hasClass("js_bizMultiUpload")?n.push(new e(t)):t.find("div.js_bizMultiUpload").each(function(){n.push(new e(this))})),n},BaseMVC.build(e),JC.f.extendObject(e.prototype,{_beforeInit:function(){},_initHanlderEvent:function(){var e=this;e.on("inited",function(){e._model.saveAjaxUploadHandler(),e._model.injectAjaxHandler(),e.trigger("CheckItemLimit")}),e.on("AjaxDone",function(t,n,r,i){var s=e._model.bmuTpl(),o=e._model.bmuBoxSelector();if(!o||!o.length)return;if(n.errorno)return;e._view.newItem(n,s,o)}),e.on("ItemAdded",function(t,n,r,i){JC.f.safeTimeout(function(){e.trigger("CheckItemLimit")},e,"OnItemAdded",10),e._model.bmuItemAddedCallback()&&e._model.bmuItemAddedCallback().call(e,n,r,i)}),e.on("ItemDeleted",function(t,n){e._model.bmuItemDeletedCallback()&&e._model.bmuItemDeletedCallback().call(e,n,e._model.bmuBoxSelector())}),e.on("CheckItemLimit",function(){e._view.checkItemLimit()}),e._model.bmuBoxSelector().delegate(e._model.bmuRemoveDelegate(),"click",function(){var t=JC.f.parentSelector(this,e._model.bmuRemoveItemParentSelector());t&&t.length&&t.remove(),e.updateStatus(),e.trigger("ItemDeleted",[this])})},_inited:function(){this.trigger("inited")},updateStatus:function(){return this.trigger("CheckItemLimit"),this}}),e.Model._instanceName="MultiUpload",e.Model._insCount=1,e.Model._handlerPrefix="bizMultiUploadHandler_",JC.f.extendObject(e.Model.prototype,{init:function(){this._id=e.Model._insCount++},bmuItemLimit:function(){return this.intProp("bmuItemLimit")},id:function(e){return typeof e!="undefined"&&(this._id=e),this._id},bmuBoxSelector:function(){var e=this._bmuBoxSelector||this.selectorProp("bmuBoxSelector");(!e||!e.length)&&(e=this.selector().find(".bmuBoxSelector"));if(!e||!e.length)e=this._bmuBoxSelector=$('<dl class="bmuBoxSelector"></dl>'),this._bmuBoxSelector.appendTo(this.selector());return e},bmuTplSelector:function(){var e=this.selectorProp("bmuTplSelector");return(!e||!e.length)&&(e=this.selector().find(".bmuTplSelector")),e},bmuTpl:function(){var e=['<dd class="js_multiUploadItem">','<input type="hidden" name="file[]" value="{0}" class="js_multiUploadHidden" />','<a href="{0}" target="_blank"><label class="js_multiUploadLabel">{1}</label></a>','&nbsp;<button type="button" class="AURemove js_removeUploadItem"></button>',"</dd>"].join(""),t=this.bmuTplSelector();return t&&t.length&&(e=JC.f.scriptContent(t)),e},bmuAjaxUploadSelector:function(){var e=this.selectorProp("bmuAjaxUploadSelector");return(!e||!e.length)&&(e=this.selector().find(".js_compAjaxUpload")),e},ajaxUploadIns:function(){var e;return this.bmuAjaxUploadSelector()&&this.bmuAjaxUploadSelector().length&&(e=JC.BaseMVC.getInstance(this.bmuAjaxUploadSelector(),JC.AjaxUpload)),e},bmuItemDelegate:function(){return this.attrProp("bmuItemDelegate")||">"},bmuItems:function(){return this.bmuBoxSelector().find(this.bmuItemDelegate())},bmuRemoveDelegate:function(){return this.attrProp("bmuRemoveDelegate")||".js_removeUploadItem"},bmuRemoveItemParentSelector:function(){return this.attrProp("bmuRemoveItemParentSelector")||"("},saveAjaxUploadHandler:function(){this._ajaxUploadDoneHandler=this.windowProp(this.bmuAjaxUploadSelector(),"cauUploadDoneCallback"),this._ajaxUploadErrorHandler=this.windowProp(this.bmuAjaxUploadSelector(),"cauUploadErrorCallback")},ajaxUploadDoneHandler:function(){return this._ajaxUploadDoneHandler},ajaxUploadErrorHandler:function(){return this._ajaxUploadErrorHandler},injectAjaxHandler:function(){var t=this,n=e.Model._handlerPrefix,r=n+"done"+this.id(),i=n+"error"+this.id(),s=n+"cancel"+this.id();this.setAjaxUplaodHandler(r,"cauUploadDoneCallback",function(e,n){var r=this;t.ajaxUploadDoneHandler()&&t.ajaxUploadDoneHandler().call(r,e,n),t.trigger("AjaxDone",[e,n,r])}),this.setAjaxUplaodHandler(i,"cauBeforeUploadErrCallback",function(){JC.f.safeTimeout(function(){t.trigger("CheckItemLimit")},t,"OnError",10)}),this.setAjaxUplaodHandler(s,"cauCancelCallback",function(){JC.f.safeTimeout(function(){t.trigger("CheckItemLimit")},t,"OnCancel",10)})},setAjaxUplaodHandler:function(e,t,n){window[e]=n,this.bmuAjaxUploadSelector().attr(t,e)},bmuItemAddedCallback:function(){return this.callbackProp("bmuItemAddedCallback")},bmuItemDeletedCallback:function(){return this.callbackProp("bmuItemDeletedCallback")}}),JC.f.extendObject(e.View.prototype,{init:function(){},newItem:function(e,t,n){JC.dir(e),t=JC.f.printf(t,e.data.url,e.data.name);var r=$(t);r.appendTo(n),this.trigger("ItemAdded",[r,e,n]),JC.f.jcAutoInitComps(r)},checkItemLimit:function(){var e=this,t=this._model.bmuItemLimit(),n,r=e._model.ajaxUploadIns();if(!t)return;n=e._model.bmuItems(),n=n||[];if(!r)return;n.length>=t?r.disable():r.enable()}}),$(document).ready(function(){e.autoInit&&JC.f.safeTimeout(function(){e.init()},null,"MultiUploadInit",2)}),Bizs.MultiUpload})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);