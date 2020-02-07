const express = require('express');
const router = express.Router();

/*
  I couldn'e help myself when I read about express-validator. Added a little time to my project but I also feel strongly
  that validations are important for a good user experience. With this validation I can ensure the user at least enters a
  City and State, which more or less eliminates errors I'd recieve from the API itself.
*/
const { check, validationResult } = require('express-validator');

const { processIndexGet, processSearchSubmit } = require('../controllers/search_controller.js')

// Feels wrong to have these here, but also feels wrong to have in the controller... Probably need a validations package.
const searchFormValidations = [
  check('city').not().notEmpty(),
  check('state').not().notEmpty()
]

/* GET search page. */
router.get('/', (req, res) => {
  processIndexGet(data => {
    res.render('search_view', data);
  })
});

router.post('/search', searchFormValidations, (req, res) => {
  const errors = validationResult(req);

  processSearchSubmit(req.body, errors, (data) => {
    res.render('search_view', data);
  });
})

module.exports = router;
