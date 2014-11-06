// Licensed under the Apache License. See footer for details.

var URL   = require("url")
var https = require("https")

var utils = require("./utils")

var TwitterURL = "https://api.twitter.com"

var twitter = exports

var BearerToken

//------------------------------------------------------------------------------
twitter.init = function(key, secret, callback) {
    var creds

    creds = key + ":" + secret
    creds = new Buffer(creds).toString("base64")

    url = TwitterURL + "/oauth2/token"
    options = URL.parse(url)
    options.method = "POST"
    options.headers = {
        "Content-Type":  "application/x-www-form-urlencoded;charset=UTF-8",
        "Authorization": "Basic " + creds
    }

    data = "grant_type=client_credentials"
    httpsRequest(options, data, function(err, data) {
        if (!err) {
            BearerToken = data.access_token
            utils.log("twitter bearer token retrieved")
        }

        callback(err, data)
    })
}

//------------------------------------------------------------------------------
twitter.getTweets = function(twitterSN, callback) {
    url = TwitterURL + "/1.1/statuses/user_timeline.json"
    url += "?screen_name=" + twitterSN
    url += "&count=20"
    url += "&trim_user=true"
    url += "&exclude_replies=true"
    url += "&econtributor_details=false"
    url += "&include_rts=false"

    options = URL.parse(url)
    httpsAuthRequest(options, function (err, data) {
        if (err) return callback(err)

        callback(null, {tweets: data})
    })
}

//------------------------------------------------------------------------------
twitter.getTwitterInfo = function(twitterSN, callback) {
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
