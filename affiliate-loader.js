/* Choosimple affiliate loader
   Replaces href="#" on elements with data-affiliate-id once a URL is available in affiliate-links.js.
   Also normalizes affiliate CTA wording so pages can stay marketplace-neutral for Geniuslink.
   On mobile/touch devices, shows a Choosimple-controlled confirmation modal before sending users to Amazon/Geniuslink.
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

  var pendingAffiliateUrl = '';
  var pendingAffiliateLabel = '';
  var modalElements = null;

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

  function shouldShowMobileExitModal() {
    if (!window.matchMedia) return false;

    return window.matchMedia('(hover: none) and (pointer: coarse), (max-width: 767px)').matches;
  }

  function ensureModal() {
    if (modalElements) return modalElements;

    var style = document.createElement('style');
    style.textContent = [
      '.cs-affiliate-exit-modal[hidden]{display:none!important;}',
      '.cs-affiliate-exit-modal{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;}',
      '.cs-affiliate-exit-backdrop{position:absolute;inset:0;background:rgba(17,17,13,.58);backdrop-filter:blur(3px);}',
      '.cs-affiliate-exit-dialog{position:relative;width:min(100%,390px);background:#fffdf2;color:#11110d;border:1px solid rgba(17,17,13,.12);border-radius:22px;box-shadow:0 24px 70px rgba(17,17,13,.32);padding:22px;}',
      '.cs-affiliate-exit-title{margin:0 0 8px;font-size:1.15rem;line-height:1.2;font-weight:800;letter-spacing:-.02em;}',
      '.cs-affiliate-exit-copy{margin:0;color:#4f4c3f;font-size:.96rem;line-height:1.48;}',
      '.cs-affiliate-exit-product{margin-top:10px;color:#11110d;font-size:.9rem;font-weight:700;line-height:1.35;}',
      '.cs-affiliate-exit-actions{display:grid;gap:10px;margin-top:18px;}',
      '.cs-affiliate-exit-continue,.cs-affiliate-exit-cancel{width:100%;border-radius:999px;border:1px solid transparent;padding:12px 16px;font:inherit;font-weight:800;cursor:pointer;}',
      '.cs-affiliate-exit-continue{background:#11110d;color:#fffbea;}',
      '.cs-affiliate-exit-continue:hover{background:#24241d;}',
      '.cs-affiliate-exit-cancel{background:transparent;color:#11110d;border-color:rgba(17,17,13,.22);}',
      '.cs-affiliate-exit-cancel:hover{background:rgba(17,17,13,.05);}',
      'body.cs-affiliate-modal-open{overflow:hidden;}'
    ].join('\n');
    document.head.appendChild(style);

    var modal = document.createElement('div');
    modal.className = 'cs-affiliate-exit-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'cs-affiliate-exit-title');
    modal.setAttribute('aria-describedby', 'cs-affiliate-exit-copy');
    modal.setAttribute('hidden', '');

    modal.innerHTML = [
      '<div class="cs-affiliate-exit-backdrop" data-cs-affiliate-close></div>',
      '<div class="cs-affiliate-exit-dialog">',
      '  <h2 class="cs-affiliate-exit-title" id="cs-affiliate-exit-title">Open Amazon?</h2>',
      '  <p class="cs-affiliate-exit-copy" id="cs-affiliate-exit-copy">This may open the Amazon app or website. Use Back to return to Choosimple.</p>',
      '  <p class="cs-affiliate-exit-product" data-cs-affiliate-product></p>',
      '  <div class="cs-affiliate-exit-actions">',
      '    <button type="button" class="cs-affiliate-exit-continue">Continue to Amazon</button>',
      '    <button type="button" class="cs-affiliate-exit-cancel" data-cs-affiliate-close>Stay on Choosimple</button>',
      '  </div>',
      '</div>'
    ].join('');

    document.body.appendChild(modal);

    modalElements = {
      modal: modal,
      product: modal.querySelector('[data-cs-affiliate-product]'),
      continueButton: modal.querySelector('.cs-affiliate-exit-continue'),
      closeButtons: modal.querySelectorAll('[data-cs-affiliate-close]')
    };

    modalElements.continueButton.addEventListener('click', function () {
      var url = pendingAffiliateUrl;
      closeModal();

      if (!url) return;

      window.location.href = url;
    });

    modalElements.closeButtons.forEach(function (button) {
      button.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !modalElements.modal.hasAttribute('hidden')) {
        closeModal();
      }
    });

    return modalElements;
  }

  function openModal(url, productName) {
    var elements = ensureModal();

    pendingAffiliateUrl = url;
    pendingAffiliateLabel = productName || 'this product';
    elements.product.textContent = pendingAffiliateLabel;
    elements.modal.removeAttribute('hidden');
    document.body.classList.add('cs-affiliate-modal-open');
    elements.continueButton.focus();
  }

  function closeModal() {
    if (!modalElements) return;

    modalElements.modal.setAttribute('hidden', '');
    document.body.classList.remove('cs-affiliate-modal-open');
    pendingAffiliateUrl = '';
    pendingAffiliateLabel = '';
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

    url = url.trim();

    link.setAttribute('href', url);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'nofollow sponsored noopener noreferrer');
    link.removeAttribute('data-affiliate-missing');

    if (!link.getAttribute('aria-label')) {
      if (cta) {
        link.setAttribute('aria-label', 'Check price for ' + productName);
      } else {
        var label = link.textContent.trim() || productName;
        link.setAttribute('aria-label', label);
      }
    }

    link.addEventListener('click', function (event) {
      if (!shouldShowMobileExitModal()) return;

      event.preventDefault();
      event.stopPropagation();
      if (typeof event.stopImmediatePropagation === 'function') {
        event.stopImmediatePropagation();
      }
      openModal(url, productName);
    });
  });
})();
