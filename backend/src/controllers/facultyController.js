const db = require('../../database/schema');

const list = (req, res) => {
  res.json(db.prepare('SELECT * FROM faculty ORDER BY sort_order ASC, id ASC').all());
};

const get = (req, res) => {
  const row = db.prepare('SELECT * FROM faculty WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ message: 'Not found' });
  res.json(row);
};

const create = (req, res) => {
  const { name, designation, department, qualification, experience, email, phone, sort_order } = req.body;
  if (!name || !designation) return res.status(400).json({ message: 'Name and designation required' });
  const photo_url = req.file ? `/uploads/faculty/${req.file.filename}` : null;
  const result = db.prepare('INSERT INTO faculty (name, designation, department, qualification, experience, photo_url, email, phone, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)').run(name, designation, department, qualification, experience, photo_url, email, phone, sort_order || 0);
  res.status(201).json(db.prepare('SELECT * FROM faculty WHERE id = ?').get(result.lastInsertRowid));
};

const update = (req, res) => {
  const existing = db.prepare('SELECT * FROM faculty WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ message: 'Not found' });
  const { name, designation, department, qualification, experience, email, phone, sort_order } = req.body;
  const photo_url = req.file ? `/uploads/faculty/${req.file.filename}` : existing.photo_url;
  db.prepare('UPDATE faculty SET name=?, designation=?, department=?, qualification=?, experience=?, photo_url=?, email=?, phone=?, sort_order=? WHERE id=?').run(name || existing.name, designation || existing.designation, department ?? existing.department, qualification ?? existing.qualification, experience ?? existing.experience, photo_url, email ?? existing.email, phone ?? existing.phone, sort_order ?? existing.sort_order, req.params.id);
  res.json(db.prepare('SELECT * FROM faculty WHERE id = ?').get(req.params.id));
};

const remove = (req, res) => {
  const result = db.prepare('DELETE FROM faculty WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted successfully' });
};

module.exports = { list, get, create, update, remove };
