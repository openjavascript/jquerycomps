package org.xas.jchart.imageFrame.controller
{
	import flash.external.ExternalInterface;
	import flash.geom.Point;
	
	import org.puremvc.as3.multicore.interfaces.ICommand;
	import org.puremvc.as3.multicore.interfaces.INotification;
	import org.puremvc.as3.multicore.patterns.command.SimpleCommand;
	import org.xas.core.utils.Log;
	import org.xas.jchart.common.BaseConfig;
	import org.xas.jchart.common.Common;
	import org.xas.jchart.common.data.Coordinate;
	import org.xas.jchart.common.data.test.MapData;
	import org.xas.jchart.common.event.JChartEvent;
	import org.xas.jchart.common.view.mediator.*;
	import org.xas.jchart.common.view.mediator.BgMediator.BaseBgMediator;
	import org.xas.jchart.common.view.mediator.CreditMediator.BaseCreditMediator;
	import org.xas.jchart.common.view.mediator.GraphicBgMediator.BaseGraphicBgMediator;
	import org.xas.jchart.common.view.mediator.SubtitleMediator.BaseSubtitleMediator;
	import org.xas.jchart.common.view.mediator.TitleMediator.BaseTitleMediator;
	import org.xas.jchart.imageFrame.view.mediator.GraphicMediator;
	import org.xas.jchart.imageFrame.view.mediator.ToolbarMediator;
	
	
	public class CalcCoordinateCmd extends SimpleCommand implements ICommand
	{
		private var _c:Coordinate;
		private var _config:Config;
		
		public function CalcCoordinateCmd(){
			super();
			_config = BaseConfig.ins as Config;
		}
		
		override public function execute(notification:INotification):void{
			
			_c = _config.setCoordinate( new Coordinate() );
			
			_c.corner = corner();
			
			_c.minX = _c.x + _config.vlabelSpace + 2;
			_c.minY = _c.y + 5;
			_c.maxX = _c.x + _config.stageWidth - 5;
			_c.maxY = _c.y + _config.stageHeight - 5;
			
			facade.registerMediator( new BaseBgMediator( ) );
			var _yPad:Number = _c.minY;
			
			if( _config.cd ){
				
				//标题
				if( _config.cd.title && _config.cd.title.text ){
					facade.registerMediator( new BaseTitleMediator( _config.cd.title.text ) )
					_config.c.title = { x: _config.stageWidth / 2, y: _c.minY, item: pTitleMediator };
					_config.c.minY += pTitleMediator.view.height;
				}
				
				//副标题
				if( _config.cd.subtitle && _config.cd.subtitle.text ){
					facade.registerMediator( new BaseSubtitleMediator( _config.cd.subtitle.text ) );
					_config.c.subtitle = { x: _config.stageWidth / 2, y: _c.minY, item: pSubtitleMediator };
					_config.c.minY += pSubtitleMediator.view.height + 5;
				}
				
				if( _config.cd.credits && _config.cd.credits.enabled && ( _config.cd.credits.text || _config.cd.credits.href ) ){
					facade.registerMediator( new BaseCreditMediator( _config.cd.credits.text, _config.cd.credits.href ) );
					_config.c.credits = { x: _config.c.maxX, y: _config.c.maxY, item: pCreditMediator };
					_config.c.maxY -= pCreditMediator.view.height;
				}
				
				_config.c.imageFrameWidth = _config.c.maxX - _config.c.minX;
				_config.c.imageFrameHeight = _config.c.maxY - _config.c.minY;
				
				// 显示toolbar
				if( _config.toolbarEnable ) {
					_config.c.tbHeight = 80;
					_config.c.tbWidth = _config.c.imageFrameWidth;
					
					facade.registerMediator( new ToolbarMediator() );
				}
				
				//设置显示图片
				if( _config.cd.series && _config.cd.series.length ){
					facade.registerMediator( new GraphicMediator() );
				}
				
			}
			sendNotification( JChartEvent.SHOW_CHART );
		}
		
		private function calcChartPoint():void{
			
		}
		
		private function get pSubtitleMediator():BaseSubtitleMediator{
			return facade.retrieveMediator( BaseSubtitleMediator.name ) as BaseSubtitleMediator;
		}
		
		private function get pTitleMediator():BaseTitleMediator{
			return facade.retrieveMediator( BaseTitleMediator.name ) as BaseTitleMediator;
		}
		
		private function get pCreditMediator():BaseCreditMediator{
			return facade.retrieveMediator( BaseCreditMediator.name ) as BaseCreditMediator;
		}
		
		private function get pGraphicBgMediator():BaseGraphicBgMediator{
			return facade.retrieveMediator( BaseGraphicBgMediator.name ) as BaseGraphicBgMediator;
		}
		
		private function get mainMediator():MainMediator{
			return facade.retrieveMediator( MainMediator.name ) as MainMediator;
		}
		
		private function corner():uint{
			return 20;
		}
	}
}
