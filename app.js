
/**
 * Module dependencies.
 */
var express = require('express')
var routes = require('./routes/route')
var http = require('http')
var path = require('path')

var app = express()



// all environments
app.configure(function() {
	app.set('port', process.env.PORT || 3000)
	app.set('views', path.join(__dirname, '/views'))
	app.set('view engine', 'jade')
	app.use(express.favicon())
	app.use(express.logger('dev'))
	app.use(express.compress())
	app.use(express.json())
	app.use(express.urlencoded())
	app.use(express.methodOverride())
	app.use(express.cookieParser())
	app.use(express.cookieSession({secret: 'sunken.me'}))
	app.use(express.session({
		secret: 'sunken.me',
		cookie: { maxAge: 900000 }
	}))
})

app.use(app.router)
app.use(express.static(path.join(__dirname, '/')))

routes(app)
// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler())
}

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'))
})
