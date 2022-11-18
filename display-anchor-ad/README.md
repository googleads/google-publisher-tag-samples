# Display an anchor ad

This example displays an anchor ad using the Google Publisher Tag (GPT) library.
Learn more about anchor ads in the
[Google Ad Manager help center][admanager_hc_anchor].

## Preview anchor ads

You can display a demo anchor ad on any page that shows ads with GPT by adding
`#gamTopAnchorDemo` or `#gamBottomAnchorDemo` to the URL. For example,
`https://www.example.com/#gamTopAnchorDemo`.

This functionality can be used to preview anchor ads on your site with no code
changes required. This is especially useful to quickly validate how anchors will
look and behave on different devices and in different operating environments.

## Usage notes

*   **To ensure an optimal user experience, anchor ads are only requested on
    pages that properly support the format.** Because of this,
    `defineOutOfPageSlot()` may return null; you should check for this case to
    ensure you're not doing any unnecessary work. Currently, anchor ads are
    supported if the following conditions are met:

    *   GPT is running in the top window.
    *   On a mobile optimized page where zoom is neutral; typically this means
        the publisher has `<meta name="viewport" content="width=device-width,
        initial-scale=1">` or similar in the `<head>` of the page.
    *   Viewport is in a portrait orientation with a width between `320px` and
        `1000px`.

*   **Only request anchor ads on pages/environments where you want an anchor to
    appear.** For example, don't assume anchors are ineligible on desktop pages,
    as we may add support in the future.

    Note: You can use Chrome DevTools [mobile simulation][simulate_mobile] to
    test anchor ads on mobile from a desktop environment.

*   **Anchor ads generate their own ad container.** Unlike other ad types, it's
    not necessary to define a `<div>` for anchor ads. Anchor ads automatically
    create and insert their own container into the page when an ad fills. These
    containers may overlap or occlude other elements using absolute or fixed
    positioning, so it's recommended to avoid placing such elements in areas
    where anchors are meant to appear.

*   **If using single-request architecture (SRA) on a page with multiple slots,
    don't call `display()` until static ad slots divs are created.** As
    explained in [Ad Best Practices][guide_sra], the first call to `display()`
    requests every ad slot defined prior to that point. Although anchor ad slots
    do not require a predefined `<div>`, static ad slots do. Calling `display()`
    before these elements are present on the page can result in lower quality
    signals, reducing monetization. Because of this, we recommend delaying the
    initial call until after the static slots are defined.

*   **Only visible anchor ads may be refreshed.** When an anchor ad slot is
    collapsed or not yet scrolled into view, all calls to `refresh()` are
    ignored. If you're using `disableInitialLoad()` to manually
    [control ad loading and refresh][guide_ad_loading], however, the first call
    to `refresh()` will trigger an ad request regardless of the slot visibility.

[admanager_hc_anchor]: //support.google.com/admanager/answer/10452255
[guide_ad_loading]: //developers.google.com/publisher-tag/guides/control-ad-loading
[guide_sra]: //developers.google.com/publisher-tag/guides/ad-best-practices#use_single_request_architecture_correctly
[simulate_mobile]: //developers.google.com/web/tools/chrome-devtools/device-mode#viewport
