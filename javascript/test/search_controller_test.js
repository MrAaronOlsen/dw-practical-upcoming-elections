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