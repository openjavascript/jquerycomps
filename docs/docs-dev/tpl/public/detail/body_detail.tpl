<div class="detail-attr">
    <h3 id="navmark-desc" class="detail-blockname ">组件简介</h3>
    <div class="detail-ct">
        <div class="detail-desc">
            {{foreach from=$compData.desc item=d}}
            <p class="desc">{{$d}}</p>
            {{/foreach}}
        </div>
        <p class="desc">some <em>other words</em> ...</p>
    </div>
    <h3 id="navmark-use" class="detail-blockname" >使用说明</h3>
    <div class="detail-ct detail-use">
        <h4 id="navmark-version" class="detail-groupname ">历史版本 : </h4>
        <div class="detail-version">
            {{foreach from=$allVersionComps item=comp}}
                {{if !$comp.hide|default:'' }}
                <a href="#" class="detail-versionlink {{if $comp.nowVersion }}detail-nowVersion{{/if}}" data-name="{{$comp.name}}">
                {{$comp.version}}
                </a>
                {{/if}}
            {{/foreach}}
        </div>
        <h4 id="navmark-require" class="detail-groupname ">组件依赖 : </h4>
        <div class="detail-require">
            <p>
                {{if sizeof( $requireComps ) > 0 }}
                    {{foreach from=$requireComps item=comp}}
                    {{if $comp.outlink|default:'' }}
                        <a href="{{$comp.outlink|default:''}}" target="_blank">
                            {{$comp.name}} - v{{$comp.version}}
                        </a>
                    {{else}}
                        {{if !$comp.hide|default:''}}
                        <a href="#" class="detail-requirelink">
                            {{$comp.name}} - v{{$comp.version}}
                        </a>
                        {{/if}}
                    {{/if}}
                    {{/foreach}}
                {{else}}
                    <em>无依赖</em>
                {{/if}}
            </p>
        </div>
        <h4 id="navmark-link" class="detail-groupname">外链形式 : </h4>
        <textArea class="detail-code">
        </textArea>
        <h4 id="navmark-load" class="detail-groupname">模块加载形式 : </h4>
        <textArea class="detail-code"></textArea>
    </div>

    {{if $htmlAttr|default:''}}
    <h3 id="navmark-attr" class="detail-blockname">HTML 属性</h3>
    <div class="detail-ct detail-htmlattr">
        <textArea class="detail-code"></textArea>
    </div>
    {{/if}}

    {{if $dataFormat|default:''}}
    <h3 id="navmark-data" class="detail-blockname">数据格式</h3>
    <div class="detail-ct detail-data">
        <textArea class="detail-code"></textArea>
    </div>
    {{/if}}
</div>
