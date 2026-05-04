const db = require('../../database/schema');

const list = (req, res) => {
  const { category, language } = req.query;
  let query = 'SELECT * FROM ebooks';
  const params = [];
  const conditions = [];
  if (category) { conditions.push('category = ?'); params.push(category); }
  if (language) { conditions.push('language = ?'); params.push(language); }
  if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
  query += ' ORDER BY created_at DESC';
  res.json(db.prepare(query).all(...params));
};

const create = (req, res) => {
  const { title, description, category, language } = req.body;
  if (!title || !category) return res.status(400).json({ message: 'Title and category required' });
  if (!req.files || !req.files.file) return res.status(400).json({ message: 'PDF file required' });
  const file_url = `/uploads/ebooks/${req.files.file[0].filename}`;
  const thumbnail_url = req.files.thumbnail ? `/uploads/ebooks/${req.files.thumbnail[0].filename}` : null;
  const result = db.prepare('INSERT INTO ebooks (title, description, category, language, file_url, thumbnail_url) VALUES (?, ?, ?, ?, ?, ?)').run(title, description, category, language || 'English', file_url, thumbnail_url);
  res.status(201).json(db.prepare('SELECT * FROM ebooks WHERE id = ?').get(result.lastInsertRowid));
};

const download = (req, res) => {
  const ebook = db.prepare('SELECT * FROM ebooks WHERE id = ?').get(req.params.id);
  if (!ebook) return res.status(404).json({ message: 'Not found' });
  db.prepare('UPDATE ebooks SET download_count = download_count + 1 WHERE id = ?').run(req.params.id);
  res.json(ebook);
};

const remove = (req, res) => {
  const result = db.prepare('DELETE FROM ebooks WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted successfully' });
};

module.exports = { list, create, download, remove };
