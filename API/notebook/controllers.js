const { Note, Notebook } = require("../../db/models");

exports.fetchNotebook = async (notebookId, next) => {
  try {
    const notebook = await Notebook.findByPk(notebookId, {
      include: { model: Note, as: "note" },
    });
    return notebook;
  } catch (error) {
    next(error);
  }
};

exports.notebookFetch = async (req, res, next) => {
  try {
    const notebooks = await Notebook.findAll({
      include: { model: Note, as: "note" },
    });
    res.json(notebooks);
  } catch (error) {
    next(error);
  }
};

exports.notebookFind = async (req, res, next) => {
  try {
    res.json(req.notebook);
  } catch (error) {
    next(error);
  }
};

exports.notebookCreate = async (req, res, next) => {
  try {
    const newNotebook = await Notebook.create(req.body);
    res.status(201).json(newNotebook);
  } catch (error) {
    next(error);
  }
};

exports.noteCreate = async (req, res, next) => {
  try {
    // If statement for image (?)
    req.body.notebookId = req.notebook.id;
    const newNote = await Note.create(req.body);
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

exports.notebookFetchNotes = async (req, res, next) => {
  const notebook = req.notebook;
  res.json(notebook);
};
