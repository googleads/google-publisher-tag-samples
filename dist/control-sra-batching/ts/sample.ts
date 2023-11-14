/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Using @types/google-publisher-tag
// https://www.npmjs.com/package/@types/google-publisher-tag

window.googletag = window.googletag || {cmd: []};

// Number of seconds to wait before making the second SRA request.
let waitSeconds = 5;

googletag.cmd.push(() => {
  // Define ad slots.
  const slots = [
    googletag.defineSlot(
                 '/6355419/Travel/Europe', [728, 90],
                 'slot-1')!.addService(googletag.pubads()),
    googletag.defineSlot(
                 '/6355419/Travel/Europe', [728, 90],
                 'slot-2')!.addService(googletag.pubads()),
    googletag.defineSlot(
                 '/6355419/Travel/Europe', [300, 250],
                 'slot-3')!.addService(googletag.pubads()),
    googletag.defineSlot(
                 '/6355419/Travel/Europe', [300, 250],
                 'slot-4')!.addService(googletag.pubads()),
    googletag.defineSlot(
                 '/6355419/Travel/Europe', [300, 250],
                 'slot-5')!.addService(googletag.pubads()),
  ];

  // Disable initial load to precisely control when ads are requested.
  googletag.pubads().disableInitialLoad();

  // Enable SRA and services.
  googletag.pubads().enableSingleRequest();
  googletag.enableServices();

  // Issue first SRA request (slots 1 and 2) immediately.
  googletag.pubads().refresh(slots.slice(0, 2));

  // Issue second SRA request (slots 3, 4, and 5) after a delay.
  const interval = setInterval(() => {
    document.getElementById('seconds')!.textContent =
        (--waitSeconds).toString();

    if (waitSeconds === 0) {
      googletag.pubads().refresh(slots.slice(2));
      clearInterval(interval);
    }
  }, 1000);
});
