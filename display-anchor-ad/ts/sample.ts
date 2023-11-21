/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Using @types/google-publisher-tag
// https://www.npmjs.com/package/@types/google-publisher-tag

window.googletag = window.googletag || { cmd: [] };

let anchorSlot: googletag.Slot | null;

googletag.cmd.push(() => {
  // Define an anchor ad slot at the top of the viewport.
  // Note: a single anchor ad slot may be defined per page, at either the
  // top or bottom of the viewport.
  //
  // Be aware that anchor ads are not limited to mobile devices. If you
  // serve the same code to both mobile and non-mobile users, it is
  // recommended to explicitly define when and where anchor ads should be
  // shown for each environment. Here we use a basic check of viewport
  // width to create a top anchor on mobile and a bottom anchor on
  // non-mobile devices.
  anchorSlot = googletag.defineOutOfPageSlot(
    "/6355419/Travel",
    document.body.clientWidth <= 500
      ? googletag.enums.OutOfPageFormat.TOP_ANCHOR
      : googletag.enums.OutOfPageFormat.BOTTOM_ANCHOR,
  );

  // Anchor slots return null if the page or device does not support anchors.
  if (anchorSlot) {
    anchorSlot.setTargeting("test", "anchor").addService(googletag.pubads());

    document.getElementById("status")!.innerText =
      "Anchor ad is initialized. Scroll page to activate.";
  }

  // Define static ad slots.
  googletag
    .defineSlot("/6355419/Travel/Europe", [100, 100], "static-ad-1")!
    .addService(googletag.pubads());

  // Enable SRA and services.
  googletag.pubads().enableSingleRequest();
  googletag.enableServices();

  // Ensure the first call to display comes after static ad slot
  // divs are defined. If you do not have any static ad slots, this
  // call can be made immediately after services are enabled.
  googletag.display(anchorSlot!);
});
