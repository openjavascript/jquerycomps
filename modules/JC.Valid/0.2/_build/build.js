 ({
    baseUrl: '../../../../'
    , dir: '../../../../deploy/JC.Valid'
    , fileExclusionRegExp: /^(((r|build)\.js)|document.html|index.php|[\s\S]+?\.md|(_demo|docs|docs_api|tools|deploy|dist|node_modules|\.git|\.gitignore))$/
    //, optimizeCss: 'standard'
    , modules: [
         { 'name': 'modules/JC.Valid/0.2/_build/module1' }
         , { 'name': 'modules/JC.Valid/0.2/_build/module2' }
    ]
    , removeCombined: false
    , paths: {
        'JC.common': 'modules/JC.common/0.2/common'
        , 'JC.SelectorMVC': 'modules/JC.SelectorMVC/0.1/SelectorMVC'

        , 'JC.AjaxUpload': 'modules/JC.AjaxUpload/0.1/AjaxUpload'
        , 'JC.AutoChecked': 'modules/JC.AutoChecked/3.0/AutoChecked'
        , 'JC.AutoSelect': 'modules/JC.AutoSelect/0.2/AutoSelect'
        , 'JC.AutoComplete': 'modules/JC.AutoComplete/3.0/AutoComplete'

        , 'JC.Calendar': 'modules/JC.Calendar/0.2/Calendar'

        , 'JC.Form': 'modules/JC.Form/0.1/Form'
        , 'JC.Fixed': 'modules/JC.Fixed/0.1/Fixed'
        , 'JC.LunarCalendar': 'modules/JC.LunarCalendar/0.1/LunarCalendar'
        , 'JC.Slider': 'modules/JC.Slider/3.0/Slider'
        , 'JC.Suggest': 'modules/JC.Suggest/3.0/Suggest'
        , 'JC.Tab': 'modules/JC.Tab/3.0/Tab'
        , 'JC.Tips': 'modules/JC.Tips/3.0/Tips'
        , 'JC.Tree': 'modules/JC.Tree/0.1/Tree'

        , 'JC.Panel': 'modules/JC.Panel/0.1/Panel'
        , 'JC.Placeholder': 'modules/JC.Placeholder/3.0/Placeholder'
        , 'JC.Valid': 'modules/JC.Valid/0.2/Valid'

        , 'Bizs.ActionLogic': 'modules/Bizs.ActionLogic/3.0/ActionLogic'
        , 'Bizs.AutoSelectComplete': 'modules/Bizs.AutoSelectComplete//0.1/AutoSelectComplete'
        , 'Bizs.DisableLogic': 'modules/Bizs.DisableLogic/0.1/DisableLogic'
        , 'Bizs.CommonModify': 'modules/Bizs.CommonModify/0.1/CommonModify'
        , 'Bizs.FormLogic': 'modules/Bizs.FormLogic/0.1/FormLogic'
        , 'Bizs.KillISPCache': 'modules/Bizs.KillISPCache/0.1/KillISPCache'
        , 'Bizs.MoneyTips': 'modules/Bizs.MoneyTips/0.1/MoneyTips'
        , 'Bizs.MultiDate': 'modules/Bizs.MultiDate/0.1/MultiDate'

        , 'plugins.jquery.form': 'plugins/jquery.form/3.36.0/jquery.form'
        , 'plugins.jquery.rate': 'plugins/jquery.rate/2.5.2/jquery.rate'
        , 'plugins.requirejs.domReady': 'plugins/requirejs.domReady/2.0.1/domReady'
        , 'plugins.JSON2': 'plugins/JSON/2/JSON'
        , 'plugins.Aes': 'plugins/Aes/0.1/Aes'
        , 'plugins.Base64': 'plugins/Base64/0.1/Base64'
        , 'plugins.md5': 'plugins/md5/0.1/md5'
    }
})

