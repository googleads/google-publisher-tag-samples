/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Using @types/google-publisher-tag
// https://www.npmjs.com/package/@types/google-publisher-tag

window.googletag = window.googletag || {cmd: []};

googletag.cmd.push(() => {
  googletag.defineSlot(
               '/6355419/Travel/Europe', [300, 250],
               'slot-1')!.addService(googletag.pubads());
  googletag.defineSlot(
               '/6355419/Travel/Europe', [300, 250],
               'slot-2')!.addService(googletag.pubads());
  googletag.defineSlot(
               '/6355419/Travel/Europe', [300, 250],
               'slot-3')!.addService(googletag.pubads());

  // Enable SRA and services.
  googletag.pubads().enableSingleRequest();
  googletag.enableServices();
});

// [START request_ads]
// Register click event handlers.
document.getElementById('loadAdsButton')!.addEventListener('click', () => {
  // Request and render all previously defined ad slots.
  googletag.cmd.push(() => googletag.display('slot-3'));
});
// [END request_ads]
