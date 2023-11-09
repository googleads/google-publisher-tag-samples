# Tag pages with infinite content

You can dynamically generate new ad content using the Google Publisher Tag
library.

Caution: Competitive exclusions and roadblocks are only guaranteed to be honored
for ads served by either a single
[Single request architecture (SRA)][admanager_hc_sra] request or a sequence of
serial SRA requests. Making multiple SRA requests in parallel may result in
competitive ads being displayed on the same page.

A sample of the full code you would use to implement tags with infinite page
contents is shown below. The sample features a button on the bottom of the page
to dynamically generate new content.

[admanager_hc_sra]: http://support.google.com/admanager/answer/183282
