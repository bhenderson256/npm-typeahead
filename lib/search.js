var _ = require('lodash');
var elasticsearch = require('elasticsearch');

function Search(opts) {
	_.extend(this, {
		client: new elasticsearch.Client({
			host: process.env.ELASTIC_SEARCH_URL || 'localhost:9200'
		})
	}, opts);
}

// the search method called by server.js
Search.prototype.search = function(q, cb) {
	this.client.search({
		index: 'npm',
		size: 50,
		body: {
			query: {
				query_string: {
					fields: ['_id'],
					query: q + '*'
				}
			}
		}
	}, function(err, resp) {
		return cb(
			err, 
			_.map(resp.hits.hits, function(hit) {
				return { value: hit._id };
			})
		);
	});
}

exports.Search = Search;
