<?php
include_once('aes.php');
ini_set('display_errors', 0);
header('Content-type: text/html;charset=utf-8');

$sroot = $_SERVER["SUBDOMAIN_DOCUMENT_ROOT"];
$sroot = str_replace( '/var/chroot', '', $sroot );
if( ! $sroot ) $sroot = $_SERVER["DOCUMENT_ROOT"];

$fileDir = dirname( __FILE__ );
$fileDir = str_replace($sroot, '', $fileDir); 

//echo "$sroot<br /> " . __FILE__  . "<br/> ". $fileDir;

if( $fileDir == '/home/qiushaowei/htdocs/uxcjs/tools/php' ){
    $fileDir = '/~qiushaowei/uxcjs/tools/php';
}

if( $fileDir == '/home/qiushaowei/htdocs/jcjs/tools/php' ){
    $fileDir = '/~qiushaowei/jcjs/tools/php';
}

$base_path =  './';
$key = 'imququin360';

$aes = new AES(true);
$keys = $aes->makeKey($key);

$blacklist_folder = array(
		'.',
		'..',
		'.svn',
		'.git',
	);

$whitelist_fileext = array(
		'html',
		'htm',
		'js',
		'css',
		'jpg',
		'jpeg',
		'gif',
		'png',
		'bmp',
		'ppt',
		'pptx',
		'doc',
		'php',
		'docx',
	);

$path = empty($_GET['p']) ? '' : trim($_GET['p']);
$path = $aes->decryptString(trim($path), $keys);
$path = urlDecode($path);

$path_arr = explode('/', trim($path, '/'));


$list = scandir($base_path . $path);
if($list === false) die('not exist!');

$dir_list = array();
$file_list = array();

foreach($list as $item) {
	$new_path = $path . $item;

	if(is_dir($base_path . $new_path)) {
		array_push($dir_list, $item);
	} else {
		array_push($file_list, $item);
	}
}

function file_type($name) {
	$exts = explode('.', $name);
	if(count($exts) < 2) return '';
	$ext = strtolower($exts[count($exts) - 1]);
	return $ext;
}

function file_icon($name) {
	$ext = file_type($name);
	switch($ext) {
		case 'htm':
		case 'html':
			return 'htm';
		case 'js':
			return 'js';
		default:
			return 'file';
	}
}

function in_blacklist_folder($item) {
	global $blacklist_folder;

	$item = strtolower($item);

	if(in_array($item, $blacklist_folder)) {
		return true;
	}

	return false;
}

function in_blacklist_file($item) {
	global $whitelist_fileext;

	$item = strtolower($item);
	$ext = file_type($item);

	if(in_array($ext, $whitelist_fileext) === true) {
		return false;
	}

	return true;
}

?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>File List</title>
    <style>
		body{font:13px/1.4 arial,helvetica,sans-serif;}
		th,em,strong,b,address,cite{font-style:normal;font-weight:400;}
		a{text-decoration:none;}
		li{list-style:none;}
		#wrap{width:760px;margin:20px auto;}
		h3{font-size:24px;margin:10px;}
		.list{padding:0;}
        .list em.folder{background:url(<?php echo $fileDir; ?>/images/folder.gif) no-repeat scroll 0 center transparent;display:block;float:left;height:26px;width:26px;}
		.list em{background:url(<?php echo $fileDir; ?>/images/file.png) no-repeat scroll 0 center transparent;display:block;float:left;height:26px;width:26px;}
		.list em.js{background:url(<?php echo $fileDir; ?>/images/file-js.png) no-repeat 0 center;display:block;float:left;height:26px;width:26px;}
		.list em.htm{background:url(<?php echo $fileDir; ?>/images/file-htm.png) no-repeat 0 center;display:block;float:left;height:26px;width:26px;}
		.list li{line-height:26px;height:26px;font-size:16px;padding:3px 10px;}
    </style>
    </head>
	<body>
		<div id="wrap">
		<h3>
			<a href="?">ROOT</a>
			<?php if(!empty($path)): ?>
				<?php 
					$new_path = ""; 
					$path_arr_len = count($path_arr);
				?>
				<?php foreach($path_arr as $i => $item): ?>
					<?php 
						$new_path .= $item . '/';
						$new_path_escape = $aes->encryptString(urlEncode($new_path), $keys);

						if($i == $path_arr_len - 1) {
							echo '&nbsp;/&nbsp;'. $item;
						} else {
							echo '&nbsp;/&nbsp;<a href="?p='. $new_path_escape. '">'. $item .'</a>';
						}
					?>
				<?php endforeach; ?>
			<?php endif; ?>
		</h3>
		<ul class="list">
			<?php foreach($dir_list as $item): ?>
				<?php 
					$new_path = $path . $item . '/';
					$new_path_escape = $aes->encryptString(urlEncode($new_path), $keys);
				?>

				<?php if(!in_blacklist_folder($item)): ?>
					<li>
						<a href="?p=<?php echo($new_path_escape); ?>"><em class="folder"></em><?php echo($item); ?></a>
					</li>
				<?php endif; ?>
			<?php endforeach; ?>

			<?php foreach($file_list as $item): ?>
                <?php if( $item == 'index.php' ) continue; ?>
				<?php $new_path = $path . $item; ?>
				<?php $new_path_escape = $path . urlencode($item); ?>

	
				<?php if(!in_blacklist_file($item)): ?>
					<?php $file_icon = file_icon($item); ?>
					<li>
						<a href="<?php echo($base_url . $new_path_escape); ?>" target="_blank"><em class="<?php echo($file_icon); ?>"></em><?php echo($item); ?></a>
					</li>
				<?php endif; ?>
			<?php endforeach; ?>
		</ul>
		</div>
	</body>
</html>
