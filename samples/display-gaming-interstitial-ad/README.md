# Display an H5 gaming interstitial ad

Important: Gaming interstitial ads are a limited-access format. For more
information, see [Display an H5 gaming interstitial ad][admanger_hc_gia].

This example displays a gaming interstitial ad using the Google Publisher Tag
(GPT) library. Gaming interstitials are GPT-managed, full-page ads that you
display to users playing web-based games based on a manual trigger. For more
information about gaming interstitials, see
[Display an H5 gaming interstitial ad][admanger_hc_gia].

To display and interact with gaming interstitial ads, use the following GPT
events:

Event                        | Fired when...
:--------------------------- | :-------------------------------------------
[`GamingInterstitialSlotReady`][]  | A gaming interstitial ad is ready to display to the user.<br><br>To display the interstitial, call [`makeGameManualInterstitialVisible()`][] on the provided event object.
[`GamingInterstitialSlotClosed`][] | The user closed a previously displayed gaming interstitial ad.<br><br>Use this event to run custom logic whenever a gaming interstitial is closed.

##Game structures

Gaming interstitial ads can display either fullscreen or inside the frame of
your game, depending on how your game is structured. For more details, see
[H5 Game structures][admanager_hc_game_structures].

The sample implementation assumes that the H5 game renders directly into the
top-most window, using the **Fullscreen** structure. In this scenario, the
gaming interstitial ad also renders fullscreen.

However, this same code also works when placed inside of a child frame, using
the **iFrame/WebView** structure. To constrain the gaming interstitial ad to the
H5 game canvas, place the game in an iFrame, as shown in the following example:

```html
<!doctype html>
<html>
  <head>
    <!-- The Google Publisher Tag here, if any, will only be responsible for serving ads outside of the H5 game. -->
    <title>Page for this example H5 game</title>
    <!-- Your <head> content here. -->
  </head>
  <body>
    <span id="example-text">Example H5 game</span>

    <!-- Sample code is served here. The Google Publisher Tag loaded in this frame will only be used within the H5 game. -->
    <iframe src="https://www.example.com" title="Example game" allow="autoplay"></iframe>
  </body>
</html>
```

## Usage notes

*   **To ensure an optimal user experience, GPT only requests gaming
    interstitial ads on pages that properly support the format.** Due to this
    restriction, `defineOutOfPageSlot()` may return null. You must check for
    this case to ensure you're not doing any unnecessary work.

*   **Only request gaming interstitial ads on pages or environments where you
    want an interstitial to appear.** Gaming interstitial ads are eligible to
    serve to desktop, tablet, and mobile devices.

    Note: You can use Chrome DevTools mobile simulation to test gaming
    interstitial ads on mobile from a desktop environment.

*   **Gaming interstitial ads generate their own ad slot.** Unlike other ad
    types, it's not necessary to define a `<div>` for gaming interstitial ads.
    These ads automatically create and insert their own container into the page
    when an ad fills.

*   **Gaming interstitial ads are one-time use.** You cannot refresh a gaming
    interstitial ad slot. Instead, you must destroy the slot and re-create it,
    as shown in the sample implementation.

*   **Gaming interstitial ads have a fixed frequency cap.** The frequency cap
    prevents the `gamingInterstitialSlotReady` event from firing more than once
    every 30 seconds.

*   **If using single-request architecture (SRA) on a page with multiple slots,
    don't call `display()` until static ad slots divs are created.** As
    explained in [Ads Best Practices][guide_sra], the first call to `display()`
    requests every ad slot defined before that point. Although gaming
    interstitial slots don't require a predefined `<div>`, static ad slots do.
    Calling `display()` before these elements are present on the page can result
    in lower quality signals. We recommend delaying the initial call until after
    static slots are defined.

[admanager_hc_game_structures]: //support.google.com/admanager/answer/14637831#h5-game-structures
[admanger_hc_gia]: //support.google.com/admanager/answer/14640119
[guide_sra]: //developers.google.com/publisher-tag/guides/ad-best-practices#use_single_request_architecture_correctly
[`GamingInterstitialSlotClosed`]: //developers.google.com/publisher-tag/reference#googletag.events.GameManualInterstitialSlotClosedEvent
[`GamingInterstitialSlotReady`]: //developers.google.com/publisher-tag/reference#googletag.events.GameManualInterstitialSlotReadyEvent
[`makeGameManualInterstitialVisible()`]: //developers.google.com/publisher-tag/reference#googletag.events.GameManualInterstitialSlotReadyEvent.makeGameManualInterstitialVisible
