/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Using @types/google-publisher-tag
// https://www.npmjs.com/package/@types/google-publisher-tag

window.googletag = window.googletag || { cmd: [] };

// GPT slots
let adSlots: googletag.Slot[] = [];

googletag.cmd.push(() => {
  // Configure slot-level targeting.
  adSlots[0] = googletag
    .defineSlot("/6355419/Travel/Asia", [728, 90], "banner-ad-1")!
    .addService(googletag.pubads());
  adSlots[0].setConfig({
    targeting: {
      color: "red",
      position: "atf",
    },
  });

  adSlots[1] = googletag
    .defineSlot("/6355419/Travel/Asia", [728, 90], "banner-ad-2")!
    .addService(googletag.pubads());
  adSlots[1].setConfig({
    targeting: {
      position: "btf",
    },
  });

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
  googletag.display("banner-ad-1");
});

function toggleTargeting(this: HTMLButtonElement) {
  const button = this;

  const isTargetingSet = button.getAttribute("data-enabled") === "true";
  button.setAttribute("data-enabled", (!isTargetingSet).toString());

  googletag.cmd.push(() => {
    // Enable or disable targeting depending on the state of the page.
    if (isTargetingSet) {
      disableTargeting();
    } else {
      enableTargeting();
    }

    // Refresh all ads for targeting changes to take effect.
    googletag.pubads().refresh();
  });
}

function enableTargeting() {
  // Reset slot- and page-level targeting to their original values.
  adSlots[0].setConfig({
    targeting: {
      color: "red",
    },
  });
  googletag.setConfig({
    targeting: {
      interests: "basketball",
    },
  });
}

function disableTargeting() {
  // Step 1, clear slot-level color targeting.
  adSlots[0].setConfig({
    targeting: {
      color: null,
    },
  });

  // Step 2, clear all page-level targeting.
  googletag.setConfig({
    targeting: null,
  });
}

// Register click event handlers.
document.getElementById("targetingButton")!.addEventListener("click", toggleTargeting);
