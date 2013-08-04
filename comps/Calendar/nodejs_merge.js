var fs = require('fs');

var dir = __dirname + '/';

var path1 = dir + 'JC.Calendar.js';
var path2 = dir + 'JC.Calendar.pickWeek.js';
var path3 = dir + 'JC.Calendar.pickMonth.js';
var path4 = dir + 'JC.Calendar.pickSeason.js';

var outPath = dir + 'Calendar.js';

if( !( 
        fs.existsSync( path1 ) && fs.existsSync( path2 )
        && fs.existsSync( path3 ) && fs.existsSync( path4 )
    )) return;

var tmp = [];
    tmp.push( fs.readFileSync( path1, 'utf8') );
    tmp.push( fs.readFileSync( path2, 'utf8') );
    tmp.push( fs.readFileSync( path3, 'utf8') );
    tmp.push( fs.readFileSync( path4, 'utf8') );

fs.writeFileSync( outPath, tmp.join('\n') );

fs.unlinkSync( path1 );
fs.unlinkSync( path2 );
fs.unlinkSync( path3 );
fs.unlinkSync( path4 );
