// v0.1.1

!(function( $ ){

	$.fn.includeFeed = function(options) {
		return $(this).each(function(){ // maintains chainability
		
			// record the element that is to be populated.
			var fillElement = this;
			
			// combine default settings and user settings into one variable.
			var settings = $.extend(true, {}, $.fn.includeFeed.defaults, options);
			
			$.ajax({
				type: "GET",
				url: settings.baseSettings.rssURL,
				dataType: "xml", 
				error: function(request, type, errorThrown) {
					// there was an error, so display it in the box. dont use console.log, problems with ie7/8.
					$(fillElement).html("<" + settings.baseSettings.itemTag + ">An error occurred. Please try again later. " + errorThrown + "</" + settings.baseSettings.itemTag + ">");
					return;
					
				}, 
				success: function(xml){

					var outputText = "";
					var i = 0;
					
					// go through each item returned by the ajax call and display it as html. 
					$(xml).find("item").each(function(){	
					
						// if we have reached the limit defined by the user, stop processing. 
						if (i != 0 && settings.baseSettings.limit == i) return;
						
						// start main item tag
						outputText += "<" + settings.baseSettings["itemTag"] + " class='rss-item'>";
						
						// display all of the elements determined by the user. 
						for (var key in settings.elements)
						{
							if (null != settings.elements[key] && false != settings.elements[key])
							{
								var tempText = $(this).find(key).text();
								switch (key)
								{
									case "title": 
										outputText += "<span class='rss-item-title'>";
										outputText += "<a href='" + $(this).find("link").text() + "'>" + tempText + "</a>";
										outputText += "</span>";
									break;
									case "link":
										outputText += "<span class='rss-item-" + key + "'>";
										outputText += "<a href='" + $(this).find("link").text() + "'>" + settings.elements[key] + "</a>";
										outputText += "</span>";
									break;
									case "pubDate":
										// format date if there was a function passed for this. 
										var tempTextDate = new Date(Date.parse(tempText));
										if ("function" == typeof(settings.elements[key]))
										{
											tempText = settings.elements[key](tempTextDate);
										}
										else										
										{
											tempText = tempTextDate.toDateString();
										}
										outputText += "<span class='rss-item-" + key + "'>" + tempText + "</span>";
									break;
									default: 
										outputText += "<span class='rss-item-" + key + "'>" + tempText + "</span>";
									break;
								}
							}
						}
						
						// end main item tag
						outputText += "</" + settings.baseSettings["itemTag"] + ">";
						
						i++;			
						
					});
					
					$(fillElement).html(outputText);
					
					// run the complete function that the user determined. 
					settings.complete.call(fillElement);
					
				} // end of success function
			}); // end of ajax call
		}); // end of return
	}; // end of includeFeed function.
	
	// Default settings
	$.fn.includeFeed.defaults = {
		baseSettings: {
			rssURL: "/job/rss.aspx", 
			itemTag: "li", // jcarousel requires li's.
			limit: 10 
		}, 
		elements: {
			// cant have defaults, otherwise it will overwrite the order of the elements set by the user. 
		}, 
		complete: function(){} // simpler than using typeof in the plugin.
	}
	
})( jQuery );