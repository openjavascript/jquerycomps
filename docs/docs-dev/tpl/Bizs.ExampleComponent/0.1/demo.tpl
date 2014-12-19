{{extends file="public/demo/base.tpl"}}

{{block name="html_header_css" append}}
{{/block}}

{{block name="body_main"}}

    <div class="detail-demo">
        <h3 id="navmark-demo" class="detail-blockname">DEMO</h3>
        <div class="detail-ct detail-subdemo">
            <h4 id="navmark-demo1" class="detail-groupname">example 1</h4>
            <p class="desc">
                默认示例1
            </p>
            <div class="detail-subdemoview">
                <iframe src="{{$VIEWER_URL}}subdemo1.tpl" frameborder="0" width="100%" style=""></iframe>
            </div>

            <h4 id="navmark-demo2" class="detail-groupname">example 2</h4>
            <p class="desc">
                默认示例2
            </p>
            <div class="detail-subdemoview">
                <iframe src="{{$VIEWER_URL}}subdemo1.tpl" frameborder="0" width="100%" style=""></iframe>
            </div>
        </div>
    </div>

{{/block}}

{{block name="body_footer_js" append}}
<script type="text/javascript">
</script>
{{/block}}
