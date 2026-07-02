const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/galleryController');
const { authMiddleware, adminOnly } = require('../middleware/auth');
const { uploadImage } = require('../middleware/upload');

router.get('/albums', ctrl.listAlbums);
router.get('/albums/:id', ctrl.getAlbum);
router.post('/albums', authMiddleware, adminOnly, uploadImage('gallery').single('cover'), ctrl.createAlbum);
router.delete('/albums/:id', authMiddleware, adminOnly, ctrl.deleteAlbum);
router.post('/albums/:albumId/images', authMiddleware, adminOnly, uploadImage('gallery').array('images', 20), ctrl.addImages);
router.delete('/images/:id', authMiddleware, adminOnly, ctrl.deleteImage);

module.exports = router;
