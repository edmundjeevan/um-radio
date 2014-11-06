// Licensed under the Apache License. See footer for details.

var path    = require("path")
var async   = require("async")
var express = require("express")

var pkg      = require("../package.json")
var utils    = require("./utils")
var klout    = require("./klout")
var twitter  = require("./twitter")
var api      = require("./api")

var WWWDIR = path.join(__dirname, "../www")
var VENDOR = path.join(__dirname, "../vendor")

var server = exports

server.run = run

//------------------------------------------------------------------------------
function run(config) {
    var key
    var secret

    //---------------------------------
    try {
        key = config.klout.developer_key
        if (!key) throw null
    }
    catch(e) {
        utils.log("klout key not set")
        process.exit(1)
    }


    klout.setKey(key)

    //---------------------------------
    try {
        key    = config.twitter.consumer_key
        secret = config.twitter.consumer_secret

        if (!key) throw null
        if (!secret) throw null
    }
    catch(e) {
        utils.log("twitter key not set")
        process.exit(1)
    }

    twitter.init(key, secret, function(err) {
        run2(err, config)
    })
}

//------------------------------------------------------------------------------
function run2(err, config) {
    if (err) {
        utils.log("error getting twitter token: " + err.message)
        process.exit(1)
    }

    var favIcon = path.join(WWWDIR, "images/icon-032.png")

    var app  = express()
    app.use(express.favicon(favIcon))
    app.use("/",       express.static(WWWDIR))
    app.use("/scripts/package.json.js", handlePackageJSON)
    app.use("/api/v1", api())

    utils.log("starting server on pid " + process.pid + " at http://localhost:" + utils.JL(config.port))
    app.listen(config.port)
}

//------------------------------------------------------------------------------
function handlePackageJSON(request, response) {
    var output = "PackageJSON = " + utils.JL(pkg) + ";"

    response.header("Content-Type", "application/javascript")
    response.send(output)
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
