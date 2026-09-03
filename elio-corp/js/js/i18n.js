// js/i18n.js
(function () {
  var STORAGE_KEY = 'elio-corp-lang';
  var supported = ['en', 'fr', 'es'];

  function getInitialLang() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved && supported.indexOf(saved) !== -1) return saved;
    var browserLang = (navigator.language || 'en').slice(0, 2);
    return supported.indexOf(browserLang) !== -1 ? browserLang : 'en';
  }

  function t(lang, key) {
    var dict = window.translations[lang] || window.translations.en;
    return dict[key];
  }

  function applyLanguage(lang) {
    if (supported.indexOf(lang) === -1) lang = 'en';
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var value = t(lang, el.getAttribute('data-i18n'));
      if (value !== undefined) el.textContent = value;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var value = t(lang, el.getAttribute('data-i18n-placeholder'));
      if (value !== undefined) el.setAttribute('placeholder', value);
    });

    var metaDesc = document.querySelector('meta[name="description"]');
    var descValue = t(lang, 'meta.description');
    if (metaDesc && descValue) metaDesc.setAttribute('content', descValue);

    var titleValue = t(lang, 'meta.title');
    if (titleValue) document.title = titleValue;

    document.querySelectorAll('[data-lang-switch]').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-lang-switch') === lang);
    });

    localStorage.setItem(STORAGE_KEY, lang);
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyLanguage(getInitialLang());
    document.querySelectorAll('[data-lang-switch]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLanguage(btn.getAttribute('data-lang-switch'));
      });
    });
  });
})();
