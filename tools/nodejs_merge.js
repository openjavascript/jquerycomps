var fs = require('fs')
    , i
    , dir
    , items
    , result = []
    , outpath
    ;

dir = __dirname;
dir = dir.split('/');
dir.pop();

dir = dir.join('/') + '/';

outpath = dir + 'lib.js';

items = [
    dir + 'require.js'
    , dir + 'jquery.js'
];

for( i = 0, j = items.length; i < j; i++ ){
    if( !fs.existsSync( items[i] ) ) return;
}

for( i = 0, j = items.length; i < j; i++ ){
    result.push( fs.readFileSync( items[i], 'utf8') );
}

fs.writeFileSync( outpath, result.join(';\n') );
