/* Imports */
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const upload = multer();

/* Route Imports */
const notebookRoutes = require("./API/notebook/routes");

const app = express();

/* Middleware */
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(upload.array()); //Form data support. But why?
app.use("/media", express.static("media"));

/* Database */
const db = require("./db/models");

/* Routes */
app.use("/notebooks", notebookRoutes);
// TODO: Note routes

/* Error Handling */
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Errror." });
});

/* Path Handling */
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found." });
}); //

/* Run Method */
const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful");
    //Listen @ port 8000
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error conencting to the database: ", error);
  }
};

run();
