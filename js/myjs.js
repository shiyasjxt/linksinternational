function formatDate(myDate) {
    var monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var myDay = "<span class='rss-item-pubDate-date'>" + myDate.getUTCDate() + "</span> ";
    var myMonth = "<span class='rss-item-pubDate-month'>" + monthList[myDate.getUTCMonth()] + "</span> ";
    var myYear = "<span class='rss-item-pubDate-full-year'>" + myDate.getUTCFullYear() + "</span> ";

    return myDay + "<br>" + myMonth;
}

function formatBlogDate(myDate) {
    var monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var myDay = myDate.getUTCDate();
    var myMonth = monthList[myDate.getUTCMonth()];
    var myYear = myDate.getUTCFullYear();

    return myMonth + " " + myDay + ", " + myYear;
}


// Equal Height	
	$.fn.eqHeights = function(options) {
	
		var defaults = {child: false};  
		var options = $.extend(defaults, options); 
		var el = $(this);
		if (el.length > 0 && !el.data('eqHeights')) {
			$(window).bind('resize.eqHeights', function() {
				el.eqHeights();
			});
			el.data('eqHeights', true);
		}
		if( options.child && options.child.length > 0 ){
			var elmtns = $(options.child, this);
		} else {
			var elmtns = $(this).children();
		}
	
		var prevTop = 0;
		var max_height = 0;
		var elements = [];
		elmtns.height('auto').each(function() {
	
			var thisTop = this.offsetTop;
			if (prevTop > 0 && prevTop != thisTop) {
				$(elements).height(max_height);
				max_height = $(this).height();
				elements = [];
			}
			max_height = Math.max(max_height, $(this).height());
			prevTop = this.offsetTop;
			elements.push(this);
		});
	
		$(elements).height(max_height);
	};


function blog_posts(obj) {
    // do footer
    var footerContainer = $(".foo-qlinks");
    if (footerContainer.length) {
        // add post span
        // $(".section-newsfeed").html("");

        // add date span
        var postDate = new Date(Date.parse(obj[0].date.substr(0, obj[0].date.indexOf(" "))));
        footerContainer.append("<time>" + formatBlogDate(postDate) + "</time>");

        // add title span
        footerContainer.append("<a target='_blank' href='" + obj[0].permalink + "'>" + obj[0].title + "</a>");

        // add description span
        footerContainer.append("<p>" + obj[0].excerpt + "</p>");

    }

    // do homepage 
    // for ( var index = 0; index < 2 || index != 2; ++index )
	// {
		// // add post span
		// $(".home-news").append("<span class='b_blog-post b_blog-post-" + index + "'></span>");
		// // add thumbnail span
		// $(".home-news").children(".b_blog-post-" + index).append("<span class='b_blog-post-thumbnail'><a target='_blank' href='" + obj[index].permalink + "'><img src='" + obj[index].thumbnail + "' /></a></span>");
		// // add title span
		// $(".home-news").children(".b_blog-post-" + index).append("<span class='b_blog-post-title'><a target='_blank' href='" + obj[index].permalink + "'>" + obj[index].title + "</a></span>");
		// // add description span
		// $(".home-news").children(".b_blog-post-" + index).append("<span class='b_blog-post-description'>" + obj[index].excerpt + "</span>");

		// // add date span
		// //             \/make into a date          \/remove the time element, which is after the space
		// var postDate = new Date(Date.parse(obj[index].date.substr(0, obj[index].date.indexOf(" "))));
		// $(".home-news").children(".b_blog-post-" + index).append("<span class='b_blog-post-date'>" + formatDate(postDate) + "</span>");
	// }
}



