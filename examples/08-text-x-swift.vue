<template>
  <md-card>
    <md-card-actions>
      <div class="md-subhead">
        <span>mode: {{ cmOption.mode }}</span>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <span>theme: {{ cmOption.theme }}</span>
      </div>
      <md-button class="md-icon-button"
                 target="_blank"
                 href="https://github.com/surmon-china/vue-codemirror/tree/master/examples/08-text-x-swift.vue">
        <md-icon>code</md-icon>
      </md-button>
    </md-card-actions>
    <md-card-media>
      <div class="codemirror">
        <!-- codemirror -->
        <codemirror v-model="code" :options="cmOption"></codemirror>
      </div>
    </md-card-media>
  </md-card>
</template>

<script>

  // language
  import 'codemirror/mode/swift/swift.js'

  // theme css
  import 'codemirror/theme/rubyblue.css'
  
  export default {
    data() {
const code =
`
//
//  TipCalculatorModel.swift
//  TipCalculator
//
//  Created by Main Account on 12/18/14.
//  Copyright (c) 2014 Razeware LLC. All rights reserved.
//

import Foundation

class TipCalculatorModel {

  var total: Double
  var taxPct: Double
  var subtotal: Double {
    get {
      return total / (taxPct + 1)
    }
  }

  init(total: Double, taxPct: Double) {
    self.total = total
    self.taxPct = taxPct
  }

  func calcTipWithTipPct(tipPct: Double) -> Double {
    return subtotal * tipPct
  }

  func returnPossibleTips() -> [Int: Double] {

    let possibleTipsInferred = [0.15, 0.18, 0.20]
    let possibleTipsExplicit:[Double] = [0.15, 0.18, 0.20]

    var retval = [Int: Double]()
    for possibleTip in possibleTipsInferred {
      let intPct = Int(possibleTip*100)
      retval[intPct] = calcTipWithTipPct(possibleTip)
    }
    return retval

  }

}
`
      return {
        code,
        cmOption: {
          tabSize: 4,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          mode: 'text/x-swift',
          lineWrapping: true,
          theme: 'rubyblue'
        }
      }
    }
  }
</script>

