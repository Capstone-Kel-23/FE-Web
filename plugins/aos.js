// @/plugins/aos.js
// I've went ahead to declare all the config here so it is global
// Read up more here: https://github.com/michalsnik/aos

import AOS from 'aos'
import 'aos/dist/aos.css'

export default ({ app }) => {
  app.AOS = AOS.init({
    disable: window.innerWidth < 600,
    // offset: 200,
    duration: 500,
    easing: 'ease-in-out-cubic',
    once: true
  }) // or any other options you need
}
