
exports.seed = function(knex) {
  return knex("messages").insert([
    {
      "message": "Hey there!"
    },
    {
      "message": "LOL!"
    },
    {
      "message": "This is awesome."
    },
    {
      "message": "Testing 123!"
    },
    {
      "message": "Stay tuned for new updates!"
    },
    {
      "message": "Sockets.io!"
    },
    {
      "message": "User authentication!"
    },
    {
      "message": "Design updates!"
    },
    {
      "message": "Woohoo!"
    },
    {
      "message": "Automatic scrolling is working."
    }
  ]);
};
