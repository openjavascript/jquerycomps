
;( function( data ){
	if (typeof exports == "object" && typeof module == "object"){ // CommonJS
		module.exports = data();
	} else if (typeof define == "function" && define.amd){ // AMD
		return define([], data);
	} else {
		this.compsData = data();
	}
} )( function(){

	var datas = {

		basePath : '../../tpl/demo/'
		
		, demoPage : '_demo.html'
		
		, detailPage : '_detail.html'

		, extraMenu : [ 
			{
				name : 'API'
				, url : 'http://jc2.openjavascript.org/docs_api/index.html'
			}
			, {
				name : 'Download'
				, url : 'http://github.com/openjavascript/jquerycomps/archive/requirejs_master.zip'
			}
		]
		, websiteLink: [
			{
				name : '奇舞团'
				, url : 'http://qiwoo.org/'
			}
			, {
				name : '邱少伟'
				, url : 'http://btbtd.org/'
			}
		]
		, compsList: [ 
			{
				name : 'Base'
				, desc : [
					'JqueryComps（JC）组件是一个扩展性强灰常NB的组件'
					, 'Base是JqueryComps（JC）组件的核心部分，也是组件的基础底层支持,Base是JqueryComps（JC）组件的核心部分，也是组件的基础底层支持'
				]
				, list : [ 
					{ 
						name : 'JC.BaseMVC'
						, subtitle : '类chm索引提示'
						, version : '0.1'
						, require : []
						, api : ''
						, download : ''
						, nodemo : 'true'
						, desc : [
							'响应式初始化, 当鼠标移动到 Tab 时, Tab 会尝试自动初始化 class = ".js_autoTab" 的 HTML 标签响应式初始化, 当鼠标移动到 Tab 时, Tab 会尝试自动初始化 class = ".js_autoTab" 的 HTML 标签'
							, '需要手动初始化, 请使用: var _ins = new JC.Tab( _tabSelector );'
						]
					}
					, { 
						name : 'JC.Common'
						, subtitle : '类chm索引提示'
						, version : '0.1'
						, require : []
						, api : ''
						, download : ''
						, desc : [
							'响应式初始化, 当鼠标移动到 Tab 时, Tab 会尝试自动初始化 class = ".js_autoTab" 的 HTML 标签'
							, '需要手动初始化, 请使用: var _ins = new JC.Tab( _tabSelector );'
						]
					}
				]
			}
			, {
				name : 'JC'
				, desc : [
					'JqueryComps（JC）组件是一个扩展性强灰常NB的组件'
					, 'Base是JqueryComps（JC）组件的核心部分，也是组件的基础底层支持,Base是JqueryComps（JC）组件的核心部分，也是组件的基础底层支持'
				]
				, list : [
					{ 
					  	name : 'JC.AjaxTree'
					  	, subtitle : 'AJAX树菜单组件'
					  	, version : '0.1'
					  	, history : true
					  	, require : []
					  	, api : 'http://jc2.openjavascript.org/docs_api/classes/JC.AjaxTree.html'
					  	, download : 'http://github.com/openjavascript/jquerycomps/archive/requirejs_master.zip'
					  	, require : [
					  		{ name : 'JC.BaseMVC', version : '0.1' }
					  		, { name : 'Json2', version : '0.1' }
					  	]
					  	, desc : [
							'JC.AjaxTree AJAX树菜单组件'
							, '响应式初始化, 当光标焦点 foucs 到 文本框时, 会检查是否需要自动初始化 JC.AutoComplete 实例'
						]
					}
					,{ 
					  	name : 'JC.AjaxTree'
					  	, subtitle : 'AJAX树菜单组件'
					  	, version : '0.2'
					  	, require : []
					  	, api : 'http://jc2.openjavascript.org/docs_api/classes/JC.AjaxTree.html'
					  	, download : 'http://github.com/openjavascript/jquerycomps/archive/requirejs_master.zip'
					  	, require : [
					  		{ name : 'JC.BaseMVC', version : '0.1' }
					  		, { name : 'Json2', version : '0.1' }
					  	]
					  	, desc : [
							'JC.AjaxTree AJAX树菜单组件'
							, '响应式初始化, 当光标焦点 foucs 到 文本框时, 会检查是否需要自动初始化 JC.AutoComplete 实例'
						]
					}
					, { 
					  	name : 'JC.AutoComplete'
					  	, subtitle : '类chm索引提示'
					  	, version : '0.1'
					  	, require : []
					  	, api : ''
					  	, download : ''
					  	, desc : [
							'JC.AutoComplete 类chm索引提示'
							, '响应式初始化, 当光标焦点 foucs 到 文本框时, 会检查是否需要自动初始化 JC.AutoComplete 实例'
						]
					}
					, { 
						name : 'JC.AutoSelect'
						, subtitle : '类chm索引提示'
						, version : '0.1'
						, require : []
						, api : ''
						, download : ''
						, desc : [
							'响应式初始化, 当鼠标移动到 Tab 时, Tab 会尝试自动初始化 class = ".js_autoTab" 的 HTML 标签'
							, '需要手动初始化, 请使用: var _ins = new JC.Tab( _tabSelector );'
						]
					}
					, { 
						name : 'JC.Calendar'
						, subtitle : '类chm索引提示'
						, version : '0.1'
						, require : []
						, api : ''
						, download : ''
						, desc : [
							'响应式初始化, 当鼠标移动到 Tab 时, Tab 会尝试自动初始化 class = ".js_autoTab" 的 HTML 标签'
							, '需要手动初始化, 请使用: var _ins = new JC.Tab( _tabSelector );'
						]
					}
					, { 
						name : 'JC.DCalendar'
						, subtitle : '类chm索引提示'
						, version : '0.1'
						, require : []
						, api : ''
						, download : ''
						, desc : [
							'响应式初始化, 当鼠标移动到 Tab 时, Tab 会尝试自动初始化 class = ".js_autoTab" 的 HTML 标签'
							, '需要手动初始化, 请使用: var _ins = new JC.Tab( _tabSelector );'
						]
					}
					, { 
						name : 'JC.Drag'
						, subtitle : '类chm索引提示'
						, version : '0.1'
						, require : []
						, api : ''
						, download : ''
						, desc : [
							'响应式初始化, 当鼠标移动到 Tab 时, Tab 会尝试自动初始化 class = ".js_autoTab" 的 HTML 标签'
							, '需要手动初始化, 请使用: var _ins = new JC.Tab( _tabSelector );'
						]
					}
				]
			}
			, {
				name : 'BIZS'
				, desc : [
					'JqueryComps（JC）组件是一个扩展性强灰常NB的组件'
					, 'Base是JqueryComps（JC）组件的核心部分，也是组件的基础底层支持,Base是JqueryComps（JC）组件的核心部分，也是组件的基础底层支持'
				]
				, list : [
					{ 
					  	name : 'Bizs.ActionLogic'
					  	, subtitle : '类chm索引提示'
					  	, version : '0.1'
					  	, require : []
					  	, api : ''
					  	, download : ''
					  	, desc : [
							'响应式初始化, 当鼠标移动到 Tab 时, Tab 会尝试自动初始化 class = ".js_autoTab" 的 HTML 标签'
							, '需要手动初始化, 请使用: var _ins = new JC.Tab( _tabSelector );'
						]
					  }
					, { 
						name : 'Bizs.AutoSelectComplete'
						, subtitle : '类chm索引提示'
						, version : '0.1'
						, require : []
						, api : ''
						, download : ''
						, desc : [
							'响应式初始化, 当鼠标移动到 Tab 时, Tab 会尝试自动初始化 class = ".js_autoTab" 的 HTML 标签'
							, '需要手动初始化, 请使用: var _ins = new JC.Tab( _tabSelector );'
						]
					}
					, { 
						name : 'Bizs.ChangeLogic'
						, subtitle : '类chm索引提示'
						, version : '0.1'
						, require : []
						, api : ''
						, download : ''
						, desc : [
							'响应式初始化, 当鼠标移动到 Tab 时, Tab 会尝试自动初始化 class = ".js_autoTab" 的 HTML 标签'
							, '需要手动初始化, 请使用: var _ins = new JC.Tab( _tabSelector );'
						]
					}
					, { 
						name : 'Bizs.CommonModify'
						, subtitle : '类chm索引提示'
						, version : '0.1'
						, require : []
						, api : ''
						, download : ''
						, desc : [
							'响应式初始化, 当鼠标移动到 Tab 时, Tab 会尝试自动初始化 class = ".js_autoTab" 的 HTML 标签'
							, '需要手动初始化, 请使用: var _ins = new JC.Tab( _tabSelector );'
						]
					}
					, { 
						name : 'Bizs.CRMSchedule'
						, subtitle : '类chm索引提示'
						, version : '0.1'
						, require : []
						, api : ''
						, download : ''
						, desc : [
							'响应式初始化, 当鼠标移动到 Tab 时, Tab 会尝试自动初始化 class = ".js_autoTab" 的 HTML 标签'
							, '需要手动初始化, 请使用: var _ins = new JC.Tab( _tabSelector );'
						]
					}
				]
			}
			, {
				name : 'Plugin'
				, desc : [
					'JqueryComps（JC）组件是一个扩展性强灰常NB的组件'
					, 'Base是JqueryComps（JC）组件的核心部分，也是组件的基础底层支持,Base是JqueryComps（JC）组件的核心部分，也是组件的基础底层支持'
				]
				, list : [ 
					{ 
						name : 'Aes'
						, subtitle : '类chm索引提示'
						, version : '0.1'
						, require : []
						, download : ''
						, outlink : 'http://www.so.com'
						, desc : [
							'响应式初始化, 当鼠标移动到 Tab 时, Tab 会尝试自动初始化 class = ".js_autoTab" 的 HTML 标签响应式初始化, 当鼠标移动到 Tab 时, Tab 会尝试自动初始化 class = ".js_autoTab" 的 HTML 标签'
							, '需要手动初始化, 请使用: var _ins = new JC.Tab( _tabSelector );'
						]
					}
					, { 
						name : 'Base64'
						, subtitle : '类chm索引提示'
						, version : '0.1'
						, require : []
						, download : ''
						, outlink : 'http://www.so.com'
						, desc : [
							'响应式初始化, 当鼠标移动到 Tab 时, Tab 会尝试自动初始化 class = ".js_autoTab" 的 HTML 标签'
							, '需要手动初始化, 请使用: var _ins = new JC.Tab( _tabSelector );'
						]
					}
					, { 
						name : 'Json2'
						, subtitle : '类chm索引提示'
						, version : '0.1'
						, require : []
						, download : ''
						, outlink : 'http://www.so.com'
						, desc : [
							'响应式初始化, 当鼠标移动到 Tab 时, Tab 会尝试自动初始化 class = ".js_autoTab" 的 HTML 标签'
							, '需要手动初始化, 请使用: var _ins = new JC.Tab( _tabSelector );'
						]
					}
					, { 
						name : 'requirejs.domReady'
						, subtitle : '类chm索引提示'
						, version : '0.1'
						, require : []
						, download : ''
						, outlink : 'http://www.so.com'
						, desc : [
							'响应式初始化, 当鼠标移动到 Tab 时, Tab 会尝试自动初始化 class = ".js_autoTab" 的 HTML 标签'
							, '需要手动初始化, 请使用: var _ins = new JC.Tab( _tabSelector );'
						]
					}
				]
			}
		]
	}

	function getCompsByGroupName( _groupName ){
		var _compsList = datas.compsList;
		var _tmp;
		for( var _i = 0; _i < _compsList.length; _i++ ){
			_tmp = _compsList[ _i ];
			if( _tmp.name == _groupName ){
				return _tmp.list;
			}
		}
		return null;
	}

	function getCompByName( _compName ){
		var _compsList = datas.compsList;
		var _group;
		var _comps
		for( var _i = 0; _i < _compsList.length; _i++ ){
			_group = _compsList[ _i ].list;
			for( var _j = 0; _j < _group.length; _j++ ){
				_comps = _group[ _j ];
				if( _comps.name == _compName ){
					return _comps;
				}
			}
		}
		return null;
	}

	function getCompByNameAndVersion( _compName, _version ){
		var _compsList = datas.compsList;
		var _group;
		var _comps;
		for( var _i = 0; _i < _compsList.length; _i++ ){
			_group = _compsList[ _i ].list;
			for( var _j = 0; _j < _group.length; _j++ ){
				_comps = _group[ _j ];
				if( _comps.name == _compName && 
					_comps.version == _version ){
					return _comps;
				}
			}
		}
		return null;
	}

	
	function getDetailPathByNameAndVersion( _compName, _version ){
		return datas.basePath + _compName + '/' + _version + '/' + 
			datas.detailPage + '?compName=' + _compName + '&version=' + _version;
	}

	var _tmpComp
	function getDemoPathByName( _compName ){
		_tmpComp = getCompByName( _compName );
		return datas.basePath + _compName + '/' + 
			_tmpComp.version + '/' + datas.demoPage;
	}

	return {
		getAllData : function(){
			return datas;
		}
		
		, getCompsByGroupName : getCompsByGroupName
		
		, getCompByName2 : function( _groupName, _compsName ){
			var _group = getCompsByGroupName( _groupName );
			var _tmp;
			
			for( var _i = 0; _i < _group.length; _i++ ){
				_tmp = _group[ _i ];
				if( _tmp.name == _compsName ){
					return _tmp;
				}
			}
			return null;
		}

		, getCompByName : getCompByName

		, getCompListByNames : function( requireList ){
			var _compList = [];
			var _tmpObj;
			for( var _i = 0; _i < requireList.length; _i++ ){
				_tmpObj = requireList[ _i ];

				_compList[ _i ] = getCompByNameAndVersion( _tmpObj.name, _tmpObj.version );
			}
			return _compList;
		}

		, getDetailPathByNameAndVersion : getDetailPathByNameAndVersion

		, getDemoPathByName : getDemoPathByName

		, getCompByNameAndVersion : getCompByNameAndVersion

		, getAllCompsByName : function( _compName, _version ){
			var _compsList = datas.compsList;
			var _resultList = [];
			var _group;
			var _comps;
			
			for( var _i = 0; _i < _compsList.length; _i++ ){
				_group = _compsList[ _i ].list;
				for( var _j = 0; _j < _group.length; _j++ ){
					_comps = _group[ _j ];
					if( _comps.name == _compName ){
						_version && ( _comps.version == _version ) 
							&& ( _comps.nowVersion = true );
						_resultList.push( _comps );
					}
				}
			}
			return _resultList;
		}

		, parseUrl : function( _url ){
			var _resultList ={};
	        var _arr = _url.split( '?' )[ 1 ].split( '&' );
	        var _tmpArray;
	        for ( var i = 0; i < _arr.length; i++ ){
	            _tmpArray = _arr[ i ].split( '=' );
	            _resultList[ _tmpArray[ 0 ] ] = _tmpArray[ 1 ];
	        }
	        return _resultList;
		}
	}
} );