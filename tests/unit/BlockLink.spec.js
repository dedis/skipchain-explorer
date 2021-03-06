/* eslint-env mocha */
const assert = require('assert')
const Vue = require('./Vue')
const BackwardLink = require('../../src/components/BackwardLink.vue').default

const hash = '09a980e059038cd'
const block = 'b0b469ea6b5c0e62152d0d0de320863b940a23e5f2d4292f3a34385191307255'

var vm

// Mount the instance
before(function () {
  const Constructor = Vue.extend(BackwardLink)
  vm = new Constructor({
    propsData: {
      block,
      hash,
      blockIndex: 0,
      chain: ''
    },
    props: ['chain', 'blockIndex', 'hash', 'block']
  }).$mount()
})

// Inspect the render output
describe('A simple block link', function () {
  it('displays the hash of the block', function () {
    const text = vm.$el.textContent
    assert.ok(text.includes(hash))
    assert.ok(text.includes(block.slice(0, 15)))
  })
})
