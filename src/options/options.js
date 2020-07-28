// @bost-ty, 2020, FFLucid

const optionsForm = document.querySelector(".options-form");
const timezoneOffset = optionsForm.querySelector("#timezone-offset");
// const colorRadios = optionsForm.querySelectorAll("input[name=color-scheme]");
// const btnSave = optionsForm.querySelector("button");

// Save and load settings
function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    timezone: document.querySelector("#timezone-offset").value,
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#timezone-offset").value = result.color || -7;
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get("color");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
