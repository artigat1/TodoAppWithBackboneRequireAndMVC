(function() {
	'use strict';

	var root = this,
    require = root.require;

	//fake 'has' if it's not available
	var has = root.has = root.has || function () {
		return false;
	};
	
	var scriptPath = '../../../Scripts';

	require.config(
		{
			paths:
				{
					'backbone': scriptPath + '/backbone.min',
					'collections': 'collections',
					'jquery': [
						'//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.2.min',
						scriptPath + '/jquery-1.7.2.min'
					],
					'jquery.log': scriptPath + '/jquery.log-0.1.0',
					'models': 'models',
					'scripts': scriptPath,
					'templates': 'templates',
					'text': scriptPath + '/text',
					'underscore': scriptPath + '/underscore.min',
					'views': 'views'
				},
			shim:
				{
					'jquery':
						{
							exports: '$'
						},

					'underscore':
						{
							exports: '_'
						},

					'backbone':
						{
							deps:
								[
									'underscore',
									'jquery'
								],
							exports: 'Backbone'
						},

					'jquery.log': {
						deps: ['jquery'],
						exports: 'jQuery.fn.log'
					}
				}
		});

	//load jquery, backbone and initialise the app
	require(
		[
			'jquery',
			'jquery.log',
			'backbone'
		],
		function($) {

			//if it's prod mode, set log level to 'info'
			if (has('prod')) {
				$.log.setLevel($.log.LEVEL.INFO);
			}

			require(['app'], function(app) {
				app.init();
			});
		});
}).call(this);