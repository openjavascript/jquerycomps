{{extends file="public/base.tpl"}}
{{block name="inherit_header" append}}
<link rel="stylesheet" type="text/css" href="{{$PROJECT_ROOT}}/static/css/app/index.css" />
{{/block}}

{{block name="body_main"}}
    {{include file="index/body_header.tpl"}}

    <div class="wrapper">
        <div class="body clearfix">
            <div class="body-helper">
                <a href="#" class="body-homebtn" style="display:none">HOME</a>
                <a href="#" class="body-backbtn" style="display:none">BACK</a>
                <a href="#" class="body-topbtn" style="display:none">TOP</a>
            </div>

            {{include file="index/sidemenu.tpl"}}

            <div id="itemlist" class="body-content">
                {{foreach from=$compsList item=value}}
                <ul class="body-compblock">
                    <h1 class="body-blockname">{{$value.name}}</h1>
                    {{foreach from=$value.desc item=d}}
                    <p class="body-blockdesc">{{$d}}</p>
                    {{/foreach}}
                    {{if $value.name != 'Plugin'}}
                        {{foreach from=$value.list item=item}}
                        {{if !$item.hide|default:'' && !$item.history|default:''}}
                        <li id="{{$item.name|replace:'.':'_'}}" class="body-comp" 
                            data-version="{{$item.version}}" 
                            data-name="{{$item.name}}"
                            data-url="{{$PROJECT_ROOT}}/viewer.php?module={{$item.name}}&version={{$item.version}}&file=detail.tpl"
                            >
                            <h2 class="body-comptitle clearfix">
                                <span class="body-compname">{{$item.name}}</span>
                                <a href="#" class="body-attrbtn body-changebtn"
                                    data-url="{{$PROJECT_ROOT}}/viewer.php?module={{$item.name}}&version={{$item.version}}&file=detail.tpl#attr"
                                >ATTR</a>
                                {{if !$item.nodemo|default:''}}
                                <a href="#" class="body-demobtn body-changebtn"
                                    data-url="{{$PROJECT_ROOT}}/viewer.php?module={{$item.name}}&version={{$item.version}}&file=detail.tpl"
                                >DEMO</a>
                                <a href="#" class="body-sdemobtn"
                                    data-url="{{$PROJECT_ROOT}}/viewer.php?module={{$item.name}}&version={{$item.version}}&file=demo.tpl"
                                >SIMPLE DEMO</a>
                                {{/if}}
                            </h2>
                            <h3 class="body-compsubtitle">{{$item.subtitle}}<span class="body-compversion">最新版本: {{$item.version}}</span></h3>
                            {{foreach from=$item.desc item=desc}}
                            <p class="body-compdesc">{{$desc}}</p>
                            {{/foreach}}
                            <div class="body-compdemo">
                                <a href="#" class="body-compclose">CLOSE DEMO</a>
                                <iframe src="" frameborder="no" border="0"></iframe>
                            </div>
                        </li>
                        {{/if}}
                        {{/foreach}}
                    {{else}}
                        {{foreach from=$value.list item=item}}
                        {{if !$item.hide|default:'' && !$item.history|default:''}}
                        <li id="{{$item.name|replace:'.':'_'}}" class="body-comp">
                            <h2 class="body-comptitle clearfix">
                                <span class="body-compname">{{$item.name}}</span>
                                <a href="{{$item.outlink}}" target="_blank" class="body-attrbtn">官网</a>
                            </h2>
                            <h3 class="body-compsubtitle">{{$item.subtitle}}<span class="body-compversion">使用版本: {{$item.version}}</span></h3>
                            {{foreach from=$item.desc item=desc}}
                            <p class="body-compdesc">{{$desc}}</p>
                            {{/foreach}}
                        </li>
                        {{/if}}
                        {{/foreach}}
                    {{/if}}
                </ul>
                {{/foreach}}
            </div>
            <div class="body-detail">
                <iframe id="detailframe" src="" frameborder="no" border="0"></iframe>
                <ul class="body-detailnav"></ul>
            </div>
        </div>
    {{include file="index/body_footer.tpl"}}
    </div>

{{/block}}

{{block name="body_footer_js"}}
    <script>
        requirejs( [ '{{$PROJECT_ROOT}}/static/js/app/index.js' ] );
    </script>
{{/block}} 
