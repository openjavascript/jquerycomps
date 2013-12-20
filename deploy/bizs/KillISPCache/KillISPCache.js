(function(b,a){b(["JC.BaseMVC"],function(){(function(d){window.Bizs=window.Bizs||{};Bizs.KillISPCache=c;function c(e){if(c._instance){return c._instance}this._model=new c.Model(e);this._init()}c.prototype={_beforeInit:function(){JC.log("KillISPCache._beforeInit",new Date().getTime());this._model.processAjax()},process:function(f,g){f&&(f=d(f));if(!(f&&f.length)){return}var e=this;e._model.ignoreSameLinkText(g);e._model.selector(f);e._model.processLink();e._model.processForm();return this},ignoreUrl:function(e){return this._model.ignoreUrl(e)},ignoreSelector:function(e){return this._model.ignoreSelector(e)}};c.getInstance=function(){!c._instance&&(c._instance=new c());return c._instance};c.ignoreSameLinkText=true;c.randName="";c.ignoreUrl=function(e){return c.getInstance().ignoreUrl(e)};c.ignoreSelector=function(e){return c.getInstance().ignoreSelector(e)};JC.BaseMVC.buildModel(c);c.Model.prototype={init:function(){this._postfix=JC.f.printf("{0}_{1}_",new Date().getTime().toString(),Math.round(Math.random()*100000));this._count=1;this._ignoreSameLinkText=true;this._randName="isp";this._ignoreUrl=[];this._ignoreSelector=[]},ignoreUrl:function(e){if(typeof e=="string"){e=e.split(",")}e&&e.length&&(this._ignoreUrl=this._ignoreUrl.concat(e));return this._ignoreUrl},ignoreSelector:function(e){if(typeof e=="string"){e=e.split(",")}e&&e.length&&(this._ignoreSelector=this._ignoreSelector.concat(e));return this._ignoreSelector},processLink:function(){var e=this;this.selector().find("a[href]").each(function(){var f=d(this),i=(f.attr("href")||"").trim(),j=f.html().trim();if(/javascript\:/.test(i)||/^[\s]*\#/.test(i)){return}if(e.ignoreSameLinkText()&&i.trim()==f.html().trim()){return}var h=e.ignoreSelector(),g=false;d.each(h,function(l,k){if(f.is(k)){g=true;return false}});if(g){return}i=JC.f.addUrlParams(i,e.keyVal());f.attr("href",i);f.html(j)})},processForm:function(){var e=this;this.selector().find("form").each(function(){var f=d(this),h=(f.prop("method")||"").toLowerCase();if(h=="post"){return}var i=e.ignoreSelector(),g=false;d.each(i,function(k,j){if(f.is(j)){g=true;return false}});if(g){return}if(!f.find("input[name="+e.randName()+"]").length){d('<input type="hidden" name="'+e.randName()+'" value="'+e.postfix()+'" >').appendTo(f)}})},processAjax:function(){var e=this;d(document).ajaxSend(function(f,h,j){if(j.type=="POST"){return}var i=e.ignoreUrl(),g=false;d.each(i,function(n,m){var k=m.length,l=j.url.slice(0,k);if(m.toLowerCase()==l.toLowerCase()){g=true}});!g&&(j.url=JC.f.addUrlParams(j.url,e.keyVal()))})},ignoreSameLinkText:function(e){typeof e!="undefined"&&(c.ignoreSameLinkText=e);return c.ignoreSameLinkText},postfix:function(){return this._postfix+(this._count++)},randName:function(){return c.randName||this._randName},keyVal:function(){var e={};e[this.randName()]=this.postfix();return e}};JC.BaseMVC.build(c,"Bizs");d(document).ready(function(){setTimeout(function(){c.autoInit&&c.getInstance().process(d(document))},100)})}(jQuery));return Bizs.KillISPCache})}(typeof define==="function"&&define.amd?define:function(b,a,c){typeof b=="function"&&(c=b);typeof a=="function"&&(c=a);c&&c()},window));