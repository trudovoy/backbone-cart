/**
 *	Router
 *	
 ***********************************************************/
define([
'jquery',
'underscore',
'backbone',
'views/catalogView',
'views/basketView',
'views/headerView'
], function($, _, Backbone, catalogView, basketView, headerView) {
  
	var appRouter = Backbone.Router.extend({
		
		routes: {      
			'basket': 'showBasket',      
			'*actions': 'showCatalog'
		},

		showBasket: function () {
			var view = new basketView();
			view.render();
			$('.nav li').removeClass('active').closest('.nav').find('li:eq(1)').addClass('active');
		},

		showCatalog: function () {
			var view = new catalogView();
			view.render();
			console.log('catalog');
			$('.nav li').removeClass('active').closest('.nav').find('li:eq(0)').addClass('active');

		}
	});
	

	var initialize = function () {
		var router = new appRouter();
		var header = new headerView().render();
		Backbone.history.start();
	};

	return {initialize: initialize};

});
