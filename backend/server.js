// dependencies
import express from 'express';

// variables
const PORT = 3000;

// express environment
const app = express();

// route - listen to requests
app.get('/', (req, res) => {
    res.send("Hello! it worked");
});

// start server
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});
