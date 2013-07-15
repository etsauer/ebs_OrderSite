// module requirements
require([ "dojo/dom", "dojo/on", "dojo/request/xhr", "dojo/json", "ebs/prices",
		"dojo/domReady!" ], function(dom, on, xhr, json, prices) {

	// Create config object from json config file
	var config = null;
	xhr("js/config.json", {
		handleAs : "json"
	}).then(function(data) {
		config = data;
	}, function(error) {
		console.error(error);
	})
	
	on(dom.byId("height"), "keyup", function(event) {
		prices.calculate(config);
	});
	on(dom.byId("width"), "keyup", function(event) {
		prices.calculate(config);
	});
	on(dom.byId("qty"), "keyup", function(event) {
		prices.calculate(config);
	});
	on(dom.byId("grills"), "change", function(event) {
		prices.calculate(config);
	});
});