window.JC = window.JC || {log:function(){}};
JC.PATH = JC.PATH || scriptPath();
/**
 * requirejs config.js for JC Project
 */
window.requirejs && 
requirejs.config( {
    baseUrl: JC.PATH
    , paths: {
        'JC.common': 'common'
        , 'JC.BaseMVC': 'comps/BaseMVC/BaseMVC'

        , 'JC.AjaxUpload': 'comps/AjaxUpload/AjaxUpload'
        , 'JC.AutoChecked': 'comps/AutoChecked/AutoChecked'
        , 'JC.AutoSelect': 'comps/AutoSelect/AutoSelect'

        , 'JC.Calendar': 'comps/Calendar/Calendar'

        , 'JC.Form': 'comps/Form/Form'
        , 'JC.Fixed': 'comps/Fixed/Fixed'
        , 'JC.LunarCalendar': 'comps/LunarCalendar/LunarCalendar'
        , 'JC.Slider': 'comps/Slider/Slider'
        , 'JC.Suggest': 'comps/Suggest/Suggest'
        , 'JC.Tab': 'comps/Tab/Tab'
        , 'JC.Tips': 'comps/Tips/Tips'
        , 'JC.Tree': 'comps/Tree/Tree'

        , 'JC.Panel': 'comps/Panel/Panel'
        , 'JC.Placeholder': 'comps/Placeholder/Placeholder'
        , 'JC.Valid': 'comps/Valid/Valid'

        , 'Bizs.ActionLogic': 'bizs/ActionLogic/ActionLogic'
        , 'Bizs.DisableLogic': 'bizs/DisableLogic/DisableLogic'
        , 'Bizs.CommonModify': 'bizs/CommonModify/CommonModify'
        , 'Bizs.FormLogic': 'bizs/FormLogic/FormLogic'
        , 'Bizs.KillISPCache': 'bizs/KillISPCache/KillISPCache'
        , 'Bizs.MultiDate': 'bizs/MultiDate/MultiDate'

        , 'plugins.domReady': 'plugins/domReady'
        , 'plugins.aes': 'plugins/aes'
        , 'plugins.base64': 'plugins/base64'
        , 'plugins.json2': 'plugins/json2'
        , 'plugins.jquery.form': 'plugins/jquery.form'
        , 'plugins.md5': 'plugins/md5.js'
        , 'plugins.rate': 'plugins/rate/rate'
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

