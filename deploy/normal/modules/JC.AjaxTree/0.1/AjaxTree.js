(function(e,t){e(["JC.BaseMVC","plugins.json2"],function(){function e(t){t&&(t=$(t));if(JC.BaseMVC.getInstance(t,e))return JC.BaseMVC.getInstance(t,e);JC.BaseMVC.getInstance(t,e,this),this._model=new e.Model(t),this._view=new e.View(this._model),this._init()}return JC.use&&!window.JSON&&JC.use("plugins.json2"),JC.AjaxTree=e,e.init=function(t){var n=[];return t=$(t||document),t.length&&(t.hasClass("js_compAjaxTree")?n.push(new e(t)):t.find("div.js_compAjaxTree").each(function(){n.push(new e(this))})),n},JC.BaseMVC.build(e),e.dataFilter,JC.f.extendObject(e.prototype,{_beforeInit:function(){},_initHanlderEvent:function(){var e=this,t;e.on("inited",function(){t=e._model.parseInitData(),t&&e.trigger("update_init_data",[t])}),e.on("update_init_data",function(t,n){if(!n)return;e._model.data(n);if(!e._model.data()||!e._model.root())return;e._view._process(e._model.child(e._model.root()[e._model.idIndex()]),e._view._initRoot()),e.trigger("AT_OPEN_FOLDER")}),e.on("AT_OPEN_FOLDER",function(){var t=(JC.f.getUrlParam(e._model.urlArgName())||"").trim(),n;if(!t)return;n=e.triggerHandler("AT_PROCESS_ID",[t]);if(!n.length)return;e.trigger("AT_OPEN_ALL_FOLDER",[n,0])}),e.on("AT_OPEN_ALL_FOLDER",function(t,n,r){if(r>=n.length){e.openUI(n.last());return}var i=n[r],s=e.selector().find(JC.f.printf("div.node_ctn[data-id={0}]",i)),o;if(!s||!s.length)return;e._view.openFolder(i,function(){e.trigger("AT_OPEN_ALL_FOLDER",[n,++r])})}),e.on("AT_PROCESS_ID",function(e,t){var n=[];return typeof t!="string"&&(t=t.toString()),t=(t||"").replace(/[\s]+/g,""),t&&(n=t.split(",")),n})},_inited:function(){this.trigger("inited")},open:function(e){var t=this;if(typeof e=="undefined")return t._view.openAll(),t;var n=t.triggerHandler("AT_PROCESS_ID",[e]);return n.length&&t.trigger("AT_OPEN_ALL_FOLDER",[n,0]),t},openUI:function(e){return typeof e=="undefined"?(this._view.openAll(),this):(this._view.openUI(e),this)},close:function(e){return typeof e=="undefined"?(this._view.closeAll(),this):(this._view.close(e),this)},idPrefix:function(){return this._model.idPrefix()},getItem:function(e){var t;return e&&(t=$("#"+this._model.id(e))),t},selectedItem:function(e){return this._view.selectedItem(e)},highlight:function(){return this.selectedItem.apply(this,JC.f.sliceArgs(arguments))}}),e.Model._instanceName="JCAjaxTreeIns",e.Model._insCount=1,JC.f.extendObject(e.Model.prototype,{init:function(){this._data,this._id=JC.f.printf("tree_{0}_{1}_",(new Date).getTime(),e.Model._insCount++),this._highlight,this._events={}},parseInitData:function(){var e=this,t;return e.is("[data-cajScriptData]")?t=e.scriptDataProp("data-cajScriptData"):e.is("[data-cajData]")&&(t=e.windowProp("data-cajData"),t&&(t=$.parseJSON(JSON.stringify(t)))),t&&(t.data=t.data||{}),t},idIndex:function(){return typeof this._idIndex=="undefined"&&(this._idIndex=this.attrProp("data-idIndex")||1),this._idIndex},nameIndex:function(){return typeof this._nameIndex=="undefined"&&(this._nameIndex=this.attrProp("data-nameIndex")||2),this._nameIndex},typeIndex:function(){return typeof this._typeIndex=="undefined"&&(this._typeIndex=this.attrProp("data-typeIndex")||0),this._typeIndex},selector:function(){return this._selector},id:function(e){return this._id+e},idPrefix:function(){return this._id},data:function(t){return typeof t!="undefined"&&(this._data=t,e.dataFilter&&(this._data=e.dataFilter(this._data))),this._data},root:function(){return this._data.root},child:function(e){return this._data.data[e]},hasChild:function(e){return e in this._data.data},highlight:function(e){return e&&(this._highlight=$(e)),this._highlight},urlArgName:function(){var e=this.attrProp("data-urlArgName")||"tree_node";return e},getNodeById:function(e){var t=null;return e&&(t=$("#"+this.id(e))),t},getDataByAjax:function(e){var t={},n=this.data().url+"?id="+e;return $.ajax({type:"GET",url:n,dataType:"json",success:function(e){console.log(e),t=e}}),t}}),JC.f.extendObject(e.View.prototype,{init:function(){return this},_process:function(e,t){var n=this;if(!e||!e.length)return;for(var r=0,i=e.length,s,o;r<i;r++)s=e[r],o=r===i-1,"folder"==s[n._model.typeIndex()]?this._initFolder(t,s,o):this._initFile(t,s,o)},_initRoot:function(){var e=this;if(!e._model.data().root)return;var t,n,r,i,s,o;return t=e._model.data().root,n=$('<ul class="tree_wrap"></ul>'),r=this._initLabel(t),t[e._model.idIndex()]in(e._model.data().data||{})?(i=$('<li class="folder_open"></li>'),s=$('<span class="folder_img_root folderRoot folder_img_open">&nbsp;</span>')):(i=$('<li class="folder_closed"></li>'),s=$('<span class="folder_img_root folderRoot folder_img_closed">&nbsp;</span>')),s.appendTo(i),r.appendTo(i),s.on("click",function(n){e.folderClick(t[e._model.idIndex()])}),i.appendTo(n),n.appendTo(e._model.selector()),this.selector(n),o=$('<ul style="" class="tree_wrap_inner"></ul>'),o.appendTo(i),o},_initFolder:function(e,t,n){var r=this,i="",s="";n&&(i="folder_span_lst ",s="folder_last");var o=this._initLabel(t),u=$(JC.f.printf('<span class="folder_img_closed folder {1}">&nbsp;</span>',t[r._model.nameIndex()],i)),a=$("<li></li>");a.addClass(JC.f.printf("folder_closed {0} folder",s)),u.appendTo(a),o.appendTo(a);var f=$('<ul style="display:none;" class="folder_ul_lst" ></ul>');$(u).on("click",function(e){r.folderClick(t[r._model.idIndex()])}),f.appendTo(a),a.appendTo(e),this._process(this._model.child(t[r._model.idIndex()]),f)},_initFile:function(e,t,n){var r=this,i="folder_img_bottom ",s="";n&&(i="folder_img_last ",s="");var o=this._initLabel(t),u=$(JC.f.printf('<li><span class="{1}file">&nbsp;</span></li>',t[r._model.nameIndex()],i));u.addClass("folder_closed file"),o.appendTo(u),u.appendTo(e)},_initLabel:function(e){var t=this,n=$('<div class="node_ctn"></div>');return n.attr("id",this._model.id(e[t._model.idIndex()])).attr("data-id",e[t._model.idIndex()]).attr("data-name",e[t._model.nameIndex()]).attr("data-type",e[t._model.typeIndex()]||"").data("nodeData",e),n.html(e[t._model.nameIndex()]||"没有标签"),t.notification("renderItem",[n,e]),n},openAll:function(){if(!this.selector())return;this.selector().find("span.folder_img_closed").each(function(){$(this).trigger("click")})},closeAll:function(){if(!this.selector())return;this.selector().find("span.folder_img_open, span.folder_img_root").each(function(){if($(this).hasClass("folder_img_closed"))return;$(this).trigger("click")})},openUI:function(e){var t=this,n=t._model.getNodeById(e);if(!n.length)return;var r=n.parents("li");this.selectedItem(n),r.each(function(){var e=$(this),t=e.find("> span.folderRoot, > span.folder");if(t.length){if(t.hasClass("folder_img_open"))return;t.trigger("click")}})},selectedItem:function(e){return e&&(e=$(e)),!e||!e.length?this._model.highlight():(this._model.highlight()&&this._model.highlight().removeClass("highlight").removeClass("selectedAjaxTreeNode"),e.addClass("highlight").addClass("selectedAjaxTreeNode"),this._model.highlight(e),e)},close:function(e){var t=this,n=t._model.getNodeById(e);if(!n.length)return;var r=n.parent("li").find("> span.folderRoot, > span.folder");if(r.length){if(r.hasClass("folder_img_closed"))return;r.trigger("click")}},nodeImgClick:function(t){var n=this,r=n._model.getNodeById(t),i=r.siblings("span"),s=r.parent("li"),o=s.find("> ul"),u=JC.f.getJqParent(r,"div.js_compAjaxTree"),a=u.data(e.Model._instanceName);if(!a)return;i.hasClass("folder_img_open")?(i.removeClass("folder_img_open").addClass("folder_img_closed"),o.hide()):i.hasClass("folder_img_closed")&&(i.addClass("folder_img_open").removeClass("folder_img_closed"),o.show()),s.hasClass("folder_closed")?s.addClass("folder_open").removeClass("folder_closed"):s.hasClass("folder_open")&&s.removeClass("folder_open").addClass("folder_closed")},folderClick:function(e){var t=this,n=t._model,r=n.getNodeById(e),i=r.parent("li");i.hasClass("folder_open")?t.nodeImgClick(e):t.openFolder(e)},openFolder:function(e,t){var n=this,r=n._model,i=r.getNodeById(e),s=i.parent("li"),o=i.siblings("span"),u=i.siblings("ul"),a=i.attr("data-type")||"file";if(a=="file"){t&&t();return}if(u.data("inited")||u.children("li").length>0)n.nodeImgClick(e),t&&t();else{o.removeClass("folder_img_closed").addClass("folder_img_loading"),u.data("inited",!0);var f=r.data().url;if(!f)return;f+="?id="+e,$.ajax({type:"GET",url:f,dataType:"json",success:function(e){s.addClass("folder_open").removeClass("folder_closed"),o.removeClass("folder_img_loading").addClass("folder_img_open"),n._process(e.data,u.show()),t&&t()}})}},showDataLoading:function(e){e.siblings("span").removeClass("folder_img_closed").addClass("folder_img_loading")}}),e.lastHover=null,JDOC.delegate(".js_compAjaxTree ul.tree_wrap div.node_ctn","mouseenter",function(){e.lastHover&&e.lastHover.removeClass("ms_over"),$(this).addClass("ms_over"),e.lastHover=$(this)}),JDOC.delegate(".js_compAjaxTree ul.tree_wrap div.node_ctn","mouseleave",function(){e.lastHover&&e.lastHover.removeClass("ms_over")}),JDOC.delegate(".js_compAjaxTree ul.tree_wrap div.node_ctn a[href]","click",function(e){var t=$(this),n=(t.attr("href")||"").trim().replace(/[\s]+/g,""),r,i,s,o,u;if(/^(javascript\:|#)/.test(n))return;i=JC.f.getJqParent(t,"div.node_ctn");if(!i||!i.length)return;s=JC.f.getJqParent(t,".js_compAjaxTree");if(!s||!s.length)return;o=JC.BaseMVC.getInstance(s,JC.AjaxTree);if(!o)return;r=JWIN.triggerHandler("AJAXTREE_GET_PARENT_LIST",[i]),u={},u[o._model.urlArgName()]=r.join(","),t.attr("href",JC.f.addUrlParams(n,u))}),JWIN.on("AJAXTREE_GET_PARENT_LIST",function(e,t,n){n=n||[],t=$(t);var r,i;return n.unshift(t.attr("data-id")),r=JC.f.getJqParent(t,"ul"),r&&r.length&&(r.is(".folder_ul_lst")||r.is(".tree_wrap_inner"))&&(i=r.prev("div.node_ctn"),i&&i.length&&JWIN.trigger("AJAXTREE_GET_PARENT_LIST",[i,n])),n}),JDOC.delegate(".js_compAjaxTree ul.tree_wrap div.node_ctn","click",function(t){var n=$(this),r=JC.f.getJqParent(n,".js_compAjaxTree"),i=r.data(e.Model._instanceName),s,o,u=!0;if(!i)return;i.open(n.attr("data-id")),r.data("AT_PRESELECTED_ID")!=n.attr("data-id")&&(r.data("AT_PRESELECTED_ID",n.attr("data-id")),r.trigger("change",[n,n.data("nodeData"),r]))}),JDOC.ready(function(){JC.f.safeTimeout(function(){e.autoInit&&e.init()},null,"JCAjaxTreeInit",1)}),JC.AjaxTree})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);