!(function($) {
    // regular js
 

    $.fn.equalHeights = function() {
        var maxHeight = 0;
        this.each(function() {
            maxHeight = $(this).outerHeight() > maxHeight ? $(this).outerHeight() : maxHeight;
        });
        this.css("min-height", maxHeight);
        this.addClass("equal-heights-enabled");
    }

    $(function(){

        // removes duplicate bootstrap libraries
        $("link[href='//images.jxt.net.au/COMMON/newdash/lib/bootstrap.min.css']").remove();
        $("script[src='//images.jxt.net.au/COMMON/newdash/lib/bootstrap.min.js']").remove();

        var currentPage = window.location.pathname.toLowerCase();

        
        
        if ( -1 != currentPage.indexOf('/zh/') )
        {
        	$("body").addClass("l_chinese");
	        
	        // chinese text replacement
	        $("#search-classification .section-heading").html("分类"); // y u no work???!?!? :(
        	$(".sorting-button a, .sorting-button option[value='']").text("最近的职位分类");
        }
        else 
        {
	        // english text replacements
	        $("#search-classification .section-heading, .classification-title").text("Classification");
        }

        // remove empty li's on the system pages. 
        $("#side-left li:empty").remove();

        // remove empty left side bar
        if ($('#prefix_left-navigation').children().length == 0) {
            $('#prefix_left-navigation').remove();
        }
        if ($('#side-left').children().length == 0) {
            $('#side-left').remove();
        }

        // Page Title
        $('#dynamic-content h1:first, #content-container #content h1:first, h1.CV-Builder-title').prependTo($('.inner-title'));

        /* Adding Bootstrap Classes */
        // Section > Div.container
        $('#dynamic-container, #content-container, #job-dynamic-container').addClass('container');
        $('#dynamic-container, #content-container, #job-dynamic-container').wrapInner('<div class="row"></div>');

        // dynamic side columns column
        $('#dynamic-side-right-container, #side-right').addClass('hidden');

        if (!$("#r_full-width").length) {
            if ($.trim($('#dynamic-side-left-container, #side-left').html()).length) {
	            $('#dynamic-side-left-container, #side-left, #job-side-column').addClass('hidden-xs col-sm-4 col-md-3');
                $('#dynamic-content, #content').addClass('col-xs-12 col-sm-8 col-md-9');
            } else {
                $('#dynamic-content, #content').addClass('col-sm-12 col-md-12');
            }
        } else {
            $('#dynamic-content, #content').addClass('col-sm-12 col-md-12');
            $('#dynamic-side-left-container, #side-left, #job-side-column').addClass('hidden');
        }

        // resizable iframes!
        $('.l_resizable-iframe').iFrameResize();


        // smooth scroll to anchors.
        function scrollToDiv(divID)
		{
			setTimeout(function(){
				var myOffset = 40;
				if ( $(".l_specialisation-menu").length )
				{
					myOffset += $(".l_specialisation-menu").height();
				}
				$("html, body").animate({
					scrollTop: $(divID).offset().top - ( $("#Top-nav-sticky").height() || 0 ) - myOffset
				}, 500);
			}, 500);
		}
        $("a[href^='#']").click(function(e){
        	e.preventDefault();
        	scrollToDiv( $(this).attr("href") );
        });


        // Responsive table
        $('.content-holder table').addClass('table table-bordered');

        // Convert top menu to Boostrap Responsive menu
        $('.navbar .navbar-collapse > ul').addClass('nav navbar-nav');
        $('.navbar .navbar-collapse > ul > li').has('ul').addClass('dropdown');
        $('.navbar .navbar-collapse > ul > li.dropdown > a').addClass('disabled');
        $('.navbar .navbar-collapse > ul > li.dropdown').append('<a id="child-menu"></a>');
        $('.navbar .navbar-collapse > ul > li.dropdown > a#child-menu').append('<b class="caret"></b>').attr('data-toggle', 'dropdown');
        $('.navbar .navbar-collapse > ul > li > ul').addClass('dropdown-menu');

        // add placeholder for search widget text field
        $('#keywords1').attr('placeholder', 'Keywords search');
        $('.l_chinese #keywords1').attr('placeholder', '关键字搜索');

        // add active class to links.
        $("li a[href='" + window.location.pathname.toLowerCase() + "']").parent().addClass("active");
        $("li.active li.active").parent().closest("li.active").removeClass("active");
        $(".nav li li.active").closest(".nav > li").addClass("active");

        // generate select navigation from sidebar Dynamic menu
        $("#dynamic-content").convertNavigation({
            title: "Related Pages",
            links: "#site-topnav .navbar-nav li.active a:not([data-toggle=dropdown])"
        });

        // generate actions button on Job Listing page
        $(".job-navbtns").convertButtons({
            buttonTitle: "Actions&hellip;",
            title: "Please choose&hellip;",
            links: ".job-navbtns a"
        });

        // generate filters button on Job Listing page
        $(".job-navbtns").convertFilters({
            buttonTitle: "Filters&hellip;",
            filteredTitle: "Applied Filters",
            title: "Please choose&hellip;",
            filtered: ".search-query p",
            list: "ul#side-drop-menu",
            excludeFromList: "#AdvancedSearchFilter_PnlCompany"
        });

        if($('.languages select').val() == '31'){
            $('li#memberStatusDashLogin a[href="/member/login.aspx"]').html('login');
            $('li#memberStatusDashRegister a[href="/member/register.aspx"]').html('register');
        }
        /* if ( "/" == $(".inner-left-nav > ul > li > a:first").attr("href") )
        {
	        // left nav. remove siblings in the left nav.
	        var closestLI = $(".inner-left-nav .active").closest(".inner-left-nav > ul > li > ul > li");
	        $(".inner-left-nav > ul > li > ul > li").not( closestLI ).hide();
        } */

        // change placeholders to match salary type
        $("#salaryID, #ctl00_ContentPlaceHolder1_ucJobAlert1_ddlSalary").change(function(){
			changeSalaryPlaceholder();
        });
		$(document).ajaxComplete(function(){
			changeSalaryPlaceholder();
		});
		changeSalaryPlaceholder();
        function changeSalaryPlaceholder()
        {
        	if ( $("#salaryID, #ctl00_ContentPlaceHolder1_ucJobAlert1_ddlSalary").length )
        	{
		        if ( 2 == $("#salaryID, #ctl00_ContentPlaceHolder1_ucJobAlert1_ddlSalary").val() )
		        {
		        	$("#salarylowerband, #ctl00_ContentPlaceHolder1_ucJobAlert1_txtSalaryLowerBand").attr('placeholder', "Enter monthly rate from");
		        	$("#salaryupperband, #ctl00_ContentPlaceHolder1_ucJobAlert1_txtSalaryUpperBand").attr('placeholder', "Enter monthly rate to");
		        }
		        else if ( 3 == $("#salaryID, #ctl00_ContentPlaceHolder1_ucJobAlert1_ddlSalary").val() )
		        {
		        	$("#salarylowerband, #ctl00_ContentPlaceHolder1_ucJobAlert1_txtSalaryLowerBand").attr('placeholder', "");
		        	$("#salaryupperband, #ctl00_ContentPlaceHolder1_ucJobAlert1_txtSalaryUpperBand").attr('placeholder', "");
		        }
		    }
        }

        $(".jxt-premium-job").prepend('<div class="premiumtag">Premium</div>');
        $(".jxt-standout-job").prepend('<div class="standoutTag">Standout</div>');

        // Resize action
        var $window = $(window);
        // Function to handle changes to style classes based on window width
        function checkWidth() {
            if ($window.width() < 992) {
                $('.navbar .navbar-collapse > ul > li.dropdown > a').removeAttr('class');
            }
        }
        // Execute on load
        checkWidth();



        // Home services - carousel
        $('.t-gallery').Gallerycarousel({
            visible: 4,
            speed: 1200,
            easing: 'easeOutExpo',
            itemMinWidth: 250,
            itemMargin: 30,
            autoplay: false
        })
        $('.t-gallery2').Gallerycarousel({
            autoRotate: 2000,
            visible: 4,
            navigation: $(this).data('navigation'),
            easing: 'easeOutExpo',
            itemMinWidth: 250,
            itemMargin: 30
        });

        

        // Latest Jobs widget
        $("#myJobsList.inner ul").includeFeed({
            baseSettings: {
                rssURL: "/job/rss.aspx?search=1&addlocation=1"
            },
            elements: {
                pubDate: formatDate,
                title: 1,
                description: 1
            },
            complete: function() {
                if ($(this).children().length > 2) {
                    $(this).simplyScroll({
                        orientation: 'vertical',
                        frameRate: 60
                    });
                }
            }
        });

        $("#myJobsList.specialisations").children("ul").includeFeed({
            baseSettings: {
                rssURL: "/job/rss.aspx?search=1&addlocation=1"
            },
            elements: {
                pubDate: formatDate,
                title: 1,
                description: 1
            },
            complete: function() {
                // if ($(this).children().length > 2) {
                //     $(this).simplyScroll({
                //         orientation: 'horizontal',
                //         frameRate: 60
                //     });
                // }
            }
        });

        $("#myJobsList").not(".inner").not(".specialisations").children("ul").includeFeed({
            baseSettings: {
                rssURL: "/job/rss.aspx?search=1&addlocation=1"
            },
            elements: {
                pubDate: formatDate,
                title: 1,
                description: 1
            },
            complete: function() {
                if ($(this).children().length > 2) {
                    $(this).simplyScroll({
                        orientation: 'horizontal',
                        frameRate: 60
                    });
                }
            }
        });

        $("#myCandidatesList").children("ul").includeFeed({
            baseSettings: {
                rssURL: "/newsrss.aspx?category=candidates-of-the-month"
            },
            elements: {
                title: 1,
                description: 1
            },
            complete: function() {
            	$(this).children().each(function(){
            		$(this).find('.rss-item-title a').attr('href', '/contact-us');
            	});
                if ($(this).children().length > 3) {
                    $(this).simplyScroll({
                        orientation: 'horizontal',
                        frameRate: 60
                    });
                }
            }
        });

        // meet our consultant
        $(".teamList").each(function() {
            var dataURL = $(this).attr("data-url");
            $(this).includeFeed({
                baseSettings: {
                    rssURL: [dataURL || "/consultantsrss.aspx"],
                    // rssURL: [dataURL || "/ConsultantsRSS.aspx"]
                    limit: 200,
                    addNBSP: false,
                    repeatTag: "consultant"
                },//end of base setting
                templates: {
                    itemTemplate: '<div class="{{Location}} col-md-3 col-sm-6 col-xs-12 l_staff-member"><div>\n\
                    <a class="l_staff-photo" href="/t/{{FriendlyURL}}" title="{{FirstName}} {{LastName}}">\n\
                        <img alt="{{FirstName}} {{LastName}}" src="{{ImageURL}}"></a>\n\
                        <h3>{{FirstName}} {{LastName}}</h3>\n\
                        <h4>{{PositionTitle}}</h4>\n\
                        <h5>{{OfficeLocation}}</h5>\n\
                        <ul class="l_staff-member-icons">\n\
                        <li><a href="mailto:{{Email}}" title="mail us"><i class="fa fa-envelope"><!-- mail --></i></a></li>\n\
                        <li><a href="tel:{{Phone}}" title="call us"><i class="fa fa-phone"><!-- phone --></i></a></li>\n\
                        <li><a href="{{LinkedIn}}" target="_blank" title="linkedin"><i class="fa fa-linkedin"><!-- linkedin --></i></a></li>\n\
                        <ul></div></div>'
                },//end of templates
                complete: function () {
                    if($(this).children().length){
                        $(this).children().each(function(){
                            var officeLocation = $(this).find('h5');
                            if(officeLocation.length < 2){
                                officeLocation.append('&nbsp;');
                            }
                    })}
                     // if( $(this).children().length ){
                     //        $(this).each(function() {
                     //            var teamSec = $(this);
                     //            var title = teamSec.attr('id').replace('-', ' ');
                     //            $(this).prepend('<h2 class="pane-heading">'+ title +'</h2>');
                     //            $('#all').find('#section-'+teamSec.attr('id')).append('<h2 class="pane-heading">'+ title +'</h2>');
                     //            teamSec.find('.col-md-3').clone().appendTo( $('#all.tab-pane').find('#section-'+teamSec.attr('id')));
                     //        });
                     //  }
                    if ($("#l_team-tab-list").length) {
                        $("#l_team-tab-list a").click(function() {
                            $(this).parent().siblings().removeClass("active");
                            $(this).parent().addClass("active");
                            var myLocation = $(this).attr("data-area") || "";
                            if (myLocation) {
                                $(".l_staff-member").not($(".l_staff-member." + myLocation)).hide();
                                $(".l_staff-member." + myLocation).show();
                            } else {
                                $(".l_staff-member").show();
                            }
                        });
                        var myHash = location.hash.substring(1);
                        var locationAnchor = $("a[data-area='" + myHash + "']");
                        if (locationAnchor.length) {
                            locationAnchor.trigger('click');
                        } else {
                            $("#l_team-tab-list li:first-child a").trigger('click');
                        }
                    }
                }// end of complete function
            }); // end of include feed
        }); // end of team list each



        // meet our consultant
        $(".contact-consultant").each(function() {
            var dataURL = $(this).attr("data-url");
            $(this).includeFeed({
                baseSettings: {
                    rssURL: [dataURL || "/consultantsrss.aspx?featured=1"],
                    // rssURL: [dataURL || "/ConsultantsRSS.aspx"]
                    limit: 200,
                    addNBSP: false,
                    repeatTag: "consultant"
                },//end of base setting
                templates: {
                    itemTemplate: '<div class="col-md-3 col-sm-6 contact-image">\n\
                    <h4>{{MetaKeywords}}</h4><figure><img alt="{{FirstName}} {{LastName}}" src="{{ImageURL}}"></figure\n\
                    <figcaption><h5><a href="/t/{{FriendlyURL}}" title="{{FirstName}} {{LastName}}">{{FirstName}} {{LastName}}</a></h5><span>{{PositionTitle}}</span>\n\
                        <p>&nbsp;</p>\n\
                        <a class="btn btn-primary btn-sm contact-btn" href="/t/{{FriendlyURL}}">CONTACT</a></figcaption>\n\
                        </div>'
                },//end of templates
                complete: function () {
                    if($('.languages select').val() == '2'){
                        $(".contact-consultant").children().each(function(){
                            $(this).find('.contact-btn').text('联络');
                        });
                    }
                    if(window.location.pathname.indexOf('/hr-outsourcing') > -1){
                        $(".contact-consultant .contact-image:first-child h4").text('Hong Kong');
                    }
                }// end of complete function
            }); // end of include feed
        }); // end of team list each

        // if there is a hash, scroll down to it. Sticky header covers up top of content.
        if ($(window.location.hash).length) {
        	window.scrollTo(0, 0);
            scrollToDiv(window.location.hash);
        }

        $("#ddlLanguages").selectbox();
        var detch = $(".languages").detach()
        if ($("header").hasClass("inner-lang-box")) {
            $(".inner-language").append(detch);
            $('ul.sbOptions li a[href="31"]').parent().insertBefore($('ul.sbOptions li a[href="17"]').parent());
        } else {
            $(".lan-box").append(detch);
            $('ul.sbOptions li a[href="31"]').parent().insertBefore($('ul.sbOptions li a[href="17"]').parent());
        }

        // meet the team page functionality 
        if ($("#l_team-tab-list").length) {
            $("#l_team-tab-list a").click(function() {
                $(this).parent().siblings().removeClass("active");
                $(this).parent().addClass("active");
                var myLocation = $(this).attr("data-area") || "";
                if (myLocation) {
                    $(".l_staff-member").not($(".l_staff-member." + myLocation)).hide();
                    $(".l_staff-member." + myLocation).show();
                } else {
                    $(".l_staff-member").show();
                }
            });
            var myHash = location.hash.substring(1);
            var locationAnchor = $("a[data-area='" + myHash + "']");
            if (locationAnchor.length) {
                locationAnchor.trigger('click');
            } else {
                $("#l_team-tab-list li:first-child a").trigger('click');
            }
        }

        //specialisations page functionality.
        if ($(".l_specialisation-menu").length) {
            $(".l_specialisation-menu a").click(function(e) {
                e.preventDefault();
                $(this).parent().siblings().show();
                $(this).parent().hide();

                $($(this).attr('href')).siblings().hide();
                $($(this).attr('href')).show();
                // $("html, body").animate({
                // 	scrollTop: $($(this).attr('href')).offset().top - $("#Top-nav-sticky").outerHeight()
                // }, 100);
            });
            var myHash = location.hash.toLowerCase();
            var locationAnchor = $("a[href='" + myHash + "']");
            if (myHash.length && locationAnchor.length) {
                locationAnchor.trigger('click');
            } else {
                $(".l_specialisation-menu li:first-child a").trigger('click');
            }
        }






        var bxslider = $('.slider').bxSlider({
            //         infiniteLoop: true,
            hideControlOnEnd: true,
            pager: true,
            controls: false,
            auto: true,
            //         pagerCustom: '#pager'
        });

        equalhight();

        function equalhight() {
            var $height = 0;
            $(".tree-section").each(function() {
                $(this).css("height", "auto");
                if (($(this).height()) > $height) {
                    $height = $(this).outerHeight();
                }
            });
            $(".tree-section").each(function() {
                $(this).css("height", $height);
            });
        }
        $(".selectbox1").selectbox();
        $('.slider1').bxSlider({
            slideWidth: 200,
            minSlides: 2,
            maxSlides: 3,
            slideMargin: 10,
            auto: true,
            Controls: false,
            pager: false
        });


        var worthOriginalY = $(".worth").length ? $(".worth").offset().top : 0;
        $(window).scroll(function() {
            if ($(window).scrollTop() > 100) {
                $('#Top-nav-sticky').addClass('header-small');
                $("body").addClass("has-small-header");
            } else {
                $('#Top-nav-sticky').removeClass('header-small');
                $("body").removeClass("has-small-header");
            }
            // how much are you worth sticky
            var passedWorthY = $(window).scrollTop() > worthOriginalY;
            if ($(".worth").length) {
                if (passedWorthY) {
                    $(".worth").addClass("fixed");
                } else {
                    $(".worth").removeClass("fixed");
                }
            }
        });
        if (window.ActiveXObject || "ActiveXObject" in window) { // IE Detector
            $('body').addClass('ie-browser');
        }



        $('.scroll-bottom').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                var scrolls
                if ($(window).width() < 768) {
                    scrolls = target.offset().top;
                } else {
                    scrolls = target.offset().top - $("#Top-nav-sticky").height();
                }
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: scrolls
                    }, 1000, function() {
                        if ($(window).width() < 768) {} else {
                            h2 = $('html, body').scrollTop();
                            h1 = target.offset().top - $("#Top-nav-sticky").height();
                            finalH = h1 - h2;
                            if (h2 != h1) {
                                $('html, body').animate({
                                    scrollTop: h1
                                }, 500, function() {

                                });
                            }
                        }
                    });
                    return false;
                }
            }
        });

        // remove your future from all hro pages
        var hroPages = [
            "/hr-outsourcing",
            "/payroll-outsourcing",
            "/visa-applications",
            "/pricing",
            "/other-hr-outsourcing",
            "/hro-partners",
            "/referral-partners",
            "/partners",
            "/secondment-peo-outsourcing"

        ];
        for (var i = 0; i != hroPages.length; ++i) {
            if (-1 != currentPage.indexOf(hroPages[i])) {
                $("li a[href='/your-future'], li a[href='/your-career']").parent().hide();
                
            }

        

        
        }

