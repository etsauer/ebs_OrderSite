define([ "dojo/json", "dojo/request/xhr" ], function(json, xhr) {
	return {
		get : function(file, callback) {
			// Create config object from json config file
			xhr(file, {
				handleAs : "json"
			}).then(function(data) {
//				console.log(data);
				callback(data);
			}, function(err) {
				console.error(err);
			}, function(evt) {
//				console.log(evt);
			});
		}
	}
});