{{extends file="public/demo/base.tpl"}}

{{block name="html_header_css" append}}
<link href='{{$URL_ROOT}}/modules/JC.Panel/0.2/res/default/style.css' rel='stylesheet' />

{{/block}}

{{block name="body_main"}}
<div class="wrap">
    <div class="detail-demo">
        <h3 id="navmark-demo" class="detail-blockname">DEMO</h3>
        <div class="detail-ct">

            <div class="detail-subdemoview">
                <iframe src="{{$VIEWER_URL}}subdemo.tpl" frameborder="0" width="100%"></iframe>
            </div>

            <h4 id="navmark-demo2" class="detail-groupname">DEMO2 : 使用方法对树进行展开收缩</h4>
            <p class="desc">
            </p>
            <div class="detail-demoview">
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    JC.debug = 1;

    requirejs( [ 
        '{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/{{$OUTPUT}}' 
    ], function(){
         $(document).delegate('button.js_open_all', 'click', function( e ){
            var btn = $( e.target );

            btn.closest( '.detail-demoview' ).find( 'div.js_compAjaxTree' ).each( function( _k ){
                JC.BaseMVC.getInstance( this, JC.AjaxTree ) && JC.BaseMVC.getInstance(this, JC.AjaxTree ).open();
            });
        });

        $(document).delegate('button.js_close_all', 'click', function( e ){
            var btn = $( e.target );
            
            btn.closest( '.detail-demoview' ).find( 'div.js_compAjaxTree' ).each( function(){
                JC.BaseMVC.getInstance( this, JC.AjaxTree ) && JC.BaseMVC.getInstance(this, JC.AjaxTree ).close();
            });
        });

        $(document).delegate('button.js_open_for', 'click', function( e ){
        
            var _tgr = $(this).attr('data_target');
            if( !_tgr ) return;
            _tgr = $.trim( $( _tgr ).val() );

            var btn = $( e.target );
            
            btn.closest( '.detail-demoview' ).find( 'div.js_compAjaxTree' ).each( function(){
                JC.BaseMVC.getInstance( this, JC.AjaxTree ) && JC.BaseMVC.getInstance( this, JC.AjaxTree ).open( _tgr );
            });
        });

        $(document).delegate('button.js_close_for', 'click', function( e ){
        
            var _tgr = $(this).attr('data_target');
            if( !_tgr ) return;
            _tgr = $.trim( $( _tgr ).val() );

            var btn = $( e.target );
            
            btn.closest( '.detail-demoview' ).find( 'div.js_compAjaxTree' ).each( function(){
                JC.BaseMVC.getInstance( this, JC.AjaxTree ) && JC.BaseMVC.getInstance( this, JC.AjaxTree ).close( _tgr );
            });
        });
    });
</script>
{{/block}}

