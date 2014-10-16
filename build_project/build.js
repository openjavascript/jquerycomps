{
    appDir: '../www',
    baseUrl: 'js/lib',
    dir: '../www-built',
    paths: {
        'config': '../config'
        , 'common': '../common'
        , 'JC.common': 'modules/JC.common/0.2/common'
        , 'JC.BaseMVC': 'modules/JC.BaseMVC/0.1/BaseMVC'
    },
    optimize: 'none',
    modules: [
        //First set up the common build layer.
        {
            //module names are relative to baseUrl
            name: '../config',
            //List common dependencies here. Only need to list
            //top level dependencies, "include" will find
            //nested dependencies.
            include: [
            ]
        },

        {
            //module names are relative to baseUrl
            name: '../common',
            //List common dependencies here. Only need to list
            //top level dependencies, "include" will find
            //nested dependencies.
        },

        //Now set up a build layer for each page, but exclude
        //the common one. "exclude" will exclude
        //the nested, built dependencies from "common". Any
        //"exclude" that includes built modules should be
        //listed before the build layer that wants to exclude it.
        //"include" the appropriate "app/main*" module since by default
        //it will not get added to the build since it is loaded by a nested
        //require in the page*.js files.
        {
            //module names are relative to baseUrl/paths config
            name: '../page1',
        },

        {
            //module names are relative to baseUrl
            name: '../page2',
        }

    ]
}
