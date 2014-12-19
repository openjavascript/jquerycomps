<div id="compTitle">
    <h1 class="detail-title">{{$COMP_NAME}}</h1>
    <h2 class="detail-subtitle">
       {{$allVersionComps.subtitle|default:''}}
{{if $allVersionComps.api|default:''}}
<div class="js_compAutoFixed" style="z-index: 2000; display:block; float: right;" 
    data-fixedTopPx="60"
    >
    <a href="{{$allVersionComps.api}}" target="_api" class="detail-titlebtn">查看API</a>
</div>
{{/if}}
{{if $compData.download|default:''}}<a href="{{$compData.download}}" target="_download" class="detail-titlebtn">DOWN LOAD</a>{{/if}}
    </h2>
</div>

