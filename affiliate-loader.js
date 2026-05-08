/* Choosimple affiliate loader
   Replaces href="#" on elements with data-affiliate-id once a URL is available in affiliate-links.js. */
(function () {
  var registry = window.CS_AFFILIATE_LINKS || {};
  var links = document.querySelectorAll('[data-affiliate-id]');

  links.forEach(function (link) {
    var id = link.getAttribute('data-affiliate-id');
    var record = registry[id];
    var url = record && typeof record === 'object' ? record.url : record;

    if (!url || typeof url !== 'string' || url.trim() === '' || url === '#') {
      link.setAttribute('href', '#');
      link.setAttribute('data-affiliate-missing', 'true');
      return;
    }

    link.setAttribute('href', url);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'nofollow sponsored noopener');
    link.removeAttribute('data-affiliate-missing');

    if (!link.getAttribute('aria-label')) {
      var label = link.textContent.trim() || (record && record.name) || 'product';
      link.setAttribute('aria-label', label + ' on Amazon');
    }
  });
})();
