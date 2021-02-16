// L U  C   I    D
// Daniel Eden wrote this code
// He also happened to write this ode
// To focus, clarity, rest, and joy
// Which, I hope, you find in this toy

// Updated by @bost-ty, 2020, for Firefox

// Get Options from sync storage
const getting = browser.storage.sync.get();

getting.then((result) => {
  if (getting) {
    timezoneOffset = parseInt(result.timezone);
    colorPreference = result.colorPreference;
    fontPreference = result.fontPreference;
    checkPreferences();
  } else {
    console.error("Could not fetch from browser sync storage");
  }
});

// Define global functions
function updateStore(storeKey, data) {
  let obj = {};
  obj[storeKey] = JSON.stringify(data);
  browser.storage.sync.set(obj);
}

function readStore(storeKey, cb) {
  browser.storage.sync.get((result) => {
    let d = null;
    if (result[storeKey]) d = JSON.parse(result[storeKey]);
    if (typeof d === "object") cb(d);
  });
}

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

// Initialize settings variables
let timezoneOffset;
let colorPreference;
let fontPreference;

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

// Constants
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const key = "rhugtkeldibnridrlerlgcrrdvneevit";

// Read and load data from sync
readStore(key, (d) => {
  let data;

  // Check if we got data from sync storage
  if (d) {
    data = d;
    start(data);
  }
});

function listenerUpdate() {
  readStore(key, (d) => {
    document.querySelector(".notepad").textContent = d.notepadContent;
  });
}

function start(data) {
  // Determine and format date & time of day
  let now = new Date();
  let timeString = `${weekdays[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;

  // Check if offset from Date is non-zero, and if so, use it by default
  if (now.getTimezoneOffset() !== 0 && timezoneOffset !== 0) {
    timezoneOffset = now.getTimezoneOffset();
  }
  let roughHours = now.getHours() + timezoneOffset;
  let broadTime = roughHours < 12 ? "morning" : roughHours > 17 ? "evening" : "afternoon";

  let g = document.querySelector(".greeting");
  g.textContent = `Good ${broadTime}. Today is ${timeString}.`;

  // Set up the notepad
  let notepad = document.querySelector(".notepad");
  notepad.textContent = data["notepadContent"];

  notepad.addEventListener("input", (e) => {
    if (notepad !== document.activeElement || !windowIsActive) return;

    let obj = Object.assign(data, {
      notepadContent: notepad.value,
    });

    updateStore(key, obj);
  });

  // Allow updating content between tabs
  let windowIsActive;

  let storeListener = setInterval(listenerUpdate, 1000);

  window.onfocus = function () {
    windowIsActive = true;
  };

  window.onblur = function () {
    windowIsActive = false;
    if (storeListener) {
      clearInterval(storeListener);
    }
    storeListener = setInterval(listenerUpdate, 1000);
  };

  notepad.addEventListener("blur", (e) => {
    if (storeListener) {
      clearInterval(storeListener);
    }
    storeListener = setInterval(listenerUpdate, 1000);
  });

  notepad.addEventListener("focus", (e) => {
    if (storeListener) {
      clearInterval(storeListener);
    }
  });

  window.addEventListener("mousewheel", scrollCapture);

  function scrollCapture(e) {
    if (e.target !== notepad) notepad.scrollTop += e.deltaY;
  }
}
