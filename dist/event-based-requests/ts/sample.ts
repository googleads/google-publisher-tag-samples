/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Using @types/google-publisher-tag
// https://www.npmjs.com/package/@types/google-publisher-tag

window.googletag = window.googletag || { cmd: [] };

googletag.cmd.push(() => {
  // Define the ad slot.
  googletag
    .defineSlot("/6355419/Travel", [728, 90], "div-for-slot")!
    .addService(googletag.pubads())
    .setConfig({
      targeting: {
        test: "event",
      },
    });

  // Disable initial load to prevent GPT from automatically fetching ads when
  // display() is called.
  googletag.setConfig({
    disableInitialLoad: true,
  });

  // Enable services.
  googletag.enableServices();

  // Register the ad slot.
  // An ad will not be fetched until refresh is called.
  googletag.display("div-for-slot");
});

// Register click event handler.
document.getElementById("showAdButton")!.addEventListener("click", () => {
  googletag.cmd.push(() => {
    googletag.pubads().refresh();
  });
});
