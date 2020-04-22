const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
  let user = req.body;
  const rounds = process.env.HASH_ROUNDS || 8;
  const hash = bcrypt.hashSync(user.password, rounds);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: error.message });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  // Search for the user
  Users.findBy({ username })
    .then(user => {
      // If we find the user and the passwords match
      if(user && bcrypt.compareSync(password, user[0].password)) {
        // Produce a token
        const token = generateToken(user);
        // Send the token to the client
        res.status(200).json({ message: "Login successful", token });
      } else {
        res.status(401).json({ message: "Unable to login"})
      }

    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: error.message });
    });
});

function generateToken(user) {
  const payload = {
    userId: user[0].id,
    username:  user[0].username
  };

  const secret = process.env.JWT_SECRET || "blah";

//   const options = {
//     expiresIn: "1d"
//   }

  return jwt.sign(payload, secret);
}

module.exports = router; 