const express = require('express');
const compression = require('compression');

const app = express();
const port = 3000;

app.use(compression());

app.use("/", express.static("public/"));

app.use((req, res) => {
    res.status(404).send("<h1>Error 404! Not Found!</h1>");
});

app.listen(port, () => {
    console.log('Server is running')
});