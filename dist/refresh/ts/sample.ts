/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Using @types/google-publisher-tag
// https://www.npmjs.com/package/@types/google-publisher-tag

window.googletag = window.googletag || { cmd: [] };

let adSlot1: googletag.Slot | null;
let adSlot2: googletag.Slot | null;

googletag.cmd.push(() => {
  // Define the first slot.
  adSlot1 = googletag
    .defineSlot("/6355419/Travel", [728, 90], "leaderboard1")!
    .setTargeting("test", "refresh")
    .addService(googletag.pubads());

  // Define the second slot.
  adSlot2 = googletag
    .defineSlot("/6355419/Travel", [728, 90], "leaderboard2")!
    .setTargeting("test", "refresh")
    .addService(googletag.pubads());

  // Enable SRA and services.
  googletag.pubads().enableSingleRequest();
  googletag.enableServices();

  // Request and render all previously defined ad slots.
  googletag.display("leaderboard1");
});

// Button action which refreshes the first slot
function refreshFirstSlot() {
  if (!adSlot1) return;
  googletag.cmd.push(() => {
    googletag.pubads().refresh([adSlot1!]);
  });
}

// Button action which refreshes the second slot
function refreshSecondSlot() {
  if (!adSlot2) return;
  googletag.cmd.push(() => {
    googletag.pubads().refresh([adSlot2!]);
  });
}

// Button action which refreshes all slots
function refreshAllSlots() {
  googletag.cmd.push(() => {
    googletag.pubads().refresh();
  });
}

// Button action which clears all slots
// Note: calling PubAdsService.clear() removes any currently displayed ads
// and replaces them with blank content, leaving the slots intact so they
// can be repopulated later.
function clearAllSlots() {
  googletag.cmd.push(() => {
    googletag.pubads().clear();
  });
}

// Register click event handlers.
document.getElementById("refreshTopButton")!.addEventListener("click", refreshFirstSlot);
document.getElementById("refreshBottomButton")!.addEventListener("click", refreshSecondSlot);
document.getElementById("refreshAllButton")!.addEventListener("click", refreshAllSlots);
document.getElementById("clearAllButton")!.addEventListener("click", clearAllSlots);
