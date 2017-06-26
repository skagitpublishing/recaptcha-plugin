var keystone = require('keystone');

/**
 * RecaptchaPluginModel Model
 * ==================
 */

var RecaptchaPluginModel = new keystone.List('RecaptchaPluginModel');

RecaptchaPluginModel.add({
	entry: { type: String},
});

RecaptchaPluginModel.register();
