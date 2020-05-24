class DisplayMessageHandler {
  constructor() {
    this._cacheDOM()
    this._bindEvents()
  }

  _cacheDOM() {
    this.displayMessage = document.querySelector('#display-msg')
  }

  _bindEvents() {
    this.displayMessage.addEventListener('click', () =>
      this._hideDisplayMessage()
    )
  }

  _hideDisplayMessage() {
    this.displayMessage.innerHTML = ''
  }

  _buildMessageTemplate(className, message) {
    return `<div class="msg ${className}"><i class="far fa-times-circle"></i><span>${message}</span></div>`
  }

  showDisplayMessage(res) {
    const className = res.data
      ? res.data.success
        ? 'success'
        : 'error'
      : 'error'

    this.displayMessage.innerHTML = this._buildMessageTemplate(
      className,
      res.data?.error || res.data?.success || res.response?.data.error
    )
  }
}

const messageHandler = new DisplayMessageHandler()

export default messageHandler
