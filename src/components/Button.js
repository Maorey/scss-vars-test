/** A button
 * @param {String} type button type supports: primary warn error
 * @param {Function} onClick fire on click button
 */
function getter(text, type = 'primary', onClick) {
  const button = document.createElement('button')

  button.innerText = text
  button.setAttribute('class', '--button --button-' + type)
  button.onClick = onClick

  return button
}

export default getter
