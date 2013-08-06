// module requirements
require([ "dojo/dom", "dojo/on", "ebs/prices", "ebs/cart", "ebs/conf",
		"dojo/ready" ], function(dom, on, prices, cart, conf, ready) {

	ready(function() {

		conf.get("js/config.json", init);

		function init(config) {

			on(dom.byId("height"), "blur", function(event) {
				prices.calculate(config);
			});
			on(dom.byId("width"), "blur", function(event) {
				prices.calculate(config);
			});
			on(dom.byId("qty"), "blur", function(event) {
				prices.calculate(config);
			});
			on(dom.byId("grills"), "change", function(event) {
				prices.calculate(config);
			});
			on(dom.byId("addToCart"), "click", function(event) {
				var item = {
					productName : "Custom Window",
					height      : dom.byId("height").value,
					width       : dom.byId("width").value,
					qty         : dom.byId("qty").value,
					unitPrice   : dom.byId("unitPrice").innerHTML,
					subTotal    : dom.byId("subtotal").innerHTML
				};
				
				cart.add(config, item);
			});

			//cart.putSampleCart(config);
			cart.load(config);
			
		}

	});

});