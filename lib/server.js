// Licensed under the Apache License. See footer for details.

var path    = require("path")
var async   = require("async")
var express = require("express")

var utils    = require("./utils")

var api      = require("./api")

var WWWDIR = path.join(__dirname, "..", "www")

//------------------------------------------------------------------------------
var server = exports

server.run = run

//------------------------------------------------------------------------------
function run(config) {
  api.init(config, _startServer)

  function _startServer(err, data) {
    startServer(err, config)
  }
}

//------------------------------------------------------------------------------
function startServer(err, config) {
  if (err) {
    utils.log("error initializing services: " + err.message)
  }

  var app  = express()

  app.use("/",       express.static(WWWDIR))
  app.use("/api/v1", api.getMiddleware())

  utils.log("starting server on " + config.url)
  app.listen(config.port, config.bind, function() {
    utils.log("started  server on " + config.url)
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
