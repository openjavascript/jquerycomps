(function(e,t){e(["JC.common","JC.Tree"],function(){function e(e,t,n){this._tree=new JC.Tree(e,t),this._getSelected=n}return JC.use&&!JC.Tree&&JC.use("JC.Tree"),Bizs.MultiSelectTree=e,e.prototype={expandChild:function(e){var t=$(e.target),n=t.attr("dataid");if(this._tree._model.hasChild(n)){this._tree._view.open(n);var r=this._tree._model.child(n);for(var i=0;i<r.length;i++)this.expandChild(r[i][0])}},foldChild:function(e){var t=$(e.target),n=t.attr("dataid");this._tree._view.close(n)},autoCheck:function(e){if(e.attr("dataid")==this._tree._model.root()[0])return;var t=JC.f.getJqParent(e,"ul"),n=t.find("input.js_checkbox:not(:checked)").length,r=t.prev().find("input.js_checkbox").eq(0);n===0?(r[0].checked=!0,this.autoCheck(r)):(r[0].checked=!1,this.autoCheck(r))},update:function(e){var t=$(e.target);if(t[0].checked){var n=t.parent().next().find("input.js_checkbox");for(var r=0;r<n.length;r++)n[r].checked=!0}else{var n=t.parent().next().find("input.js_checkbox");for(var r=0;r<n.length;r++)n[r].checked=!1}this.autoCheck(t);var i=[];this._tree._model._container.find("input.js_checkbox:checked").each(function(){i.push($(this).attr("dataid"))}),this._getSelected(i,this._tree)},init:function(){this._tree._model._container.delegate("input.js_checkbox:checked","click",this.expandChild.bind(this)),this._tree._model._container.delegate("input.js_checkbox:not(:checked)","click",this.foldChild.bind(this)),this._tree.on("RenderLabel",function(e){var t=$(this);t.html(JC.f.printf('<input type="checkbox" class="js_checkbox" dataid="{0}">{1}</a>',e[0],e[1]))}),this._tree.on("change",this.update.bind(this)),this._tree.init()}},JC.MultiSelectTree})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);