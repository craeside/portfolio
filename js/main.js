/*


INDEX

1. splash page
2. smooth scroll


*/

// 1. splash things

function splashFadeOut() {
	document.getElementById("loader").classList.add("fadeOut");
}

function splashRemove() {
	document.getElementById("loader").classList.add("removeMe");
}

function contentFadeIn() {
    var fadeInContent = document.querySelectorAll(".fadePrep");
	var a;

	for (a of fadeInContent) {
		a.classList.remove("fadePrep");
		a.classList.add("fadeIn");
	}

    var workGrid = document.querySelectorAll(".work-grid");
    var b;

    for (b of workGrid) {
      b.classList.add("grid-fade");
    }
}

const firstTime = localStorage.getItem('visited');

if (firstTime == null) {
	window.setInterval(splashFadeOut, 4800);
	window.setInterval(splashRemove, 5250);
	window.setInterval(contentFadeIn, 5250);
	localStorage.setItem('visited', 1)
	}
	else {
		splashRemove();
		contentFadeIn();
	}


// 2. smooth scroll

// created from a stackoverflow thread:
// https://stackoverflow.com/questions/47011055/smooth-vertical-scrolling-on-mouse-wheel-in-vanilla-javascript
// answer from Manuel Otto
// https://stackoverflow.com/users/5323516/manuel-otto

function smoothbb() {
	new smoothScroll(document, 150, 20);
}

function smoothScroll(target, speed, smooth) {
	// cross browser support for document scrolling
	if (target === document) {
		target =
			document.scrollingElement ||
			document.documentElement ||
			document.body.parentNode ||
			document.body;
	};
	var moving = false;
	var pos = target.scrollTop;
	var frame =
		target === document.body && document.documentElement
			? document.documentElement
			: target;

	target.addEventListener("mousewheel", scrolled, { passive: false });
	target.addEventListener("DOMMouseScroll", scrolled, { passive: false });

	function scrolled(e) {
		e.preventDefault(); // disable default scrolling

		var delta = normalizeWheelDelta(e);

		pos += -delta * speed;
		pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight)); // limit scrolling

		if (!moving) update();
	}

	function normalizeWheelDelta(e) {
		if (e.detail) {
			if (e.wheelDelta)
				return e.wheelDelta / e.detail / 40 * (e.detail > 0 ? 1 : -1); // Opera
			else return -e.detail / 3; // Firefox
		} else return e.wheelDelta / 120; // IE,Safari,Chrome
	}

	function update() {
		moving = true;

		var delta = (pos - target.scrollTop) / smooth;

		target.scrollTop += delta;

		if (Math.abs(delta) > 0.5) requestFrame(update);
		else moving = false;
	}

	var requestFrame = (function() {
		// requestAnimationFrame cross browser
		return (
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(func) {
				window.setTimeout(func, 1000 / 50);
			}
		);
	})();
}



