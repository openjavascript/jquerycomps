package org.xas.jchart.imageFrame.view.components
{
	import com.adobe.images.JPGEncoder;
	import com.greensock.*;
	import com.greensock.plugins.*;
	
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.DisplayObject;
	import flash.display.GradientType;
	import flash.display.Graphics;
	import flash.display.Loader;
	import flash.display.SpreadMethod;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.external.ExternalInterface;
	import flash.geom.ColorTransform;
	import flash.geom.Matrix;
	import flash.geom.Point;
	import flash.net.URLRequest;
	import flash.ui.Mouse;
	import flash.ui.MouseCursor;
	import flash.utils.Timer;
	
	import org.xas.core.utils.DigitalUtils;
	import org.xas.core.utils.GeoUtils;
	import org.xas.core.utils.ImageUtils;
	import org.xas.core.utils.Log;
	import org.xas.jchart.common.BaseConfig;
	import org.xas.jchart.common.Common;
	import org.xas.jchart.common.event.JChartEvent;
	import org.xas.jchart.common.ui.widget.JSprite;
	import org.xas.jchart.imageFrame.event.ImageFrameEvent;
	
	public class GraphicView extends Sprite
	{	
		private var _config:Config;
		private var _imageView:JSprite;
		private var _req:URLRequest = new URLRequest();
		private var _load:Loader = new Loader();
		private var _imageBitMap:Bitmap;
		private var _rotationPoint:Point;
		private var _sp:Sprite;
		private var _matrix:Matrix;
		private var _nowRotateRangle:Number;
		
		public function GraphicView()
		{
			super(); 
			_config = BaseConfig.ins as Config;
			
			addEventListener( Event.ADDED_TO_STAGE, addToStage );
			addEventListener( JChartEvent.UPDATE, update );
			addEventListener( JChartEvent.UPDATE_MOUSEWHEEL, onUpdateMouseWheel );
			addEventListener( ImageFrameEvent.ROTATION_LEFT, rotationLeft );
			addEventListener( ImageFrameEvent.ROTATION_RIGHT, rotationRight );
			addEventListener( ImageFrameEvent.ROTATION_UP_DOWN, rotationUpDown );
			addEventListener( ImageFrameEvent.ROTATION_LE_RIGHT, rotationLeRight );
			addEventListener( ImageFrameEvent.BACK_ORIGIN, backOrigin );
			addEventListener( ImageFrameEvent.SAVE, save );
		}
		
		private function addToStage( _evt:Event ):void{
			
		}

		private function update( _evt:JChartEvent ):void{
			graphics.clear();
			
			_imageView = new JSprite();
			
			_load.contentLoaderInfo.addEventListener( Event.COMPLETE, function( e:Event ):void {
				_imageBitMap = e.target.content as Bitmap;
				
				//图片居中
				_imageBitMap.x = ( stage.stageWidth - _imageBitMap.width ) / 2;
				_imageBitMap.y = ( stage.stageHeight - _imageBitMap.height ) / 2;
				
				_sp = new Sprite();
				
				_sp.addChild( _imageBitMap );
				_imageView.addChild( _sp );
				
				_rotationPoint = new Point( stage.stageWidth / 2, stage.stageHeight / 2 );
				_nowRotateRangle = 0;
				
			} );
			
			_req.url = _config.getImgPathByIdx( 0 );
			
			_load.load( _req );
			
			_imageView.x = _config.c.minX;
			_imageView.y = _config.c.minY;
			
			addChild( _imageView );

			dispatchEvent( new JChartEvent( JChartEvent.INITED, {} ) );
		}
		
		protected function onMouseOver( _evt:MouseEvent ):void{

		}
		
		protected function onMouseMove( _evt:MouseEvent ):void{

		}
		
		protected function onMouseOut( _evt:MouseEvent ):void{

		}
		
		protected function onMouseClick( _evt:MouseEvent ):void{

		}
		
		protected function onUpdateMouseWheel( _evt:JChartEvent ):void{

		}
		
		protected function onMouseWheel( _evt:MouseEvent ):void{

		}
		
		protected function updateMouseWheel( _data:Object ):void{

		}
		
		protected function onMouseDown( _evt:MouseEvent ):void{

		}
		
		protected function onMouseUp( _evt:MouseEvent ):void{

		}
		
		private function onMouseDrag( _evt:MouseEvent ):void {

		}
		
		private function rotate( _dis:DisplayObject, _rotationPoint:Point, _angle:Number, _srcMatrix:Matrix ):void {  
			var _m:Matrix = _srcMatrix.clone();
			
			_m.translate( -_rotationPoint.x, -_rotationPoint.y );
			_m.rotate( GeoUtils.radians( _angle ) );
			_m.translate( _rotationPoint.x, _rotationPoint.y );
			_dis.transform.matrix = _m;
			_nowRotateRangle += _angle;
			_nowRotateRangle = _nowRotateRangle % 360;
		} 
		
		private function rotationLeft( _evt:ImageFrameEvent ):void {
			rotate( _imageBitMap, _rotationPoint, 90, _imageBitMap.transform.matrix );
		}
		
		private function rotationRight( _evt:ImageFrameEvent ):void {
			rotate( _imageBitMap, _rotationPoint, -90, _imageBitMap.transform.matrix );
		}
		
		private function rotationUpDown( _evt:ImageFrameEvent ):void {
			
			_nowRotateRangle = _nowRotateRangle < 0 ? ( 360 + _nowRotateRangle ) : _nowRotateRangle;
			
			Log.log( ' res : ' + _nowRotateRangle / 90 );
			Log.log( _nowRotateRangle );
			
			switch( _nowRotateRangle / 90 ){
				case 0 : {
					_imageBitMap.scaleY = -_imageBitMap.scaleY;
					_imageBitMap.y += _imageBitMap.scaleY < 0 ? _imageBitMap.height : -_imageBitMap.height;
					break;
				}
				case 1 : {
					_imageBitMap.scaleX = -_imageBitMap.scaleX;
					_imageBitMap.y += _imageBitMap.scaleX < 0 ? _imageBitMap.height : -_imageBitMap.height;
					break;
				}
				case 2 : {
					_imageBitMap.scaleY = -_imageBitMap.scaleY;
					_imageBitMap.y += _imageBitMap.scaleY < 0 ? -_imageBitMap.height : _imageBitMap.height;
					break;
				}
				case 3 : {
					_imageBitMap.scaleX = -_imageBitMap.scaleX;
					_imageBitMap.y += _imageBitMap.scaleX < 0 ? -_imageBitMap.height : _imageBitMap.height;
					break;
				}
			}
		}
		
		private function rotationLeRight( _evt:ImageFrameEvent ):void {
//			var _newBitmapData:BitmapData = cloneBitmapData( _imageBitMap.bitmapData );
//			_newBitmapData = rightandleft( _newBitmapData );
//			
//			_imageView.removeChild( _imageBitMap );
//			_load.loadBytes( new JPGEncoder( 100 ).encode( _newBitmapData ) );
			
			var _m:Matrix = _imageBitMap.transform.matrix;
			_m.a = -_m.a;
			
			_m.tx += _m.a < 0 ? _imageBitMap.width : -_imageBitMap.width;
			
			_imageBitMap.transform.matrix = _m;
		}
		
		private function backOrigin( _evt:ImageFrameEvent ):void {
			_imageView.parent.removeChild( _imageView );
			update( _evt );
		}
		
		private function save( _evt:ImageFrameEvent ):void {
			
			_sp = new Sprite();
			_matrix = _imageBitMap.transform.matrix.clone();
			_matrix.tx = 0;
			_matrix.ty = 0;
			
			_sp.graphics.beginBitmapFill( _imageBitMap.bitmapData, _matrix, true );
			_sp.graphics.drawRect( 0, 0, _imageBitMap.width, _imageBitMap.height );
			ImageUtils.saveSprite( _sp );
		}
		
		private function cloneBitmapData( _bitmapData:BitmapData ):BitmapData {
			_sp = new Sprite();
			_matrix = _imageBitMap.transform.matrix.clone();
			
			_matrix.tx = 0;
			_matrix.ty = 0;
			
			_sp.graphics.beginBitmapFill( _bitmapData, _matrix, true );
			_sp.graphics.drawRect( 0, 0, _imageBitMap.width, _imageBitMap.height );
			
			var _newBitmapData:BitmapData = new BitmapData( _sp.width, _sp.height );
			_newBitmapData.draw( _sp );
			
			return _newBitmapData;
		}
		
		private static function upanddown( bt:BitmapData ):BitmapData {
			var bmd:BitmapData = new BitmapData( bt.width, bt.height, true, 0x00000000 );
			for ( var xx:Number = 0; xx < bt.width; xx++ ) {
				for ( var yy:Number=0; yy<bt.height; yy++ ) {
					bmd.setPixel32( xx, bt.height-yy-1, bt.getPixel32( xx,yy ) );
				}
			}
			return bmd;
		}
		
		private static function rightandleft(bt:BitmapData):BitmapData {
			var bmd:BitmapData = new BitmapData( bt.width, bt.height, true, 0x00000000 );
			for ( var yy:Number = 0; yy < bt.height; yy++ ) {
				for ( var xx:Number = 0; xx < bt.width; xx++ ) {
					bmd.setPixel32( bt.width-xx-1, yy, bt.getPixel32(xx,yy ) );
				}
			}
			return bmd;
		}
	}
}

