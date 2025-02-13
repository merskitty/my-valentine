// Audio setup

document.addEventListener('DOMContentLoaded', function() {

    const music = document.getElementById('bgMusic');

    

    if (music) {

        music.addEventListener('loadstart', function() {

            const musicControl = document.getElementById('musicControl');

            if (musicControl) {

                musicControl.innerHTML = '<i class="fas fa-spinner fa-spin" style="font-size: 30px; color: #fff; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);"></i>';

            }

        });

        music.addEventListener('canplaythrough', function() {

            const musicControl = document.getElementById('musicControl');

            if (musicControl) {

                if (music.paused) {

                    musicControl.innerHTML = '<i class="fas fa-volume-mute" style="font-size: 30px; color: #fff; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);"></i>';

                } else {

                    musicControl.innerHTML = '<i class="fas fa-volume-up" style="font-size: 30px; color: #fff; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);"></i>';

                }

            }

        });

    }

});




const utils = {
    throttle: (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    },
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};
(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$all = $body.add($header);
		

	// Breakpoints.
		breakpoints({
			xxlarge: [ '1681px',  '1920px' ],
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '1001px',  '1280px' ],
			medium:  [ '737px',   '1000px' ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ]
		});
		
	
// Remove the desktop-only check
// Add classes to images based on their position
$('.gallery-item').each(function(index) {
    if (index % 2 === 0) {
        $(this).addClass('image-left');
    } else {
        $(this).addClass('image-right');
    }
});

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const buffer = 300; // Buffer for earlier animation
    return (
        rect.top >= -buffer &&
        rect.bottom <= (window.innerHeight + buffer)
    );
}

// Handle scroll animation
function handleScroll() {
    $('.image-left, .image-right').each(function() {
        if (isInViewport(this)) {
            $(this).addClass('visible');
        }
    });
}

// Initial check
handleScroll();

