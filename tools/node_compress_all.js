var compressor = require('node-minify');
var fs = require('fs');

var spliter = '/'; 

var dir = '../deploy/';
var paths =  [];

recursive_compress( dir, dir, fs);

console.log( paths.join('\n') );
compress_all( paths );

function compress_all( _paths ){
    if( !_paths.length ) return;
    var _len = _paths.length, _path = _paths.shift(), _shiftLen = _paths.length;
    console.log( '_len:', _len, '_shiftLen:', _shiftLen, '_path:', _path );

    if( /\.css$/i.test( _path ) ){
        new compressor.minify({
            type: 'yui-css',
            fileIn: _path,
            fileOut: _path,
            callback: function(err){
                console.log('css: ' + err  + ' : ' +  _path);
                compress_all( _paths );
            }
        });

    }else if( /\.js$/i.test( _path ) ){
        new compressor.minify({
            type: 'yui-js',
            fileIn: _path,
            fileOut: _path,
            callback: function(err){
                console.log('js: ' + err  + ' : ' +  _path);
                compress_all( _paths );
            }
        });
    }

}

function recursive_compress( $sourceRoot, $outputRoot, $fs ){

    if( $fs.existsSync( $sourceRoot ) ){
        //console.log('source exists');
    }else{
        /*console.log('source no exists');
        console.log( $sourceRoot );*/
        return;
    }

    if( !$outputRoot ) {
        /*console.log( '$path is empty!' );*/
        return;
    }

    var fl = $fs.readdirSync( $sourceRoot );

    for( var i = 0, j = fl.length; i < j; i++ ){
        var cspath = [$sourceRoot, fl[i]].join( spliter );
        var copath = [$outputRoot, fl[i]].join( spliter );

        cspath = cspath.replace( /[\/]+/g, spliter );
        copath = copath.replace( /[\/]+/g, spliter );
/*
        console.log( cspath, '\n', copath, '\n\n' );
        continue;
        */

        var fstat = $fs.statSync( cspath )  

        if( fstat.isDirectory() ){
            if( fl[i] == ".git" 
                    || fl[i] == 'docs_api' 
                    || fl[i] == 'tools' 
                    || fl[i] == 'CommonModify' 
                    //|| fl[i] == 'bizs' 
            ) continue;
            /*console.log('directory');*/
        }else if( fstat.isFile ){
            /*console.log('file');*/
        }
        /*console.log( i + ': ' + cspath );
        console.log( i + ': ' + copath );
        console.log("");*/

        if( /node\_|nodejs\_/i.test( fl[i] ) ) continue;

        if( fstat.isDirectory() ){
            recursive_compress( cspath, copath, $fs );
        }else if( fstat.isFile() ){

            if( !/\.(?:css|js)$/i.test(cspath) ) continue;
            paths.push( cspath );
            /*
            console.log( 'xxxxxx', cspath, copath );

            if( /\.css$/i.test( cspath ) ){
                new compressor.minify({
                    type: 'yui-css',
                    fileIn: cspath,
                    fileOut: copath,
                    callback: function(err){
                        console.log('css: ' + err  + ' : ' +  cspath);

                    }
                });

            }else if( /\.js$/i.test( cspath ) ){
                new compressor.minify({
                    type: 'yui-js',
                    fileIn: cspath,
                    fileOut: copath,
                    callback: function(err){
                        console.log('js: ' + err  + ' : ' +  cspath);
                    }
                });
            }
            */
        }

    }


}

