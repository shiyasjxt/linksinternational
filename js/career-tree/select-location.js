var SelectLocation = (function(){
	var myData = {};
	// when the user selects one of the four countries
	var countryClick = function(e){
		e.preventDefault();

		$(this).siblings().removeClass("active");
		$(this).addClass("active");

		var countryID = $(this).data('country-id');
		populateIndustries(countryID);
	};
	// populates a select box with options containing industries.
	var populateIndustries = function(countryID){
		var myIndustries = myData.countries[countryID].industries;
		var jqSelect = $("#l_industry select");
		jqSelect.children("option").not(":first").remove();
		if ( myIndustries )
		{
			for (var i = 0; i != myIndustries.length; ++i)
			{
				newOption(jqSelect, myIndustries[i].name, i);
			}
		}
		$('#l_industry select').trigger('render');
	};
	// adds an option to the industry select.
	var newOption = function(jqSelect, optName, optVal){
		jqSelect.append("<option value='" + optVal + "'>" + optName + "</option>");
	};
	// start the career tree, remove the select thing.
	var startTree = function(){
		var myCountryID = $("#l_ct-country .active").data('country-id');
		var myIndustryID = $("#l_industry select").val();

		$("#l_ct-container").careerTree({
			countryID: myCountryID, 
			industryID: myIndustryID, 
			data: ctDataObject
			// url: 'js/career-tree/career-tree-data.js'
			// url: 'js/career-tree-data-hong-kong-retail.js'
		});
		$("#l_ct-country-industry-container").hide();
	};
	var createCountries = function(){
		var countryContainer = $("#l_ct-country");
		for (var i = 0; i != myData.countries.length; ++i)
		{
			countryContainer.append("<a data-country-id='" + i + "'>" + myData.countries[i].name + "</a>");
		}
	};
	return {
		init: function(data){
			myData = data;
			createCountries();
			$("#l_ct-country a").click(countryClick);
			$("#l_industry select").change(startTree);
			$("#l_industry select").customSelect();
		}
	};

})();
