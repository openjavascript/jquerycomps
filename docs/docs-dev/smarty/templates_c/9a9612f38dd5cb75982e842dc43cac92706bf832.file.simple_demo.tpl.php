<?php /* Smarty version Smarty-3.1.18, created on 2014-12-11 15:38:56
         compiled from "/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/JC.NSlider/0.1/simple_demo.tpl" */ ?>
<?php /*%%SmartyHeaderCode:12245119495485585d5213f5-91752839%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '9a9612f38dd5cb75982e842dc43cac92706bf832' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/JC.NSlider/0.1/simple_demo.tpl',
      1 => 1418025048,
      2 => 'file',
    ),
    '8b0777d0fb3339c6f775dec0786e8bc1acd6ee05' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/simple_demo/base.tpl',
      1 => 1418025048,
      2 => 'file',
    ),
    'bd4e82ecb8f87973244496c7a4a85723f1f13630' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/base.tpl',
      1 => 1418282250,
      2 => 'file',
    ),
    'bb031539420accf0254c88cc1d962283d000e9dd' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/simple_demo/body_header.tpl',
      1 => 1417399569,
      2 => 'file',
    ),
    '1ce9188996a316dd97f7182ef4ea0944c9be316f' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/simple_demo/body_footer.tpl',
      1 => 1417399569,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '12245119495485585d5213f5-91752839',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.18',
  'unifunc' => 'content_5485585d67f070_48666099',
  'variables' => 
  array (
    'PROJECT_ROOT' => 0,
    'URL_ROOT' => 0,
    'SHOW_COMP_INFO' => 0,
    'COMP_URL' => 0,
    'VIEWER_URL' => 0,
    'COMP_ROOT' => 0,
    'NAME' => 0,
    'OUTPUT' => 0,
    'COMP_NAME' => 0,
    'COMP_VERSION' => 0,
    'TDEBUG' => 0,
    'TVERSION' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5485585d67f070_48666099')) {function content_5485585d67f070_48666099($_smarty_tpl) {?><!doctype html>
<html><?php echo $_smarty_tpl->getSubTemplate ("config.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>
<?php echo $_smarty_tpl->getSubTemplate ("public/func.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>
<head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="renderer" content="webkit" />
        <meta name="Keywords" content="JQueryComps,openjavascript,JC,JC2,jquery" />
        <meta name="Description" content="JQueryComps" />
	    <title>Jquey Comps</title>

        <link rel="stylesheet" type="text/css" href="<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/static/css/button.css" />
	    <link rel="stylesheet" type="text/css" href="<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/static/css/common.css" />

        <script>
            window.TPATH = window.PROJECT_ROOT = "<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
";
            window.URL_ROOT = "<?php echo $_smarty_tpl->tpl_vars['URL_ROOT']->value;?>
";

<?php if ((($tmp = @$_smarty_tpl->tpl_vars['SHOW_COMP_INFO']->value)===null||$tmp==='' ? '' : $tmp)) {?>
            window.COMP_URL = "<?php echo (($tmp = @$_smarty_tpl->tpl_vars['COMP_URL']->value)===null||$tmp==='' ? '' : $tmp);?>
";
            window.VIEWER_URL = "<?php echo (($tmp = @$_smarty_tpl->tpl_vars['VIEWER_URL']->value)===null||$tmp==='' ? '' : $tmp);?>
{0}";

            window.COMP_ROOT = "<?php echo (($tmp = @$_smarty_tpl->tpl_vars['COMP_ROOT']->value)===null||$tmp==='' ? '' : $tmp);?>
";

            window.NAME = "<?php echo (($tmp = @$_smarty_tpl->tpl_vars['NAME']->value)===null||$tmp==='' ? '' : $tmp);?>
";
            window.OUTPUT = "<?php echo (($tmp = @$_smarty_tpl->tpl_vars['OUTPUT']->value)===null||$tmp==='' ? '' : $tmp);?>
";

            window.COMP_NAME = "<?php echo (($tmp = @$_smarty_tpl->tpl_vars['COMP_NAME']->value)===null||$tmp==='' ? '' : $tmp);?>
";
            window.COMP_VERSION = "<?php echo (($tmp = @$_smarty_tpl->tpl_vars['COMP_VERSION']->value)===null||$tmp==='' ? '' : $tmp);?>
";
            <?php }?>

        </script>
		<script src="<?php echo $_smarty_tpl->tpl_vars['URL_ROOT']->value;?>
/lib.js"></script>
		<script src="<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/static/js/config.js"></script>

        <script>
            JC.PATH = URL_ROOT;
            JC.debug = <?php echo (($tmp = @$_smarty_tpl->tpl_vars['TDEBUG']->value)===null||$tmp==='' ? 0 : $tmp);?>
;

            requirejs.config( {
                baseUrl: JC.PATH
                , urlArgs: 'v=<?php echo $_smarty_tpl->tpl_vars['TVERSION']->value;?>
'
                , paths: {
                    'common': TPATH + '/static/js/app/common'
                }
            });

        </script>
        

<link rel="stylesheet" type="text/css" href="<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/static/css/codemirror.css" />
<link rel="stylesheet" type="text/css" href="<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/static/css/simple.css" />


        
<!-- start JC style -->
<link href='<?php echo $_smarty_tpl->tpl_vars['URL_ROOT']->value;?>
/modules/<?php echo $_smarty_tpl->tpl_vars['COMP_NAME']->value;?>
/<?php echo $_smarty_tpl->tpl_vars['COMP_VERSION']->value;?>
/res/default/style.css' rel='stylesheet' />
<!-- end JC style -->
<style>
    .ajaxtree-demo1 {
        margin-left: 50px;
    }
</style>


        
        
    </head>
    <body>
        <?php echo $_smarty_tpl->getSubTemplate ("public/body_header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

        
    <?php /*  Call merged included template "public/simple_demo/body_header.tpl" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("public/simple_demo/body_header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '12245119495485585d5213f5-91752839');
content_54894a1094c927_11897944($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); 
/*  End of included template "public/simple_demo/body_header.tpl" */?>

        

        
<?php /*  Call merged included template "public/simple_demo/body_header.tpl" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("public/simple_demo/body_header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '12245119495485585d5213f5-91752839');
content_54894a1094c927_11897944($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); 
/*  End of included template "public/simple_demo/body_header.tpl" */?>
<div class="codeview-wrap">
    <div class="codeview-tabbar">
        <a href="#" class="codeview-css">CSS</a>
        <a href="#" class="codeview-js">JS</a>
        <a href="#" class="codeview-html">HTML</a>
        <a href="#" class="codeview-page selected">PAGE</a>
    </div>
    <div class="codeview-view">
        <div class="codeview-cssview">
