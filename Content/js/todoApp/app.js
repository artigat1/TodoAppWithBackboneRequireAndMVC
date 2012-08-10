define(['collections/todos', 'views/app', 'models/todo'],
	function(todosColl, appView, todosModel) {
		'use strict';

		var module = { };

		module.init = function() {
			var collection = todosColl.create(),
			    model = todosModel.create({ 'collection': collection });

			collection.model = model;
			return appView.create({ 'collection': collection });
		};

		return module;
	});