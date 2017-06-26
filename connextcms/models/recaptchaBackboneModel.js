//plugin-template: recaptchaBackboneModel.js


//Create local Model to represent the Post model I'll retrieve from the server.
var RecaptchaModel = Backbone.Model.extend({

  idAttribute: "_id",  //Map the Model 'id' to the '_id' assigned by the server.

  //When initialized this.id is undefined. This url gets fixed in the initialize() function.
  url: '',

  //Initialize is called upon the instantiation of this model. This function is executed once
  //per model retrieved from the server.
  initialize: function(attributes, options) {
    //debugger;

    //Load the plugin metdata as a local variables.
    this.pluginData = options.pluginData;
    
    //Load a handle to the plugin constructs as a local variable.
    this.pluginHandle = options.pluginHandle;
    
    this.url = '/api/recaptchaplugin/'+this.id+'/update';
    
    this.fetch(); //Get the model data from the server.
    
    this.refreshView = false;
  },

  defaults: {
    '_id': '',
    'publicId': '',
  },

  //Override the default Backbone save() function with one that our API understands.
  save: function() {
    //debugger;

    var thisModel = this;
    
    //Update an existing model.
    if(this.id != "") {
    
      $.getJSON(this.url, this.attributes, function(data) {
        //Regardless of success or failure, the API returns the JSON data of the model that was just updated.
        debugger;

        //If the refreshView flag is set, then refresh the Collection and then refresh the View.
        if(thisModel.refreshView) {
          
          var thisPlugin = global.pluginView.getHandle('recaptcha-plugin');
          if(!thisPlugin) {
            console.error('Could not find plugin that matches: '+'recaptcha-plugin');
            return;
          }
          
          thisModel.refreshView = false;
          thisPlugin.collections[0].refreshView = true;
          thisPlugin.collections[0].fetch(); 
        }

        log.push('recaptchaBackboneModel.js/save() executed.');

      }).error( function(err) {
        //This is the error handler.
        debugger;
        log.push('Error while trying recaptchaBackboneModel.js/save(). Most likely due to communication issue with the server.');
        //sendLog();
        console.error('Communication error with server while execute recaptchaBackboneModel.js/save()');
      });
      
    //Create a new model
    } else {
      $.post('/api/recaptchaplugin/create', this.attributes, function(data) {
        //debugger;
        thisModel.id = data.collection._id;
      }).error( function(err) {
        //This is the error handler.
        debugger;
        log.push('Error while trying recaptchaBackboneModel.js/save(). Most likely due to communication issue with the server.');
        //sendLog();
        console.error('Communication error with server while execute recaptchaBackboneModel.js/save()');
      });
    }
    
  }
});

