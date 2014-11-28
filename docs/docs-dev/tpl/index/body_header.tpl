<div class="header">
    <div class="wrapper">
        <div class="header-nav clearfix">
            <h1 class="header-logo">
                <a href="{{$PROJECT_ROOT}}"><span>Jquery</span><lable class="white">Comps</label></a>
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
                        {{foreach from=$value.list item=item}}
                        {{if !$item.hide|default:'' && !$item.history|default:''}}
                            {{if $value.name != 'Plugin'}}
                                <a class="header-complink" data-version="{{$item.version}}" href="#">{{$item.name}}</a>
                            {{else}}
                                <a href="{{$item.outlink}}" target="_blank">{{$item.name}}</a>
                            {{/if}}
                        {{/if}}
                        {{/foreach}}
                    </div>
                </li>
                {{/foreach}}
                {{foreach from=$extraMenu item=value}}
                <li class="header-extramenu" hover="header-menuhover">
                    <a href="{{$value.url}}" target="_blank" hover="header-menuhover">
                    {{$value.name}}
                    </a>
                </li>
                {{/foreach}}
            </ul>
        </div>
    </div>
</div>
<div class="flor-img" style="display:none;"></div>

