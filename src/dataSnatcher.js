/* dataSnatcher.js - snatches data from the business API 
 */
const express = require('express');

const router = express.Router();

// GET with spec ID
router.get('/:id', (req, res) => {
    console.log(res);
})

module.exports = router;