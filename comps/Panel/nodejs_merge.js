var _fs = require('fs');

var _dir = __dirname + '/'
    , _paths = []
    , _contents = []
    , _outputName = 'Panel.js'
    ;

    _paths.push( _dir + 'Panel.default.js' );
    _paths.push( _dir + 'Panel.popup.js' );
    _paths.push( _dir + 'Dialog.js' );
    _paths.push( _dir + 'Dialog.popup.js' );

for( var i = 0, j = _paths.length; i < j; i++ ){
    if( ! _fs.existsSync( _paths[i] )  ) return;
}

for( var i = 0, j = _paths.length; i < j; i++ ){
    _contents.push( _fs.readFileSync( _paths[i], 'utf8') );
}

_fs.writeFileSync( _dir + _outputName, _contents.join(';\n') );

for( var i = 0, j = _paths.length; i < j; i++ ){
    _fs.unlinkSync( _paths[i] );
}

console.log( 'merge done: ' + _outputName );


