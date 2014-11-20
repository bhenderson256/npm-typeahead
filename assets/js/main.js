/*
// Browser-side code for performing typeahead searches.
// Uses browserify to manage browser-dependencies.
//
// start server: npm start
// build assets: npm run-script build.
var $ = window.jQuery = require('jquery');

require('../../lib/browser')({
  npmUrl: 'https://www.npmjs.org',
  searchUrl: '',
  $: $
});
*/

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
//!!	var typeahead = $('typeahead').typeahead(
	var typeahead = $('#package-search .typeahead').typeahead(
		{},
		{
			name: 'states',
			displayKey: 'value',
			source: engine.ttAdapter()
		}
	);
});



