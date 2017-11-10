!(function($){
	$(function(){

		var searchButtonSelector = ".l_banner-job-search-button a, #btn-widget-search";
		var keywordsInputSelector = "#keywords, #keywords1";
		
		$("form").first().keypress(function(e){
			if ( 13 == e.which )
			{
				$(searchButtonSelector).click();
				return false;
			}
		});

	});
})(jQuery);