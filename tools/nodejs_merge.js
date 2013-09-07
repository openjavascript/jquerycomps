var fs = require('fs');

var dir = __dirname;
dir = dir.split('/');
dir.pop();

dir = dir.join('/') + '/';

var jqFile = dir + 'jquery.js'
    , commonFile = dir + 'common.js'
    , jcFile = dir + 'JC.js'
    , baseMVCFile = dir + 'comps/BaseMVC/BaseMVC.js'
    ;


if( !(  fs.existsSync( jqFile ) 
        && fs.existsSync( jcFile ) 
        && fs.existsSync( commonFile )  
        && fs.existsSync( baseMVCFile )  
)) return;

var tmp = [];
    tmp.push( fs.readFileSync( jqFile, 'utf8') );
    tmp.push( fs.readFileSync( commonFile, 'utf8') );
    tmp.push( fs.readFileSync( jcFile, 'utf8') );
    tmp.push( fs.readFileSync( baseMVCFile, 'utf8') );

fs.writeFileSync( dir + 'lib.js', tmp.join('\n') );

/*
fs.unlinkSync( dir + 'jquery.js' );
fs.unlinkSync( dir + 'common.js' );
fs.unlinkSync( dir + 'JC.js' );
*/


