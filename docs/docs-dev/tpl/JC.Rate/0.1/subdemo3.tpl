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
            <!-- simple demo -->
            <dl style="padding: 20px;">
                <h2>Inited Callback & ReadOnly:</h2>
                <span class="js_compRate js_rateInitedEvent" score="3" readonly="true" hints="1分,2分,3分,4分,5分">
                    <input id="score-input2" ReadOnly type="text" />
                </span>
            </dl>

            <dl style="padding: 20px;">
                <dt>Click Callback:</dt>
                <dd>
                    <span class="js_compRate js_rateClickedEvent" totalnum="9" score="5" hints="呵呵,不忍直视,差,较差,一般,还行,不错,很好,非常棒"></span>
                    <input id="score-input" ReadOnly type="text" value="一般" />
                </dd>
            </dl>
        </div>
    </div>
</div>

<script type="text/template" class="show-html">
<div class="" data-cajScriptData="|script">
    <script type="text/template">
        <dl style="padding: 20px;">
            <h2>ReadOnly:</h2>
            <span class="js_compRate" score="3" readonly="true"></span>
        </dl>

        <dl style="padding: 20px;">
            <dt>Callback:</dt>
            <dd>
                <span class="js_compRate js_rateInitedEvent js_rateClickedEvent" totalnum="10" score="5" half="true"></span>
            </dd>
        </dl>
    &lt;/script>
</div>
</script>

<script type="text/javascript" class="show-js">
    requirejs( [ '{{$COMP_NAME}}' ] );

    $( document ).delegate( 'span.js_rateInitedEvent', 'rateInited', function( _evt, _rateIns ){
        var _selector = $( this );
        JC.log( 'rateInited event' );
        $( '#score-input2' ).val( _selector.children( 'input[ name = "score" ]' ).attr( 'value' ) + '分' );
    });

    $( document ).delegate( 'span.js_rateClickedEvent', 'rateClicked', function( _evt, _target, _rateIns ) {
        var _star = _target;
        JC.log( 'rate clicked' );
        if( _star.hasClass( 'rate-score' ) ){
            JC.log( _star.attr( 'title' ) );
            $( '#score-input' ).val( _star.attr( 'title' ) );
        }
    } );
</script>
{{include file="public/simple_demo/body_footer.tpl"}}
{{/block}}