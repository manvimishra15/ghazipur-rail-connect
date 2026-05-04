const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/announcementController');
const { authMiddleware, adminOnly } = require('../middleware/auth');
const { uploadAny } = require('../middleware/upload');

router.get('/', ctrl.list);
router.get('/:id', ctrl.get);
router.post('/', authMiddleware, adminOnly, uploadAny('announcements').single('attachment'), ctrl.create);
router.put('/:id', authMiddleware, adminOnly, uploadAny('announcements').single('attachment'), ctrl.update);
router.delete('/:id', authMiddleware, adminOnly, ctrl.remove);

module.exports = router;
