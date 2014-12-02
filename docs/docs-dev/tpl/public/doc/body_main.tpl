<div class="detail-attr">
    <h3 id="navmark-desc" class="detail-blockname ">组件简介</h3>
    <div class="detail-ct">
        <div class="detail-desc">
            {{foreach from=$allVersionComps.desc item=d}}
            <p class="desc">{{$d}}</p>
            {{/foreach}}
        </div>
        <p class="desc">{{$compCustomDesc|default:''}}</p>
    </div>
    <h3 id="navmark-use" class="detail-blockname" >使用说明</h3>
    <div class="detail-ct detail-use">
        <h4 id="navmark-version" class="detail-groupname ">历史版本 : </h4>
        <div class="detail-version">
            {{foreach from=$allVersionComps['data'] item=comp}}
                {{if !$comp.hide|default:'' }}
                <a href="#" class="detail-versionlink {{if $comp.nowVersion|default:'' }}detail-nowVersion{{/if}}" data-name="{{$allVersionComps.name}}" data-version="{{$comp.version}}">
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
                        <a href="{{$comp.outlink|default:''}}" target="_blank" 
                            data-name="{{$comp.name}}"
                            data-version="{{$comp.version}}"
                            >
                            {{$comp.name}} - v{{$comp.version}}
                        </a>
                    {{else}}
                        {{if !$comp.hide|default:''}}
                        <a href="#" class="detail-requirelink"
                            data-name="{{$comp.name}}"
                            data-version="{{$comp.version}}"
                            >
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
    <h3 id="navmark-attr" class="detail-blockname">HTML Attributes</h3>
    <div class="detail-ct detail-htmlattr">
        <textArea class="detail-code"></textArea>
    </div>
    {{/if}}

    {{if $propertyAttr|default:''}}
    <h3 id="navmark-data" class="detail-blockname">Properties</h3>
    <div class="detail-ct detail-data">
        <textArea class="detail-code"></textArea>
    </div>
    {{/if}}

    {{if $methodAttr|default:''}}
    <a name="methodAttr"></a>
    <h3 id="navmark-data" class="detail-blockname">Methods</h3>
    <div class="detail-ct detail-data">
        <textArea class="detail-code"></textArea>
    </div>
    {{/if}}

    {{if $eventAttr|default:''}}
    <h3 id="navmark-data" class="detail-blockname">Events</h3>
    <div class="detail-ct detail-data">
        <textArea class="detail-code"></textArea>
    </div>
    {{/if}}

    {{if $dataFormat|default:'' || $dataFormatAttr|default:'' }}
    <h3 id="navmark-data" class="detail-blockname">Data Format</h3>
    <div class="detail-ct detail-data">
        <textArea class="detail-code"></textArea>
    </div>
    {{/if}}
</div>
