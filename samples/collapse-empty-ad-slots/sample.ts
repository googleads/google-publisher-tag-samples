/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Using @types/google-publisher-tag
// https://www.npmjs.com/package/@types/google-publisher-tag

window.googletag = window.googletag || {cmd: []};

googletag.cmd.push(() => {
  // Configure all ad slots on the page to be expanded by default, but
  // collapse slots that are unable to be filled with an ad. Also enables
  // SRA.
  googletag.setConfig({
    collapseDiv: 'ON_NO_FILL',
    singleRequest: true,
    targeting: {
      test: 'responsive',
    },
  });

  // The above setting assumes all ad slots are likely to be filled.
  // If ad slots are not likely to be filled, 'BEFORE_FETCH' can be used
  // instead. In this configuration, slots will be collapsed by default and
  // expanded only if they are able to be filled.
  // googletag.setConfig({
  //   collapseDiv: 'BEFORE_FETCH',
  //   singleRequest: true,
  // });

  // This slot will use the page-level settings configured above.
  googletag.defineSlot('/6355419/Travel', [300, 250], 'ad-slot-1')!.addService(
      googletag.pubads());

  // Configure per-slot overrides.
  // This slot will be expanded by default, but collapse if it cannot be
  // filled.
  googletag.defineSlot('/6355419/Travel', [250, 200], 'ad-slot-2')!
      .addService(googletag.pubads())
      .setConfig({collapseDiv: 'ON_NO_FILL'});

  // This slot will be expanded by default and never collapse.
  googletag.defineSlot('/6355419/Travel', [200, 150], 'ad-slot-3')!
      .addService(googletag.pubads())
      .setConfig({collapseDiv: 'DISABLED'});

  // This slot will be collapsed by default and only expand if it can be
  // filled.
  googletag.defineSlot('/6355419/Travel', [150, 100], 'ad-slot-4')!
      .addService(googletag.pubads())
      .setConfig({collapseDiv: 'BEFORE_FETCH'});

  // Enable services.
  googletag.enableServices();

  // [START request_ads]
  // Request and render all previously defined ad slots.
  googletag.display('ad-slot-1');
  // [END request_ads]
});