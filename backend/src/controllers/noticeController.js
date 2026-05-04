const db = require('../../database/schema');

const list = (req, res) => {
  const { category } = req.query;
  let query = 'SELECT * FROM notices WHERE is_active = 1';
  const params = [];
  if (category) { query += ' AND category = ?'; params.push(category); }
  query += ' ORDER BY created_at DESC';
  res.json(db.prepare(query).all(...params));
};

const create = (req, res) => {
  const { title, content, category } = req.body;
  if (!title) return res.status(400).json({ message: 'Title required' });
  const attachment_url = req.file ? `/uploads/announcements/${req.file.filename}` : null;
  const result = db.prepare('INSERT INTO notices (title, content, category, attachment_url) VALUES (?, ?, ?, ?)').run(title, content, category || 'general', attachment_url);
  res.status(201).json(db.prepare('SELECT * FROM notices WHERE id = ?').get(result.lastInsertRowid));
};

const remove = (req, res) => {
  const result = db.prepare('UPDATE notices SET is_active = 0 WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Notice removed' });
};

module.exports = { list, create, remove };
