var fs = require('fs');

var dir = __dirname;
dir = dir.split('/');
dir.pop();

dir = dir.join('/') + '/';


if( !( fs.existsSync( dir + 'jquery.js' ) && fs.existsSync( dir + 'JC.js' ) && fs.existsSync( dir + 'common.js' )  ) ) return;

var tmp = [];
    tmp.push( fs.readFileSync( dir + 'jquery.js', 'utf8') );
    tmp.push( fs.readFileSync(  dir + 'common.js', 'utf8') );
    tmp.push( fs.readFileSync(  dir + 'JC.js', 'utf8') );

fs.writeFileSync( dir + 'lib.js', tmp.join('\n') );

/*
fs.unlinkSync( dir + 'jquery.js' );
fs.unlinkSync( dir + 'common.js' );
fs.unlinkSync( dir + 'JC.js' );
*/


