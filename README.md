# reCAPTCHA Plugin for ConnextCMS

This plugin implements the server-side processing necessary to execute a Google reCAPTCHA validation.
Developers using this plugin should be familiar with the following Google resources:

* [reCAPTCHA Dev Guide](https://developers.google.com/recaptcha/intro)
* [Sign up for a site key](http://www.google.com/recaptcha/admin)

## Installation
It is assumed that this repository will be cloned into a working copy of [ConnextCMS](http://connextcms.com/). 
You can [clone your own working copy of ConnextCMS here](http://connextcms.com/page/clone-your-own) for testing purposes.

To install this plugin, clone this repository into your home directory and run the `merge-plugin` script. 
This script assumes you are using a 
[ConnextCMS installation best practices](https://github.com/skagitpublishing/ConnextCMS/wiki/2.-Installation#installation-best-practice).
 
This plugin requries the following npm packages installed in the myCMS directory:
* request