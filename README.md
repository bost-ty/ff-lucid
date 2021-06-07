# Lucid for Firefox

**[<img align="right" src="https://addons.cdn.mozilla.net/static/img/addons-buttons/AMO-button_2.png">](https://addons.mozilla.org/firefox/addon/ff-lucid/) Replace your Home & New Tab pages with a simple personal notepad and greeting that includes the date and time of day.**

### Installation:

**Using the official Firefox Add-Ons Library:**

1. Go to [the product page](https://addons.mozilla.org/en-US/firefox/addon/ff-lucid/).
2. Install the add-on as usual.
3. Open a new tab or your homepage (which may require a reload of your browser) and do your thing.

### Help!

_Why is the time/date/color scheme wrong?_

If enabled, Firefox's anti-fingerprinting settings prevent access to accurate `Date()` timezone offset (defaults to UTC, which has a `Date().getTimezoneOffset()` of 0) and `prefers-color-scheme` media queries (defaults to light). For these cases, users can set their preferred font, color scheme, and timezone through the add-on options page (type `about:addons` in your address bar to get there). This will require you to know your current timezone offset. Don't know your timezone offset? [Search online](https://duckduckgo.com) and you'll have it.

_Why isn't my notepad saving?_

This extension relies on Firefox Sync to save (and sync!) your notepad. If you don't have a Firefox account with Sync and Extension Sync enabled, your notepad content and other settings cannot save. Please see the (now closed) Sync issue on GitHub for more information and troubleshooting steps.

_A feature isn't working! Something broke! What's the deal with [blank]?_

Thanks for letting me know! Please [submit an issue on GitHub](https://github.com/bost-ty/firefox-lucid/issues) with your specifics so we can fix it.

### **Thank you!**

A big shout-out to [Daniel Eden](https://github.com/daneden) for creating the original Lucid New Tab and allowing me to port his code over to Firefox. Thanks Dan!
