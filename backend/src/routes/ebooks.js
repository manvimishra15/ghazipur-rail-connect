const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/ebookController');
const { authMiddleware, adminOnly } = require('../middleware/auth');
const { uploadAny } = require('../middleware/upload');

router.get('/', ctrl.list);
router.post('/download/:id', ctrl.download);
router.post('/', authMiddleware, adminOnly, uploadAny('ebooks').fields([{ name: 'file', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), ctrl.create);
router.delete('/:id', authMiddleware, adminOnly, ctrl.remove);

module.exports = router;
