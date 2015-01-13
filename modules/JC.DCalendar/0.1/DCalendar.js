;(function(define, _win) { 'use strict'; 
    define( 'JC.DCalendar', [ 'JC.DCalendar.date'
            ], function(){
    /**
     * 这个判断是为了向后兼容 JC 0.1
     * 使用 requirejs 的项目可以移除这段判断代码
     */
    JC.use 
        && JC.PATH
        && JC.use([ 
                JC.PATH + 'comps/DCalendar/DCalendar.date.js'
            ].join())
        ;

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
