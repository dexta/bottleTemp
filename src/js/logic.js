function render_handlebar(template,data,target) {
	var source   = $("#"+template).html();
	var compiled = Handlebars.compile(source);
	var html    = compiled(data);
	$("#"+target).append(html);
}