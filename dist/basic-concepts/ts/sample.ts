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
    .setConfig({
      targeting: {
        color: "red",
        position: "atf",
      },
    });

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

  // Define a fluid ad slot that fills the width of the enclosing column and
  // adjusts the height as defined by the native creative delivered.
  googletag.defineSlot("/6355419/Travel", ["fluid"], "native-ad")!.addService(googletag.pubads());

  // Configure page-level targeting and enable SRA.
  googletag.setConfig({
    targeting: {
      interests: "basketball",
    },
    singleRequest: true,
  });

  // Enable services.
  googletag.enableServices();

  // Request and render all previously defined ad slots.
  googletag.display("banner-ad");
});
