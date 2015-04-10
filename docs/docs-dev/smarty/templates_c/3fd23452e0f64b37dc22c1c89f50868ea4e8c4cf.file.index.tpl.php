<?php /* Smarty version Smarty-3.1.18, created on 2014-12-11 14:35:15
         compiled from "/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/detail/index.tpl" */ ?>
<?php /*%%SmartyHeaderCode:1092687326548939ef4a1077-33312564%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '3fd23452e0f64b37dc22c1c89f50868ea4e8c4cf' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/detail/index.tpl',
      1 => 1418279650,
      2 => 'file',
    ),
    'bd4e82ecb8f87973244496c7a4a85723f1f13630' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/base.tpl',
      1 => 1417515401,
      2 => 'file',
    ),
    '289a711da12b41818a9ed7aeaaf058ad0665160b' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/index/body_header.tpl',
      1 => 1417486569,
      2 => 'file',
    ),
    '5c1978c51a0a433b26e32e05ea27a55bc2685883' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/index/body_footer.tpl',
      1 => 1417399569,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '1092687326548939ef4a1077-33312564',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.18',
  'unifunc' => 'content_548939ef5a3f85_33239096',
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
<?php if ($_valid && !is_callable('content_548939ef5a3f85_33239096')) {function content_548939ef5a3f85_33239096($_smarty_tpl) {?><!doctype html>
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
                    'common': TPATH + '/js/common'
                }
            });

        </script>
        
<link rel="stylesheet" type="text/css" href="<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/static/css/index.css" />

        
        
        
    </head>
    <body>
        <?php echo $_smarty_tpl->getSubTemplate ("public/body_header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

        
        

        
    <?php /*  Call merged included template "public/index/body_header.tpl" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("public/index/body_header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '1092687326548939ef4a1077-33312564');
content_54893b230c92f6_05919264($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); 
/*  End of included template "public/index/body_header.tpl" */?>

    <div class="wrapper">
        <a name="mainTop"></a>
        <div class="body clearfix">
            <div class="body-helper">
                <a href="javascript:;" class="body-homebtn" style="display:none">HOME</a>
                <a href="javascript:;" class="body-backbtn" style="display:none">BACK</a>
                <a href="javascript:;" class="body-topbtn" style="display:none">TOP</a>
            </div>


        </div>
    <?php /*  Call merged included template "public/index/body_footer.tpl" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("public/index/body_footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '1092687326548939ef4a1077-33312564');
content_54893b23101c11_22641361($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); 
/*  End of included template "public/index/body_footer.tpl" */?>
    </div>



        
              

        
        <?php echo $_smarty_tpl->getSubTemplate ("public/body_footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>


        
    <script>
        requirejs( [ '<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/static/js/app/index.js' ] );
    </script>
 
        <?php if (isset($_GET['debug'])&&$_GET['debug']=='1') {?><?php $_smarty_tpl->smarty->loadPlugin('Smarty_Internal_Debug'); Smarty_Internal_Debug::display_debug($_smarty_tpl); ?><?php }?>
    </body>
</html>
<?php }} ?>
<?php /* Smarty version Smarty-3.1.18, created on 2014-12-11 14:35:15
         compiled from "/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/index/body_header.tpl" */ ?>
