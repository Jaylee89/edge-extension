(function() {
	var __x = {}
	__x.xpath = function(path) {
		return document.evaluate (
			path,
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null
		);
	}

	ad_ids = ["fd_foot", "lovexin122", "lovexin102", "swtleft", "swtleft", "bottomAD", "bottomAD", "userText"];
	ad_classes = ["suspensionBg", "suspension"];

	function removeAdByIdOrClassAttributes(array, type) {
		array.forEach(function(e){
			var id = $(type + e)
			if(!!id) {
				id.remove()
			} else {
				console.log(e + " is not exist!")
			}
		});
	}

	ad_img_xpath = ["//img[contains(@src,'.gif')]"]

	function removeAdImages(array) {
		array.forEach(function(element){
			var result = __x.xpath(element);
			if(result && result.length == 1) {
				result[0].remove();
			} else if(result && result.length > 1) {
				result.forEach(function(element2){
					if(element2.getAttribute("src").endsWith(".gif")) {
						element2.parentNode.remove();
					}
				});
			}
		});
	}

	setTimeout(function(){
		removeAdByIdOrClassAttributes(ad_ids, "#")
		removeAdByIdOrClassAttributes(ad_classes, ".")
		removeAdImages(ad_img_xpath)
		console.log("internalClock function internal is end");
	}, 3000);
})();