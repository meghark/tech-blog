const router = require('express').Router();
const apiRoutes = require('./api');
const pageRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');

router.use('/api',apiRoutes);
router.use('/', pageRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;