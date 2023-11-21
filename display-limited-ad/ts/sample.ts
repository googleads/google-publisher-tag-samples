/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Using @types/google-publisher-tag
// https://www.npmjs.com/package/@types/google-publisher-tag

window.googletag = window.googletag || { cmd: [] };

googletag.cmd.push(() => {
  // Define an ad slot for div with id "banner-ad".
  googletag
    .defineSlot("/6355419/Travel", [728, 90], "banner-ad")!
    .setTargeting("test", "privacy")
    .addService(googletag.pubads());

  // Enable the PubAdsService.
  googletag.enableServices();

  // Request and render an ad for the "banner-ad" slot.
  googletag.display("banner-ad");
});

let ltdEnabled = false;
function toggleLimitedAds(this: HTMLButtonElement) {
  const button = this;

  // Set to true to enable, false to disable.
  ltdEnabled = !ltdEnabled;

  googletag.cmd.push(() => {
    googletag.pubads().setPrivacySettings({
      limitedAds: ltdEnabled,
    });

    // Refresh all ads on the page.
    googletag.pubads().refresh();

    button.setAttribute("data-enabled", ltdEnabled.toString());
  });
}

// Register click event handlers.
document.getElementById("ltdButton")!.addEventListener("click", toggleLimitedAds);
