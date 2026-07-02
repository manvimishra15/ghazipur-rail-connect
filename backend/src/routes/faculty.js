const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/facultyController');
const { authMiddleware, adminOnly } = require('../middleware/auth');
const { uploadImage } = require('../middleware/upload');

router.get('/', ctrl.list);
router.get('/:id', ctrl.get);
router.post('/', authMiddleware, adminOnly, uploadImage('faculty').single('photo'), ctrl.create);
router.put('/:id', authMiddleware, adminOnly, uploadImage('faculty').single('photo'), ctrl.update);
router.delete('/:id', authMiddleware, adminOnly, ctrl.remove);

module.exports = router;
