// L U  C   I    D
// Daniel Eden wrote this code
// He also happened to write this ode
// To focus, clarity, rest, and joy
// Which, I hope, you find in this toy

// Updated and maintained by @bost-ty, 2021, for Firefox, based on Daniel Eden's original code and design

// Initialize settings variables
let timezoneOffset;
let timezoneOffsetHours;
let colorPreference;
let fontPreference;

// Initialize notepad variables
let notepad = document.querySelector(".notepad");
let savedNotes;

// Restore synced information, called on load
function restoreOptions() {
  let getting = browser.storage.sync.get();
  getting.then((result) => {
    if (getting) {
      if (result.timezone) {
        timezoneOffset = result.timezone;
      }
      if (result.colorPreference) colorPreference = result.colorPreference;
      if (result.fontPreference) fontPreference = result.fontPreference;
      if (result.savedNotes) savedNotes = result.savedNotes;
      start();
    } else {
      console.error("Could not retrieve options from sync storage.");
      console.error("Log in to Firefox or enable extension sync in order to use this addon.");
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
  } else if (colorPreference == "dark") {
    rootStyles.style.setProperty("--foreground", light);
    rootStyles.style.setProperty("--background", dark);
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

function syncNotepad() {
  savedNotes = notepad.value;
  browser.storage.sync.set({
    savedNotes: savedNotes,
  });
  console.info("Notepad synced");
}

function listenerUpdate() {
  syncNotepad();
}

function start() {
  checkPreferences();

  // Determine and format date & time of day
  let now = new Date();
  let timeString = `${weekdays[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;

  // If timezoneOffset isn't available from sync storage, use the Date object's in place.
  if (timezoneOffset === undefined || timezoneOffset === null) {
    /* Flip the sign and convert minutes to hours,
       due to how Date object returns timezone offset */
    timezoneOffset = now.getTimezoneOffset() * -1;
    timezoneOffsetHours = timezoneOffset / 60;
  }

  // Create rough time of day
  let roughHours = now.getHours();
  let broadTime = roughHours < 12 ? "morning" : roughHours > 17 ? "evening" : "afternoon";

  // Create greeting message and populate it.
  let greeting = document.querySelector(".greeting");
  greeting.textContent = `Good ${broadTime}. Today is ${timeString}.`;

  // Set up the notepad (duplicates effort from restoreOptions)
  if (savedNotes) {
    notepad.value = savedNotes;
  } else {
    notepad.value = "";
  }
}

/* 
  Allow updating content between tabs.
  When notepad is focused, sync is updated every second. It is not yet clear if this is a performance issue.
*/
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
  syncNotepad();
  if (storeListener) {
    clearInterval(storeListener);
  }
});

notepad.addEventListener("focus", (e) => {
  if (storeListener) {
    clearInterval(storeListener);
  }
  storeListener = setInterval(listenerUpdate, 1000);
});

// Capture scrolling
window.addEventListener("mousewheel", scrollCapture);
function scrollCapture(e) {
  if (e.target !== notepad) notepad.scrollTop += e.deltaY;
}

// Load options from sync on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  restoreOptions();
});
