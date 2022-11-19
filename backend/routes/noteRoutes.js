const express = require("express");
const router = express.Router();
const {
  getNotes,
  setNote,
  updateNote,
  updatedNote,
  deleteNote,
} = require("../controllers/noteController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getNotes).post(protect, setNote);
router.route("/:id").get(protect, updateNote).delete(protect, deleteNote).put(protect, updatedNote)
router.route("/updated/:id")

module.exports = router;
