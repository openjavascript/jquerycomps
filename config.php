<?php

  /* 模板配置 */
  date_default_timezone_set('Asia/Shanghai'); 
  include_once("smarty_lib/Smarty.class.php"); //导入模板文件

  $smarty = new Smarty();//创建smarty对象

  $smarty->config_dir = "smarty_lib/Config_File.class.php";  //目录变量

  $smarty->caching = false; //是否使用缓存

  $smarty->template_dir = "tpl"; //设置模板目录

  $smarty->compile_dir = "templates_c";//设置编译目录

  $smarty->cache_dir = "smarty_cache";//缓存文件

  $smarty->left_delimiter = "{{";

  $smarty->right_delimiter="}}";

?>