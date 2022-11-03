const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postsCtrl = require('../controllers/posts');
router.get('/', postsCtrl.getAllPosts);
router.get('/:id', postsCtrl.getOnePosts);
router.delete('/:id',auth, postsCtrl.deletePosts);
router.post('/',auth, multer,postsCtrl.createPost);
router.put('/:id', auth,multer, postsCtrl.modifyPost);

/*router.get('/:id', auth, saucesCtrl.getOneSauce);
router.put('/:id', auth,multer, saucesCtrl.modifySauce);

router.post('/:id/like',auth, saucesCtrl.like);*/

module.exports = router;