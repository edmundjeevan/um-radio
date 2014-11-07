// Licensed under the Apache License. See footer for details.

var URL   = require("url")
var https = require("https")

var request = require("request")

var utils = require("./utils")

var TwitterURL  = "https://api.twitter.com"
var BearerToken = null

//------------------------------------------------------------------------------
var twitter = exports

twitter.init           = init
twitter.getTweets      = getTweets

//------------------------------------------------------------------------------
function init(config, cb) {
  utils.log("initializing the Twitter")

  var options = {
    url:      TwitterURL + "/oauth2/token",
    formData: { grant_type: "client_credentials" },
    auth:     { user: config.twitter.key, pass: config.twitter.secret }
  }

  // utils.log("issuing request: " + utils.JL(options))
  request.post(options, GotToken)

  //-----------------------------------
  function GotToken(err, response, body) {
    utils.log("twitter.GotToken:")
    // utils.log("   err:         " + utils.JL(err))
    // utils.log("   response:    " + utils.JL(response))

    if (err) {
      utils.log("error getting Twitter bearer token")
      return cb(err)
    }

    try {
      body = JSON.parse(body)
    }
    catch (err) {
      utils.log("error parsing Twitter bearer token")
      return cb(err)
    }

    // utils.log("   body:        " + utils.JL(body))
    BearerToken = body.access_token
    utils.log("   BearerToken: " + BearerToken)

    if (BearerToken == null) {
      utils.log("error extracting Twitter bearer token")
      return cb(Error("access_token not found in Twitter response body"))
    }

    cb(err)
  }
}

//------------------------------------------------------------------------------
function getTweets(search, cb) {
  // Your search URL is: https://api.twitter.com/1.1/search/tweets.json?q=%23superbowl
  utils.log("getting tweets")
  cb(null, {})
}


//------------------------------------------------------------------------------
function getTwitterInfo(twitterSN, callback) {
  var url

  url = TwitterURL + "/1.1/users/show.json"
  url += "?screen_name=" + twitterSN
  url += "&include_entities=false"

  options = URL.parse(url)
  httpsAuthRequest(options, callback)
}

//------------------------------------------------------------------------------
function httpsAuthRequest(options, data, callback) {
  if (!options.headers) {
    options.headers = {}
  }
  options.headers.Authorization = "Bearer " + BearerToken

  httpsRequest(options, data, callback)
}

//------------------------------------------------------------------------------
function httpsRequest(options, data, callback) {
  if (callback === undefined) {
    callback = data
    data     = undefined
  }

  callback = utils.onlyCallOnce(callback)

  if (!options.method) options.method = "GET"

  // utils.log("httpRequest(" + url + ")")
  var request = https.request(options, function(response) {
    handleHttpsResponse(response, callback)
  })

  request.on("error", function(err) {
    callback({statusCode: 500, message: err})
  })

  if (data != null) {
    request.write(data)
  }

  request.end()
}

//------------------------------------------------------------------------------
function handleHttpsResponse(response, callback) {
  response.setEncoding("utf8")

  var body = ""

  response.on("data", function (chunk) {
    body += chunk
  })

  response.on("end", function (chunk) {
    if (chunk) {
      body += chunk
    }

    if (response.statusCode != 200) {
      callback({statusCode: response.statusCode, message: body})
      return
    }

    if (body == "") {
      callback(null, "")
      return
    }

    try {
      body = JSON.parse(body)
    }
    catch (err) {
      callback({statusCode: 500, message: err})
      return
    }

    callback(null, body)
  })
}

//------------------------------------------------------------------------------
// Copyright IBM Corp. 2014
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//------------------------------------------------------------------------------
