{{extends file="public/doc/base.tpl"}}

{{block name="html_header_css" append}}
{{/block}}

{{block name="body_main"}}
<div class="wrap">
    {{include file="public/doc/body_main.tpl" methodAttr=1 }}

    <!-- 外链形式 start -->
    <textArea class="detail-codetpl" type="text/template">
        <script src="{{$URL_ROOT}}/{{$COMP_NAME}}/{{$COMP_VERSION}}/{{$OUTPUT}}" />
    </textArea>
    <!-- 外链形式 end -->

    <!-- 模块加载 start -->
    <textArea class="detail-codetpl" type="text/template">
        <script>
            requirejs( [ '{{$COMP_NAME}}' ], function( {{$NAME}} ){
            });
        </script>
    </textArea>
    <!-- 模块加载 end -->

    <textArea class="detail-codetpl" type="text/template">
         JC.f.addUrlParams 
         JC.f.cloneDate 
         JC.f.dateDetect 
         JC.f.delUrlParam 
         JC.f.easyEffect 
         JC.f.formatISODate 
         JC.f.funcName 
         JC.f.getJqParent 
         JC.f.getUrlParam 
         JC.f.getUrlParams 
         JC.f.hasUrlParam 
         JC.f.httpRequire 
         JC.f.isSameDay 
         JC.f.isSameMonth 
         JC.f.jcAutoInitComps 
         JC.f.maxDayOfMonth 
         JC.f.mousewheelEvent 
         JC.f.padChar 
         JC.f.parentSelector 
         JC.f.parseBool 
         JC.f.parseFinance 
         JC.f.parseISODate 
         JC.f.printf 
         JC.f.pureDate
         JC.f.reloadPage 
         JC.f.removeUrlSharp 
         JC.f.scriptContent 
         JC.f.scriptPath 
         JC.f.sliceArgs 
         JC.f.urlDetect     
    </textArea>

</div>

{{/block}}

