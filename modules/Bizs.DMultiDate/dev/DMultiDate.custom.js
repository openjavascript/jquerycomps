;
(function(define, _win) {
    'use strict';
    define(['DEV.Bizs.DMultiDate.default'], function() {

        function CustomModel(selector) {
            this._selector = selector;
        }

        Bizs.DMultiDate.CustomModel = CustomModel;

        function CustomView(model) {
            this._model = model;
        }

        Bizs.DMultiDate.CustomView = CustomView;

        Bizs.DMultiDate.clone(CustomModel, CustomView);


        JC.f.extendObject(CustomModel.prototype, {
            init: function() {
                console.log("CustomModel");
            }
        });

        JC.f.extendObject(CustomView.prototype, {
            init: function() {}
        });


        return Bizs.DMultiDate;
    });
}(typeof define === 'function' && define.amd ? define :
    function(_name, _require, _cb) {
        typeof _name == 'function' && (_cb = _name);
        typeof _require == 'function' && (_cb = _require);
        _cb && _cb();
    }, window
));
