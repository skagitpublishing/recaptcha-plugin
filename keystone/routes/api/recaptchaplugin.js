var async = require('async'),
	keystone = require('keystone');
var request = require('request');
var FormData = require('form-data');
var http = require('http');

var RecaptchaPluginModel = keystone.list('RecaptchaPluginModel');

/**
 * List RecaptchaPluginModels
 */
exports.list = function(req, res) {
	RecaptchaPluginModel.model.find(function(err, items) {
		
		if (err) return res.apiError('database error', err);
		
		res.apiResponse({
			collection: items
		});
		
	});
}

/**
 * Create RecaptchaPluginModel
 */
exports.create = function(req, res) {
	//debugger;
  
  //Ensure the user has a valid CSRF token
	//if (!security.csrf.validate(req)) {
	//	return res.apiError(403, 'invalid csrf');
	//}
  
	var item = new RecaptchaPluginModel.model(),
		data = (req.method == 'POST') ? req.body : req.query;
	
	item.getUpdateHandler(req).process(data, function(err) {
		
		if (err) return res.apiError('error', err);
		
		res.apiResponse({
			collection: item
		});
		
	});
}

/**
 * Update RecaptchaPluginModel by ID
 */
exports.update = function(req, res) {
  
  //Ensure the user has a valid CSRF token
	//if (!security.csrf.validate(req)) {
	//	return res.apiError(403, 'invalid csrf');
	//}
  
  //Ensure the user making the request is a Keystone Admin
  //var isAdmin = req.user.get('isAdmin');
  //if(!isAdmin) {
  //  return res.apiError(403, 'Not allowed to access this API. Not Keystone Admin.');
  //}
  
  //Since it's possible to spoof the Keystone Admin setting in the current version of the User model,
  //This is a check to make sure the user is a ConnexstCMS Admin
  //var admins = keystone.get('admins');
  //var userId = req.user.get('id');
  //if(admins.indexOf(userId) == -1) {
  //  return res.apiError(403, 'Not allowed to access this API. Not ConnextCMS Admin')
  //}
  
	RecaptchaPluginModel.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		var data = (req.method == 'POST') ? req.body : req.query;
		
		item.getUpdateHandler(req).process(data, function(err) {
			
			if (err) return res.apiError('create error', err);
			
			res.apiResponse({
				collection: item
			});
			
		});
		
	});
}

/**
 * Delete RecaptchaPluginModel by ID
 */
exports.remove = function(req, res) {
	
  //Ensure the user has a valid CSRF token
	//if (!security.csrf.validate(req)) {
	//	return res.apiError(403, 'invalid csrf');
	//}
  
  //Ensure the user making the request is a Keystone Admin
  //var isAdmin = req.user.get('isAdmin');
  //if(!isAdmin) {
  //  return res.apiError(403, 'Not allowed to access this API. Not Keystone Admin.');
  //}
  
  //Since it's possible to spoof the Keystone Admin setting in the current version of the User model,
  //This is a check to make sure the user is a ConnexstCMS Admin
  //var admins = keystone.get('admins');
  //var userId = req.user.get('id');
  //if(admins.indexOf(userId) == -1) {
  //  return res.apiError(403, 'Not allowed to access this API. Not ConnextCMS Admin')
  //}
  
  RecaptchaPluginModel.model.findById(req.params.id).exec(function (err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		item.remove(function (err) {
			if (err) return res.apiError('database error', err);
			
			return res.apiResponse({
				success: true
			});
		});
		
	});
}


/*
  Verify the captcha response with the google server.
*/
exports.validateresponse = function(req, res) {
  
  data = (req.method == 'POST') ? req.body : req.query;
  
  RecaptchaPluginModel.model.find(function(err, items) {
    debugger;
    
		if (err) return res.apiError('database error', err);
		
    try {
      var secret = items[0].get('privateKey');
      var captchaResponse = data.captchaResponse;
    } catch(err) {
      res.apiError('Input error', err);
    }
    
    
    //Create an HTTP form.
    var form = new FormData();

    //Append the log file to the Form.
    form.append('secret', secret);
    form.append('reponse', captchaResponse);

    
    //Create an http request.
    /*
    var request = http.request({
      method: 'post',
      url: 'https://www.google.com/recaptcha/api/siteverify',
      //port: globalThis.trackerServerPort,
      //path: '/api/trackinglogfile/create',
      //path: '',
      //headers: form.getHeaders()
    });
    
    

    
    
    //Pipe the form into the http request.
    form.pipe(request);

    //If the server responds.
    request.on('response', function(res) {
      debugger;

      if(res.statusCode == 404) {
        res.apiResponse({
          collection: false
        });
      } else {
        debugger;
        res.apiResponse({
          collection: true
        });
      }
      
    });

    //If the server does not respond.
    request.on('error', function(err) {
      debugger;

    });
    */
    
    var customUrl = 'https://www.google.com/recaptcha/api/siteverify?secret='+secret+'&response='+captchaResponse;
    request(customUrl, function(error,response,body) {
      debugger;
      
      try {
        var body = JSON.parse(body);
        
        if(body.success == true) {
          res.apiResponse({
            collection: true
          });
        } else {
          res.apiResponse({
            collection: false
          });
        }
        
      } catch(err) {
        res.apiResponse({
          collection: false
        });
        console.log('Error trying to process reCAPTCHA response from the google server: '+err.message)
      }
      
      
    });
		
		
	});
};

