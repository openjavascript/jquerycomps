(function(e,t){e("JC.NSlider",["JC.common","JC.BaseMVC"],function(){function n(e){e&&(e=$(e));if(JC.BaseMVC.getInstance(e,n))return JC.BaseMVC.getInstance(e,n);JC.BaseMVC.getInstance(e,n,this),this._model=new n.Model(e);switch(this._model.direction()){case"vertical":this._view=new s(this._model,this);break;default:this._view=new i(this._model,this)}this._init()}function i(e,t){this._model=e,this._slider=t;var n=e.viewItemNum();this._itemspace=parseInt((e.width()-n*e.itemwidth())/n)}function s(e,t){this._model=e,this._slider=t;var n=e.viewItemNum();this._itemspace=parseInt((e.height()-n*e.itemheight())/n)}var e=$(document),t=$(window);JC.NSlider=n,n.init=function(e){var t=[];return e=$(e||document),e.length&&(e.hasClass("js_NSlider")?t.push(new n(e)):e.find("div.js_NSlider").each(function(){t.push(new n(this))})),t},JC.BaseMVC.build(n),JC.f.extendObject(n.prototype,{_beforeInit:function(){},_initHanlderEvent:function(){var e=this,t=e._model,n=e._view,r=t.selector();e.on("inited",function(){var e=this;e._initControl(),e.on("cleartinterval",function(){e._model.clearInterval(),e._view.setPagePosition()}),e.on("cleartimeout",function(){e._model.clearTimeout()}),e._initAutoMove()})},_initControl:function(){this._initSliderNav();switch(this._model.direction()){case"vertical":this._initVerticalControl();break;default:this._initHorizontalControl()}},_initHorizontalControl:function(){var e=this,t=e._model;t.prevbutton()&&e._model.prevbutton().on("click",function(n){if(t._movelock)return;t.lockmove(),e.notification(r.PREVCLICK,[$(n),e]),e.trigger("cleartimeout"),e.trigger("movetoprev"),e._view.move(1)}).on("mouseenter",function(){e.trigger("controlover")}).on("mouseleave",function(){e.trigger("controlout")}),t.nextbutton()&&e._model.nextbutton().on("click",function(n){if(t._movelock)return;t.lockmove(),e.notification(r.NEXTCLICK,[$(n),e]),e.trigger("cleartimeout"),e.trigger("movetotnext"),e._view.move()}).on("mouseenter",function(){e.trigger("controlover")}).on("mouseleave",function(){e.trigger("controlout")})},_initVerticalControl:function(){var e=this,t=e._model;t.prevbutton()&&e._model.prevbutton().on("click",function(n){if(t._movelock)return;t.lockmove(),e.notification(r.PREVCLICK,[$(n),e]),e.trigger("cleartimeout"),e.trigger("movetoprev"),e._view.move(1)}).on("mouseenter",function(){e.trigger("controlover")}).on("mouseleave",function(){e.trigger("controlout")}),t.nextbutton()&&e._model.nextbutton().on("click",function(n){if(t._movelock)return;t.lockmove(),e.notification(r.NEXTCLICK,[$(n),e]),e.trigger("cleartimeout"),e.trigger("movetotnext"),e._view.move()}).on("mouseenter",function(){e.trigger("controlover")}).on("mouseleave",function(){e.trigger("controlout")})},_initSliderNav:function(){var e=this,t=e._model;t._selector.on("click",".slide_navbtn",function(n){n.preventDefault();var r=$(n.target),i=parseInt(r.attr("data-index"));e._view.moveTo(t.itemRemote(t._nowIndex,i)),t.changeIndex(i)})},_initAutoMove:function(){var e=this,t=e._model;if(!e._model.automove())return;return e.on("beforemove",function(t){e.trigger("cleartimeout"),e.notification(r.BEFOREMOVE,[$(t),e])}),e.on("aftermove",function(n,i,s){e.notification(r.AFTERMOVE,[$(n),e]);if(t.controlover())return;e.trigger("automove")}),t._selector.on("mouseenter",function(t){e.trigger("cleartimeout"),e.trigger("mouseenter")}),t._selector.on("mouseleave",function(t){e.trigger("cleartimeout"),e.trigger("mouseleave"),e.trigger("automove")}),e.on("controlover",function(){e.trigger("cleartimeout"),e._model.controlover(!0)}),e.on("controlout",function(){e.trigger("automove"),t.controlover(!1)}),e.on("movetoprev",function(){t.moveDirection(!1)}),e.on("movetotnext",function(){t.moveDirection(!0)}),t.automove&&$(e).on("automove",function(){var n=t.howmanyitem();e._model.timeout(setTimeout(function(){e._view.moveTo(t.page(t._nowIndex,n)),t.changeIndex()},e._model.automovems()))}),e.trigger("automove"),this},_inited:function(){this.trigger("inited")}});var r=n.Model;return r.PREVCLICK="slidPrev",r.NEXTCLICK="slidNext",r.BEFOREMOVE="beforeMove",r.AFTERMOVE="afterMove",JC.f.extendObject(r.prototype,{init:function(){this._nowIndex=0,this._moveDirection=!0},prevbutton:function(){return this.selectorProp("sliderprev")},nextbutton:function(){return this.selectorProp("slidernext")},direction:function(){return this.attrProp("sliderdirection")||"horizontal"},moveDirection:function(e){return typeof e!="undefined"&&(this._moveDirection=e),this._moveDirection},howmanyitem:function(){return this.intProp("sliderhowmanyitem")||1},viewItemNum:function(){var e=Math.floor(this.direction()=="horizontal"?this.width()/this.itemwidth():this.height()/this.itemheight());return(this.viewItemNum=function(){return e})()},width:function(){var e=this.selector().width()||800;return(this.width=function(){return e})()},height:function(){var e=this.selector().height()||230;return(this.height=function(){return e})()},itemwidth:function(){var e=this.subitems().eq(0).width()||160;return(this.itemwidth=function(){return e})()},itemheight:function(){var e=this.subitems().eq(0).height()||230;return(this.itemheight=function(){return e})()},loop:function(){return this.boolProp("sliderloop")},stepms:function(){return this.intProp("sliderstepms")||10},durationms:function(){return this.intProp("sliderdurationms")||300},automovems:function(){return this.intProp("sliderautomovems")||2e3},automove:function(){return this.boolProp("sliderautomove")},defaultindex:function(){return this.intProp("sliderdefaultindex")||0},slidernav:function(){return this.attrProp("slidernav")},slidernavtype:function(){return this.attrProp("slidernavtype")||"icon"},subitems:function(){return this.selectorProp("slidersubitems")},pointer:function(e){return typeof this._pointer=="undefined"&&(this._pointer=this.defaultindex()),typeof e!="undefined"&&(this._pointer=0),this._pointer},page:function(e,t,n){typeof t=="undefined"&&(t=0),typeof n=="undefined"?n=this.moveDirection():this.moveDirection(n);var r,i=[],s=this.subitems(),o=this.viewItemNum();r=o+t,n||(e-=t,e<0&&(e+=s.length));for(var u=0;u<r;u++,e++)e==s.length&&(e=0),i.push(s[e]);return i},itemRemote:function(e,t){if(t==e)return[];var n=t-e;return this.page(e,Math.abs(n),n>=0)},changeIndex:function(e){var t=typeof e=="undefined"?this._nowIndex:e,n=t,r,i;return typeof e=="undefined"&&(r=this.howmanyitem(),i=this.subitems(),this.moveDirection()?(n+=r,n>=i.length&&(n-=i.length)):(n-=r,n<0&&(n+=i.length))),this._nowIndex=n,this.changeRemoteNav(n),t},changeRemoteNav:function(e){var t=this._selector,n=t.find(".slide_on");if(this.slidernav()=="group"){var r=this.viewItemNum(),i=parseInt(n.attr("data-index"));if(i+r-1>e&&e>i)return;n.removeClass("slide_on"),t.find(".slide_navbtn[data-index="+(e-e%r)+"]").addClass("slide_on")}else n.removeClass("slide_on"),t.find(".slide_navbtn[data-index="+e+"]").addClass("slide_on")},interval:function(e){return typeof e!="undefined"&&(this._interval=e),this._interval},clearInterval:function(){this.interval()&&clearInterval(this.interval())},timeout:function(e){return typeof e!="undefined"&&(this._timeout=e),this._timeout},clearTimeout:function(){this.timeout()&&clearTimeout(this.timeout())},controlover:function(e){return typeof e!="undefined"&&(this._controlover=e),this._controlover},lockmove:function(){this._movelock=!0},unlockmove:function(){this._movelock=!1}}),i.prototype={init:function(){return this.setPagePosition(this._model.pointer()),this._initSliderNav(this._model.slidernav()),this},_initSliderNav:function(e){if(!e)return;var t=this._model,n="",r=t.slidernavtype(),i=t.viewItemNum(),s=t.subitems().length;s=e=="group"?s/i:s,n+='<div class="hslide_nav">';for(var o=0;o<s;o++)n+=JC.f.printf('<a href="#" class="slide_navbtn {0} {1}" data-index="{2}">{3}</a>',o==0?"slide_on":"",r=="num"?"hslide_navnum":"hslide_navicon",e=="group"?o*i:o,o+1);n+="</div>",t._selector.append(n)},move:function(e){var t=this,n=this._model;e=!!e;var r=n._nowIndex,i=n.howmanyitem();this.moveTo(n.page(r,i)),n.changeIndex()},moveTo:function(e){if(!e||e.length==0)return;var t=this,n=this._model,r=n.howmanyitem(),i=n.moveDirection(),s=r*(n.itemwidth()+t._itemspace),o,u=0,a,f=[];if(i)a=this._model.width(),$.each(e,function(n,i){o=$(i),e.length-n<=r&&(o.css({left:a+u*(t._model.itemwidth()+t._itemspace)+"px"}).show(),u++),n<r&&f.push(o),o.data("TMP_LEFT",$(i).prop("offsetLeft"))});else{a=-(t._model.itemwidth()+t._itemspace);var l=e.length,c;for(var h=l-1;h>=0;h--)o=$(e[h]),h<r&&(o.css({left:a-u*(t._model.itemwidth()+t._itemspace)+"px"}).show(),u++),e.length-h<=r&&f.push(o),o.data("TMP_LEFT",o.prop("offsetLeft"))}$(t._slider).trigger("beforemove"),t._model.interval(JC.f.easyEffect(function(t,r){$(e).each(function(e,n){$(n).css({left:$(n).data("TMP_LEFT")+(i?-t:t)+"px"})}),r&&($.each(f,function(e,t){$(t).hide()}),n.unlockmove())},s,0,this._model.durationms(),this._model.stepms())),$(t._slider).trigger("aftermove")},setPagePosition:function(e){typeof e=="undefined"&&(e=this._model.initIndex()),this._model.subitems().hide();var t=this._model.page(e);for(var n=0,r=t.length;n<r;n++)$(t[n]).css({left:n*(this._model.itemwidth()+this._itemspace)+"px"}).show()}},s.prototype={init:function(){return this.setPagePosition(this._model.pointer()),this._initSliderNav(this._model.slidernav()),this},_initSliderNav:function(e){if(e=="")return;var t=this._model,n="",r=t.slidernavtype(),i=t.subitems().length;i=e=="group"?i/_viewItemNum:i,n+='<div class="vslide_nav">';for(var s=0;s<i;s++)n+=JC.f.printf('<a href="#" class="slide_navbtn {0} {1}" data-index="{2}">{3}</a>',s==0?"slide_on":"",r=="num"?"vslide_navnum":"vslide_navicon",e=="group"?s*_viewItemNum:s,s+1);n+="</div>",t._selector.append(n)},move:function(e){var t=this,n=this._model;e=!!e;var r=n._nowIndex,i=n.howmanyitem();this.moveTo(n.page(r,i)),n.changeIndex()},moveTo:function(e){if(!e||e.length==0)return;var t=this,n=this._model,r=n.howmanyitem(),i=n.moveDirection(),s=r*(n.itemheight()+t._itemspace),o,u=0,a,f=[];if(i)a=this._model.height(),$.each(e,function(n,i){o=$(i),e.length-n<=r&&(o.css({top:a+u*(t._model.itemheight()+t._itemspace)+"px"}).show(),u++),n<r&&f.push(o),o.data("TMP_TOP",$(i).prop("offsetTop"))});else{a=-(t._model.itemheight()+t._itemspace);var l=e.length,c;for(var h=l-1;h>=0;h--)o=$(e[h]),h<r&&(o.css({top:a-u*(t._model.itemheight()+t._itemspace)+"px"}).show(),u++),e.length-h<=r&&f.push(o),o.data("TMP_TOP",o.prop("offsetTop"))}$(t._slider).trigger("beforemove"),t._model.interval(JC.f.easyEffect(function(t,r){$(e).each(function(e,n){$(n).css({top:$(n).data("TMP_TOP")+(i?-t:t)+"px"})}),r&&($.each(f,function(e,t){$(t).hide()}),n.unlockmove())},s,0,this._model.durationms(),this._model.stepms())),$(t._slider).trigger("aftermove")},setPagePosition:function(e){typeof e=="undefined"&&(e=this._model.initIndex()),this._model.subitems().hide();var t=this._model.page(e);for(var n=0,r=t.length;n<r;n++)$(t[n]).css({top:n*(this._model.itemheight()+this._itemspace)+"px"}).show()}},e.ready(function(){$(".js_NSlider").each(function(e,t){new n(t)})}),JC.NSlider})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);