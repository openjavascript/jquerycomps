{{extends file="public/simple_demo/base.tpl"}}

{{block name="html_header_css" append}}
<!-- start JC style -->
<style class="show-css">
@import url( '{{$URL_ROOT}}/modules/JC.Calendar/0.3/res/default/style.css'  );
</style>
<!-- end JC style -->
<style>
    .ajaxtree-demo1 {
        margin-left: 50px;
    }
</style>

{{/block}}

{{block name="body_main"}}
{{include file="public/simple_demo/body_header.tpl"}}
<div class="codeview-wrap">
    <div class="codeview-tabbar">
        <a href="#" class="codeview-css">CSS</a>
        <a href="#" class="codeview-js">JS</a>
        <a href="#" class="codeview-html">HTML</a>
        <a href="#" class="codeview-page selected">PAGE</a>
    </div>
    <div class="codeview-view">
        <div class="codeview-cssview">
<textArea style="display:none;">
<link href='{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/res/default/style.css' rel='stylesheet' />
</textArea>
        </div>
        <div class="codeview-jsview">
            <textArea style="display:none;"></textArea>
        </div>
        <div class="codeview-htmlview">
            <textArea style="display:none;"></textArea>
        </div>
        <div class="codeview-pageview nowview">
             <select name="dataspan" class="dataspan js_autoMultidate"
                    mddate="/input.js_multidate"
                    mdstartdate="/input.js_startdate"
                    mdenddate="/input.js_enddate"
                    mdlastdate="true"
                    >
                    <option value="date">日数据</option>
                    <option value="week">周数据</option>
                    <option value="month">月数据</option>
                    <option value="season">季数据</option>
                </select>
                <input type="text" class="js_multidate" name="ssdate"
                multidate="date" currentcanselect="true" size="40" readonly
                ignoreInitCalendarDate="true"
                />
                <input type="hidden" name="startdate" class="js_startdate" value="" />
                <input type="hidden" name="enddate" class="js_enddate" value="" />
        </div>
      
    </div>
</div>

<script type="text/template" class="show-html">
<select name="dataspan" class="dataspan js_autoMultidate"
    mddate="/input.js_multidate"

    mdstartdate="/input.js_startdate"
    mdenddate="/input.js_enddate"

    mdDefaultBox="/span.js_mdDefault"
    mdCustomBox="/span.js_mdCustom"
    mdCustomStartDate="/input.js_mdStartDate"
    mdCustomEndDate="/input.js_mdEndDate"
    >
    <option value="date">日数据</option>
    <option value="week">周数据</option>
    <option value="month">月数据</option>
    <option value="season">季数据</option>
    <option value="custom">自定义</option>
</select>
<span class="js_mdDefault">
    <input type="text" class="js_multidate" 
    multidate="date" currentcanselect="true" size="40" readonly />
    <input type="hidden" name="startdate" class="js_startdate" value="" />
    <input type="hidden" name="enddate" class="js_enddate" value="" />
</span>
<span class="js_mdCustom" style="display:none;">
    <input type="text" datatype="daterange" name="startdate" class="js_mdStartDate" value="" />
    <input type="text" datatype="daterange" name="enddate" class="js_mdEndDate" value="" />
    <em class="error"></em>
</span>
</script>

<script type="text/javascript" class="show-js">
    requirejs( [ '{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/{{$OUTPUT}}' ] );
</script>
{{include file="public/simple_demo/body_footer.tpl"}}
{{/block}}

