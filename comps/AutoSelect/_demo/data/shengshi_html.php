<?php
    $count = isset( $_COOKIE['autoSelectCount'] ) ? (int) $_COOKIE['autoSelectCount'] : 60;
    $count++;
    setcookie( 'autoSelectCount', $count, time() + 60 * 60 * 24 );
echo <<<END
<dd>
    <select name='select{$count}_1' defaultselect selecturl="data/shengshi_with_error_code.php?id=0" selecttarget="/select:eq(1)"><option value="-1" defaultoption>请选择</option></select>
    <select name='select{$count}_2' selecturl="data/shengshi_with_error_code.php?id={0}" selecttarget="/select:last"><option value="-1" defaultoption>请选择</option></select>
    <select name='select{$count}_3' selecturl="data/shengshi_with_error_code.php?id={0}"><option value="-1" defaultoption>请选择</option></select>
</dd>
END;
?>

