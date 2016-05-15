/*jshint multistr: true ,node: true*/
"use strict";

var config = {

	ENVIRONMENT 					: process.env.NODE_ENV || 'development',

	/* This is common config that will be loaded first
		After this the enviroment configs will be loaded and will overwrite these settings

		PUT settings here which are common for both envs
	*/
	COMMON 							: {

	},

	/*
		Environment specific settings
		These will be loaded after common , and will overwrite common settings 

		PUT settings according to the env block
	*/

	'development' 					: {

		REQUEST_POOL_SIZE 			: 15,
		REQUEST_USER_AGENT 			: 'paytm market-search bot (dev)',

		ELASTICSEARCH 				  : {
			BASEURL 				      : 'http://localhost:9200',
			BASEURL_ES2 			    : 'http://localhost:9201',

			SEARCH_STATS_INDEX		: 'accounts',
			SEARCH_STATS_BASEURL	: 'http://localhost:9200',
			SEARCH_STATS_TYPE     : 'account',

			INDEX_CREATION_SETTINGS : {
									    "settings" : {
									        "number_of_shards" : 5,
									        "number_of_replicas" : 1
									    }
									},

		},
		EMAIL 						: {
			SMTPTRANSPORT 			: {
			    service 			: 'gmail',
			    auth				: {
			        // user 			:  process.env.PAYTM_EMAIL_ID,
			        // pass 			:  process.env.PAYTM_EMAIL_PASSWORD,
			        user 			:  'get2shikhakaushik@gmail.com',
			        pass 			:  'paytm@123',
			    }
			},

			TO 						  : 'Shikha Kaushik <get2shikhakaushik@gmail.com>',
			BCC 					  : 'Shikha Kaushik <get2shikhakaushik@gmail.com>',
			FROM 					  : 'Shikha Kaushik <get2shikhakaushik@gmail.com>',
			REPLYTO 				: 'Shikha Kaushik <get2shikhakaushik@gmail.com>>',
			SUBJECT 				: 'Account Stats Report',
			HEADERS 				: {
				'X-PAYTM-ENV' 		: 'DEV',

			},
		},
	},
	'production'					: {

		REQUEST_POOL_SIZE 			: 100,
		REQUEST_USER_AGENT 			: 'paytm market-search bot (prod)',

		ELASTICSEARCH 				: {
			BASEURL 				: 'http://internal-marketplace-ctlsearch-internal-287900782.ap-southeast-1.elb.amazonaws.com:8080',
			BASEURL_ES2				: 'http://pawslmktsearches2clusc01:8080',

			SEARCH_STATS_INDEX		: 'search_statistics',
			SEARCH_STATS_BASEURL	: 'http://pawslmktsearchesstat04:80',
			SEARCH_STATS_TYPE       : 'product',

			INDEX_CREATION_SETTINGS : {
									    "settings" : {
									        "number_of_shards" : 5,
									        "number_of_replicas" : 1
									    }
									},

		},
		EMAIL 						: {
			SMTPTRANSPORT 			: {
				  host 				: 'mail.mkt.paytm',
				  port 				: 587
				},


			TO 						  : 'Shikha Kaushik <get2shikhakaushik@gmail.com>',
			BCC 					  : 'Shikha Kaushik <get2shikhakaushik@gmail.com>',
			FROM 					  : 'Shikha Kaushik <get2shikhakaushik@gmail.com>',
			REPLYTO 				: 'Shikha Kaushik <get2shikhakaushik@gmail.com>',
			SUBJECT 				: 'Account Stats Report',
			HEADERS 				: {
				'X-PAYTM-ENV' 		: 'PROD',

			},
		},
	},

};


var load = function(){
	var
		env 			= config.ENVIRONMENT,
		loadedConfig 	= config.COMMON;

	/* copy superficially , and not deep copy */
	Object.keys(config[env]).forEach(function(key) {
		loadedConfig[key] = config[env][key];
	});

	return loadedConfig;
};

module.exports = load();
