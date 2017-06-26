//plugin-template: exampleBackboneModel.js


//Create local Model to represent the Post model I'll retrieve from the server.
var ExampleModel = Backbone.Model.extend({

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
    
    this.url = '/api/exampleplugin/'+this.id+'/update';
    
    this.refreshView = false;
  },

  defaults: {
    '_id': '',
    'entry': '',
  },

  //Override the default Backbone save() function with one that our API understands.
  save: function() {
    //debugger;

    var thisModel = this;
    
    $.post(this.url, this.attributes, function(data) {
      //Regardless of success or failure, the API returns the JSON data of the model that was just updated.
      //debugger;
      
      //If the refreshView flag is set, then refresh the Collection and then refresh the View.
      if(thisModel.refreshView) {
        
        var thisPlugin = global.pluginView.getHandle('plugin-template-connextcms');
        if(!thisPlugin) {
          console.error('Could not find plugin that matches: '+'plugin-template-connextcms');
          return;
        }
        
        thisModel.refreshView = false;
        thisPlugin.collections[0].refreshView = true;
        thisPlugin.collections[0].fetch(); 
      }
      
      log.push('exampleBackboneModel.js/save() executed.');
    })
    .fail(function( jqxhr, textStatus, error ) {
      debugger;
      
      global.modalView.errorModal("Request failed because of: "+error+'. Error Message: '+jqxhr.responseText);
      console.log( "Request Failed: " + error );
      console.error('Error message: '+jqxhr.responseText);

      log.push('Error while trying exampleBackboneModel.js/save(). Most likely due to communication issue with the server.');
      log.push('responseText: '+jqxhr.responseText);
      //sendLog();
      
      console.error('Communication error with server while execute exampleBackboneModel.js/save()');
    });

  }
});

