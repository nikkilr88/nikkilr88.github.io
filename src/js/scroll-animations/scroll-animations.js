class ScrollAnimations {
  init() {
    this._cacheDOM()
    this._bindEvents()
  }

  _cacheDOM() {
    this.navbar = document.querySelector('.navbar')
    this.goToTop = document.querySelector('.go-top')
    this.navbarLinks = document.querySelectorAll('nav li a')
    this.formInputs = document.querySelectorAll('.form-input')
  }

  _bindEvents() {
    this.goToTop.addEventListener('click', () => this._goToTop())

    window.addEventListener('scroll', event => this._handlePageScroll(event))
    window.addEventListener('resize', event => this._handlePageScroll(event))

    Array.from(this.formInputs).forEach(input => {
      input.addEventListener('focusout', event =>
        this._handleInputAnimation(event)
      )
    })

    Array.from(this.navbarLinks).forEach(link => {
      link.addEventListener('click', event => this._handleNavClick(event))
    })
  }

  _goToTop() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }

  // Smooth scroll to section when clicking nav link
  _handleNavClick(event) {
    const scrollTo = event.target.getAttribute('href')

    // Polyfill code for smooth scroll
    document.querySelector(scrollTo).scrollIntoView({
      behavior: 'smooth',
    })
  }

  // Change navbar styles based on scroll position, show 'go to top' button
  _handlePageScroll() {
    // Grab scroll position
    const scrollPos =
      this.scrollY || this.scrollTop || document.documentElement.scrollTop

    // Grab window width
    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth

    // Show / hide go to top button
    if (scrollPos > 1000) {
      this.goToTop.classList.add('show-go-top')
    } else {
      this.goToTop.classList.remove('show-go-top')
    }

    // Early return if screen width is less than 925
    if (windowWidth < 925) {
      return this._setNavStyles('solid')
    }

    // Apply styles based on position
    if (scrollPos > 50) {
      this._setNavStyles('solid')
    } else {
      this._setNavStyles('transparent')
    }
  }

  _setNavStyles(style) {
    this.navbar.classList.remove('navbar--solid')
    this.navbar.classList.remove('navbar--transparent')

    this.navbar.classList.add(`navbar--${style}`)
  }

  _handleInputAnimation(event) {
    // Grab input value
    const val = event.target.value

    if (val) {
      event.target.classList.add('notEmpty')
    } else {
      event.target.classList.remove('notEmpty')
    }
  }
}

export default ScrollAnimations
