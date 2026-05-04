const db = require('../../database/schema');
const fs = require('fs');
const path = require('path');

// Albums
const listAlbums = (req, res) => {
  const albums = db.prepare('SELECT a.*, COUNT(i.id) as image_count FROM gallery_albums a LEFT JOIN gallery_images i ON i.album_id = a.id GROUP BY a.id ORDER BY a.created_at DESC').all();
  res.json(albums);
};

const getAlbum = (req, res) => {
  const album = db.prepare('SELECT * FROM gallery_albums WHERE id = ?').get(req.params.id);
  if (!album) return res.status(404).json({ message: 'Album not found' });
  const images = db.prepare('SELECT * FROM gallery_images WHERE album_id = ? ORDER BY created_at ASC').all(req.params.id);
  res.json({ ...album, images });
};

const createAlbum = (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: 'Title required' });
  const cover_image = req.file ? `/uploads/gallery/${req.file.filename}` : null;
  const result = db.prepare('INSERT INTO gallery_albums (title, description, cover_image) VALUES (?, ?, ?)').run(title, description, cover_image);
  res.status(201).json(db.prepare('SELECT * FROM gallery_albums WHERE id = ?').get(result.lastInsertRowid));
};

const deleteAlbum = (req, res) => {
  const result = db.prepare('DELETE FROM gallery_albums WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Album deleted' });
};

// Images
const addImages = (req, res) => {
  const album = db.prepare('SELECT * FROM gallery_albums WHERE id = ?').get(req.params.albumId);
  if (!album) return res.status(404).json({ message: 'Album not found' });
  if (!req.files || req.files.length === 0) return res.status(400).json({ message: 'No images uploaded' });

  const insert = db.prepare('INSERT INTO gallery_images (album_id, image_url, caption) VALUES (?, ?, ?)');
  const images = req.files.map(file => {
    const image_url = `/uploads/gallery/${file.filename}`;
    const result = insert.run(req.params.albumId, image_url, req.body.caption || null);
    // Set first image as album cover if none set
    if (!album.cover_image) db.prepare('UPDATE gallery_albums SET cover_image = ? WHERE id = ?').run(image_url, req.params.albumId);
    return { id: result.lastInsertRowid, image_url };
  });
  res.status(201).json(images);
};

const deleteImage = (req, res) => {
  const image = db.prepare('SELECT * FROM gallery_images WHERE id = ?').get(req.params.id);
  if (!image) return res.status(404).json({ message: 'Not found' });
  const filePath = path.join(process.env.UPLOADS_PATH || './uploads', 'gallery', path.basename(image.image_url));
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  db.prepare('DELETE FROM gallery_images WHERE id = ?').run(req.params.id);
  res.json({ message: 'Image deleted' });
};

module.exports = { listAlbums, getAlbum, createAlbum, deleteAlbum, addImages, deleteImage };
