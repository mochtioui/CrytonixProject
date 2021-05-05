const express = require('express');
const router = express.Router();
const ThemeService = require('../services/theme.service')



// get back all the themes
router.get('/', ThemeService.getThemes);

// submit a theme
router.post('/', ThemeService.addTheme);

// delete theme
router.delete('/:themeId', ThemeService.deleteTheme)

// check used theme
router.get('/check/:themeId', ThemeService.checkUsedTheme)

// update a theme
router.patch('/', ThemeService.updateTheme)

module.exports = router;
