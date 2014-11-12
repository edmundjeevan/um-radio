// Licensed under the Apache License. See footer for details.

var app = angular.module('um-radio', ['ngResource'])

app.controller("BodyController", BodyController)

//------------------------------------------------------------------------------
function BodyController($scope, $timeout, $sce) {
  $scope.timeout           = $timeout
  $scope.sce               = $sce

  $scope.helpShown         = false
  $scope.message           = null

  $scope.twitterSearchText = ""
  $scope.mix               = null

  clearSearch($scope)

  $scope.toggleHelp           = function()       { ToggleHelp($scope) }
  $scope.twitterSearchEntered = function()       { TwitterSearchEntered($scope) }
  $scope.twitterSearchPerform = function(search) { TwitterSearchPerform($scope, search) }

  //-----------------------------------
  $scope.inAng = function(label, fn) {
    // console.log("@ ang block: " + label)
    $scope.timeout(function() {
      // console.log("-> ang block: " + label)
      fn()
      // console.log("<- ang block: " + label)
    },1)
  }
}

//------------------------------------------------------------------------------
function ToggleHelp($scope) {
  $scope.helpShown = !$scope.helpShown
}

//------------------------------------------------------------------------------
function TwitterSearchEntered($scope) {
  console.log("in TwitterSearchEntered()")
  clearSearch($scope)

  $scope.inAng("twitterSearchEntered", function(){
    $("#twitterSearchText").blur()
  })

  TwitterGetTweets($scope, $scope.twitterSearchText)
}

//------------------------------------------------------------------------------
function TwitterSearchPerform($scope, search) {
  console.log("in TwitterSearchPerform()")
  clearSearch($scope)

  $scope.twitterSearchText = search

  TwitterGetTweets($scope, search)
}

//------------------------------------------------------------------------------
function clearSearch($scope) {
  $scope.tweets = []
  $scope.scores = []
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
