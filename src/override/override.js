// L U  C   I    D
// Daniel Eden wrote this code
// He also happened to write this ode
// To focus, clarity, rest, and joy
// Which, I hope, you find in this toy

// Updated by @bost_ty, 2020, for Firefox compatibility :)

// Color scheme overrides, not implemented:
// https://stackoverflow.com/questions/56300132/how-to-override-css-prefers-color-scheme-setting

// Define global functions
function updateStore(storeKey, data) {
  let obj = {};
  obj[storeKey] = JSON.stringify(data);
  browser.storage.sync.set(obj);
}

function readStore(storeKey, cb) {
  browser.storage.sync.get(storeKey, (result) => {
    let d = null;

    if (result[storeKey]) d = JSON.parse(result[storeKey]);

    // Make sure we got an object back, run callback
    if (typeof d === "object") cb(d);
  });
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
    document.querySelector(".notepad").innerHTML = d.notepadContent;
  });
}

function start(data) {
  // Get timezone offset set in Options from sync storage
  let timezoneOffset;
  const getting = browser.storage.sync.get();
  getting.then((result) => {
    timezoneOffset = result.timezone;
  });

  // Determine and format date & time of day
  let now = new Date();
  let timeString = `${weekdays[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;

  // Check if offset from Date is non-zero, and if so, use it by default
  if (now.getTimezoneOffset() !== 0 && timezoneOffset) {
    timezoneOffset = now.getTimezoneOffset();
  }

  let roughHours = now.getHours() + timezoneOffset;
  let broadTime = roughHours < 12 ? "morning" : roughHours > 17 ? "evening" : "afternoon";

  let g = document.querySelector(".greeting");
  g.innerHTML = `Good ${broadTime}. Today is ${timeString}.`;

  // Set up the notepad
  let notepad = document.querySelector(".notepad");
  notepad.innerHTML = data["notepadContent"];

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
