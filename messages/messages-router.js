const express = require('express');
const knex = require('knex');

const knexfile = require("../knexfile");

const db = knex(knexfile.development);

const router = express.Router();

router.get("/", (req, res) => {
    const { limit } = req.query;
    limit ? db("messages").limit(limit)
    .then(messages => res.status(200).json(messages)
    .catch(err => res.status(500).json({ message: "Cannot retrieve messages"})))
    :
    db("messages")
    .then(messages => res.status(200).json(messages))
    .catch(err => res.status(500).json({ message: "Cannot retrieve messages"}))
});

router.post("/", (req, res) => {
    const messageData = req.body;
    db("messages").insert(messageData)
    .then(ids => db("messages").where({ id: ids[0] }))
    .then(newMessage => res.status(201).json(newMessage))
    .catch(err => res.status(500).json({ message: "Error sending message"}))
});

router.delete("/:id", (req, res) => {
    db("messages").where("id", req.params.id).del()
    .then(num => res.status(200).json(num))
    .catch(error => res.status(500).json({ error: error.message }))
});

module.exports = router;