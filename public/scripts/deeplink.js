"use strict";
((options, platform, launchWekitApproach, launchIframeApproach) => {
	// console.log(options);
	if (platform.isApple()) {
		if (
			ua.match(/CriOS/) ||
			(ua.match(/Safari/) && ua.match(/Version\/(9|10|11)/))
		) {
			launchWekitApproach(options.ios, options.fallback);
		} else {
			launchIframeApproach(options.ios, options.fallback);
		}
	} else if (platform.isAndroid()) {
		if (ua.match(/Chrome/)) {
			document.location = '';
		} else if (ua.match(/Firefox/)) {
			launchWekitApproach(urls.deepLink, urls.playStoreLink || urls.fallback);
		} else {
			launchIframeApproach(url, urls.playStoreLink || urls.fallback);
		}
	} else {
		window.location = options.fallback;
	}
})(window._config, {
	isAndroid: function () {
		return /android/i.test(ua);
	},
	isApple: function () {
		return /iPhone|iPad|iPod/i.test(ua);
	}
}, (url, fallback) => {
	console.log(urls)
	window.location = url;

	setTimeout(function () {
		document.location = fallback;
	}, 1000);
}, (url, fallback) => {
	var iframe = document.createElement('iframe');
	iframe.style.border = 'none';
	iframe.style.width = '1px';
	iframe.style.height = '1px';
	iframe.onload = function () {
		document.location = url;
	};
	iframe.src = url;

	window.onload = function () {
		document.body.appendChild(iframe);
		setTimeout(function () {
			window.location = fallback;
		}, 1000);
	};
});