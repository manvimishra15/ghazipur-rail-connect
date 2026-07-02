const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../database/schema');

const adminLogin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

  const admin = db.prepare('SELECT * FROM admins WHERE email = ?').get(email);
  if (!admin || !bcrypt.compareSync(password, admin.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: admin.id, email: admin.email, role: admin.role, type: 'admin' }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  res.json({ token, user: { id: admin.id, name: admin.name, email: admin.email, role: admin.role } });
};

const traineeLogin = (req, res) => {
  const { mobile, dob } = req.body;
  if (!mobile || !dob) return res.status(400).json({ message: 'Mobile number and date of birth required' });

  const trainee = db.prepare('SELECT * FROM trainees WHERE mobile = ? AND dob = ?').get(mobile.trim(), dob.trim());
  if (!trainee) return res.status(401).json({ message: 'Invalid mobile number or date of birth' });

  const token = jwt.sign({ id: trainee.id, mobile: trainee.mobile, type: 'trainee' }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { id: trainee.id, name: trainee.name, mobile: trainee.mobile, batch: trainee.batch, course: trainee.course, roll_number: trainee.roll_number } });
};

const getMe = (req, res) => {
  if (req.user.type === 'admin') {
    const admin = db.prepare('SELECT id, name, email, role, created_at FROM admins WHERE id = ?').get(req.user.id);
    return res.json({ ...admin, type: 'admin' });
  }
  const trainee = db.prepare('SELECT id, name, mobile, batch, course, roll_number FROM trainees WHERE id = ?').get(req.user.id);
  res.json({ ...trainee, type: 'trainee' });
};

module.exports = { adminLogin, traineeLogin, getMe };
