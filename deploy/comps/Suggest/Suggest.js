(function(b,a){b(["JC.BaseMVC","plugins.json2"],function(){window.Suggest=JC.Suggest=c;JC.use&&!window.JSON&&JC.use("plugins.json2");function c(d){d&&(d=$(d));if(c.getInstance(d)){return c.getInstance(d)}c.getInstance(d,this);c._allIns.push(this);this._model=new c.Model(d);this._view=new c.View(this._model);this._init()}c.getInstance=function(d,e){return JC.BaseMVC.getInstance(d,c,e)};c.isSuggest=function(d){var e;d&&(d=$(d)).length&&(e=d.is("[sugurl]")||d.is("sugstaticdatacb"));return e};c.autoInit=true;c.layoutTpl="";c.layoutTpl="";c.dataFilter;c._allIns=[];c._hideOther=function(f){for(var e=0,d=c._allIns.length;e<d;e++){if(c._allIns[e]._model._id!=f._model._id){c._allIns[e].hide()}}};JC.f.extendObject(c.prototype,{_initHanlderEvent:function(){var d=this;$([d._view,d._model]).on("BindEvent",function(e,g,f){d.on(g,f)});$([d._view,d._model]).on("TriggerEvent",function(e,g,f){d.trigger(g,[f])});d._view.init();d._model.init();d.selector().attr("autocomplete","off");d._initActionEvent();d.trigger("SuggestInited");return d},update:function(e,f){var d=this;typeof f=="undefined"&&(f=e);if(d._model.sugdatafilter()){f=d._model.sugdatafilter().call(this,f)}if(f&&f.q){d._model.cache(f.q,f)}this._view.update(f);d.trigger("sug_detect_id",f)},show:function(){this._view.show();return this},hide:function(){this._view.hide();return this},selector:function(){return this._model.selector()},layout:function(){return this._model.layout()},on:function(e,d){$(this).on(e,d);return this},trigger:function(e,d){$(this).trigger(e,d);return this},_initActionEvent:function(){var d=this;d.on("SuggestUpdate",d.update);d.on("SuggestInited",function(e){if(d._model.suginitedcallback()){d._model.suginitedcallback().call(d)}});d._model.selector().on("keyup",function(g,j){var e=$(this),i=e.val().trim(),h=g.keyCode,f=e.data("IgnoreTime");if(h){switch(h){case 38:case 40:g.preventDefault();case 37:case 39:return;case 27:d.hide();return}}if(!i){d.update();d.trigger("update_id_selector");return}if(!d._model.layout().is(":visible")){if(d._model.cache(i)){d.update(d._model.cache(i));return}}if(d._model.preValue===i&&!j){return}d._model.preValue=i;if(d._model.initValue){d._model.initValue=""}else{!j&&d.trigger("update_id_selector")}if(d._model.cache(i)){d.update(d._model.cache(i));return}if(d._model.sugqueryinterval()){JC.f.safeTimeout(function(){d._model.getData(i)},d,"clearSugInterval",d._model.sugqueryinterval())}else{d._model.getData(i)}});d._model.selector().on("blur",function(e){d._model.timeout&&clearTimeout(d._model.timeout)});d._model.selector().on("keydown",function(f){var j=f.keyCode,e=$(this),l,h,i=d._model.items(),g;j==38&&(h=true);JC.log("keyup",new Date().getTime(),j);switch(j){case 38:case 40:l=d._model.nextIndex(h);if(l>=0&&l<i.length){f.preventDefault();g=$(i[l]);d._model.selectedIdentifier(g);d.selector().val(d._model.getKeyword(g));return}break;case 9:d.hide();return;case 13:var k;if(d._model.layout().is(":visible")&&(k=d._model.layout().find("dd.active"))&&k.length){d.trigger("SuggestSelected",[k,d._model.getKeyword(k)])}d.hide();e.data("IgnoreTime",new Date().getTime());d._model.sugprevententer()&&f.preventDefault();break}});$(d._model.layout()).delegate(".js_sugItem","mouseenter",function(e){d._model.selectedIdentifier($(this),true)});$(d._model.layout()).delegate(".js_sugItem","mouseleave",function(e){$(this).removeClass("active")});d.selector().on("click",function(e){e.stopPropagation();d.selector().trigger("keyup",true);c._hideOther(d)});d.on("SuggestSelected",function(f,e,g){d._model.sugselectedcallback()&&d._model.sugselectedcallback().call(d,g)});$(d._model.layout()).delegate(".js_sugItem","click",function(f){var e=$(this),g=d._model.getKeyword(e);d.selector().val(g);d.hide();d._model.preValue=g;d.trigger("SuggestSelected",[e,g]);JC.f.safeTimeout(function(){d.selector().trigger("blur")},null,"SuggestItemClick",300);d.trigger("update_id_selector",[e])});d.on("update_id_selector",function(f,e){if(!(d._model.idSelector()&&d._model.idSelector().length)){return}if(!e){d._model.idSelector().val("")}else{if(!e.is("[data-id]")){return}d._model.idSelector().val(e.data("id"))}});d.on("sug_detect_id",function(e,f){if(!(d._model.idSelector()&&d._model.idSelector().length)){return}JC.dir(f);if(!f){return}var i=f.q,g=[];$.each(f.s,function(k,j){if(!$.isPlainObject(j)){return}if(j.name===i||j.value===i){g.push(j)}});JC.log(g.length);if(!g.length){return}if(g.length>1){if(d._model.idSelector().val()){var h;$.each(g,function(k,j){if(j.id==d._model.idSelector().val()){h=true;return false}});if(!h){d._model.idSelector().val(g.first().id)}}else{d._model.idSelector().val(g.first().id)}}else{d._model.idSelector().val(g.first().id)}});if(d._model.sugautoposition()){$(window).on("resize",function(){if(d._model.layout().is(":visible")){d._view.show()}})}}});JC.BaseMVC.build(c);c.Model._instanceName="SuggestInstace";JC.f.extendObject(c.Model.prototype,{init:function(){this._id="Suggest_"+new Date().getTime();this.initValue=this.selector().val().trim();return this},selector:function(){return this._selector},suglayouttpl:function(){var d=this,f=c.layoutTpl||d.layoutTpl,e;(e=d.selector().attr("suglayouttpl"))&&(f=e);return f},layoutTpl:'<dl class="sug_layout js_sugLayout" style="display:none;"></dl>',layout:function(){var d=this;!d._layout&&d.selector().is("[suglayout]")&&(d._layout=JC.f.parentSelector(d.selector(),d.selector().attr("suglayout")));!d._layout&&(d._layout=$(d.suglayouttpl()),d._layout.hide(),d._layout.appendTo(document.body),(d._sugautoposition=true));!d._layout.hasClass("js_sugLayout")&&d._layout.addClass("js_sugLayout");if(d.sugwidth()){d._layout.css({width:d.sugwidth()+"px"})}d._layout.css({width:d._layout.width()+d.sugoffsetwidth()+"px"});return d._layout},sugautoposition:function(){this.layout().is("sugautoposition")&&(this._sugautoposition=JC.f.parseBool(this.layout().attr("sugautoposition")));return this._sugautoposition},sugwidth:function(){this.selector().is("[sugwidth]")&&(this._sugwidth=parseInt(this.selector().attr("sugwidth")));!this._sugwidth&&(this._sugwidth=this.sugplaceholder().width());return this._sugwidth},sugoffsetleft:function(){this.selector().is("[sugoffsetleft]")&&(this._sugoffsetleft=parseInt(this.selector().attr("sugoffsetleft")));!this._sugoffsetleft&&(this._sugoffsetleft=0);return this._sugoffsetleft},sugoffsettop:function(){this.selector().is("[sugoffsettop]")&&(this._sugoffsettop=parseInt(this.selector().attr("sugoffsettop")));!this._sugoffsettop&&(this._sugoffsettop=0);return this._sugoffsettop},sugoffsetwidth:function(){this.selector().is("[sugoffsetwidth]")&&(this._sugoffsetwidth=parseInt(this.selector().attr("sugoffsetwidth")));!this._sugoffsetwidth&&(this._sugoffsetwidth=0);return this._sugoffsetwidth},_dataCallback:function(d){$(this).trigger("TriggerEvent",["SuggestUpdate",d])},sugdatacallback:function(){var d=this;this.selector().is("[sugdatacallback]")&&(this._sugdatacallback=this.selector().attr("sugdatacallback"));!this._sugdatacallback&&(this._sugdatacallback=d._id+"_cb");!window[this._sugdatacallback]&&(window[this._sugdatacallback]=function(e){d._dataCallback(e)});return this._sugdatacallback},sugurl:function(d){d=encodeURIComponent(d);this.selector().is("[sugurl]")&&(this._sugurl=this.selector().attr("sugurl"));!this.selector().is("[sugurl]")&&(this._sugurl="?word={0}&callback={1}");this._sugurl=JC.f.printf(this._sugurl,d,this.sugdatacallback());return this._sugurl},sugneedscripttag:function(){this._sugneedscripttag=true;this.selector().is("[sugneedscripttag]")&&(this._sugneedscripttag=JC.f.parseBool(this.selector().attr("sugneedscripttag")));return this._sugneedscripttag},getData:function(h){var e=this,f=this.sugurl(h),g,d="script_"+e._id;JC.log(f,new Date().getTime());if(this.sugneedscripttag()){$("#"+d).remove();g=JC.f.printf('<script id="{1}" src="{0}"><\/script>',f,d);$(g).appendTo(document.body)}else{$.get(f,function(i){i=$.parseJSON(i);e._dataCallback(i)})}},cache:function(d,e){this._cache=this._cache||{};typeof e!="undefined"&&(this._cache[d]=e);return this._cache[d]},sugselectedcallback:function(){var d=this;this.selector().is("[sugselectedcallback]")&&(this._sugselectedcallback=this.selector().attr("sugselectedcallback"));return this._sugselectedcallback?window[this._sugselectedcallback]:null},suginitedcallback:function(){var d=this;this.selector().is("[suginitedcallback]")&&(this._suginitedcallback=this.selector().attr("suginitedcallback"));return this._suginitedcallback?window[this._suginitedcallback]:null},sugdatafilter:function(){var d=this;this.selector().is("[sugdatafilter]")&&(this._sugdatafilter=this.selector().attr("sugdatafilter"));this._sugdatafilter=this._sugdatafilter||c.dataFilter;return this._sugdatafilter?window[this._dataCallback]:null},sugqueryinterval:function(){this.selector().is("[sugqueryinterval]")&&(this._sugqueryinterval=parseInt(this.selector().attr("sugqueryinterval")));this._sugqueryinterval=this._sugqueryinterval||300;return this._sugqueryinterval},sugprevententer:function(){var d;this.selector().is("[sugprevententer]")&&(d=JC.f.parseBool(this.selector().attr("sugprevententer")));return d},timeout:null,preValue:null,keyindex:-1,nextIndex:function(e){var f=this.items(),d=f.length;if(e){if(this.keyindex<=0){this.keyindex=d-1}else{this.keyindex--}}else{if(this.keyindex>=d-1){this.keyindex=0}else{this.keyindex++}}return this.keyindex},items:function(){return this.layout().find(".js_sugItem")},selectedIdentifier:function(e,d){this._preSelected&&this._preSelected.removeClass("active");e.addClass("active");d&&(this.keyindex=parseInt(e.attr("keyindex")));this._preSelected=e},getKeyword:function(d){var f=d.attr("keyword");try{f=decodeURIComponent(f)}catch(e){}return f},currentData:function(d){typeof d!="undefined"&&(this._currentData=d);return this._currentData},sugsubtagname:function(){var e="dd",d;(d=this.selector().attr("sugsubtagname"))&&(e=d);return e},sugplaceholder:function(){var d=this.selector();this.selector().is("[sugplaceholder]")&&(d=JC.f.parentSelector(this.selector(),this.selector().attr("sugplaceholder")));return d},idSelector:function(){var d;this.is("[sugIdSelector]")&&(d=JC.f.parentSelector(this.selector(),this.attrProp("sugIdSelector")));return d}});JC.f.extendObject(c.View.prototype,{init:function(){return this},show:function(){var d=this;$(this).trigger("TriggerEvent",["SuggestBeforeShow"]);this._model.layout().css("z-index",window.ZINDEX_COUNT++);this.autoposition();this._model.layout().show();setTimeout(function(){d._model.layout().show()},10);$(this).trigger("TriggerEvent",["SuggestShow"])},autoposition:function(){if(!this._model.sugautoposition()){return}var d=this,e=d._model.sugplaceholder().offset(),f=d._model.sugplaceholder().height();d._model.layout().css({left:e.left+d._model.sugoffsetleft()+"px",top:e.top+d._model.sugoffsettop()+f+"px"})},hide:function(){this._model.layout().hide();this.reset();$(this).trigger("TriggerEvent",["SuggestHide"])},update:function(f){var e=this,d=[],p,n,m,g=e._model.sugsubtagname(),o;if(!(f&&f.s&&f.s.length)){e.hide();return}for(var l=0,h=f.s.length;l<h;l++){n=f.s[l];var k=[];if(typeof n==="object"){$.each(n,function(i,j){k.push(JC.f.printf('data-{0}="{1}"',i,encodeURIComponent(j)))});n=n.name||n.value||n.id}m=n;p=f.q||"";m=m.replace(p,JC.f.printf("<b>{0}</b>",p));d.push(JC.f.printf('<{4} keyword="{2}" keyindex="{3}" class="js_sugItem" {5} >{1}</{4}>',p,m,encodeURIComponent(n),l,g,k.join(" ")))}e._model.layout().html(d.join(""));JC.log("suggest update");this.reset();e._model.currentData(f);$(this).trigger("TriggerEvent",["SuggestUpdated"]);e.show()},reset:function(){JC.log("suggest reset");this._model.keyindex=-1;this._model.layout().find(".js_sugItem").removeClass("active");$(this).trigger("TriggerEvent",["SuggestReset"])}});$(document).delegate("input[type=text]","focus",function(e){var d=$(this),f=c.getInstance(d);if(d.is("[readonly]")||d.is("[disabled]")){return}if(f||!c.isSuggest(d)||!c.autoInit){return}JC.log("Suggest input fined:",d.attr("name"),new Date().getTime());f=new c(d)});$(document).on("click",function(d){$("dl.js_sugLayout, div.js_sugLayout").hide()});return JC.Suggest})}(typeof define==="function"&&define.amd?define:function(b,a,c){typeof b=="function"&&(c=b);typeof a=="function"&&(c=a);c&&c()},window));