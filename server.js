const express = require('express');
const dbRouter = require("./data/db-router")
const commentsRouter = require("./data/comments-router")
const cors = require('cors')

const server = express();
server.use(express.json());
server.use(cors());

server.use('/api', dbRouter)
server.use('/api/posts', commentsRouter)

server.get("/", (req, res) => {
    const messageOfTheDay = process.env.MOTD || 'Hello WOrld';
    res.status(200).json({ api: "up", motd: messageOfTheDay });
  });

module.exports = server;