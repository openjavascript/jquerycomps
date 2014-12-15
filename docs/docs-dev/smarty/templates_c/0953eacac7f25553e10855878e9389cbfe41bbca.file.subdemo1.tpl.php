<?php /* Smarty version Smarty-3.1.18, created on 2014-12-12 16:08:57
         compiled from "/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/Bizs.ActionLogic/0.1/subdemo1.tpl" */ ?>
<?php /*%%SmartyHeaderCode:3522818455487aed8985217-08446725%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '0953eacac7f25553e10855878e9389cbfe41bbca' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/Bizs.ActionLogic/0.1/subdemo1.tpl',
      1 => 1418181097,
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
  'nocache_hash' => '3522818455487aed8985217-08446725',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.18',
  'unifunc' => 'content_5487aed8a80871_49336622',
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
<?php if ($_valid && !is_callable('content_5487aed8a80871_49336622')) {function content_5487aed8a80871_49336622($_smarty_tpl) {?><?php if (!is_callable('smarty_modifier_regex_replace')) include '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/smarty_lib/plugins/modifier.regex_replace.php';
?><!doctype html>
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
<!-- end JC style -->
<style>
</style>


        
        
    </head>
    <body>
        <?php echo $_smarty_tpl->getSubTemplate ("public/body_header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

        
    <?php /*  Call merged included template "public/simple_demo/body_header.tpl" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("public/simple_demo/body_header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '3522818455487aed8985217-08446725');
content_548aa2995bf756_92544667($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); 
/*  End of included template "public/simple_demo/body_header.tpl" */?>

        

        
<?php /*  Call merged included template "public/simple_demo/body_header.tpl" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("public/simple_demo/body_header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '3522818455487aed8985217-08446725');
content_548aa2995bf756_92544667($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); 
/*  End of included template "public/simple_demo/body_header.tpl" */?>
<?php $_smarty_tpl->tpl_vars["url"] = new Smarty_variable(smarty_modifier_regex_replace($_SERVER['REQUEST_URI'],"/\&type\=[^&]+/",''), null, 0);?>

<div>
    <?php echo $_smarty_tpl->tpl_vars['url']->value;?>

</div>

<style class="show-css">
@import url( '<?php echo $_smarty_tpl->tpl_vars['URL_ROOT']->value;?>
/modules/JC.Panel/0.2/res/default/style.css' );
</style>
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
</textArea>
        </div>
        <div class="codeview-jsview">
            <textArea style="display:none;"></textArea>
        </div>
        <div class="codeview-htmlview">
            <textArea style="display:none;"></textArea>
        </div>
        <div class="codeview-pageview nowview">
            <div class="show-html">

<dl>

    <dd>
        <button type="button" 
            class="js_bizsActionLogic"
            balType="link" 
            balUrl="<?php echo $_smarty_tpl->tpl_vars['url']->value;?>
&type=direct1"
        >直接跳转, balUrl</button>
        , <a href="#"
            class="js_bizsActionLogic"
            balType="link" 
            balUrl="<?php echo $_smarty_tpl->tpl_vars['url']->value;?>
&type=direct2"
        >属性跳转 balUrl</a>
        , <a href="<?php echo $_smarty_tpl->tpl_vars['url']->value;?>
&type=direct3"
            class="js_bizsActionLogic"
            balType="link" 
        >href 跳转</a>
    </dd>
    <dd>
        二次确认
        <button type="button" 
            class="js_bizsActionLogic"
            balType="link" 
            balUrl="<?php echo $_smarty_tpl->tpl_vars['url']->value;?>
&type=direct2_1"
            balConfirmMsg="确认要跳转吗?"
        >balUrl</button>
        , <a href="#"
            class="js_bizsActionLogic"
            balType="link" 
            balUrl="<?php echo $_smarty_tpl->tpl_vars['url']->value;?>
&type=direct2_2"
            balConfirmMsg="确认要跳转吗?"
            balConfirmPopupType="dialog.confirm"
        >balUrl</a>
        , <a href="<?php echo $_smarty_tpl->tpl_vars['url']->value;?>
&type=direct2_3"
            class="js_bizsActionLogic"
            balConfirmMsg="确认要跳转吗?"
            balType="link" 
        >default</a>
    </dd>
</dl>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" class="show-js">
    JC.debug = true;

    requirejs( [ '<?php echo $_smarty_tpl->tpl_vars['URL_ROOT']->value;?>
/modules/<?php echo $_smarty_tpl->tpl_vars['COMP_NAME']->value;?>
/<?php echo $_smarty_tpl->tpl_vars['COMP_VERSION']->value;?>
/<?php echo $_smarty_tpl->tpl_vars['OUTPUT']->value;?>
', 'Bizs.FormLogic' ], function( <?php echo $_smarty_tpl->tpl_vars['NAME']->value;?>
 ){
    });
</script>
<?php /*  Call merged included template "public/simple_demo/body_footer.tpl" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("public/simple_demo/body_footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '3522818455487aed8985217-08446725');
content_548aa299626852_99595290($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); 
/*  End of included template "public/simple_demo/body_footer.tpl" */?>


        
              

        
    <script>
        requirejs( [ "<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/static/js/app/simple_demo.js" ] );
    </script>
    
    <?php /*  Call merged included template "public/simple_demo/body_footer.tpl" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("public/simple_demo/body_footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '3522818455487aed8985217-08446725');
content_548aa299626852_99595290($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); 
/*  End of included template "public/simple_demo/body_footer.tpl" */?>

        <?php echo $_smarty_tpl->getSubTemplate ("public/body_footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>


         
        <?php if (isset($_GET['debug'])&&$_GET['debug']=='1') {?><?php $_smarty_tpl->smarty->loadPlugin('Smarty_Internal_Debug'); Smarty_Internal_Debug::display_debug($_smarty_tpl); ?><?php }?>
    </body>
</html>
<?php }} ?>
<?php /* Smarty version Smarty-3.1.18, created on 2014-12-12 16:08:57
         compiled from "/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/simple_demo/body_header.tpl" */ ?>
<?php if ($_valid && !is_callable('content_548aa2995bf756_92544667')) {function content_548aa2995bf756_92544667($_smarty_tpl) {?><?php }} ?>
<?php /* Smarty version Smarty-3.1.18, created on 2014-12-12 16:08:57
         compiled from "/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/simple_demo/body_footer.tpl" */ ?>
<?php if ($_valid && !is_callable('content_548aa299626852_99595290')) {function content_548aa299626852_99595290($_smarty_tpl) {?><?php }} ?>
