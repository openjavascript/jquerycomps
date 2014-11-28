<?php
$target = isset( $_REQUEST[ 'target' ] ) ? $_REQUEST[ 'target' ] : '_self';
$target = preg_replace( '/<[^>].*?>/', '', $target );

function listFolderFiles($dir){ 
    global $target;
    $ffs = scandir($dir); 
    echo '<dl style="margin: 20px 80px;" >'; 
    echo '<dt><a style="display:block" href="../">../</a></dt>';
    echo '<dd><ol>';
    foreach($ffs as $ff){ 
        if($ff != '.' && $ff != '..'){ 
        if(!is_dir($dir.'/'.$ff)){ 
            if( $ff == 'index.php' ) continue;
        echo '<li style="margin:5px auto;"><a style="" target="_blank" href="'.ltrim($dir.'/'.$ff,'./').'">'.$ff.'</a>'; 
        } else { 
        echo '<li style="margin:5px auto;"><a style="" target="'.$target.'" href="'.ltrim($dir.'/'.$ff,'./').'">'.$ff.'</a>'; 
        } 
        //if(is_dir($dir.'/'.$ff)) listFolderFiles($dir.'/'.$ff,$exclude); 
        echo '</li>'; 
        } 
    } 
    echo '</ol></dd>';
    echo '</dl>'; 
} 
?>
