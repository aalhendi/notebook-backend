const express = require("express");

/*Controller imports*/
const {
  notebookFetch,
  notebookFind,
  fetchNotebook,
  notebookCreate,
  noteCreate,
  notebookFetchNotes,
} = require("./controllers");

const router = express.Router();

// Param middleware
router.param("notebookId", async (req, res, next, notebookId) => {
  const notebook = await fetchNotebook(notebookId, next);
  if (notebook) {
    req.notebook = notebook;
    next();
  } else {
    const error = new Error("Notebook Not Found.");
    error.status = 404;
    next(error);
  }
});

// Notebook list
router.get("/", notebookFetch);

// Notebook item
router.get("/:notebookId", notebookFind);

// Create notebook
router.post("/", notebookCreate);

// Notebook Note items
router.get("/:notebookId/notes", notebookFetchNotes);

// Create note item in notebook
router.post("/:notebookId/notes", noteCreate);

module.exports = router;
