const assert = require('assert')
const fs = require('fs')
const path = require('path')
const vm = require('vm')

const context = vm.createContext({})
const validatorPath = path.join(__dirname, '..', 'js', 'checkFiles.js')
vm.runInContext(fs.readFileSync(validatorPath, 'utf8'), context)

function modelWith(element) {
  return {
    textures: {main: 'block/stone'},
    elements: [element]
  }
}

function elementWith(rotation) {
  return {
    from: [0, 0, 0],
    to: [16, 16, 16],
    rotation: rotation
  }
}

assert.deepStrictEqual(
  Array.from(context.checkModel(modelWith(elementWith({
    origin: [8, 8, 8],
    x: 13.5,
    y: -91.25,
    z: 270
  })))),
  [],
  'modern multi-axis rotations should be valid'
)

assert.deepStrictEqual(
  Array.from(context.checkModel(modelWith(elementWith({
    origin: [8, 8, 8],
    axis: 'z',
    angle: -67.5
  })))),
  [],
  'legacy rotations should accept arbitrary finite angles'
)

assert.deepStrictEqual(
  Array.from(context.checkModel(modelWith({
    from: [16, 0, 0],
    to: [0, 16, 16]
  }))),
  [],
  'negative-sized cubes should be valid'
)

assert.deepStrictEqual(
  Array.from(context.checkModel(modelWith(elementWith({
    origin: [8, 8, 8],
    x: 'ninety'
  })))),
  ['The "x" property in "rotation" for element "0" is invalid.'],
  'modern axis values must be finite numbers'
)

assert.deepStrictEqual(
  Array.from(context.checkModel(modelWith(elementWith({
    origin: [8, 8, 8],
    angle: 15
  })))),
  ['Couldn\'t find the "axis" property in "rotation" for element "0".'],
  'incomplete legacy rotations should remain invalid'
)

console.log('model format tests passed')
