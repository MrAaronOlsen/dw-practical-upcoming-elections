const fetch = require("node-fetch");

const get = (url, headers, callback) => {
  fetch(url, { method: 'GET', headers: headers})
  .then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      throw res;
    }
  })
  .then((json) => {
    callback(json, null)
  }).catch((error) => {
    error.json().then( errorMessage => {
      callback(null, errorMessage)
    })
  })
};

exports.get = get;