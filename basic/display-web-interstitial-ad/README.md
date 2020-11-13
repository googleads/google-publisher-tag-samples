# Display a web interstitial ad

This example demonstrates how to display a web interstitial ad using the Google
Publisher Tag (GPT) library. Web interstitials are GPT-managed, full-page ads
that appear between page views. For more information about web interstitials,
see [Traffic web interstitials][admanager_hc_interstitial].

## Usage notes

*   **To ensure an optimal user experience, GPT only requests web interstitial
    ads on pages that properly support the format.** Currently, web
    interstitials are only supported when GPT is running in the top window. On
    pages that do not support web interstitials, `defineOutOfPageSlot()` may
    return null. Be sure to check for this to avoid errors.
*   **Only request web interstitial ads on pages or environments where you want
    an interstitial to appear.** Web interstitial ads are eligible to serve to
    desktop, tablet, and mobile devices.

    Note: You can use Chrome DevTools [mobile simulation][simulate_mobile] to
    test web interstitial ads on mobile from a desktop environment.

*   **Web interstitial ads generate their own ad slot.** Unlike other ad types,
    you do not need to define a `<div>` for web interstitial ads. These ads
    automatically create and insert their own container into the page when an ad
    fills.

*   **If using single-request architecture (SRA) on a page with multiple slots,
    don’t call `display()` until static ad slots divs are created.** As
    explained in [Ad Best Practices][guide_sra], the first call to `display()`
    requests every ad slot defined prior to that point. Although web
    interstitial slots do not require a predefined `<div>`, static ad slots do.
    Calling `display()` before these elements are present on the page can result
    in lower quality signals, reducing monetization. Because of this, we
    recommend delaying the initial call until after the static slots are
    defined.

[admanager_hc_interstitial]: //support.google.com/admanager/answer/9840201

[guide_sra]: //developers.google.com/publisher-tag/guides/ad-best-practices#use_single_request_architecture_correctly

[simulate_mobile]: //developers.google.com/web/tools/chrome-devtools/device-mode#viewport
