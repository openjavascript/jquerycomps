<?php
    $count = isset( $_COOKIE['autoSelectCount'] ) ? (int) $_COOKIE['autoSelectCount'] : 60;
    $count++;
    setcookie( 'autoSelectCount', $count, time() + 60 * 60 * 24 );
echo <<<END
<dd>
    <select name='select{$count}_1' 
        defaultselect 
        selecturl="data/shengshi_with_error_code.php?id=0" 
        selecttarget="/select:eq(1)"
        reqmsg="省份"
        selecttriggerinitchange="false"
        >
        <option value="" defaultoption>请选择</option>
    </select>
    <select name='select{$count}_2' 
        selecturl="data/shengshi_with_error_code.php?id={0}" 
        selecttarget="/select:last"
        reqmsg="城市"
        >
        <option value="" defaultoption>请选择</option>
    </select>
    <select name='select{$count}_3' 
        selecturl="data/shengshi_with_error_code.php?id={0}"
        reqmsg="区县"
        >
        <option value="" defaultoption>请选择</option>
    </select>
    <em class="error"></em>
</dd>
END;
?>

