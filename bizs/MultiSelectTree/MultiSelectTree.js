;(function(define, _win) { 'use strict'; define( [ 'JC.common', 'JC.Tree' ], function(){
/**
 * MultiSelect<br />
 * 多选树<br/>
 * 基于JC.Tree的扩展<br />
 *
 *  <p><b>require</b>:
 *      <a href='JC.common.html'>JC.common</a>
 *      , <a href='JC.Tree.html'>JC.Tree</a>
 *  </p>
 *
 *  <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *      | <a href='http://jc.openjavascript.org/docs_api/classes/Bizs.MultiSelectTree.html' target='_blank'>API docs</a>
 *      | <a href='../../bizs/MultiselectPanel/_demo' target='_blank'>demo link</a></p>
 *  
 * @namespace   window.Bizs
 * @class       MultiSelectTree
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2014-06-19
 * @author  sunlei <sunlei@360.cn> | 75 Team
 */
    JC.use && !JC.Tree && JC.use( 'JC.Tree' );
    Bizs.MultiSelectTree = MultiSelectTree

	function MultiSelectTree( _treeEle, _treeData, _cb, _renderTpl ){
		// init tree and callback
		this._tree = new JC.Tree( _treeEle, _treeData );
		this._getSelected = _cb;
        this._renderTpl = _renderTpl;
	}
	MultiSelectTree.prototype = {
        /**
         * explain~
         * @method expandChild
         * @param   {event} _evt
         */
		"expandChild" : function(_evt){
			var target = $(_evt.target);
			var dataid = target.attr('dataid');
			if(this._tree._model.hasChild(dataid)){
				this._tree._view.open(dataid);
				var children = this._tree._model.child(dataid);
				for(var i=0;i<children.length;i++){
					this.expandChild(children[i][0]);
				}
			}
		},
		"foldChild" : function(_evt){
			var target = $(_evt.target);
			var dataid = target.attr('dataid');
			this._tree._view.close(dataid);
		},
		"autoCheck" : function(target){
			if(target.attr("dataid") == this._tree._model.root()[0]){
				return;
			}
			var parent_ul = JC.f.getJqParent(target,"ul");
			var notCheckedCount = parent_ul.find('input.js_checkbox:not(:checked)').length;
			var parent_sel = parent_ul.prev().find('input.js_checkbox').eq(0);
			if(notCheckedCount === 0){
				parent_sel[0].checked = true;
				this.autoCheck(parent_sel);
			}
			else{
				parent_sel[0].checked = false;
				this.autoCheck(parent_sel);
			}
		},
		"update" : function(_evt){
			var target = $(_evt.target);
			if(target[0].nodeName.toLowerCase() !== 'input'){
				return;
			}  
			if(target[0].checked){
				var child = JC.f.getJqParent( target, 'div.node_ctn' ).next().find('input.js_checkbox');
				for(var i=0;i<child.length;i++){
					child[i].checked = true;
				}
			}
			else{
				var child = JC.f.getJqParent( target, 'div.node_ctn' ).next().find('input.js_checkbox');
				for(var i=0;i<child.length;i++){
					child[i].checked = false;
				}
			}
			this.autoCheck(target);
			
			// call getSelected callback
			var selectedArray = [];
			this._tree._model._container.find('input.js_checkbox:checked').each(function(){
				selectedArray.push($(this).attr("dataid"));
			});
			this._getSelected(selectedArray, this._tree);
		},
		"init" : function(){
            var _p = this;
			// add delegate
			this._tree._model._container.delegate('input.js_checkbox:checked', 'click', this.expandChild.bind(this));
			this._tree._model._container.delegate('input.js_checkbox:not(:checked)', 'click', this.foldChild.bind(this));
			
			// rewrite callback
			this._tree.on('RenderLabel', function( _data ){
				var _node = $(this);
				_node.html( JC.f.printf( _p._renderTpl 
                        || '<label dataid="{0}" dataname="{1}"><input type="checkbox" class="js_checkbox" dataid="{0}">{1}</label>'
                        , _data[0], _data[1] ) );
			});
			this._tree.on('change', this.update.bind(this));
			
			// triger tree init
			this._tree.init();
            return this._tree;
		}
        , tree: function(){ return this._tree; }
	};	

    return JC.MultiSelectTree;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
