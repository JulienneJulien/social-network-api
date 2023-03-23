const router = require("express").Router();

// REQUIRED routes for thoughts
const {
    getAllThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteOneThought,
    createReaction,
    deleteOneReaction,
  } = require("../../controllers/thoughtController");

  // ADDED REQUIREMENT -  GET thoughts and Posts
  router.route("/").get(getAllThoughts).post(createThought);

  // ADDED REQUIREMENT -  GET one thought. Update and delete a single thought
  router
  .route("/:thoughtId")
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteOneThought);