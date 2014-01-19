;(function(define, _win) { 'use strict'; define( [ 
        'JC.AutoSelect', 'JC.AutoChecked', 'JC.FormFillUrl'
        , 'JC.Form.default', 'JC.Form.initNumericStepper'
    ], function(){
    /**
     * 这个判断是为了向后兼容 JC 0.1
     * 使用 requirejs 的项目可以移除这段判断代码
     */
    JC.use 
        && JC.PATH
        && JC.use([ 
                JC.PATH + 'comps/Form/Form.default.js'
                , JC.PATH + 'comps/Form/Form.initNumericStepper.js' 
                , 'JC.FormFillUrl'
                , 'JC.AutoSelect'
                , 'JC.AutoChecked'
            ].join())
        ;

    return JC.Form;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
