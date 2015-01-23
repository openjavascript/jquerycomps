package org.xas.jchart.common.view.mediator.HoverBgMediator
{
	import org.puremvc.as3.multicore.interfaces.IMediator;
	import org.puremvc.as3.multicore.interfaces.INotification;
	import org.puremvc.as3.multicore.patterns.mediator.Mediator;
	import org.xas.core.utils.Log;
	import org.xas.jchart.common.BaseFacade;
	import org.xas.jchart.common.event.JChartEvent;
	import org.xas.jchart.common.view.components.HoverBgView.*;
	import org.xas.jchart.common.view.components.TitleView;
	import org.xas.jchart.common.view.mediator.MainMediator;
	
	public class HoverBgMediator extends Mediator implements IMediator
	{
		public static const name:String = 'PHoverBgMediator';
		private var _view:BaseHoverBgView;
		public function get view():BaseHoverBgView{ return _view; }
		
		public function HoverBgMediator( )
		{
			super( name );
			
		}
		
		override public function onRegister():void{
			//Log.log( 'HoverBgMediator register' );				
			switch( (facade as BaseFacade).name ){
				case 'HistogramFacade':
				{
					mainMediator.view.index6.addChild( _view = new HistogramHoverBgView() );
					break;
				} 
				case 'StackFacade':
				{
					mainMediator.view.index6.addChild( _view = new StackHoverBgView() );
					break;
				}
				case 'ZHistogramFacade':
				{
					mainMediator.view.index6.addChild( _view = new ZHistogramHoverBgView() );
					break;
				}
				case 'VHistogramFacade':
				case 'VZHistogramFacade':
				{
					mainMediator.view.index6.addChild( _view = new VHistogramHoverBgView() );
					break;
				}
				default:{
					mainMediator.view.index6.addChild( _view = new BaseHoverBgView() );
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
					_view.dispatchEvent( new JChartEvent( JChartEvent.UPDATE ) );
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