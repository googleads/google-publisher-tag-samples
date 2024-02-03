/**
 * @license
 * Copyright 2024 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Using @types/google-publisher-tag
// https://www.npmjs.com/package/@types/google-publisher-tag

window.googletag = window.googletag || {cmd: []};

let leftSideRail: googletag.Slot|null;
let rightSideRail: googletag.Slot|null;

googletag.cmd.push(() => {
  // Define left and right side rail ad slots.
  leftSideRail = googletag.defineOutOfPageSlot(
      '/6355419/Travel/Europe', googletag.enums.OutOfPageFormat.LEFT_SIDE_RAIL);
  rightSideRail = googletag.defineOutOfPageSlot(
      '/6355419/Travel/Europe',
      googletag.enums.OutOfPageFormat.RIGHT_SIDE_RAIL);

  // Side rail slots return null if the page or device does not support
  // side rails.
  if (leftSideRail && rightSideRail) {
    leftSideRail.addService(googletag.pubads());
    rightSideRail.addService(googletag.pubads());

    document.getElementById('status')!.textContent =
        'Side rail ads are initialized.';
  } else {
    document.getElementById('status')!.textContent =
        'Side rail ads are not supported on this page.';
  }

  // Define static ad slots.
  googletag.defineSlot(
               '/6355419/Travel/Europe', [100, 100],
               'static-ad-1')!.addService(googletag.pubads());

  // Enable SRA and services.
  googletag.pubads().enableSingleRequest();
  googletag.enableServices();

  // [START request_ads]
  // Ensure the first call to display comes after static ad slot
  // divs are defined. If you do not have any static ad slots, this
  // call can be made immediately after services are enabled.
  if (leftSideRail) {
    googletag.display(leftSideRail);
  }
  // [END request_ads]
});