        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="renderer" content="webkit" />
        <meta name="Keywords" content="JQueryComps,openjavascript,JC,JC2,jquery" />
        <meta name="Description" content="JQueryComps" />

        <link rel="stylesheet" type="text/css" href="{{$PROJECT_ROOT}}/static/css/button.css" />
	    <link rel="stylesheet" type="text/css" href="{{$PROJECT_ROOT}}/static/css/common.css" />

        <script>
            window.TPATH = window.PROJECT_ROOT = "{{$PROJECT_ROOT}}";
            window.URL_ROOT = "{{$URL_ROOT}}";

{{if $SHOW_COMP_INFO|default:''}}
            window.COMP_URL = "{{$COMP_URL|default:''}}";
            window.VIEWER_URL = "{{$VIEWER_URL|default:''}}{0}";

            window.COMP_ROOT = "{{$COMP_ROOT|default:''}}";

            window.NAME = "{{$NAME|default:''}}";
            window.OUTPUT = "{{$OUTPUT|default:''}}";

            window.COMP_NAME = "{{$COMP_NAME|default:''}}";
            window.COMP_VERSION = "{{$COMP_VERSION|default:''}}";
            {{/if}}

        </script>
		<script src="{{$URL_ROOT}}/lib.js"></script>
		<script src="{{$PROJECT_ROOT}}/static/js/config.js"></script>

        <script>
            JC.PATH = URL_ROOT;
            JC.debug = {{$TDEBUG|default:0}};

            requirejs.config( {
                baseUrl: JC.PATH
                , urlArgs: 'v={{$TVERSION}}'
                , paths: {
                    'common': TPATH + '/static/js/app/common'
                }
            });

        </script>

