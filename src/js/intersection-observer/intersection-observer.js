class IntersectionObserverAnimations {
  // TODO: Refactor for loops to for of

  init() {
    this._cacheDOM()
    this._createObserver()
    this._observeFaders()
  }

  _cacheDOM() {
    this.faders = document.querySelectorAll('.fadeInOnScroll')
  }

  _createObserver() {
    const options = {
      rootMargin: '0px 0px -75px 0px',
    }

    this.observer = new IntersectionObserver(this._fadeInOnScroll, options)
  }

  _observeFaders() {
    for (let fader of this.faders) {
      this.observer.observe(fader)
    }
  }

  _fadeInOnScroll(entries, observer) {
    let offset = 100

    for (let entry of entries) {
      // Early return if the element is not visible on screen
      if (!entry.isIntersecting) return

      // Show skills
      if (entry.target.classList.contains('service')) {
        setTimeout(function () {
          entry.target.classList.add('fadeIn')
        }, offset)

        offset += 300
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
}

export default IntersectionObserverAnimations
