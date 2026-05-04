const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/noticeController');
const { authMiddleware, adminOnly } = require('../middleware/auth');
const { uploadAny } = require('../middleware/upload');

router.get('/', ctrl.list);
router.post('/', authMiddleware, adminOnly, uploadAny('announcements').single('attachment'), ctrl.create);
router.delete('/:id', authMiddleware, adminOnly, ctrl.remove);

module.exports = router;
