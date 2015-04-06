/**
 *	Basket View
 *	
 ***********************************************************/
define([
	'jquery',
	'underscore',
	'backbone',

	'collections/catalogCollection',
	'text!templates/basketTemplate.htm',
	'models/basketModel',

], function($, _, Backbone, CatalogCollection, basketTemplate, BasketModel){

	var BasketView = Backbone.View.extend({
		
		el: $("#content"),

		events: {
			"click .btn": "removeFromBasket"
		},


		/**
		 *	Remove from basket		
		 */
		removeFromBasket: function (e) {     
			
			BasketModel.removeItem( $(e.target).attr('data-id') );
			  
		},


		/**
		 *	Initialization	
		 */
		initialize: function () {
				 
			var that = this;

			$(this.el).off('click', '.btn');
			BasketModel.on('change', function () {
				if(location.hash == "#/basket") {
					that.render();					
				}
			});	
						
		},


		/**
		 *	Render basket page	
		 */
		render: function(){ 

			// BasketModel
			var data = JSON.parse(BasketModel.get('ids'));

			var f = _.filter(CatalogCollection.models, function (item) {

				var searchElement = _.findWhere(data, {"id": item.get('id')});
				searchElement == undefined ? '' : item.set('quant', searchElement.quantity);
				return searchElement != undefined;
				
			});

			var data = {
				catalog: f,
				_: _,
				price: BasketModel.get('price')
			};

			var compiledTemplate = _.template( basketTemplate, data );			 	
			$("#content").html( compiledTemplate );

		}


	});

	return BasketView;	
});
