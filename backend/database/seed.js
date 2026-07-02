const bcrypt = require('bcryptjs');
const db = require('./schema');

console.log('Seeding database...');

// Admin user
const hashedPassword = bcrypt.hashSync('admin1234', 10);
const adminExists = db.prepare('SELECT id FROM admins WHERE email = ?').get('admin@zrti-ghazipur.gov.in');
if (!adminExists) {
  db.prepare('INSERT INTO admins (name, email, password, role) VALUES (?, ?, ?, ?)').run(
    'Principal Admin', 'admin@zrti-ghazipur.gov.in', hashedPassword, 'principal'
  );
  console.log('Admin user created: admin@zrti-ghazipur.gov.in / admin1234');
}

// Sample announcements
const announcements = [
  { title: 'Admission Open for Signal & Telecommunication Course', content: 'Applications are invited for the upcoming batch of Signal & Telecommunication training course starting June 2025. Eligible candidates must be Group C/D railway employees.', category: 'admission', is_pinned: 1 },
  { title: 'Result Published: OHE Maintenance Batch March 2025', content: 'Results for OHE Maintenance training batch (March 2025) have been published. Candidates can check their results in the Results section.', category: 'result', is_pinned: 0 },
  { title: 'Holiday Notice: Institute Closed on 14th April', content: 'The institute will remain closed on 14th April 2025 on account of Dr. B.R. Ambedkar Jayanti. Regular classes will resume on 15th April.', category: 'holiday', is_pinned: 0 },
  { title: 'New E-Books Added to Knowledge Centre', content: 'New study materials including General Rules 2024 and AC Traction Manual have been added to the e-library. Trainees can access them from the Knowledge Centre.', category: 'general', is_pinned: 0 },
];

const insertAnnouncement = db.prepare('INSERT INTO announcements (title, content, category, is_pinned) VALUES (?, ?, ?, ?)');
const announcementsExist = db.prepare('SELECT COUNT(*) as count FROM announcements').get();
if (announcementsExist.count === 0) {
  announcements.forEach(a => insertAnnouncement.run(a.title, a.content, a.category, a.is_pinned));
  console.log('Sample announcements created');
}

// Sample courses
const courses = [
  { title: 'OHE Maintenance & Inspection', description: 'Comprehensive training on overhead equipment maintenance for traction staff.', duration: '21 Days', category: 'Traction', start_date: '2025-06-02', end_date: '2025-06-23', seats: 30, status: 'upcoming' },
  { title: 'Signal & Telecommunication Basics', description: 'Foundation course on railway signaling systems and telecom infrastructure.', duration: '14 Days', category: 'Signal', start_date: '2025-06-10', end_date: '2025-06-24', seats: 25, status: 'upcoming' },
  { title: 'Safe Working on Track', description: 'Safety protocols and procedures for track maintenance gangs.', duration: '7 Days', category: 'Safety', start_date: '2025-05-15', end_date: '2025-05-22', seats: 40, status: 'ongoing' },
  { title: 'Passenger Amenities & Commercial Rules', description: 'Training on commercial rules, passenger handling and amenity standards.', duration: '10 Days', category: 'Commercial', start_date: '2025-07-01', end_date: '2025-07-11', seats: 35, status: 'upcoming' },
];

