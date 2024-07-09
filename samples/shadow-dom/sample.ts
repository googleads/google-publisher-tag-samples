/**
 * @license
 * Copyright 2024 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Using @types/google-publisher-tag
// https://www.npmjs.com/package/@types/google-publisher-tag

window.googletag = window.googletag || {cmd: []};

let adSlot: googletag.Slot;

document.addEventListener('DOMContentLoaded', (event) => {
  // Attach a shadow DOM to the host element and insert an ad container.
  // Ensure the shadow DOM is in open mode, to allow GPT access.
  const shadow = document.querySelector('#host')!.attachShadow({mode: 'open'});
  const adContainer = document.createElement('div');
  adContainer.id = 'ad-slot';
  adContainer.style.cssText = 'height: 250px; width: 300px;';
  shadow.appendChild(adContainer);

  // Register click handlers.
  document.querySelector('#clear')!.addEventListener('click', (event) => {
    googletag.cmd.push(() => {
      googletag.pubads().clear([adSlot]);
    });
  });

  document.querySelector('#refresh')!.addEventListener('click', (event) => {
    googletag.cmd.push(() => {
      googletag.pubads().refresh([adSlot]);
    });
  });
});

googletag.cmd.push(() => {
  // Define an ad slot for the "ad-slot" div.
  adSlot =
      googletag.defineSlot(
                   '/6355419/Travel/Europe', [300, 250],
                   'ad-slot')!.addService(googletag.pubads());

  // Enable the PubAdsService.
  googletag.enableServices();

  // Locate the ad container in the shadow DOM and display an ad in it.
  const shadowRoot = document.querySelector('#host')!.shadowRoot!;
  const adContainer = shadowRoot.querySelector('#ad-slot')!;
  googletag.display(adContainer);
});