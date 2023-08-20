const fetchuser = require("../middleware/Fetchuser");
const Notes = require("../models/Notes");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ userid: req.user.id });
    res.send(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

router.post("/searchnotes", fetchuser, async (req, res) => {
  try {
    const { search } = req.body;
    const searchString = String(search);
    const notes = await Notes.find({
      userid: req.user.id,
      title: { $regex: searchString, $options: 'i' }
    });
    res.send(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});



router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "title can not be blank").exists(),
    body("description")
      .isLength({ min: 5 })
      .withMessage("minimum length of description is 5"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;
      const userid = req.user.id;
      const note = new Notes({
        title,
        description,
        tag,
        userid,
      });
      const savednote = await note.save();
      res.json(savednote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const userid = req.user.id;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    let updatednote = await Notes.findById(req.params.id);
    if (!updatednote) {
      res.status(404).send("note not found ");
    }
    if (userid !== updatednote.userid.toString()) {
      res.status(400).send("not permitted");
    }
    updatednote = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.send(updatednote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    const userid = req.user.id;
    let deletenote = await Notes.findById(req.params.id);

    if (!deletenote) {
      res.status(404).send("note not found ");
    }

    if (userid !== deletenote.userid.toString()) {
      res.status(400).send("not permitted");
    }
    deletenote = await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "note has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
