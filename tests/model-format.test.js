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

const textureFixtures = {
  'pack/assets/minecraft/textures/block/stone.png': {
    path: 'pack/assets/minecraft/textures/block/stone.png'
  },
  'pack/assets/custom/textures/entity/creature.png': {
    path: 'pack/assets/custom/textures/entity/creature.png'
  }
}

assert.strictEqual(
  context.findTextureKey('minecraft:block/stone', textureFixtures),
  'pack/assets/minecraft/textures/block/stone.png',
  'textures should resolve from resource-pack folders outside item/'
)

assert.strictEqual(
  context.findTextureKey('custom:entity/creature', textureFixtures),
  'pack/assets/custom/textures/entity/creature.png',
  'namespaced textures should resolve from arbitrary texture folders'
)

assert.strictEqual(
  context.findTextureKey('item/creature', textureFixtures),
  'pack/assets/custom/textures/entity/creature.png',
  'a unique texture basename should work even when its folder differs from the model reference'
)

assert.strictEqual(
  context.resolveModelTextureReference({
    layer0: 'custom:block/stone',
    particle: '#layer0'
  }, 'particle'),
  'custom:block/stone',
  'indirect texture references should resolve'
)

console.log('model format tests passed')
