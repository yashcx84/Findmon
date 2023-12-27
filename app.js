const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Serve static files from the "public" folder
app.use(express.static('public'));

// -----
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
// Define routes
// Define routes
app.get('/', (req, res) => {
    res.render('index', { images: [], error: null }); // Initialize error to null
});
app.post('/search', async (req, res) => {
    const query = req.body.query;
    if (!query) {
        return res.render('index', { images: [], error: 'Please enter a search query.' , qrr : query});
    }
    const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=rvRXw5wRR0jnREM43h7eUppe5UUyvnFFhQpnF63m34E`;
    try {
        const response = await axios.get(apiUrl);
        const images = response.data.results.map(result => result.urls.regular);
        res.render('index', { images, error: null, qrr : query });
    } catch (error) {
        console.error('Error fetching images:', error);
        res.render('index', { images: [], error: 'Error fetching images. Please try again later.' });
    }
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});