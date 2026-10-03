/* Google Ads: inicialização antes do carregamento assíncrono da biblioteca.
 * Nenhuma conversão é enviada ao simplesmente visitar a página.
 * Não envia campos do formulário nem a mensagem de WhatsApp ao Google. */
(function () {
  'use strict';
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', 'AW-18028044871');

  window.controlerTrackWhatsApp = function () {
    window.gtag('event', 'conversion', {
      send_to: 'AW-18028044871/GXlKCK_5-oscEMfEuJRD'
    });
  };

  // Delegação cobre botões, ícones internos, telefone e WhatsApp flutuante.
  // Os links continuam abrindo normalmente, mesmo com a tag bloqueada.
  document.addEventListener('click', function (event) {
    if (event.defaultPrevented) return;
    const link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    const url = new URL(link.href, window.location.href);
    if (url.protocol === 'https:' &&
        (url.hostname === 'wa.me' || url.hostname === 'api.whatsapp.com' || url.hostname === 'web.whatsapp.com')) {
      window.controlerTrackWhatsApp();
    }
  });
})();
