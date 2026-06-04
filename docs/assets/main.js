
(function () {
  function ready(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }

  function initVisionMode() {
    var button = Array.prototype.find.call(
      document.querySelectorAll('.icon-button'),
      function (item) { return !item.classList.contains('mobile-only'); }
    );
    var enabled = false;

    try {
      enabled = localStorage.getItem('vision-accessible') === 'true';
    } catch (error) {
      enabled = false;
    }

    function apply() {
      document.documentElement.dataset.vision = enabled ? 'accessible' : 'default';
      if (button) {
        button.textContent = enabled ? 'А+' : 'АА';
      }
    }

    apply();

    if (button) {
      button.addEventListener('click', function () {
        enabled = !enabled;
        try {
          localStorage.setItem('vision-accessible', String(enabled));
        } catch (error) {}
        apply();
      });
    }
  }

  function initMobileMenu() {
    var button = document.querySelector('.icon-button.mobile-only');
    var menu = document.getElementById('mobile-navigation');

    if (!button || !menu) return;

    button.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('open');
      button.setAttribute('aria-expanded', String(isOpen));
      button.textContent = isOpen ? '×' : '☰';
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
        button.textContent = '☰';
      });
    });
  }

  function initHeroSlider() {
    var images = Array.prototype.slice.call(document.querySelectorAll('.hero-image'));
    var dots = Array.prototype.slice.call(document.querySelectorAll('.hero-dots button'));
    var index = images.findIndex(function (image) { return image.classList.contains('visible'); });
    var timer;

    if (!images.length) return;
    if (index < 0) index = 0;

    function show(nextIndex) {
      index = nextIndex;
      images.forEach(function (image, itemIndex) {
        image.classList.toggle('visible', itemIndex === index);
      });
      dots.forEach(function (dot, itemIndex) {
        dot.classList.toggle('active', itemIndex === index);
      });
    }

    function start() {
      window.clearInterval(timer);
      timer = window.setInterval(function () {
        show((index + 1) % images.length);
      }, 6000);
    }

    dots.forEach(function (dot, dotIndex) {
      dot.addEventListener('click', function () {
        show(dotIndex);
        start();
      });
    });

    show(index);
    start();
  }

  function initFaq() {
    document.querySelectorAll('.faq-list').forEach(function (list) {
      var items = Array.prototype.slice.call(list.querySelectorAll('.faq-item'));
      var openIndex = items.findIndex(function (item) {
        var answer = item.querySelector('p');
        return answer && !answer.hidden;
      });

      function setOpen(nextIndex) {
        openIndex = nextIndex;
        items.forEach(function (item, itemIndex) {
          var answer = item.querySelector('p');
          var marker = item.querySelector('button span:last-child');
          var isOpen = itemIndex === openIndex;

          if (answer) answer.hidden = !isOpen;
          if (marker) marker.textContent = isOpen ? '−' : '+';
        });
      }

      items.forEach(function (item, itemIndex) {
        var button = item.querySelector('button');
        if (!button) return;

        button.addEventListener('click', function () {
          setOpen(openIndex === itemIndex ? -1 : itemIndex);
        });
      });

      setOpen(openIndex < 0 ? 0 : openIndex);
    });
  }

  function initSvedeniyaSelect() {
    document.querySelectorAll('.mobile-select-label select').forEach(function (select) {
      select.addEventListener('change', function () {
        window.location.href = '../' + select.value + '/';
      });
    });
  }

  function initContactForm() {
    var form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function (event) {
      var note = form.querySelector('.form-note');
      event.preventDefault();

      if (!note) {
        note = document.createElement('p');
        note.className = 'form-note';
        note.textContent = 'Форма работает как клиентская заглушка. Подключение отправки требует backend/API.';
        form.appendChild(note);
      }
    });
  }

  function initStaticLinks() {
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
  }

  ready(function () {
    initVisionMode();
    initMobileMenu();
    initHeroSlider();
    initFaq();
    initSvedeniyaSelect();
    initContactForm();
    initStaticLinks();
  });
})();

