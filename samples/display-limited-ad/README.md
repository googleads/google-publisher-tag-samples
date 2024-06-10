# Display a limited ad

This is an example of using the Google Publisher Tag (GPT) library to request
and render a limited ad. Limited ads provide publishers a way to serve ads in
the absence of consent for the use of cookies or other local identifiers. Learn
more about the features and limitations of limited ads in the
[Google Ad Manager help center][admanager_hc_ltd].

You can instruct GPT to request limited ads in
[two different ways][admanager_hc_ltd_impl]:

*   Automatically, by using a signal from an [IAB TCF v2.0][iab_tcf] consent
    management platform (CMP).
*   Manually, by using the [GPT `PrivacySettings` API][ref_doc_privacysettings].

Important: it is not necessary to manually enable limited ads when a CMP is in
use.

In order to manually control limited ads, you must load GPT from the
[limited ads URL][guide_best_practices_load]. The version of GPT served from
this URL contains additional safeguards against accessing client-side storage by
default. To accomplish this, certain library operations are delayed until after
the first call to `display()`, leading to a slight decrease in performance
compared to the standard version of GPT.

You can't manually control limited ads on a per-request basis when GPT is loaded
from the standard URL. When you load GPT from the standard URL, all calls to
`setPrivacySettings({ limitedAds: ... })` are ignored and the library may
attempt to access client-side storage at any time. This allows GPT to more
effectively optimize the order of library operations. For example, GPT can
perform [encrypted signal][admanager_hc_encrypted_signals] collection earlier,
increasing the likelihood that gathered signals will be included in every ad
request.

[admanager_hc_encrypted_signals]: //support.google.com/admanager/answer/10488752
[admanager_hc_ltd]: //support.google.com/admanager/answer/9882911
[admanager_hc_ltd_impl]: //support.google.com/admanager/answer/9882911#implementation
[guide_best_practices_load]: //developers.google.com/publisher-tag/guides/general-best-practices#load_from_an_official_source
[iab_tcf]: //iabeurope.eu/tcf-2-0/
[ref_doc_privacysettings]: //developers.google.com/publisher-tag/reference#googletag.privacysettingsconfig
