{{extends file="public/simple_demo/base.tpl"}}

{{block name="html_header_css" append}}
<style class="show-css">
@import url( '{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/res/default/style.css'  );
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
            <h2>Cover Inline And Callback:</h2>
            <div style="padding:20px;">
                Here are 
                <span 
                    class= "js_compCover 
                            js_coverCoveredEvent 
                            js_coverClickedEvent 
                            js_coverLeavedEvent" 
                    style="height: 200px; width: 200px; background: red;"
                    coverdir="0"
                    covercnt="no" 
                    coverpointer="true" 
                    coverlink="http://www.so.com"
                >a few</span>
                 words

                 <p class="console"></p>
            </div>
            
        </div>
    </div>
</div>

<script type="text/template" class="show-html">
    <h2>Cover Inline And Callback:</h2>
    <div>
        Here are 
        <span 
            class= "js_compCover 
                    js_coverCoveredEvent 
                    js_coverClickedEvent 
                    js_coverLeavedEvent" 
            style="height: 200px; width: 200px; background: red;"
            covercnt="no" 
            coverdir="0"
            coverpointer="true" 
            coverlink="http://www.so.com"
        >a few</span>
         words
    </div>
</script>

<script type="text/javascript" class="show-js">
    requirejs( [ 'JC.Cover' ], function(){
    });

    $( document ).delegate( ".js_coverCoveredEvent", "coverCovered", function( _evt, _target, _coverIns ) {
        JC.log( 'item covered' );

        var _tar = $( _evt.target );

        JC.log( _tar );

        $( '.console' ).html( 'item covered' );
    } );

    $( document ).delegate( ".js_coverClickedEvent", "coverClicked", function( _evt, _target, _coverIns ) {
        JC.log( 'item clicked' );
        $( '.console' ).html( 'item clicked' );
    } );

    $( document ).delegate( ".js_coverLeavedEvent", "coverLeaved", function( _evt, _target, _coverIns ) {
        JC.log( 'item leaved' );
        $( '.console' ).html( 'item leaved' );
    } );

</script>
{{include file="public/simple_demo/body_footer.tpl"}}
{{/block}}

