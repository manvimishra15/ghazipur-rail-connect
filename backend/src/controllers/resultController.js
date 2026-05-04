const db = require('../../database/schema');

const list = (req, res) => {
  res.json(db.prepare('SELECT * FROM results ORDER BY published_at DESC').all());
};

const create = (req, res) => {
  const { course_name, batch, exam_date } = req.body;
  if (!course_name || !batch) return res.status(400).json({ message: 'Course name and batch required' });
  if (!req.file) return res.status(400).json({ message: 'Result PDF required' });
  const result_pdf_url = `/uploads/results/${req.file.filename}`;
  const result = db.prepare('INSERT INTO results (course_name, batch, exam_date, result_pdf_url) VALUES (?, ?, ?, ?)').run(course_name, batch, exam_date, result_pdf_url);
  res.status(201).json(db.prepare('SELECT * FROM results WHERE id = ?').get(result.lastInsertRowid));
};

const remove = (req, res) => {
  const result = db.prepare('DELETE FROM results WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted successfully' });
};

module.exports = { list, create, remove };
