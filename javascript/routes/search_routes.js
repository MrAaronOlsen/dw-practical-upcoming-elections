const express = require('express');
const router = express.Router();

const { processIndexGet } = require('../controllers/search_controller.js')

/* GET search page. */
router.get('/', (req, res) => {
  processIndexGet(data => {
    res.render('search_view', data);
  })
});

module.exports = router;
