/**
 * @license
 * Copyright 2024 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Using @types/google-publisher-tag
// https://www.npmjs.com/package/@types/google-publisher-tag

window.googletag = window.googletag || { cmd: [] };

let gamingInterstitialSlot: googletag.Slot | null;

googletag.cmd.push(() => {
  // Define a gaming interstitial ad slot.
  defineGamingInterstitialSlot(true);

  // Add gaming interstitial event listeners.
  addGamingInterstitialListeners();

  // Define static ad slots.
  googletag
    .defineSlot("/6355419/Travel/Europe", [100, 100], "static-ad-1")!
    .addService(googletag.pubads());

  // Enable SRA and services.
  googletag.pubads().enableSingleRequest();
  googletag.enableServices();

  // Ensure the first call to display comes after static ad slot
  // divs are defined. If you do not have any static ad slots, this
  // call can be made immediately after services are enabled.
  googletag.display(gamingInterstitialSlot!);
});

function defineGamingInterstitialSlot(delay: boolean) {
  document.getElementById("trigger")!.style.display = "none";

  gamingInterstitialSlot = googletag.defineOutOfPageSlot(
    "/6355419/Travel/Europe/France/Paris",
    googletag.enums.OutOfPageFormat.GAME_MANUAL_INTERSTITIAL,
  );

  // Slot returns null if the page or device does not support interstitials.
  if (gamingInterstitialSlot) {
    gamingInterstitialSlot.addService(googletag.pubads());
    if (!delay) {
      googletag.display(gamingInterstitialSlot);
    }
    printStatus("Waiting for interstitial to be ready...");
  } else {
    printStatus("This device does not support interstitials.");
  }
}

function addGamingInterstitialListeners() {
  // Add event listener to register click handler once interstitial loads.
  // If this event doesn't fire, check the browser console for errors.
  googletag
    .pubads()
    .addEventListener(
      "gameManualInterstitialSlotReady",
      (slotReadyEvent: googletag.events.GameManualInterstitialSlotReadyEvent) => {
        if (gamingInterstitialSlot === slotReadyEvent.slot) {
          printStatus("Interstitial is ready.");

          const button = document.getElementById("trigger")!;
          button.style.display = "block";
          button.addEventListener(
            "click",
            () => {
              pauseGame();

              slotReadyEvent.makeGameManualInterstitialVisible();
              printStatus("Interstitial is active.");
            },
            { once: true },
          );
        }
      },
    );

  googletag.pubads().addEventListener("gameManualInterstitialSlotClosed", () => {
    // Gaming interstitial ad slots are one-time use, so destroy the old slot
    // and create a new one.
    if (gamingInterstitialSlot) {
      googletag.destroySlots([gamingInterstitialSlot]);
    }
    defineGamingInterstitialSlot(false);

    resumeGame();
  });
}

function pauseGame() {
  // Code to pause the game.
}

function resumeGame() {
  // Code to resume the game.
}

function printStatus(status: string) {
  document.getElementById("status")!.innerText = status;
}
