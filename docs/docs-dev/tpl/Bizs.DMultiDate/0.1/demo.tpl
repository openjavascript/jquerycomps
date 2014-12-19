{{extends file="public/demo/base.tpl"}}

{{block name="html_header_css" append}}
<!-- <link href='{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/res/default/style.css' rel='stylesheet' /> -->
{{/block}}

{{block name="body_main"}}

    <div class="detail-demo">
        <h3 id="navmark-demo" class="detail-blockname">DEMO</h3>
        <div class="detail-ct detail-subdemo">
            <h4 id="navmark-demo1" class="detail-groupname">Defualt</h4>
            <p class="desc">
                hiddendateiso="true" 隐藏域的startdate和enddate为格式化的ISO格式, 自定义显示2个日期框 
            </p>
            <div class="detail-subdemoview">
                <iframe src="{{$VIEWER_URL}}subdemo1.tpl" frameborder="0" width="100%" style=""></iframe>
            </div>

            <h4 id="navmark-demo2" class="detail-groupname">CRM中小示例</h4>
            <p class="desc">
               JC.Calendar 中小销售 示例 隐藏域的startdate和enddate为format之后的格式
            </p>
            <div class="detail-subdemoview">
                <iframe src="{{$VIEWER_URL}}subdemo2.tpl" frameborder="0" width="100%" style=""></iframe>
            </div>
        </div>
    </div>

<script type="text/javascript">
</script>
{{/block}}

