/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Using @types/google-publisher-tag
// https://www.npmjs.com/package/@types/google-publisher-tag

window.googletag = window.googletag || {cmd: []};

googletag.cmd.push(() => {
  // Define a web interstitial ad slot.
  const interstitialSlot = googletag.defineOutOfPageSlot(
      '/6355419/Travel/Europe/France/Paris',
      googletag.enums.OutOfPageFormat.INTERSTITIAL);

  // Slot returns null if the page or device does not support interstitials.
  if (interstitialSlot) {
    // Enable optional interstitial triggers and register the slot.
    interstitialSlot
        .setConfig({
          interstitial: {
            triggers: {
              unhideWindow: true,
            },
          },
        })
        .addService(googletag.pubads());

    document.getElementById('status')!.textContent =
        'Interstitial is loading...';

    // Add event listener to enable navigation once the interstitial loads.
    // If this event doesn't fire, try clearing local storage and refreshing
    // the page.
    googletag.pubads().addEventListener('slotOnload', (event) => {
      if (interstitialSlot === event.slot) {
        document.getElementById('link')!.style.display = 'block';
        document.getElementById('status')!.textContent =
            'Interstitial is loaded.';
      }
    });

    // By default, the detected language of the current page is used to render
    // interstitial UI elements. This behavior can be overridden by manually
    // specifying the document language:
    // googletag.pubads().set("document_language", "en");
  }

  // Define static ad slots.
  const staticSlot =
      googletag.defineSlot(
                   '/6355419/Travel/Europe', [100, 100],
                   'static-ad-1')!.addService(googletag.pubads());

  // Enable SRA and services.
  googletag.pubads().enableSingleRequest();
  googletag.enableServices();

  // Request and render all previously defined ad slots.
  googletag.display(interstitialSlot);
});
