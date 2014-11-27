
<!DOCTYPE html>
<html>
	<head>
	    <meta charset="utf-8" />
	    <title>Jquey Comps</title>
	    <link rel="stylesheet" type="text/css" href="../../static/css/app/index.css" />
	    <link rel="stylesheet" type="text/css" href="../../static/css/common.css" />
	</head>
	<body>
		<div class="header">
			<div class="wrapper">
				<div class="header-nav clearfix">
					<h1 class="header-logo">
						<span>Jquery</span>Comps
						<i>|</i>
						<a class="header-github" hover="logohover" href="http://github.com/openjavascript/jquerycomps" target="_blank">
							<img class="github-unhover" src="../../static/img/githubLogo.png" />
							<img class="github-hover" src="../../static/img/githubLogo2.png" />
						</a>
					</h1>
					<ul id="menulist" class="header-menu">
						{{foreach from=$compsList item=value}}
					    <li hover="header-menuhover">
					    	{{$value.name}}
					    	<div class="header-submenu clearfix">
					    		{{foreach from=$value.list item=item}}
					    		{{if !$item.hide|default:'' && !$item.history|default:''}}
						    		{{if $value.name != 'Plugin'}}
						    			<a class="header-complink" data-version="{{$item.version}}" href="#">{{$item.name}}</a>
						    		{{else}}
						    			<a href="{{$item.outlink}}" target="_blank">{{$item.name}}</a>
						    		{{/if}}
						    	{{/if}}
					    		{{/foreach}}
					    	</div>
					    </li>
					    {{/foreach}}
					    {{foreach from=$extraMenu item=value}}
					    <li class="header-extramenu" hover="header-menuhover">
					    	<a href="{{$value.url}}" target="_blank" hover="header-menuhover">
					    	{{$value.name}}
					    	</a>
					    </li>
					    {{/foreach}}
					</ul>
				</div>
			</div>
		</div>
		<div class="flor-img"></div>
		<div class="wrapper">
			<div class="body clearfix">
				<div class="body-helper">
					<a href="#" class="body-homebtn" style="display:none">HOME</a>
					<a href="#" class="body-backbtn" style="display:none">BACK</a>
					<a href="#" class="body-topbtn" style="display:none">TOP</a>
				</div>
				
				<div id="bodynav" class="body-nav">
					{{foreach from=$compsList item=value}}
			        <dl>
						<dt>{{$value.name}}</dt>
						<dd>
							<ul>
								{{foreach from=$value.list item=item}}
								{{if !$item.hide|default:'' && !$item.history|default:'' }}
								<li>
									<a href="#" linkdata="{{$item.name|replace:'.':'_'}}">{{$item.name}}</a>
								</li>
								{{/if}}
								{{/foreach}}
							</ul>
						</dd>
					</dl>
				    {{/foreach}}
				</div>
				<div id="itemlist" class="body-content">
					{{foreach from=$compsList item=value}}
			        <ul class="body-compblock">
			        	<h1 class="body-blockname">{{$value.name}}</h1>
			        	{{foreach from=$value.desc item=d}}
			        	<p class="body-blockdesc">{{$d}}</p>
			        	{{/foreach}}
			        	{{if $value.name != 'Plugin'}}
				        	{{foreach from=$value.list item=item}}
				        	{{if !$item.hide|default:'' && !$item.history|default:''}}
							<li id="{{$item.name|replace:'.':'_'}}" class="body-comp" data-version="{{$item.version}}">
								<h2 class="body-comptitle clearfix">
									<span class="body-compname">{{$item.name}}</span>
									<a href="#" class="body-attrbtn body-changebtn">ATTR</a>
									{{if !$item.nodemo|default:''}}
									<a href="#" class="body-demobtn body-changebtn">DEMO</a>
									<a href="#" class="body-sdemobtn">SIMPLE DEMO</a>
									{{/if}}
								</h2>
								<h3 class="body-compsubtitle">{{$item.subtitle}}<span class="body-compversion">最新版本: {{$item.version}}</span></h3>
								{{foreach from=$item.desc item=desc}}
								<p class="body-compdesc">{{$desc}}</p>
								{{/foreach}}
								<div class="body-compdemo">
									<a href="#" class="body-compclose">CLOSE DEMO</a>
									<iframe src="" frameborder="no" border="0"></iframe>
								</div>
							</li>
							{{/if}}
							{{/foreach}}
						{{else}}
							{{foreach from=$value.list item=item}}
							{{if !$item.hide|default:'' && !$item.history|default:''}}
							<li id="{{$item.name|replace:'.':'_'}}" class="body-comp">
								<h2 class="body-comptitle clearfix">
									<span class="body-compname">{{$item.name}}</span>
									<a href="{{$item.outlink}}" target="_blank" class="body-attrbtn">官网</a>
								</h2>
								<h3 class="body-compsubtitle">{{$item.subtitle}}<span class="body-compversion">使用版本: {{$item.version}}</span></h3>
								{{foreach from=$item.desc item=desc}}
								<p class="body-compdesc">{{$desc}}</p>
								{{/foreach}}
							</li>
							{{/if}}
							{{/foreach}}
						{{/if}}
					</ul>
				    {{/foreach}}
				</div>
				<div class="body-detail">
					<iframe id="detailframe" src="" frameborder="no" border="0"></iframe>
					<ul class="body-detailnav"></ul>
				</div>
			</div>
			<div class="footer">
				<h2>友情链接：</h2>
				<p id="outlink" class="clearfix">
					{{foreach from=$websiteLink item=link}}
					<a href="{{$link.url}}" target="_blank">{{$link.name}}</a>
					{{/foreach}}
				</p>
			</div>
		</div>
		<script src="../../static/js/jc/lib.js"></script>
		<script src="../../static/js/config.js"></script>
		<script src="../../static/js/app/index.js"></script>
	</body>
</html>
