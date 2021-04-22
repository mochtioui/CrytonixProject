const express = require('express');
const router = express.Router();
const ThemeService = require('../services/theme.service')



// get back all the themes
router.get('/', ThemeService.getThemes);

// submit a theme
router.post('/', ThemeService.addTheme);

// specific theme
router.get('/:themeId', ThemeService.getOneTheme)

// delete theme
router.delete('/:themeId', ThemeService.deleteTheme)

// update a theme
router.patch('/:themeId', ThemeService.updateTheme)

module.exports = router;
