(function(define,_win){define("JC.Valid",["JC.common"],function(){function Valid(){var e=JC.f.sliceArgs(arguments);if(e.length)return Valid.check.apply(null,e);if(Valid._instance)return Valid._instance;Valid._instance=this,this._model=new Model,this._view=new View(this._model),this._init()}function Model(){this._init()}function View(e){this._model=e}return window.JC=window.JC||{log:function(){}},JC.Valid=window.Valid=Valid,Valid.prototype={_init:function(){var e=this;return $([this._view,this._model]).on(Model.BIND,function(t,n,r){e.on(n,r)}),$([this._view,this._model]).on(Model.TRIGGER,function(t,n){var r=JC.f.sliceArgs(arguments).slice(2);e.trigger(n,r)}),e.on(Model.CORRECT,function(t){var n=JC.f.sliceArgs(arguments).slice(1);e._view.valid.apply(e._view,n)}),e.on(Model.ERROR,function(t){var n=JC.f.sliceArgs(arguments).slice(1);e._view.error.apply(e._view,n)}),e.on(Model.FOCUS_MSG,function(t){var n=JC.f.sliceArgs(arguments).slice(1);e._view.focusmsg.apply(e._view,n)}),this._view.init(),this},on:function(e,t){return $(this).on(e,t),this},trigger:function(e,t){return $(this).trigger(e,t),this},parse:function(e){var t=this,n=!0,e=$(e);if(e.prop("nodeName").toLowerCase()=="object")return n;if(!t._model.isAvalible(e))return n;if(!t._model.isValid(e))return n;if(Valid.ignore(e))return n;var r=t._model.parseDatatype(e),i=e.prop("nodeName").toLowerCase();switch(i){case"input":case"textarea":(e.attr("type")||"").toLowerCase()!="file"&&t._model.isAutoTrim(e)&&e.val($.trim(e.val()))}if(!t._model.reqmsg(e))return e.attr("datatypestatus","false"),n=!1;if(!t._model.lengthValid(e))return e.attr("datatypestatus","false"),n=!1;if(r&&t._model[r]&&e.val()&&!t._model[r](e))return e.attr("datatypestatus","false"),n=!1;e.attr("datatypestatus","true");var s=e.attr("subdatatype");return s&&(s=s.replace(/[\s]+/g,"").split(/[,\|]/),$.each(s,function(r,i){i=t._model.parseSubdatatype(i);if(i&&t._model[i]&&(e.val()||i=="alternative")&&!t._model[i](e))return n=!1,!1})),n&&t.trigger(Model.CORRECT,e),n},check:function(){var e=this,t=!0,n=JC.f.sliceArgs(arguments),r,i;return $.each(n,function(n,s){s=$(s),Valid.isFormValid=!1;if(e._model.isForm(s)){Valid.isFormValid=!0;var o=e._model.isErrorAbort(s),u=Valid.ignore(s),a;for(r=0,i=s[0].length;r<i;r++){var f=$(s[0][r]);if(u&&!(f.val()||"").trim())continue;!e.parse(f)&&(t=!1);if(o&&!t)break}}else Valid.isFormControl(s)?!e.parse(s)&&(t=!1):!e.check(s.find(Valid._formControls))&&(t=!1)}),t},clearError:function(){var e=JC.f.sliceArgs(arguments),t=this;return $.each(e,function(e,t){$(t).each(function(){var e=$(this);switch(e.prop("nodeName").toLowerCase()){case"form":for(var t=0,n=e[0].length;t<n;t++)Valid.setValid($(e[0][t]),1,!0);break;default:Valid.setValid(e,1,!0)}})}),this},isValid:function(e){return this._model.isValid(e)}},Valid.checkAll=Valid.check=function(){return Valid.getInstance().check.apply(Valid.getInstance(),JC.f.sliceArgs(arguments))},Valid.getInstance=function(){return!Valid._instance&&new Valid,Valid._instance},Valid.checkTimeout=function(e,t){e&&(e=$(e));if(!e||!e.length)return;t=parseInt(e.attr("validCheckTimeout"))||t;var n="VALID_CHECK_TIMEOUT";t?(e.data(n)&&clearTimeout(e.data(n)),e.data(n,setTimeout(function(){Valid.check(e)},t))):Valid.check(e)},Valid.dataValid=function(e,t,n,r){var i=!1,s="datavalidmsg";return e&&(e=$(e)),typeof t!="undefined"?(i=t,e.attr("datavalid",t),n||(t?e.trigger("blur",[!0]):(r&&(s=" "+r),Valid.setError(e,s,!0)))):e&&e.length&&(i=JC.f.parseBool(e.attr("datavalid"))),i},Valid.isValid=function(e){return Valid.getInstance().isValid(e)},Valid.statusTimeout={valid:function(e,t){e&&(e=$(e));if(!e||!e.length)return;e.data(Model.TIMEOUT_VALID)&&clearTimeout(e.data(Model.TIMEOUT_VALID)),t&&Valid.statusTimeout.clear(),t&&e.data(Model.TIMEOUT_VALID,t)},error:function(e,t){e&&(e=$(e));if(!e||!e.length)return;e.data(Model.TIMEOUT_ERROR)&&clearTimeout(e.data(Model.TIMEOUT_ERROR)),t&&Valid.statusTimeout.clear(),t&&e.data(Model.TIMEOUT_ERROR,t)},focus:function(e,t){e&&(e=$(e));if(!e||!e.length)return;e.data(Model.TIMEOUT_FOCUS)&&clearTimeout(e.data(Model.TIMEOUT_FOCUS)),t&&Valid.statusTimeout.clear(),t&&e.data(Model.TIMEOUT_FOCUS,t)},success:function(e,t){e&&(e=$(e));if(!e||!e.length)return;e.data(Model.TIMEOUT_SUCCESS)&&clearTimeout(e.data(Model.TIMEOUT_SUCCESS)),t&&Valid.statusTimeout.clear(),t&&e.data(Model.TIMEOUT_SUCCESS,t)},clear:function(e){for(var t in Valid.statusTimeout){if(t=="clear")continue;Valid.statusTimeout[t](e)}}},Valid.setValid=function(e,t,n,r){return e=$(e),e.each(function(e,i){i=$(this),Valid.statusTimeout.clear(i),$(Valid.getInstance()._view).trigger("setValid",[i,t,n,r])}),Valid.getInstance()},Valid.setError=function(e,t,n){return e=$(e),e.each(function(e,r){r=$(this),Valid.statusTimeout.clear(r);if(t&&t.trim()&&/^[\s]/.test(t)){var i="autoGenerateErrorMsg";r.attr(i,t),t=i}$(Valid.getInstance()._view).trigger("setError",[r,t,n])}),Valid.getInstance()},Valid.focusmsg=Valid.setFocusMsg=function(e,t,n){return e=$(e),e.each(function(e,r){r=$(this),Valid.statusTimeout.clear(r),typeof t=="string"&&(n=t,t=!1);if(n&&n.trim()&&/^[\s]/.test(n)){var i="autoGenerateFocusMsg";r.attr(i,n),n=i}Valid.getInstance().trigger(Model.FOCUS_MSG,[r,t,n])}),Valid.getInstance()},Valid.focusmsgEverytime=!0,Valid.emDisplayType="inline",Valid.showValidStatus=!1,Valid.clearError=function(){return Valid.getInstance().clearError.apply(Valid.getInstance(),JC.f.sliceArgs(arguments))},Valid.errorAbort=!1,Valid.autoTrim=!0,Valid.itemCallback,Valid.ignore=function(e,t){e=$(e);if(!e||!e.length)return!0;var n=!1;return typeof t!="undefined"?(t?e.removeAttr("ignoreprocess"):e.attr("ignoreprocess",!0),n=!t):e.is("[ignoreprocess]")&&((e.attr("ignoreprocess")||"").trim()?n=JC.f.parseBool(e.attr("ignoreprocess")):n=!0),n},Valid._formControls="input, select, textarea",Valid.isFormControl=function(e){var t=!1;return e&&(e=$(e)).length&&(t=e.is(Valid._formControls)),t},Valid.ignoreAutoCheckEvent=!1,Model.TRIGGER="TriggerEvent",Model.BIND="BindEvent",Model.ERROR="ValidError",Model.CORRECT="ValidCorrect",Model.FOCUS_MSG="ValidFocusMsg",Model.TIMEOUT_VALID="Valid_ValidTimeout",Model.TIMEOUT_ERROR="Valid_ErrorTimeout",Model.TIMEOUT_FOCUS="Valid_FocusTimeout",Model.TIMEOUT_SUCCESS="Valid_SuccessTimeout",Model.SELECTOR_ERROR="~ em.error, ~ em.errormsg",Model.CSS_ERROR="error errormsg",Model.FILTER_ERROR="em.error em.errormsg",Model.prototype={_init:function(){return this},parseDatatype:function(e){var t="";return typeof e=="string"?t=e:t=e.attr("datatype")||"text",t.toLowerCase().replace(/\-.*/,"")},parseSubdatatype:function(e){var t="";return typeof e=="string"?t=e:t=e.attr("subdatatype")||"",t.toLowerCase().replace(/\-.*/,"")},isForm:function(e){var t;return e.prop("nodeName")&&e.prop("nodeName").toLowerCase()=="form"&&(t=!0),t},isErrorAbort:function(e){var t=Valid.errorAbort;return e.is("[errorabort]")&&(t=JC.f.parseBool(e.attr("errorabort"))),t},isValid:function(e){e=$(e);var t,n;return e.each(function(){n=$(this);if(n.is("[datatype]")||n.is("[subdatatype]")||n.is("[minlength]")||n.is("[maxlength]")||n.is("[reqmsg]")||n.is("form"))t=!0}),t},isAutoTrim:function(e){e=$(e);var t=Valid.autoTrim;return e.is("[validautotrim]")&&(t=JC.f.parseBool(e.attr("validautotrim"))),t},isReqmsg:function(e){return e.is("[reqmsg]")},isValidMsg:function(e){e=$(e);var t=Valid.showValidStatus,n=JC.f.getJqParent(e,"form");return n&&n.length&&n.is("[validmsg]")&&(t=JC.f.parseBool(n.attr("validmsg"))),e.is("[validmsg]")&&(t=JC.f.parseBool(e.attr("validmsg"))),t},isAvalible:function(e){return(e.is(":visible")||this.isValidHidden(e))&&!e.is("[disabled]")},isValidHidden:function(e){var t=!1;return e.is("[subdatatype]")&&/hidden/i.test(e.attr("subdatatype"))&&e.parent().is(":visible")&&(t=!0),e.is("[validHidden]")&&(t=JC.f.parseBool(e.attr("validHidden")||"false")),t},validitemcallback:function(e){e=$(e);var t=Valid.itemCallback,n=JC.f.getJqParent(e,"form"),r;return n&&n.length&&n.is("[validitemcallback]")&&(r=n.attr("validitemcallback"))&&(r=window[r])&&(t=r),e.is("[validitemcallback]")&&(r=e.attr("validitemcallback"))&&(r=window[r])&&(t=r),t},isMinlength:function(e){return e.is("[minlength]")},isMaxlength:function(e){return e.is("[maxlength]")},minlength:function(e){return parseInt(e.attr("minlength"),10)||0},maxlength:function(e){return parseInt(e.attr("maxlength"),10)||0},isMinvalue:function(e){return e.is("[minvalue]")},isMaxvalue:function(e){return e.is("[maxvalue]")},isDatatarget:function(e,t){var n=!1,r="datatarget";return t&&(t+=r)&&(n=e.is("["+t+"]")),!n&&(n=e.is("["+r+"]")),n},datatarget:function(e,t){var n,r="datatarget";return t&&(t+=r)&&(t=e.attr(t))&&(n=JC.f.parentSelector(e,t)),(!n||!n.length)&&(n=JC.f.parentSelector(e,e.attr(r))),n},minvalue:function(e,t){if(typeof t!="string")return t?parseFloat(e.attr("minvalue"))||0:parseInt(e.attr("minvalue"),10)||0;var n=t.toLowerCase().trim();switch(n){default:return JC.f.parseDate(e.attr("minvalue"),e,!0)}},maxvalue:function(e,t){if(typeof t!="string")return t?parseFloat(e.attr("maxvalue"))||0:parseInt(e.attr("maxvalue"),10)||0;var n=t.toLowerCase().trim(),r;switch(n){default:return JC.f.parseDate(e.attr("maxvalue"),e,!0)}},lengthValid:function(e){var t=this,n=!0,e=$(e),r=t.parseDatatype(e),i,s,o=$.trim(e.val()),u;if(!o)return n;t.isMinlength(e)&&(i=t.minlength(e)),t.isMaxlength(e)&&(s=t.maxlength(e));switch(r){case"bytetext":u=t.bytelen(o);break;case"richtext":default:u=o.length}return i&&u<i&&(n=!1),s&&u>s&&(n=!1),!n&&$(t).trigger(Model.TRIGGER,[Model.ERROR,e]),n},n:function(e,t){var n=this,r=!0,i=e.val().trim(),s=+i,o=0,u=10,a=Math.pow(10,u),f,l,c;return n.isMinvalue(e)&&(o=n.minvalue(e,/\./.test(e.attr("minvalue")))||o),/^[0]{2,}$/.test(i)&&(r=!1),r&&!isNaN(s)&&s>=o?(e.attr("datatype").replace(/^n[^\-]*\-(.*)$/,function(e,t){c=t.split("."),f=parseInt(c[0]),l=parseInt(c[1]),f>u&&(a=Math.pow(10,f))}),n.isMaxvalue(e)&&(a=n.maxvalue(e,/\./.test(e.attr("maxvalue")))),s>=o&&s<=a?(typeof f!="undefined"&&typeof l!="undefined"&&(r=(new RegExp("^(?:-|)(?:[\\d]{0,"+f+"}|)(?:\\.[\\d]{1,"+l+"}|)$")).test(i)),typeof f!="undefined"&&typeof l=="undefined"&&(r=(new RegExp("^(?:-|)[\\d]{1,"+f+"}$")).test(i)),typeof f=="undefined"&&typeof l!="undefined"&&(r=(new RegExp("^(?:-|)\\.[\\d]{1,"+l+"}$")).test(i)),typeof l=="undefined"&&/\./.test(i)&&(r=!1)):r=!1):r=!1,!r&&!t&&$(n).trigger(Model.TRIGGER,[Model.ERROR,e]),r},f:function(e,t){var n=this,r=!0,i=e.val().trim(),s=+i,o=0,u=10,a=Math.pow(10,u),f,l,c;return n.isMinvalue(e)&&(o=n.minvalue(e,/\./.test(e.attr("minvalue")))||o),/^[0]{2,}$/.test(i)&&(r=!1),r&&!isNaN(s)&&s>=o?(e.attr("datatype").replace(/^f[^\-]*\-(.*)$/,function(e,t){c=t.split("."),f=parseInt(c[0]),l=parseInt(c[1]),f>u&&(a=Math.pow(10,f))}),typeof f=="undefined"&&(f=10),typeof l=="undefined"&&(l=2),n.isMaxvalue(e)&&(a=n.maxvalue(e,/\./.test(e.attr("maxvalue")))),s>=o&&s<=a?(typeof f!="undefined"&&typeof l!="undefined"&&(r=(new RegExp("^(?:-|)(?:[\\d]{0,"+f+"}|)(?:\\.[\\d]{1,"+l+"}|)$")).test(i)),typeof f!="undefined"&&typeof l=="undefined"&&(r=(new RegExp("^(?:-|)[\\d]{1,"+f+"}$")).test(i)),typeof f=="undefined"&&typeof l!="undefined"&&(r=(new RegExp("^(?:-|)\\.[\\d]{1,"+l+"}$")).test(i)),typeof l=="undefined"&&/\./.test(i)&&(r=!1)):r=!1):r=!1,!r&&!t&&$(n).trigger(Model.TRIGGER,[Model.ERROR,e]),r},nrange:function(e){var t=this,n=t.n(e),r,i,s,o,u,a;if(n){e.is("[fromNEl]")&&(s=t.getElement(e.attr("fromNEl"),e),o=e),e.is("[toNEl]")&&(s=e,o=t.getElement(e.attr("toNEl"),e)),s&&s.length||o&&o.length||(u=t.sametypeitems(e),u.length>=2&&(s=$(u[0]),o=$(u[1])));if(s&&s.length||o&&o.length){o.val($.trim(o.val())),s.val($.trim(s.val())),n&&o&&o.length&&o.attr("subdatatype")&&/\beven\b/.test(o.attr("subdatatype"))&&n&&(n=t.even(o)),n&&o&&o.length&&o.attr("subdatatype")&&/\bodd\b/.test(o.attr("subdatatype"))&&n&&(n=t.odd(o)),n&&s&&s.length&&s.attr("subdatatype")&&/\beven\b/.test(s.attr("subdatatype"))&&n&&(n=t.even(s)),n&&s&&s.length&&s.attr("subdatatype")&&/\bodd\b/.test(s.attr("subdatatype"))&&n&&(n=t.odd(s));if(!n)return!1;if(o[0]!=s[0]&&o.val().length&&s.val().length)return n&&(n=t.n(o,!0)),n&&(n=t.n(s,!0)),n&&+s.val()>+o.val()&&(n=!1),n&&(a=s.attr("rangeCanEqual")||o.attr("rangeCanEqual"))&&!JC.f.parseBool(a)&&JC.f.parseFinance(s.val(),10)===JC.f.parseFinance(o.val(),10)&&(n=!1),n&&$(t).trigger(Model.TRIGGER,[Model.CORRECT,s]),n&&$(t).trigger(Model.TRIGGER,[Model.CORRECT,o]),!n&&$(t).trigger(Model.TRIGGER,[Model.ERROR,s]),!n&&$(t).trigger(Model.TRIGGER,[Model.ERROR,o]),n}}return n},d:function(e,t){var n=this,r=$.trim(e.val()),i=!0,s=JC.f.parseDate(r,e),o;return r&&s?(n.isMinvalue(e)&&(o=n.minvalue(e,"d"))&&s.getTime()<o.getTime()&&(i=!1),i&&n.isMaxvalue(e)&&(o=n.maxvalue(e,"d"))&&s.getTime()>o.getTime()&&(i=!1)):r&&(i=!1),!i&&!t&&$(n).trigger(Model.TRIGGER,[Model.ERROR,e]),i},date:function(){return this.d.apply(this,JC.f.sliceArgs(arguments))},ddate:function(){return this.d.apply(this,JC.f.sliceArgs(arguments))},daterange:function(e){var t=this,n=t.d(e),r,i,s,o,u,a,f;if(n){e.is("[fromDateEl]")&&(s=t.getElement(e.attr("fromDateEl"),e),o=e),e.is("[toDateEl]")&&(s=e,o=t.getElement(e.attr("toDateEl"),e)),s&&s.length&&o&&o.length||(u=t.sametypeitems(e),u.length>=2&&(s=$(u[0]),o=$(u[1])));if(s&&s.length||o&&o.length)o.val($.trim(o.val())),s.val($.trim(s.val())),o[0]!=s[0]&&o.val().length&&s.val().length&&(n&&(n=t.d(o,!0))&&(r=JC.f.parseDate(s.val(),s)),n&&(n=t.d(s,!0))&&(i=JC.f.parseDate(o.val(),o)),n&&r&&i&&r.getTime()>i.getTime()&&(n=!1),n&&r&&i&&(f=s.attr("datespan")||o.attr("datespan"),f&&(f=JC.f.dateDetect(JC.f.formatISODate(r)+f))&&i.getTime()>f.getTime()&&(n=!1)),n&&(a=s.attr("rangeCanEqual")||o.attr("rangeCanEqual"))&&!JC.f.parseBool(a)&&r&&i&&r.getTime()==i.getTime()&&(n=!1),n&&$(t).trigger(Model.TRIGGER,[Model.CORRECT,s]),n&&$(t).trigger(Model.TRIGGER,[Model.CORRECT,o]),!n&&$(t).trigger(Model.TRIGGER,[Model.ERROR,s]),!n&&$(t).trigger(Model.TRIGGER,[Model.ERROR,o]))}return n},drange:function(){return this.daterange.apply(this,JC.f.sliceArgs(arguments))},time:function(e){var t=this,n=/^(([0-1]\d)|(2[0-3])):[0-5]\d:[0-5]\d$/.test(e.val());return!n&&$(t).trigger(Model.TRIGGER,[Model.ERROR,e]),n},minute:function(e){var t=this,n=/^(([0-1]\d)|(2[0-3])):[0-5]\d$/.test(e.val());return!n&&$(t).trigger(Model.TRIGGER,[Model.ERROR,e]),n},bankcard:function(e){var t=this,n=e.val().trim().replace(/[\s]+/g," ");e.val(n);var r=n.replace(/[^\d]/g,""),i=/^[0-9](?:[\d]{24}|[\d]{23}|[\d]{22}|[\d]{21}|[\d]{20}|[\d]{19}|[\d]{18}|[\d]{17}|[\d]{16}|[\d]{15}|[\d]{14}|[\d]{13}|[\d]{12}|[\d]{11}|[\d]{10}|[\d]{9}|[\d]{8}|)$/.test(r);return/^[0]+$/.test(r)&&(i=!1),!i&&$(t).trigger(Model.TRIGGER,[Model.ERROR,e]),i},cnname:function(e,t){var n=this,r=n.bytelen(e.val())<=32&&/^[\u4e00-\u9fa5a-zA-Z.\u3002\u2022]{2,32}$/.test(e.val());return!t&&!r&&$(n).trigger(Model.TRIGGER,[Model.ERROR,e]),r},enname:function(e,t){var n=this,r=n.bytelen(e.val())<=32&&/^[a-zA-Z ]{2,32}$/.test(e.val());return!t&&!r&&$(n).trigger(Model.TRIGGER,[Model.ERROR,e]),r},allname:function(e){var t=this,n=t.bytelen(e.val())<=32&&(t.cnname(e,!0)||t.enname(e,!0));return!n&&$(t).trigger(Model.TRIGGER,[Model.ERROR,e]),n},username:function(e){var t=this,n=/^[a-zA-Z0-9][\w-]{2,30}$/.test(e.val());return!n&&$(t).trigger(Model.TRIGGER,[Model.ERROR,e]),n},idnumber:function(e){var t=this,n=/^[0-9]{15}(?:[0-9]{2}(?:[0-9xX])|)$/.test(e.val());return!n&&$(t).trigger(Model.TRIGGER,[Model.ERROR,e]),n},qq:function(e,t){var n=this,r=/^[1-9][\d]{4,10}$/.test(e.val());return!t&&!r&&$(n).trigger(Model.TRIGGER,[Model.ERROR,e]),r},qqall:function(e,t){var n=this,r=n.qq(e,!0)||n.email(e,!0);return!t&&!r&&$(n).trigger(Model.TRIGGER,[Model.ERROR,e]),r},mobilecode:function(e,t){var n=this,r=/^(?:13|14|15|16|17|18|19)[\d]{9}$/.test(e.val());return!t&&!r&&$(n).trigger(Model.TRIGGER,[Model.ERROR,e]),r},mobile:function(e,t){return this.mobilecode(e,t)},mobilezonecode:function(e,t){var n=this,r=/^(?:\+[0-9]{1,6} |)(?:0|)(?:13|14|15|16|17|18|19)\d{9}$/.test(e.val());return!t&&!r&&$(n).trigger(Model.TRIGGER,[Model.ERROR,e]),r},phonecode:function(e){var t=this,n=/^[1-9][0-9]{6,7}$/.test(e.val());return!n&&$(t).trigger(Model.TRIGGER,[Model.ERROR,e]),n},phone:function(e,t){var n=this,r=/^(?:0(?:10|2\d|[3-9]\d\d)(?: |\-|)|)[1-9][\d]{6,7}$/.test(e.val());return!t&&!r&&$(n).trigger(Model.TRIGGER,[Model.ERROR,e]),r},phoneall:function(e,t){var n=this,r=/^(?:\+[\d]{1,6}(?: |\-)|)(?:0[\d]{2,3}(?:\-| |)|)[1-9][\d]{6,7}(?:(?: |)(?:\#|\-)[\d]{1,6}|)$/.test(e.val());return!t&&!r&&$(n).trigger(Model.TRIGGER,[Model.ERROR,e]),r},phonezone:function(e){var t=this,n=e.val().trim(),r,i=/^[0-9]{3,4}$/,s;return s=e.attr("datatype").split("-"),s.length>1&&(i=new RegExp("^[0-9]{"+s[1]+"}$")),r=i.test(n),!r&&$(t).trigger(Model.TRIGGER,[Model.ERROR,e]),r},phoneext:function(e){var t=this,n=/^[0-9]{1,6}$/.test(e.val());return!n&&$(t).trigger(Model.TRIGGER,[Model.ERROR,e]),n},mobilephone:function(e){var t=this,n=this.mobilecode(e,!0)||this.phone(e,!0);return!n&&$(t).trigger(Model.TRIGGER,[Model.ERROR,e]),n},mobilephoneall:function(e){var t=this,n=this.mobilezonecode(e,!0)||this.phoneall(e,!0);return!n&&$(t).trigger(Model.TRIGGER,[Model.ERROR,e]),n},reg:function(e){var t=this,n=!0,r;return e.is("[reg-pattern]")&&(r=e.attr("reg-pattern")),r||(r=$.trim(e.attr("datatype")).replace(/^reg(?:\-|)/i,"")),r.replace(/^\/([\s\S]*)\/([\w]{0,3})$/,function(t,r,i){n=(new RegExp(r,i||"")).test(e.val())}),!n&&$(t).trigger(Model.TRIGGER,[Model.ERROR,e]),n},vcode:function(e){var t=this,n,r=parseInt($.trim(e.attr("datatype")).replace(/^vcode(?:\-|)/i,""),10)||4;return n=(new RegExp("^[0-9a-zA-Z]{"+r+"}$")).test(e.val()),!n&&$(t).trigger(Model.TRIGGER,[Model.ERROR,e]),n},text:function(e){return!0},bytetext:function(e){return!0},richtext:function(e){return!0},bytelen:function(e){return e.replace(/[^\x00-\xff]/g,"11").length},url:function(e){var t=this,n=/^(?:htt(?:p|ps)\:\/\/|)((?:(?:(?:\w[\.\-\+]*))\w)*)((?:(?:(?:\w[\.\-\+]*){0,62})\w)+)\.([a-z]{2,6})(?:\/[^\s<>]*|)$/i.test(e.val());return!n&&$(t).trigger(Model.TRIGGER,[Model.ERROR,e]),n},domain:function(e){var t=this,n=/^(?:htt(?:p|ps)\:\/\/|)((?:(?:(?:\w[\.\-\+]*))\w)*)((?:(?:(?:\w[\.\-\+]*){0,62})\w)+)\.([a-z]{2,6})(?:\/|)$/i.test(e.val());return!n&&$(t).trigger(Model.TRIGGER,[Model.ERROR,e]),n},stricdomain:function(e){var t=this,n=/^((?:(?:(?:\w[\.\-\+]*))\w)*)((?:(?:(?:\w[\.\-\+]*){0,62})\w)+)\.([a-z]{2,6})$/i.test(e.val());return!n&&$(t).trigger(Model.TRIGGER,[Model.ERROR,e]),n},email:function(e,t){var n=this,r=/^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(e.val());return!t&&!r&&$(n).trigger(Model.TRIGGER,[Model.ERROR,e]),r},countrycode:function(e){var t=this,n=e.val().trim(),r=/^(?:\+|)[\d]{1,6}$/.test(n);return!r&&$(t).trigger(Model.TRIGGER,[Model.ERROR,e]),r},zipcode:function(e){var t=this,n=/^[0-9]{6}$/.test(e.val());return!n&&$(t).trigger(Model.TRIGGER,[Model.ERROR,e]),n},taxcode:function(e){var t=this,n=!1,r=e.val().trim();return n=/^[\w]{15}$/.test(r)||/^[\w]{18}$/.test(r)||/^[\w]{20}$/.test(r),!n&&$(t).trigger(Model.TRIGGER,[Model.ERROR,e]),n},reconfirm:function(e){var t=this,n=!0,r,i="ReconfirmValidTime",s="reconfirm";t.isDatatarget(e,s)&&(r=t.datatarget(e,s)),(!r||!r.length)&&(r=t.samesubtypeitems(e,s));var o=!1;return r&&r.length&&r.each(function(){var r=$(this);t.checkRepeatProcess(r,i,!0)&&(o=!0),e.val()!=$(this).val()&&(n=!1)}),!n&&r.length&&r.each(function(){if(e[0]==this)return;$(t).trigger(Model.TRIGGER,[Model.ERROR,$(this),"reconfirmmsg",!0])}),n&&r&&r.length&&r.each(function(){if(e[0]==this)return;if(o)return!1;$(t).trigger(Model.TRIGGER,[Model.CORRECT,$(this)])}),!n&&e.attr("datatypestatus","false"),n?$(t).trigger(Model.TRIGGER,[Model.CORRECT,e]):$(t).trigger(Model.TRIGGER,[Model.ERROR,e,"reconfirmmsg",!0]),n},checkRepeatProcess:function(e,t,n,r){var i=(new Date).getTime(),s=!1;return r=r||200,e.data(t)&&i-e.data(t)<r&&(s=!0,e.data(t,i)),n&&e.data(t,i),s},alternative:function(e){var t=this,n=!0,r,i="AlternativeValidTime",s=t.parseDatatype(e),o="alternative";t.isDatatarget(e,o)&&(r=t.datatarget(e,o)),(!r||!r.length)&&(r=t.samesubtypeitems(e,o));var u=!1,a;if(r.length&&!$.trim(e.val())){var f=!1;r.each(function(){var n=$(this);if(e[0]==this)return;t.checkRepeatProcess(n,i,!0)&&(u=!0);if($(this).val())return f=!0,!1}),n=f}!n&&r&&r.length&&r.each(function(){if(e[0]==this)return;if(u)return!1;$(t).trigger(Model.TRIGGER,[Model.ERROR,$(this),"alternativemsg",!0])}),n&&r&&r.length&&r.each(function(){if(e[0]==this)return;var n=$(this),r=t.parseDatatype(n);if(r&&t[r]&&$(this).val())t[r]($(this));else if(!$(this).val()){$(t).trigger(Model.TRIGGER,[Model.CORRECT,$(this)]);var i=JC.f.parentSelector($(this),$(this).attr("reqtargetdatatarget"));i&&i.length&&$(t).trigger(Model.TRIGGER,[Model.CORRECT,i])}});if(n&&r&&r.length){var l=!1,c=[];r.each(function(){if(e[0]==this)return;var t=$(this),n;t.is("[alternativeReqTarget]")&&(n=JC.f.parentSelector(t,t.attr("alternativeReqTarget")),n&&n.length&&n.each(function(){var e=$(this),t=e.val().trim();t||(c.push(e),l=!0)}))}),e.is("[alternativeReqTarget]")&&(a=JC.f.parentSelector(e,e.attr("alternativeReqTarget")),a&&a.length&&a.each(function(){var e=$(this),t=e.val().trim();t||(c.push(e),l=!0)}));if(l&&c.length)return n=!1,$.each(c,function(e,n){n=$(n),$(t).trigger(Model.TRIGGER,[Model.ERROR,n,"alternativeReqmsg",!0])}),n}return n?s&&t[s]&&e.val()?t[s](e):e.val()||$(t).trigger(Model.TRIGGER,[Model.CORRECT,e]):(!n&&e.attr("datatypestatus","false"),$(t).trigger(Model.TRIGGER,[Model.ERROR,e,"alternativemsg",!0])),n},reqtarget:function(e){var t=this,n=!0,r=e.val().trim(),i,s=JC.f.parentSelector(e,e.attr("reqtargetdatatarget")||e.attr("datatarget"));return r&&s&&s.length?(i=s.val().trim(),!i&&(n=!1),!n&&e.attr("datatypestatus","false"),!n&&$(t).trigger(Model.TRIGGER,[Model.ERROR,s,"reqtargetmsg",!0]),n&&s.trigger("blur")):s&&s.length&&s.trigger("blur"),n},even:function(e){var t=this,n=!0,r=JC.f.parseFinance(e.val().trim(),9)||0;return isNaN(r)?n=!1:r%2!==0&&(n=!1),!n&&JC.log("even:",n,JC.f.gid()),!n&&$(t).trigger(Model.TRIGGER,[Model.ERROR,e,"evenmsg",!0]),n},odd:function(e){var t=this,n=!0,r=JC.f.parseFinance(e.val().trim(),9)||0;return isNaN(r)?n=!1:r%2===0&&(n=!1),!n&&$(t).trigger(Model.TRIGGER,[Model.ERROR,e,"oddmsg",!0]),n},ucheck:function(e){var t=!0,n=this;return this.ucheckCallback(e)&&(t=this.ucheckCallback(e)(e)),!t&&e.attr("datatypestatus","false"),!t&&$(n).trigger(Model.TRIGGER,[Model.ERROR,e,"ucheckmsg",!0]),t},ucheckCallback:function(e){var t;return e&&e.length&&e.is("[ucheckCallback]")&&(t=window[e.attr("ucheckCallback")]),t},unique:function(e){var t=this,n=!0,r,i,s=[],o=t.typeLen(e.attr("subdatatype"))[0],u="UniqueValidTime",a="unique",f=JC.f.parseBool(e.attr("uniqueIgnoreCase")),l,c;t.isDatatarget(e,a)&&(r=t.datatarget(e,a)),(!r||!r.length)&&(r=t.samesubtypeitems(e,a)),l=[],c=[];var h=!1;if(r&&r.length){i={},r.each(function(e){var n=$(this);if(n.is("[processDisabled]")&&(!n.attr("processDisabled")||JC.f.parseBool(n.attr("processDisabled")))){if(!n.is(":visible")&&!t.isValidHidden(n))return}else if(!t.isAvalible(n))return;t.checkRepeatProcess(n,u,!0)&&(h=!0),e%o===0&&s.push([]),s[s.length-1]&&s[s.length-1].push(n)}),$.each(s,function(e,r){var s=[],o=!1;$.each(r,function(e,n){var r,i=JC.f.parseBool(n.attr("uniqueIgnoreEmpty"));r=$(n).val().trim(),i&&!r&&(n.is(":visible")||t.isValidHidden(n))&&(o=!0),s.push(r)});var u=s.join(""),a=s.join("####");if(o)return;if(!u)return;f&&(a=a.toLowerCase()),a in i?(i[a].push(r),n=!1):i[a]=[r]});for(var p in i)i[p].length>1?(n=!1,$.each(i[p],function(e,t){l=l.concat(t)})):$.each(i[p],function(e,t){c=c.concat(t)})}return $.each(c,function(e,n){var r=t.parseDatatype(n);r&&t[r]&&n.val()?t[r](n)&&Valid.setValid(n):Valid.setValid(n)}),!n&&e.attr("datatypestatus","false"),!n&&l.length&&$.each(l,function(e,n){n=$(n);var r=(n.val()||"").trim();if(h)return!1;if(!r)return;r&&$(t).trigger(Model.TRIGGER,[Model.ERROR,n,"uniquemsg",!0])}),n},datavalid:function(e){var t=!0,n=this;return Valid.isFormValid?e.is("[datavalid]")?(t=JC.f.parseBool(e.attr("datavalid")),t||(!t&&e.attr("datatypestatus","false"),Valid.statusTimeout.error(e,setTimeout(function(){$(n).trigger(Model.TRIGGER,[Model.ERROR,e,"datavalidmsg",!0])},1))),t):t:t},typeLen:function(e){var t=[1];return e&&(e=e.replace(/[^\d\.]/g,""))&&(t=e.split("."))&&(t[0]=parseInt(t[0],10)||1,t[1]=parseInt(t[1],10)||0),t},findValidEle:function(e){var t=this,n="~ em.validmsg",r=e.find(n),i;return e.attr("validel")&&(i=t.getElement(e.attr("validel"),e,n)).length&&(r=i),r},findFocusEle:function(e){var t=this,n="~ em.focusmsg",r=e.find(n),i;return e.attr("focusel")&&(i=t.getElement(e.attr("focusel"),e,n)).length&&(r=i),r},findErrorEle:function(e){var t=this,n=Model.SELECTOR_ERROR,r=e.find(n),i;return e.attr("emel")&&(i=t.getElement(e.attr("emel"),e,n)).length&&(r=i),r},getElement:function(e,t,n){if(/^\^$/.test(e))n=n||Model.SELECTOR_ERROR,e=$(t.parent().find(n));else if(/^[\/\|\<\(]/.test(e))e=JC.f.parentSelector(t,e);else{if(/\./.test(e))return $(e);/^[\w-]+$/.test(e)&&(e="#"+e,e=$(e.replace(/[\#]+/g,"#")))}return $(e)},errorMsg:function(e,t,n){var r=e.is("[errmsg]")?" "+e.attr("errmsg"):e.is("[reqmsg]")?e.attr("reqmsg"):"";t&&(r=e.attr(t)||r),n&&r&&(r=" "+r),r=(r||"").trim().toLowerCase()=="undefined"||typeof r==undefined?"":r;if(r&&!/^[\s]/.test(r))switch(e.prop("type").toLowerCase()){case"file":r="请上传"+r;break;case"select-multiple":case"select-one":case"checkbox":case"radio":case"select":r="请选择"+r;break;case"textarea":case"password":case"text":r="请填写"+r}return $.trim(r)},reqmsg:function(e){var t=!0,n=this;return n.isReqmsg(e)?(e.val()&&e.val().constructor==Array?t=!!$.trim(e.val().join("")+""):t=!!$.trim(e.val()||""),!t&&$(n).trigger(Model.TRIGGER,[Model.ERROR,e,"reqmsg"]),t):t},sametypeitems:function(e){var t=this,n=[],r=e.parent(),i=e.attr("datatype"),s=new RegExp(i,"i");return/select/i.test(e.prop("nodeName"))?r.find("[datatype]").each(function(){s.test($(this).attr("datatype"))&&n.push($(this))}):r.find("input[datatype]").each(function(){s.test($(this).attr("datatype"))&&n.push($(this))}),n.length?$(n):n},samesubtypeitems:function(e,t){var n=this,r=[],i=e.parent(),t=t||e.attr("subdatatype"),s=new RegExp(t,"i"),o=e.prop("nodeName").toLowerCase(),u="input";return/select/.test(o)?u="select":/textarea/.test(o)&&(u="textarea"),i.find(u+"[subdatatype]").each(function(){s.test($(this).attr("subdatatype"))&&r.push($(this))}),r.length?$(r):r},focusmsgeverytime:function(e){var t=Valid.focusmsgEverytime;return e.is("[focusmsgeverytime]")&&(t=JC.f.parseBool(e.attr("focusmsgeverytime"))),t},validemdisplaytype:function(e){e&&(e=$(e));var t=Valid.emDisplayType,n=JC.f.getJqParent(e,"form"),r;return n&&n.length&&n.is("[validemdisplaytype]")&&(r=n.attr("validemdisplaytype"))&&(t=r),e.is("[validemdisplaytype]")&&(r=e.attr("validemdisplaytype"))&&(t=r),t},checkedType:function(e,t){e&&(e=$(e)),t=t||"checkbox";var n=this,r=!0,i,s,o=1,u=0,a=0,f=e,l=e.parent().prop("nodeName").toLowerCase()=="label",c=t+"finder",h="checkedType_"+t,p;return n.checkRepeatProcess(e,h,!0)&&!e.data("Last"+t)?!e.data("isErrorVck"):(e.is("[datatarget]")?(i=JC.f.parentSelector(e,e.attr("datatarget")),s=[],i.each(function(){var e=$(this);(e.is(":visible")||n.isValidHidden(e))&&!e.prop("disabled")&&(s.push(e),n.checkRepeatProcess(e,h,!0)&&(p=!0))}),i=$(s)):(l?(f.is("["+c+"]")?f=JC.f.parentSelector(e,e.attr(c)):f=e.parent().parent(),s=JC.f.parentSelector(f,"|input[datatype]")):s=JC.f.parentSelector(f,"/input[datatype]"),i=[],s.each(function(){var e=$(this),r=new RegExp(t,"i");r.test(e.attr("datatype"))&&(e.is(":visible")||n.isValidHidden(e))&&!e.prop("disabled")&&(i.push(e),n.checkRepeatProcess(e,h,!0)&&(p=!0))}),i=$(i)),l&&i.each(function(){var e=$(this);e.is("[emel]")||e.attr("emel","//em.error"),e.is("[validel]")||e.attr("validel","//em.validmsg"),e.is("[focusel]")||e.attr("focusel","//em.focusmsg")}),i.length&&$(e=i[i.length-1]).data("Last"+t,!0),i.length&&(e.is("[datatype]")&&e.attr("datatype")&&(e.attr("datatype").replace(/[^\-]+?\-([\d]+)/,function(e,t){o=parseInt(t,10)||o}),e.attr("datatype").replace(/[^\-]+?\-[\d]+?(?:\.|\-)([\d]+)/,function(e,t){u=parseInt(t,10)||u})),i.length>=o&&(i.each(function(){$(this).prop("checked")&&a++}),a<o?r=!1:u&&a>u&&(r=!1)),r?(e.data("isErrorVck",!1),i.each(function(){$(this).data("isErrorVck",!1)})):(e.data("isErrorVck",!0),i.each(function(){$(this).data("isErrorVck",!0)})),!r&&$(n).trigger(Model.TRIGGER,[Model.ERROR,e])),r)},checkbox:function(e){return this.checkedType(e,"checkbox")},radio:function(e){return this.checkedType(e,"radio")},file:function(e){var t=this,n=!0,r=e.val().trim().toLowerCase(),i=t.dataFileExt(e),s,o;return i.length&&(n=!1,$.each(i,function(e,t){t+="$",s=new RegExp(t,"i");if(s.test(r))return n=!0,!1})),!n&&$(t).trigger(Model.TRIGGER,[Model.ERROR,e]),n},dataFileExt:function(e){var t=[],n;return e.is("[fileext]")&&(n=e.attr("fileext").replace(/[\s]+/g,""))&&(n=n.replace(/\./g,"\\."))&&(t=n.toLowerCase().split(",")),t},ignoreAutoCheckEvent:function(e){var t=Valid.ignoreAutoCheckEvent,n;return e&&(e=$(e)),e&&e.length&&(n=JC.f.getJqParent(e,"form"),n&&n.length&&n.is("[ignoreAutoCheckEvent]")&&(t=JC.f.parseBool(n.attr("ignoreAutoCheckEvent"))),e.is("[ignoreAutoCheckEvent]")&&(t=JC.f.parseBool(e.attr("ignoreAutoCheckEvent")))),t}},View.prototype={init:function(){var e=this;return $(e).on("setValid",function(t,n,r,i,s){var o;n.removeClass(Model.CSS_ERROR),n.find(JC.f.printf('~ em:not("em.focusmsg, em.validmsg, {0}")',Model.FILTER_ERROR)).css("display",e._model.validemdisplaytype(n)),n.find(Model.SELECTOR_ERROR).hide(),n.attr("emel")&&(o=e._model.getElement(n.attr("emel"),n))&&o.hide(),typeof i=="undefined"&&typeof n.val()!="object"&&!n.val().trim()&&(i=1),e.validMsg(n,i,s)}),$(e).on("setError",function(t,n,r,i){var s=e._model.errorMsg.apply(e._model,[n,r,i]),o,u,a,f;n.addClass(Model.CSS_ERROR),n.find(JC.f.printf("~ em:not({0})",Model.FILTER_ERROR)).hide(),n.is("[validel]")&&(u=e._model.getElement(n.attr("validel"),n))&&u.hide(),n.is("[focusel]")&&(a=e._model.getElement(n.attr("focusel"),n))&&a.hide(),n.is("[emEl]")&&(o=e._model.getElement(n.attr("emEl"),n))&&o.addClass(Model.CSS_ERROR),(!o||!o.length)&&(o=n.find(Model.SELECTOR_ERROR)),o.length||(o=$(JC.f.printf('<em class="{0}"></em>',Model.CSS_ERROR))).insertAfter(n),!s.trim()&&(s="&nbsp;"),o.html(s).css("display",e._model.validemdisplaytype(n))}),this},valid:function(e,t,n){e&&(e=$(e));var r=this,i;e.data("JCValidStatus",!0);var s=!JC.f.parseBool(e.attr("validnoerror"));Valid.statusTimeout.valid(e,setTimeout(function(){$(r).trigger("setValid",[e,t,n,s]),(i=r._model.validitemcallback(e))&&i(e,!0)},t||150))},validMsg:function(e,t,n){var r=this,i=(e.attr("validmsg")||"").trim().toLowerCase(),s;if(r._model.isValidMsg(e)){if(i=="true"||i=="1")i="";!i.trim()&&(i="&nbsp;");var o=r._model.findFocusEle(e),u=r._model.findValidEle(e),a=r._model.findErrorEle(e);!u.length&&(u=$('<em class="validmsg"></em>'),e.after(u)),u.html(i),t?u.hide():(u.css("display",r._model.validemdisplaytype(e)),o&&o.hide(),a&&a.hide())}else n&&(s=r._model.findFocusEle(e))&&s.hide()},error:function(e,t,n){e&&(e=$(e));var r=this,i=arguments,s;return e.is("[validnoerror]")?!0:(e.data("JCValidStatus",!1),Valid.statusTimeout.error(e,setTimeout(function(){$(r).trigger("setError",[e,t,n]),(s=r._model.validitemcallback(e))&&s(e,!1)},150)),!1)},focusmsg:function(e,t,n){if(e&&(e=$(e)).length&&(e.is("[focusmsg]")||n&&e.is("["+n+"]"))){var r,i=this,s=i._model.findFocusEle(e),o=i._model.findValidEle(e),u=i._model.findErrorEle(e),a=e.attr("focusmsg");n&&(a=e.attr(n||a));if(t&&s&&s.length){s.hide();return}u.length&&u.is(":visible")&&u.hide();if(o.length&&o.is(":visible"))return;!s.length&&(s=$('<em class="focusmsg"></em>'),e.after(s)),e.is("[validnoerror]")?r=Valid.check(e):(e.attr("validnoerror",!0),r=Valid.check(e),e.removeAttr("validnoerror")),!a.trim()&&(a="&nbsp;"),i._model.focusmsgeverytime(e)?s.html(a).css("display",i._model.validemdisplaytype(e)):r&&s.html(a).css("display",i._model.validemdisplaytype(e))}}},$(document).delegate("input[type=text], input[type=password], textarea","blur",function(e){var t=$(this),n=Valid.getInstance();if(n._model.ignoreAutoCheckEvent(t))return;n.trigger(Model.FOCUS_MSG,[t,!0]),Valid.checkTimeout(t)}),$(document).delegate("input","blur",function(e){var t=$(this),n=Valid.getInstance();if(t.attr("type"))return;if(n._model.ignoreAutoCheckEvent(t))return;n.trigger(Model.FOCUS_MSG,[t,!0]),Valid.checkTimeout(t)}),$(document).delegate("input","focus",function(e){var t=$(this),n=Valid.getInstance(),r=(t.val()||"").trim();if(t.attr("type"))return;if(n._model.ignoreAutoCheckEvent(t))return;n.trigger(Model.FOCUS_MSG,[t]),!r&&Valid.setValid(t)}),$(document).delegate("select, input[type=file], input[type=checkbox], input[type=radio]","change",function(e,t){if(t)return;var n=$(this),r=Valid.getInstance();if(r._model.ignoreAutoCheckEvent(n))return;Valid.checkTimeout(n)}),$(document).delegate("input[type=text], input[type=password], textarea, select, input[type=file], input[type=checkbox], input[type=radio]","focus",function(e){var t=$(this),n=Valid.getInstance(),r=(t.val()||"").trim();if(n._model.ignoreAutoCheckEvent(t))return;n.trigger(Model.FOCUS_MSG,[t]),!r&&Valid.setValid(t)}),$(document).delegate("select, input[type=file], input[type=checkbox], input[type=radio]","blur",function(e){var t=$(this),n=Valid.getInstance();if(n._model.ignoreAutoCheckEvent(t))return;n.trigger(Model.FOCUS_MSG,[t,!0])}),$(document).delegate("input[type=hidden][subdatatype]","change",function(e){var t=$(this),n=Valid.getInstance(),r=!1,i;if(n._model.ignoreAutoCheckEvent(t))return;t.is("[subdatatype]")&&(r=/hidden/i.test(t.attr("subdatatype")));if(t.data("HID_CHANGE_CHECK")){i=(new Date).getTime()-t.data("HID_CHANGE_CHECK");if(i<50)return}if(!t.val())return;t.data("HID_CHANGE_CHECK",(new Date).getTime()),Valid.checkTimeout($(this))}),$(document).delegate("input[type=text][subdatatype], input[type=text][exdatatype]","keyup",function(_evt){var _sp=$(this),_isEx,_isDatavalid=/datavalid/i.test(_sp.attr("exdatatype")||_sp.attr("subdatatype"));if(!_isDatavalid)return;if(_sp.prop("disabled")||_sp.prop("readonly"))return;_sp.attr("exdatatype")&&(_isEx=!0),Valid.dataValid(_sp,!1,!0);var _keyUpCb;_sp.attr("datavalidKeyupCallback")&&(_keyUpCb=window[_sp.attr("datavalidKeyupCallback")])&&_keyUpCb.call(_sp,_evt);if(_sp.data("DataValidInited"))return;_sp.data("DataValidInited",!0),_sp.data("DataValidCache",{}),!_sp.is("[datavalidNoCache]")&&_sp.attr("datavalidNoCache",!0),_sp.on("DataValidUpdate",function(e,t,n){var r,i;if(JC.f.parseBool(_sp.attr("datavalidNoCache")))i=n;else{if(!_sp.data("DataValidCache"))return;i=_sp.data("DataValidCache")[t]}if(!i)return;t==="suchestest"&&(i.data.errorno=0),Valid.dataValid(_sp,!i.data.errorno,!1,i.data.errmsg),_sp.attr("datavalidCallback")&&(r=window[_sp.attr("datavalidCallback")])&&r.call(_sp,i.data,i.text)}),_sp.on("DataValidVerify",function(_evt,_ignoreStatus,_cb){function innerDone(e){_strData=e;if(typeof e=="string")try{e=$.parseJSON(e)}catch(t){e={errorno:1}}var n={key:_v,data:e,text:_strData};!JC.f.parseBool(_sp.attr("datavalidNoCache"))&&(_sp.data("DataValidCache")[_v]=n),_sp.trigger("DataValidUpdate",[_v,n]),_cb&&_cb.call(_sp,n)}var _v=_sp.val().trim(),_tmp,_strData,_url=_sp.attr("datavalidurl"),_datavalidCheckCallback;if(!_v)return;_sp.attr("datavalidCheckCallback")&&(_datavalidCheckCallback=window[_sp.attr("datavalidCheckCallback")]);if(_datavalidCheckCallback){innerDone(_datavalidCheckCallback.call(_sp));return}if(!_url)return;_sp.data("DataValidTm")&&clearTimeout(_sp.data("DataValidTm")),_sp.data("DataValidTm",setTimeout(function(){_v=_sp.val().trim();if(!_v)return;_v=JC.f.encoder(_sp)(_v);if(!_ignoreStatus&&!_sp.data("JCValidStatus"))return;_url=JC.f.printf(_url,_v),_sp.attr("datavalidUrlFilter")&&(_tmp=window[_sp.attr("datavalidUrlFilter")])&&(_url=_tmp.call(_sp,_url));if(_v in _sp.data("DataValidCache")){_sp.trigger("DataValidUpdate",_v);return}var _ajaxType="get",_requestData;_sp.attr("datavalidAjaxType")&&(_ajaxType=_sp.attr("datavalidAjaxType")||_ajaxType);if(_sp.attr("datavalidRequestData"))try{_requestData=eval("("+_sp.attr("datavalidRequestData")+")")}catch(ex){}_requestData=_requestData||{},_ajaxType.toLowerCase()=="post"?$.post(_url,_requestData).done(innerDone):$.get(_url,_requestData).done(innerDone)},151))}),_sp.on("blur",function(e,t){if(t)return;_sp.trigger("DataValidVerify")})}),JC.Valid})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);