const db = require('../../database/schema');

const list = (req, res) => {
  const { status, category } = req.query;
  let query = 'SELECT * FROM courses';
  const params = [];
  const conditions = [];
  if (status) { conditions.push('status = ?'); params.push(status); }
  if (category) { conditions.push('category = ?'); params.push(category); }
  if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
  query += ' ORDER BY start_date ASC';
  res.json(db.prepare(query).all(...params));
};

const get = (req, res) => {
  const row = db.prepare('SELECT * FROM courses WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ message: 'Not found' });
  res.json(row);
};

const create = (req, res) => {
  const { title, description, duration, category, start_date, end_date, seats, status } = req.body;
  if (!title) return res.status(400).json({ message: 'Title required' });
  const result = db.prepare('INSERT INTO courses (title, description, duration, category, start_date, end_date, seats, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').run(title, description, duration, category, start_date, end_date, seats || 0, status || 'upcoming');
  res.status(201).json(db.prepare('SELECT * FROM courses WHERE id = ?').get(result.lastInsertRowid));
};

const update = (req, res) => {
  const existing = db.prepare('SELECT * FROM courses WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ message: 'Not found' });
  const { title, description, duration, category, start_date, end_date, seats, status } = req.body;
  db.prepare('UPDATE courses SET title=?, description=?, duration=?, category=?, start_date=?, end_date=?, seats=?, status=? WHERE id=?').run(title || existing.title, description ?? existing.description, duration ?? existing.duration, category ?? existing.category, start_date ?? existing.start_date, end_date ?? existing.end_date, seats ?? existing.seats, status ?? existing.status, req.params.id);
  res.json(db.prepare('SELECT * FROM courses WHERE id = ?').get(req.params.id));
};

const remove = (req, res) => {
  const result = db.prepare('DELETE FROM courses WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted successfully' });
};

module.exports = { list, get, create, update, remove };
