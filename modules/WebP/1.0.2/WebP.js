/**
 * HTML WebP Plugin v1.0.2
 *   By EtherDream (zjcqoo@163.com)
 * Update: 2012/11/27
 */
(function()
{
	var __VER__ = navigator.userAgent;
	var __IE__ = /MSIE/.test(__VER__);
	var __IE67__ = /MSIE 6|MSIE 7/.test(__VER__);
	var __STD__ = !!window.addEventListener;
	var dummy;


	// flash resize callback
	__WEBPCALL__ = function(id, w, h)
	{
		arrDOM[id].width = w + "px";
		arrDOM[id].height = h + "px";
	}

	// firefox: 'onerror' occurs before 'DOMContentLoaded'
	var hasDCL;
	if (__STD__)
		document.addEventListener("DOMContentLoaded", function(){hasDCL = true}, false);
	
	function handle_inserted(e)
	{
		if (e.target instanceof HTMLImageElement)
			WatchImg(e.target);
	}

	function handle_loaded()
	{
		var col = [].slice.call(document.images);
		var n = col.length;

		while(n--)
			WatchImg(col[n]);
	}

	function handle_forbid_std(e)
	{
		e.preventDefault();
		e.stopPropagation();
	}

	function handle_memu(e)
	{
		e = e || event;
		if (e.button != 2)
			return;

		var dom = e.srcElement || e.target;
		if (dom.tagName != "EMBED")
			return;

		if (!/WebP.swf/.test(dom.src))
			return;

		if (__IE__)
		{
			// disable flash menu
			dummy.setCapture();
			setTimeout(function(){dummy.releaseCapture()}, 0);
		}
		else
		{
			handle_forbid_std(e);
		}
	}




	function copy_sty_std(src, dst)
	{
		src = getComputedStyle(src);
		dst = dst.style;

		for(var i = 0, n = src.length; i < n; i++)
		{
			k = src[i];
			if (k != "width" && k != "height")
				dst.setProperty(k, src.getPropertyValue(k), null);
		}
	}

	function copy_sty_ie678(src, dst)
	{
		src = src.currentStyle;
		dst = dst.style;

		for(var k in src)
			if (k != "width" && k != "height")
				dst[k] = src[k];
	}

	function copy_attr_std(src, dst)
	{
		var attrs = src.attributes;
		for(var i = 0, n = attrs.length; i < n; i++)
		{
			var attr = attrs[i];
			var name = attr.name;
			if (name != "src")
				dst.setAttribute(name, attr.value);
		}
	}

	function copy_attr_ie67(src, dst)
	{
		var __ATTR__ = {"class": "className", "for": "htmlFor"};

		var attrs = src.attributes;
		for(var i = 0, n = attrs.length; i < n; i++)
		{
			var attr = attrs[i];
			var name = attr.name;
			if (name != "src")
			{
				name = __ATTR__[name] || name;
				value = src.getAttribute(name, 2);

				if (value && value.length != 0)
					dst.setAttribute(name, value);
			}
		}
	}


	var arrDOM = [];

	function WatchImg(img)
	{
		if (img.getAttribute("WEBPON"))
			return;
		
		// only match *.webp*
		var reg = /.webp$/i;
		if (!reg.test(img.src))
			return;

		img.setAttribute("WEBPON", 1);

		// create flash
		var fla = document.createElement("embed");
		fla.src = "WebP.swf";
		fla.width = 28;
		fla.height = 28;

		// clone img's style
		try
		{
			__STD__?
				copy_sty_std(img, fla):
				copy_sty_ie678(img, fla);
		}
		catch(e)
		{}

		// clone img's attribute
		try
		{
			__IE67__?
				copy_attr_ie67(img, fla):
				copy_attr_std(img, fla);
		}
		catch(e)
		{}
 
		fla.setAttribute("wmode", "transparent");
		fla.setAttribute("flashvars", "id=" + arrDOM.length + "&url=" + escape(img.src));

		if (!__IE__)
			fla.addEventListener("mouseover", handle_forbid_std, false);

		// replace img element
		arrDOM.push(fla);
		img.parentNode.replaceChild(fla, img);
	}

	function setup()
	{
		__STD__ ? setup_std() : setup_ie678();
	}

	function setup_std()
	{
		if (hasDCL)
			handle_loaded();
		else
			document.addEventListener("DOMContentLoaded", handle_loaded, false);

		document.addEventListener("DOMNodeInserted", handle_inserted, false);
		document.addEventListener("mousedown", handle_memu, true);
	}

	function setup_ie678()
	{
		window.__WATCHIMG__ = WatchImg;

		// FIX: [statusbar bug]
		dummy = document.createElement("div");
		dummy.style.display = "none";
		document.body.appendChild(dummy);
		dummy.removeBehavior(dummy.addBehavior("WebP.htc"));

		document.createStyleSheet()
			.addRule("img", "behavior:url(WebP.htc)");

		document.attachEvent("onmousedown", handle_memu);
	}

	function init()
	{
		// native support check
		var t = new Image;
		t.onerror = setup;
		t.src = "data:image/webp;base64,UklGRjAAAABXRUJQVlA4ICQAAACyAgCdASoBAAEALy2Wy2WlpaWlpYEsSygABc6zbAAA/upgAAA=";
	}
	init();
})();