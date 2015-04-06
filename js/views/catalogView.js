/**
 *	Catalog View
 *	
 ***********************************************************/
define([
	'jquery',
	'underscore',
	'backbone',

	'collections/catalogCollection',
	'text!templates/catalogTemplate.htm',
	'models/basketModel',

], function($, _, Backbone, CatalogCollection, catalogTemplate, BasketModel){

	var CatalogView = Backbone.View.extend({
		
		el: $("#content"),

		events: {
			"click .btn": "addToBasket"
		},


		/**
		 *	Add to basket		
		 */
		addToBasket: function (e) {     
				
			BasketModel.addItem( $(e.target).attr('data-id') );
	     
		},


		/**
		 *	Initialization	
		 */
		initialize: function () {;
			
			$(this.el).off('click', '.btn');	

		},


		/**
		 *	Render catalog page		
		 */
		render: function(){  

			var data = {
				catalog: CatalogCollection.models,
				_: _ 
			};

			var compiledTemplate = _.template( catalogTemplate, data );			 	
			$("#content").html( compiledTemplate );

		}

	});
	return CatalogView;
});
