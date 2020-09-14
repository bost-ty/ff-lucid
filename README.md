# Lucid for Firefox

**[<img align="right" src="https://addons.cdn.mozilla.net/static/img/addons-buttons/AMO-button_2.png">](https://addons.mozilla.org/firefox/addon/ff-lucid/) Replace your Home & New Tab pages with a simple personal notepad and a greeting that includes the date and time of day.**

### Installation:

#### Using the official Firefox Add-Ons:

1. Go to [the product page](https://addons.mozilla.org/en-US/firefox/addon/ff-lucid/).
2. Install it!

### Known Issues:

- If enabled, Firefox's anti-fingerprinting settings prevent access to accurate `Date()` time zone offset (defaults to UTC, `Date().getTimezoneOffset()` of 0) and `prefers-color-scheme` media queries (defaults to light). For these cases, users need to be able to manually set their preferred color scheme & time zone.

- Home Page override (but not New Tab override) is no longer functioning.

### Solutions:

- Time zone offset: if the rough time of day (morning/afternoon/evening) in the greeting is incorrect, open FFLucid's options page and input your preferred time zone offset.

- Color scheme preferences: until this feature is fully implemented, the best workaround is to input `about:config` in the address bar, accept the warning, and create or set the flag of `ui.systemUsesDarkTheme` to 1 for dark or 0 for light, making sure the Number option is selected.

#### Thank you!

A big shoutout to [Daniel Eden](https://github.com/daneden) for creating the original Lucid New Tab and allowing me to port his code over to Firefox. Thanks Dan!
