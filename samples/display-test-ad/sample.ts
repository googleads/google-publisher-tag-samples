/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Using @types/google-publisher-tag
// https://www.npmjs.com/package/@types/google-publisher-tag

window.googletag = window.googletag || {cmd: []};

googletag.cmd.push(() => {
  // Define an ad slot for div with id "banner-ad".
  googletag
      .defineSlot(
          '/6355419/Travel/Europe/France/Paris', [300, 250],
          'banner-ad')!.addService(googletag.pubads());

  // Enable the PubAdsService.
  googletag.enableServices();

  // [START request_ads]
  // Request and render an ad for the "banner-ad" slot.
  googletag.display('banner-ad');
  // [END request_ads]
});