// The Application
// ---------------

define(['text!templates/app/stats.html'], function (stats) {
	'use strict';

	var module = {}, AppView;

	// Our overall **AppView** is the top-level piece of UI.
	AppView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: $('#todoapp'),

		// Our template for the line of statistics at the bottom of the app.
		statsTemplate: _.template(stats),

		// Delegated events for creating new items, and clearing completed ones.
		events: {
			'keypress #new-todo': 'createOnEnter',
			'keyup #new-todo': 'showTooltip',
			'click .todo-clear a': 'clearCompleted'
		},

		// At initialization we bind to the relevant events on the `Todos`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting todos that might be saved in *localStorage*.
		initialize: function () {
			this.input = this.$('#new-todo');
			_.bindAll(this, 'addOne');

			this.collection.bind('add', this.addOne, this);
			this.collection.bind('reset', this.addAll, this);
			this.collection.bind('all', this.render, this);

			this.collection.fetch();
		},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function () {
			this.$('#todo-stats').html(this.statsTemplate({
				total: this.collection.length,
				done: this.collection.done().length,
				remaining: this.collection.remaining().length
			}));
		},

		// Add a single todo item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne: function (todo) {
			var that = this;

			require(['views/item'], function (todoView) {
				var view = todoView.create({ model: todo });
				that.$('#todo-list').append(view.render().el);
			});
		},

		// Add all items in the **Todos** collection at once.
		addAll: function () {
			this.collection.each(this.addOne);
		},

		// If you hit return in the main input field, and there is text to save,
		// create new **Todo** model persisting it to *localStorage*.
		createOnEnter: function (e) {
			var text = this.input.val();
			if (!text || e.keyCode != 13) return;
			this.collection.create({ text: text });
			this.input.val('');
		},

		// Clear all done todo items, destroying their models.
		clearCompleted: function () {
			_.each(this.collection.done(), function (todo) { todo.destroy(); });
			return false;
		},

		// Lazily show the tooltip that tells you to press `enter` to save
		// a new todo item, after one second.
		showTooltip: function (e) {
			var tooltip = this.$('.ui-tooltip-top');
			var val = this.input.val();
			tooltip.fadeOut();
			if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
			if (val == '' || val == this.input.attr('placeholder')) return;
			var show = function () { tooltip.show().fadeIn(); };
			this.tooltipTimeout = _.delay(show, 1000);
		}

	});

	module.create = function (properties) {
		return new AppView(properties);
	};

	return module;
});