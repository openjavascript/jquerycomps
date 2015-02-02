package org.xas.jchart.common.view.mediator.ToggleBgMediator
{
	import org.puremvc.as3.multicore.interfaces.IMediator;
	import org.puremvc.as3.multicore.interfaces.INotification;
	import org.puremvc.as3.multicore.patterns.mediator.Mediator;
	import org.xas.core.utils.Log;
	import org.xas.jchart.common.BaseFacade;
	import org.xas.jchart.common.event.JChartEvent;
	import org.xas.jchart.common.view.components.ToggleBgView.*;
	import org.xas.jchart.common.view.mediator.MainMediator;
	
	public class ToggleBgMediator extends Mediator implements IMediator
	{
		public static const name:String = 'PToggleBgMediator';
		private var _view:BaseToggleBgView;
		public function get view():BaseToggleBgView{ return _view; }
		
		public function ToggleBgMediator()
		{
			super( name );
		}
		
		override public function onRegister():void{
			
			switch( (facade as BaseFacade).name ){
				case 'CurveGramFacade':{
					mainMediator.view.index4.addChild( _view = new CurveGramToggleBgView() );
					break;
				}
				default:{
					mainMediator.view.index4.addChild( _view = new BaseToggleBgView() );
					break;
				}
			}	
		}
		
		override public function onRemove():void{
			_view.parent.removeChild( _view );
		}
		
		override public function listNotificationInterests():Array{
			return [
				JChartEvent.SHOW_CHART
				, JChartEvent.UPDATE_TIPS
				, JChartEvent.SHOW_TIPS
				, JChartEvent.HIDE_TIPS
			];
		}
		
		override public function handleNotification(notification:INotification):void{
			switch( notification.getName() ){
				case JChartEvent.SHOW_CHART:
				{					
					_view.dispatchEvent( new JChartEvent( JChartEvent.UPDATE, notification.getBody() ) );
					break;
				}			
				case JChartEvent.UPDATE_TIPS:
				{
					_view.dispatchEvent( new JChartEvent( JChartEvent.UPDATE_TIPS, notification.getBody() ) );
					break;
				}	
				case JChartEvent.SHOW_TIPS:
				{
					_view.dispatchEvent( new JChartEvent( JChartEvent.SHOW_TIPS, notification.getBody() ) );
					break;
				}	
				case JChartEvent.HIDE_TIPS:
				{
					_view.dispatchEvent( new JChartEvent( JChartEvent.HIDE_TIPS, notification.getBody() ) );
					break;
				}	
			}
		}
		
		
		private function get mainMediator():MainMediator{
			return facade.retrieveMediator( MainMediator.name ) as MainMediator;
		}
		
	}
}