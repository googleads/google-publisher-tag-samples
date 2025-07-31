# Lazy loading

Lazy loading enables pages to load faster, reduces resource consumption and
contention, and improves viewability rate by pausing the requesting and
rendering of ads until they approach the user's viewport.

With lazy loading in SRA, when the first ad slot comes within the viewport
specified by the [`fetchMarginPercent`][ref_doc_fetchMarginPercent] property,
the call for that ad and all other ad slots is made.

[ref_doc_fetchMarginPercent]: //developers.google.com/publisher-tag/reference#googletag.config.LazyLoadConfig.fetchMarginPercent
