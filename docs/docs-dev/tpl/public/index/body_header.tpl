<div class="header">
    <div class="wrapper">
        <div class="header-nav clearfix">
            <h1 class="header-logo">
                <a href="{{$PROJECT_ROOT}}"><span>Jquery</span><lable class="cwhite">Comps</label></a>
                <i>|</i>
                <a class="header-github" hover="logohover" href="http://github.com/openjavascript/jquerycomps" target="_blank">
                    <img class="github-unhover" src="{{$PROJECT_ROOT}}/static/img/githubLogo.png" />
                    <img class="github-hover" src="{{$PROJECT_ROOT}}/static/img/githubLogo2.png" />
                </a>
            </h1>
            <ul id="menulist" class="header-menu">
                {{foreach from=$compsList item=value}}
                <li hover="header-menuhover">
                    {{$value.name}}
                    <div class="header-submenu clearfix">
                        {{if isset( $value.data )}}
                            {{foreach from=$value.data item=sitem}}
                                {{if isset( $sitem.data ) }}
                                    {{for $i = count( $sitem.data ) - 1; $i >= 0; $i--}}
                                        
                                        {{if !$sitem.data[$i].hide|default:''}}
                                            {{if $value.name != 'Plugin'}}
                                                <a class="header-complink" 
                                                data-version="{{$sitem.data[$i].version}}" 
                                                data-name="{{$sitem.name}}" 
                                                data-id="{{"`$sitem.name` `$sitem.data[$i].version`"|md5}}"
                                                data-url="{{$PROJECT_ROOT}}/viewer.php?module={{$sitem.name}}&version={{$sitem.data[$i].version}}&file=doc.tpl"
                                                href="javascript:;">{{$sitem.name}}</a>
                                            {{else}}
                                                <a href="{{$sitem.outlink}}" target="_blank">{{$sitem.name}}</a>
                                            {{/if}}
                                            {{break}}
                                        {{/if}}
                                    {{/for}}
                                {{/if}}
                            {{/foreach}}
                        {{/if}}
                    </div>
                </li>
                {{/foreach}}
                {{if isset( $extraMenu )}}
                    {{foreach from=$extraMenu item=value}}
                    <li class="header-extramenu" hover="header-menuhover">
                        <a href="{{$value.url}}" target="_blank" hover="header-menuhover">
                        {{$value.name}}
                        </a>
                    </li>
                    {{/foreach}}
                {{/if}}
            </ul>
        </div>
    </div>
</div>
{{if !$smarty.cookies.hideheader|default:''}}
<div class="js_headarBar">
    <div class="flor-img" style=""></div>
    <button type="button" class="button black medium js_hideHeader">hide this</button>
</div>
{{/if}}

