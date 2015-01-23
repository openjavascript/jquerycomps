package org.xas.jchart.common.view.mediator.HLabelMediator
{
	import flash.text.TextField;
	
	import org.puremvc.as3.multicore.interfaces.IMediator;
	import org.puremvc.as3.multicore.interfaces.INotification;
	import org.puremvc.as3.multicore.patterns.mediator.Mediator;
	import org.xas.core.utils.Log;
	import org.xas.jchart.common.BaseFacade;
	import org.xas.jchart.common.event.JChartEvent;
	import org.xas.jchart.common.view.components.HLabelView.BaseHLabelView;
	import org.xas.jchart.common.view.components.HLabelView.CurveGramHLabelView;
	import org.xas.jchart.common.view.components.HLabelView.HistogramHLabelView;
	import org.xas.jchart.common.view.components.HLabelView.MixChartHLabelView;
	import org.xas.jchart.common.view.components.HLabelView.TrendHLabelView;
	import org.xas.jchart.common.view.components.HLabelView.VHistogramHLabelView;
	import org.xas.jchart.common.view.components.HLabelView.VZHistogramHLabelView;
	import org.xas.jchart.common.view.components.HLabelView.ZHistogramHLabelView;
	import org.xas.jchart.common.view.mediator.MainMediator;
	
	public class HLabelMediator extends Mediator implements IMediator
	{
		public static const name:String = 'PHLabelMediator';
		private var _view:BaseHLabelView;
		public function get view():BaseHLabelView{ return _view; }
		
		public function HLabelMediator(  )
		{
			super( name );
		}
		
		override public function onRegister():void{
			
			switch( (facade as BaseFacade).name ){
				case 'CurveGramFacade':
				{
					mainMediator.view.index5.addChild( _view = new CurveGramHLabelView() );
					break;
				}
				case 'ZHistogramFacade':
				{
					mainMediator.view.index5.addChild( _view = new ZHistogramHLabelView() );
					break;
				}
				case 'StackFacade':
				case 'HistogramFacade':
				{
					mainMediator.view.index5.addChild( _view = new HistogramHLabelView() );
					break;
				}
				case 'VHistogramFacade':
				{
					mainMediator.view.index5.addChild( _view = new VHistogramHLabelView() );
					break;
				}
				case 'VZHistogramFacade':
				{
					mainMediator.view.index5.addChild( _view = new VZHistogramHLabelView() );
					break;
				}
				case 'TrendFacade':
				{
					mainMediator.view.index5.addChild( _view = new TrendHLabelView() );
					break;
				} 
				case 'MixChartFacade':
				{
					mainMediator.view.index5.addChild( _view = new MixChartHLabelView() );
					break;
				}
				default:{
					mainMediator.view.index5.addChild( _view = new BaseHLabelView() ); 
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
				, JChartEvent.RESET_HLABELS
			];
		}
		
		override public function handleNotification(notification:INotification):void{
			switch( notification.getName() ){
				case JChartEvent.SHOW_CHART:
					{
						_view.dispatchEvent( new JChartEvent( JChartEvent.UPDATE ) );
						break;
					}		
				case JChartEvent.RESET_HLABELS:
				{
					_view.dispatchEvent( new JChartEvent( JChartEvent.RESET_HLABELS ) );
					break;
				}	
			}
		}
		
		public function get maxHeight():Number{
			return _view.maxHeight;
		}		
		
		public function get maxWidth():Number{
			return _view.maxWidth;
		}
		
		public function set maxHeight( _setter:Number ):void{
			_view.maxHeight = _setter;
		}		
		
		public function set maxWidth( _setter:Number ):void{
			_view.maxWidth = _setter;
		}	
				
		protected function get mainMediator():MainMediator{
			return facade.retrieveMediator( MainMediator.name ) as MainMediator;
		}
		
		public function get labels():Vector.<TextField>{
			return _view.labels;
		}
		
	}
}