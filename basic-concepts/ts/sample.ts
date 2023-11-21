/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Using @types/google-publisher-tag
// https://www.npmjs.com/package/@types/google-publisher-tag

window.googletag = window.googletag || { cmd: [] };

googletag.cmd.push(() => {
  // Define a fixed size ad slot, customized with key-value targeting.
  googletag
    .defineSlot("/6355419/Travel/Asia", [728, 90], "banner-ad")!
    .addService(googletag.pubads())
    .setTargeting("color", "red")
    .setTargeting("position", "atf");

  // Define an anchor ad slot that sticks to the bottom of the viewport.
  const anchorSlot = googletag.defineOutOfPageSlot(
    "/6355419/Travel",
    googletag.enums.OutOfPageFormat.BOTTOM_ANCHOR,
  );

  // The slot will be null if the page or device does not support anchors.
  if (anchorSlot) {
    anchorSlot.setTargeting("test", "anchor").addService(googletag.pubads());

    document.getElementById("status")!.textContent =
      "Anchor ad is initialized. Scroll page to activate.";
  }

  // Define a fluid ad slot that adjusts its height to fit the creative
  // content being displayed.
  googletag.defineSlot("/6355419/Travel", ["fluid"], "native-ad")!.addService(googletag.pubads());

  // Configure page-level targeting.
  googletag.pubads().setTargeting("interests", "basketball");

  // Enable SRA and services.
  googletag.pubads().enableSingleRequest();
  googletag.enableServices();

  // Request and render all previously defined ad slots.
  googletag.display("banner-ad");
});
