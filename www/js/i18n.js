/* ── i18n engine ── */
const i18n = (() => {
  const STORAGE_KEY = 'beraent_lang';
  const translations = {};

  let current = (() => {
    try { return localStorage.getItem(STORAGE_KEY) || 'en'; } catch(e) { return 'en'; }
  })();

  function register(lang, data) {
    translations[lang] = data;
  }

  function t(key,lang) {
    const parts = key.split('.');
    
    if(lang===undefined)
      lang=current;
    
    let obj = translations[lang];
    for (const p of parts) {
      if (obj == null) return key;
      obj = obj[p];
    }
    return obj != null ? String(obj) : key;
  }

  function apply(lang) {
    if (!translations[lang]) return;
    current = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch(e) {}

    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      var val = t(el.dataset.i18n);
      
      if(val === el.dataset.i18n)
        val = t(el.dataset.i18n, 'en');

      if (val !== el.dataset.i18n) el.textContent = val;              
    });

    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      el.setAttribute('placeholder', t(el.dataset.i18nPh));
    });

    document.querySelectorAll('[data-lang]').forEach(el => {
      el.classList.toggle('lang-active', el.dataset.lang === lang);
    });
  }

  function init() {
    document.querySelectorAll('[data-lang]').forEach(el => {
      el.addEventListener('click', (e) => {
        if (el.tagName === 'A') e.preventDefault();
        apply(el.dataset.lang);
      });
    });
    apply(current);
  }

  return { register, t, apply, init, get current() { return current; } };
})();
