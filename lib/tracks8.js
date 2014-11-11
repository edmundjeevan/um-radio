// Licensed under the Apache License. See footer for details.

var request = require("request")

var utils = require("./utils")

var Tracks8URL = "http://8tracks.com"

var Tracks8Key = null

//------------------------------------------------------------------------------
var tracks8 = exports

tracks8.init           = init
tracks8.getTracks      = getTracks

//------------------------------------------------------------------------------
function init(config, cb) {
  utils.log("initializing 8tracks")

  Tracks8Key = config.tracks8.key

  cb()
}

//------------------------------------------------------------------------------
function getTracks(search, cb) {
  var url = Tracks8URL + "/mix_sets/tags:" + search + ":safe.json"
  var mix    = null
  var tracks = null

  // utils.log("tracks8.getTracks: url: " + url)

  var options = {
    url:  url,
    qs:   { api_key: Tracks8Key, include: "mixes"},
    json: true
  }

  // utils.log("issuing request: " + utils.JL(options))
  request.get(options, gotMixes)

  //-----------------------------------
  function gotMixes(err, response, body) {
    if (err) {
      utils.log("error getting 8tracks mixes for " + search)
      return cb(err)
    }

    if ((!body.mixes) || (body.mixes.length == 0)) {
      utils.log("no getting 8tracks mixes for " + search)
      return cb(err)
    }

    mix = body.mixes[0]
    utils.log("mix: " + utils.JL(mix))

    var result = {
      name:  mix.name,
      url:   Tracks8URL + mix.web_path,
      image: mix.cover_urls.sq100
    }

    cb(null, result)
  }

  //-----------------------------------
  function gotTracks(err, response, body) {
    if (err) {
      utils.log("error getting 8tracks tracks for " + mix.id)
      return cb(err)
    }

    utils.log("tracks: " + utils.JL(body))

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
