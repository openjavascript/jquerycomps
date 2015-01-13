package org.xas.jchart.imageFrame.data
{
	public class ImageFrameData
	{
		private var _data:Vector.<Object>;
		public function get data():Vector.<Object>{ return _data;}
		
		private static var _ins:ImageFrameData;
		
		public static function get instance():ImageFrameData {
			if( !_ins ){
				_ins = new ImageFrameData();		
			}
			return _ins;
		}
		
		public function ImageFrameData() {
			init();
		}
		
		private function init():void {
			_data = new Vector.<Object>();
			
			_data.push( {
				title: {
					text:'Image Frame'
				}
				, credits: {
					enabled: true
					, text: 'fchart.openjavascript.org'
					, href: 'http://fchart.openjavascript.org/'
				}
				, zoom: {
					enable: true,
					zoomRate: .5,
					zoomSpeed: .5
				}
				, series:[ {
					imgPath : 'D:/data/h2_600x415.jpg'
				} ]
				, toolbar:{
					enable: true
					, toolBtn: [
						{
							btnType: 'backOrigin'
							, text: '还原图片'
						}
						, {
							btnType: 'rotationLeft'
							, text: '顺时针旋转'
						}
						, {
							btnType: 'rotationRight'
							, text: '逆时针旋转'
						}
						, {
							btnType: 'rotationUpDown'
							, text: '上下旋转'
						}
						, {
							btnType: 'rotationLeRight'
							, text: '左右旋转'
						}
						, {
							btnType: 'save'
							, text: '保存图片'
						}
					]
				}
			} );
		}
	}
}
