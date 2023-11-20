/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Using @types/google-publisher-tag
// https://www.npmjs.com/package/@types/google-publisher-tag

window.googletag = window.googletag || {cmd: []};

googletag.cmd.push(() => {
  // Define the ad slot.
  googletag.defineSlot('/6355419/Travel', [728, 90], 'div-for-slot')!
      .setTargeting('test', 'event')
      .addService(googletag.pubads());

  // Disable initial load.
  // This prevents GPT from automatically fetching ads when display is called.
  googletag.pubads().disableInitialLoad();
  googletag.enableServices();

  // [START request_ads]
  // Register the ad slot.
  // An ad will not be fetched until refresh is called.
  googletag.display('div-for-slot');
  // [END request_ads]
});
// [START request_ads]

// Register click event handler.
document.getElementById('showAdButton')!.addEventListener('click', () => {
  googletag.cmd.push(() => {
    googletag.pubads().refresh();
  });
});
// [END request_ads]
