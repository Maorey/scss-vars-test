import getButton from '@com/Button'
import '@com/scss/button.scss'
// import './scss/button.scss'

// import '@/scss/layout.scss'
import './scss/layout.scss'
import vars from '@/scss/exportVar.scss'
// import vars from './scss/exportVar.scss'


const app = document.body
const container = document.createElement('body')
container.setAttribute('class', 'app-wrapper')

for (let args of [
  ['primary button'],
  ['warn button', 'warn'],
  ['error button', 'error'],
]) {
  container.appendChild(getButton.apply(null, args))
}

const text = document.createElement('p')
text.innerText = JSON.stringify(vars, null, 2)
container.appendChild(text)

app.replaceWith(container)
