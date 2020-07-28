// L U  C   I    D
// Daniel Eden wrote this code
// He also happened to write this ode
// To focus, clarity, rest, and joy
// Which, I hope, you find in this toy

// Updated by @bost_ty, 2020, for Firefox compatibility :)

// Color scheme
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

// Set up the store for our data
let defaultData = {
  notepadContent: "",
};

// Use sync to store data
readStore(key, (d) => {
  let data;

  // Check if we got data from sync storage. If so, no fallback is needed
  if (d) {
    data = d;
    // } else {
    //   // Fallback: Get the local storage
    //   local = localStorage.getItem(key);
    //   // Check if we got local storage data
    //   if (local) {
    //     // Try parsing the local storage data as JSON.
    //     // If it succeeds, we had an object in local storage
    //     try {
    //       data = JSON.parse(local);
    //       updateStore(key, local);
    //     } catch (e) {
    //       // If it fails to parse, we had the notepad content in local storage
    //       data = defaultData;
    //       data.notepadContent = localStorage.getItem(key);
    //       updateStore(key, data);
    //     }
    //     // Delete the local storage
    //     localStorage.removeItem(key);
    //   }
    //   // If we couldn't get data from anywhere, set to default data
    //   if (!data) {
    //     data = defaultData;
    //   }
    // }
    start(data);
  }
});

function listenerUpdate() {
  readStore(key, (d) => {
    document.querySelector(".notepad").innerHTML = d.notepadContent;
  });
}

function start(data) {
  // Get timezone offset, set on Options page, from sync storage
  let timezoneOffset;
  const getting = browser.storage.sync.get();
  getting.then((result) => {
    timezoneOffset = result.timezone;
  });

  // Create Date, determine and format time of day
  let now = new Date();
  let timeString = `${weekdays[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;
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

  // *** *** Keep this stuff! *** ***
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
