const buildOcdFromParams = function(params) {
  const state = params["state"];
  const place = params["city"];

  return `${ocdState(state)},${ocdPlace(state, place)}`
}

const ocdState = function(state) {
  if (state) {
    return `ocd-division/country:us/state:${state}`.toLowerCase();
  }

  return "";
}

const ocdPlace = function(state, place) {
  if (state && place) {
    return `${ocdState(state)}/place:${place}`.replace(/\s+/g, '_').toLowerCase()
  }

  return "";
}

exports.buildOcdFromParams = buildOcdFromParams;
exports.ocdState = ocdState;
exports.ocdPlace = ocdPlace;