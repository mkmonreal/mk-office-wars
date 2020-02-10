const express = require('express');
const router = express.Router();

router.get('/', async function(req, res, next){
    let player = await playerService.getPlayers();
});

module.exports = router;
