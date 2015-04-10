<?php /* Smarty version Smarty-3.1.18, created on 2014-12-09 16:53:31
         compiled from "/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/JC.common/0.1/doc.tpl" */ ?>
<?php /*%%SmartyHeaderCode:1233012554547c49ae3825c8-56998364%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '13001a726c1f9450189bcd9846c5bf02aaa62897' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/JC.common/0.1/doc.tpl',
      1 => 1417430662,
      2 => 'file',
    ),
    'c057e425a5495281e6b77508e07a842fd4d851da' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/doc/base.tpl',
      1 => 1417500690,
      2 => 'file',
    ),
    'bd4e82ecb8f87973244496c7a4a85723f1f13630' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/base.tpl',
      1 => 1417515401,
      2 => 'file',
    ),
    '0e1cce0a883adb5863158110b4b0457db775980e' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/doc/body_header.tpl',
      1 => 1417500055,
      2 => 'file',
    ),
    '8a7b19e52bed8c537e8778026276ca6031ce66d2' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/doc/body_main.tpl',
      1 => 1418115156,
      2 => 'file',
    ),
    'e04963f39d712974ffac9d9a9e43deec467808ff' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/doc/body_footer.tpl',
      1 => 1417399569,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '1233012554547c49ae3825c8-56998364',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.18',
  'unifunc' => 'content_547c49ae439d42_07745533',
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
<?php if ($_valid && !is_callable('content_547c49ae439d42_07745533')) {function content_547c49ae439d42_07745533($_smarty_tpl) {?><!doctype html>
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
/static/css/detail.css" />
<!-- start codeview style -->
<link rel="stylesheet" type="text/css" href="<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/static/css/codemirror.css" />
<style>
.cm-variable {
}
</style>
<!-- end codeview style -->
<script>
    <?php if (!(($tmp = @$_smarty_tpl->tpl_vars['compData']->value['nodemo'])===null||$tmp==='' ? '' : $tmp)) {?>
        window.DEMO_PATH = "<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/viewer.php?module=<?php echo $_smarty_tpl->tpl_vars['COMP_NAME']->value;?>
&version=<?php echo $_smarty_tpl->tpl_vars['COMP_VERSION']->value;?>
&file=demo.tpl";
    <?php }?>
</script>


        

        
        
    </head>
    <body>
        <?php echo $_smarty_tpl->getSubTemplate ("public/body_header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

        
    <?php /*  Call merged included template "public/doc/body_header.tpl" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("public/doc/body_header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '1233012554547c49ae3825c8-56998364');
content_5486b88b5e19c3_64499514($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); 
/*  End of included template "public/doc/body_header.tpl" */?>

        

        
<div class="wrap">
    <?php /*  Call merged included template "public/doc/body_main.tpl" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("public/doc/body_main.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('methodAttr'=>1), 0, '1233012554547c49ae3825c8-56998364');
content_5486b88b5f3c96_01753309($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); 
/*  End of included template "public/doc/body_main.tpl" */?>

    <!-- 外链形式 start -->
    <textArea class="detail-codetpl" type="text/template">
        <script src="<?php echo $_smarty_tpl->tpl_vars['URL_ROOT']->value;?>
/<?php echo $_smarty_tpl->tpl_vars['COMP_NAME']->value;?>
/<?php echo $_smarty_tpl->tpl_vars['COMP_VERSION']->value;?>
/<?php echo $_smarty_tpl->tpl_vars['OUTPUT']->value;?>
" />
    </textArea>
    <!-- 外链形式 end -->

    <!-- 模块加载 start -->
    <textArea class="detail-codetpl" type="text/template">
        <script>
            requirejs( [ '<?php echo $_smarty_tpl->tpl_vars['COMP_NAME']->value;?>
' ], function( <?php echo $_smarty_tpl->tpl_vars['NAME']->value;?>
 ){
            });
        </script>
    </textArea>
    <!-- 模块加载 end -->

    <textArea class="detail-codetpl" type="text/template">
         JC.f.addUrlParams 
         JC.f.cloneDate 
         JC.f.dateDetect 
         JC.f.delUrlParam 
         JC.f.easyEffect 
         JC.f.formatISODate 
         JC.f.funcName 
         JC.f.getJqParent 
         JC.f.getUrlParam 
         JC.f.getUrlParams 
         JC.f.hasUrlParam 
         JC.f.httpRequire 
         JC.f.isSameDay 
         JC.f.isSameMonth 
         JC.f.jcAutoInitComps 
         JC.f.maxDayOfMonth 
         JC.f.mousewheelEvent 
         JC.f.padChar 
         JC.f.parentSelector 
         JC.f.parseBool 
         JC.f.parseFinance 
         JC.f.parseISODate 
         JC.f.printf 
         JC.f.pureDate
         JC.f.reloadPage 
         JC.f.removeUrlSharp 
         JC.f.scriptContent 
         JC.f.scriptPath 
         JC.f.sliceArgs 
         JC.f.urlDetect     
    </textArea>