<textArea style="display:none;">
<link href='<?php echo $_smarty_tpl->tpl_vars['URL_ROOT']->value;?>
/modules/<?php echo $_smarty_tpl->tpl_vars['COMP_NAME']->value;?>
/<?php echo $_smarty_tpl->tpl_vars['COMP_VERSION']->value;?>
/res/default/style.css' rel='stylesheet' />
</textArea>
        </div>
        <div class="codeview-jsview">
            <textArea style="display:none;"></textArea>
        </div>
        <div class="codeview-htmlview">
            <textArea style="display:none;"></textArea>
        </div>
        <div class="codeview-pageview nowview">
            <div style="position:fixed; right: 30px; top: 40px;">
                <dl>
                    <dd>
                    <a style="margin-right: 10px; color: #ccc;" href="?">init Tree</a>
                    <button type="button" class="js_open_all">open all</button>
                    <button type="button" class="js_close_all">close all</button>
                    <button type="button" class="js_open_for" data_target="#open_to_val">open for</button>
                    <input type="text" value="0101" id="open_to_val" style="width: 60px;" />
                    <button type="button" class="js_close_for" data_target="#open_to_val">close for</button>
                    </dd>
                </dl>
            </div>
            <div class="show-html">
                <!-- simple demo -->
                <dl class="ajaxtree-demo1">
                    <dt>默认树 - Tree 示例</dt>
                    <dd>
                        <!-- class="js_compAjaxTree" is necessary -->
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
                                    , url: "<?php echo $_smarty_tpl->tpl_vars['COMP_ROOT']->value;?>
