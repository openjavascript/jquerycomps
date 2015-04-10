{{extends file="public/demo/base.tpl"}}

{{block name="html_header_css" append}}
<!-- <link href='{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/res/default/style.css' rel='stylesheet' /> -->
{{/block}}

{{block name="body_main"}}
<div class="wrap">
    {{include file="public/demo/body_main.tpl"}}

    <div class="detail-demo">
        <h3 id="navmark-demo" class="detail-blockname">DEMO</h3>
        <div class="detail-ct detail-subdemo">
            <h4 id="navmark-demo1" class="detail-groupname">Defualt</h4>
            <p class="desc">
               
            </p>
            <div class="detail-subdemoview">
                <iframe src="{{$VIEWER_URL}}subdemo1.tpl" frameborder="0" width="100%" style=""></iframe>
            </div>

           
        </div>
    </div>
</div>

<script type="text/javascript">
</script>
{{/block}}

