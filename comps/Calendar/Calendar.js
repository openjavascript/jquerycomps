;(function(define, _win) { 'use strict'; 
    define( [ 'JC.Calendar.date', 'JC.Calendar.week', 'JC.Calendar.month'
                , 'JC.Calendar.season', 'JC.Calendar.year', 'JC.Calendar.monthday'
            ], function(){
    /**
     * 这个判断是为了向后兼容 JC 0.1
     * 使用 requirejs 的项目可以移除这段判断代码
     */
    JC.use 
        && JC.PATH
        && JC.use([ 
                JC.PATH + 'comps/Calendar/Calendar.date.js'
                , JC.PATH + 'comps/Calendar/Calendar.week.js' 
                , JC.PATH + 'comps/Calendar/Calendar.month.js' 
                , JC.PATH + 'comps/Calendar/Calendar.season.js' 
                , JC.PATH + 'comps/Calendar/Calendar.year.js' 
                , JC.PATH + 'comps/Calendar/Calendar.monthday.js' 
            ].join())
        ;

    return JC.Calendar;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
