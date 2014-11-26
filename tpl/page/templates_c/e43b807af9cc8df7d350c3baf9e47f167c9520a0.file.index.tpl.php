<?php /* Smarty version Smarty-3.1.18, created on 2014-11-26 15:29:11
         compiled from "index.tpl" */ ?>
<?php /*%%SmartyHeaderCode:1804354757409ce19f2-07481047%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'e43b807af9cc8df7d350c3baf9e47f167c9520a0' => 
    array (
      0 => 'index.tpl',
      1 => 1416986949,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '1804354757409ce19f2-07481047',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.18',
  'unifunc' => 'content_54757409df07b1_32143969',
  'variables' => 
  array (
    'compsList' => 0,
    'value' => 0,
    'item' => 0,
    'extraMenu' => 0,
    'd' => 0,
    'desc' => 0,
    'websiteLink' => 0,
    'link' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_54757409df07b1_32143969')) {function content_54757409df07b1_32143969($_smarty_tpl) {?><?php if (!is_callable('smarty_modifier_replace')) include 'C:\\sysCode\\jc_doc\\smarty_lib\\plugins\\modifier.replace.php';
?>
<!DOCTYPE html>
<html>
	<head>
	    <meta charset="utf-8" />
	    <title>Jquey Comps</title>
	    <link rel="stylesheet" type="text/css" href="../../static/css/app/index.css" />
	    <link rel="stylesheet" type="text/css" href="../../static/css/common.css" />
	</head>
	<body>
		<div class="header">
			<div class="wrapper">
				<div class="header-nav clearfix">
					<h1 class="header-logo">
						<span>Jquery</span>Comps
						<i>|</i>
						<a class="header-github" hover="logohover" href="http://github.com/openjavascript/jquerycomps" target="_blank">
							<img class="github-unhover" src="../../static/img/githubLogo.png" />
							<img class="github-hover" src="../../static/img/githubLogo2.png" />
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
					    		<?php  $_smarty_tpl->tpl_vars['item'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['item']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['value']->value['list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['item']->key => $_smarty_tpl->tpl_vars['item']->value) {
$_smarty_tpl->tpl_vars['item']->_loop = true;
?>
					    		<?php if (!$_smarty_tpl->tpl_vars['item']->value['hide']&&!$_smarty_tpl->tpl_vars['item']->value['history']) {?>
						    		<?php if ($_smarty_tpl->tpl_vars['value']->value['name']!='Plugin') {?>
						    			<a class="header-complink" data-version="<?php echo $_smarty_tpl->tpl_vars['item']->value['version'];?>
" href="#"><?php echo $_smarty_tpl->tpl_vars['item']->value['name'];?>
</a>
						    		<?php } else { ?>
						    			<a href="<?php echo $_smarty_tpl->tpl_vars['item']->value['outlink'];?>
" target="_blank"><?php echo $_smarty_tpl->tpl_vars['item']->value['name'];?>
</a>
						    		<?php }?>
						    	<?php }?>
					    		<?php } ?>
					    	</div>
					    </li>
					    <?php } ?>
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
					</ul>
				</div>
			</div>
		</div>
		<div class="flor-img"></div>
		<div class="wrapper">
			<div class="body clearfix">
				<div class="body-helper">
					<a href="#" class="body-homebtn" style="display:none">HOME</a>
					<a href="#" class="body-backbtn" style="display:none">BACK</a>
					<a href="#" class="body-topbtn" style="display:none">TOP</a>
				</div>
				
				<div id="bodynav" class="body-nav">
					<?php  $_smarty_tpl->tpl_vars['value'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['value']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['compsList']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['value']->key => $_smarty_tpl->tpl_vars['value']->value) {
$_smarty_tpl->tpl_vars['value']->_loop = true;
?>
			        <dl>
						<dt><?php echo $_smarty_tpl->tpl_vars['value']->value['name'];?>
</dt>
						<dd>
							<ul>
								<?php  $_smarty_tpl->tpl_vars['item'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['item']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['value']->value['list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['item']->key => $_smarty_tpl->tpl_vars['item']->value) {
$_smarty_tpl->tpl_vars['item']->_loop = true;
?>
								<?php if (!$_smarty_tpl->tpl_vars['item']->value['hide']&&!$_smarty_tpl->tpl_vars['item']->value['history']) {?>
								<li>
									<a href="#" linkdata="<?php echo smarty_modifier_replace($_smarty_tpl->tpl_vars['item']->value['name'],'.','_');?>
"><?php echo $_smarty_tpl->tpl_vars['item']->value['name'];?>
</a>
								</li>
								<?php }?>
								<?php } ?>
							</ul>
						</dd>
					</dl>
				    <?php } ?>
				</div>
				<div id="itemlist" class="body-content">
					<?php  $_smarty_tpl->tpl_vars['value'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['value']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['compsList']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['value']->key => $_smarty_tpl->tpl_vars['value']->value) {
$_smarty_tpl->tpl_vars['value']->_loop = true;
?>
			        <ul class="body-compblock">
			        	<h1 class="body-blockname"><?php echo $_smarty_tpl->tpl_vars['value']->value['name'];?>
</h1>
			        	<?php  $_smarty_tpl->tpl_vars['d'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['d']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['value']->value['desc']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['d']->key => $_smarty_tpl->tpl_vars['d']->value) {
$_smarty_tpl->tpl_vars['d']->_loop = true;
?>
			        	<p class="body-blockdesc"><?php echo $_smarty_tpl->tpl_vars['d']->value;?>
</p>
			        	<?php } ?>
			        	<?php if ($_smarty_tpl->tpl_vars['value']->value['name']!='Plugin') {?>
				        	<?php  $_smarty_tpl->tpl_vars['item'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['item']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['value']->value['list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['item']->key => $_smarty_tpl->tpl_vars['item']->value) {
$_smarty_tpl->tpl_vars['item']->_loop = true;
?>
				        	<?php if (!$_smarty_tpl->tpl_vars['item']->value['hide']&&!$_smarty_tpl->tpl_vars['item']->value['history']) {?>
							<li id="<?php echo smarty_modifier_replace($_smarty_tpl->tpl_vars['item']->value['name'],'.','_');?>
" class="body-comp" data-version="<?php echo $_smarty_tpl->tpl_vars['item']->value['version'];?>
">
								<h2 class="body-comptitle clearfix">
									<span class="body-compname"><?php echo $_smarty_tpl->tpl_vars['item']->value['name'];?>
</span>
									<a href="#" class="body-attrbtn body-changebtn">ATTR</a>
									<?php if (!$_smarty_tpl->tpl_vars['item']->value['nodemo']) {?>
									<a href="#" class="body-demobtn body-changebtn">DEMO</a>
									<a href="#" class="body-sdemobtn">SIMPLE DEMO</a>
									<?php }?>
								</h2>
								<h3 class="body-compsubtitle"><?php echo $_smarty_tpl->tpl_vars['item']->value['subtitle'];?>
<span class="body-compversion">最新版本: <?php echo $_smarty_tpl->tpl_vars['item']->value['version'];?>
</span></h3>
								<?php  $_smarty_tpl->tpl_vars['desc'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['desc']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['item']->value['desc']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['desc']->key => $_smarty_tpl->tpl_vars['desc']->value) {
$_smarty_tpl->tpl_vars['desc']->_loop = true;
?>
								<p class="body-compdesc"><?php echo $_smarty_tpl->tpl_vars['desc']->value;?>
</p>
								<?php } ?>
								<div class="body-compdemo">
									<a href="#" class="body-compclose">CLOSE DEMO</a>
									<iframe src="" frameborder="no" border="0"></iframe>
								</div>
							</li>
							<?php }?>
							<?php } ?>
						<?php } else { ?>
							<?php  $_smarty_tpl->tpl_vars['item'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['item']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['value']->value['list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['item']->key => $_smarty_tpl->tpl_vars['item']->value) {
$_smarty_tpl->tpl_vars['item']->_loop = true;
?>
							<?php if (!$_smarty_tpl->tpl_vars['item']->value['hide']&&!$_smarty_tpl->tpl_vars['item']->value['history']) {?>
							<li id="<?php echo smarty_modifier_replace($_smarty_tpl->tpl_vars['item']->value['name'],'.','_');?>
" class="body-comp">
								<h2 class="body-comptitle clearfix">
									<span class="body-compname"><?php echo $_smarty_tpl->tpl_vars['item']->value['name'];?>
</span>
									<a href="<?php echo $_smarty_tpl->tpl_vars['item']->value['outlink'];?>
" target="_blank" class="body-attrbtn">官网</a>
								</h2>
								<h3 class="body-compsubtitle"><?php echo $_smarty_tpl->tpl_vars['item']->value['subtitle'];?>
<span class="body-compversion">使用版本: <?php echo $_smarty_tpl->tpl_vars['item']->value['version'];?>
</span></h3>
								<?php  $_smarty_tpl->tpl_vars['desc'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['desc']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['item']->value['desc']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['desc']->key => $_smarty_tpl->tpl_vars['desc']->value) {
$_smarty_tpl->tpl_vars['desc']->_loop = true;
?>
								<p class="body-compdesc"><?php echo $_smarty_tpl->tpl_vars['desc']->value;?>
</p>
								<?php } ?>
							</li>
							<?php }?>
							<?php } ?>
						<?php }?>
					</ul>
				    <?php } ?>
				</div>
				<div class="body-detail">
					<iframe id="detailframe" src="" frameborder="no" border="0"></iframe>
					<ul class="body-detailnav"></ul>
				</div>
			</div>
			<div class="footer">
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
		</div>
		<script src="../../static/js/jc/lib.js"></script>
		<script src="../../static/js/config.js"></script>
		<script src="../../static/js/app/index.js"></script>
	</body>
</html><?php }} ?>
