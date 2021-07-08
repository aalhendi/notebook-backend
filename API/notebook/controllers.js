const { Note, Notebook } = require("../../db/models");

exports.fetchNotebook = async (notebookId, next) => {
  try {
    const notebook = await Notebook.findByPk(notebookId);
    return notebook;
  } catch (error) {
    next(error);
  }
};

exports.notebookFetch = async (req, res, next) => {
  try {
    const notebooks = await Notebook.findAll();
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
  console.log(req.body);
  try {
    const newNotebook = await Notebook.create(req.body);
    res.status(201).json(newNotebook);
  } catch (error) {
    next(error);
  }
};
