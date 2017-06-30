//plugin-template: recaptchaView1.js
//debugger;

//'use strict'; //Causes error trying to import ExampleView1 object into ConnextCMS.

//Global variable to hold the template.
var RecaptchaTemplate1;

var RecaptchaView1 = Backbone.View.extend({

  tagName:  'div',

  el: '', 

  //template: _.template(ExampleTemplate1),

  // The DOM events specific to an item.
  events: {
    'click .saveApiKey': 'saveKey'
  },

  initialize: function () {
    try {
      //debugger;

      //Load the plugin metdata as a local variables.
      this.pluginData = this.options.pluginData;

      //Load a handle to the plugin constructs as a local variable.
      this.pluginHandle = this.options.pluginHandle;

      //Declare the view Constructor name. Needed to distinguish between views and to identify the primary view.
      this.viewName = "RecaptchaView1";

      var thisView = this; //Maitain scope inside the AJAX handler.

      
      //Get the template associated with this view.
      RecaptchaTemplate1 = '/'+this.pluginData.backboneTemplateFiles[0];
      var templatePath = '/plugins/'+this.pluginData.pluginDirName+RecaptchaTemplate1;
      $.get(templatePath, '', function(template) {
        //debugger;

        //Copy the contents of the template file into this views template object.
        thisView.template = _.template(template);

      })
      .fail(function( jqxhr, error, exception ) {
        debugger;
      });
    } catch (err) {
      debugger;
      var msg = 'Error while trying to initial view in recaptchaView1.js/initialize(). Error message: ';
      console.error(msg);
      console.error(err.message);

      log.push(msg);
      log.push(err.message);
      //sendLog();
      
      global.modalView.errorModal(msg);
    }
    
  },

  render: function () {
    //debugger;
    
    //Assign the model to the view.
    this.model = this.pluginHandle.collections[0].models[0];
    
    //Hide all views.
    global.leftMenuView.hideAll();
    
    //Render this view
    this.$el.html(this.template);    
    this.$el.show();
    
    //Visually update the left menu to inidicate that this plugin view was selected.
    this.updateLeftMenuView();
    
    //Render the API key into the DOM.
    if(this.model == undefined) {
      
    } else {
      this.$el.find('#inputApiKey').val(this.model.get('publicId'));
    }
    
    return this;
  },

  
  //This function is called by render(). It's responsible for maintinain visual consistency in the
  //left menu when the menu item for this plugin is selected.
  updateLeftMenuView: function() {
    //debugger;
    
    //Remove the 'active' class from the menu item, unless it's a treeview menu item.
    //(treeview) menu items will remove their active class in their click event.
    if( !global.leftMenuView.$el.find('.sidebar-menu').find('.active').hasClass('treeview') )
      global.leftMenuView.$el.find('.sidebar-menu').find('.active').removeClass('active');
    else
      global.leftMenuView.closeCollapsableLeftMenu();

    //Switch the 'active' class to the selected menu item
    $('#recaptcha-link').addClass('active');

    $('#app-location').text('Recaptcha View');
  },
  
  //This function is called when the user clicks the Save button.
  saveKey: function() {
    debugger;
    
    this.model.set('publicId', this.$el.find('#inputApiKey').val());
    
    this.model.save();
  },


});





