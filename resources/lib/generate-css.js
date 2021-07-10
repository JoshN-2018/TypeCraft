import calculateFontSizes from './calculate-font-sizes.js'

const baseCss = `html { font-size: 100%; }\n\n`

export default function generateCss(sizes, classes, limits) {
  let css = baseCss
  sizes
    // Calculate the font sizes for each size object
    .map(sizesObj => {
      const fontSizes = calculateFontSizes(sizesObj, classes, limits)
      return {...sizesObj, fontSizes}
    })

    // Generate the css for each size object i.e. each breakpoint
    .map((obj, index, array) => {
      const previous = array[index - 1]
      const previousBreakpoint = previous ? previous.breakpoint : ''
      const mediaQueryStart = previous ? `@media (min-width: ${previousBreakpoint}px) {\n` : ''
      const mediaQueryEnd = previous ? '}\n\n' : '\n'
      let str = mediaQueryStart
      obj.fontSizes.forEach(size => {
        const rem = Math.round((size.typeSizeValue / 16) * 10000) / 10000
        const remSpace = Math.round((size.space / 16) * 10000) / 10000
        str += `${previous ? '  ' : ''}.${size.name} {\n`
        str += `${previous ? '    ' : '  '}font-size: ${rem}rem; /* ${size.typeSize} */\n`
        str += `${previous ? '    ' : '  '}margin-bottom: ${remSpace}rem; /* ${size.space}px */\n`
        str += `${previous ? '  ' : ''}}\n`
      })
      str += mediaQueryEnd
      return str
    })

    // concat all css together
    .forEach(mqCss => {
      css += mqCss
    })

  return css
}