;(function(){

	window.requirejs && 
	requirejs.config( {
	    baseUrl: 'static/js'
	    , urlArgs: 'v=' + new Date().getTime()
	    , paths: {
	    	'template' : 'artTemplate/dist/template',
	    	'data' : 'data/datas'
	    }
    });

})();