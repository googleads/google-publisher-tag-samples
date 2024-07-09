# Display ads in the shadow DOM

The [shadow DOM][shadow_dom] lets you attach a DOM tree to an element, and have
the internals of that tree isolated from the rest of the page. By default, any
elements created inside of the shadow DOM are inaccessible to JS and CSS running
on the main page.

When the Google Publisher Tag (GPT) library is loaded on the main page, it's
capable of rendering ads into containers within the shadow DOM, if the following
requirements are met:

1. The shadow DOM is attached in [open mode][shadow_dom_open].
1. Calls to [`googletag.display()`][ref_doc_display] provide a reference to an
   ad container element, instead of a DOM ID string.

[shadow_dom]: //developer.mozilla.org/docs/Web/API/Web_components/Using_shadow_DOM
[shadow_dom_open]: //developer.mozilla.org/docs/Web/API/Web_components/Using_shadow_DOM#element.shadowroot_and_the_mode_option

[ref_doc_display]: //developers.google.com/publisher-tag/reference#googletag.display