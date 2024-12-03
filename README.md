<div align="center">
<h1>ff-lucid</h1>
<p style="font-size: 1.2em;">Lucid for Firefox. Replace your Home & New Tab pages with a simple notepad and greeting that includes the date and time of day. Sync through your Mozilla account. Customize color scheme and font style.</p>
<img src="https://img.shields.io/github/languages/code-size/bost-ty/firefox-lucid" alt="Code size shield">
<img src="https://img.shields.io/amo/users/fflucid@fflucid.com" alt="Number of users shield">
</div>

<hr />

### Table of Contents

- [Installation](#installation)
  - [_Using the official Firefox Add-Ons Library_](#using-the-official-firefox-add-ons-library)
- [FAQ](#faq)
  - [_Why is the time/date/color scheme wrong?_](#why-is-the-timedatecolor-scheme-wrong)
  - [_Why isn't the notepad saving?_](#why-isnt-the-notepad-saving)
  - [_A feature isn't working! Something broke! What's the deal with [blank]?_](#a-feature-isnt-working-something-broke-whats-the-deal-with-blank)
- [Thank you!](#thank-you)

## Installation

### _Using the official Firefox Add-Ons Library_

1. Go to [the product page](https://addons.mozilla.org/en-US/firefox/addon/ff-lucid/).
2. Install the add-on as usual.
3. Open a new tab or your homepage (which may require a reload of your browser) and do your thing.

## FAQ

### _Why is the time/date/color scheme wrong?_

If enabled, Firefox's advanced anti-fingerprinting settings (`privacy.resistFingerprinting`) will prevent timezone detection by spoofing it to UTC±0 and `prefers-color-scheme` media queries to `light`.

For these cases, users can set their preferred font, color scheme, and timezone through the add-on options page (type `about:addons` in your address bar to get there). This will require you to know your current timezone offset. Don't know your timezone offset? [Search online](https://duckduckgo.com) and you'll have it.

### _Why isn't the notepad saving?_

This extension relies on Firefox Sync to save (and sync!) your notepad. If you don't have a Firefox account with Firefox Sync and Extension Sync enabled, your notepad content and extension options cannot save. Please see the closed Sync issue on GitHub for more information and troubleshooting steps.

I do not plan to support local storage alongside sync storage. If you would like to develop a local storage solution that works alongside sync storage, please create an issue and pull request!

### _A feature isn't working! Something broke! What's the deal with [blank]?_

Thanks for letting me know! Please [submit an issue on GitHub](https://github.com/bost-ty/firefox-lucid/issues) with your specifics so we can fix it. Pull requests are always welcome.

## Thank you!

A big shout-out to [Daniel Eden](https://github.com/daneden) for creating the original Lucid New Tab and allowing me to port his code over to Firefox. Thanks Dan!
