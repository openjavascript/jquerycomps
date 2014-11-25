<?php
    $count = isset( $_COOKIE['checkAllCount'] ) ? (int) $_COOKIE['checkAllCount'] : 20;
    $count++;
    setcookie( 'checkAllCount', $count, time() + 60 * 60 * 24 );
echo <<<END
<dl class="def example{$count}">
    <dt>checkall example {$count}</dt>
    <dd>
    <input type="checkbox"  id="checkall{$count}" checktype="all" checkfor="dl.example{$count} input[type=checkbox]"><label for="checkall{$count}">全选</label>
    <input type="checkbox"  id="checkall{$count}_inverse" checktype="inverse" checkfor="dl.example{$count} input[type=checkbox]" checkall="dl.example{$count} input[checktype=all]"><label for="checkall{$count}_inverse">反选</label>
    </dd>
    <dd>
    <input type='checkbox' id='checkall{$count}_1' value='' name='' checked />
    <label for='checkall{$count}_1'>checkall{$count}_1</label>
    <input type='checkbox' id='checkall{$count}_2' value='' name='' checked />
    <label for='checkall{$count}_2'>checkall{$count}_2</label>
    <input type='checkbox' id='checkall{$count}_3' value='' name='' checked />
    <label for='checkall{$count}_3'>checkall{$count}_3</label>
    <input type='checkbox' id='checkall{$count}_4' value='' name='' checked />
    <label for='checkall{$count}_4'>checkall{$count}_4</label>
    <input type='checkbox' id='checkall{$count}_5' value='' name='' checked />
    <label for='checkall{$count}_5'>checkall{$count}_5</label>
    </dd>
</dl>
<hr />

END;
?>
