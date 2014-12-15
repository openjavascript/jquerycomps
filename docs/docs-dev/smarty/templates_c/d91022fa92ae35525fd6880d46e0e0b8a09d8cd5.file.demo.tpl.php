<?php /* Smarty version Smarty-3.1.18, created on 2014-12-15 17:52:00
         compiled from "/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/Bizs.ActionLogic/0.1/demo.tpl" */ ?>
<?php /*%%SmartyHeaderCode:1007359902547d8ac3c1eea0-87632697%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'd91022fa92ae35525fd6880d46e0e0b8a09d8cd5' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/Bizs.ActionLogic/0.1/demo.tpl',
      1 => 1418372031,
      2 => 'file',
    ),
    'fbe84f428203a25c637b0296239ad65213b0a76b' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/demo/base.tpl',
      1 => 1418371331,
      2 => 'file',
    ),
    'bd4e82ecb8f87973244496c7a4a85723f1f13630' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/base.tpl',
      1 => 1418282250,
      2 => 'file',
    ),
    '289a711da12b41818a9ed7aeaaf058ad0665160b' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/index/body_header.tpl',
      1 => 1418635460,
      2 => 'file',
    ),
    '0e1cce0a883adb5863158110b4b0457db775980e' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/doc/body_header.tpl',
      1 => 1417500055,
      2 => 'file',
    ),
    '7ff38d59ee0ea147b2104d6d1120309f1fcdfed2' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/demo/body_main.tpl',
      1 => 1418635181,
      2 => 'file',
    ),
    'e04963f39d712974ffac9d9a9e43deec467808ff' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/doc/body_footer.tpl',
      1 => 1417399569,
      2 => 'file',
    ),
    '5c1978c51a0a433b26e32e05ea27a55bc2685883' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/index/body_footer.tpl',
      1 => 1417399569,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '1007359902547d8ac3c1eea0-87632697',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.18',
  'unifunc' => 'content_547d8ac3ce2956_74098026',
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
<?php if ($_valid && !is_callable('content_547d8ac3ce2956_74098026')) {function content_547d8ac3ce2956_74098026($_smarty_tpl) {?><!doctype html>
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
/static/css/index.css" />
<link rel="stylesheet" type="text/css" href="<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/static/css/detail.css" />

<!-- start codeview style -->
<link rel="stylesheet" type="text/css" href="<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/static/css/codemirror.css" />
<!-- end codeview style -->
    <script>
        window.DOC_PATH = "<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/viewer.php?module=<?php echo $_smarty_tpl->tpl_vars['COMP_NAME']->value;?>
&version=<?php echo $_smarty_tpl->tpl_vars['COMP_VERSION']->value;?>
&file=doc.tpl";
    </script>


        
<link href='<?php echo $_smarty_tpl->tpl_vars['URL_ROOT']->value;?>
/modules/JC.Panel/0.2/res/default/style.css' rel='stylesheet' />


        
        
    </head>
    <body>
        <?php echo $_smarty_tpl->getSubTemplate ("public/body_header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

        
    <?php /*  Call merged included template "public/index/body_header.tpl" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("public/index/body_header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '1007359902547d8ac3c1eea0-87632697');
content_548eaf40e48222_57454057($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); 
/*  End of included template "public/index/body_header.tpl" */?>

        
    <?php /*  Call merged included template "public/doc/body_header.tpl" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("public/doc/body_header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '1007359902547d8ac3c1eea0-87632697');
content_548eaf40e82cf5_59531251($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); 
/*  End of included template "public/doc/body_header.tpl" */?>


        
<div class="wrap">
    <?php /*  Call merged included template "public/demo/body_main.tpl" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("public/demo/body_main.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '1007359902547d8ac3c1eea0-87632697');
content_548eaf40e957e8_26587622($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); 
/*  End of included template "public/demo/body_main.tpl" */?>

    <div class="detail-demo">
        <h3 id="navmark-demo" class="detail-blockname">DEMO</h3>
        <div class="detail-ct">
            <h4 class="detail-groupname">balType = panel, 弹框</h4>
            <p class="desc">
            </p>
            <div class="detail-subdemoview">
                <iframe src="<?php echo $_smarty_tpl->tpl_vars['VIEWER_URL']->value;?>
subdemo.tpl" frameborder="0" width="100%"></iframe>
            </div>

            <h4 class="detail-groupname">balType = link, 点击跳转</h4>
            <p class="desc">
            </p>
            <div class="detail-subdemoview">
                <iframe src="<?php echo $_smarty_tpl->tpl_vars['VIEWER_URL']->value;?>
subdemo1.tpl" frameborder="0" width="100%"></iframe>
            </div>

            <h4 class="detail-groupname">balType = ajaxaction, AJAX 执行操作( 删除, 起用/禁用 )</h4>
            <p class="desc">
            </p>
            <div class="detail-subdemoview">
                <iframe src="<?php echo $_smarty_tpl->tpl_vars['VIEWER_URL']->value;?>
subdemo2.tpl" frameborder="0" width="100%"></iframe>
            </div>

            <h4 class="detail-groupname">balType = remove_element, 删除DOM标签</h4>
            <p class="desc">
            </p>
            <div class="detail-subdemoview">
                <iframe src="<?php echo $_smarty_tpl->tpl_vars['VIEWER_URL']->value;?>
