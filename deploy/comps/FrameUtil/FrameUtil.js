(function(b,a){b(["JC.common"],function(){var d=$(document),c=$(window),e;JC.FrameUtil=e={noticeSize:function(h,f){typeof h=="undefined"&&(h=1000);f=e.type(f);if(!f){return e}if(!e.parent()){return e}var g={type:f};e.parent().jEventHost.trigger("size",[e.getInfo(g)]);h&&setInterval(function(){e.parent().jEventHost.trigger("size",[e.getInfo(g)])},h);return e},subscribeEvent:function(f,g){if(!f){return e}$(e.eventHost).on(f,g);return e},noticeData:function(g,f){f=e.type(f);if(!(g&&f)){return e}if(!e.parent()){return e}e.parent().jEventHost.trigger("data",e.getInfo({data:g,type:f}));return e},noticeClose:function(f){f=e.type(f);e.parent().jEventHost.trigger("close",e.getInfo({type:f}));return e},parent:function(){var f;if(window.parent&&window.parent!=window&&window.parent.$&&window.parent.JC&&window.parent.JC.FrameUtil){f={win:window.parent,jwin:window.parent.$(window.parent),"$":window.parent.$,JC:window.parent.JC,FrameUtil:window.parent.JC.FrameUtil,eventHost:window.parent.JC.FrameUtil.eventHost,jEventHost:window.parent.$(window.parent.JC.FrameUtil.eventHost)}}return f},getInfo:function(f){var h=$(document.body),g={"$":$,width:document.documentElement.offsetWidth,height:document.documentElement.offsetHeight,bodyWidth:h.width(),bodyHeight:h.height()};f&&(g=JC.f.extendObject(g,f));return g},type:function(f,g){if(!f){f=JC.f.getUrlParam("jsAction");f&&g&&(f+=g)}return f},eventHost:{}};return JC.FrameUtil})}(typeof define==="function"&&define.amd?define:function(b,a,c){typeof b=="function"&&(c=b);typeof a=="function"&&(c=a);c&&c()},window));