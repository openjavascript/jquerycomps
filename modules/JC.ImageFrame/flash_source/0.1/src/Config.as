package 
{
	import org.xas.core.utils.Log;
	import org.xas.jchart.common.BaseConfig;
	import org.xas.jchart.common.Common;
	
	public class Config extends BaseConfig
	{
		
		public function Config()
		{
			super();
		}
		
		public function getImgPathByIdx( _idx:uint ):String {
			var _series:Array = this.series;
			var _imgPath:String = '';
			
			_series 
				&& _series[ _idx ]
				&& _series[ _idx ].imgPath
				&& ( _imgPath = _series[ _idx ].imgPath );
				
			return _imgPath;
		}
		
		public function get toolbarEnable():Boolean {
			var _toolbar:Boolean = true;
			
			this.cd 
				&& this.cd.toolbar
				&& this.cd.toolbar.enable
				&& ( _toolbar = this.cd.toolbar.enable );
			
			return _toolbar;
		}
		
		public function get toolBtn():Array{
			var _toolBtns:Array = new Array();
			
			toolbarEnable
				&& this.cd.toolbar.toolBtn
				&& ( _toolBtns = this.cd.toolbar.toolBtn );
			
			return _toolBtns;
		}
		
	}
}