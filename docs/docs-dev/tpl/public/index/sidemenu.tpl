<div id="bodynav" class="body-nav">
    {{foreach from=$compsList item=value}}
    <dl>
        <dt>{{$value.name}}</dt>
        <dd>
            <ul>
{{if isset( $value.data )}}
    {{foreach from=$value.data item=sitem}}
        {{if isset( $sitem.data ) }}
            {{for $i = count( $sitem.data ) - 1; $i >= 0; $i--}}
                
                {{if !$sitem.data[$i].hide|default:''}}
<li>
    <a 
    class="js_sidemenuItem"
    data-id="{{"`$sitem.name` `$sitem.data[$i].version`"|md5}}"
    data-name="{{$sitem.name}}"
    data-version="{{$sitem.data[$i].version|default:'0.1'}}"
    target="_detail"
    href="{{$PROJECT_ROOT}}/viewer.php?module={{$sitem.name}}&version={{$sitem.data[$i].version|default:'0.1'}}&file=doc.tpl#btop" 
    >{{$sitem.name}}</a>
</li>
                    {{break}}
                {{/if}}
            {{/for}}
        {{/if}}
    {{/foreach}}
{{/if}}
            </ul>
        </dd>
    </dl>
    {{/foreach}}
</div>