const insertCourse = db.prepare('INSERT INTO courses (title, description, duration, category, start_date, end_date, seats, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
const coursesExist = db.prepare('SELECT COUNT(*) as count FROM courses').get();
if (coursesExist.count === 0) {
  courses.forEach(c => insertCourse.run(c.title, c.description, c.duration, c.category, c.start_date, c.end_date, c.seats, c.status));
  console.log('Sample courses created');
}

// Sample faculty
const faculty = [
  { name: 'Shri Ramesh Kumar Verma', designation: 'Principal', department: 'Administration', qualification: 'M.Tech (Electrical)', experience: '25 Years', sort_order: 1 },
  { name: 'Shri Sunil Kumar Singh', designation: 'Sr. Instructor (Traction)', department: 'Traction', qualification: 'B.Tech (EE)', experience: '18 Years', sort_order: 2 },
  { name: 'Smt. Priya Sharma', designation: 'Instructor (Signal)', department: 'Signal & Telecom', qualification: 'B.Tech (ECE)', experience: '12 Years', sort_order: 3 },
  { name: 'Shri Anil Pandey', designation: 'Instructor (Safety)', department: 'Safety', qualification: 'Diploma (Mech)', experience: '15 Years', sort_order: 4 },
  { name: 'Shri Deepak Gupta', designation: 'Instructor (Commercial)', department: 'Commercial', qualification: 'MBA', experience: '10 Years', sort_order: 5 },
  { name: 'Smt. Rekha Mishra', designation: 'Librarian', department: 'Library', qualification: 'B.Lib', experience: '8 Years', sort_order: 6 },
];

const insertFaculty = db.prepare('INSERT INTO faculty (name, designation, department, qualification, experience, sort_order) VALUES (?, ?, ?, ?, ?, ?)');
const facultyExist = db.prepare('SELECT COUNT(*) as count FROM faculty').get();
if (facultyExist.count === 0) {
  faculty.forEach(f => insertFaculty.run(f.name, f.designation, f.department, f.qualification, f.experience, f.sort_order));
  console.log('Sample faculty created');
}

// Sample gallery album
const albumExists = db.prepare('SELECT COUNT(*) as count FROM gallery_albums').get();
if (albumExists.count === 0) {
  db.prepare('INSERT INTO gallery_albums (title, description) VALUES (?, ?)').run('Campus', 'ZRTI Ghazipur campus and facilities');
  console.log('Sample gallery album created');
}

// Sample ebooks
const ebooks = [
  { title: 'General Rules 2024', description: 'Indian Railways General Rules for all categories of staff.', category: 'Operating', language: 'English', file_url: '/uploads/ebooks/placeholder.pdf' },
  { title: 'सामान्य नियम 2024', description: 'भारतीय रेलवे के सभी कर्मचारियों के लिए सामान्य नियम।', category: 'Operating', language: 'Hindi', file_url: '/uploads/ebooks/placeholder.pdf' },
  { title: 'AC Traction Manual', description: 'Comprehensive manual for AC traction maintenance staff.', category: 'Traction', language: 'English', file_url: '/uploads/ebooks/placeholder.pdf' },
  { title: 'Signal Manual Part-I', description: 'Indian Railways Signal Manual for signal maintainers.', category: 'Signal', language: 'English', file_url: '/uploads/ebooks/placeholder.pdf' },
];

const insertEbook = db.prepare('INSERT INTO ebooks (title, description, category, language, file_url) VALUES (?, ?, ?, ?, ?)');
const ebooksExist = db.prepare('SELECT COUNT(*) as count FROM ebooks').get();
if (ebooksExist.count === 0) {
  ebooks.forEach(e => insertEbook.run(e.title, e.description, e.category, e.language, e.file_url));
  console.log('Sample ebooks created');
}

// Sample notices
const notices = [
  { title: 'Circular No. 12/2025 - Training Schedule Q2', content: 'The training schedule for Q2 2025 (April-June) has been finalized. All departments are directed to nominate candidates accordingly.', category: 'circular' },
  { title: 'Tender Notice - Hostel Renovation', content: 'Sealed tenders are invited from eligible contractors for renovation of hostel Block-B. Last date for submission: 30 April 2025.', category: 'tender' },
  { title: 'RTI Application Process', content: 'For RTI applications, applicants are requested to contact the CPIO at the institute office during working hours.', category: 'rti' },
];

const insertNotice = db.prepare('INSERT INTO notices (title, content, category) VALUES (?, ?, ?)');
const noticesExist = db.prepare('SELECT COUNT(*) as count FROM notices').get();
if (noticesExist.count === 0) {
  notices.forEach(n => insertNotice.run(n.title, n.content, n.category));
  console.log('Sample notices created');
}

// Sample trainee
const traineeExists = db.prepare('SELECT id FROM trainees WHERE mobile = ?').get('9999999999');
if (!traineeExists) {
  db.prepare('INSERT INTO trainees (name, mobile, dob, batch, course, roll_number) VALUES (?, ?, ?, ?, ?, ?)').run(
    'Test Trainee', '9999999999', '1995-01-15', 'Batch-2025-A', 'OHE Maintenance', 'ZRTI/2025/001'
  );
  console.log('Sample trainee created: mobile 9999999999, DOB 1995-01-15');
}

console.log('Database seeding complete.');
