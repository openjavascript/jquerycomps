;requirejs( [ 
    "template",
    "data"
], function( template ){
	console.log(template('tpl-menulist', compList));
	/* menuList 赋值 */
	$('#menulist').html( template('tpl-menulist', compList) );

	/* navlist 赋值 */
	$('#bodynav').html( template('tpl-navlist', compList) );

	/* itemlist 赋值 */
	$('#itemlist').html( template('tpl-itemlist', compList) );
});