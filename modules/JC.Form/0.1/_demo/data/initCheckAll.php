<?php
    $count = isset( $_COOKIE['checkAllCount'] ) ? (int) $_COOKIE['checkAllCount'] : 20;
    $count++;
    setcookie( 'checkAllCount', $count, time() + 60 * 60 * 24 );
echo <<<END
<dl class="def example{$count}">
    <dt>checkall example {$count}</dt>
    <dd>
        <label>
            <input type="checkbox" checktype="all" checkfor="dl.example{$count} input[type=checkbox]">
            全选
        </label>
        <label>
            <input type="checkbox" checktype="inverse" checkfor="dl.example{$count} input[type=checkbox]" checkall="dl.example{$count} input[checktype=all]">
            反选
        </label>
    </dd>
    <dd>
        <label>
            <input type='checkbox' value='' name='' checked />
            checkall{$count}_1
        </label>
        <label>
            <input type='checkbox' value='' name='' checked />
            checkall{$count}_2
        </label>
        <label>
            <input type='checkbox' value='' name='' checked />
            checkall{$count}_3
        </label>
        <label>
            <input type='checkbox' value='' name='' checked />
            checkall{$count}_4
        </label>
        <label>
            <input type='checkbox' value='' name='' checked />
            checkall{$count}_5
        </label>
    </dd>
</dl>
<hr />

END;
?>
