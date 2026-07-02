const db = require('../../database/schema');

const list = (req, res) => {
  res.json(db.prepare('SELECT * FROM magazine_issues ORDER BY published_date DESC').all());
};

const create = (req, res) => {
  const { title, issue_number, volume, published_date, description } = req.body;
  if (!title) return res.status(400).json({ message: 'Title required' });
  if (!req.files || !req.files.pdf) return res.status(400).json({ message: 'PDF file required' });
  const pdf_url = `/uploads/magazine/${req.files.pdf[0].filename}`;
  const cover_image_url = req.files.cover ? `/uploads/magazine/${req.files.cover[0].filename}` : null;
  const result = db.prepare('INSERT INTO magazine_issues (title, issue_number, volume, published_date, cover_image_url, pdf_url, description) VALUES (?, ?, ?, ?, ?, ?, ?)').run(title, issue_number, volume, published_date, cover_image_url, pdf_url, description);
  res.status(201).json(db.prepare('SELECT * FROM magazine_issues WHERE id = ?').get(result.lastInsertRowid));
};

const remove = (req, res) => {
  const result = db.prepare('DELETE FROM magazine_issues WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted successfully' });
};

module.exports = { list, create, remove };
