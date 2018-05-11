// jQuery SWFObject v1.1.1 MIT/GPL @jon_neal
// http://jquery.thewikies.com/swfobject
(function(f,h,i){function k(a,c){var b=(a[0]||0)-(c[0]||0);return b>0||!b&&a.length>0&&k(a.slice(1),c.slice(1))}function l(a){if(typeof a!=g)return a;var c=[],b="";for(var d in a){b=typeof a[d]==g?l(a[d]):[d,m?encodeURI(a[d]):a[d]].join("=");c.push(b)}return c.join("&")}function n(a){var c=[];for(var b in a)a[b]&&c.push([b,'="',a[b],'"'].join(""));return c.join(" ")}function o(a){var c=[];for(var b in a)c.push(['<param name="',b,'" value="',l(a[b]),'" />'].join(""));return c.join("")}var g="object",m=true;try{var j=i.description||function(){return(new i("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")}()}catch(p){j="Unavailable"}var e=j.match(/\d+/g)||[0];f[h]={available:e[0]>0,activeX:i&&!i.name,version:{original:j,array:e,string:e.join("."),major:parseInt(e[0],10)||0,minor:parseInt(e[1],10)||0,release:parseInt(e[2],10)||0},hasVersion:function(a){a=/string|number/.test(typeof a)?a.toString().split("."):/object/.test(typeof a)?[a.major,a.minor]:a||[0,0];return k(e,a)},encodeParams:true,expressInstall:"expressInstall.swf",expressInstallIsActive:false,create:function(a){if(!a.swf||this.expressInstallIsActive||!this.available&&!a.hasVersionFail)return false;if(!this.hasVersion(a.hasVersion||1)){this.expressInstallIsActive=true;if(typeof a.hasVersionFail=="function")if(!a.hasVersionFail.apply(a))return false;a={swf:a.expressInstall||this.expressInstall,height:137,width:214,flashvars:{MMredirectURL:location.href,MMplayerType:this.activeX?"ActiveX":"PlugIn",MMdoctitle:document.title.slice(0,47)+" - Flash Player Installation"}}}attrs={data:a.swf,type:"application/x-shockwave-flash",id:a.id||"flash_"+Math.floor(Math.random()*999999999),width:a.width||320,height:a.height||180,style:a.style||""};m=typeof a.useEncode!=="undefined"?a.useEncode:this.encodeParams;a.movie=a.swf;a.wmode=a.wmode||"opaque";delete a.fallback;delete a.hasVersion;delete a.hasVersionFail;delete a.height;delete a.id;delete a.swf;delete a.useEncode;delete a.width;var c=document.createElement("div");c.innerHTML=["<object ",n(attrs),">",o(a),"</object>"].join("");return c.firstChild}};f.fn[h]=function(a){var c=this.find(g).andSelf().filter(g);/string|object/.test(typeof a)&&this.each(function(){var b=f(this),d;a=typeof a==g?a:{swf:a};a.fallback=this;if(d=f[h].create(a)){b.children().remove();b.html(d)}});typeof a=="function"&&c.each(function(){var b=this;b.jsInteractionTimeoutMs=b.jsInteractionTimeoutMs||0;if(b.jsInteractionTimeoutMs<660)b.clientWidth||b.clientHeight?a.call(b):setTimeout(function(){f(b)[h](a)},b.jsInteractionTimeoutMs+66)});return c}})(jQuery,"flash",navigator.plugins["Shockwave Flash"]||window.ActiveXObject);





var COOPER = {

	// dynamic lead
	dlCurrSlide: 0,
	dlTotalSlides: 0,
	dlSlideWidth: 800,
	dlSideOpacity: .5,
	dlTimer: -1,
	
	// default background image pool
	defaultBackgrounds: ['/sites/all/themes/cooper/assets/images/backgrounds/bg1.jpg'],
	
	// gallery slideshow
	galleryCurrent: 0,
	galleryCurrentPage: 0,
	galleryTotalPages: 0,
	gallerySlideWidth: 182,
	
	// history slideshow
	historyCurrentSlide: 0,
	historyTotalSlides: 0,
	historySlideWidth: 1001,
	
	// main nav
	mainNavClosing: false,
	mainNavDelay: 250,
	
	// events by month filters
	evMoFilters: ['art', 'eng', 'arch', 'hss', 'gen'],
	evMoCurrentFilters: [false, false, false, false, false],
	
	// all news filters
	allNewsFilters: ['art', 'eng', 'arch', 'hss', 'gen'],
	allNewsCurrentFilters: [false, false, false, false, false],
	allNewsCurrentTags: [],
	allNewsCurrentYear: 0,
	allNewsCurrentMonth: 0,
	
	// photo sliders
	pSliderArray: [],
	pSliderTotalArray: [],
	pSliderCurrentArray: [],
	pSliderTimerArray: [],
	pSliderImageWidth: 565,
	
	// calendar
	calCurrentDay: 0,
	calTotalDays: 0,
	calDaysPerPage: 3,
	calColWidth: 266,
	calDaysPerLoad: 3,

	// all page initializations
	init: function() {
		
		this.initPageHeader();
		this.initBackground();
		this.initSearch();
		this.initMainNav();
		this.initDynamicLead();
		this.initBelt();
		this.initGallery();
		this.initHistory();
		this.initUpcomingEvents();
		this.initEventsByMonth();
		this.initAllNews();
		this.initCourseListings();
		this.initPhotoSliders();
		this.initStudentGalleryImages();
		this.initCalendar();
		this.initAddToCalendar();
		this.initLogo();
		
		$.address.change(this.addressChangeHandler);
		
	},
	
	
	/*
	* PAGE HEADER
	*/
	initPageHeader: function() {
		
		var lineHeight = 69;
		
		var header = $('#main article').children('h1');
		
		// if header is taller than a single line height, make it smaller
		if (header.hasClass('large') && !header.hasClass('override')) {
			if (header.height() > lineHeight)
				header.removeClass('large');
		}
		
	},
	
	
	/*
	* DEEP LINK
	*/
	addressChangeHandler: function() {

		var tokens = $.address.pathNames();

		switch(tokens[0]) {
			case 'gallery':
				COOPER.showGallery(tokens[1], tokens[2]);
				break;
			default:
				break;
		}
		
	},
	
	
	/*
	* BELT
	*/
	// add mouseovers to belt items
	initBelt: function() {
		$('#belt .item').each(function(index) {
			$(this).mouseover(function() {
				$(this).addClass('hover');
			});
			$(this).mouseout(function() {
				$(this).removeClass('hover');
			});
		});
	},
	
	
	/*
	* SEARCH
	*/
	// handle clearing and setting of default text in search box
	initSearch: function() {
		var defaultText = "SEARCH";
		
		$("#search").focus(function() {
			if ($(this).attr('value') == defaultText)
				$(this).attr('value', '');
		});
		$("#search").blur(function() {
			if ($(this).attr('value') == '')
				$(this).attr('value', defaultText);
		});
	},
	

	/*
	* MAIN NAV
	*/
	initMainNav: function() {
	
		// add rollover to each nav item
		$('#mainnav .main a').each(function(index) {
			$(this).mouseover(function() {
				$(this).addClass('hover');
				COOPER.mainNavClosing = false;
				COOPER.showMainMenu(index);
			});
			$(this).mouseout(function() {
				COOPER.mainNavClosing = true;
				setTimeout(COOPER.hideAllMainMenus, COOPER.mainNavDelay);
			});
		});
		
		// add rollover to each menu
		$('#mainnav .menu').each(function(index) {
			$(this).mouseover(function() {
				COOPER.mainNavClosing = false;
			});
			$(this).mouseout(function() {
				COOPER.mainNavClosing = true;
				setTimeout(COOPER.hideAllMainMenus, COOPER.mainNavDelay);
			});
		});

	},
	
	// show a menu
	showMainMenu: function(id) {

		// hide all other menus
		this.hideMainMenus(id);
		
		// show menu
		$('#mainnav #menu' + id).show();
	
	},
	
	// hide all menus except for the exclusion id
	hideMainMenus: function(exclusion) {

		// hide all menus unless it is excluded
		$('#mainnav .menu').each(function(index) {
			if (exclusion != index)
				$(this).hide();
		});
		
		// remove all hover classes unless excluded
		$('#mainnav .main a').each(function(index) {
			if (exclusion != index)
				$(this).removeClass('hover');
		});
		
	},
	
	// close all menus, called on mouseout
	hideAllMainMenus: function() {
	
		if (COOPER.mainNavClosing)
			COOPER.hideMainMenus();

	},
	
	
	/*
	* DYNAMIC LEAD
	*/
	// position dl slides and slide shift function of arrows
	initDynamicLead: function() {
		
		// if #dl exists
		if ($('#dl').length) {

			// slide positions
			$('#dl .slide').each(function(index) {
				$(this).css('left', (COOPER.dlSlideWidth * index));
				if (index > 0)
					$(this).css('opacity', COOPER.dlSideOpacity);
			});
			
			// count
			this.dlCurrSlide = 0;
			this.dlTotalSlides = $('#dl .slide').length;
			$('#dl .count .total').html(this.dlTotalSlides);
			
			// next arrow
			$('#dl .next').css('cursor', 'pointer');
			$('#dl .next').click(function() {
				COOPER.dlStopTimer();
				COOPER.updateDLSlide(1);
			});
			
			// prev arrow
			$('#dl .prev').css('cursor', 'pointer');
			$('#dl .prev').click(function() {
				COOPER.dlStopTimer();
				COOPER.updateDLSlide(-1);
			});
			
			this.updateDLSlide(0);

			// display dl
			$('#dl').show();
			
			// start timer
			this.dlStartTimer();
	
		}
		
	},
	
	// start the autorotate timer
	dlStartTimer: function() {
		this.dlTimer = setInterval(COOPER.dlNextSlide, 15000);
	},
	
	// stop the autorotate timer
	dlStopTimer: function() {
		clearTimeout(this.dlTimer);
	},
	
	// autorotate to the next slide
	dlNextSlide: function() {
		COOPER.updateDLSlide(1);
	},
	
	// update the DL when a slide is changed
	updateDLSlide: function(delta) {
		this.dlCurrSlide += delta;
		if (this.dlCurrSlide < 0)
			this.dlCurrSlide = this.dlTotalSlides - 1;
		if (this.dlCurrSlide >= this.dlTotalSlides)
			this.dlCurrSlide = 0;
			
		// shift slides
		$('#dl .slide').each(function(index) {
			$(this).stop();
			$(this).animate({left:(COOPER.dlSlideWidth * (index - COOPER.dlCurrSlide))}, 1000, function() {
				// complete
				if (index == COOPER.dlCurrSlide)
					$(this).animate({opacity:1}, 250, function() {});
				else
					$(this).css('opacity', COOPER.dlSideOpacity);
			});
		});
		
		// update current number
		$('#dl .count .curr').html(this.dlCurrSlide + 1);
	},
	
	// load the page background randomly from a pool of images
	initBackground: function() {
		var bgArray;
		
		// determine which pool to use
		if (window['backgroundPool'])
			bgArray = window['backgroundPool'];
		else
			bgArray = this.defaultBackgrounds;

		var randomIndex = Math.floor(Math.random() * bgArray.length);
		var bg = bgArray[randomIndex];
		
		$('body').css('background-image', 'url(' + bg + ')')
	},
	
	
	/*
	* GALLERIES
	*/
	// init gallery widget
	initGallery: function() {
	
		if ($('#galleries').length ) {
	
			// gallery index
			if ($('#galleries .index').length) {
				$('#galleries .index li').each(function(index) {
					$(this).css('cursor', 'pointer');
					$(this).click(function() {
						COOPER.showGallery(index);
					});
				});
			}
			
			// back button
			if ($('#galleries .back').length) {
				$('#galleries .back').css('cursor', 'pointer');
				$('#galleries .back').mouseover(function() {
					$(this).addClass('hover');
				});
				$('#galleries .back').mouseout(function() {
					$(this).removeClass('hover');
				});
				$('#galleries .back').click(function() {
					COOPER.hideGallery();
				});
			}
			
			// next/prev buttons
			$('#galleries .nav .next').css('cursor', 'pointer');
			$('#galleries .nav .next').click(function() {
				COOPER.updateGallerySlide(1);
			});
	
			$('#galleries .nav .prev').css('cursor', 'pointer');
			$('#galleries .nav .prev').click(function() {
				COOPER.updateGallerySlide(-1);
			});
			
			// loading overlay
			$('#galleries .loading').css('height', $('#galleries .container').css('height'));
			$('#galleries .loading p').css('height', $('#galleries .container').css('height'));
			
		}
		
	},
	
	// hide all galleries
	hideAllGalleries: function() {
	
		// hide each gallery
		$('#galleries .gallery').each(function(index) {
			$(this).hide();
		});
		
		this.hideGalleryNav();
		this.hideGalleryBack();
	
	},
	
	// try to display a single gallery
	
	
	// display a single gallery
	showGallery: function(id, image) {
		this.galleryCurrent = id;
	
		this.hideAllGalleries();
		this.hideGalleryIndex();
		this.showGalleryBack();
		
		// position the slides next to each other
		$('#galleries #gallery' + id + ' li').each(function(index) {
			$(this).css('left', (index * COOPER.gallerySlideWidth));
		});
		
		// reset slideshow x pos
		$('#galleries #gallery' + id + ' ul').css('left', 0);

		$('#galleries #gallery' + id).show();
		
		// fancybox each image
		$('#galleries #gallery' + id + ' .slideshow a').each(function(index) {
			$(this).fancybox({
				padding: 0,
				overlayColor: '#000',
				overlayOpacity: .85,
				titlePosition: 'inside',
				onStart: COOPER.onGalleryImageStart,
				onClosed: COOPER.onGalleryImageClosed
			});
/*
			// if deep linked to image, show it
			if (image != undefined && image == index) {
				$(this).trigger('click');
			}
*/
		});
		
		// handle gallery nav
		this.showGalleryNav($('#galleries #gallery' + id + ' .slideshow'));
		
		// deep link
/*
		if (image != undefined)
			$.address.value('gallery/' + id + '/' + image);
		else
*/
			$.address.value('gallery/' + id);
	},
	
	onGalleryImageStart: function(foo, id) {
	
/* 		$.address.value('gallery/' + COOPER.galleryCurrent + '/' + id); */
		
	},
	
	onGalleryImageClosed: function() {

/* 		$.address.value('gallery/' + COOPER.galleryCurrent); */

	},
	
	hideGallery: function() {
		this.showGalleryIndex();
		this.hideGalleryBack();
		
		$('#galleries .gallery').each(function(index) {
			$(this).hide();
		});

		this.hideGalleryNav();
		
		// drop deep link
		$.address.value('list');
	},
	
	showGalleryIndex: function() {
		$('#galleries .index').show();
	},
	
	hideGalleryIndex: function() {
		$('#galleries .index').hide();
	},

	showGalleryBack: function() {
		$('#galleries .back').show();
	},

	hideGalleryBack: function() {
		$('#galleries .back').hide();
	},
	
	showGalleryNav: function(slideshow) {
		// only show the nav if slideshow has more than 3 images
		this.galleryTotalPages = Math.ceil(slideshow.children('ul').children('li').length / 3);
		
		$('#galleries #gallery' + this.galleryCurrent + ' .slideshow ul').css('width', this.galleryTotalPages * 3 * this.gallerySlideWidth);
		
		if (this.galleryTotalPages > 1) {
			// position nav to slideshow
			$('#galleries .nav').css('top', slideshow.position().top);
			
			// init the nav
			this.galleryCurrentPage = 0;
			this.updateGalleryNav();

			// show the nav
			$('#galleries .nav').show();
		}
	},

	hideGalleryNav: function() {
		$('#galleries .nav').hide();
	},
	
	// update the DL when a slide is changed
	updateGallerySlide: function(delta) {
		this.galleryCurrentPage += delta;
		if (this.galleryCurrentPage < 0)
			this.galleryCurrentPage = this.galleryTotalPages - 1;
		if (this.galleryCurrentPage >= this.galleryTotalPages)
			this.galleryCurrentPage = 0;
			
		$('#gallery' + this.galleryCurrent + ' .slideshow ul').each(function(index) {
			$(this).stop();
			$(this).animate({left:(COOPER.gallerySlideWidth * 3 * (index - COOPER.galleryCurrentPage))}, 500, function() {
				// complete
			});
		});
		
		// update current number
		$('#galleries .count .curr').html(this.galleryCurrentPage + 1);
	},
	
	updateGalleryNav: function() {
		$('#galleries .nav .curr').html(this.galleryCurrentPage + 1);
		$('#galleries .nav .total').html(this.galleryTotalPages);
	},
	
	/*
	* HISTORY
	*/
	initHistory: function() {
	
		if ($('#history').length) {
		
			// counts
			this.historyCurrentSlide = 0;
			this.historyTotalSlides = $('#history li').length;
			
			// make width of ul total width of all slides
			$('#history ul').css('width', this.historyTotalSlides * this.historySlideWidth);
			
			// position history slides horizontally
			$('#history li').each(function(index) {
				$(this).css('left', index * COOPER.historySlideWidth);
			});
			
			// slide images
			$('#history .images img').each(function(index) {
				if (index > 0)
					$(this).css('bottom', -170);
			});
		
			// arrows
			$('#history .left').css('cursor', 'pointer');
			$('#history .left').click(function() {
				COOPER.updateHistorySlide(-1);
			});

			$('#history .right').css('cursor', 'pointer');
			$('#history .right').click(function() {
				COOPER.updateHistorySlide(1);
			});
		
		}
		
	},

	// update the history when a slide is changed
	updateHistorySlide: function(delta) {
	
		this.historyCurrentSlide += delta;
		if (this.historyCurrentSlide < 0)
			this.historyCurrentSlide = this.historyTotalSlides - 1;
		if (this.historyCurrentSlide >= this.historyTotalSlides)
			this.historyCurrentSlide = 0;
			
		var curr = this.historyCurrentSlide;
	
		$('#history ul').stop();
		$('#history ul').animate({left:(COOPER.historySlideWidth * COOPER.historyCurrentSlide * -1)}, 500, function() {
			// complete
			$('#history .images img').each(function(index) {
				if (index == curr)
					$(this).animate({bottom:0}, 250);
				else
					$(this).animate({bottom:-170}, 250);
			});
		});
		
	},
	
	/*
	* UPCOMING EVENTS
	*/
	initUpcomingEvents: function() {

		$('#upcoming-events li').each(function(index) {
			$(this).mouseover(function() {
				$(this).addClass('hover');
			});
			$(this).mouseout(function() {
				$(this).removeClass('hover');
			});
		});

	},
	
	/*
	* EVENTS BY MONTH FILTERS
	*/
	initEventsByMonth: function() {
		
		if ($('#events-month').length) {
		
			// activate each filter button
			$('#events-month .filters li').each(function(index) {
				if ($(this).children('a').length) {
					$($(this).children('a')[0]).attr('href', 'javascript:COOPER.evMoToggleFilter(' + (index - 2) + ')');
				}
				if ($(this).hasClass('active')) COOPER.evMoToggleFilter(index - 2);
			});

		}
		
	},
	
	evMoToggleFilter: function(id) {
	
		var allNews = false;
		var tagArray = [];
	
		if (id < 0) {
			// always toggle on all news
			for (var i = 0; i < this.evMoCurrentFilters.length; i++ )
				this.evMoCurrentFilters[i] = false;
			allNews = true;
		} else {
			// toggle specified filter
			this.evMoCurrentFilters[id] = !this.evMoCurrentFilters[id];

			// check if all filters are false
			allNews = true;
			for (var i = 0; i < this.evMoCurrentFilters.length; i++ ) {
				if (this.evMoCurrentFilters[i])
					allNews = false;
			}
		}
		
		// toggle on/off each checkbox
		if (allNews) {
			// toggle allnews on and all others off
			$('#events-month .filters li').each(function(index) {
				if ($(this).hasClass('all'))
					$(this).addClass('active');
				else
					$(this).removeClass('active');
			});
			
			// show all days
			$('#events-month .day').each(function(index) {
				$(this).show();
			});

			// show all events
			$('#events-month .day li').each(function(index) {
				$(this).show();
			});
		} else {
			// toggle allnews off and selected others on
			$('#events-month .filters li').each(function(index) {
				if ($(this).hasClass('all'))
					$(this).removeClass('active');
				else {
					if (COOPER.evMoCurrentFilters[index - 2]) {
						$(this).addClass('active');
						tagArray.push('tag-' + COOPER.evMoFilters[index - 2]);
					} else {
						$(this).removeClass('active');
					}
				}
			});
			
			// hide all events
			$('#events-month .day li').each(function(index) {
				$(this).hide();
			});
			
			// show all days
			$('#events-month .day').each(function(index) {
				$(this).show();
			});
			
			// show only filtered events
			$('#events-month .day li').each(function(index) {
				for (var i = 0; i < tagArray.length; i++) {
					if ($(this).hasClass(tagArray[i])) {
						$(this).show();
						break;
					}
				}
			});
			
			// clean up days that don't have any filtered events
			$('#events-month .day').each(function(index) {
				var li = $(this).find('li');
				var count = 0;
				$(li).each(function(index) {
					if ($(this).css('display') != 'none')
						count++;
				});
				
				// if no events visible, hide the entire day
				if (count == 0)
					$(this).hide();
			});
			
		}
		
	},
	
	
	/*
	* ALL NEWS FILTERS
	*/
	initAllNews: function() {
		
		if ($('#all-news').length) {
		
			// activate each filter button
			$('#all-news .filters li').each(function(index) {
				if ($(this).children('a').length) {
					$($(this).children('a')[0]).attr('href', 'javascript:COOPER.allNewsToggleFilter(' + (index - 2) + ')');
				}
			});
			
			// get current year
			$('#all-news .years li').each(function(index) {
				if ($(this).hasClass('active')) {
					if ($(this).html() == "NOW")
						COOPER.allNewsCurrentYear = parseInt($(this).next().children('a').html()) + 1;
					else
						COOPER.allNewsCurrentYear = parseInt($(this).html());
					return;
				}
			});
			
			// get current month
			this.allNewsCurrentMonth = window.allNewsLastMonth;
			
			// activate more link (async load more news)
			$('#all-news .more a').attr('href', 'javascript:COOPER.allNewsLoadMore()');
			
		}
		
	},
	
	allNewsToggleFilter: function(id) {
	
		var allNews = false;
		
		// reset tag array
		COOPER.allNewsCurrentTags = [];
	
		if (id < 0) {
			// always toggle on all news
			for (var i = 0; i < this.allNewsCurrentFilters.length; i++ )
				this.allNewsCurrentFilters[i] = false;
			allNews = true;
		} else {
			// toggle specified filter
			this.allNewsCurrentFilters[id] = !this.allNewsCurrentFilters[id];

			// check if all filters are false
			allNews = true;
			for (var i = 0; i < this.allNewsCurrentFilters.length; i++ ) {
				if (this.allNewsCurrentFilters[i])
					allNews = false;
			}
		}
		
		// toggle on/off each checkbox
		if (allNews) {
			// toggle allnews on and all others off
			$('#all-news .filters li').each(function(index) {
				if ($(this).hasClass('all'))
					$(this).addClass('active');
				else
					$(this).removeClass('active');
			});
			
			// show all months
			$('#all-news .month').each(function(index) {
				$(this).show();
			});

			// show all events
			$('#all-news .month dt').each(function(index) {
				$(this).show();
				$(this).next().show();
			});
		} else {
			// toggle allnews off and selected others on
			$('#all-news .filters li').each(function(index) {
				if ($(this).hasClass('all'))
					$(this).removeClass('active');
				else {
					if (COOPER.allNewsCurrentFilters[index - 2]) {
						$(this).addClass('active');
						COOPER.allNewsCurrentTags.push('tag-' + COOPER.allNewsFilters[index - 2]);
					} else {
						$(this).removeClass('active');
					}
				}
			});
			
			this.allNewsApplyFilters();
		}
		
	},
	
	// apply filters
	allNewsApplyFilters: function() {
	
		if (!COOPER.allNewsCurrentTags.length)
			return;
	
		// hide all events
		$('#all-news .month dt').each(function(index) {
			$(this).hide();
			$(this).next().hide();
		});
		
		// show all months
		$('#all-news .month').each(function(index) {
			$(this).show();
		});
		
		// show only filtered events
		$('#all-news .month dt').each(function(index) {
			for (var i = 0; i < COOPER.allNewsCurrentTags.length; i++) {
				if ($(this).hasClass(COOPER.allNewsCurrentTags[i])) {
					$(this).show();
					$(this).next().show();
					break;
				}
			}
		});
		
		// clean up months that don't have any filtered events
		$('#all-news .month').each(function(index) {
			var li = $(this).find('dt');
			var count = 0;
			$(li).each(function(index) {
				if ($(this).css('display') != 'none')
					count++;
			});
			
			// if no events visible, hide the entire day
			if (count == 0)
				$(this).hide();
		});

	},
	
	// ajax load more news items
	allNewsLoadMore: function() {
	
		this.allNewsCurrentMonth--;
		
		// hide link, show loading
		$('#all-news .more').hide();
		$('#all-news .loading').show();

		if (this.allNewsCurrentMonth >= 0) {
			var url = "all_news_" + this.allNewsCurrentYear + "_" + this.allNewsCurrentMonth + ".html";
				
			// load the data
			$.get(url, function(data) {
				// remove loading
				$('#all-news .loading').hide();
				
				// insert the new data
				var newData = $('#all-news .months').append(data);
				
				// reapply current filters
				COOPER.allNewsApplyFilters();
				
				// show link again only if not yet at january
				if (COOPER.allNewsCurrentMonth > 0)
					$('#all-news .more').show();
			});
		}

	},
	
	
	/* COURSE LISTINGS */
	initCourseListings: function() {
		
		if ($('#course-listings').length) {
			$('#course-listings li h3').each(function(index) {
				$(this).css('cursor', 'pointer');
				$(this).click(COOPER.toggleCourseListing);
			});
			$('#course-listings li h4').each(function(index) {
				$(this).css('cursor', 'pointer');
				$(this).click(COOPER.toggleCourseListing);
			});
		}
		
	},
	
	toggleCourseListing: function() {
	
		$(this).parent().toggleClass('open');
	
	},
	
	/* PHOTO SLIDERS */
	initPhotoSliders: function() {
	
		$('.photo-slider').each(function(index) {
			COOPER.initOnePhotoSlider(this);
		});
		
	},
	
	initOnePhotoSlider: function(slider) {
	
		// count the images
		imageCount = $(slider).find('img').length;
		
		// init position of images
		$(slider).find('img').each(function(index) {
			$(this).css('left', COOPER.pSliderImageWidth * index);
		});
		
		// only interactive if more than one image
		if (imageCount <= 1)
			return;
		
		// add to arrays
		var index = this.pSliderArray.length;
		this.pSliderArray.push(slider);
		this.pSliderTotalArray.push(imageCount);
		this.pSliderCurrentArray.push(0);
		this.pSliderTimerArray.push(-1);
		
		// enable arrow buttons
		$(slider).find('.next-arrow').show().attr('href', 'javascript:void()').click(function() {
			COOPER.pSliderStopTimer(index);
			COOPER.pSliderUpdate(index, 1)
		});
		$(slider).find('.prev-arrow').show().attr('href', 'javascript:void()').click(function() {
			COOPER.pSliderStopTimer(index);
			COOPER.pSliderUpdate(index, -1)
		});
		
		// hide arrows
		//this.pSliderHideArrows(slider, true);
		
		// arrow show/hide
		//$(slider).mouseover(function() {
			//COOPER.pSliderShowArrows(slider);
		//});
		//$(slider).mouseout(function() {
			//COOPER.pSliderHideArrows(slider, false);
		//});
		
		// start timer
		this.pSliderStartTimer(index);
		
	},
	
	pSliderHideArrows: function(slider, instant) {
		if (instant) {
			$(slider).find('.next-arrow').hide();
			$(slider).find('.prev-arrow').hide();
		} else {
			$(slider).find('.next-arrow').hide();
			$(slider).find('.prev-arrow').hide();
		}
	},
	
	pSliderShowArrows: function(slider) {
			$(slider).find('.next-arrow').show();
			$(slider).find('.prev-arrow').show();
	},
	
	// start the autorotate timer
	pSliderStartTimer: function(index) {
		this.pSliderTimerArray[index] = setInterval(function() { COOPER.pSliderUpdate(index, 1); }, 12000);
	},
	
	// stop the autorotate timer
	pSliderStopTimer: function(index) {
		clearTimeout(this.pSliderTimerArray[index]);
	},
	
	pSliderUpdate: function(sliderId, delta) {
	
		var slider = this.pSliderArray[sliderId];
		var curr = this.pSliderCurrentArray[sliderId];
		var total = this.pSliderTotalArray[sliderId];
		var caption = $(slider).find('.caption');

		// update current slide
		curr += delta;
		if (curr >= total)
			curr = 0;
		if (curr < 0)
			curr = total - 1;
		
		// update each slide
		$(slider).find('img').each(function(index) {
			// update caption
			if (index == curr) {
				$(caption).hide();
				$(caption).html($(this).attr('title'));
				$(caption).fadeIn();
			}
			
			// animate into place
			$(this).stop();
			$(this).animate({left:((index - curr) * COOPER.pSliderImageWidth)});
		});

		// store current slide
		this.pSliderCurrentArray[sliderId] = curr;
	
	},
	
	
	/* STUDENT GALLERIES */
	initStudentGalleryImages: function() {
		
		// fancybox each image
		$('.student-galleries .slideshow a').each(function(index) {
			$(this).fancybox({
				padding: 0,
				overlayColor: '#000',
				overlayOpacity: .85,
				titlePosition: 'inside',
				onStart: COOPER.onGalleryImageStart,
				onClosed: COOPER.onGalleryImageClosed
			});
		});
		
	},
	
	
	/* CALENDAR */
	initCalendar: function() {
	
		if ($('#calendar').length) {
			this.calCurrentDay = 0;
			this.calCountDays();
		
			this.calUpdateButtons();
		}
		
	},
	
	calCountDays: function() {
		this.calTotalDays = $('#calendar .daycol').length;
	},
	
	calNext: function() {
		this.calCurrentDay += this.calDaysPerPage;
		
		// if moving past loaded days, make dummy daycols
		if (this.calCurrentDay >= this.calTotalDays)
			this.calLoad();
		
		this.calUpdate();
	},
	
	calLoad: function() {
	
		// create container daycol
		for (var i = 0; i < this.calDaysPerPage; i++) {
			$('#calendar .cols').append('<section class="daycol">Loading...</span>');
		}
		
		var url = "events_ajax1.html";
		
		// load the data
		$.get(url, function(data) {
			// remove the dummy cols
			for (var i=0; i < COOPER.calDaysPerPage; i++) {
				$('#calendar .daycol').last().remove();
			}
			
			// insert new data
			$('#calendar .cols').append(data);
			
			// update day count
			COOPER.calCountDays();
			
			// update buttons again
			COOPER.calUpdateButtons();
		});
		
	},
	
	calUpdateButtons: function() {
		
		if (this.calCurrentDay <= 0)
			this.calDisablePrev();
		else
			this.calEnablePrev();
		
		if (this.calCurrentDay >= this.calTotalDays)
			this.calDisableNext();
		else
			this.calEnableNext();
		
	},
	
	calEnableNext: function() {
		$('#calendar .next-arrow').attr('href', 'javascript:COOPER.calNext()');
		$('#calendar .next-arrow').removeClass('disabled');
	},
	
	calEnablePrev: function() {
		$('#calendar .prev-arrow').attr('href', 'javascript:COOPER.calPrev()');
		$('#calendar .prev-arrow').removeClass('disabled');
	},
	
	calDisableNext: function() {
		$('#calendar .next-arrow').attr('href', 'javascript:void');
		$('#calendar .next-arrow').addClass('disabled');
	},
	
	calDisablePrev: function() {
		$('#calendar .prev-arrow').attr('href', 'javascript:void');
		$('#calendar .prev-arrow').addClass('disabled');
	},
	
	calPrev: function() {
		this.calCurrentDay -= this.calDaysPerPage;
		if (this.calCurrentDay <= 0) {
			this.calCurrentDay = 0;
		}

		this.calUpdate();
	},
	
	calUpdate: function() {
	
		this.calUpdateButtons();
	
		var xpos = -1 * this.calCurrentDay * this.calColWidth;
		
		$('#calendar .cols').stop();
		$('#calendar .cols').animate({left:xpos});
	
	},
	
	
	/* ADD TO CALENDAR */
	initAddToCalendar: function() {
	
		if ($('.add-calendar')) {
		
			$('.add-calendar').mouseover(function() {
				$(this).addClass('open');
			});
			$('.add-calendar').mouseout(function() {
				$(this).removeClass('open');
			});
		
		}
	
	},
	
	
	/* LOGO */
	initLogo: function() {
	
		var file = "https://web.archive.org/web/20140519011538/http://cooperunion.biz/_/img/Cooper.swf";
		
		var logo = $('#side .logo h1');
		
		if ($.flash.available && logo.length) {
		
			if ($('body#home').length) {
				// this is home
				$(logo).css('padding', '0');
				$(logo).css('height', '400');
				$(logo).flash({
					swf: file,
					width: 200,
					height: 400,
					bgcolor: '#ffffff',
					align: 'middle'
				});
			} else {
				$(logo).flash({
					// all other pages
					swf: file,
					width: 200,
					height: 200,
					bgcolor: '#ffffff'
				});
			}
		
		}
	
	},
	
	dummy: function() {
	}

};


$(document).ready(function() {
	if (COOPER)
		COOPER.init();
});