// Check on scroll with throttle for better performance
let scrollTimeout;
$(window).on('scroll', function() {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(function() {
            handleScroll();
            scrollTimeout = null;
        }, 10);
    }
});


	// Play initial animations on page load.
		$window.on('load', function() {
			setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');
		else {

			breakpoints.on('<=small', function() {
				$body.addClass('is-touch');
			});

			breakpoints.on('>small', function() {
				$body.removeClass('is-touch');
			});

		}

	// Fix: IE flexbox fix.
		if (browser.name == 'ie') {

			var $main = $('.main.fullscreen'),
				IEResizeTimeout;

			$window
				.on('resize.ie-flexbox-fix', function() {

					clearTimeout(IEResizeTimeout);

					IEResizeTimeout = setTimeout(function() {

						var wh = $window.height();

						$main.each(function() {

							var $this = $(this);

							$this.css('height', '');

							if ($this.height() <= wh)
								$this.css('height', (wh - 50) + 'px');

						});

					});

				})
				.triggerHandler('resize.ie-flexbox-fix');

		}

	// Gallery.
		$window.on('load', function() {

			var $gallery = $('.gallery');

			$gallery.poptrox({
				baseZIndex: 10001,
				useBodyOverflow: false,
				usePopupEasyClose: false,
				overlayColor: '#1f2328',
				overlayOpacity: 0.65,
				usePopupDefaultStyling: false,
				usePopupCaption: true,
				popupLoaderText: '',
				windowMargin: 50,
				usePopupNav: true
			});

			// Hack: Adjust margins when 'small' activates.
				breakpoints.on('>small', function() {
					$gallery.each(function() {
						$(this)[0]._poptrox.windowMargin = 50;
					});
				});

				breakpoints.on('<=small', function() {
					$gallery.each(function() {
						$(this)[0]._poptrox.windowMargin = 5;
					});
				});

		});

	// Section transitions.
		if (browser.canUse('transition')) {

			var on = function() {

				// Galleries.
					$('.gallery')
						.scrollex({
							top:		'30vh',
							bottom:		'30vh',
							delay:		50,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

				// Generic sections.
					$('.main.style1')
						.scrollex({
							mode:		'middle',
							delay:		100,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

					$('.main.style2')
						.scrollex({
							mode:		'middle',
							delay:		100,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

				// Contact.
					$('#contact')
						.scrollex({
							top:		'50%',
							delay:		50,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

			};

			var off = function() {

				// Galleries.
					$('.gallery')
						.unscrollex();

				// Generic sections.
					$('.main.style1')
						.unscrollex();

					$('.main.style2')
						.unscrollex();

				// Contact.
					$('#contact')
						.unscrollex();

			};

			breakpoints.on('<=small', off);
			breakpoints.on('>small', on);

		}

	// Events.
		var resizeTimeout, resizeScrollTimeout;

		$window
			.on('resize', function() {

				// Disable animations/transitions.
					$body.addClass('is-resizing');

				clearTimeout(resizeTimeout);

				resizeTimeout = setTimeout(function() {

					// Update scrolly links.
						$('a[href^="#"]').scrolly({
							speed: 1500,
							offset: $header.outerHeight() - 1
						});

					// Re-enable animations/transitions.
						setTimeout(function() {
							$body.removeClass('is-resizing');
							$window.trigger('scroll');
						}, 0);

				}, 100);

			})
			.on('load', function() {
				$window.trigger('resize');
			});

			
			// Image viewer setup
			$('.image.main').each(function() {
				const img = $(this);
				let currentScale = 1;
				
				// Create Hammer instance
				const hammer = new Hammer(img[0]);
				hammer.get('pinch').set({ enable: true });
				
				// Enable native pinch-zoom
				img.css('touch-action', 'pinch-zoom');
				
				// Double tap to full screen
				hammer.on('doubletap', function(e) {
					// Trigger haptic feedback
					if (window.navigator.vibrate) {
						window.navigator.vibrate(50);
					}
		
					if (!document.fullscreenElement) {
						img[0].requestFullscreen();
						img.addClass('fullscreen');
					} else {
						document.exitFullscreen();
						img.removeClass('fullscreen');
					}
				});
		
				// Handle pinch zoom
				hammer.on('pinchstart', function(e) {
					if (window.navigator.vibrate) {
						window.navigator.vibrate(20);
					}
				});
			});
		
			// Pull to refresh animation
			let touchStart = 0;
			let pullDistance = 0;
			const maxPull = 150;
			const refreshEl = $('<div class="pull-refresh"><span class="loader"></span></div>');
			$('body').prepend(refreshEl);
		
			document.addEventListener('touchstart', function(e) {
				if (window.scrollY === 0) {
					touchStart = e.touches[0].clientY;
				}
			}, { passive: true });
		
			document.addEventListener('touchmove', function(e) {
				if (touchStart && window.scrollY === 0) {
					pullDistance = e.touches[0].clientY - touchStart;
					if (pullDistance > 0 && pullDistance < maxPull) {
						refreshEl.css('transform', `translateY(${pullDistance}px)`);
						e.preventDefault();
					}
				}
			}, { passive: false });
		
			document.addEventListener('touchend', function() {
				if (pullDistance > 0) {
					if (pullDistance > maxPull / 2) {
						// Trigger refresh
						if (window.navigator.vibrate) {
							window.navigator.vibrate([20, 30, 20]);
						}
						refreshEl.addClass('refreshing');
						location.reload();
					} else {
						refreshEl.css('transform', '');
					}
					pullDistance = 0;
					touchStart = 0;
				}
			});


			

})(jQuery);

window.addEventListener('scroll', function() {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        let speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${window.pageYOffset * speed}px)`;
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('#playlist video');
    video.addEventListener('loadeddata', function() {
        console.log('Video loaded successfully');
    });
    video.addEventListener('error', function(e) {
        console.log('Error loading video:', e);
    });
});


document.getElementById('work').classList.add('letter-unlocked');
