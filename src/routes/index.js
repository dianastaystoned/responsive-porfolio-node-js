const express = require('express');
const pool = require('../database');

const router = express.Router();

//Así se mandan llamar todos los proyectos
router.get('/', async (req, res) => {
    const projects = await pool.query('select * from proyectos limit 6');
    res.render('index', {projects});
});


module.exports = router;