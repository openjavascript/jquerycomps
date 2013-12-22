(function(b,a){b(["JC.common","JC.BaseMVC"],function(){(function(d){window.JC=window.JC||{log:function(){}};JC.PopTips=c;function c(e){e&&(e=d(e));if(c.getInstance(e)){return c.getInstance(e)}c.getInstance(e,this);this._model=new c.Model(e);this._view=new c.View(this._model);this._init()}c.getInstance=function(e,f){if(typeof e=="string"&&!/</.test(e)){e=d(e)}if(!(e&&e.length)||(typeof e=="string")){return}typeof f!="undefined"&&e.data(c.Model._instanceName,f);return e.data(c.Model._instanceName)};c.init=function(e){var f=[];e=d(e||document);if(e&&e.length){if(e.hasClass("js_compPopTips")){f.push(new c(e))}else{e.find("span.js_compPopTips,a.js_compPopTips,b.js_compPopTips,em.js_compPopTips").each(function(){f.push(new c(this))})}}return f};c.update=function(){var e=d(JC.f.printf("#{0}>div",c.Model._boxId));if(!e.length){return}e.each(function(){var f=d(this),g=f.data("CPopTipsIns");if(!g){return}g.update()})},BaseMVC.build(c);JC.f.extendObject(c.prototype,{_beforeInit:function(){},_initHanlderEvent:function(){var e=this;e.on("CPopTipsUpdate",function(j){e._model.beforeShowCallback()&&e._model.beforeShowCallback().call(e,e.selector())});var i=null,f=null,g=null,h=null;if(e._model.triggerType()=="hover"){e._model.selector().on("mouseenter",function(){clearTimeout(g);clearTimeout(h);clearTimeout(i);clearTimeout(f);i=setTimeout(function(){e._view.update();e._view.show()},50)}).on("mouseleave",function(){clearTimeout(g);clearTimeout(h);clearTimeout(i);clearTimeout(f);f=setTimeout(function(){e._view.hide()},200)});e._model.layout().on("mouseenter",function(){clearTimeout(g);clearTimeout(h);clearTimeout(i);clearTimeout(f);g=setTimeout(function(){e._view.update();e._view.show()},50)}).on("mouseleave",function(){clearTimeout(g);clearTimeout(h);clearTimeout(i);clearTimeout(f);h=setTimeout(function(){e._view.hide()},200)})}if(e._model.triggerType()=="click"){e._model.selector().on("click",function(j){if(e._model.layout().is(":visible")){e._view.hide()}else{e._view.update();e._view.show()}})}},_inited:function(){var e=d(this);e.trigger("CPopTipsUpdate")},update:function(){this._view.update();return this}});c.Model._instanceName="PopTips";c.Model._boxId="CPTBox";JC.f.extendObject(c.Model.prototype,{init:function(){var e=this},baseTpl:'<div class="CPT CPT_{0}" style="position:absolute;display:none;"><div class="CPT_shadow"><div class="CPT_container"><div class="CPT_arrow CPT_arrow_{1}"><em></em><span></span></div><div class="CPT_content"  data-role="content" {3}>{2}</div></div></div></div>',theme:function(){var e=this.stringProp("theme");!e&&(e="yellow");return e},contents:function(){var e=this.attrProp("content")||this.attrProp("title");!e&&(e=this.selector().text());return e},arrowPosition:function(){var e=this.stringProp("arrowPosition");!e&&(e="left");return e},arrowPositionOffset:function(){var f=this.stringProp("arrowPositionOffset"),e=this.arrowPosition();if(e==="left"||e==="right"){if(f!="top"){f=""}}if(e==="top"||e==="bottom"){if(f!="left"||f!="right"){f=""}}return f},triggerType:function(){var e=this.stringProp("triggerType");!e&&(e="hover");return e},layout:function(){var e=this,f=e.baseTpl;if(!this._layout){this._layout=d(JC.f.printf(f,e.theme(),e.arrowPosition(),e.contents(),'style="width:'+e.layoutWidth()+";height:"+e.layoutHeight()+';"')).appendTo(this.layoutBox())}return this._layout},layoutWidth:function(){var e=this.intProp("popTipsWidth");e&&(e=e+"px");!e&&(e="auto");return e},layoutHeight:function(){var e=this.intProp("popTipsHeight");e&&(e=e+"px");!e&&(e="auto");return e},layoutBox:function(){var e=d("#"+c.Model._boxId);if(!(e&&e.length)){e=d(JC.f.printf('<div id="{0}"></div>',c.Model._boxId)).appendTo(document.body)}return e},calcPosOffset:function(i,f,h,j){var k={},e=this,g=e.selector(),f={top:g.offset().top,left:g.offset().left,width:g.prop("offsetWidth"),height:g.prop("offsetHeight")},h=e.layout().outerWidth(),j=e.layout().outerHeight();switch(i){case"top":k={top:f.top+f.height+5,left:f.left+f.width/2-h/2};break;case"right":k={top:f.top+f.height/2-j/2,left:f.left-h-5};break;case"bottom":k={top:f.top-j-5,left:f.left+f.width/2-h/2};break;case"left":k={top:f.top+f.height/2-j/2,left:f.left+f.width+5};break}k.width=h;k.height=j;return k},offSet:function(e){this.layout().css({top:e.top,left:e.left})},changePosition:function(g,h){var e=this,f;f=e.calcPosOffset(g);e.changeArrow(h);if((h==="top")||(h==="bottom")){e.offSet(f)}return f},changeArrow:function(f){var e=this;e.layout().find("div.CPT_arrow")[0].className="CPT_arrow CPT_arrow_"+f},setPosition:function(r,n){var f=this,e,m,p=d(window),i=p.outerHeight(),t=p.outerWidth(),g=p.scrollTop(),l=p.scrollLeft(),s=t+l,q=i+g,k=r.width+r.left,h=r.top+r.height,o=f.arrowPositionOffset(),j;f.offSet(r);o&&(o="_"+o);if(n==="bottom"){if(r.top<0){e="top";m="top"+o;f.changePosition(e,m)}else{f.changeArrow("bottom"+o)}}if(n==="top"){if(q<h){e="bottom";m="bottom"+o;j=f.changePosition(e,m)}else{f.changeArrow("top"+o)}}if(n==="right"){if(r.left<0){e="left";m="left"+o;j=f.changePosition(e,m);k=j.width+j.left;if(s<k){e="bottom";m="bottom";j=f.changePosition(e,m);if(j.top<0){e="top";m="top";j=f.changePosition(e,m)}}else{f.offSet(j)}}else{f.changeArrow("right"+o)}}if(n==="left"){JC.log("_viewMaxX",s,"_tipsMaxPosX",k);if(s<k){e="right";m="right"+o;j=f.changePosition(e,m);if(j.left<0){e="bottom";m="bottom";j=f.changePosition(e,m);if(j.top<0){e="top";m="top";j=f.changePosition(e,m)}}else{f.offSet(j)}}else{f.changeArrow("left"+o)}}},beforeShowCallback:function(){var e=this,f=e.selector(),g="beforeShowCallback";return e.callbackProp(f,g)},afterHideCallback:function(){var e=this,f=e.selector(),g="afterShowCallback";return e.callbackProp(f,g)}});JC.f.extendObject(c.View.prototype,{init:function(){var e=this},update:function(){var f=this,g=f._model.selector(),e={top:g.offset().top,left:g.offset().left,width:g.prop("offsetWidth"),height:g.prop("offsetHeight")},h=f._model.arrowPosition(),i;i=f._model.calcPosOffset(h,e);f._model.setPosition(i,h);f._model.layout().data("CPopTipsIns",f)},show:function(){var e=this;e._model.layout().show()},hide:function(){var e=this;e._model.layout().hide();e._model.afterHideCallback()&&e._model.afterHideCallback().call(e,e.selector())}});d(document).ready(function(){var e=0;c.autoInit&&(e=c.init())});d(window).on("resize",function(){JC.f.safeTimeout(function(){c.update()},null,"PopTipsResize",20)})}(jQuery));return JC.PopTips})}(typeof define==="function"&&define.amd?define:function(b,a,c){typeof b=="function"&&(c=b);typeof a=="function"&&(c=a);c&&c()},window));