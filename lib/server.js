// Licensed under the Apache License. See footer for details.

path    = require("path")
async   = require("async")
express = require("express")

utils    = require("./utils")

twitter  = require("./twitter")
tracks8  = require("./tracks8")
um       = require("./um")

WWWDIR = path.join(__dirname, "..", "www")

//------------------------------------------------------------------------------
server = exports

server.run = run

//------------------------------------------------------------------------------
function run(config) {

  tasks = {
    initTwitter: function(cb) {twitter.init(config, cb)},
    initTracks8: function(cb) {tracks8.init(config, cb)},
    initUM:      function(cb) {     um.init(config, cb)}
  }

  async.parallel(tasks, function(err, data) {startServer(err, config)})
}

//------------------------------------------------------------------------------
function startServer(err, config) {
  if (err) {
    utils.log("error initializing services: " + err.message)
  }

  var app  = express()
  app.use("/",  express.static(WWWDIR))
  // app.use("/api/v1", api())

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
