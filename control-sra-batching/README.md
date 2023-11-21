# Control SRA batching

The Google Publisher Tag (GPT) library's Single Request Architecture (SRA) mode
batches multiple ad slots into a single ad request. This provides performance
benefits, but is also necessary to guarantee that
[competitive exclusions and roadblocks][admanager_hc_roadblock] are honored.

By default, all ad slots defined prior to calling `display()` or `refresh()`
will be batched and requested together when SRA mode is active. There are some
situations where you may want more control over this batching behavior, however.
For example, to [prioritize the loading of specific slots][prioritize_slots] or
to avoid exceeding the
[maximum number of slots in a single SRA request][too_many_slots].

Warning: Roadblocks are not guaranteed across multiple SRA batches.

This example demonstrates how to apply techniques for
[controlling ad loading and refresh][guide_ad_loading] to SRA requests.

[admanager_hc_roadblock]: https://support.google.com/admanager/answer/177277
[guide_ad_loading]: https://developers.google.com/publisher-tag/guides/control-ad-loading
[prioritize_slots]: https://developers.google.com/publisher-tag/guides/ad-best-practices#prioritize_important_ad_slots
[too_many_slots]: https://developers.google.com/publisher-tag/guides/publisher-console-messages#TOO_MANY_SLOTS_IN_SRA_REQUEST
