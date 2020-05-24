// !: Polyfills
import '@babel/polyfill'
import 'intersection-observer'

// !: Import classes
import IntersectionObserverAnimations from './intersection-observer/intersection-observer'
import ContactForm from './contact-form/contact-form'
import ScrollAnimations from './scroll-animations/scroll-animations'

// !: Initiate classes
const ioa = new IntersectionObserverAnimations()
ioa.init()

const contactForm = new ContactForm()
contactForm.init()

const scrollAnimations = new ScrollAnimations()
scrollAnimations.init()
