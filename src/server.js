const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;
const API_KEY = 'YOUR_SPOONACULAR_API_KEY';

app.use(express.static('public'));

app.get('/api/recipe-of-the-day', async (req, res) => {
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}`);
        res.json(response.data.recipes[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching recipe of the day' });
    }
});

app.get('/api/popular-recipes', async (req, res) => {
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=5`);
        res.json({ recipes: response.data.results });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching popular recipes' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
