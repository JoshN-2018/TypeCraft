function times(fn, amount, skip = 0) {
  return function execute(...args) {
    const result = [];
    for (let i = skip; i < amount; i++) {
      result.push(fn(...args, i + 1))
    }
    return result
  }
}

function recursiveCompute(operator) {
  return function execute(value, times, output) {
    if (times === 0) return output || value

    if (output === undefined) {
      return execute(value, times - 1, value)
    }

    return execute(value, times - 1, operator(output, value))
  }
}
const multiply = (x, y) => x * y
const devide = (x, y) => x / y
const recursiveMultiply = recursiveCompute(multiply)
const recursiveDevide = recursiveCompute(devide)

export default function calculateFontSizes(activeSizeObj, _classes, limits) {
  const classes = [..._classes].reverse()
  const classesWithLimits = limits.map(limit => limit.name)

  const ratio = activeSizeObj.typeScale
  const typeBase = activeSizeObj.baseType

  const basisClassObject = classes.find(classObject => classObject.hasOwnProperty('basis'))
  const basisIndex = classes.indexOf(basisClassObject)
  const totalDevidedLevels = basisIndex + 1
  const totalMultipliedLevels = (classes.length - basisIndex)
  
  const levelsDevided = times(recursiveDevide, totalDevidedLevels, 1)(ratio)
  const levelBasis = ratio
  const levelsMultiplyed = times(recursiveMultiply, totalMultipliedLevels, 1)(ratio)

  const levels = [...levelsDevided.reverse(), levelBasis, ...levelsMultiplyed]

  let typeSpaceModifier = 0.25 // exaggerated spacing for very tight scales
  if (ratio > 1.25) {
    typeSpaceModifier = 0.1618 // Golden ratio
  }
  if (ratio > 1.33) {
    typeSpaceModifier = 0.1414  // Augmented 4th
  }
  if (ratio > 1.414) {
    typeSpaceModifier = 0.1125 // Major 2nd
  }

  const classesWithSizes = classes.map((classObj, index, array) => {
    const totalClasses = array.length
    const level = levels[index]
    const limit = limits.find(limit => limit.name === classObj.name)
    let typeSizeValue = Math.round(level * typeBase)
    let typeSize = `${typeSizeValue}px`
    if (limit && limit.value < typeSizeValue) {
      typeSizeValue = limit.value
      typeSize = `${typeSizeValue}px`
    }
    const space = typeSizeValue * typeSpaceModifier * Math.pow(ratio, totalClasses - index)


    return {
      ...classObj,
      level,
      typeSize,
      typeSizeValue,
      space: Math.round((space * 10000)) / 10000
    }
  })
  
  return classesWithSizes.reverse()
}