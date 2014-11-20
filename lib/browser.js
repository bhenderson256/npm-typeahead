var $ = window.jQuery = require('jquery');
var typeahead = require('typeahead.js');
var npmUrl = 'https://www.npmjs.org';

$(document).ready(function() {
	// create the engine used to interact with our search backend
	var engine = new Bloodhound({
		name: 'packages',
		local: [],
		remote: '/search?q=%QUERY',
		datumTokenizer: function(d) {
			return Bloodhound.tokenizers.whitespace(d.val);
		},
		queryTokenizer: Bloodhound.tokenizers.whitespace
	});

	engine.initialize();

	// attache the typeahread exension to our search box using jQuery
	var typeahead = $('typeahead').typeahead(
		{},
		{
			name: 'states',
			displayKey: 'value',
			source: engine.ttAdapter()
		}
	);
});

