{
    appDir: '../www',
    baseUrl: 'js/jc2',
    dir: '../www-build',
    paths: {
        'jquery': 'jquery'
        , 'config': '../project1/config'
        , 'common': '../project1/common'
        , 'JC.common': 'modules/JC.common/0.2/common'
        , 'JC.BaseMVC': 'modules/JC.BaseMVC/0.1/BaseMVC'
    },
    optimize: 'none',
    modules: [
        {
            name: '../project1/config'
        },
        {
            name: '../project1/common'
        },

        {
            name: '../project1/page1'
        },
        {
            name: '../project1/page2'
        }
    ]
}
