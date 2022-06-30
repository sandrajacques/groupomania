const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postsCtrl = require('../controllers/posts');
router.get('/', postsCtrl.getAllPosts);
router.get('/:id', postsCtrl.getOnePosts);
router.delete('/:id', postsCtrl.deletePosts);
router.post('/',auth, multer,postsCtrl.createPost);
/*router.get('/', auth, postsCtrl.getAllPosts);

router.get('/:id', auth, saucesCtrl.getOneSauce);
router.put('/:id', auth,multer, saucesCtrl.modifySauce);

router.post('/:id/like',auth, saucesCtrl.like);*/

module.exports = router;