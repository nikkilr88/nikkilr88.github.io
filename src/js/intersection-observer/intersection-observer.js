class IntersectionObserverAnimations {
  init() {
    this.cacheDOM()
    this.createObserver()
    this.observeFaders()
  }

  cacheDOM() {
    this.faders = document.querySelectorAll('.fadeInOnScroll')
  }

  createObserver() {
    const options = {
      rootMargin: '0px 0px -75px 0px',
    }

    this.observer = new IntersectionObserver(this.fadeInOnScroll, options)
  }

  observeFaders() {
    for (let i = 0; i < this.faders.length; i++) {
      this.observer.observe(this.faders[i])
    }
  }

  fadeInOnScroll(entries, observer) {
    let serviceOffset = 100

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i]

      // Early return if the element is not visible on screen
      if (!entry.isIntersecting) return

      // Show skills
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
}

export default IntersectionObserverAnimations
