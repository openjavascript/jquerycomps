(function(b,a){b(["JC.BaseMVC","plugins.json2"],function(){JC.use&&!window.JSON&&JC.use("plugins.json2");JC.AjaxTree=c;function c(d){d&&(d=$(d));if(JC.BaseMVC.getInstance(d,c)){return JC.BaseMVC.getInstance(d,c)}JC.BaseMVC.getInstance(d,c,this);this._model=new c.Model(d);this._view=new c.View(this._model);this._init()}c.init=function(d){var e=[];d=$(d||document);if(d.length){if(d.hasClass("js_compAjaxTree")){e.push(new c(d))}else{d.find("div.js_compAjaxTree").each(function(){e.push(new c(this))})}}return e};JC.BaseMVC.build(c);c.dataFilter;JC.f.extendObject(c.prototype,{_beforeInit:function(){},_initHanlderEvent:function(){var d=this,e;d.on("inited",function(){e=d._model.parseInitData();e&&d.trigger("update_init_data",[e])});d.on("update_init_data",function(f,g){if(!g){return}d._model.data(g);if(!(d._model.data()&&d._model.root())){return}d._view._process(d._model.child(d._model.root()[d._model.idIndex()]),d._view._initRoot());d.trigger("AT_OPEN_FOLDER")});d.on("AT_OPEN_FOLDER",function(){var f=(JC.f.getUrlParam(d._model.urlArgName())||"").trim(),g;if(!f){return}g=d.triggerHandler("AT_PROCESS_ID",[f]);if(!g.length){return}d.trigger("AT_OPEN_ALL_FOLDER",[g,0])});d.on("AT_OPEN_ALL_FOLDER",function(f,i,j){if(j>=i.length){d.openUI(i.last());return}var h=i[j],g=d.selector().find(JC.f.printf("div.node_ctn[data-id={0}]",h)),k;if(!(g&&g.length)){return}d._view.openFolder(h,function(){d.trigger("AT_OPEN_ALL_FOLDER",[i,++j])})});d.on("AT_PROCESS_ID",function(f,g){var h=[];typeof g!="string"&&(g=g.toString());g=(g||"").replace(/[\s]+/g,"");g&&(h=g.split(","));return h})},_inited:function(){this.trigger("inited")},open:function(e){var d=this;if(typeof e=="undefined"){d._view.openAll();return d}var f=d.triggerHandler("AT_PROCESS_ID",[e]);if(f.length){d.trigger("AT_OPEN_ALL_FOLDER",[f,0])}return d},openUI:function(d){if(typeof d=="undefined"){this._view.openAll();return this}this._view.openUI(d);return this},close:function(d){if(typeof d=="undefined"){this._view.closeAll();return this}this._view.close(d);return this},idPrefix:function(){return this._model.idPrefix()},getItem:function(d){var e;d&&(e=$("#"+this._model.id(d)));return e},selectedItem:function(d){return this._view.selectedItem(d)},highlight:function(){return this.selectedItem.apply(this,JC.f.sliceArgs(arguments))}});c.Model._instanceName="JCAjaxTreeIns";c.Model._insCount=1;JC.f.extendObject(c.Model.prototype,{init:function(){this._data;this._id=JC.f.printf("tree_{0}_{1}_",new Date().getTime(),c.Model._insCount++);this._highlight;this._events={}},parseInitData:function(){var d=this,e;if(d.is("[data-cajScriptData]")){e=d.scriptDataProp("data-cajScriptData")}else{if(d.is("[data-cajData]")){e=d.windowProp("data-cajData");e&&(e=$.parseJSON(JSON.stringify(e)))}}e&&(e.data=e.data||{});return e},idIndex:function(){if(typeof this._idIndex=="undefined"){this._idIndex=this.attrProp("data-idIndex")||1}return this._idIndex},nameIndex:function(){if(typeof this._nameIndex=="undefined"){this._nameIndex=this.attrProp("data-nameIndex")||2}return this._nameIndex},typeIndex:function(){if(typeof this._typeIndex=="undefined"){this._typeIndex=this.attrProp("data-typeIndex")||0}return this._typeIndex},selector:function(){return this._selector},id:function(d){return this._id+d},idPrefix:function(){return this._id},data:function(d){if(typeof d!="undefined"){this._data=d;c.dataFilter&&(this._data=c.dataFilter(this._data))}return this._data},root:function(){return this._data.root},child:function(d){return this._data.data[d]},hasChild:function(d){return d in this._data.data},highlight:function(d){d&&(this._highlight=$(d));return this._highlight},urlArgName:function(){var d=this.attrProp("data-urlArgName")||"tree_node";return d},getNodeById:function(d){var e=null;if(d){e=$("#"+this.id(d))}return e},getDataByAjax:function(d){var e={};var f=this.data().url+"?id="+d;$.ajax({type:"GET",url:f,dataType:"json",success:function(g){console.log(g);e=g}});return e}});JC.f.extendObject(c.View.prototype,{init:function(){return this},_process:function(k,l){var e=this;if(!(k&&k.length)){return}for(var h=0,f=k.length,g,d;h<f;h++){g=k[h];d=h===f-1;if("folder"==g[e._model.typeIndex()]){this._initFolder(l,g,d)}else{this._initFile(l,g,d)}}},_initRoot:function(){var d=this;if(!d._model.data().root){return}var g,j,i,f,e,h;g=d._model.data().root;j=$('<ul class="tree_wrap"></ul>');i=this._initLabel(g);if(!(g[d._model.idIndex()] in (d._model.data().data||{}))){f=$('<li class="folder_closed"></li>');e=$('<span class="folder_img_root folderRoot folder_img_closed">&nbsp;</span>')}else{f=$('<li class="folder_open"></li>');e=$('<span class="folder_img_root folderRoot folder_img_open">&nbsp;</span>')}e.appendTo(f);i.appendTo(f);e.on("click",function(k){d.folderClick(g[d._model.idIndex()])});f.appendTo(j);j.appendTo(d._model.selector());this.selector(j);h=$('<ul style="" class="tree_wrap_inner"></ul>');h.appendTo(f);return h},_initFolder:function(h,e,i){var d=this,g="",l="";i&&(g="folder_span_lst ",l="folder_last");var j=this._initLabel(e);var m=$(JC.f.printf('<span class="folder_img_closed folder {1}">&nbsp;</span>',e[d._model.nameIndex()],g));var f=$("<li></li>");f.addClass(JC.f.printf("folder_closed {0} folder",l));m.appendTo(f);j.appendTo(f);var k=$('<ul style="display:none;" class="folder_ul_lst" ></ul>');$(m).on("click",function(n){d.folderClick(e[d._model.idIndex()])});k.appendTo(f);f.appendTo(h);this._process(this._model.child(e[d._model.idIndex()]),k)},_initFile:function(k,h,e){var d=this,g="folder_img_bottom ",i="";e&&(g="folder_img_last ",i="");var j=this._initLabel(h);var f=$(JC.f.printf('<li><span class="{1}file">&nbsp;</span></li>',h[d._model.nameIndex()],g));f.addClass("folder_closed file");j.appendTo(f);f.appendTo(k)},_initLabel:function(e){var d=this,f=$('<div class="node_ctn"></div>');f.attr("id",this._model.id(e[d._model.idIndex()])).attr("data-id",e[d._model.idIndex()]).attr("data-name",e[d._model.nameIndex()]).attr("data-type",e[d._model.typeIndex()]||"").data("nodeData",e);f.html(e[d._model.nameIndex()]||"没有标签");d.notification("renderItem",[f,e]);return f},openAll:function(){if(!this.selector()){return}this.selector().find("span.folder_img_closed").each(function(){$(this).trigger("click")})},closeAll:function(){if(!this.selector()){return}this.selector().find("span.folder_img_open, span.folder_img_root").each(function(){if($(this).hasClass("folder_img_closed")){return}$(this).trigger("click")})},openUI:function(f){var d=this;var e=d._model.getNodeById(f);if(!e.length){return}var g=e.parents("li");this.selectedItem(e);g.each(function(){var h=$(this),i=h.find("> span.folderRoot, > span.folder");if(i.length){if(i.hasClass("folder_img_open")){return}i.trigger("click")}})},selectedItem:function(d){d&&(d=$(d));if(!(d&&d.length)){return this._model.highlight()}if(this._model.highlight()){this._model.highlight().removeClass("highlight").removeClass("selectedAjaxTreeNode")}d.addClass("highlight").addClass("selectedAjaxTreeNode");this._model.highlight(d);return d},close:function(f){var d=this;var e=d._model.getNodeById(f);if(!e.length){return}var g=e.parent("li").find("> span.folderRoot, > span.folder");if(g.length){if(g.hasClass("folder_img_closed")){return}g.trigger("click")}},nodeImgClick:function(g){var e=this,h=e._model.getNodeById(g),d=h.siblings("span"),i=h.parent("li"),k=i.find("> ul");var f=JC.f.getJqParent(h,"div.js_compAjaxTree"),j=f.data(c.Model._instanceName);if(!j){return}if(d.hasClass("folder_img_open")){d.removeClass("folder_img_open").addClass("folder_img_closed");k.hide()}else{if(d.hasClass("folder_img_closed")){d.addClass("folder_img_open").removeClass("folder_img_closed");k.show()}}if(i.hasClass("folder_closed")){i.addClass("folder_open").removeClass("folder_closed")}else{if(i.hasClass("folder_open")){i.removeClass("folder_open").addClass("folder_closed")}}},folderClick:function(e){var d=this,h=d._model,f=h.getNodeById(e),g=f.parent("li");if(g.hasClass("folder_open")){d.nodeImgClick(e)}else{d.openFolder(e)}},openFolder:function(j,m){var d=this,i=d._model,l=i.getNodeById(j),k=l.parent("li"),f=l.siblings("span"),e=l.siblings("ul"),g=(l.attr("data-type")||"file");if(g=="file"){m&&m();return}if(e.data("inited")||e.children("li").length>0){d.nodeImgClick(j);m&&m()}else{f.removeClass("folder_img_closed").addClass("folder_img_loading");e.data("inited",true);var h=i.data().url;if(!h){return}h+="?id="+j;$.ajax({type:"GET",url:h,dataType:"json",success:function(n){k.addClass("folder_open").removeClass("folder_closed");f.removeClass("folder_img_loading").addClass("folder_img_open");d._process(n.data,e.show());m&&m()}})}},showDataLoading:function(d){d.siblings("span").removeClass("folder_img_closed").addClass("folder_img_loading")}});c.lastHover=null;JDOC.delegate(".js_compAjaxTree ul.tree_wrap div.node_ctn","mouseenter",function(){if(c.lastHover){c.lastHover.removeClass("ms_over")}$(this).addClass("ms_over");c.lastHover=$(this)});JDOC.delegate(".js_compAjaxTree ul.tree_wrap div.node_ctn","mouseleave",function(){if(c.lastHover){c.lastHover.removeClass("ms_over")}});JDOC.delegate(".js_compAjaxTree ul.tree_wrap div.node_ctn a[href]","click",function(h){var e=$(this),d=(e.attr("href")||"").trim().replace(/[\s]+/g,""),k,i,g,j,f;if(/^(javascript\:|#)/.test(d)){return}i=JC.f.getJqParent(e,"div.node_ctn");if(!(i&&i.length)){return}g=JC.f.getJqParent(e,".js_compAjaxTree");if(!(g&&g.length)){return}j=JC.BaseMVC.getInstance(g,JC.AjaxTree);if(!j){return}k=JWIN.triggerHandler("AJAXTREE_GET_PARENT_LIST",[i]);f={};f[j._model.urlArgName()]=k.join(",");e.attr("href",JC.f.addUrlParams(d,f))});JWIN.on("AJAXTREE_GET_PARENT_LIST",function(f,g,h){h=h||[];g=$(g);var d,e;h.unshift(g.attr("data-id"));d=JC.f.getJqParent(g,"ul");if(d&&d.length&&(d.is(".folder_ul_lst")||d.is(".tree_wrap_inner"))){e=d.prev("div.node_ctn");if(e&&e.length){JWIN.trigger("AJAXTREE_GET_PARENT_LIST",[e,h])}}return h});JDOC.delegate(".js_compAjaxTree ul.tree_wrap div.node_ctn","click",function(f){var d=$(this),e=JC.f.getJqParent(d,".js_compAjaxTree"),j=e.data(c.Model._instanceName),h,g,i=true;if(!j){return}j.open(d.attr("data-id"));if(e.data("AT_PRESELECTED_ID")==d.attr("data-id")){}else{e.data("AT_PRESELECTED_ID",d.attr("data-id"));e.trigger("change",[d,d.data("nodeData"),e])}});JDOC.ready(function(){JC.f.safeTimeout(function(){c.autoInit&&c.init()},null,"JCAjaxTreeInit",1)});return JC.AjaxTree})}(typeof define==="function"&&define.amd?define:function(b,a,c){typeof b=="function"&&(c=b);typeof a=="function"&&(c=a);c&&c()},window));