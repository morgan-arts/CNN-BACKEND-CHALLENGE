let newsFeed = [];

// Anyone can view all current news items
exports.getAllNews = (req, res) => {
    res.status(200).json(newsFeed);
};

// Protected routes (Requires Chief Editor verification via middleware)
exports.createNews = (req, res) => {
    const { title, body } = req.body;

    if (!title || !body) {
        return res.status(400).json({ error: 'Title and body are required' });
    }

    const article = {
        id: newsFeed.length + 1,
        title,
        body,
        authorId: req.user.userId,
        createdAt: new Date()
    };

    newsFeed.push(article);
    res.status(201).json({ message: 'News article posted successfully', article });
};

exports.editNews = (req, res) => {
    const { id } = req.params;
    const { title, body } = req.body;

    const article = newsFeed.find(n => n.id === parseInt(id));
    if (!article) {
        return res.status(404).json({ error: 'Article not found' });
    }

    if (title) article.title = title;
    if (body) article.body = body;

    res.status(200).json({ message: 'Article updated successfully', article });
};

exports.deleteNews = (req, res) => {
    const { id } = req.params;
    const initialLength = newsFeed.length;
    
    newsFeed = newsFeed.filter(n => n.id !== parseInt(id));

    if (newsFeed.length === initialLength) {
        return res.status(404).json({ error: 'Article not found' });
    }

    res.status(200).json({ message: 'Article deleted successfully' });
};

