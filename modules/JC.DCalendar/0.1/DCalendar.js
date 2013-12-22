;(function(define, _win) { 'use strict'; 
    define( [ 'JC.DCalendar.date'
            ], function(){
        return JC.DCalendar;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
