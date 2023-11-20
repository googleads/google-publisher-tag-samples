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
  googletag.defineSlot('/6355419/Travel', [728, 90], 'banner-ad')!
      .setTargeting('test', 'privacy')
      .addService(googletag.pubads());

  // Enable the PubAdsService.
  googletag.enableServices();

  // [START request_ads]
  // Request and render an ad for the "banner-ad" slot.
  googletag.display('banner-ad');
  // [END request_ads]
});

let tfcdEnabled = false;
function toggleChildDirectedTreatment(this: HTMLButtonElement) {
  const button = this;

  // Set to true to enable, false to disable.
  tfcdEnabled = !tfcdEnabled;

  googletag.cmd.push(() => {
    googletag.pubads().setPrivacySettings({
      childDirectedTreatment: tfcdEnabled,
    });

    // Refresh all ads on the page.
    googletag.pubads().refresh();

    button.setAttribute('data-enabled', tfcdEnabled.toString());
  });
}

let npaEnabled = false;
function toggleNonPersonalizedAds(this: HTMLButtonElement) {
  const button = this;

  // Set to true to enable, false to disable.
  npaEnabled = !npaEnabled;

  googletag.cmd.push(() => {
    googletag.pubads().setPrivacySettings({
      nonPersonalizedAds: npaEnabled,
    });

    // Refresh all ads on the page.
    googletag.pubads().refresh();

    button.setAttribute('data-enabled', npaEnabled.toString());
  });
}

let rdpEnabled = false;
function toggleRestrictDataProcessing(this: HTMLButtonElement) {
  const button = this;

  // Set to true to enable, false to disable.
  rdpEnabled = !rdpEnabled;

  googletag.cmd.push(() => {
    googletag.pubads().setPrivacySettings({
      restrictDataProcessing: rdpEnabled,
    });

    // Refresh all ads on the page.
    googletag.pubads().refresh();

    button.setAttribute('data-enabled', rdpEnabled.toString());
  });
}

let tfuaEnabled = false;
function toggleUnderAgeOfConsent(this: HTMLButtonElement) {
  const button = this;

  // Set to true to enable, false to disable.
  tfuaEnabled = !tfuaEnabled;

  googletag.cmd.push(() => {
    googletag.pubads().setPrivacySettings({
      underAgeOfConsent: tfuaEnabled,
    });

    // Refresh all ads on the page.
    googletag.pubads().refresh();

    button.setAttribute('data-enabled', tfuaEnabled.toString());
  });
}
// [START request_ads]

// Register click event handlers.
document.getElementById('tfcdButton')!.addEventListener(
    'click', toggleChildDirectedTreatment);
document.getElementById('npaButton')!.addEventListener(
    'click', toggleNonPersonalizedAds);
document.getElementById('rdpButton')!.addEventListener(
    'click', toggleRestrictDataProcessing);
document.getElementById('tfuaButton')!.addEventListener(
    'click', toggleUnderAgeOfConsent);
// [END request_ads]