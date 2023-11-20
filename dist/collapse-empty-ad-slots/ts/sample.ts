/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Using @types/google-publisher-tag
// https://www.npmjs.com/package/@types/google-publisher-tag

window.googletag = window.googletag || { cmd: [] };

googletag.cmd.push(() => {
  // Configure all ad slots on the page to be expanded by default, but
  // collapse slots that are unable to be filled with an ad.
  googletag.pubads().collapseEmptyDivs();

  // The above setting assumes all ad slots are likely to be filled.
  // If ad slots are not likely to be filled, pass true as a parameter as
  // shown below. In this configuration, slots will be collapsed by
  // default and expanded only if they are able to be filled.
  // googletag.pubads().collapseEmptyDivs(true);

  // This slot will use the page-level settings configured above.
  googletag
    .defineSlot("/6355419/Travel", [300, 250], "ad-slot-1")!
    .setTargeting("test", "responsive")
    .addService(googletag.pubads());

  // Configure per-slot overrides.
  // This slot will be expanded by default, but collapse if it cannot be
  // filled.
  googletag
    .defineSlot("/6355419/Travel", [250, 200], "ad-slot-2")!
    .setTargeting("test", "responsive")
    .setCollapseEmptyDiv(true)
    .addService(googletag.pubads());

  // This slot will be expanded by default and never collapse.
  googletag
    .defineSlot("/6355419/Travel", [200, 150], "ad-slot-3")!
    .setTargeting("test", "responsive")
    .setCollapseEmptyDiv(false)
    .addService(googletag.pubads());

  // This slot will be collapsed by default and only expand if it can be
  // filled.
  googletag
    .defineSlot("/6355419/Travel", [150, 100], "ad-slot-4")!
    .setTargeting("test", "responsive")
    .setCollapseEmptyDiv(true, true)
    .addService(googletag.pubads());

  // Enable SRA and services.
  googletag.pubads().enableSingleRequest();
  googletag.enableServices();

  // Request and render all previously defined ad slots.
  googletag.display("ad-slot-1");
});
