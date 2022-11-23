/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Using @types/google-publisher-tag
// https://www.npmjs.com/package/@types/google-publisher-tag

window.googletag = window.googletag || {cmd: []};

let requestedTimestamp: {[key: string]: number} = {};

googletag.cmd.push(() => {
  // Define ad slots.
  googletag.defineSlot(
               '/6355419/Travel/Europe', [728, 90],
               'ad-slot-1')!.addService(googletag.pubads());
  googletag.defineSlot(
               '/6355419/Travel/Europe', [750, 200],
               'ad-slot-2')!.addService(googletag.pubads());

  // This listener will be called when an impression is considered viewable.
  googletag.pubads().addEventListener('impressionViewable', (event) => {
    const slotId = event.slot.getSlotElementId();
    printEventMessage('Impression has become viewable.', slotId);
  });

  // This listener will be called when a slot's creative iframe load event fires.
  googletag.pubads().addEventListener('slotOnload', (event) => {
    const slotId = event.slot.getSlotElementId();
    printEventMessage('Creative iframe load event has fired.', slotId);
  });

  // This listener will be called when a slot has finished rendering.
  googletag.pubads().addEventListener('slotRenderEnded', (event) => {
    const slotId = event.slot.getSlotElementId();

    // Record details of the rendered ad.
    const details = {
      'Advertiser ID': event.advertiserId,
      'Campaign ID': event.campaignId,
      'Company IDs': event.companyIds,
      'Creative ID': event.creativeId,
      'Creative Template ID': event.creativeId,
      'Is backfill?': event.isBackfill,
      'Is empty?': event.isEmpty,
      'Label IDs': event.labelIds,
      'Line Item ID': event.lineItemId,
      Size: typeof event.size === 'string' ? event.size :
                                             event.size?.join('x') ?? null,
      'Slot content changed?': event.slotContentChanged,
      'Source Agnostic Creative ID': event.sourceAgnosticCreativeId,
      'Source Agnostic Line Item ID': event.sourceAgnosticLineItemId,
      'Yield Group IDs': event.yieldGroupIds,
    };

    printEventMessage('Slot has finished rendering.', slotId, details);
  });

  // This listener will be called when the specified service actually
  // sets an ad request for a slot. Each slot will fire this event, even
  // though they may be batched together in a single request if single
  // request architecture (SRA) is enabled.
  googletag.pubads().addEventListener('slotRequested', (event) => {
    const slotId = event.slot.getSlotElementId();
    requestedTimestamp[slotId] = Date.now();
    printEventMessage('Slot has been requested.', slotId);
  });

  // This listener will be called when an ad response has been received for
  // a slot.
  googletag.pubads().addEventListener('slotResponseReceived', (event) => {
    const slotId = event.slot.getSlotElementId();
    printEventMessage('Ad response has been received.', slotId);
  });

  // This listener will be called whenever the on-screen percentage of an ad
  // slot's area changes.
  googletag.pubads().addEventListener('slotVisibilityChanged', (event) => {
    const slotId = event.slot.getSlotElementId();

    // Record details of the event.
    const details = {'Visible area': `${event.inViewPercentage}%`};

    printEventMessage('Visibility has changed.', slotId, details);
  });

  // Enable SRA and services.
  googletag.pubads().enableSingleRequest();
  googletag.enableServices();

  // Request and render all previously defined ad slots.
  googletag.display('ad-slot-2');
});

function printEventMessage(
    eventMessage: string, slotId: string,
    details: {[key: string]: boolean|number|number[]|string|null} = {}) {
  const row = document.getElementsByClassName('status-row')[0].cloneNode(
                  true) as HTMLDivElement;

  const cells = row.getElementsByClassName('status-cell');
  cells[0].textContent = slotId;
  cells[1].textContent = eventMessage;
  for (const key in details) {
    if (!details.hasOwnProperty(key) || !details[key]) continue;

    const detailElem = document.createElement('p');
    detailElem.className = 'status-detail';
    detailElem.textContent = `${key}: ${details[key]}`;
    cells[1].appendChild(detailElem);
  }
  cells[2].textContent = `${Date.now() - requestedTimestamp[slotId]}ms`;

  document.getElementsByClassName('status-container')[0].appendChild(row);
}
