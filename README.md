Table of Contents
=================

* [connextcms-plugin-template](#connextcms-plugin-template)
  * [Installation](#installation)
  * [File Structure](#file-structure)
  * [Design Overview](#design-overview)
  * [KeystoneJS](#keystonejs)
     * [Keystone Routes](#keystone-routes)
     * [Keystone Views](#keystone-views)
     * [Keystone Models](#keystone-models)
  * [ConnextCMS](#connextcms)
     * [Backbone Views](#backbone-views)
     * [Backbone Models &amp; Collections](#backbone-models--collections)
  * [Support Files](#support-files)
  * [Summary/Usage](#summaryusage)


# connextcms-plugin-template
This is a template for developing your own plugins for [ConnextCMS](https://github.com/skagitpublishing/ConnextCMS)
and [KeystoneJS](https://github.com/keystonejs/keystone). If all you need is to customize a website served
with KeystoneJS, consider using the simplified [site template](https://github.com/skagitpublishing/site-template-connextcms).

## Installation
It is assumed that this repository will be cloned into a working copy of [ConnextCMS](http://connextcms.com/). 
You can [clone your own working copy of ConnextCMS here](http://connextcms.com/page/clone-your-own) for testing purposes.

To install this example project, clone this repository into your home directory and run the `merge-plugin` script. This script assumes you are using a [ConnextCMS installation best practices](https://github.com/skagitpublishing/ConnextCMS/wiki/2.-Installation#installation-best-practice).


## File Structure
    |--keystone/
    |  This is where the KeystoneJS specific files live.
    |  |--models/
    |  |  Add any KeystoneJS models that your plugin needs to this directory.
    |  |--routes/
    |  |  This directory contains the handlers for any new APIs
    |  |  |--exampleRouter.js
    |  |  |  KeystoneJS reads this file to add new View and API paths to the KeystoneJS router.
    |  |  |--exampleplugin.js
    |  |  |  This is a demo/example API handler file.
    |  |--templates/views/
    |  |  This directory contains the KeystoneJS Views
    |  |  |--test.hbs
    |  |  |  This is an example KeystoneJS view.
    |  |  |--loggedinuser.hbs
    |  |  |  This is an example KeystoneJS view that is only accessible to logged in users.
    |--connextcms/
    |  This is where ConnextCMS specific files live.
    |  |--models/
    |  |  Contains Backbone.js Models and Collections that will be used by the ConnextCMS Backbone application.
    |  |--views/
    |  |  Contains Backbone.js Views that will be added to the ConnextCMS Dashboard.
    |  |--templates/
    |  |  Contains HTML template files used by ConnextCMS Backbone.js Views.
    |--pluginSettings.json
    |  JSON file containing the information ConnextCMS needs to interface to the plugin
    |--pluginLoader.js
    |  Script executed by ConnextCMS when the Dashboard loads.
    |--merge-plugin
    |  Bash shell script for merging your plugin into a working installation of ConnextCMS and KeystoneJS


## Design Overview
ConnextCMS now has hooks to allow the development of plugins. Plugins allow new websites and web apps to
develop their code base totally independent of ConnextCMS's code base. ConnextCMS software and plugin
code can be updated without any manual editing. This plugin template has been developed for two reasons:

1. To give an example on how JavaScript developers can create their own ConnextCMS/KeystoneJS plugins.

2. To illustrate the various interfaces between KeystoneJS and ConnextCMS. To show where and how the two systems interact and where they are independent.


## KeystoneJS
Keystone has its own system for routing API calls, displaying views, and creating database models. ConnextCMS relies heavily on
the API routes and interacts with database models through these APIs. The ConnextCMS dashboard is contained in a single 
KeystoneJS view, but otherwise does not interact with any other KeystoneJS view. This plugin template allows you to create 
new KeystoneJS routes, views, and models as you see fit.

### Keystone Routes
The API *routes* for this example plugin are defined in `keystone/routes/exampleRouter.js`. This file gets read by Keystone's
`routes/index.js` file when KeystoneJS starts.

The API *handler* functions for this example plugin live in `keystone/routes/api/exampleplugin.js`. This is the code 
that gets executed when your plugin API is called. 

### Keystone Views
In ConnextCMS, KeystoneJS is configured to use the [Handlebar template language](http://handlebarsjs.com/) for its views. 
View files end with extension .hbs, but HTML can be
copied and pasted into these files. The ConnextCMS Dashboard is single Keystone View configured for the path `/dashboard`. 
The `/edituser` view which lets users change their password is another example of a Keystone View. 

This plugin contains
example views. `/test` is a publically accessible view and `/loggedinuser` is a private view, accessible only to logged
in users.

The route for Keystone Views are defined in the `keystone/routes/exampleRouter.js` file, but the website content is 
defined by the .hbs file in the `keystone/templates/views` directory.

### Keystone Models
In many ways KeystoneJS Models act as an API to MongoDB, the database used to power KeystoneJS. Read up on the 
[KeystoneJS model documentation](http://keystonejs.com/docs/database/) for more information.

Any model files in this directory with the same name as default KeystoneJS or ConnextCMS model files will overwrite
those default files. This is useful if you need to add a field to an existing model. For example, if you need
to add a field called 'middleName' to the User model, just copy the default User.js model from KeystoneJS 
and place it in this directory, and add your field. Your updated model will overwrite the default model when the
`merge-plugin` script is executed.


## ConnextCMS
[ConnextCMS](https://github.com/skagitpublishing/ConnextCMS) is a [Backbone.js application](https://addyosmani.com/backbone-fundamentals/)
and front end
extension for KeystoneJS. The user interface mimics other popular CMS UI such as WordPress and Shopify. This plugin
template allows you to create your own menu items and Backbone Views for extending both ConnextCMS and KeystoneJS.
All plugin files that interact directly with ConnextCMS reside in the `connextcms` directory.

### Backbone Views
Plugins to ConnextCMS have two views they need to interact with. The first is their own View that will get displayed.
This view file resides in the `connextcms/views` directory. 

The second view that a plugin must manage is the Left Menu View, which is the primary UI menu that is used to navigate
around the ConnextCMS Dashboard. The file `pluginView.js` is executed by ConnextCMS on page load and generates the ConnextCMS
Plugin View. This file contains
the code for reading in the `pluginSettings.js` files, loading plugin files, as well as creating a menu item in the 
Left Menu View.

All plugin Views must be able to pass options into the initialize() function. See the `exampleView1.js` 
file in this repository for an example.

### Backbone Models & Collections
The Backbone Models and Collections used in ConnextCMS often mirror the KeystoneJS models. While the KeystoneJS models
persist in a MongoDB database on the server, the Backbone Models and Collections exist in the memory space of the browser.
They sync with the server via KeystoneJS API calls. 

By storing data in Backbone Models and Collections, data can be managed more efficiently and API calls between the
Backbone application server are reduced. 

All Models and Collections in a plugin must be able to pass options into the initialize() function. See the 
`exampleBackboneModel.js` and `exampleBackboneCollection.js` files for examples.

## Support Files
The support files `merge-plugin`, and `pluginSettings.json` are used to configure your plugin.

* `merge-plugin` is a bash script file that places your plugin files in the appropriate location, according to
[ConnextCMS installation best practices](https://github.com/skagitpublishing/ConnextCMS/wiki/2.-Installation#installation-best-practice).

* `pluginSettings.json` is a configuration file containing plugin metadata used by the ConnextCMS Plugin View, 
`pluginView.js`, to load your plugin
into ConnextCMS at run-time. This file is not used by KeystoneJS.


### pluginSettings.json
This file contains the plugin metadata necessary to load your plugin into ConnextCMS and generate a left-menu item. Here is an 
explanation of the required fields in this file:

* pluginDirName - All plugins must be copied into the /public/plugins directory inside their own subdirectory. 
This object contains the name of that directory.


* backboneTemplateFiles - This is an array of filename paths within the plugins subdirectory. Each entry in 
the array contains the path to a Backbone Template file.

* backboneViewFiles - This is an array of filename paths within the plugins subdirectory. Each entry in the 
array contains the path to a Backbone View file.

* backboneModelFiles - This is an array of filename paths within the plugins subdirectory. Each entry in the 
array contains the path to a Backbone Model file.

* backboneCollectionFiles - This is an array of filename paths within the plugins subdirectory. Each entry 
in the array contains the path to a Backbone Collection file.


* backboneViewNames  - This is an array Backbone View Constructors associated with the plugin. The position 
of each constructor name should match the position of the file names above.

* backboneModelNames - This is an array of Backbone Model Constructors associated with the plugin. 

* backboneCollectionNames - This is an array of Backbone Collection Constructors associated with the plugin.


* primaryViewInstance - This is the name of an object that is created as a shortcut to the primary View for 
this plugin. The primary View is the one that should be loaded when the user clicks on the left-menu item 
for this plugin.

* primaryViewConstructor - This is the name of the Backbone View Constructor that instantiates the primaryViewInstance.

* primaryViewId - This is the ID name that will be assigned to a `<li>` element appended to the left-menu.

* primaryViewLabel - This is the text label that the user will see in the left-menu.

* primaryViewFAIcon - This is a Font Awesome Icon that will be displayed in the left-menu next to the primaryViewLabel.


### pluginView.js
pluginView.js is not part of this repository. It is a file within ConnextCMS that is responsible for loading
plugins into ConnextCMS. I has the aspects below that you should be aware of:

* The meta data stored each plugins pluginSettings.json file is stored globally in 
global.pluginView.pluginData[]. Each element in the array represents a plugin.

* The Backbone constructs created for each plugin (model, views, collections) are stored globally 
in global.pluginView.loadedPlugins[]. Each element in the array represent a plugin.

* When Backbone constructs are instantiated, the pluginData and loadedPlugins data is passed along 
to them. The initialize() function for each construct should be able to accept the passed in data 
and store it locally inside the construct. The Views, Models, and Collections in this example show how to do 
this. The exact syntax is slightly different between Views, Models, and Collections. Here is an example from
the View:

```
initialize: function () {

    //Load the plugin metdata as a local variables.
    this.pluginData = this.options.pluginData;

    //Load a handle to the plugin constructs as a local variable.
    this.pluginHandle = this.options.pluginHandle;

    //Declare the view Constructor name. Needed to distinguish between views and to identify the primary view.
    this.viewName = "ExampleView1";
    ...
```

The example above shows the passing in of options data to the Backbone View. The plugin Data, Handles, and name are 
then stored locally inside the View. 




## Summary/Usage
Because this plugin is effectively interfacing with two separate pieces of software (*KeystoneJS* and *ConnextCMS*), it's
possible to use this template to build plugins for just one piece of software or both.

If you wish to build another view or menu item for ConnextCMS, you may not need to develop any code in the `keystone`
directory. However, you will need to develop new KeystoneJS routes and models if you need to put any new information 
into the database or create a new API for interacting with that data.

Be sure to see the [documentation](http://connextcms.com/page/documentation-overview) and [videos](http://connextcms.com/page/videos) for additional help.