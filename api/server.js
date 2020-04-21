const express = require('express');
const helmet = require("helmet");
var cors = require("cors");

const messagesRouter = require("../messages/messages-router");
const authRouter = require("../auth/auth-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/messages", messagesRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
    res.status(200).json({ message: "Up"})
});

module.exports = server;