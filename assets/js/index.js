$(document).ready(function () {
	// --- Scroll Spy Initialization ---
	// Bootstrap handles this via data attributes on body, but we ensure smooth scrolling
	$('a.nav-link, a.btn-accent[href^="#"]').on("click", function (event) {
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;
			$("html, body").animate(
				{
					scrollTop: $(hash).offset().top - 80, // Offset for fixed navbar
				},
				800,
				function () {
					window.location.hash = hash;
				},
			);
		}
	});

	// --- On-Scroll Animations (Intersection Observer) ---
	const observerOptions = {
		threshold: 0.1,
		rootMargin: "0px 0px -50px 0px",
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("visible");
				// Unobserve after animation to prevent re-triggering
				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);

	$(".fade-up").each(function () {
		observer.observe(this);
	});

	// --- Animated Numbers in Hero Section ---
	let hasAnimated = false;
	const heroSection = document.getElementById("home");

	const numberObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting && !hasAnimated) {
					hasAnimated = true;
					$(".counter").each(function () {
						var $this = $(this);
						var target = parseInt($this.attr("data-target"));

						$({ Counter: 0 }).animate(
							{ Counter: target },
							{
								duration: 2000,
								easing: "swing",
								step: function () {
									$this.text(Math.ceil(this.Counter));
								},
								complete: function () {
									$this.text(target);
								},
							},
						);
					});
				}
			});
		},
		{ threshold: 0.5 },
	);

	if (heroSection) {
		numberObserver.observe(heroSection);
	}

	// --- Active Navbar Link on Scroll ---
	$(window).on("scroll", function () {
		var scrollPos = $(document).scrollTop() + 100;
		$(".navbar-nav .nav-link").each(function () {
			var currLink = $(this);
			var refElement = $(currLink.attr("href"));
			if (
				refElement.length &&
				refElement.position().top <= scrollPos &&
				refElement.position().top + refElement.height() > scrollPos
			) {
				$(".navbar-nav .nav-link").removeClass("active");
				currLink.addClass("active");
			}
		});
	});
});
