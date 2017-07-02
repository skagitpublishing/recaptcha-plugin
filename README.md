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
 
This plugin requires the following npm packages installed in the myCMS directory:
* request

## Usage

This plugin adds a new view to the ConnextCMS dashboard where you can add the private site key given to you by Google.
Front end code can make a call to `/api/recaptchaplugin/validateresponse` to validate the reCAPTCHA response from the user.

Here is an example of front end JavaScript taking information from a simple form and validating it before sending an email
through the ConnextCMS Mailgun hook:

```
//This function validates the form before sending an email.
function validateMessage() {
  //debugger;

  //Get the input values
  var name = $('#Name').val();
  var email = $('#Email').val();
  var message = $('#Message').val();
  var tel = $('#Tel').val();

  if( (name == "") || (email == "") || (message == "") ) {
    alert('Your message is missing either a name, email, or message. Please fill out all boxes.');
    return;
  }

  var gResponse = {};
  gResponse.captchaResponse = grecaptcha.getResponse();

  $.post('/api/recaptchaplugin/validateresponse', gResponse, function(data) {
    //debugger;

    if(data.success) {
      //debugger;
      sendMessage();
    } else {
      //debugger;
      alert('Google reCAPTCHA verification did not succeed. Please try again.');
    }

  }).fail(function( jqxhr, textStatus, error ) {
    //debugger;

    var err = textStatus + ", " + error;

    try {
      if(jqxhr.responseText.indexOf("Invalid MailGun settings") != -1) {
        console.error('Can not email log to adminstrator for debugging! Have you set you MailGun settings correctly?');
      } else {
        console.log( "Request to /api/sendlog Failed: " + error );
        console.error('Error message: '+jqxhr.responseText);
      }
    } catch(err) {
      console.error('Error trying to send log to admin!');
    }            
  });

}


//This function sends an email when the user fills out the contact form.
function sendMessage() {
  //debugger;

  //Get the input values
  var name = $('#Name').val();
  var email = $('#Email').val();
  var message = $('#Message').val();
  var tel = $('#Tel').val();

  var obj = new Object();
  //obj.email = "chris.troutner@gmail.com";
  obj.email = "carperp@frontier.com";
  obj.from = email;
  obj.subject = "[Website Contact Form: From "+name+"]";
  obj.body = "Telephone: "+tel+"\n"+message;
  obj.html = false;

  $.get('/api/email/send', obj, function(data) {
    //debugger;
    console.log('Email sent!');

    //Clear the form
    $('#Name').val('');
    $('#Email').val('');
    $('#Message').val('');
    $('#Tel').val('');

    alert('Email sent!');

  })
  .fail(function( jqxhr, textStatus, error ) {
    debugger;

    var err = textStatus + ", " + error;

    try {
      if(jqxhr.responseText.indexOf("Invalid MailGun settings") != -1) {
        console.error('Can not email log to adminstrator for debugging! Have you set you MailGun settings correctly?');
      } else {
        console.log( "Request to /api/sendlog Failed: " + error );
        console.error('Error message: '+jqxhr.responseText);
      }
    } catch(err) {
      console.error('Error trying to send log to admin!');
    }            
  });
}
```