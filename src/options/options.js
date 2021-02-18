// @bost-ty, 2020, FFLucid

// Initialize DOM control variables
const optionsForm = document.querySelector(".options-form");
const timezoneOffset = optionsForm.querySelector("#timezone-offset");
const colorRadios = optionsForm.querySelectorAll("input[name='color-scheme']");
const fontRadios = optionsForm.querySelectorAll("input[name='font']");

// Initialize settings variables
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

// Set color scheme and font preference.
function checkPreferences() {
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
    if (colorRadios) colorRadios[1].checked = true;
  } else if (colorPreference == "dark") {
    rootStyles.style.setProperty("--foreground", light);
    rootStyles.style.setProperty("--background", dark);
    if (colorRadios) colorRadios[0].checked = true;
  }
  if (!fontPreference) rootStyles.style.setProperty("--fontStack", mono);
  else if (fontPreference == "sans") rootStyles.style.setProperty("--fontStack", sans);
  else if (fontPreference == "mono") rootStyles.style.setProperty("--fontStack", mono);
}

// clear saved options
const clearButton = document.querySelector("#clearSync");
clearButton.addEventListener("click", clearSync);

function clearSync() {
  browser.storage.sync.clear();
  console.log("Cleared");
}

// Save on submit
function saveOptions(e) {
  e.preventDefault();

  for (const rb of colorRadios) {
    if (rb.checked) {
      colorPreference = rb.value;
      break; // If found, no need to look further
    }
  }
  for (const rb of fontRadios) {
    if (rb.checked) {
      fontPreference = rb.value;
      break; // If found, no need to look further
    }
  }
  browser.storage.sync.set({
    timezone: timezoneOffset.value,
    colorPreference: colorPreference,
    fontPreference: fontPreference,
  });
  checkPreferences();
  restoreOptions();
}

document.addEventListener("DOMContentLoaded", restoreOptions);
optionsForm.addEventListener("submit", saveOptions);
