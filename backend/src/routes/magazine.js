const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/magazineController');
const { authMiddleware, adminOnly } = require('../middleware/auth');
const { uploadAny } = require('../middleware/upload');

router.get('/', ctrl.list);
router.post('/', authMiddleware, adminOnly, uploadAny('magazine').fields([{ name: 'pdf', maxCount: 1 }, { name: 'cover', maxCount: 1 }]), ctrl.create);
router.delete('/:id', authMiddleware, adminOnly, ctrl.remove);

module.exports = router;
