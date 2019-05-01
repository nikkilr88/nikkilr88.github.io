const form = document.querySelector('.form')
const inputs = document.querySelectorAll('.form-input')
const name = document.querySelector('#name')
const email = document.querySelector('#email')
const msg = document.querySelector('#message')
const displayMsg = document.querySelector('#display-msg')

// Form input shizz
for (let input of inputs) {
  input.addEventListener('focusout', handleInputAnimation)
}

function handleInputAnimation(e) {
  const val = e.target.value

  if (val) {
    e.target.classList.add('notEmpty')
  } else {
    e.target.classList.remove('notEmpty')
  }
}

// form action shizz
form.addEventListener('submit', handleFormSubmit)

function handleFormSubmit(e) {
  e.preventDefault()

  axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded'

  axios
    .post('https://node-sender.glitch.me/', {
      name: name.value,
      email: email.value,
      message: msg.value
    })
    .then(function(res) {
      displayMsg.innerHTML = res.data.success
        ? `<div class="success">${res.data.success}</div>`
        : `<div class="error">${res.data.error}</div>`

      if (res.data.success) {
        resetForm()
      }
    })
    .catch(function(err) {
      displayMsg.innerText = err
    })
}

// Clear out form
function resetForm() {
  for (let input of inputs) {
    input.classList.remove('notEmpty')
    input.value = ''
  }
}

// Display message shizz
displayMsg.addEventListener('click', hideDisplayMsg)

function hideDisplayMsg() {
  displayMsg.innerHTML = ''
}
