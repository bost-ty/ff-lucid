// @bost-ty, 2020, FFLucid

const optionsForm = document.querySelector(".options-form");
const timezoneOffset = optionsForm.querySelector("#timezone-offset");
const colorRadios = optionsForm.querySelectorAll("input[name='color-scheme']");
const fontRadios = optionsForm.querySelectorAll("input[name='font']");

let colorPreference;
let fontPreference;

function checkPreferences() {
  // Set color and font preference.
  const rootStyles = document.documentElement;
  const light = getComputedStyle(rootStyles).getPropertyValue("--light");
  const dark = getComputedStyle(rootStyles).getPropertyValue("--dark");
  const sans = getComputedStyle(rootStyles).getPropertyValue("--sans");
  const mono = getComputedStyle(rootStyles).getPropertyValue("--mono");
  if (!colorPreference) {
    // Default to dark mode
    rootStyles.style.setProperty("--foreground", light);
    rootStyles.style.setProperty("--background", dark);
  } else if (colorPreference == "light") {
    rootStyles.style.setProperty("--foreground", dark);
    rootStyles.style.setProperty("--background", light);
    colorRadios[1].checked = true;
  } else if (colorPreference == "dark") {
    rootStyles.style.setProperty("--foreground", light);
    rootStyles.style.setProperty("--background", dark);
    colorRadios[0].checked = true;
  }
  if (!fontPreference) rootStyles.style.setProperty("--fontStack", mono);
  else if (fontPreference == "sans") rootStyles.style.setProperty("--fontStack", sans);
  else if (fontPreference == "mono") rootStyles.style.setProperty("--fontStack", mono);
}
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
