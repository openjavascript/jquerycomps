<div class="footer">
    <h2>友情链接：</h2>
    <p id="outlink" class="clearfix">
        {{foreach from=$websiteLink item=link}}
        <a href="{{$link.url}}" target="_blank">{{$link.name}}</a>
        {{/foreach}}
    </p>
</div>
