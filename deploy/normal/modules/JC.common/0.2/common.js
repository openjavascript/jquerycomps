(function(e,t){e([],function(){function e(e){return/\\/.test(e)?e=e.replace(/[\\]+/g,"\\"):e=e.replace(/[\/]+/g,"/"),e}function t(e){var t=[],n,r;for(n=0,r=e.length;n<r;n++)t.push(e[n]);return t}function n(e){var t="",e=e||location.href;return/\:\/\//.test(e)&&e.replace(/^.*?\:\/\/([^\/]+)/,function(e,n){t=n}),t}function r(e,t){t=t||document.URL,t=t.replace(/^.*?\:\/\/[^\/]+/,"").replace(/[^\/]+$/,"");if(!e)return t;/\/$/.test(t)||(t+="/");if(/(^\.\.\/|^\.\/)/.test(e)){var n=new RegExp("^\\.\\.\\/"),r=0;while(n.exec(e)!=null)e=e.replace(n,""),r++;for(var i=0;i<r;i++)t=t.replace(/[^\/]+\/$/,"");return t==""?"/":(e=e.replace(/^\.\//,""),e.replace(/\/\/$/,"/"),t+e)}return e}function i(e){for(var t=1,n=arguments.length;t<n;t++)e=e.replace(new RegExp("\\{"+(t-1)+"\\}","g"),arguments[t]);return e}function s(e,t){var n=!1;t||(t=e,e=location.href);if(/\?/.test(e)){e=e.split("?"),e=e[e.length-1],e=e.split("&");for(var r=0,i=e.length;r<i;r++)if(e[r].split("=")[0].toLowerCase()==t.toLowerCase()){n=!0;break}}return n}function o(e,t){var n="";!t&&(t=e,e=location.href),e.indexOf("#")>-1&&(n=e.split("#")[1],e=e.split("#")[0]);for(var r in t)e=l(e,r),e.indexOf("?")>-1?e+="&"+r+"="+t[r]:e+="?"+r+"="+t[r];return n&&(e+="#"+n),e=u(e.replace(/\?\&/g,"?")),e}function u(e){return e&&(e=e.replace(/</g,"&lt;").replace(/>/g,"&gt;")),e}function a(e,t){var n="",r,i,s;!t&&(t=e,e=location.href),e.indexOf("#")>-1&&(e=e.split("#")[0]);if(e.indexOf("?")>-1){r=e.split("?")[1].split("&");for(i=0;i<r.length;i++){s=r[i].split("="),s[0]=s[0].replace(/^\s+|\s+$/g,"");if(s[0].toLowerCase()==t.toLowerCase()){n=u(s[1]||"");break}}}return n}function f(e,t){var n=[],r,i,s,o;!t&&(t=e,e=location.href),e=e.replace(/[\?]+/g,"?").split("?");if(e.length>1){e=e[1],r=e.split("&");if(r.length)for(i=0,s=r.length;i<s;i++)o=r[i].split("="),o[0].trim()==t&&n.push(u(o[1]||""))}return n}function l(e,t){var n="",r,i=[],s,o;!t&&(t=e,e=location.href),e.indexOf("#")>-1&&(n=e.split("#")[1],e=e.split("#")[0]);if(e.indexOf("?")>-1){r=e.split("?")[1].split("&"),e=e.split("?")[0];for(s=0;s<r.length;s++){var a=r[s].split("=");a[0]=a[0].replace(/^\s+|\s+$/g,"");if(a[0].toLowerCase()==t.toLowerCase())continue;i.push(a.join("="))}e+="?"+i.join("&")}return n&&(e+="#"+n),e=u(e),e}function c(e,t){!t&&(t=e,e=location.href);for(var n in t)e=l(e,t[n]);return e}function h(e){return e=e||"本示例需要HTTP环境",/file\:|\\/.test(location.href)?(alert(e),!1):!0}function p(e,t,n){!e&&(e=location.href),e=e.replace(/\#[\s\S]*/,""),n=n||"rnd";var r;return!t&&(r={},r[n]=(new Date).getTime(),e=o(e,r)),e=u(e),e}function d(e,t,n){return n=n||0,e=p(e||location.href,t),!t&&(e=o(e,{rnd:(new Date).getTime()})),e=u(e),setTimeout(function(){location.href=e},n),e}function v(e,t){return e=parseFloat(e)||0,typeof t=="undefined"&&(t=2),e&&(e=parseFloat(e.toFixed(t))),e}function m(e,t,n){return t=t||2,n=n||"0",e+="",e.length>e?e:(e=(new Array(t+1)).join(n)+e,e.slice(e.length-t))}function g(e,t){return e=e||new Date,typeof t=="undefined"&&(t="-"),[e.getFullYear(),m(e.getMonth()+1),m(e.getDate())].join(t)}function y(e){if(!e)return;e=e.replace(/[^\d]+/g,"");var t;return e.length===8&&(t=new Date(e.slice(0,4),parseInt(e.slice(4,6),10)-1,parseInt(e.slice(6),10))),t}function b(e,t,n){if(!e)return null;var r=y;return t&&!n&&(t=$(t)).length&&t.attr("dateParse")&&(r=window[t.attr("dateParse")]||r),e=r(e),e&&e.start&&(e=e.start),e}function w(e){var t;return e=e||new Date,t=new Date(e.getFullYear(),e.getMonth(),e.getDate()),t}function E(e){var t=new Date;return t.setTime(e.getTime()),t}function S(e,t){return[e.getFullYear(),e.getMonth(),e.getDate()].join()===[t.getFullYear(),t.getMonth(),t.getDate()].join()}function x(e,t){return[e.getFullYear(),e.getMonth()].join()===[t.getFullYear(),t.getMonth()].join()}function T(e,t){var n=[],r=!1,i=0,s;n=k(e.getFullYear()),e=e.getTime(),t=t.getTime();for(i=0,s=n.length;i<s;i++)if(e>=n[i].start&&e<=n[i].end&&t>=n[i].start&&t<=n[i].end)return console.log(i,e,n[i]),!0;return r}function N(e,t){var n=[],r=!1,i=0,s;if(!C(e,t))return!1;n=L(e.getFullYear()),e=e.getTime(),t=t.getTime();for(i=0,s=n.length;i<s;i++)if(e>=n[i].start&&e<=n[i].end&&t>=n[i].start&&t<=n[i].end)return!0;return r}function C(e,t){return e.getFullYear()===t.getFullYear()}function k(e,t){var n=[],r,i=1,t=t||0,e=parseInt(e,10),s=new Date(e,0,1);s.getDay()>1&&s.setDate(s.getDate()-s.getDay()+7),s.getDay()===0&&s.setDate(s.getDate()+1),t>0&&(t=(new Date(2e3,1,2)-new Date(2e3,1,1))*t);while(s.getFullYear()<=e){r={week:i++,start:null,end:null},r.start=s.getTime()+t,s.setDate(s.getDate()+6),r.end=s.getTime()+t,s.setDate(s.getDate()+1);if(s.getFullYear()>e){s=new Date(s.getFullYear(),0,1);if(s.getDay()<2)break}n.push(r)}return n}function L(e){var t=[],e=parseInt(e,10);return t.push({start:w(new Date(e,0,1)),end:w(new Date(e,2,31)),season:1},{start:w(new Date(e,3,1)),end:w(new Date(e,5,30)),season:2},{start:w(new Date(e,6,1)),end:w(new Date(e,8,30)),season:3},{start:w(new Date(e,9,1)),end:w(new Date(e,11,31)),season:4}),t}function A(e){var t,n=new Date(e.getFullYear(),e.getMonth()+1);return n.setDate(n.getDate()-1),t=n.getDate(),t}function O(){var e=document.getElementsByTagName("script"),e=e[e.length-1],t=e.getAttribute("src");return/\//.test(t)?(t=t.split("/"),t.pop(),t=t.join("/")+"/"):/\\/.test(t)&&(t=t.split("\\"),t.pop(),t=t.join("\\")+"/"),t}function M(e,t,n,r,i){var s=new Date,o,t=t||200,n=n||0,t=t-n,u=0,a,r=r||200,i=i||2,f=setInterval(function(){o=new Date-s,u=o/r*t,u,u>=t&&(u=t,a=!0,clearInterval(f)),e&&e(u+n,a)},i);return f}function _(e){return typeof e=="string"&&(e=e.replace(/[\s]/g,"").toLowerCase(),!e||e!="false"&&e!="0"&&e!="null"&&e!="undefined"?e&&(e=!0):e=!1),!!e}function D(e,t,n){n=n||document;var r=/Firefox/i.test(navigator.userAgent)?"DOMMouseScroll":"mousewheel";n.attachEvent&&(r="on"+r),t?(n.detachEvent&&document.detachEvent(r,e),n.removeEventListener&&document.removeEventListener(r,e)):(n.attachEvent&&document.attachEvent(r,e),n.addEventListener&&document.addEventListener(r,e))}function P(e,t){e=$(e);var n;if(t){while((e=e.parent()).length)if(e.is(t)){n=e;break}}else n=e.parent();return n}function H(e,t,n){e&&(e=$(e));if(/\,/.test(t)){var r=[],i;return t=t.split(","),$.each(t,function(t,s){s=s.trim(),i=H(e,s,n),i&&i.length&&i.each(function(){r.push($(this))})}),$(r)}var s=/^([\/]+)/,o=/^([\|]+)/,u=/^([<\(]+)/;if(s.test(t))return t=t.replace(s,function(t,r){for(var i=0,s=r.length;i<s;i++)e=e.parent();return n=e,""}),t=t.trim(),t?n.find(t):n;if(o.test(t))return t=t.replace(o,function(t,r){for(var i=1,s=r.length;i<s;i++)e=e.parent();return n=e,""}),t=t.trim(),t?n.find(t):n;if(u.test(t)){t=t.replace(u,"").trim();if(t){if(/[\s]/.test(t)){var a;return t.replace(/^([^\s]+)([\s\S]+)/,function(t,n,r){a=P(e,n).find(r.trim())}),a||t}return P(e,t)}return e.parent()}return n?n.find(t):jQuery(t)}function B(e){var t="";return e&&(e=$(e)).length&&(t=e.html().trim().replace(/[\r\n]/g,"")),t}function j(e){var t=/^function\s+([^()]+)[\s\S]*/,n="",r=e.toString();return t.test(r)&&(n=r.replace(t,"$1")),n.trim()}function F(e){e=$(e||document);if(!(e&&e.length&&window.JC))return;JC.AutoSelect&&JC.AutoSelect(e),JC.Calendar&&JC.Calendar.initTrigger(e),JC.DCalendar&&JC.DCalendar.init&&JC.DCalendar.init(e),JC.AutoChecked&&JC.AutoChecked(e),JC.AjaxUpload&&JC.AjaxUpload.init(e),JC.Placeholder&&JC.Placeholder.init(e),JC.TableFreeze&&JC.TableFreeze.init(e),JC.Drag&&JC.Drag.init(e),JC.ImageCutter&&JC.ImageCutter.init(e);if(!window.Bizs)return;Bizs.DisableLogic&&Bizs.DisableLogic.init(e),Bizs.FormLogic&&Bizs.FormLogic.init(e),Bizs.MoneyTips&&Bizs.MoneyTips.init(e),Bizs.AutoSelectComplete&&Bizs.AutoSelectComplete.init(e)}function I(e){e=e||"";var t=e,n,r,i,s;if(/^URL/.test(e)){n=e.replace(/^URL/,"").replace(/[\s]*,[\s]*/g,",").trim().split(","),e=location.href;var a={},f=[];if(n.length){for(r=0,i=n.length;r<i;r++)/\&/.test(n[r])?f=f.concat(n[r].split("&")):f=f.concat(n[r]);n=f}for(r=0,i=n.length;r<i;r++){s=n[r].replace(/[\s]+/g,"").split("=");if(!s[0])continue;a[s[0]]=s[1]||""}e=o(e,a),t=e}return t=u(e),t}function q(e){var t=null,n=/^now/i,r=/^nowfirst/,i,s,o;if(e&&typeof e=="string")if(n.test(e)||r.test(e)){i=new Date,r.test(e)&&i.setDate(1),e=e.replace(n,"").replace(/[\s]+/g,""),s=e.split(",");var u=/d$/i,a=/w$/i,f=/m$/i,l=/y$/i;for(var c=0,h=s.length;c<h;c++){o=s[c]||"";if(!o)continue;o=o.replace(/[^\-\ddwmy]+/gi,""),u.test(o)?(o=parseInt(o.replace(u,""),10),o&&i.setDate(i.getDate()+o)):a.test(o)?(o=parseInt(o.replace(a,""),10),o&&i.setDate(i.getDate()+o*7)):f.test(o)?(o=parseInt(o.replace(f,""),10),o&&i.setMonth(i.getMonth()+o)):l.test(o)&&(o=parseInt(o.replace(l,""),10),o&&i.setFullYear(i.getFullYear()+o))}t=i}else t=y(e);return t}function R(e,t,n,r){var i="0.00";!t&&(t=3),typeof n=="undefined"&&(n=2),!r&&(r=","),typeof e=="number"&&(e=v(e,n));if(typeof e=="string"){e=e.replace(/[,]/g,"");if(!/^[\d\.]+$/.test(e))return i;if(e.split(".").length>2)return i}if(!e)return i;e+="",e=e.replace(/[^\d\.]/g,"");var s=e.split("."),o=[];while(s[0].length>t){var u=s[0].slice(s[0].length-t,s[0].length);o.push(u),s[0]=s[0].slice(0,s[0].length-t)}return o.push(s[0]),s[0]=o.reverse().join(r),n?(!s[1]&&(s[1]=""),s[1]+=(new Array(n+1)).join("0"),s[1]=s[1].slice(0,n)):s.length>1&&s.pop(),s.join(".")}function U(e,t){typeof e=="string"&&(t=e,e=new Date),!e&&(e=new Date),!t&&(t="YY-MM-DD");var n=t,r,i=["january","february","march","april","may","june","july","august","september","october","november","december"],s=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];return n=n.replace(/YY/g,e.getFullYear()).replace(/WK/g,function(){var t=1,n=0,r;return JC.Calendar&&(n=JC.Calendar.weekDayOffset),r=k(e.getFullYear(),JC.Calendar.weekDayOffset),$(r).each(function(n,r){if(e.getTime()>=r.start&&e.getTime()<=r.end)return t=r.week,!1}),t}).replace(/YQ/g,function(){var t=1,n=0,r;return r=L(e.getFullYear()),$(r).each(function(n,r){if(e.getTime()>=r.start&&e.getTime()<=r.end)return t=r.season,!1}),t}).replace(/MM/g,m(e.getMonth()+1)).replace(/DD/g,m(e.getDate())).replace(/yy/g,function(t){return r=m(e.getYear()),r.slice(r.length-2)}).replace(/mm/g,e.getMonth()+1).replace(/dd/g,e.getDate()).replace(/d/g,e.getDate()).replace(/y/g,e.getFullYear()).replace(/m/g,function(t){return i[e.getMonth()]}).replace(/M/g,function(t){return s[e.getMonth()]}),n}function z(e,t,n){typeof n=="undefined"&&(n=!0);if(e&&t)for(var r in t)n?e[r]=t[r]:r in e||(e[r]=t[r]);return e}function W(e,t,n,r){if(typeof e=="undefined")return;t=$(t||(window.TIMEOUT_HOST=window.TIMEOUT_HOST||{})),n=n||"NORMAL",typeof e=="function"&&(e=setTimeout(e,r||50)),t.data(n)&&clearTimeout(t.data(n)),t.data(n,e)}function X(e){e&&(e=$(e));var t;return e&&e.length?(t=e.attr("validEncoder")||"encodeURIComponent",t=window[t]||encodeURIComponent):t=encodeURIComponent,t}function V(e,t){t=t||{};var n,r,i;for(n in e){t[n]=e[n];switch(Object.prototype.toString.call(t[n])){case"[object Object]":t[n]=t[n].constructor===Object?V(t[n]):t[n];break;case"[object Array]":t[n]=e[n].slice();for(r=0,i=t[n].length;r<i;r++)Object.prototype.toString.call(t[n][r])=="[object Object]"&&(t[n][r]=V(t[n][r]));break;case"[object Date]":t[n]=new Date,t[n].setTime(e[n].getTime());break;default:t[n]=e[n]}}return t}return!window.console&&(window.console={log:function(){window.status=t(arguments).join(" ")},dir:function(){}}),window.JC=window.JC||{},JC.log=function(){JC.debug&&console.log(t(arguments).join(" "))},JC.dir=function(e){JC.debug&&console.dir(e)},JC.PATH=JC.PATH||O(),window.Bizs=window.Bizs||{},JC.common=JC.f={addUrlParams:o,cloneDate:E,dateDetect:q,delUrlParam:l,delUrlParams:c,easyEffect:M,filterXSS:u,formatISODate:g,funcName:j,getJqParent:P,getUrlParam:a,getUrlParams:f,hasUrlParam:s,urlHostName:n,httpRequire:h,isSameDay:S,isSameWeek:T,isSameMonth:x,isSameSeason:N,isSameYear:C,weekOfYear:k,seasonOfYear:L,jcAutoInitComps:F,maxDayOfMonth:A,mousewheelEvent:D,padChar:m,parentSelector:H,parseBool:_,parseFinance:v,parseISODate:y,parseDate:b,printf:i,cloneObject:V,pureDate:w,reloadPage:d,removeUrlSharp:p,relativePath:r,scriptContent:B,scriptPath:O,sliceArgs:t,urlDetect:I,moneyFormat:R,dateFormat:U,extendObject:z,safeTimeout:W,encoder:X,fixPath:e,backward:function(e){if(window.JC_BACKWARD||e)for(var t in JC.common){if(t=="backward")continue;window[t]=window[t]||JC.common[t]}},has_url_param:s,add_url_params:o,get_url_param:a,del_url_param:l,reload_page:d,parse_finance_num:v,pad_char_f:m,script_path_f:O},JC.f.backward(),!String.prototype.trim&&(String.prototype.trim=function(){return $.trim(this)}),window.ZINDEX_COUNT=window.ZINDEX_COUNT||50001,function(){if(!window.jQuery)return;var e=$.fn.val;$.fn.val=function(){var t=e.apply(this,arguments),n=this;return arguments.length&&(this.prop("nodeName")||"").toLowerCase()=="input"&&(this.attr("type")||"").toLowerCase()=="hidden"&&setTimeout(function(){n.trigger("change")},1),t}}(),JC.f})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);