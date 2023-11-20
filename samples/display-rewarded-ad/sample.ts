/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Using @types/google-publisher-tag
// https://www.npmjs.com/package/@types/google-publisher-tag

window.googletag = window.googletag || {cmd: []};

let rewardedSlot: googletag.Slot|null;

googletag.cmd.push(() => {
  rewardedSlot = googletag.defineOutOfPageSlot(
      '/22639388115/rewarded_web_example',
      googletag.enums.OutOfPageFormat.REWARDED);

  // Slot returns null if the page or device does not support rewarded ads.
  if (rewardedSlot) {
    rewardedSlot.addService(googletag.pubads());

    googletag.pubads().addEventListener('rewardedSlotReady', (event) => {
      document.getElementById('watchAdButton')!.onclick = () => {
        event.makeRewardedVisible();
        displayModal();
      };

      displayModal('reward', 'Watch an ad to receive a special reward?');
    });

    googletag.pubads().addEventListener(
        'rewardedSlotClosed', dismissRewardedAd);

    googletag.pubads().addEventListener('rewardedSlotGranted', (event) => {
      // Automatically close the ad by destroying the slot.
      // Remove this to force the user to close the ad themselves.
      dismissRewardedAd();

      const reward = event.payload;
      if (reward) {
        displayModal(
            'grant', `You have been rewarded ${reward.amount} ${reward.type}!`);
      }
    });

    googletag.enableServices();
    googletag.display(rewardedSlot);
  }
});

function dismissRewardedAd() {
  displayModal();

  if (rewardedSlot) {
    googletag.destroySlots([rewardedSlot]);
  }
}

function displayModal(type: string = '', message: string = '') {
  const modal = document.getElementById('modal')!;
  modal.removeAttribute('data-type');

  if (type) {
    document.getElementById('modalMessage')!.textContent = message;
    modal.setAttribute('data-type', type);
  }
}
// [START request_ads]

// Register click event handlers.
document.getElementById('closeButton')!.addEventListener(
    'click', dismissRewardedAd);
document.getElementById('noRewardButton')!.addEventListener(
    'click', dismissRewardedAd);
// [END request_ads]