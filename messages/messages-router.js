const router = require('express').Router();

const Messages = require("../messages/messages-model");

router.get("/", (req, res) => {
    Messages.find()
    .then(messages => res.status(200).json(messages))
    .catch(() => res.status(500).json({ message: "Cannot retrieve messages"}))
});

router.post("/", (req, res) => {
    Messages.add(req.body)
    .then(newMessage => res.status(201).json(newMessage))
    .catch(() => res.status(500).json({ message: "Error sending message"}))
});

router.delete("/:id", (req, res) => {
    Messages.remove(req.params.id)
    .then(num => res.status(200).json(num))
    .catch(error => res.status(500).json({ error: error.message }))
});

module.exports = router;