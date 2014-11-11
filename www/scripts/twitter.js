// Licensed under the Apache License. See footer for details.

function TwitterGetTweets($scope, search) {
  var url     = "/api/v1/tweets.json?q=" + encodeURIComponent(search)
  var options = {
    dataType: "json",
  }

  $scope.tweetsMessage = "loading tweets"

  $.ajax(url, options).
    done(gotTweets).
    fail(gotTweetsError)

  //-------------------------------------
  function gotTweets(data, textStatus, jqXHR) {
    // console.log("gotTweets:")
    // console.log("  data:       " + JSON.stringify(data))
    // console.log("  textStatus: " + textStatus)

  //        text:       status.text,
  //        created_at: status.created_at,
  //        user: {
  //          name:     status.user.name,
  //          icon:     status.user.profile_image_url_https
  //        }

    // console.log(JSON.stringify(data, null, 4))


    var text = []
    data.data.forEach(function(status) {
      text.push(status.text)
    })

    text = text.join("\n\n")

    $scope.timeout(function(){
      if (data.data.length == 0)
        $scope.tweetsMessage = "no tweets found"
      else
        $scope.tweetsMessage = null

      $scope.tweets = data.data

      if (data.data.length != 0)
        UserModelGetUserModel($scope, text)
    }, 10)
  }

  //-------------------------------------
  function gotTweetsError(jqXHR, textStatus, error) {
    var message = "error getting tweets: " + textStatus + ": " + error

    $scope.timeout(function(){
      $scope.tweetsMessage = message
    }, 10)
  }

}

//------------------------------------------------------------------------------

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
