define([ "dojo/dom", "dojo/request/xhr", "dojo/json" ], function(dom, xhr,
		json) {

	return {
		calculate : function(config) {
			var heightBox = dom.byId("height");
			var widthBox = dom.byId("width");
			var qtyBox = dom.byId("qty");
			var grills = dom.byId("grills");
			var errorMsg = dom.byId("error");

			if(!this.validate(config)) {
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
					dom.byId("unitPrice").innerHTML = '$\t' + unit.toFixed(2);
					dom.byId("quantity").innerHTML = qtyBox.value;
					dom.byId("subtotal").innerHTML = '$\t' + subtotal.toFixed(2);
					dom.byId("shipping").innerHTML = (shipping != 'FREE') ? '$\t' + shipping.toFixed(2) : shipping;
					dom.byId("totalPrice").innerHTML = '$\t' + total.toFixed(2);
				} catch (err) {
					errorMsg.innerHTML = "Error: " + err;
				}
			}, function(error) {
				errorMsg.innerHTML = "Error: " + error;
			});
		},
	
		validate : function(config) {
			var heightBox = dom.byId("height");
			var widthBox = dom.byId("width");
			var qtyBox = dom.byId("qty");
			var grills = dom.byId("grills");
			var errorMsg = dom.byId("error");
			
			// Minimum criteria for calculating price
			if (!(heightBox.value) || !(widthBox.value)) {
				return false;
			}
			
			// Round height and width to nearest 8th of an inch
			heightBox.value = Math.round(heightBox.value * 8) / 8;
			widthBox.value = Math.round(widthBox.value * 8) / 8;
			
			// Round quantity to whole number
			qtyBox.value = Math.round(qtyBox.value);
			
			return true;
		}
	};
});