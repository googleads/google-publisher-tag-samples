/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Using @types/google-publisher-tag
// https://www.npmjs.com/package/@types/google-publisher-tag

window.googletag = window.googletag || {cmd: []};

let rewardedSlot: googletag.Slot|null;
let rewardPayload: googletag.RewardedPayload|null;

googletag.cmd.push(() => {
  rewardedSlot = googletag.defineOutOfPageSlot(
      '/22639388115/rewarded_web_example',
      googletag.enums.OutOfPageFormat.REWARDED);

  // Slot returns null if the page or device does not support rewarded ads.
  if (rewardedSlot) {
    rewardedSlot.addService(googletag.pubads());

    googletag.pubads().addEventListener('rewardedSlotReady', (event) => {
      updateStatus('Rewarded ad slot is ready.');

      document.getElementById('watchAdButton')!.onclick = () => {
        event.makeRewardedVisible();
        displayModal();
        updateStatus('Rewarded ad is active.');
      };

      displayModal('reward', 'Watch an ad to receive a special reward?');
    });

    googletag.pubads().addEventListener('rewardedSlotVideoCompleted', (event) => {
      updateStatus('Video ad has finished playing.');
    });

    googletag.pubads().addEventListener(
        'rewardedSlotClosed', dismissRewardedAd);

    googletag.pubads().addEventListener('rewardedSlotGranted', (event) => {
      rewardPayload = event.payload;
      updateStatus('Reward granted.');
    });

    googletag.pubads().addEventListener('slotRenderEnded', (event) => {
      if (event.slot === rewardedSlot && event.isEmpty) {
        updateStatus('No ad returned for rewarded ad slot.');
      }
    });

    googletag.enableServices();
    googletag.display(rewardedSlot);
  } else {
    updateStatus('Rewarded ads are not supported on this page.');
  }
});

function dismissRewardedAd() {
  if (rewardPayload) {
    // User was granted a reward and closed the ad.
    displayModal(
        'grant',
        `You have been rewarded ${rewardPayload.amount} ${
            rewardPayload.type}!`);
    rewardPayload = null;
  } else {
    // User closed the ad without getting a reward.
    displayModal();
  }

  updateStatus('Rewarded ad has been closed.');

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

function updateStatus(message: string) {
  document.getElementById('status')!.textContent = message;
}
// [START request_ads]

// Register click event handlers.
document.getElementById('closeButton')!.addEventListener(
    'click', dismissRewardedAd);
document.getElementById('noRewardButton')!.addEventListener(
    'click', dismissRewardedAd);
// [END request_ads]