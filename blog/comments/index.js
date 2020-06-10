//importações
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {};

/*
 *  Endpoint do metodo GET
 */
app.get('/posts/:id/comments', (req, res) => {
    res.status(200).send(commentsByPostId[req.params.id] || []);
});

/*
 *  Endpoint do metodo POST
 */
app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({id: commentId, content});

    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments);
});

app.listen(process.env.PORT || 4001,  () => {
    console.log('Listening on process.env.PORT || 4001');
});