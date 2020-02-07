const express = require('express');
const router = express.Router();

const { processIndexGet, processSearchSubmit } = require('../controllers/search_controller.js')

/* GET search page. */
router.get('/', (req, res) => {
  processIndexGet(data => {
    res.render('search_view', data);
  })
});

router.post('/search', (req, res) => {

  processSearchSubmit(req.body, (data) => {
    res.render('search_view', data);
  });
})

module.exports = router;
