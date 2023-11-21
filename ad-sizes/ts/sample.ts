/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Using @types/google-publisher-tag
// https://www.npmjs.com/package/@types/google-publisher-tag

window.googletag = window.googletag || { cmd: [] };

googletag.cmd.push(() => {
  // Define a fixed-size ad slot.
  // [START fixed_size_ad]
  googletag
    .defineSlot("/6355419/Travel/Europe/France/Paris", [300, 250], "fixed-size-ad")!
    .addService(googletag.pubads());
  // [END fixed_size_ad]

  // Define a multi-size ad slot.
  // [START multi_size_ad]
  googletag
    .defineSlot(
      "/6355419/Travel/Europe",
      [
        [300, 250],
        [728, 90],
        [750, 200],
      ],
      "multi-size-ad",
    )!
    .addService(googletag.pubads());
  // [END multi_size_ad]

  // Define a fluid ad slot.
  // [START fluid_ad]
  googletag.defineSlot("/6355419/Travel", ["fluid"], "native-ad")!.addService(googletag.pubads());
  // [END fluid_ad]

  // Define a responsive ad slot.
  // [START responsive_ad]
  const responsiveAdSlot: googletag.Slot = googletag
    .defineSlot(
      "/6355419/Travel/Europe",
      [
        [300, 250],
        [728, 90],
        [750, 200],
      ],
      "responsive-ad",
    )!
    .addService(googletag.pubads());

  const mapping: googletag.SizeMappingArray = googletag
    .sizeMapping()
    .addSize(
      [1024, 768],
      [
        [750, 200],
        [728, 90],
      ],
    )
    .addSize([640, 480], [300, 250])
    .addSize([0, 0], [])
    .build()!;

  responsiveAdSlot.defineSizeMapping(mapping);
  // [END responsive_ad]

  // Enable SRA and services.
  googletag.pubads().enableSingleRequest();
  googletag.enableServices();

  // Request and render all previously defined ad slots.
  googletag.display("responsive-ad");
});