subdemo3.tpl" frameborder="0" width="100%"></iframe>
            </div>

            <h4 class="detail-groupname">balType = ec, expand and contract</h4>
            <p class="desc">
            </p>
            <div class="detail-subdemoview">
                <iframe src="<?php echo $_smarty_tpl->tpl_vars['VIEWER_URL']->value;?>
subdemo4.tpl" frameborder="0" width="100%"></iframe>
            </div>

            <h4 class="detail-groupname">balType = hit_value, hit_value for button</h4>
            <p class="desc">
            </p>
            <div class="detail-subdemoview">
                <iframe src="<?php echo $_smarty_tpl->tpl_vars['VIEWER_URL']->value;?>
subdemo5.tpl" frameborder="0" width="100%"></iframe>
            </div>

        </div>
    </div>
</div>




        
              

        
    <?php /*  Call merged included template "public/doc/body_footer.tpl" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("public/doc/body_footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '1007359902547d8ac3c1eea0-87632697');
content_548eaf40ea6184_08236704($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); 
/*  End of included template "public/doc/body_footer.tpl" */?>
    <?php /*  Call merged included template "public/index/body_footer.tpl" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("public/index/body_footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '1007359902547d8ac3c1eea0-87632697');
content_548eaf40eaaa00_37233393($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); 
/*  End of included template "public/index/body_footer.tpl" */?>

        <?php echo $_smarty_tpl->getSubTemplate ("public/body_footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>


         
        <?php if (isset($_GET['debug'])&&$_GET['debug']=='1') {?><?php $_smarty_tpl->smarty->loadPlugin('Smarty_Internal_Debug'); Smarty_Internal_Debug::display_debug($_smarty_tpl); ?><?php }?>
    </body>
</html>
<?php }} ?>
<?php /* Smarty version Smarty-3.1.18, created on 2014-12-15 17:52:00
         compiled from "/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/index/body_header.tpl" */ ?>
<?php if ($_valid && !is_callable('content_548eaf40e48222_57454057')) {function content_548eaf40e48222_57454057($_smarty_tpl) {?><div class="header js_compAutoFixed" style="z-index: 1000;" data-normalClass="cafHeaderNav" data-fixedClass="cafHeaderNav">
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
                                                target="_detail"
                                                href="<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/detail.php?module=<?php echo $_smarty_tpl->tpl_vars['sitem']->value['name'];?>
&version=<?php echo $_smarty_tpl->tpl_vars['sitem']->value['data'][$_smarty_tpl->tpl_vars['i']->value]['version'];?>
&file=doc.tpl#btop"><?php echo $_smarty_tpl->tpl_vars['sitem']->value['name'];?>
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

<a name="btop"></a>
<?php }} ?>
<?php /* Smarty version Smarty-3.1.18, created on 2014-12-15 17:52:00
         compiled from "/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/doc/body_header.tpl" */ ?>
<?php if ($_valid && !is_callable('content_548eaf40e82cf5_59531251')) {function content_548eaf40e82cf5_59531251($_smarty_tpl) {?><div id="compTitle">
    <h1 class="detail-title"><?php echo $_smarty_tpl->tpl_vars['COMP_NAME']->value;?>
</h1>
    <h2 class="detail-subtitle">
        <?php echo (($tmp = @$_smarty_tpl->tpl_vars['allVersionComps']->value['subtitle'])===null||$tmp==='' ? '' : $tmp);?>

<?php if ((($tmp = @$_smarty_tpl->tpl_vars['compData']->value['download'])===null||$tmp==='' ? '' : $tmp)) {?><a href="<?php echo $_smarty_tpl->tpl_vars['compData']->value['download'];?>
" target="_blank" class="detail-titlebtn">DOWN LOAD</a><?php }?>
<?php if ((($tmp = @$_smarty_tpl->tpl_vars['allVersionComps']->value['api'])===null||$tmp==='' ? '' : $tmp)) {?><a href="<?php echo $_smarty_tpl->tpl_vars['allVersionComps']->value['api'];?>
" target="_blank" class="detail-titlebtn">查看API</a><?php }?>
    </h2>
</div>

<?php }} ?>
<?php /* Smarty version Smarty-3.1.18, created on 2014-12-15 17:52:00
         compiled from "/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/demo/body_main.tpl" */ ?>
<?php if ($_valid && !is_callable('content_548eaf40e957e8_26587622')) {function content_548eaf40e957e8_26587622($_smarty_tpl) {?><div id="bodynav" class="body-nav js_compAutoFixed" data-fixedTopPx="<?php echo $_smarty_tpl->tpl_vars['TSIDETOP']->value;?>
"></div>
<?php }} ?>
<?php /* Smarty version Smarty-3.1.18, created on 2014-12-15 17:52:00
         compiled from "/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/doc/body_footer.tpl" */ ?>
<?php if ($_valid && !is_callable('content_548eaf40ea6184_08236704')) {function content_548eaf40ea6184_08236704($_smarty_tpl) {?>

    <script>
        requirejs( [ '<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/static/js/app/doc.js' ] );
    </script>
 
<?php }} ?>
<?php /* Smarty version Smarty-3.1.18, created on 2014-12-15 17:52:00
         compiled from "/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/index/body_footer.tpl" */ ?>
<?php if ($_valid && !is_callable('content_548eaf40eaaa00_37233393')) {function content_548eaf40eaaa00_37233393($_smarty_tpl) {?><div class="footer">
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
