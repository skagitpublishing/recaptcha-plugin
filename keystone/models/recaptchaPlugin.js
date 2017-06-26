var keystone = require('keystone');

/**
 * RecaptchaPluginModel Model
 * ==================
 */

var RecaptchaPluginModel = new keystone.List('RecaptchaPluginModel');

RecaptchaPluginModel.add({
	publicId: { type: String},
});

RecaptchaPluginModel.register();
