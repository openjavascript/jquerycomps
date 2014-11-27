;(function(){
	window.JC = window.JC || {log:function(){}};
	JC.PATH = JC.PATH || scriptPath();

	var __FILE__; 
	try { 
	    throw Error("获取JS路径方法捕获 config"); 
	}catch(ex){ 
	    if(ex.fileName) //Firefox 
	        __FILE__ = ex.fileName; 
	    else if(ex.stack){//Chrome 或 IE10 
	        ex.stack.replace( /([\w]+tp\:\/\/.*?)\:[\d]+?\:[\d]+/i, function($0, $1){

	        	__FILE__ = $1;
	        });
	    }else if(ex.sourceURL)//Safari 
	        __FILE__ = ex.sourceURL; 
	}
	var ar = __FILE__.split('/');
	ar.pop();

	window.requirejs && 
	requirejs.config( {
	    baseUrl: ar.join('/') + '/'
	    , urlArgs: 'v=20141127'
	    , paths: {
	    	'template' : 'artTemplate/dist/template'
	    	, 'data' : 'dataTool'
	    	, 'iscroll' : 'iscroll/build/iscroll'
	    	, 'velocity' : 'velocity/velocity.min'

	    	, 'detail' : 'app/detail'

	    	, '../../lib/codemirror' : 'codeMirror/lib/codemirror'
	    	, 'codeMirror' : 'codeMirror/lib/codemirror'
	    	, '../xml/xml' : 'codeMirror/mode/xml/xml'
	    	, '../javascript/javascript' : 'codeMirror/mode/javascript/javascript'
	    	, '../css/css' : 'codeMirror/mode/css/css'

	    	, 'codeMirror.htmlmixed' : 'codeMirror/mode/htmlmixed/htmlmixed'

	    	, 'JC.common' : 'jc/modules/JC.common/0.2/common'
	        , 'JC.BaseMVC': 'jc/modules/JC.BaseMVC/0.1/BaseMVC'

	        , 'DEV.Bizs.FormLogic': 'jc/modules/Bizs.FormLogic/dev/FormLogic'

	        , 'DEV.JC.ImageCutter': 'jc/modules/JC.ImageCutter/dev/ImageCutter'
	        , 'DEV.JC.AjaxUpload': 'jc/modules/JC.AjaxUpload/dev/AjaxUpload'
	        , 'DEV.JC.Suggest': 'jc/modules/JC.Suggest/dev/Suggest'

	        , 'JC.AjaxUpload': 'jc/modules/JC.AjaxUpload/0.2/AjaxUpload'
	        , 'JC.AjaxTree': 'jc/modules/JC.AjaxTree/0.1/AjaxTree'
	        , 'JC.AutoChecked': 'jc/modules/JC.AutoChecked/0.1/AutoChecked'
	        , 'JC.AutoSelect': 'jc/modules/JC.AutoSelect/0.2/AutoSelect'
	        , 'JC.AutoComplete': 'jc/modules/JC.AutoComplete/0.1/AutoComplete'

	        , 'JC.Calendar': 'jc/modules/JC.Calendar/0.3/Calendar'
	        , 'JC.Calendar.date': 'jc/modules/JC.Calendar/0.3/Calendar.date'
	        , 'JC.Calendar.week': 'jc/modules/JC.Calendar/0.3/Calendar.week'
	        , 'JC.Calendar.month': 'jc/modules/JC.Calendar/0.3/Calendar.month'
	        , 'JC.Calendar.season': 'jc/modules/JC.Calendar/0.3/Calendar.season'
	        , 'JC.Calendar.year': 'jc/modules/JC.Calendar/0.3/Calendar.year'
	        , 'JC.Calendar.monthday': 'jc/modules/JC.Calendar/0.3/Calendar.monthday'
	        , 'JC.Cover' : 'jc/modules/JC.Cover/0.1/Cover'

	        , 'JC.DCalendar': 'jc/modules/JC.DCalendar/0.1/DCalendar'
	        , 'JC.DCalendar.date': 'jc/modules/JC.DCalendar/0.1/DCalendar.date'

	        , 'JC.Drag': 'jc/modules/JC.Drag/0.1/Drag'
	        , 'JC.DragSelect': 'jc/modules/JC.DragSelect/0.1/DragSelect'

	        , 'JC.FChart': 'jc/modules/JC.FChart/0.1/FChart'
	        , 'JC.Form': 'jc/modules/JC.Form/0.2/Form'
	        , 'JC.Fixed': 'jc/modules/JC.Fixed/0.1/Fixed'
	        , 'JC.FlowChart': 'jc/modules/JC.FlowChart/0.1/FlowChart'

	        , 'JC.FormFillUrl': 'jc/modules/JC.FormFillUrl/0.1/FormFillUrl'
	        , 'JC.FrameUtil': 'jc/modules/JC.FrameUtil/0.1/FrameUtil'

	        , 'JC.ImageCutter': 'jc/modules/JC.ImageCutter/0.1/ImageCutter'

	        , 'JC.LunarCalendar': 'jc/modules/JC.LunarCalendar/0.1/LunarCalendar'
	        , 'JC.LunarCalendar.default': 'jc/modules/JC.LunarCalendar/0.1/LunarCalendar.default'
	        , 'JC.LunarCalendar.getFestival': 'jc/modules/JC.LunarCalendar/0.1/LunarCalendar.getFestival'
	        , 'JC.LunarCalendar.gregorianToLunar': 'jc/modules/JC.LunarCalendar/0.1/LunarCalendar.gregorianToLunar'
	        , 'JC.LunarCalendar.nationalHolidays': 'jc/modules/JC.LunarCalendar/0.1/LunarCalendar.nationalHolidays'

	        , 'JC.NumericStepper': 'jc/modules/JC.NumericStepper/0.1/NumericStepper'
	        , 'JC.Paginator': 'jc/modules/JC.Paginator/0.1/Paginator'
	        
	        , 'JC.Rate': 'jc/modules/JC.Rate/0.1/Rate'

	        , 'JC.ServerSort': 'jc/modules/JC.ServerSort/0.1/ServerSort'
	        , 'JC.Slider': 'jc/modules/JC.Slider/0.1/Slider'
	        , 'JC.StepControl': 'jc/modules/JC.StepControl/0.1/StepControl'
	        , 'JC.Suggest': 'jc/modules/JC.Suggest/0.2/Suggest'

	        , 'JC.Tab': 'jc/modules/JC.Tab/0.2/Tab'

	        , 'JC.TableFreeze': 'jc/modules/JC.TableFreeze/0.2/TableFreeze'
	        , 'JC.TableSort': 'jc/modules/JC.TableSort/0.1/TableSort'
	        , 'JC.Selectable': 'jc/modules/JC.SelectAble/dev/Selectable'
	        , 'JC.Tips': 'jc/modules/JC.Tips/0.1/Tips'
	        , 'JC.Tree': 'jc/modules/JC.Tree/0.1/Tree'
	        , 'JC.Lazyload': 'jc/modules/JC.Lazyload/0.1/Lazyload'
	        , 'JC.Scrollbar': 'jc/modules/JC.Scrollbar/0.1/Scrollbar'

	        , 'JC.Panel': 'jc/modules/JC.Panel/0.2/Panel'
	        , 'JC.Panel.default': 'jc/modules/JC.Panel/0.2/Panel.default'
	        , 'JC.Panel.popup': 'jc/modules/JC.Panel/0.2/Panel.popup'
	        , 'JC.Dialog': 'jc/modules/JC.Panel/0.2/Dialog'
	        , 'JC.Dialog.popup': 'jc/modules/JC.Panel/0.2/Dialog.popup'

	        , 'JC.Placeholder': 'jc/modules/JC.Placeholder/0.1/Placeholder'
	        
	        , 'JC.PopTips': 'jc/modules/JC.PopTips/0.2/PopTips'
	        , 'JC.Valid': 'jc/modules/JC.Valid/0.2/Valid'

	        , 'Bizs.ActionLogic': 'jc/modules/Bizs.ActionLogic/0.1/ActionLogic'
	        , 'Bizs.AutoSelectComplete': 'jc/modules/Bizs.AutoSelectComplete//0.1/AutoSelectComplete'

	        , 'Bizs.ChangeLogic': 'jc/modules/Bizs.ChangeLogic/0.1/ChangeLogic'

	        , 'Bizs.CustomColumn' : 'jc/modules/Bizs.CustomColumn/0.1/CustomColumn'

	        , 'Bizs.DisableLogic': 'jc/modules/Bizs.DisableLogic/0.1/DisableLogic'
	        , 'Bizs.DropdownTree': 'jc/modules/Bizs.DropdownTree/0.1/DropdownTree'

	        , 'Bizs.CommonModify': 'jc/modules/Bizs.CommonModify/0.1/CommonModify'
	        , 'Bizs.FormLogic': 'jc/modules/Bizs.FormLogic/0.2/FormLogic'
	        , 'Bizs.KillISPCache': 'jc/modules/Bizs.KillISPCache/0.1/KillISPCache'
	        , 'Bizs.MoneyTips': 'jc/modules/Bizs.MoneyTips/0.1/MoneyTips'

	        , 'Bizs.MultiAutoComplete': 'jc/modules/Bizs.MultiAutoComplete/0.1/MultiAutoComplete'

	        , 'Bizs.MultiDate': 'jc/modules/Bizs.MultiDate/0.1/MultiDate'
	        , 'Bizs.MultiSelect': 'jc/modules/Bizs.MultiSelect/0.1/MultiSelect'
	        , 'Bizs.MultiselectPanel': 'jc/modules/Bizs.MultiselectPanel/0.1/MultiselectPanel'
	        , 'Bizs.MultiSelectTree': 'jc/modules/Bizs.MultiSelectTree/0.1/MultiSelectTree'
	        , 'Bizs.DMultiDate': 'jc/modules/Bizs.DMultiDate/0.1/DMultiDate'
	        , 'Bizs.MultiUpload': 'jc/modules/Bizs.MultiUpload/0.1/MultiUpload'
	        , 'Bizs.TaskViewer': 'jc/modules/Bizs.TaskViewer/0.1/TaskViewer'

	        , 'Bizs.CRMSchedule': 'jc/modules/Bizs.CRMSchedule/0.1/CRMSchedule'
	        , 'Bizs.CRMSchedulePopup': 'jc/modules/Bizs.CRMSchedule/0.1/CRMSchedulePopup'

	        , 'plugins.jquery.form': 'jc/plugins/jquery.form/3.36.0/jquery.form'
	        , 'plugins.jquery.rate': 'jc/plugins/jquery.rate/2.5.2/jquery.rate'

	        , 'jquery.mousewheel': 'jc/modules/jquery.mousewheel/3.1.12/jquery.mousewheel'
	        , 'jquery.form': 'jc/plugins/jquery.form/3.36.0/jquery.form'
	        , 'jquery.rate': 'jc/plugins/jquery.rate/2.5.2/jquery.rate'


	        , 'json2': 'jc/modules/JSON/2/JSON'
	        , 'plugins.JSON2': 'jc/modules/JSON/2/JSON'
	        , 'plugins.json2': 'jc/modules/JSON/2/JSON'

	        , 'plugins.Aes': 'jc/plugins/Aes/0.1/Aes'
	        , 'plugins.Base64': 'jc/plugins/Base64/0.1/Base64'
	        , 'plugins.md5': 'jc/plugins/md5/0.1/md5'

	        , 'plugins.requirejs.domReady': 'jc/plugins/requirejs.domReady/2.0.1/domReady'

	        , 'plugins.swfobject': 'jc/plugins/SWFObject/2.2/SWFObject'
	        , 'swfobject': 'jc/modules/swfobject/2.3/swfobject'
	        , 'SWFObject': 'jc/modules/swfobject/2.3/swfobject'

	        , 'SWFUpload': 'jc/modules/SWFUpload/2.5.0/SWFUpload'
	        , 'swfupload': 'jc/modules/SWFUpload/2.5.0/SWFUpload'
	        , 'Raphael': 'jc/modules/Raphael/latest/raphael'

	    }
    });
	/**
	 * 取当前脚本标签的 src路径 
	 * @static
	 * @return  {string} 脚本所在目录的完整路径
	 */
	function scriptPath(){
	    var _sc = document.getElementsByTagName('script'), _sc = _sc[ _sc.length - 1 ], _path = _sc.getAttribute('src');
	    if( /\//.test( _path ) ){ _path = _path.split('/'); _path.pop(); _path = _path.join('/') + '/'; }
	    else if( /\\/.test( _path ) ){ _path = _path.split('\\'); _path.pop(); _path = _path.join('\\') + '/'; }
	    return _path;
	}
}());
