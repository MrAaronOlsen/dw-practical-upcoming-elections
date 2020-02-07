const us_states = require('../us_state.js');

const fixedData = {
  title: 'Find My Election',
  states: us_states
}

const processIndexGet = callback => {
  callback(fixedData);
}

exports.processIndexGet = processIndexGet;