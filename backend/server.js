import express from 'express';


const PORT = 3000;


const app = express();


app.get('/', (req, res) => {
    res.send("Hello! it worked");
});


app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
})
