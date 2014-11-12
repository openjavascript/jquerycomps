/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */

(function(e){typeof define=="function"&&define.amd?define([],e):typeof exports=="object"?e(require("jquery")):e(jQuery)})(function(){function t(e){return o.raw?e:encodeURIComponent(e)}function n(e){return o.raw?e:decodeURIComponent(e)}function r(e){return t(o.json?JSON.stringify(e):String(e))}function i(t){t.indexOf('"')===0&&(t=t.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return t=decodeURIComponent(t.replace(e," ")),o.json?JSON.parse(t):t}catch(n){}}function s(e,t){var n=o.raw?e:i(e);return $.isFunction(t)?t(n):n}var e=/\+/g,o=$.cookie=function(e,i,u){if(i!==undefined&&!$.isFunction(i)){u=$.extend({},o.defaults,u);if(typeof u.expires=="number"){var a=u.expires,f=u.expires=new Date;f.setTime(+f+a*864e5)}return document.cookie=[t(e),"=",r(i),u.expires?"; expires="+u.expires.toUTCString():"",u.path?"; path="+u.path:"",u.domain?"; domain="+u.domain:"",u.secure?"; secure":""].join("")}var l=e?undefined:{},c=document.cookie?document.cookie.split("; "):[];for(var h=0,p=c.length;h<p;h++){var d=c[h].split("="),v=n(d.shift()),m=d.join("=");if(e&&e===v){l=s(m,i);break}!e&&(m=s(m))!==undefined&&(l[v]=m)}return l};o.defaults={},$.removeCookie=function(e,t){return $.cookie(e)===undefined?!1:($.cookie(e,"",$.extend({},t,{expires:-1})),!$.cookie(e))}});