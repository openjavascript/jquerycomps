package org.xas.jchart.imageFrame.view.mediator
{
	import org.puremvc.as3.multicore.interfaces.IMediator;
	import org.puremvc.as3.multicore.interfaces.INotification;
	import org.puremvc.as3.multicore.patterns.mediator.Mediator;
	import org.xas.core.utils.Log;
	import org.xas.jchart.common.event.JChartEvent;
	import org.xas.jchart.common.view.mediator.MainMediator;
	import org.xas.jchart.imageFrame.event.ImageFrameEvent;
	import org.xas.jchart.imageFrame.view.components.toolbar.ToolbarView;

	public class ToolbarMediator extends Mediator implements IMediator {
		
		public static const name:String = 'PToolbarMediator';
		
		private var _view:ToolbarView;
		public function get view():ToolbarView{ return _view; }
		
		public function ToolbarMediator() {
			super( name );
		}
		
		override public function onRegister():void{
			mainMediator.view.index6.addChild( _view = new ToolbarView() );
			
			_view.addEventListener( ImageFrameEvent.ROTATION_LEFT, function( _evt:ImageFrameEvent ):void{
				sendNotification( ImageFrameEvent.ROTATION_LEFT, _evt.data );
			});
		}
		
		override public function onRemove():void{
			_view.parent.removeChild( _view );
		}
		
		override public function listNotificationInterests():Array{
			return [
				JChartEvent.SHOW_CHART
				, ImageFrameEvent.SHOW_TOOLBAR
			];
		}
		
		override public function handleNotification(notification:INotification):void{
			switch( notification.getName() ){
				case JChartEvent.SHOW_CHART:
				{					
					_view.dispatchEvent( new JChartEvent( JChartEvent.UPDATE, notification.getBody() ) );
					break;
				}
				case ImageFrameEvent.SHOW_TOOLBAR:
				{
					break;
				}
			}
		}
		
		private function get mainMediator():MainMediator{
			return facade.retrieveMediator( MainMediator.name ) as MainMediator;
		}
	}
}