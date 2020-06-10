const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json())
// kkkkkkk
const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id, title
    };

    res.status(201).send(posts[id]);
});

app.listen(process.env.PORT || 4000,  () => {
    console.log('Listening on process.env.PORT || 4000');
});