# Ad event listeners

The Google Publisher Tag (GPT) library allows you to register and call
JavaScript functions when specific GPT-related ad events occur. This sample
provides a demonstration of using the GPT event framework to monitor and report
on the following events.

Event                                                       | Fired when...
:---------------------------------------------------------- | :------------
[ImpressionViewableEvent][ref_doc_impressionviewable]       | An impression becomes viewable.
[SlotOnLoadEvent][ref_doc_slotonload]                       | A creative iframe fires its onload event.
[SlotRenderEndedEvent][ref_doc_slotrenderended]             | Creative code has been injected into an ad slot.
[SlotRequestedEvent][ref_doc_slotrequested]                 | An ad has been requested for the ad slot.
[SlotResponseReceivedEvent][ref_doc_slotresponsereceived]   | An ad response has been received for the ad slot.
[SlotVisibilityChangedEvent][ref_doc_slotvisibilitychanged] | The on-screen percentage of the ad slot changes.

[ref_doc_impressionviewable]: https://developers.google.com/publisher-tag/reference#googletag.events.impressionviewableevent
[ref_doc_slotonload]: https://developers.google.com/publisher-tag/reference#googletag.events.slotonloadevent
[ref_doc_slotrenderended]: https://developers.google.com/publisher-tag/reference#googletag.events.slotrenderendedevent
[ref_doc_slotrequested]: https://developers.google.com/publisher-tag/reference#googletag.events.slotrequestedevent
[ref_doc_slotresponsereceived]: https://developers.google.com/publisher-tag/reference#googletag.events.slotresponsereceived
[ref_doc_slotvisibilitychanged]: https://developers.google.com/publisher-tag/reference#googletag.events.slotvisibilitychangedevent
