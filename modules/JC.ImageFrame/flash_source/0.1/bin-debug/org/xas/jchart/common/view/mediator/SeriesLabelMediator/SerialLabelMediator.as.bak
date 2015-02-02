package org.xas.jchart.common.view.mediator.SeriesLabelMediator
{
	import org.puremvc.as3.multicore.interfaces.IMediator;
	import org.puremvc.as3.multicore.interfaces.INotification;
	import org.puremvc.as3.multicore.patterns.mediator.Mediator;
	import org.xas.core.utils.Log;
	import org.xas.jchart.common.BaseFacade;
	import org.xas.jchart.common.event.JChartEvent;
	import org.xas.jchart.common.view.components.SerialLabel.*;
	import org.xas.jchart.common.view.components.TitleView;
	import org.xas.jchart.common.view.mediator.MainMediator;
	
	public class SerialLabelMediator extends Mediator implements IMediator
	{
		public static const name:String = 'PDataLabelMediator';
		private var _view:BaseSerialLabelView;
		public function get view():BaseSerialLabelView{ return _view; }
		
		public function SerialLabelMediator( )
		{
			super( name );
			
		} 
		
		override public function onRegister():void{
			//Log.log( 'DataLabelMediator register' );				
			switch( (facade as BaseFacade).name ){
				case 'HistogramFacade':
				{
					mainMediator.view.index8.addChild( _view = new HistogramSerialLabelView() );
					break;
				}
				case 'VHistogramFacade':
				{
					mainMediator.view.index8.addChild( _view = new VHistogramSerialLabelView() );
					break;
				}
				case 'StackFacade':
				{
					mainMediator.view.index8.addChild( _view = new StackSerialLabelView() );
					break;
				}
				case 'ZHistogramFacade':
				{
					mainMediator.view.index8.addChild( _view = new ZHistogramSerialLabelView() );
					break;
				}
				case 'VZHistogramFacade':
				{
					mainMediator.view.index8.addChild( _view = new VZHistogramSerialLabelView() );
					break;
				}
				case 'CurveGramFacade':
				{
					mainMediator.view.index8.addChild( _view = new CurveGramSerialLabelView() );
					break;
				}
				case 'MixChartFacade':
				{
					mainMediator.view.index9.addChild( _view = new MixChartSerialLabelView() );
					break;
				}
				default:{
					mainMediator.view.index8.addChild( _view = new BaseSerialLabelView() );
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
			];
		}
		
		override public function handleNotification(notification:INotification):void{
			switch( notification.getName() ){
			case JChartEvent.SHOW_CHART:
				{
					_view.dispatchEvent( new JChartEvent( JChartEvent.SHOW_CHART ) );
					break;
				}
			
			}
		}
		
		public function get maxHeight():Number{
			var _r:Number = 0;
			_view && ( _r = _view.maxHeight );
			return _r;
		}
		
		public function get maxWidth():Number{
			var _r:Number = 0;
			_view && ( _r = _view.maxWidth );
			return _r;
		}
		
		
		private function get mainMediator():MainMediator{
			return facade.retrieveMediator( MainMediator.name ) as MainMediator;
		}
		
	}
}