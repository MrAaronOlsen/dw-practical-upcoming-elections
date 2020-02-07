var tap = require('tap');
const { buildOcdFromParams, ocdState, ocdPlace } = require('../js/ocd_division.js')

const stateOcd = "ocd-division/country:us/state:wv";
const placeOcd = "ocd-division/country:us/state:wv/place:harpers_ferry";

// Test valid compiled state and places
tap.equals(stateOcd, ocdState("WV"), "Compiled ocd State does not match expected.");
tap.equals(placeOcd, ocdPlace("WV", "Harpers Ferry"), "Compiled ocd Place does not match expected.");

// Test undefined compiled state and places
tap.equals("", ocdState(undefined), "Undefined State should compile to empty String.");
tap.equals("", ocdPlace(undefined), "Undefined Place should compile to empty String.");

const addressParams = {
  "state": "WV",
  "city": "Harpers Ferry"
}

// Test valid compiled state and place from params.
tap.equals(stateOcd + "," + placeOcd, buildOcdFromParams(addressParams), "Compiled multi ocd params does not match expected.")