</div>



        
              

        
    <?php /*  Call merged included template "public/doc/body_footer.tpl" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("public/doc/body_footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '1233012554547c49ae3825c8-56998364');
content_5486b88b88b449_25642017($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); 
/*  End of included template "public/doc/body_footer.tpl" */?>

        <?php echo $_smarty_tpl->getSubTemplate ("public/body_footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>


         
        <?php if (isset($_GET['debug'])&&$_GET['debug']=='1') {?><?php $_smarty_tpl->smarty->loadPlugin('Smarty_Internal_Debug'); Smarty_Internal_Debug::display_debug($_smarty_tpl); ?><?php }?>
    </body>
</html>
<?php }} ?>
<?php /* Smarty version Smarty-3.1.18, created on 2014-12-09 16:53:31
         compiled from "/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/doc/body_header.tpl" */ ?>
<?php if ($_valid && !is_callable('content_5486b88b5e19c3_64499514')) {function content_5486b88b5e19c3_64499514($_smarty_tpl) {?><div id="compTitle">
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
<?php /* Smarty version Smarty-3.1.18, created on 2014-12-09 16:53:31
         compiled from "/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/doc/body_main.tpl" */ ?>
<?php if ($_valid && !is_callable('content_5486b88b5f3c96_01753309')) {function content_5486b88b5f3c96_01753309($_smarty_tpl) {?><div class="detail-attr">
    <h3 id="navmark-desc" class="detail-blockname ">组件简介</h3>
    <div class="detail-ct">
        <div class="detail-desc">
            <?php  $_smarty_tpl->tpl_vars['d'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['d']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['allVersionComps']->value['desc']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['d']->key => $_smarty_tpl->tpl_vars['d']->value) {
$_smarty_tpl->tpl_vars['d']->_loop = true;
?>
            <p class="desc"><?php echo $_smarty_tpl->tpl_vars['d']->value;?>
</p>
            <?php } ?>
        </div>
        <p class="desc"><?php echo (($tmp = @$_smarty_tpl->tpl_vars['compCustomDesc']->value)===null||$tmp==='' ? '' : $tmp);?>
</p>
    </div>
    <h3 id="navmark-use" class="detail-blockname" >使用说明</h3>
    <div class="detail-ct detail-use">
        <h4 id="navmark-version" class="detail-groupname ">历史版本 : </h4>
        <div class="detail-version">
            <?php  $_smarty_tpl->tpl_vars['comp'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['comp']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['allVersionComps']->value['data']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['comp']->key => $_smarty_tpl->tpl_vars['comp']->value) {
$_smarty_tpl->tpl_vars['comp']->_loop = true;
?>
                <?php if (!(($tmp = @$_smarty_tpl->tpl_vars['comp']->value['hide'])===null||$tmp==='' ? '' : $tmp)) {?>
                <a href="#" class="detail-versionlink <?php if ((($tmp = @$_smarty_tpl->tpl_vars['comp']->value['nowVersion'])===null||$tmp==='' ? '' : $tmp)) {?>detail-nowVersion<?php }?>" data-name="<?php echo $_smarty_tpl->tpl_vars['allVersionComps']->value['name'];?>
" data-version="<?php echo $_smarty_tpl->tpl_vars['comp']->value['version'];?>
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
                    <?php if ((($tmp = @$_smarty_tpl->tpl_vars['comp']->value['outlink'])===null||$tmp==='' ? '' : $tmp)) {?>
                        <a href="<?php echo (($tmp = @$_smarty_tpl->tpl_vars['comp']->value['outlink'])===null||$tmp==='' ? '' : $tmp);?>
" target="_blank" 
                            data-name="<?php echo $_smarty_tpl->tpl_vars['comp']->value['name'];?>
"
                            >
                            <?php echo $_smarty_tpl->tpl_vars['comp']->value['name'];?>

                        </a>
                    <?php } else { ?>
                        <?php if (!(($tmp = @$_smarty_tpl->tpl_vars['comp']->value['hide'])===null||$tmp==='' ? '' : $tmp)) {?>
                        <a href="#" class="detail-requirelink"
                            data-name="<?php echo $_smarty_tpl->tpl_vars['comp']->value['name'];?>
"
                            >
                            <?php echo $_smarty_tpl->tpl_vars['comp']->value['name'];?>

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

    <?php if ((($tmp = @$_smarty_tpl->tpl_vars['constructorAttr']->value)===null||$tmp==='' ? '' : $tmp)) {?>
    <h3 id="navmark-attr" class="detail-blockname">Constructor</h3>
    <div class="detail-ct detail-htmlattr">
        <textArea class="detail-code"></textArea>
    </div>
    <?php }?>

    <?php if ((($tmp = @$_smarty_tpl->tpl_vars['initAttr']->value)===null||$tmp==='' ? '' : $tmp)) {?>
    <h3 id="navmark-attr" class="detail-blockname">Init</h3>
    <div class="detail-ct detail-htmlattr">
        <textArea class="detail-code"></textArea>
    </div>
    <?php }?>

    <?php if ((($tmp = @$_smarty_tpl->tpl_vars['htmlAttr']->value)===null||$tmp==='' ? '' : $tmp)) {?>
    <h3 id="navmark-attr" class="detail-blockname">HTML Attributes</h3>
    <div class="detail-ct detail-htmlattr">
        <textArea class="detail-code"></textArea>
    </div>
    <?php }?>

    <?php if ((($tmp = @$_smarty_tpl->tpl_vars['propertyAttr']->value)===null||$tmp==='' ? '' : $tmp)) {?>
    <h3 id="navmark-data" class="detail-blockname">Properties</h3>
    <div class="detail-ct detail-data">
        <textArea class="detail-code"></textArea>
    </div>
    <?php }?>

    <?php if ((($tmp = @$_smarty_tpl->tpl_vars['methodAttr']->value)===null||$tmp==='' ? '' : $tmp)) {?>
    <a name="methodAttr"></a>
    <h3 id="navmark-data" class="detail-blockname">Methods</h3>
    <div class="detail-ct detail-data">
        <textArea class="detail-code"></textArea>
    </div>
    <?php }?>

    <?php if ((($tmp = @$_smarty_tpl->tpl_vars['eventAttr']->value)===null||$tmp==='' ? '' : $tmp)) {?>
    <h3 id="navmark-data" class="detail-blockname">Events</h3>
    <div class="detail-ct detail-data">
        <textArea class="detail-code"></textArea>
    </div>
    <?php }?>

    <?php if ((($tmp = @$_smarty_tpl->tpl_vars['dataFormat']->value)===null||$tmp==='' ? '' : $tmp)||(($tmp = @$_smarty_tpl->tpl_vars['dataFormatAttr']->value)===null||$tmp==='' ? '' : $tmp)) {?>
    <h3 id="navmark-data" class="detail-blockname">Data Format</h3>
    <div class="detail-ct detail-data">
        <textArea class="detail-code"></textArea>
    </div>
    <?php }?>
</div>
<?php }} ?>
<?php /* Smarty version Smarty-3.1.18, created on 2014-12-09 16:53:31
         compiled from "/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/doc/body_footer.tpl" */ ?>
<?php if ($_valid && !is_callable('content_5486b88b88b449_25642017')) {function content_5486b88b88b449_25642017($_smarty_tpl) {?>

    <script>
        requirejs( [ '<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/static/js/app/doc.js' ] );
    </script>
 
<?php }} ?>
