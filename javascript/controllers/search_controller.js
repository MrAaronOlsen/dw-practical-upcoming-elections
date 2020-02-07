const { check } = require('express-validator');

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
const processSearchSubmit = (body, validator_errors, callback) => {
  // Adding body and fixed data back to response to persist form data when rerendering.
  const response_data = {...fixedData, ...body}

  // Errors is an object built from express-validator. If it encountered any errors isEmpty will return false
  // prompting us to handle errors instead of making a search request.
  if (!validator_errors.isEmpty()) {
    processValidatorErrors(validator_errors, response_data)
    callback(response_data)
  } else {
    // Build ocd params.
    const ocdParams = buildOcdFromParams(response_data)

    processSearchRequest(ocdParams, (data, errors) => {
      if (errors) {
        // Would like to format errors, but for now just parsing them as Strings for display;
        const parsedError = JSON.stringify(errors);
        response_data.errors ? response_data.errors.push(parsedError) : response_data.errors = [parsedError];
      }

      response_data['results'] = data || {};
      callback(response_data)
    })
  }
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

// Compile errors from express-validator.
// Field level errors are attached to the response as <field>_error so the form can check for errors at a field level.
//
const processValidatorErrors = (errors, response_data) => {

  errors.errors.forEach(error => {
    if (error.param) {
      response_data[error.param + "_error"] = true;
    }
  }, this)
}

exports.processIndexGet = processIndexGet;
exports.processSearchSubmit = processSearchSubmit;