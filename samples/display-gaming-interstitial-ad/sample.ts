/**
 * @license
 * Copyright 2024 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Using @types/google-publisher-tag
// https://www.npmjs.com/package/@types/google-publisher-tag

window.googletag = window.googletag || {cmd: []};

let gamingInterstitialSlot: googletag.Slot|null;

googletag.cmd.push(() => {
  // Define a gaming interstitial ad slot.
  defineGamingInterstitialSlot();

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
  googletag.display(gamingInterstitialSlot!);
  // [END request_ads]
});

function defineGamingInterstitialSlot() {
  gamingInterstitialSlot = googletag.defineOutOfPageSlot(
      '/6355419/Travel/Europe/France/Paris',
      googletag.enums.OutOfPageFormat.GAME_MANUAL_INTERSTITIAL,
  );

  // Slot returns null if the page or device does not support interstitials.
  if (gamingInterstitialSlot) {
    gamingInterstitialSlot.addService(googletag.pubads());
    printStatus('Waiting for interstitial to be ready...');

    // Add event listener to register click handler once interstitial loads.
    // If this event doesn't fire, check the browser console for errors.
    googletag.pubads().addEventListener(
        'gameManualInterstitialSlotReady',
        (slotReadyEvent:
             googletag.events.GameManualInterstitialSlotReadyEvent) => {
          if (gamingInterstitialSlot === slotReadyEvent.slot) {
            printStatus('Interstitial is ready.');

            const button = document.getElementById('trigger')!;
            button.style.display = 'block';
            button.addEventListener(
                'click',
                () => {
                  slotReadyEvent.makeGameManualInterstitialVisible();
                  printStatus('Interstitial is active.');
                },
                {once: true},
            );
          }
        });

    googletag.pubads().addEventListener(
        'gameManualInterstitialSlotClosed', resumeGame);
  }
}

function resumeGame() {
  if (!gamingInterstitialSlot) return;

  document.getElementById('trigger')!.style.display = 'none';

  // Gaming interstitial ad slots are one-time use, so destroy the old slot
  // and create a new one.
  googletag.destroySlots([gamingInterstitialSlot]);
  defineGamingInterstitialSlot();
  googletag.display(gamingInterstitialSlot);
}

function printStatus(status: string) {
  document.getElementById('status')!.innerText = status;
}