const PAGE_HASH_PREFIX = '#page/';
const PAGE_BASE_PATH = 'pages/';
const HOME_PAGE = 'home';
const DEFAULT_TITLE = document.title;		

let currentPage = null;
let animationObserver;

function buildServiceCard(service) {
  const card = document.createElement('div');
  card.className = `service-card${service.featured ? ' featured' : ''}`;
  card.setAttribute('data-animate', '');

  if (service.badgeKey) {
    const badge = document.createElement('div');
    badge.className = 'service-badge';
    badge.dataset.i18n = service.badgeKey;
    badge.textContent = i18n.t(service.badgeKey);
    card.appendChild(badge);
  }

  const icon = document.createElement('div');
  icon.className = 'service-icon';
  icon.innerHTML = service.icon;
  card.appendChild(icon);

  const title = document.createElement('h3');
  title.dataset.i18n = service.titleKey;
  title.textContent = i18n.t(service.titleKey);
  card.appendChild(title);

  const body = document.createElement('p');
  body.dataset.i18n = service.bodyKey;
  body.textContent = i18n.t(service.bodyKey);
  card.appendChild(body);

  const list = document.createElement('ul');
  service.listKeys.forEach((key) => {
    const item = document.createElement('li');
    item.dataset.i18n = key;
    item.textContent = i18n.t(key);
    list.appendChild(item);
  });
  card.appendChild(list);

  const link = document.createElement('a');
  link.href = `#page/${service.page}`;
  link.className = 'service-link';
  link.dataset.page = service.page;
  link.dataset.i18n = 'common.learn_more';
  link.textContent = i18n.t('common.learn_more');
  card.appendChild(link);

  return card;
}

function renderServices(scope = document) {
  const grid = scope.querySelector('[data-services-grid]');
  if (!grid || typeof serviceCatalog === 'undefined') return;

  grid.replaceChildren(...serviceCatalog.map(buildServiceCard));
}

function closeMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (!toggle || !links) return;

  links.classList.remove('open');
  toggle.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}

function initScrollAnimations(scope = document) {
  const items = Array.from(scope.querySelectorAll('[data-animate]')).filter(
    (item) => !item.dataset.animateBound
  );

  if (!items.length) return;

  if (!animationObserver) {
    animationObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        animationObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
  }

  items.forEach((item) => {
    item.dataset.animateBound = 'true';
    animationObserver.observe(item);
  });
}

function initContactForm(scope = document) {
  const form = scope.querySelector('.contact-form');
  if (!form || form.dataset.bound === 'true') return;

  form.dataset.bound = 'true';
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = (typeof i18n !== 'undefined') ? i18n.t('ct.sent') : 'Message Sent ✓';
    btn.disabled = true;
    btn.style.background = '#16a34a';
  });
}

function scrollToTarget(selector) {
  const target = document.querySelector(selector);
  if (!target) return false;

  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return true;
}

function getLangFromHash(hash = window.location.hash) {
  const bare = hash.startsWith('#') ? hash.slice(1) : hash;
  const first = bare.split('/')[0];
  return (typeof i18n !== 'undefined' && i18n.langs.includes(first)) ? first : null;
}

function stripLangFromHash(hash = window.location.hash) {
  const lang = getLangFromHash(hash);
  if (!lang) return hash;
  const bare = hash.startsWith('#') ? hash.slice(1) : hash;
  const rest = bare.slice(lang.length + 1);
  return rest ? `#${rest}` : '';
}

function getPageFromHash(hash = window.location.hash) {
  if (!hash.startsWith(PAGE_HASH_PREFIX)) return null;
  return hash.slice(PAGE_HASH_PREFIX.length);
}

function setDocumentTitle(pageRoot) {
  if(pageRoot && pageRoot.dataset.title)
	document.title=i18n.t(pageRoot.dataset.title)
  else	  
	document.title=DEFAULT_TITLE;
}

function initDynamicContent(scope = document) {
  renderServices(scope);
  initScrollAnimations(scope);  
  initContactForm(scope);

  if (typeof i18n !== 'undefined') {
    i18n.apply(i18n.current);
  }
}

function execPageScripts(pageContent){
  pageContent.querySelectorAll('script').forEach((oldScript)=>{
    const newScript=document.createElement('script');

    [...oldScript.attributes].forEach(attr =>
      newScript.setAttribute(attr.name, attr.value)
    );

    newScript.textContent = oldScript.textContent;

    oldScript.parentNode.replaceChild(newScript, oldScript);
  });
}

