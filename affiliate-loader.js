/* Choosimple affiliate loader
   Replaces href="#" on elements with data-affiliate-id once a URL is available in affiliate-links.js.
   Also normalizes affiliate CTA wording so pages can stay marketplace-neutral for Geniuslink.
*/
(function () {
  var registry = window.CS_AFFILIATE_LINKS || {};
  var links = document.querySelectorAll('[data-affiliate-id]');

  var CTA_TEXT_REPLACEMENTS = {
    'check price on amazon': 'Check price',
    'check price and availability on amazon': 'Check price',
    'see price and availability on amazon': 'Check price',
    'check current price on amazon': 'Check current price',
    'view on amazon': 'Check price',
    'buy on amazon': 'Check price',
    'shop on amazon': 'Check price'
  };

  function normalizeText(value) {
    return (value || '')
      .replace(/\u00a0/g, ' ')
      .replace(/[→›»]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  function getRecordUrl(record) {
    if (record && typeof record === 'object') {
      return record.url;
    }

    return record;
  }

  function hasUsableUrl(url) {
    return typeof url === 'string' && url.trim() !== '' && url.trim() !== '#';
  }

  function getProductName(record) {
    return record && typeof record === 'object' && record.name ? record.name : 'this product';
  }

  function isCtaLink(link) {
    var text = normalizeText(link.textContent);
    var className = (link.getAttribute('class') || '').toLowerCase();

    return (
      CTA_TEXT_REPLACEMENTS[text] ||
      className.indexOf('btn') !== -1 ||
      className.indexOf('cta') !== -1 ||
      className.indexOf('price') !== -1 ||
      className.indexOf('alt-card-link') !== -1
    );
  }

  function setLinkTextPreservingArrow(link, newText) {
    var arrow = link.querySelector('span');
    var hasArrow = arrow && normalizeText(arrow.textContent) === '';

    if (hasArrow) {
      link.textContent = newText + ' ';
      link.appendChild(arrow);
      return;
    }

    link.textContent = newText;
  }

  function normalizeCtaText(link) {
    var text = normalizeText(link.textContent);
    var replacement = CTA_TEXT_REPLACEMENTS[text];

    if (replacement) {
      setLinkTextPreservingArrow(link, replacement);
    }
  }

  links.forEach(function (link) {
    var id = link.getAttribute('data-affiliate-id');
    var record = registry[id];
    var url = getRecordUrl(record);
    var productName = getProductName(record);
    var cta = isCtaLink(link);

    if (cta) {
      normalizeCtaText(link);
    }

    if (!hasUsableUrl(url)) {
      link.setAttribute('href', '#');
      link.setAttribute('data-affiliate-missing', 'true');
      link.removeAttribute('target');
      link.removeAttribute('rel');
      return;
    }

    link.setAttribute('href', url.trim());
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'nofollow sponsored noopener');
    link.removeAttribute('data-affiliate-missing');

    if (!link.getAttribute('aria-label')) {
      if (cta) {
        link.setAttribute('aria-label', 'Check price for ' + productName);
      } else {
        var label = link.textContent.trim() || productName;
        link.setAttribute('aria-label', label);
      }
    }
  });
})();
