const express = require('express');

const messagesRouter = require("../messages/messages-router");

const server = express();

server.use(express.json());

server.use("/api/messages", messagesRouter);

server.get("/", (req, res) => {
    res.status(200).json({ message: "Up"})
});

module.exports = server;