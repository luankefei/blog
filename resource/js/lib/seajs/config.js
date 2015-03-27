
seajs.config({
	//base: '/resource/',
	alias: {
		'jquery': {
			//src: '/js/lib/jquery/jquery-2.1.0.min.js',
			src: '/js/lib/jquery/jquery.min.js',
			exports: 'jquery'
		},
		'angular': {
			src: '/js/lib/angular/angular.js',
			exports: 'angular'
		}
		// 'form': {
		// 	src: '/js/form.js',
		// 	exports: 'form'
		// },
		// 'common': {
		// 	src: '/js/common.js',
		// 	exports: 'common'
		// }
	},
	debug: true
})

