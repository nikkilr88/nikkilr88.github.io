// Form input shizz
const inputs = document.querySelectorAll('.form-input')

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
