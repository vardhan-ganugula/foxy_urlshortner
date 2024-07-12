const express = require("express");
const router = express.Router();
const {handleCreateURL,handleUrlForward} = require('../controllers/url')

router.get("/:id", handleUrlForward);

router.post("/create", handleCreateURL);

module.exports = router;
