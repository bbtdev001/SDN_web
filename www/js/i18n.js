/* ── i18n engine ── */
const i18n = (() => {
  const STORAGE_KEY = 'SPF_lang';
  const translations = {};
  const DEFAULT_LANG = 'en';

  let current = (() => {
    try { return localStorage.getItem(STORAGE_KEY) || 'en'; } catch(e) { return DEFAULT_LANG; }
  })();

  function register(lang, data) {
    translations[lang] = data;
  }

  function t(key,lang=current) {
    const parts = key.split('.');    
    
    let obj = translations[lang];
    for (const p of parts) {
      if (obj == null){
		  break;
	  }
      obj = obj[p];
    }
	
	if(obj==null && lang!=DEFAULT_LANG){
		//not found in the current language, try to return in DEFAULT_LANG		
		return t(key, DEFAULT_LANG);
	}
	
    return obj != null ? String(obj) : key;
  }

  function apply(lang, { updateHash = true } = {}) {
    if (!translations[lang]) return;
    current = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch(e) {}

    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      var val = t(el.dataset.i18n);

      if (val !== el.dataset.i18n){ 
		el.textContent = val;
	  }else{
		console.error("XX");
	  }
    });

    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      el.setAttribute('placeholder', t(el.dataset.i18nPh));
    });

    document.querySelectorAll('[data-lang]').forEach(el => {
      el.classList.toggle('lang-active', el.dataset.lang === lang);
    });

    if (updateHash) {
      const hash = window.location.hash;
      const bare = hash.startsWith('#') ? hash.slice(1) : hash;
      const segments = bare.split('/');
      const hasLang = !!translations[segments[0]];
      const rest = (hasLang ? segments.slice(1).join('/') : bare);
      const newHash = rest ? `#${lang}/${rest}` : `#${lang}`;
      history.replaceState(null, '', `${window.location.pathname}${window.location.search}${newHash}`);
    }
  }

  function init() {
    const bare = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : window.location.hash;
    const hashLang = bare.split('/')[0];
    if (translations[hashLang]) current = hashLang;

    document.querySelectorAll('[data-lang]').forEach(el => {
      el.addEventListener('click', (e) => {
        if (el.tagName === 'A') e.preventDefault();
        apply(el.dataset.lang);
      });
    });
    apply(current);
  }

  return { register, t, apply, init, get current() { return current; }, get langs() { return Object.keys(translations); } };
})();
