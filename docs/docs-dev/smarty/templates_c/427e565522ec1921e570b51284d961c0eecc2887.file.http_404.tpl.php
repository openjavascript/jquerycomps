<?php /* Smarty version Smarty-3.1.18, created on 2014-12-02 14:28:58
         compiled from "/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/http_404.tpl" */ ?>
<?php /*%%SmartyHeaderCode:1645614719547d5c2ad334b0-76614248%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '427e565522ec1921e570b51284d961c0eecc2887' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/http_404.tpl',
      1 => 1417168789,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '1645614719547d5c2ad334b0-76614248',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'TERROR' => 0,
    'key' => 0,
    'val' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.18',
  'unifunc' => 'content_547d5c2ad8c350_90664867',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_547d5c2ad8c350_90664867')) {function content_547d5c2ad8c350_90664867($_smarty_tpl) {?><!doctype html>
<html>
<head>
<meta charset=utf-8 />
<title>JQueryComps</title>
</head>    
<body>
    error 404
    <?php if (isset($_smarty_tpl->tpl_vars['TERROR']->value)) {?>
        <?php  $_smarty_tpl->tpl_vars['val'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['val']->_loop = false;
 $_smarty_tpl->tpl_vars['key'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['TERROR']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['val']->key => $_smarty_tpl->tpl_vars['val']->value) {
$_smarty_tpl->tpl_vars['val']->_loop = true;
 $_smarty_tpl->tpl_vars['key']->value = $_smarty_tpl->tpl_vars['val']->key;
?>
            <div><?php echo $_smarty_tpl->tpl_vars['key']->value;?>
: <?php echo $_smarty_tpl->tpl_vars['val']->value;?>
</div>
        <?php } ?>
    <?php }?>
</body>
</html>
 
<?php }} ?>
