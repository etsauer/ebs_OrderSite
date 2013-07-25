define([ "dojo/dom", "dojo/json", "dojo/cookie", "dojo/_base/array" ],
		function(dom, json, cookie, array) {

			return {
				load : function(config) {
					var cart = this.get(config);
					var cartDiv = dom.byId(config.cart.domWrapper);
					// console.log("Shopping Cart: " + cart);
					cartDiv.innerHTML = "<p>Shopping Cart</p>";
					cartDiv.innerHTML += this.getHTML(cart);
				},

				get : function(config) {
					var cookieName = config.cart.cookieName;
					var cookieObj = cookie(cookieName);
					if (typeof cookieObj == undefined) {
						return null;
					}
					var cart = json.parse(cookieObj);
					return cart;
				},

				getHTML : function(cart) {
					var html = '';
					html += '<ul>';

					array.forEach(cart.items, function(item) {
						html += '<li>' + item.qty + "x " + item.productName
								+ " " + item.height + " x " + item.width
								+ " ... $" + item.subTotal + '</li>';
					});

					html += '</ul>';
					return html;
				},

				update : function(config, cart) {
					cookie(config.cart.cookieName, json.stringify(cart), {
						max_age : 60 * 5
					});
				},

				add : function(config, item) {
					var cart = this.init(config);
					cart.items.push(item);
					this.update(config, cart);
					this.load(config);
				},

				init : function(config) {
					var cart = this.get(config);
					if (typeof cart.items !== undefined
							&& cart.items.length > 0) {
						return cart;
					}
					cart = {};
					cart.items = [];
					cart.subTotal = 0;
					cart.shipping = 0;
					cart.totalPrice = 0;
					return cart;
				},

				putSampleCart : function(config) {
					var cart = {};
					cart.items = [];
					var item1 = {
						productName : "Custom Window",
						height : 12.5,
						width : 15,
						qty : 8,
						unitPrice : 24.38,
						subTotal : 195.04
					};
					var item2 = {
						productName : "Custom Window",
						height : 38,
						width : 46,
						qty : 2,
						unitPrice : 227.24,
						subTotal : 454.48
					};
					cart.items.push(item1);
					cart.items.push(item2);
					cart.shipping = 0;
					cart.totalPrice = 649.52;
					this.update(config, cart);
				}
			};
		});