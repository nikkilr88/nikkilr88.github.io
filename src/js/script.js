import '@babel/polyfill'
import 'intersection-observer'

// !: Import classes
import IntersectionObserverAnimations from './intersection-observer/intersection-observer'
import ContactForm from './contact-form/contact-form'

// !: Initiate classes
const ioa = new IntersectionObserverAnimations()
ioa.init()

const contactForm = new ContactForm()
contactForm.init()

const nav = document.querySelector('.navbar')
const goTop = document.querySelector('.go-top')
const navLinks = document.querySelectorAll('nav li a')
const inputs = document.querySelectorAll('.form-input')

// Scroll to top shizz
goTop.addEventListener('click', goToTop)

function goToTop() {
  window.scroll({ top: 0, left: 0, behavior: 'smooth' })
}

// Add click listener on nav links
Array.prototype.slice.call(navLinks).forEach(function (link) {
  link.addEventListener('click', handleNavClick)
})

// Handle nav link clicks
function handleNavClick(e) {
  const scrollTo = e.target.getAttribute('href')

  // Polyfill code for smooth scroll
  document.querySelector(scrollTo).scrollIntoView({
    behavior: 'smooth',
  })
}

// Listen for window scroll
window.addEventListener('scroll', handleScroll)
window.addEventListener('resize', handleScroll)

// Scroll handler
function handleScroll(e) {
  // Grab scroll position
  const scrollPos =
    this.scrollY || this.scrollTop || document.documentElement.scrollTop

  // Grab window width
  const windowWidth = window.innerWidth || document.documentElement.clientWidth

  // Show / hide go to top button
  if (scrollPos > 1000) {
    goTop.classList.add('show-go-top')
  } else {
    goTop.classList.remove('show-go-top')
  }

  // Early return if screen width is less than 925
  if (windowWidth < 925) {
    return setNavStyles('solid')
  }

  // Apply styles based on position
  if (scrollPos > 50) {
    setNavStyles('solid')
  } else {
    setNavStyles('transparent')
  }
}

function setNavStyles(style) {
  nav.classList.remove('navbar--solid')
  nav.classList.remove('navbar--transparent')

  nav.classList.add(`navbar--${style}`)
}

// TODO: Add to contact form class
// Form input shizz
Array.prototype.slice.call(inputs).forEach(function (input) {
  input.addEventListener('focusout', handleInputAnimation)
})

// Form animations handler
function handleInputAnimation(e) {
  // Grab input value
  const val = e.target.value

  if (val) {
    e.target.classList.add('notEmpty')
  } else {
    e.target.classList.remove('notEmpty')
  }
}
