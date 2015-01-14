package org.xas.jchart.imageFrame
{
	import flash.net.registerClassAlias;
	
	import org.puremvc.as3.multicore.interfaces.*;
	import org.puremvc.as3.multicore.patterns.facade.*;
	import org.xas.jchart.common.BaseFacade;
	import org.xas.jchart.common.controller.InitedCmd;
	import org.xas.jchart.common.controller.ItemClickCmd;
	import org.xas.jchart.common.controller.ItemHoverCmd;
	import org.xas.jchart.common.event.JChartEvent;
	import org.xas.jchart.imageFrame.controller.CalcCoordinateCmd;
	import org.xas.jchart.imageFrame.controller.ClearCmd;
	import org.xas.jchart.imageFrame.controller.DrawCmd;
	import org.xas.jchart.imageFrame.controller.FilterDataCmd;
	
	public class MainFacade extends BaseFacade implements ICommand
	{
		public static const name:String = 'MapFacade';
		
		public function MainFacade( _name:String ) {
			super( _name );
		}
		
		public function execute( notification:INotification ):void {
		}
		
		public static function getInstance():Facade {
			if ( instanceMap[ name ] == null ) instanceMap[ name ]  = new MainFacade( name );
			return instanceMap[ name ] as MainFacade;
		}
		
		override protected function initializeController():void {
			super.initializeController();
			registerCommand( JChartEvent.CALC_COORDINATE, CalcCoordinateCmd );
			registerCommand( JChartEvent.CLEAR, ClearCmd );
			registerCommand( JChartEvent.DRAW, DrawCmd );
			registerCommand( JChartEvent.FILTER_DATA, FilterDataCmd );
			
			registerCommand( JChartEvent.ITEM_HOVER, ItemHoverCmd );
			registerCommand( JChartEvent.ITEM_CLICK, ItemClickCmd );
			registerCommand( JChartEvent.INITED, InitedCmd );
		}
	}
}