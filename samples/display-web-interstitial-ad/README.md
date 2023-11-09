# Display a web interstitial ad

This example demonstrates how to display a web interstitial ad using the Google
Publisher Tag (GPT) library. Web interstitials are GPT-managed, full-page ads
that appear in response to user actions. For more information about web
interstitials, see [Traffic web interstitials][admanager_hc_interstitial].

The following user actions are eligible to trigger a web interstitial ad:

| User action | [API name][ref_docs_interstitialconfig] | Default | Configurable |
|---------|---------|---------|---------|
| Navigating away from the page in response to a click. | N/A | Enabled | No |
| Hiding and then returning to the page (for example, by switching tabs). | `unhideWindow` | Disabled | Yes |

Important: Default trigger states are
[configurable in Google Ad Manager][admanager_hc_interstitial]. If these values
have been modified for your Ad Manager account, they may not match the
preceding table.

Support for additional user actions may be added in the future. Follow the
[GPT release notes][guide_rel_notes] for updates.

## Usage notes

*   **To ensure an optimal user experience, GPT only requests web interstitial
    ads on pages that properly support the format.** Web interstitials are only
    supported when GPT is running in the top window. On pages that don't support
    web interstitials, `defineOutOfPageSlot()` may return null. Be sure to check
    for this to avoid errors.

*   **Only request web interstitial ads on pages or environments where you want
    an interstitial to appear.** Web interstitial ads are eligible to serve to
    desktop, tablet, and mobile devices.

    Note: You can use Chrome DevTools [mobile simulation][simulate_mobile] to
    test web interstitial ads on mobile from a desktop environment.

*   **Web interstitial ads generate their own ad slot.** Unlike other ad types,
    you don't need to define a `<div>` for web interstitial ads. These ads
    automatically create and insert their own container into the page when an ad
    fills.

*   **Web interstitial ads have a fixed
    [frequency cap][admanager_hc_frequency].** This prevents the same user from
    being shown an interstitial more than once per hour, per subdomain.

*   **Web interstitial ads require access to local storage.** For publishers
    integrated with the
    [IAB Transparency and Consent Framework v2.0][admanager_hc_tcf], this means
    that consent for [Purpose 1][admanager_hc_tcf_purpose] is required for web
    interstitial ads to function.

*   **If using single-request architecture (SRA) on a page with multiple slots,
    don't call `display()` until static ad slots divs are created.** As
    explained in [Ad Best Practices][guide_sra], the first call to `display()`
    requests every ad slot defined prior to that point. Although web
    interstitial slots don't require a predefined `<div>`, static ad slots do.
    Calling `display()` before these elements are present on the page can result
    in lower quality signals, reducing monetization. Because of this, we
    recommend delaying the initial call until after the static slots are
    defined.

[admanager_hc_frequency]: //support.google.com/admanager/answer/9840201#frequency
[admanager_hc_interstitial]: //support.google.com/admanager/answer/9840201
[admanager_hc_tcf]: //support.google.com/admanager/answer/9805023
[admanager_hc_tcf_purpose]: //support.google.com/admanager/answer/9461778#purposes
[guide_rel_notes]: //developers.google.com/publisher-tag/release-notes
[guide_sra]: //developers.google.com/publisher-tag/guides/ad-best-practices#use_single_request_architecture_correctly
[ref_docs_interstitialconfig]: //developers.google.com/publisher-tag/reference#googletag.config.interstitialconfig
[simulate_mobile]: //developers.google.com/web/tools/chrome-devtools/device-mode#viewport