async function loadPage(pageSlug = HOME_PAGE, { pushHash = false, targetId = null, smoothScroll = true } = {}) {
  const pageContent = document.getElementById('page-content');
  if (!pageContent) return;

  const pagePath = `${PAGE_BASE_PATH}${pageSlug}.html`;
  pageContent.classList.add('is-loading');

  try {
    const response = await fetch(pagePath, { headers: { 'X-Requested-With': 'fetch' } });
    if (!response.ok) {
      throw new Error(`Failed to load ${pagePath}`);
    }

    pageContent.innerHTML = await response.text();
    const pageRoot = pageContent.querySelector('[data-page-root]') || pageContent.firstElementChild;
    currentPage = pageSlug;
    setDocumentTitle(pageRoot);
    initDynamicContent(pageRoot);

    execPageScripts(pageContent);

    const lang = (typeof i18n !== 'undefined') ? i18n.current : 'en';

    if (pushHash) {
      const nextHash = pageSlug === HOME_PAGE
        ? `#${lang}`
        : `#${lang}/page/${pageSlug}`;
      history.pushState(null, '', `${window.location.pathname}${window.location.search}${nextHash}`);
    }

    if (targetId) {
      const scrollBehavior = smoothScroll ? 'smooth' : 'auto';
      requestAnimationFrame(() => {
        const target = document.querySelector(`#${targetId}`);
        if (target) {
          target.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
          history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${lang}/${targetId}`);
        }
      });
    } else {
      window.scrollTo({ top: 0, behavior: smoothScroll ? 'smooth' : 'auto' });
      if (pageSlug !== HOME_PAGE && !pushHash && window.location.hash !== `#${lang}/page/${pageSlug}`) {
        history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${lang}/page/${pageSlug}`);
      }
    }
  } catch (error) {
    currentPage = null;
    pageContent.innerHTML = `
      <section class="page-sections">
        <div class="container">
          <div class="page-section">
            <h2>Page unavailable</h2>
            <p>The requested content could not be loaded from <code>${pagePath}</code>.</p>
          </div>
        </div>
      </section>
    `;
    setDocumentTitle();
    console.error(error);
  } finally {
    pageContent.classList.remove('is-loading');
  }
}

function openHomeTarget(targetId) {
  const lang = (typeof i18n !== 'undefined') ? i18n.current : 'en';
  if (currentPage === HOME_PAGE) {
    scrollToTarget(`#${targetId}`);
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${lang}/${targetId}`);
    return;
  }

  loadPage(HOME_PAGE, { pushHash: true, targetId, smoothScroll: false });
}

function handleHashNavigation() {
  const hash = window.location.hash;
  const lang = getLangFromHash(hash);
  if (lang && lang !== i18n.current) i18n.apply(lang);

  const routeHash = stripLangFromHash(hash);

  const pageSlug = getPageFromHash(routeHash);
  if (pageSlug) {
    loadPage(pageSlug, { smoothScroll: false });
    return;
  }

  if (routeHash.startsWith('#') && routeHash.length > 1) {
    const targetId = routeHash.slice(1);
    if (currentPage === HOME_PAGE) {
      scrollToTarget(`#${targetId}`);
      return;
    }
    loadPage(HOME_PAGE, { targetId, smoothScroll: false });
    return;
  }

  if (currentPage !== HOME_PAGE) {
    loadPage(HOME_PAGE, { smoothScroll: false });
  }
}

function initPageNavigation() {
  document.addEventListener('click', (event) => {
    const pageLink = event.target.closest('[data-page]');
    if (pageLink) {
      event.preventDefault();
      closeMobileMenu();
      loadPage(pageLink.dataset.page, { pushHash: true });
      return;
    }

    const homeTargetLink = event.target.closest('[data-home-target]');
    if (homeTargetLink) {
      event.preventDefault();
      closeMobileMenu();
      openHomeTarget(homeTargetLink.dataset.homeTarget);
    }
  });

  window.addEventListener('hashchange', handleHashNavigation);
  handleHashNavigation();
}

function initNavbar() {
  const nav = document.getElementById('navbar');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('menu-open', open);
    });
  }
}

initNavbar();
initPageNavigation();
