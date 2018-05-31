const assert = require('assert')
const Urano = require('./lib/urano')

it('With function', () => {
  let isReactionWorks = false

  const urano = new Urano({
    counter: 0
  }, () => isReactionWorks = true)
  
  urano.counter++
  
  assert.ok(isReactionWorks)
})

it('With object', () => {
  let isReactionWorks = false

  const urano = new Urano({
    counter: 0
  }, {
    counter() {
      isReactionWorks = true
    }
  })

  urano.counter++

  assert.ok(isReactionWorks)
})
