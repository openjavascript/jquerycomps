;
(function(define, _win) {
    'use strict';
    define(['DEV.Bizs.DMultiDate.default'], function() {

        function DoubleModel(selector) {
            this._selector = selector;
        }

        Bizs.DMultiDate.DoubleModel = DoubleModel;

        function DoubleView(model) {
            this._model = model;
        }

        Bizs.DMultiDate.DoubleView = DoubleView;

        Bizs.DMultiDate.clone(DoubleModel, DoubleView);

        JC.f.extendObject(DoubleModel.prototype, {
            init: function() {
           
            },

            updateEventProp: function () {
                var _p = this,
                    _count = Bizs.DMultiDate.Model.COUNT++,
                    calendarupdatestart = Bizs.DMultiDate.Model.UPDATESTART + _count,
                    calendarupdateend = Bizs.DMultiDate.Model.UPDATEEND + _count;
                
                _p.mddateEl().eq(0).attr('calendarupdate', calendarupdatestart);
                _p.mddateEl().eq(1).attr('calendarupdate', calendarupdateend);
               
                window[calendarupdatestart] = function (_dstart, _dend) {
                    _p.calendarupdateS(JC.f.formatISODate(_dstart), JC.f.formatISODate(_dend));
                };

                window[calendarupdateend] = function (_dstart, _dend) {
                    _p.calendarupdateE(JC.f.formatISODate(_dstart), JC.f.formatISODate(_dend));
                };
             
            },

            calendarupdateS: function (_dstart, _dend) {
                var _p = this;

                if (!_p.hiddendateiso()) {
                   _dend = _dstart = _p.mddateEl().eq(0).val();
                }

                if (!_p.mddateEl().eq(1).val()) {
                    _p.setHideEndEl(_dend);
                }

                _p.setHideStartEl(_dstart);
                //_p.setHideEndEl(_dend);
            },

            calendarupdateE: function (_dstart, _dend) {
                var _p = this;

                if (!_p.hiddendateiso()) {
                    _dstart = _p.mddateEl().eq(0).val();
                    _dend  = _p.mddateEl().eq(1).val();
                }

                if (!_p.mddateEl().eq(0).val()) {
                    _p.setHideStartEl(_dstart);
                }
                //_p.setHideStartEl(_dstart);
                _p.setHideEndEl(_dend);
            }



        });

        JC.f.extendObject(DoubleView.prototype, {
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
