// TODO: Import axios

import messageHandler from '../display-message-handler/display-message-handler'

class ContactForm {
  init() {
    this._cacheDOM()
    this._bindEvents()
  }

  _cacheDOM() {
    this.form = document.querySelector('.form')
    this.nameField = document.querySelector('#name')
    this.emailField = document.querySelector('#email')
    this.inputs = document.querySelectorAll('.form-input')
    this.messageField = document.querySelector('#message')
  }

  _bindEvents() {
    this.form.addEventListener('submit', event => this._handleFormSubmit(event))
  }

  _resetForm() {
    Array.from(this.inputs).forEach(input => {
      input.classList.remove('notEmpty')
      input.value = ''
    })
  }

  _handleFormSubmit(event) {
    event.preventDefault()

    const data = {
      name: this.nameField.value,
      email: this.emailField.value,
      message: this.messageField.value,
    }

    axios
      .post('https://node-sender.glitch.me/', data)
      .then(res => {
        messageHandler.displayData(res)

        if (res.data.success) {
          this._resetForm()
        }
      })
      .catch(error => {
        messageHandler.displayData(error)
      })
  }
}

export default ContactForm
