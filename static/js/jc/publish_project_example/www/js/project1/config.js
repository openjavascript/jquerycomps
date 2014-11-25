//The build will inline common dependencies into this file.

//For any third party dependencies, like jQuery, place them in the lib folder.

//Configure loading modules from the lib directory,
//except for 'app' ones, which are in a sibling
//directory.
requirejs.config({
    baseUrl: '../js/',
    paths: {
        'jquery': 'jc2/jquery'
        , 'config': 'project1/config'
        , 'common': 'project1/common'
        , 'JC.common': 'jc2/modules/JC.common/0.2/common'
        , 'JC.BaseMVC': 'jc2/modules/JC.BaseMVC/0.1/BaseMVC'
    }
});
