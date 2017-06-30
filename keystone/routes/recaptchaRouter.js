var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api') 
};

module.exports = function(app) {

  // Keystone Views
  //app.get('/test', routes.views.test);
  
  // Plugin API Route
  app.get('/api/recaptchaplugin/list', keystone.middleware.api, routes.api.recaptchaplugin.list);
  app.all('/api/recaptchaplugin/create', keystone.middleware.api, routes.api.recaptchaplugin.create);
  app.all('/api/recaptchaplugin/:id/update', keystone.middleware.api, routes.api.recaptchaplugin.update);
	app.get('/api/recaptchaplugin/:id/remove', keystone.middleware.api, routes.api.recaptchaplugin.remove);
  
  app.all('/api/recaptuchaplugin/validateresponse', keystone.middleware.api, routes.api.recaptchaplugin.validateresponse);
  
  // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
  //app.get('/loggedinuser', middleware.requireUser, routes.views.loggedinuser);
}