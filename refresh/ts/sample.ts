/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Using @types/google-publisher-tag
// https://www.npmjs.com/package/@types/google-publisher-tag

window.googletag = window.googletag || {cmd: []};

let adSlot1: googletag.Slot, adSlot2: googletag.Slot;

googletag.cmd.push(() => {
  // Define the first slot.
  adSlot1 = googletag.defineSlot('/6355419/Travel', [728, 90], 'leaderboard1')!
                .setTargeting('test', 'refresh')
                .addService(googletag.pubads());

  // Define the second slot.
  adSlot2 = googletag.defineSlot('/6355419/Travel', [728, 90], 'leaderboard2')!
                .setTargeting('test', 'refresh')
                .addService(googletag.pubads());

  // Enable SRA and services.
  googletag.pubads().enableSingleRequest();
  googletag.enableServices();

  // Request and render all previously defined ad slots.
  googletag.display('leaderboard1');
});

// Event handler to refresh the first slot.
document.getElementById('refreshTopButton')!.addEventListener('click', () => {
  googletag.cmd.push(() => {
    googletag.pubads().refresh([adSlot1]);
  });
});

// Event handler to refresh the second slot.
document.getElementById('refreshBottomButton')!.addEventListener(
    'click', () => {
      googletag.cmd.push(() => {
        googletag.pubads().refresh([adSlot2]);
      });
    });

// Event handler to refresh all slots.
document.getElementById('refreshAllButton')!.addEventListener('click', () => {
  googletag.cmd.push(() => {
    googletag.pubads().refresh();
  });
});

// Event handler to clear all slots.
// Note: calling PubAdsService.clear() removes any currently displayed ads
// and replaces them with blank content, leaving the slots intact so they
// can be repopulated later.
document.getElementById('clearAllButton')!.addEventListener('click', () => {
  googletag.cmd.push(() => {
    googletag.pubads().clear();
  });
});
