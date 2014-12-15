(function(b,a){b(["JC.Panel","JC.Valid","Bizs.FormLogic"],function(){if(JC.use){!JC.Panel&&JC.use("JC.Panel");!JC.Valid&&JC.use("JC.Valid");!Bizs.FormLogic&&JC.use("Bizs.FormLogic")}var f=$(document),e=$(window);Bizs.CustomColumn=d;function d(g){g&&(g=$(g));if(JC.BaseMVC.getInstance(g,d)){return JC.BaseMVC.getInstance(g,d)}JC.BaseMVC.getInstance(g,d,this);this._model=new d.Model(g);this._view=new d.View(this._model);this._init();JC.log(d.Model._instanceName,"all inited",new Date().getTime())}d.init=function(g){var h=[];g=$(g||document);if(g.length){if(g.hasClass("js_bizCustomColumn")){h.push(new d(g))}else{g.find("a.js_bizCustomColumn, button.js_bizCustomColumn").each(function(){h.push(new d(this))})}}return h};d.ID_COUNT=1;window.BizsCustomColumnFormDoneCallback=function(g,j,i){var h=$(this),k;if(g.errorno){k=JC.alert(g.errmsg||"操作失败, 请重新尝试!",j,1)}else{k=JC.msgbox(g.errmsg||"操作成功",j,0,function(){JC.f.reloadPage(i._model.formAjaxDoneAction()||JC.f.urlDetect("URL"))})}};window.BizsCustomColumnFormAfterProcessCallback=function c(h,k){var j=$(this),n=JC.f.parentSelector(j,"div.UPanel"),i;if(!n){return}n=JC.Panel.getInstance(n);if(!n){return}i=n.CustomColumnIns;if(!i){return}var g=i._model.saveSelector(),l,m;if(g&&g.length){l=[];m=n.selector().find("input.js_typeItem:checked");i.trigger("update_selected_status");if(m.length<i._model.minCol()){return false}if(m.length>i._model.maxCol()){return false}m.each(function(){l.push($(this).val().trim())});g.val(l.join(","))}};JC.BaseMVC.build(d);JC.f.extendObject(d.prototype,{_beforeInit:function(){JC.log("CustomColumn _beforeInit",new Date().getTime())},_initHanlderEvent:function(){var g=this;g.on("inited",function(){});g.on("showPopup",function(){g._view.showPopup()});g.on("hidePopup",function(){g.view.hidePopup()});g.on("panel_inited",function(h,i){g._model.currentPanel(i);i.CustomColumnIns=g});g.on("update_default",function(h,i){i.selector().find("input.js_typeItem").each(function(){var j=$(this),k=g._model.data()[j.attr("data-topIndex")].content[j.attr("data-subIndex")];if(k.isdefault){j.prop("checked",true)}else{j.prop("checked",false)}})});g.on("update_custom",function(h,i){i.selector().find("input.js_typeItem").each(function(){var j=$(this),k=g._model.data()[j.attr("data-topIndex")].content[j.attr("data-subIndex")];if(k.ison){j.prop("checked",true)}else{j.prop("checked",false)}})});g.on("update_selected_status",function(){var i=g._model.currentPanel(),h,j=i.find("em.js_bccErrEm");h=i.selector().find("input.js_typeItem:checked");if(h.length<g._model.minCol()){j.html("请选择数据列, 最少需要选择"+g._model.minCol()+"个数据列！").show();return}if(h.length>g._model.maxCol()){j.html("最多只能选择"+g._model.maxCol()+"个数据列！").show();return}j.hide()})},_inited:function(){JC.log("CustomColumn _inited",new Date().getTime());this.trigger("inited")},show:function(){this.trigger("showPopup")},hide:function(){this.trigger("hidePopup")},close:function(){this.trigger("hidePopup")}});d.Model._instanceName="JCCustomColumn";JC.f.extendObject(d.Model.prototype,{init:function(){JC.log("CustomColumn.Model.init:",new Date().getTime());this._gid="CustomColumnIns_"+d.ID_COUNT;d.ID_COUNT++},currentPanel:function(g){typeof g!="undefined"&&(this._currentPanel=g);return this._currentPanel},gid:function(){return this._gid},url:function(){var g=this.attrProp("data-query")||this.attrProp("data-url")||"?";return g},id:function(){var g=this.attrProp("pagename")||this.attrProp("data-id")||"";return g},name:function(){var g=this.attrProp("data-name")||"selectedItem";return g},data:function(){if(!this._data){this.is("[data-data]")&&(this._data=this.windowProp("data-data"));this.is("[data-scriptData]")&&(this._data=this.scriptDataProp("data-scriptData"))}return this._data},typeSelector:function(){return this.attrProp("data-typeSelector")||"js_selectType"},saveSelector:function(){if(this.is("[data-saveSelector]")){return this.selectorProp("data-saveSelector")}else{return this.selector().find("input.js_saveSelector")}},maxCol:function(){return this.intProp("data-maxCol")||20},minCol:function(){return this.intProp("data-minCol")||1},tpl:function(){if(!this._tpl){this.is("[data-tpl]")&&(this._tpl=this.scriptTplProp("data-tpl"))}return this._tpl},formDoneCallback:function(){var g="BizsCustomColumnFormDoneCallback";this.attrProp("data-formDoneCallback")&&this.windowProp("data-formDoneCallback")&&(g=this.attrProp("data-formDoneCallback"));return g},formAfterProcessCallback:function(){var g="BizsCustomColumnFormAfterProcessCallback";this.attrProp("data-formAfterProcessCallback")&&this.windowProp("data-formAfterProcessCallback")&&(g=this.attrProp("data-formAfterProcessCallback"));return g},isDefault:function(){var h=true,g=this;$.each(g.data(),function(j,i){$.each(i.content,function(k,l){if((l.ison&&!l.isdefault)||(!(l.ison||l.dftchk)&&l.isdefault)){return h=false}});if(!h){return false}});return h}});JC.f.extendObject(d.View.prototype,{init:function(){JC.log("CustomColumn.View.init:",new Date().getTime())},showPopup:function(){var g=this,i=g._model.tpl(),k,h=[],j=g._model.isDefault();$.each(g._model.data(),function(m,l){h.push("<dl>");h.push("<dt>");l.name&&(h.push(l.groupName));h.push("</dt>");h.push("<dd>");if(l.content){h.push("<ul>");$.each(l.content,function(p,q){var r="",o="",n="";q.isdefault&&(n="js_isDefaultItem");if(j){q.isdefault&&(r=' checked="checked" ')}else{q.ison&&(r=' checked="checked" ')}if(q.isdefault&&q.dftchk){(r+=' disabled="disabled" ');o='<input name="{3}" value="{1}" type="hidden" class="">'}h.push(JC.f.printf('<li><label><input name="{3}" value="{1}"   type="checkbox" data-topIndex="{6}" data-subIndex="{7}" class="js_typeItem {5}" {4}>&nbsp;{2}{0}</label></li>',o,q.name,q.title,g._model.name(),r,n,m,p))});h.push("</ul>")}h.push("</dd>");h.push("</dl>")});i=JC.f.printKey(i,{id:g._model.id(),url:g._model.url(),content:h.join(""),formDoneCallback:g._model.formDoneCallback(),formAfterProcessCallback:g._model.formAfterProcessCallback()});k=JC.Dialog(i);g.trigger("panel_inited",[k]);if(j){k.find("input.js_defaultType").prop("checked",true)}else{k.find("input.js_customType").prop("checked",true)}k.find("input.js_customType").on("click",function(l){if(g._model.isDefault()){return false}g.trigger("update_custom",[k]);g.trigger("update_selected_status")});k.selector().delegate("input.js_selectType","change",function(){var l=$(this);if(l.val()!="default"){return}g.trigger("update_default",[k]);g.trigger("update_selected_status")});k.selector().delegate("input.js_typeItem","change",function(){var l=$(this),m=g._model.data()[l.attr("data-topIndex")].content[l.attr("data-subIndex")];if(l.prop("checked")){m.ison=true}else{m.ison=false}if(g._model.isDefault()){k.find("input.js_defaultType").prop("checked",true)}else{k.find("input.js_customType").prop("checked",true)}g.trigger("update_selected_status")})}});f.ready(function(){$(document).delegate("button.js_bizCustomColumn, a.js_bizCustomColumn","click",function(){var g=$(this),h=JC.BaseMVC.getInstance(g,d);if(!h){h=new d(g)}h&&h.show()})});return Bizs.CustomColumn})}(typeof define==="function"&&define.amd?define:function(b,a,c){typeof b=="function"&&(c=b);typeof a=="function"&&(c=a);c&&c()},window));