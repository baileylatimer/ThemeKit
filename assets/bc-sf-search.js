// Override Settings
var bcSfSearchSettings = {
    search: {
        //suggestionMode: 'test',
        suggestionPosition: 'right',
        //suggestionWidth: 'auto'
    }
};

// Customize style of Suggestion box
BCSfFilter.prototype.customizeSuggestion = function(suggestionElement, searchElement, searchBoxId) {
  	if (jQ(searchBoxId).closest('.search_container').length > 0) {
      	this.setSuggestionWidth(searchBoxId, 400);
  	}
};