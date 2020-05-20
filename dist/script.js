"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var form = document.querySelector('.form');
var name = document.querySelector('#name');
var nav = document.querySelector('.navbar');
var email = document.querySelector('#email');
var msg = document.querySelector('#message');
var goTop = document.querySelector('.go-top');
var navLinks = document.querySelectorAll('nav li a');
var inputs = document.querySelectorAll('.form-input');
var displayMsg = document.querySelector('#display-msg');
var faders = document.querySelectorAll('.fadeInOnScroll'); // TODO: Covert over to es6
// Scroll to top shizz

goTop.addEventListener('click', goToTop);

function goToTop() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
} // Add click listener on nav links


Array.from(navLinks).forEach(function (link) {
  link.addEventListener('click', handleNavClick);
}); // Handle nav link clicks

function handleNavClick(e) {
  var scrollTo = e.target.getAttribute('href'); // Polyfill code for smooth scroll

  document.querySelector(scrollTo).scrollIntoView({
    behavior: 'smooth'
  });
} // Listen for window scroll


window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleScroll); // Scroll handler

function handleScroll(e) {
  // Grab scroll position
  var scrollPos = this.scrollY || this.scrollTop || document.documentElement.scrollTop; // Grab window width

  var windowWidth = window.innerWidth || document.documentElement.clientWidth; // Show / hide go to top button

  if (scrollPos > 1000) {
    goTop.classList.add('show-go-top');
  } else {
    goTop.classList.remove('show-go-top');
  } // Early return if screen width is less than 925


  if (windowWidth < 925) {
    return setNavStyles('solid');
  } // Apply styles based on position


  if (scrollPos > 50) {
    setNavStyles('solid');
  } else {
    setNavStyles('transparent');
  }
}

function setNavStyles(style) {
  nav.classList.remove('navbar--solid', 'navbar--transparent');
  nav.classList.add("navbar--".concat(style));
} // Form input shizz


Array.from(inputs).forEach(function (input) {
  input.addEventListener('focusout', handleInputAnimation);
}); // Form animations handler

function handleInputAnimation(e) {
  // Grab input value
  var val = e.target.value;

  if (val) {
    e.target.classList.add('notEmpty');
  } else {
    e.target.classList.remove('notEmpty');
  }
} // Form action shizz


form.addEventListener('submit', handleFormSubmit); // Send form data to backend

function handleFormSubmit(e) {
  e.preventDefault();
  var data = {
    name: name.value,
    email: email.value,
    message: msg.value
  };
  axios.post('https://node-sender.glitch.me/', data).then(function (res) {
    displayData(res);

    if (res.data.success) {
      resetForm();
    }
  })["catch"](function (err) {
    displayMsg.innerHTML = '<div class="msg error"><i class="far fa-times-circle"></i>' + err + '</div>';
  });
} // Clear out form


function resetForm() {
  Array.from(inputs).forEach(function (input) {
    input.classList.remove('notEmpty');
    input.value = '';
  });
} // Display message shizz


displayMsg.addEventListener('click', hideDisplayMsg);

function hideDisplayMsg() {
  displayMsg.innerHTML = '';
}

function displayData(res) {
  displayMsg.innerHTML = res.data.success ? '<div class="msg success"><i class="far fa-times-circle"></i><span>' + res.data.success + '</span></div>' : '<div class="msg error"><i class="far fa-times-circle"></i><span>' + res.data.error + '</span></div>';
} // Intersection observer -- Fade in on scroll


var options = {
  rootMargin: '0px 0px -75px 0px'
};
var observer = new IntersectionObserver(fadeInOnScroll, options);

function fadeInOnScroll(entries, observer) {
  var serviceOffset = 100;

  var _loop = function _loop(i) {
    var entry = entries[i]; // Early return if the element is not visible on screen

    if (!entry.isIntersecting) return {
      v: void 0
    }; // Show tech icons

    if (entry.target.classList.contains('service')) {
      setTimeout(function () {
        entry.target.classList.add('fadeIn');
      }, serviceOffset);
      serviceOffset += 300;
    } // Show everything else
    else {
        entry.target.classList.add('fadeIn');
      } // This is to stop watching or "observing" the element
    // Everything above this will only run once


    observer.unobserve(entry.target);
  };

  for (var i = 0; i < entries.length; i++) {
    var _ret = _loop(i);

    if (_typeof(_ret) === "object") return _ret.v;
  }
}

for (var i = 0; i < faders.length; i++) {
  observer.observe(faders[i]);
}