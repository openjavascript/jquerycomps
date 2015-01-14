package org.xas.jchart.imageFrame.controller
{
	import flash.net.registerClassAlias;
	
	import org.puremvc.as3.multicore.interfaces.ICommand;
	import org.puremvc.as3.multicore.interfaces.INotification;
	import org.puremvc.as3.multicore.patterns.command.SimpleCommand;
	import org.xas.jchart.common.view.mediator.MainMediator;
	import org.xas.core.utils.Log;
	import org.xas.jchart.common.event.JChartEvent;
	
	public class DrawCmd extends SimpleCommand implements ICommand
	{
		public function DrawCmd()
		{
			super();
		}
		
		override public function execute( notification:INotification ):void{
			//Log.log( 'DRAW cmd' );
			sendNotification( JChartEvent.CLEAR );
			facade.registerMediator( new MainMediator() );
		}
	}
}