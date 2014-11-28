<div id="bodynav" class="body-nav">
    {{foreach from=$compsList item=value}}
    <dl>
        <dt>{{$value.name}}</dt>
        <dd>
            <ul>
                {{foreach from=$value.list item=item}}
                {{if !$item.hide|default:'' && !$item.history|default:'' }}
                <li>
                    <a href="#" linkdata="{{$item.name|replace:'.':'_'}}">{{$item.name}}</a>
                </li>
                {{/if}}
                {{/foreach}}
            </ul>
        </dd>
    </dl>
    {{/foreach}}
</div>

