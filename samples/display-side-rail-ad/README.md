# Display a side rail ad

This example displays side rail ads using the Google Publisher Tag (GPT)
library. Learn more about side rail ads in the
[Google Ad Manager help center][admanager_hc_side_rail].

## Preview side rail ads

You can display a demo side rail ad on any page that shows ads with GPT by
adding `#gamLeftSideRailDemo` or `#gamRightSideRailDemo` to the URL. For
example, `https://www.example.com/#gamLeftSideRailDemo`.

This can be used to preview side rail ads on your site with no code changes
required. This is especially useful to quickly validate how side rails will
look and behave on different devices and in different operating environments.

## Usage notes

*   **To ensure an optimal user experience, side rail ads are only requested on
    pages that properly support the format.** Because of this,
    `defineOutOfPageSlot()` might return null. Check for this case to
    ensure you're not doing unnecessary work. Side rail ads are
    supported when the following conditions are met:

    *   GPT is running in the top window.
    *   Viewport dimensions are at least `1200x650` pixels.

*   **Only request side rail ads on pages and environments where you want a side
    rail ad to appear.** Side rail ads are eligible to serve to all devices.

*   **Side rail ads generate their own ad container.** You don't need a
    `<div>` for side rail ads. Side rail ads
    automatically create and insert their own container into the page when an ad
    fills. These containers are positioned as close as possible to the main
    page content.

*   **Side rail ads are optimized to fit the space available.** Side rail ads
    require a minimum of `120x500` pixels of empty space to the left or right
    of the main page content to display. Once displayed, if the page is resized
    causing the empty space to fall below this minimum, the slot is temporarily
    hidden until space becomes available again.

*   **If using single-request architecture (SRA) on a page with multiple slots,
    don't call `display()` until static ad slots divs are created.** As
    explained in [Ad Best Practices][guide_sra], the first call to `display()`
    requests every ad slot defined prior to that point. Although side rail ad
    slots don't require a predefined `<div>`, static ad slots do. Calling
    `display()` before these elements are present on the page can result in
    lower quality signals, reducing monetization. Because of this, we recommend
    delaying the initial call until after the static slots are defined.

*   **Only refresh visible side rail ads.** When an side rail ad slot
    is collapsed or not visible, all calls to `refresh()` are ignored. If you're
    using `googletag.setConfig({ disableInitialLoad: true })` to manually
    [control ad loading and refresh][guide_ad_loading], the first call
    to `refresh()` will trigger an ad request regardless of the slot visibility.

[admanager_hc_side_rail]: //support.google.com/admanager/answer/10452255
[guide_ad_loading]: //developers.google.com/publisher-tag/guides/control-ad-loading
[guide_sra]: //developers.google.com/publisher-tag/guides/ad-best-practices#use_single_request_architecture_correctly