/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Using @types/google-publisher-tag
// https://www.npmjs.com/package/@types/google-publisher-tag

window.googletag = window.googletag || { cmd: [] };

googletag.cmd.push(() => {
  googletag
    .defineSlot("/6355419/Travel", [728, 90], "div-1")!
    .setTargeting("test", "lazyload")
    .addService(googletag.pubads());
  googletag
    .defineSlot("/6355419/Travel", [728, 90], "div-2")!
    .setTargeting("test", "lazyload")
    .addService(googletag.pubads());
  googletag
    .defineSlot("/6355419/Travel", [728, 90], "div-3")!
    .setTargeting("test", "lazyload")
    .addService(googletag.pubads());

  // Some examples of ways to enable lazy loading below.
  // Normally, only one of these methods should be used.

  // A) Enable with defaults.
  googletag.pubads().enableLazyLoad();

  // B) Enable without lazy fetching. Additional calls override previous
  // ones.
  googletag.pubads().enableLazyLoad({ fetchMarginPercent: -1 });

  // C) Enable lazy loading with...
  googletag.pubads().enableLazyLoad({
    // Fetch slots within 5 viewports.
    fetchMarginPercent: 500,
    // Render slots within 2 viewports.
    renderMarginPercent: 200,
    // Double the above values on mobile, where viewports are smaller
    // and users tend to scroll faster.
    mobileScaling: 2.0,
  });

  // Register event handlers to observe lazy loading behavior.
  googletag.pubads().addEventListener("slotRequested", (event) => {
    updateSlotStatus(event.slot.getSlotElementId(), "fetched");
  });

  googletag.pubads().addEventListener("slotOnload", (event) => {
    updateSlotStatus(event.slot.getSlotElementId(), "rendered");
  });

  // Enable SRA and services.
  googletag.pubads().enableSingleRequest();
  googletag.enableServices();

  // Request all previously defined ad slots.
  googletag.display("div-1");
});

function updateSlotStatus(slotId: string, state: string) {
  const elem = document.getElementById(slotId + "-" + state)!;
  elem.className = "activated";
  elem.innerText = "Yes";
}
