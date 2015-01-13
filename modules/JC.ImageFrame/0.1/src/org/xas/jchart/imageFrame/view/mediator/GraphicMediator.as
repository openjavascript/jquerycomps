package org.xas.jchart.imageFrame.view.mediator
{
	import org.puremvc.as3.multicore.interfaces.IMediator;
	import org.puremvc.as3.multicore.interfaces.INotification;
	import org.puremvc.as3.multicore.patterns.mediator.Mediator;
	import org.xas.core.utils.Log;
	import org.xas.jchart.common.event.JChartEvent;
	import org.xas.jchart.common.view.mediator.MainMediator;
	import org.xas.jchart.imageFrame.event.ImageFrameEvent;
	import org.xas.jchart.imageFrame.view.components.*;
	
	public class GraphicMediator extends Mediator implements IMediator
	{
		public static const name:String = 'PChartMediator';
		private var _view:GraphicView;
		public function get view():GraphicView{ return _view; }
		
		public function GraphicMediator()
		{
			super( name );
		}
		
		override public function onRegister():void{
			mainMediator.view.index4.addChild( _view = new GraphicView() );
			
			_view.addEventListener( JChartEvent.UPDATE_TIPS, function( _evt:JChartEvent ):void{
				sendNotification( JChartEvent.UPDATE_TIPS, _evt.data );
			});
			
			_view.addEventListener( JChartEvent.SHOW_TIPS, function( _evt:JChartEvent ):void{
				sendNotification( JChartEvent.SHOW_TIPS, _evt.data );
			});
			
			_view.addEventListener( JChartEvent.HIDE_TIPS, function( _evt:JChartEvent ):void{
				sendNotification( JChartEvent.HIDE_TIPS, _evt.data );
			});
			
			_view.addEventListener( JChartEvent.SHOW_LEGEND_ARROW, function( _evt:JChartEvent ):void{
				sendNotification( JChartEvent.SHOW_LEGEND_ARROW, _evt.data );
			});
			
			_view.addEventListener( JChartEvent.HIDE_LEGEND_ARROW, function( _evt:JChartEvent ):void{
				sendNotification( JChartEvent.HIDE_LEGEND_ARROW, _evt.data );
			});
			
			_view.addEventListener( JChartEvent.ITEM_CLICK, function( _evt:JChartEvent ):void{
				sendNotification( JChartEvent.ITEM_CLICK, _evt.data );
			} );
			
			_view.addEventListener( JChartEvent.ITEM_HOVER, function( _evt:JChartEvent ):void{
				sendNotification( JChartEvent.ITEM_HOVER, _evt.data );
			}  );
			
			_view.addEventListener( JChartEvent.INITED, function( _evt:JChartEvent ):void{
				sendNotification( JChartEvent.INITED, _evt.data );
			}  );
		}
		
		override public function onRemove():void{
			_view.parent.removeChild( _view );
		}
		
		override public function listNotificationInterests():Array {
			return [
				JChartEvent.SHOW_CHART
				, JChartEvent.UPDATE_MOUSEWHEEL
				, ImageFrameEvent.ROTATION_LEFT
				, ImageFrameEvent.ROTATION_RIGHT
				, ImageFrameEvent.ROTATION_LE_RIGHT
				, ImageFrameEvent.ROTATION_UP_DOWN
				, ImageFrameEvent.BACK_ORIGIN
				, ImageFrameEvent.SAVE
			];
		}
		
		override public function handleNotification( notification:INotification ):void {
			switch( notification.getName() ) {
				case JChartEvent.SHOW_CHART:
				{
					_view.dispatchEvent( new JChartEvent( JChartEvent.UPDATE ) );
					break;
				}
				case JChartEvent.UPDATE_MOUSEWHEEL:
				{		
					_view.dispatchEvent( new JChartEvent( JChartEvent.UPDATE_MOUSEWHEEL, notification.getBody() ) );
					break;
				}
				case ImageFrameEvent.ROTATION_LEFT:
				{
					_view.dispatchEvent( new ImageFrameEvent( ImageFrameEvent.ROTATION_LEFT, notification.getBody() ) );
					break;
				}
				case ImageFrameEvent.ROTATION_RIGHT:
				{
					_view.dispatchEvent( new ImageFrameEvent( ImageFrameEvent.ROTATION_RIGHT, notification.getBody() ) );
					break;
				}
				case ImageFrameEvent.ROTATION_LE_RIGHT:
				{
					_view.dispatchEvent( new ImageFrameEvent( ImageFrameEvent.ROTATION_LE_RIGHT, notification.getBody() ) );
					break;
				}
				case ImageFrameEvent.ROTATION_UP_DOWN:
				{
					_view.dispatchEvent( new ImageFrameEvent( ImageFrameEvent.ROTATION_UP_DOWN, notification.getBody() ) );
					break;
				}
				case ImageFrameEvent.BACK_ORIGIN:
				{
					_view.dispatchEvent( new ImageFrameEvent( ImageFrameEvent.BACK_ORIGIN, notification.getBody() ) );
					break;
				}
				case ImageFrameEvent.SAVE:
				{
					_view.dispatchEvent( new ImageFrameEvent( ImageFrameEvent.SAVE, notification.getBody() ) );
					break;
				}
			}
		}
		
		
		private function get mainMediator():MainMediator{
			return facade.retrieveMediator( MainMediator.name ) as MainMediator;
		}
		
	}
}