# Lucid for Firefox

**[<img align="right" src="https://addons.cdn.mozilla.net/static/img/addons-buttons/AMO-button_2.png">](https://addons.mozilla.org/firefox/addon/ff-lucid/) Replace your Home & New Tab pages with a simple personal notepad and greeting that includes the date and time of day.**

### Installation:

**Using the official Firefox Add-Ons Library:**

1. Go to [the product page](https://addons.mozilla.org/en-US/firefox/addon/ff-lucid/).
2. Install the addon as usual.
3. Open a new tab or your homepage (may require a reload of your browser) and start writing!

### Help!

_Why is the time/date/color scheme wrong?_

If enabled, Firefox's anti-fingerprinting settings prevent access to accurate `Date()` timezone offset (defaults to UTC, which has a `Date().getTimezoneOffset()` of 0) and `prefers-color-scheme` media queries (defaults to light). For these cases, users can easily set their preferred font, color scheme, and timezone through the add-on's options page. This will require you to know your current timezone offset. Please [search online](https://duckduckgo.com) if you don't know it.

_Why isn't my notepad saving?_

This issue is currently being investigated. If you don't have a Firefox account with sync and extension sync enabled, your notepad content and other settings cannot be saved. Please see the open issue on GitHub for more information and troubleshooting steps.

_A feature isn't working! Something is broken!_

I believe you. Please submit an issue on [GitHub](https://github.com/bost-ty/firefox-lucid/issues) to make me aware.

### **Thank you!**

A big shoutout to [Daniel Eden](https://github.com/daneden) for creating the original Lucid New Tab and allowing me to port his code over to Firefox. Thanks Dan!
