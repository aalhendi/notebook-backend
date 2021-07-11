const express = require("express");

const { noteFetch } = require("./controllers");

/*Controller imports*/

const router = express.Router();

router.get("/", noteFetch);

module.exports = router;
