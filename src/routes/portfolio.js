const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');

const pool = require('../database');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('projects/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    const { nombre, descripcion, imagen, url } = req.body;
    const newProject = { 
        nombre, 
        descripcion,
        imagen,
        url
    };
    await pool.query('insert into proyectos set ?', [newProject]);
    req.flash('success', 'Proyecto guardado satisfactoriamente');
    res.redirect('/portfolio');
});

router.get('/', isLoggedIn, async (req, res) => {
    const projects = await pool.query('select * from proyectos');
    console.log(projects);
    res.render('projects/list', {projects});
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
   const { id } = req.params;
   await pool.query('delete from proyectos where id = ?', [id]);
   req.flash('success','Proyecto eliminado satisfactoriamente')
   res.redirect('/portfolio');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const projects = await pool.query('select * from proyectos where id = ?', [id]);
    res.render('projects/edit', { projects: projects [0]});
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, imagen } = req.body;
    const newProject = { 
        nombre, 
        descripcion,
        imagen
    };
    await pool.query('update proyectos set ? where id = ?', [newProject, id]);
    req.flash('success', 'Información del proyecto editada con éxito')
    res.redirect('/portfolio');
})

module.exports = router;