/_demo/data/treedata.php"
                                }
                            </script>
                        </div>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" class="show-js">
    requirejs( [ '<?php echo $_smarty_tpl->tpl_vars['URL_ROOT']->value;?>
/modules/<?php echo $_smarty_tpl->tpl_vars['COMP_NAME']->value;?>
/<?php echo $_smarty_tpl->tpl_vars['COMP_VERSION']->value;?>
/<?php echo $_smarty_tpl->tpl_vars['OUTPUT']->value;?>
' ] );

    /* include JC.AjaxTree.js */

    var ajaxTree;

    /* open all */
    $( document ).delegate('button.js_open_all', 'click', function(){
        $('div.js_compAjaxTree').each( function( _k ){
            ajaxTree = JC.BaseMVC.getInstance( this, JC.AjaxTree ); 
            ajaxTree && ajaxTree.open();
        });
    });

    /* close all */
    $( document ).delegate('button.js_close_all', 'click', function(){
        $('div.js_compAjaxTree').each( function(){
            ajaxTree = JC.BaseMVC.getInstance( this, JC.AjaxTree );
            ajaxTree && ajaxTree.close();
        });
    });

    /* open node */
    $( document ).delegate('button.js_open_for', 'click', function(){
    
        var _tgr = $(this).attr('data_target');
        if( !_tgr ) return;
        _tgr = $.trim( $( _tgr ).val() );

        $('div.js_compAjaxTree').each( function(){
            ajaxTree = JC.BaseMVC.getInstance( this, JC.AjaxTree );
            ajaxTree && ajaxTree.open( _tgr );
        });
    });

    /* close node */
    $( document ).delegate('button.js_close_for', 'click', function(){
    
        var _tgr = $(this).attr('data_target');
        if( !_tgr ) return;
        _tgr = $.trim( $( _tgr ).val() );

        $('div.js_compAjaxTree').each( function(){
            ajaxTree = JC.BaseMVC.getInstance( this, JC.AjaxTree );
            ajaxTree && ajaxTree.close( _tgr );
        });
    });

</script>
<?php /*  Call merged included template "public/simple_demo/body_footer.tpl" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("public/simple_demo/body_footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '12245119495485585d5213f5-91752839');
content_54894a1095e298_03462118($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); 
/*  End of included template "public/simple_demo/body_footer.tpl" */?>


        
              

        
    <script>
        requirejs( [ "<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/static/js/app/simple_demo.js" ] );
    </script>
    
    <?php /*  Call merged included template "public/simple_demo/body_footer.tpl" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("public/simple_demo/body_footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '12245119495485585d5213f5-91752839');
content_54894a1095e298_03462118($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); 
/*  End of included template "public/simple_demo/body_footer.tpl" */?>

        <?php echo $_smarty_tpl->getSubTemplate ("public/body_footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>


         
        <?php if (isset($_GET['debug'])&&$_GET['debug']=='1') {?><?php $_smarty_tpl->smarty->loadPlugin('Smarty_Internal_Debug'); Smarty_Internal_Debug::display_debug($_smarty_tpl); ?><?php }?>
    </body>
</html>
<?php }} ?>
<?php /* Smarty version Smarty-3.1.18, created on 2014-12-11 15:38:56
         compiled from "/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/simple_demo/body_header.tpl" */ ?>
<?php if ($_valid && !is_callable('content_54894a1094c927_11897944')) {function content_54894a1094c927_11897944($_smarty_tpl) {?><?php }} ?>
<?php /* Smarty version Smarty-3.1.18, created on 2014-12-11 15:38:56
         compiled from "/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/simple_demo/body_footer.tpl" */ ?>
<?php if ($_valid && !is_callable('content_54894a1095e298_03462118')) {function content_54894a1095e298_03462118($_smarty_tpl) {?><?php }} ?>
