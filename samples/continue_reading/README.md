# Configure web interstitial continue reading button

This example demonstrates how to customize the **View ad to continue** button
used by the Google Publisher Tag (GPT) library when displaying a web
interstitial ad.

Web interstitials are GPT-managed, full-page ads that appear in response to
user actions. When the `continueReading` trigger is enabled, GPT creates and
displays a **View ad to continue** button, blurs content underneath, and disables
downward scrolling. Users can unlock the blurred-out content after clicking the
button and dismissing the interstitial. The appearance of this button (including
font family, font color, and background color) can be customized using
`continueButton` configuration options.

## Usage notes

*   **Customizing the button text is not supported.** You can only
    customize the font and colors (including text and background color).

*   **Specifying a `targetId` is optional.** If you set `targetId`, GPT
    applies the trigger only to that element and its descendants; if you
    omit it, the trigger applies across the whole page.

*   **Ensure the target element exists in your HTML.** If you specify a target
    ID in the configuration, there must be a matching element on the page for
    the trigger to be applied.

*   **The page or target element must be at least one viewport in height.** If
    the page (or target element, if you specify one) is less than one viewport
    in height, GPT does not activate the `continueReading` trigger.
