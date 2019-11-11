export default function headCss() {
  const styleElement = document.querySelector('[data-output-css]')

  return {
    updateCss(newCss) {
      styleElement.innerHTML = newCss
    }
  }
}