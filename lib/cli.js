// Licensed under the Apache License. See footer for details.

var config = require("./config")
var utils  = require("./utils")
var server = require("./server")

//------------------------------------------------------------------------------
var cli = exports

cli.run = run

//------------------------------------------------------------------------------
if (require.main == module) cli.run()

//------------------------------------------------------------------------------
function run(args) {
  var cfg = config.getConfig()

  utils.log("config: " + JSON.stringify(cfg, null, 4))

  server.run(cfg)
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
