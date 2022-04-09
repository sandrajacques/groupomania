const express = require('express');
const router = express.Router();

//const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');

const postsCtrl = require('../controllers/posts');
router.get('/', postsCtrl.getAllPosts);
router.get('/:id', postsCtrl.getOnePosts);
/*router.get('/', auth, postsCtrl.getAllPosts);
router.post('/', auth, multer, saucesCtrl.createSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.put('/:id', auth,multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.post('/:id/like',auth, saucesCtrl.like);*/

module.exports = router;