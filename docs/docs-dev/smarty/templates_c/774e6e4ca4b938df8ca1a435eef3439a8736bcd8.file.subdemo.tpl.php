<?php /* Smarty version Smarty-3.1.18, created on 2014-12-12 16:08:57
         compiled from "/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/Bizs.ActionLogic/0.1/subdemo.tpl" */ ?>
<?php /*%%SmartyHeaderCode:1107712404547d91ca199576-27555552%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '774e6e4ca4b938df8ca1a435eef3439a8736bcd8' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/Bizs.ActionLogic/0.1/subdemo.tpl',
      1 => 1418180265,
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
  'nocache_hash' => '1107712404547d91ca199576-27555552',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.18',
  'unifunc' => 'content_547d91ca2279b4_49942385',
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
<?php if ($_valid && !is_callable('content_547d91ca2279b4_49942385')) {function content_547d91ca2279b4_49942385($_smarty_tpl) {?><!doctype html>
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
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("public/simple_demo/body_header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '1107712404547d91ca199576-27555552');
content_548aa2994f9bf0_04672257($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); 
/*  End of included template "public/simple_demo/body_header.tpl" */?>

        

        
<?php /*  Call merged included template "public/simple_demo/body_header.tpl" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("public/simple_demo/body_header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '1107712404547d91ca199576-27555552');
content_548aa2994f9bf0_04672257($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); 
/*  End of included template "public/simple_demo/body_header.tpl" */?>


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
<dl class="defdl">

    <dt>balType = panel</dt>
    <dd>
        <button type="button" 
            class="js_bizsActionLogic"
            balType="panel" 
            balPanelTpl="#scriptPanel" 
            balCallback="balPanelInitCb"
        >script tpl</button>
        <a href="#"
            class="js_bizsActionLogic"
            balType="panel" 
            balPanelTpl="#scriptPanel" 
            balCallback="balPanelInitCb"
        >script tpl</a>
    </dd>
    <dd>
        <button type="button" 
            class="js_bizsActionLogic"
            balType="panel" 
            balAjaxHtml="<?php echo $_smarty_tpl->tpl_vars['COMP_ROOT']->value;?>
/_demo/data/htmlPanel.php" 
            balCallback="balPanelInitCb"
        >ajax html</button>
        <a href="#"
            class="js_bizsActionLogic"
            balType="panel" 
            balAjaxHtml="<?php echo $_smarty_tpl->tpl_vars['COMP_ROOT']->value;?>
/_demo/data/htmlPanel.php" 
            balCallback="balPanelInitCb"
        >ajax html</a>
    </dd>
    <dd>
        <button type="button" 
            class="js_bizsActionLogic"
            balType="panel" 
            balAjaxData="<?php echo $_smarty_tpl->tpl_vars['COMP_ROOT']->value;?>
/_demo/data/dataPanel.php" 
            balCallback="balPanelInitCb"
        >ajax data html</button>
        <button type="button" 
            class="js_bizsActionLogic"
            balType="panel" 
            balAjaxData="<?php echo $_smarty_tpl->tpl_vars['COMP_ROOT']->value;?>
/_demo/data/dataPanel.php" 
            balCallback="balPanelInitCb"
        >ajax data html</button>
        <a  href="#"
            class="js_bizsActionLogic"
            balType="panel" 
            balAjaxData="<?php echo $_smarty_tpl->tpl_vars['COMP_ROOT']->value;?>
/_demo/data/dataPanel.php" 
            balCallback="balPanelInitCb"
        >ajax data html</a>

        <a href="javascript:;" title="设置" class="js_bizsActionLogic ico-setting" 
            baltype="panel" 
            balajaxdata="<?php echo $_smarty_tpl->tpl_vars['COMP_ROOT']->value;?>
/_demo/data/dataPanel.unhtml.php" 
            balunhtmlentity="true"
            >ajax data html - unHtmlEntity</a>

    </dd>
</dl>

<script type="text/template" id="scriptPanel">
<div class="UPanel UPanelString" style="display:none; width: 600px;" >    
    <form action="<?php echo $_smarty_tpl->tpl_vars['COMP_ROOT']->value;?>
