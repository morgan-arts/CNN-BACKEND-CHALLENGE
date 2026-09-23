const express = require('express');
const router = express.Router();

const News = require('../models/News');
const auth = require('../middleware/authenticate');

// Create News (Secured)
router.post('/', auth, async (req, res) => {
try {
const news = new News(req.body);
await news.save();
res.status(201).json(news);
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// Update News (Secured)
router.put('/:id', auth, async (req, res) => {
try {
const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (!news) return res.status(404).json({ error: 'News item not found' });
res.json(news);
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// Delete News (Secured)
router.delete('/:id', auth, async (req, res) => {
try {
const news = await News.findByIdAndDelete(req.params.id);
if (!news) return res.status(404).json({ error: 'News item not found' });
res.json({ message: 'News item deleted successfully' });
} catch (err) {
res.status(500).json({ error: err.message });
}
});

module.exports = router;

