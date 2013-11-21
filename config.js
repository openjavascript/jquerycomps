window.JC = window.JC || {log:function(){}};
JC.PATH = JC.PATH || scriptPath();
/**
 * requirejs config.js for JC Project
 */
window.requirejs && 
requirejs.config( {
    baseUrl: JC.PATH
    , paths: {
        'JC.common': 'modules/JC.common/0.2/common'
        , 'JC.BaseMVC': 'modules/JC.BaseMVC/0.1/BaseMVC'

        , 'JC.AjaxUpload': 'modules/JC.AjaxUpload/0.1/AjaxUpload'
        , 'JC.AutoChecked': 'modules/JC.AutoChecked/0.1/AutoChecked'
        , 'JC.AutoSelect': 'modules/JC.AutoSelect/0.2/AutoSelect'
        , 'JC.AutoComplete': 'modules/JC.AutoComplete/0.1/AutoComplete'

        , 'JC.Calendar': 'modules/JC.Calendar/0.2/Calendar'

        , 'JC.Form': 'modules/JC.Form/0.1/Form'
        , 'JC.Fixed': 'modules/JC.Fixed/0.1/Fixed'
        , 'JC.LunarCalendar': 'modules/JC.LunarCalendar/0.1/LunarCalendar'
        , 'JC.Slider': 'modules/JC.Slider/0.1/Slider'
        , 'JC.Suggest': 'modules/JC.Suggest/0.1/Suggest'
        , 'JC.Tab': 'modules/JC.Tab/0.1/Tab'
        , 'JC.Tips': 'modules/JC.Tips/0.1/Tips'
        , 'JC.Tree': 'modules/JC.Tree/0.1/Tree'

        , 'JC.Panel': 'modules/JC.Panel/0.1/Panel'
        , 'JC.Placeholder': 'modules/JC.Placeholder/0.1/Placeholder'
        , 'JC.Valid': 'modules/JC.Valid/0.2/Valid'

        , 'Bizs.ActionLogic': 'modules/Bizs.ActionLogic/0.1/ActionLogic'
        , 'Bizs.DisableLogic': 'modules/Bizs.DisableLogic/0.1/DisableLogic'
        , 'Bizs.CommonModify': 'modules/Bizs.CommonModify/0.1/CommonModify'
        , 'Bizs.FormLogic': 'modules/Bizs.FormLogic/0.1/FormLogic'
        , 'Bizs.KillISPCache': 'modules/Bizs.KillISPCache/0.1/KillISPCache'
        , 'Bizs.MoneyTips': 'modules/Bizs.MoneyTips/0.1/MoneyTips'
        , 'Bizs.MultiDate': 'modules/Bizs.MultiDate/0.1/MultiDate'

        , 'plugins.domReady': 'modules/JC.plugins/domReady'
        , 'plugins.aes': 'modules/JC.plugins/aes'
        , 'plugins.base64': 'modules/JC.plugins/base64'
        , 'plugins.json2': 'modules/JC.plugins/json2'
        , 'plugins.jquery.form': 'modules/JC.plugins/jquery.form'
        , 'plugins.md5': 'modules/JC.plugins/md5'
        , 'plugins.rate': 'modules/JC.plugins/rate/rate'
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

