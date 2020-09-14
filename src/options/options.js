// @bost-ty, 2020, FFLucid

import { checkPreferences } from "../checkPreferences";

const optionsForm = document.querySelector(".options-form");
const timezoneOffset = optionsForm.querySelector("#timezone-offset");
const colorRadios = optionsForm.querySelectorAll("input[name='color-scheme']");
const fontRadios = optionsForm.querySelectorAll("input[name='font']");

let colorPreference;
let fontPreference;

// Restore options on load
function restoreOptions() {
  let getting = browser.storage.sync.get();
  getting.then((result) => {
    if (getting) {
      timezoneOffset.value = result.timezone;
      colorPreference = result.colorPreference;
      fontPreference = result.fontPreference;
      checkPreferences();
    }
  });
}

// Save on submit
function saveOptions(e) {
  for (const rb of colorRadios) {
    if (rb.checked) {
      colorPreference = rb.value;
      break;
    }
  }
  for (const rb of fontRadios) {
    if (rb.checked) {
      fontPreference = rb.value;
      break;
    }
  }
  browser.storage.sync.set({
    timezone: timezoneOffset.value,
    colorPreference: colorPreference,
    fontPreference: fontPreference,
  });
  checkPreferences();
  restoreOptions();
  e.preventDefault();
}

document.addEventListener("DOMContentLoaded", restoreOptions);
optionsForm.addEventListener("submit", saveOptions);
