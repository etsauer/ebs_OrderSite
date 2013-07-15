define([ "dojo/dom", "dojo/request/xhr", "dojo/json" ], function(dom, xhr,
		json) {

	return {
		calculate : function(config) {
			var heightBox = dom.byId("height");
			var widthBox = dom.byId("width");
			var qtyBox = dom.byId("qty");
			var grills = dom.byId("grills");
			var errorMsg = dom.byId("error");

			// Minimum criteria for calculating price
			if (!(heightBox.value) || !(widthBox.value)) {
				return;
			}

			var url = config.restapis.calculator + "?h=" + heightBox.value
					+ "&w=" + widthBox.value + "&q=" + qtyBox.value + "&g="
					+ grills.value;

			xhr(url, {
				handleAs : "json"
			}).then(function(data) {
				// var response = json.parse(data);
				try {
					var unit = data.unitPrice;
					var subtotal = data.subtotal;
					var shipping = data.shipping;
					var total = data.totalPrice;
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
	};
});