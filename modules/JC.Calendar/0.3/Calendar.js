;(function(define, _win) { 'use strict'; 
    define( [ 'JC.Calendar.date', 'JC.Calendar.week', 'JC.Calendar.month'
                , 'JC.Calendar.season', 'JC.Calendar.year', 'JC.Calendar.monthday'
            ], function(){
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
