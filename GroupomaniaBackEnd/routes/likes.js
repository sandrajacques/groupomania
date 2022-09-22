const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const likesCtrl = require('../controllers/likes');
router.get('/:id', likesCtrl.getAllLikes);
router.post('/',likesCtrl.createLike);
router.delete('/:postId/:idAuthor', likesCtrl.deleteLike);

module.exports = router;