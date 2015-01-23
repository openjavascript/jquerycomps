package org.xas.jchart.common.view.mediator.GroupMediator
{
	import org.puremvc.as3.multicore.interfaces.IMediator;
	import org.puremvc.as3.multicore.interfaces.INotification;
	import org.puremvc.as3.multicore.patterns.mediator.Mediator;
	import org.xas.core.utils.Log;
	import org.xas.jchart.common.BaseConfig;
	import org.xas.jchart.common.BaseFacade;
	import org.xas.jchart.common.event.JChartEvent;
	import org.xas.jchart.common.view.components.GroupView.*;
	import org.xas.jchart.common.view.components.TitleView;
	import org.xas.jchart.common.view.mediator.MainMediator;
	
	public class GroupMediator extends Mediator implements IMediator
	{
		public static const name:String = 'PGroupMediator';
		private var _view:BaseGroupView;
		public function get view():BaseGroupView{ return _view; }
		
		private var _startY:Number = 0;
		
		public function GroupMediator( _minY:Number )
		{		
			_startY = _minY;
			super( name );
		}
		
		override public function onRegister():void{
			//Log.log( 'DataLabelMediator register' );
						
			switch( (facade as BaseFacade).name ){

				case 'CurveGramFacade':
				{
					mainMediator.view.index2.addChild( _view = new CurveGramGroupView( _startY ) );
					break;
				}
				default:{
					mainMediator.view.index2.addChild( _view = new BaseGroupView( _startY ) );
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
		
		
		private function get mainMediator():MainMediator{
			return facade.retrieveMediator( MainMediator.name ) as MainMediator;
		}
		
	}
}