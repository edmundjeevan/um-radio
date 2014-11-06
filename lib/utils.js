// Licensed under the Apache License. See footer for details.

var util  = require("util")

var pkg   = require("../package.json")

var utils = exports

//------------------------------------------------------------------------------
utils.log = function(message) {
    console.log(pkg.name + ": " + message)
}

//------------------------------------------------------------------------------
utils.onlyCallOnce = function(callback) {
    var alreadyCalled = false

    return function onlyCalledOnce() {
        if (alreadyCalled) return

        alreadyCalled = true
        return callback.apply(this, arguments)
    }
}

//------------------------------------------------------------------------------
utils.JS = function(object) { return JSON.stringify(object) }
utils.JL = function(object) { return JSON.stringify(object, null, 4) }

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
