// Todo Collection
// ---------------

define(function () {
	'use strict';

	var module = {}, TodoList;

	// The collection of todos is backed by *localStorage* instead of a remote
	// server.
	TodoList = Backbone.Collection.extend({

		// Save all of the todo items under the `"todos"` namespace.
		//localStorage: new Store("todos"),
		//  Use REST url instead of localStorage facility
		url: function () {
			return "api/Todos" + (this.get('id') ? '?todoId=' + this.get('id') : '');
		},

		// Filter down the list of all todo items that are finished.
		done: function () {
			return this.filter(function (todo) { return todo.get('done'); });
		},

		// Filter down the list to only todo items that are still not finished.
		remaining: function () {
			return this.without.apply(this, this.done());
		},

		// We keep the Todos in sequential order, despite being saved by unordered
		// GUID in the database. This generates the next order number for new items.
		nextOrder: function () {
			if (!this.length) return 1;
			return this.last().get('order') + 1;
		},

		// Todos are sorted by their original insertion order.     
		comparator: function (todo) {
			return todo.get('order');
		}

	});

	module.create = function(properties) {
		return new TodoList(properties);
	};

	return module;
});