/_demo/data/handler.php" method="POST"
        class="js_bizsFormLogic"
        formType="ajax"
        formConfirmPopupType="popup"
        formBeforeProcess="formBeforeProcess"
        formAfterProcess="formAfterProcess"
        formAjaxDone="formAjaxDone"  
        >    
        <div class="UPContent">        
            <div class="hd">dom panel</div>        
            <div class="bd">            
                <dl>                
                    <dt><h2>form test</h2></dt>                
                    <dd>
                       <table>
                           <tr>
                               <td>文本框:</td> 
                               <td>
                                    <input type="text" name="txt1" value="test" reqmsg="内容" />                
                               </td>
                           </tr>
                            <tr>
                                <td>
                                    <label class="gray">甲方主体：</label>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>日期</td>
                                <td>
                                    <input type="text" datatype="date" reqmsg="日期" value="2013-05-20" />
                                    <em class="error"></em>
                                </td>
                            </tr>
                        </table>
                    </dd>
                </dl>            
                <div style="text-align:center" class="UButton">                
                    <button type="submit" eventtype="confirm">确定</button>                
                    <button type="button" eventtype="cancel">取消</button>            
                </div>        
            </div>        
            <div class="ft">test footer</div>        
            <span class="close" eventtype="close"></span>    
        </div>
        <!--end UPContent-->    
    </form>
</div>
</script>
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

    function balPanelInitCb( _panelIns ){
        var _trigger = $(this);
        //return true; //如果返回真的话, 表单提交后会关闭弹框
    }

    function formAjaxDone( _d, _selector, _formLogicIns ){
        JC.hideAllPopup( 1 );
        if( _d && _d.errorno ){
            JC.alert( _d.errmsg || '操作失败, 请重试!', _selector, 1 );
        }else{
            JC.Dialog.msgbox( '操作成功' );
        }
    }

    function ajaxDelCallback( _d, _ins ){
        var _trigger = $(this);

        if( _d && !_d.errorno ){
            JC.msgbox( _d.errmsg || '操作成功', _trigger, 0, function(){
                JC.f.reloadPage( '?usercallback=ajaxaction' );
            });
        }else{
            JC.Dialog.alert( _d && _d.errmsg ? _d.errmsg : '操作失败, 请重试!' , 1 );
        }
    }
</script>
<?php /*  Call merged included template "public/simple_demo/body_footer.tpl" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("public/simple_demo/body_footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '1107712404547d91ca199576-27555552');
content_548aa29952b6b7_98502600($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); 
/*  End of included template "public/simple_demo/body_footer.tpl" */?>


        
              

        
    <script>
        requirejs( [ "<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/static/js/app/simple_demo.js" ] );
    </script>
    
    <?php /*  Call merged included template "public/simple_demo/body_footer.tpl" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("public/simple_demo/body_footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '1107712404547d91ca199576-27555552');
content_548aa29952b6b7_98502600($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); 
/*  End of included template "public/simple_demo/body_footer.tpl" */?>

        <?php echo $_smarty_tpl->getSubTemplate ("public/body_footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>


         
        <?php if (isset($_GET['debug'])&&$_GET['debug']=='1') {?><?php $_smarty_tpl->smarty->loadPlugin('Smarty_Internal_Debug'); Smarty_Internal_Debug::display_debug($_smarty_tpl); ?><?php }?>
    </body>
</html>
<?php }} ?>
<?php /* Smarty version Smarty-3.1.18, created on 2014-12-12 16:08:57
         compiled from "/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/simple_demo/body_header.tpl" */ ?>
<?php if ($_valid && !is_callable('content_548aa2994f9bf0_04672257')) {function content_548aa2994f9bf0_04672257($_smarty_tpl) {?><?php }} ?>
<?php /* Smarty version Smarty-3.1.18, created on 2014-12-12 16:08:57
         compiled from "/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/simple_demo/body_footer.tpl" */ ?>
<?php if ($_valid && !is_callable('content_548aa29952b6b7_98502600')) {function content_548aa29952b6b7_98502600($_smarty_tpl) {?><?php }} ?>
