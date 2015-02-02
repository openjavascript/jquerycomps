package
{
	import flash.display.LoaderInfo;
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.events.TimerEvent;
	import flash.external.ExternalInterface;
	import flash.system.Security;
	import flash.utils.Timer;
	import flash.utils.setInterval;
	import flash.utils.setTimeout;
	
	import org.puremvc.as3.multicore.patterns.facade.*;
	import org.xas.core.events.*;
	import org.xas.core.ui.error.BaseError;
	import org.xas.core.utils.Log;
	import org.xas.jchart.common.BaseConfig;
	import org.xas.jchart.common.event.JChartEvent;
	import org.xas.jchart.imageFrame.MainFacade;
	import org.xas.jchart.imageFrame.data.ImageFrameData;
	   
	//[SWF(frameRate="30", width="790", height="230")] 
	//[SWF(frameRate="30", width="385", height="225")] 
	//[SWF(frameRate="30", width="600", height="425")]
	//[SWF(frameRate="30", width="590", height="360")] 
	//[SWF(frameRate="30", width="1400", height="460")]   
	[SWF(frameRate="30", width="800", height="600")] 
	public class ImageFrame extends Sprite { 
		private var _inited: Boolean = false;
		private var _timer:Timer;
		private var _data:Object; 
		private var _facade:Facade;
		private var _resizeTimer:Timer;  
		private var _ins:ImageFrame;
		private var _loaderInfo:Object;
		
		public function ImageFrame(){
			flash.system.Security.allowDomain("*");
			flash.system.Security.allowInsecureDomain( "*" );
			_ins = this;
			
			this.root.stage.scaleMode = StageScaleMode.NO_SCALE;
			this.root.stage.align = StageAlign.TOP_LEFT;
			
			BaseConfig.setIns( new Config() );
			  
			addEventListener( JChartEvent.PROCESS, process );
			addEventListener( Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener( Event.REMOVED_FROM_STAGE, onRemovedFromStage );	
			
		}
		
		private function onEnterFrame( $evt:Event ):void{
			if( root.stage.stageWidth > 0 && root.stage.stageHeight > 0 ) {
				removeEventListener( Event.ENTER_FRAME, onEnterFrame );
				init();
			} 
		}
		
		private function init():void{
			_inited = true;
			
			BaseConfig.ins.setDebug( true );
			runData();
			
			if( ExternalInterface.available ) {
				try{
				ExternalInterface.addCallback( 'update', extenalUpdate );
				
				ExternalInterface.addCallback( 'updateMouseWheel', updateMouseWheel );
				
				ExternalInterface.addCallback( 'legendUpdate', legendUpdate );
				}catch( ex:Error ){}
			}
		}	
		
		private function updateMouseWheel( _delta:int ):void{
			_delta = _delta > 0 ? 3 : -3;
			
			if( ExternalInterface.available ){
				//ExternalInterface.call( 'console.log', 'flash delta:', _delta );
				_facade && _facade.sendNotification( JChartEvent.UPDATE_MOUSEWHEEL, { delta: _delta } );
			}
		}
		
		private function extenalUpdate( _data:Object ):void{
			BaseConfig.ins.clearData();
			BaseConfig.ins.updateDisplaySeries( null, _data );
			BaseConfig.ins.setChartData( _data );
			_facade.sendNotification( JChartEvent.DRAW );		
		}
		
		private function legendUpdate( _data:Object ):void{
			_facade.sendNotification( JChartEvent.FILTER_DATA, _data );
		}
		
		public function update( _data:Object, _x:int = 0, _y:int = 0 ):void{
			if( !_inited ){
				_ins._data = _data;
				_timer = new Timer( 50 );
				_timer.addEventListener( TimerEvent.TIMER, timerHandler );
				_timer.start();
				return;
			}
			_timer && _timer.stop();
			
			BaseConfig.ins.updateDisplaySeries( {}, _data );
			dispatchEvent( new JChartEvent( JChartEvent.PROCESS, _data ) );
		}
		
		private function process( _evt:JChartEvent ):void{
			var _data:Object = _evt.data as Object;
			BaseConfig.ins.setRoot( _ins.root );
			if( _data ){
				BaseConfig.ins.setChartData( _data );
			}
			!_facade && ( _facade = MainFacade.getInstance() );			
			_facade.sendNotification( JChartEvent.DRAW );
		}
		
		private function timerHandler( _evt:TimerEvent ):void{
			if( _inited ){
				_timer && _timer.stop();
				update( _ins._data );
			}
		}
		
		private function onAddedToStage($evt:Event):void{
			removeEventListener( Event.ADDED_TO_STAGE, onAddedToStage);		
			addEventListener( Event.ENTER_FRAME, onEnterFrame );
			
			this.root.stage.addEventListener( Event.RESIZE, resize );
		}
		
		private function resize( _evt:Event ):void{
			if( !BaseConfig.ins.chartData ) return;
			
			if( _resizeTimer ){
				_resizeTimer.stop();
				_resizeTimer.start();
			}else{
				_resizeTimer = new Timer( 200, 1 );
				_resizeTimer.addEventListener( TimerEvent.TIMER_COMPLETE, onResize );
				_resizeTimer.start();
			}
		}
		
		private function onResize( _evt:TimerEvent ):void{
			
			if( !BaseConfig.ins.chartData ) return;
			dispatchEvent( new JChartEvent( JChartEvent.PROCESS, BaseConfig.ins.chartData ) );
		}
		
		private function onRemovedFromStage( _evt:Event ):void{
			removeEventListener( JChartEvent.PROCESS, process );
			removeEventListener( Event.ADDED_TO_STAGE, onAddedToStage);
			removeEventListener( Event.REMOVED_FROM_STAGE, onRemovedFromStage );
			removeEventListener( Event.ENTER_FRAME, onEnterFrame );
			_timer &&_timer.stop();
		}		
		
		private function runData():void{
			
			var _data:Object = {};
			
			if( !ExternalInterface.available ){		
				_data = ImageFrameData.instance.data[ 0 ];
			}else{
				_loaderInfo = LoaderInfo(this.root.stage.loaderInfo).parameters||{};
				
				if( _loaderInfo.chart ){
					_data = JSON.parse( _loaderInfo.chart );
				}
				_data = _data || {};
				
				BaseConfig.ins.setParams( _data );
			}
			
			update( _data );
		}
		
		public static var author:String = 'suches@btbtd.org';
		public static var version:String = '0.1, 2014-07-30';
	}
}