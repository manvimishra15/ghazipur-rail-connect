const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/resultController');
const { authMiddleware, adminOnly } = require('../middleware/auth');
const { uploadPDF } = require('../middleware/upload');

router.get('/', ctrl.list);
router.post('/', authMiddleware, adminOnly, uploadPDF('results').single('result_pdf'), ctrl.create);
router.delete('/:id', authMiddleware, adminOnly, ctrl.remove);

module.exports = router;
