/**
 *	Catalog View
 *	
 ***********************************************************/
define([
	'jquery',
	'underscore',
	'backbone',
	// Pull in the Collection module from above,
	'models/basketModel',	
	'text!templates/_headerTemplate.htm'

], function($, _, Backbone, BasketModel, headerTemplate){

	var headerView = Backbone.View.extend({
		
		el: $(".header"),		
		
		/**
		 *	Initialization
		 */
		initialize: function () {; 

			var that = this;			
			BasketModel.on('change', function () {that.render();console.log('basket updated');});

		},

		
		/**
		 *	Render header block
		 */
		render: function(){  
			
			var data = {
				basket: BasketModel,
				_: _ 
			};

			
			var compiledTemplate = _.template( headerTemplate, data );			 	
			$(".header").html( compiledTemplate );

		}

	});
	
	return headerView;
});
