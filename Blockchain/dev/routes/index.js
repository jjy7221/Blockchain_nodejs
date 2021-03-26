const express = require(`express`);

const router = express.Router();

const bitcoin = require(`../bitcoin`);

router.get(`/`,(req, res) => {
    res.send(bitcoin);
});

module.exports = router;