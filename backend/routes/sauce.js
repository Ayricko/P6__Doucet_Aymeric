const express = require('express');
const router = express.Router();

const sauceControllers = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, sauceControllers.findSauce);
router.get('/:id', auth, sauceControllers.findOneSauce);
router.post('/', auth, multer, sauceControllers.creatSauce);
router.put('/:id', auth, multer, sauceControllers.updateSauce);
router.delete('/:id', auth, sauceControllers.deleteSauce);
router.post('/:id/like', auth, sauceControllers.likeSauce);

module.exports = router;
