const express = require("express");
const router = express.Router();
const Note = require("../models/Notes");
const User = require("../models/User");

// Create Note
router.post("/addNote", async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      description: req.body.description,
    });
    const data = await note.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete Note
router.delete("/deleteNote/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Note
router.put("/updateNote/:id", async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All Notes
router.get("/getNotes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Note By ID
router.get("/getNotes/:id", async (req, res) => {
    try {
      const note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).json({ error: "Note not found" });
      }
      res.status(200).json(note);
    } catch (error) {
      res.status(500).json(error);
    }
  });
module.exports = router;
