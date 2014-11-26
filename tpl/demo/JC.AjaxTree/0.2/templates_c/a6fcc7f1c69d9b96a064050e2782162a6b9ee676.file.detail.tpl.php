<?php /* Smarty version Smarty-3.1.18, created on 2014-11-26 17:15:53
         compiled from "detail.tpl" */ ?>
<?php /*%%SmartyHeaderCode:10527547590463906d9-86262356%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'a6fcc7f1c69d9b96a064050e2782162a6b9ee676' => 
    array (
      0 => 'detail.tpl',
      1 => 1416993280,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '10527547590463906d9-86262356',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.18',
  'unifunc' => 'content_5475904642b8d1_01371111',
  'variables' => 
  array (
    'compData' => 0,
    'd' => 0,
    'allVersionComps' => 0,
    'comp' => 0,
    'requireComps' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5475904642b8d1_01371111')) {function content_5475904642b8d1_01371111($_smarty_tpl) {?><!doctype html>
<html>
    <head>
    <meta charset="utf-8" />
        <title>JC.AjaxTree detail</title>

        <!-- start pageCommon style -->
        <link rel="stylesheet" type="text/css" href="../../../../static/css/common.css" />
        <link rel="stylesheet" type="text/css" href="../../../../static/css/app/detail.css" />
        <!-- end pageCommon style -->

        <!-- start codeview style -->
        <link rel="stylesheet" type="text/css" href="../../../../static/js/codeMirror/lib/codemirror.css" />
        <!-- end codeview style -->

        <!-- start JC style -->
        <link href='../../../../static/js/jc/modules/JC.AjaxTree/0.1/res/default/style.css' rel='stylesheet' />
        <!-- end JC style -->

        <!-- start page style -->
        <style type="text/css">

        </style>
        <!-- end page style -->
        
        <script src="../../../../static/js/jc/lib.js"></script>
        <script src="../../../../static/js/config.js"></script>

    </head>
    <body>
        <div class="wrap">
            <div id="compTitle">
                <h1 class="detail-title"><?php echo $_smarty_tpl->tpl_vars['compData']->value['name'];?>
</h1>
                <h2 class="detail-subtitle">
                    <?php echo $_smarty_tpl->tpl_vars['compData']->value['subtitle'];?>

                    <a href="<?php echo $_smarty_tpl->tpl_vars['compData']->value['download'];?>
" target="_blank" class="detail-titlebtn">DOWN LOAD</a>
                    <a href="<?php echo $_smarty_tpl->tpl_vars['compData']->value['api'];?>
" target="_blank" class="detail-titlebtn">查看API</a>
                </h2>
            </div>
            <div class="detail-attr">
                <h3 id="navmark-desc" class="detail-blockname ">组件简介</h3>
                <div class="detail-ct">
                    <div class="detail-desc">
                        <?php  $_smarty_tpl->tpl_vars['d'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['d']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['compData']->value['desc']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['d']->key => $_smarty_tpl->tpl_vars['d']->value) {
$_smarty_tpl->tpl_vars['d']->_loop = true;
?>
                        <p class="desc"><?php echo $_smarty_tpl->tpl_vars['d']->value;?>
</p>
                        <?php } ?>
                    </div>
                    <p class="desc">some <em>other words</em> ...</p>
                </div>
                <h3 id="navmark-use" class="detail-blockname" >使用说明</h3>
                <div class="detail-ct detail-use">
                    <h4 id="navmark-version" class="detail-groupname ">历史版本 : </h4>
                    <div class="detail-version">
                        <?php  $_smarty_tpl->tpl_vars['comp'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['comp']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['allVersionComps']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['comp']->key => $_smarty_tpl->tpl_vars['comp']->value) {
$_smarty_tpl->tpl_vars['comp']->_loop = true;
?>
                            <?php if (!$_smarty_tpl->tpl_vars['comp']->value['hide']) {?>
                            <a href="#" class="detail-versionlink <?php if ($_smarty_tpl->tpl_vars['comp']->value['nowVersion']) {?>detail-nowVersion<?php }?>" data-name="<?php echo $_smarty_tpl->tpl_vars['comp']->value['name'];?>
">
                            <?php echo $_smarty_tpl->tpl_vars['comp']->value['version'];?>

                            </a>
                            <?php }?>
                        <?php } ?>
                    </div>
                    <h4 id="navmark-require" class="detail-groupname ">组件依赖 : </h4>
                    <div class="detail-require">
                        <p>
                            <?php if (sizeof($_smarty_tpl->tpl_vars['requireComps']->value)>0) {?>
                                <?php  $_smarty_tpl->tpl_vars['comp'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['comp']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['requireComps']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['comp']->key => $_smarty_tpl->tpl_vars['comp']->value) {
$_smarty_tpl->tpl_vars['comp']->_loop = true;
?>
                                <?php if ($_smarty_tpl->tpl_vars['comp']->value['outlink']) {?>
                                    <a href="<?php echo $_smarty_tpl->tpl_vars['comp']->value['outlink'];?>
" target="_blank">
                                        <?php echo $_smarty_tpl->tpl_vars['comp']->value['name'];?>
 - v<?php echo $_smarty_tpl->tpl_vars['comp']->value['version'];?>

                                    </a>
                                <?php } else { ?>
                                    <?php if (!$_smarty_tpl->tpl_vars['comp']->value['hide']) {?>
                                    <a href="#" class="detail-requirelink">
                                        <?php echo $_smarty_tpl->tpl_vars['comp']->value['name'];?>
 - v<?php echo $_smarty_tpl->tpl_vars['comp']->value['version'];?>

                                    </a>
                                    <?php }?>
                                <?php }?>
                                <?php } ?>
                            <?php } else { ?>
                                <em>无依赖</em>
                            <?php }?>
                        </p>
                    </div>
                    <h4 id="navmark-link" class="detail-groupname">外链形式 : </h4>
                    <textArea class="detail-code">
                    </textArea>
                    <h4 id="navmark-load" class="detail-groupname">模块加载形式 : </h4>
                    <textArea class="detail-code"></textArea>
                </div>
                <h3 id="navmark-attr" class="detail-blockname">HTML 属性</h3>
                <div class="detail-ct detail-htmlattr">
                    <textArea class="detail-code"></textArea>
                </div>
                <h3 id="navmark-data" class="detail-blockname">数据格式</h3>
                <div class="detail-ct detail-data">
                    <textArea class="detail-code"></textArea>
                </div>
            </div>
            <div class="detail-demo">
                <h3 id="navmark-demo" class="detail-blockname">DEMO</h3>
                <div class="detail-ct">
                    <h4 id="navmark-demo1" class="detail-groupname k">DEMO1 : Defualt</h4>
                    <p class="desc">
                        下面是AJAX 树的一个DEMO，菜单组件是一个很NB的组件,AJAX 树菜单组件是一个很NB的组件,AJAX 树菜单组件是一个很NB的组件,AJAX 树菜单组件是一个很NB的组件。
                    </p>
                    <div class="detail-demoview">

                        <div class="js_compAjaxTree" data-cajScriptData="|script">
                            <script type="text/template">
                                {
                                    data:  {
                                        "0": [
                                                ["folder","01","非异步节点01"],
                                                ["folder","02","非异步节点02"],
                                                ["folder","03","异步节点"],
                                                ["file","04","叶末节点"]
                                            ],
                                        "01": [
                                                ["folder","0101","folder0101"],
                                                ["file","0102","file0102"],
                                                ["file","0103","file0103"]
                                            ],
                                        "02": [
                                                ["file","0201","file0201"],
                                                ["file","0202","file0202"]
                                            ],
                                        "0101": [
                                                ["file","010101","file010101"],
                                                ["file","010102","file010102"]
                                            ]

                                    }
                                    , root: ["folder","0",'root']
                                    , url: "data/treedata.php"
                                }
                            </script>
                        </div>

                    </div>

                    <h4 id="navmark-demo2" class="detail-groupname">DEMO2 : 使用方法对树进行展开收缩</h4>
                    <p class="desc">
                        AjaxTree也对外部暴露了对树节点的操作方法，你可以通过<em>JC.BaseMVC</em>的<em>getInstance( Dom, CompType )</em>方法获取AjaxTree的实例，然后通过<em>open()</em>、<em>close()</em>、<em>open( data_id )</em>或者<em>close( data_id )</em>对树节点进行操作。
                    </p>
                    <div class="detail-demoview">

                        <div>
                            <button type="button" class="js_open_all">open all</button>
                            <button type="button" class="js_close_all">close all</button>
                            <button type="button" class="js_open_for" data_target="#open_to_val">open for</button>
                            <input type="text" value="0101" id="open_to_val" style="width: 60px;" />
                            <button type="button" class="js_close_for" data_target="#open_to_val">close for</button>
                        </div>
                        <div class="js_compAjaxTree" data-cajScriptData="|script">
                            <script type="text/template">
                                {
                                    data: {
                                        "0": [
                                                ["folder","01","非异步节点01"],
                                                ["folder","02","非异步节点02"],
                                                ["folder","03","异步节点"],
                                                ["file","04","叶末节点"]
                                            ],
                                        "01": [
                                                ["folder","0101","folder0101"],
                                                ["file","0102","file0102"],
                                                ["file","0103","file0103"]
                                            ],
                                        "02": [
                                                ["file","0201","file0201"],
                                                ["file","0202","file0202"]
                                            ],
                                        "0101": [
                                                ["file","010101","file010101"],
                                                ["file","010102","file010102"]
                                            ]

                                    }
                                    , root: ["folder","0",'root']
                                    , url: "data/treedata.php"
                                }
                            </script>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <!-- 外链形式 start -->
        <textArea class="detail-codetpl" type="text/template">
            <link href='/module/JC.AjaxTree/0.1/res/default/style.css' rel='stylesheet' />

            <script src="/module/JC.plugins/JSON/2/JSON.js" />
            <script src="/module/JC.common/0.2/common.js" />
            <script src="/module/JC.BaseMVC/0.1/BaseMVC.js" />
            <script src="/module/JC.AjaxTree/0.1/AjaxTree.js" />
        </textArea>
        <!-- 外链形式 end -->

        <!-- 模块加载 start -->
        <textArea class="detail-codetpl" type="text/template">
            <link href='/module/JC.AjaxTree/0.1/res/default/style.css' rel='stylesheet' />

            <script>
                requirejs( [ 'module/JC.AjaxTree/0.1/AjaxTree' ], function( AjaxTree ){
                });
            </script>
        </textArea>
        <!-- 模块加载 end -->

        <!-- HTML属性 start -->
        <textArea class="detail-codetpl" type="text/template">
            data-defaultOpenRoot = bool, default = true
                如果没有默认选中节点， 是否展开根节点

            data-cajScriptData = script selector
                从脚本模板解释数据

            data-cajData = object name of window
                从window变量获取数据

            data-cajUrl = url
                从 url 加载数据

            data-rootId = node id, default = ''
                指定根节点ID

            data-urlArgName = string, default = 'tree_node'
                书节点的URL参数名

            data-typeIndex = int, default = 0
                数据节点中 节点类型 所在的索引位置

            data-idIndex = int, default = 1
                数据节点中 节点id 所在的索引位置

            data-nameIndex = int, default = 2
                数据节点中 节点name 所在的索引位置
        </textArea>
        <!-- HTML属性 end -->

        <!-- 数据结构 start -->
        <textArea class="detail-codetpl" type="text/template">
            {
                //根节点
                root: [
                          "folder"  //节点类型
                          , "0"     //根节点ID
                          , "root"  // 根节点名
                    ]

                //数据接口
                , url: "data/treedata.php?id={0}"

                //子节点数据
                , data: 
                {
                    "0": [
                            ["folder","01","非异步节点01"],
                            ["folder","02","非异步节点02"],
                            ["folder","03","异步节点"],
                            ["file","04","叶末节点"]
                        ],
                    "01": [
                            ["folder","0101","folder0101"],
                            ["file","0102","file0102"],
                            ["file","0103","file0103"]
                        ],
                    "02": [
                            ["file","0201","file0201"],
                            ["file","0202","file0202"]
                        ],
                    "0101": [
                            ["file","010101","file010101"],
                            ["file","010102","file010102"]
                        ]
                }
            }
        </textArea>
        <!-- 数据结构 end -->

        <script type="text/javascript">
            JC.debug = 1;

            requirejs( [ 
                'JC.AjaxTree'
                , 'detail'
            ], function(){
                 $(document).delegate('button.js_open_all', 'click', function( e ){
                    var btn = $( e.target );

                    btn.closest( '.detail-demoview' ).find( 'div.js_compAjaxTree' ).each( function( _k ){
                        JC.BaseMVC.getInstance( this, JC.AjaxTree ) && JC.BaseMVC.getInstance(this, JC.AjaxTree ).open();
                    });
                });

                $(document).delegate('button.js_close_all', 'click', function( e ){
                    var btn = $( e.target );
                    
                    btn.closest( '.detail-demoview' ).find( 'div.js_compAjaxTree' ).each( function(){
                        JC.BaseMVC.getInstance( this, JC.AjaxTree ) && JC.BaseMVC.getInstance(this, JC.AjaxTree ).close();
                    });
                });

                $(document).delegate('button.js_open_for', 'click', function( e ){
                
                    var _tgr = $(this).attr('data_target');
                    if( !_tgr ) return;
                    _tgr = $.trim( $( _tgr ).val() );

                    var btn = $( e.target );
                    
                    btn.closest( '.detail-demoview' ).find( 'div.js_compAjaxTree' ).each( function(){
                        JC.BaseMVC.getInstance( this, JC.AjaxTree ) && JC.BaseMVC.getInstance( this, JC.AjaxTree ).open( _tgr );
                    });
                });

                $(document).delegate('button.js_close_for', 'click', function( e ){
                
                    var _tgr = $(this).attr('data_target');
                    if( !_tgr ) return;
                    _tgr = $.trim( $( _tgr ).val() );

                    var btn = $( e.target );
                    
                    btn.closest( '.detail-demoview' ).find( 'div.js_compAjaxTree' ).each( function(){
                        JC.BaseMVC.getInstance( this, JC.AjaxTree ) && JC.BaseMVC.getInstance( this, JC.AjaxTree ).close( _tgr );
                    });
                });
            });
        </script>
    </body>
</html>

<?php }} ?>
