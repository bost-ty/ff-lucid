// Fetch is a simpler way to conduct HTTP requests
// Can I use this to load a local JSON file?
// There's one gotcha, but otherwise easy.

// Fetch does require a HTTP request though? It does. Do we need to fake it?

// fetch(`https://raw.githubusercontent.com/dmfilipenko/timezones.json/master/timezones.json`);

fetch("./timezones.json")
  .then(function (resp) {
    return resp.json();
  })
  .then(function (data) {
    console.log(data);
  });
data.forEach((item) => console.log(item));
