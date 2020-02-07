var tap = require('tap');
const { processIndexGet, processSearchSubmit } = require('../controllers/search_controller.js')

/*
  Test that payload from index page has basic data.
*/

processIndexGet(data => {
  tap.ok(data, "Data should be truthy.");
  tap.type(data, Object, "Data should be Object.")

  tap.ok(data.states, "Index data should include states.");
  tap.type(data.states, Array, "States should be an Array.");
  tap.equals(61, data.states.length, "States should have 61 elements.");

  tap.ok(data.title, "Index data should include a title.");
})

// Mocking empty express-validator errors.
const errorsEmpty = {
  isEmpty: () => true
}

/*
  Test that a valid call to the search API returns a reliable payload.
*/

// Valid request params
const body = {
  "state": "CO",
  "city": "Denver"
}

processSearchSubmit(body, errorsEmpty, (data) => {
  tap.ok(data, "Data should be truthy.");
  tap.type(data, Object, "Data should be Object.")

  tap.notOk(data.errors, "Data should not have errors in it.");

  tap.ok(data.results, "Data should have results in it.");
  tap.type(data.results, Array, "Results should be an Array.");
  tap.ok(data.results.length > 0, "Results should have at least one element in it.");

  const result = data.results[0];

  tap.ok(result.description, "First result should have a description.");
  tap.ok(result.date, "First result should have a data.");
})

// Invalid request params
const bodyInvalid = {
  "state": "C O",
  "city": "Denver"
}

processSearchSubmit(bodyInvalid, errorsEmpty, (data) => {
  tap.ok(data, "Data should be truthy.");
  tap.type(data, Object, "Data should be Object.")

  tap.ok(data.errors, "Data should contain errors.");
  tap.type(data.errors, Array, "Errors should be an Array.");
  tap.ok(data.errors.length > 0, "Errors should have at least one element.");

  const error = data.errors[0];
  tap.ok(error, "First error should be truthy.");
  tap.type(error, 'string', "First error should be String.");
})

/*
  Test that validation errors are processed correctly and passed back in a reliably form.
*/

// Mocking express-validator errors object for sad path
const errorsBad = {
  isEmpty: () => false,
  errors: [
    {
      "param": "state",
    }
  ]
}

processSearchSubmit(body, errorsBad, (data) => {
  tap.ok(data, "Data should be truthy.");
  tap.type(data, Object, "Data should be Object.")

  tap.notOk(data.results, "Data should not have any results.");

  tap.ok(data["state_error"], "Data should have a 'state_error' key");
})