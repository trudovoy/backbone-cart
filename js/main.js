/**
 *	Init file for requireJS
 *	
 ***********************************************************/

// C O N F I G
require.config({
	paths: {
		'jquery': 'libs/jquery/jquery-min',
		'underscore': 'libs/underscore/underscore-min',
		'backbone': 'libs/backbone/backbone-min'
	},
	shim: {
		'underscore': {
			exports: '_'
		},		
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		}
	}
});


// I N I T   A P P
require(['app'], function (App) {	

	App.initialize();
	
});
