const express = require('express');
const router = express.Router();

router.use('/posts', require('./postRoutes'));
router.use('/users', require('./userRoutes'));
router.use('/audios', require('./audioRoutes'));
router.use('/videos', require('./videoRoutes'));
router.use('/hymns', require('./hymnRoutes'));
router.use('/books', require('./bookRoutes'));
router.use('/comments', require('./commentRoutes'));

module.exports = router;
