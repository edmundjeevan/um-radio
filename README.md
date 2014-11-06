um-radio - user modelled radio
================================================================================

`um-radio` is a web application that will allow you to change a [Last.fm](http://last.fm)
radio station based on the user-modelling statistics from a [Twtter](https://twitter.com/)
feed.  It uses the
[Watson User Modeling service](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/systemuapi/)
available from Bluemix to determine what type of radio station to tune to.


provisioning services
================================================================================

Before running the application, you will need to provision 3 services:

* Twitter service
* Last.fm service
* Watson User Modelling service

For the Twitter service, follow the instructions at <https://apps.twitter.com/>
to create a new application to use the Twitter API.  If you don't already have
a developer account for twitter, you'll need to create one.  When creating the
new app, you might use `um-radio` for the name.  The URL should be the URL that
you will use for the new app, which might be something like
`https://um-radio-xyz.mybluemix.net`, where `xyz` are your initials, so you have a
unique hostname on the `mybluemix.net` domain.  You do not need to provide
a Callback URL.

After the new application is created at Twitter, navigate to the "Keys and
Access Tokens" page.  You will be values "Consumer Key (API Key)" and
"Consumer Secret (API Secret)" later.

For the Last.fm service,


For the Watson User Modeling service,



running locally
================================================================================

You will need [node.js](http://nodejs.org/) installed (version 0.8.x or greater).

Once you have that in order:

* create a git clone this repository; eg,

        git clone https://github.com/pmuellr/um-radio.git

* run `npm install` to install node pre-req modules

* copy the file `vcap-sample.json` to `vcap.json`, and replace the fill-in
  the blanks with the credentials from your Watson User Modeling service
  credentials available in ACE.

* copy the file `env-sample.json` to `env.json`, and replace the fill-in
  the blanks with the credentials from your Twitter and Last.fm services.

* run the app using `node server`, bring up the URL it prints to interact with
  the application in a web browser.



running on bluemix
================================================================================


Update manifest.yml file a unique `host` value.  I always use the value of the
`name` property, and append `-pjm` (my initials).  Your `host` value must be
unique across all of the `mybluemix.net` domain.

Run `cf push`, and watch a bunch of stuff happen.

Upon success, the URL to your app will be printed, and you can then interact with
the application in a web browser.



running the app in the browser
================================================================================





attributions
--------------------------------------------------------------------------------

The file www/images/icon.png originated at the web site below, and is released
to the public domain.

<http://commons.wikimedia.org/wiki/File:Happy_face.svg>



license / copyright
--------------------------------------------------------------------------------

Copyright IBM Corp. 2014 All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

<http://www.apache.org/licenses/LICENSE-2.0>

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
