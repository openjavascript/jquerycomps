package org.xas.jchart.imageFrame.event
{
	import org.xas.jchart.common.event.JChartEvent;

	public class ImageFrameEvent extends JChartEvent {
		
		public static const SHOW_TOOLBAR:String = 'show_toolbar';
		
		public static const ROTATION_LEFT:String = 'rotation_left';
		public static const ROTATION_RIGHT:String = 'rotation_right';
		public static const ROTATION_UP_DOWN:String = 'rotation_up_down';
		public static const ROTATION_LE_RIGHT:String = 'rotation_le_right';
		public static const BACK_ORIGIN:String = 'back_origin';
		public static const SAVE:String = 'save';
		
		public function ImageFrameEvent($type:String, $data:Object=null) {
			super($type, $data);
		}
	}
}