// Add partners only in HRO pages

 // $(function(){
 //       if (window.location.pathname == "/hr-outsourcing"||window.location.pathname == "/payroll-outsourcing"||window.location.pathname == "/hro-partners"||window.location.pathname == "/referral-partners"||window.location.pathname == "/visa-applications"||window.location.pathname == "/partners"||window.location.pathname == "/other-hr-outsourcing") {
 //              $("li a[href='/partners']").css("display", "block");
 //       } 
 //  });

 // $(function(){

 //    var links = [
 //    "/hr-outsourcing",
 //    "/payroll-outsourcing",
 //    "/visa-applications",
 //    "/pricing",
 //    "/other-hr-outsourcing",
 //    "/hro-partners",
 //    "/referral-partners",
 //    "/partners"
 //    ];
 //       if (links.indexOf("/hr-outsourcing")||links.indexOf("/hr-outsourcing")) {
 //         console.log(window.location.pathname);
 //              $("li a[href='/partners']").css("display", "block");
 //       } 
 //  });

$(function(){   
       var links = window.location.pathname;
       if (links.indexOf("/hr-outsourcing")>-1 || links.indexOf("/payroll-outsourcing")>-1 || links.indexOf("/secondment-peo-outsourcing")>-1 || links.indexOf("/hro-partners")>-1 || links.indexOf("/referral-partners")>-1 || links.indexOf("/visa-applications")>-1 || links.indexOf("/partners")>-1 || links.indexOf("/other-hr-outsourcing")>-1) {
      
              $("li a[href='/partners']").css("display", "block");
       } 

  });





  

  
  //footer part blog
  // if ( $(".foo-qlinks").length )
		// {

		// function getFeed(listSelector, feedURL)
	 //        {
	 //            if ( $(listSelector).length )
	 //            {
	 //                var newsFeed = new google.feeds.Feed(feedURL);
	 //                newsFeed.setResultFormat(google.feeds.Feed.XML_FORMAT);
	 //                newsFeed.load(function(result){
	 //                    if ( !result.error ) 
	 //                    {
	 //                        var items = result.xmlDocument.getElementsByTagName('item');
	 //                        for ( var index = 0; index < items.length && index < 6; ++index )
	 //                        {
	 //                            var item = $(items[index]);
	 //                            $(listSelector).append("<li class='rss-item'><div class='item-wrap'><span class='rss-item-title'><a target='_blank' href='" + item.find('link').text() + "'>" + item.find('title').eq(0).text() + "</a></span></div></li>");
								
	 //                        }
	                        
	 //                    }
	 //                    else
	 //                    {
	 //                        console.log(result.error);
	 //                    }

	 //                });
	 //            }
	 //        }
	 //        google.setOnLoadCallback(getFeed(".foo-qlinks ul", "http://blog.linksinternational.com/blog/rss.xml"));

		// }
  

      //console.log( 'test ' + $("#b_blog-posts-container").length );
		// detect blog posts and load jsonp, populate. see JS section for definition of blog_posts
		// if ( $(".home-news").length )
		// {

		// function getFeed(listSelector, feedURL)
	 //        {
	 //            if ( $(listSelector).length )
	 //            {
	 //                var newsFeed = new google.feeds.Feed(feedURL);
	 //                newsFeed.setResultFormat(google.feeds.Feed.XML_FORMAT);
	 //                newsFeed.load(function(result){
	 //                    if ( !result.error ) 
	 //                    {
	 //                        var items = result.xmlDocument.getElementsByTagName('item');
	 //                        var req_img;
	 //                        for ( var index = 0; index < items.length && index < 6; ++index )
	 //                        {
	 //                            var item = $(items[index]);
								
	 //                            var desc = item.find('description');
	 //                            desc = $(desc.text());
		// 						var fimg = $(desc).find('img').attr('src');
	 //                            //desc.find('img').remove();
	 //                            desc = desc.text().substr(0, desc.text().length - 12);
                                
	 //                            var itemDate = item.find('pubDate').text().substr(5,6);
	 //                            var itemDay = parseInt(itemDate.substr(0,2));
	 //                            var itemMnth = itemDate.substr(3,3);
								
  //                               var fimg_arr = fimg.split(',');
		// 					       for ( var k=0; k<=fimg_arr.length-1; k++ ){
  //                                      var s = fimg_arr[k].substring(fimg_arr[k].length-5);
  //                                      if( parseInt(s) >= 600 ){
  //                                       req_img = fimg_arr[k];
  //                                     req_img = req_img.substr(0, req_img.length - 5);     
  //                                 }
  //                             }
	 //                            //var fimg = $(desc).find('img').attr('src');
	                            
	 //                            $(listSelector).append("<li class='col-md-4 rss-item'><div class='item-wrap'><a target='_blank' href='" + item.find('link').text() + "'><figure style='background-image:url("+ req_img +")'></figure></a><span class='rss-item-title'><a target='_blank' href='" + item.find('link').text() + "'>" + item.find('title').eq(0).text() + "</a></span><div class='rss-item-description'>"+ desc +"</div></div></li>");
		// 						//$(listSelector).append("<li class='col-md-4 rss-item'><div class='item-wrap'><span class='rss-item-title'><a target='_blank' href='" + item.find('link').text() + "'>" + item.find('title').eq(0).text() + "</a></span><span class='rss-item-pubDate'><span class='rss-item-pubDate-date'>"+ itemDay +"</span><span class='rss-item-pubDate-month'>" + itemMnth + "</span></span><div class='rss-item-description'>"+ desc +"</div></div></li>");
	 //                        }
	                        
	 //                        $(listSelector).simplyScroll({
		// 						frameRate: 15,
		// 						customClass: 'vert',
		// 						orientation: 'vertical'
		// 					});
	 //                    }
	 //                    else
	 //                    {
	 //                        console.log(result.error);
	 //                    }
		// 				$('.home-news .rss-item-description').eqHeights();

	 //                });
	 //            }
	 //        }
	 //        // google.setOnLoadCallback(getFeed(".home-news ul", "http://blog.linksinternational.com/blog/rss.xml"));

		// }
		//Blog Post
        if( $(".rssincl-content").length ){
            $('.rssincl-content').bxSlider({
            slideWidth: 400,
            minSlides: 1,
            maxSlides: 2,
            slideMargin: 30,
            auto: true,
            Controls: false,
            pager: false
        });
           /* $(".rssincl-content").simplyScroll({
                frameRate: 15,
                customClass: 'horz',
                orientation: 'horizontal'
            }); */

            $(".rssincl-content .rssincl-entry").each( function(){
                var dateElm = $(this).find(".rssincl-itemdate");
                var dateObj = dateElm.text().split(',');
                var dateDay = dateObj[0].trim().substr(0, dateObj[0].trim().length - 4);
                var dateMonth = dateObj[0].trim().substr(dateObj[0].trim().length - 4);
                
                dateElm.html('<span class="rss-item-pubDate-date">'+ dateDay +'</span><span class="rss-item-pubDate-month">'+ dateMonth +'</span>');
            });
        }
		
        // Resize action
        $(window).on('resize', function() {
            var wi = $(this).width();
            if (wi <= 992) {
                $('.navbar .navbar-collapse > ul > li.dropdown > a').removeAttr('class');
            } else {
                $('.navbar .navbar-collapse > ul > li.dropdown > a').addClass('disabled');
            }
            checkWidth();
            equalhight();
            resizeEqualHeights();
        });
        resizeEqualHeights();

        function resizeEqualHeights() {
            // Equal Height - Usage
            $('.l_staff-member').equalHeights();
            $('.l_specialisation-contact').equalHeights();
            //$('.hr-services-large-box').equalHeights();
            $('.hr-services-small-box').equalHeights();
            $('.news-contain').equalHeights();
            $('.l_home-banner-cta-search').equalHeights();
        }

        // resize banner
        $(window).resize(function() {
            resizeBanner();
        });
        resizeBanner();

        function resizeBanner() {
            if ($("#prefix_banner-container, .hro-video-banner, .full-height-banner").length) {
                $("#prefix_banner-container, .hro-video-banner, .full-height-banner").css('min-height',$(window).height() - $("#Top-nav-sticky").outerHeight());
            }
        }

        // consultant profile, add location to back button.
        var currentURL = window.location.href; 
        if(currentURL.indexOf('/t/') == -1){
            var myLocationHash = $(".l_staff-location").text().toLowerCase().replace(" ", "-");
            $(".l_staff-go-back").attr("href", "#" + myLocationHash );
        }

        if(currentURL.indexOf('links-clients')>-1){
            window.location.replace("http://info.linksinternational.com/links-client-stories-case-studies");            
        }
		
		
		
		$(function() {
    if ( document.location.href.indexOf('/visa-applications') > -1 ) {
       
         
		 $(".page-title").append('<div class="l_home-banner-cta hidden-xs"><h3>Need Visa Processing?</h3>&nbsp;&nbsp;<p><a href="/visa-applications" class="l_generic-button-2">Instant Quote!</a></p></div>');
    
    }
    if(window.location.pathname.indexOf('/t/phoebe-wong') > -1)
        {$('.l_staff-profile-icons').append("<li class='reg-number'>EA Registration No: R1105040</li>");}


    //Thank you page: getting the query string: data from the form
    var qsURL = window.location.href;
    var qsFrom = qsURL.substr( qsURL.indexOf('?')+1 );

    if( qsFrom.length && $('#aspnetForm[action*="/thank-you-"]').length ){
        var qsParams = qsFrom.split('&');
        for ( i=0; i<qsParams.length; i++){
            qsParams[i] = decodeURIComponent(qsParams[i].substr( qsParams[i].indexOf('=')+1));            
        }

        //removing '/' at the last. In chinese url, it will have / at the end of the url
        if ( qsParams[qsParams.length - 1 ].substr( qsParams[qsParams.length - 1 ].length - 1 ) == '/' ){
            qsParams[qsParams.length - 1] =  qsParams[qsParams.length - 1 ].substr( 0, qsParams[qsParams.length - 1 ].length - 1 );   
        }

        //console.log(qsParams);
        var userDataHtml = '<p>Below are your enquiry details:</p>'+
                '<table cellspacing="0" cellpadding="5" border="0" class="tbl-result">'+
                    '<tr><td width="240"><strong>Name :</strong></td><td>'+ qsParams[0] +'</td></tr>'+
                    '<tr><td><strong>Company :</strong></td><td>'+ qsParams[1] +'</td></tr>'+
                    '<tr><td><strong>Phone Number :</strong></td><td>'+ qsParams[2] +'</td></tr>'+
                    '<tr><td><strong>Email Address :</strong></td><td class="tt-none">'+ qsParams[3] +'</td></tr>'+
                    '<tr><td><strong>Location :</strong></td><td>'+ qsParams[4] +'</td></tr>';

        if( $('#aspnetForm[action*="-payroll"]').length ){
            userDataHtml += '<tr><td><strong>Number of employee headcount :</strong></td><td>'+ qsParams[5] +'</td></tr>'+
                '<tr><td><strong>Price :</strong></td><td style="text-transform:uppercase;">'+ qsParams[6] +'</td></tr>';
        }else{ 
            //for visa application
            
            userDataHtml += '<tr><td><strong>What type of visa do you want to apply for? </strong></td><td>'+ qsParams[5] +'</td></tr>';
            if( qsParams[4] == 'Hong Kong' || qsParams[4] == '香港' || qsParams.length > 8 ){
                
                if( qsParams[6] == 1 ){ qsParams[6] = 'Yes'; }else{ qsParams[6] = 'No'; }
                if( qsParams[7] == 1 ){ qsParams[7] = 'Yes'; }else{ qsParams[7] = 'No'; }
                if( qsParams[8] == 1 ){ qsParams[8] = 'Yes'; }else{ qsParams[8] = 'No'; }
                if( qsParams[9] == 1 ){ qsParams[9] = 'Yes'; }else{ qsParams[9] = 'No'; }

                userDataHtml += '<tr><td><strong>Are you a Taiwanese passport holder that requires Multi-Entry Permit (MEP)? </strong></td><td>'+ qsParams[6] + '</td></tr>'+
                    '<tr><td><strong>Does the visa require urgent processing? </strong></td><td>'+ qsParams[7] + '</td></tr>'+
                    '<tr><td><strong>Do you want Links to complete the application form on your behalf? </strong></td><td>'+ qsParams[8] + '</td></tr>'+
                    '<tr><td><strong>Do you have a dual citizenship? </strong></td><td>'+ qsParams[9] + '</td></tr>'+
                    '<tr><td><strong>Price :</strong></td><td style="text-transform:uppercase;">'+ qsParams[10] +'</td></tr>';
            }
        }

        userDataHtml += '</table>';

        $('.dynamic-content-holder').append( $(userDataHtml) ); 
    }           

});

    });
	
	

})(jQuery);
