/**
 *	Basket Model
 *	
 ***********************************************************/
define([
	'underscore',
	'backbone',
	'collections/catalogCollection'
], function(_, Backbone, CatalogCollection) {
	
	var basketModel = Backbone.Model.extend({
		defaults: {
			ids: '[]',
			quantity: 0,
			price: 0
		},


		/**
		 *	Initialization
		 */
		initialize: function () {

			// Check storage
			if (localStorage.getItem('cart')) {
				this.set(JSON.parse(localStorage.getItem('cart')));
			}

		},


		/**
		 *	Add to basket
		 *  @param: {Number} - itemId
		 */		
		addItem: function (itemId) {

			var data = this.get('ids');
			data = JSON.parse(data);

			var result = _.findWhere(data, {id: parseInt(itemId)});

			if (!result) {
				
				data.push({
					"id": parseInt(itemId),
					"quantity": 1
				});
				
			} else {

				for(var item in data) {
					if(data[item].id == result.id) {
						data[item].quantity = parseInt(data[item].quantity) + 1;				
					}
				}

			}

			data = JSON.stringify(data);	
			this.set('ids', data);
			this.update();

		},


		/**
		 *	Remove item from basket
		 *  @param: {Number} - itemId
		 */
		removeItem: function (itemId) {

			var data = this.get('ids');
			data = JSON.parse(data);

			var result = _.findWhere(data, {id: parseInt(itemId)});

			if (result) {

				for (var i = 0; i < data.length; i++) {
					
					if (data[i].id == result.id) {

						if (parseInt(data[i].quantity) > 1) {
							data[i].quantity = parseInt(data[i].quantity) - 1;
						} else {
							data.splice(i,1);
						}
						
					}
				}

			}

			data = JSON.stringify(data);	
			this.set('ids', data);
			this.update();

		},

		
		/**
		 *	Calculate and update basket
		 *  @param: {Number} - itemId
		 */
		update: function () {

			var data = this.get('ids');			
			var data = JSON.parse(data);

			var sumPrice = 0;
			var sumItems = 0;

			for (var item in data) {
				
				var tmp = _.findWhere(CatalogCollection.models, {'id': data[item].id}).get('price');
				sumPrice += (parseInt(tmp) * parseInt(data[item].quantity));
				sumItems += parseInt(data[item].quantity);
				
			}

			this.set({
				'quantity': parseInt(sumItems),
				'price': parseInt(sumPrice)				
			});

			// Save in storage
			localStorage.setItem('cart', JSON.stringify(this));			 

		}


	});

	var BasketModel = new basketModel();

	return BasketModel;

});