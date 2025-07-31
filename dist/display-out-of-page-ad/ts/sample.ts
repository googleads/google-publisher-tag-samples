/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Using @types/google-publisher-tag
// https://www.npmjs.com/package/@types/google-publisher-tag

window.googletag = window.googletag || { cmd: [] };

googletag.cmd.push(() => {
  // Use defineOutOfPageSlot instead of defineSlot when working with
  // out-of-page ads.
  googletag
    .defineOutOfPageSlot("/6355419/Travel", "out-of-page-ad")!
    .addService(googletag.pubads())
    .setConfig({
      targeting: {
        test: "outofpage",
      },
    });

  // Enable the PubAdsService.
  googletag.enableServices();

  // Request and render an ad for the "out-of-page-ad" slot.
  googletag.display("out-of-page-ad");
});
