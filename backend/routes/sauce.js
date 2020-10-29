const express = require('express');
const router = express.Router();

const sauceControllers = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', sauceControllers.findSauce);
router.get('/:id', sauceControllers.findOneSauce);
router.post('/', multer, sauceControllers.creatSauce);
router.put('/:id', multer, sauceControllers.updateSauce);
router.delete('/:id', sauceControllers.deleteSauce);

module.exports = router;
