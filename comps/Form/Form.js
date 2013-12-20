;(function(define, _win) { 'use strict'; define( [ 'JC.Form.default', 'JC.Form.initAutoFill', 'JC.Form.initNumericStepper'
                                                    , 'JC.AutoSelect', 'JC.AutoChecked' ], function(){
    /**
     * 这个判断是为了向后兼容 JC 0.1
     * 使用 requirejs 的项目可以移除这段判断代码
     */
    JC.use 
        && JC.PATH
        && JC.use([ 
                JC.PATH + 'comps/Form/Form.default.js'
                , JC.PATH + 'comps/Form/Form.initAutoFill.js' 
                , JC.PATH + 'comps/Form/Form.initNumericStepper.js' 
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
