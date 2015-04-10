(function(e,t){e("JC.Tips",["JC.common"],function(){function e(r){r=$(r);if(!r||!r.length)return this;if(r.length>1)return e.init(r);if(e.getInstance(r))return e.getInstance(r);e.getInstance(r,this),this._model=new t(r),this._view=new n(this._model),this._init()}function t(e){this.tpl=i,this._selector=e,this._data,this._init()}function n(e){this._model=e,this._layout}function r(t){function i(e){if(!r.layout().is(":visible")){$(document).unbind("mousemove",i),$(n).unbind("mouseleave",s);return}r.show(e)}function s(e){$(document).unbind("mousemove",i),$(n).unbind("mouseleave",s),r.hide()}var n=$(this),r=e.getInstance(n);r.layout(1).css("z-index",ZINDEX_COUNT++);if(!r.data())return;r.show(t),$(document).on("mousemove",i),n.on("mouseleave",s)}window.Tips=JC.Tips=e,e.prototype={_init:function(){var e=this;return $(this._view).on("BindEvent",function(t,n,r){e.on(n,r)}),$(this._view).on("TriggerEvent",function(t,n,r){e.trigger(n,r)}),this._view.init(),this._model.selector().on("mouseenter",r),this},show:function(e){return this._view.show(e),this},hide:function(){return this._view.hide(),this},selector:function(){return this._model.selector()},layout:function(e){return this._view.layout(e)},data:function(){return this._model.data()},on:function(e,t){return $(this).on(e,t),this},trigger:function(e,t){return $(this).trigger(e,t),this}},e.init=function(t){if(!t)return;t=$(t);if(!t.length)return;var n=[];return t.each(function(){var t=$(this);if(e.getInstance(t))return;n.push(new e(t))}),n},e.hide=function(){$("body > div.UTips").hide()},e.autoInit=!0,e.tpl=null,e.offset={bottom:{x:15,y:15},left:{x:-28,y:5},top:{x:-2,y:-22}},e.minWidth=200,e.maxWidth=400,e.titleToTipsdata=function(e){e=$(e),(!JC.Tips.autoInit||typeof window.event=="object"&&document.attachEvent)&&e.each(function(){$(this).attr("tipsData",$(this).attr("title")).removeAttr("title")})},e.getInstance=function(e,t){return t&&e&&$(e).data("TipsIns",t),e?$(e).data("TipsIns"):null},t.prototype={_init:function(){return this.update(),this},data:function(e){return e&&this.update(),this._data},update:function(){if(!this._selector.attr("title")&&!this._selector.attr("tipsData"))return;this._data=$.trim(this._selector.attr("title")||this._selector.attr("tipsData")).replace(/(?:\r\n|\n\r|\r|\n)/g,"<br />"),this._selector.removeAttr("title").removeAttr("tipsData");if(this.isInited())return;this.isInited(!0)},isInited:function(e){return typeof e!="undefined"&&this._selector.data("initedTips",e),this._selector.data("initedTips")},selector:function(){return this._selector},tipsinitedcallback:function(){var e;return this._selector.attr("tipsinitedcallback")&&(e=window[this._selector.attr("tipsinitedcallback")]),e},tipsshowcallback:function(){var e;return this._selector.attr("tipsshowcallback")&&(e=window[this._selector.attr("tipsshowcallback")]),e},tipshidecallback:function(){var e;return this._selector.attr("tipshidecallback")&&(e=window[this._selector.attr("tipshidecallback")]),e},tipstemplatebox:function(){var e;return this._selector.is("[tipstemplatebox]")&&(e=$(this._selector.attr("tipstemplatebox")).html().trim().replace(/[\r\n]+/g,"")),this._selector.is("[tipstemplatesbox]")&&(e=$(this._selector.attr("tipstemplatesbox")).html().trim().replace(/[\r\n]+/g,"")),e},tipstemplatesbox:function(){return this.tipstemplatebox()},tipsupdateonce:function(){var e;return this._selector.attr("tipsupdateonce")&&(e=JC.f.parseBool(this._selector.attr("tipsupdateonce"))),e},tipsIsUpdated:function(e){return typeof e!="undefined"&&this._selector.data("TipsUpdated",e),this._selector.data("TipsUpdated")},layout:function(){if(!this._layout)if(this.tipstemplatesbox())this._layout=$(this.tipstemplatesbox()),this._layout.appendTo(document.body);else{this._layout=$("#JCTipsLayout");if(!this._layout||!this._layout.length)this._layout=$(this.tipstemplatesbox()||JC.Tips.tpl||this.tpl),this._layout.attr("id","JCTipsLayout").css("position","absolute"),this._layout.appendTo(document.body)}return this._layout}},n.prototype={init:function(){return $(this).trigger("BindEvent",["TipsShow",this._model.tipsshowcallback()]),$(this).trigger("BindEvent",["TipsHide",this._model.tipshidecallback()]),$(this).trigger("BindEvent",["TipsInited",this._model.tipsinitedcallback()]),this},show:function(e){var t=e.pageX,n=e.pageY;t+=JC.Tips.offset.bottom.x,n+=JC.Tips.offset.bottom.y;var r=$(document).scrollTop(),i=$(document).scrollLeft(),s=$(window).width(),o=$(window).height(),u=this.layout().width(),a=this.layout().height(),f=i+s-u,l=i,c=r+o-a,h=r,p=!1,d=!1;t>f&&(t=t-u+JC.Tips.offset.left.x,n+=JC.Tips.offset.left.y,p=!0),t<l&&(t=l),n>c&&(n=n-a+JC.Tips.offset.top.y,t+=JC.Tips.offset.top.x,d=!0),n<h&&(n=h),p&&d&&(n-=5),this.layout().css({left:t+"px",top:n+"px"}),this.layout().show(),$(this).trigger("TriggerEvent",["TipsShow",this._model.tipsshowcallback()])},hide:function(){this.layout().hide(),$(this).trigger("TriggerEvent","TipsHide")},layout:function(e){return this._layout=this._model.layout(),e&&this.update(),this._layout},update:function(){if(this._model.tipsupdateonce()&&this._model.tipsIsUpdated())return;var e=this._model.data(1);this._layout.html(e).css({width:"auto",left:"-9999px",top:"-9999px",display:"block"});var t=this._layout.width(),n=this._layout.height();t<JC.Tips.minWidth&&this._layout.css("width",JC.Tips.minWidth+"px"),t>JC.Tips.maxWidth&&this._layout.css("width",JC.Tips.maxWidth+"px"),this._model.tipsIsUpdated(!0)}};var i='<div class="UTips"></div>';return $(document).ready(function(t){JC.f.safeTimeout(function(){if(!JC.Tips.autoInit)return;e.titleToTipsdata($("[title]")),$(document).delegate("*","mouseover",function(t){var n=$(this);if(e.getInstance(n))return;if(!n.attr("title")&&!n.attr("tipsData"))return;JC.Tips.init(n),r.call(this,t)})},null,"COMP_INIT_TIPS",500)}),JC.Tips})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);