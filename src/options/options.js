// @bost-ty, 2020, FFLucid

const optionsForm = document.querySelector(".options-form");
const timezoneOffset = optionsForm.querySelector("#timezone-offset");
// const colorRadios = optionsForm.querySelectorAll("input[name=color-scheme]");
// const btnSave = optionsForm.querySelector("button");

// Save on submit
function saveOptions(e) {
  browser.storage.sync.set({
    timezone: timezoneOffset.value,
  });
  e.preventDefault();
}

// Restore options on load
function restoreOptions() {
  function setCurrentChoice(result) {
    timezoneOffset.value = result.timezone || -7;
  }

  function onError(error) {
    console.log(`FFLucid: Error: ${error}`);
  }

  let getting = browser.storage.sync.get();
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
optionsForm.addEventListener("submit", saveOptions);

const userTimezoneOffset = timezoneOffset.value;
export default userTimezoneOffset;
