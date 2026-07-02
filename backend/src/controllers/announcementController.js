const db = require('../../database/schema');

const list = (req, res) => {
  const { category, limit } = req.query;
  let query = 'SELECT * FROM announcements';
  const params = [];
  if (category) { query += ' WHERE category = ?'; params.push(category); }
  query += ' ORDER BY is_pinned DESC, created_at DESC';
  if (limit) { query += ' LIMIT ?'; params.push(parseInt(limit)); }
  res.json(db.prepare(query).all(...params));
};

const get = (req, res) => {
  const row = db.prepare('SELECT * FROM announcements WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ message: 'Not found' });
  res.json(row);
};

const create = (req, res) => {
  const { title, content, category, is_pinned } = req.body;
  if (!title || !content) return res.status(400).json({ message: 'Title and content required' });
  const attachment_url = req.file ? `/uploads/announcements/${req.file.filename}` : null;
  const result = db.prepare('INSERT INTO announcements (title, content, category, is_pinned, attachment_url) VALUES (?, ?, ?, ?, ?)').run(title, content, category || 'general', is_pinned ? 1 : 0, attachment_url);
  res.status(201).json(db.prepare('SELECT * FROM announcements WHERE id = ?').get(result.lastInsertRowid));
};

const update = (req, res) => {
  const { title, content, category, is_pinned } = req.body;
  const existing = db.prepare('SELECT * FROM announcements WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ message: 'Not found' });
  const attachment_url = req.file ? `/uploads/announcements/${req.file.filename}` : existing.attachment_url;
  db.prepare('UPDATE announcements SET title=?, content=?, category=?, is_pinned=?, attachment_url=?, updated_at=datetime(\'now\') WHERE id=?').run(title || existing.title, content || existing.content, category || existing.category, is_pinned !== undefined ? (is_pinned ? 1 : 0) : existing.is_pinned, attachment_url, req.params.id);
  res.json(db.prepare('SELECT * FROM announcements WHERE id = ?').get(req.params.id));
};

const remove = (req, res) => {
  const result = db.prepare('DELETE FROM announcements WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted successfully' });
};

module.exports = { list, get, create, update, remove };
