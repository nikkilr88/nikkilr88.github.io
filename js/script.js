const nav = document.querySelector('.navbar')
const form = document.querySelector('.form')
const inputs = document.querySelectorAll('.form-input')
const name = document.querySelector('#name')
const email = document.querySelector('#email')
const msg = document.querySelector('#message')
const displayMsg = document.querySelector('#display-msg')

// Listen for window scroll
window.addEventListener('scroll', handleScroll)

// Scroll handler
function handleScroll(e) {
  // Grab scroll position and window width
  const scrollPos =
    this.scrollY || this.scrollTop || document.documentElement.scrollTop
  const windowWidth = window.innerWidth

  // Early return if screen width is less than 925
  if (windowWidth < 925) return

  // Apply styles based on position
  if (scrollPos > 100) {
    nav.style.padding = '25px'
    nav.style.boxShadow = 'rgba(0, 0, 0, 0.5) 0px 5px 10px -10px'
    nav.style.background = '#f9f9f9'
  } else {
    nav.style.padding = '50px'
    nav.style.boxShadow = 'none'
    nav.style.background = 'none'
  }
}

// Form input shizz
Array.prototype.slice.call(inputs).forEach(function(input) {
  input.addEventListener('focusout', handleInputAnimation)
})

// Form animations handler
function handleInputAnimation(e) {
  // Grab input value
  const val = e.target.value

  // Keey form label if if input is not empty
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
    message: msg.value
  }

  axios
    .post('https://node-sender.glitch.me/', data)
    .then(function(res) {
      displayData(res)

      if (res.data.success) {
        resetForm()
      }
    })
    .catch(function(err) {
      displayMsg.innerHTML =
        '<div class="msg error"><i class="far fa-times-circle"></i>' +
        err +
        '</div>'
    })
}

// Clear out form
function resetForm() {
  Array.prototype.slice.call(inputs).forEach(function(input) {
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
