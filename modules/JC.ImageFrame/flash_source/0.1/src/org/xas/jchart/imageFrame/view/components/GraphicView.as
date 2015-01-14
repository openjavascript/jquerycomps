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
	import flash.geom.Rectangle;
	import flash.net.URLRequest;
	import flash.system.LoaderContext;
	import flash.ui.Mouse;
	import flash.ui.MouseCursor;
	import flash.utils.Timer;
	
	import org.xas.core.utils.DigitalUtils;
	import org.xas.core.utils.ElementUtility;
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
		private var _matrix:Matrix;
		private var _nowRotateRangle:Number;
		private var _rotaer:Sprite;
		
		public function GraphicView()
		{
			super(); 
			_config = BaseConfig.ins as Config;
			addChild( _imageView = new JSprite() );
			_imageView.addChild( _rotaer = new Sprite() );
			
			addEventListener( Event.ADDED_TO_STAGE, addToStage );
			addEventListener( JChartEvent.UPDATE, update );
//			addEventListener( JChartEvent.UPDATE_MOUSEWHEEL, onUpdateMouseWheel );
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
			
			
			_load.contentLoaderInfo.addEventListener( Event.COMPLETE, function( e:Event ):void {
				_imageBitMap = e.target.content as Bitmap;
				
				drawBitMap( _imageBitMap );
				center();
			} );
			
			_req.url = _config.getImgPathByIdx( 0 );
			var lc:LoaderContext = new LoaderContext(true);
			
			_load.load( _req, lc );
			
			_imageView.x = _config.c.minX;
			_imageView.y = _config.c.minY;
			
			addChild( _imageView );

			dispatchEvent( new JChartEvent( JChartEvent.INITED, {} ) );
		}
		
		private function drawBitMap( _bitmap:Bitmap ):void{
			_rotaer.graphics.clear();
			_rotaer.graphics.beginBitmapFill( _bitmap.bitmapData, _bitmap.transform.matrix );
			_rotaer.graphics.drawRect( 0, 0, _bitmap.width, _bitmap.height );
			_rotaer.graphics.endFill();
		}
		
		private function center():void{
			var _rect:Rectangle = _rotaer.getRect( _imageView )
				, _x:Number = -_rect.x
				, _y:Number = -_rect.y
				;
//			Log.log( _rect, _rotaer.x, _rotaer.y, _rotaer.width, _rotaer.height );
			
			_rotaer.x += _x;
			_rotaer.y += _y;
			
			ElementUtility.center( _imageView );
		}

		
		private function rotationLeft( _evt:ImageFrameEvent ):void {
			if( !_imageBitMap ) return;
//			Log.log( 'rotationLeft', new Date().getTime() );
			_rotaer.rotation -= 90;
			center();
		}
		
		private function rotationRight( _evt:ImageFrameEvent ):void {
			if( !_imageBitMap ) return;
//			Log.log( 'rotationRight', new Date().getTime() );
			_rotaer.rotation += 90;
			center();
		}
		
		private function rotationUpDown( _evt:ImageFrameEvent ):void {
			if( !_imageBitMap ) return;
//			Log.log( 'rotationUpDown', _rotaer.scaleY );
			_rotaer.scaleY = -_rotaer.scaleY;
			center();
		}
		
		private function rotationLeRight( _evt:ImageFrameEvent ):void {
			if( !_imageBitMap ) return;
//			Log.log( 'rotationLeRight', _rotaer.scaleY );
			_rotaer.scaleX = -_rotaer.scaleX;
			center();
		}
		
		private function backOrigin( _evt:ImageFrameEvent ):void {
			if( !_imageBitMap ) return;
			_rotaer.rotation = 0;
			_rotaer.scaleX = 1;
			_rotaer.scaleY = 1;
			center();
//			_imageView.parent.removeChild( _imageView );
//			update( _evt );
		}
		
		private function save( _evt:ImageFrameEvent ):void {
			if( !_imageBitMap ) return;
			
//			_sp = new Sprite();
//			_matrix = _imageBitMap.transform.matrix.clone();
//			_matrix.tx = 0;
//			_matrix.ty = 0;
//			
//			_sp.graphics.beginBitmapFill( _imageBitMap.bitmapData, _matrix, true );
//			_sp.graphics.drawRect( 0, 0, _imageBitMap.width, _imageBitMap.height );
			ImageUtils.saveSprite( _imageView );
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

