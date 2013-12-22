(function(b,a){b(["JC.common"],function(){(function(c){window.BaseMVC=JC.BaseMVC=d;function d(e){throw new Error("JC.BaseMVC is an abstract class, can't initialize!");if(d.getInstance(e)){return d.getInstance(e)}d.getInstance(e,this);this._model=new d.Model(e);this._view=new d.View(this._model);this._init()}d.prototype={_init:function(){var e=this;e._beforeInit();e._initHanlderEvent();c([e._view,e._model]).on("BindEvent",function(f,h,g){e.on(h,g)});c([e._view,e._model]).on("TriggerEvent",function(f,h){var g=JC.f.sliceArgs(arguments).slice(2);e.trigger(h,g)});e._model.init();e._view&&e._view.init();e._inited();return e},_beforeInit:function(){},_initHanlderEvent:function(){},_inited:function(){},selector:function(){return this._model.selector()},on:function(f,e){c(this).on(f,e);return this},trigger:function(f,e){c(this).trigger(f,e);return this}};d.getInstance=function(e,f,g){typeof e=="string"&&!/</.test(e)&&(e=c(e));if(!(e&&e.length)||(typeof e=="string")){return null}f.Model._instanceName=f.Model._instanceName||"CommonIns";typeof g!="undefined"&&e.data(f.Model._instanceName,g);return e.data(f.Model._instanceName)};d.autoInit=true;d.build=function(e){d.buildModel(e);d.buildView(e);d.buildClass(d,e);d.buildClass(d.Model,e.Model);d.buildClass(d.View,e.View)};d.buildClass=function(e,f){if(!(e&&f)){return}var i,h,g;if(f){for(i in e){if(!f[i]){if(e[i].constructor==Function){}else{f[i]=e[i]}}}for(i in e.prototype){!f.prototype[i]&&(f.prototype[i]=e.prototype[i])}}};d.buildModel=function(e){!e.Model&&(e.Model=function(f){this._selector=f},e.Model._instanceName="CommonIns")};d.buildView=function(e){!e.View&&(e.View=function(f){this._model=f})};d.buildModel(d);d.buildView(d);d.Model._instanceName="BaseMVCIns";JC.f.extendObject(d.Model.prototype,{init:function(){return this},selector:function(e){typeof e!="undefined"&&(this._selector=e);return this._selector},intProp:function(e,f){if(typeof f=="undefined"){f=e;e=this.selector()}else{e&&(e=c(e))}var g=0;e&&e.is("["+f+"]")&&(g=parseInt(e.attr(f).trim(),10)||g);return g},floatProp:function(e,f){if(typeof f=="undefined"){f=e;e=this.selector()}else{e&&(e=c(e))}var g=0;e&&e.is("["+f+"]")&&(g=parseFloat(e.attr(f).trim())||g);return g},stringProp:function(e,f){if(typeof f=="undefined"){f=e;e=this.selector()}else{e&&(e=c(e))}var g=(this.attrProp(e,f)||"").toLowerCase();return g},attrProp:function(e,f){if(typeof f=="undefined"){f=e;e=this.selector()}else{e&&(e=c(e))}var g="";e&&e.is("["+f+"]")&&(g=e.attr(f).trim());return g},boolProp:function(e,f,h){if(typeof f=="boolean"){h=f;f=e;e=this.selector()}else{if(typeof f=="undefined"){f=e;e=this.selector()}else{e&&(e=c(e))}}var g=undefined;e&&e.is("["+f+"]")&&(g=JC.f.parseBool(e.attr(f).trim()));return g},callbackProp:function(e,g){if(typeof g=="undefined"){g=e;e=this.selector()}else{e&&(e=c(e))}var h,f;e&&e.is("["+g+"]")&&(f=window[e.attr(g)])&&(h=f);return h},windowProp:function(){return this.callbackProp.apply(this,JC.f.sliceArgs(arguments))},selectorProp:function(e,f){var g;if(typeof f=="undefined"){f=e;e=this.selector()}else{e&&(e=c(e))}e&&e.is("["+f+"]")&&(g=JC.f.parentSelector(e,e.attr(f)));return g},is:function(e,f){if(typeof f=="undefined"){f=e;e=this.selector()}else{e&&(e=c(e))}return e&&e.is(f)}});JC.f.extendObject(d.View.prototype,{init:function(){return this}})}(jQuery));return JC.BaseMVC})}(typeof define==="function"&&define.amd?define:function(b,a,c){typeof b=="function"&&(c=b);typeof a=="function"&&(c=a);c&&c()},window));