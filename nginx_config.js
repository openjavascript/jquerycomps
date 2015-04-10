;(function(){
window.JC = window.JC || {log:function(){}};
JC.PATH = JC.PATH || scriptPath();
//JC.PATH  = 'http://crm.360.cn/static/jc2/';           //test for crm online
//JC.PATH  = '/jc2_requirejs_master/';                  //test for jc2 master
//JC.PATH  = '/jc2_requirejs_master/deploy/normal/';    //test for jc2 deploy
/**
 * requirejs config.js for JC Project
 */

var _configMap = {
    'Base': [
        , '??'
        ,  'modules/JC.common/0.3/common.js'
        , ',modules/JC.BaseMVC/0.1/BaseMVC.js'
        , ',modules/Bizs.KillISPCache/0.1/KillISPCache.js'
        , '?'
    ].join('')

    , 'JC.Calendar': [
        , '??'
        , 'modules/JC.Calendar/0.3/Calendar.js'
        , ',modules/JC.Calendar/0.3/Calendar.date.js'
        , ',modules/JC.Calendar/0.3/Calendar.week.js'
        , ',modules/JC.Calendar/0.3/Calendar.month.js'
        , ',modules/JC.Calendar/0.3/Calendar.season.js'
        , ',modules/JC.Calendar/0.3/Calendar.year.js'
        , ',modules/JC.Calendar/0.3/Calendar.monthday.js'
        ,  ',modules/JC.Tips/0.1/Tips.js'
        , '?'
    ].join('')

    , 'JC.LunarCalendar': [
        , '??'
        , 'modules/JC.LunarCalendar/0.1/LunarCalendar.js'
        , ',modules/JC.LunarCalendar/0.1/LunarCalendar.default.js'
        , ',modules/JC.LunarCalendar/0.1/LunarCalendar.getFestival.js'
        , ',modules/JC.LunarCalendar/0.1/LunarCalendar.gregorianToLunar.js'
        , ',modules/JC.LunarCalendar/0.1/LunarCalendar.nationalHolidays.js'
        , '?'
    ].join('')

    , 'JC.Panel': [
        , '??'
        , 'modules/JC.Panel/0.3/Panel.js'
        , ',modules/JC.Panel/0.3/Panel.default.js'
        , ',modules/JC.Panel/0.3/Panel.popup.js'
        , ',modules/JC.Panel/0.3/Dialog.js'
        , ',modules/JC.Panel/0.3/Dialog.popup.js'
        , '?'
    ].join('')

    , 'JCForm': [
        , '??'
        , 'modules/JC.Valid/0.2/Valid.js'
        , ',modules/JC.AutoChecked/0.1/AutoChecked.js'
        , ',modules/JC.AutoSelect/0.2/AutoSelect.js'
        , ',modules/JC.FormFillUrl/0.1/FormFillUrl.js'
        , ',modules/JC.AutoComplete/0.1/AutoComplete.js'
        , ',modules/JC.Suggest/0.2/Suggest.js'
        , ',modules/JC.Placeholder/0.1/Placeholder.js'
        , ',modules/JC.Form/0.2/Form.js'
        , '?'
    ].join('')

    , 'JCChart': [
        , '??'
        , 'modules/JC.FChart/0.1/FChart.js'
        , ',modules/JC.PopTips/0.2/PopTips.js'
        , ',modules/JC.FlowChart/0.1/FlowChart.js'
        , ',modules/jquery.mousewheel/3.1.12/jquery.mousewheel.js'
        , '?'
    ].join('')

    , 'Comp1': [
        , '??'
        , 'modules/JC.FrameUtil/0.1/FrameUtil.js'
        , ',modules/JC.Tab/0.2/Tab.js'
        , ',modules/JC.TableFreeze/0.2/TableFreeze.js'
        , ',modules/JC.StepControl/0.1/StepControl.js'
        , ',modules/JC.Tree/0.1/Tree.js'
        , '?'
    ].join('')

    , 'Bizs1': [
        , '??'
        , 'modules/Bizs.ActionLogic/0.1/ActionLogic.js'
        , ',modules/Bizs.ChangeLogic/0.1/ChangeLogic.js'
        , ',modules/Bizs.CustomColumn/0.1/CustomColumn.js'
        , ',modules/Bizs.CommonModify/0.1/CommonModify.js'
        , ',modules/Bizs.FormLogic/0.2/FormLogic.js'
        , ',modules/Bizs.DisableLogic/0.1/DisableLogic.js'
        , '?'
    ].join('')

    , 'Bizs2': [
        , '??'
        , 'modules/Bizs.DropdownTree/0.1/DropdownTree.js'
        , ',modules/Bizs.MultiselectPanel/0.1/MultiselectPanel.js'
        , ',modules/Bizs.DMultiDate/0.1/DMultiDate.js'
        , '?'
    ].join('')

    , 'PluginsAlg': [
        , '??'
        , 'plugins/Base64/0.1/Base64.js'
        , ',plugins/md5/0.1/md5.js'
        , ',plugins/Aes/0.1/Aes.js' 
        , '?'
    ].join('')

    , 'tpl': [
        , '??'
        , '?'
    ].join('')

};

window.requirejs && 
requirejs.config( {
    baseUrl: JC.PATH
    , urlArgs: 'v=' + new Date().getTime()
    , paths: {
        'JC.common': _configMap[ 'Base' ]
        , 'JC.BaseMVC': _configMap[ 'Base' ]

        , 'DEV.JC.Panel':           'modules/JC.Panel/dev/Panel'
        , 'DEV.JC.Panel.default':   'modules/JC.Panel/dev/Panel.default'
        , 'DEV.JC.Panel.popup':     'modules/JC.Panel/dev/Panel.popup'
        , 'DEV.JC.Dialog':          'modules/JC.Panel/dev/Dialog'
        , 'DEV.JC.Dialog.popup':    'modules/JC.Panel/dev/Dialog.popup'

        , 'DEV.JC.ImageCutter': 'modules/JC.ImageCutter/dev/ImageCutter'
        , 'DEV.JC.AjaxUpload': 'modules/JC.AjaxUpload/dev/AjaxUpload'
        , 'DEV.JC.Suggest': 'modules/JC.Suggest/dev/Suggest'
        , 'DEV.Bizs.MultiChangeLogic': 'modules/Bizs.MultiChangeLogic/dev/MultiChangeLogic'

        //, 'JC.AjaxUpload': 'modules/JC.AjaxUpload/0.1/AjaxUpload'
        , 'JC.AjaxUpload': 'modules/JC.AjaxUpload/0.2/AjaxUpload'

        , 'JC.AjaxTree': 'modules/JC.AjaxTree/0.1/AjaxTree'
        , 'JC.AutoFixed': 'modules/JC.AutoFixed/0.1/AutoFixed'

        , 'JC.AutoChecked': _configMap[ 'JCForm' ]
        , 'JC.AutoSelect': _configMap[ 'JCForm' ]
        , 'JC.AutoComplete': _configMap[ 'JCForm' ]

        , 'JC.Calendar': _configMap[ 'JC.Calendar' ]
        , 'JC.Calendar.date': _configMap[ 'JC.Calendar' ]
        , 'JC.Calendar.week': _configMap[ 'JC.Calendar' ]
        , 'JC.Calendar.month': _configMap[ 'JC.Calendar' ]
        , 'JC.Calendar.season': _configMap[ 'JC.Calendar' ]
        , 'JC.Calendar.year': _configMap[ 'JC.Calendar' ]
        , 'JC.Calendar.monthday': _configMap[ 'JC.Calendar' ]

        , 'JC.Cover' : 'modules/JC.Cover/0.1/Cover'

        , 'JC.DCalendar': 'modules/JC.DCalendar/0.1/DCalendar'
        , 'JC.DCalendar.date': 'modules/JC.DCalendar/0.1/DCalendar.date'

        , 'JC.Drag': 'modules/JC.Drag/0.1/Drag'
        , 'JC.DragSelect': 'modules/JC.DragSelect/0.1/DragSelect'

        , 'JC.FChart': _configMap[ 'JCChart' ]
        , 'JC.FlowChart': _configMap[ 'JCChart' ]

        , 'JC.Form': _configMap[ 'JCForm' ]
        , 'JC.Fixed': 'modules/JC.Fixed/0.1/Fixed'

        , 'JC.FormFillUrl': _configMap[ 'JCForm' ]
        , 'JC.FrameUtil': _configMap[ 'Comp1' ]

        , 'JC.ImageCutter': 'modules/JC.ImageCutter/0.1/ImageCutter'

        , 'JC.LunarCalendar': _configMap[ 'JC.LunarCalendar' ]
        , 'JC.LunarCalendar.default': _configMap[ 'JC.LunarCalendar' ]
        , 'JC.LunarCalendar.getFestival': _configMap[ 'JC.LunarCalendar' ]
        , 'JC.LunarCalendar.gregorianToLunar': _configMap[ 'JC.LunarCalendar' ]
        , 'JC.LunarCalendar.nationalHolidays': _configMap[ 'JC.LunarCalendar' ]

        , 'JC.NumericStepper': 'modules/JC.NumericStepper/0.1/NumericStepper'
        , 'JC.NSlider': 'modules/JC.NSlider/0.2/NSlider'

        , 'JC.Paginator': 'modules/JC.Paginator/0.1/Paginator'
        
        , 'JC.Rate': 'modules/JC.Rate/0.1/Rate'

        , 'JC.ServerSort': 'modules/JC.ServerSort/0.1/ServerSort'
        , 'JC.Slider': 'modules/JC.Slider/0.1/Slider'
        , 'JC.StepControl':  _configMap[ 'Comp1' ]
        //, 'JC.Suggest': 'modules/JC.Suggest/0.1/Suggest'
        , 'JC.Suggest': _configMap[ 'JCForm' ]

        //, 'JC.Tab': 'modules/JC.Tab/0.1/Tab'
        , 'JC.Tab': _configMap[ 'Comp1' ]

        , 'JC.TableFreeze': _configMap[ 'Comp1' ]
        , 'JC.TableSort': 'modules/JC.TableSort/0.1/TableSort'
        , 'JC.Selectable': 'modules/JC.SelectAble/dev/Selectable'
        , 'JC.Tips': _configMap[ 'JC.Calendar' ]
        , 'JC.Tree': _configMap[ 'Comp1' ]
        , 'JC.Lazyload': 'modules/JC.Lazyload/0.1/Lazyload'
        , 'JC.Scrollbar': 'modules/JC.Scrollbar/0.1/Scrollbar'

        , 'JC.Panel': _configMap[ 'JC.Panel' ]
        , 'JC.Panel.default': _configMap[ 'JC.Panel' ]
        , 'JC.Panel.popup': _configMap[ 'JC.Panel' ]
        , 'JC.Dialog': _configMap[ 'JC.Panel' ]
        , 'JC.Dialog.popup': _configMap[ 'JC.Panel' ]

        , 'JC.Placeholder': _configMap[ 'JCForm' ]
        , 'JC.PopTips': _configMap[ 'JCChart' ]
        , 'JC.Valid': _configMap[ 'JCForm' ]

        , 'Bizs.ActionLogic': _configMap[ 'Bizs1' ]
        , 'Bizs.ChangeLogic': _configMap[ 'Bizs1' ]
        , 'Bizs.CustomColumn' : _configMap[ 'Bizs1' ]
        , 'Bizs.CommonModify': _configMap[ 'Bizs1' ]
        , 'Bizs.FormLogic': _configMap[ 'Bizs1' ]

        , 'Bizs.AutoSelectComplete': 'modules/Bizs.AutoSelectComplete//0.1/AutoSelectComplete'

        , 'Bizs.DisableLogic': _configMap[ 'Bizs1' ]
        , 'Bizs.DropdownTree': _configMap[ 'Bizs2' ]

        , 'Bizs.KillISPCache': _configMap[ 'Base' ]
        , 'Bizs.MoneyTips': 'modules/Bizs.MoneyTips/0.1/MoneyTips'

        , 'Bizs.MultiAutoComplete': 'modules/Bizs.MultiAutoComplete/0.1/MultiAutoComplete'
        , 'Bizs.MultiDate': 'modules/Bizs.MultiDate/0.1/MultiDate'
        , 'Bizs.MultiSelect': 'modules/Bizs.MultiSelect/0.1/MultiSelect'
        , 'Bizs.MultiselectPanel': _configMap[ 'Bizs2' ]
        , 'Bizs.MultiSelectTree': 'modules/Bizs.MultiSelectTree/0.1/MultiSelectTree'
        , 'Bizs.DMultiDate': _configMap[ 'Bizs2' ]
        , 'Bizs.MultiUpload': 'modules/Bizs.MultiUpload/0.1/MultiUpload'
        , 'Bizs.MultiChangeLogic': 'modules/Bizs.MultiChangeLogic/0.1/MultiChangeLogic'

        , 'Bizs.CRMSchedule': 'modules/Bizs.CRMSchedule/0.1/CRMSchedule'
        , 'Bizs.CRMSchedulePopup': 'modules/Bizs.CRMSchedule/0.1/CRMSchedulePopup'

        , 'Bizs.InputSelect': 'modules/Bizs.InputSelect/0.1/InputSelect'
        , 'Bizs.TaskViewer': 'modules/Bizs.TaskViewer/0.1/TaskViewer'

        , 'plugins.jquery.form': 'plugins/jquery.form/3.36.0/jquery.form'
        , 'plugins.jquery.rate': 'plugins/jquery.rate/2.5.2/jquery.rate'

        , 'jquery.mousewheel': _configMap[ 'JCChart' ]
        , 'jquery.form': 'plugins/jquery.form/3.36.0/jquery.form'
        , 'jquery.rate': 'plugins/jquery.rate/2.5.2/jquery.rate'
        , 'jquery.cookie': 'modules/jquery.cookie/1.4.1/jquery.cookie'

        , 'json2': 'modules/JSON/2/JSON'
        , 'plugins.JSON2': 'modules/JSON/2/JSON'
        , 'plugins.json2': 'modules/JSON/2/JSON'

        , 'plugins.Aes': _configMap[ 'PluginsAlg' ]
        , 'plugins.Base64': _configMap[ 'PluginsAlg' ]
        , 'plugins.md5': _configMap[ 'PluginsAlg' ]

        , 'plugins.requirejs.domReady': 'plugins/requirejs.domReady/2.0.1/domReady'

        , 'plugins.swfobject': 'plugins/SWFObject/2.2/SWFObject'
        , 'swfobject': 'modules/swfobject/2.3/swfobject'
        , 'SWFObject': 'modules/swfobject/2.3/swfobject'

        , 'SWFUpload': 'modules/SWFUpload/2.5.0/SWFUpload'
        , 'swfupload': 'modules/SWFUpload/2.5.0/SWFUpload'
        , 'Raphael': 'modules/Raphael/latest/raphael'

        , 'artTemplate':  "modules/artTemplate/3.0/artTemplate"
        , 'store':  "modules/store/1.3.14/store"
    }
});
/**
 * 取当前脚本标签的 src路径 
 * @static
 * @return  {string} 脚本所在目录的完整路径
 */
function scriptPath(){
    var _sc = document.getElementsByTagName('script'), _sc = _sc[ _sc.length - 1 ], _path = _sc.getAttribute('src');
    if( /\//.test( _path ) ){ _path = _path.split('/'); _path.pop(); _path = _path.join('/') + '/'; }
    else if( /\\/.test( _path ) ){ _path = _path.split('\\'); _path.pop(); _path = _path.join('\\') + '/'; }
    return _path;
}
}());
