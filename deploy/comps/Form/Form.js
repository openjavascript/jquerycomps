(function(b,a){b(["JC.common"],function(){window.JCForm=JC.Form={disableButton:function(d,c){if(!d){return}d=$(d);c=c||1000;d.attr("disabled",true);setTimeout(function(){d.attr("disabled",false)},c)}};JC.AutoSelect&&(JC.Form.initAutoSelect=JC.AutoSelect);JC.AutoChecked&&(JC.Form.initCheckAll=JC.AutoChecked);return JC.Form})}(typeof define==="function"&&define.amd?define:function(b,a,c){typeof b=="function"&&(c=b);typeof a=="function"&&(c=a);c&&c()},window));(function(b,a){b(["JC.Form.default"],function(){JC.Form.initAutoFill=function(g,i){g=$(g||document);if(!(g&&g.length)){g=$(document)}i=i||location.href;JC.log("JC.Form.initAutoFill");if(g.prop("nodeName").toLowerCase()=="form"){c(g,i)}else{var h=g.find("form.js_autoFillUrlForm");h.each(function(){c(this,i)});if(!h.length){f(g,i)}}};function f(g,i){g=$(g);i=e(i);g.find("input[type=text][name],input[type=password][name],textarea[name]").each(function(){var j=$(this);if(JC.f.hasUrlParam(i,j.attr("name"))){j.val(e(JC.f.getUrlParam(i,j.attr("name")).replace(/[\+]/g," ")))}});g.find("select[name]").each(function(){var j=$(this),k=e(JC.f.getUrlParam(i,j.attr("name")).replace(/[\+]/g," "));if(JC.f.hasUrlParam(i,j.attr("name"))){if(d(j,k)){j.removeAttr("selectignoreinitrequest");j.val(JC.f.getUrlParam(i,j.attr("name")))}else{j.attr("selectvalue",k)}}});var h={};g.find("input[type=checkbox][name], input[type=radio][name]").each(function(){var j=$(this),m=j.attr("name").trim(),k,l=j.val();if(!(m in h)){k=JC.f.getUrlParams(i,m);h[m]=k}else{k=h[m]}if(k&&k.length){$.each(k,function(o,n){if(n==l){j.prop("checked",true);j.trigger("change")}})}});window.JC.f.jcAutoInitComps&&JC.f.jcAutoInitComps(g)}function c(g,h){f(g,h)}JC.Form.initAutoFill.decodeFunc;function e(h){try{h=(JC.Form.initAutoFill.decodeFunc||decodeURIComponent)(h)}catch(g){}return h}function d(g,i){var h=false,i=i.toString();g.find("option").each(function(){var j=$(this);if(j.val()==i){h=true;return false}});return h}$(document).ready(function(g){setTimeout(function(){JC.Form.initAutoFill()},50)});return JC.Form})}(typeof define==="function"&&define.amd?define:function(b,a,c){typeof b=="function"&&(c=b);typeof a=="function"&&(c=a);c&&c()},window));(function(b,a){b(["JC.Form.default"],function(){JC.Form.initNumericStepper=function(d){d&&(d=$(d));d.delegate(".js_NStepperPlus, .js_NStepperMinus","click",function(i){var e=$(this),h=c.target(e);if(!(h&&h.length)){return}var g=parseInt(c.fixed(h),10)||0;var l=$.trim(h.val()),j=c.step(h);l=(g?parseFloat(l):parseInt(l,10))||0;var k=c.minvalue(h),f=c.maxvalue(h);e.hasClass("js_NStepperPlus")&&(l+=j);e.hasClass("js_NStepperMinus")&&(l-=j);l<k&&(l=k);l>f&&(l=f);JC.log(k,f,l,g,j);h.val(l.toFixed(g));c.callback(h)&&c.callback(h).call(h,e)})};JC.Form.initNumericStepper.onchange;var c={target:function(e){var d;if(e.attr("nstarget")){if(/^\~/.test(e.attr("nstarget"))){d=e.parent().find(e.attr("nstarget").replace(/^\~[\s]*/g,""));!(d&&d.length)&&(d=$(e.attr("nstarget")))}else{d=$(e.attr("nstarget"))}}return d},fixed:function(d){return d.attr("nsfixed")},step:function(d){return parseFloat(d.attr("nsstep"))||1},minvalue:function(d){return parseFloat(d.attr("nsminvalue")||d.attr("minvalue"))||0},maxvalue:function(d){return parseFloat(d.attr("nsmaxvalue")||d.attr("maxvalue"))||100},callback:function(d){var f=JC.Form.initNumericStepper.onchange,e;d.attr("nschangecallback")&&(e=window[d.attr("nschangecallback")])&&(f=e);return f}};$(document).ready(function(d){JC.Form.initNumericStepper($(document))});return JC.Form})}(typeof define==="function"&&define.amd?define:function(b,a,c){typeof b=="function"&&(c=b);typeof a=="function"&&(c=a);c&&c()},window));