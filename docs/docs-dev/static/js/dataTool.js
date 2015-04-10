
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
		
		, demoPage : 'demo.html'
		
		, detailPage : 'detail.php'

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

	function getDemoPathByNameAndVersion( _compName, _version ){
		return datas.basePath + _compName + '/' + 
			_version + '/' + datas.demoPage;
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

		, getDemoPathByNameAndVersion : getDemoPathByNameAndVersion

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
					console.log(_group[ _j ]);
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
