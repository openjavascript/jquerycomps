<div id="compTitle">
    <h1 class="detail-title">{{$COMP_NAME}}</h1>
    <h2 class="detail-subtitle">
        {{$allVersionComps.subtitle|default:''}}
{{if $compData.download|default:''}}<a href="{{$compData.download}}" target="_blank" class="detail-titlebtn">DOWN LOAD</a>{{/if}}
{{if $allVersionComps.api|default:''}}<a href="{{$allVersionComps.api}}" target="_blank" class="detail-titlebtn">查看API</a>{{/if}}
    </h2>
</div>

