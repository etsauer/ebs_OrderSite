// module requirements
require([ "dojo/dom", "dojo/on", "dojo/request/xhr", "dojox/xml/parser",
		"dojo/domReady!" ], function(dom, on, xhr, parser) {

	function update() {
		var heightBox = dom.byId("height");
		var widthBox = dom.byId("width");
		var qtyBox = dom.byId("qty");
		var grills = dom.byId("grills");
		var errorMsg = dom.byId("error");

		// Minimum criteria for calculating price
		if (!(heightBox.value) || !(widthBox.value)) {
			console.log("Mising values.");
			return;
		}

		var url = "service/mockService.php?h=" + heightBox.value + "&w="
				+ widthBox.value + "&q=" + qtyBox.value + "&g=" + grills.value;

		xhr(url, {
			handleAs : "xml"
		}).then(function(data) {
			var rootEl = data.documentElement;
			try {
				var unit = parser.textContent(rootEl.childNodes[1]);
				var subtotal = parser.textContent(rootEl.childNodes[2]);
				var shipping = parser.textContent(rootEl.childNodes[3]);
				var total = parser.textContent(rootEl.childNodes[4]);
				dom.byId("unitPrice").innerHTML = unit;
				dom.byId("quantity").innerHTML = qtyBox.value;
				dom.byId("subtotal").innerHTML = subtotal;
				dom.byId("shipping").innerHTML = shipping;
				dom.byId("totalPrice").innerHTML = total;
			} catch (err) {
				errorMsg.innerHTML = "Error: " + err;
			}
		}, function(error) {
			errorMsg.innerHTML = "Error: " + error;
		});
	}

	on(dom.byId("height"), "keyup", function(event) {
		update();
	});
	on(dom.byId("width"), "keyup", function(event) {
		update();
	});
	on(dom.byId("qty"), "keyup", function(event) {
		update();
	});
	on(dom.byId("grills"), "change", function(event) {
		update();
	});
});