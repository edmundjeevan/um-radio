// Licensed under the Apache License. See footer for details.

function UserModel2Tracks8(category) {
  var result = UserModel2Tracks8.map[category]

  if (result == "")   result = null
  if (result == null) result = "Curiosity"

  return result
}

//------------------------------------------------------------------------------
UserModel2Tracks8.map = {
  "Achievement striving": "achievement_hunter",
  "Activity level":       "activity",
  "Adventurousness":      "adventurous",
  "Altruism":             "empathy",
  "Anger":                "anger",
  "Anxiety":              "anxiety",
  "Artistic interests":   "artistic",
  "Assertiveness":        "assertive",
  "Cautiousness":         "cautious",
  "Challenge":            "challenge",
  "Cheerfulness":         "cheerful",
  "Closeness":            "closeness",
  "Conservation":         "conservation",
  "Cooperation":          "together",
  "Curiosity":            "curious",
  "Depression":           "depression",
  "Dutifulness":          "duty",
  "Emotionality":         "emotional",
  "Excitement":           "excitement",
  "Excitement-seeking":   "excitement",
  "Friendliness":         "friendly",
  "Gregariousness":       "gregarious",
  "Harmony":              "harmony",
  "Hedonism":             "hedonism",
  "Ideal":                "idealistic",
  "Imagination":          "imagination",
  "Immoderation":         "extreme",
  "Intellect":            "intellectual",
  "Liberalism":           "flexibility",
  "Liberty":              "liberty",
  "Love":                 "love",
  "Modesty":              "modest",
  "Morality":             "morality",
  "Openness to change":   "open",
  "Orderliness":          "order",
  "Practicality":         "practical",
  "Self-consciousness":   "vain",
  "Self-discipline":      "discipline",
  "Self-efficacy":        "efficiency",
  "Self-enhancement":     "enhanced",
  "Self-expression":      "self_expression",
  "Self-transcendence":   "transcendence",
  "Stability":            "level",
  "Structure":            "structures",
  "Sympathy":             "sympathy",
  "Trust":                "trust",
  "Vulnerability":        "vulnerable",
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