<?php if ($_valid && !is_callable('content_54893b230c92f6_05919264')) {function content_54893b230c92f6_05919264($_smarty_tpl) {?><div class="header">
    <div class="wrapper">
        <div class="header-nav clearfix">
            <h1 class="header-logo">
                <a href="<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
"><span>Jquery</span><lable class="cwhite">Comps</label></a>
                <i>|</i>
                <a class="header-github" hover="logohover" href="http://github.com/openjavascript/jquerycomps" target="_blank">
                    <img class="github-unhover" src="<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/static/img/githubLogo.png" />
                    <img class="github-hover" src="<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/static/img/githubLogo2.png" />
                </a>
            </h1>
            <ul id="menulist" class="header-menu">
                <?php  $_smarty_tpl->tpl_vars['value'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['value']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['compsList']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['value']->key => $_smarty_tpl->tpl_vars['value']->value) {
$_smarty_tpl->tpl_vars['value']->_loop = true;
?>
                <li hover="header-menuhover">
                    <?php echo $_smarty_tpl->tpl_vars['value']->value['name'];?>

                    <div class="header-submenu clearfix">
                        <?php if (isset($_smarty_tpl->tpl_vars['value']->value['data'])) {?>
                            <?php  $_smarty_tpl->tpl_vars['sitem'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['sitem']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['value']->value['data']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['sitem']->key => $_smarty_tpl->tpl_vars['sitem']->value) {
$_smarty_tpl->tpl_vars['sitem']->_loop = true;
?>
                                <?php if (isset($_smarty_tpl->tpl_vars['sitem']->value['data'])) {?>
                                    <?php  $_smarty_tpl->tpl_vars['i'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['i']->value = count($_smarty_tpl->tpl_vars['sitem']->value['data'])-1;
  if ($_smarty_tpl->tpl_vars['i']->value>=0) { for ($_foo=true;$_smarty_tpl->tpl_vars['i']->value>=0; $_smarty_tpl->tpl_vars['i']->value--) {
?>
                                        
                                        <?php if (!(($tmp = @$_smarty_tpl->tpl_vars['sitem']->value['data'][$_smarty_tpl->tpl_vars['i']->value]['hide'])===null||$tmp==='' ? '' : $tmp)) {?>
                                            <?php if ($_smarty_tpl->tpl_vars['value']->value['name']!='Plugin') {?>
                                                <a class="header-complink" 
                                                data-version="<?php echo $_smarty_tpl->tpl_vars['sitem']->value['data'][$_smarty_tpl->tpl_vars['i']->value]['version'];?>
" 
                                                data-name="<?php echo $_smarty_tpl->tpl_vars['sitem']->value['name'];?>
" 
                                                data-id="<?php echo md5(((string)$_smarty_tpl->tpl_vars['sitem']->value['name'])." ".((string)$_smarty_tpl->tpl_vars['sitem']->value['data'][$_smarty_tpl->tpl_vars['i']->value]['version']));?>
"
                                                data-url="<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/viewer.php?module=<?php echo $_smarty_tpl->tpl_vars['sitem']->value['name'];?>
&version=<?php echo $_smarty_tpl->tpl_vars['sitem']->value['data'][$_smarty_tpl->tpl_vars['i']->value]['version'];?>
&file=doc.tpl"
                                                href="javascript:;"><?php echo $_smarty_tpl->tpl_vars['sitem']->value['name'];?>
</a>
                                            <?php } else { ?>
                                                <a href="<?php echo $_smarty_tpl->tpl_vars['sitem']->value['data'][$_smarty_tpl->tpl_vars['i']->value]['outlink'];?>
" target="_blank"><?php echo $_smarty_tpl->tpl_vars['sitem']->value['name'];?>
</a>
                                            <?php }?>
                                            <?php break 1?>
                                        <?php }?>
                                    <?php }} ?>
                                <?php }?>
                            <?php } ?>
                        <?php }?>
                    </div>
                </li>
                <?php } ?>
                <?php if (isset($_smarty_tpl->tpl_vars['extraMenu']->value)) {?>
                    <?php  $_smarty_tpl->tpl_vars['value'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['value']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['extraMenu']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['value']->key => $_smarty_tpl->tpl_vars['value']->value) {
$_smarty_tpl->tpl_vars['value']->_loop = true;
?>
                    <li class="header-extramenu" hover="header-menuhover">
                        <a href="<?php echo $_smarty_tpl->tpl_vars['value']->value['url'];?>
" target="_blank" hover="header-menuhover">
                        <?php echo $_smarty_tpl->tpl_vars['value']->value['name'];?>

                        </a>
                    </li>
                    <?php } ?>
                <?php }?>
            </ul>
        </div>
    </div>
</div>
<?php if (!(($tmp = @$_COOKIE['hideheader'])===null||$tmp==='' ? '' : $tmp)) {?>
<div class="js_headarBar">
    <div class="flor-img" style=""></div>
    <button type="button" class="button black medium js_hideHeader">hide this</button>
</div>
<?php }?>

<?php }} ?>
<?php /* Smarty version Smarty-3.1.18, created on 2014-12-11 14:35:15
         compiled from "/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/index/body_footer.tpl" */ ?>
<?php if ($_valid && !is_callable('content_54893b23101c11_22641361')) {function content_54893b23101c11_22641361($_smarty_tpl) {?><div class="footer">
    <h2>友情链接：</h2>
    <p id="outlink" class="clearfix">
        <?php  $_smarty_tpl->tpl_vars['link'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['link']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['websiteLink']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['link']->key => $_smarty_tpl->tpl_vars['link']->value) {
$_smarty_tpl->tpl_vars['link']->_loop = true;
?>
        <a href="<?php echo $_smarty_tpl->tpl_vars['link']->value['url'];?>
" target="_blank"><?php echo $_smarty_tpl->tpl_vars['link']->value['name'];?>
</a>
        <?php } ?>
    </p>
</div>
<?php }} ?>
