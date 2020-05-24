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

  _postFormData() {
    const data = {
      name: this.nameField.value,
      email: this.emailField.value,
      message: this.messageField.value,
    }

    return axios.post('https://node-sender.glitch.me/', data)
  }

  _handleFormSubmit(event) {
    event.preventDefault()

    this._postFormData()
      .then(res => messageHandler.showDisplayMessage(res))
      .catch(error => messageHandler.showDisplayMessage(error))
  }
}

export default ContactForm
