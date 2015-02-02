package org.xas.jchart.imageFrame.view.components.toolbar
{
	import flash.display.Graphics;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	
	import flashx.textLayout.elements.BreakElement;
	
	import org.xas.core.ui.button.XButton;
	import org.xas.core.utils.Log;
	import org.xas.jchart.common.BaseConfig;
	import org.xas.jchart.common.Common;
	import org.xas.jchart.common.event.JChartEvent;
	import org.xas.jchart.common.ui.widget.JSprite;
	import org.xas.jchart.imageFrame.event.ImageFrameEvent;

	public class ToolbarView extends Sprite {
		
		private var _config:Config;
		
		private var _btnsBox:Vector.<XButton>;
		
		private var ROTATION_LEFT:String = 'rotationLeft';
		private var ROTATION_RIGHT:String = 'rotationRight';
		private var ROTATION_UP_DOWN:String = 'rotationUpDown';
		private var ROTATION_LE_RIGHT:String = 'rotationLeRight';
		private var BACK_ORIGIN:String = 'backOrigin';
		private var SAVE:String = 'save';
		
		public function ToolbarView() {
			_config = BaseConfig.ins as Config;
			
			_btnsBox = new Vector.<XButton>;
			
			addEventListener( Event.ADDED_TO_STAGE, addToStage );
			addEventListener( JChartEvent.UPDATE, update );	
		}
		
		protected function addToStage( _evt:Event ):void {
			
			var _btnType:String;
			var _btnText:String;
			var _tmpBtn:XButton;
			Common.each( _config.toolBtn, function( _idx:int, _btnConfig:Object ):void {
				_btnType = _btnConfig.btnType;
				
				if( !_btnType ){ return; }
				
				_btnText = _btnConfig.text || '';
				_tmpBtn = new XButton( _btnText, { index: _idx, data: _btnConfig } );
				
				_tmpBtn.addEventListener( MouseEvent.CLICK, onClick );
				
				_btnsBox.push( _tmpBtn );
				
			} );
			
		}
		
		protected function update( _evt:JChartEvent ):void {
			graphics.clear();
			
			var _toolbar:JSprite = new JSprite();
			
			_toolbar.graphics.beginFill( 0x000000, 0.6 );
			
			_toolbar.graphics.drawRect( 
				0
				, 0
				, _config.c.tbWidth
				, _config.c.tbHeight
			);
			
			addChild( _toolbar );
			
			_toolbar.x = _config.c.minX;
			_toolbar.y = _config.c.maxY - _config.c.tbHeight
			
			var _x:Number = 0;
			var _y:Number = _config.c.tbHeight / 2;
			
			Common.each( _btnsBox, function( _idx:int, _btn:XButton ):void {
				
				_btn.x = _x;
				_btn.y = _y - _btn.height / 2;
				
				_toolbar.addChild( _btn );
				
				_x += _btn.width;
				
			} );
		}
		
		private function onClick( _evt:MouseEvent ):void {
			
			var _btn:XButton = _evt.currentTarget as XButton;
			if( !_btn || !_btn.data ) return;
			
			var _btnConfig:Object = _btn.data.data;
			var _btnType:String = _btnConfig.btnType || '';
			var _eventType:String;
			
			switch( _btnType ){
				case ROTATION_LEFT : {
					_eventType = ImageFrameEvent.ROTATION_LEFT;
					break;
				}
				case ROTATION_RIGHT : {
					_eventType = ImageFrameEvent.ROTATION_RIGHT;
					break;
				}
				case ROTATION_UP_DOWN : {
					_eventType = ImageFrameEvent.ROTATION_UP_DOWN;
					break;
				}
				case ROTATION_LE_RIGHT : {
					_eventType = ImageFrameEvent.ROTATION_LE_RIGHT;
					break;
				}
				case BACK_ORIGIN : {
					_eventType = ImageFrameEvent.BACK_ORIGIN;
					break;
				}
				case SAVE : {
					_eventType = ImageFrameEvent.SAVE;
					break;
				}
			}
			
//			dispatchEvent( new ImageFrameEvent( _eventType, _btnConfig )  );
			BaseConfig.ins.facade.sendNotification( _eventType, _btnConfig );
		}
		
	}
}