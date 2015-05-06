'use strict'

ME.resource.page = {

    common: {},

    index: {
        css: ['/resource/css/index.css'],
        js: [
            // '/resource/js/module/common/base.js',
            '/resource/js/module/index/index.js'
            ],
        file: '/views/index.html',
        title: '图易',
        controller: 'index',
        keywords: '',
        description: ''
    },

    content: {
        css: ['/resource/css/content.css'],
        js: [
            '/resource/js/module/index/content.js'
        ],
        file: '/views/content.html'
    },

    about: {
        css: ['/resource/css/about.css'],
        js: ['/resource/js/about.js'],
        file: '/views/about.html'
    }
}