export default function breakBg() {
  const breakBgRoot = document.querySelector('[data-break-bg]')

  // This function accepts the sizes array, it filters out the size object where
  // the breakpoint is Infinity, for each remaining object, it creates the 
  // elements and displays them. The label is set with the index of the array.
  // An array is 0 based so we need to do +1 to it.
  function displayBreakpoints(sizes) {
    breakBgRoot.innerHTML = ''

    sizes
      .filter(size => size.breakpoint !== Infinity)
      .forEach((size, index) => {
        const breakpointIndicator = document.createElement('div')
        const label = document.createElement('p')
        
        breakpointIndicator.classList.add('breakpoint-indicator')
        breakpointIndicator.style.minWidth = `${size.breakpoint}px`
        
        label.innerHTML = `Break ${index + 1} &#8212;`

        breakpointIndicator.appendChild(label)
        breakBgRoot.appendChild(breakpointIndicator)
      })
  }

  return {
    updateBreakpoints(newSizes) {
      displayBreakpoints(newSizes)
    }
  }
}