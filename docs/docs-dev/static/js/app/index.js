;requirejs( [ 
    , 'common'
	, 'data'
    , 'iscroll'
    , 'velocity'
    , 'JC.FrameUtil'
    , 'jquery.cookie'
], function( dataTool, iScroll, velocity ){


    simpleDemoHandler();

	function simpleDemoHandler(){

		$( '.body-sdemobtn' ).on( 'click', function( e ){
			e.preventDefault();

			var _sdemoBtn = $( e.target );
			var _parent = _sdemoBtn.closest( '.body-comp' );
			var _sdemoView = _parent.find( '.body-compdemo' );

			if( _sdemoView.css( 'display' ) == 'block' ){
				_sdemoView.find( '.body-compclose' ).click();
				return;
			}

            JC.log( 'test', JC.f.gid() );

			_sdemoView.find( 'iframe' )
				.attr( 'src', JC.f.addUrlParams( _sdemoBtn.attr( 'data-url' ), { rnd: JC.f.ts() } ) ).load( function(){
					_sdemoView.velocity( { opacity: '0' }, 0 ).show();
					$( 'html,body' ).stop().animate({
						scrollTop: _sdemoView.offset().top - $( '#mainHeader' ).height()
					}, function(){
						_sdemoView.velocity( { opacity: '1' } );
					});
					
				});
		});

		$( '.body-compclose' ).on( 'click', function( e ){
			e.preventDefault();

			var closeBtn = $( e.target );
			var _parent = closeBtn.closest( '.body-comp' );
			var _sdemoView = _parent.find( '.body-compdemo' );

			_sdemoView.velocity( { opacity: '0' }, function(){
				_sdemoView.hide();
			});
			$( 'html,body' ).stop().animate({
				scrollTop: _parent.offset().top - $( '#mainHeader' ).height()
			});
		});
	}

});
