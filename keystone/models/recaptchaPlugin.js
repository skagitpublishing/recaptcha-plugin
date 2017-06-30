var keystone = require('keystone');

/**
 * RecaptchaPluginModel Model
 * ==================
 */

var RecaptchaPluginModel = new keystone.List('RecaptchaPluginModel');

RecaptchaPluginModel.add({
	privateKey: { type: String},
});

RecaptchaPluginModel.register();
