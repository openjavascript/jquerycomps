;(function(define, _win) { 'use strict'; define( 
            'JC.LunarCalendar',
            [ 
                'JC.LunarCalendar.default' 
                , 'JC.LunarCalendar.getFestival' 
                , 'JC.LunarCalendar.gregorianToLunar' 
                , 'JC.LunarCalendar.nationalHolidays' 
            ], function(){
    /**
     * 这个判断是为了向后兼容 JC 0.1
     * 使用 requirejs 的项目可以移除这段判断代码
     */
    JC.use 
        && JC.PATH
        && JC.use([ 
                JC.PATH + 'comps/LunarCalendar/LunarCalendar.default.js'
                , JC.PATH + 'comps/LunarCalendar/LunarCalendar.getFestival.js' 
                , JC.PATH + 'comps/LunarCalendar/LunarCalendar.gregorianToLunar.js' 
                , JC.PATH + 'comps/LunarCalendar/LunarCalendar.nationalHolidays.js' 
            ].join())
        ;

    return JC.LunarCalendar;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);

