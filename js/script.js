const form = document.querySelector('.form')
const name = document.querySelector('#name')
const nav = document.querySelector('.navbar')
const email = document.querySelector('#email')
const msg = document.querySelector('#message')
const goTop = document.querySelector('.go-top')
const navLinks = document.querySelectorAll('nav li a')
const inputs = document.querySelectorAll('.form-input')
const displayMsg = document.querySelector('#display-msg')
const faders = document.querySelectorAll('.fadeInOnScroll')

// TODO: Covert over to es6

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
  nav.classList.remove('navbar--solid', 'navbar--transparent')
  // TODO: Currently does not work in IE - Change to es5 or wait and use gulp to transpile everything
  nav.classList.add(`navbar--${style}`)
}

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

// Form action shizz
form.addEventListener('submit', handleFormSubmit)

// Send form data to backend
function handleFormSubmit(e) {
  e.preventDefault()

  const data = {
    name: name.value,
    email: email.value,
    message: msg.value,
  }

  axios
    .post('https://node-sender.glitch.me/', data)
    .then(function (res) {
      displayData(res)

      if (res.data.success) {
        resetForm()
      }
    })
    .catch(function (err) {
      displayMsg.innerHTML =
        '<div class="msg error"><i class="far fa-times-circle"></i>' +
        err +
        '</div>'
    })
}

// Clear out form
function resetForm() {
  Array.prototype.slice.call(inputs).forEach(function (input) {
    input.classList.remove('notEmpty')
    input.value = ''
  })
}

// Display message shizz
displayMsg.addEventListener('click', hideDisplayMsg)

function hideDisplayMsg() {
  displayMsg.innerHTML = ''
}

function displayData(res) {
  displayMsg.innerHTML = res.data.success
    ? '<div class="msg success"><i class="far fa-times-circle"></i><span>' +
      res.data.success +
      '</span></div>'
    : '<div class="msg error"><i class="far fa-times-circle"></i><span>' +
      res.data.error +
      '</span></div>'
}

// Intersection observer -- Fade in on scroll
const options = {
  rootMargin: '0px 0px -75px 0px',
}

const observer = new IntersectionObserver(fadeInOnScroll, options)

function fadeInOnScroll(entries, observer) {
  let serviceOffset = 100

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]

    // Early return if the element is not visible on screen
    if (!entry.isIntersecting) return

    // Show tech icons
    if (entry.target.classList.contains('service')) {
      setTimeout(function () {
        entry.target.classList.add('fadeIn')
      }, serviceOffset)

      serviceOffset += 300
    }
    // Show everything else
    else {
      entry.target.classList.add('fadeIn')
    }

    // This is to stop watching or "observing" the element
    // Everything above this will only run once
    observer.unobserve(entry.target)
  }
}

for (let i = 0; i < faders.length; i++) {
  observer.observe(faders[i])
}
