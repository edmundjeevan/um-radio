// Licensed under the Apache License. See footer for details.

var express = require("express")

var pkg      = require("../package.json")
var utils    = require("./utils")
var twitter  = require("./twitter")

//------------------------------------------------------------------------------
// the APIs supported in this express sub-application all follow a similar flow:
//
// * extract twitter screen name from URL
// * look up data requested in mongodb cache; if found return it
// * look up data from the actual web service; if found, cache it and return it
//------------------------------------------------------------------------------

module.exports = function() {
    var app = express()

    app.use(CORSify)

    app.get("/users/:twitterSN/klout-info.json",   GetKloutInfo)
    app.get("/users/:twitterSN/tweets.json",       GetTweets)
    app.get("/users/:twitterSN/twitter-info.json", GetTwitterInfo)

    return app
}

//------------------------------------------------------------------------------
function GetKloutInfo(request, response) {
    var twitterSN = request.params.twitterSN

    mongo.getKloutInfo(twitterSN, function(err, data){
        if (data) {
            return sendResponseOK(response, data)
        }

        klout.getKloutInfo(twitterSN, function(err, data){
            if (err) return sendResponseError(response, err)

            sendResponseOK(response, data)
            mongo.putKloutInfo(twitterSN, data)
        })
    })
}

//------------------------------------------------------------------------------
function GetTweets(request, response) {
    var twitterSN = request.params.twitterSN

    mongo.getTweets(twitterSN, function(err, data){
        if (data) {
            return sendResponseOK(response, data)
        }

        twitter.getTweets(twitterSN, function(err, data){
            if (err) return sendResponseError(response, err)

            sendResponseOK(response, data)
            mongo.putTweets(twitterSN, data)
        })
    })

}

//------------------------------------------------------------------------------
function GetTwitterInfo(request, response) {
    var twitterSN = request.params.twitterSN

    mongo.getTwitterInfo(twitterSN, function(err, data){
        if (data) {
            return sendResponseOK(response, data)
        }

        twitter.getTwitterInfo(twitterSN, function(err, data){
            if (err) return sendResponseError(response, err)

            sendResponseOK(response, data)
            mongo.putTwitterInfo(twitterSN, data)
        })
    })
}

//------------------------------------------------------------------------------
function sendResponseOK(response, data) {
    sendResponse(response, 200, {data: data})
}

//------------------------------------------------------------------------------
function sendResponseError(response, err) {
    sendResponse(response, err.statusCode, "" + err.message)
}

//------------------------------------------------------------------------------
function sendResponse(response, status, data) {
    if (data == null) data = ""

    response.statusCode = status;
    response.send(data)
}

//------------------------------------------------------------------------------
function CORSify(request, response, next) {
    response.header("Access-Control-Allow-Origin:", "*")
    response.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST")
    next()
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
