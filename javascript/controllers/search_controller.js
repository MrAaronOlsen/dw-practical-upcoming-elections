const http = require('../js/http.js')
const { buildOcdFromParams } = require('../js/ocd_division.js')
const us_states = require('../us_state.js');

const fixedData = {
  title: 'Find My Election',
  states: us_states
}

const processIndexGet = callback => {
  callback(fixedData);
}

// Process form submit from search_form partial.
// * Only expects to find city and state, since that's all I'm really working with right now.
//
const processSearchSubmit = (body, callback) => {
  // Adding body and fixed data back to response to persist form data when rerendering.
  const response_data = {...fixedData, ...body}

  // Build ocd params
  const ocdParams = buildOcdFromParams(response_data)

  processSearchRequest(ocdParams, (data, errors) => {
    if (errors) {
      response_data.errors ? response_data.errors.push(errors) : response_data.errors = [errors];
    }

    response_data['results'] = data || {};
    callback(response_data)
  })
}

const SEARCH_UPCOMING_ELECTIONS_URL = 'https://api.turbovote.org/elections/upcoming?district-divisions='

// Makes a call to turbovote's upcoming election API passing resulting data to callback method.
//
const processSearchRequest = (ocd, callback) => {
  var headers = {
    "Accept": "application/json"
  }

  http.get(SEARCH_UPCOMING_ELECTIONS_URL + ocd, headers, (data, errors) => {
    callback(data, errors)
  })
}

exports.processIndexGet = processIndexGet;
exports.processSearchSubmit = processSearchSubmit;