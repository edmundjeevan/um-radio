// Licensed under the Apache License. See footer for details.

var utils  = require("./utils")
var server = require("./server")
var mongo  = require("./mongo")

var cli = exports

var PORT = parseInt(process.env.VCAP_APP_PORT || process.env.PORT || "8000", 10)

if (isNaN(PORT)) {
    utils.log("invalid port from environment: " + process.env.PORT)
    process.exit(1)
}

cli.run = run

//------------------------------------------------------------------------------
if (require.main == module) {
    cli.run()
}

//------------------------------------------------------------------------------
function run(args) {

    mongo.init(function(err) {
        if (err) {
            utils.log("error initializing mongodb: " + err)
            process.exit(1)
        }

        run2(args)
    })
}

//------------------------------------------------------------------------------
function run2(args) {
    if (!args) {
        args = process.argv.slice(2)
    }

    var config = getConfig()
    config.port     = PORT

    utils.log("---------------------------------------------------------------")
    server.run(config)

    try {
        process.on("SIGTERM", function() {
            utils.log("stopping server on pid " + process.pid)
            process.exit(0)
        })
    }
    catch(e) {}
}

//------------------------------------------------------------------------------
function getConfig() {
    try {
        return require("../config.json")
    }
    catch (e) {
        utils.log("unable to read config.json file: " + e)
        process.exit(1)
    }
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
