!(function($) {

		$.fn.careerTree = function(options){
			var callingElement = $(this);
			var settings = $.extend({}, options);
			var ctData = {};
			var countryID;
			var industryID;

			var lengthX;
			var lengthY;

			var experienceClass = 'l_ct-experience';
			var experienceHeading = 'Experience';
			var yearClass = 'l_ct-year';
			var mainClass = 'l_ct-main';

			var resultContainerClass = 'l_ct-results';
			var resultGenericClass = 'l_ct-result-generic';
			var resultSalaryClass = 'l_ct-result-salary';
			var resultDescriptionClass = 'l_ct-result-description';
			var resultIndustryClass = 'l_ct-result-industry';
			var resultAreaClass = 'l_ct-result-area';

			var roleContainerClass = 'l_ct-roles';
			var roleClass = 'l_ct-role';
			var roleBackgroundClass = 'l_ct-role-background';
			var areaContainerClass = 'l_ct-areas';
			var areaClass = 'l_ct-area';
			var pointClass = 'l_ct-point';
			var disabledClass = "l_ct-disabled";
			var treeClass = 'l_ct-tree-bg';
			var buttonClass = "l_ct-button";

			var clickLog = [];

			var svgMorpheus;

			init();

			function init()
			{
				// load svg image from img source to inline.
				$("." + treeClass + " img").shapeSvgConvert({
	    			debug: true,
	    			onComplete: function() {
	    				$("." + treeClass + " svg").attr("id", "Career_Tree");
	    				// initiate plugin to do fancyschmancy transitions.
						svgMorpheus = new SVGMorpheus('#Career_Tree');
	    			}
    			});


				// process settings
				if (settings.data)
				{
					// load data if data object was provided.
					ctData = settings.data;
					countryID = settings.countryID;
					industryID = settings.industryID;
					processData();
				}
				else if (settings.url)
				{
					// load the data if the url was provided, then call processData to populate everything.
					loadData(processData);
				}
				else 
				{
					// no data available.
					generateError('No URL was provided in the settings.'); 
				}
			}
			function processData()
			{
				// process everything here.
				// some vars for easy access
				var myCountry = ctData.countries[countryID];
				var myIndustry = myCountry.industries[industryID];
				var myExperience = myIndustry.experience;
				var myAreas = myIndustry.areas;
				var myRoles = myIndustry.roles;

				lengthX = myAreas.length;
				lengthY = myExperience.length;
				
				// create the required html, followed by the data.
				createHTMLSkeleton();
				processIndustry(myIndustry);
				processExperience(myExperience);
				processAreas(myAreas);
				processRoles(myRoles);
				// attach event handler for clicking.
				attachEvents();
			}
			function attachEvents()
			{
				$("." + areaClass + " a").on('click', areaClick);
				$("." + roleClass).on('click', 'a.clickable', roleClick);
			}
			function redrawPaths()
			{
				// if i get this right i will be a fucking boss

				// compile a list of points between which we will draw lines.
				var points = [];
				var activeArea = callingElement.find("." + areaClass + " a.active");
				points.push({
					"left": (activeArea.offset().left + activeArea.outerWidth() / 2), 
					"top": (activeArea.offset().top + activeArea.outerHeight() / 2)
				});
				for (var i = 0; i < clickLog.length; ++i)
				{
					var myRole = $("." + roleClass + " a[data-id='" + clickLog[i] + "']");
					points.push({
						"left": (myRole.offset().left + myRole.outerWidth() / 2), 
						"top": (myRole.offset().top + myRole.outerHeight() / 2)
					});
				}

				// remove all previous points.
				$("." + pointClass).remove();
				// create a template line div.
				var point = $("<div class='" + pointClass + "'></div>");

				// for each point, create a point div.
				// ignore last point, it won't go anywhere
				for ( var i = 0; i+1 != points.length; ++i )
				{
					// place the point correctly in the middle of the anchor.
					var myPoint = point.clone();
					$("body").append(myPoint);
					myPoint.offset(points[i]);

					// calculate the length according to some beret wearing smartypants on the internet.
					var myLength = Math.sqrt(
				        (points[i+1].left - points[i].left) 
				        * (points[i+1].left - points[i].left) 
				        + (points[i+1].top - points[i].top) 
				        * (points[i+1].top - points[i].top)
				    );
					myPoint.height(myLength);

					// trigo-friggen-nometry.
					var angle = 180 / 3.14 * Math.acos((points[i+1].top - points[i].top) / myLength);
					if(points[i+1].left > points[i].left)
					{
					    angle *= -1;
					}
					myPoint
					    .css('-webkit-transform', 'rotate(' + angle + 'deg)')
					    .css('-moz-transform', 'rotate(' + angle + 'deg)')
					    .css('-o-transform', 'rotate(' + angle + 'deg)')
					    .css('-ms-transform', 'rotate(' + angle + 'deg)')
					    .css('transform', 'rotate(' + angle + 'deg)');

					// adjust position of the point to make it centered.
					if ( 180 == Math.floor(angle) )
					{
						myPoint.offset({
							left: myPoint.offset().left + myPoint.width() / 2
						});
					} 
					else if ( 90 == Math.floor(angle) )
					{
						myPoint.offset({
							top: myPoint.offset().top - myPoint.width() / 2
						});
					}
					else if ( -91 == Math.floor(angle) ) // flooring a negative rounds it up
					{
						myPoint.offset({
							top: myPoint.offset().top + myPoint.width() / 2
						});
					}
				}
			}
			function getClickableIDs(roleID)
			{
				// gets a list of IDs that are valid for clicking.
				// It must be above or diagonally above the current active role.
				var validIDs = [];
				var directlyAbove = roleID - lengthX;

				// if there is a row above the clicked anchor, 
				// find which IDs are directly above / diagonal above.
				if (directlyAbove > 0)
				{
					validIDs.push(directlyAbove);
				}
				if ( 1 == roleID % lengthX )
				{
					// we are in left most branch
					validIDs.push(roleID + 1);
					validIDs.push(directlyAbove + 1);
				} 
				else if ( 0 == roleID % lengthX )
				{
					// we are in right most branch
					validIDs.push(roleID - 1);
					validIDs.push(directlyAbove - 1);
				}
				else 
				{
					// we are in the middle
					validIDs.push(roleID + 1);
					validIDs.push(roleID - 1);
					validIDs.push(directlyAbove + 1);
					validIDs.push(directlyAbove - 1);
				}
				return validIDs;
			}
			function setFirstRole(myID)
			{
				// determine which is the first role to select based on roleid.
				var myRoleID = (lengthX * lengthY - lengthX) + myID;
				// remove all active classes and clickables, make first active.
				$("." + roleClass + " a").not( $(this) ).removeClass('active');
				makeRoleActive(myRoleID);
			}
			function makeClickable(activeID)
			{
				var validIDs = getClickableIDs(activeID);
				$("." + roleClass + " a[data-id=" + activeID + "]").addClass('clickable');
				for (var i = 0; i != validIDs.length; ++i)
				{
					var myID = $("." + roleClass + " a[data-id=" + validIDs[i] + "]");
					if ( !myID.hasClass(disabledClass) )
					{
						myID.addClass('clickable');
					}
				}
			}
			function makeRoleActive(clickedID)
			{			
				var myClickedAnchor = $("." + roleClass + " a[data-id=" + clickedID + "]");
				var activeRoles = $("." + roleClass + " a.active");
				var correctID;

				// make sure we're not removing the original role on the first line.
				// if it is already active, remove active.
				if ( myClickedAnchor.hasClass('active') )
				{
					if ( activeRoles.length > 1 && clickedID == clickLog[clickLog.length-1] )
					{
						deleteFromClickLog();
						myClickedAnchor.removeClass('active');
						correctID = clickLog[clickLog.length-1];
					}
				} 
				// if there are no active roles or the clicked role isn't active
				else 
				{
					correctID = clickedID;
					myClickedAnchor.addClass('active');
					addToClickLog( $("." + roleClass + " a[data-id=" + correctID + "]") );
				}
				if ( correctID )
				{	
					removeClickables();
					makeClickable( correctID );
					makeResultActive( correctID );
					makeSalaryActive( correctID );
					// update background tree
					updateBackground();
				}
			}
			function resetClickLog()
			{
				clickLog = [];
			}
			function addToClickLog(jqObj)
			{
				// add to array
				clickLog.push( jqObj.data('id') )
			}
			function deleteFromClickLog()
			{
				clickLog.pop();
			}
			function removeClickables()
			{
				// remove clickable class
				$("." + roleClass + " a").removeClass('clickable');
			}
			function updateBackground()
			{
				// do some magical stuff here.
				if ( svgMorpheus )
				{
					// detect which row we are on, add the level depending on the row.
					var lastRole = clickLog[clickLog.length-1];
					var rowNum = Math.floor( (lengthX * lengthY - lastRole) / lengthX ) + 1;
					var rowOffset = 5 - lengthY;
					var adjustedRow = rowNum + rowOffset;
					$("." + treeClass).show();
					svgMorpheus.to('tree-' + adjustedRow, {duration: 500, easing: 'linear', rotation: 'none'}, null);
				}
				else 
				{
					callingElement.data('active-rows', adjustedRow);
				}
			}
			function roleClick(e)
			{
				// user has clicked a role. first determine 
				// if the role is allowed to be clicked.
				e.preventDefault();
				var clickedID = $(this).data('id');

				makeRoleActive(clickedID);
				redrawPaths();
			}
			function areaClick(e)
			{
				// user has clicked an area, 
				// reset the paths and make the clicked anchor active.
				e.preventDefault();
				$("." + areaClass + " a").not( $(this) ).removeClass('active');
				$(this).addClass('active');

				var myID = $(this).data('id');
				makeAreaResultActive(myID);
				resetClickLog();
				setFirstRole(myID);
				redrawPaths();
			}
			function makeAreaResultActive(clickedID)
			{
				// add active class to relevant result.
				var myResult = $("." + resultAreaClass + "[data-id=" + clickedID + "]");
				$("." + resultAreaClass).not( myResult ).removeClass('active');
				myResult.addClass('active');
			}
			function makeResultActive(clickedID)
			{
				// add active class to relevant result.
				var myResult = $("." + resultDescriptionClass + "[data-id=" + clickedID + "]");
				$("." + resultDescriptionClass).not( myResult ).removeClass('active');
				myResult.addClass('active');
			}
			function makeSalaryActive(clickedID)
			{
				// add active class to relevant salary box.
				var myResult = $("." + resultSalaryClass + "[data-id=" + clickedID + "]");
				$("." + resultSalaryClass).not( myResult ).removeClass('active');
				myResult.addClass('active');
			}
			function addResults(roles)
			{
				// create boxes in results for role descriptions.
				var myContainer = callingElement.find("." + resultContainerClass);
				for ( var i = 0; i != roles.length; ++i )
				{
					myContainer.prepend("<div class='" + resultGenericClass + " " + resultDescriptionClass + "' data-id='" + (i + 1) + "'><h3>Salary</h3><p>" + roles[i].salary + "</p><h3>Annual Leave</h3><p>" + roles[i].leave + " days</p><h3>Mobility in Asia</h3><p>" + roles[i].mobility + "</p></div>");
				}
			}
			function addSalaryResults(roles)
			{
				// create boxes in results for salary.
				var myContainer = callingElement.find("." + resultContainerClass);
				for ( var i = 0; i != roles.length; ++i )
				{
					myContainer.prepend("<div class='" + resultGenericClass + " " + resultSalaryClass + "' data-id='" + (i + 1) + "'><h3>" + roles[i].long_name + "</h3><p><a class='" + buttonClass + "' href='" + roles[i].link + "'>View jobs</a></p></div>");
				}
			}
			function processIndustry(industry)
			{
				// create box in result, make active.
				var myContainer = callingElement.find("." + resultContainerClass);
				myContainer.prepend("<div class='" + resultGenericClass + " " + resultIndustryClass + " active'><h3>" + industry.long_name + "</h3><p>" + industry.description + "</p><p><a class='" + buttonClass + "' href='" + location.pathname + "'>Reset</a></p></div>");
			}
			function processRoles(roles)
			{
				// print out roles (grid, 4 x 5)
				var myContainer = callingElement.find("." + roleContainerClass);
				for ( var i = 0; i != roles.length; ++i )
				{
					var myRole = $("<div class='" + roleClass + "'><div class='" + roleBackgroundClass + "'><a data-id='" + (i + 1) + "'><span>" + roles[i].name + "</span></a></div></div>");
					if ( !myRole.text().length )
					{
						myRole.find('a').addClass(disabledClass);
					}
					myContainer.append(myRole);
				}
				// print out results crap
				addResults(roles);
				addSalaryResults(roles);
			}
			function processAreas(areas)
			{
				// print out areas (x axis)
				callingElement.attr('data-max-x', areas.length);
				var myContainer = callingElement.find("." + areaContainerClass);
				for ( var i = 0; i != areas.length; ++i )
				{
					myContainer.append("<div class='" + areaClass + "'><a data-id='" + (i + 1) + "'>" + areas[i].name + "</a></div>");
				}
				addAreaResults(areas);
			}
			function addAreaResults(areas)
			{
				var myContainer = callingElement.find("." + resultContainerClass);
				for ( var i = 0; i != areas.length; ++i )
				{
					myContainer.prepend("<div class='" + resultGenericClass + " " + resultAreaClass + "' data-id='" + (i + 1) + "'><h3>" + areas[i].long_name + "</h3></div>");
				}
			}
			function processExperience(exp)
			{
				// print out experience (y axis)
				callingElement.attr('data-max-y', exp.length);
				var myContainer = callingElement.find("." + experienceClass);
				for ( var i = 0; i != exp.length; ++i )
				{
					myContainer.append("<div class='" + yearClass + "'>" + exp[i] + " Years" + "</div>");
				}
			}
			function createHTMLSkeleton()
			{
				// creates the divs for data to be entered.
				var myExperience = $("<div class='" + experienceClass + "'></div>");
				var myMain = $("<div class='" + mainClass + "'></div>");
				var myResult = $("<div class='" + resultContainerClass + "'></div>");
				myMain.append("<div class='" + roleContainerClass + "'></div>");
				myMain.append("<div class='" + areaContainerClass + "'></div>");
				callingElement
					.append(myExperience)
					.append(myMain)
					.append(myResult);
			}
			function loadData(callbackFunction){
				// get the career tree data and load it into the data property.
				$.ajax({
					dataType: "json",
					url: settings.url,
					data: "",
					success: function(data){
						ctData = data;
						callbackFunction();
					}, 
					fail: function(){
						generateError('Failed to load JSON');
					}
				});
			} 

			// function to output errors
			function generateError(message)
			{
				console.log(message);
			}

			return this;
		};

		

})(jQuery);


