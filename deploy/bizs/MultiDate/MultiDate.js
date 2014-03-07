(function(b,a){b(["JC.BaseMVC","JC.Calendar"],function(){window.Bizs.MultiDate=c;function c(d){if(c.getInstance(d)){return c.getInstance(d)}c.getInstance(d,this);this._model=new c.Model(d);this._view=new c.View(this._model);this._init()}c.prototype={_beforeInit:function(){JC.log("MultiDate _beforeInit",new Date().getTime())},_initHanlderEvent:function(){var d=this;$([d._view,d._model]).on("BindEvent",function(e,g,f){d.on(g,f)});$([d._view,d._model]).on("TriggerEvent",function(e,g){var f=JC.f.sliceArgs(arguments);f.shift();f.shift();d.trigger(g,f)});d._initDefaultValue();d._initHandlerEvent();d.selector().trigger("change",[true])},_initDefaultValue:function(){var d=this,g=d._model.qstartdate(),h=d._model.qenddate(),f=d._model.mdCustomStartDate(),e=d._model.mdCustomEndDate();d._model.selector(d._model.qtype());d._model.mdstartdate(g);d._model.mdenddate(h);if(!d._model.mddate().attr("name")){if(g&&h){if(g==h){d._model.mddate(JC.f.formatISODate(JC.f.parseISODate(g)))}else{d._model.mddate(JC.f.printf("{0} 至 {1}",JC.f.formatISODate(JC.f.parseISODate(g)),JC.f.formatISODate(JC.f.parseISODate(h))))}}}else{d._model.mddate(d._model.qdate())}f&&f.length&&f.val(g?JC.f.formatISODate(JC.f.parseISODate(g)):g);e&&e.length&&e.val(h?JC.f.formatISODate(JC.f.parseISODate(h)):h)},_initHandlerEvent:function(){var d=this;d._model.selector().on("change",function(g,j){var e=$(this),i=e.val().trim().toLowerCase(),h=d._model.mdDefaultBox(),f=d._model.mdCustomBox();JC.log("type:",i);if(i=="custom"){if(h&&f&&h.length&&f.length){h.hide();h.find("input").prop("disabled",true);f.find("input").prop("disabled",false);f.show()}}else{if(h&&f&&h.length&&f.length){f.hide();f.find("input").prop("disabled",true);h.find("input").prop("disabled",false);h.show()}if(j){return}d._model.settype(i);setTimeout(function(){JC.Calendar.pickDate(d._model.mddate()[0]);d._model.mdstartdate("");d._model.mdenddate("")},10)}})},_inited:function(){JC.log("MultiDate _inited",new Date().getTime())}};c.getInstance=function(d,e){if(typeof d=="string"&&!/</.test(d)){d=$(d)}if(!(d&&d.length)||(typeof d=="string")){return}typeof e!="undefined"&&d.data(c.Model._instanceName,e);return d.data(c.Model._instanceName)};c.isMultiDate=function(d){var e;d&&(d=$(d)).length&&(e=d.is("[MultiDatelayout]"));return e};BaseMVC.buildModel(c);c.Model._instanceName="MultiDate";c.Model._inscount=1;c.Model.prototype={init:function(){var d=this,g="Bizs.MultiDate_"+(c.Model._inscount),e="Bizs.MultiDate_show_"+(c.Model._inscount),f="Bizs.MultiDate_hide_"+(c.Model._inscount),h="Bizs.MultiDate_layoutchange_"+(c.Model._inscount);c.Model._inscount++;window[g]=function(i,j,k){d.mdstartdate(JC.f.formatISODate(i,""));d.mdenddate(JC.f.formatISODate(j,""))};d.mddate().attr("calendarupdate",g);window[e]=function(){var i=$("body > div.UXCCalendar:visible");i.length&&JC.Tips&&JC.Tips.init(i.find("[title]"))};d.mddate().attr("calendarshow",e);window[f]=function(){JC.Tips&&JC.Tips.hide();d.updateHiddenDate()};d.mddate().attr("calendarhide",f);window[h]=function(){JC.Tips&&JC.Tips.hide();var i=$("body > div.UXCCalendar:visible");i.length&&JC.Tips&&JC.Tips.init(i.find("[title]"))};d.mddate().attr("calendarlayoutchange",h);return d},mdDefaultBox:function(){return this.selectorProp("mdDefaultBox")},mdCustomBox:function(){return this.selectorProp("mdCustomBox")},mdCustomStartDate:function(){return this.selectorProp("mdCustomStartDate")},mdCustomEndDate:function(){return this.selectorProp("mdCustomEndDate")},selector:function(d){typeof d!="undefined"&&this.hastype(this.qtype())&&this._selector.val(d)&&this.settype(d);return this._selector},mddate:function(d){var e=JC.f.parentSelector(this.selector(),this.selector().attr("mddate"));typeof d!="undefined"&&e.val(d);return e},mdstartdate:function(d){var e=JC.f.parentSelector(this.selector(),this.selector().attr("mdstartdate"));typeof d!="undefined"&&e.val(d.replace(/[^\d]/g,""));return e},mdenddate:function(d){var e=JC.f.parentSelector(this.selector(),this.selector().attr("mdenddate"));typeof d!="undefined"&&e.val(d.replace(/[^\d]/g,""));return e},qtype:function(){return this.decodedata(JC.f.getUrlParam(this.selector().attr("name")||"")||"").toLowerCase()},qdate:function(){return this.decodedata(JC.f.getUrlParam(this.mddate().attr("name")||"")||"").toLowerCase()},qstartdate:function(){return this.decodedata(JC.f.getUrlParam(this.mdstartdate().attr("name")||"")||"").toLowerCase()},qenddate:function(){return this.decodedata(JC.f.getUrlParam(this.mdenddate().attr("name")||"")||"").toLowerCase()},hastype:function(d){var e=false;this.selector().find("> option").each(function(){if($(this).val().trim()==d){e=true;return false}});return e},settype:function(d){this.mddate().val("").attr("multidate",d)},decodedata:function(d){d=d.replace(/[\+]/g," ");try{d=decodeURIComponent(d)}catch(e){}return d},updateHiddenDate:function(){var d=$.trim(this.mddate().val());if(!d){this.mdstartdate("");this.mdenddate("");return}d=d.replace(/[^\d]+/g,"");if(d.length==8){this.mdstartdate(d);this.mdenddate(d)}if(d.length==16){this.mdstartdate(d.slice(0,8));this.mdenddate(d.slice(8))}}};BaseMVC.buildView(c);c.View.prototype={init:function(){return this},hide:function(){},show:function(){}};BaseMVC.build(c,"Bizs");$(document).ready(function(){$("select.js_autoMultidate").each(function(){new c($(this))})});return Bizs.MultiDate})}(typeof define==="function"&&define.amd?define:function(b,a,c){typeof b=="function"&&(c=b);typeof a=="function"&&(c=a);c&&c()},window));