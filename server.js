const express = require('express');
const dbRouter = require("./data/db-router")
const commentsRouter = require("./data/comments-router")

const server = express();
server.use(express.json());

server.use('/api', dbRouter)
server.use('/api/posts', commentsRouter)

module.exports = server;