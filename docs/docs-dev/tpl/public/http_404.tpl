<!doctype html>
<html>
<head>
<meta charset=utf-8 />
<title>JQueryComps</title>
</head>    
<body>
    error 404
    {{if isset( $TERROR ) }}
        {{foreach $TERROR as $key => $val }}
            <div>{{$key}}: {{$val}}</div>
        {{/foreach}}
    {{/if}}
</body>
</html>
 
